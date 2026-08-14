export type IconName = "torque" | "firing" | "fluid" | "spark" | "sequence" | "timing" | "valve" | "diagram";

export const categories = [
  { slug: "torque-specs", title: "Torque Specs", note: "Lug nuts · Head bolts · Manifolds", icon: "torque" as IconName },
  { slug: "firing-order", title: "Firing Orders", note: "V6 · V8 · Diesel · Classic", icon: "firing" as IconName },
  { slug: "fluid-capacities", title: "Oil & Fluid Capacities", note: "Engine oil · Coolant · Transmission", icon: "fluid" as IconName },
  { slug: "ignition-specs", title: "Spark Plug Gaps", note: "Gap specs · Tolerances · Types", icon: "spark" as IconName },
  { slug: "bolt-sequences", title: "Bolt Torque Sequences", note: "Step-by-step · Patterns · Diagrams", icon: "sequence" as IconName },
  { slug: "timing-ignition", title: "Timing & Ignition", note: "Timing marks · Advance · Specs", icon: "timing" as IconName },
  { slug: "valve-specs", title: "Valve Specifications", note: "Clearance · Lash · Dimensions", icon: "valve" as IconName },
  { slug: "diagrams", title: "Mechanical Diagrams", note: "Exploded views · Assembly · More", icon: "diagram" as IconName },
];

export const makes = ["Chevrolet", "Ford", "Toyota", "Honda", "Ram", "Jeep", "Nissan", "Subaru", "Hyundai", "BMW"];

export const popular = [
  { label: "Chevy 350 Firing Order", href: "/specs/chevrolet/350/firing-order" },
  { label: "Chevy 350 Head Bolt Torque", href: "/specs/chevrolet/350/cylinder-head-torque" },
  { label: "Chevy 350 Spark Plug Gap", href: "/specs/chevrolet/350/spark-plug-gap" },
  { label: "Chevy 350 Oil Capacity", href: "/specs/chevrolet/350/oil-capacity" },
  { label: "Chevy 350 Timing Specs", href: "/specs/chevrolet/350/ignition-timing" },
  { label: "Chevy 350 Valve Adjustment", href: "/specs/chevrolet/350/valve-lash-adjustment" },
];

export const vehicleData: Record<string, Record<string, string[]>> = {
  Chevrolet: { "Silverado 1500": ["5.3L V8", "6.2L V8"], Camaro: ["3.6L V6", "6.2L V8"], "350 Small Block": ["5.7L V8"] },
  Ford: { "F-150": ["2.7L EcoBoost", "3.5L EcoBoost", "5.0L V8"], Mustang: ["2.3L EcoBoost", "5.0L V8"] },
  Toyota: { RAV4: ["2.5L I4", "2.5L Hybrid"], Tacoma: ["2.4L Turbo", "3.5L V6"] },
  Honda: { Civic: ["1.5L Turbo", "2.0L I4"], Accord: ["1.5L Turbo", "2.0L Hybrid"] },
  Ram: { "1500": ["3.6L V6", "5.7L HEMI V8"] },
  Jeep: { Wrangler: ["2.0L Turbo", "3.6L V6"], "4.0 Engine": ["4.0L I6"] },
  Nissan: { Altima: ["2.5L I4"], Frontier: ["3.8L V6"] },
  Subaru: { Outback: ["2.4L Turbo", "2.5L Boxer"] },
  Hyundai: { Tucson: ["2.5L I4", "1.6L Hybrid"] },
  BMW: { "3 Series": ["2.0L Turbo I4", "3.0L Turbo I6"] },
};

export { chevy350Specs as specs } from "./chevy350-content";
export type { SpecRecord } from "./chevy350-content";

export const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
