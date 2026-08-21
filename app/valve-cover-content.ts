import type { Source, SpecRecord, SpecValue } from "./chevy350-content";

const source = (label: string, url: string, note: string): Source => ({ label, url, note });

const chevyCenterBolt = source("Chevrolet Performance small-block center-bolt rocker-cover instructions", "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/performance/resources/installation-guides/crate-engines/01-images/small-block-die-cast-rocker-cover-19351534-19351803-12497895-12497979.pdf", "Chevrolet identifies the applicable center-bolt die-cast cover, directs tightening from the middle pair to the end pair, and specifies 6–8 lb-ft.");
const chevyCt = source("Chevrolet Performance CT350/CT400 technical manual", "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/performance/resources/02-pdfs/02-15-2023/CT350-400-Tech-Manual-FINAL-2-13-23.pdf", "Chevrolet's parts list identifies the production valve-cover fastener used on these Gen I circle-track crate engines; cover style still controls the torque procedure.");
const ford1988 = source("1988 Ford Bronco 5.0L rocker-cover service procedure", "https://charm.li/Ford/1988/Bronco%20Full%20Size%20V8-302%205.0L/Repair%20and%20Diagnosis/Engine%2C%20Cooling%20and%20Exhaust/Engine/Cylinder%20Head%20Assembly/Rocker%20Arm%20Assembly/Service%20and%20Repair/", "Ford specifies 4–6 N·m (3–5 lb-ft), a two-minute wait and a second pass for the cited perimeter-bolt production cover.");
const ford1993 = source("1993 Ford Mustang 5.0L torque specifications", "https://charm.li/Ford/1993/Mustang%20V8-302%205.0L%20HO/Repair%20and%20Diagnosis/Engine%2C%20Cooling%20and%20Exhaust/Engine/Specifications/Torque%20Specifications/", "The Mustang table lists its 5.0L/5.8L rocker-cover range separately, illustrating why model year and cover construction must be identified before choosing a number.");
const gm53 = source("2005 GMC Sierra 5.3L valve rocker-arm cover procedure", "https://workshop-manuals.com/gmc/sierra_1500_2wd/v8-5.3l_vin_t/engine_cooling_and_exhaust/engine/cylinder_head_assembly/valve_cover/component_information/service_and_repair/valve_rocker_arm_cover_replacement_%28left%29/page_3766/", "The application-specific GM procedure specifies 12 N·m (106 in-lb) for the rocker-cover bolts and treats coil-bracket hardware as a separate operation.");
const hemi = source("2005 Ram 1500 5.7L HEMI valve-cover service procedure", "https://charm.li/Dodge%20and%20Ram/2005/RAM%201500%20Truck%202WD%20V8-5.7L%20VIN%20D/Repair%20and%20Diagnosis/Engine%2C%20Cooling%20and%20Exhaust/Engine/Cylinder%20Head%20Assembly/Valve%20Cover/Service%20and%20Repair/", "The procedure requires all fasteners hand-started, correct stud and ground-strap locations, then 8 N·m (70 in-lb) from the middle outward in a top-to-bottom crisscross pattern.");
const toyota22r = source("Toyota 22R-E engine repair-manual excerpt", "https://krutilvertel.com/pdf/demo/motorist/service-manual-toyota-22r-e-demo.pdf", "The Toyota manual excerpt identifies the low-torque cover joint and the application of seal packing at the specified junctions; the page preserves the 22R-E application boundary.");
const hondaK20 = source("2006 Acura RSX K20 cylinder-head-cover installation", "https://charm.li/Acura/2006/RSX%20L4-2.0L/Repair%20and%20Diagnosis/Engine%2C%20Cooling%20and%20Exhaust/Engine/Cylinder%20Head%20Assembly/Service%20and%20Repair/Cylinder%20Head%20Cover%20Installation/", "Honda specifies liquid-gasket locations and working time, two or three tightening steps, a 9.8 N·m (7.2 lb-ft) final pass, and curing precautions.");
const subaruEJ = source("2004 Subaru Impreza engine mechanical service manual", "https://subaruport.ru/imp4/imp04_sec2_4-1.pdf", "The Subaru rocker-cover procedure and torque key distinguish the low-torque cover fasteners from the higher-torque studs and nearby hardware.");

type Page = {
  slug: string; keyword: string; make: string; model: string; title: string; metaDescription: string;
  answer: string; detail: string; scope: string; values: SpecValue[]; points: string[];
  applications: string[]; install: string[]; pitfalls: string[]; faqs: { q: string; a: string }[]; sources: Source[];
};

function build(c: Page): SpecRecord {
  return {
    slug: c.slug,
    keyword: c.keyword,
    make: c.make,
    model: c.model,
    category: "Bolt Torque Sequences",
    title: c.title,
    metaDescription: c.metaDescription,
    answer: c.answer,
    detail: c.detail,
    scope: c.scope,
    values: c.values,
    diagram: {
      type: "valve",
      title: `Interactive ${c.model} valve-cover workflow`,
      caption: "Select each stage in order. This is an installation controller, not a substitute for the exact factory location drawing when the cover, studs or bolt count differ.",
      points: c.points,
      orientation: "FRONT OF ENGINE",
    },
    intro: [
      `Valve-cover fasteners are small, but the joint is unforgiving. On the ${c.model}, sealing depends on a relaxed cover, a correctly seated molded or cork/rubber gasket, sound grommets and a gradual clamp load. Cranking down a leaking corner usually bends the flange, splits the gasket or pulls a threaded insert from the cover.`,
      c.applications[0],
      "Use the controller as a disciplined work sequence: identify the exact application, map every special stud, prepare the sealing surfaces, hand-start everything and approach final torque in stages. Recheck the gasket edge before installing coils, wiring and hoses that hide it.",
    ],
    steps: [
      "Confirm model year, engine code and cover construction. Photograph the PCV plumbing, wire clips, ground straps, coil brackets and every stud before removal.",
      "Work on a cool engine. Disconnect the negative battery cable where the service procedure requires it, then remove covers, ducts, coils and brackets without levering against the sealing rail.",
      "Loosen the cover gradually from the ends toward the middle. Keep bolts, studs, sealing washers and grommets in a labeled position map.",
      "Lift the cover vertically enough to clear spark-plug tubes and valvetrain parts. Do not let old gasket debris fall into drain-back holes or the timing area.",
      "Clean the cover groove and cylinder-head rail with non-damaging tools. Check stamped flanges for dimples, plastic covers for cracks and all sealing washers for hardening or splits.",
      ...c.install,
      "Reconnect PCV and breather plumbing exactly as routed, return ground straps and harness supports to their original studs, and torque coil or bracket fasteners to their separate specification.",
      "After the specified sealant cure, run the engine and inspect the entire perimeter with a light. Confirm that smoke is not residual oil on the exhaust and recheck for seepage after a full heat cycle.",
    ],
    sections: [
      { heading: "Application and cover-style boundaries", paragraphs: c.applications },
      { heading: "Torque sequence and gasket installation", paragraphs: c.install },
      { heading: "Reading the interactive pattern", paragraphs: ["The middle-outward strategy spreads gasket compression instead of trapping a high spot at an end. Where the factory procedure gives an explicit crisscross direction, the controller preserves it. Where it does not, the controller shows a conservative staged workflow and tells you to retain the factory location map.", "Treat a target torque as the last step, not the whole repair. A fastener that reaches the number while bottomed in a blind hole or sitting on a collapsed grommet has not necessarily clamped the cover."] },
      { heading: "Common reasons a new gasket still leaks", bullets: c.pitfalls },
      { heading: "Pre-start inspection", bullets: ["Gasket fully seated in every groove and corner", "Spark-plug tube seals undamaged and centered", "Sealant only at the service-manual junctions", "All bolts and studs hand-started in mapped locations", "Final pass made with an inch-pound or low-range torque wrench", "Ground straps, PCV hoses and harness clips restored", "No tools, rags or debris left near the valvetrain", "Required sealant cure time observed"] },
    ],
    faqs: c.faqs.concat([
      { q: "Should the valve-cover bolts be retorqued after a heat cycle?", a: "Only if the exact procedure or gasket manufacturer calls for it. Some older cork/composite joints include a wait-and-repeat step; modern molded gaskets generally do not need an improvised hot retorque." },
      { q: "Can RTV replace the valve-cover gasket?", a: "Usually no. Install the specified gasket and put liquid gasket only at named corners, cap joints or semicircular plugs. Excess RTV can squeeze inside and break loose." },
      { q: "Can I tighten the bolts by feel?", a: "These values sit near the bottom of many foot-pound wrench ranges. An inch-pound or suitable low-range torque wrench gives much better control and reduces broken covers and stripped threads." },
    ]),
    sources: c.sources,
    reviewed: "2026-08-21",
    featureImage: "/features/shared-firing-engine.png",
    featureOverlay: true,
  };
}

const pages: Page[] = [
  {
    slug: "chevrolet/350/valve-cover-bolt-torque-pattern", keyword: "chevy 350 valve cover bolt torque pattern diagram", make: "Chevrolet", model: "Chevy 350 Gen I",
    title: "Chevy 350 Valve Cover Bolt Torque Pattern Diagram", metaDescription: "Chevy 350 valve-cover torque workflow: Chevrolet center-bolt 6–8 lb-ft branch, middle-to-ends pattern, gasket prep and perimeter-cover warning.",
    answer: "For Chevrolet Performance's center-bolt die-cast small-block covers, tighten the middle two bolts first, then the two end bolts, and finish at 6–8 lb-ft. That number is not universal to every Chevy 350 valve cover: early perimeter-bolt stamped covers use different hardware and often a lower gasket-maker or application-specific value. Identify the cover before selecting the branch.",
    detail: "A Chevy 350 describes an engine family, not one cover. Four-bolt perimeter, center-bolt, stamped-steel and die-cast covers do not share one safe torque pattern.",
    scope: "Chevrolet Performance P/N 88959178-family center-bolt die-cast covers; perimeter-bolt and aftermarket covers require their own instructions.",
    values: [{ label: "Center-bolt die-cast cover", value: "6–8 lb-ft", note: "Chevrolet Performance instruction" }, { label: "Order", value: "Middle pair, then ends", note: "Four center bolts" }, { label: "Perimeter-bolt cover", value: "Application-specific", note: "Do not reuse center-bolt value" }, { label: "Final tool", value: "Low-range torque wrench", note: "Avoid flange distortion" }],
    points: ["Identify cover", "Seat gasket", "Hand-start all", "Middle-left", "Middle-right", "Front end", "Rear end", "Inspect edge"],
    applications: ["The published Chevrolet instruction applies to its center-bolt die-cast rocker-cover family. It explicitly starts with the middle two bolts and finishes with the end two. That is the defensible pattern for that hardware.", "Many classic 350s instead have small bolts around the perimeter. Stamped rails can dimple at each hole, and spreader bars or aftermarket castings change clamp distribution. Use the cylinder-head/cover manufacturer's value rather than copying 6–8 lb-ft automatically."],
    install: ["Install the matched gasket in the clean cover groove or rail. Check that baffles clear the rockers and that the cover sits flat before any bolt is tightened.", "Hand-start all four center bolts. Snug the middle pair alternately, then the front and rear bolts; repeat in increasing passes and finish within 6–8 lb-ft."],
    pitfalls: ["Applying the center-bolt value to an early stamped perimeter cover", "Flattening a cork gasket until it extrudes", "Ignoring dimples around perimeter bolt holes", "Using RTV around the entire gasket", "Installing a cover whose internal baffle contacts the valvetrain"],
    faqs: [{ q: "What is the Chevy 350 center-bolt valve-cover torque?", a: "Chevrolet Performance specifies 6–8 lb-ft for the cited die-cast center-bolt cover." }, { q: "What is the Chevy 350 valve-cover bolt sequence?", a: "On the cited four-center-bolt cover, tighten the middle two first and the two end bolts last. Perimeter covers need a different physical map." }], sources: [chevyCenterBolt, chevyCt],
  },
  {
    slug: "ford/302/valve-cover-torque-sequence", keyword: "ford 302 valve cover torque sequence diagram", make: "Ford", model: "Ford 302 / 5.0L Windsor",
    title: "Ford 302 Valve Cover Torque Sequence Diagram", metaDescription: "Ford 302 valve-cover torque sequence with the 1988 Bronco 3–5 lb-ft branch, staged center-out tightening, two-minute repeat and year-specific cautions.",
    answer: "For the cited 1988 Bronco 302/5.0L production cover, Ford specifies 4–6 N·m (3–5 lb-ft), followed by a two-minute wait and a second pass at the same value. Tighten in small alternating steps from the central area toward the ends. Later 5.0L covers and rigid aftermarket castings can publish different ranges, so match the year and cover.",
    detail: "Ford 302 rocker covers span carbureted trucks, EFI passenger cars, stamped steel, cast aluminum and multiple bracket/stud layouts.", scope: "1988 Bronco 5.0L perimeter-cover procedure used as the numeric branch; other production years and aftermarket covers are identified separately.",
    values: [{ label: "1988 Bronco 5.0L", value: "4–6 N·m / 3–5 lb-ft", note: "Production service procedure" }, { label: "Repeat", value: "After 2 minutes", note: "Same specification" }, { label: "Pattern", value: "Alternating middle-out", note: "Avoid rail distortion" }, { label: "Other 5.0L covers", value: "Verify by year", note: "Ranges vary" }],
    points: ["Map studs", "Seat gasket", "Center-left", "Center-right", "Work forward", "Work rearward", "Wait 2 minutes", "Repeat/check"],
    applications: ["Ford's 1988 truck procedure calls for new cover gaskets with their tabs engaged in the cover notches. It also warns, by inspection step, that overtightening can distort the sealing surface.", "Ford tables for other 5.0L applications display different cover ranges. EFI brackets, lifting eyes and vacuum hardware may share studs, so the exact vehicle procedure remains the controlling source."],
    install: ["Seat the gasket tabs in their notches and place the cover without sliding the gasket out of the rail. Restore any stud-mounted brackets to the mapped positions.", "Tighten gradually in an alternating middle-out pattern to 4–6 N·m (3–5 lb-ft). Wait two minutes, then repeat the final pass at the same setting."],
    pitfalls: ["Using a later cast-cover value on stamped steel", "Pinching the gasket behind an EFI bracket", "Swapping stud and plain-bolt locations", "Skipping Ford's two-minute repeat", "Trying to stop a leak with extra torque"],
    faqs: [{ q: "What torque does the cited Ford 302 valve cover use?", a: "The 1988 Bronco 5.0L procedure specifies 4–6 N·m (3–5 lb-ft), then a second pass after two minutes." }, { q: "Is one Ford 302 sequence universal?", a: "No. Cover style and production application vary; use the branch matching the installed cover." }], sources: [ford1988, ford1993],
  },
  {
    slug: "chevrolet/5-3/valve-cover-torque-pattern", keyword: "chevy 5.3 valve cover torque pattern diagram", make: "Chevrolet / GMC", model: "GM 5.3L LS-based V8",
    title: "Chevy 5.3 Valve Cover Torque Pattern Diagram", metaDescription: "Chevy 5.3 valve-cover torque pattern with GM's 12 N·m/106 in-lb specification, gasket and grommet checks, coil-bracket separation and staged tightening.",
    answer: "The cited GM 5.3L procedure specifies 12 N·m (106 in-lb) for the valve rocker-arm cover bolts. Install a new gasket where required, hand-start every bolt and tighten evenly in staged passes from the center region toward the ends. Coil-bracket studs may also be listed at 12 N·m in this application, but they are a separate threadlocked operation—not part of the cover pattern.",
    detail: "The 5.3L name spans Gen III, Gen IV and Gen V engines; match VIN, year and cover because PCV design and service steps changed.", scope: "2005 Sierra Gen III 5.3L service branch; later Gen IV/Gen V cover and PCV revisions require application confirmation.",
    values: [{ label: "Rocker-cover bolts", value: "12 N·m / 106 in-lb", note: "Cited GM 5.3L" }, { label: "Gasket", value: "Install matched/new", note: "Keep groove clean" }, { label: "Coil bracket", value: "Separate operation", note: "Do not merge pattern" }, { label: "Pattern", value: "Staged middle-out", note: "Even grommet compression" }],
    points: ["Verify VIN/cover", "Install gasket", "Hand-start all", "Snug center", "Alternate outward", "Torque 12 N·m", "Install coils", "Leak check"],
    applications: ["The source branch is a 2005 Sierra 5.3L VIN T procedure and directly states 12 N·m (106 in-lb). Similar LS-based covers often use the same value, but the page does not silently extend it to every EcoTec3/Gen V application.", "Some covers incorporate PCV metering and oil-separation features. If oil consumption, blue startup smoke or a cracked PCV port prompted the repair, confirm the superseded cover part number as well as the gasket."],
    install: ["Fit the gasket completely into the clean groove and inspect each reusable grommet. Lower the cover squarely so the gasket cannot roll near the rear corner or spark-plug area.", "Hand-start all cover bolts, compress the grommets gradually from the center outward, and finish at 12 N·m (106 in-lb). Install threadlocked coil-bracket hardware only in its separate step."],
    pitfalls: ["Treating coil-bracket studs as cover-sequence bolts", "Reusing a flattened or oil-swollen gasket", "Missing a cracked integrated PCV port", "Pinching the rear gasket where visibility is poor", "Using a foot-pound wrench that is inaccurate at this low value"],
    faqs: [{ q: "What is Chevy 5.3 valve-cover bolt torque?", a: "The cited Gen III GM procedure specifies 12 N·m (106 in-lb)." }, { q: "Do the coil brackets use the same sequence?", a: "No. The service information handles bracket studs separately, including threadlocker where specified." }], sources: [gm53],
  },
  {
    slug: "dodge/5-7-hemi/valve-cover-torque", keyword: "dodge 5.7 hemi valve cover torque diagram", make: "Dodge / Ram", model: "5.7L HEMI",
    title: "Dodge 5.7 HEMI Valve Cover Torque Diagram", metaDescription: "5.7 HEMI valve-cover torque workflow with 8 N·m/70 in-lb specification, middle-out crisscross order, double-ended stud and ground-strap locations.",
    answer: "For the cited 2005 Ram 5.7L HEMI, hand-start all valve-cover fasteners, verify the double-ended studs and ground straps are in their original positions, then tighten to 8 N·m (70 in-lb). Begin in the middle and move outward in a top-to-bottom crisscross pattern. Ignition-coil fasteners are a separate 12 N·m (105 in-lb) operation.",
    detail: "Correct stud placement matters because the machined ground-strap locations and coil hardware are part of the cover installation.", scope: "2005 Ram 1500 5.7L VIN D factory procedure; later Eagle/Apache covers should be verified by model year.",
    values: [{ label: "Cover bolts/studs", value: "8 N·m / 70 in-lb", note: "2005 Ram 5.7L" }, { label: "Order", value: "Middle-out crisscross", note: "Top to bottom" }, { label: "Coil fasteners", value: "12 N·m / 105 in-lb", note: "Separate operation" }, { label: "Ground straps", value: "Original stud locations", note: "Do not relocate" }],
    points: ["Map studs/grounds", "Seat gasket", "Hand-start all", "Middle top", "Middle bottom", "Crisscross outward", "Torque 8 N·m", "Coils 12 N·m"],
    applications: ["The Ram procedure is unusually specific: the right ground strap belongs on the front inboard stud and the left strap on the rear inboard stud. Those details should be photographed before disassembly.", "The gasket may be reused only if it has no cuts, tears or deformation in the cited procedure. In practice, replace any hardened, flattened or questionable seal while access is open."],
    install: ["Use non-harsh cleaners on the cover, inspect both sealing faces and set the gasket without stretching it. Hand-start the mapped bolts and double-ended studs and restore the ground straps.", "Start in the middle, alternate top-to-bottom in a crisscross and work outward. Finish cover hardware at 8 N·m (70 in-lb); install coils afterward at their separate 12 N·m value."],
    pitfalls: ["Relocating machined ground-strap studs", "Allowing a harness to rub through the cover", "Using harsh cleaner on the cover material", "Applying 12 N·m coil torque to 8 N·m cover bolts", "Tightening one end fully before the other"],
    faqs: [{ q: "What is 5.7 HEMI valve-cover bolt torque?", a: "The cited 2005 Ram procedure specifies 8 N·m (70 in-lb)." }, { q: "What is the HEMI valve-cover sequence?", a: "Begin in the middle and work outward in a top-to-bottom crisscross pattern." }], sources: [hemi],
  },
  {
    slug: "toyota/22r/valve-cover-torque-sequence", keyword: "toyota 22r valve cover torque sequence diagram", make: "Toyota", model: "Toyota 22R / 22R-E",
    title: "Toyota 22R Valve Cover Torque Sequence Diagram", metaDescription: "Toyota 22R/22R-E valve-cover sequence with low 5.9 N·m/52 in-lb branch, four sealing washers, half-moon plugs and specified seal-packing points.",
    answer: "For the commonly documented 22R-E cover using four top nuts and sealing washers, tighten the four positions evenly to 5.9 N·m (52 in-lb, about 4.3 lb-ft). Alternate diagonally in two or three light passes. Install the gasket, half-moon plugs and four seals correctly, and apply seal packing only at the junctions shown in the matching Toyota manual.",
    detail: "The cover is clamped through soft sealing washers; additional torque can deform the cover or harden/split the seals without fixing the true leak path.", scope: "Toyota 22R-E four-nut cover procedure; early 22R versions and aftermarket covers require year/part confirmation.",
    values: [{ label: "Four cover nuts", value: "5.9 N·m / 52 in-lb", note: "Common 22R-E branch" }, { label: "Pattern", value: "Diagonal, staged", note: "Even washer compression" }, { label: "Sealing washers", value: "4", note: "Replace if hardened" }, { label: "Seal packing", value: "Specified junctions only", note: "Do not coat entire rail" }],
    points: ["Set half-moons", "Fit gasket", "Install 4 seals", "Hand-start nuts", "Front-left", "Rear-right", "Front-right", "Rear-left/check"],
    applications: ["The 22R/22R-E cover does not use a row of perimeter bolts. Four top nuts compress seals around studs while the gasket and semicircular plugs seal the cylinder-head rail.", "Manual editions display the precise seal-packing points. Use the figure for the engine year because spreading sealant around the complete rail can create debris and make the cover difficult to seat."],
    install: ["Clean the gasket groove and the semicircular plug areas, install the gasket and half-moon plugs, then place all four sealing washers/seals in the correct orientation.", "Hand-start the four nuts. Alternate diagonally through two or three passes and finish at 5.9 N·m (52 in-lb), watching that every washer compresses evenly."],
    pitfalls: ["Reusing rock-hard sealing washers", "Leaving old seal packing at the half-moon corners", "Coating the entire gasket with RTV", "Tightening one top nut until the cover tilts", "Confusing inch-pounds with foot-pounds"],
    faqs: [{ q: "What is Toyota 22R-E valve-cover torque?", a: "The documented four-nut branch uses 5.9 N·m (52 in-lb, about 4.3 lb-ft)." }, { q: "Does a 22R use a crisscross pattern?", a: "Use light diagonal passes across the four top nuts so the cover and sealing washers compress evenly." }], sources: [toyota22r],
  },
  {
    slug: "honda/k20/valve-cover-torque-sequence", keyword: "honda k20 valve cover torque sequence diagram", make: "Honda / Acura", model: "Honda K20",
    title: "Honda K20 Valve Cover Torque Sequence Diagram", metaDescription: "Honda K20 valve-cover installation with 9.8 N·m/7.2 lb-ft final torque, 2–3 staged passes, liquid-gasket locations, working time and cure guidance.",
    answer: "For the cited 2006 Acura RSX K20, tighten the cylinder-head-cover bolts in two or three stages and finish at 9.8 N·m (7.2 lb-ft) in the factory sequence. Apply Honda liquid gasket only where the chain case and No. 5 rocker-shaft-holder areas meet the head, seat the spark-plug tube seals carefully, wait at least 30 minutes before adding oil and do not run the engine for at least three hours.",
    detail: "On a K20, correct liquid-gasket placement and working time are as important as the final torque number.", scope: "2006 Acura RSX K20A2/K20Z1-family procedure; other K20/K24 cover castings and service-manual editions must be matched.",
    values: [{ label: "Final cover torque", value: "9.8 N·m / 7.2 lb-ft", note: "Cited RSX K20" }, { label: "Passes", value: "2 or 3", note: "Factory instruction" }, { label: "Sealant working time", value: "4–5 minutes", note: "Depends on Honda product" }, { label: "Run-engine cure", value: "At least 3 hours", note: "Cited procedure" }],
    points: ["Clean groove", "Apply corner sealant", "Set tube seals", "Seat cover", "First light pass", "Second pass", "Final 9.8 N·m", "Cure/check"],
    applications: ["The cited RSX procedure names the chain-case and No. 5 rocker-shaft-holder mating areas as the liquid-gasket locations. It also imposes a short installation window: four minutes for one named product and five minutes for the others.", "K20 variants share architecture but not every accessory bracket or cover casting. Use the factory sequence picture for the exact application while retaining the staged, low-torque method."],
    install: ["Seat the gasket in the cleaned cover groove, apply the specified Honda liquid gasket only at the named junctions and set the spark-plug seals squarely over the tubes. Slide the cover slightly to seat the gasket without rolling it.", "Inspect the sealing washers, then tighten in two or three steps to 9.8 N·m (7.2 lb-ft). Wait at least 30 minutes before adding oil and at least three hours before running the engine."],
    pitfalls: ["Missing the chain-case junction sealant", "Exceeding the liquid-gasket working time", "Folding a spark-plug tube seal", "Reusing deteriorated cover washers", "Starting the engine before the specified cure period"],
    faqs: [{ q: "What is Honda K20 valve-cover torque?", a: "The cited 2006 RSX procedure specifies a 9.8 N·m (7.2 lb-ft) final pass." }, { q: "How soon can a K20 run after cover installation?", a: "The cited procedure says wait at least three hours before running and at least 30 minutes before adding oil." }], sources: [hondaK20],
  },
  {
    slug: "subaru/ej25/valve-cover-bolt-torque", keyword: "subaru ej25 valve cover bolt torque diagram", make: "Subaru", model: "Subaru EJ25",
    title: "Subaru EJ25 Valve Cover Bolt Torque Diagram", metaDescription: "Subaru EJ25 rocker-cover bolt workflow with the cited 5 N·m/3.6 lb-ft branch, horizontal-engine gasket seating, separate stud torques and leak checks.",
    answer: "For the cited 2004 Impreza EJ-series rocker-cover procedure, the cover-fastener torque key uses 5 N·m (3.6 lb-ft) for the low-torque cover joint. Tighten in gentle alternating stages from the middle region outward. Do not apply that number to nearby studs, AVCS/solenoid hardware or brackets: Subaru's diagram assigns those fasteners separate torque keys.",
    detail: "Because the EJ25 is horizontally opposed, the lower gasket edge can move as the cover is offered to the head; visual confirmation before tightening is essential.", scope: "Cited 2004 Impreza EJ-series manual branch; EJ251/EJ253/EJ255/EJ257 and DOHC/SOHC hardware must be confirmed by VIN and manual section.",
    values: [{ label: "Cited cover-fastener key", value: "5 N·m / 3.6 lb-ft", note: "2004 Impreza manual branch" }, { label: "Pattern", value: "Alternating middle-out", note: "Keep lower edge seated" }, { label: "Nearby studs", value: "Separate torque keys", note: "Use exact diagram" }, { label: "Tube seals/grommets", value: "Inspect/replace", note: "Common leak paths" }],
    points: ["Verify EJ code", "Fit tube seals", "Set cover level", "Hand-start all", "Center fasteners", "Alternate outward", "Torque 5 N·m", "Inspect lower rail"],
    applications: ["EJ25 is a broad family, and Subaru manual pages can cover SOHC and DOHC arrangements with different additional hardware. The 5 N·m branch here is tied to the cited rocker-cover torque key, not declared universal for every EJ25.", "The physical location image in the matching manual controls which positions are ordinary cover bolts and which are studs or accessory fasteners. Preserve those locations during removal."],
    install: ["Replace the rocker-cover gasket and tube seals as required, apply the manual-specified liquid gasket only at case/cap junctions and support the cover so the lower gasket edge remains in its groove.", "Hand-start every mapped fastener and snug the central region first, alternating outward. Finish the cited cover-fastener branch at 5 N·m (3.6 lb-ft), then inspect the hidden lower rail with a mirror."],
    pitfalls: ["Assuming every EJ25 variant uses the same hardware", "Letting the lower gasket edge fall from its groove", "Applying the cover value to a higher-torque stud", "Missing hardened spark-plug tube seals", "Checking only the visible upper edge for leaks"],
    faqs: [{ q: "What torque does the cited EJ25 valve-cover branch use?", a: "The cited 2004 Impreza rocker-cover torque key uses 5 N·m (3.6 lb-ft) for the low-torque cover fasteners." }, { q: "Why must the exact Subaru diagram be used?", a: "The page assigns different torque keys to nearby bolts, studs and accessories; a generic physical map can misidentify them." }], sources: [subaruEJ],
  },
];

export const valveCoverSpecs: SpecRecord[] = pages.map(build);
