import { measure, parseTireSize } from "../tire-math";

/**
 * Curated comparison pairs for the programmatic routes.
 *
 * These are generated from segment lists rather than by brute force. A full
 * cross-product would produce tens of thousands of combinations, most of them
 * pairings nobody would ever consider — a 195/65R15 against a 35x12.50R20 is
 * arithmetic, not a question anyone asks. Pairing inside a segment, and only
 * where the sizes are meaningfully but plausibly different, keeps every
 * generated page a comparison somebody might actually be weighing up.
 */

type Segment = { key: string; label: string; sizes: string[] };

const SEGMENTS: Segment[] = [
  {
    key: "passenger",
    label: "Passenger car",
    sizes: [
      "195/65R15",
      "205/55R16",
      "205/60R16",
      "215/60R16",
      "215/55R17",
      "225/45R17",
      "225/50R17",
      "235/45R17",
      "235/40R18",
      "245/40R18",
    ],
  },
  {
    key: "crossover",
    label: "SUV and crossover",
    sizes: [
      "225/65R17",
      "235/65R17",
      "235/60R18",
      "245/60R18",
      "235/55R19",
      "245/55R19",
      "255/50R20",
      "245/50R20",
      "265/50R20",
    ],
  },
  {
    key: "truck",
    label: "Light truck",
    sizes: [
      "245/70R17",
      "255/75R17",
      "265/70R17",
      "285/70R17",
      "275/70R18",
      "275/65R18",
      "285/65R18",
      "275/60R20",
      "285/60R20",
      "305/55R20",
      "275/55R20",
    ],
  },
  {
    key: "flotation",
    label: "Flotation and off-road",
    sizes: [
      "31X10.50R15",
      "33X12.50R15",
      "32X11.50R17",
      "33X12.50R17",
      "35X12.50R17",
      "35X12.50R20",
      "37X12.50R17",
      "285/70R17",
      "315/70R17",
      "275/70R18",
    ],
  },
];

export type ComparisonPair = { from: string; to: string; segment: string };

const key = (a: string, b: string) => `${a}|${b}`;

const build = (): ComparisonPair[] => {
  const pairs: ComparisonPair[] = [];
  const seen = new Set<string>();

  for (const segment of SEGMENTS) {
    for (let i = 0; i < segment.sizes.length; i++) {
      for (let j = 0; j < segment.sizes.length; j++) {
        if (i === j) continue;
        const from = segment.sizes[i];
        const to = segment.sizes[j];
        // One direction only. Both are searched, but publishing each pairing
        // twice would be the same calculation under two URLs.
        if (seen.has(key(to, from)) || seen.has(key(from, to))) continue;

        const a = measure(from);
        const b = measure(to);
        if (!a || !b) continue;

        const pct = Math.abs(((b.diameter - a.diameter) / a.diameter) * 100);
        // Below 0.3% the two sizes are effectively identical; above 14% nobody
        // is choosing between them without other changes to the vehicle.
        if (pct < 0.3 || pct > 14) continue;

        seen.add(key(from, to));
        pairs.push({ from, to, segment: segment.key });
      }
    }
  }
  return pairs;
};

export const COMPARISON_PAIRS = build();

export const pairSlug = (pair: ComparisonPair) =>
  `${pair.from.toLowerCase().replace(/\//g, "-")}-vs-${pair.to.toLowerCase().replace(/\//g, "-")}`;

export const comparisonPairPath = (pair: ComparisonPair) =>
  `/tools/tire-size-comparison/${pairSlug(pair)}`;

/** Resolve a URL slug back into two sizes. Returns null for anything unparseable. */
export function parsePairSlug(slug: string) {
  const halves = slug.toLowerCase().split("-vs-");
  if (halves.length !== 2) return null;
  const from = parseTireSize(halves[0].replace(/-/g, "/"));
  const to = parseTireSize(halves[1].replace(/-/g, "/"));
  if (!from || !to) return null;
  return { from, to };
}

export const segmentLabel = (key: string) =>
  SEGMENTS.find((segment) => segment.key === key)?.label ?? "Tire";

/** Other published comparisons sharing a size with this one. */
export function relatedPairs(pair: ComparisonPair, limit = 6) {
  return COMPARISON_PAIRS.filter(
    (item) =>
      item !== pair &&
      (item.from === pair.from ||
        item.to === pair.to ||
        item.from === pair.to ||
        item.to === pair.from),
  ).slice(0, limit);
}
