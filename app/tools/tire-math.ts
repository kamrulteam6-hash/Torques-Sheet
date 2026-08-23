/**
 * Pure wheel-and-tire mathematics. No imports, no data files, no React — this
 * module is deliberately dependency-free so every client island can pull it in
 * without dragging the spec corpus across the server/client boundary.
 *
 * Every function here is exact arithmetic on the nominal size. Real tyres vary
 * from their marked size by a few millimetres depending on manufacturer, load
 * and pressure, which is why the pages that use these functions say so.
 */

export type TireSize = {
  /** Section width in millimetres (metric) or inches converted (flotation). */
  width: number;
  /** Aspect ratio as a percentage. Flotation sizes get a derived value. */
  aspect: number;
  /** Rim diameter in inches. */
  rim: number;
  /** Normalised label, e.g. "225/65R17" or "33X12.50R15". */
  label: string;
  /** True when parsed from a flotation size such as 33x12.50R15. */
  flotation: boolean;
};

export type TireGeometry = {
  size: TireSize;
  /** Overall diameter in inches. */
  diameter: number;
  /** Sidewall height in inches. */
  sidewall: number;
  /** Section width in inches. */
  sectionWidth: number;
  /** Rolling circumference in inches. */
  circumference: number;
  /** Revolutions per mile. */
  revsPerMile: number;
};

const MM_PER_INCH = 25.4;
const INCHES_PER_MILE = 63360;

/** Round to a fixed number of decimals without exposing float noise. */
export const round = (value: number, decimals = 2) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

/**
 * Accepts the forms people actually type: "225/65R17", "225 65 17",
 * "P225/65R17", "LT265/70R17", "225/65ZR17 94H" and flotation sizes like
 * "33x12.50R15". Returns null rather than throwing, because this runs on every
 * keystroke.
 */
export function parseTireSize(input: string): TireSize | null {
  const raw = input.trim().toUpperCase();
  if (!raw) return null;

  // Flotation: 33x12.50R15 — diameter in inches, width in inches, rim in inches.
  const flotation = raw.match(/^(\d{2}(?:\.\d)?)\s*X\s*(\d{1,2}(?:\.\d{1,2})?)\s*(?:R|-|\/)?\s*(\d{2}(?:\.\d)?)/);
  if (flotation) {
    const overall = Number(flotation[1]);
    const widthIn = Number(flotation[2]);
    const rim = Number(flotation[3]);
    if (!overall || !widthIn || !rim || overall <= rim) return null;
    const width = widthIn * MM_PER_INCH;
    // Derive the aspect ratio the flotation size implies, so downstream maths
    // can treat both notations identically.
    const aspect = (((overall - rim) / 2) * MM_PER_INCH * 100) / width;
    return {
      width,
      aspect,
      rim,
      label: `${flotation[1]}X${flotation[2]}R${flotation[3]}`,
      flotation: true,
    };
  }

  // Metric: optional service type, width/aspect, optional speed rating, rim.
  const metric = raw.match(/^(?:P|LT|ST|T)?\s*(\d{3})\s*[/\s-]\s*(\d{2,3})\s*(?:Z?R|[/\s-])\s*(\d{2}(?:\.\d)?)/);
  if (metric) {
    const width = Number(metric[1]);
    const aspect = Number(metric[2]);
    const rim = Number(metric[3]);
    if (width < 105 || width > 415) return null;
    if (aspect < 20 || aspect > 95) return null;
    if (rim < 8 || rim > 30) return null;
    return { width, aspect, rim, label: `${width}/${aspect}R${metric[3]}`, flotation: false };
  }

  return null;
}

/** Full geometry for a parsed size. */
export function tireGeometry(size: TireSize): TireGeometry {
  const sidewall = (size.width * (size.aspect / 100)) / MM_PER_INCH;
  const diameter = size.rim + sidewall * 2;
  const circumference = diameter * Math.PI;
  return {
    size,
    diameter,
    sidewall,
    sectionWidth: size.width / MM_PER_INCH,
    circumference,
    revsPerMile: INCHES_PER_MILE / circumference,
  };
}

/** Convenience: parse and measure in one step. */
export function measure(input: string): TireGeometry | null {
  const size = parseTireSize(input);
  return size ? tireGeometry(size) : null;
}

export type TireComparison = {
  from: TireGeometry;
  to: TireGeometry;
  /** Change in overall diameter, inches. Positive means the new tyre is taller. */
  diameterDiff: number;
  diameterPct: number;
  sidewallDiff: number;
  widthDiff: number;
  /** Ride-height change at the axle: half the diameter change. */
  clearanceDiff: number;
  revsDiff: number;
  /** True speed when the speedometer, calibrated for `from`, reads 60 mph. */
  actualAt60: number;
  /** Speedometer error as a percentage. Positive means the speedo under-reads. */
  speedoErrorPct: number;
  /** Odometer drift in miles per indicated 1,000 miles. */
  odometerDriftPer1000: number;
  /** Within the ±3% envelope generally treated as an acceptable substitution. */
  withinTolerance: boolean;
};

export function compareTires(from: TireGeometry, to: TireGeometry): TireComparison {
  const diameterDiff = to.diameter - from.diameter;
  const diameterPct = (diameterDiff / from.diameter) * 100;
  return {
    from,
    to,
    diameterDiff,
    diameterPct,
    sidewallDiff: to.sidewall - from.sidewall,
    widthDiff: to.sectionWidth - from.sectionWidth,
    clearanceDiff: diameterDiff / 2,
    revsDiff: to.revsPerMile - from.revsPerMile,
    actualAt60: 60 * (to.diameter / from.diameter),
    speedoErrorPct: diameterPct,
    odometerDriftPer1000: 1000 * (to.diameter / from.diameter) - 1000,
    withinTolerance: Math.abs(diameterPct) <= 3,
  };
}

/**
 * Engine speed from road speed.
 *
 * RPM = (MPH × transmission ratio × axle ratio × 1056) / (π × tyre diameter)
 *
 * The constant folds inches-per-mile and minutes-per-hour together:
 * 63360 / 60 = 1056.
 */
export function engineRpm({
  mph,
  axleRatio,
  gearRatio = 1,
  tireDiameter,
}: {
  mph: number;
  axleRatio: number;
  gearRatio?: number;
  tireDiameter: number;
}): number {
  if (tireDiameter <= 0) return 0;
  return (mph * gearRatio * axleRatio * 1056) / (Math.PI * tireDiameter);
}

/** Road speed from engine speed — the same relationship rearranged. */
export function roadSpeed({
  rpm,
  axleRatio,
  gearRatio = 1,
  tireDiameter,
}: {
  rpm: number;
  axleRatio: number;
  gearRatio?: number;
  tireDiameter: number;
}): number {
  if (axleRatio <= 0 || gearRatio <= 0) return 0;
  return (rpm * Math.PI * tireDiameter) / (gearRatio * axleRatio * 1056);
}

/**
 * The axle ratio that restores the original engine speed after a tyre size
 * change. Taller tyres need a numerically higher ratio to compensate.
 */
export function equivalentAxleRatio({
  currentRatio,
  fromDiameter,
  toDiameter,
}: {
  currentRatio: number;
  fromDiameter: number;
  toDiameter: number;
}): number {
  if (fromDiameter <= 0) return currentRatio;
  return currentRatio * (toDiameter / fromDiameter);
}

/** Common North American axle ratios, for snapping a calculated figure. */
export const COMMON_AXLE_RATIOS = [
  2.73, 3.08, 3.15, 3.21, 3.31, 3.42, 3.55, 3.73, 3.9, 4.1, 4.3, 4.56, 4.88, 5.13, 5.38,
];

/** Nearest stock ratio to a calculated value, with the error it leaves. */
export function nearestAxleRatio(target: number) {
  let best = COMMON_AXLE_RATIOS[0];
  for (const ratio of COMMON_AXLE_RATIOS) {
    if (Math.abs(ratio - target) < Math.abs(best - target)) best = ratio;
  }
  return { ratio: best, errorPct: ((best - target) / target) * 100 };
}

/* --------------------------------------------------------------- wheel fitment */

/**
 * Backspacing is measured from the mounting pad to the inboard rim flange.
 * Wheel width is the bead seat width; the flanges add roughly half an inch each
 * side, which is why the industry formula uses width + 1.
 *
 * backspacing (in) = (width + 1) / 2 + offset (mm) / 25.4
 */
export function offsetToBackspacing(widthIn: number, offsetMm: number): number {
  return (widthIn + 1) / 2 + offsetMm / MM_PER_INCH;
}

export function backspacingToOffset(widthIn: number, backspacingIn: number): number {
  return (backspacingIn - (widthIn + 1) / 2) * MM_PER_INCH;
}

export type FitmentChange = {
  /** How far the wheel face moves outward, in inches. Positive is outward. */
  outward: number;
  /** How far the inner edge moves toward the suspension, in inches. */
  inward: number;
  /** Change in track width across the axle, in inches. */
  trackChange: number;
};

/**
 * Compares a proposed wheel against the current one. Width changes move both
 * edges by half the difference; offset changes move the whole wheel bodily.
 */
export function fitmentChange({
  currentWidth,
  currentOffset,
  newWidth,
  newOffset,
}: {
  currentWidth: number;
  currentOffset: number;
  newWidth: number;
  newOffset: number;
}): FitmentChange {
  const halfWidthDelta = (newWidth - currentWidth) / 2;
  const offsetDelta = (newOffset - currentOffset) / MM_PER_INCH;
  return {
    outward: halfWidthDelta - offsetDelta,
    inward: halfWidthDelta + offsetDelta,
    trackChange: -2 * offsetDelta,
  };
}

/* ------------------------------------------------------------------ formatting */

export const inches = (value: number, decimals = 2) => `${round(value, decimals)}"`;
export const signed = (value: number, decimals = 2) =>
  `${value >= 0 ? "+" : "−"}${round(Math.abs(value), decimals)}`;
export const pct = (value: number, decimals = 1) => `${signed(value, decimals)}%`;

/** URL-safe token for a tyre size: 225/65R17 → 225-65r17. */
export const tireSlug = (size: TireSize) =>
  size.label.toLowerCase().replace(/\//g, "-").replace(/x/g, "x").replace(/\s+/g, "");

/** Reverses `tireSlug` for programmatic comparison routes. */
export const tireFromSlug = (slug: string): TireSize | null => {
  const cleaned = slug.replace(/-/g, "/");
  return parseTireSize(cleaned) ?? parseTireSize(slug);
};
