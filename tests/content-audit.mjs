/**
 * Content-quality regression guard.
 *
 * Runs over the built HTML in .next/server/app/specs (no server needed) and
 * compares today's numbers against tests/content-baseline.json. The corpus
 * still carries a large generated tail, so this does not assert "zero
 * duplication" — it asserts the numbers never get worse, and reports every
 * improvement so the baseline can be re-pinned as pages are rewritten.
 *
 *   node tests/content-audit.mjs           # check against the baseline
 *   node tests/content-audit.mjs --update  # re-pin the baseline
 */
import fs from "node:fs";
import path from "node:path";

const SPEC_ROOT = ".next/server/app/specs";
const BASELINE = "tests/content-baseline.json";
const SEP = String.fromCharCode(92);

const GENERATED_SHAPES = [
  /^Which .+ applications does this page cover\?$/i,
  /^What are the .+ specs\?$/i,
  /^What is the .+\?$/i,
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith(".html") ? [full] : [];
  });
}

const text = (html) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const norm = (value) => value.replace(/\s+/g, " ").trim().toLowerCase();

if (!fs.existsSync(SPEC_ROOT)) {
  console.error(`No build output at ${SPEC_ROOT}. Run "npm run build" first.`);
  process.exit(1);
}

const pages = walk(SPEC_ROOT)
  .filter((file) => !file.includes("[..."))
  .map((file) => {
    const html = fs.readFileSync(file, "utf8");
    const slug = file
      .split(SEP)
      .join("/")
      .replace(`${SPEC_ROOT}/`, "")
      .replace(/\.html$/, "");

    const faqs = [...html.matchAll(/<details[^>]*>([\s\S]*?)<\/details>/g)].map((match) => {
      const q = text((match[1].match(/<summary[^>]*>([\s\S]*?)<\/summary>/) || [])[1] || "").replace(/\s*\+$/, "");
      const a = text(match[1].replace(/<summary[\s\S]*?<\/summary>/, ""));
      return { q, a };
    });

    // Editorial prose only: intro, procedure steps, body sections, FAQ answers.
    // Template chrome (safety callouts, export notes) is deliberately excluded.
    const prose = [
      text((html.match(/<div class="intro-copy">([\s\S]*?)<\/div>/) || [])[1] || ""),
      ...[...html.matchAll(/<li[^>]*><span>\d\d<\/span><p>([\s\S]*?)<\/p><\/li>/g)].map((m) => text(m[1])),
      ...[...html.matchAll(/<section id="section-\d+"[^>]*>([\s\S]*?)<\/section>/g)].map((m) => text(m[1])),
      ...faqs.map((f) => `${f.q} ${f.a}`),
    ].join(" ");

    return {
      slug,
      faqs,
      prose,
      hasFaqSchema: /"@type":"FAQPage"/.test(html),
      hasDiagram: /<title id="dTitle">/.test(html),
      hasImageSchema: /"@type":"ImageObject"/.test(html),
      description: (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "",
      title: ((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "").replace(/ \| TorqueSheet$/, ""),
    };
  });

const shingles = (value) => {
  const words = value.toLowerCase().split(" ").filter(Boolean);
  const set = new Set();
  for (let i = 0; i + 8 <= words.length; i++) set.add(words.slice(i, i + 8).join(" "));
  return set;
};

const sets = pages.map((page) => shingles(page.prose));
const seen = new Map();
for (const set of sets) for (const s of set) seen.set(s, (seen.get(s) ?? 0) + 1);

const sharedRatio = sets.map((set) => {
  if (!set.size) return 1;
  let dupes = 0;
  for (const s of set) if (seen.get(s) > 1) dupes++;
  return dupes / set.size;
});

const tally = (values) => {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
};
const questionCounts = tally(pages.flatMap((p) => p.faqs.map((f) => norm(f.q))));
const answerCounts = tally(pages.flatMap((p) => p.faqs.map((f) => norm(f.a))));

const allFaqs = pages.flatMap((p) => p.faqs);
// Mirrors app/faq-quality.ts: a template shape only counts as generated on a
// page carrying the template's signature three-FAQ block.
const TEMPLATE_FAQ_COUNT = 3;
const isGenerated = (page, faq) =>
  page.faqs.length <= TEMPLATE_FAQ_COUNT &&
  GENERATED_SHAPES.some((shape) => shape.test(faq.q.trim()));

const badSchemaPages = pages.filter(
  (p) =>
    p.hasFaqSchema &&
    p.faqs.some(
      (f) =>
        isGenerated(p, f) ||
        questionCounts.get(norm(f.q)) > 1 ||
        answerCounts.get(norm(f.a)) > 1,
    ),
);

const metrics = {
  pages: pages.length,
  duplicatedAnswers: allFaqs.filter((f) => answerCounts.get(norm(f.a)) > 1).length,
  duplicatedQuestions: allFaqs.filter((f) => questionCounts.get(norm(f.q)) > 1).length,
  generatedQuestions: pages.flatMap((p) => p.faqs.filter((f) => isGenerated(p, f))).length,
  pagesWithFaqSchema: pages.filter((p) => p.hasFaqSchema).length,
  pagesWithDiagram: pages.filter((p) => p.hasDiagram).length,
  pagesOver90PercentShared: sharedRatio.filter((r) => r >= 0.9).length,
  pagesOver70PercentShared: sharedRatio.filter((r) => r >= 0.7).length,
  longDescriptions: pages.filter((p) => p.description.length > 160).length,
  longTitles: pages.filter((p) => p.title.length > 60).length,
};

// Every metric here is a count of a defect, so lower is always better —
// except pagesWithFaqSchema, where more earned schema is the goal.
const HIGHER_IS_BETTER = new Set(["pagesWithFaqSchema", "pagesWithDiagram"]);

if (process.argv.includes("--update")) {
  fs.writeFileSync(BASELINE, `${JSON.stringify(metrics, null, 2)}\n`);
  console.log(`Baseline written to ${BASELINE}:`);
  console.log(JSON.stringify(metrics, null, 2));
  process.exit(0);
}

if (!fs.existsSync(BASELINE)) {
  console.error(`No baseline at ${BASELINE}. Run: node tests/content-audit.mjs --update`);
  process.exit(1);
}

const baseline = JSON.parse(fs.readFileSync(BASELINE, "utf8"));
const regressions = [];
const improvements = [];

for (const [key, value] of Object.entries(metrics)) {
  if (key === "pages") continue;
  const before = baseline[key];
  if (before === undefined) continue;
  const worse = HIGHER_IS_BETTER.has(key) ? value < before : value > before;
  const better = HIGHER_IS_BETTER.has(key) ? value > before : value < before;
  if (worse) regressions.push(`${key}: ${before} → ${value}`);
  if (better) improvements.push(`${key}: ${before} → ${value}`);
}

// A rendered diagram must always be accompanied by its ImageObject schema.
const diagramWithoutSchema = pages.filter((p) => p.hasDiagram && !p.hasImageSchema);
if (diagramWithoutSchema.length) {
  regressions.push(
    `${diagramWithoutSchema.length} page(s) render a diagram without ImageObject schema, e.g. ${diagramWithoutSchema.slice(0, 3).map((p) => p.slug).join(", ")}`,
  );
}

// A page must never claim FAQPage with shared or generated Q&A.
if (badSchemaPages.length) {
  regressions.push(
    `${badSchemaPages.length} page(s) emit FAQPage with shared/generated Q&A, e.g. ${badSchemaPages
      .slice(0, 3)
      .map((p) => p.slug)
      .join(", ")}`,
  );
}

console.log(JSON.stringify(metrics, null, 2));
if (improvements.length) console.log(`\nImproved:\n  ${improvements.join("\n  ")}\n\nRe-pin with: node tests/content-audit.mjs --update`);

if (regressions.length) {
  console.error(`\nContent quality regressed:\n  ${regressions.join("\n  ")}`);
  process.exit(1);
}
console.log("\nNo content-quality regressions.");
