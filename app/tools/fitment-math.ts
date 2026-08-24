/**
 * Turning geometry and wheel/tire fitment arithmetic. Dependency-free, like
 * the other maths modules.
 */

import { offsetToBackspacing } from "./tire-math";

const degToRad = (deg: number) => (deg * Math.PI) / 180;

/* ------------------------------------------------------------- turning radius */

export type TurningResult = {
  /** Centreline turning radius from the simplified bicycle model, ft. */
  centrelineRadiusFt: number;
  /** Curb-to-curb radius of the outer front wheel's path, ft. */
  curbToCurbRadiusFt: number;
  /** Curb-to-curb turning circle diameter, ft. */
  turningCircleFt: number;
};

/**
 * Turning radius from wheelbase, average steering angle and track width.
 *
 * The centreline radius uses the standard bicycle-model approximation,
 * R = wheelbase ÷ tan(steering angle) — treating the vehicle as a single
 * two-wheeled bicycle rather than modelling each front wheel's slightly
 * different Ackermann angle individually.
 *
 * The curb-to-curb figure — what manufacturers actually publish — tracks the
 * outer front wheel specifically: wheelbase ÷ sin(steering angle), plus half
 * the front track width, since the outer tire's contact patch sits further
 * out than the vehicle's centreline.
 */
export function turningRadius({
  wheelbaseIn,
  steeringAngleDeg,
  trackWidthIn,
}: {
  wheelbaseIn: number;
  steeringAngleDeg: number;
  trackWidthIn: number;
}): TurningResult {
  const angleRad = degToRad(steeringAngleDeg);
  const centrelineRadiusIn = Math.tan(angleRad) > 0 ? wheelbaseIn / Math.tan(angleRad) : 0;
  const curbToCurbRadiusIn = Math.sin(angleRad) > 0 ? wheelbaseIn / Math.sin(angleRad) + trackWidthIn / 2 : 0;
  return {
    centrelineRadiusFt: centrelineRadiusIn / 12,
    curbToCurbRadiusFt: curbToCurbRadiusIn / 12,
    turningCircleFt: (curbToCurbRadiusIn * 2) / 12,
  };
}

/* -------------------------------------------------------------- wheel width */

export type WheelWidthRange = { minIn: number; idealIn: number; maxIn: number };

/**
 * Recommended rim width range for a given tire section width, following the
 * TRA/ETRTO convention: the ideal rim width sits near 85% of section width
 * converted to inches, with an approved range of roughly plus or minus one
 * inch either side.
 */
export function wheelWidthRange(sectionWidthMm: number): WheelWidthRange {
  const sectionWidthIn = sectionWidthMm / 25.4;
  const idealIn = sectionWidthIn * 0.85;
  return { minIn: idealIn - 1, idealIn, maxIn: idealIn + 1 };
}

/* -------------------------------------------------- fitment / clearance */

export type FitmentEdges = {
  /** How far the tire's outer sidewall sits from the wheel's mounting face, in. Positive = outward. */
  outerEdgeIn: number;
  /** How far the tire's inner sidewall sits from the wheel's mounting face, in. Positive = inward. */
  innerEdgeIn: number;
};

/**
 * Combines wheel offset/width with tire section width to give the tire's
 * actual outer and inner edge distance from the hub mounting face —
 * extending the plain wheel offset calculation (rim edges only) with the
 * tire bulge that sits outside the rim on a tire wider than the wheel.
 *
 * Backspacing (mounting face to inner rim flange) and its counterpart at the
 * outer flange use the same +1 inch flange allowance as the wheel offset and
 * backspacing calculators, so the three tools agree with each other.
 */
export function fitmentEdges({
  wheelWidthIn,
  offsetMm,
  tireSectionWidthMm,
}: {
  wheelWidthIn: number;
  offsetMm: number;
  tireSectionWidthMm: number;
}): FitmentEdges {
  const tireWidthIn = tireSectionWidthMm / 25.4;
  const backspacingIn = offsetToBackspacing(wheelWidthIn, offsetMm);
  const frontSpacingIn = wheelWidthIn + 1 - backspacingIn;
  const tireBulgePerSideIn = Math.max(0, (tireWidthIn - wheelWidthIn) / 2);
  return {
    outerEdgeIn: frontSpacingIn + tireBulgePerSideIn,
    innerEdgeIn: backspacingIn + tireBulgePerSideIn,
  };
}

/** Remaining clearance after a fitment change, given a measured baseline. */
export function remainingClearance(baselineClearanceIn: number, edgeMovementIn: number) {
  return baselineClearanceIn - edgeMovementIn;
}
