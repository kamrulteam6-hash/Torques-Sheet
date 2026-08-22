import { specs } from "./data";
import type { SpecRecord } from "./chevy350-content";

/**
 * FAQPage markup is an assertion that a page's questions and answers are
 * distinct content. Most of the corpus is still served by generated FAQ blocks
 * that repeat across hundreds of pages, so this module decides — from the data
 * itself, not a hand-kept list — which pages have earned the schema.
 *
 * A page qualifies only when every question and every answer on it is unique
 * across the whole corpus, and none of them match a known generated shape.
 */

/**
 * Shapes produced by templates: unique per page, but written by a machine.
 * Only treated as generated on a page carrying the template's signature FAQ
 * count — "What is the LS1 intake bolt sequence?" is a real question on a page
 * that answers eight of them, and filler on a page that answers three.
 */
const GENERATED_SHAPES = [
  /^Which .+ applications does this page cover\?$/i,
  /^What are the .+ specs\?$/i,
  /^What is the .+\?$/i,
];

const MIN_FAQS = 3;
/** reduceRepeatedCopy() always emits exactly three FAQs. */
const TEMPLATE_FAQ_COUNT = 3;

function tally(values: string[]) {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

const norm = (value: string) => value.replace(/\s+/g, " ").trim().toLowerCase();

const questionCounts = tally(specs.flatMap((s) => s.faqs.map((f) => norm(f.q))));
const answerCounts = tally(specs.flatMap((s) => s.faqs.map((f) => norm(f.a))));

const isShared = (faq: { q: string; a: string }) =>
  (questionCounts.get(norm(faq.q)) ?? 0) > 1 || (answerCounts.get(norm(faq.a)) ?? 0) > 1;

const isGenerated = (spec: SpecRecord, faq: { q: string; a: string }) =>
  spec.faqs.length <= TEMPLATE_FAQ_COUNT &&
  GENERATED_SHAPES.some((shape) => shape.test(faq.q.trim()));

/** True when the page's FAQ block is bespoke enough to publish as FAQPage. */
export function hasBespokeFaqs(spec: SpecRecord) {
  if (spec.faqs.length < MIN_FAQS) return false;
  return !spec.faqs.some((faq) => isShared(faq) || isGenerated(spec, faq));
}

/** Per-FAQ reasons, for the content audit. */
export function faqReport(spec: SpecRecord) {
  return spec.faqs.map((faq) => ({
    q: faq.q,
    shared: isShared(faq),
    generated: isGenerated(spec, faq),
  }));
}
