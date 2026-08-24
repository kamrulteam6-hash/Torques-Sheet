/**
 * Bolt pattern (PCD) arithmetic and compatibility.
 *
 * A bolt pattern is a lug count plus the diameter of the circle their centres
 * sit on. The complication is that the same pattern is quoted in millimetres in
 * one catalogue and inches in another, and that two patterns can be close
 * enough to bolt together while still being wrong.
 */

const MM_PER_INCH = 25.4;

export type BoltPattern = {
  lugs: number;
  /** Pitch circle diameter in millimetres. */
  pcdMm: number;
  pcdIn: number;
  /** Straight-line distance between two adjacent stud centres, millimetres. */
  chordMm: number;
  /** Conventional label, e.g. "5x114.3". */
  label: string;
  /** Imperial label, e.g. "5x4.5". */
  labelIn: string;
};

/** Chord between adjacent studs: PCD × sin(180° ÷ lugs). */
export const chordFor = (pcdMm: number, lugs: number) =>
  lugs >= 2 ? pcdMm * Math.sin(Math.PI / lugs) : 0;

/** PCD implied by an adjacent-stud measurement. */
export const pcdFromChord = (chordMm: number, lugs: number) =>
  lugs >= 2 ? chordMm / Math.sin(Math.PI / lugs) : 0;

const round1 = (value: number) => Math.round(value * 10) / 10;
const round2 = (value: number) => Math.round(value * 100) / 100;

export function boltPattern(lugs: number, pcdMm: number): BoltPattern {
  return {
    lugs,
    pcdMm,
    pcdIn: pcdMm / MM_PER_INCH,
    chordMm: chordFor(pcdMm, lugs),
    label: `${lugs}x${round1(pcdMm)}`,
    labelIn: `${lugs}x${round2(pcdMm / MM_PER_INCH)}`,
  };
}

/**
 * Patterns that actually exist, with the vehicles that use them.
 *
 * Kept deliberately short and factual. The purpose is to let someone recognise
 * their own pattern and see what else shares it, not to be an exhaustive
 * fitment database — a wheel also has to clear the brakes, match the centre
 * bore and carry the right offset.
 */
export const COMMON_PATTERNS: { lugs: number; pcdMm: number; used: string }[] = [
  { lugs: 4, pcdMm: 100, used: "Honda Civic, Toyota Yaris, Mini, VW Polo" },
  { lugs: 4, pcdMm: 108, used: "Ford Fiesta, Focus (older), Peugeot, Citroën" },
  { lugs: 4, pcdMm: 114.3, used: "Nissan Sentra, older Mazda, Hyundai Accent" },
  { lugs: 5, pcdMm: 100, used: "Subaru Impreza (older), VW Golf Mk4, Toyota Prius" },
  { lugs: 5, pcdMm: 108, used: "Ford Focus, Fusion, Volvo, Jaguar, Land Rover" },
  { lugs: 5, pcdMm: 110, used: "Chevrolet Malibu, Equinox, Saab, Alfa Romeo" },
  { lugs: 5, pcdMm: 112, used: "Audi, Mercedes-Benz, VW MQB platform" },
  { lugs: 5, pcdMm: 114.3, used: "Ford Mustang, Explorer, Camry, Accord, Jeep Cherokee" },
  { lugs: 5, pcdMm: 115, used: "Chevrolet Impala, Malibu (older), Buick" },
  { lugs: 5, pcdMm: 120, used: "BMW (most), Chevrolet Colorado, Acura MDX" },
  { lugs: 5, pcdMm: 120.7, used: "Chevrolet Corvette (C5/C6), older GM" },
  { lugs: 5, pcdMm: 127, used: "Jeep Wrangler JK, Grand Cherokee, Chevrolet Camaro (older)" },
  { lugs: 5, pcdMm: 130, used: "Porsche 911, Cayenne, VW Touareg, Audi Q7" },
  { lugs: 5, pcdMm: 139.7, used: "Jeep Wrangler TJ/YJ, Ford Ranger, Toyota Tacoma (older)" },
  { lugs: 5, pcdMm: 150, used: "Toyota Tundra, Land Cruiser, Lexus LX" },
  { lugs: 6, pcdMm: 114.3, used: "Nissan Frontier, Titan, Chevrolet Colorado (older)" },
  { lugs: 6, pcdMm: 120, used: "Chevrolet Colorado, Canyon, Trailblazer" },
  { lugs: 6, pcdMm: 132, used: "Chevrolet Astro, Safari, older GM vans" },
  { lugs: 6, pcdMm: 135, used: "Ford F-150 (2004–2014), Expedition" },
  { lugs: 6, pcdMm: 139.7, used: "Toyota Tacoma, 4Runner, Chevrolet Silverado 1500 (older)" },
  { lugs: 7, pcdMm: 150, used: "Chevrolet Silverado 1500 (2019 on), Sierra 1500" },
  { lugs: 8, pcdMm: 165.1, used: "Chevrolet Silverado 2500, Ram 2500 (older)" },
  { lugs: 8, pcdMm: 170, used: "Ford F-250, F-350 (2005 on)" },
  { lugs: 8, pcdMm: 180, used: "Chevrolet Silverado 2500/3500 (2011 on)" },
  { lugs: 8, pcdMm: 200, used: "Ram 2500/3500 (2003 on)" },
];

export type PatternMatch = {
  pattern: BoltPattern;
  used: string;
  /** Difference in PCD, millimetres. */
  diffMm: number;
  /**
   * Interchangeable in practice. Under about 0.5 mm the studs line up within
   * normal manufacturing tolerance.
   */
  interchangeable: boolean;
  /**
   * Close enough that a wheel will start onto the studs while pulling them out
   * of true. This is the dangerous category, not the useful one.
   */
  deceptivelyClose: boolean;
};

/**
 * Finds patterns with the same lug count and a similar PCD.
 *
 * The distinction that matters is between genuinely equivalent patterns —
 * 5x114.3 and 5x4.5 are the same circle written in two units — and patterns
 * close enough to thread on while seating the wheel off-centre. The second kind
 * is why "it bolted up" is not evidence that a wheel fits.
 *
 * The deceptive-difference window is capped well below the full search window.
 * Stud clearance holes typically run only 1-2 mm oversized, so a PCD more than
 * about 3 mm off will bind on at least one stud before it goes on far enough to
 * look like a fit — it is a mismatch you would notice, not a trap. The wider
 * search window still surfaces those rows, but labelled as simply incompatible
 * rather than as the dangerous near-miss they are not.
 */
export function nearbyPatterns(lugs: number, pcdMm: number, windowMm = 6): PatternMatch[] {
  return COMMON_PATTERNS.filter(
    (entry) => entry.lugs === lugs && Math.abs(entry.pcdMm - pcdMm) <= windowMm,
  )
    .map((entry) => {
      const diffMm = entry.pcdMm - pcdMm;
      const magnitude = Math.abs(diffMm);
      return {
        pattern: boltPattern(entry.lugs, entry.pcdMm),
        used: entry.used,
        diffMm,
        interchangeable: magnitude <= 0.5,
        deceptivelyClose: magnitude > 0.5 && magnitude <= 3,
      };
    })
    .sort((a, b) => Math.abs(a.diffMm) - Math.abs(b.diffMm));
}

/** Well-known equivalent pairs, where the same circle is quoted in two units. */
export const UNIT_EQUIVALENTS: { mm: string; inch: string; note: string }[] = [
  { mm: "4x100", inch: "4x3.94", note: "Common on small front-wheel-drive cars" },
  { mm: "5x114.3", inch: "5x4.5", note: "The most widespread five-lug pattern in North America" },
  { mm: "5x120.7", inch: "5x4.75", note: "Long-standing GM pattern" },
  { mm: "5x127", inch: "5x5", note: "Jeep and older GM" },
  { mm: "5x139.7", inch: "5x5.5", note: "Light trucks and older four-wheel drives" },
  { mm: "6x139.7", inch: "6x5.5", note: "Mid-size and older full-size trucks" },
  { mm: "8x165.1", inch: "8x6.5", note: "Heavy-duty trucks" },
];
