import type { Diagram, Source, SpecRecord, SpecValue } from "./chevy350-content";

const source = (label: string, url: string, note: string): Source => ({ label, url, note });

const chevrolet350Ho = source(
  "Chevrolet Performance 350 HO Deluxe engine guide",
  "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/performance/resources/installation-guides/crate-engines/02-pdf/350-ho-deluxe-engine-12487544.pdf",
  "Chevrolet identifies the current 350 HO's straight-plug cast-iron heads, warns that manifold/header clearance is installation-specific and directs builders to the application service manual.",
);
const chevroletL31Exhaust = source(
  "1998 Chevrolet K1500 L31 5.7L exhaust-manifold service specification",
  "https://charm.li/Chevrolet/1998/K%201500%20Truck%204WD%20V8-5.7L%20VIN%20R/Repair%20and%20Diagnosis/Engine%2C%20Cooling%20and%20Exhaust/Engine/Cylinder%20Head%20Assembly/Specifications/Exhaust%20Manifold%20Torque%20%26%20Sequence/",
  "The application-specific GM service record specifies a first pass of 15 N-m (11 lb-ft) and a final pass of 30 N-m (22 lb-ft) for the L31 exhaust-manifold bolts.",
);
const hookerGen1FBodyHeaders = source(
  "Hooker BlackHeart 1975-1981 GM F-body small-block header instructions",
  "https://documents.holley.com/df15c955cea5db9749a4d79034b38d1372a47ad6.pdf",
  "Holley's application sheet documents six supplied header bolts per bank, 25-30 lb-ft, gasket inspection and the surrounding steering, dipstick, plug and exhaust-system work for its named product.",
);
const flowmasterEvenHeaderTightening = source(
  "Flowmaster header installation and flange-tightening guidance",
  "https://documents.holley.com/814115.pdf",
  "The component maker directs installers to start inside the flange and work outward, alternating to draw the flange evenly, while noting that the exact sequence varies by flange.",
);

const fordZHead = source(
  "Ford Performance M-6049-Z2 small-block cylinder-head instructions",
  "https://performanceparts.ford.com/download/instructionsheets/FordInstShtM-6049-Z2.pdf",
  "Ford specifies 35 lb-ft for a header/exhaust manifold installed on this named aluminum 302/351 cylinder head and identifies the required gasket family.",
);
const ford1995E150Exhaust = source(
  "1995 Ford E-150 5.0L exhaust-manifold service procedure",
  "https://charm.li/Ford/1995/E%20150%20Van%20V8-302%205.0L/Repair%20and%20Diagnosis/Engine%2C%20Cooling%20and%20Exhaust/Exhaust%20System/Exhaust%20Manifold/Service%20and%20Repair/",
  "The application record specifies 18-24 lb-ft and a center-bolts-outward order for the production 302 manifold.",
);
const ford1998ExplorerExhaust = source(
  "1998 Ford Explorer 5.0L exhaust-manifold specification",
  "https://charm.li/Ford/1998/Explorer%204WD%20V8-302%205.0L%20VIN%20P%20EFI/Repair%20and%20Diagnosis/Specifications/Mechanical%20Specifications/Exhaust%20System/Exhaust%20Manifold/",
  "Ford's application-specific record lists 35-44 N-m (26-32 lb-ft) and calls for two steps in sequence, demonstrating that 302 values vary by vehicle hardware.",
);
const ford1993MustangExhaust = source(
  "1993 Ford Mustang 5.0L HO torque specifications",
  "https://charm.li/Ford/1993/Mustang%20V8-302%205.0L%20HO/Repair%20and%20Diagnosis/Engine%2C%20Cooling%20and%20Exhaust/Engine/Specifications/Torque%20Specifications/",
  "The Mustang service record lists 24-32 lb-ft for the production exhaust-manifold-to-head bolts and a hot retorque note for the cited assembly.",
);

const gmGen3ExhaustTsb = source(
  "GM Bulletin 06-06-01-026 - Gen III exhaust-manifold bolts",
  "https://charm.li/Chevrolet/1999/Camaro%20V8-5.7L%20VIN%20G/Repair%20and%20Diagnosis/Engine%2C%20Cooling%20and%20Exhaust/Exhaust%20System/Technical%20Service%20Bulletins/Engine%20-%20New%20Exhaust%20Manifold%20Bolts%2FTorque%20Specs/",
  "GM requires replacement bolts and high-temperature high-strength threadlocker, then a 10 N-m first pass and 20 N-m final pass beginning with the two center bolts and alternating outward on covered Gen III engines.",
);
const gmGen3Applications = source(
  "GM Gen III small-block exhaust service application list",
  "https://charm.li/Chevrolet/1999/Camaro%20V8-5.7L%20VIN%20G/Repair%20and%20Diagnosis/Engine%2C%20Cooling%20and%20Exhaust/Exhaust%20System/Technical%20Service%20Bulletins/Engine%20-%20New%20Exhaust%20Manifold%20Bolts%2FTorque%20Specs/",
  "The bulletin identifies LR4, LM4, LM7, L59, LQ4, LQ9, LS1 and LS6 applications and limits the updated-bolt procedure to the covered Gen III service population.",
);

const ram2013HemiExhaust = source(
  "2013 Ram 1500 5.7L HEMI exhaust-manifold procedure",
  "https://charm.li/Dodge%20and%20Ram/2013/RAM%201500%20Truck%204WD%20V8-5.7L/Repair%20and%20Diagnosis/Specifications/Mechanical%20Specifications/Exhaust%20System/Exhaust%20Manifold/",
  "The Ram service procedure specifies 25 N-m (18 lb-ft), a second pass in sequence and side-specific stainless fastener locations that must return to their original positions.",
);
const dodge2011HemiExhaust = source(
  "2011 Dodge Charger 5.7L HEMI exhaust-manifold installation",
  "https://charm.li/Dodge%20and%20Ram/2011/Charger%20V8-5.7L/Repair%20and%20Diagnosis/Engine%2C%20Cooling%20and%20Exhaust/Exhaust%20System/Exhaust%20Manifold/Service%20and%20Repair/Removal%20and%20Replacement/Exhaust%20Manifold%20-%20Installation/",
  "The car application requires clean sealing surfaces, a new gasket, all fasteners started and 25 N-m (18 lb-ft) tightening in the side-specific sequence.",
);
const bdHemiExhaust = source(
  "BD Diesel 2009-2024 5.7L HEMI exhaust-manifold instructions",
  "https://www.partsgeek.com/assets/products/full/6JMWB5YP.pdf",
  "The current component instructions specify 25 N-m (18 lb-ft), center-out crisscross tightening and explicitly distinguish early nine-hole from later ten-hole production layouts.",
);

type ExhaustConfig = {
  slug: string;
  keyword: string;
  make: string;
  model: string;
  title: string;
  metaDescription: string;
  answer: string;
  detail: string;
  scope: string;
  values: SpecValue[];
  diagram: Diagram;
  applicationNotes: string[];
  hardwareNotes: string[];
  sourceNotes: string[];
  customFaqs: { q: string; a: string }[];
  sources: Source[];
};

const commonPositions = (labels: string[]) => labels.map((label, index) => ({
  label,
  x: 8 + index * (84 / Math.max(1, labels.length - 1)),
  y: 50,
}));

function buildExhaustPage(config: ExhaustConfig): SpecRecord {
  const valueSummary = config.values.map((value) => `${value.label}: ${value.value}`).join("; ");
  return {
    slug: config.slug,
    keyword: config.keyword,
    make: config.make,
    model: config.model,
    category: "Bolt Torque Sequences",
    title: config.title,
    metaDescription: config.metaDescription,
    answer: config.answer,
    detail: config.detail,
    scope: config.scope,
    indexReady: false,
    values: config.values,
    diagram: config.diagram,
    intro: [
      `${config.model} exhaust hardware cannot be reduced to one internet torque number. Cast-iron production manifolds, tubular headers, replacement cylinder heads and revised service bolts can share the same engine family while using different flange thickness, washers, coatings and gasket compression. The reliable process begins by identifying the exact vehicle and installed parts, then selecting one complete instruction branch.`,
      config.applicationNotes[0],
      `The interactive diagram is a clamping-order aid, not permission to merge specifications. Its purpose is to distribute load from the center of a matching flange toward the ends. The documented comparison values on this page are ${valueSummary}. Use only the row supported by the vehicle service information or the instructions supplied with the manifold, header, gasket and cylinder head.`,
    ],
    steps: [
      `Record the vehicle year, platform, engine code and cylinder-head identification. Photograph the installed ${config.model} manifold or header and record its part number before ordering gaskets or bolts.`,
      "Work only on a cold exhaust system. Disconnect the negative battery cable, support the vehicle at approved lifting points and use eye protection; rust, penetrating fluid and broken fasteners create hazards above and below the engine.",
      "Label oxygen-sensor connectors, heat shields, dipstick brackets, EGR/AIR tubes and plug-wire or coil locations. Support the front pipe or converter so its weight cannot pull on the manifold flange or oxygen-sensor wiring.",
      "Loosen the head fasteners progressively from the ends toward the center. A stuck or corroded bolt should be treated with the application-appropriate extraction method; forcing it sideways risks breaking it below the cylinder-head surface.",
      "Remove the manifold and gasket, then protect every exhaust port. Clean the sealing faces without gouging aluminum or cast iron, chase only repairable threads and inspect the flange with a straightedge for warpage, cracks and eroded sealing beads.",
      "Match the new gasket to the ports, bolt holes and marked orientation. Keep the gasket dry unless the component manufacturer explicitly specifies a coating; generic silicone at an exhaust port can burn, contaminate sensors or prevent even seating.",
      "Return special studs, stainless bolts, spacers, tie bars, washers and brackets to their documented locations. Hand-start every head fastener several turns and leave the outlet connection loose enough that the manifold can seat without exhaust-system side load.",
      "Snug the matching flange from its center toward the ends. Follow the interactive order only when the physical fastener count and source branch match; otherwise use the side-specific factory or component diagram supplied for the exact part.",
      "Make the specified passes with a calibrated low-range torque wrench. Do not add threadlocker, anti-seize or oil unless the selected procedure includes it because thread friction changes bolt stretch at the same wrench reading.",
      "Align and tighten the outlet joint and supports only after the head flange is seated. Reconnect sensors and shields, start the cold engine, listen for a sharp tick and inspect for escaping gas; perform any heat-cycle recheck only if the selected instructions require it.",
    ],
    sections: [
      {
        heading: "Choosing the correct torque branch",
        paragraphs: config.applicationNotes,
      },
      {
        heading: "How to use the sequence diagram",
        paragraphs: [
          `The numbered map represents tightening order. On a matching six-fastener flange, the physical labels read ${config.diagram.positions?.map((position) => position.label).join("-") ?? "use the side-specific source diagram"} from one end to the other, so numerical tightening begins in the center and expands outward. This minimizes bending while the gasket is compressed.`,
          "Use the same order for each specified pass. Mark a completed position with a paint pen or worksheet rather than relying on memory, especially when steering, frame or accessory clearance forces several extensions and wrench angles.",
        ],
      },
      {
        heading: "Fasteners, gaskets and friction condition",
        paragraphs: config.hardwareNotes,
      },
      {
        heading: "What the cited sources actually establish",
        paragraphs: config.sourceNotes,
      },
      {
        heading: "Diagnosing an exhaust leak after installation",
        bullets: [
          "A cold-start tick that fades as parts expand commonly points to a head-flange or cracked-manifold leak.",
          "Black soot at one port identifies escaping gas but does not prove the bolt needs more torque; inspect flatness and the gasket.",
          "A leak at the outlet flange can sound like a head leak, especially when the front pipe is pulling sideways.",
          "A broken end bolt often accompanies a warped production manifold; replacing only the bolt can lead to another failure.",
          "An oxygen-sensor fault after service may come from a disconnected harness, damaged wire or upstream air entering through a leak.",
          "Do not search for a leak by touching a running manifold or by spraying flammable liquid on hot exhaust parts.",
        ],
      },
      {
        heading: `${config.model} exhaust-manifold checklist`,
        bullets: [
          "Year, platform, engine code and head material confirmed",
          "Production manifold versus aftermarket header identified",
          "Part number and fastener count matched to instructions",
          "Engine and exhaust system completely cold",
          "Vehicle and front pipe safely supported",
          "Sensors, tubes, brackets and shields labeled",
          "Broken bolts and damaged threads repaired correctly",
          "Head and flange checked for cracks and warpage",
          "Correct new gasket fitted in the marked orientation",
          "Special studs, washers, spacers and tie bars returned to position",
          "Every fastener hand-started",
          "Center-out passes completed without mixing torque branches",
          "Outlet joint aligned before final tightening",
          "Cold-start leak check completed",
          "Required heat-cycle recheck recorded",
        ],
      },
    ],
    faqs: [
      ...config.customFaqs,
      { q: "Should exhaust-manifold bolts be tightened from the center outward?", a: "That is the documented direction for the center-out branches on this page. Use the exact side-specific figure when the service manual numbers individual positions or the flange has more than the illustrated six fasteners." },
      { q: "Can I use the stock manifold torque on headers?", a: "Not automatically. Header flange thickness, bolt/washer design, gasket and cylinder-head material can require a different value and recheck schedule. Follow the header manufacturer's instructions." },
      { q: "Should I put anti-seize on the bolts?", a: "Only when the selected instruction specifies it. Anti-seize changes friction and can increase clamp load at the same torque. GM's cited updated-bolt procedure instead specifies a particular high-temperature high-strength threadlocker." },
      { q: "Why did an end bolt break?", a: "Thermal movement, a warped manifold, outlet-pipe stress, corrosion, incorrect hardware or uneven tightening can overload an end fastener. Inspect the complete joint rather than replacing the bolt alone." },
      { q: "Do exhaust-manifold bolts need retorquing after a heat cycle?", a: "Only if the vehicle, head, header or gasket instructions call for it. Some Ford and aftermarket procedures do; other production procedures specify a completed cold two-pass installation without an added hot check." },
    ],
    sources: config.sources,
    reviewed: "2026-08-21",
    featureImage: "/features/shared-firing-engine.png",
    featureOverlay: true,
  };
}

const chevy350: ExhaustConfig = {
  slug: "chevrolet/350/exhaust-manifold-torque-sequence",
  keyword: "chevy 350 exhaust manifold torque sequence diagram",
  make: "Chevrolet",
  model: "Chevy 350 Gen I / L31",
  title: "Chevy 350 Exhaust Manifold Torque Sequence Diagram",
  metaDescription: "Chevy 350 exhaust-manifold center-out sequence with L31 11/22 lb-ft passes, Hooker header branch, gasket preparation and application limits.",
  answer: "For the cited 1998 Chevrolet K1500 L31 5.7L production manifold, tighten the six fasteners on each bank from the center pair outward: with one bank drawn left to right, the physical order is 5-3-1-2-4-6. Make a first pass at 15 N-m (11 lb-ft) and a final pass at 30 N-m (22 lb-ft). Do not treat that as a universal 350 value. Hooker's cited 1975-1981 F-body small-block headers use six supplied bolts per bank and specify 25-30 lb-ft for that product, while replacement heads and other headers can publish another value.",
  detail: "The L31 Vortec 350 service branch and a traditional earlier Gen I 350 may share six exhaust positions per bank, but head material, bolt style, manifold/header flange and gasket determine the final clamp rule. The diagram is a center-out map; the selected source determines passes, lubricant/thread treatment and any recheck.",
  scope: "The numeric 11/22 lb-ft branch directly covers the cited 1998 K1500 L31 VIN R application. The 25-30 lb-ft branch covers the named Hooker 1975-1981 F-body header system. It does not automatically cover every pre-1987 350, LT1, LS-family 5.7L, marine head, aluminum aftermarket head or header kit.",
  values: [
    { label: "1998 L31 first pass", value: "15 N-m / 11 lb-ft", note: "Six-fastener production manifold" },
    { label: "1998 L31 final pass", value: "30 N-m / 22 lb-ft", note: "Repeat same center-out order" },
    { label: "Hooker 1975-81 F-body", value: "25-30 lb-ft", note: "Supplied six-bolt header branch only" },
    { label: "Typical bank count", value: "6 fasteners", note: "Verify the installed head and flange" },
  ],
  diagram: {
    type: "exhaust",
    title: "Interactive Chevy 350 six-fastener center-out map",
    caption: "One bank, viewed from the exhaust side. Physical labels read 5-3-1-2-4-6 from end to end; tighten numerically 1 through 6. Use the torque branch for the exact vehicle or header.",
    points: ["1", "2", "3", "4", "5", "6"],
    positions: commonPositions(["5", "3", "1", "2", "4", "6"]),
    orientation: "ONE CYLINDER HEAD - MATCH FRONT/REAR TO THE VEHICLE MANUAL",
  },
  applicationNotes: [
    "GM's L31 service record gives a two-pass 11/22 lb-ft procedure for the 1998 K1500 VIN R. That is a late Vortec Gen I truck application, not proof that every Chevrolet 350 used those same bolts or gasket.",
    "The Hooker F-body sheet uses six supplied bolts on each bank and 25-30 lb-ft. That higher product-specific range belongs to its header flange and hardware. Chevrolet's 350 HO guide also warns installers to verify straight-plug clearance and use application service information.",
  ],
  hardwareNotes: [
    "A factory cast-iron manifold, thin tubular header and thick laser-cut header flange react differently as they heat. Inspect the flange against a straightedge and confirm that the gasket's sealing bead surrounds every port without hanging into the gas path.",
    "Accessory brackets and dipstick supports may share exhaust fasteners. Their thickness changes available thread engagement, so return each bracket to its original position and use the bolt length supplied or specified for that location.",
  ],
  sourceNotes: [
    "The L31 record establishes the two torque passes. Flowmaster's flange guidance supports the general inside-out load path but explicitly says the exact sequence varies by flange. The diagram therefore shows a conventional six-position center-out controller rather than claiming one vintage drawing fits every 350.",
    "Hooker's sheet establishes only its named header branch. If a different brand supplies locking bolts, special washers or a lower torque for aluminum heads, that instruction supersedes the Hooker value.",
  ],
  customFaqs: [
    { q: "What is the 1998 Chevy 350 L31 exhaust-manifold torque?", a: "For the cited K1500 VIN R, use 15 N-m (11 lb-ft) first and 30 N-m (22 lb-ft) final in sequence." },
    { q: "What is the six-bolt Chevy 350 exhaust sequence?", a: "For the center-out controller, physical positions read 5-3-1-2-4-6 from one end of the bank to the other, and tightening proceeds numerically 1 through 6." },
    { q: "Are header bolts also 22 lb-ft?", a: "Not necessarily. The cited Hooker 1975-1981 F-body kit specifies 25-30 lb-ft with its supplied six-bolt hardware." },
  ],
  sources: [chevrolet350Ho, chevroletL31Exhaust, hookerGen1FBodyHeaders, flowmasterEvenHeaderTightening],
};

const ford302: ExhaustConfig = {
  slug: "ford/302/exhaust-manifold-torque-sequence",
  keyword: "ford 302 exhaust manifold bolt pattern diagram",
  make: "Ford",
  model: "Ford 302 / 5.0L Windsor",
  title: "Ford 302 Exhaust Manifold Bolt Pattern and Torque Sequence",
  metaDescription: "Ford 302 exhaust-manifold center-out pattern with E-150, Explorer, Mustang and Ford Performance aluminum-head torque branches.",
  answer: "Ford service information directs 302 exhaust-manifold tightening from the center bolts outward. On a matching six-fastener flange, use the physical map 5-3-1-2-4-6 and tighten numerically 1 through 6 in stages. The final value depends on the application: the cited 1995 E-150 5.0L uses 18-24 lb-ft, the 1998 Explorer 5.0L lists 26-32 lb-ft in two steps, the 1993 Mustang HO lists 24-32 lb-ft, and Ford Performance's M-6049-Z2 aluminum head specifies 35 lb-ft with its named gasket/hardware.",
  detail: "Those values are not interchangeable tolerances. They represent different vehicle manifolds, fasteners, head materials and service instructions. Select the exact branch first, then use the center-out diagram only when the physical flange matches.",
  scope: "Covers the center-out direction documented for production Ford 255/302/351W manifolds and compares named 302/5.0L applications. It does not automatically cover Coyote 5.0L, Cleveland heads, GT40P header-clearance changes, aftermarket stud kits or a cylinder head with its own published torque.",
  values: [
    { label: "1995 E-150 5.0L", value: "18-24 lb-ft", note: "Center bolts outward" },
    { label: "1998 Explorer 5.0L", value: "26-32 lb-ft", note: "Two steps in sequence" },
    { label: "1993 Mustang 5.0L HO", value: "24-32 lb-ft", note: "Cited production branch" },
    { label: "Ford M-6049-Z2 head", value: "35 lb-ft", note: "Named aluminum head and gasket" },
  ],
  diagram: {
    type: "exhaust",
    title: "Interactive Ford 302 six-fastener center-out pattern",
    caption: "One matching bank: physical labels 5-3-1-2-4-6, tightened numerically from the center outward. Select the vehicle/head torque branch before starting.",
    points: ["1", "2", "3", "4", "5", "6"],
    positions: commonPositions(["5", "3", "1", "2", "4", "6"]),
    orientation: "ONE 302/5.0L BANK - VERIFY GT40P AND AFTERMARKET CLEARANCE",
  },
  applicationNotes: [
    "Ford's 1995 E-150 procedure says to tighten 18-24 lb-ft from the center bolts outward. The 1998 Explorer uses a higher 26-32 lb-ft two-step specification, while the 1993 Mustang table lists 24-32 lb-ft and a hot-retorque note for the cited assembly.",
    "Ford Performance's Z2 aluminum small-block head publishes 35 lb-ft for the header/exhaust manifold and names the gasket family. That component instruction belongs to the Z2 head; it should not be transferred to an original iron head solely because both engines are called 302.",
  ],
  hardwareNotes: [
    "GT40P heads angle the spark plugs differently from many earlier 302 heads, so a header can contact plug boots or block tool access even when its flange bolts up. Confirm plug, steering and accessory clearance before tightening the flange.",
    "Ford production applications can mix bolts, studs, heat shields and accessory brackets. Preserve their locations and compare the manifold's flatness; pulling a warped iron casting flat with higher torque is a common route to broken ears or stripped threads.",
  ],
  sourceNotes: [
    "The sources agree on the load direction but not one final number. That is useful evidence: the center-out pattern is a shared installation principle, whereas the torque is an application-controlled specification.",
    "A Ford Performance crate head, a 1995 van and a 1998 Explorer are separate branches. The page presents them together so a reader can identify the right branch instead of silently averaging the values.",
  ],
  customFaqs: [
    { q: "What is the Ford 302 exhaust-manifold tightening pattern?", a: "Ford service procedures direct tightening from the center bolts outward. On a matching six-fastener flange, physical labels are 5-3-1-2-4-6 and the tightening order is 1 through 6." },
    { q: "Why does an Explorer 5.0L use a different value than an E-150?", a: "The manifold, fasteners, gasket, brackets and service calibration differ. Use the exact vehicle's value rather than treating 302 as the complete application." },
    { q: "Is 35 lb-ft correct for every aluminum Ford 302 head?", a: "No. It is the cited value for Ford Performance M-6049-Z2. Other aluminum heads can publish different hardware, lubricant and torque." },
  ],
  sources: [fordZHead, ford1995E150Exhaust, ford1998ExplorerExhaust, ford1993MustangExhaust],
};

const chevy53: ExhaustConfig = {
  slug: "chevrolet/5-3/exhaust-manifold-torque-sequence",
  keyword: "chevy 5.3 exhaust manifold torque sequence diagram",
  make: "Chevrolet / GMC",
  model: "GM Gen III 5.3L Vortec",
  title: "Chevy 5.3 Exhaust Manifold Torque Sequence Diagram",
  metaDescription: "GM Gen III 5.3 exhaust-manifold updated-bolt sequence: center pair outward, 10 and 20 N-m passes, threadlocker and application limits.",
  answer: "For the Gen III 5.3L applications covered by GM Bulletin 06-06-01-026, replace the exhaust-manifold bolts, apply the specified GM high-temperature high-strength threadlocker in a 5 mm-wide bead, then tighten each six-fastener bank from the center pair outward. With one bank shown left to right, the physical positions are 5-3-1-2-4-6. Tighten all bolts to 10 N-m (89 in-lb), then repeat the same sequence at 20 N-m (15 lb-ft). This updated-bolt branch is not a universal specification for every Gen IV/V 5.3L.",
  detail: "The GM bulletin covers named 1999-2003 Gen III service applications and directs replacement bolts when servicing their exhaust manifolds. Later engines, revised heads, broken-bolt repair kits and aftermarket headers must use their own service information.",
  scope: "Directly covers the updated service-bolt procedure in GM Bulletin 06-06-01-026 for listed Gen III LR4/LM4/LM7/L59 and related small-block applications. It does not automatically cover 2004-and-later production bolts, AFM Gen IV 5.3L, Gen V L83/L84, cylinder-deactivation hardware changes or aftermarket headers.",
  values: [
    { label: "First pass", value: "10 N-m / 89 in-lb", note: "Updated GM service bolts" },
    { label: "Final pass", value: "20 N-m / 15 lb-ft", note: "Repeat center-out sequence" },
    { label: "Thread treatment", value: "GM high-temp high-strength threadlocker", note: "5 mm bead per bulletin" },
    { label: "Service hardware", value: "Replace bolts", note: "GM P/N 11518860 in cited bulletin" },
  ],
  diagram: {
    type: "exhaust",
    title: "Interactive GM Gen III six-bolt exhaust sequence",
    caption: "One six-fastener bank. Physical labels read 5-3-1-2-4-6; tighten numerically 1 through 6 at 10 N-m, then repeat at 20 N-m for the covered updated-bolt branch.",
    points: ["1", "2", "3", "4", "5", "6"],
    positions: commonPositions(["5", "3", "1", "2", "4", "6"]),
    orientation: "ONE GEN III BANK - ENGINE FRONT DEPENDS ON VIEWING SIDE",
  },
  applicationNotes: [
    "GM issued the updated-bolt bulletin for 1999-2003 vehicles with listed Gen III engines, including LR4, LM4, LM7 and L59 5.3L variants. It also covers related 4.8, 5.7 and 6.0 engines, but it is not a blanket instruction for later small blocks.",
    "The bulletin is unusually specific about both hardware and friction condition: replace the bolts and apply the named high-temperature high-strength threadlocker before making 10 and 20 N-m passes. Reusing old bolts dry or substituting anti-seize changes the documented joint.",
  ],
  hardwareNotes: [
    "Broken end bolts are common enough that cylinder-head thread condition and manifold flatness deserve inspection before assembly. Extract a broken bolt without drilling off-center into the aluminum head, and repair damaged threads only by an approved method that preserves fastener depth and alignment.",
    "Do not let the converter or front pipe hang from the manifold. Align its supports and flange after the head joint seats so exhaust-system weight cannot preload the end bolts during heat cycling.",
  ],
  sourceNotes: [
    "GM states the sequence in words: tighten the two center bolts first, then alternate from side to side while working outward. The diagram translates that instruction into the six-position 5-3-1-2-4-6 physical map.",
    "The source also marks a production change beginning in 2004. That is why the page keeps the bulletin branch clearly limited and directs later engines to VIN-specific service information instead of extending the values by resemblance.",
  ],
  customFaqs: [
    { q: "What is the GM Gen III 5.3 exhaust-manifold torque?", a: "For the covered updated-bolt service procedure, tighten to 10 N-m (89 in-lb), then 20 N-m (15 lb-ft) in the same center-out sequence." },
    { q: "What is the Chevy 5.3 six-bolt sequence?", a: "The two center bolts are positions 1 and 2. Working outward produces physical labels 5-3-1-2-4-6 from one end of the bank to the other." },
    { q: "Do the 5.3 exhaust bolts need threadlocker?", a: "The cited GM bulletin specifies a 5 mm bead of GM high-temperature high-strength threadlocker on replacement P/N 11518860 bolts." },
  ],
  sources: [gmGen3ExhaustTsb, gmGen3Applications],
};

const hemi57: ExhaustConfig = {
  slug: "dodge/5-7-hemi/exhaust-manifold-torque-sequence",
  keyword: "dodge 5.7 hemi exhaust manifold torque diagram",
  make: "Dodge / Ram / Chrysler",
  model: "Dodge 5.7L Gen III HEMI",
  title: "Dodge 5.7 HEMI Exhaust Manifold Torque Sequence",
  metaDescription: "5.7 HEMI exhaust-manifold 25 N-m procedure with center-out controller, early/late bolt-count split and side-specific hardware cautions.",
  answer: "For the cited 2013 Ram 1500 and 2011 Dodge Charger 5.7L HEMI factory manifolds, tighten the manifold fasteners in the side-specific sequence to 25 N-m (18 lb-ft); the Ram procedure then calls for a second check at the same 25 N-m. Start at the center and work outward only after matching the exact left/right figure and bolt count. Do not force one numbered drawing onto every HEMI: the cited BD replacement-manifold guide distinguishes early nine-hole from later ten-hole production layouts, and the 2013 Ram manual identifies special stainless fastener locations that differ left to right.",
  detail: "The controller below shows the safe workflow rather than inventing one universal physical number map. Model year, DS/DT truck versus LX/LD car, left/right bank, installed manifold and available cylinder-head holes select the exact diagram.",
  scope: "Covers the 25 N-m production-manifold rule documented for cited 2011 Charger and 2013 Ram applications, plus the bolt-count split documented by a current 2009-2024 replacement-manifold manufacturer. It does not automatically cover 6.1/6.2/6.4L HEMI, Mopar SRT log manifolds, long-tube headers or a later DT layout without the matching service figure.",
  values: [
    { label: "Factory manifold", value: "25 N-m / 18 lb-ft", note: "Use side-specific sequence" },
    { label: "2013 Ram recheck", value: "25 N-m / 18 lb-ft", note: "Repeat the same sequence" },
    { label: "Early replacement layout", value: "9 holes", note: "Verify exact vehicle and available holes" },
    { label: "Later replacement layout", value: "10 holes", note: "Do not reuse early numeric map" },
  ],
  diagram: {
    type: "exhaust",
    title: "Interactive 5.7 HEMI exhaust tightening controller",
    caption: "Use this workflow only after opening the exact left/right factory or component figure. HEMI bolt counts and special fastener locations change across applications.",
    points: ["Confirm model/year", "Confirm left or right bank", "Count available holes", "Hand-start every fastener", "Tighten center-out in exact figure", "Repeat at 25 N-m if specified"],
    orientation: "APPLICATION CONTROLLER - NOT A UNIVERSAL PHYSICAL MAP",
  },
  applicationNotes: [
    "The 2013 Ram procedure lists 25 N-m and a repeat pass, but it also identifies stainless fasteners at locations 6 and 9 on the left and 7 and 8 on the right. Those fasteners must return to their documented locations, so the left and right drawings are not casually interchangeable.",
    "The 2011 Charger also uses 25 N-m with a new gasket, while BD's current replacement-manifold guide separates early nine-hole and later ten-hole production. Similar final torque does not erase differences in bolt count, tie bars, access or heat-shield hardware.",
  ],
  hardwareNotes: [
    "A HEMI exhaust tick can come from a broken bolt, warped manifold, cracked casting or outlet leak. Check every hole with a light and mirror, measure flange flatness and remove broken shanks without damaging the aluminum head before installing new hardware.",
    "Keep stainless bolts, studs, spacers and tie bars in their specified locations. A replacement kit may tell the installer to populate all available holes; that instruction applies to the supplied manifold and vehicle range, not automatically to an older factory casting.",
  ],
  sourceNotes: [
    "Mopar/Ram service information establishes the 25 N-m value and side-specific sequence requirement. BD's component manual supplies the center-out strategy and early/late hole-count warning for its replacement system.",
    "Because the sources show more than one physical layout, a generic numbered row would be false precision. The interactive controller forces identification of bank and bolt count before torque is applied.",
  ],
  customFaqs: [
    { q: "What is the 5.7 HEMI exhaust-manifold torque?", a: "The cited 2011 Charger and 2013 Ram procedures specify 25 N-m (18 lb-ft) in the application-specific sequence; the Ram procedure repeats the check at 25 N-m." },
    { q: "Does every 5.7 HEMI have the same number of manifold bolts?", a: "No. The cited replacement-manifold guide distinguishes early nine-hole and later ten-hole layouts, and factory side-specific hardware also varies." },
    { q: "Can I swap the left and right sequence diagrams?", a: "No. The 2013 Ram procedure lists different special stainless-fastener positions on the left and right banks. Use the exact bank figure." },
  ],
  sources: [ram2013HemiExhaust, dodge2011HemiExhaust, bdHemiExhaust],
};

export const exhaustDiagramSpecs: SpecRecord[] = [chevy350, ford302, chevy53, hemi57].map(buildExhaustPage);
