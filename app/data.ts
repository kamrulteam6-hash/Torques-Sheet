import { slugify } from "./slug";
export { slugify };
export type IconName =
  | "torque"
  | "firing"
  | "fluid"
  | "spark"
  | "sequence"
  | "timing"
  | "valve"
  | "diagram";

export const categories = [
  {
    slug: "torque-specs",
    title: "Torque Specs",
    note: "Lug nuts · Head bolts · Manifolds",
    icon: "torque" as IconName,
  },
  {
    slug: "firing-order",
    title: "Firing Orders",
    note: "V6 · V8 · Diesel · Classic",
    icon: "firing" as IconName,
  },
  {
    slug: "fluid-capacities",
    title: "Oil & Fluid Capacities",
    note: "Engine oil · Coolant · Transmission",
    icon: "fluid" as IconName,
  },
  {
    slug: "ignition-specs",
    title: "Spark Plug Gaps",
    note: "Gap specs · Tolerances · Types",
    icon: "spark" as IconName,
  },
  {
    slug: "bolt-sequences",
    title: "Bolt Torque Sequences",
    note: "Step-by-step · Patterns · Diagrams",
    icon: "sequence" as IconName,
  },
  {
    slug: "timing-ignition",
    title: "Timing & Ignition",
    note: "Timing marks · Advance · Specs",
    icon: "timing" as IconName,
  },
  {
    slug: "valve-specs",
    title: "Valve Specifications",
    note: "Clearance · Lash · Dimensions",
    icon: "valve" as IconName,
  },
  {
    slug: "diagrams",
    title: "Mechanical Diagrams",
    note: "Exploded views · Assembly · More",
    icon: "diagram" as IconName,
  },
  {
    slug: "vehicle-specs",
    title: "Vehicle Specifications",
    note: "Towing · Tire pressure · Capacities",
    icon: "torque" as IconName,
  },
  {
    slug: "engine-specs",
    title: "Engine Specifications",
    note: "Displacement · Bore · Output",
    icon: "timing" as IconName,
  },
  {
    slug: "brake-specs",
    title: "Brake Specifications",
    note: "Rotors · Pads · Caliper torque",
    icon: "sequence" as IconName,
  },
  {
    slug: "electrical-specs",
    title: "Electrical Specifications",
    note: "Charging · Starting · Wiring",
    icon: "spark" as IconName,
  },
  {
    slug: "performance-specs",
    title: "Performance Specs",
    note: "Horsepower · Torque · Ratings",
    icon: "firing" as IconName,
  },
];

export const makes = [
  "Chevrolet",
  "Ford",
  "Toyota",
  "Honda",
  "Ram",
  "Jeep",
  "GMC",
  "Dodge",
  "Nissan",
  "Subaru",
  "Hyundai",
  "BMW",
  "Kia",
  "Mazda",
  "Volkswagen",
  "Audi",
  "Mercedes-Benz",
  "Pontiac",
  "Oldsmobile",
  "Buick",
  "Mitsubishi",
];

export const popular = [
  {
    label: "Chevy 350 Firing Order",
    href: "/specs/chevrolet/350/firing-order",
  },
  {
    label: "Ford F-150 Lug Nut Torque",
    href: "/specs/ford/f-150/lug-nut-torque",
  },
  {
    label: "Toyota RAV4 Oil Capacity",
    href: "/specs/toyota/rav4/2-5/oil-capacity",
  },
  {
    label: "Honda Civic Spark Plug Gap",
    href: "/specs/honda/civic/spark-plug-gap",
  },
  {
    label: "Ram 1500 HEMI Oil Capacity",
    href: "/specs/ram/1500/5-7-hemi/oil-capacity",
  },
  {
    label: "Jeep Wrangler Lug Nut Torque",
    href: "/specs/jeep/wrangler/lug-nut-torque",
  },
];

export const vehicleData: Record<string, Record<string, string[]>> = {
  Chevrolet: {
    "Silverado 1500": ["5.3L V8", "6.2L V8"],
    Camaro: ["3.6L V6", "6.2L V8"],
    Tahoe: ["5.3L V8", "6.2L V8"],
    Suburban: ["5.3L V8", "6.2L V8"],
    "350 Small Block": ["5.7L V8"],
  },
  Ford: {
    "F-150": ["2.7L EcoBoost", "3.5L EcoBoost", "5.0L V8"],
    Mustang: ["2.3L EcoBoost", "5.0L V8"],
    Explorer: ["2.3L Turbo", "3.0L V6"],
    Escape: ["1.5L Turbo", "2.0L Turbo", "Hybrid"],
    Edge: ["2.0L Turbo", "2.7L V6"],
  },
  Toyota: {
    RAV4: ["2.5L I4", "2.5L Hybrid"],
    Tacoma: ["2.4L Turbo", "3.5L V6"],
    Camry: ["2.5L I4", "2.5L Hybrid"],
    Corolla: ["1.8L I4", "2.0L I4"],
    Highlander: ["2.4L Turbo", "2.5L Hybrid", "3.5L V6"],
    "4Runner": ["4.0L V6"],
    Tundra: ["3.4L Twin-Turbo", "5.7L V8"],
  },
  Honda: {
    Civic: ["1.5L Turbo", "2.0L I4"],
    Accord: ["1.5L Turbo", "2.0L Hybrid"],
    Pilot: ["3.5L V6"],
    Odyssey: ["3.5L V6"],
    "CR-V": ["1.5L Turbo", "2.4L I4", "Hybrid"],
  },
  Ram: { "1500": ["3.6L V6", "5.7L HEMI V8"] },
  Jeep: { Wrangler: ["2.0L Turbo", "3.6L V6"], "Grand Cherokee": ["2.0L Turbo", "3.6L V6", "5.7L V8"], "4.0 Engine": ["4.0L I6"] },
  GMC: { "Sierra 1500": ["5.3L V8", "6.2L V8"], Yukon: ["5.3L V8", "6.2L V8"] },
  Dodge: { "5.7 HEMI": ["5.7L V8"], Charger: ["3.6L V6", "5.7L V8"], Challenger: ["3.6L V6", "5.7L V8"] },
  Nissan: { Altima: ["2.5L I4"], Rogue: ["2.5L I4", "1.5L Turbo"], Frontier: ["3.8L V6"] },
  Subaru: { Outback: ["2.4L Turbo", "2.5L Boxer"], Forester: ["2.5L Boxer"], WRX: ["2.4L Turbo"] },
  Hyundai: { Tucson: ["2.5L I4", "1.6L Hybrid"], Elantra: ["2.0L I4", "1.6L Turbo"], Sonata: ["2.5L I4", "1.6L Turbo"], "Santa Fe": ["2.5L I4", "1.6L Hybrid"] },
  BMW: { "3 Series": ["2.0L Turbo I4", "3.0L Turbo I6"] },
  Kia: { Optima: ["2.4L I4", "2.0L Turbo"], Forte: ["2.0L I4", "1.6L Turbo"], Sorento: ["2.4L I4", "3.3L V6"] },
  Mazda: { "CX-5": ["2.5L I4"], Mazda3: ["2.5L I4"] },
  Volkswagen: { Jetta: ["1.4L Turbo"], Tiguan: ["2.0L TSI"] },
  Audi: { A4: ["2.0L TFSI"] },
  "Mercedes-Benz": { "C-Class": ["Factory wheel package"], "E-Class": ["Factory wheel package"], GLC: ["Factory wheel package"] },
  Pontiac: { "350 V8": ["Distributor ignition"], "400 V8": ["Distributor ignition"], "455 V8": ["Distributor ignition"] },
  Oldsmobile: { "350 Rocket V8": ["Distributor ignition"], "455 Rocket V8": ["Distributor ignition"] },
  Buick: { "350 V8": ["Distributor ignition"], "455 V8": ["Distributor ignition"] },
  Mitsubishi: { "4G63": ["Naturally aspirated", "Turbocharged"] },
};

import { chevy350Specs } from "./chevy350-content";
import { extendedSpecs } from "./extended-content";
import { additionalSpecs } from "./additional-content";
import { editorialBatchSpecs } from "./editorial-batch-content";
import { serviceBatchSpecs } from "./service-batch-content";
import { referenceBatchSpecs } from "./reference-batch-content";
import { classicPerformanceSpecs } from "./classic-performance-content";
import { dieselServiceSpecs } from "./diesel-service-content";
import { generalVehicleSpecs } from "./general-vehicle-content";
import { generalVehicleBatch2Specs } from "./general-vehicle-batch-2-content";
import { researchedDiagramSpecs } from "./researched-diagram-content";
import { researchedSystemSpecs } from "./researched-system-content";
import { exhaustDiagramSpecs } from "./exhaust-diagram-content";
import { valveAdjustmentSpecs } from "./valve-adjustment-content";
import { camTimingSpecs } from "./cam-timing-content";
import { flywheelSpecs } from "./flywheel-content";
import { frontServiceSpecs } from "./front-service-content";
import { valveCoverSpecs } from "./valve-cover-content";
import { reduceRepeatedCopy } from "./content-quality";
import { sanitizeSpecSources } from "./source-quality";
import { clampMetaDescription } from "./meta";
import type { SpecRecord } from "./chevy350-content";

/**
 * Source sanitisation runs before reduceRepeatedCopy, because the generated
 * copy names spec.sources[0] and must not reference a citation we removed.
 */
const prepare = (spec: SpecRecord, preserveLongForm: boolean) =>
  reduceRepeatedCopy(
    {
      ...sanitizeSpecSources(spec),
      metaDescription: clampMetaDescription(spec.metaDescription),
    },
    preserveLongForm,
  );

const researchedAdditionalSlugs = new Set([
  "jeep/wrangler/3-6/oil-capacity",
  "nissan/altima/lug-nut-torque",
  "nissan/rogue/lug-nut-torque",
  "subaru/outback/lug-nut-torque",
  "subaru/forester/lug-nut-torque",
  "toyota/corolla/lug-nut-torque",
  "toyota/highlander/lug-nut-torque",
  "ford/4-6/firing-order",
  "ford/5-4-triton/firing-order",
  "ford/5-4-triton/spark-plug-gap",
  "ford/2-7-ecoboost/oil-capacity",
  "chevrolet/454/firing-order",
  "chevrolet/305/firing-order",
  "chevrolet/454/head-bolt-torque",
  "chevrolet/3-6/timing-chain",
  "subaru/ej20/firing-order",
  "chevrolet/ls1/firing-order",
]);
const researchedExtendedSlugs = new Set([
  "toyota/rav4/2-5/oil-capacity",
  "toyota/rav4/lug-nut-torque",
  "toyota/camry/lug-nut-torque",
  "toyota/tacoma/lug-nut-torque",
  "honda/cr-v/lug-nut-torque",
  "honda/civic/lug-nut-torque",
  "ford/302/firing-order",
  "ford/351-windsor/firing-order",
  "ford/f-150/3-5-ecoboost/spark-plug-gap",
  "ford/f-150/5-0/oil-capacity",
  "honda/civic/spark-plug-gap",
  "chevrolet/silverado-1500/lug-nut-torque",
  "chevrolet/silverado-1500/5-3/oil-capacity",
  "ram/1500/5-7-hemi/oil-capacity",
  "gmc/sierra-1500/lug-nut-torque",
  "gmc/sierra-1500/5-3/oil-capacity",
  "ford/f-150/lug-nut-torque",
  "chevrolet/5-3/firing-order",
  "ram/1500/lug-nut-torque",
  "dodge/5-7-hemi/firing-order",
  "jeep/wrangler/lug-nut-torque",
]);
const researchedClassicSlugs = new Set([
  "pontiac/350/firing-order",
  "pontiac/400/firing-order",
  "pontiac/455/firing-order",
  "oldsmobile/350/firing-order",
  "oldsmobile/455/firing-order",
  "buick/350/firing-order",
  "buick/455/firing-order",
  "chevrolet/283/firing-order",
  "chevrolet/327/firing-order",
  "chevrolet/396/firing-order",
  "chevrolet/427/firing-order",
  "ford/390/firing-order",
  "ford/428/firing-order",
  "ford/460/firing-order",
  "ford/351-cleveland/firing-order",
  "ford/289/firing-order",
  "toyota/3tc/firing-order",
  "toyota/4age/firing-order",
  "toyota/2jz-gte/firing-order",
  "toyota/1jz-gte/firing-order",
  "nissan/rb26dett/firing-order",
  "nissan/sr20det/firing-order",
  "nissan/ka24de/firing-order",
  "honda/b18c/firing-order",
  "honda/b16a/firing-order",
  "honda/k20/firing-order",
  "subaru/fa20/firing-order",
  "mitsubishi/4g63/firing-order",
  "mazda/13b/firing-order",
  "dodge/318/head-bolt-torque",
  "toyota/2jz-gte/spark-plug-gap",
  "dodge/360/head-bolt-torque",
  "dodge/360/spark-plug-gap",
  "dodge/318/spark-plug-gap",
  "ford/460/spark-plug-gap",
  "pontiac/400/head-bolt-torque",
  "chevrolet/327/head-bolt-torque",
  "ford/460/head-bolt-torque",
  "toyota/4age/head-bolt-torque",
  "toyota/2jz-gte/head-bolt-torque",
  "nissan/rb26dett/head-bolt-torque",
  "honda/k20/head-bolt-torque",
  "honda/b18c/head-bolt-torque",
  "subaru/fa20/head-bolt-torque",
  "nissan/sr20det/head-bolt-torque",
  "honda/k24/head-bolt-torque",
  "ford/351-cleveland/head-bolt-torque",
  "ford/289/head-bolt-torque",
  "chevrolet/454/spark-plug-gap",
  "subaru/ej20/head-bolt-torque",
]);
const researchedDieselSlugs = new Set([
  "ford/f-150/2015/3-5-ecoboost/oil-capacity",
  "ford/f-150/2016/2-7-ecoboost/oil-capacity",
  "ford/f-150/2017/5-0/oil-capacity",
  "chevrolet/silverado-1500/2018/5-3/oil-capacity",
  "chevrolet/silverado-1500/2019/6-2/oil-capacity",
  "gmc/sierra-1500/2019/5-3/oil-capacity",
  "ram/1500/2020/5-7-hemi/oil-capacity",
  "toyota/tacoma/2021/3-5/oil-capacity",
  "toyota/camry/2018/2-5/oil-capacity",
  "toyota/rav4/2019/2-5/oil-capacity",
  "honda/civic/2020/1-5-turbo/oil-capacity",
  "honda/cr-v/2017/1-5-turbo/oil-capacity",
  "jeep/wrangler/2018/3-6/oil-capacity",
  "subaru/forester/2019/2-5/oil-capacity",
  "subaru/outback/2020/2-5/oil-capacity",
  "nissan/altima/2017/2-5/oil-capacity",
  "nissan/rogue/2018/2-5/oil-capacity",
  "ford/explorer/2020/2-3-ecoboost/oil-capacity",
  "hyundai/elantra/2018/2-0/oil-capacity",
  "kia/optima/2019/2-4/oil-capacity",
  "ford/6-0-power-stroke/firing-order",
  "ford/6-4-power-stroke/firing-order",
  "ram/5-9-cummins-12v/firing-order",
  "ram/5-9-cummins-24v/firing-order",
  "chevrolet/6-2-diesel/firing-order",
  "chevrolet/6-5-diesel/firing-order",
  "ford/7-3-idi/firing-order",
  "ford/7-3-power-stroke/firing-order",
  "mitsubishi/4g63/head-bolt-torque",
  "ford/6-9-idi/firing-order",
  "chevrolet/350/starter-bolt-torque",
  "chevrolet/350/oil-pan-bolt-torque",
  "chevrolet/350/water-pump-bolt-torque",
  "chevrolet/350/timing-cover-bolt-torque",
  "ford/7-3-power-stroke/head-bolt-torque",
  "ford/6-0-power-stroke/head-bolt-torque",
  "ram/5-9-cummins/head-bolt-torque",
  "gm/6-6-duramax/head-bolt-torque",
  "ford/302/exhaust-manifold-torque",
  "ford/302/oil-pan-bolt-torque",
  "ford/302/flywheel-bolt-torque",
  "ford/302/harmonic-balancer-bolt-torque",
  "chevrolet/5-3/exhaust-manifold-torque",
  "chevrolet/5-3/flywheel-flexplate-torque",
  "chevrolet/5-3/harmonic-balancer-torque",
  "chevrolet/5-3/oil-pan-bolt-torque",
  "chevrolet/350/exhaust-manifold-torque",
  "dodge/5-7-hemi/exhaust-manifold-torque",
  "dodge/5-7-hemi/flywheel-flexplate-torque",
  "dodge/5-7-hemi/harmonic-balancer-torque",
]);
const researchedEditorialSlugs = new Set([
  "ford/f-150/2018/lug-nut-torque",
  "chevrolet/silverado-1500/2020/lug-nut-torque",
  "ram/1500/2019/lug-nut-torque",
  "toyota/tacoma/2021/lug-nut-torque",
  "toyota/camry/2017/lug-nut-torque",
  "honda/civic/2022/lug-nut-torque",
  "ford/explorer/2019/lug-nut-torque",
  "jeep/grand-cherokee/2020/lug-nut-torque",
  "honda/accord/2016/lug-nut-torque",
  "nissan/altima/2018/lug-nut-torque",
  "chevrolet/tahoe/2021/lug-nut-torque",
  "gmc/sierra-1500/2015/lug-nut-torque",
  "toyota/rav4/2020/lug-nut-torque",
  "honda/cr-v/2018/lug-nut-torque",
  "ford/mustang/2017/lug-nut-torque",
  "ford/escape/2021/lug-nut-torque",
  "mazda/cx-5/2017/lug-nut-torque",
  "mazda/3/2021/lug-nut-torque",
  "dodge/charger/2019/lug-nut-torque",
  "dodge/challenger/2018/lug-nut-torque",
  "subaru/forester/2019/lug-nut-torque",
  "subaru/outback/2022/lug-nut-torque",
  "ford/3-5-ecoboost/firing-order",
  "ford/6-7-power-stroke/firing-order",
  "hyundai/elantra/2020/lug-nut-torque",
  "hyundai/tucson/2019/lug-nut-torque",
  "kia/optima/2018/lug-nut-torque",
  "kia/sorento/2020/lug-nut-torque",
  "volkswagen/jetta/2020/lug-bolt-torque",
  "volkswagen/tiguan/2019/lug-bolt-torque",
  "bmw/3-series/2021/wheel-bolt-torque",
  "audi/a4/2018/wheel-bolt-torque",
  "honda/accord/lug-nut-torque",
  "toyota/4-0-v6/firing-order",
  "nissan/vq35de/firing-order",
  "subaru/ej25/firing-order",
  "bmw/n55/firing-order",
  "bmw/b58/firing-order",
  "chevrolet/2-8-duramax/firing-order",
  "ram/6-7-cummins/firing-order",
  "gm/6-6-duramax/firing-order",
  "ford/5-0-coyote/firing-order",
  "toyota/2gr-fe/firing-order",
  "honda/k24/firing-order",
  "honda/j35/firing-order",
  "volkswagen/2-0-tsi/firing-order",
  "honda/accord/spark-plug-gap",
]);
const researchedGeneralBatch2Slugs = new Set([
  "ford/escape/spark-plug-gap",
  "honda/fit/oil-capacity",
  "jeep/patriot/wheel-torque",
  "ram/1500/spark-plug-gap",
  "ford/bronco/wheel-torque",
  "hyundai/genesis/horsepower-by-year",
  "ford/maverick/towing-capacity",
  "hyundai/elantra-n/horsepower",
  "ford/expedition/wheel-torque",
  "hyundai/palisade/oil-capacity",
  "dodge/durango/horsepower",
  "chevrolet/colorado/towing-capacity",
  "chevrolet/blazer/towing-capacity",
  "subaru/ascent/towing-capacity",
  "chevrolet/suburban/fuel-tank-capacity",
  "honda/ridgeline/towing-capacity",
  "jeep/grand-wagoneer/towing-capacity",
  "hyundai/kona/oil-capacity",
  "nissan/frontier/oil-capacity",
  "subaru/wrx/oil-capacity",
  "toyota/crown/oil-capacity",
  "ford/transit/oil-capacity",
  "toyota/sienna/oil-capacity",
  "nissan/armada/towing-capacity",
  "jeep/compass/tire-pressure",
  "dodge/dart/firing-order",
  "subaru/brz/wheel-torque",
  "nissan/murano/spark-plug-gap",
  "jeep/renegade/tire-size",
  "toyota/prius/tire-pressure",
  "dodge/grand-caravan/spark-plug-specs",
  "bmw/x1/wheel-torque",
  "nissan/versa/tire-pressure",
  "subaru/outback/tire-pressure",
  "bmw/4-series/wheel-torque",
  "nissan/titan/towing-capacity",
  "ram/3500/towing-capacity",
  "chevrolet/camaro/horsepower-by-year",
  "bmw/m5/horsepower-by-year",
  "chevrolet/corvette/horsepower-by-year",
  "bmw/x3/brake-rotor-size",
  "honda/hr-v/spark-plug-torque",
  "bmw/7-series/battery-replacement",
  "honda/civic/brake-rotor-torque",
  "hyundai/sonata/spark-plug-gap",
  "jeep/wrangler/axle-torque",
]);

const researchedGeneralVehicleSlugs = new Set([
  "ram/1500/towing-capacity",
  "ford/mustang/horsepower-by-year",
  "bmw/328i/brake-rotor-torque",
  "bmw/m3/horsepower-by-year",
  "bmw/5-series/battery-replacement",
  "hyundai/tucson/towing-capacity",
  "subaru/forester/tire-size",
  "subaru/outback/alternator-amperage",
  "toyota/camry/serpentine-belt-diagram",
  "jeep/wrangler/bolt-pattern",
  "dodge/durango/transmission-fluid",
  "jeep/cherokee/alternator-replacement",
  "subaru/legacy/serpentine-belt",
  "chevrolet/equinox/oil-filter-size",
  "chevrolet/tahoe/rear-axle-torque",
  "ram/2500/rear-axle-torque",
  "chevrolet/malibu/firing-order",
  "hyundai/elantra/spark-plug-torque",
  "honda/odyssey/brake-pad-thickness",
  "toyota/rav4/brake-pad-thickness",
  "bmw/3-series/brake-rotor-size",
  "hyundai/sonata/head-bolt-torque",
  "chevrolet/silverado-1500/spark-plug-gap-chart",
  "dodge/charger/firing-order",
  "honda/cr-v/spark-plug-gap",
  "toyota/corolla/spark-plug-torque",
  "toyota/highlander/spark-plug-gap",
  "nissan/sentra/tire-size",
  "ford/explorer/fuel-tank-capacity",
  "nissan/rogue/tire-pressure",
  "nissan/pathfinder/towing-capacity",
  "jeep/gladiator/payload",
  "jeep/wrangler/towing-capacity",
  "jeep/grand-cherokee/towing-capacity",
  "subaru/crosstrek/tire-pressure",
  "honda/civic/tire-pressure",
  "ford/ranger/wheel-torque",
  "hyundai/santa-fe/oil-capacity",
  "dodge/challenger/horsepower-by-year",
  "chevrolet/traverse/towing-capacity",
  "nissan/altima/transmission-fluid-capacity",
  "nissan/maxima/oil-capacity",
  "subaru/impreza/oil-capacity",
]);

const researchedReferenceSlugs = new Set([
  "jeep/4-0/spark-plug-gap",
  "kia/sportage/lug-nut-torque",
  "mazda/cx-5/lug-nut-torque",
  "mazda/mazda3/lug-nut-torque",
  "mazda/mazda6/lug-nut-torque",
  "volkswagen/jetta/lug-bolt-torque",
  "volkswagen/golf/lug-bolt-torque",
  "volkswagen/passat/lug-bolt-torque",
  "volkswagen/tiguan/lug-bolt-torque",
  "bmw/3-series/wheel-bolt-torque",
  "bmw/5-series/wheel-bolt-torque",
  "bmw/x5/wheel-bolt-torque",
  "audi/a4/wheel-bolt-torque",
  "audi/a6/wheel-bolt-torque",
  "audi/q5/wheel-bolt-torque",
  "mercedes-benz/c-class/wheel-bolt-torque",
  "mercedes-benz/e-class/wheel-bolt-torque",
  "mercedes-benz/glc/wheel-bolt-torque",
  "toyota/22r/firing-order",
  "jeep/4-0/firing-order",
  "ford/300-inline-6/firing-order",
  "chevrolet/250-inline-6/firing-order",
  "chevrolet/292-inline-6/firing-order",
  "ford/290/firing-order",
  "dodge/318/firing-order",
  "dodge/360/firing-order",
  "toyota/22r/head-bolt-torque",
  "jeep/4-0/head-bolt-torque",
  "ford/300-inline-6/head-bolt-torque",
  "ford/302/head-bolt-torque-sequence",
  "ford/351-windsor/head-bolt-torque-sequence",
  "chevrolet/5-3/head-bolt-torque-sequence",
  "chevrolet/ls1/head-bolt-torque-sequence",
  "ford/302/intake-manifold-torque",
  "ford/351-windsor/intake-manifold-torque",
  "chevrolet/ls1/intake-manifold-torque",
  "chevrolet/5-3/intake-manifold-torque",
  "chevrolet/454/intake-manifold-torque",
  "dodge/5-7-hemi/intake-manifold-torque",
  "subaru/ej25/intake-manifold-torque",
  "ford/302/rocker-arm-torque",
  "ford/4-6/head-bolt-torque-sequence",
  "ford/5-4-triton/head-bolt-torque-sequence",
  "chevrolet/350/rocker-arm-torque",
  "chevrolet/350/flywheel-bolt-torque",
  "chevrolet/350/flexplate-bolt-torque",
  "chevrolet/350/harmonic-balancer-bolt-torque",
]);

const researchedServiceSlugs = new Set([
  "ford/f-150/3-5-ecoboost/oil-capacity",
  "chevrolet/silverado-1500/6-2/oil-capacity",
  "ram/1500/3-6/oil-capacity",
  "toyota/tacoma/3-5/oil-capacity",
  "toyota/camry/2-5/oil-capacity",
  "toyota/corolla/1-8/oil-capacity",
  "honda/civic/1-5-turbo/oil-capacity",
  "honda/cr-v/2-4/oil-capacity",
  "jeep/grand-cherokee/3-6/oil-capacity",
  "nissan/altima/2-5/oil-capacity",
  "nissan/rogue/2-5/oil-capacity",
  "subaru/forester/2-5/oil-capacity",
  "subaru/outback/2-5/oil-capacity",
  "ford/mustang/5-0/oil-capacity",
  "chevrolet/camaro/6-2/oil-capacity",
  "toyota/highlander/3-5/oil-capacity",
  "toyota/4runner/4-0/oil-capacity",
  "toyota/tundra/5-7/oil-capacity",
  "honda/pilot/3-5/oil-capacity",
  "jeep/grand-cherokee/lug-nut-torque",
  "subaru/wrx/lug-nut-torque",
  "ford/mustang-gt/lug-nut-torque",
  "chevrolet/camaro/lug-nut-torque",
  "dodge/challenger/lug-nut-torque",
  "dodge/charger/lug-nut-torque",
  "ford/explorer/lug-nut-torque",
  "ford/escape/lug-nut-torque",
  "toyota/4runner/lug-nut-torque",
  "toyota/tundra/lug-nut-torque",
  "honda/pilot/lug-nut-torque",
  "honda/odyssey/lug-nut-torque",
  "ford/edge/lug-nut-torque",
  "gmc/yukon/lug-nut-torque",
  "chevrolet/tahoe/lug-nut-torque",
  "chevrolet/suburban/lug-nut-torque",
  "hyundai/elantra/lug-nut-torque",
  "hyundai/sonata/lug-nut-torque",
  "hyundai/tucson/lug-nut-torque",
  "hyundai/santa-fe/lug-nut-torque",
  "kia/optima/lug-nut-torque",
  "kia/forte/lug-nut-torque",
  "kia/sorento/lug-nut-torque",
  "ford/f-150/5-0/spark-plug-gap",
  "ford/f-150/2-7-ecoboost/spark-plug-gap",
  "chevrolet/silverado-1500/5-3/spark-plug-gap",
  "ram/1500/5-7-hemi/spark-plug-gap",
  "toyota/tacoma/4-0/spark-plug-gap",
  "audi/3-0-tfsi/firing-order",
  "chevrolet/silverado-1500/4-3/firing-order",
  "dodge/5-7-hemi/cylinder-head-torque",
  "subaru/ej25/cylinder-head-torque",
]);

export const specs = [
  ...chevy350Specs.map((spec) => prepare(spec, true)),
  ...extendedSpecs.map((spec) =>
    prepare(spec, researchedExtendedSlugs.has(spec.slug)),
  ),
  ...additionalSpecs.map((spec) =>
    prepare(spec, researchedAdditionalSlugs.has(spec.slug)),
  ),
  ...editorialBatchSpecs.map((spec) =>
    prepare(spec, researchedEditorialSlugs.has(spec.slug)),
  ),
  ...serviceBatchSpecs.map((spec) =>
    prepare(spec, researchedServiceSlugs.has(spec.slug)),
  ),
  ...referenceBatchSpecs.map((spec) =>
    prepare(spec, researchedReferenceSlugs.has(spec.slug)),
  ),
  ...classicPerformanceSpecs.map((spec) =>
    prepare(spec, researchedClassicSlugs.has(spec.slug)),
  ),
  ...dieselServiceSpecs.map((spec) =>
    prepare(spec, researchedDieselSlugs.has(spec.slug)),
  ),
  ...generalVehicleSpecs.map((spec) =>
    prepare(spec, researchedGeneralVehicleSlugs.has(spec.slug)),
  ),
  ...generalVehicleBatch2Specs.map((spec) =>
    prepare(spec, researchedGeneralBatch2Slugs.has(spec.slug)),
  ),
  ...researchedDiagramSpecs.map((spec) => prepare(spec, true)),
  ...researchedSystemSpecs.map((spec) => prepare(spec, true)),
  ...exhaustDiagramSpecs.map((spec) => prepare(spec, true)),
  ...valveAdjustmentSpecs.map((spec) => prepare(spec, true)),
  ...camTimingSpecs.map((spec) => prepare(spec, true)),
  ...flywheelSpecs.map((spec) => prepare(spec, true)),
  ...frontServiceSpecs.map((spec) => prepare(spec, true)),
  ...valveCoverSpecs.map((spec) => prepare(spec, true)),
];
export type { SpecRecord } from "./chevy350-content";



// --- Canonical taxonomy -----------------------------------------------------
// Content files carry free-form `category` and combined `make` strings
// ("Firing Orders" vs "Firing Order", "Chevrolet / GMC"). These helpers map
// them onto the real hub routes without editing any content record.

const categorySlugByLabel: Record<string, string> = {
  "Torque Specs": "torque-specs",
  "Firing Order": "firing-order",
  "Firing Orders": "firing-order",
  "Fluid Capacities": "fluid-capacities",
  "Ignition Specs": "ignition-specs",
  "Bolt Torque Sequences": "bolt-sequences",
  "Timing & Ignition": "timing-ignition",
  "Valve Specifications": "valve-specs",
  "Mechanical Diagrams": "diagrams",
  Diagrams: "diagrams",
  "Vehicle Specifications": "vehicle-specs",
  "Engine Specifications": "engine-specs",
  "Brake Specifications": "brake-specs",
  "Electrical Specifications": "electrical-specs",
  "Performance Specs": "performance-specs",
};

export const categorySlugFor = (category: string) =>
  categorySlugByLabel[category] ?? slugify(category);

const primaryMakeByLabel: Record<string, string> = {
  "Chevrolet / GMC": "Chevrolet",
  GM: "Chevrolet",
  "Dodge / Ram": "Dodge",
  "Dodge / Ram / Chrysler": "Dodge",
  "Honda / Acura": "Honda",
  "Nissan / Infiniti": "Nissan",
  "Volkswagen / Audi": "Volkswagen",
};

/** Collapses combined make labels onto the make that actually has a hub route. */
export const primaryMake = (make: string) => primaryMakeByLabel[make] ?? make;

export const makeHubPath = (make: string) => `/makes/${slugify(primaryMake(make))}`;

export const specsForMake = (make: string) =>
  specs.filter((spec) => primaryMake(spec.make) === make);

export const specsForCategory = (slug: string) =>
  specs.filter((spec) => categorySlugFor(spec.category) === slug);

/** Minimal payload for the client-side search box — no full spec records. */
export const searchIndex = specs.map((spec) => ({
  label: spec.title,
  href: `/specs/${spec.slug}`,
  text: `${spec.title} ${spec.keyword}`.toLowerCase(),
}));

export const siteStats = { specCount: specs.length, makeCount: makes.length };
