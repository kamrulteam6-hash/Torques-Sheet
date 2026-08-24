/**
 * Brake system arithmetic: the hydraulic and mechanical chain from pedal
 * force through to torque at the rotor, plus bias and stopping-force
 * estimates. Dependency-free, like the other maths modules.
 */

/* ------------------------------------------------------------------- pressure */

export type BrakePressureResult = {
  pushrodForceLb: number;
  linePsi: number;
  clampForceLb: number;
  frictionForceLb: number;
  torqueLbFt: number;
};

/**
 * The full hydraulic chain from pedal effort to rotor torque:
 * pedal force × pedal ratio → pushrod force → line pressure (force ÷ master
 * cylinder bore area) → clamp force (pressure × caliper piston area) →
 * friction force (clamp force × pad friction coefficient, doubled because a
 * caliper squeezes both faces of the rotor) → torque (friction force ×
 * effective rotor radius).
 */
export function brakePressureChain({
  pedalForceLb,
  pedalRatio,
  masterCylinderBoreIn,
  caliperPistonAreaIn2,
  padFriction,
  effectiveRadiusIn,
}: {
  pedalForceLb: number;
  pedalRatio: number;
  masterCylinderBoreIn: number;
  caliperPistonAreaIn2: number;
  padFriction: number;
  effectiveRadiusIn: number;
}): BrakePressureResult {
  const pushrodForceLb = pedalForceLb * pedalRatio;
  const mcArea = Math.PI * (masterCylinderBoreIn / 2) ** 2;
  const linePsi = mcArea > 0 ? pushrodForceLb / mcArea : 0;
  const clampForceLb = linePsi * caliperPistonAreaIn2;
  const frictionForceLb = clampForceLb * padFriction * 2;
  const torqueLbFt = (frictionForceLb * effectiveRadiusIn) / 12;
  return { pushrodForceLb, linePsi, clampForceLb, frictionForceLb, torqueLbFt };
}

/** Circular piston area from bore diameter, used throughout the chain. */
export const pistonArea = (boreIn: number) => Math.PI * (boreIn / 2) ** 2;

/* ---------------------------------------------------------------------- bias */

export type BiasResult = {
  frontTorqueLbFt: number;
  rearTorqueLbFt: number;
  frontPct: number;
  rearPct: number;
};

/** Front/rear brake bias from each axle's actual torque output. */
export function brakeBias(frontTorqueLbFt: number, rearTorqueLbFt: number): BiasResult {
  const total = frontTorqueLbFt + rearTorqueLbFt;
  return {
    frontTorqueLbFt,
    rearTorqueLbFt,
    frontPct: total > 0 ? (frontTorqueLbFt / total) * 100 : 0,
    rearPct: total > 0 ? (rearTorqueLbFt / total) * 100 : 0,
  };
}

/**
 * Static-weight-based starting point for ideal bias, before dynamic weight
 * transfer under braking is considered. This is a baseline for comparison,
 * not the dynamically ideal bias — a car transfers load toward the front
 * under braking, which is why real ideal bias usually sits a little further
 * forward than static weight distribution alone would suggest.
 */
export const staticBiasFromWeight = (frontWeightLb: number, rearWeightLb: number) => {
  const total = frontWeightLb + rearWeightLb;
  return total > 0 ? (frontWeightLb / total) * 100 : 0;
};

/* ---------------------------------------------------------------- braking force */

const G_FTS2 = 32.174;

export type BrakingForceResult = {
  /** Total braking force across all four wheels, lb. */
  totalForceLb: number;
  /** Force per wheel, assuming even distribution — a simplification. */
  perWheelLb: number;
  /** Deceleration, in g. */
  decelG: number;
  /** Theoretical minimum stopping distance under these conditions, ft. */
  stoppingDistanceFt: number;
};

/**
 * Braking force and an idealized stopping distance from target deceleration.
 * The stopping distance figure assumes constant deceleration, perfect
 * traction and no reaction time — it is a theoretical floor, not a
 * prediction of how any real vehicle stops. Tire grip, ABS behaviour, weight
 * transfer, brake fade and road surface all move the real number, usually
 * upward.
 */
export function brakingForceFromDecel({
  weightLb,
  decelG,
  speedMph,
}: {
  weightLb: number;
  decelG: number;
  speedMph: number;
}): BrakingForceResult {
  const totalForceLb = weightLb * decelG;
  const speedFts = speedMph * 1.46667;
  const decelFts2 = decelG * G_FTS2;
  const stoppingDistanceFt = decelFts2 > 0 ? (speedFts * speedFts) / (2 * decelFts2) : 0;
  return { totalForceLb, perWheelLb: totalForceLb / 4, decelG, stoppingDistanceFt };
}

/* ------------------------------------------------------------------ rotor sizing */

export type RotorEnergyResult = {
  kineticEnergyBtu: number;
  /** Heat generated per stop that the rotor and pads must absorb, BTU. */
  heatPerStopBtu: number;
};

/** Kinetic energy a single stop from a given speed must dissipate as heat. */
export function stopEnergy({ weightLb, speedMph }: { weightLb: number; speedMph: number }): RotorEnergyResult {
  const speedFts = speedMph * 1.46667;
  const massSlug = weightLb / G_FTS2;
  const energyFtLb = 0.5 * massSlug * speedFts * speedFts;
  const kineticEnergyBtu = energyFtLb / 778.169;
  return { kineticEnergyBtu, heatPerStopBtu: kineticEnergyBtu };
}

/** Rule-of-thumb minimum rotor diameter as a fraction of overall wheel diameter. */
export const ROTOR_DIAMETER_GUIDANCE = [
  { use: "Street, daily driving", minFraction: 0.6 },
  { use: "Spirited street / occasional track", minFraction: 0.65 },
  { use: "Dedicated track or racing", minFraction: 0.7 },
];
