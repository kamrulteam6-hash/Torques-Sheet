/**
 * Fastener arithmetic: thread pitch, bolt torque, torque-to-angle and
 * metric/imperial size conversion. Dependency-free, like the other maths
 * modules.
 */

const MM_PER_INCH = 25.4;

/* --------------------------------------------------------------- thread pitch */

export const mmPitchToTpi = (pitchMm: number) => (pitchMm > 0 ? MM_PER_INCH / pitchMm : 0);
export const tpiToMmPitch = (tpi: number) => (tpi > 0 ? MM_PER_INCH / tpi : 0);

/** Thread lead angle (helix angle) — how steeply the thread wraps the shaft. */
export function threadLeadAngle(pitchMm: number, majorDiameterMm: number) {
  const circumference = Math.PI * majorDiameterMm;
  return circumference > 0 ? Math.atan(pitchMm / circumference) * (180 / Math.PI) : 0;
}

/** Approximate pitch diameter for a 60-degree thread (metric/UN profile), ISO convention. */
export const pitchDiameter = (majorDiameterMm: number, pitchMm: number) =>
  majorDiameterMm - 0.6495 * pitchMm;

export type BoltSpec = { metric: string; diameterMm: number; coarsePitchMm: number; finePitchMm: number | null };

/** Common metric bolt sizes with their standard coarse and fine thread pitches. */
export const METRIC_BOLTS: BoltSpec[] = [
  { metric: "M4", diameterMm: 4, coarsePitchMm: 0.7, finePitchMm: 0.5 },
  { metric: "M5", diameterMm: 5, coarsePitchMm: 0.8, finePitchMm: 0.5 },
  { metric: "M6", diameterMm: 6, coarsePitchMm: 1.0, finePitchMm: 0.75 },
  { metric: "M8", diameterMm: 8, coarsePitchMm: 1.25, finePitchMm: 1.0 },
  { metric: "M10", diameterMm: 10, coarsePitchMm: 1.5, finePitchMm: 1.25 },
  { metric: "M12", diameterMm: 12, coarsePitchMm: 1.75, finePitchMm: 1.25 },
  { metric: "M14", diameterMm: 14, coarsePitchMm: 2.0, finePitchMm: 1.5 },
  { metric: "M16", diameterMm: 16, coarsePitchMm: 2.0, finePitchMm: 1.5 },
  { metric: "M18", diameterMm: 18, coarsePitchMm: 2.5, finePitchMm: 1.5 },
  { metric: "M20", diameterMm: 20, coarsePitchMm: 2.5, finePitchMm: 1.5 },
];

export type ImperialBolt = { fraction: string; decimalIn: number; unc: number; unf: number | null };

/** Common imperial bolt sizes with standard UNC (coarse) and UNF (fine) threads per inch. */
export const IMPERIAL_BOLTS: ImperialBolt[] = [
  { fraction: "#10", decimalIn: 0.19, unc: 24, unf: 32 },
  { fraction: "1/4\"", decimalIn: 0.25, unc: 20, unf: 28 },
  { fraction: "5/16\"", decimalIn: 0.3125, unc: 18, unf: 24 },
  { fraction: "3/8\"", decimalIn: 0.375, unc: 16, unf: 24 },
  { fraction: "7/16\"", decimalIn: 0.4375, unc: 14, unf: 20 },
  { fraction: "1/2\"", decimalIn: 0.5, unc: 13, unf: 20 },
  { fraction: "9/16\"", decimalIn: 0.5625, unc: 12, unf: 18 },
  { fraction: "5/8\"", decimalIn: 0.625, unc: 11, unf: 18 },
  { fraction: "3/4\"", decimalIn: 0.75, unc: 10, unf: 16 },
  { fraction: "7/8\"", decimalIn: 0.875, unc: 9, unf: 14 },
];

/** Nearest metric bolt to a given imperial decimal diameter, and vice versa. */
export function nearestMetricBolt(decimalIn: number) {
  const mm = decimalIn * MM_PER_INCH;
  return METRIC_BOLTS.reduce((best, row) => (Math.abs(row.diameterMm - mm) < Math.abs(best.diameterMm - mm) ? row : best));
}
export function nearestImperialBolt(diameterMm: number) {
  const inches = diameterMm / MM_PER_INCH;
  return IMPERIAL_BOLTS.reduce((best, row) => (Math.abs(row.decimalIn - inches) < Math.abs(best.decimalIn - inches) ? row : best));
}

/* ----------------------------------------------------------------- bolt torque */

export type BoltGrade = { key: string; label: string; proofMpa: number; proofPsi: number };

export const BOLT_GRADES: BoltGrade[] = [
  { key: "sae2", label: "SAE Grade 2", proofMpa: 379, proofPsi: 55000 },
  { key: "sae5", label: "SAE Grade 5 (≈ metric 8.8)", proofMpa: 585, proofPsi: 85000 },
  { key: "sae8", label: "SAE Grade 8 (≈ metric 10.9)", proofMpa: 830, proofPsi: 120000 },
  { key: "m88", label: "Metric 8.8", proofMpa: 580, proofPsi: 84100 },
  { key: "m109", label: "Metric 10.9", proofMpa: 830, proofPsi: 120400 },
  { key: "m129", label: "Metric 12.9", proofMpa: 970, proofPsi: 140700 },
];

export const K_FACTOR_PRESETS = [
  { key: "dry", label: "Dry, plain/black oxide", k: 0.2 },
  { key: "zinc", label: "Zinc plated, dry", k: 0.18 },
  { key: "lubricated", label: "Lubricated / anti-seize", k: 0.15 },
  { key: "galvanized", label: "Hot-dip galvanized, dry", k: 0.25 },
];

/** Tensile stress area, approximated from nominal diameter for a standard thread — used for clamp load targets. */
export const tensileStressAreaMm2 = (diameterMm: number, pitchMm: number) => {
  const dp = diameterMm - 0.9382 * pitchMm;
  return (Math.PI / 4) * dp * dp;
};

export type BoltTorqueResult = {
  clampLoadN: number;
  clampLoadLbf: number;
  torqueNm: number;
  torqueLbFt: number;
};

/**
 * T = K x D x P — the standard, widely used bolt-torque estimate. K is the
 * nut factor (friction condition), D is nominal diameter, P is target clamp
 * load. Clamp load is targeted at a fraction (conventionally 75%) of the
 * bolt's proof load, which is itself proof strength times tensile stress
 * area.
 */
export function boltTorque({
  diameterMm,
  pitchMm,
  proofMpa,
  k,
  clampFraction = 0.75,
}: {
  diameterMm: number;
  pitchMm: number;
  proofMpa: number;
  k: number;
  clampFraction?: number;
}): BoltTorqueResult {
  const areaMm2 = tensileStressAreaMm2(diameterMm, pitchMm);
  const proofLoadN = proofMpa * areaMm2;
  const clampLoadN = proofLoadN * clampFraction;
  const torqueNm = (k * (diameterMm / 1000) * clampLoadN);
  return {
    clampLoadN,
    clampLoadLbf: clampLoadN * 0.224809,
    torqueNm,
    torqueLbFt: torqueNm * 0.737562,
  };
}

/* ------------------------------------------------------------- torque angle */

export type TorqueAngleResult = {
  /** Additional linear travel the fastener advances during the angle turn, mm. */
  additionalTravelMm: number;
};

/**
 * Torque-to-yield (angle-based) tightening advances the fastener a further
 * fixed angle after an initial snug torque, rather than targeting a final
 * torque figure. The additional linear clamp travel that angle represents is
 * simply the thread pitch scaled by the fraction of a full turn.
 */
export function torqueAngleTravel(pitchMm: number, angleDeg: number): TorqueAngleResult {
  return { additionalTravelMm: pitchMm * (angleDeg / 360) };
}
