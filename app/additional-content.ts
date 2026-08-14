import type { Source, SpecRecord } from "./chevy350-content";
import { firingGuide, lugGuide, oilGuide, sparkGuide } from "./extended-content";

const reviewed = "2026-08-14";
const feature = (name: string) => `/features/${name}.webp`;

const jeepJl: Source = {
  label: "2024 Jeep Wrangler Owner Handbook — fluid capacities",
  url: "https://vehicleinfo.mopar.com/assets/publications/en-us/Jeep/2024/Wrangler/100618_24_JL_OH_EN_USC_DIGITAL_E3.pdf",
  note: "Primary Jeep handbook listing 5.0 qt with filter and SAE 0W-20 for the JL 3.6L engine.",
};
const jeepJk: Source = {
  label: "2016 Jeep Wrangler User's Guide — fluid capacities",
  url: "https://vehicleinfo.mopar.com/assets/publications/en-us/Jeep/2016/Wrangler/41.pdf",
  note: "Primary Jeep guide listing 6.0 qt with filter and SAE 5W-20 for the JK 3.6L engine.",
};
const nissanAltima: Source = {
  label: "Nissan Altima Owner's Manual — wheel installation",
  url: "https://www.nissanusa.com/content/dam/Nissan/us/manuals-and-guides/altima/2024/2024-nissan-altima-owner-manual.pdf",
  note: "Primary Nissan owner information for wheel-nut tightening and tire service.",
};
const nissanRogue: Source = {
  label: "Nissan Rogue Owner's Manual — wheel installation",
  url: "https://www.nissanusa.com/content/dam/Nissan/us/manuals-and-guides/rogue/2024/2024-nissan-rogue-owner-manual.pdf",
  note: "Primary Nissan owner information for the 83 ft-lb wheel-nut specification and alternating pattern.",
};
const subaruManual: Source = {
  label: "Subaru owner information — tire and wheel specifications",
  url: "https://techinfo.subaru.com/stis/doc/ownerManual/MSA5M2405A_STIS-opt.pdf",
  note: "Primary Subaru owner documentation listing 89 lbf-ft (120 N·m) wheel-nut torque.",
};
const subaruEngine: Source = {
  label: "Subaru technical specifications — horizontally opposed engine",
  url: "https://techinfo.subaru.com/stis/doc/ownerManual/MSA5M1923K_STIS.pdf",
  note: "Primary Subaru technical table documenting the boxer-four 1-3-2-4 firing order.",
};
const fordModular: Source = {
  label: "Ford F-150 Owner's Guide — 4.6L and 5.4L engine data",
  url: "https://www.fordservicecontent.com/Ford_Content/catalog/owner_guides/01f12og1e.pdf",
  note: "Primary Ford engine-data table listing firing order and spark-plug gap for both Modular V8 engines.",
};
const ford54Later: Source = {
  label: "Ford E-Series Owner's Manual — 5.4L engine specifications",
  url: "https://www.fordservicecontent.com/Ford_Content/Catalog/owner_information/2016-E-Series-Owners-Manual-version-1_om_EN-US_03_2015.pdf",
  note: "Primary Ford manual showing the later 5.4L 0.051–0.057 inch gap range.",
};
const ford27: Source = {
  label: "Ford Owner's Manual — 2.7L EcoBoost oil capacity",
  url: "https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?ProcUid=G2144374&Uid=G2144362&buildtype=web&countryCode=USA&div=f&languageCode=en&vFilteringEnabled=False&variantid=7704",
  note: "Primary Ford capacity and material specification: 6.0 qt with filter, SAE 5W-30 meeting WSS-M2C961-A1 for the cited application.",
};
const gmLs: Source = {
  label: "Chevrolet technical engine specification — LS-family firing order",
  url: "https://news.chevrolet.com/content/dam/company/no_search/heritage-archive-docs/vehicle-information-kits/chevrolet/2005-Chevrolet-SSR.pdf",
  note: "Primary Chevrolet technical data showing the Gen III/IV-style 1-8-7-2-6-5-4-3 order and bank numbering.",
};
const gm454: Source = {
  label: "1974 Chevrolet technical data — 454 V8 firing order",
  url: "https://news.chevrolet.com/content/dam/company/no_search/heritage-archive-docs/vehicle-information-kits/chevrolet/1974-Chevrolet-Monte-Carlo.pdf",
  note: "Primary Chevrolet heritage specification listing 1-8-4-3-6-5-7-2 for the 454 V8.",
};
const gm454Torque: Source = {
  label: "Chevrolet Performance ZZ454/440 installation guide",
  url: "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/performance/resources/installation-guides/crate-engines/01-images/zz454-installation-guide-12498777.pdf",
  note: "Primary Chevrolet Performance procedure listing separate long/short bolt stages, sealant requirement, pattern, and heat-cycle guidance.",
};
const gm305: Source = {
  label: "1980 Chevrolet Camaro technical data — 305 V8",
  url: "https://news.chevrolet.com/content/dam/company/no_search/heritage-archive-docs/vehicle-information-kits/chevrolet/1980-Chevrolet-Camaro.pdf",
  note: "Primary Chevrolet heritage specification identifying the 305 cylinder banks and 1-8-4-3-6-5-7-2 order.",
};
const gm36Chain: Source = {
  label: "GM TechLink — High Feature V6 timing-chain installation",
  url: "https://gm-techlink.com/wp-content/uploads/2023/02/GM_TechLink_24_Mid-December_2022.pdf",
  note: "GM technical publication showing the multi-stage timing-chain system on later 3.6L High Feature V6 engines.",
};
const gm36Service: Source = {
  label: "GM service bulletin — 3.6L High Feature V6 timing chains",
  url: "https://static.nhtsa.gov/odi/tsbs/2013/MC-10134650-9999.pdf",
  note: "GM bulletin identifying LY7, LLT, LFX and related 3.6L applications as timing-chain engines.",
};
const toyotaWheel: Source = {
  label: "Toyota Owner's Manual — tire and wheel specifications",
  url: "https://assets.sia.toyota.com/publications/en/om/OM32445U/pdf/6-3_186.pdf",
  note: "Primary Toyota specification listing 76 ft-lb (103 N·m) wheel-nut torque.",
};

const guides: SpecRecord[] = [
  oilGuide({
    slug: "jeep/wrangler/3-6/oil-capacity", keyword: "jeep wrangler 3.6 oil capacity", make: "Jeep", model: "Wrangler 3.6L Pentastar", category: "Fluid Capacities",
    title: "Jeep Wrangler 3.6 Oil Capacity: JK vs. JL Chart", metaDescription: "Jeep Wrangler 3.6 oil capacity by generation: 6.0 qt for JK and 5.0 qt for JL, with filter, viscosity, refill steps, and dipstick checks.",
    answer: "A 2012–2017 JK Wrangler 3.6L takes 6.0 US qt (5.6 L) with filter; a 2018-and-newer JL Wrangler 3.6L takes 5.0 US qt (4.73 L) with filter. Do not mix the two generations.",
    detail: "The one-quart JK/JL difference is real. Verify the platform and the handbook supplied for the exact model year before filling.", scope: "Factory 3.6L Pentastar Wrangler applications with a standard filter and oil pan; modified oiling systems require their own calibration.",
    values: [
      { label: "2018–current Wrangler JL 3.6L", value: "5.0 qt / 4.73 L", note: "With filter; current handbook calls for SAE 0W-20 full synthetic" },
      { label: "2012–2017 Wrangler JK 3.6L", value: "6.0 qt / 5.6 L", note: "With filter; cited guide calls for SAE 5W-20" },
      { label: "Final level", value: "Dipstick SAFE/FULL range", note: "Check level on level ground after circulation and drain-back" },
    ], sources: [jeepJl, jeepJk], identity: "Jeep Wrangler 3.6L Pentastar",
    distinctions: ["The JK and JL use the same displacement badge but different published refill quantities.", "Use the oil grade and material standard in the exact model-year handbook; the recommendation changed with the platform."],
    featureImage: feature("jeep-wrangler-36-oil-capacity"),
  }),
  lugGuide({
    slug: "nissan/altima/lug-nut-torque", keyword: "nissan altima lug nut torque spec", make: "Nissan", model: "Altima", category: "Torque Specs",
    title: "Nissan Altima Lug Nut Torque Spec and Tightening Pattern", metaDescription: "Nissan Altima lug nut torque reference: 83 ft-lb (113 N·m) for common factory applications, plus star pattern, dry-thread, and recheck guidance.",
    answer: "The common factory Nissan Altima wheel-nut torque specification is 83 ft-lb (113 N·m). Confirm the exact year and wheel instructions before service.", detail: "Use the owner manual for the VIN and any separate aftermarket-wheel instructions.", scope: "Original-equipment-style Altima studs, nuts, and wheels with clean, dry threads and seats.",
    values: [{ label: "Common Nissan Altima factory application", value: "83 ft-lb / 113 N·m", note: "Tighten alternately in a star pattern" }, { label: "Thread condition", value: "Clean and dry", note: "Do not oil or grease studs or nut seats" }, { label: "Pattern", value: "5-lug star", note: "Hand-start all five nuts before staged tightening" }],
    sources: [nissanAltima], identity: "Nissan Altima factory wheel", distinctions: ["The 83 ft-lb value is widely specified across modern Altima owner manuals, but the VIN-specific manual remains the authority.", "Locking nuts, conversion studs, spacers, or aftermarket wheels can carry separate requirements."], featureImage: feature("nissan-altima-lug-nut-torque"),
  }),
  lugGuide({
    slug: "nissan/rogue/lug-nut-torque", keyword: "nissan rogue lug nut torque spec", make: "Nissan", model: "Rogue", category: "Torque Specs",
    title: "Nissan Rogue Lug Nut Torque Spec and Star Pattern", metaDescription: "Nissan Rogue lug nut torque guide: 83 ft-lb (113 N·m) for common factory wheels, with safe dry-thread prep, staged passes, and torque recheck.",
    answer: "The common Nissan Rogue factory wheel-nut torque is 83 ft-lb (113 N·m). Verify the exact model-year manual and wheel hardware before tightening.", detail: "The Rogue, Rogue Sport, and different-market variants are not automatically interchangeable applications.", scope: "Factory Rogue wheel fasteners and wheel seats in serviceable condition; excludes aftermarket wheel or stud instructions.",
    values: [{ label: "Common Nissan Rogue factory application", value: "83 ft-lb / 113 N·m", note: "Final torque using an alternating pattern" }, { label: "Fastener preparation", value: "Clean and dry", note: "Oil or grease changes clamp load" }, { label: "Confirmation", value: "Full second pattern", note: "Check every nut with a calibrated wrench" }],
    sources: [nissanRogue], identity: "Nissan Rogue factory wheel", distinctions: ["Confirm that the vehicle is a Rogue rather than Rogue Sport and match the exact year.", "Nissan instructs users not to oil or grease wheel studs or nuts."], featureImage: feature("nissan-rogue-lug-nut-torque"),
  }),
  lugGuide({
    slug: "subaru/outback/lug-nut-torque", keyword: "subaru outback lug nut torque spec", make: "Subaru", model: "Outback", category: "Torque Specs",
    title: "Subaru Outback Lug Nut Torque Spec: 89 ft-lb Guide", metaDescription: "Subaru Outback lug nut torque reference: 89 ft-lb (120 N·m) for current factory applications, with star pattern, wheel seating, and recheck steps.",
    answer: "Subaru specifies 89 lbf-ft (120 N·m) for the wheel nuts on current Outback factory applications. Always confirm the exact model-year manual.", detail: "Subaru also advises having owner-tightened wheel nuts checked by an automotive service facility as soon as practical.", scope: "Current factory Outback wheels and original-equipment-style nuts; confirm earlier years and aftermarket wheels separately.",
    values: [{ label: "Current Subaru Outback factory wheel", value: "89 lbf-ft / 120 N·m", note: "12 kgf·m" }, { label: "Pattern", value: "5-lug star", note: "Draw the wheel evenly onto the hub" }, { label: "Threads and seats", value: "Clean and dry", note: "Replace damaged or cross-threaded hardware" }],
    sources: [subaruManual], identity: "current Subaru Outback factory wheel", distinctions: ["The Subaru value is 89 lbf-ft after rounding from the metric specification; do not confuse it with an 89 N·m figure.", "Older model years and non-factory wheels must be checked in their own documentation."], featureImage: feature("subaru-outback-lug-nut-torque"),
  }),
  lugGuide({
    slug: "subaru/forester/lug-nut-torque", keyword: "subaru forester lug nut torque spec", make: "Subaru", model: "Forester", category: "Torque Specs",
    title: "Subaru Forester Lug Nut Torque Spec: 89 ft-lb Guide", metaDescription: "Subaru Forester lug nut torque reference: 89 ft-lb (120 N·m) for current factory applications, plus star pattern and safe wheel-installation steps.",
    answer: "Subaru specifies 89 lbf-ft (120 N·m) for current Forester factory wheel nuts. Verify the exact year, wheel, and owner manual before service.", detail: "Torque is applied only after the wheel is correctly centered and every nut is started by hand.", scope: "Current original-equipment Forester wheels and fasteners; excludes aftermarket hardware and unverified older applications.",
    values: [{ label: "Current Subaru Forester factory wheel", value: "89 lbf-ft / 120 N·m", note: "12 kgf·m" }, { label: "Tightening method", value: "Staged star pattern", note: "Finish with a calibrated torque wrench" }, { label: "Post-service check", value: "Recommended", note: "Have self-tightened nuts checked promptly" }],
    sources: [subaruManual], identity: "current Subaru Forester factory wheel", distinctions: ["Use 120 N·m, not 89 N·m; the 89 figure is pounds-force feet.", "Trim level and wheel diameter alone do not establish the torque—use the exact vehicle documentation."], featureImage: feature("subaru-forester-lug-nut-torque"),
  }),
  firingGuide({
    slug: "subaru/ej20/firing-order", keyword: "subaru ej20 firing order", make: "Subaru", model: "EJ20 Boxer Four", category: "Firing Orders",
    title: "Subaru EJ20 Firing Order and Cylinder Numbering Diagram", metaDescription: "Subaru EJ20 firing order 1-3-2-4 with boxer cylinder numbering, bank layout, ignition verification, and misfire troubleshooting.",
    answer: "The Subaru EJ-series boxer-four firing order is 1-3-2-4. Cylinders 1 and 3 share one bank; cylinders 2 and 4 share the opposite bank.", detail: "EJ20 versions span distributor, wasted-spark, and coil-on-plug systems, so connector and lead routing must match the exact engine management system.", scope: "EJ20-family horizontally opposed four-cylinder engines retaining the factory mechanical firing sequence.",
    values: [{ label: "EJ20 firing order", value: "1-3-2-4", note: "Mechanical combustion sequence" }, { label: "Bank with cylinders 1 and 3", value: "1 front, 3 rear", note: "Viewed in installed vehicle orientation" }, { label: "Opposite bank", value: "2 front, 4 rear", note: "Do not number straight across" }],
    sources: [subaruEngine], identity: "Subaru EJ20 horizontally opposed four-cylinder", distinctions: ["All four cylinders lie horizontally, so the bank diagram is more useful than an inline sketch.", "The firing order stays mechanical while the external ignition layout changes among EJ20 versions."], featureImage: feature("subaru-ej20-firing-order"),
  }),
  firingGuide({
    slug: "ford/4-6/firing-order", keyword: "ford 4.6 firing order", make: "Ford", model: "4.6L Modular V8", category: "Firing Orders",
    title: "Ford 4.6 Firing Order and Cylinder Numbering Diagram", metaDescription: "Ford 4.6 firing order 1-3-7-2-6-5-4-8 with passenger/driver bank numbering, coil-on-plug routing, and misfire checks.",
    answer: "The Ford 4.6L Modular V8 firing order is 1-3-7-2-6-5-4-8. Cylinders 1–4 are on the passenger-side bank and 5–8 are on the driver-side bank, front to rear.", detail: "Most 4.6L applications use coil-on-plug ignition, so the order is diagnostic information rather than a distributor-cap routing pattern.", scope: "Production Ford 4.6L Modular V8 engines with factory camshaft firing order.",
    values: [{ label: "4.6L firing order", value: "1-3-7-2-6-5-4-8", note: "Ford Modular V8 sequence" }, { label: "Passenger bank", value: "1-2-3-4", note: "Front to rear" }, { label: "Driver bank", value: "5-6-7-8", note: "Front to rear" }],
    sources: [fordModular], identity: "Ford 4.6L Modular V8", distinctions: ["Do not use the traditional small-block Ford bank numbering or firing order.", "A coil connector number, PCM driver pin, and physical cylinder number are different references."], featureImage: feature("ford-46-firing-order"),
  }),
  firingGuide({
    slug: "ford/5-4-triton/firing-order", keyword: "ford 5.4 triton firing order", make: "Ford", model: "5.4L Triton V8", category: "Firing Orders",
    title: "Ford 5.4 Triton Firing Order and Cylinder Diagram", metaDescription: "Ford 5.4 Triton firing order 1-3-7-2-6-5-4-8 with cylinder-bank numbering, coil identification, and diagnostic procedure.",
    answer: "The Ford 5.4L Triton V8 firing order is 1-3-7-2-6-5-4-8. Cylinders 1–4 are passenger side and 5–8 are driver side, front to rear.", detail: "The 2-valve, 3-valve, and 4-valve versions share the order, but their ignition hardware, plugs, and service procedures differ.", scope: "Ford 5.4L Modular/Triton V8 engines with the production camshaft order.",
    values: [{ label: "5.4L Triton firing order", value: "1-3-7-2-6-5-4-8", note: "Factory Modular V8 sequence" }, { label: "Passenger bank", value: "1-2-3-4", note: "Front to rear" }, { label: "Driver bank", value: "5-6-7-8", note: "Front to rear" }],
    sources: [fordModular, ford54Later], identity: "Ford 5.4L Triton/Modular V8", distinctions: ["The 5.4 shares its order with the 4.6, but parts and calibrations are not interchangeable by that fact alone.", "Coil-on-plug engines have no distributor terminal to clock; identify coils by cylinder."], featureImage: feature("ford-54-triton-firing-order"),
  }),
  sparkGuide({
    slug: "ford/5-4-triton/spark-plug-gap", keyword: "ford 5.4 triton spark plug gap", make: "Ford", model: "5.4L Triton V8", category: "Ignition Specs",
    title: "Ford 5.4 Triton Spark Plug Gap by Application", metaDescription: "Ford 5.4 Triton spark plug gap chart: 0.052–0.056 in on early applications and 0.051–0.057 in in a later E-Series manual, with safe installation guidance.",
    answer: "Ford lists 0.052–0.056 in (1.3–1.4 mm) for the cited early 5.4L F-150 and 0.051–0.057 in (1.29–1.45 mm) for the cited later E-Series application. Match the year, vehicle, cylinder head, and plug part number.", detail: "The published ranges overlap but are not permission to substitute plug designs. Ford 5.4L service risks also vary sharply by cylinder-head generation.", scope: "Factory Ford 5.4L Triton/Modular applications identified in the cited owner manuals; performance builds require their calibrator's plug and gap.",
    values: [{ label: "2001 F-150 5.4L", value: "0.052–0.056 in", note: "1.3–1.4 mm; factory owner guide" }, { label: "2016 E-Series 5.4L", value: "0.051–0.057 in", note: "1.29–1.45 mm; factory owner manual" }, { label: "Final plug choice", value: "VIN/engine-specific part", note: "Gap does not establish reach, seat, or heat range" }],
    sources: [fordModular, ford54Later], identity: "Ford 5.4L Triton/Modular V8", distinctions: ["A broad '5.4 Triton' label covers multiple vehicles and cylinder-head generations.", "Use the exact Motorcraft or approved equivalent plug application before evaluating gap."], featureImage: feature("ford-54-triton-spark-plug-gap"),
  }),
  firingGuide({
    slug: "chevrolet/ls1/firing-order", keyword: "chevy ls1 firing order", make: "Chevrolet", model: "LS1 5.7L V8", category: "Firing Orders",
    title: "Chevy LS1 Firing Order and Cylinder Numbering Diagram", metaDescription: "Chevy LS1 firing order 1-8-7-2-6-5-4-3 with odd/even bank numbering, coil layout, and no-start or misfire checks.",
    answer: "The Chevrolet LS1 firing order is 1-8-7-2-6-5-4-3. The driver-side bank is 1-3-5-7 and the passenger-side bank is 2-4-6-8, front to rear.", detail: "The LS1 uses individual coils, so verify cylinder and harness identity rather than arranging wires around a distributor cap.", scope: "Factory GM LS1 5.7L Gen III V8 engines with production camshaft firing order.",
    values: [{ label: "LS1 firing order", value: "1-8-7-2-6-5-4-3", note: "Gen III LS sequence" }, { label: "Driver-side bank", value: "1-3-5-7", note: "Front to rear" }, { label: "Passenger-side bank", value: "2-4-6-8", note: "Front to rear" }],
    sources: [gmLs], identity: "Chevrolet LS1 5.7L Gen III V8", distinctions: ["The LS1 does not use the classic small-block 1-8-4-3-6-5-7-2 sequence.", "Odd cylinders are driver side and even cylinders passenger side in normal installed orientation."], featureImage: feature("chevy-ls1-firing-order"),
  }),
  firingGuide({
    slug: "chevrolet/454/firing-order", keyword: "chevy 454 firing order", make: "Chevrolet", model: "454 Big-Block V8", category: "Firing Orders",
    title: "Chevy 454 Firing Order, Distributor Direction, and Diagram", metaDescription: "Chevy 454 firing order 1-8-4-3-6-5-7-2 with odd/even cylinder banks, clockwise distributor routing, and compression-TDC setup.",
    answer: "The traditional Chevrolet 454 big-block firing order is 1-8-4-3-6-5-7-2. The driver bank is 1-3-5-7, the passenger bank is 2-4-6-8, and a conventional distributor turns clockwise viewed from above.", detail: "Distributor No. 1 has no mandatory clock position; use the terminal above the rotor at cylinder 1 compression TDC.", scope: "Traditional Mark IV/Gen V/Gen VI Chevrolet big-block 454 engines retaining the standard camshaft firing order.",
    values: [{ label: "454 firing order", value: "1-8-4-3-6-5-7-2", note: "Traditional Chevrolet big-block sequence" }, { label: "Driver bank", value: "1-3-5-7", note: "Front to rear" }, { label: "Passenger bank", value: "2-4-6-8", note: "Front to rear" }, { label: "Distributor rotation", value: "Clockwise", note: "Viewed from above on conventional installations" }],
    sources: [gm454], identity: "traditional Chevrolet 454 big-block V8", distinctions: ["The classic 454 order differs from an LS-family firing order.", "Aftermarket alternate-order camshafts exist; the installed camshaft documentation controls a modified build."], featureImage: feature("chevy-454-firing-order"),
  }),
  firingGuide({
    slug: "chevrolet/305/firing-order", keyword: "chevy 305 firing order", make: "Chevrolet", model: "305 Small-Block V8", category: "Firing Orders",
    title: "Chevy 305 Firing Order and Distributor Diagram", metaDescription: "Chevy 305 firing order 1-8-4-3-6-5-7-2 with odd/even cylinder banks, clockwise distributor routing, and TDC verification.",
    answer: "The traditional Chevrolet 305 small-block firing order is 1-8-4-3-6-5-7-2. Driver-side cylinders are 1-3-5-7 and passenger-side cylinders are 2-4-6-8, front to rear.", detail: "Electronic-feedback carburetor and later EFI systems can change diagnostic and timing procedures without changing the mechanical firing order.", scope: "Traditional Chevrolet 305/5.0L small-block V8s with the production camshaft firing order.",
    values: [{ label: "305 firing order", value: "1-8-4-3-6-5-7-2", note: "Factory small-block sequence" }, { label: "Driver bank", value: "1-3-5-7", note: "Front to rear" }, { label: "Passenger bank", value: "2-4-6-8", note: "Front to rear" }, { label: "Distributor rotation", value: "Clockwise", note: "Conventional HEI viewed from above" }],
    sources: [gm305], identity: "traditional Chevrolet 305/5.0L small-block V8", distinctions: ["Do not confuse the Gen I 305 with a later 5.0L engine family or an LS engine.", "A rebuilt engine can have an alternate-order camshaft; verify the cam card when history is unknown."], featureImage: feature("chevy-305-firing-order"),
  }),
  oilGuide({
    slug: "ford/2-7-ecoboost/oil-capacity", keyword: "ford 2.7 ecoboost oil capacity", make: "Ford", model: "F-150 2.7L EcoBoost", category: "Fluid Capacities",
    title: "Ford 2.7 EcoBoost Oil Capacity and Refill Guide", metaDescription: "Ford F-150 2.7 EcoBoost oil capacity: 6.0 qt (5.7 L) with filter, plus SAE 5W-30 specification, dipstick checks, and safe refill steps.",
    answer: "The Ford F-150 2.7L EcoBoost application in the cited owner manuals takes 6.0 US qt (5.7 L) with the oil filter. This is not automatically the capacity for every vehicle that uses a 2.7L EcoBoost.", detail: "Ford specifies SAE 5W-30 meeting the exact material standard in the model-year manual; an extreme-cold alternative may also be listed.", scope: "Factory F-150 2.7L EcoBoost applications represented by the cited Ford manual. Bronco and other platforms must be checked separately.",
    values: [{ label: "F-150 2.7L EcoBoost with filter", value: "6.0 qt / 5.7 L", note: "Published refill capacity" }, { label: "Normal viscosity in cited manual", value: "SAE 5W-30", note: "Meet Ford WSS-M2C961-A1 or the exact year-specific successor" }, { label: "Final level", value: "Between dipstick MIN and MAX", note: "Check level using the owner-manual procedure" }],
    sources: [ford27], identity: "Ford F-150 2.7L EcoBoost V6", distinctions: ["The 2.7L engine appears in more than one Ford platform, and platform-specific oil systems can differ.", "Capacity includes the filter in the cited table; refill below the total first and finish by dipstick."], featureImage: feature("ford-27-ecoboost-oil-capacity"),
  }),
  lugGuide({
    slug: "toyota/corolla/lug-nut-torque", keyword: "toyota corolla lug nut torque spec", make: "Toyota", model: "Corolla", category: "Torque Specs",
    title: "Toyota Corolla Lug Nut Torque Spec: 76 ft-lb Guide", metaDescription: "Toyota Corolla lug nut torque reference: 76 ft-lb (103 N·m) for common factory applications, with star pattern, dry-thread prep, and recheck steps.",
    answer: "The common factory Toyota Corolla wheel-nut torque is 76 ft-lb (103 N·m). Verify the exact year, body style, and owner manual before service.", detail: "Corolla sedan, hatchback, hybrid, GR, and older-market variants should be matched to their specific manual.", scope: "Common factory Corolla wheels and original-equipment-style fasteners; performance and aftermarket wheels may specify differently.",
    values: [{ label: "Common Toyota Corolla factory wheel", value: "76 ft-lb / 103 N·m", note: "10.5 kgf·m" }, { label: "Pattern", value: "5-lug star", note: "Use staged opposite-side passes" }, { label: "Final tool", value: "Calibrated torque wrench", note: "Impact tools are not final measuring tools" }],
    sources: [toyotaWheel], identity: "common Toyota Corolla factory wheel", distinctions: ["Confirm GR Corolla and unusual performance-wheel applications separately.", "Wheel diameter does not by itself change the published value; fastener and seat design control."], featureImage: feature("toyota-corolla-lug-nut-torque"),
  }),
  lugGuide({
    slug: "toyota/highlander/lug-nut-torque", keyword: "toyota highlander lug nut torque spec", make: "Toyota", model: "Highlander", category: "Torque Specs",
    title: "Toyota Highlander Lug Nut Torque Spec: 76 ft-lb Guide", metaDescription: "Toyota Highlander lug nut torque reference: 76 ft-lb (103 N·m) for common factory applications, plus star pattern and safe wheel-installation guidance.",
    answer: "The common factory Toyota Highlander wheel-nut torque is 76 ft-lb (103 N·m). Confirm the exact model-year owner manual, especially for a different market or wheel package.", detail: "Hybrid powertrain choice normally does not identify wheel torque; use the wheel/fastener application in the exact manual.", scope: "Common original-equipment Highlander wheels and factory-style nuts with clean, dry threads and seats.",
    values: [{ label: "Common Toyota Highlander factory wheel", value: "76 ft-lb / 103 N·m", note: "10.5 kgf·m" }, { label: "Tightening order", value: "5-lug star", note: "Seat the wheel evenly" }, { label: "Thread condition", value: "Clean and dry", note: "Do not compensate for corrosion with extra torque" }],
    sources: [toyotaWheel], identity: "common Toyota Highlander factory wheel", distinctions: ["Highlander and Grand Highlander are separate applications and must not be assumed identical.", "Aftermarket wheels, spacers, conversion studs, and locking hardware can carry their own instructions."], featureImage: feature("toyota-highlander-lug-nut-torque"),
  }),
];

const chevy454HeadTorque: SpecRecord = {
  slug: "chevrolet/454/head-bolt-torque", keyword: "chevy 454 head bolt torque specs", make: "Chevrolet", model: "454 Big-Block V8", category: "Bolt Torque Sequences",
  title: "Chevy 454 Head Bolt Torque Specs, Stages, and Sequence", metaDescription: "Chevy 454 head bolt torque chart for the Chevrolet Performance ZZ454/440: long bolts 25/50/75 ft-lb and short bolts 20/40/65 ft-lb, with sealant and sequence guidance.",
  answer: "For the Chevrolet Performance ZZ454/440 configuration, tighten long head bolts to 25, 50, then 75 ft-lb and short head bolts to 20, 40, then 65 ft-lb. These are not universal values for every production, aftermarket-head, stud, or gasket combination.",
  detail: "Chevrolet directs liquid thread sealant on bolts that enter coolant, alternate tightening in the illustrated sequence, and recommends a re-torque after heat cycling for this configuration.",
  scope: "Chevrolet Performance ZZ454/440 with the specified aluminum heads and factory-style bolts. Aftermarket heads, studs, gaskets, and other 454 generations use their component instructions.",
  values: [
    { label: "Long head bolts — pass 1", value: "25 ft-lb / 34 N·m", note: "Follow the center-out Chevrolet pattern" },
    { label: "Long head bolts — pass 2", value: "50 ft-lb / 68 N·m", note: "Repeat the complete pattern" },
    { label: "Long head bolts — final", value: "75 ft-lb / 102 N·m", note: "Final complete pattern" },
    { label: "Short head bolts — pass 1", value: "20 ft-lb / 27 N·m", note: "Do not substitute the long-bolt value" },
    { label: "Short head bolts — pass 2", value: "40 ft-lb / 54 N·m", note: "Repeat the complete pattern" },
    { label: "Short head bolts — final", value: "65 ft-lb / 88 N·m", note: "Final complete pattern" },
  ],
  diagram: { type: "head", title: "Interactive 454 cylinder-head tightening sequence", caption: "Work from the center outward in the exact Chevrolet illustration. The numbered module is a planning aid; the cited engine guide controls bolt identity and sequence.", points: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"] },
  intro: [
    "Head-bolt torque is a complete assembly specification: engine generation, block threads, head material, bolt or stud design, washer, gasket, lubricant or sealant, tightening sequence, stages, and re-torque policy all work together. A bare final number copied from another 454 build is not a reliable procedure.",
    "The staged values on this page come directly from Chevrolet Performance's ZZ454/440 installation guide. They provide an authoritative worked example for that configuration while showing why long and short bolts must be separated. Identify every fastener before tightening and stop if the installed head, hardware, or gasket supplier gives a different procedure.",
  ],
  steps: [
    "Confirm the block generation, cylinder-head part number and material, gasket, bolt or stud kit, washers, and the exact instructions supplied with every non-factory component.",
    "Chase and clean the block threads with the appropriate cleaning tool, remove liquid and debris from blind holes, and inspect fasteners for stretch, corrosion, damaged threads, or incorrect length.",
    "Clean the block and head decks without removing material, verify flatness and surface-finish requirements, place the correct gasket in the correct orientation, and lower the head without sliding it.",
    "Apply the specified liquid thread sealant to bolts that enter coolant passages and the specified lubricant only where the procedure calls for it. Keep sealant and lubricant off the gasket faces.",
    "Install all bolts finger-tight, separate long from short locations, then complete each torque stage in the exact center-out sequence using a calibrated wrench and smooth pulls.",
    "Record every pass, complete any instructed heat-cycle re-torque, then recheck fluids, ignition timing, leaks, and valve-train setup before returning the engine to load.",
  ],
  sections: [
    { heading: "Why long and short 454 bolts use different torque", paragraphs: ["Bolt length, location, thread engagement, and joint stiffness affect the clamp load produced by a wrench reading. Chevrolet's ZZ454 procedure therefore publishes long/short pairs at every stage: 25/20, 50/40, and 75/65 ft-lb. Painting every bolt with one final value defeats the engineering in the published procedure.", "Make a bolt-location map before installation. A long bolt bottoming in a short hole can produce a convincing torque-wrench click without clamping the head. A short bolt in the wrong location may not develop adequate thread engagement. Compare exposed length and part-number documentation rather than relying on visual memory." ] },
    { heading: "Thread sealant, lubricant, and torque accuracy", paragraphs: ["Several Chevrolet big-block head-bolt holes communicate with coolant. Chevrolet directs liquid Teflon-type sealant on the bolts that protrude into coolant passages for the cited engine. The sealant choice is part of the torque method because it affects both leakage and thread friction.", "Do not replace the stated sealant with oil, dry installation, anti-seize, or an unrelated paste. Aftermarket studs commonly publish a different torque using their own lubricant. When hardware instructions conflict with a generic engine value, stop and obtain a matched procedure from the head, gasket, and fastener manufacturers." ] },
    { heading: "Surface preparation and gasket positioning", paragraphs: ["Both decks must be clean, flat, dry where required, and within the gasket maker's surface-finish specification. Abrasive discs can round deck edges and leave damaging debris inside the engine. Protect bores and oil passages during cleaning, then remove residue with methods approved for the installed materials.", "Check locating dowels, gasket markings, coolant openings, and front/rear orientation before placing the head. Never use bolt torque to pull a head down over a misaligned dowel. A head that does not sit flat under its own weight must be removed and investigated." ] },
    { heading: "How to execute staged torque passes", paragraphs: ["Set the wrench for the first long/short values and follow the exact numbered pattern, resetting as fastener type changes. Mark each completed fastener on a paper diagram. Repeat from the beginning for the second stage, then again for the final stage; do not simply continue from the last bolt at a higher setting.", "Use a torque wrench sized so the specification lies comfortably inside its calibrated range. Pull steadily from the marked handle position. Avoid universal joints at sharp angles, side-loading extensions, repeated clicks, and an impact wrench. If a bolt turns abnormally or reaches torque too early, stop and inspect it." ] },
    { heading: "When a factory value does not apply", bullets: ["Aftermarket aluminum or iron cylinder heads with their own instructions", "Stud kits or bolts supplied with a dedicated lubricant and torque", "Different GM big-block generation, deck, or bolt layout", "Multi-layer-steel, composition, copper, or specialty gasket procedure", "Previously overheated, machined, repaired, or damaged block/head", "Torque-to-yield hardware that must not be reused"], paragraphs: ["A 454 displacement label cannot identify all of these variables. Keep component boxes, part numbers, batch information, and instruction revisions with the engine build record so the correct procedure remains available after the vehicle changes owners." ] },
    { heading: "Heat-cycle re-torque and final verification", paragraphs: ["The cited ZZ454/440 guide recommends re-torquing after heat cycling. Follow its exact sequence and valve-train access procedure. Other gasket and hardware systems may explicitly prohibit re-torque, so never generalize this recommendation to an unrelated assembly.", "After assembly, prime the oiling system where required, fill and bleed coolant, confirm valve adjustment, and watch immediately for external leakage, combustion pressure in the cooling system, abnormal noise, or temperature rise. A leak or unexplained torque loss needs diagnosis, not another blind pull on the wrench." ] },
  ],
  faqs: [
    { q: "What are the Chevy 454 head bolt torque specs?", a: "For the cited Chevrolet Performance ZZ454/440, long bolts are 25/50/75 ft-lb and short bolts are 20/40/65 ft-lb. Other heads and hardware can require different values." },
    { q: "Do 454 head bolts need thread sealant?", a: "Chevrolet directs liquid thread sealant on bolts entering coolant passages for the cited configuration. Use the exact sealant and preparation stated for your build." },
    { q: "Can I use ARP stud torque from this chart?", a: "No. Use the current instructions, lubricant, washers, and torque or stretch method supplied with the exact stud kit." },
    { q: "Should a 454 cylinder head be re-torqued?", a: "Chevrolet recommends it after heat cycling for the cited ZZ454/440. Other gasket or fastener makers may give different instructions." },
    { q: "Why are the short-bolt values lower?", a: "The fastener locations and joint geometry differ. Chevrolet publishes separate values to produce the intended clamp load without overstressing the joint." },
  ], sources: [gm454Torque], reviewed, featureImage: feature("chevy-454-head-bolt-torque"),
};

const chevy36Timing: SpecRecord = {
  slug: "chevrolet/3-6/timing-chain", keyword: "chevy 3.6 timing belt or chain", make: "Chevrolet", model: "3.6L High Feature V6", category: "Timing & Ignition",
  title: "Chevy 3.6 Timing Belt or Chain? Engine-Code Guide", metaDescription: "Chevy 3.6 V6 uses timing chains, not a routine-service timing belt. Learn LY7, LLT, LFX, LGX and LGZ chain layouts, symptoms, codes, and maintenance guidance.",
  answer: "Chevrolet's 3.6L High Feature V6 families use metal timing chains, not a rubber timing belt. They therefore do not have a normal timing-belt replacement interval, but chains, guides, tensioners, sprockets, and cam phasers can still wear or fail.",
  detail: "The 3.6L name spans LY7, LLT, LFX, LGX, LGZ, LFY and related codes. Parts and installation timing marks differ, so identify the RPO/VIN engine code before ordering or disassembly.",
  scope: "Chevrolet vehicles using GM 3.6L High Feature V6 engine families; always verify an unusual export-market or swapped engine by code.",
  values: [
    { label: "Camshaft drive type", value: "Timing chain", note: "Metal chain system; not a rubber timing belt" },
    { label: "Routine belt-style interval", value: "None", note: "Inspect/diagnose based on exact manual, symptoms, and codes" },
    { label: "Earlier 3.6L families", value: "LY7 / LLT / LFX", note: "Chain layout and service kit must match the engine" },
    { label: "Later 3.6L families", value: "LGX / LGZ / LFY", note: "Later-generation multi-stage chain procedures are engine-code specific" },
  ],
  diagram: { type: "timing", title: "Interactive Chevy 3.6 timing-chain system map", caption: "Select each stage to review the chain-driven relationship. This conceptual map does not replace engine-code-specific timing-mark instructions.", points: ["Crank", "Primary", "Bank 1", "Bank 2", "Guides", "Tensioners"] },
  intro: [
    "The direct answer is chain. Chevrolet's 3.6L High Feature V6 engines drive their camshafts with metal timing chains and hydraulic tensioning components. That eliminates a scheduled rubber-belt change, but it does not make the system maintenance-free or interchangeable across every 3.6L badge.",
    "Oil condition, oil level, pressure, guide wear, tensioner operation, cam phasers, and installation accuracy all influence chain timing. When a fault is suspected, read the engine code and diagnostic data before buying a generic kit. A timing correlation code identifies a relationship problem; it does not prove that the chain alone is the failed part.",
  ],
  steps: [
    "Decode the VIN and service-parts label to identify the exact 3.6L RPO, model year, vehicle platform, and whether the engine has been replaced.",
    "Check oil level and condition using the owner-manual procedure, review oil-change history, and verify the correct viscosity and approval before mechanical diagnosis.",
    "Scan all modules for current, pending, and history codes; save freeze-frame data and compare commanded versus actual camshaft positions with a capable scan tool.",
    "Listen for startup rattle, inspect for external leaks and debris, and test the oil-pressure and actuator circuits using the engine-specific service procedure.",
    "If internal timing work is justified, obtain the correct locking tools, timing-mark diagrams, fastener replacements, sealants, and chain kit for the exact RPO.",
    "After repair, rotate the engine by hand as directed, verify every timing reference, prime lubrication where required, clear codes, perform relearns, and confirm live cam data and leak-free operation.",
  ],
  sections: [
    { heading: "Why the Chevy 3.6 uses chains instead of a belt", paragraphs: ["A timing chain runs inside the engine behind a sealed cover and is lubricated by engine oil. A timing belt normally runs dry behind external covers and has a mileage/time replacement schedule. GM's technical documents and replacement parts identify chains, guides, sprockets, and tensioners for the 3.6L High Feature V6.", "The absence of a belt interval means owners should follow the oil-life and maintenance schedule, not ignore the system. Chain tensioners depend on correct oil supply, and contaminated or low oil can aggravate wear and control problems." ] },
    { heading: "Engine codes matter more than displacement", paragraphs: ["Early LY7, direct-injected LLT, lighter LFX, later LGX/LGZ/LFY and related variants share a broad architecture but differ in chain arrangements, cam phasers, sensors, fasteners, seals, calibrations, and timing references. A kit advertised only as 'Chevy 3.6' is not enough identification.", "Use the RPO label, VIN decoder, casting/part numbers, and service information. If an engine was swapped, the VIN may identify the original vehicle rather than the installed assembly. Photograph labels and timing-cover details before ordering parts." ] },
    { heading: "Symptoms that can indicate a timing-system problem", bullets: ["Brief or sustained rattle at cold start", "P0008, P0009, P0016, P0017, P0018 or P0019 correlation codes", "Reduced power, rough idle, hard start, or extended cranking", "Camshaft actual position that cannot follow commanded position", "Metal or plastic guide debris in oil or filter", "Persistent misfire after ignition and fueling checks"], paragraphs: ["These signs are not conclusive by themselves. Low oil, incorrect viscosity, actuator solenoids, wiring, sensors, phasers, oil pressure, previous assembly error, or internal damage can mimic a stretched-chain diagnosis. Follow the published diagnostic tree." ] },
    { heading: "Oil maintenance and chain life", paragraphs: ["Use oil meeting the current dexos specification and viscosity printed in the exact owner manual. Keep the level in range, repair leaks, and avoid extending intervals beyond the oil-life monitor or severe-service requirements. A chain system circulates the same oil that carries combustion byproducts and protects small hydraulic passages.", "An oil change cannot repair worn guides or restore an elongated chain. Additives and heavier oil should not be used to silence a mechanical fault. If noise, codes, or metal debris remain, diagnose promptly to reduce the chance of loss of cam timing and secondary engine damage." ] },
    { heading: "What a complete chain repair may include", paragraphs: ["Depending on engine code and diagnosis, service can involve primary and secondary chains, guides, tensioners, crank and cam sprockets, phasers, one-time-use bolts, cover seals, front crank seal, gaskets, oil, coolant, and cleaning debris from the lubrication system. Replace only what the current service document and inspection justify.", "Installation is precision work. Colored links are assembly aids and may not realign after the engine is rotated. Count links or verify timing relationships exactly as GM directs. Never assume a diagram for one RPO applies to another generation." ] },
    { heading: "When to replace the timing chain", paragraphs: ["There is no universal mileage at which every Chevy 3.6 chain should be replaced. Replace components when diagnosis confirms wear, damage, loss of tension, incorrect timing, or another condition covered by the engine-specific procedure. Preventive replacement can make sense during related engine work only after evaluating cost, history, and component condition.", "If the engine runs normally, carries no correlation codes, receives correct oil service, and live timing data is in range, a search result alone is not a reason to open the timing cover. Keep records, respond to warning signs early, and use a technician familiar with the exact High Feature V6 generation." ] },
  ],
  faqs: [
    { q: "Does a Chevy 3.6 have a timing belt or chain?", a: "It uses timing chains. Verify the exact engine RPO because layouts and parts differ across 3.6L generations." },
    { q: "When should the Chevy 3.6 timing chain be replaced?", a: "There is no routine belt-style interval. Replacement is based on diagnosis, wear, codes, noise, and engine-specific service information." },
    { q: "What codes are associated with Chevy 3.6 timing problems?", a: "Correlation codes can include P0008, P0009, and P0016 through P0019, but diagnosis must rule out oil, actuator, wiring, sensor, phaser, and assembly issues." },
    { q: "Can an oil change fix timing-chain rattle?", a: "Correct oil level and quality matter, but fresh oil cannot repair worn chains, guides, tensioners, or phasers. Persistent noise needs diagnosis." },
    { q: "Are all Chevy 3.6 timing-chain kits the same?", a: "No. Match the vehicle, year, engine RPO, production break, and current parts information before ordering." },
  ], sources: [gm36Chain, gm36Service], reviewed, featureImage: feature("chevy-36-timing-chain"),
};

export const additionalSpecs: SpecRecord[] = [
  ...guides.slice(0, 11),
  chevy454HeadTorque,
  ...guides.slice(11, 12),
  chevy36Timing,
  ...guides.slice(12),
];
