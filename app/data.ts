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
  { label: "Ford F-150 Lug Nut Torque", href: "/specs/ford/f-150/lug-nut-torque" },
  { label: "Toyota RAV4 Oil Capacity", href: "/specs/toyota/rav4/oil-capacity" },
  { label: "Honda Civic Spark Plug Gap", href: "/specs/honda/civic/spark-plug-gap" },
  { label: "Ram 1500 HEMI Specs", href: "/specs/ram/1500/hemi-specs" },
  { label: "Jeep 4.0 Firing Order", href: "/specs/jeep/4-0/firing-order" },
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

export type SpecRecord = {
  slug: string; make: string; model: string; category: string; title: string;
  answer: string; detail: string; values: { label: string; value: string; note: string }[];
};

export const specs: SpecRecord[] = [
  { slug: "chevrolet/350/firing-order", make: "Chevrolet", model: "350 (5.7L V8)", category: "Firing Order", title: "Chevy 350 Firing Order", answer: "The standard Chevrolet small-block 350 firing order is 1-8-4-3-6-5-7-2. The distributor rotates clockwise.", detail: "Cylinder numbering places 1-3-5-7 on the driver side and 2-4-6-8 on the passenger side, viewed from the driver seat.", values: [{ label: "Firing order", value: "1-8-4-3-6-5-7-2", note: "Standard small-block V8" }, { label: "Distributor rotation", value: "Clockwise", note: "Viewed from above" }, { label: "Cylinder 1", value: "Driver-side front", note: "Front of engine" }] },
  { slug: "ford/f-150/lug-nut-torque", make: "Ford", model: "F-150", category: "Torque Specs", title: "Ford F-150 Lug Nut Torque", answer: "F-150 wheel torque depends on model year, wheel, and lug size. Select the exact year and configuration before tightening fasteners.", detail: "Use a calibrated torque wrench, clean dry threads unless the service procedure states otherwise, and tighten in a star pattern.", values: [{ label: "Configuration", value: "Year-specific", note: "Confirm wheel and stud size" }, { label: "Tightening pattern", value: "Star / cross", note: "Seat the wheel evenly" }, { label: "Recheck", value: "After wheel service", note: "Follow the owner manual" }] },
  { slug: "toyota/rav4/oil-capacity", make: "Toyota", model: "RAV4", category: "Fluid Capacities", title: "Toyota RAV4 Oil Capacity", answer: "RAV4 oil capacity varies by model year, engine, drivetrain, and filter change. Match the engine code before filling.", detail: "Add oil gradually, run the engine, allow it to settle on level ground, and verify the final level with the dipstick.", values: [{ label: "Capacity", value: "Engine-specific", note: "With or without filter differs" }, { label: "Viscosity", value: "Year-specific", note: "Read the oil cap and manual" }, { label: "Final check", value: "Dipstick", note: "Vehicle level, engine settled" }] },
  { slug: "honda/civic/spark-plug-gap", make: "Honda", model: "Civic", category: "Ignition Specs", title: "Honda Civic Spark Plug Gap", answer: "The correct Civic spark plug gap depends on model year, engine code, and the specified plug. Confirm the plug part number before installation.", detail: "Many modern fine-wire plugs are supplied pre-gapped and can be damaged by aggressive adjustment. Always follow the plug maker and Honda service information.", values: [{ label: "Gap", value: "Engine-specific", note: "Confirm engine code" }, { label: "Plug type", value: "OEM-equivalent", note: "Match heat range" }, { label: "Installation", value: "Service-manual torque", note: "Cold engine" }] },
  { slug: "ram/1500/hemi-specs", make: "Ram", model: "1500 5.7L HEMI", category: "Engine Specs", title: "Ram 1500 5.7 HEMI Specs", answer: "5.7L HEMI service specifications vary across generations and model years. Use the VIN and engine code to choose the correct procedure.", detail: "This reference groups firing order, fluid, ignition, and fastener data by the exact powertrain configuration.", values: [{ label: "Displacement", value: "5.7 L", note: "HEMI V8 family" }, { label: "Configuration", value: "V8", note: "Model-year variations apply" }, { label: "Data match", value: "VIN + engine code", note: "Required for service values" }] },
  { slug: "jeep/4-0/firing-order", make: "Jeep", model: "4.0L I6", category: "Firing Order", title: "Jeep 4.0 Firing Order", answer: "The Jeep 4.0L inline-six firing order is 1-5-3-6-2-4. Cylinder 1 is at the front of the engine.", detail: "Trace one wire at a time when servicing the ignition system to keep the cap and cylinder routing in order.", values: [{ label: "Firing order", value: "1-5-3-6-2-4", note: "4.0L inline-six" }, { label: "Cylinder 1", value: "Front", note: "Radiator end" }, { label: "Cylinder layout", value: "1 through 6", note: "Front to rear" }] },
];

export const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
