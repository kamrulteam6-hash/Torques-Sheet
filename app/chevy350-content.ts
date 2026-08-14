export type SpecValue = { label: string; value: string; note: string };
export type ContentSection = { heading: string; paragraphs?: string[]; bullets?: string[] };
export type Source = { label: string; url: string; note: string };
export type Diagram = { type: "firing" | "wheel" | "spark" | "intake" | "head" | "oil" | "timing" | "valve" | "main" | "rod"; title: string; caption: string; points: string[] };

export type SpecRecord = {
  slug: string;
  keyword: string;
  make: string;
  model: string;
  category: string;
  title: string;
  metaDescription: string;
  answer: string;
  detail: string;
  scope: string;
  values: SpecValue[];
  diagram: Diagram;
  intro: string[];
  steps: string[];
  sections: ContentSection[];
  faqs: { q: string; a: string }[];
  sources: Source[];
  reviewed: string;
  featureImage?: string;
};

const chevrolet350Ho = {
  label: "Chevrolet Performance 350 HO Base Engine guide (P/N 12366576)",
  url: "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/performance/resources/installation-guides/crate-engines/02-pdf/350-ho-base-crate-engine-12366576.pdf",
  note: "Primary Chevrolet Performance installation and specification manual for the 350 HO crate engine.",
};
const chevrolet350290 = {
  label: "Chevrolet Performance 350/290 Long Block guide (P/N 19172591)",
  url: "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/performance/resources/installation-guides/crate-engines/02-pdf/350-290-hp-long-block-crate-engine-19172591.pdf",
  note: "Primary Chevrolet Performance guide for the pre-1986-style 350/290 long block.",
};
const chevroletRamJet = {
  label: "Chevrolet Performance Ram Jet 350 guide (P/N 19417619)",
  url: "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/performance/resources/installation-guides/crate-engines/02-pdf/ramjet-350-crate-engine-19417619.pdf",
  note: "Primary Chevrolet Performance installation and calibration guide for Ram Jet 350 engines.",
};
const compValve = {
  label: "COMP Cams camshaft installation instructions",
  url: "https://www.compcams.com/amfile/file/download/file/705/product/32827/",
  note: "Manufacturer instructions covering hydraulic preload and solid-lifter lash.",
};
const edelbrockIntake = {
  label: "Edelbrock Performer EPS intake application notes",
  url: "https://www.edelbrock.com/performer-eps-intake-manifold-2701.html",
  note: "Manufacturer guidance on gasket choice, hardened washers, sealant, and intake installation.",
};

export const chevy350Specs: SpecRecord[] = [
  {
    slug: "chevrolet/350/firing-order",
    keyword: "chevy 350 firing order",
    make: "Chevrolet",
    model: "350 Small-Block (5.7L V8)",
    category: "Firing Order",
    title: "Chevy 350 Firing Order and Cylinder Numbering",
    metaDescription: "Chevy 350 firing order diagram, cylinder numbering, HEI distributor direction, and step-by-step plug-wire routing for the small-block 5.7L V8.",
    answer: "The Chevrolet small-block 350 firing order is 1-8-4-3-6-5-7-2. Cylinders 1-3-5-7 are on the driver side and 2-4-6-8 are on the passenger side, numbered front to rear. A conventional HEI distributor rotor turns clockwise when viewed from above.",
    detail: "This firing order is documented by Chevrolet Performance for the 350/290 and Ram Jet 350. Distributor terminal position is not universal because the distributor can be installed in more than one indexed position; identify the actual No. 1 terminal before routing wires.",
    scope: "Applies to traditional Gen I Chevrolet 350 small-block V8 engines using the standard crankshaft and camshaft firing order. It does not describe later LS-family 5.7L engines.",
    values: [
      { label: "Firing order", value: "1-8-4-3-6-5-7-2", note: "Standard Gen I Chevy small-block V8" },
      { label: "Driver-side bank", value: "1-3-5-7", note: "Front to rear" },
      { label: "Passenger-side bank", value: "2-4-6-8", note: "Front to rear" },
      { label: "HEI rotor direction", value: "Clockwise", note: "Viewed from above" },
    ],
    diagram: { type: "firing", title: "Interactive Chevy 350 firing-order diagram", caption: "Select a cylinder to follow the firing sequence. The front of the engine is at the top.", points: ["1", "8", "4", "3", "6", "5", "7", "2"] },
    intro: [
      "A crossed pair of plug wires can make a Chevy 350 pop through the carburetor, misfire under load, or refuse to start. The sequence itself is simple, but the cylinder banks and distributor indexing are where mistakes happen.",
      "Use the diagram and table together. First locate compression top dead center on cylinder 1, identify the cap terminal directly above the rotor, and then route the remaining wires clockwise in the 1-8-4-3-6-5-7-2 order.",
    ],
    steps: [
      "Disable the ignition and rotate the engine until cylinder 1 is at top dead center on its compression stroke.",
      "Remove the distributor cap and note the terminal at which the rotor points. That physical terminal is No. 1 for the current installation.",
      "Connect No. 1 to the front cylinder on the driver-side bank.",
      "Move clockwise around the cap and connect 8, 4, 3, 6, 5, 7, then 2.",
      "Keep wires separated from exhaust heat and avoid long parallel runs between cylinders 5 and 7, which fire consecutively.",
      "Refit the cap, start the engine, and verify ignition timing with the correct procedure for the exact 350 variant.",
    ],
    sections: [
      { heading: "How Chevy 350 cylinders are numbered", paragraphs: ["Standing at the front of the vehicle and looking toward the windshield, the odd-numbered cylinders are on your right—the vehicle's driver side. The even-numbered cylinders are on your left—the passenger side. Both banks count from front to rear."] },
      { heading: "Why the No. 1 cap terminal may look different", paragraphs: ["Diagrams often show No. 1 in a convenient clock position, but the cap position is not what creates the firing order. The relationship between rotor position and cylinder 1 at compression TDC does. If a previous builder moved the distributor one or more teeth, the engine may still run with No. 1 in a different cap position."], bullets: ["Do not copy a clock position without checking the rotor.", "Do not confuse compression TDC with exhaust TDC.", "Route each wire from cap to cylinder before moving to the next terminal."] },
      { heading: "Common symptoms of incorrect routing", bullets: ["Cranking with no start", "Popping through the carburetor or exhaust", "Severe vibration or dead cylinders", "Low manifold vacuum", "Timing light reading that cannot be stabilized"] },
    ],
    faqs: [
      { q: "What is the firing order on a Chevy 350?", a: "The standard Gen I Chevrolet 350 small-block firing order is 1-8-4-3-6-5-7-2." },
      { q: "Which side is cylinder 1 on a Chevy 350?", a: "Cylinder 1 is the front cylinder on the driver-side bank. The driver side is numbered 1-3-5-7 from front to rear." },
      { q: "Which direction does a Chevy HEI distributor turn?", a: "A conventional Chevrolet small-block HEI distributor rotor turns clockwise when viewed from above." },
      { q: "Where is the No. 1 terminal on the distributor cap?", a: "There is no safe universal clock position. Bring cylinder 1 to compression TDC and use the terminal directly above the rotor as the installed No. 1 position." },
      { q: "Is the Chevy 350 firing order the same as an LS1?", a: "No. The traditional Gen I 350 uses 1-8-4-3-6-5-7-2. Later LS-family engines use a different firing order and cylinder architecture." },
    ],
    sources: [chevrolet350290, chevroletRamJet], reviewed: "2026-08-14",
  },
  {
    slug: "chevrolet/350/oil-capacity",
    keyword: "chevy 350 oil capacity",
    make: "Chevrolet",
    model: "350 Small-Block (5.7L V8)",
    category: "Fluid Capacities",
    title: "Chevy 350 Oil Capacity by Pan and Engine Version",
    metaDescription: "Chevy 350 oil capacity chart for 350 HO, 350/290, and Ram Jet 350 engines, with filter, dipstick, priming, and fill-level guidance.",
    answer: "Chevrolet Performance documents a 4-quart oil pan for the 350 HO and 350/290 crate engines, while the Ram Jet 350 has a 5-quart capacity excluding the oil filter. The installed pan, filter, dipstick system, and vehicle angle determine the correct final fill, so always verify the level on the matched dipstick.",
    detail: "Do not assume that every Chevy 350 still has its original oil pan. Swaps commonly use different sump locations, pan depths, filters, remote filter systems, and dipstick arrangements.",
    scope: "Capacities shown are for the named Chevrolet Performance configurations. A production engine or modified oiling system must be matched by pan part number and dipstick calibration.",
    values: [
      { label: "350 HO oil pan", value: "4 qt / 3.8 L", note: "Chevrolet lists a four-quart pan" },
      { label: "350/290 oil pan", value: "4 qt / 3.8 L", note: "Chevrolet lists a four-quart pan" },
      { label: "Ram Jet 350", value: "5 qt / 4.7 L", note: "Excluding oil filter" },
      { label: "Final authority", value: "Matched dipstick FULL mark", note: "Check level after filter fill and settling" },
    ],
    diagram: { type: "oil", title: "Interactive oil-fill workflow", caption: "Follow the stages from empty pan to final dipstick verification. Capacity is a starting quantity, not permission to overfill.", points: ["identify", "prefill", "prime", "run", "settle", "verify"] },
    intro: [
      "Oil capacity is a property of the installed oiling system, not displacement alone. The Chevrolet 350 has been fitted with shallow and deep pans, front and rear sumps, different filter sizes, oil coolers, and remote-filter plumbing.",
      "Use a documented capacity to begin the fill, then make the dipstick the final check—provided the dipstick and tube are known to match the pan. A mismatched dipstick can give a convincing but incorrect reading.",
    ],
    steps: [
      "Identify the engine version and oil-pan part or measure the pan if the installation history is unknown.",
      "Verify that the dipstick, tube, and pan are a matched set and that the vehicle is level.",
      "Install the correct filter and drain plug; prefill the filter only when its orientation and manufacturer instructions allow.",
      "Add slightly less than the documented starting capacity, then prime a newly built or long-stored engine before cranking.",
      "Start the engine, confirm oil pressure immediately, inspect for leaks, and shut it down.",
      "Allow oil to drain back, check the dipstick, and add in small increments to the FULL mark without overfilling.",
    ],
    sections: [
      { heading: "Does four quarts include the filter?", paragraphs: ["The Chevrolet 350 HO and 350/290 guides describe the oil pan as four-quart rather than giving one universal total refill quantity. Filter size and system plumbing add volume. The Ram Jet guide explicitly states five quarts excluding the filter."] },
      { heading: "Oil grade and break-in", paragraphs: ["Chevrolet's 350 HO guide calls for 10W-30 non-synthetic oil during break-in and permits synthetic after the second recommended oil change. The Ram Jet 350 guide specifies 5W-30. Follow the exact engine builder's break-in and oil requirements, especially with a flat-tappet camshaft."] },
      { heading: "Signs the pan and dipstick may not match", bullets: ["Level changes dramatically with the stated capacity", "Dipstick hits the pan or will not seat", "Full mark sits above the pan rail", "Unknown swap or aftermarket pan", "Aerated oil, unstable pressure, or windage symptoms after filling"] },
    ],
    faqs: [
      { q: "How many quarts of oil does a Chevy 350 take?", a: "It depends on the installed pan and filter. Chevrolet documents four-quart pans for the 350 HO and 350/290, while Ram Jet 350 is five quarts excluding the filter." },
      { q: "Does the oil filter add capacity?", a: "Yes. Filter size and any remote lines or cooler add system volume, which is why the final level must be checked on the matched dipstick." },
      { q: "What oil does a Chevrolet 350/290 use?", a: "The Chevrolet 350/290 guide identifies 10W-30 and gives separate break-in guidance. Use the engine builder's current recommendation for your climate and camshaft." },
      { q: "Can I trust the dipstick on an engine swap?", a: "Only after confirming that the pan, tube, and dipstick are a matched system. Swap parts are frequently mixed." },
      { q: "Should a rebuilt Chevy 350 be primed before starting?", a: "Yes. Chevrolet's crate-engine guides require the oiling system to be primed before initial start." },
    ],
    sources: [chevrolet350Ho, chevrolet350290, chevroletRamJet], reviewed: "2026-08-14",
  },
  {
    slug: "chevrolet/350/ignition-timing",
    keyword: "chevy 350 timing specs",
    make: "Chevrolet",
    model: "350 Small-Block (5.7L V8)",
    category: "Timing & Ignition",
    title: "Chevy 350 Timing Specs: Initial, Mechanical, and Total",
    metaDescription: "Chevy 350 timing specs for 350 HO, 350/290, and Ram Jet 350, including vacuum-disconnect procedure and total timing checks.",
    answer: "Chevy 350 timing is calibration-specific. Chevrolet sets the 350 HO to 32° BTDC total at 4,000 rpm with vacuum advance disconnected and plugged; the 350/290 uses 32° BTDC at 3,000 rpm under the same condition. Ram Jet 350 uses 12° BTDC base timing in ECM service mode.",
    detail: "Do not combine one engine's initial setting with another engine's total-advance target. The distributor curve, combustion chamber, compression ratio, fuel, load, and control system all affect the safe calibration.",
    scope: "The values apply to the named Chevrolet Performance crate calibrations. Production emissions engines and modified builds require their own service or tuner data.",
    values: [
      { label: "350 HO total timing", value: "32° BTDC @ 4,000 rpm", note: "Vacuum advance disconnected and plugged" },
      { label: "350/290 total timing", value: "32° BTDC @ 3,000 rpm", note: "Vacuum advance disconnected and plugged" },
      { label: "Ram Jet 350 base timing", value: "12° BTDC", note: "ECM placed in service mode" },
      { label: "Cylinder used", value: "No. 1", note: "Front cylinder, driver-side bank" },
    ],
    diagram: { type: "timing", title: "Interactive timing-curve comparison", caption: "Select a calibration point to compare initial or total timing. The chart is not a generic performance-tuning recommendation.", points: ["12° base", "32° @ 3000", "32° @ 4000"] },
    intro: [
      "Ignition timing describes when the spark occurs relative to piston position. Initial timing is measured near idle; mechanical advance adds timing with rpm; vacuum advance adds part-load timing; total timing usually means initial plus mechanical advance with vacuum advance disconnected.",
      "Those terms must stay separate. A value intended as total timing at 3,000 or 4,000 rpm should not be set as initial timing at idle.",
    ],
    steps: [
      "Confirm the engine calibration, firing order, timing-tab and balancer compatibility, fuel grade, and distributor or ECU type.",
      "Warm the engine, connect a timing light to cylinder 1, and stabilize idle according to the applicable manual.",
      "For the carbureted Chevrolet crate procedures, disconnect and plug the distributor vacuum-advance hose.",
      "Raise rpm slowly and verify that the timing mark advances smoothly and stops at the specified total value and rpm.",
      "Loosen the distributor clamp only enough to rotate the housing; counterclockwise advances a conventional Chevy small-block distributor, clockwise retards it.",
      "Tighten the clamp, repeat the reading, reconnect the system, and check for detonation or abnormal behavior under controlled load.",
    ],
    sections: [
      { heading: "Initial timing versus total timing", paragraphs: ["Initial timing is the starting point at idle. Mechanical advance is built into the distributor and increases timing with speed. Total timing is the sum of initial and mechanical advance once the centrifugal curve is fully in. Vacuum advance is normally excluded from the quoted wide-open-throttle total."] },
      { heading: "Verify the timing marks before tuning", paragraphs: ["Small-block Chevrolet engines can use different balancer diameters and timing-tab locations. A mismatched tab and balancer or slipped outer ring produces a false reading. Confirm true top dead center when the hardware history is unknown."] },
      { heading: "What changes the best setting?", bullets: ["Cylinder-head chamber and compression ratio", "Camshaft and dynamic compression", "Fuel octane and mixture", "Distributor curve or ECU calibration", "Load, gearing, temperature, and altitude", "Combustion knock margin"] },
    ],
    faqs: [
      { q: "What should timing be on a Chevy 350?", a: "There is no single universal setting. Chevrolet specifies 32° total at 4,000 rpm for the 350 HO, 32° total at 3,000 rpm for the 350/290, and 12° base in service mode for Ram Jet 350." },
      { q: "Is 32 degrees initial or total timing?", a: "In the cited 350 HO and 350/290 manuals, 32° is total timing at the stated rpm with vacuum advance disconnected—not idle timing." },
      { q: "Do I disconnect vacuum advance when setting timing?", a: "The cited Chevrolet carbureted crate procedures say to disconnect and plug it when checking their total timing. Follow the exact calibration procedure for other engines." },
      { q: "Why does my timing mark not line up?", a: "The balancer and timing tab may be mismatched, the balancer ring may have slipped, or true TDC may not match the displayed mark." },
      { q: "Which way advances a Chevy 350 distributor?", a: "For the conventional small-block distributor, rotating the distributor body counterclockwise advances timing; clockwise retards it." },
    ],
    sources: [chevrolet350Ho, chevrolet350290, chevroletRamJet], reviewed: "2026-08-14",
  },
  {
    slug: "chevrolet/350/valve-lash-adjustment",
    keyword: "chevy 350 valve lash adjustment",
    make: "Chevrolet",
    model: "350 Small-Block (5.7L V8)",
    category: "Valve Specifications",
    title: "Chevy 350 Valve Lash Adjustment: Hydraulic and Solid Lifters",
    metaDescription: "Chevy 350 valve adjustment guide covering zero lash, hydraulic preload, solid-lifter cam cards, firing-order method, and common mistakes.",
    answer: "Valve adjustment depends on lifter type. Chevrolet specifies 1/8 turn past zero lash for its hydraulic-flat-tappet 350/290 and 3/4 turn past zero lash for Ram Jet 350. COMP Cams describes an ideal hydraulic plunger preload of 0.030 ± 0.010 inch for its applicable lifters. Solid-lifter lash must come from the cam card, usually at the stated hot or cold condition.",
    detail: "Turns past zero lash are meaningful only when rocker-stud thread pitch and valvetrain parts match the procedure. Never apply a hydraulic-preload method to solid lifters.",
    scope: "This guide explains the decision process and cites two Chevrolet crate-engine examples. The camshaft and lifter manufacturer remains the final authority for a modified engine.",
    values: [
      { label: "350/290 hydraulic setting", value: "1/8 turn past zero lash", note: "Chevrolet crate-engine specification" },
      { label: "Ram Jet 350 hydraulic setting", value: "3/4 turn past zero lash", note: "Chevrolet crate-engine specification" },
      { label: "COMP hydraulic target", value: "0.030 ± 0.010 in preload", note: "For applicable COMP lifters" },
      { label: "Solid lifter", value: "Use cam card", note: "Hot/cold condition and intake/exhaust may differ" },
    ],
    diagram: { type: "valve", title: "Interactive valve-adjustment cycle", caption: "Follow each cylinder in firing order and adjust only when that cylinder's lifters are on the cam's base circle.", points: ["1", "8", "4", "3", "6", "5", "7", "2"] },
    intro: [
      "Valve lash and hydraulic preload are not interchangeable terms. A solid lifter needs running clearance between parts; a hydraulic lifter needs its internal plunger positioned within its operating range after all free clearance is removed.",
      "Before adjusting anything, identify the camshaft and lifter type. If the engine's parts history is unknown, remove a valve cover and investigate rather than assuming that every 350 uses the same number of turns.",
    ],
    steps: [
      "Confirm hydraulic flat tappet, hydraulic roller, solid flat tappet, or solid roller lifters and obtain the cam or lifter instructions.",
      "Remove the valve covers, disable ignition, and rotate the engine by hand in its normal direction.",
      "Place cylinder 1 at compression TDC so both lifters are on the base circle.",
      "For a hydraulic setup, gently remove free play while spinning or moving the pushrod; the point at which clearance disappears is zero lash, not final preload.",
      "Turn the adjuster the specified amount past zero lash. For a solid setup, use the specified feeler gauge at the stated hot or cold condition.",
      "Rotate the crank 90 degrees and move through the 1-8-4-3-6-5-7-2 firing order, adjusting both valves for each cylinder at compression TDC.",
      "Recheck several positions, install the covers, and verify quiet operation, stable vacuum, and full cylinder contribution.",
    ],
    sections: [
      { heading: "How to identify zero lash", paragraphs: ["Zero lash is the point where free clearance has just been removed while the lifter remains on the cam's base circle. Crushing the plunger while searching for resistance can create a false zero point. Use light finger pressure and repeat the check if uncertain."] },
      { heading: "Why the number of turns varies", bullets: ["Rocker-stud thread pitch", "Available lifter plunger travel", "Cam and lifter manufacturer's preload target", "Pushrod length and valvetrain geometry", "Production versus aftermarket rocker system"] },
      { heading: "Common adjustment mistakes", bullets: ["Adjusting on the cam lobe instead of the base circle", "Confusing zero lash with zero preload", "Using hydraulic instructions on solid lifters", "Setting hot lash on a cold engine without the cam maker's correction", "Masking a bent pushrod or worn cam lobe with extra adjustment"] },
    ],
    faqs: [
      { q: "How many turns past zero lash for a Chevy 350?", a: "It depends on the exact valvetrain. Chevrolet specifies 1/8 turn on the 350/290 example and 3/4 turn on Ram Jet 350, proving that one universal turn count is unsafe." },
      { q: "What is zero lash?", a: "Zero lash is the point where free clearance has just disappeared between the valvetrain parts while the lifter is on the cam base circle." },
      { q: "Can solid lifters be adjusted like hydraulic lifters?", a: "No. Solid lifters require a measured clearance from the cam card, usually specified for a hot or cold engine." },
      { q: "Can I adjust all Chevy 350 valves at TDC number 1?", a: "Some procedures adjust selected valves in two crank positions, but the firing-order method is easier to verify: adjust each cylinder when it is at compression TDC." },
      { q: "What happens with too much hydraulic preload?", a: "Excess preload can hold a valve off its seat, causing rough idle, low compression, low vacuum, misfire, or valve damage." },
    ],
    sources: [chevrolet350290, chevroletRamJet, compValve], reviewed: "2026-08-14",
  },
  {
    slug: "chevrolet/350/main-cap-torque",
    keyword: "chevy 350 main cap torque specs",
    make: "Chevrolet",
    model: "350 Small-Block (5.7L V8)",
    category: "Torque Specs",
    title: "Chevy 350 Main Cap Torque Specs: Two-Bolt and Four-Bolt Blocks",
    metaDescription: "Chevy 350 main cap torque reference for Chevrolet Performance four-bolt blocks, with inner/outer values, sequence, lubricant, and bore checks.",
    answer: "For the cited Chevrolet Performance 350 HO and 350/290 four-bolt-intermediate-main blocks, the crankshaft bearing-cap fasteners are specified at 70 lb-ft (95 N·m) for the inner bolts and 65 lb-ft (88 N·m) for the outer bolts. Aftermarket studs, splayed caps, and alternate lubricants require the fastener or machine shop specification.",
    detail: "Main fastener torque is part of the block's machining state. Changing from bolts to studs or changing lubricant can alter housing-bore geometry, so align honing may be required.",
    scope: "Values shown apply to the production-style fasteners in the cited Chevrolet crate engines. A two-bolt block has no outer main bolts; aftermarket builds must follow their hardware and machining records.",
    values: [
      { label: "Inner main fasteners", value: "70 lb-ft / 95 N·m", note: "350 HO and 350/290 guides" },
      { label: "Outer main fasteners", value: "65 lb-ft / 88 N·m", note: "Four-bolt intermediate caps only" },
      { label: "Two-bolt block", value: "No outer fasteners", note: "Confirm exact block/service data" },
      { label: "Aftermarket studs/caps", value: "Manufacturer + machinist spec", note: "May require align-hone verification" },
    ],
    diagram: { type: "main", title: "Interactive main-cap tightening layout", caption: "Work from the center main toward the ends in stages, tightening inner fasteners before the corresponding outers unless the exact procedure says otherwise.", points: ["3 inner", "3 outer", "2 inner", "2 outer", "4 inner", "4 outer", "1 inner", "5 inner"] },
    intro: [
      "The main caps locate and support the crankshaft. Correct clamp load and housing-bore geometry are essential for bearing crush, oil clearance, and crankshaft alignment.",
      "A 'four-bolt main' Chevy 350 generally has additional outer fasteners on the three intermediate caps. The front and rear cap arrangements differ, and aftermarket splayed-cap conversions are a separate machining system.",
    ],
    steps: [
      "Confirm the block casting, cap positions and orientation, fastener type, lubricant, and machine-shop build sheet.",
      "Clean the main saddles, cap registers, fasteners, and holes; never mix caps or reverse their orientation.",
      "Install upper bearings and crankshaft with assembly lubricant on bearing surfaces but keep bearing backs clean and dry.",
      "Seat each cap squarely in its register and start all fasteners by hand.",
      "Tighten in several stages from the center main toward the front and rear, following the exact inner/outer sequence for the hardware.",
      "At final torque, verify crankshaft rotation and measure bearing clearance and crankshaft endplay with appropriate tools.",
    ],
    sections: [
      { heading: "Why studs can require machine work", paragraphs: ["Studs load the block threads and caps differently from production bolts. A block machined with one fastener system may not hold the same housing-bore geometry after a change. The machine shop should torque the exact final hardware during align-hone measurement."] },
      { heading: "Essential measurements", bullets: ["Main housing-bore size and alignment", "Bearing oil clearance", "Crankshaft journal size and taper", "Crankshaft endplay", "Crankshaft rotation after each torque stage"] },
      { heading: "Stop if the crank binds", paragraphs: ["The crankshaft should not suddenly become difficult to turn as one cap is tightened. A misplaced cap, bearing shell, burr, journal problem, incorrect clearance, or distorted housing bore must be corrected before assembly continues."] },
    ],
    faqs: [
      { q: "What is the main cap torque on a Chevy 350?", a: "Chevrolet specifies 70 lb-ft inner and 65 lb-ft outer for the cited four-bolt 350 HO and 350/290 crate-engine blocks." },
      { q: "Does a two-bolt main Chevy 350 use the outer-bolt value?", a: "No. A two-bolt cap has no outer main fasteners. Use service information for the exact block and bolts." },
      { q: "Can I use the factory torque with ARP main studs?", a: "Use the instructions and lubricant supplied with the exact stud kit. The block may need align-hone verification with those studs installed." },
      { q: "What order should main caps be tightened?", a: "Work from the center main toward the ends in staged passes, while following the exact inner/outer sequence specified for the block and hardware." },
      { q: "Why check crank rotation during tightening?", a: "A change in rotating effort can reveal cap, bearing, clearance, or alignment problems before the engine is fully assembled." },
    ],
    sources: [chevrolet350Ho, chevrolet350290], reviewed: "2026-08-14",
  },
  {
    slug: "chevrolet/350/connecting-rod-bolt-torque",
    keyword: "chevy 350 rod bolt torque specs",
    make: "Chevrolet",
    model: "350 Small-Block (5.7L V8)",
    category: "Torque Specs",
    title: "Chevy 350 Rod Bolt Torque and Stretch Specs",
    metaDescription: "Chevy 350 connecting-rod bolt torque and stretch reference for Chevrolet Performance 3/8-inch powdered-metal rods, plus aftermarket cautions.",
    answer: "For the 3/8-inch powdered-metal connecting rods in the cited Chevrolet Performance 350 HO and SP350/357, Chevrolet prefers 0.006-inch bolt stretch. Its alternate method is 20 lb-ft plus 55°, or 45 lb-ft when an angle gauge is unavailable. These values do not apply to every stock or aftermarket rod bolt.",
    detail: "Rod-bolt stretch is the more direct measure of fastener preload when the bolt maker supplies a stretch target. Bolt diameter alone is not enough to select a torque.",
    scope: "The numbers are tied to the named Chevrolet Performance rod and fastener combination. Use the rod/bolt manufacturer's sheet for ARP, resized stock rods, capscrew rods, or unknown hardware.",
    values: [
      { label: "Preferred method", value: "0.006 in stretch", note: "Chevrolet 3/8-in powdered-metal rod bolt" },
      { label: "Torque-angle alternative", value: "20 lb-ft + 55°", note: "27 N·m + 55°" },
      { label: "Without angle gauge", value: "45 lb-ft / 61 N·m", note: "Chevrolet alternate for cited hardware" },
      { label: "Aftermarket bolt", value: "Use bolt maker's stretch/lube spec", note: "Do not transfer the Chevrolet number" },
    ],
    diagram: { type: "rod", title: "Interactive rod-bolt stretch workflow", caption: "The visual follows the measurement cycle: relaxed length, staged tightening, target stretch, and bore/rotation verification.", points: ["measure", "snug", "torque", "stretch", "verify"] },
    intro: [
      "Connecting-rod bolts experience alternating tensile load every engine revolution. Correct preload keeps the cap clamped to the rod and protects the parting surfaces and bearing bore.",
      "Torque is affected heavily by thread and under-head friction. When a manufacturer publishes a stretch range and the bolt ends are accessible to a stretch gauge, measuring elongation gives a more direct indication of preload.",
    ],
    steps: [
      "Identify the rod and bolt by manufacturer, part number, diameter, material, and whether the fastener is reusable.",
      "Clean and inspect the rod, cap, threads, bolt spot faces, and locating features; keep each cap with its original rod and orientation.",
      "Apply only the specified lubricant to the threads and under-head or nut surface.",
      "Measure and record each bolt's relaxed length if using the stretch method.",
      "Tighten both sides in controlled stages, alternating to draw the cap down evenly.",
      "Measure final stretch or complete the specified torque-angle procedure, then verify rod side clearance, bearing clearance, and free crank rotation.",
      "After disassembly, reject bolts that do not return within the manufacturer's allowable permanent-length limit.",
    ],
    sections: [
      { heading: "Why 45 lb-ft is not universal", paragraphs: ["The Chevrolet 45 lb-ft alternate belongs to a defined powdered-metal rod and 3/8-inch fastener. Different bolt materials, thread pitch, nuts, capscrew designs, and assembly lubricants produce different stretch at the same torque."] },
      { heading: "Torque-angle versus stretch", paragraphs: ["Torque-angle reduces some friction variation by adding a controlled rotation after a seating torque. Direct stretch measurement goes further by checking the bolt's actual elongation. Use whichever validated method the rod or bolt maker specifies."] },
      { heading: "Assembly checks", bullets: ["Cap and rod match marks aligned", "Bearing tangs and shells correctly seated", "Specified lubricant only", "Bolt stretch or angle recorded", "Big-end bore and bearing clearance verified", "Crank rotates freely after each rod pair"] },
    ],
    faqs: [
      { q: "What is Chevy 350 rod bolt torque?", a: "For the cited Chevrolet Performance 3/8-inch powdered-metal rods, Chevrolet prefers 0.006-inch stretch and lists 20 lb-ft plus 55°, or 45 lb-ft without an angle gauge." },
      { q: "Can I use 45 lb-ft on ARP rod bolts?", a: "Not unless the exact ARP instruction says so. Use the part-specific lubricant, torque, and stretch range supplied with the bolt or rod." },
      { q: "Is rod-bolt stretch better than torque?", a: "When the manufacturer provides a stretch target and the bolt can be measured correctly, stretch is a more direct indication of preload than torque alone." },
      { q: "Can connecting-rod bolts be reused?", a: "Reuse depends on bolt design, service history, relaxed-length change, and manufacturer limits. Replace any bolt that exceeds its permanent-stretch limit or has unknown history." },
      { q: "Why alternate between the two rod fasteners?", a: "Alternating staged tightening helps seat the cap evenly and reduces the chance of distorting the big-end bore." },
    ],
    sources: [chevrolet350Ho, { label: "Chevrolet Performance SP350/357 Deluxe guide", url: "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/performance/resources/installation-guides/crate-engines/02-pdf/sp-350-357-deluxe-19367083.pdf", note: "Primary Chevrolet source for 0.006-inch stretch and the torque-angle alternative." }], reviewed: "2026-08-14",
  },
  {
    slug: "chevrolet/350/lug-nut-torque",
    keyword: "chevy 350 lug nut torque spec",
    make: "Chevrolet",
    model: "350-equipped vehicles",
    category: "Torque Specs",
    title: "Chevy 350 Lug Nut Torque: Match the Vehicle, Not the Engine",
    metaDescription: "Why there is no universal Chevy 350 lug nut torque, what vehicle details determine wheel torque, and the correct star-pattern tightening method.",
    answer: "There is no single Chevy 350 lug nut torque specification. “350” identifies an engine family, while lug-nut torque is determined by the vehicle year and model, wheel and seat design, stud diameter and thread, and the wheel manufacturer's instructions.",
    detail: "A 350 engine appeared in many Chevrolet cars, trucks, vans, and swaps with different hubs and wheels. Using an engine-based wheel torque could damage studs or leave the wheel under-clamped.",
    scope: "This page resolves the keyword safely and explains how to find the exact wheel-fastener specification. It intentionally does not invent one torque value for every 350-powered vehicle.",
    values: [
      { label: "Engine", value: "Does not set wheel torque", note: "The 350 identifies the powerplant" },
      { label: "Required identifier", value: "Year + model", note: "Start with the vehicle owner/service manual" },
      { label: "Also confirm", value: "Wheel + stud + seat", note: "Aftermarket wheels may specify different hardware" },
      { label: "Tightening pattern", value: "Crisscross / star", note: "Seat the wheel evenly" },
    ],
    diagram: { type: "wheel", title: "Interactive five-lug tightening pattern", caption: "Select each lug in numerical order. For six- or eight-lug hubs, use the vehicle manual's opposing pattern.", points: ["1", "2", "3", "4", "5"] },
    intro: [
      "Searching by engine alone cannot produce a reliable wheel torque value. A Camaro, C/K pickup, Corvette, van, hot rod, or engine-swapped vehicle can all use a Chevrolet 350 while having completely different wheel studs and lug seats.",
      "The safe answer starts with the chassis. Identify the vehicle, then confirm whether the wheels and hardware are original. If the car uses aftermarket wheels, check both the wheel maker's instructions and the vehicle's stud limits.",
    ],
    steps: [
      "Identify the vehicle year, exact model, axle or hub option, and whether the wheels are factory or aftermarket.",
      "Confirm stud diameter, thread pitch, lug seat style, and lug-nut type.",
      "Find the specified torque in the owner manual, factory service information, or wheel manufacturer's instructions.",
      "Clean mating surfaces and inspect studs and nuts; replace stretched, galled, cracked, or mismatched hardware.",
      "Seat the wheel by hand, snug the nuts in a star or opposing pattern, lower the tire enough to prevent rotation, then apply final torque with a calibrated wrench.",
      "Follow the wheel or vehicle maker's recheck instruction after initial service.",
    ],
    sections: [
      { heading: "What determines lug-nut torque?", bullets: ["Stud diameter, pitch, grade, and condition", "Lug seat geometry: conical, ball, or flat/mag", "Steel versus aluminum wheel design", "Factory versus aftermarket wheel instructions", "Dry or otherwise specified thread condition"] },
      { heading: "Why impact-gun tight is not a specification", paragraphs: ["An impact wrench is useful for removal and controlled run-down, but its sound or elapsed hammer time does not measure clamp load. Final tightening should be completed with a calibrated torque wrench using the specified sequence and thread condition."] },
      { heading: "The fastest route to the correct number", paragraphs: ["Use the VIN and chassis information—not the engine casting—to locate the correct owner or service manual. On a swap, identify the donor hubs or axle and the wheel manufacturer before choosing a value."] },
    ],
    faqs: [
      { q: "What is the lug nut torque for a Chevy 350?", a: "A Chevy 350 has no engine-based lug-nut torque. The correct value belongs to the vehicle's hubs, studs, wheels, and lug nuts." },
      { q: "Can two vehicles with Chevy 350 engines use different wheel torque?", a: "Yes. The same engine can be installed in cars, trucks, vans, and custom builds with different wheel hardware." },
      { q: "Should lug-nut threads be lubricated?", a: "Use the thread condition specified by the vehicle or wheel manufacturer. Adding lubricant when a dry value is specified changes clamp load and can over-stress the stud." },
      { q: "Can I tighten lug nuts with an impact wrench?", a: "An impact may be used for controlled run-down if allowed, but final torque should be applied with a calibrated torque wrench in the correct pattern." },
      { q: "Where do I find the exact specification?", a: "Check the owner manual or factory service information for the exact year and model. For aftermarket wheels, also follow the wheel and hardware manufacturer's instructions." },
    ],
    sources: [{ label: "Chevrolet owner manuals and support", url: "https://www.chevrolet.com/support/vehicle/manuals-guides", note: "Select the exact vehicle year and model for wheel-fastener information." }], reviewed: "2026-08-14",
  },
  {
    slug: "chevrolet/350/spark-plug-gap",
    keyword: "chevy 350 spark plug gap",
    make: "Chevrolet",
    model: "350 Small-Block (5.7L V8)",
    category: "Ignition Specs",
    title: "Chevy 350 Spark Plug Gap by Engine and Ignition",
    metaDescription: "Chevy 350 spark plug gap chart for Chevrolet Performance 350/290 and Ram Jet 350, plus plug selection and gapping guidance.",
    answer: "A Chevy 350 does not have one universal plug gap. Chevrolet specifies 0.045 in (1.14 mm) for the 350/290 with the recommended AC R45TS plug and HEI, while the Ram Jet 350 specification is 0.040 in (1.02 mm) with an AC MR43LTS plug. Match the exact engine and ignition before gapping.",
    detail: "Older original engines, points ignition, emissions calibrations, aftermarket aluminum heads, boosted combinations, and modern electronic ignition systems may require different plug designs and gaps.",
    scope: "The table presents primary-source Chevrolet Performance crate-engine specifications, not a universal setting for every production or modified 350.",
    values: [
      { label: "350/290 + HEI", value: "0.045 in / 1.14 mm", note: "AC R45TS in Chevrolet guide" },
      { label: "Ram Jet 350", value: "0.040 in / 1.02 mm", note: "AC MR43LTS in Chevrolet guide" },
      { label: "350 HO", value: "Verify plug/application", note: "Guide recommends AC R44LTS; confirm gap for ignition" },
      { label: "Modified engine", value: "Builder/plug-maker spec", note: "Compression, boost, fuel, and ignition matter" },
    ],
    diagram: { type: "spark", title: "Interactive spark-plug gap guide", caption: "Choose the documented engine example to compare the electrode gap. Do not force fine-wire electrodes.", points: [".045 in", ".040 in", "verify"] },
    intro: [
      "Spark-plug gap affects the voltage required to jump the electrodes and ignite the mixture. Too wide a gap can cause misfire when cylinder pressure rises; too narrow a gap reduces the size of the initial flame kernel.",
      "The familiar 'Chevy 350' name covers decades of cylinder heads and ignition systems. Start with the engine's actual plug part number and ignition package, then use the corresponding manufacturer specification.",
    ],
    steps: [
      "Identify the engine version, cylinder-head plug seat and reach, ignition system, and recommended plug part number.",
      "Check each new plug with a wire-style gap gauge; do not rely only on the box label.",
      "Adjust only the ground electrode and support it with the proper tool. Never pry against the center electrode or insulator.",
      "Inspect the seat and threads, then install the plug using the plug or cylinder-head manufacturer's torque instructions.",
      "After running, evaluate misfire data or plug condition only in the context of fuel mixture, timing, heat range, and engine load.",
    ],
    sections: [
      { heading: "Why Chevy 350 gaps differ", bullets: ["HEI, points, capacitive-discharge, and ECU-controlled ignition output", "Iron versus aluminum cylinder heads and plug design", "Compression ratio, boost, fuel, and cylinder pressure", "Plug reach, seat style, heat range, and electrode material"] },
      { heading: "Do not re-gap every modern plug aggressively", paragraphs: ["Fine-wire platinum or iridium electrodes are easier to damage than traditional nickel plugs. Verify the plug manufacturer's adjustment policy and move only the ground strap in small increments."] },
      { heading: "Gap is only one part of a tune-up", paragraphs: ["A correct gap cannot compensate for excessive wire resistance, a damaged cap or rotor, weak coil voltage, incorrect timing, poor grounds, rich or lean mixture, or low cylinder compression."] },
    ],
    faqs: [
      { q: "Is every Chevy 350 spark plug gap 0.035 inch?", a: "No. That commonly repeated value does not cover every ignition or engine. Chevrolet documents 0.045 inch for the 350/290 HEI example and 0.040 inch for Ram Jet 350." },
      { q: "What gap does a Chevrolet 350/290 use?", a: "Chevrolet Performance specifies 0.045 inch with the recommended AC R45TS plug in its 350/290 guide." },
      { q: "What gap does a Ram Jet 350 use?", a: "The Chevrolet Performance Ram Jet 350 guide specifies 0.040 inch with an AC MR43LTS plug." },
      { q: "Does HEI change the required plug gap?", a: "Ignition energy is one factor in gap selection, but use the exact engine and plug specification instead of choosing a gap from ignition type alone." },
      { q: "Can I change the gap on iridium plugs?", a: "Follow the plug manufacturer's directions. Fine-wire center electrodes can be damaged if the tool contacts or loads them." },
    ],
    sources: [chevrolet350290, chevroletRamJet, chevrolet350Ho], reviewed: "2026-08-14",
  },
  {
    slug: "chevrolet/350/intake-manifold-torque",
    keyword: "chevy 350 intake manifold torque specs",
    make: "Chevrolet",
    model: "350 Small-Block (5.7L V8)",
    category: "Torque Specs",
    title: "Chevy 350 Intake Manifold Torque Specs and Sequence",
    metaDescription: "Chevy 350 intake manifold torque chart, center-out tightening sequence, Vortec differences, sealant notes, and installation checklist.",
    answer: "Chevrolet Performance lists an 11 lb-ft (15 N·m) final intake-manifold bolt torque for its 350/290 and SP350/357 crate-engine combinations. That value is not universal: traditional 12-bolt heads, eight-bolt Vortec heads, manifold material, gasket design, bolt kit, lubricant, and the intake manufacturer's instructions can change the procedure.",
    detail: "Use the final value supplied with the exact manifold and gasket whenever it differs from a generic engine chart. Tighten gradually from the center outward to distribute gasket load.",
    scope: "The documented 11 lb-ft value applies to the cited Chevrolet Performance crate combinations. Aftermarket manifold instructions supersede it for their components.",
    values: [
      { label: "Chevrolet 350/290", value: "11 lb-ft / 15 N·m", note: "Final pass in Chevrolet guide" },
      { label: "SP350/357", value: "11 lb-ft / 15 N·m", note: "Final pass in Chevrolet guide" },
      { label: "Vortec pattern", value: "8 vertical bolts", note: "Use Vortec manifold instructions" },
      { label: "Traditional pattern", value: "12 angled bolts", note: "Use exact manifold/gasket instructions" },
    ],
    diagram: { type: "intake", title: "Interactive center-out intake sequence", caption: "The visual shows the tightening principle, not a substitute for the numbered diagram supplied with the manifold.", points: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] },
    intro: [
      "Intake leaks can pull oil or unmetered air into the engine and may allow coolant leaks at the end ports. Correct surface preparation, gasket alignment, sealant placement, tightening order, and final torque all matter.",
      "Before reaching for a torque wrench, identify whether the heads use the traditional angled 12-bolt pattern or the later Vortec eight-bolt pattern. Then match the intake manifold, gasket, bolts, and manufacturer procedure as a set.",
    ],
    steps: [
      "Disconnect the battery, drain coolant below the intake level, and label every hose and ignition connection.",
      "Remove the old manifold without prying against sealing rails; block the lifter valley and clean the mating surfaces without dropping debris into the engine.",
      "Dry-fit the manifold to verify port, bolt, distributor, and accessory alignment.",
      "Install the specified gaskets and sealant. Edelbrock commonly directs installers to use RTV at the end rails rather than the supplied end seals for its manifolds.",
      "Start every fastener by hand with the specified washers and thread sealant where bolts enter coolant or the lifter valley.",
      "Tighten in two or more gradual passes from the center outward, then make the final pass to the manifold-specific value.",
      "Allow sealant to cure as directed, refill coolant, set the distributor/timing, and inspect for vacuum, oil, and coolant leaks.",
    ],
    sections: [
      { heading: "Traditional versus Vortec intake patterns", paragraphs: ["Traditional Gen I heads normally use six angled bolts per head. Vortec heads use four more-upright bolts per head and require a matching manifold. Bolt count and angle are visible clues, but casting number and manifold application are the final checks."] },
      { heading: "What changes the torque value?", bullets: ["Aluminum versus cast-iron manifold", "Traditional or Vortec bolt pattern", "Gasket construction and compression stops", "Bolt and washer kit", "Thread lubricant or sealant", "Manufacturer-specific installation instructions"] },
      { heading: "Leak-prevention checks", bullets: ["Clean, flat mating surfaces", "Correct front and rear RTV bead", "Aligned coolant ports", "Hardened washers under aluminum-manifold bolt heads", "No overtightened NPT fittings", "Timing and coolant level rechecked after installation"] },
    ],
    faqs: [
      { q: "What is the Chevy 350 intake manifold torque?", a: "Chevrolet lists 11 lb-ft (15 N·m) for its 350/290 crate-engine combination. Other manifolds and head patterns may specify a different value, so use the component instructions." },
      { q: "Do I tighten a Chevy 350 intake from the center out?", a: "Yes. Tightening gradually from the center toward the ends helps spread gasket load. Follow the numbered sequence supplied with the manifold." },
      { q: "Is a Vortec intake torque procedure different?", a: "It can be. Vortec heads use an eight-bolt, more-upright pattern and require the correct manifold, gasket, and manufacturer procedure." },
      { q: "Should intake bolts use thread sealant?", a: "Use sealant where the exact instructions identify bolts that enter coolant, oil, or the lifter valley. Do not apply a generic lubricant because it changes torque-tension." },
      { q: "Should I use the rubber end seals?", a: "Follow the gasket and manifold instructions. Several Edelbrock small-block applications direct installers to use RTV beads instead of end-seal gaskets." },
    ],
    sources: [chevrolet350290, { label: "Chevrolet Performance SP350/357 Deluxe guide", url: "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/performance/resources/installation-guides/crate-engines/02-pdf/sp-350-357-deluxe-19367083.pdf", note: "Primary Chevrolet guide with an 11 lb-ft intake-manifold final pass." }, edelbrockIntake], reviewed: "2026-08-14",
  },
  {
    slug: "chevrolet/350/cylinder-head-torque",
    keyword: "chevy 350 cylinder head torque specs",
    make: "Chevrolet",
    model: "350 Small-Block (5.7L V8)",
    category: "Torque Specs",
    title: "Chevy 350 Cylinder Head Torque Specs and Pattern",
    metaDescription: "Chevy 350 head bolt torque reference, center-out tightening pattern, sealant and fastener cautions for small-block 5.7L engines.",
    answer: "Chevrolet Performance specifies 65 lb-ft (88 N·m) for the cylinder-head bolts on its 350 HO, 350/290, and SP350/357 crate engines using the documented production-style fasteners and procedure. Aftermarket bolts or studs, aluminum heads, different gaskets, and alternate lubricants require the component manufacturer's specification.",
    detail: "A torque number is valid only with its fastener, lubricant or sealant, washer, gasket, and tightening sequence. Head bolts that enter coolant passages require the approved thread sealer specified for the build.",
    scope: "The 65 lb-ft reference is tied to the cited Chevrolet Performance crate-engine manuals. Do not transfer it to ARP hardware or an aftermarket cylinder head without its instructions.",
    values: [
      { label: "350 HO production-style bolts", value: "65 lb-ft / 88 N·m", note: "Chevrolet Performance specification" },
      { label: "350/290 production-style bolts", value: "65 lb-ft / 88 N·m", note: "Chevrolet Performance specification" },
      { label: "SP350/357 production-style bolts", value: "65 lb-ft / 88 N·m", note: "Chevrolet Performance specification" },
      { label: "Aftermarket bolts/studs", value: "Use fastener maker's spec", note: "Lube and hardware change clamp load" },
    ],
    diagram: { type: "head", title: "Interactive center-out head-bolt pattern", caption: "Select the numbered positions to visualize a balanced center-out pattern. Use the exact head manufacturer's diagram for final assembly.", points: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"] },
    intro: [
      "Cylinder-head clamping seals combustion pressure, coolant, and oil across a large deck surface. Uneven tightening can distort the head or gasket and contribute to sealing failure.",
      "The safest workflow is to identify the block and head castings, gasket, fastener kit, and thread treatment before assembly. Use several incremental passes in the exact numbered pattern supplied with the head or service manual.",
    ],
    steps: [
      "Verify block and head flatness, clean the deck and bolt holes, and chase threads only with the correct cleaning tool.",
      "Blow out blind holes safely; trapped oil or coolant can hydraulically crack the block or create a false torque reading.",
      "Place the correct gasket in the marked orientation and lower the head without sliding it across the fire rings.",
      "Apply only the thread sealer or lubricant specified for the chosen fasteners, including the underside of bolt heads or washers when directed.",
      "Start all bolts by hand, then tighten in the exact center-out sequence through multiple equal stages.",
      "Complete any angle step, heat-cycle retorque, or no-retorque instruction required by the gasket and fastener manufacturers.",
    ],
    sections: [
      { heading: "Why aftermarket hardware changes the number", paragraphs: ["Torque is an indirect way to create fastener stretch. Thread pitch, material, washer friction, and lubricant determine how much of the applied torque becomes clamp load. A value written for production bolts can over- or under-load a stud kit."] },
      { heading: "Preparation checklist", bullets: ["Correct head and gasket for bore and coolant passages", "Clean, flat deck and head surfaces", "Clean, dry bolt holes with no trapped fluid", "Known fasteners with matching washers", "Specified sealer or assembly lubricant", "Calibrated torque wrench and angle gauge if required"] },
      { heading: "When to stop", paragraphs: ["Stop if a bolt feels soft, continues turning without increasing torque, bottoms early, pulls threads, or gives a reading that differs sharply from adjacent bolts. Diagnose the thread, fastener length, and hole condition before continuing."] },
    ],
    faqs: [
      { q: "What is the head bolt torque on a Chevy 350?", a: "Chevrolet Performance lists 65 lb-ft (88 N·m) for production-style bolts on the cited 350 HO, 350/290, and SP350/357 crate engines." },
      { q: "Can I use 65 lb-ft with ARP bolts or studs?", a: "Not automatically. Use the ARP instruction supplied for the exact kit, including its specified lubricant and tightening sequence." },
      { q: "Do Chevy 350 head bolts need sealer?", a: "Some small-block head-bolt holes communicate with coolant. Apply the exact thread sealer specified by the engine, head, gasket, or fastener instructions." },
      { q: "Should head bolts be tightened in stages?", a: "Yes. Multiple incremental passes in a center-out pattern distribute clamp load more evenly than jumping directly to final torque." },
      { q: "Do cylinder heads need to be retorqued?", a: "That depends on the gasket, head material, and fastener instructions. Follow the component manufacturers; do not assume every modern gasket requires retorque." },
    ],
    sources: [chevrolet350Ho, chevrolet350290, { label: "Chevrolet Performance SP350/357 Deluxe guide", url: "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/performance/resources/installation-guides/crate-engines/02-pdf/sp-350-357-deluxe-19367083.pdf", note: "Primary Chevrolet guide listing 65 lb-ft for cylinder-head bolts." }], reviewed: "2026-08-14",
  },
];
