import type { TroubleCodeGuide } from "./trouble-code-data";
import { fordManuals, fordObd2017, fordObd2024, nhtsaTsb } from "./trouble-code-sources";
import { escapeVehicle, goPartsIntercooler } from "./trouble-code-escape";

/**
 * Escape boost-control codes: P0299 (underboost) and P0234 (overboost).
 *
 * These two only occur on the turbocharged EcoBoost engines. The 2.5L
 * naturally aspirated engine and the 2.5L hybrid have no turbocharger and
 * therefore cannot set them, which the pages say plainly rather than leaving
 * a hybrid owner to work it out.
 */

const goPartsP0299Escape = {
  label: "P0299 on 2013–2020 Ford Escape: EcoBoost underboost causes and fixes",
  url: "https://www.go-parts.com/garage/obd-p0299-ford-escape-2013-2020",
  note: "Ranks the wastegate solenoid, charge pipes and actuator as the common causes on this platform",
};

const goPartsP0234Escape = {
  label: "P0234 on 2013–2017 Ford Escape: turbo overboost causes and fixes",
  url: "https://www.go-parts.com/garage/obd-p0234-ford-escape-2013-2017",
  note: "Identifies the wastegate regulating solenoid and its part number for the 1.6L",
};

const boostVehicle = {
  ...escapeVehicle,
  kicker: "FORD ESCAPE · 1.5L, 1.6L & 2.0L ECOBOOST · TURBO ONLY",
  yearsIntro:
    "This code only exists on turbocharged Escapes. If your Escape has the 2.5L naturally aspirated engine or the 2.5L hybrid, there is no turbocharger to under- or over-boost and this code should not appear — check that the scan tool is reading the right vehicle. On EcoBoost engines, the boost-control hardware differs enough between the 1.5L, 1.6L and 2.0L that the part you need is engine-specific.",
};

export const troubleCodeEscapeBoost: TroubleCodeGuide[] = [
  /* ------------------------------------------------------------------ P0299 */
  {
    slug: "ford/escape/p0299",
    code: "P0299",
    title: "P0299 Code Ford Escape: Turbo Underboost Causes & Fixes",
    description:
      "P0299 means your Escape's turbo is not making the boost the PCM asked for. Causes by engine, the leak test that finds it, and repair costs.",
    definition: "Turbocharger/Supercharger 'A' Underboost Condition",
    severity: "Diagnose promptly",
    vehicle: boostVehicle,
    driveAdvice:
      "You can drive it, but you will notice — the truck feels flat and acceleration is sluggish, because the PCM has usually pulled power back to protect itself. Continued driving is unlikely to destroy anything immediately, but it wastes fuel, works the engine harder than it should, and can hide a second developing fault behind the one you already know about.",
    quickAnswer:
      "P0299 means your Escape's PCM commanded a certain amount of boost, measured what actually arrived, and found a shortfall large enough to matter. Notice what that does not say: it does not say the turbocharger has failed. On this platform the overwhelming majority of P0299 repairs are a wastegate regulating solenoid, a cracked or disconnected charge pipe, or a wastegate actuator that is no longer moving the way it should. The turbo itself is usually fine, and proving that before you price one is the whole point of the diagnosis below.",
    symptoms: [
      {
        key: "no-power",
        label: "Noticeably flat, sluggish acceleration",
        response:
          "The headline symptom. Without the commanded boost, a small turbocharged engine has very little left — a 1.5L three-cylinder without boost is genuinely slow. If the PCM has also entered a reduced-power strategy, the drop is sharper still.",
      },
      {
        key: "whistle",
        label: "Whistling or hissing under acceleration",
        response:
          "Air escaping from a pressurised joint. Follow the charge pipes from the turbo through the intercooler to the throttle body and look for a split coupler, a loose clamp or a cracked pipe. This is the cheapest cause on the list and it announces itself.",
      },
      {
        key: "oily-residue",
        label: "Oily film around a charge-pipe joint",
        response:
          "A small amount of oil mist travels through the charge-air system on any turbo engine, and it collects wherever pressurised air is escaping. That residue is a marker — it shows you the leak location even when you cannot hear it.",
      },
      {
        key: "intermittent",
        label: "Comes and goes, worse when the engine is worked hard",
        response:
          "Typical of a wastegate solenoid that is sticking rather than dead, or a leak that only opens at full boost. Drive the conditions your freeze frame recorded and watch commanded versus actual boost on live data.",
      },
      {
        key: "limp-mode",
        label: "Truck goes into reduced power mode",
        response:
          "The PCM protecting itself when boost is far from target. It is a consequence of P0299, not a separate fault. Get the boost fault repaired and the reduced-power behaviour goes with it.",
      },
      {
        key: "with-p0234",
        label: "P0234 has also appeared at some point",
        response:
          "Under- and overboost on the same vehicle almost always points at one thing: the boost-control system itself, most often the wastegate regulating solenoid. A part that cannot control boost accurately can miss in either direction.",
      },
    ],
    causes: [
      {
        cause: "Wastegate regulating solenoid (most common)",
        evidence:
          "Commanded boost and actual boost diverge; the solenoid does not respond to a scan-tool command; both under- and overboost codes in the history",
        firstTest:
          "Command the solenoid with a scan tool and confirm it actually actuates and holds",
      },
      {
        cause: "Cracked or disconnected charge pipe",
        evidence:
          "Whistling under load, oily residue at a joint, or a coupler that has split at a bend",
        firstTest:
          "Pressure-test the charge-air system — it finds leaks that no amount of looking will",
      },
      {
        cause: "Faulty or disconnected wastegate actuator",
        evidence:
          "Actuator rod does not move through its range, linkage is disconnected, or the actuator will not hold vacuum or pressure",
        firstTest:
          "Inspect the actuator and its linkage, then check it moves fully when commanded",
      },
      {
        cause: "Torn turbocharger bypass valve",
        evidence:
          "Boost builds then collapses; diaphragm torn on inspection",
        firstTest:
          "Remove and inspect the bypass valve diaphragm for splits",
      },
      {
        cause: "Intercooler damage or restriction",
        evidence:
          "Physical damage from road debris, or condensate accumulation on a vehicle used for short cold trips",
        firstTest:
          "Inspect the intercooler for impact damage and check its lower connections for trapped condensate",
      },
      {
        cause: "Turbocharger wear or failure (least likely)",
        evidence:
          "Shaft play, noise, or oil consumption alongside the boost shortfall, with the whole control system already proven good",
        firstTest:
          "Only after the solenoid, actuator and charge-air system have been cleared by testing",
      },
    ],
    deepDive: [
      {
        heading: "Which Escape engines can set P0299",
        paragraphs: [
          "Only the turbocharged ones. The 1.5L EcoBoost three-cylinder, the 1.6L EcoBoost and the 2.0L EcoBoost all have a turbocharger and a boost-control system that can fall short of target. The 2.5L naturally aspirated engine and the 2.5L Atkinson hybrid do not have a turbocharger at all, so on those vehicles this code should not appear.",
          "If you have a hybrid or a 2.5L and your scan tool is showing P0299, check that the tool is connected to the right vehicle and reading the right module before you go looking for a turbo you do not have.",
        ],
      },
      {
        heading: "1.6L EcoBoost: check the solenoid first",
        paragraphs: [
          "On the 1.6L in particular, the wastegate regulating solenoid is a recognised weak point and is documented in Ford bulletin coverage. It is also one of the more accessible parts on the engine — it is reached through the passenger-side wheel well rather than requiring the intake to come off — and the part itself is commonly in the $50 to $100 range.",
          "That combination makes it the sensible first target on this engine once you have confirmed the charge pipes are intact. Cheap part, straightforward access, documented failure history. Compare that with pricing a turbocharger before you have tested anything.",
        ],
      },
      {
        heading: "1.5L and 2.0L EcoBoost: start with the charge-air system",
        paragraphs: [
          "Both engines run a length of charge-air plumbing from the turbo, through the intercooler, and back to the throttle body. Every joint in that path is under positive pressure when you accelerate, and every coupler in it ages. A split coupler or a clamp that has relaxed leaks measured air after the turbo has already compressed it, and the PCM sees a boost shortfall.",
          "A pressure test is the right tool here, not a visual inspection. The leak often opens only under pressure and closes again at rest, which is exactly why an engine can idle perfectly and still throw this code every time you merge onto a motorway.",
          "While you are in there, check the intercooler itself. It sits low at the front of the vehicle where road debris reaches it, and on vehicles used for short cold trips condensate can accumulate in its lower connections.",
        ],
      },
      {
        heading: "Why the turbocharger is the last thing to suspect, not the first",
        bullets: [
          "The code describes a boost shortfall, not a failed component",
          "Wastegate solenoids, charge pipes and actuators all produce the same shortfall for a fraction of the cost",
          "A turbo that is genuinely failing usually announces itself with noise, shaft play or oil consumption as well",
          "Fitting a turbocharger to fix a split coupler leaves you with the original fault and a much larger bill",
          "Pressure-testing the charge-air system takes under an hour and eliminates the cheap causes definitively",
        ],
      },
    ],
    freezeFrame: [
      "Commanded boost against actual boost — the size and shape of the gap is the core evidence",
      "Engine load and rpm when the shortfall was detected, which tells you whether it happens at full boost only",
      "Barometric pressure, since altitude changes what the PCM can achieve",
      "Wastegate duty cycle or position command, showing what the PCM was asking the control system to do",
      "Intake air temperature, which can indicate an intercooler or charge-air problem",
      "Any companion codes — P0234, MAF performance codes or lean codes change the diagnostic order",
    ],
    steps: [
      {
        title: "Confirm you have a turbocharged engine",
        detail:
          "The 2.5L and the hybrid do not have one. Read the VIN or the underbonnet emissions label first, because everything below assumes a turbo exists.",
      },
      {
        title: "Watch commanded versus actual boost",
        detail:
          "Graph both on live data during a road test. The shape of the gap matters: boost that never builds points at a control fault, while boost that builds and then collapses points at a leak or a bypass valve.",
      },
      {
        title: "Inspect the charge-air plumbing",
        detail:
          "Follow every pipe from turbo to intercooler to throttle body. Look for split couplers, relaxed clamps and oily residue at joints. Oil film marks the leak even when nothing is obviously broken.",
      },
      {
        title: "Pressure-test the charge-air system",
        detail:
          "This is the test that finds a leak that only opens under boost. An idle inspection will pass a system that leaks badly at 15 psi, which is why so many of these are misdiagnosed as turbo failures.",
      },
      {
        title: "Command the wastegate solenoid",
        detail:
          "Actuate it with a scan tool and confirm it responds and holds. On the 1.6L this is the highest-value single test on the page, and the part is accessible through the passenger-side wheel well.",
      },
      {
        title: "Check the wastegate actuator and linkage",
        detail:
          "Confirm the rod moves through its full range and the linkage is connected and free. A seized or disconnected actuator produces the same shortfall as a failed solenoid but needs a different part.",
      },
      {
        title: "Inspect the bypass valve and intercooler",
        detail:
          "A torn bypass diaphragm lets boost escape as soon as it builds. The intercooler sits where stones reach it, so check for impact damage and for condensate collected in the lower connections.",
      },
      {
        title: "Only then consider the turbocharger",
        detail:
          "With the control system and the charge-air path proven good, check the turbo for shaft play, noise and oil consumption. Reaching this step with everything else eliminated is what makes a turbo diagnosis credible.",
      },
    ],
    costs: [
      {
        job: "Charge-air pressure test",
        parts: "$0",
        shop: "Usually inside a diagnostic fee",
        diy: "Needs a boost leak tester",
        note: "Eliminates the cheapest causes before any part is ordered",
      },
      {
        job: "Charge pipe or coupler",
        parts: "Low — often under $60",
        shop: "Mostly labour to access",
        diy: "Easy to moderate",
        note: "Frequently just a clamp or a split coupler rather than a whole pipe",
      },
      {
        job: "Wastegate regulating solenoid",
        parts: "About $50–$100 on the 1.6L",
        shop: "Real-world example around $311 all-in with diagnosis",
        diy: "Moderate — via passenger-side wheel well",
        note: "The documented common failure on the 1.6L; part CJ5Z-9K378-B on that engine",
      },
      {
        job: "Wastegate actuator",
        parts: "Moderate",
        shop: "Get a quote — access varies by engine",
        diy: "Moderate to advanced",
        note: "May be integral to the turbo on some applications",
      },
      {
        job: "Turbo bypass valve",
        parts: "Moderate",
        shop: "Modest labour",
        diy: "Moderate",
        note: "Check the diaphragm before replacing the whole assembly",
      },
      {
        job: "Typical all-in P0299 repair",
        parts: "—",
        shop: "Commonly $150–$800",
        diy: "—",
        note: "Wide range because it spans a $20 clamp to a turbocharger",
      },
    ],
    dontReplace:
      "Do not price a turbocharger off the back of this code. P0299 describes a boost shortfall, and on the Escape the shortfall is usually produced by a wastegate solenoid, a split charge-pipe coupler or an actuator that has stopped moving — every one of them a fraction of a turbo's cost. Pressure-test the charge-air system and command the solenoid first. Those two tests take under an hour and settle it.",
    yearNotes: [
      "P0299 applies only to turbocharged Escapes: the 1.5L EcoBoost, 1.6L EcoBoost and 2.0L EcoBoost. The 2.5L naturally aspirated engine and the 2.5L hybrid cannot set it.",
      "On 2013–2020 Escapes the recognised common causes are a faulty wastegate regulating valve solenoid, a cracked charge pipe, and a disconnected or faulty wastegate actuator.",
      "The wastegate solenoid on the 1.6L is reached through the passenger-side wheel well, which makes it one of the more DIY-accessible parts in this diagnosis.",
      "Boost-control hardware differs between the 1.5L, 1.6L and 2.0L. Match parts to your exact engine rather than to the Escape name.",
    ],
    faqs: [
      {
        question: "What does P0299 mean on a Ford Escape?",
        answer:
          "That the turbocharger is producing less boost than the PCM asked for. It describes a shortfall in the result, not a failure of any particular component.",
      },
      {
        question: "Can I drive my Escape with P0299?",
        answer:
          "Yes, though it will feel flat and sluggish because the PCM usually reduces power when boost is off target. It is unlikely to cause immediate damage, but it wastes fuel and can mask another developing fault.",
      },
      {
        question: "Does P0299 mean my turbo is dead?",
        answer:
          "Usually not. On this platform the common causes are the wastegate regulating solenoid, a cracked charge pipe and a faulty wastegate actuator. The turbocharger is the last thing to suspect, not the first.",
      },
      {
        question: "How much does it cost to fix P0299 on an Escape?",
        answer:
          "Commonly $150 to $800 depending on the cause. A wastegate solenoid on the 1.6L is around $50–$100 in parts, and one documented real-world repair came to about $311 including diagnosis.",
      },
      {
        question: "Which Escape engines can get P0299?",
        answer:
          "Only the turbocharged ones — the 1.5L, 1.6L and 2.0L EcoBoost. The 2.5L naturally aspirated engine and the 2.5L hybrid have no turbocharger and cannot set this code.",
      },
      {
        question: "Why do I hear a whistle when I accelerate?",
        answer:
          "That is very likely your leak. Pressurised air escaping from a split coupler or a loose clamp whistles under load, and it is the cheapest cause on the list to fix.",
      },
      {
        question: "I have had both P0299 and P0234. What does that mean?",
        answer:
          "Under- and overboost together point strongly at the boost-control system itself rather than at a leak. The wastegate regulating solenoid is the usual answer, because a part that cannot control boost accurately can miss in either direction.",
      },
      {
        question: "Will a boost leak show up at idle?",
        answer:
          "Generally not. The charge-air system is only under positive pressure when you accelerate, so a leak can stay completely invisible while the engine idles. That is why a pressure test matters more than a visual inspection.",
      },
    ],
    closing: {
      title: "Proving the boost fault is actually fixed",
      paragraphs: [
        "Verification for P0299 is a road test with live data, not a quiet dashboard. The fault only appears when the engine is asked for boost, so it cannot be confirmed at idle in a workshop.",
        "Graph commanded boost against actual boost through a full acceleration in the conditions your freeze frame recorded. The two traces should track each other closely all the way to peak. A gap that opens at the top of the range means there is still a leak or a control problem at full boost, even if the low-speed behaviour now feels normal.",
        "If you replaced a coupler and the gap narrowed but did not close, look for a second leak rather than assuming the first repair was wrong. Charge-air couplers age at the same rate across a vehicle, and finding two is more common than finding one.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsP0299Escape, goPartsIntercooler, nhtsaTsb, fordManuals],
  },

  /* ------------------------------------------------------------------ P0234 */
  {
    slug: "ford/escape/p0234",
    code: "P0234",
    title: "P0234 Code Ford Escape: Turbo Overboost Causes & Fixes",
    description:
      "P0234 means your Escape's turbo made more boost than allowed. Why the wastegate solenoid is usually the cause, TSB coverage and costs.",
    definition: "Turbocharger/Supercharger 'A' Overboost Condition",
    severity: "Stop soon",
    vehicle: boostVehicle,
    driveAdvice:
      "Take this one more seriously than its underboost counterpart. Boost above the calibrated limit puts cylinder pressure and temperature beyond what the engine was designed for, and repeated overboost events are associated with head-gasket failure and turbocharger damage. Drive gently and get it diagnosed rather than continuing to load the engine.",
    quickAnswer:
      "P0234 means your Escape produced more boost than its calibration permits. The PCM saw actual boost exceed the limit and stored the code, usually cutting power to protect the engine at the same time. On 2013–2017 Escapes — particularly the 1.6L — the most common cause is a faulty turbocharger wastegate regulating solenoid, which is a documented failure on this platform and is covered by Ford bulletin 15-0162. The good news is that the usual part is inexpensive and reachable through the passenger-side wheel well.",
    symptoms: [
      {
        key: "power-cut",
        label: "Sudden power cut or reduced-power mode",
        response:
          "The PCM protecting the engine when boost exceeds its limit. That intervention is the strategy working, not a second fault, and it is the main reason overboost is noticed at all.",
      },
      {
        key: "surge",
        label: "Boost surges then drops away sharply",
        response:
          "Consistent with a wastegate that is not opening when commanded. Boost climbs past target because nothing is bleeding exhaust gas past the turbine, then the PCM intervenes.",
      },
      {
        key: "intermittent",
        label: "Only happens under hard acceleration",
        response:
          "Expected. Overboost needs the engine to be making boost in the first place, so the fault shows itself when you demand full load and stays hidden during gentle driving.",
      },
      {
        key: "both-codes",
        label: "P0299 also stored at some point",
        response:
          "This pairing is a strong signal. A boost-control system that can miss in both directions is a control fault rather than a leak, and the wastegate regulating solenoid is the usual answer.",
      },
      {
        key: "noise",
        label: "Unusual noise from the turbo area",
        response:
          "Worth investigating carefully. Repeated overboost stresses the turbocharger, so a noise that has appeared alongside this code may indicate the overboost has already caused damage.",
      },
      {
        key: "no-symptom",
        label: "Code stored but driving feels normal",
        response:
          "Possible if the event was brief. Do not ignore it — overboost is cumulative in its effect on head gaskets and turbo bearings, and the fault that caused one event will cause more.",
      },
    ],
    causes: [
      {
        cause: "Wastegate regulating solenoid (most common)",
        evidence:
          "Boost overshoots target repeatedly; solenoid does not respond correctly to commands; documented failure on 2013–2017 Escape, especially the 1.6L",
        firstTest:
          "Command the solenoid with a scan tool and confirm it actuates through its full range",
      },
      {
        cause: "Wastegate stuck closed",
        evidence:
          "Actuator rod will not move, or linkage is seized or binding so exhaust gas cannot bypass the turbine",
        firstTest:
          "Check the actuator rod moves freely through its full travel with the engine off",
      },
      {
        cause: "Faulty boost pressure sensor",
        evidence:
          "Reported boost does not match a mechanical gauge; sensor reading implausible for the conditions",
        firstTest:
          "Compare the sensor value against an independent pressure measurement",
      },
      {
        cause: "Vacuum or control line fault",
        evidence:
          "Line to the wastegate actuator is cracked, disconnected or routed incorrectly after previous work",
        firstTest:
          "Inspect and, where applicable, pressure-test the wastegate control lines",
      },
      {
        cause: "Aftermarket tuning or modification",
        evidence:
          "Vehicle has a performance tune, a modified intake or exhaust, or a boost controller fitted",
        firstTest:
          "Return the vehicle to stock calibration and hardware before diagnosing further",
      },
    ],
    deepDive: [
      {
        heading: "Why overboost matters more than underboost",
        paragraphs: [
          "Underboost is a performance complaint. Overboost is a durability problem. When boost exceeds the calibrated limit, cylinder pressure and combustion temperature rise beyond what the head gasket, pistons and turbocharger bearings were designed to tolerate.",
          "A single brief event is unlikely to destroy anything. Repeated events are a different matter — sustained overboost is associated with blown head gaskets and turbocharger failure, and the damage accumulates quietly. That is why this page recommends gentle driving and prompt diagnosis rather than the more relaxed advice on the underboost page.",
          "The PCM cutting power when it sees overboost is protecting the engine. Treat that intervention as useful information rather than as an inconvenience to drive around.",
        ],
      },
      {
        heading: "1.6L EcoBoost: the solenoid and the bulletin",
        paragraphs: [
          "On 2013–2017 Escapes, and particularly on the 1.6L, the turbocharger wastegate regulating solenoid is the documented common cause of this code. Ford covers the condition in bulletin 15-0162.",
          "The practical detail that matters: the part is commonly $50 to $100, and it is accessible through the passenger-side wheel well rather than requiring major disassembly. On the 1.6L the specific part is listed as CJ5Z-9K378-B. One documented real-world repair came to around $311 in total including the diagnostic.",
          "As always, a bulletin is not a recall and does not automatically cover your vehicle. Confirm the model year and build coverage against your VIN through a Ford dealer or the NHTSA database before assuming the remedy applies.",
        ],
      },
      {
        heading: "If the vehicle has been tuned",
        paragraphs: [
          "An aftermarket calibration, a boost controller, or modified intake and exhaust hardware can all produce boost above what the factory PCM expects — which is exactly what this code reports.",
          "If your Escape has any of that fitted, return it to stock before diagnosing. Chasing a wastegate solenoid on a vehicle that is deliberately being asked to make more boost than standard is a diagnostic dead end, and no replacement part will resolve it.",
        ],
      },
      {
        heading: "P0234 and P0299 together",
        bullets: [
          "Both codes describe boost missing its target, in opposite directions",
          "A leak causes underboost only — it cannot make boost too high",
          "A control fault can miss in either direction, which is why the pairing is diagnostic",
          "The wastegate regulating solenoid is the component that sits at the centre of both",
          "Seeing both codes should move the solenoid to the top of your list immediately",
        ],
      },
    ],
    freezeFrame: [
      "Commanded boost against actual boost, and by how much the actual value exceeded the limit",
      "Engine load, rpm and throttle position at the moment of the event",
      "Wastegate duty cycle or position command, showing whether the PCM was asking the wastegate to open",
      "Barometric pressure and intake air temperature",
      "Vehicle speed and gear, which indicate whether it happens under specific load conditions",
      "Any companion codes, especially P0299, misfire codes or knock-related data",
    ],
    steps: [
      {
        title: "Check for modifications first",
        detail:
          "An aftermarket tune, boost controller or modified hardware will produce this code by design. Return the vehicle to stock calibration before any component diagnosis, or you will chase a fault that is not a fault.",
      },
      {
        title: "Read the freeze frame for how far over it went",
        detail:
          "A small, brief overshoot suggests a control problem. A large excursion suggests the wastegate is not opening at all. The magnitude shapes where you look next.",
      },
      {
        title: "Command the wastegate solenoid",
        detail:
          "Actuate it with a scan tool and confirm it moves through its full range and holds. On the 1.6L this is the single highest-value test, and the part behind it is both cheap and accessible.",
      },
      {
        title: "Check the wastegate moves freely",
        detail:
          "With the engine off, confirm the actuator rod travels its full range and the linkage is not seized. A wastegate that cannot open cannot bleed exhaust gas past the turbine, and boost climbs unchecked.",
      },
      {
        title: "Verify the boost pressure sensor",
        detail:
          "Compare the reported value against an independent measurement. A sensor reading high produces this code with a perfectly healthy boost-control system behind it.",
      },
      {
        title: "Inspect the wastegate control lines",
        detail:
          "Look for cracked, disconnected or incorrectly routed lines, particularly on a vehicle that has had recent work in that area. A control line off its fitting removes the PCM's ability to open the wastegate.",
      },
      {
        title: "Confirm bulletin coverage on 2013–2017 vehicles",
        detail:
          "If your Escape falls in that range, check whether Ford bulletin 15-0162 covers your VIN before paying for a diagnosis of a condition Ford has already documented.",
      },
      {
        title: "Assess whether the overboost caused damage",
        detail:
          "After repairing the cause, check for the consequences: coolant loss, head-gasket symptoms, turbo noise or shaft play. Repeated overboost is associated with exactly those failures.",
      },
    ],
    tsbs: [
      {
        number: "TSB 15-0162",
        applies: "Documented turbocharger wastegate regulating solenoid condition on affected Escape applications",
        summary:
          "Ford bulletin coverage for the wastegate regulating solenoid failure associated with boost-control codes on this platform. Confirm model year and VIN coverage with a dealer or through NHTSA before assuming it applies to your vehicle.",
      },
    ],
    costs: [
      {
        job: "Scan-tool solenoid command test",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Easy with a capable scan tool",
        note: "Identifies the most common cause without removing anything",
      },
      {
        job: "Wastegate regulating solenoid",
        parts: "About $50–$100",
        shop: "Around $311 in one documented repair, with diagnosis",
        diy: "Moderate — via passenger-side wheel well",
        note: "Part CJ5Z-9K378-B on the 1.6L; the common fix on 2013–2017 vehicles",
      },
      {
        job: "Boost pressure sensor",
        parts: "Low to moderate",
        shop: "Modest labour",
        diy: "Easy to moderate",
        note: "Only after comparing its reading against an independent gauge",
      },
      {
        job: "Wastegate actuator",
        parts: "Moderate",
        shop: "Get a quote — may be integral to the turbo",
        diy: "Advanced",
        note: "Where the wastegate is seized rather than uncommanded",
      },
      {
        job: "Typical all-in P0234 repair",
        parts: "—",
        shop: "Commonly $200–$800",
        diy: "—",
        note: "Most land at the lower end once the solenoid is identified",
      },
      {
        job: "Head gasket after repeated overboost",
        parts: "—",
        shop: "Substantial — get a written quote",
        diy: "Not a DIY job",
        note: "The outcome that makes prompt diagnosis worthwhile",
      },
    ],
    dontReplace:
      "Do not replace the turbocharger for an overboost code. A worn turbo produces too little boost, not too much — if anything, overboost tells you the turbo is still perfectly capable of making pressure and that the thing controlling it has stopped working. Command the wastegate solenoid, check the wastegate moves, and verify the boost sensor before anything expensive is ordered.",
    yearNotes: [
      "P0234 applies only to turbocharged Escapes. The 2.5L naturally aspirated engine and the 2.5L hybrid have no turbocharger and cannot set it.",
      "On 2013–2017 Escapes, especially the 1.6L, the faulty turbocharger wastegate regulating solenoid is the documented common cause, with Ford bulletin 15-0162 covering the condition.",
      "The solenoid on the 1.6L is listed as part CJ5Z-9K378-B and is reached through the passenger-side wheel well.",
      "Any aftermarket tune or boost controller invalidates this diagnosis. Return the vehicle to stock calibration before treating the code as a fault.",
    ],
    faqs: [
      {
        question: "What does P0234 mean on a Ford Escape?",
        answer:
          "That the turbocharger produced more boost than the calibration allows. The PCM detected the excess and normally cut power to protect the engine.",
      },
      {
        question: "Is P0234 dangerous to drive with?",
        answer:
          "More so than underboost. Excess boost raises cylinder pressure and temperature beyond design, and repeated overboost is associated with head-gasket failure and turbocharger damage. Drive gently and get it diagnosed.",
      },
      {
        question: "What usually causes P0234 on an Escape?",
        answer:
          "On 2013–2017 vehicles, especially the 1.6L, the most common cause is a faulty turbocharger wastegate regulating solenoid — a documented condition covered by Ford bulletin 15-0162.",
      },
      {
        question: "How much does it cost to fix P0234?",
        answer:
          "Generally $200 to $800. The solenoid itself is around $50–$100, and one documented real-world repair came to roughly $311 including the diagnostic.",
      },
      {
        question: "Where is the wastegate solenoid on the 1.6L EcoBoost?",
        answer:
          "It is accessible through the passenger-side wheel well, which makes it a far more approachable job than its position in the engine bay might suggest.",
      },
      {
        question: "Can a tune cause P0234?",
        answer:
          "Yes, and commonly. An aftermarket calibration or boost controller can ask for more boost than the factory PCM permits. Return the vehicle to stock before diagnosing the code as a component fault.",
      },
      {
        question: "Does overboost mean my turbo is fine?",
        answer:
          "It suggests the turbo is still capable of making pressure, which is a good sign for the turbo itself. The fault is in whatever is supposed to limit that pressure — usually the wastegate or its solenoid.",
      },
      {
        question: "Should I check anything after fixing it?",
        answer:
          "Yes. Repeated overboost stresses head gaskets and turbo bearings, so look for coolant loss, head-gasket symptoms, turbo noise and shaft play once the cause is repaired.",
      },
    ],
    closing: {
      title: "Verifying an overboost repair safely",
      paragraphs: [
        "Confirming this repair requires putting the engine under load, which is also the condition that caused the damage risk in the first place. Do it deliberately and watch data rather than driving hard and hoping.",
        "Graph commanded and actual boost through a controlled full-throttle acceleration. Actual boost should track the command and level off at target rather than overshooting it. Watch for the PCM intervening — if power is still being cut, the fault is not resolved regardless of what you replaced.",
        "Then look at the consequences rather than just the code. Check the coolant level and the reservoir for bubbles, listen for new turbo noise, and confirm no misfire codes have appeared. Overboost damage tends to surface after the original fault is fixed, and catching it early is considerably cheaper than catching it late.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsP0234Escape, nhtsaTsb, fordManuals],
  },
];
