import type { IconName } from "../data";

/**
 * Registry for the /tools section. Server-only metadata: the hub page, the
 * header nav, the sitemap and the cross-links between tools all read from here
 * so a new tool is added in exactly one place.
 */

export type ToolEntry = {
  slug: string;
  /** Short name used in navigation and cross-links. */
  name: string;
  /** H1 and <title> subject — matches how people search for it. */
  title: string;
  metaTitle: string;
  description: string;
  /** One line for the hub card. */
  blurb: string;
  icon: IconName;
  /** Grouping on the hub page. */
  family:
    | "tire"
    | "drivetrain"
    | "fitment"
    | "engine"
    | "running-cost"
    | "identity"
    | "performance"
    | "conversion";
  /** Slugs of tools worth offering next. */
  related: string[];
};

export const toolPath = (slug: string) => `/tools/${slug}`;

export const tools: ToolEntry[] = [
  {
    slug: "tire-size-calculator",
    name: "Tire Size Calculator",
    title: "Tire Size Calculator",
    metaTitle: "Tire Size Calculator — Diameter, Width & Revs Per Mile",
    description:
      "Enter any tire size and get overall diameter, sidewall height, section width, circumference and revolutions per mile — with the working shown.",
    blurb: "Overall diameter, sidewall, circumference and revs per mile from any metric or flotation size.",
    icon: "diagram",
    family: "tire",
    related: ["tire-size-comparison", "speedometer-error-calculator", "gear-ratio-calculator"],
  },
  {
    slug: "tire-size-comparison",
    name: "Tire Size Comparison",
    title: "Tire Size Comparison Tool",
    metaTitle: "Tire Size Comparison — Side-by-Side Diameter & Speedo Error",
    description:
      "Compare two tire sizes side by side. See the diameter change, clearance gain, speedometer error and whether the swap stays inside the 3% rule.",
    blurb: "Two sizes, scale drawing, diameter delta, clearance change and speedometer error.",
    icon: "timing",
    family: "tire",
    related: ["tire-size-calculator", "speedometer-error-calculator", "wheel-offset-calculator"],
  },
  {
    slug: "speedometer-error-calculator",
    name: "Speedometer Error Calculator",
    title: "Speedometer Error Calculator",
    metaTitle: "Speedometer Error Calculator — Tire Size Speedo & Odometer Drift",
    description:
      "Work out how far your speedometer reads off after a tire size change, what your true speed is, and how much the odometer drifts per 1,000 miles.",
    blurb: "True speed against indicated speed after a tire change, plus odometer drift.",
    icon: "timing",
    family: "drivetrain",
    related: ["tire-size-comparison", "gear-ratio-calculator", "tire-size-calculator"],
  },
  {
    slug: "gear-ratio-calculator",
    name: "Gear Ratio Calculator",
    title: "Gear Ratio Calculator",
    metaTitle: "Gear Ratio Calculator — RPM, Axle Ratio & Tire Size",
    description:
      "Calculate cruising RPM from axle ratio, transmission gear and tire diameter — and find the axle ratio that restores stock RPM after a tire size change.",
    blurb: "Cruising RPM from axle ratio and tire size, plus the regear that restores stock behaviour.",
    icon: "firing",
    family: "drivetrain",
    related: ["speedometer-error-calculator", "tire-size-comparison", "tire-size-calculator"],
  },
  {
    slug: "wheel-offset-calculator",
    name: "Wheel Offset Calculator",
    title: "Wheel Offset Calculator",
    metaTitle: "Wheel Offset Calculator — Offset, Backspacing & Poke",
    description:
      "Compare a new wheel against your current one. See how far it pokes out, how much closer it sits to the strut, and the backspacing that offset works out to.",
    blurb: "How far a new offset pokes out or tucks in, with backspacing conversion.",
    icon: "sequence",
    family: "fitment",
    related: ["wheel-backspacing-calculator", "tire-size-comparison", "tire-size-calculator"],
  },
  {
    slug: "wheel-backspacing-calculator",
    name: "Wheel Backspacing Calculator",
    title: "Wheel Backspacing Calculator",
    metaTitle: "Wheel Backspacing Calculator — Backspacing to Offset Conversion",
    description:
      "Convert between wheel backspacing and offset in both directions, and see what a backspacing change does to inboard clearance and track width.",
    blurb: "Backspacing to offset and back, with the clearance consequence of each change.",
    icon: "sequence",
    family: "fitment",
    related: ["wheel-offset-calculator", "tire-size-comparison", "tire-size-calculator"],
  },
  {
    slug: "engine-displacement-calculator",
    name: "Engine Displacement Calculator",
    title: "Engine Displacement Calculator",
    metaTitle: "Engine Displacement Calculator — Bore, Stroke, CI, cc & Litres",
    description:
      "Calculate engine displacement from bore, stroke and cylinder count in cubic inches, cc and litres, with overbore steps and the bore/stroke ratio.",
    blurb: "Cubic inches, cc and litres from bore and stroke, plus overbore steps.",
    icon: "diagram",
    family: "engine",
    related: ["compression-ratio-calculator", "horsepower-torque-rpm-calculator", "gear-ratio-calculator"],
  },
  {
    slug: "compression-ratio-calculator",
    name: "Compression Ratio Calculator",
    title: "Compression Ratio Calculator",
    metaTitle: "Compression Ratio Calculator — Chamber, Gasket, Deck & Piston",
    description:
      "Work out static compression ratio from bore, stroke, chamber volume, gasket, deck clearance and piston dome or dish — and see what each one contributes.",
    blurb: "Static compression from every volume above the piston, itemised.",
    icon: "valve",
    family: "engine",
    related: ["engine-displacement-calculator", "horsepower-torque-rpm-calculator", "gear-ratio-calculator"],
  },
  {
    slug: "horsepower-torque-rpm-calculator",
    name: "HP, Torque & RPM Calculator",
    title: "Horsepower, Torque and RPM Calculator",
    metaTitle: "Horsepower & Torque Calculator — Solve HP, Torque or RPM",
    description:
      "Solve for horsepower, torque or RPM from the other two. Includes kW, Nm and PS conversions, and why every curve crosses at 5,252 RPM.",
    blurb: "Solve any one of horsepower, torque or RPM from the other two.",
    icon: "firing",
    family: "engine",
    related: ["engine-displacement-calculator", "compression-ratio-calculator", "gear-ratio-calculator"],
  },
  {
    slug: "fuel-cost-calculator",
    name: "MPG & Fuel Cost Calculator",
    title: "MPG and Fuel Cost Calculator",
    metaTitle: "Fuel Cost & MPG Calculator — Cost Per Mile, Trip & Range",
    description:
      "Calculate real MPG from your own fill-up, then cost per mile, trip cost, annual fuel spend and how far a tank will take you. Includes L/100km.",
    blurb: "Real MPG from a fill-up, then cost per mile, trip cost and tank range.",
    icon: "fluid",
    family: "running-cost",
    related: ["tire-size-calculator", "gear-ratio-calculator", "engine-displacement-calculator"],
  },
  {
    slug: "tire-diameter-calculator",
    name: "Tire Diameter Calculator",
    title: "Tire Diameter Calculator",
    metaTitle: "Tire Diameter Calculator — Find Sizes by Overall Height",
    description:
      "Work out a tire's overall diameter, or go the other way: name the height you want and see which real sizes actually reach it on your rim.",
    blurb: "Diameter from a size, and — the useful direction — real sizes that hit a target height.",
    icon: "diagram",
    family: "tire",
    related: ["tire-size-calculator", "tire-circumference-calculator", "tire-size-comparison"],
  },
  {
    slug: "tire-circumference-calculator",
    name: "Tire Circumference Calculator",
    title: "Tire Circumference Calculator",
    metaTitle: "Tire Circumference Calculator — Rolling Distance & Revs Per Mile",
    description:
      "Rolling circumference and revolutions per mile for any tire size — the two figures your speedometer, odometer, ABS and traction control are all calibrated against.",
    blurb: "Rolling distance per revolution and revs per mile, the figures the ECU actually uses.",
    icon: "timing",
    family: "tire",
    related: ["tire-diameter-calculator", "speedometer-error-calculator", "tire-size-calculator"],
  },
  {
    slug: "vin-decoder",
    name: "VIN Decoder",
    title: "VIN Decoder",
    metaTitle: "Free VIN Decoder — Check Digit Validation & NHTSA Lookup",
    description:
      "Decode any 17-character VIN against NHTSA's public database, and validate the check digit in your browser first so a mistyped VIN is caught before anything is sent.",
    blurb: "Check-digit validation in the browser, then a full decode from NHTSA. Nothing logged.",
    icon: "sequence",
    family: "identity",
    related: ["tire-size-calculator", "engine-displacement-calculator", "fuel-cost-calculator"],
  },
  {
    slug: "bolt-pattern-calculator",
    name: "Bolt Pattern Calculator",
    title: "Bolt Pattern Calculator",
    metaTitle: "Bolt Pattern Calculator — PCD, mm to Inch & Compatibility",
    description:
      "Convert a bolt pattern between millimetres and inches, work out PCD from a stud measurement, and see which patterns are genuinely interchangeable rather than merely close.",
    blurb: "PCD in both units, measured from your own wheel, with the close-but-wrong patterns flagged.",
    icon: "sequence",
    family: "fitment",
    related: ["wheel-offset-calculator", "wheel-backspacing-calculator", "tire-size-calculator"],
  },
  {
    slug: "torque-converter",
    name: "Torque Converter",
    title: "Torque Unit Converter",
    metaTitle: "Nm to lb-ft Converter — Torque Units Including kgf·m",
    description:
      "Convert torque between newton-metres, pound-feet, kilogram-force metres and pound-inches, with the tolerance guidance a specification actually needs.",
    blurb: "Nm, lb·ft, kgf·m and lb·in, with a note on how much rounding a spec can take.",
    icon: "torque",
    family: "conversion",
    related: ["horsepower-torque-rpm-calculator", "wheel-torque-calculator", "tire-pressure-converter"],
  },
  {
    slug: "tire-pressure-converter",
    name: "Tire Pressure Converter",
    title: "Tire Pressure Converter",
    metaTitle: "PSI to Bar & kPa Converter — Tire Pressure Units",
    description:
      "Convert tire pressure between psi, bar, kPa, atmospheres and kgf/cm², with the cold-pressure and temperature rules that decide what to actually set.",
    blurb: "psi, bar, kPa and more — plus why the placard figure is a cold pressure.",
    icon: "fluid",
    family: "conversion",
    related: ["tire-size-calculator", "torque-converter", "tire-size-comparison"],
  },
  {
    slug: "rpm-speed-calculator",
    name: "RPM and Speed Calculator",
    title: "Engine RPM and Road Speed Calculator",
    metaTitle: "Engine RPM at Speed Calculator — Speed at RPM & Overall Ratio",
    description:
      "Solve engine RPM from road speed or road speed from RPM, through every transmission gear, with the overall drivetrain ratio shown for each.",
    blurb: "RPM at any speed and speed at any RPM, gear by gear, with overall ratios.",
    icon: "timing",
    family: "drivetrain",
    related: ["gear-ratio-calculator", "wheel-torque-calculator", "tire-size-calculator"],
  },
  {
    slug: "power-to-weight-calculator",
    name: "Power-to-Weight Calculator",
    title: "Power-to-Weight Ratio Calculator",
    metaTitle: "Power-to-Weight Ratio Calculator — hp/ton, lb/hp & W/kg",
    description:
      "Work out power to weight in every unit it gets quoted in, and see what the figure actually predicts about how a vehicle performs.",
    blurb: "hp per ton, pounds per hp, W/kg and kW/tonne, with what each figure implies.",
    icon: "firing",
    family: "performance",
    related: ["quarter-mile-calculator", "horsepower-torque-rpm-calculator", "wheel-torque-calculator"],
  },
  {
    slug: "quarter-mile-calculator",
    name: "Quarter Mile & 0–60 Calculator",
    title: "Quarter Mile and 0–60 MPH Calculator",
    metaTitle: "Quarter Mile Calculator — ET, Trap Speed & 0-60 MPH Estimate",
    description:
      "Estimate quarter-mile elapsed time and trap speed with the Hale formulas, plus a 0–60 figure from the energy method, and see why trap speed is the number to trust.",
    blurb: "ET and trap speed from the drag-strip formulas, plus an honest 0–60 estimate.",
    icon: "firing",
    family: "performance",
    related: ["power-to-weight-calculator", "horsepower-torque-rpm-calculator", "rpm-speed-calculator"],
  },
  {
    slug: "wheel-torque-calculator",
    name: "Wheel Torque Calculator",
    title: "Wheel Torque Calculator",
    metaTitle: "Wheel Torque Calculator — Torque at the Drive Wheels",
    description:
      "Work out torque at the drive wheels through the transmission and final drive, and the tractive force it puts at the contact patch.",
    blurb: "Engine torque multiplied through the drivetrain, and the force it produces.",
    icon: "torque",
    family: "performance",
    related: ["rpm-speed-calculator", "gear-ratio-calculator", "power-to-weight-calculator"],
  },
  {
    slug: "piston-speed-calculator",
    name: "Piston Speed Calculator",
    title: "Mean Piston Speed Calculator",
    metaTitle: "Piston Speed Calculator — Mean Piston Speed & Safe RPM Limit",
    description:
      "Calculate mean piston speed from stroke and RPM, and find the engine speed at which a given stroke reaches each accepted durability threshold.",
    blurb: "Mean piston speed from stroke and RPM — the real limit on a long-stroke engine.",
    icon: "valve",
    family: "engine",
    related: ["engine-displacement-calculator", "compression-ratio-calculator", "horsepower-torque-rpm-calculator"],
  },
  {
    slug: "psi-bar-converter",
    name: "PSI to Bar Converter",
    title: "PSI to Bar Converter",
    metaTitle: "PSI to Bar Converter — Tire and Fastener Pressure",
    description:
      "Convert between psi and bar in either direction, with the tire and small-fastener pressures each unit is normally used for.",
    blurb: "psi and bar, either direction, with common tire pressures already worked out.",
    icon: "fluid",
    family: "conversion",
    related: ["tire-pressure-converter", "psi-kpa-converter", "tire-size-calculator"],
  },
  {
    slug: "psi-kpa-converter",
    name: "PSI to kPa Converter",
    title: "PSI to kPa Converter",
    metaTitle: "PSI to kPa Converter — SI Pressure Conversion",
    description:
      "Convert between psi and kilopascals in either direction — the SI pressure unit used on many import vehicle placards and workshop equipment.",
    blurb: "psi and kPa, either direction, matched against common placard values.",
    icon: "fluid",
    family: "conversion",
    related: ["tire-pressure-converter", "psi-bar-converter", "tire-size-calculator"],
  },
  {
    slug: "mpg-l100km-converter",
    name: "MPG to L/100km Converter",
    title: "MPG to L/100km Converter",
    metaTitle: "MPG to L/100km Converter — Fuel Economy Unit Conversion",
    description:
      "Convert fuel economy between miles per US gallon and litres per 100 kilometres, and see why equal MPG gains are not equal fuel savings.",
    blurb: "MPG and L/100km, either direction, with the inverse-scale trap explained.",
    icon: "fluid",
    family: "conversion",
    related: ["fuel-cost-calculator", "tire-pressure-converter", "torque-converter"],
  },
  {
    slug: "hp-kw-converter",
    name: "HP to kW Converter",
    title: "Horsepower to kW Converter",
    metaTitle: "HP to kW Converter — Horsepower, Kilowatts & PS",
    description:
      "Convert between mechanical horsepower, kilowatts and metric horsepower (PS), the three units engine power gets quoted in worldwide.",
    blurb: "hp, kW and PS together, with the three-way mix-up explained.",
    icon: "firing",
    family: "conversion",
    related: ["horsepower-torque-rpm-calculator", "torque-converter", "power-to-weight-calculator"],
  },
  {
    slug: "final-drive-ratio-calculator",
    name: "Final Drive / Differential Ratio Calculator",
    title: "Final Drive and Differential Ratio Calculator",
    metaTitle: "Final Drive Ratio Calculator — From Ring & Pinion Teeth",
    description:
      "Work out final drive (differential) ratio directly from ring and pinion tooth counts — the physical definition of the number stamped on the axle tag.",
    blurb: "Axle ratio from ring and pinion tooth counts, the way it is actually defined.",
    icon: "sequence",
    family: "drivetrain",
    related: ["gear-ratio-calculator", "regear-calculator", "overall-gear-ratio-calculator"],
  },
  {
    slug: "transmission-gear-ratio-calculator",
    name: "Transmission Gear Ratio Calculator",
    title: "Transmission Gear Ratio Calculator",
    metaTitle: "Transmission Gear Ratio Calculator — From Input & Output RPM",
    description:
      "Measure a single transmission gear's ratio from input and output shaft speed, without pulling the gearbox apart to count teeth.",
    blurb: "One gear's ratio from a lift-test RPM reading, input against output.",
    icon: "sequence",
    family: "drivetrain",
    related: ["overall-gear-ratio-calculator", "final-drive-ratio-calculator", "gear-ratio-calculator"],
  },
  {
    slug: "overall-gear-ratio-calculator",
    name: "Overall Gear Ratio Calculator",
    title: "Overall Gear Ratio Calculator",
    metaTitle: "Overall Gear Ratio Calculator — Transmission × Axle × Transfer Case",
    description:
      "Multiply transmission gear, final drive and an optional transfer case ratio into the single overall ratio that actually relates engine speed to the road.",
    blurb: "The full chain multiplied together, transfer case included.",
    icon: "sequence",
    family: "drivetrain",
    related: ["final-drive-ratio-calculator", "transmission-gear-ratio-calculator", "wheel-torque-calculator"],
  },
  {
    slug: "regear-calculator",
    name: "Regear Calculator",
    title: "Regear Calculator",
    metaTitle: "Regear Calculator — Axle Ratio for a Target Cruising RPM",
    description:
      "Work backwards from a target cruising RPM to the axle ratio that produces it — for a tire size change, a build, or matching a specific highway speed.",
    blurb: "Start from the RPM you want and solve for the ratio that gets you there.",
    icon: "firing",
    family: "drivetrain",
    related: ["gear-ratio-calculator", "final-drive-ratio-calculator", "rpm-speed-calculator"],
  },
  {
    slug: "bore-stroke-calculator",
    name: "Bore & Stroke Calculator",
    title: "Bore and Stroke Calculator",
    metaTitle: "Bore & Stroke Calculator — Solve for Bore, Stroke or Displacement",
    description:
      "Solve for the bore or stroke a target displacement requires, or check what a specific bore and stroke combination actually displaces.",
    blurb: "Work backwards from a target displacement to the bore or stroke it needs.",
    icon: "valve",
    family: "engine",
    related: ["engine-displacement-calculator", "compression-ratio-calculator", "piston-speed-calculator"],
  },
];

export const toolBySlug = (slug: string) => tools.find((tool) => tool.slug === slug);

export const FAMILIES: { key: ToolEntry["family"]; title: string; note: string }[] = [
  {
    key: "tire",
    title: "Tire sizing",
    note: "Read a sidewall, measure it, and compare one size against another",
  },
  {
    key: "drivetrain",
    title: "Drivetrain and speed",
    note: "What a size change does to engine speed, indicated speed and mileage",
  },
  {
    key: "fitment",
    title: "Wheel fitment",
    note: "Offset, backspacing, poke and inboard clearance",
  },
  {
    key: "engine",
    title: "Engine building",
    note: "Displacement, compression and the relationship between power and torque",
  },
  {
    key: "running-cost",
    title: "Running costs",
    note: "What the vehicle actually costs to fuel, per mile and per year",
  },
  {
    key: "identity",
    title: "Vehicle identity",
    note: "Reading what a vehicle actually is, from the number stamped on it",
  },
  {
    key: "performance",
    title: "Performance estimates",
    note: "What the numbers predict about acceleration and force at the road",
  },
  {
    key: "conversion",
    title: "Unit conversion",
    note: "Torque and pressure between the units specifications actually use",
  },
];
