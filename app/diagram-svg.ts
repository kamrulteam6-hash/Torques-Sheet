import type { SpecRecord, SpecValue } from "./chevy350-content";

/**
 * Static SVG diagrams, rendered on the server.
 *
 * The rule this module is built around: never draw geometry the sources do not
 * establish. Only 19 of the 480 records carry real fastener coordinates
 * (`diagram.positions`), physical fastener rows (`diagram.layout`) or physical
 * cylinder rows (`diagram.banks`), so a per-engine head-bolt location map
 * cannot be generated for the rest — a plausible-looking drawing of the wrong
 * bolt pattern is worse than no drawing.
 *
 * What can be drawn truthfully from data that already exists:
 *   - wheel     lug pattern; the star order for N lugs is geometry, not an
 *               engine-specific fact, so it is derivable
 *   - banks     physical cylinder rows, where a source established them
 *   - firing    the firing sequence as a sequence — explicitly not a physical
 *               bank layout
 *   - stages    staged torque values parsed from the spec table
 *   - capacity  comparable quantities parsed from the spec table
 *
 * Anything else returns null and the page renders without a static diagram.
 */

const C = {
  bg: "#0c1418",
  grid: "#19252b",
  line: "#40515a",
  panel: "#101b21",
  muted: "#71858f",
  text: "#dbe3e6",
  dim: "#9aa6ad",
  orange: "#ff6b00",
  blue: "#34a3ff",
};

const MONO = "'Cascadia Code','SFMono-Regular',Consolas,monospace";
const W = 640;
const H = 360;

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const round = (n: number) => Math.round(n * 100) / 100;

export type SpecDiagram = { svg: string; alt: string; kind: string };

/* ---------------------------------------------------------------- parsing */

/** Units we are willing to compare across rows. */
const UNITS = [
  "lb-ft", "ft-lb", "N·m", "N-m", "in-lb", "lb-in",
  "US qt", "qt", "L", "US gal", "gal",
  "psi", "kPa", "mm", "in", "lb", "kg", "hp",
];

type Measure = { n: number; unit: string };

/** First number+unit in a cell, e.g. "150 lb-ft (204 N·m)" -> 150 lb-ft. */
function measure(text: string): Measure | null {
  for (const unit of UNITS) {
    const pattern = new RegExp(
      `(\\d+(?:\\.\\d+)?)\\s*${unit.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "i",
    );
    const hit = text.match(pattern);
    if (hit) return { n: Number(hit[1]), unit };
  }
  return null;
}

/** Torque stages such as "Pass 1", "Stage 2", "Final pass". */
function stageRank(label: string): number | null {
  const numbered = label.match(/\b(?:pass|stage|step)\s*(\d+)\b/i);
  if (numbered) return Number(numbered[1]);
  if (/\bfinal\b/i.test(label)) return 99;
  return null;
}

/** Text before an em dash / hyphen separator, used to group stage rows. */
function stageGroup(label: string): string {
  const split = label.split(/\s+[—–-]\s+/);
  return split.length > 1 ? split[0].trim() : "";
}

function parseStages(values: SpecValue[]) {
  const rows = values
    .map((v) => ({ rank: stageRank(v.label), group: stageGroup(v.label), m: measure(v.value), label: v.label }))
    .filter((r): r is { rank: number; group: string; m: Measure; label: string } => r.rank !== null && r.m !== null);
  if (rows.length < 2) return null;

  const unit = rows[0].m.unit;
  const same = rows.filter((r) => r.m.unit.toLowerCase() === unit.toLowerCase());
  if (same.length < 2) return null;

  const groups = new Map<string, { rank: number; n: number }[]>();
  for (const row of same) {
    const key = row.group || "Tightening stages";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push({ rank: row.rank, n: row.m.n });
  }
  for (const list of groups.values()) list.sort((a, b) => a.rank - b.rank);
  // A single stage is not a progression.
  const usable = [...groups.entries()].filter(([, list]) => list.length >= 2).slice(0, 2);
  if (!usable.length) return null;
  return { unit, groups: usable };
}

function parseCapacities(values: SpecValue[]) {
  const rows = values
    .map((v) => ({ label: v.label, m: measure(v.value) }))
    .filter((r): r is { label: string; m: Measure } => r.m !== null);
  if (rows.length < 2) return null;

  // Use the most common unit so a stray "SAE 0W-20" row cannot join the chart.
  const counts = new Map<string, number>();
  for (const row of rows) counts.set(row.m.unit, (counts.get(row.m.unit) ?? 0) + 1);
  const [unit, count] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  if (count < 2) return null;

  const bars = rows.filter((r) => r.m.unit === unit).slice(0, 5);
  if (bars.length < 2) return null;
  if (bars.every((b) => b.m.n === bars[0].m.n)) return null; // nothing to compare
  return { unit, bars };
}

/**
 * Several builders fill `diagram.points` with table-row indices
 * (`values.map((_, i) => String(i + 1))`) rather than real positions, which
 * produces a sequential 1..N run. A genuine lug or firing order is a
 * permutation of 1..N; a lug order is additionally never sequential, because
 * the whole point is to cross the wheel. Anything sequential is treated as a
 * row index and refused, so we never draw a 4-lug wheel for a 6-lug truck.
 */
function permutationOf(points: string[]): number[] | null {
  const nums = points.map((p) => Number(p.trim()));
  if (nums.some((n) => !Number.isInteger(n) || n < 1)) return null;
  const sorted = [...nums].sort((a, b) => a - b);
  const isPermutation = sorted.every((n, i) => n === i + 1);
  return isPermutation ? nums : null;
}

const isSequential = (nums: number[]) => nums.every((n, i) => n === i + 1);

/** Lug counts that exist on the vehicles this site covers. */
const LUG_COUNTS = new Set([4, 5, 6, 8, 10]);

/** Cylinder banks stated in the spec table, e.g. "Driver-side bank" = "1-3-5-7". */
function parseBanks(values: SpecValue[]): string[][] | null {
  const rows = values.filter(
    (v) => /\bbank\b/i.test(v.label) && /^\d+(?:\s*-\s*\d+)+$/.test(v.value.trim()),
  );
  if (rows.length !== 2) return null;
  return rows.map((r) => r.value.split(/\s*-\s*/).map((s) => s.trim()));
}

/* --------------------------------------------------------------- drawing  */

function frame(title: string, desc: string, body: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="dTitle dDesc" preserveAspectRatio="xMidYMid meet"><title id="dTitle">${esc(title)}</title><desc id="dDesc">${esc(desc)}</desc><defs><pattern id="g" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="${C.grid}" stroke-width="1"/></pattern></defs><rect width="${W}" height="${H}" fill="${C.bg}"/><rect width="${W}" height="${H}" fill="url(#g)"/>${body}</svg>`;
}

const label = (x: number, y: number, text: string, size = 10, fill = C.muted, anchor = "middle", weight = 700) =>
  `<text x="${round(x)}" y="${round(y)}" fill="${fill}" font-family="${MONO}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="1">${esc(text)}</text>`;

const node = (x: number, y: number, text: string, r = 21, accent = false) =>
  `<g><circle cx="${round(x)}" cy="${round(y)}" r="${r}" fill="${accent ? "#42200c" : C.panel}" stroke="${accent ? C.orange : "#466170"}" stroke-width="2"/><text x="${round(x)}" y="${round(y + 5)}" fill="${accent ? "#fff" : C.blue}" font-family="${MONO}" font-size="${r > 18 ? 15 : 12}" font-weight="800" text-anchor="middle">${esc(text)}</text></g>`;

/**
 * Circular bolt pattern: N evenly spaced fasteners with the source's crossing
 * tightening order drawn across them.
 *
 * `order[i]` is the fastener tightened at step i+1, so fastener number s sits
 * at ring position s-1 and the path follows `order`, not the ring. Drawing the
 * ring order instead would produce a polygon and quietly misrepresent the
 * entire point of a crisscross sequence.
 */
function drawCircularPattern(order: number[], variant: "wheel" | "flange", caption: string) {
  const n = order.length;
  const cx = W / 2;
  const cy = 178;
  const R = 104;
  const at = (stud: number) => {
    const a = -Math.PI / 2 + ((stud - 1) * 2 * Math.PI) / n;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  };
  const path = order
    .map((stud, i) => {
      const p = at(stud);
      return `${i ? "L" : "M"}${round(p.x)} ${round(p.y)}`;
    })
    .join(" ");
  const studs = Array.from({ length: n }, (_, i) => i + 1)
    .map((stud) => {
      const p = at(stud);
      return node(p.x, p.y, String(stud), 20, stud === order[0]);
    })
    .join("");

  const heading = variant === "wheel" ? `${n}-LUG TIGHTENING PATTERN` : `${n}-BOLT CRISSCROSS PATTERN`;
  const body =
    variant === "wheel"
      ? `<circle cx="${cx}" cy="${cy}" r="140" fill="none" stroke="${C.line}" stroke-width="2"/>
<circle cx="${cx}" cy="${cy}" r="126" fill="none" stroke="#2a373d" stroke-width="12"/>
<circle cx="${cx}" cy="${cy}" r="44" fill="#0d161a" stroke="#35464e" stroke-width="2"/>`
      : `<circle cx="${cx}" cy="${cy}" r="132" fill="none" stroke="${C.line}" stroke-width="2"/>
<circle cx="${cx}" cy="${cy}" r="46" fill="#0d161a" stroke="#35464e" stroke-width="2"/>`;

  return frame(
    variant === "wheel" ? `${n}-lug tightening pattern` : `${n}-bolt crisscross pattern`,
    caption,
    `${label(cx, 34, heading, 11, C.orange)}
${body}
<path d="${path}" fill="none" stroke="${C.orange}" stroke-width="1.6" stroke-dasharray="5 4" opacity="0.8"/>
${studs}
${label(cx, cy + 4, variant === "wheel" ? "HUB" : "FLANGE", 9, C.muted)}
${label(cx, H - 30, `TIGHTEN IN THIS ORDER · ${order.join(" → ")}`, 10, C.dim)}
${label(cx, H - 14, "Fastener numbers are positions on the circle, not a physical index mark", 8, C.muted)}`,
  );
}

/** Two physical cylinder rows, only drawn when a source established them. */
function drawBanks(banks: string[][], order: string[], engineLabel: string, caption: string) {
  const rowY = [128, 236];
  const rows = banks
    .map((bank, r) => {
      const gap = Math.min(74, 460 / Math.max(bank.length, 1));
      const startX = W / 2 - ((bank.length - 1) * gap) / 2;
      return bank
        .map((cyl, i) => node(startX + i * gap, rowY[r], cyl, 22, order[0] === cyl))
        .join("");
    })
    .join("");
  return frame(
    `${engineLabel} cylinder numbering and firing order`,
    caption,
    `${label(W / 2, 34, "PHYSICAL CYLINDER NUMBERING", 11, C.orange)}
${label(W / 2, 54, "FRONT OF ENGINE AT LEFT", 9, C.muted)}
<rect x="86" y="96" width="${W - 172}" height="176" rx="16" fill="rgba(16,27,33,.7)" stroke="${C.line}" stroke-width="2"/>
<line x1="86" y1="182" x2="${W - 86}" y2="182" stroke="#2a373d" stroke-width="1" stroke-dasharray="4 4"/>
${rows}
${label(W / 2, 330, `FIRING ORDER · ${order.join("-")}`, 11, C.orange)}
${label(W / 2, 348, "Numbering is physical; the firing order is the ignition sequence", 8, C.dim)}`,
  );
}

/**
 * Firing order with no source-established bank layout: draw it as a ring of
 * ignition events, which is what the data actually establishes.
 */
function drawSequence(order: string[], engineLabel: string, caption: string) {
  const n = order.length;
  const cx = W / 2;
  const cy = 186;
  const R = 96;
  const at = (i: number) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  };
  const arcs = order
    .map((_, i) => {
      const from = at(i);
      const to = at((i + 1) % n);
      const mx = (from.x + to.x) / 2;
      const my = (from.y + to.y) / 2;
      const k = 0.16;
      return `<path d="M${round(from.x)} ${round(from.y)} Q${round(mx + (my - cy) * k)} ${round(my - (mx - cx) * k)} ${round(to.x)} ${round(to.y)}" fill="none" stroke="#2f4550" stroke-width="1.5"/>`;
    })
    .join("");
  const nodes = order.map((cyl, i) => node(at(i).x, at(i).y, cyl, 21, i === 0)).join("");
  return frame(
    `${engineLabel} firing sequence`,
    caption,
    `${label(cx, 34, "FIRING SEQUENCE", 11, C.orange)}
${label(cx, 52, "IGNITION ORDER — NOT A PHYSICAL BANK LAYOUT", 8, C.muted)}
${arcs}${nodes}
${label(cx, cy - 6, "ORDER", 8, C.muted)}
${label(cx, cy + 12, String(n) + " CYL", 12, C.text)}
${label(cx, H - 16, order.join("  →  "), 11, C.orange)}`,
  );
}

/** Staged torque progression parsed from the spec table. */
function drawStages(
  data: { unit: string; groups: [string, { rank: number; n: number }[]][] },
  caption: string,
) {
  const padL = 74;
  const padR = 34;
  const top = 86;
  const bottom = 286;
  const max = Math.max(...data.groups.flatMap(([, list]) => list.map((s) => s.n)));
  const steps = Math.max(...data.groups.map(([, list]) => list.length));
  const stepX = (W - padL - padR) / Math.max(steps - 1, 1);
  const y = (n: number) => bottom - (n / max) * (bottom - top);
  const colors = [C.orange, C.blue];

  const gridLines = [0, 0.25, 0.5, 0.75, 1]
    .map((f) => {
      const gy = bottom - f * (bottom - top);
      return `<line x1="${padL}" y1="${round(gy)}" x2="${W - padR}" y2="${round(gy)}" stroke="#223037" stroke-width="1"/>${label(padL - 10, round(gy) + 4, String(Math.round(max * f)), 9, C.muted, "end")}`;
    })
    .join("");

  const series = data.groups
    .map(([name, list], gi) => {
      const pts = list.map((s, i) => ({ x: padL + i * stepX, y: y(s.n), n: s.n }));
      const line = pts.map((p, i) => `${i ? "L" : "M"}${round(p.x)} ${round(p.y)}`).join(" ");
      const dots = pts
        .map((p, i) => {
          // Two series can sit close enough that their value labels collide;
          // the second series labels below its point instead of above.
          const other = data.groups[1 - gi]?.[1]?.[i];
          const collides = other !== undefined && Math.abs(y(other.n) - p.y) < 22;
          const dy = gi === 1 && collides ? 20 : -14;
          return `<circle cx="${round(p.x)}" cy="${round(p.y)}" r="6" fill="${C.bg}" stroke="${colors[gi]}" stroke-width="2.5"/>${label(p.x, p.y + dy, String(p.n), 11, colors[gi])}`;
        })
        .join("");
      const key = `<g><rect x="${padL + gi * 210}" y="${H - 30}" width="10" height="10" fill="${colors[gi]}"/>${label(padL + gi * 210 + 16, H - 21, name.slice(0, 26).toUpperCase(), 9, C.dim, "start")}</g>`;
      return `<path d="${line}" fill="none" stroke="${colors[gi]}" stroke-width="2.5" stroke-linejoin="round"/>${dots}${data.groups.length > 1 ? key : ""}`;
    })
    .join("");

  const stepLabels = Array.from({ length: steps }, (_, i) =>
    label(padL + i * stepX, bottom + 22, i === steps - 1 ? "FINAL" : `PASS ${i + 1}`, 9, C.muted),
  ).join("");

  return frame(
    "Staged torque progression",
    caption,
    `${label(W / 2, 34, "STAGED TORQUE PROGRESSION", 11, C.orange)}
${label(W / 2, 52, `VALUES IN ${data.unit.toUpperCase()} — COMPLETE EACH PASS IN SEQUENCE BEFORE THE NEXT`, 8, C.muted)}
${gridLines}
<line x1="${padL}" y1="${top}" x2="${padL}" y2="${bottom}" stroke="${C.line}" stroke-width="1.5"/>
${series}${stepLabels}`,
  );
}

/** Comparable quantities parsed from the spec table. */
function drawCapacity(data: { unit: string; bars: { label: string; m: Measure }[] }, caption: string) {
  const padL = 200;
  // Reserve room for the value label that sits at the end of the longest bar,
  // otherwise it runs off the viewBox.
  const padR = 34 + Math.max(64, `${Math.max(...data.bars.map((b) => b.m.n))} ${data.unit}`.length * 7);
  const top = 84;
  const max = Math.max(...data.bars.map((b) => b.m.n));
  const rowH = Math.min(44, (286 - top) / data.bars.length);
  const barW = W - padL - padR;
  const rows = data.bars
    .map((b, i) => {
      const y = top + i * rowH;
      const w = (b.m.n / max) * barW;
      const name = b.label.length > 30 ? `${b.label.slice(0, 29)}…` : b.label;
      return `${label(padL - 12, y + rowH / 2 + 4, name, 9, C.dim, "end", 600)}
<rect x="${padL}" y="${round(y + rowH / 2 - 9)}" width="${round(Math.max(w, 2))}" height="18" rx="3" fill="${i === 0 ? C.orange : "#226aa0"}"/>
${label(padL + Math.max(w, 2) + 8, y + rowH / 2 + 5, `${b.m.n} ${data.unit}`, 11, i === 0 ? C.orange : C.blue, "start", 800)}`;
    })
    .join("");
  return frame(
    "Published quantities compared",
    caption,
    `${label(W / 2, 34, "PUBLISHED QUANTITIES COMPARED", 11, C.orange)}
${label(W / 2, 52, `ALL VALUES IN ${data.unit.toUpperCase()} — CONFIRM THE ROW THAT MATCHES YOUR VEHICLE`, 8, C.muted)}
${rows}
<line x1="${padL}" y1="${top - 6}" x2="${padL}" y2="${round(top + data.bars.length * rowH)}" stroke="${C.line}" stroke-width="1.5"/>
${label(W / 2, H - 16, "Bar length compares published figures only; it is not a fill instruction", 8, C.dim)}`,
  );
}

/** Real fastener coordinates, when a manufacturer figure established them. */
function drawPositions(
  positions: { label: string; x: number; y: number }[],
  orientation: string,
  caption: string,
) {
  const padX = 70;
  const padY = 92;
  const innerW = W - padX * 2;
  const innerH = 200;
  const dots = positions
    .map((p, i) =>
      node(padX + (p.x / 100) * innerW, padY + (p.y / 100) * innerH, p.label, 17, i === 0),
    )
    .join("");
  return frame(
    "Fastener location map",
    caption,
    `${label(W / 2, 34, "FASTENER LOCATION MAP", 11, C.orange)}
${label(W / 2, 52, orientation.toUpperCase(), 9, C.muted)}
<rect x="${padX - 26}" y="${padY - 32}" width="${innerW + 52}" height="${innerH + 64}" rx="26" fill="rgba(16,27,33,.72)" stroke="${C.line}" stroke-width="2"/>
${dots}
${label(W / 2, H - 16, "Positions follow the cited manufacturer figure", 8, C.dim)}`,
  );
}

/* ------------------------------------------------------------------ entry */

export function buildDiagramSvg(spec: SpecRecord): SpecDiagram | null {
  const d = spec.diagram;
  const caption = `${spec.title} — ${spec.make} ${spec.model}`;
  const engineLabel = d.engineLabel ?? spec.model;

  // 1. Real coordinates from a manufacturer figure.
  if (d.positions?.length) {
    return {
      svg: drawPositions(d.positions, d.orientation ?? "Front of engine at left", caption),
      alt: `${spec.title}: fastener location map showing ${d.positions.length} numbered positions in tightening order.`,
      kind: "positions",
    };
  }

  // 2. Circular bolt pattern — geometry, not an engine-specific claim.
  //    Requires a real non-sequential tightening order, so row-index points
  //    are refused. Flywheel/flexplate records also use type "wheel", so the
  //    drawing is labelled for the component it actually describes.
  if (d.type === "wheel") {
    const order = permutationOf(d.points);
    const flange = /flywheel|flexplate|flex plate|crank flange|pressure plate|clutch/i.test(
      `${spec.title} ${spec.keyword}`,
    );
    const validCount = flange ? order && order.length >= 4 && order.length <= 12 : order && LUG_COUNTS.has(order.length);
    if (order && validCount && !isSequential(order)) {
      return {
        svg: drawCircularPattern(order, flange ? "flange" : "wheel", caption),
        alt: flange
          ? `${spec.title}: ${order.length}-bolt crisscross tightening order ${order.join("-")}.`
          : `${spec.title}: ${order.length}-lug wheel showing the opposite-side tightening order ${order.join("-")}.`,
        kind: flange ? "flange" : "wheel",
      };
    }
  }

  // 3. Firing order, with physical banks only where a source established them.
  if (d.type === "firing" && d.points.length >= 3 && permutationOf(d.points)) {
    const banks = d.banks?.length === 2 ? d.banks : parseBanks(spec.values);
    if (banks) {
      return {
        svg: drawBanks(banks, d.points, engineLabel, caption),
        alt: `${spec.title}: cylinder numbering by bank with firing order ${d.points.join("-")}.`,
        kind: "banks",
      };
    }
    return {
      svg: drawSequence(d.points, engineLabel, caption),
      alt: `${spec.title}: firing sequence ${d.points.join("-")} shown as an ignition order ring.`,
      kind: "sequence",
    };
  }

  // 4. Staged torque values from the spec table.
  const stages = parseStages(spec.values);
  if (stages) {
    return {
      svg: drawStages(stages, caption),
      alt: `${spec.title}: staged torque progression in ${stages.unit}.`,
      kind: "stages",
    };
  }

  // 5. Comparable published quantities.
  const capacity = parseCapacities(spec.values);
  if (capacity) {
    return {
      svg: drawCapacity(capacity, caption),
      alt: `${spec.title}: published ${capacity.unit} figures compared across ${capacity.bars.length} applications.`,
      kind: "capacity",
    };
  }

  return null;
}
