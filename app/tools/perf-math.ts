/**
 * Performance and drivetrain arithmetic: acceleration estimates, power to
 * weight, piston speed and torque multiplication. Dependency-free, like the
 * other maths modules, so client islands can import it directly.
 */

const MPH_TO_MS = 0.44704;
const LB_TO_KG = 0.45359237;
const HP_TO_W = 745.699872;

/* ------------------------------------------------------------- power to weight */

export type PowerToWeight = {
  hpPerTon: number;
  hpPerPound: number;
  poundsPerHp: number;
  wattsPerKg: number;
  kwPerTonne: number;
};

/** Weight in pounds, power in mechanical horsepower. */
export function powerToWeight(weightLb: number, hp: number): PowerToWeight {
  if (weightLb <= 0 || hp <= 0) {
    return { hpPerTon: 0, hpPerPound: 0, poundsPerHp: 0, wattsPerKg: 0, kwPerTonne: 0 };
  }
  const kg = weightLb * LB_TO_KG;
  const watts = hp * HP_TO_W;
  return {
    hpPerTon: hp / (weightLb / 2000),
    hpPerPound: hp / weightLb,
    poundsPerHp: weightLb / hp,
    wattsPerKg: watts / kg,
    kwPerTonne: watts / 1000 / (kg / 1000),
  };
}

/* --------------------------------------------------------------- quarter mile */

export type DragEstimate = {
  /** Elapsed time over a quarter mile, seconds — Hale. */
  etHale: number;
  /** The older Fox constant, for comparison. */
  etFox: number;
  /** Trap speed at the quarter-mile line, mph. */
  trapSpeed: number;
  /** Estimated 0–60 mph, seconds, from the energy method. */
  zeroToSixty: number;
};

/**
 * Quarter-mile estimates use the empirical drag-strip formulas rather than a
 * simulation. The lineage runs Huntington (1950s) to Fox (1960s) to Hale
 * (1980s); Hale's constants are the ones fitted against the largest body of
 * real timeslips, so they are the primary figures here.
 *
 * Trap speed is the more trustworthy of the two outputs, because it depends far
 * less on launch technique and traction than elapsed time does.
 */
export function dragEstimate({
  weightLb,
  hp,
  efficiency,
}: {
  weightLb: number;
  hp: number;
  /** Fraction of engine power that reaches the road on average during the run. */
  efficiency: number;
}): DragEstimate {
  if (weightLb <= 0 || hp <= 0) {
    return { etHale: 0, etFox: 0, trapSpeed: 0, zeroToSixty: 0 };
  }
  const ratio = weightLb / hp;
  return {
    etHale: 5.825 * Math.cbrt(ratio),
    etFox: 6.29 * Math.cbrt(ratio),
    trapSpeed: 234 * Math.cbrt(hp / weightLb),
    zeroToSixty: zeroToSixty({ weightLb, hp, efficiency }),
  };
}

/**
 * 0–60 has no equivalent industry-standard empirical formula, so this uses the
 * energy method instead: the kinetic energy needed at 60 mph divided by the
 * average power actually delivered.
 *
 * The efficiency term is doing real work. It absorbs drivetrain loss, the time
 * spent away from peak power, shift interruptions and — the big one — traction.
 * A powerful rear-wheel-drive car cannot use its output from rest, which is why
 * this method flatters high-power cars unless the figure is lowered.
 */
export function zeroToSixty({
  weightLb,
  hp,
  efficiency,
}: {
  weightLb: number;
  hp: number;
  efficiency: number;
}): number {
  if (weightLb <= 0 || hp <= 0 || efficiency <= 0) return 0;
  const kg = weightLb * LB_TO_KG;
  const v = 60 * MPH_TO_MS;
  const energy = 0.5 * kg * v * v;
  return energy / (hp * HP_TO_W * efficiency);
}

/** Starting points for the efficiency term, by how the power reaches the road. */
export const TRACTION_PRESETS = [
  { key: "awd", label: "All-wheel drive", efficiency: 0.58, note: "Best launch traction, highest drivetrain loss" },
  { key: "fwd", label: "Front-wheel drive", efficiency: 0.5, note: "Weight transfers away from the driven wheels" },
  { key: "rwd", label: "Rear-wheel drive", efficiency: 0.48, note: "Good transfer, but traction-limited when powerful" },
  { key: "rwd-slick", label: "Rear drive on slicks", efficiency: 0.62, note: "Prepared surface and drag radials" },
];

/* --------------------------------------------------------------- piston speed */

export type PistonSpeed = {
  /** Mean piston speed, feet per minute. */
  feetPerMinute: number;
  metresPerSecond: number;
  band: "conservative" | "production" | "performance" | "race" | "extreme";
};

/**
 * Mean piston speed is the honest limit on how hard a long-stroke engine can be
 * revved, and it depends on stroke alone — not on bore, capacity or cylinder
 * count.
 *
 * MPS (ft/min) = 2 × stroke (in) × rpm ÷ 12, which reduces to stroke × rpm ÷ 6.
 */
export function pistonSpeed(strokeIn: number, rpm: number): PistonSpeed {
  const feetPerMinute = (strokeIn * rpm) / 6;
  return {
    feetPerMinute,
    metresPerSecond: (feetPerMinute * 0.3048) / 60,
    band:
      feetPerMinute < 2000
        ? "conservative"
        : feetPerMinute < 3000
          ? "production"
          : feetPerMinute < 4000
            ? "performance"
            : feetPerMinute < 5000
              ? "race"
              : "extreme",
  };
}

/** The rpm at which a given stroke reaches a target mean piston speed. */
export const rpmAtPistonSpeed = (strokeIn: number, feetPerMinute: number) =>
  strokeIn > 0 ? (feetPerMinute * 6) / strokeIn : 0;

/* --------------------------------------------------------------- wheel torque */

export type WheelTorque = {
  /** Torque at the drive wheels, lb·ft. */
  wheelTorque: number;
  /** Overall drivetrain ratio: transmission × final drive. */
  overallRatio: number;
  /** Tractive force at the contact patch, pounds. */
  tractiveForce: number;
  /** Torque lost to the drivetrain, lb·ft at the wheel. */
  lossLbFt: number;
};

/**
 * Torque multiplication through the drivetrain. This is what actually moves the
 * vehicle, and it is why an engine's own torque figure says so little on its
 * own — first gear can multiply it by fifteen.
 */
export function wheelTorque({
  engineTorque,
  gearRatio,
  finalDrive,
  tireDiameter,
  efficiency = 0.85,
}: {
  engineTorque: number;
  gearRatio: number;
  finalDrive: number;
  tireDiameter: number;
  efficiency?: number;
}): WheelTorque {
  const overallRatio = gearRatio * finalDrive;
  const ideal = engineTorque * overallRatio;
  const delivered = ideal * efficiency;
  const radiusFt = tireDiameter / 2 / 12;
  return {
    wheelTorque: delivered,
    overallRatio,
    tractiveForce: radiusFt > 0 ? delivered / radiusFt : 0,
    lossLbFt: ideal - delivered,
  };
}

/* ------------------------------------------------------------- unit conversion */

export const PRESSURE_UNITS = ["psi", "bar", "kPa", "atm", "kgf/cm²"] as const;
export type PressureUnit = (typeof PRESSURE_UNITS)[number];

/** Everything converts through kilopascals. */
const TO_KPA: Record<PressureUnit, number> = {
  psi: 6.894757293168,
  bar: 100,
  kPa: 1,
  atm: 101.325,
  "kgf/cm²": 98.0665,
};

export function convertPressure(value: number, from: PressureUnit, to: PressureUnit): number {
  return (value * TO_KPA[from]) / TO_KPA[to];
}

export const TORQUE_UNITS = ["lb·ft", "N·m", "kgf·m", "lb·in"] as const;
export type TorqueUnit = (typeof TORQUE_UNITS)[number];

/** Everything converts through newton-metres. */
const TO_NM: Record<TorqueUnit, number> = {
  "lb·ft": 1.3558179483314,
  "N·m": 1,
  "kgf·m": 9.80665,
  "lb·in": 0.1129848290276,
};

export function convertTorque(value: number, from: TorqueUnit, to: TorqueUnit): number {
  return (value * TO_NM[from]) / TO_NM[to];
}
