/**
 * Engine breathing, fueling and forced-induction arithmetic. Dependency-free,
 * like the other maths modules.
 */

/* ------------------------------------------------------------- cylinder volume */

export type CylinderVolumes = {
  sweptCc: number;
  clearanceCc: number;
  totalCc: number;
};

/** Swept, clearance and total (BDC) volume for one cylinder at a given static CR. */
export function cylinderVolumes(sweptCc: number, compressionRatio: number): CylinderVolumes {
  const clearanceCc = compressionRatio > 1 ? sweptCc / (compressionRatio - 1) : 0;
  return { sweptCc, clearanceCc, totalCc: sweptCc + clearanceCc };
}

/* -------------------------------------------------------- volumetric efficiency */

/**
 * Theoretical airflow a naturally aspirated engine would ingest at 100%
 * volumetric efficiency: displacement swept once per two revolutions (one
 * intake stroke every other revolution, on a four-stroke), converted from
 * cubic inches to cubic feet per minute.
 *
 * CFM = displacement (ci) × RPM ÷ 3456, where 3456 = 1728 (in³ per ft³) × 2
 * (revolutions per intake stroke).
 */
export const theoreticalAirflowCfm = (displacementCi: number, rpm: number) =>
  (displacementCi * rpm) / 3456;

export const volumetricEfficiency = (actualCfm: number, displacementCi: number, rpm: number) => {
  const theoretical = theoreticalAirflowCfm(displacementCi, rpm);
  return theoretical > 0 ? (actualCfm / theoretical) * 100 : 0;
};

/* ---------------------------------------------------------- air-fuel and lambda */

export type Fuel = { key: string; label: string; stoichAfr: number };

/**
 * Stoichiometric air-fuel ratios by mass. Gasoline's 14.7:1 is the reference
 * everything else is usually compared against. Ethanol-blended and alcohol
 * fuels need more fuel mass for the same air mass, so their stoich figures
 * are lower — E85 needs roughly 50% more fuel than gasoline for the same
 * mixture strength.
 */
export const FUELS: Fuel[] = [
  { key: "gasoline", label: "Gasoline (91-93 octane)", stoichAfr: 14.7 },
  { key: "e10", label: "E10 (10% ethanol)", stoichAfr: 14.1 },
  { key: "e85", label: "E85 (85% ethanol)", stoichAfr: 9.8 },
  { key: "ethanol", label: "Pure ethanol (E100)", stoichAfr: 9.0 },
  { key: "methanol", label: "Methanol", stoichAfr: 6.4 },
  { key: "diesel", label: "Diesel", stoichAfr: 14.5 },
  { key: "propane", label: "Propane (LPG)", stoichAfr: 15.5 },
  { key: "cng", label: "CNG (methane)", stoichAfr: 17.2 },
];

export const afrToLambda = (afr: number, stoichAfr: number) => (stoichAfr > 0 ? afr / stoichAfr : 0);
export const lambdaToAfr = (lambda: number, stoichAfr: number) => lambda * stoichAfr;

/* ----------------------------------------------------------------- injectors */

/** cc/min to lb/hr and back, at the industry-standard gasoline reference density. */
export const CC_MIN_PER_LB_HR = 10.5;
export const ccMinToLbHr = (ccMin: number) => ccMin / CC_MIN_PER_LB_HR;
export const lbHrToCcMin = (lbHr: number) => lbHr * CC_MIN_PER_LB_HR;

/**
 * Flow rating scales with the square root of fuel pressure — doubling
 * pressure does not double flow, because flow depends on pressure
 * differential through an orifice, not on pressure directly.
 */
export const flowAtPressure = (ratedFlow: number, ratedPressure: number, newPressure: number) =>
  ratedPressure > 0 ? ratedFlow * Math.sqrt(newPressure / ratedPressure) : 0;

/**
 * Injector flow required per cylinder for a target power figure, given brake
 * specific fuel consumption and a maximum acceptable duty cycle. BSFC is
 * fuel mass consumed per unit power per unit time — roughly 0.50 lb/hp/hr for
 * a naturally aspirated gasoline engine at wide-open throttle, rising toward
 * 0.55-0.60 under boost as combustion efficiency falls.
 */
export function requiredInjectorFlow({
  targetHp,
  bsfc,
  cylinders,
  maxDutyCycle,
}: {
  targetHp: number;
  bsfc: number;
  cylinders: number;
  maxDutyCycle: number;
}): number {
  if (cylinders <= 0 || maxDutyCycle <= 0) return 0;
  const totalFlowLbHr = targetHp * bsfc;
  const perCylinderLbHr = totalFlowLbHr / cylinders;
  return perCylinderLbHr / maxDutyCycle;
}

/** Duty cycle a specific injector will run at for a target power figure. */
export function injectorDutyCycle({
  targetHp,
  bsfc,
  cylinders,
  injectorLbHr,
}: {
  targetHp: number;
  bsfc: number;
  cylinders: number;
  injectorLbHr: number;
}): number {
  if (cylinders <= 0 || injectorLbHr <= 0) return 0;
  const perCylinderLbHr = (targetHp * bsfc) / cylinders;
  return perCylinderLbHr / injectorLbHr;
}

/** Typical BSFC starting points by induction type, lb fuel per hp per hour. */
export const BSFC_PRESETS = [
  { key: "na", label: "Naturally aspirated, gasoline", bsfc: 0.5 },
  { key: "turbo-street", label: "Turbocharged, street tune", bsfc: 0.55 },
  { key: "turbo-race", label: "Turbocharged, aggressive/race tune", bsfc: 0.6 },
  { key: "e85", label: "Naturally aspirated, E85", bsfc: 0.7 },
];

/* --------------------------------------------------------------- fuel pump */

const GASOLINE_LB_PER_GAL = 6.15;
const LITRES_PER_GAL = 3.78541;

/** Required fuel pump flow in litres per hour for a target power figure. */
export function requiredPumpFlowLph({
  targetHp,
  bsfc,
  safetyFactor = 1.25,
}: {
  targetHp: number;
  bsfc: number;
  safetyFactor?: number;
}): number {
  const lbHr = targetHp * bsfc * safetyFactor;
  const galHr = lbHr / GASOLINE_LB_PER_GAL;
  return galHr * LITRES_PER_GAL;
}

/* ---------------------------------------------------------------- forced induction */

/**
 * Barometric formula: atmospheric pressure at altitude, standard atmosphere
 * model. Used so a boost pressure ratio is calculated against the pressure
 * actually available at the compressor inlet, not sea level.
 */
export function atmosphericPressureAtAltitude(altitudeFt: number, seaLevelPsi = 14.696): number {
  const ratio = 1 - 6.8755856e-6 * altitudeFt;
  return ratio > 0 ? seaLevelPsi * Math.pow(ratio, 5.2559) : 0;
}

export type BoostResult = {
  atmosphericPsi: number;
  absolutePsi: number;
  pressureRatio: number;
};

export function boostPressureRatio({
  boostPsi,
  altitudeFt = 0,
}: {
  boostPsi: number;
  altitudeFt?: number;
}): BoostResult {
  const atmosphericPsi = atmosphericPressureAtAltitude(altitudeFt);
  const absolutePsi = atmosphericPsi + boostPsi;
  return {
    atmosphericPsi,
    absolutePsi,
    pressureRatio: atmosphericPsi > 0 ? absolutePsi / atmosphericPsi : 0,
  };
}

/**
 * Rough potential power estimate from adding boost to a naturally aspirated
 * baseline. This scales with the absolute pressure ratio only — it assumes
 * the fuel system, intercooling and ignition timing all keep pace, which in
 * practice they often do not. Treat it as an optimistic ceiling, not a
 * prediction; real gains are reduced by intake and exhaust restriction,
 * intercooler heat soak, and how much timing has to be pulled for a given
 * fuel's octane rating.
 */
export const boostedPowerEstimate = (naHp: number, pressureRatio: number) => naHp * pressureRatio;

/* --------------------------------------------------------------- intercooler */

/**
 * Intercooler (charge air cooler) effectiveness, the same definition used for
 * any heat exchanger: how much of the available temperature drop was
 * actually achieved, from the hot inlet temperature down toward ambient.
 */
export function intercoolerEfficiency({
  hotInF,
  hotOutF,
  ambientF,
}: {
  hotInF: number;
  hotOutF: number;
  ambientF: number;
}): number {
  const available = hotInF - ambientF;
  return available > 0 ? ((hotInF - hotOutF) / available) * 100 : 0;
}
