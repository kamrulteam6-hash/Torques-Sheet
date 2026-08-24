/**
 * Suspension geometry and alignment arithmetic. Dependency-free, like the
 * other maths modules.
 */

const G_INS2 = 386.4; // standard gravity, inches per second squared

/* --------------------------------------------------------------- spring rate */

export type SpringRateResult = {
  wheelRate: number;
  naturalFrequencyHz: number;
};

/**
 * Motion ratio is how much the spring moves for a given amount of wheel
 * travel — usually below 1.0, because most suspension geometry gives the
 * wheel more leverage than the spring. Wheel rate is what the tire actually
 * feels, and it scales with the *square* of the motion ratio, because motion
 * ratio affects both the force multiplication and the distance multiplication
 * through the linkage.
 *
 * Natural frequency constant of 3.13 comes from (1/2π) × √386.4, where 386.4
 * is standard gravity in inches per second squared — the unit conversion
 * that lets wheel rate in lb/in and corner weight in lb produce a frequency
 * in Hz directly.
 */
export function springRateResult(springRateLbIn: number, motionRatio: number, cornerWeightLb: number): SpringRateResult {
  const wheelRate = springRateLbIn * motionRatio * motionRatio;
  const naturalFrequencyHz = cornerWeightLb > 0 ? 3.13 * Math.sqrt(wheelRate / cornerWeightLb) : 0;
  return { wheelRate, naturalFrequencyHz };
}

/** Spring rate needed to hit a target wheel rate, at a given motion ratio. */
export const springRateForWheelRate = (targetWheelRate: number, motionRatio: number) =>
  motionRatio > 0 ? targetWheelRate / (motionRatio * motionRatio) : 0;

/** Spring rate needed to hit a target natural frequency, at a given corner weight. */
export const springRateForFrequency = (targetHz: number, cornerWeightLb: number, motionRatio: number) => {
  const wheelRate = ((targetHz / 3.13) ** 2) * cornerWeightLb;
  return motionRatio > 0 ? wheelRate / (motionRatio * motionRatio) : 0;
};

export const NATURAL_FREQUENCY_GUIDANCE = [
  { use: "Soft street / comfort-tuned", range: [1.0, 1.5] },
  { use: "Sport street / mild track", range: [1.5, 2.0] },
  { use: "Track-focused, non-aero", range: [2.0, 2.5] },
  { use: "Racing, non-aero", range: [2.5, 3.0] },
  { use: "High-downforce racing", range: [3.0, 4.0] },
] as { use: string; range: [number, number] }[];

/* -------------------------------------------------------------- ride height */

/** Ride height change at the wheel from a change in spring length, via motion ratio. */
export const rideHeightChange = (springLengthChangeIn: number, motionRatio: number) =>
  motionRatio > 0 ? springLengthChangeIn / motionRatio : 0;

/** Spring length change needed to achieve a target ride height change. */
export const springChangeForRideHeight = (rideHeightChangeIn: number, motionRatio: number) =>
  rideHeightChangeIn * motionRatio;

/* -------------------------------------------------------------- wheel travel */

/** Wheel travel available from a given shock travel, via motion ratio. */
export const wheelTravelFromShockTravel = (shockTravelIn: number, motionRatio: number) =>
  motionRatio > 0 ? shockTravelIn / motionRatio : 0;

/** Shock travel a given amount of desired wheel travel requires. */
export const shockTravelForWheelTravel = (wheelTravelIn: number, motionRatio: number) =>
  wheelTravelIn * motionRatio;

/* -------------------------------------------------------------------- camber */

const degToRad = (deg: number) => (deg * Math.PI) / 180;
const radToDeg = (rad: number) => (rad * 180) / Math.PI;

/**
 * Camber angle from a two-point measurement across a wheel's diameter: the
 * horizontal distance between the top and bottom of the tire (or rim),
 * against the vertical distance measured between those two points. This is
 * the standard "camber without a gauge" method using a level and a
 * measuring tape.
 */
export const camberFromOffset = (horizontalOffsetIn: number, verticalSpanIn: number) =>
  verticalSpanIn > 0 ? radToDeg(Math.atan(horizontalOffsetIn / verticalSpanIn)) : 0;

/** The horizontal offset a target camber angle produces over a given vertical span. */
export const offsetFromCamber = (camberDeg: number, verticalSpanIn: number) =>
  verticalSpanIn * Math.tan(degToRad(camberDeg));

/* -------------------------------------------------------------------- caster */

/**
 * Caster from the sweep method used by caster gauges: turn the wheel a fixed
 * angle each way from centre, and read the camber change between the two
 * positions. Caster angle = arctan(camber change ÷ (2 × sin(half the sweep
 * angle))). This is the formula built into bubble and digital caster gauges.
 */
export const casterFromSweep = (camberChangeDeg: number, sweepAngleDeg: number) => {
  const halfSweepRad = degToRad(sweepAngleDeg / 2);
  const denominator = 2 * Math.sin(halfSweepRad);
  return denominator > 0 ? radToDeg(Math.atan(degToRad(camberChangeDeg) / denominator)) : 0;
};

/* ---------------------------------------------------------------------- toe */

/**
 * Toe angle from a toe-plate style measurement: the difference between the
 * track width measured at the front of the tires and at the back of the
 * tires (same tire, front vs. rear edge), against the tire's diameter.
 * Positive difference (front narrower than rear, per side) is toe-in.
 */
export const toeAngleFromDistance = (trackDifferenceIn: number, tireDiameterIn: number) =>
  tireDiameterIn > 0 ? radToDeg(Math.atan(trackDifferenceIn / tireDiameterIn)) : 0;

/** Track-width difference a target total toe angle implies, for a given tire diameter. */
export const toeDistanceFromAngle = (toeAngleDeg: number, tireDiameterIn: number) =>
  tireDiameterIn * Math.tan(degToRad(toeAngleDeg));

/** Convert a single-wheel toe distance measurement (inches) into degrees, and back. */
export const toeInchesToDegrees = (inches: number, tireDiameterIn: number) =>
  toeAngleFromDistance(inches, tireDiameterIn);
export const toeDegreesToInches = (degrees: number, tireDiameterIn: number) =>
  toeDistanceFromAngle(degrees, tireDiameterIn);

export { G_INS2 };
