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
  family: "tire" | "drivetrain" | "fitment";
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
];
