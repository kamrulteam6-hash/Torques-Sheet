/**
 * VIN structure and check-digit arithmetic. Dependency-free, so it runs both in
 * the client island and in the route handler.
 *
 * Validating locally before calling anything matters for two reasons: the
 * reader gets an answer the moment they finish typing, and a VIN that cannot
 * possibly be real never leaves the browser.
 */

/** ISO 3779 length. I, O and Q are excluded to avoid confusion with 1 and 0. */
export const VIN_LENGTH = 17;
const INVALID_LETTERS = /[IOQ]/;

/** Transliteration values for the check-digit calculation. */
const TRANSLITERATE: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
  J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
  S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
};

/** Positional weights. Position 9 is the check digit itself, so it weighs 0. */
const WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

/**
 * Model year is encoded in position 10 on a 30-year cycle. Position 7 breaks
 * the ambiguity on light vehicles: a letter there means 2010 or later.
 */
const YEAR_CODES = "ABCDEFGHJKLMNPRSTVWXY123456789";

export type VinCheck = {
  vin: string;
  /** 17 characters, no I, O or Q. */
  wellFormed: boolean;
  /** The check digit calculation agrees with position 9. */
  checkDigitValid: boolean;
  expectedCheckDigit: string | null;
  actualCheckDigit: string | null;
  problems: string[];
};

export function normaliseVin(input: string) {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, VIN_LENGTH);
}

export function computeCheckDigit(vin: string): string | null {
  if (vin.length !== VIN_LENGTH) return null;
  let sum = 0;
  for (let i = 0; i < VIN_LENGTH; i++) {
    const char = vin[i];
    const value = /\d/.test(char) ? Number(char) : TRANSLITERATE[char];
    if (value === undefined) return null;
    sum += value * WEIGHTS[i];
  }
  const remainder = sum % 11;
  return remainder === 10 ? "X" : String(remainder);
}

export function checkVin(input: string): VinCheck {
  const vin = normaliseVin(input);
  const problems: string[] = [];

  if (vin.length !== VIN_LENGTH) {
    problems.push(`A VIN is ${VIN_LENGTH} characters — this one has ${vin.length}.`);
  }
  if (INVALID_LETTERS.test(vin)) {
    problems.push("VINs never contain I, O or Q, because they are too easily confused with 1 and 0.");
  }

  const expected = problems.length === 0 ? computeCheckDigit(vin) : null;
  const actual = vin.length === VIN_LENGTH ? vin[8] : null;
  const checkDigitValid = expected !== null && expected === actual;

  if (expected !== null && !checkDigitValid) {
    problems.push(
      `The check digit does not agree: position 9 reads ${actual}, but the other sixteen characters calculate to ${expected}. Usually a typo somewhere in the VIN.`,
    );
  }

  return {
    vin,
    wellFormed: vin.length === VIN_LENGTH && !INVALID_LETTERS.test(vin),
    checkDigitValid,
    expectedCheckDigit: expected,
    actualCheckDigit: actual,
    problems,
  };
}

export type VinSection = {
  label: string;
  positions: string;
  value: string;
  meaning: string;
};

/** Breaks a VIN into its standard sections, whatever the decode returns. */
export function vinSections(vin: string): VinSection[] {
  if (vin.length !== VIN_LENGTH) return [];
  return [
    {
      label: "World Manufacturer Identifier",
      positions: "1–3",
      value: vin.slice(0, 3),
      meaning:
        "Country, manufacturer and vehicle type. The first character is the region — 1, 4 and 5 are the United States, 2 is Canada, 3 is Mexico, J is Japan, K is Korea, S is the United Kingdom, W is Germany.",
    },
    {
      label: "Vehicle Descriptor Section",
      positions: "4–8",
      value: vin.slice(3, 8),
      meaning:
        "Manufacturer-defined: model, body style, engine, restraint system and often the series. This is where the engine code lives, and it is the part that matters most for parts and specifications.",
    },
    {
      label: "Check digit",
      positions: "9",
      value: vin[8],
      meaning:
        "Calculated from the other sixteen characters. Its only job is to catch transcription errors, and it is why a mistyped VIN can be detected without any database at all.",
    },
    {
      label: "Model year",
      positions: "10",
      value: vin[9],
      meaning: `${modelYearFromCode(vin[9], vin[6])} — encoded on a 30-year cycle, so the same letter repeats. Position 7 disambiguates: a letter there means 2010 or later.`,
    },
    {
      label: "Plant code",
      positions: "11",
      value: vin[10],
      meaning:
        "The assembly plant, defined by the manufacturer. Useful when a recall or service bulletin applies only to vehicles from one plant or build window.",
    },
    {
      label: "Serial number",
      positions: "12–17",
      value: vin.slice(11),
      meaning:
        "The individual vehicle's sequential number. This is what makes the VIN unique, and it is also the part worth redacting if you post a VIN publicly.",
    },
  ];
}

/**
 * Decodes position 10 into a year. The cycle repeats every 30 years, so this
 * returns both candidates unless position 7 resolves it.
 */
export function modelYearFromCode(code: string, seventh?: string): string {
  const index = YEAR_CODES.indexOf(code.toUpperCase());
  if (index === -1) return "Not a valid model-year code";
  const first = 1980 + index;
  const second = first + 30;
  // On light vehicles a letter in position 7 indicates 2010 or later.
  if (seventh && /[A-Z]/.test(seventh)) return String(second >= 2010 ? second : second + 30);
  if (seventh && /\d/.test(seventh)) return String(first);
  return `${first} or ${second}`;
}

/** Region implied by the first character, for an immediate sanity check. */
export function vinRegion(first: string): string {
  const map: Record<string, string> = {
    "1": "United States",
    "4": "United States",
    "5": "United States",
    "2": "Canada",
    "3": "Mexico",
    "6": "Australia",
    "7": "New Zealand",
    "8": "Argentina, Chile or Peru",
    "9": "Brazil",
    J: "Japan",
    K: "South Korea",
    L: "China",
    M: "India, Indonesia or Thailand",
    S: "United Kingdom",
    T: "Switzerland, Czechia or Hungary",
    V: "France, Spain or Austria",
    W: "Germany",
    X: "Russia or former Soviet states",
    Y: "Sweden, Finland or Belgium",
    Z: "Italy",
  };
  return map[first.toUpperCase()] ?? "Unrecognised region code";
}

/** Fields worth surfacing from a vPIC decode, in the order they read best. */
export const VIN_FIELD_ORDER: { key: string; label: string }[] = [
  { key: "ModelYear", label: "Model year" },
  { key: "Make", label: "Make" },
  { key: "Model", label: "Model" },
  { key: "Trim", label: "Trim" },
  { key: "Series", label: "Series" },
  { key: "BodyClass", label: "Body class" },
  { key: "VehicleType", label: "Vehicle type" },
  { key: "DriveType", label: "Drive type" },
  { key: "DisplacementL", label: "Displacement (L)" },
  { key: "DisplacementCI", label: "Displacement (ci)" },
  { key: "EngineCylinders", label: "Cylinders" },
  { key: "EngineConfiguration", label: "Engine configuration" },
  { key: "EngineHP", label: "Engine horsepower" },
  { key: "EngineModel", label: "Engine model" },
  { key: "FuelTypePrimary", label: "Fuel type" },
  { key: "FuelInjectionType", label: "Fuel injection" },
  { key: "TransmissionStyle", label: "Transmission" },
  { key: "Turbo", label: "Turbocharged" },
  { key: "GVWR", label: "Gross vehicle weight rating" },
  { key: "BrakeSystemType", label: "Brake system" },
  { key: "TPMS", label: "Tire pressure monitoring" },
  { key: "PlantCity", label: "Assembly plant" },
  { key: "PlantState", label: "Plant state" },
  { key: "PlantCountry", label: "Plant country" },
  { key: "Manufacturer", label: "Manufacturer" },
];
