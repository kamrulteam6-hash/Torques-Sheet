/**
 * Tire identification arithmetic: load index, speed rating, DOT date codes
 * and size notation conversion. Dependency-free, like the other maths
 * modules.
 */

/* -------------------------------------------------------------- load index */

/**
 * The full published load index table, index 60 through 126. This is a
 * standards table (ETRTO/TRA), not a formula — the relationship between
 * index number and load capacity is not linear or exponential in a way
 * worth approximating, so the values are reproduced directly.
 */
export const LOAD_INDEX_TABLE: { index: number; kg: number; lbs: number }[] = [
  { index: 60, kg: 250, lbs: 551 }, { index: 61, kg: 257, lbs: 567 }, { index: 62, kg: 265, lbs: 584 },
  { index: 63, kg: 272, lbs: 600 }, { index: 64, kg: 280, lbs: 617 }, { index: 65, kg: 290, lbs: 639 },
  { index: 66, kg: 300, lbs: 661 }, { index: 67, kg: 307, lbs: 677 }, { index: 68, kg: 315, lbs: 694 },
  { index: 69, kg: 325, lbs: 716 }, { index: 70, kg: 335, lbs: 739 }, { index: 71, kg: 345, lbs: 761 },
  { index: 72, kg: 355, lbs: 783 }, { index: 73, kg: 365, lbs: 805 }, { index: 74, kg: 375, lbs: 827 },
  { index: 75, kg: 386, lbs: 852 }, { index: 76, kg: 400, lbs: 882 }, { index: 77, kg: 412, lbs: 908 },
  { index: 78, kg: 425, lbs: 937 }, { index: 79, kg: 437, lbs: 963 }, { index: 80, kg: 450, lbs: 992 },
  { index: 81, kg: 462, lbs: 1019 }, { index: 82, kg: 475, lbs: 1047 }, { index: 83, kg: 487, lbs: 1074 },
  { index: 84, kg: 500, lbs: 1102 }, { index: 85, kg: 515, lbs: 1135 }, { index: 86, kg: 530, lbs: 1168 },
  { index: 87, kg: 545, lbs: 1201 }, { index: 88, kg: 560, lbs: 1235 }, { index: 89, kg: 580, lbs: 1279 },
  { index: 90, kg: 600, lbs: 1323 }, { index: 91, kg: 615, lbs: 1356 }, { index: 92, kg: 630, lbs: 1389 },
  { index: 93, kg: 650, lbs: 1433 }, { index: 94, kg: 670, lbs: 1477 }, { index: 95, kg: 690, lbs: 1521 },
  { index: 96, kg: 710, lbs: 1565 }, { index: 97, kg: 730, lbs: 1609 }, { index: 98, kg: 750, lbs: 1653 },
  { index: 99, kg: 775, lbs: 1709 }, { index: 100, kg: 800, lbs: 1764 }, { index: 101, kg: 825, lbs: 1819 },
  { index: 102, kg: 850, lbs: 1874 }, { index: 103, kg: 875, lbs: 1929 }, { index: 104, kg: 900, lbs: 1984 },
  { index: 105, kg: 925, lbs: 2039 }, { index: 106, kg: 950, lbs: 2094 }, { index: 107, kg: 975, lbs: 2149 },
  { index: 108, kg: 1000, lbs: 2205 }, { index: 109, kg: 1030, lbs: 2271 }, { index: 110, kg: 1060, lbs: 2337 },
  { index: 111, kg: 1090, lbs: 2403 }, { index: 112, kg: 1120, lbs: 2469 }, { index: 113, kg: 1150, lbs: 2535 },
  { index: 114, kg: 1180, lbs: 2601 }, { index: 115, kg: 1215, lbs: 2679 }, { index: 116, kg: 1250, lbs: 2756 },
  { index: 117, kg: 1285, lbs: 2833 }, { index: 118, kg: 1320, lbs: 2910 }, { index: 119, kg: 1360, lbs: 2998 },
  { index: 120, kg: 1400, lbs: 3086 }, { index: 121, kg: 1450, lbs: 3197 }, { index: 122, kg: 1500, lbs: 3307 },
  { index: 123, kg: 1550, lbs: 3417 }, { index: 124, kg: 1600, lbs: 3527 }, { index: 125, kg: 1650, lbs: 3638 },
  { index: 126, kg: 1700, lbs: 3748 },
];

export function loadIndexCapacity(index: number) {
  return LOAD_INDEX_TABLE.find((row) => row.index === index) ?? null;
}

/** Nearest table entry at or above a target load capacity in lbs — the minimum index that will carry it. */
export function loadIndexForCapacityLbs(targetLbs: number) {
  return LOAD_INDEX_TABLE.find((row) => row.lbs >= targetLbs) ?? LOAD_INDEX_TABLE[LOAD_INDEX_TABLE.length - 1];
}

/* ------------------------------------------------------------ speed rating */

/**
 * Standard speed symbols. Defined by km/h in the ISO/ETRTO standard; mph is
 * derived from that, which is why these mph figures land on the odd numbers
 * (74.6 -> 75, 111.8 -> 112) published tables always show rather than round
 * figures.
 */
export const SPEED_RATINGS: { symbol: string; kmh: number; mph: number }[] = [
  { symbol: "L", kmh: 120, mph: 75 },
  { symbol: "M", kmh: 130, mph: 81 },
  { symbol: "N", kmh: 140, mph: 87 },
  { symbol: "P", kmh: 150, mph: 94 },
  { symbol: "Q", kmh: 160, mph: 100 },
  { symbol: "R", kmh: 170, mph: 106 },
  { symbol: "S", kmh: 180, mph: 112 },
  { symbol: "T", kmh: 190, mph: 118 },
  { symbol: "U", kmh: 200, mph: 124 },
  { symbol: "H", kmh: 210, mph: 130 },
  { symbol: "V", kmh: 240, mph: 149 },
  { symbol: "W", kmh: 270, mph: 168 },
  { symbol: "Y", kmh: 300, mph: 186 },
];

export function speedRating(symbol: string) {
  return SPEED_RATINGS.find((row) => row.symbol === symbol.toUpperCase()) ?? null;
}

/* ---------------------------------------------------------------- DOT date */

export type DotDate = {
  week: number;
  year: number;
  fullYear: number;
  manufactureDate: Date;
  ageYears: number;
  ageMonths: number;
};

/**
 * Decodes the last four digits of a DOT tire identification number: two
 * digits for the week of manufacture, two for the year. This format has been
 * standard since the year 2000 — a three-digit code (week + single year
 * digit) was used before that and is ambiguous by decade, which is why this
 * only handles the modern four-digit format.
 */
export function decodeDotDate(code: string, referenceDate: Date = new Date()): DotDate | null {
  const digits = code.replace(/\D/g, "");
  const four = digits.slice(-4);
  if (four.length !== 4) return null;
  const week = Number(four.slice(0, 2));
  const yearDigits = Number(four.slice(2, 4));
  if (week < 1 || week > 53 || Number.isNaN(yearDigits)) return null;
  const fullYear = 2000 + yearDigits;
  // Approximate the manufacture date as the Monday of that ISO-ish week.
  const manufactureDate = new Date(Date.UTC(fullYear, 0, 1 + (week - 1) * 7));
  const ms = referenceDate.getTime() - manufactureDate.getTime();
  const ageYears = ms / (1000 * 60 * 60 * 24 * 365.25);
  return {
    week,
    year: yearDigits,
    fullYear,
    manufactureDate,
    ageYears,
    ageMonths: ageYears * 12,
  };
}

export type TireAgeBand = "new" | "inspect" | "replace";

/**
 * Industry-consensus guidance: manufacturers generally recommend inspection
 * from around 6 years regardless of tread, and replacement by 10 years
 * regardless of use — because rubber compounds harden and lose elasticity
 * with age whether the tire is driven or sits in storage.
 */
export function tireAgeBand(ageYears: number): TireAgeBand {
  if (ageYears >= 10) return "replace";
  if (ageYears >= 6) return "inspect";
  return "new";
}

/* -------------------------------------------------------- aspect ratio */

/**
 * Aspect ratio from sidewall height and section width — the reverse of the
 * usual reading direction, useful when a sidewall is measured directly
 * rather than read off a size designation.
 */
export const aspectRatioFromDimensions = (sidewallMm: number, widthMm: number) =>
  widthMm > 0 ? (sidewallMm / widthMm) * 100 : 0;

/** Sidewall height a given width and aspect ratio implies. */
export const sidewallFromAspectRatio = (widthMm: number, aspectRatio: number) =>
  (widthMm * aspectRatio) / 100;
