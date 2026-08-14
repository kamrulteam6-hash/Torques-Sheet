import type { SpecRecord, Source } from "./chevy350-content";

const reviewed = "2026-08-14";

const fordManual: Source = {
  label: "Ford Owner's Manual — capacities and specifications",
  url: "https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?ProcUid=G2135187&Uid=G2135181&buildtype=web&countryCode=USA&div=f&languageCode=en&moidRef=G2133834&vFilteringEnabled=True&variantid=7320",
  note: "Primary Ford owner-manual data for F-150 capacities and service specifications.",
};
const fordWheel: Source = {
  label: "Ford F-150 Owner's Manual — wheel nuts",
  url: "https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?ProcUid=G2181101&Uid=G2180866&buildtype=web&countryCode=USA&div=f&languageCode=en&moidRef=G2154962&userMarket=USA&vFilteringEnabled=True&variantid=11123",
  note: "Primary Ford wheel-nut procedure, clean-thread requirement, and recheck guidance.",
};
const fordEngineHistory: Source = {
  label: "Ford Performance engine history — 289/302/351W",
  url: "https://performanceparts.ford.com/download/pdfs/enginehistory.pdf",
  note: "Ford Performance reference explaining the standard 302, 5.0 HO, and 351W firing-order difference.",
};
const ford302Instructions: Source = {
  label: "Ford Performance M-9424-F302 installation instructions",
  url: "https://performanceparts.ford.com/download/instructionsheets/fordinstshtm-9424-f302.pdf",
  note: "Ford Performance instructions explicitly identifying early and late 289/302 firing orders.",
};
const fordEcoBoost: Source = {
  label: "2024 Ford F-150 Owner's Manual — 3.5L EcoBoost specifications",
  url: "https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?ProcUid=G2373526&Uid=G2373524&buildtype=web&countryCode=USA&div=f&languageCode=en&moidRef=G910632&userMarket=USA&vFilteringEnabled=False&variantid=9535",
  note: "Primary Ford specification for the later 3.5L EcoBoost plug-gap range.",
};
const fordEcoBoostEarlier: Source = {
  label: "Ford F-150 Owner's Manual — earlier 3.5L EcoBoost specifications",
  url: "https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?ProcUid=G1777515&Uid=G1777480&buildtype=web&countryCode=USA&div=f&languageCode=en&moidRef=G910632&userMarket=usa&vFilteringEnabled=False&variantid=4768",
  note: "Primary Ford specification showing the earlier 0.030–0.033 inch range.",
};

const toyotaRav4: Source = {
  label: "Toyota RAV4 Owner's Manual",
  url: "https://assets.sia.toyota.com/publications/en/om-s/OM24V1QRG/pdf/OM24V1QRG.pdf",
  note: "Primary Toyota owner information for RAV4 maintenance and engine identification.",
};
const toyotaWheel: Source = {
  label: "Toyota Owner's Manual — wheel installation specification",
  url: "https://assets.sia.toyota.com/publications/en/om/OM32464U/pdf/4_142.pdf",
  note: "Primary Toyota instructions specifying 76 lb-ft and staged tightening in the illustrated pattern.",
};
const toyotaTacoma: Source = {
  label: "Toyota Tacoma Owner's Manual — specifications",
  url: "https://assets.sia.toyota.com/publications/en/om/OM35704U/pdf/omsource/1996om/96tacom/sect8/81.pdf",
  note: "Primary Toyota Tacoma specification listing 83 lb-ft (110 N·m).",
};

const hondaCrv: Source = {
  label: "2025 Honda CR-V Owner's Manual — flat-tire procedure",
  url: "https://techinfo.honda.com/rjanisis/pubs/OM/AH/A3A02525IOM/enu/details/131240047-15363.html",
  note: "Primary Honda procedure specifying 80 lb-ft and multiple passes through the tightening order.",
};
const hondaCivicWheel: Source = {
  label: "2025 Honda Civic Hatchback Owner's Manual — tire rotation",
  url: "https://techinfo.honda.com/rjanisis/pubs/OM/AH/AT402525IOM/enu/details/131271047-14882.html",
  note: "Primary Honda source documenting the 80 lb-ft CVT and 94 lb-ft manual-transmission distinction.",
};
const hondaCivicSpecs: Source = {
  label: "2024 Honda Civic Owner's Manual — specifications",
  url: "https://techinfo.honda.com/rjanisis/pubs/OM/AH/AT202424IOM/enu/details/131229047-16992.html",
  note: "Primary Honda application table listing the correct original-equipment spark-plug part numbers by engine.",
};
const hondaOlderSpark: Source = {
  label: "Honda Civic Owner's Manual — spark-plug service",
  url: "https://techinfo.honda.com/rjanisis/pubs/OM/AH/ASI0000OM/enu/SI0000OM.PDF",
  note: "Primary Honda procedure for older Civic plug gap and tightening torque.",
};

const gm2020: Source = {
  label: "2020 Chevrolet Silverado Owner's Manual",
  url: "https://contentdelivery.ext.gm.com/content/dam/cope/en_us/public/pdf_assets/active/owners_manuals_browse/20_CHEV_Silverado_OM_en_US_U_84186886C_2020JAN30_3P.pdf",
  note: "Primary GM owner manual covering 5.3L capacity, wheel-nut torque, fluids, and engine specifications.",
};
const gm2024: Source = {
  label: "2024 Chevrolet Silverado 1500 Owner's Manual",
  url: "https://contentdelivery.ext.gm.com/content/dam/cope/en_us/public/pdf_assets/active/owners_manuals_browse/24_CHEV_Silverado_1500_OM_en_US_U_85516379D_2025JUN26_4P.pdf",
  note: "Current primary GM owner-manual reference for Silverado 1500 service specifications.",
};
const gmSierra2020: Source = {
  label: "2020 GMC Sierra/Sierra Denali Owner's Manual",
  url: "https://contentdelivery.ext.gm.com/content/dam/cope/en_us/public/pdf_assets/active/owners_manuals_browse/20_GMC_Sierra_OM_en_US_U_84186890A_2019APR11.pdf",
  note: "Primary GMC owner manual covering Sierra wheel torque, 5.3L capacity, fluids, and technical specifications.",
};
const gmFiring: Source = {
  label: "Chevrolet Performance LS-family installation guide",
  url: "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/performance/resources/installation-guides/crate-engines/02-pdf/long-block-install-guide-19260831-19299306-19260833.pdf",
  note: "Primary Chevrolet Performance documentation for the LS-family 1-8-7-2-6-5-4-3 firing order.",
};

const ramManual: Source = {
  label: "2024 Ram 1500 Owner Handbook",
  url: "https://vehicleinfo.mopar.com/assets/publications/en-us/Ram/2024/1500_DT/5816357_24_DT_OH_EN_USC_DIGITAL_E4.pdf",
  note: "Primary Ram handbook listing 5.7L HEMI oil capacity and service information.",
};
const moparTorque: Source = {
  label: "Mopar wheel and tire torque specifications",
  url: "https://vehicleinfo.mopar.com/assets/publications/en-us/Ram/2022/2500_3500/om_html/GUID-9C0341DF-52DA-4AF7-893F-C83B89EBD262.html",
  note: "Primary Mopar procedure for dry fasteners, star-pattern tightening, and post-service recheck.",
};
const hemiFiring: Source = {
  label: "Stellantis 5.7L HEMI technical description",
  url: "https://www.media.stellantis.com/me-en/ram/press/2027-ram-1500-rumble-bee-muscle-trucks-launch-all-new-pickup-performance-subsegment",
  note: "Manufacturer technical release explicitly listing the 5.7L HEMI firing order.",
};
const jeepManual: Source = {
  label: "Jeep Wrangler Owner's Information",
  url: "https://vehicleinfo.mopar.com/assets/publications/en-us/Jeep/2022/Wrangler/HTML-TG2/GUID-602FC08B-3303-411F-94D6-34A909AB65AF.html",
  note: "Primary Jeep owner information for JL-platform wheel service and safety guidance.",
};

type Base = Pick<
  SpecRecord,
  | "slug"
  | "keyword"
  | "make"
  | "model"
  | "category"
  | "title"
  | "metaDescription"
  | "answer"
  | "detail"
  | "scope"
  | "values"
  | "sources"
> & {
  identity: string;
  distinctions: string[];
};

function lugGuide(base: Base): SpecRecord {
  const primary = base.values[0]?.value ?? "See the application table";
  return {
    ...base,
    reviewed,
    diagram: {
      type: "wheel",
      title: `Interactive ${base.make} ${base.model} lug-tightening diagram`,
      caption:
        "Select each position to follow a five-lug star pattern. Six-lug wheels use the same opposite-side principle; follow the pattern in the exact owner manual.",
      points: ["1", "4", "2", "5", "3"],
    },
    intro: [
      `The short answer for the most common ${base.identity} application is ${primary}, but wheel torque is a safety specification—not a value to guess from memory. Model year, platform, stud size, factory wheel design, and an aftermarket wheel manufacturer's instructions can change the required value. This guide therefore starts with the verified application table and then explains how to produce an accurate clamping load instead of merely making the wrench click.`,
      `Correct torque keeps the wheel seated evenly against the hub. Too little clamping force can let the wheel move and loosen the fasteners. Too much can stretch studs, damage the nut seat, distort a brake rotor, or make roadside removal impossible. Read the scope note, identify the vehicle and wheel, clean the mating surfaces, and use a calibrated torque wrench for the final passes.`,
    ],
    steps: [
      "Park on a firm, level surface, set the parking brake, select Park or first gear, and chock the wheel diagonally opposite the one being serviced.",
      "Confirm the model year, platform, wheel type, fastener type, and the exact value in the application table or the vehicle's own manual.",
      "With the vehicle safely supported, clean the hub face, wheel mounting pad, studs, and nut seats. Replace damaged, swollen, cracked, or cross-threaded fasteners.",
      "Install every nut by hand for several full turns. If a nut will not spin on normally, stop and correct the thread problem rather than driving it on with an impact tool.",
      "Snug the fasteners in a star or opposite-side pattern while the wheel is just supported, then lower the vehicle enough to prevent rotation without placing its full weight on a visibly unseated wheel.",
      "Set the torque wrench to the verified specification. Tighten in the illustrated pattern, repeat the pattern once as a confirmation pass, restore tire pressure, and perform the manufacturer's recommended recheck.",
    ],
    sections: [
      {
        heading: `How to read the ${base.model} torque table`,
        paragraphs: [
          `Start with model year and platform rather than wheel diameter. Factory 17-, 18-, and 20-inch wheels can share a value when they use the same stud and seat design, while two trucks sold in the same calendar year can differ because one is an outgoing platform. ${base.distinctions[0]}`,
          `The figures in this guide assume original-equipment-style fasteners and clean, dry threads unless the cited manufacturer says otherwise. If an aftermarket wheel, spacer, conversion stud, locking nut, or repair kit supplies a different instruction, that component-specific document controls. Record the final value on the work order so the next technician does not have to infer it.`,
        ],
      },
      {
        heading: "Why clean, dry threads matter",
        paragraphs: [
          `A torque wrench measures resistance to turning; it does not directly measure stud tension. Rust, dirt, damaged plating, oil, grease, or anti-seize changes the relationship between the wrench reading and the actual clamping force. A lubricated fastener can create substantially more tension at the same displayed torque, which is why the owner-manual instruction to keep the threads and seats clean and dry is part of the specification.`,
          `Clean loose corrosion from the hub face and wheel pad so the wheel can sit flat. Do not grind away sound material or coat the conical or ball seat with lubricant. A tiny amount of corrosion-prevention material may be permitted only on a hub pilot in some manuals; that is different from coating the studs, nut seats, or wheel mounting face.`,
        ],
      },
      {
        heading: "Correct tightening pattern and staged passes",
        paragraphs: [
          `The star pattern is not cosmetic. Moving to a fastener across the center draws the wheel onto the hub evenly and reduces the chance of trapping the wheel at an angle. For a five-lug wheel, follow 1-3-5-2-4 around the circle, or use the numbered interactive diagram. For six or eight lugs, continue selecting the fastener approximately opposite the one just tightened.`,
          `Use two or three stages when the wheel has been fully removed: hand snug, an intermediate pass, and the final specification. Do not use an impact wrench for the final value. Impact output varies with air pressure, battery state, socket mass, joint friction, and trigger time. It is suitable for gentle run-down only when the nut remains below final torque.`,
        ],
      },
      {
        heading: "When and how to recheck torque",
        paragraphs: [
          `Rechecking is especially important after a wheel change, tire rotation, brake job, new wheel installation, or any work that disturbed the wheel. Heat cycles and small amounts of paint, corrosion, or debris can settle. Perform the recheck at the distance stated by the exact manual or wheel manufacturer; many late-model procedures specify a short post-service interval.`,
          `To recheck, let the brakes and wheels cool, place the torque wrench at the specified value, and follow the complete pattern. Do not loosen each nut first unless the service procedure specifically requires it. If a fastener turns significantly before reaching the setting, inspect the wheel seat, stud, nut, and hub rather than assuming repeated tightening will solve the cause.`,
        ],
      },
      {
        heading: "Common mistakes that produce an unsafe wheel installation",
        bullets: [
          "Using a value from a different generation, heavy-duty model, or aftermarket wheel.",
          "Applying oil or anti-seize to a specification written for dry threads.",
          "Cross-threading with an impact gun instead of starting every nut by hand.",
          "Tightening clockwise around the circle instead of using an opposite-side pattern.",
          "Letting the full vehicle weight trap a wheel that is not yet centered on the hub.",
          "Skipping the confirmation pass and the post-service recheck.",
        ],
        paragraphs: [
          `${base.distinctions[1] ?? "A factory torque value is valid only for the application identified by its manual."} Treat an unfamiliar nut seat, stud, spacer, or wheel as a reason to stop and identify the hardware before tightening.`,
        ],
      },
      {
        heading: "Tool selection and accuracy check",
        paragraphs: [
          `Use a torque wrench whose working range places ${primary} away from the extreme bottom or top of the scale. A six-point deep socket that fully engages the nut reduces rounding. Extensions used straight do not normally change torque, but crow-foot adapters that change the effective wrench length require calculation. Return a click wrench to its minimum marked setting after use and calibrate it at the interval specified by its maker.`,
          `If the only available wrench has been dropped, stored under load, or shows inconsistent clicks, use another verified tool. Wheel service is a poor place to test a questionable wrench. A smooth pull at the handle's marked grip point gives a more repeatable result than a jerk, bounce, or second click applied “for luck.”`,
        ],
      },
    ],
    faqs: [
      {
        q: `What is the ${base.keyword}?`,
        a: `${base.answer} Use the application table because the broad search phrase can cover more than one platform or model year.`,
      },
      {
        q: "Should lug nuts be torqued wet or dry?",
        a: "Use clean, dry threads and seats unless the exact vehicle or wheel instruction explicitly specifies a lubricant. Lubrication changes clamping force at a given wrench reading.",
      },
      {
        q: "Can I use an impact wrench for final tightening?",
        a: "Use it only for controlled run-down below final torque. Finish every fastener with a calibrated hand torque wrench in the correct pattern.",
      },
      {
        q: "Do aluminum wheels use a different value?",
        a: "Not automatically. The correct value comes from the vehicle/wheel application and fastener design, not from wheel material alone.",
      },
      {
        q: "Why should wheel torque be checked again?",
        a: "Mating surfaces can settle after removal and installation. A short-distance recheck confirms that every fastener retained the specified clamp load.",
      },
    ],
  };
}

function oilGuide(base: Base): SpecRecord {
  const primary = base.values[0]?.value ?? "See the application table";
  return {
    ...base,
    reviewed,
    diagram: {
      type: "oil",
      title: `Interactive ${base.make} ${base.model} oil-service workflow`,
      caption:
        "Follow the workflow from vehicle identification through final dipstick verification. Published capacities are starting quantities, not a substitute for the level check.",
      points: ["Identify", "Drain", "Filter", "Refill", "Run", "Verify"],
    },
    intro: [
      `${base.answer} That number is a refill starting point for the identified engine, not permission to pour the entire amount without checking. Oil can remain in galleries, coolers, a tilted pan, or an old filter, and aftermarket pans can change total volume. The safest method is to verify the engine code and model year, use the correct viscosity and approval, refill slightly below capacity, circulate the oil, wait, and finish by the dipstick.`,
      `This guide separates similarly named engines and model generations because capacity errors commonly come from a search result that omits the year or engine code. The table also distinguishes “with filter” from “without filter.” During a normal oil change, replace the filter and use the with-filter figure, then confirm the final level on level ground under the conditions specified by the owner manual.`,
    ],
    steps: [
      "Confirm the VIN, model year, engine displacement/code, drivetrain if relevant, and whether the engine or oil pan is original.",
      "Warm the engine enough to suspend contaminants, park level, shut it off, secure the vehicle, and allow hot components to become safe to work around.",
      "Remove the drain plug and old filter, allow a complete drain, inspect the sealing surfaces, and install the correct filter and plug using their component-specific instructions.",
      "Add approximately half a quart less than the listed with-filter capacity through a clean funnel, reinstall the cap, and check for tools or rags before starting.",
      "Run the engine briefly while watching the oil-pressure indicator, shut it off, inspect the plug and filter for leakage, and wait the manual's specified drain-back time.",
      "Check the dipstick on level ground, add small measured amounts to reach the full mark without exceeding it, reset the oil-life monitor, and document the product and quantity used.",
    ],
    sections: [
      {
        heading: `Oil-capacity chart for ${base.model}`,
        paragraphs: [
          `Use the chart as an application lookup. ${base.distinctions[0]} A capacity printed beside the wrong engine code is not “close enough”; even engines sharing the same displacement can have different pans, filters, coolers, or drain-back behavior. If the vehicle has been swapped, rebuilt, or fitted with an aftermarket pan, use the installed hardware manufacturer's capacity and calibration marks.`,
          `The most common current application begins near ${primary}. Begin below that amount and finish by measurement. The difference between the add and full marks is often about one quart, but do not assume that relationship when the dipstick is aftermarket, damaged, or paired with a non-original tube. Investigate a reading that remains absent or implausibly high.`,
        ],
      },
      {
        heading:
          "Capacity, viscosity, and oil approval are different specifications",
        paragraphs: [
          `Capacity tells you approximately how much the crankcase accepts after a defined service. Viscosity—such as 0W-20 or 5W-20—describes flow behavior across temperature ranges. The manufacturer approval or material standard addresses performance tests beyond viscosity. Match all three items to the year and engine; a bottle with the right viscosity is not automatically approved for every application.`,
          `${base.distinctions[1]} Climate provisions can allow an alternate viscosity in severe cold or special duty, but those exceptions belong to a specific manual. Avoid universal additive claims that conflict with the manufacturer-approved oil chemistry, and never mix a guess about viscosity with a guess about capacity.`,
        ],
      },
      {
        heading: "How to get an accurate dipstick reading",
        paragraphs: [
          `Park on level ground. Follow the manual's hot or cold checking method because drain-back time affects the reading. Pull the dipstick, wipe it clean, fully reinsert it, and withdraw it again without dragging the marked area along the tube more than necessary. Read both sides; the lower consistent boundary is more reliable when oil smears up one side.`,
          `Add oil in small measured increments and allow time to reach the pan. Overfilling can aerate the oil as the crankshaft contacts it, increase crankcase pressure, contaminate the intake through the ventilation system, or damage emissions components. Underfilling reduces the reserve available during braking, cornering, towing, or operation on grades.`,
        ],
      },
      {
        heading: "Filter replacement and leak inspection",
        paragraphs: [
          `Confirm the old filter gasket came off with the filter. A double gasket can dump oil rapidly after startup. Lightly oil the new gasket only when the filter maker directs it, tighten by the stated turn or torque method, and keep the mounting pad clean. Replace a drain-plug gasket or seal when required and use the exact plug torque rather than guessing from wrench feel.`,
          `After starting, verify that the oil-pressure warning clears promptly. Shut down immediately if it does not. Inspect the filter perimeter, drain plug, and nearby splash shield with a light. A clean final inspection is easier when residual oil from removal has been wiped away. Recheck the parking spot and oil level after the first drive.`,
        ],
      },
      {
        heading: "Oil-life monitor and service interval",
        paragraphs: [
          `An oil-life monitor estimates service need from operating conditions; it does not measure the amount of oil in the pan. Reset it only after completing the oil and filter service. Continue checking the level between changes, especially before long trips, towing, high-speed driving, or off-road use. A vehicle can consume or leak oil while the monitor still shows substantial life remaining.`,
          `Follow the time, mileage, engine-hour, and severe-service limits in the exact owner manual. Repeated short trips, dusty roads, extended idling, heavy loads, and extreme temperatures can justify closer inspection or a shorter interval. Keep receipts and record the oil approval, viscosity, filter number, mileage, and measured refill quantity.`,
        ],
      },
      {
        heading: "Common causes of a capacity mismatch",
        bullets: [
          "The lookup used the model name but not the model year or engine code.",
          "The quoted figure excluded the filter while the filter was replaced.",
          "The vehicle was not level or the oil had not drained back before checking.",
          "An oil cooler, remote filter, aftermarket pan, engine swap, or incorrect dipstick changed the system.",
          "The old filter gasket remained on the housing or a leak began after startup.",
          "The crankcase was filled to the advertised capacity without a final dipstick check.",
        ],
        paragraphs: [
          `${base.detail} If the verified dipstick result and the expected quantity disagree materially, stop and identify the cause instead of choosing whichever number is more convenient.`,
        ],
      },
    ],
    faqs: [
      {
        q: `How much oil does the ${base.model} take?`,
        a: `${base.answer} Confirm the year/engine row and finish by the dipstick rather than treating the capacity as an exact pour-in amount.`,
      },
      {
        q: "Does the published capacity include the filter?",
        a: "Use the table note. The main figures in this guide identify with-filter capacity because a normal service includes a new filter.",
      },
      {
        q: "Should I add the full capacity at once?",
        a: "No. Add slightly less, run the engine, wait for drain-back on level ground, and bring the level to full in small measured amounts.",
      },
      {
        q: "Can the same-displacement engine use a different amount in another year?",
        a: "Yes. Oil-pan, filter, cooler, and engine-generation changes can alter capacity even when the badge still shows the same displacement.",
      },
      {
        q: "What if my dipstick disagrees with the chart?",
        a: "Recheck the identification and checking procedure. If the mismatch remains, investigate non-original hardware, an incorrect dipstick, incomplete draining, or leakage before operating the vehicle.",
      },
    ],
  };
}

function firingGuide(base: Base): SpecRecord {
  const order = base.values[0]?.value ?? "See the application table";
  return {
    ...base,
    reviewed,
    diagram: {
      type: "firing",
      title: `Interactive ${base.make} ${base.model} firing-order diagram`,
      caption:
        "Select each cylinder to walk through the firing order. Cylinder-bank numbering and distributor direction must match the identified engine family.",
      points: order.split("-").filter(Boolean),
    },
    intro: [
      `${base.answer} A firing order is the sequence in which the cylinders begin their power strokes. It is not the same thing as cylinder numbering, distributor-cap clock position, or ignition-coil connector order. Confusing those references can create a no-start, violent backfire, dead cylinders, or a diagnostic trail that looks like a fuel or mechanical problem.`,
      `Use the verified order only after identifying the engine family and camshaft. Classic engines can accept camshaft swaps that change the required sequence, while modern coil-on-plug engines have no distributor cap to route. The table, bank diagram, and procedure below keep those concepts separate and show how to confirm No. 1 on compression before moving any wires.`,
    ],
    steps: [
      "Identify the engine by year, casting, VIN code, induction system, and—on a rebuilt classic engine—the installed camshaft or engine-builder documentation.",
      "Disconnect power as appropriate, label every wire or coil connector, and photograph the original routing before removing parts.",
      "Locate cylinder 1 using the bank-numbering diagram; do not assume the left/right convention matches another manufacturer's V8.",
      "For a distributor engine, rotate to cylinder 1 compression TDC and identify the cap terminal directly above the rotor. That terminal is No. 1 for the installed distributor position.",
      `Route or verify the remaining cylinders in ${order} order, following the correct rotor direction or the harness/coil identification for the system.`,
      "Keep leads separated from exhaust heat and sharp edges, reinstall retainers, then verify starting, idle quality, diagnostic codes, and ignition timing where adjustable.",
    ],
    sections: [
      {
        heading: `Which ${base.model} firing order applies?`,
        paragraphs: [
          `${base.distinctions[0]} This distinction matters because the engine can look nearly identical from above. Treat the camshaft or engine assembly as the authority when parts have been mixed. A firing order cast into an intake, copied from a generic decal, or remembered from another V8 is not enough to identify a modified engine.`,
          `The application table separates the order, cylinder banks, and ignition-system notes. Read all columns before routing. The first number in ${order} is cylinder 1, but the physical No. 1 terminal can appear in different clock positions when a distributor has been installed on a different gear tooth.`,
        ],
      },
      {
        heading: "Cylinder numbering versus firing sequence",
        paragraphs: [
          `Cylinder numbering tells you each bore's permanent identity. Firing order tells you the repeating sequence of combustion events. The crankshaft makes two full revolutions during a four-stroke cycle, so checking only that the timing mark is at top dead center is insufficient: cylinder 1 can be at compression TDC or exhaust TDC. Both valves should be closed at compression TDC.`,
          `${base.distinctions[1]} Mark the banks temporarily when working in a crowded engine bay. Route one connection from its source to its cylinder and verify both ends before starting the next; tracing a completed bundle afterward invites transposed pairs.`,
        ],
      },
      {
        heading: "How to find compression TDC on cylinder 1",
        paragraphs: [
          `Remove the cylinder 1 spark plug with the engine cool. Rotate the crankshaft in its normal direction while feeling for compression with an appropriate method, then bring the timing mark to zero or the specified installation position. Never use the starter with hands, tools, or loose clothing near rotating parts. A piston-stop tool requires a dedicated procedure and should not be improvised.`,
          `On a distributor engine, remove the cap and observe the rotor. The cap post over the rotor becomes the practical No. 1 location for that installation. If the vacuum advance, wiring, or housing cannot be positioned correctly, the distributor may need to be re-indexed, but re-indexing is separate from changing the firing order.`,
        ],
      },
      {
        heading:
          "Distributor direction, coil-on-plug systems, and wire routing",
        paragraphs: [
          `A distributor's rotation direction determines which adjacent cap terminal is next. Verify the direction for the engine family rather than assuming clockwise. Coil-on-plug engines electronically schedule the same mechanical firing sequence, but the service task becomes identifying the correct coil, connector, harness branch, or control circuit instead of arranging terminals around a cap.`,
          `Keep secondary leads away from exhaust components and moving linkages. Avoid long parallel runs between consecutively firing cylinders when the manufacturer provides separators or a routing plan, because inductive coupling can trigger crossfire in vulnerable systems. Use boots and terminals designed for the cap and plugs; a wire that feels attached may not have fully engaged.`,
        ],
      },
      {
        heading: "Symptoms of an incorrect firing order",
        bullets: [
          "Cranks normally but will not start after plug-wire or engine work.",
          "Popping through the intake, carburetor, or exhaust during cranking.",
          "Severe shaking, dead cylinders, low manifold vacuum, or raw-fuel odor.",
          "Multiple misfire codes that appeared immediately after connectors were disturbed.",
          "Timing-light marks that are unstable or cannot be brought into the expected range.",
          "Exhaust manifolds that warm unevenly because one or more cylinders are not contributing.",
        ],
        paragraphs: [
          `Do not continue extended cranking or driving with a known misfire. Unburned fuel can damage a catalytic converter, wash oil from cylinder walls, or ignite in the exhaust. Recheck identification, No. 1 compression TDC, bank numbering, and every connection.`,
        ],
      },
      {
        heading: "A disciplined verification method",
        paragraphs: [
          `Print or download the branded diagram, write the actual cap or coil identifiers beside each cylinder, and check off connections in sequence. Use an ohmmeter only where the wire manufacturer's resistance specification is available; continuity alone does not prove that a lead will contain ignition voltage under load. Inspect boots for carbon tracking and terminals for corrosion or pull-out.`,
          `${base.detail} After the engine starts, verify any adjustable base timing using the exact procedure for disabling computer advance or disconnecting a timing connector. Modern engine timing is PCM controlled and should not be “set” by moving sensors or guessing at reference positions.`,
        ],
      },
    ],
    faqs: [
      { q: `What is the ${base.keyword}?`, a: base.answer },
      {
        q: "Is cylinder numbering the same as firing order?",
        a: "No. Numbering identifies physical cylinders; firing order is the sequence in which those cylinders begin power strokes.",
      },
      {
        q: "Does the No. 1 distributor terminal have one fixed clock position?",
        a: "Not necessarily. The terminal over the rotor at cylinder 1 compression TDC is No. 1 for the installed distributor position.",
      },
      {
        q: "Can a camshaft change the firing order?",
        a: "On engine families offered with alternate orders, yes. A camshaft and its matching ignition routing must use the same order.",
      },
      {
        q: "Why does the engine backfire after replacing wires?",
        a: "The usual causes are crossed wires, No. 1 indexed on exhaust rather than compression TDC, wrong bank numbering, or the wrong order for the installed engine/camshaft.",
      },
    ],
  };
}

function sparkGuide(base: Base): SpecRecord {
  const primary = base.values[0]?.value ?? "See the application table";
  return {
    ...base,
    reviewed,
    diagram: {
      type: "spark",
      title: `Interactive ${base.make} ${base.model} spark-plug gap reference`,
      caption:
        "Compare the application ranges before touching an electrode. Many modern fine-wire plugs should be replaced, not forcibly regapped.",
      points: base.values.slice(0, 4).map((value) => value.value),
    },
    intro: [
      `${base.answer} Spark-plug gap is application-specific, and the number alone does not identify the correct plug. Reach, seat type, heat range, resistor design, terminal, electrode construction, and manufacturer part number all matter. A plug can measure the expected gap and still be completely wrong for the engine. Begin with the model year, engine code, and original-equipment plug reference in the table.`,
      `Turbocharged, direct-injected, and modern coil-on-plug engines are especially sensitive to correct parts and installation. Excessive gap can demand more voltage and cause misfire under boost or load. Too little gap can reduce flame-kernel exposure. Fine-wire iridium or platinum electrodes are easily damaged by old-style levering tools, so follow the plug and vehicle manufacturer's adjustment policy.`,
    ],
    steps: [
      "Identify the exact model year, engine, calibration or performance variant, and the approved spark-plug part number before removing anything.",
      "Work on a cool engine, clear dirt from the plug wells, disconnect coils carefully, and keep every coil, boot, fastener, and connector organized by cylinder.",
      "Inspect each new plug for shipping damage, correct reach and seat, intact insulator, and the application-specific gap using a clean wire-style gauge.",
      "Do not pry against a fine-wire center electrode. If the vehicle or plug maker says the plug is non-adjustable, replace an out-of-range plug.",
      "Thread each plug fully by hand to prevent cross-threading, then tighten with the exact service torque or the plug maker's angle method for the seat and head material.",
      "Reinstall boots and coils, verify connector locks and harness routing, start the engine, and check for smooth operation or stored/pending misfire codes.",
    ],
    sections: [
      {
        heading: `Spark-plug gap chart for ${base.model}`,
        paragraphs: [
          `${base.distinctions[0]} The range ${primary} applies only to the row where it appears. Production changes can occur inside a generation, and performance packages may use a different plug or gap from the standard engine. The under-hood emissions label, VIN-filtered parts catalog, and exact owner/service manual take priority over a broad web lookup.`,
          `Record both inch and millimeter values to avoid conversion mistakes. One millimeter equals 0.03937 inch, so a casual decimal rounding can move a plug outside a narrow published range. Use a gauge marked in the unit shown by the source and check calibration if the tool is worn, bent, or difficult to read.`,
        ],
      },
      {
        heading: "Why the correct plug part number matters",
        paragraphs: [
          `Gap is only one dimension. Thread diameter and reach determine whether the plug fits the head and positions the electrode correctly. Seat style determines how it seals and how torque creates clamping force. Heat range controls how quickly the insulator transfers heat, while resistor and electrode design affect ignition and electromagnetic compatibility. Substituting by gap alone can damage the engine.`,
          `${base.distinctions[1]} Cross-reference catalogs are useful, but confirm the final selection against the VIN, engine code, emissions label, or manufacturer catalog. Do not assume every plug in a multi-pack is identical; inspect the printed number and physical condition of each one.`,
        ],
      },
      {
        heading: "How to measure a fine-wire plug safely",
        paragraphs: [
          `Use a round wire gauge that fits between the electrodes without forcing them apart. A flat blade can bridge curved surfaces and give a misleading result. Insert the wire gently at the open side of the gap. It should pass with light, even drag. Do not scrape an iridium or platinum tip repeatedly, and never press a tool against the center electrode or insulator nose.`,
          `If adjustment is allowed, move only the ground strap with a purpose-made tool and make tiny corrections. Keep the ground strap centered over the center electrode and parallel at the measurement point. If the strap is twisted, the weld is stressed, the porcelain is chipped, or the gap changes with light pressure, discard the plug.`,
        ],
      },
      {
        heading: "Installation torque and thread protection",
        paragraphs: [
          `Plug torque depends on thread size, seat type, gasket condition, cylinder-head material, and whether the plug is new or reused. Use the exact engine procedure. Too little torque can impair heat transfer and allow combustion leakage; too much can distort the shell, damage the insulator, or strip aluminum head threads. Start every plug by hand with the socket and extension only.`,
          `Many modern plugs have a plated shell designed for installation without anti-seize. Adding compound changes friction and can cause over-tightening at the specified wrench value. Apply lubricant only when the vehicle or plug manufacturer explicitly directs it and provides the corresponding torque method. Keep dielectric grease, if specified, inside the boot—not on the electrical terminal or plug threads.`,
        ],
      },
      {
        heading: "What plug condition can reveal",
        bullets: [
          "Dry black deposits can accompany rich operation, weak ignition, excessive idling, or an unsuitable heat range.",
          "Wet fuel after repeated cranking suggests the cylinder is not firing or the engine is flooded.",
          "Oily deposits can point to oil control, guide, turbocharger, or crankcase-ventilation problems.",
          "A white, blistered, or eroded insulator/electrode can indicate overheating, detonation, lean operation, or the wrong plug.",
          "A cracked insulator or carbon track can cause a load-dependent misfire even when the gap looks correct.",
          "Uneven condition across cylinders is a reason to diagnose that cylinder rather than simply fitting a hotter plug.",
        ],
      },
      {
        heading: "Diagnosing a misfire after plug replacement",
        paragraphs: [
          `If a misfire appears immediately after service, first recheck connector engagement, coil seating, boot springs, plug part numbers, gap, and torque. Look for a cracked porcelain caused by a tilted socket. Confirm that no vacuum hose, ground, or harness was left disconnected. Moving a coil or plug to another cylinder can help isolate a component only when the diagnostic procedure permits it.`,
          `${base.detail} Do not shrink the gap below the manufacturer range to conceal a weak coil, fueling error, excessive boost, or mechanical problem. That may suppress one symptom while reducing combustion quality and delaying the real repair.`,
        ],
      },
    ],
    faqs: [
      {
        q: `What is the ${base.keyword}?`,
        a: `${base.answer} Match the exact year, engine, and plug part number in the application table.`,
      },
      {
        q: "Should new spark plugs be checked?",
        a: "Inspect them for damage and verify the application-specific gap gently. Do not force or regap a plug the manufacturer identifies as non-adjustable.",
      },
      {
        q: "Can I use a coin-style ramp gauge?",
        a: "A wire-style gauge is safer and more accurate for fine-wire plugs. Ramp tools can load or damage delicate electrodes.",
      },
      {
        q: "Should spark-plug threads get anti-seize?",
        a: "Not unless the vehicle or plug manufacturer explicitly instructs it. Plated modern shells are commonly installed dry, and lubricant changes torque.",
      },
      {
        q: "Will a smaller gap fix a boosted-engine misfire?",
        a: "Use the factory range for the exact calibration. A smaller unapproved gap can hide a weak coil, fueling issue, excessive boost, or mechanical fault rather than fix it.",
      },
    ],
  };
}

const fordF150Lug = lugGuide({
  slug: "ford/f-150/lug-nut-torque",
  keyword: "ford f150 lug nut torque spec",
  make: "Ford",
  model: "F-150",
  category: "Torque Specs",
  title: "Ford F-150 Lug Nut Torque Specs by Year and Wheel",
  metaDescription:
    "Ford F-150 lug nut torque chart by generation, including 150 lb-ft modern applications, older and seven-lug exceptions, pattern, and recheck steps.",
  answer:
    "Most 2004–2026 Ford F-150 five- and six-lug factory-wheel applications specify 150 lb-ft (204 N·m). A 2004–2014 seven-lug Heavy Payload application uses 100 lb-ft (135 N·m), and older trucks require a year-specific check.",
  detail:
    "Ford specifies clean, dry fasteners and a post-service recheck. Do not transfer the F-150 value to an F-250/F-350 or to an aftermarket wheel without its own instructions.",
  scope:
    "Covers common U.S.-market F-150 factory-wheel applications. Raptor, fleet, police, heavy-payload, older, and aftermarket combinations must be confirmed by VIN/model-year documentation.",
  values: [
    {
      label: "2015–2026 F-150",
      value: "150 lb-ft (204 N·m)",
      note: "Typical M14 factory fastener; verify exact manual",
    },
    {
      label: "2004–2014 five-lug",
      value: "150 lb-ft (200 N·m)",
      note: "M14 x 2.0 in Ford's owner guide",
    },
    {
      label: "2004–2014 seven-lug Heavy Payload",
      value: "100 lb-ft (135 N·m)",
      note: "M12 x 1.75 exception",
    },
    {
      label: "Older/aftermarket",
      value: "Application-specific",
      note: "Use exact owner or wheel-maker instructions",
    },
  ],
  sources: [fordWheel],
  identity: "late-model Ford F-150",
  distinctions: [
    "The seven-lug Heavy Payload wheel is the important exception in the 2004–2014 era.",
    "Do not confuse F-150 specifications with Super Duty values or an aftermarket wheel's value.",
  ],
});

const fordF150Oil = oilGuide({
  slug: "ford/f-150/5-0/oil-capacity",
  keyword: "ford f150 oil capacity 5.0",
  make: "Ford",
  model: "F-150 5.0L",
  category: "Fluid Capacities",
  title: "Ford F-150 5.0L Oil Capacity by Model Year",
  metaDescription:
    "Ford F-150 5.0 oil capacity chart for Coyote-powered trucks, including 7.7, 8.8, and 7.75-quart eras, viscosity checks, refill, and dipstick procedure.",
  answer:
    "The F-150 5.0L oil capacity is not one number for every Coyote. Common with-filter figures are 7.7 qt for 2011–2017, 8.8 qt for 2018–2020, and about 7.75 qt for many 2021–2026 applications. Verify the exact owner manual and dipstick.",
  detail:
    "Ford owner manuals identify capacity as approximate and require a final level check. Production revisions and market-specific manuals can express the same figure with slightly different rounding.",
  scope:
    "Applies to factory Ford F-150 5.0L Coyote engines. It does not cover Mustang 5.0L pans, crate engines, swaps, or aftermarket oiling systems.",
  values: [
    {
      label: "2011–2017 5.0L",
      value: "7.7 qt (7.3 L)",
      note: "With filter; confirm exact year",
    },
    {
      label: "2018–2020 5.0L",
      value: "8.8 qt (8.3 L)",
      note: "Higher-capacity third-generation application",
    },
    {
      label: "2021–2026 5.0L",
      value: "7.75 qt (7.33 L)",
      note: "Owner-manual figure for many current trucks",
    },
    {
      label: "Final setting",
      value: "Dipstick full mark",
      note: "Level ground after the specified wait",
    },
  ],
  sources: [
    fordManual,
    {
      ...fordManual,
      label: "2017 Ford F-150 Owner's Manual — 5.0L capacities",
      url: "https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?ProcUid=G1833032&Uid=G1833028&buildtype=web&countryCode=USA&div=f&languageCode=en&moidRef=G1635371&userMarket=USA&vFilteringEnabled=False&variantid=4241",
    },
  ],
  identity: "F-150 5.0L Coyote",
  distinctions: [
    "The 2018–2020 third-generation Coyote uses a larger published refill than the generations immediately before and after it.",
    "Use the viscosity and Ford oil specification printed for the exact model year; do not copy a Mustang recommendation.",
  ],
});

const ford302 = firingGuide({
  slug: "ford/302/firing-order",
  keyword: "ford 302 firing order",
  make: "Ford",
  model: "302 / 5.0L",
  category: "Firing Order",
  title: "Ford 302 Firing Order: Standard vs. 5.0 HO",
  metaDescription:
    "Ford 302 firing order guide covering early 1-5-4-2-6-3-7-8 and 5.0 HO 1-3-7-2-6-5-4-8 orders, cylinder numbering, and distributor routing.",
  answer:
    "A standard early Ford 289/302 commonly uses 1-5-4-2-6-3-7-8. The 1982-and-later 5.0 HO and 302 engines using a 351W-order cam use 1-3-7-2-6-5-4-8. Confirm the installed camshaft before routing wires.",
  detail:
    "Ford Performance explicitly documents both orders. The distributor turns counterclockwise when viewed from above on the traditional small-block Ford.",
  scope:
    "Covers traditional distributor-equipped Ford 302/5.0 small-blocks. Modified engines, marine reverse-rotation engines, and non-Ford camshafts require builder documentation.",
  values: [
    {
      label: "Early/standard 289–302",
      value: "1-5-4-2-6-3-7-8",
      note: "Common non-HO cam order",
    },
    {
      label: "1982+ 5.0 HO / 351W-order cam",
      value: "1-3-7-2-6-5-4-8",
      note: "Verify camshaft",
    },
    { label: "Passenger bank", value: "1-2-3-4", note: "Front to rear" },
    { label: "Driver bank", value: "5-6-7-8", note: "Front to rear" },
  ],
  sources: [fordEngineHistory, ford302Instructions],
  identity: "Ford 302 small-block",
  distinctions: [
    "Ford used two legitimate orders: the standard 289/302 order and the 351W-style order used by the 5.0 HO and matching camshafts.",
    "Ford small-block cylinders 1–4 are on the passenger side and 5–8 on the driver side, both front to rear.",
  ],
});

const ford351 = firingGuide({
  slug: "ford/351-windsor/firing-order",
  keyword: "ford 351 windsor firing order",
  make: "Ford",
  model: "351 Windsor",
  category: "Firing Order",
  title: "Ford 351 Windsor Firing Order and Cylinder Numbering",
  metaDescription:
    "Ford 351 Windsor firing order 1-3-7-2-6-5-4-8 with cylinder-bank numbering, counterclockwise distributor routing, TDC procedure, and diagram.",
  answer:
    "The Ford 351 Windsor firing order is 1-3-7-2-6-5-4-8. Cylinders 1-2-3-4 are on the passenger bank and 5-6-7-8 on the driver bank, front to rear; the distributor rotor turns counterclockwise viewed from above.",
  detail:
    "The 351W order was later adopted by 5.0 HO engines, but that does not make every 302 a 351W-order engine. Identify the engine and camshaft independently.",
  scope:
    "Applies to conventional Ford 351W engines with a matching camshaft. It does not cover the 351 Cleveland/Modified families or reverse-rotation marine combinations.",
  values: [
    {
      label: "Firing order",
      value: "1-3-7-2-6-5-4-8",
      note: "Ford 351W order",
    },
    { label: "Passenger bank", value: "1-2-3-4", note: "Front to rear" },
    { label: "Driver bank", value: "5-6-7-8", note: "Front to rear" },
    {
      label: "Distributor rotation",
      value: "Counterclockwise",
      note: "Viewed from above",
    },
  ],
  sources: [fordEngineHistory, ford302Instructions],
  identity: "Ford 351 Windsor",
  distinctions: [
    "Do not identify a 351W only by displacement; the 351 Cleveland and 351 Modified are different engine families.",
    "Ford small-block bank numbering places 1–4 on the passenger side and 5–8 on the driver side.",
  ],
});

const fordEcoBoostGap = sparkGuide({
  slug: "ford/f-150/3-5-ecoboost/spark-plug-gap",
  keyword: "ford f150 spark plug gap 3.5 ecoboost",
  make: "Ford",
  model: "F-150 3.5L EcoBoost",
  category: "Ignition Specs",
  title: "Ford F-150 3.5 EcoBoost Spark Plug Gap by Year",
  metaDescription:
    "Ford F-150 3.5 EcoBoost spark plug gap chart: earlier 0.030–0.033 inch and later 0.028–0.031 inch applications, plus plug handling and misfire guidance.",
  answer:
    "Many earlier F-150 3.5L EcoBoost applications specify 0.030–0.033 in (0.75–0.85 mm), while many 2021-and-later applications specify 0.028–0.031 in (0.7–0.8 mm). Confirm the VIN-filtered owner manual and plug part number.",
  detail:
    "Ford changed the published range across engine generations. Do not use an internet recommendation to close the gap below Ford's range as a substitute for diagnosing boost-related misfire.",
  scope:
    "Covers factory U.S.-market 3.5L EcoBoost F-150 engines. Raptor, high-output, replacement long-block, and modified-boost calibrations require their exact documentation.",
  values: [
    {
      label: "Earlier 3.5L EcoBoost",
      value: "0.030–0.033 in",
      note: "0.75–0.85 mm; many 2011–2020 applications",
    },
    {
      label: "Later 3.5L EcoBoost",
      value: "0.028–0.031 in",
      note: "0.7–0.8 mm; many 2021+ applications",
    },
    {
      label: "2024 Raptor",
      value: "0.028–0.031 in",
      note: "Ford owner-manual specification",
    },
    {
      label: "Adjustment policy",
      value: "Inspect gently",
      note: "Replace damaged/out-of-range fine-wire plugs",
    },
  ],
  sources: [fordEcoBoost, fordEcoBoostEarlier],
  identity: "F-150 3.5L EcoBoost",
  distinctions: [
    "The published gap narrowed with later versions, so model-year identification is essential.",
    "Use the Motorcraft plug listed for the VIN and do not treat standard-output and high-output applications as interchangeable.",
  ],
});

const rav4Lug = lugGuide({
  slug: "toyota/rav4/lug-nut-torque",
  keyword: "toyota rav4 lug nut torque spec",
  make: "Toyota",
  model: "RAV4",
  category: "Torque Specs",
  title: "Toyota RAV4 Lug Nut Torque Spec and Tightening Pattern",
  metaDescription:
    "Toyota RAV4 lug nut torque is commonly 76 lb-ft (103 N·m). See the year scope, five-lug star pattern, clean-hub procedure, and recheck guide.",
  answer:
    "The factory Toyota RAV4 wheel-nut torque is commonly 76 lb-ft (103 N·m) for original-equipment wheels. Confirm the exact model-year manual and use the wheel maker's instructions for aftermarket hardware.",
  detail:
    "Toyota's procedure calls for tightening a little at a time in the illustrated order, repeating until all nuts reach specification.",
  scope:
    "Covers common U.S.-market RAV4 factory steel and alloy wheels. Accessory locks, spacers, conversion studs, and aftermarket wheels require component-specific instructions.",
  values: [
    {
      label: "Factory RAV4 wheels",
      value: "76 lb-ft (103 N·m)",
      note: "Common Toyota owner-manual value",
    },
    {
      label: "Pattern",
      value: "Five-lug star",
      note: "Tighten in progressive passes",
    },
    {
      label: "Threads/seats",
      value: "Clean and dry",
      note: "Do not oil the nut seat",
    },
    {
      label: "Aftermarket wheels",
      value: "Wheel-maker specification",
      note: "May supersede factory value",
    },
  ],
  sources: [toyotaWheel, toyotaRav4],
  identity: "Toyota RAV4",
  distinctions: [
    "Gas, hybrid, and Prime powertrains do not by themselves change the factory wheel torque; the wheel/fastener application controls.",
    "A compact spare may have separate operating restrictions even when its nuts receive the normal final torque.",
  ],
});

const rav4Oil = oilGuide({
  slug: "toyota/rav4/2-5/oil-capacity",
  keyword: "toyota rav4 oil capacity 2.5",
  make: "Toyota",
  model: "RAV4 2.5L",
  category: "Fluid Capacities",
  title: "Toyota RAV4 2.5L Oil Capacity by Engine and Year",
  metaDescription:
    "Toyota RAV4 2.5 oil capacity chart for A25A-FKS, A25A-FXS hybrid, and earlier 2AR-FE engines, with filter distinction and dipstick procedure.",
  answer:
    "A 2019–2025 RAV4 2.5L gas A25A-FKS commonly takes about 4.8 qt (4.5 L) with filter; the A25A-FXS hybrid is commonly about 4.5 qt (4.3 L). Earlier 2AR-FE applications are commonly about 4.6 qt (4.4 L). Verify the exact manual.",
  detail:
    "Toyota lists approximate drain-and-refill quantities. Gas and hybrid 2.5L engines share displacement but not every service specification.",
  scope:
    "Covers common U.S.-market factory 2.5L RAV4 gas and hybrid engines. Plug-in hybrid, market, production, and replacement-engine differences must be confirmed by VIN.",
  values: [
    {
      label: "2019–2025 A25A-FKS gas",
      value: "4.8 qt (4.5 L)",
      note: "Approximate with filter",
    },
    {
      label: "2019–2025 A25A-FXS hybrid",
      value: "4.5 qt (4.3 L)",
      note: "Approximate with filter; verify year",
    },
    {
      label: "2013–2018 2AR-FE",
      value: "4.6 qt (4.4 L)",
      note: "Approximate with filter",
    },
    {
      label: "Final setting",
      value: "Dipstick full mark",
      note: "Level ground after drain-back",
    },
  ],
  sources: [toyotaRav4],
  identity: "RAV4 2.5L",
  distinctions: [
    "A25A-FKS gasoline and A25A-FXS hybrid engines are related but use different published refill quantities.",
    "Use the Toyota oil viscosity and API/ILSAC requirement for the exact engine and year; hybrid badging alone is not a viscosity specification.",
  ],
});

const camryLug = lugGuide({
  slug: "toyota/camry/lug-nut-torque",
  keyword: "toyota camry lug nut torque spec",
  make: "Toyota",
  model: "Camry",
  category: "Torque Specs",
  title: "Toyota Camry Lug Nut Torque Spec and Star Pattern",
  metaDescription:
    "Toyota Camry lug nut torque is commonly 76 lb-ft (103 N·m). Follow the year scope, five-lug pattern, clean mounting-surface steps, and recheck guide.",
  answer:
    "The factory Toyota Camry wheel-nut torque is commonly 76 lb-ft (103 N·m) for original-equipment wheels. Verify the exact owner manual when wheels, studs, locks, or model-market equipment differ.",
  detail:
    "The Toyota procedure seats the wheel by tightening incrementally across the hub rather than circling the wheel in order.",
  scope:
    "Covers common U.S.-market Camry factory wheels. Performance accessories, aftermarket wheels, spacers, and repaired threads require their own documented value.",
  values: [
    {
      label: "Factory Camry wheels",
      value: "76 lb-ft (103 N·m)",
      note: "Common original-equipment value",
    },
    {
      label: "Pattern",
      value: "Five-lug star",
      note: "Progressive, repeated passes",
    },
    {
      label: "Fastener condition",
      value: "Clean and undamaged",
      note: "Replace distorted nuts or studs",
    },
    {
      label: "Final tool",
      value: "Calibrated torque wrench",
      note: "Impact is not a measuring tool",
    },
  ],
  sources: [toyotaWheel],
  identity: "Toyota Camry",
  distinctions: [
    "Four-cylinder, V6, and hybrid trims commonly share the factory-wheel value, but application and wheel hardware still control.",
    "Do not import a value from a Toyota truck; Tacoma fasteners use a different published torque.",
  ],
});

const tacomaLug = lugGuide({
  slug: "toyota/tacoma/lug-nut-torque",
  keyword: "toyota tacoma lug nut torque spec",
  make: "Toyota",
  model: "Tacoma",
  category: "Torque Specs",
  title: "Toyota Tacoma Lug Nut Torque Spec by Generation",
  metaDescription:
    "Toyota Tacoma lug nut torque is commonly 83 lb-ft (113 N·m/110 N·m in older rounding). See generation notes, six-lug pattern, and safe recheck steps.",
  answer:
    "Most factory-wheel Toyota Tacoma applications specify 83 lb-ft, expressed as about 110–113 N·m depending on manual rounding. Confirm the exact year, wheel, and fastener documentation before tightening.",
  detail:
    "Toyota owner manuals have consistently shown an 83 lb-ft English value for many Tacoma generations, while metric rounding can differ slightly.",
  scope:
    "Covers common U.S.-market Tacoma factory wheels. Two-wheel-drive five-lug legacy models, beadlocks, spacers, and aftermarket wheels require exact application verification.",
  values: [
    {
      label: "Common Tacoma factory wheel",
      value: "83 lb-ft",
      note: "About 110–113 N·m by manual rounding",
    },
    {
      label: "Six-lug pattern",
      value: "Opposite-side sequence",
      note: "Tighten progressively",
    },
    {
      label: "Legacy five-lug/aftermarket",
      value: "Verify exact manual",
      note: "Do not assume six-lug hardware",
    },
    {
      label: "Recheck",
      value: "After wheel disturbance",
      note: "Follow exact manual/wheel instructions",
    },
  ],
  sources: [toyotaTacoma],
  identity: "Toyota Tacoma",
  distinctions: [
    "Tacoma history includes both five- and six-lug configurations, so identify the axle and wheel rather than relying only on the model name.",
    "The English specification is 83 lb-ft in the cited manual; small N·m differences seen online often result from rounding, not a different procedure.",
  ],
});

const crvLug = lugGuide({
  slug: "honda/cr-v/lug-nut-torque",
  keyword: "honda crv lug nut torque spec",
  make: "Honda",
  model: "CR-V",
  category: "Torque Specs",
  title: "Honda CR-V Lug Nut Torque Spec and Tightening Order",
  metaDescription:
    "Honda CR-V lug nut torque is 80 lb-ft (108 N·m) for common factory wheels. See Honda's tightening order, multiple-pass method, and safety checks.",
  answer:
    "Honda specifies 80 lb-ft (108 N·m) for common CR-V original-equipment wheel nuts. Tighten in the illustrated crisscross order, go around two to three times, and verify the exact model-year manual.",
  detail:
    "Honda warns against extra leverage from a pipe or foot and instructs technicians to wipe the mounting surfaces before installation.",
  scope:
    "Covers common U.S.-market CR-V factory wheels and spare installation. Aftermarket wheels, locks, spacers, and nonstandard studs require separate instructions.",
  values: [
    {
      label: "CR-V factory wheel",
      value: "80 lb-ft (108 N·m)",
      note: "Honda owner-manual specification",
    },
    { label: "Pattern", value: "Crisscross/star", note: "Two to three passes" },
    {
      label: "Mounting face",
      value: "Wipe clean",
      note: "Wheel must seat metal-to-metal",
    },
    {
      label: "Final tightening",
      value: "Torque wrench",
      note: "Do not use foot or pipe leverage",
    },
  ],
  sources: [hondaCrv],
  identity: "Honda CR-V",
  distinctions: [
    "Honda's 80 lb-ft figure applies across many CR-V generations with original-equipment wheels, but always verify the exact manual.",
    "AWD hardware does not justify transferring torque values from axle or suspension fasteners to the wheel nuts.",
  ],
});

const civicLug = lugGuide({
  slug: "honda/civic/lug-nut-torque",
  keyword: "honda civic lug nut torque spec",
  make: "Honda",
  model: "Civic",
  category: "Torque Specs",
  title: "Honda Civic Lug Nut Torque Specs and 2025 Manual Exception",
  metaDescription:
    "Honda Civic lug nut torque is commonly 80 lb-ft, but some 2025 manual-transmission hatchbacks specify 94 lb-ft. See the application chart and procedure.",
  answer:
    "Most Honda Civic factory-wheel applications specify 80 lb-ft (108 N·m). Honda's 2025 Civic Hatchback manual lists 94 lb-ft (127 N·m) for manual-transmission models, so verify the exact body style and transmission.",
  detail:
    "The current exception is why a broad Civic search should not be answered with one universal number. Use the manual attached to the VIN/application.",
  scope:
    "Covers common U.S.-market Civic factory wheels. Type R, special performance, manual-transmission, accessory, and aftermarket configurations require exact documentation.",
  values: [
    {
      label: "Most Civic factory wheels",
      value: "80 lb-ft (108 N·m)",
      note: "Common sedan/CVT value",
    },
    {
      label: "2025 Hatchback manual",
      value: "94 lb-ft (127 N·m)",
      note: "Honda owner-manual exception",
    },
    { label: "Pattern", value: "Five-lug star", note: "Progressive passes" },
    {
      label: "Performance/aftermarket",
      value: "Verify application",
      note: "Do not assume 80 lb-ft",
    },
  ],
  sources: [hondaCivicWheel],
  identity: "Honda Civic",
  distinctions: [
    "Honda published different values for 2025 Civic Hatchback CVT and manual-transmission models.",
    "Body style, performance variant, and model year matter more than simply counting five wheel nuts.",
  ],
});

const civicGap = sparkGuide({
  slug: "honda/civic/spark-plug-gap",
  keyword: "honda civic spark plug gap",
  make: "Honda",
  model: "Civic",
  category: "Ignition Specs",
  title: "Honda Civic Spark Plug Gap by Engine and Generation",
  metaDescription:
    "Honda Civic spark plug gap guide: older 1.0–1.1 mm applications, modern pre-gapped fine-wire plugs, OE part-number lookup, inspection, and installation cautions.",
  answer:
    "Many older Honda Civic applications specify about 0.039–0.043 in (1.0–1.1 mm), but modern Civics should be matched by engine and OE plug part number; Honda often lists the plug rather than authorizing a universal field-adjusted gap.",
  detail:
    "For modern fine-wire plugs, an out-of-range or damaged electrode is usually a replacement issue, not a reason to pry aggressively on the ground strap.",
  scope:
    "Covers common U.S.-market Civic gasoline engines. Si, Type R, hybrid, regional, tuned, and engine-swapped vehicles require their exact application data.",
  values: [
    {
      label: "Many older Civics",
      value: "0.039–0.043 in",
      note: "1.0–1.1 mm; verify engine",
    },
    {
      label: "Older nominal listing",
      value: "0.040 in (1.1 mm)",
      note: "Common Honda owner-manual figure",
    },
    {
      label: "2024 1.5L OE plug",
      value: "NGK DILKAR7H11GS",
      note: "Verify VIN and current catalog",
    },
    {
      label: "2024 2.0L OE options",
      value: "OE part-specific",
      note: "Honda lists NGK/Denso applications",
    },
  ],
  sources: [hondaCivicSpecs, hondaOlderSpark],
  identity: "Honda Civic",
  distinctions: [
    "Older manuals publish a service gap, while modern manuals increasingly identify a precise fine-wire plug part number.",
    "The 1.5L turbo, 2.0L naturally aspirated, Si, and Type R are not interchangeable plug applications.",
  ],
});

const silveradoLug = lugGuide({
  slug: "chevrolet/silverado-1500/lug-nut-torque",
  keyword: "chevy silverado lug nut torque spec",
  make: "Chevrolet",
  model: "Silverado 1500",
  category: "Torque Specs",
  title: "Chevy Silverado 1500 Lug Nut Torque Spec",
  metaDescription:
    "Chevy Silverado 1500 lug nut torque is commonly 140 lb-ft (190 N·m). See generation scope, six-lug star pattern, dry-thread rules, and recheck steps.",
  answer:
    "GM lists 140 lb-ft (190 N·m) for common Silverado 1500 original-equipment wheel nuts. Verify the exact year and model, especially for HD, dual-rear-wheel, accessory, or aftermarket combinations.",
  detail:
    "GM warns that incorrect tightening can cause wheel loosening, brake pulsation, and rotor damage. Use a calibrated wrench and crisscross sequence.",
  scope:
    "Covers common U.S.-market Silverado 1500 factory wheels. Silverado HD, dual rear wheels, locks, spacers, and aftermarket wheels require exact model/component instructions.",
  values: [
    {
      label: "Silverado 1500 factory wheel",
      value: "140 lb-ft (190 N·m)",
      note: "Common GM specification",
    },
    {
      label: "Pattern",
      value: "Six-lug crisscross",
      note: "Progressive final passes",
    },
    {
      label: "Threads/seats",
      value: "Clean and dry",
      note: "No oil or grease",
    },
    {
      label: "HD/DRW/aftermarket",
      value: "Verify separately",
      note: "Different hardware may apply",
    },
  ],
  sources: [gm2020, gm2024],
  identity: "Chevrolet Silverado 1500",
  distinctions: [
    "Do not transfer the 1500 specification to a 2500HD/3500HD or dual-wheel configuration without its manual.",
    "GM specifically links uneven or incorrect tightening with brake pulsation and rotor damage.",
  ],
});

const silveradoOil = oilGuide({
  slug: "chevrolet/silverado-1500/5-3/oil-capacity",
  keyword: "chevy silverado oil capacity 5.3",
  make: "Chevrolet",
  model: "Silverado 1500 5.3L",
  category: "Fluid Capacities",
  title: "Chevy Silverado 5.3L Oil Capacity by Year",
  metaDescription:
    "Chevy Silverado 5.3 oil capacity chart: 6 quarts for many 1999–2013 trucks and 8 quarts for 2014+ EcoTec3 applications, with filter and dipstick guidance.",
  answer:
    "Many 1999–2013 Silverado 1500 5.3L engines use about 6.0 qt (5.7 L) with filter, while 2014-and-later EcoTec3 5.3L applications commonly use 8.0 qt (7.6 L). Confirm the engine code, year, pan, and owner manual.",
  detail:
    "The 5.3L badge spans multiple GM small-block generations. L83, L82, L84, LM7, L59, and related engines should not be grouped by displacement alone.",
  scope:
    "Covers common factory gasoline 5.3L engines in U.S.-market Silverado 1500 pickups. Swaps, aftermarket pans, export models, and non-1500 platforms require separate data.",
  values: [
    {
      label: "1999–2013 5.3L",
      value: "6.0 qt (5.7 L)",
      note: "Common with-filter capacity; verify code",
    },
    { label: "2014–2018 L83", value: "8.0 qt (7.6 L)", note: "With filter" },
    {
      label: "2019–2025 L82/L84",
      value: "8.0 qt (7.6 L)",
      note: "With filter in GM owner manuals",
    },
    {
      label: "Final setting",
      value: "Dipstick full mark",
      note: "Approximate capacity only",
    },
  ],
  sources: [gm2020, gm2024],
  identity: "Silverado 5.3L",
  distinctions: [
    "The major capacity change aligns with the 2014 K2XX EcoTec3 generation, not merely a cosmetic model update.",
    "Later 5.3L engines commonly require dexos-approved 0W-20, while earlier generations may specify a different viscosity; follow the exact manual.",
  ],
});

const chevy53Firing = firingGuide({
  slug: "chevrolet/5-3/firing-order",
  keyword: "chevy 5.3 firing order",
  make: "Chevrolet",
  model: "5.3L V8",
  category: "Firing Order",
  title: "Chevy 5.3 Firing Order and Cylinder Numbering",
  metaDescription:
    "Chevy 5.3 firing order 1-8-7-2-6-5-4-3 with LS/EcoTec3 cylinder numbering, bank diagram, coil identification, and misfire troubleshooting steps.",
  answer:
    "The Chevrolet/GM LS-based and EcoTec3 5.3L V8 firing order is 1-8-7-2-6-5-4-3. Cylinders 1-3-5-7 are on the driver-side/left bank and 2-4-6-8 on the passenger-side/right bank, front to rear.",
  detail:
    "These engines use computer-controlled coil-near-plug ignition. The firing order remains mechanical, but there is no distributor-cap terminal sequence to arrange.",
  scope:
    "Covers common Gen III, IV, and V GM 5.3L gasoline V8 engines. It does not cover the traditional Gen I Chevy 350 order or non-GM engine swaps.",
  values: [
    {
      label: "Firing order",
      value: "1-8-7-2-6-5-4-3",
      note: "GM LS/EcoTec3 V8 family",
    },
    { label: "Driver/left bank", value: "1-3-5-7", note: "Front to rear" },
    { label: "Passenger/right bank", value: "2-4-6-8", note: "Front to rear" },
    {
      label: "Ignition",
      value: "Coil-near-plug",
      note: "PCM controlled; no distributor",
    },
  ],
  sources: [gmFiring, gm2020],
  identity: "GM 5.3L LS/EcoTec3",
  distinctions: [
    "The modern 5.3L order differs from the traditional Chevrolet small-block 1-8-4-3-6-5-7-2 sequence.",
    "GM numbers odd cylinders on the left/driver bank and even cylinders on the right/passenger bank, front to rear.",
  ],
});

const ramLug = lugGuide({
  slug: "ram/1500/lug-nut-torque",
  keyword: "ram 1500 lug nut torque spec",
  make: "Ram",
  model: "1500",
  category: "Torque Specs",
  title: "Ram 1500 Lug Nut Torque Spec and Tightening Pattern",
  metaDescription:
    "Ram 1500 lug nut torque is commonly 130 lb-ft (176 N·m) for late-model factory wheels. See DT/DS scope, star pattern, dry threads, and recheck guidance.",
  answer:
    "Late-model Ram 1500 factory-wheel applications commonly specify 130 lb-ft (176 N·m). Confirm the exact DT or DS platform, model year, wheel, and fastener before tightening.",
  detail:
    "Mopar directs users to clean dirt or oil from the fasteners, tighten in a star pattern twice, and recheck after a short driving interval where specified.",
  scope:
    "Covers common U.S.-market Ram 1500 factory wheels. Ram Classic, TRX, heavy-duty, fleet, locks, spacers, and aftermarket wheels require exact documentation.",
  values: [
    {
      label: "Late-model Ram 1500",
      value: "130 lb-ft (176 N·m)",
      note: "Common factory-wheel value",
    },
    {
      label: "Pattern",
      value: "Five- or six-lug star",
      note: "Depends on platform/wheel",
    },
    {
      label: "Fasteners",
      value: "Clean, dry, undamaged",
      note: "Do not oil studs",
    },
    {
      label: "Recheck",
      value: "After short service interval",
      note: "Use exact manual",
    },
  ],
  sources: [ramManual, moparTorque],
  identity: "Ram 1500",
  distinctions: [
    "The newer DT platform and continuing DS Ram 1500 Classic overlap in model years, so platform identification matters.",
    "Do not use a Ram 2500/3500 dual-wheel procedure merely because its torque table looks similar.",
  ],
});

const ramOil = oilGuide({
  slug: "ram/1500/5-7-hemi/oil-capacity",
  keyword: "ram 1500 5.7 hemi oil capacity",
  make: "Ram",
  model: "1500 5.7L HEMI",
  category: "Fluid Capacities",
  title: "Ram 1500 5.7 HEMI Oil Capacity and Refill Guide",
  metaDescription:
    "Ram 1500 5.7 HEMI oil capacity is 7 quarts (6.6 L) with filter for common applications. See viscosity checks, refill workflow, dipstick, and oil-life reset.",
  answer:
    "The Ram 1500 5.7L HEMI oil capacity is commonly 7.0 qt (6.6 L) with filter. Verify the model year, oil specification, viscosity shown by the manual/cap, and final dipstick level.",
  detail:
    "Mopar has published the seven-quart with-filter figure across multiple Ram generations, but oil viscosity and material-standard requirements have evolved.",
  scope:
    "Covers common factory 5.7L HEMI gasoline engines in Ram 1500 pickups. Aftermarket pans, swaps, racing use, and other 5.7L installations require separate documentation.",
  values: [
    {
      label: "5.7L HEMI with filter",
      value: "7.0 qt (6.6 L)",
      note: "Ram owner-handbook capacity",
    },
    {
      label: "Normal service",
      value: "Replace filter",
      note: "Use with-filter capacity",
    },
    {
      label: "Final setting",
      value: "Dipstick full mark",
      note: "Check level on level ground",
    },
    {
      label: "Oil selection",
      value: "Year-specific",
      note: "Follow viscosity and Mopar material standard",
    },
  ],
  sources: [
    ramManual,
    {
      ...ramManual,
      label: "2011 Ram 1500 User Guide — fluids and capacities",
      url: "https://vehicleinfo.mopar.com/assets/publications/en-us/Ram/2011/1500/892.pdf",
    },
  ],
  identity: "Ram 1500 5.7L HEMI",
  distinctions: [
    "The seven-quart capacity is stable across many years, but the required oil specification and viscosity can change.",
    "MDS and eTorque equipment do not remove the need to match the exact oil standard printed for the model year.",
  ],
});

const hemiOrder = firingGuide({
  slug: "dodge/5-7-hemi/firing-order",
  keyword: "dodge 5.7 hemi firing order",
  make: "Dodge",
  model: "5.7L HEMI",
  category: "Firing Order",
  title: "Dodge 5.7 HEMI Firing Order and Cylinder Numbering",
  metaDescription:
    "Dodge/Ram 5.7 HEMI firing order 1-8-4-3-6-5-7-2 with cylinder-bank numbering, dual-plug notes, coil identification, and misfire checks.",
  answer:
    "The Gen III 5.7L HEMI firing order is 1-8-4-3-6-5-7-2. Cylinders 1-3-5-7 are on the left/driver bank and 2-4-6-8 on the right/passenger bank, front to rear.",
  detail:
    "The 5.7 HEMI uses two spark plugs per cylinder on many applications. Both plugs belong to the same cylinder event; the engine still has an eight-cylinder firing order.",
  scope:
    "Covers common Gen III 5.7L HEMI vehicle engines. Earlier classic HEMI families, crate-engine controllers, swaps, and custom ignition systems require their own documentation.",
  values: [
    {
      label: "Firing order",
      value: "1-8-4-3-6-5-7-2",
      note: "Gen III 5.7L HEMI",
    },
    { label: "Driver/left bank", value: "1-3-5-7", note: "Front to rear" },
    { label: "Passenger/right bank", value: "2-4-6-8", note: "Front to rear" },
    {
      label: "Spark plugs",
      value: "Two per cylinder",
      note: "Common 5.7L HEMI design",
    },
  ],
  sources: [hemiFiring, ramManual],
  identity: "Gen III 5.7L HEMI",
  distinctions: [
    "Do not substitute the GM LS 1-8-7-2-6-5-4-3 order or infer an order from cylinder-deactivation numbering.",
    "Cylinder numbering uses odd cylinders on the driver/left bank and even cylinders on the passenger/right bank.",
  ],
});

const sierraLug = lugGuide({
  slug: "gmc/sierra-1500/lug-nut-torque",
  keyword: "gmc sierra lug nut torque spec",
  make: "GMC",
  model: "Sierra 1500",
  category: "Torque Specs",
  title: "GMC Sierra 1500 Lug Nut Torque Spec",
  metaDescription:
    "GMC Sierra 1500 lug nut torque is commonly 140 lb-ft (190 N·m). See generation scope, six-lug crisscross pattern, mounting-surface prep, and recheck.",
  answer:
    "GM lists 140 lb-ft (190 N·m) for common Sierra 1500 original-equipment wheel nuts. Verify the exact model year and do not assume that 2500HD, 3500HD, dual-wheel, or aftermarket hardware is identical.",
  detail:
    "Sierra and Silverado share many chassis specifications, but the article keeps GMC application labeling and directs the reader to the exact GMC owner manual.",
  scope:
    "Covers common U.S.-market GMC Sierra 1500 factory wheels. HD, dual-rear-wheel, accessory, locking, spacer, and aftermarket combinations require their own instructions.",
  values: [
    {
      label: "Sierra 1500 factory wheel",
      value: "140 lb-ft (190 N·m)",
      note: "Common GM specification",
    },
    {
      label: "Pattern",
      value: "Six-lug crisscross",
      note: "Tighten in progressive passes",
    },
    {
      label: "Threads/seats",
      value: "Clean and dry",
      note: "No oil or grease",
    },
    {
      label: "HD/DRW/aftermarket",
      value: "Verify separately",
      note: "Hardware and procedure may differ",
    },
  ],
  sources: [gmSierra2020, gm2024],
  identity: "GMC Sierra 1500",
  distinctions: [
    "A Sierra 1500 value should not be applied to Sierra HD or dual-rear-wheel hardware without checking the exact manual.",
    "Accessory locking nuts can carry instructions from their manufacturer that must be followed with the factory-wheel procedure.",
  ],
});

const sierraOil = oilGuide({
  slug: "gmc/sierra-1500/5-3/oil-capacity",
  keyword: "gmc sierra 5.3 oil capacity",
  make: "GMC",
  model: "Sierra 1500 5.3L",
  category: "Fluid Capacities",
  title: "GMC Sierra 5.3L Oil Capacity by Year",
  metaDescription:
    "GMC Sierra 5.3 oil capacity chart: common 6-quart 1999–2013 and 8-quart 2014+ applications, engine-code identification, filter, and dipstick steps.",
  answer:
    "Many 1999–2013 GMC Sierra 1500 5.3L engines use about 6.0 qt (5.7 L) with filter; 2014-and-later EcoTec3 5.3L applications commonly use 8.0 qt (7.6 L). Verify the VIN/engine code and manual.",
  detail:
    "The GMC 5.3L name spans multiple GM engine generations. Displacement alone cannot identify the oil pan, viscosity, or refill capacity.",
  scope:
    "Covers common factory gasoline 5.3L engines in U.S.-market Sierra 1500 pickups. Swaps, aftermarket pans, export models, and other GM platforms require separate data.",
  values: [
    {
      label: "1999–2013 5.3L",
      value: "6.0 qt (5.7 L)",
      note: "Common with-filter capacity",
    },
    { label: "2014–2018 L83", value: "8.0 qt (7.6 L)", note: "With filter" },
    {
      label: "2019–2025 L82/L84",
      value: "8.0 qt (7.6 L)",
      note: "With filter",
    },
    {
      label: "Final setting",
      value: "Dipstick full mark",
      note: "Confirm after drain-back",
    },
  ],
  sources: [gmSierra2020, gm2024],
  identity: "Sierra 5.3L",
  distinctions: [
    "The 2014 platform/engine-generation change is the key dividing line in the common capacity chart.",
    "Use the dexos approval and viscosity for the exact model year; earlier and later 5.3L engines are not interchangeable service applications.",
  ],
});

const wranglerLug = lugGuide({
  slug: "jeep/wrangler/lug-nut-torque",
  keyword: "jeep wrangler lug nut torque spec",
  make: "Jeep",
  model: "Wrangler",
  category: "Torque Specs",
  title: "Jeep Wrangler Lug Nut Torque: JL vs. JK",
  metaDescription:
    "Jeep Wrangler lug nut torque chart: commonly 130 lb-ft for JL and 95 lb-ft for JK factory wheels, with 2018 platform identification, pattern, and recheck.",
  answer:
    "A JL-platform Wrangler (2018–present) commonly specifies 130 lb-ft (176 N·m), while a JK-platform Wrangler (2007–2018) commonly specifies 95 lb-ft (129 N·m). Because both platforms were sold as 2018 models, identify the platform before tightening.",
  detail:
    "The large JL-versus-JK difference makes a generation-free answer unsafe. Aftermarket off-road wheels, beadlock rings, spacers, and conversion studs have separate instructions.",
  scope:
    "Covers common U.S.-market factory wheels on JK and JL Wranglers. TJ/YJ, 4xe details, beadlocks, wheel spacers, and aftermarket fasteners require exact documentation.",
  values: [
    {
      label: "JL (2018–present)",
      value: "130 lb-ft (176 N·m)",
      note: "Common M14 factory-wheel value",
    },
    {
      label: "JK (2007–2018)",
      value: "95 lb-ft (129 N·m)",
      note: "Common 1/2-20 factory-wheel value",
    },
    {
      label: "2018 model year",
      value: "Identify JK or JL",
      note: "Both platforms exist",
    },
    {
      label: "Beadlock/spacer/aftermarket",
      value: "Component-specific",
      note: "Separate hardware torque applies",
    },
  ],
  sources: [jeepManual, moparTorque],
  identity: "Jeep Wrangler",
  distinctions: [
    "The 2018 model year includes both outgoing JK and new JL vehicles; grille, VIN, door label, and fastener size help identify the platform.",
    "A beadlock ring's small bolts use a separate sequence and torque from the wheel-to-hub lug nuts.",
  ],
});

export const extendedSpecs: SpecRecord[] = [
  fordF150Lug,
  fordF150Oil,
  ford302,
  ford351,
  fordEcoBoostGap,
  rav4Lug,
  rav4Oil,
  camryLug,
  tacomaLug,
  crvLug,
  civicLug,
  civicGap,
  silveradoLug,
  silveradoOil,
  chevy53Firing,
  ramLug,
  ramOil,
  hemiOrder,
  sierraLug,
  sierraOil,
  wranglerLug,
];
