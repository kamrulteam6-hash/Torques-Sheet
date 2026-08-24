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
  family: "tire" | "drivetrain" | "fitment" | "engine" | "running-cost" | "identity";
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
];
