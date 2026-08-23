/**
 * Engine and running-cost arithmetic. Like `tire-math`, this is deliberately
 * dependency-free so client islands can import it without pulling anything
 * else across the server/client boundary.
 */

export const CI_PER_CC = 16.387064;
/** Torque and power meet at this engine speed. It is 33,000 ft·lb/min ÷ 2π. */
export const HP_CONSTANT = 5252;

const quarterPi = Math.PI / 4;

/* --------------------------------------------------------------- displacement */

export type Displacement = {
  /** Swept volume of one cylinder, cubic inches. */
  perCylinderCi: number;
  perCylinderCc: number;
  totalCi: number;
  totalCc: number;
  totalLitres: number;
  /** Bore divided by stroke. Above 1 is oversquare. */
  boreStrokeRatio: number;
  character: "oversquare" | "square" | "undersquare";
};

/** Bore and stroke in inches. */
export function displacement(bore: number, stroke: number, cylinders: number): Displacement {
  const perCylinderCi = quarterPi * bore * bore * stroke;
  const totalCi = perCylinderCi * cylinders;
  const ratio = stroke > 0 ? bore / stroke : 0;
  return {
    perCylinderCi,
    perCylinderCc: perCylinderCi * CI_PER_CC,
    totalCi,
    totalCc: totalCi * CI_PER_CC,
    totalLitres: (totalCi * CI_PER_CC) / 1000,
    boreStrokeRatio: ratio,
    character: ratio > 1.02 ? "oversquare" : ratio < 0.98 ? "undersquare" : "square",
  };
}

/** Standard overbore steps, in inches, used when a block is rebored. */
export const OVERBORES = [0, 0.02, 0.03, 0.04, 0.06];

/* ---------------------------------------------------------- compression ratio */

export type CompressionInput = {
  /** Inches. */
  bore: number;
  stroke: number;
  /** Combustion chamber volume, cc. */
  chamberCc: number;
  /** Head gasket bore diameter, inches. */
  gasketBore: number;
  /** Compressed head gasket thickness, inches. */
  gasketThickness: number;
  /**
   * Deck clearance in inches: how far the piston crown sits below the deck at
   * top dead centre. Negative if the piston protrudes above the deck.
   */
  deckClearance: number;
  /**
   * Piston crown volume in cc. Positive for a dish (adds volume), negative for
   * a dome (displaces volume).
   */
  pistonCc: number;
};

export type CompressionResult = {
  sweptCc: number;
  chamberCc: number;
  gasketCc: number;
  deckCc: number;
  pistonCc: number;
  /** Total volume above the piston at top dead centre. */
  clearanceCc: number;
  ratio: number;
  /** Rough guidance band for pump fuel on a naturally aspirated engine. */
  band: "low" | "pump-friendly" | "premium" | "race";
};

const cylinderVolumeCc = (diameterIn: number, heightIn: number) =>
  quarterPi * diameterIn * diameterIn * heightIn * CI_PER_CC;

export function compressionRatio(input: CompressionInput): CompressionResult {
  const sweptCc = cylinderVolumeCc(input.bore, input.stroke);
  const gasketCc = cylinderVolumeCc(input.gasketBore, input.gasketThickness);
  const deckCc = cylinderVolumeCc(input.bore, input.deckClearance);
  const clearanceCc = input.chamberCc + gasketCc + deckCc + input.pistonCc;
  const ratio = clearanceCc > 0 ? (sweptCc + clearanceCc) / clearanceCc : 0;
  return {
    sweptCc,
    chamberCc: input.chamberCc,
    gasketCc,
    deckCc,
    pistonCc: input.pistonCc,
    clearanceCc,
    ratio,
    band: ratio < 8.5 ? "low" : ratio <= 10.5 ? "pump-friendly" : ratio <= 12 ? "premium" : "race",
  };
}

/* ------------------------------------------------------------ power and torque */

export const horsepowerFrom = (torque: number, rpm: number) => (torque * rpm) / HP_CONSTANT;
export const torqueFrom = (horsepower: number, rpm: number) =>
  rpm > 0 ? (horsepower * HP_CONSTANT) / rpm : 0;
export const rpmFrom = (horsepower: number, torque: number) =>
  torque > 0 ? (horsepower * HP_CONSTANT) / torque : 0;

/** Metric equivalents, for spec sheets quoted in kW and Nm. */
export const hpToKw = (hp: number) => hp * 0.7457;
export const kwToHp = (kw: number) => kw / 0.7457;
export const lbftToNm = (lbft: number) => lbft * 1.355818;
export const nmToLbft = (nm: number) => nm / 1.355818;
/** Metric horsepower (PS), still used across European and Japanese figures. */
export const hpToPs = (hp: number) => hp * 1.01387;

/* -------------------------------------------------------------- fuel and range */

export type FuelResult = {
  mpg: number;
  /** US gallons consumed over the distance. */
  gallons: number;
  litresPer100Km: number;
  kilometresPerLitre: number;
  costPerMile: number;
  tripCost: number;
  /** Distance on a full tank, miles. */
  tankRange: number;
  /** Cost to fill the tank from empty. */
  fillCost: number;
};

export function fuelFigures({
  miles,
  gallons,
  pricePerGallon,
  tankGallons,
}: {
  miles: number;
  gallons: number;
  pricePerGallon: number;
  tankGallons: number;
}): FuelResult {
  const mpg = gallons > 0 ? miles / gallons : 0;
  const costPerMile = mpg > 0 ? pricePerGallon / mpg : 0;
  return {
    mpg,
    gallons,
    litresPer100Km: mpg > 0 ? 235.214583 / mpg : 0,
    kilometresPerLitre: mpg * 0.425144,
    costPerMile,
    tripCost: miles * costPerMile,
    tankRange: tankGallons * mpg,
    fillCost: tankGallons * pricePerGallon,
  };
}

/** Annual cost, for comparing two vehicles or two driving patterns. */
export const annualCost = (milesPerYear: number, costPerMile: number) =>
  milesPerYear * costPerMile;
