import type { ContentSection, Source } from "./chevy350-content";

/**
 * Canonical procedure guides.
 *
 * These explainers were previously inlined on every spec page in their family —
 * "How to find compression TDC on cylinder 1" appeared on 61 pages, "Why clean,
 * dry threads matter" on 57, the oil-service set on 46. The material is useful,
 * but pasting it onto dozens of pages made those pages near-duplicates of each
 * other and split the ranking signal across all of them.
 *
 * The text is carried over as written. Spec pages now link here instead.
 */

export type Guide = {
  slug: string;
  title: string;
  metaDescription: string;
  /** Short label used in the on-page "related guides" list. */
  short: string;
  family: "torque" | "firing" | "oil" | "ignition";
  intro: string[];
  /** Numbered method, where this guide carries one. Rendered as HowToStep. */
  procedure?: string[];
  sections: ContentSection[];
  faqs: { q: string; a: string }[];
  sources?: Source[];
  reviewed: string;
};

const reviewed = "2026-08-22";

export const guides: Guide[] = [
  /* ------------------------------------------------------------- torque */
  {
    slug: "clean-dry-threads-and-torque-accuracy",
    title: "Why Clean, Dry Threads Change a Torque Reading",
    short: "Clean, dry threads and torque accuracy",
    metaDescription:
      "Why lubricant, rust or anti-seize on a fastener changes clamp load at the same wrench reading, and what \"clean and dry\" means in a torque specification.",
    family: "torque",
    intro: [
      "A torque specification is not a measurement of how tight a fastener is. It is a measurement of how hard the wrench had to work to turn it — and most of that work goes into overcoming friction, not into stretching the stud. Change the friction and you change the clamp load, even though the wrench clicks at the same number.",
      "This is why manufacturers write \"clean and dry\" into the specification itself rather than as a footnote. It applies to wheel fasteners, cylinder-head bolts, manifold hardware and anything else where a clamp load matters.",
    ],
    sections: [
      {
        heading: "What the wrench is actually measuring",
        paragraphs: [
          "A torque wrench measures resistance to turning; it does not directly measure stud tension. Rust, dirt, damaged plating, oil, grease, or anti-seize changes the relationship between the wrench reading and the actual clamping force. A lubricated fastener can create substantially more tension at the same displayed torque, which is why the owner-manual instruction to keep the threads and seats clean and dry is part of the specification.",
          "The practical consequence is that a lubricated fastener tightened to a dry specification is over-clamped, not merely \"a bit tight.\" On a wheel stud that can mean a stretched or snapped stud; on a head bolt it can mean a distorted bore.",
        ],
      },
      {
        heading: "Preparing the mating surfaces",
        paragraphs: [
          "Clean loose corrosion from the hub face and wheel pad so the wheel can sit flat. Do not grind away sound material or coat the conical or ball seat with lubricant. A tiny amount of corrosion-prevention material may be permitted only on a hub pilot in some manuals; that is different from coating the studs, nut seats, or wheel mounting face.",
          "On a blind bolt hole, clean the hole itself. Oil trapped in a blind hole can hydraulically crack the casting or give a false torque reading, because the wrench ends up working against trapped fluid instead of clamping the joint.",
        ],
      },
      {
        heading: "When lubricant IS specified",
        paragraphs: [
          "Some procedures explicitly call for oiled threads and washer faces — many torque-to-yield cylinder-head sequences do. In that case the lubricant is part of the specification and omitting it under-clamps the joint just as surely as adding it elsewhere over-clamps.",
          "The rule is not \"never lubricate.\" It is that the friction condition stated by the procedure is not optional, in either direction. Locking compound, sealer, oil and dry threads are four different friction conditions and are not interchangeable.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I put anti-seize on wheel studs?",
        a: "Not on a specification written for clean, dry threads. Anti-seize lowers friction, so the same wrench reading produces substantially more stud tension than the engineer intended.",
      },
      {
        q: "What if the threads are rusty?",
        a: "Clean them. Rust raises friction unpredictably, so the wrench reaches its setting before the joint reaches its clamp load. A fastener with damaged threads or plating should be replaced rather than forced.",
      },
      {
        q: "Does this apply to head bolts too?",
        a: "Yes, but read the procedure — many head-bolt sequences specify oiled threads and under-head surfaces. There the lubricant is required, and leaving it off under-clamps the joint.",
      },
          {
        q: "Should lug nuts be torqued wet or dry?",
        a: "Use clean, dry threads and seats unless the exact vehicle or wheel instruction explicitly specifies a lubricant. Lubrication changes clamping force at a given wrench reading.",
      },
    ],
    reviewed,
  },
  {
    slug: "wheel-tightening-pattern-and-staged-passes",
    title: "Wheel Tightening Pattern and Staged Passes",
    short: "Tightening pattern and staged passes",
    metaDescription:
      "Why the star pattern matters, how many passes a wheel needs after removal, and why an impact wrench must not set the final value.",
    family: "torque",
    intro: [
      "The crossing pattern used to tighten a wheel is not a convention or a habit. It is how the wheel is drawn squarely onto the hub, and skipping it can leave a wheel clamped at a slight angle that feels tight and is not.",
    ],
    procedure: [
      "Park on a firm, level surface, set the parking brake, select Park or first gear, and chock the wheel diagonally opposite the one being serviced.",
      "Confirm the model year, platform, wheel type, fastener type, and the exact value from the specification page for your vehicle.",
      "With the vehicle safely supported, clean the hub face, wheel mounting pad, studs, and nut seats. Replace damaged, swollen, cracked, or cross-threaded fasteners.",
      "Install every nut by hand for several full turns. If a nut will not spin on normally, stop and correct the thread problem rather than driving it on with an impact tool.",
      "Snug the fasteners in a star or opposite-side pattern while the wheel is just supported, then lower the vehicle enough to prevent rotation without placing its full weight on a visibly unseated wheel.",
      "Set the torque wrench to the verified specification. Tighten in the illustrated pattern, repeat the pattern once as a confirmation pass, restore tire pressure, and perform the manufacturer's recommended recheck.",
    ],
    sections: [
      {
        heading: "Why the star pattern works",
        paragraphs: [
          "The star pattern is not cosmetic. Moving to a fastener across the center draws the wheel onto the hub evenly and reduces the chance of trapping the wheel at an angle. For a five-lug wheel, follow 1-3-5-2-4 around the circle, or use the numbered interactive diagram on the specification page. For six or eight lugs, continue selecting the fastener approximately opposite the one just tightened.",
        ],
      },
      {
        heading: "How many passes",
        paragraphs: [
          "Use two or three stages when the wheel has been fully removed: hand snug, an intermediate pass, and the final specification. Do not use an impact wrench for the final value. Impact output varies with air pressure, battery state, socket mass, joint friction, and trigger time. It is suitable for gentle run-down only when the nut remains below final torque.",
          "Start every fastener by hand. Cross-threading with a gun is one of the most common ways a wheel joint is destroyed before it is ever torqued.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I use an impact wrench for the final tightening?",
        a: "No. Use it only for controlled run-down below final torque, then finish every fastener with a calibrated hand torque wrench in the correct pattern.",
      },
      {
        q: "Does the pattern matter if I am only checking torque?",
        a: "Yes — follow the complete pattern for a recheck as well, so any fastener that has relaxed is found in the same sequence the others were set in.",
      },
          {
        q: "Do aluminum wheels use a different value?",
        a: "Not automatically. The correct value comes from the vehicle/wheel application and fastener design, not from wheel material alone.",
      },
    ],
    reviewed,
  },
  {
    slug: "when-to-recheck-wheel-torque",
    title: "When and How to Recheck Wheel Torque",
    short: "When and how to recheck torque",
    metaDescription:
      "Why wheel fasteners need a second torque check after service, when to do it, and what a fastener that turns early is telling you.",
    family: "torque",
    intro: [
      "Almost every current manufacturer specifies a torque recheck a short distance after a wheel has been disturbed. It exists because mating surfaces settle — not because the first torque was done badly.",
    ],
    sections: [
      {
        heading: "When a recheck is required",
        paragraphs: [
          "Rechecking is especially important after a wheel change, tire rotation, brake job, new wheel installation, or any work that disturbed the wheel. Heat cycles and small amounts of paint, corrosion, or debris can settle. Perform the recheck at the distance stated by the exact manual or wheel manufacturer; many late-model procedures specify a short post-service interval.",
        ],
      },
      {
        heading: "How to perform it",
        paragraphs: [
          "To recheck, let the brakes and wheels cool, place the torque wrench at the specified value, and follow the complete pattern. Do not loosen each nut first unless the service procedure specifically requires it. If a fastener turns significantly before reaching the setting, inspect the wheel seat, stud, nut, and hub rather than assuming repeated tightening will solve the cause.",
        ],
      },
    ],
    faqs: [
      {
        q: "How far should I drive before rechecking?",
        a: "Use the interval in the manual for your vehicle — commonly a short distance such as 25, 50 or 100 miles after service. The specification page for your vehicle lists its figure.",
      },
      {
        q: "A nut turned before the wrench clicked. Is that normal?",
        a: "No. Significant movement before reaching the setting means the joint lost clamp load. Inspect the seat, stud, nut and hub before simply retightening.",
      },
    ],
    reviewed,
  },
  {
    slug: "torque-wrench-selection-and-accuracy",
    title: "Torque Wrench Selection and Accuracy Checks",
    short: "Tool selection and accuracy check",
    metaDescription:
      "Choosing a torque wrench whose range suits the specification, why crow-foot adapters change the reading, and when to stop trusting a wrench.",
    family: "torque",
    intro: [
      "A specification is only as good as the tool applying it. Most torque wrenches are least accurate at the extreme ends of their range, and a wrench that has been dropped or stored under load may be reading anything at all.",
    ],
    sections: [
      {
        heading: "Choosing the wrench and socket",
        paragraphs: [
          "Use a torque wrench whose working range places the target value away from the extreme bottom or top of the scale. A six-point deep socket that fully engages the nut reduces rounding. Extensions used straight do not normally change torque, but crow-foot adapters that change the effective wrench length require calculation. Return a click wrench to its minimum marked setting after use and calibrate it at the interval specified by its maker.",
        ],
      },
      {
        heading: "When not to trust the tool",
        paragraphs: [
          "If the only available wrench has been dropped, stored under load, or shows inconsistent clicks, use another verified tool. Wheel service is a poor place to test a questionable wrench. A smooth pull at the handle's marked grip point gives a more repeatable result than a jerk, bounce, or second click applied \"for luck.\"",
        ],
      },
    ],
    faqs: [
      {
        q: "Do extensions change the torque reading?",
        a: "A straight extension in line with the drive normally does not. A crow-foot or offset adapter that changes the effective length of the wrench does, and requires recalculating the setting.",
      },
      {
        q: "Should I store a click wrench at its setting?",
        a: "No. Return it to the minimum marked setting after use, and calibrate at the interval its manufacturer specifies.",
      },
    ],
    reviewed,
  },

  /* ------------------------------------------------------------- firing */
  {
    slug: "cylinder-numbering-versus-firing-order",
    title: "Cylinder Numbering vs. Firing Order",
    short: "Cylinder numbering versus firing sequence",
    metaDescription:
      "The difference between a cylinder's permanent number and the repeating sequence of combustion events, and why compression TDC is not just \"the timing mark at zero\".",
    family: "firing",
    intro: [
      "These two ideas are constantly confused, and the confusion causes real damage — a misfire code names a cylinder, not a position in the firing sequence.",
    ],
    sections: [
      {
        heading: "Two different things",
        paragraphs: [
          "Cylinder numbering tells you each bore's permanent identity. Firing order tells you the repeating sequence of combustion events. The crankshaft makes two full revolutions during a four-stroke cycle, so checking only that the timing mark is at top dead center is insufficient: cylinder 1 can be at compression TDC or exhaust TDC. Both valves should be closed at compression TDC.",
          "Bank numbering conventions differ between manufacturers, so a V8 that looks identical from above may number its cylinders in a completely different order from one you worked on last week. Confirm it from the diagram for that engine family rather than from memory.",
        ],
      },
      {
        heading: "Working method",
        paragraphs: [
          "Mark the banks temporarily when working in a crowded engine bay. Route one connection from its source to its cylinder and verify both ends before starting the next; tracing a completed bundle afterward invites transposed pairs.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does P0304 mean the fourth cylinder in the firing order?",
        a: "No. It refers to physical cylinder 4. Misfire codes always name the cylinder by its permanent number, never by its place in the firing sequence.",
      },
      {
        q: "Is cylinder numbering the same on every V8?",
        a: "No. Bank numbering conventions differ by manufacturer and sometimes by engine family. Use the diagram for the specific engine.",
      },
          {
        q: "Is cylinder numbering the same as firing order?",
        a: "No. Numbering identifies physical cylinders; firing order is the sequence in which those cylinders begin power strokes.",
      },
          {
        q: "Can a camshaft change the firing order?",
        a: "On engine families offered with alternate orders, yes. A camshaft and its matching ignition routing must use the same order.",
      },
    ],
    reviewed,
  },
  {
    slug: "finding-compression-tdc-on-cylinder-1",
    title: "How to Find Compression TDC on Cylinder 1",
    short: "How to find compression TDC on cylinder 1",
    metaDescription:
      "A safe method for bringing cylinder 1 to compression top dead centre, and how the distributor rotor identifies the No. 1 cap terminal.",
    family: "firing",
    intro: [
      "Nearly every ignition-side procedure starts here. Getting it wrong by one crankshaft revolution puts cylinder 1 on exhaust TDC instead, and everything downstream is then 360 degrees out.",
    ],
    sections: [
      {
        heading: "The procedure",
        paragraphs: [
          "Remove the cylinder 1 spark plug with the engine cool. Rotate the crankshaft in its normal direction while feeling for compression with an appropriate method, then bring the timing mark to zero or the specified installation position. Never use the starter with hands, tools, or loose clothing near rotating parts. A piston-stop tool requires a dedicated procedure and should not be improvised.",
        ],
      },
      {
        heading: "Identifying the No. 1 terminal",
        paragraphs: [
          "On a distributor engine, remove the cap and observe the rotor. The cap post over the rotor becomes the practical No. 1 location for that installation. If the vacuum advance, wiring, or housing cannot be positioned correctly, the distributor may need to be re-indexed, but re-indexing is separate from changing the firing order.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the timing mark at zero enough?",
        a: "No. The mark reads zero twice per four-stroke cycle. You need compression TDC specifically, with both valves closed.",
      },
      {
        q: "Can I bump the starter to get there?",
        a: "Not with hands or tools near rotating parts. Rotate the crankshaft by hand in its normal direction instead.",
      },
          {
        q: "Does the No. 1 distributor terminal have one fixed clock position?",
        a: "Not necessarily. The terminal over the rotor at cylinder 1 compression TDC is No. 1 for the installed distributor position.",
      },
    ],
    reviewed,
  },
  {
    slug: "distributor-direction-and-coil-on-plug-routing",
    title: "Distributor Direction, Coil-on-Plug Systems and Wire Routing",
    short: "Distributor direction, COP systems and routing",
    metaDescription:
      "Verifying rotor rotation direction, how coil-on-plug changes the service task, and routing secondary leads to avoid crossfire.",
    family: "firing",
    intro: [
      "The same firing order is delivered very differently by a distributor and by a coil-on-plug system, and the service task changes with it.",
    ],
    sections: [
      {
        heading: "Rotation direction and COP systems",
        paragraphs: [
          "A distributor's rotation direction determines which adjacent cap terminal is next. Verify the direction for the engine family rather than assuming clockwise. Coil-on-plug engines electronically schedule the same mechanical firing sequence, but the service task becomes identifying the correct coil, connector, harness branch, or control circuit instead of arranging terminals around a cap.",
        ],
      },
      {
        heading: "Routing secondary leads",
        paragraphs: [
          "Keep secondary leads away from exhaust components and moving linkages. Avoid long parallel runs between consecutively firing cylinders when the manufacturer provides separators or a routing plan, because inductive coupling can trigger crossfire in vulnerable systems. Use boots and terminals designed for the cap and plugs; a wire that feels attached may not have fully engaged.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do all distributors turn clockwise?",
        a: "No. Verify the direction for that engine family before assigning cap terminals — assuming clockwise is a common source of transposed leads.",
      },
      {
        q: "Does a coil-on-plug engine have a firing order?",
        a: "Yes, the same mechanical sequence. It is scheduled electronically rather than distributed mechanically, so the task becomes identifying the right coil and circuit.",
      },
    ],
    reviewed,
  },
  {
    slug: "symptoms-of-an-incorrect-firing-order",
    title: "Symptoms of an Incorrect Firing Order",
    short: "Symptoms of an incorrect firing order",
    metaDescription:
      "What an engine does when the firing order is wrong, and why extended cranking or driving on a known misfire causes further damage.",
    family: "firing",
    intro: [
      "A wrong firing order rarely produces a subtle symptom. It usually announces itself immediately after ignition work.",
    ],
    sections: [
      {
        heading: "What you will see",
        bullets: [
          "Cranks normally but will not start after plug-wire or engine work.",
          "Popping through the intake, carburetor, or exhaust during cranking.",
          "Severe shaking, dead cylinders, low manifold vacuum, or raw-fuel odor.",
          "Multiple misfire codes that appeared immediately after connectors were disturbed.",
          "Timing-light marks that are unstable or cannot be brought into the expected range.",
          "Exhaust manifolds that warm unevenly because one or more cylinders are not contributing.",
        ],
        paragraphs: [
          "Do not continue extended cranking or driving with a known misfire. Unburned fuel can damage a catalytic converter, wash oil from cylinder walls, or ignite in the exhaust. Recheck identification, No. 1 compression TDC, bank numbering, and every connection.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I drive a short distance with a bad misfire?",
        a: "Avoid it. Unburned fuel can destroy a catalytic converter, wash oil from the cylinder walls, or ignite in the exhaust system.",
      },
          {
        q: "Why does the engine backfire after replacing wires?",
        a: "The usual causes are crossed wires, No. 1 indexed on exhaust rather than compression TDC, wrong bank numbering, or the wrong order for the installed engine/camshaft.",
      },
    ],
    reviewed,
  },
  {
    slug: "firing-order-verification-method",
    title: "A Disciplined Firing-Order Verification Method",
    short: "A disciplined verification method",
    metaDescription:
      "A checklist method for verifying ignition connections one at a time, and why base timing on a modern engine is not set by moving sensors.",
    family: "firing",
    intro: [
      "Most transposed-lead faults are found by method rather than by insight. Verifying one connection at a time is slower than eyeballing a finished bundle and considerably faster than diagnosing it afterwards.",
    ],
    procedure: [
      "Identify the engine by year, casting, VIN code, induction system, and—on a rebuilt classic engine—the installed camshaft or engine-builder documentation.",
      "Disconnect power as appropriate, label every wire or coil connector, and photograph the original routing before removing parts.",
      "Locate cylinder 1 using the bank-numbering diagram; do not assume the left/right convention matches another manufacturer's V8.",
      "For a distributor engine, rotate to cylinder 1 compression TDC and identify the cap terminal directly above the rotor. That terminal is No. 1 for the installed distributor position.",
      "Route or verify the remaining cylinders in the order given on the specification page, following the correct rotor direction or the harness/coil identification for the system.",
      "Keep leads separated from exhaust heat and sharp edges, reinstall retainers, then verify starting, idle quality, diagnostic codes, and ignition timing where adjustable.",
    ],
    sections: [
      {
        heading: "Work one connection at a time",
        paragraphs: [
          "Print or download the branded diagram, write the actual cap or coil identifiers beside each cylinder, and check off connections in sequence. Use an ohmmeter only where the wire manufacturer's resistance specification is available; continuity alone does not prove that a lead will contain ignition voltage under load. Inspect boots for carbon tracking and terminals for corrosion or pull-out.",
        ],
      },
      {
        heading: "After it starts",
        paragraphs: [
          "Verify any adjustable base timing using the exact procedure for disabling computer advance or disconnecting a timing connector. Modern engine timing is PCM controlled and should not be \"set\" by moving sensors or guessing at reference positions.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does a continuity test prove a plug wire is good?",
        a: "No. Continuity does not prove the lead will contain ignition voltage under load. Check against the wire maker's resistance specification and inspect for carbon tracking.",
      },
    ],
    reviewed,
  },

  /* ---------------------------------------------------------------- oil */
  {
    slug: "oil-capacity-viscosity-and-approval",
    title: "Capacity, Viscosity and Oil Approval Are Three Different Specs",
    short: "Capacity, viscosity and approval",
    metaDescription:
      "Why the right viscosity does not make an oil approved, and why all three specifications must be matched to the year and engine.",
    family: "oil",
    intro: [
      "These three get collapsed into one in most search results, and they are not interchangeable. An oil can be the correct viscosity and still be the wrong oil.",
    ],
    sections: [
      {
        heading: "Three separate requirements",
        paragraphs: [
          "Capacity tells you approximately how much the crankcase accepts after a defined service. Viscosity—such as 0W-20 or 5W-20—describes flow behavior across temperature ranges. The manufacturer approval or material standard addresses performance tests beyond viscosity. Match all three items to the year and engine; a bottle with the right viscosity is not automatically approved for every application.",
          "Climate provisions can allow an alternate viscosity in severe cold or special duty, but those exceptions belong to a specific manual. Avoid universal additive claims that conflict with the manufacturer-approved oil chemistry, and never mix a guess about viscosity with a guess about capacity.",
        ],
      },
    ],
    faqs: [
      {
        q: "If the viscosity matches, is the oil approved?",
        a: "Not necessarily. Approval standards test performance beyond viscosity, so a correct-viscosity oil can still fail the manufacturer's requirement for that engine.",
      },
      {
        q: "Can I use a different viscosity in winter?",
        a: "Only where the manual for your vehicle provides that climate exception. It is a specific provision, not a general permission.",
      },
          {
        q: "Does the published capacity include the filter?",
        a: "Use the table note. The main figures in this guide identify with-filter capacity because a normal service includes a new filter.",
      },
          {
        q: "Can the same-displacement engine use a different amount in another year?",
        a: "Yes. Oil-pan, filter, cooler, and engine-generation changes can alter capacity even when the badge still shows the same displacement.",
      },
    ],
    reviewed,
  },
  {
    slug: "reading-an-oil-dipstick-accurately",
    title: "How to Get an Accurate Dipstick Reading",
    short: "How to get an accurate dipstick reading",
    metaDescription:
      "Level ground, drain-back time, hot versus cold checking, and why overfilling an engine causes more than a mess.",
    family: "oil",
    intro: [
      "The dipstick is the actual specification. A published capacity is a starting quantity; the level check is what confirms the engine has the right amount of oil in it.",
    ],
    sections: [
      {
        heading: "Taking the reading",
        paragraphs: [
          "Park on level ground. Follow the manual's hot or cold checking method because drain-back time affects the reading. Pull the dipstick, wipe it clean, fully reinsert it, and withdraw it again without dragging the marked area along the tube more than necessary. Read both sides; the lower consistent boundary is more reliable when oil smears up one side.",
        ],
      },
      {
        heading: "Why overfilling matters",
        paragraphs: [
          "Add oil in small measured increments and allow time to reach the pan. Overfilling can aerate the oil as the crankshaft contacts it, increase crankcase pressure, contaminate the intake through the ventilation system, or damage emissions components. Underfilling reduces the reserve available during braking, cornering, towing, or operation on grades.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much oil is between the add and full marks?",
        a: "Often about one quart, but do not assume that relationship — it varies by engine, and an aftermarket or damaged dipstick invalidates it entirely.",
      },
      {
        q: "Is a slight overfill harmless?",
        a: "No. The crankshaft can contact and aerate the oil, raising crankcase pressure and pushing oil through the ventilation system into the intake.",
      },
          {
        q: "What if my dipstick disagrees with the chart?",
        a: "Recheck the identification and checking procedure. If the mismatch remains, investigate non-original hardware, an incorrect dipstick, incomplete draining, or leakage before operating the vehicle.",
      },
    ],
    reviewed,
  },
  {
    slug: "oil-filter-replacement-and-leak-check",
    title: "Oil Filter Replacement and Leak Inspection",
    short: "Filter replacement and leak inspection",
    metaDescription:
      "The double-gasket failure, how to tighten a filter correctly, and the post-start inspection that catches a leak before it empties the sump.",
    family: "oil",
    intro: [
      "The most expensive mistake in an oil change is not the wrong oil. It is a second gasket left stuck on the mounting pad.",
    ],
    sections: [
      {
        heading: "Fitting the new filter",
        paragraphs: [
          "Confirm the old filter gasket came off with the filter. A double gasket can dump oil rapidly after startup. Lightly oil the new gasket only when the filter maker directs it, tighten by the stated turn or torque method, and keep the mounting pad clean. Replace a drain-plug gasket or seal when required and use the exact plug torque rather than guessing from wrench feel.",
        ],
      },
      {
        heading: "The inspection after starting",
        paragraphs: [
          "After starting, verify that the oil-pressure warning clears promptly. Shut down immediately if it does not. Inspect the filter perimeter, drain plug, and nearby splash shield with a light. A clean final inspection is easier when residual oil from removal has been wiped away. Recheck the parking spot and oil level after the first drive.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a double gasket?",
        a: "The old filter's rubber seal staying stuck to the mounting pad while a new filter is fitted over it. The joint fails quickly under pressure and can empty the sump.",
      },
      {
        q: "Should I oil the new filter gasket?",
        a: "Only when the filter manufacturer directs it, and lightly. Follow their turn-count or torque method for tightening rather than wrench feel.",
      },
    ],
    reviewed,
  },
  {
    slug: "oil-life-monitors-and-service-intervals",
    title: "Oil-Life Monitors and Service Intervals",
    short: "Oil-life monitor and service interval",
    metaDescription:
      "What an oil-life monitor actually estimates, why it is not a level check, and when severe-service conditions shorten the interval.",
    family: "oil",
    intro: [
      "An oil-life monitor is a model, not a sensor of how much oil is in the pan. A vehicle can be two quarts low with 40% life remaining on the display.",
    ],
    sections: [
      {
        heading: "What the monitor does and does not know",
        paragraphs: [
          "An oil-life monitor estimates service need from operating conditions; it does not measure the amount of oil in the pan. Reset it only after completing the oil and filter service. Continue checking the level between changes, especially before long trips, towing, high-speed driving, or off-road use. A vehicle can consume or leak oil while the monitor still shows substantial life remaining.",
        ],
      },
      {
        heading: "Severe service",
        paragraphs: [
          "Follow the time, mileage, engine-hour, and severe-service limits in the exact owner manual. Repeated short trips, dusty roads, extended idling, heavy loads, and extreme temperatures can justify closer inspection or a shorter interval. Keep receipts and record the oil approval, viscosity, filter number, mileage, and measured refill quantity.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does the oil-life monitor tell me if the engine is low on oil?",
        a: "No. It estimates remaining service life from operating conditions and has no knowledge of the level in the pan. Check the dipstick between changes.",
      },
      {
        q: "When should I reset it?",
        a: "Only after the oil and filter service is actually complete — resetting early leaves the model tracking the wrong starting point.",
      },
    ],
    reviewed,
  },
  {
    slug: "engine-oil-change-procedure",
    title: "Engine Oil and Filter Change Procedure",
    short: "Oil and filter change procedure",
    metaDescription:
      "The order of operations for an oil and filter change, from identifying the engine to the final dipstick verification and monitor reset.",
    family: "oil",
    intro: [
      "The published capacity is where this procedure starts, not where it ends. Every step below exists because the number on the page and the amount the engine actually accepts are rarely identical.",
    ],
    procedure: [
      "Confirm the VIN, model year, engine displacement/code, drivetrain if relevant, and whether the engine or oil pan is original.",
      "Warm the engine enough to suspend contaminants, park level, shut it off, secure the vehicle, and allow hot components to become safe to work around.",
      "Remove the drain plug and old filter, allow a complete drain, inspect the sealing surfaces, and install the correct filter and plug using their component-specific instructions.",
      "Add approximately half a quart less than the listed with-filter capacity through a clean funnel, reinstall the cap, and check for tools or rags before starting.",
      "Run the engine briefly while watching the oil-pressure indicator, shut it off, inspect the plug and filter for leakage, and wait the manual's specified drain-back time.",
      "Check the dipstick on level ground, add small measured amounts to reach the full mark without exceeding it, reset the oil-life monitor, and document the product and quantity used.",
    ],
    sections: [
      {
        heading: "Why you refill short of the published figure",
        paragraphs: [
          "Oil remains in galleries, coolers, a tilted pan, or an old filter, so the amount that drains out is rarely the full system volume. Adding the published capacity to an engine that did not fully drain overfills it. Refill below the figure, circulate, wait, and let the dipstick decide.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should I add the full published capacity?",
        a: "No. Add slightly less, run the engine, wait for drain-back on level ground, then bring the level to full in small measured amounts.",
      },
      {
        q: "Warm the engine first or not?",
        a: "Warm it enough to suspend contaminants so they drain out with the oil, but let hot components cool enough to work around safely.",
      },
    ],
    reviewed,
  },
  {
    slug: "identifying-your-exact-vehicle",
    title: "Identifying Your Exact Vehicle Before Using a Specification",
    short: "Identifying your exact vehicle",
    metaDescription:
      "How to pin down model year, VIN, engine code, trim and option codes so a published specification actually applies to the vehicle in front of you.",
    family: "torque",
    intro: [
      "Most wrong specifications are not wrong numbers. They are correct numbers for a different vehicle. Identification is the step that decides whether everything after it applies.",
    ],
    procedure: [
      "Identify model year, VIN, engine, trim, drivetrain and factory option codes.",
      "Match the applicable row to the official manufacturer document and physical component.",
      "Record the verified value, units and application before service, loading or parts purchase.",
    ],
    sections: [
      {
        heading: "Why the badge is not enough",
        paragraphs: [
          "Two vehicles sold in the same calendar year can sit on different platforms, and engines sharing a displacement can differ in pan, filter, fastener and hardware. A model name alone routinely returns a figure from the wrong generation, so the year and engine code carry the identification, not the badge.",
          "Where a vehicle has been swapped, rebuilt or fitted with aftermarket hardware, the installed component's manufacturer instructions take priority over the factory table entirely.",
        ],
      },
    ],
    faqs: [
      {
        q: "Where do I find the engine code?",
        a: "The VIN, the underhood emissions label and the manufacturer's own manual lookup all carry it. The specification page for your vehicle links that manufacturer source.",
      },
      {
        q: "My engine was swapped. Which specification applies?",
        a: "The installed hardware's own documentation. A factory table describes the engine the vehicle left the factory with, not the one currently bolted in.",
      },
    ],
    reviewed,
  },
  {
    slug: "cylinder-head-bolt-procedure",
    title: "Cylinder Head Bolt Torque Procedure",
    short: "Head-bolt torque procedure",
    metaDescription:
      "The order of operations for a cylinder-head bolt sequence, why bolt holes must be clean and empty, and how torque-to-yield stages differ from a single value.",
    family: "torque",
    intro: [
      "A head-bolt specification is almost never one number. It is a sequence of stages with a stated friction condition, and the stages are not interchangeable between engines that look alike.",
    ],
    procedure: [
      "Identify the complete engine code, head, gasket and fastener kit.",
      "Verify flatness, surface finish, clean threads and empty bolt holes.",
      "Apply the exact lubricant, torque, loosen and angle stages in the numbered sequence.",
    ],
    sections: [
      {
        heading: "Why the bolt holes must be clean and dry",
        paragraphs: [
          "Oil or coolant trapped in a blind hole cannot compress. Tightening a bolt into it can hydraulically crack the block or give a reading that reflects trapped fluid rather than clamp load. Chase the threads where the procedure allows it and remove anything standing in the hole.",
        ],
      },
      {
        heading: "Torque-to-yield and reuse",
        paragraphs: [
          "Many modern head bolts are designed to stretch into their yield range, which is why the procedure ends in degrees rather than a torque figure. Those bolts often have a published length or diameter limit and are frequently single-use. Where a manual gives an inspection dimension, reuse is a measurement — not a judgement about how the bolt looks.",
          "If an angle stage is overshot, the manual normally directs loosening the bolt completely and restarting the sequence. Backing a bolt off to its paint mark does not restore the joint.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can head bolts be reused?",
        a: "Only where the exact procedure permits it and the bolt passes its published inspection limit. Many torque-to-yield bolts are single-use.",
      },
      {
        q: "Should head bolt threads be oiled?",
        a: "Follow the procedure exactly. Many head-bolt sequences specify oiled threads and under-head surfaces, and omitting the oil under-clamps the joint just as adding it elsewhere over-clamps.",
      },
    ],
    reviewed,
  },
  {
    slug: "spark-plug-replacement-procedure",
    title: "Spark Plug Inspection and Replacement Procedure",
    short: "Spark plug replacement procedure",
    metaDescription:
      "Working on a cool engine, checking gap without damaging a fine-wire electrode, and installing plugs to the correct torque for the seat and head material.",
    family: "ignition",
    intro: [
      "Most spark-plug damage happens before the plug reaches the cylinder — in the gap check, or in the first thread.",
    ],
    procedure: [
      "Identify the exact model year, engine, calibration or performance variant, and the approved spark-plug part number before removing anything.",
      "Work on a cool engine, clear dirt from the plug wells, disconnect coils carefully, and keep every coil, boot, fastener, and connector organized by cylinder.",
      "Inspect each new plug for shipping damage, correct reach and seat, intact insulator, and the application-specific gap using a clean wire-style gauge.",
      "Do not pry against a fine-wire center electrode. If the vehicle or plug maker says the plug is non-adjustable, replace an out-of-range plug.",
      "Thread each plug fully by hand to prevent cross-threading, then tighten with the exact service torque or the plug maker's angle method for the seat and head material.",
      "Reinstall boots and coils, verify connector locks and harness routing, start the engine, and check for smooth operation or stored/pending misfire codes.",
    ],
    sections: [
      {
        heading: "Why a cool engine matters",
        paragraphs: [
          "Aluminium heads expand more than the steel plug shell. Removing a plug from a hot aluminium head raises the risk of pulling threads, and it is the single easiest way to turn a routine service into a thread-repair job.",
        ],
      },
      {
        heading: "Gap checking without damaging the plug",
        paragraphs: [
          "Use a wire-style gauge rather than a coin-style ramp, which can load the fine-wire centre electrode sideways. Never lever against the centre electrode to close a gap. A plug with a damaged electrode or cracked insulator should be replaced rather than adjusted into range.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I gap a fine-wire plug?",
        a: "Only if the plug maker permits it, and only using a wire gauge without levering against the centre electrode. Many iridium and platinum plugs are supplied pre-gapped and non-adjustable.",
      },
      {
        q: "Why not use a coin-style gap gauge?",
        a: "A ramp-style gauge can load the fine-wire centre electrode sideways and damage it. A wire gauge measures without applying that load.",
      },
          {
        q: "Should new spark plugs be checked?",
        a: "Inspect them for damage and verify the application-specific gap gently. Do not force or regap a plug the manufacturer identifies as non-adjustable.",
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
    reviewed,
  },
];

export const guideBySlug = new Map(guides.map((guide) => [guide.slug, guide]));

export const guidePath = (slug: string) => `/guides/${slug}`;

/** Resolves a spec's `guides` slugs to guide records, skipping unknown slugs. */
export const guidesFor = (slugs: string[] | undefined): Guide[] =>
  (slugs ?? []).map((slug) => guideBySlug.get(slug)).filter((guide): guide is Guide => Boolean(guide));
