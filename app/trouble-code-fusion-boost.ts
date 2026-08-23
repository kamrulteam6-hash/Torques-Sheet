import type { TroubleCodeGuide } from "./trouble-code-data";
import { fordManuals, fordObd2017, fordObd2024, nhtsaTsb } from "./trouble-code-sources";
import { fusionVehicle, tsb160150Fusion, tsb192346 } from "./trouble-code-fusion";

/** Fusion boost, timing and fuel-trim codes: P0299, P0234, P0016, P0171. */

const boostVehicle = {
  ...fusionVehicle,
  kicker: "FORD FUSION · 1.5L, 1.6L, 2.0L & 2.7L ECOBOOST · TURBO ONLY",
  yearsIntro:
    "This code requires a turbocharger, so it applies to the EcoBoost engines only — the 1.5L, 1.6L and 2.0L four-cylinders and the 2.7L V6 in the Sport. The 2.5L Duratec and the 2.0L Atkinson hybrid have no turbocharger and cannot set it. If your scan tool is reporting it on one of those, check that it is connected to the right vehicle.",
};

export const troubleCodeFusionBoost: TroubleCodeGuide[] = [
  /* ------------------------------------------------------------------ P0299 */
  {
    slug: "ford/fusion/p0299",
    code: "P0299",
    title: "P0299 Code Ford Fusion: Turbo Underboost Causes & Fixes",
    description:
      "P0299 on a Ford Fusion EcoBoost. Why a smoke test can pass a faulty wastegate, what actually causes underboost, and repair costs.",
    definition: "Turbocharger/Supercharger 'A' Underboost Condition",
    severity: "Diagnose promptly",
    vehicle: boostVehicle,
    driveAdvice:
      "You can drive it, though it will feel noticeably flat because the PCM usually reduces power when boost is off target. It is unlikely to cause immediate damage. The reason not to leave it is that a boost shortfall can be a downstream symptom of something else — including timing chain wear — and living with the flat performance can mean missing that.",
    quickAnswer:
      "P0299 means your Fusion's PCM commanded a certain boost pressure, measured what arrived, and found a shortfall. It does not say the turbocharger failed, and usually it has not. The most common cause across Ford EcoBoost applications is the wastegate actuator, followed by leaks in the charge-air system. There is one diagnostic trap worth knowing before you start: a sticking wastegate actuator or a faulty control solenoid will pass a smoke test cleanly, because those are mechanical and electrical control problems rather than leaks in the piping.",
    symptoms: [
      {
        key: "flat",
        label: "Flat, sluggish acceleration",
        response:
          "The headline symptom. A small turbocharged engine without its commanded boost has very little left, and if the PCM has entered a reduced-power strategy the drop is sharper again.",
      },
      {
        key: "whistle",
        label: "Whistling or hissing under acceleration",
        response:
          "Pressurised air escaping from a joint. Follow the charge pipes from turbo through intercooler to throttle body looking for a split coupler or a relaxed clamp. This is the cheapest cause on the list and it announces itself.",
      },
      {
        key: "clean-smoke",
        label: "A smoke test came back clean but the code persists",
        response:
          "Important rather than confusing. A sticking wastegate or a faulty control solenoid is not a leak, so smoke will not find it. Move to commanding the wastegate and watching whether it actually moves.",
      },
      {
        key: "with-p0016",
        label: "P0016 stored alongside P0299",
        response:
          "Worth taking seriously. A stretched timing chain can produce a boost code alongside a correlation code, because the engine enters a protective strategy and the low-boost condition is recorded as a consequence. Address the timing question first.",
      },
      {
        key: "intermittent",
        label: "Comes and goes, worse when worked hard",
        response:
          "Typical of a wastegate actuator that is sticking rather than failed, or a leak that only opens at full boost. Drive the conditions from your freeze frame and watch commanded against actual boost.",
      },
      {
        key: "limp",
        label: "Reduced power mode",
        response:
          "The PCM protecting itself when boost is far from target. It is a consequence of the code rather than a separate fault, and it clears when the boost problem is repaired.",
      },
    ],
    causes: [
      {
        cause: "Wastegate actuator (most common)",
        evidence:
          "Commanded and actual boost diverge; actuator rod does not move through its range; smoke test came back clean",
        firstTest:
          "Confirm the actuator rod travels fully and responds when commanded — a smoke test cannot find this",
      },
      {
        cause: "Charge-air leak",
        evidence:
          "Whistling under load; oily residue at a joint; split coupler at a bend",
        firstTest:
          "Pressure-test the charge-air system, since a leak that opens only under boost stays invisible at idle",
      },
      {
        cause: "Wastegate control solenoid",
        evidence:
          "Solenoid does not respond correctly when commanded; both under- and overboost codes in the history",
        firstTest:
          "Command the solenoid with a scan tool and confirm it actuates and holds",
      },
      {
        cause: "Timing chain wear producing a secondary boost code",
        evidence:
          "P0016 or another correlation code stored alongside; higher mileage; rattle at start-up",
        firstTest:
          "Read all stored codes and graph desired against actual cam position before chasing boost hardware",
      },
      {
        cause: "Bypass valve diaphragm torn",
        evidence:
          "Boost builds then collapses rather than never appearing; diaphragm split on inspection",
        firstTest:
          "Remove the bypass valve and inspect its diaphragm directly",
      },
      {
        cause: "Turbocharger wear (least likely)",
        evidence:
          "Shaft play, noise or oil consumption alongside the shortfall, with the control system already proven good",
        firstTest:
          "Only after the actuator, solenoid, charge-air system and bypass valve have all been cleared",
      },
    ],
    deepDive: [
      {
        heading: "Why a clean smoke test does not clear the wastegate",
        paragraphs: [
          "This is the most useful thing on the page, because it explains an outcome that regularly sends people to a turbocharger quote for the wrong reason.",
          "A smoke test finds leaks. It pressurises the charge-air system with smoke and shows you where air is escaping — split couplers, relaxed clamps, cracked pipes. It is genuinely good at that job.",
          "But the most common cause of P0299 on Ford EcoBoost applications is the wastegate actuator, and a sticking actuator is not a leak. Neither is a faulty wastegate control solenoid. Both are mechanical or electrical control problems, and both will let a smoke test pass with a completely clean result while the engine continues to miss its boost target.",
          "So a clean smoke test is not the end of the diagnosis. It has eliminated one category of cause and pointed you at the other. The next step is to confirm the wastegate actually moves — command it, watch the rod travel its full range, and check that the solenoid responds.",
        ],
      },
      {
        heading: "When P0299 is really a timing problem",
        paragraphs: [
          "Boost codes and timing correlation codes turning up together is a pattern worth recognising, because chasing the boost code alone can waste a lot of money.",
          "A stretched timing chain changes the relationship between the camshafts and the crankshaft. When the PCM cannot trust that relationship it moves into a protective strategy, and the reduced performance that results can be recorded as a low-boost condition. The boost code is real, but it is a consequence rather than a cause.",
          "The tell is simple: check whether P0016 or another correlation code is stored alongside P0299. If it is, deal with the timing question first. Replacing a wastegate actuator on an engine with a stretched chain fixes nothing and leaves you with the same codes and a smaller bank balance.",
        ],
      },
      {
        heading: "Working through it in the right order",
        bullets: [
          "Read every stored code first — a P0016 alongside changes the entire plan",
          "Graph commanded against actual boost to see the shape of the shortfall",
          "Boost that never builds points at control; boost that builds then collapses points at a leak or bypass valve",
          "Pressure-test the charge-air system to eliminate the cheap causes",
          "If that comes back clean, command the wastegate and watch it physically move",
          "The turbocharger is the last thing on this list, not the first",
        ],
      },
    ],
    freezeFrame: [
      "Commanded boost against actual boost — the size and shape of the gap is the core evidence",
      "Engine load and rpm when the shortfall was detected",
      "Wastegate duty cycle or position command, showing what the PCM asked for",
      "Barometric pressure and intake air temperature",
      "Any companion codes, particularly correlation codes such as P0016",
      "Whether the PCM entered a reduced-power strategy at the same moment",
    ],
    steps: [
      {
        title: "Confirm the engine is turbocharged",
        detail:
          "The 2.5L Duratec and the 2.0L hybrid have no turbocharger and cannot set this code. Read the VIN or the underbonnet label before assuming there is a turbo to diagnose.",
      },
      {
        title: "Read every stored code, not just this one",
        detail:
          "A P0016 or another correlation code alongside P0299 points at timing chain wear producing a secondary boost fault. That changes the entire plan and should be resolved first.",
      },
      {
        title: "Graph commanded against actual boost",
        detail:
          "Watch both during a road test. Boost that never builds suggests a control fault; boost that builds and then collapses suggests a leak or a torn bypass diaphragm.",
      },
      {
        title: "Pressure-test the charge-air system",
        detail:
          "This finds split couplers and relaxed clamps that an idle inspection cannot. Do it before anything expensive, because these are the cheapest causes to fix.",
      },
      {
        title: "Do not stop at a clean smoke test",
        detail:
          "A sticking wastegate actuator or faulty control solenoid will pass a smoke test entirely, because neither is a leak. A clean result narrows the diagnosis rather than ending it.",
      },
      {
        title: "Command the wastegate and watch it move",
        detail:
          "Confirm the actuator rod travels its full range and that the control solenoid responds and holds. This is where the most common cause of this code actually lives.",
      },
      {
        title: "Inspect the bypass valve diaphragm",
        detail:
          "A torn diaphragm lets boost escape as soon as it builds, producing the build-then-collapse pattern. Removing and inspecting it takes minutes.",
      },
      {
        title: "Only then consider the turbocharger",
        detail:
          "With the actuator, solenoid, charge-air path and bypass valve all proven good, check the turbo for shaft play, noise and oil consumption. Reaching this step with everything else eliminated is what makes that diagnosis credible.",
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
        note: "Frequently just a clamp or split coupler rather than a whole pipe",
      },
      {
        job: "Wastegate control solenoid",
        parts: "Low to moderate",
        shop: "Modest labour",
        diy: "Moderate",
        note: "Cheaper than the actuator and worth testing first",
      },
      {
        job: "Wastegate actuator",
        parts: "Moderate",
        shop: "Roughly $400–$800 parts and labour",
        diy: "Advanced",
        note: "The most common cause across Ford EcoBoost applications",
      },
      {
        job: "Bypass valve",
        parts: "Moderate",
        shop: "Modest labour",
        diy: "Moderate",
        note: "Inspect the diaphragm before replacing the whole assembly",
      },
      {
        job: "Turbocharger replacement",
        parts: "Substantial",
        shop: "Get a written quote",
        diy: "Advanced",
        note: "Last resort, and only with everything else eliminated by testing",
      },
    ],
    dontReplace:
      "Do not price a turbocharger off this code, and do not treat a clean smoke test as proof the boost system is healthy. The most common cause is the wastegate actuator, and a sticking actuator or a faulty control solenoid passes a smoke test without a mark — because neither is a leak. Command the wastegate and watch it move before anything expensive is ordered.",
    yearNotes: [
      "P0299 applies only to the turbocharged engines: the 1.5L, 1.6L and 2.0L EcoBoost four-cylinders and the 2.7L EcoBoost V6 in the Sport.",
      "The 2.5L Duratec and the 2.0L Atkinson hybrid have no turbocharger and cannot set this code.",
      "The 2.7L V6 in the Sport has two turbochargers, so there are two of everything in the boost-control system. Identify which side before authorising work.",
      "A stretched timing chain can produce a boost code alongside a correlation code such as P0016. Read all stored codes before assuming the fault is in the boost hardware.",
    ],
    faqs: [
      {
        question: "What does P0299 mean on a Ford Fusion?",
        answer:
          "That the turbocharger produced less boost than the PCM asked for. It describes a shortfall in the result rather than naming a failed component.",
      },
      {
        question: "My smoke test was clean but the code is still there. Why?",
        answer:
          "Because the most common cause is not a leak. A sticking wastegate actuator or a faulty control solenoid is a mechanical or electrical control problem, and smoke testing cannot find either.",
      },
      {
        question: "Does P0299 mean my turbo has failed?",
        answer:
          "Usually not. The wastegate actuator is the most common cause across Ford EcoBoost applications, followed by charge-air leaks. The turbocharger is the last suspect.",
      },
      {
        question: "Which Fusion engines can set P0299?",
        answer:
          "Only the turbocharged ones — the 1.5L, 1.6L and 2.0L EcoBoost and the 2.7L V6 in the Sport. The 2.5L and the hybrid have no turbocharger.",
      },
      {
        question: "What if P0016 is stored alongside it?",
        answer:
          "Deal with the timing question first. A stretched chain can put the engine into a protective strategy that records a low-boost condition, so the boost code may be a consequence rather than the cause.",
      },
      {
        question: "How much does it cost to fix P0299 on a Fusion?",
        answer:
          "A charge-air coupler is under $60 in parts. A wastegate actuator runs roughly $400–$800 including labour. The spread is why the diagnostic order matters so much.",
      },
      {
        question: "Will a boost leak show up at idle?",
        answer:
          "Generally not. The charge-air system is only pressurised when you accelerate, so a leak can stay completely invisible while the engine idles.",
      },
      {
        question: "Can I drive with P0299?",
        answer:
          "Yes, though it will feel flat. The reason not to leave it indefinitely is that the shortfall can be a downstream symptom of something else worth catching early.",
      },
    ],
    closing: {
      title: "Proving the boost fault is actually fixed",
      paragraphs: [
        "Verification needs a road test with live data. The fault only appears when the engine is asked for boost, so it cannot be confirmed at idle in a workshop.",
        "Graph commanded against actual boost through a full acceleration in the conditions your freeze frame recorded. The two traces should track each other closely to peak. A gap that opens at the top of the range means there is still a control problem or a leak at full boost, even if low-speed driving now feels normal.",
        "If you replaced a coupler and the gap narrowed without closing, look for a second cause rather than assuming the first repair was wrong. And if a correlation code reappears alongside, stop working on boost hardware — the timing drive is telling you where the real problem is.",
      ],
    },
    sources: [fordObd2017, fordObd2024, nhtsaTsb, fordManuals],
  },

  /* ------------------------------------------------------------------ P0234 */
  {
    slug: "ford/fusion/p0234",
    code: "P0234",
    title: "P0234 Code Ford Fusion: Turbo Overboost Causes & Fixes",
    description:
      "P0234 means your Fusion made more boost than allowed. Why a worn turbo cannot cause it, what actually does, and why it matters.",
    definition: "Turbocharger/Supercharger 'A' Overboost Condition",
    severity: "Stop soon",
    vehicle: boostVehicle,
    driveAdvice:
      "Take this more seriously than underboost. Boost above the calibrated limit raises cylinder pressure and temperature beyond design, and repeated overboost is associated with head-gasket failure and turbocharger damage. On a small-displacement engine working hard, that margin is thinner than on a large one. Drive gently and get it diagnosed.",
    quickAnswer:
      "P0234 means your Fusion produced more boost than the calibration permits, and the PCM normally cut power at the same moment to protect the engine. Here is the reasoning that should shape your diagnosis: a worn or failing turbocharger makes too little boost, never too much. Overboost tells you the turbo is still perfectly capable of making pressure and that whatever is supposed to limit it has stopped doing so. That points at the wastegate, its actuator, its linkage or its control solenoid — and on a modified car, at the calibration itself.",
    symptoms: [
      {
        key: "power-cut",
        label: "Sudden power cut or reduced-power mode",
        response:
          "The PCM protecting the engine when boost exceeds its limit. That intervention is the strategy working, and it is usually how overboost gets noticed at all.",
      },
      {
        key: "surge",
        label: "Boost surges then drops away sharply",
        response:
          "Consistent with a wastegate not opening when commanded. Boost climbs past target because nothing is bleeding exhaust past the turbine, then the PCM steps in.",
      },
      {
        key: "hard-accel",
        label: "Only happens under hard acceleration",
        response:
          "Expected. Overboost needs the engine to be making boost in the first place, so it hides during gentle driving and appears when you demand full load.",
      },
      {
        key: "both",
        label: "P0299 also stored at some point",
        response:
          "A strong signal. A leak can only cause underboost — it cannot make boost too high. A system missing in both directions is a control fault, most often the wastegate or its solenoid.",
      },
      {
        key: "modified",
        label: "The car has a tune or modified hardware",
        response:
          "Then this may not be a fault. An aftermarket calibration or boost controller can ask for more boost than the factory PCM permits. Return to stock before diagnosing components.",
      },
      {
        key: "noise",
        label: "New noise from the turbo area",
        response:
          "Worth investigating. Repeated overboost stresses the turbocharger, so a noise appearing alongside this code may mean damage has already been done.",
      },
    ],
    causes: [
      {
        cause: "Wastegate stuck closed or linkage binding",
        evidence:
          "Actuator rod will not move through its range; linkage seized so exhaust cannot bypass the turbine",
        firstTest:
          "Check the actuator rod moves freely through full travel with the engine off",
      },
      {
        cause: "Wastegate control solenoid",
        evidence:
          "Boost overshoots repeatedly; solenoid does not respond correctly; both boost codes in the history",
        firstTest:
          "Command the solenoid with a scan tool and confirm it actuates through its full range",
      },
      {
        cause: "Faulty boost pressure sensor",
        evidence:
          "Reported boost does not match an independent gauge; value implausible for the conditions",
        firstTest:
          "Compare the sensor reading against a mechanical pressure measurement",
      },
      {
        cause: "Vacuum or control line fault",
        evidence:
          "Line to the wastegate actuator cracked, disconnected or misrouted after previous work",
        firstTest:
          "Inspect and pressure-test the wastegate control lines",
      },
      {
        cause: "Aftermarket tuning or modification",
        evidence:
          "Performance calibration, boost controller, or modified intake and exhaust hardware fitted",
        firstTest:
          "Return the car to stock calibration and hardware before diagnosing further",
      },
    ],
    deepDive: [
      {
        heading: "Overboost is a durability problem, not a performance one",
        paragraphs: [
          "Underboost costs you acceleration. Overboost costs you engine life, and the difference should shape how quickly you act.",
          "When boost exceeds the calibrated limit, cylinder pressure and combustion temperature rise past what the head gasket, pistons and turbocharger bearings were designed to tolerate. On a small-displacement engine already working hard for its output, that margin is narrower than on a large one.",
          "A single brief event is unlikely to destroy anything. Repeated events accumulate quietly — sustained overboost is associated with blown head gaskets and turbocharger failure, and neither announces itself until it is expensive. The PCM cutting power when it sees overboost is protecting you; treat that as useful information rather than an inconvenience.",
        ],
      },
      {
        heading: "Why the turbo is the one thing this cannot be",
        paragraphs: [
          "It is worth stating plainly because people reach for the turbocharger on any boost code. A turbocharger that is worn, damaged or failing produces less boost, not more. Its bearings drag, its seals leak, its wheels lose efficiency — every failure mode reduces output.",
          "Overboost therefore carries a piece of good news buried inside it: your turbocharger is still making pressure perfectly well. The fault is in the system that is supposed to stop it making too much, which means the wastegate, the linkage that operates it, the actuator that drives that linkage, or the solenoid that commands the actuator.",
          "That reasoning also tells you the likely cost. Those components are considerably cheaper than a turbocharger, and on most of these engines they are more accessible too.",
        ],
      },
      {
        heading: "Check the calibration before the hardware",
        bullets: [
          "An aftermarket tune can request boost above the factory limit by design",
          "A boost controller does the same thing more directly",
          "Modified intake or exhaust hardware changes how the standard calibration behaves",
          "None of those are faults the PCM can distinguish from a broken wastegate",
          "Return to stock first, or you will replace working parts chasing an intentional condition",
        ],
      },
    ],
    freezeFrame: [
      "Commanded boost against actual boost, and by how much the actual value exceeded the limit",
      "Engine load, rpm and throttle position at the moment of the event",
      "Wastegate duty cycle or position command, showing whether the PCM asked the gate to open",
      "Barometric pressure and intake air temperature",
      "Vehicle speed and gear, indicating whether it happens under specific load conditions",
      "Any companion codes, especially P0299 or knock-related data",
    ],
    steps: [
      {
        title: "Check for modifications first",
        detail:
          "A tune, a boost controller or modified hardware produces this code by design. Return the car to stock calibration before any component diagnosis, or you will chase a fault that is not one.",
      },
      {
        title: "Read the freeze frame for the magnitude",
        detail:
          "A small brief overshoot suggests a control problem. A large excursion suggests the wastegate is not opening at all. How far over it went shapes where you look next.",
      },
      {
        title: "Check the wastegate moves freely",
        detail:
          "With the engine off, confirm the actuator rod travels its full range and the linkage is not seized or binding. A gate that cannot open cannot limit boost.",
      },
      {
        title: "Command the control solenoid",
        detail:
          "Actuate it with a scan tool and confirm it moves through its range and holds. On the 2.7L V6 there are two, so check both sides.",
      },
      {
        title: "Verify the boost pressure sensor",
        detail:
          "Compare the reported value against an independent measurement. A sensor reading high produces this code with a perfectly healthy boost-control system behind it.",
      },
      {
        title: "Inspect the wastegate control lines",
        detail:
          "Look for cracked, disconnected or misrouted lines, particularly after recent work in that area. A control line off its fitting removes the PCM's ability to open the wastegate.",
      },
      {
        title: "Identify which turbo on the 2.7L V6",
        detail:
          "The Sport has two turbochargers. Establishing which side is overboosting prevents paying for work on the side that was functioning correctly.",
      },
      {
        title: "Assess whether damage was done",
        detail:
          "After repairing the cause, check for coolant loss, head-gasket symptoms, turbo noise or shaft play. Repeated overboost is associated with exactly those failures.",
      },
    ],
    costs: [
      {
        job: "Scan-tool solenoid command test",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Easy with a capable tool",
        note: "Identifies a common cause without removing anything",
      },
      {
        job: "Wastegate control solenoid",
        parts: "Low to moderate",
        shop: "Modest labour",
        diy: "Moderate",
        note: "Cheaper than the actuator and worth testing first",
      },
      {
        job: "Wastegate actuator",
        parts: "Moderate",
        shop: "Roughly $400–$800 parts and labour",
        diy: "Advanced",
        note: "Where the gate itself will not move when commanded",
      },
      {
        job: "Boost pressure sensor",
        parts: "Low to moderate",
        shop: "Modest labour",
        diy: "Easy to moderate",
        note: "Only after comparing its reading against an independent gauge",
      },
      {
        job: "Returning a tuned car to stock",
        parts: "Varies",
        shop: "Dealer or equipped shop",
        diy: "Depends on the tune",
        note: "Necessary before the code can be treated as a genuine fault",
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
      "Do not replace the turbocharger for an overboost code. Every turbocharger failure mode produces less boost, not more — so overboost actually tells you the turbo is still healthy enough to make pressure and that whatever limits it has stopped working. Check the wastegate movement, command the solenoid and verify the boost sensor. And if the car has a tune or a boost controller, return it to stock before treating this as a fault at all.",
    yearNotes: [
      "P0234 applies only to the turbocharged engines. The 2.5L Duratec and the 2.0L Atkinson hybrid cannot set it.",
      "The 2.7L EcoBoost V6 in the Sport has two turbochargers with separate wastegates and actuators. Identify which side before authorising work.",
      "Any aftermarket tune or boost controller invalidates this diagnosis, because the elevated boost is intentional rather than a fault.",
      "Small-displacement turbocharged engines have less thermal and mechanical margin than larger ones, so repeated overboost matters more here than on a big-capacity engine.",
    ],
    faqs: [
      {
        question: "What does P0234 mean on a Ford Fusion?",
        answer:
          "That the turbocharger produced more boost than the calibration allows. The PCM detected the excess and normally cut power to protect the engine.",
      },
      {
        question: "Does overboost mean my turbo is failing?",
        answer:
          "No — quite the opposite. Every turbocharger failure mode reduces boost. Overboost means the turbo is still making pressure and something else has stopped limiting it.",
      },
      {
        question: "Is P0234 dangerous to drive with?",
        answer:
          "More so than underboost. Excess boost raises cylinder pressure and temperature beyond design, and repeated events are associated with head-gasket failure and turbo damage.",
      },
      {
        question: "What usually causes it?",
        answer:
          "A wastegate that is not opening — seized, with a binding linkage, a failed actuator, or a control solenoid that is not commanding it. On a modified car, the calibration itself.",
      },
      {
        question: "Can a tune cause P0234?",
        answer:
          "Yes, and commonly. An aftermarket calibration or boost controller can ask for more boost than the factory PCM permits. Return to stock before diagnosing the code as a fault.",
      },
      {
        question: "How much does it cost to fix P0234 on a Fusion?",
        answer:
          "A control solenoid is modest. A wastegate actuator runs roughly $400–$800 including labour. Both are far below a turbocharger, which this code does not indicate anyway.",
      },
      {
        question: "My Fusion Sport has two turbos — which one?",
        answer:
          "Establish that before authorising work. Actuator replacement is quoted per side, so identifying the failed side avoids paying twice for a job you needed once.",
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
        "Confirming this repair means putting the engine under load, which is also the condition that created the risk. Do it deliberately with data rather than driving hard and hoping.",
        "Graph commanded and actual boost through a controlled full-throttle acceleration. Actual boost should track the command and level off at target rather than overshooting. If the PCM is still cutting power, the fault is not resolved regardless of what was replaced.",
        "Then look at the consequences rather than just the code. Check the coolant level and the reservoir for bubbles, listen for new turbo noise, and confirm no misfire codes have appeared. Overboost damage tends to surface after the original fault is fixed.",
      ],
    },
    sources: [fordObd2017, fordObd2024, nhtsaTsb, fordManuals],
  },

  /* ------------------------------------------------------------------ P0016 */
  {
    slug: "ford/fusion/p0016",
    code: "P0016",
    title: "P0016 Code Ford Fusion: Cam/Crank Timing Causes & Fixes",
    description:
      "P0016 on a Ford Fusion. Why oil condition matters more than you think, when a boost code appears with it, and what timing work costs.",
    definition: "Crankshaft Position — Camshaft Position Correlation (Bank 1, Sensor 'A')",
    severity: "Stop soon",
    vehicle: {
      ...fusionVehicle,
      yearsIntro:
        "Two things are worth establishing before you spend anything on this code. First, check the engine oil — variable cam timing is operated hydraulically, and low level, degraded oil or low pressure will set this code with a perfectly healthy timing drive. Second, read all stored codes: a boost code alongside this one usually means the timing problem is the cause and the boost shortfall the symptom, not the other way round.",
    },
    driveAdvice:
      "Limit driving and stop entirely for timing-cover noise, hard starting, stalling or low oil pressure. A mechanical timing error gets worse as you drive on it, and on an interference engine a timing component that fails completely bends valves — turning a chain job into an engine rebuild.",
    quickAnswer:
      "P0016 means your Fusion's PCM compared crankshaft position against the Bank 1 intake camshaft and did not find the relationship it expects. On these EcoBoost engines the usual mechanical cause is timing chain stretch, which develops gradually with mileage until the correlation drifts far enough to set the code. But before assuming that, check the oil. Variable cam timing runs on oil pressure, so low level, overdue oil or a blocked filter screen inside a VCT solenoid can produce exactly this code with the chain in perfect condition — and that is the cheapest possible outcome by a very wide margin.",
    symptoms: [
      {
        key: "rattle",
        label: "Rattle from the timing cover at start-up",
        response:
          "The classic sign of a stretched chain and worn guides. It typically settles after a second or two once oil pressure builds. Noise plus this code means stop driving rather than monitoring it.",
      },
      {
        key: "hard-start",
        label: "Long cranking before it starts",
        response:
          "Typical of a timing relationship that has drifted. The engine takes longer to find a workable combination of spark and valve timing.",
      },
      {
        key: "old-oil",
        label: "Oil change overdue or oil level low",
        response:
          "Check this before anything else. Variable cam timing is hydraulically operated, and degraded or insufficient oil can produce this code with a healthy chain. It is the cheapest outcome available.",
      },
      {
        key: "with-boost",
        label: "A boost code such as P0299 stored alongside",
        response:
          "Address the timing question first. A stretched chain can put the engine into a protective strategy that records a low-boost condition, so the boost code is likely a consequence rather than a separate fault.",
      },
      {
        key: "rough-power",
        label: "Rough running and reduced power",
        response:
          "Valve timing that is off disturbs combustion, and the PCM may also limit output when it cannot trust the cam relationship. Fix the timing before chasing ignition parts.",
      },
      {
        key: "intermittent",
        label: "Comes and goes, often on cold start",
        response:
          "Points toward oil pressure or a phaser rather than a mechanically stretched chain. A genuine mechanical error is generally constant rather than intermittent.",
      },
    ],
    causes: [
      {
        cause: "Low oil level, degraded oil or low pressure",
        evidence:
          "Overdue oil change, low level, or measured pressure below specification; code often intermittent",
        firstTest:
          "Check oil level and condition, then measure actual oil pressure against specification",
      },
      {
        cause: "Stretched timing chain and worn guides",
        evidence:
          "Rattle at start-up; higher mileage; correlation drifting steadily rather than intermittently",
        firstTest:
          "Listen at cold start, then graph desired against actual cam position on live data",
      },
      {
        cause: "VCT solenoid or blocked filter screen",
        evidence:
          "Solenoid does not respond to commands; screen blocked with debris from degraded oil",
        firstTest:
          "Command the solenoid and inspect its filter screen before condemning the phaser behind it",
      },
      {
        cause: "Cam phaser stuck or failing",
        evidence:
          "Actual cam position does not follow the commanded position; noise from the phaser area",
        firstTest:
          "Graph desired against actual Bank 1 intake cam position through the operating range",
      },
      {
        cause: "Cam or crank position sensor fault",
        evidence:
          "Signal dropouts on a scope; damaged trigger wheel; wiring chafed near heat",
        firstTest:
          "Inspect sensors, connectors and wiring and check signal quality before disassembly",
      },
      {
        cause: "Timing disturbed by previous work",
        evidence:
          "Code appeared shortly after engine work in that area rather than developing gradually",
        firstTest:
          "Verify timing against the factory marks using the correct locking tools",
      },
    ],
    deepDive: [
      {
        heading: "Check the oil before anyone opens the engine",
        paragraphs: [
          "This is the cheapest step in the entire diagnosis and it occasionally ends it, which is why it belongs first rather than as an afterthought.",
          "Variable camshaft timing is operated hydraulically by engine oil under pressure. The phasers that move the camshafts, the solenoids that control them and the passages that feed them all depend on adequate pressure and reasonably clean oil. Take any of that away and the camshaft stops going where the PCM asks it to.",
          "So low oil level, an overdue oil change, or oil pressure below specification can all produce P0016 with a timing chain in perfect condition. Sludge and debris can also block the small filter screen inside a VCT solenoid, which stops oil reaching the phaser entirely and mimics a phaser failure at a fraction of the cost.",
          "Before anyone quotes you for timing work, ask for the oil level and condition, an actual oil pressure reading, and a live graph of desired against actual cam position. Those three cost almost nothing and they separate a service-level problem from a mechanical one.",
        ],
      },
      {
        heading: "When a boost code appears alongside",
        paragraphs: [
          "On a turbocharged Fusion, seeing P0016 and a boost code such as P0299 together is a recognised pattern rather than a coincidence, and knowing which is the cause saves real money.",
          "A stretched timing chain changes the cam-to-crank relationship. When the PCM can no longer trust that relationship it moves into a protective strategy, and the reduced performance that follows gets recorded as a low-boost condition. The boost code is genuine, but it is downstream.",
          "The practical consequence: if both codes are present, deal with the timing question first. Replacing a wastegate actuator on an engine with a stretched chain fixes nothing, and you will still have both codes afterwards.",
        ],
      },
      {
        heading: "Telling the possible causes apart",
        bullets: [
          "Intermittent, often at cold start — oil pressure or a phaser rather than a jumped chain",
          "Constant, with hard starting — a mechanical timing error that has already happened",
          "Rattle from the timing cover at start-up — chain and guide wear",
          "Actual cam position never follows the command — phaser or VCT solenoid",
          "Signal dropouts on a scope — sensor, trigger wheel or wiring, not the timing drive",
          "Appeared right after other engine work — check what was disturbed before assuming wear",
        ],
      },
      {
        heading: "Why driving on it makes it worse",
        paragraphs: [
          "A timing relationship already outside specification does not stabilise. A chain stretched enough to set this code keeps stretching, and its guides keep wearing.",
          "The reason that matters here is what happens if a timing component fails completely. On an interference design the valves and pistons occupy the same space at different moments, and only correct timing keeps them apart. Lose timing entirely and they meet — which converts a chain-and-guides job into an engine rebuild.",
        ],
      },
    ],
    freezeFrame: [
      "Desired against actual Bank 1 intake camshaft position — the core measurement for this code",
      "Engine oil temperature and, where reported, oil pressure",
      "Engine rpm and load when the correlation error was detected",
      "Engine run time before the fault, separating a cold-start-only fault from a constant one",
      "Any companion codes — VCT circuit codes, boost codes or oil-pressure codes redirect the diagnosis",
      "Coolant temperature, since some VCT faults appear only when fully warm",
    ],
    steps: [
      {
        title: "Check oil level, condition and pressure",
        detail:
          "Variable cam timing runs on oil pressure. Low level, degraded oil or pressure below specification can set this code with a healthy chain, and this is the cheapest outcome available.",
      },
      {
        title: "Read every stored code",
        detail:
          "A boost code alongside this one usually means the timing problem is the cause and the boost shortfall the symptom. Working on boost hardware first wastes money.",
      },
      {
        title: "Listen at cold start",
        detail:
          "A rattle from the timing cover that settles after a second or two is characteristic of a stretched chain and worn guides. Noise plus this code means stop driving.",
      },
      {
        title: "Graph desired against actual cam position",
        detail:
          "Watch both through the operating range. A cam holding a fixed offset points at mechanical timing; a cam that never follows the command points at the phaser, the solenoid or oil pressure.",
      },
      {
        title: "Command the VCT solenoid and inspect its screen",
        detail:
          "A blocked filter screen stops oil reaching the phaser and mimics a much larger fault. Debris on that screen is evidence in itself about what the oil has been carrying.",
      },
      {
        title: "Check the position sensors and wiring",
        detail:
          "Inspect the cam and crank sensors, their connectors and the harness where it passes near heat. A damaged trigger wheel or chafed wire produces this code with the timing drive intact.",
      },
      {
        title: "Verify mechanical timing with proper tools",
        detail:
          "If the electrical and oil-side checks are clean, the timing itself needs verifying against the factory marks using the correct locking tools. Do not attempt this by eye.",
      },
      {
        title: "Complete the relearn after any timing work",
        detail:
          "Timing repairs usually require a cam or crank relearn before the PCM will trust the relationship again. Skipping it can leave the code stored after an entirely correct repair.",
      },
    ],
    costs: [
      {
        job: "Oil level, condition and pressure check",
        parts: "Low — oil and filter if due",
        shop: "Part of diagnosis",
        diy: "Easy for level; moderate for pressure",
        note: "Cheapest possible outcome and worth ruling out first",
      },
      {
        job: "Oil change with correct grade",
        parts: "Modest",
        shop: "Routine service pricing",
        diy: "Easy",
        note: "Sometimes the entire repair where degraded oil is the cause",
      },
      {
        job: "VCT solenoid and screen service",
        parts: "Moderate",
        shop: "Modest labour",
        diy: "Moderate",
        note: "Inspect the screen before condemning the phaser behind it",
      },
      {
        job: "Cam or crank position sensor",
        parts: "Low to moderate",
        shop: "Usually straightforward",
        diy: "Easy to moderate",
        note: "Only after signal quality has actually been checked",
      },
      {
        job: "Timing chain, guides and tensioner",
        parts: "Moderate to high — full kit",
        shop: "Commonly $1,500–$2,000 at an independent shop",
        diy: "Advanced — special tools essential",
        note: "Labour-dominated; get a written quote before agreeing",
      },
      {
        job: "Engine rebuild after timing failure",
        parts: "—",
        shop: "Substantial",
        diy: "Not a DIY job",
        note: "The outcome that prompt action is meant to avoid on an interference engine",
      },
    ],
    dontReplace:
      "Do not replace the camshaft position sensor because the code says 'camshaft position'. P0016 is a relationship test between two measurements, and a new sensor cannot correct a stretched chain, a stuck phaser, low oil pressure or a blocked VCT screen. Check the oil first, graph desired against actual cam position second, and only then decide what actually needs replacing. If a boost code is stored alongside, resolve the timing question before touching any boost hardware.",
    yearNotes: [
      "The EcoBoost engines are known for timing chain stretch developing with mileage until cam and crank correlation drifts enough to set this code.",
      "Variable cam timing is hydraulically operated, so oil level, oil condition and oil pressure all directly affect whether this code appears.",
      "A boost code stored alongside P0016 usually indicates the timing problem is causing a protective strategy that records low boost, rather than two separate faults.",
      "Timing work on these engines requires special tools to lock the camshafts and crankshaft in precise alignment. It is not a job to improvise.",
    ],
    faqs: [
      {
        question: "What does P0016 mean on a Ford Fusion?",
        answer:
          "That the PCM compared crankshaft position against the Bank 1 intake camshaft and did not find the expected relationship. Something in the timing drive has moved, or something is reporting position incorrectly.",
      },
      {
        question: "Can low oil cause P0016?",
        answer:
          "Yes, and it is the cheapest outcome. Variable cam timing is operated by oil pressure, so low level, degraded oil or pressure below specification can set this code with a perfectly healthy chain.",
      },
      {
        question: "Can I drive with P0016?",
        answer:
          "Keep it to a minimum, and stop entirely for timing-cover noise, hard starting, stalling or low oil pressure. On an interference engine, a timing component that fails completely can bend valves.",
      },
      {
        question: "How much does timing chain work cost on a Fusion?",
        answer:
          "Roughly $1,500 to $2,000 at an independent shop for the chain, guides and tensioner. Cheaper outcomes exist — an oil change, a VCT solenoid or a sensor — which is why the inexpensive checks come first.",
      },
      {
        question: "Why do I have a boost code as well?",
        answer:
          "A stretched chain can put the engine into a protective strategy that records a low-boost condition. The boost code is usually a consequence, so resolve the timing question first.",
      },
      {
        question: "Do I need a new camshaft position sensor?",
        answer:
          "Usually not. The code is a relationship test, not a sensor test. A new sensor cannot correct a stretched chain, a stuck phaser or low oil pressure.",
      },
      {
        question: "What does a rattle at start-up mean?",
        answer:
          "It is characteristic of a stretched chain and worn guides, and it typically settles once oil pressure builds. Combined with P0016 it is a reason to stop driving rather than to monitor it.",
      },
      {
        question: "Can a blocked VCT screen cause this?",
        answer:
          "Yes. The small filter screen inside the solenoid can block with debris, stopping oil reaching the phaser. It mimics a phaser failure at a fraction of the cost, so it is worth inspecting.",
      },
    ],
    closing: {
      title: "Verifying a timing repair properly",
      paragraphs: [
        "A quiet engine is not verification. Timing repairs need confirming with data and with the relearn procedure the PCM expects, or the code can remain stored after entirely correct work.",
        "After the repair, complete any cam or crank relearn the service information specifies, then graph desired against actual Bank 1 intake cam position across the operating range that originally set the code. The actual value should track the command closely and settle where it is asked to.",
        "Then check the conditions rather than just the code. Confirm oil level and pressure are correct, that no debris was found suggesting further wear, and that no new noise has appeared. If a boost code was stored alongside, confirm that has cleared too — if it has not, the timing was not the whole story.",
      ],
    },
    sources: [fordObd2017, fordObd2024, nhtsaTsb, fordManuals],
  },

  /* ------------------------------------------------------------------ P0171 */
  {
    slug: "ford/fusion/p0171",
    code: "P0171",
    title: "P0171 Code Ford Fusion: Causes & Fixes by Engine",
    description:
      "P0171 on a Ford Fusion by engine, including the 1.5L intake manifold bulletin and why coolant loss alongside a lean code matters.",
    definition: "System Too Lean (Bank 1)",
    severity: "Diagnose promptly",
    vehicle: fusionVehicle,
    driveAdvice:
      "You can usually keep driving a Fusion with P0171 if it still runs smoothly, but do not leave it for months. A lean mixture burns hotter than the engine was designed for, and sustained lean running is a recognised way to destroy a catalytic converter. On a 1.5L or 2.0L EcoBoost, check the coolant level too — a lean code arriving with coolant loss is a different conversation.",
    quickAnswer:
      "P0171 means your Fusion's PCM added as much fuel as its calibration allows trying to correct a lean reading, and ran out of room. On almost every Fusion engine that is an inline four, so Bank 1 is the whole engine and there is no second bank to compare against. Two causes dominate: unmetered air getting in past the mass-airflow sensor, and a MAF sensor under-reporting the air that does pass it. On a 1.5L there is a third possibility worth ruling out early, because Ford documented it in a bulletin and the remedy is specific.",
    symptoms: [
      {
        key: "rough-idle",
        label: "Rough idle that improves as you drive",
        response:
          "Classic vacuum-leak behaviour. At idle the leak is a large proportion of total airflow, so the mixture error is worst. Open the throttle and it becomes a small fraction of a much bigger flow.",
      },
      {
        key: "economy",
        label: "Fuel economy has dropped noticeably",
        response:
          "The PCM is adding fuel continuously to compensate for air it cannot account for. A strongly positive long-term fuel trim confirms it has been working hard for some time.",
      },
      {
        key: "coolant-1-5",
        label: "Coolant loss alongside the lean code on a 1.5L",
        response:
          "Check bulletin coverage before anything else. TSB 16-0150 covers a backed-out intake manifold bolt damaging the charge air cooler on some 2014–2017 vehicles, with exactly this symptom combination.",
      },
      {
        key: "hesitation",
        label: "Hesitation or stumble under acceleration",
        response:
          "On EcoBoost engines check the charge-air plumbing. A cracked or loose charge pipe leaks air the MAF has already measured, which produces this feeling when you ask for boost.",
      },
      {
        key: "cold-worse",
        label: "Worse when cold, better once warm",
        response:
          "Rubber and plastic shrink when cold, so a hose or gasket that seals at operating temperature can open a gap on a cold morning. Inspect while the engine is cold.",
      },
      {
        key: "misfire",
        label: "Misfire codes appeared as well",
        response:
          "A lean mixture misfires once it gets lean enough. Fix the lean condition first. If the engine is a 1.5L or 2.0L EcoBoost and coolant is also disappearing, treat that as the priority instead.",
      },
    ],
    causes: [
      {
        cause: "Vacuum or PCV hose leak",
        evidence:
          "Rough idle that smooths under load; positive long-term fuel trim highest at idle; cracked aged rubber",
        firstTest:
          "Smoke-test the intake system — it finds in minutes what visual inspection often misses",
      },
      {
        cause: "Dirty or contaminated MAF sensor",
        evidence:
          "Airflow reading lower than expected for load; oily film on the sensing element from PCV vapour",
        firstTest:
          "Remove and inspect the sensor, then clean with MAF-specific cleaner only",
      },
      {
        cause: "Intake manifold bolt damage (1.5L GTDI)",
        evidence:
          "Low coolant, white smoke and MIL on a 2014–2017 1.5L; charge air cooler damaged",
        firstTest:
          "Check whether TSB 16-0150 covers your VIN before pursuing anything else",
      },
      {
        cause: "Charge-air plumbing leak (EcoBoost)",
        evidence:
          "Hesitation under boost; oily residue at a joint; problem worsens under load rather than at idle",
        firstTest:
          "Pressure-test the charge-air system, since a leak after the MAF stays invisible at idle",
      },
      {
        cause: "Intake manifold gasket leak",
        evidence:
          "Trim correction concentrated at idle; smoke escapes at the manifold-to-head joint",
        firstTest:
          "Smoke-test with attention to the manifold sealing face",
      },
      {
        cause: "Low fuel pressure or restricted injector",
        evidence:
          "Trim correction worst under load rather than at idle; fuel pressure below specification",
        firstTest:
          "Compare commanded against actual fuel pressure before assuming the fault is on the air side",
      },
    ],
    deepDive: [
      {
        heading: "The 1.5L bulletin worth checking before anything else",
        paragraphs: [
          "If your Fusion has the 1.5L GTDI engine and the lean code arrived alongside coolant loss or white exhaust smoke, stop and check one thing first.",
          "Ford TSB 16-0150 covers some 2014–2017 Fusion vehicles where an intake manifold bolt backs out and damages the charge air cooler. The symptoms listed are low coolant, white exhaust smoke and an illuminated lamp — a combination that looks alarming and is easy to mistake for something far more serious on this engine family.",
          "The remedy is nothing like a short block. So on a 1.5L, checking bulletin coverage through a dealer or the NHTSA database costs nothing and can change the outcome substantially. Do it before authorising major work or accepting a diagnosis of coolant intrusion.",
        ],
      },
      {
        heading: "No second bank, so read trims across the rev range instead",
        paragraphs: [
          "On a V6 or V8, comparing Bank 1 against Bank 2 tells you immediately whether a fault is bank-specific or affects the whole engine. Almost every Fusion is an inline four, so that comparison is not available and you have to get your information a different way.",
          "The substitute is reading fuel trim at different operating points. Correction that is worst at idle and improves as revs rise points at a vacuum leak, because the leak becomes proportionally smaller as total airflow increases. Correction that is worst under load points instead at fuel delivery, or on a turbocharged engine at a charge-air leak downstream of the MAF.",
          "That single distinction — idle versus load — does most of the work that a bank comparison would have done, and it costs nothing but a few minutes with a live-data tool.",
        ],
      },
      {
        heading: "By engine",
        bullets: [
          "1.5L EcoBoost — check TSB 16-0150 first if coolant is also low; then MAF contamination and charge-air leaks",
          "1.6L and 2.0L EcoBoost — PCV oil vapour contaminating the MAF, and pressurised charge-air joints",
          "2.5L Duratec — no charge-air system at all; vacuum leaks, PCV hoses and the intake manifold gasket",
          "2.0L Hybrid — same leak paths as the 2.5L, but the engine cycles on and off so trims take longer to read",
          "2.7L EcoBoost V6 (Sport) — two banks, so compare Bank 1 against Bank 2 as well",
        ],
      },
      {
        heading: "Why the oxygen sensor is not the answer",
        paragraphs: [
          "It is the most commonly replaced part for this code and almost never the cause. The sensor is measuring oxygen in the exhaust and reporting that there is more of it than expected. That is precisely its job, and it is doing it correctly.",
          "Replacing it changes the messenger, not the message. The unmetered air or the fuel shortfall is still there, and the new sensor reports the same thing. Clean the MAF, smoke-test the intake, and on an EcoBoost pressure-test the charge-air side before any sensor is considered.",
        ],
      },
    ],
    freezeFrame: [
      "Short and long-term fuel trim, and crucially whether correction is worst at idle or under load",
      "Mass airflow reading against engine speed and load, which exposes a sensor under-reporting",
      "Engine coolant temperature, separating a cold-only leak from one present at full temperature",
      "Calculated engine load and rpm when the code matured",
      "Any companion codes — misfire codes, MAF performance codes or cooling-related codes change the order",
      "Fuel rail pressure, commanded against actual, where your scan tool reports both",
    ],
    steps: [
      {
        title: "Confirm the engine, and check coolant on a 1.5L",
        detail:
          "Read the VIN or underbonnet label. On a 1.5L with coolant loss alongside the lean code, check TSB 16-0150 coverage before pursuing anything else.",
      },
      {
        title: "Read fuel trims at idle and at cruise",
        detail:
          "Without a second bank to compare against, this is your main diagnostic tool. Worst at idle points at a vacuum leak; worst under load points at fuel delivery or a charge-air leak.",
      },
      {
        title: "Inspect and clean the MAF sensor",
        detail:
          "Particularly on EcoBoost engines, where PCV vapour leaves an oily film. Use MAF-specific cleaner, never touch the element, and let it dry fully. About $15 and fifteen minutes.",
      },
      {
        title: "Inspect the PCV hoses cold",
        detail:
          "Cold rubber shows cracks that warm rubber closes up. Work along the hoses paying attention to bends and anywhere a line passes near heat.",
      },
      {
        title: "Smoke-test the intake system",
        detail:
          "Watch the manifold gasket line, every hose junction, the intake boot, the brake booster line and the throttle body seal. This is the test that finds hidden leaks.",
      },
      {
        title: "Pressure-test the charge-air system on EcoBoost engines",
        detail:
          "A leak between turbo and throttle body only opens under boost and will pass an idle smoke test entirely. If the smoke test was clean on a turbocharged Fusion, this is your next step.",
      },
      {
        title: "Check fuel pressure and injector delivery",
        detail:
          "If trims are worst under load and the air side is clean, move to fuel supply. Compare commanded with actual rail pressure before condemning injectors.",
      },
      {
        title: "Verify by watching trims, not the dashboard",
        detail:
          "After the repair, bring the engine to full temperature and confirm long-term fuel trim has returned near zero at idle and under load. A light that has not come back on is not proof.",
      },
    ],
    tsbs: [tsb160150Fusion, tsb192346],
    costs: [
      {
        job: "MAF sensor cleaning",
        parts: "About $15 for cleaner",
        shop: "Often inside a diagnostic fee",
        diy: "Easy — 15 minutes",
        note: "First step on any EcoBoost Fusion; cheapest possible fix",
      },
      {
        job: "Smoke test diagnosis",
        parts: "$0",
        shop: "Roughly $75–$150",
        diy: "Needs a smoke machine",
        note: "Finds leaks that visual inspection will not",
      },
      {
        job: "PCV or vacuum hose replacement",
        parts: "Low — usually under $50",
        shop: "Roughly $150–$400 depending on access",
        diy: "Easy to moderate",
        note: "Cost is access rather than the part itself",
      },
      {
        job: "Charge-air pipe or clamp (EcoBoost)",
        parts: "Low to moderate",
        shop: "Mostly labour to access",
        diy: "Moderate",
        note: "Often a loose clamp or split coupler rather than a whole pipe",
      },
      {
        job: "TSB 16-0150 remedy (1.5L)",
        parts: "Charge air cooler and manifold hardware",
        shop: "Get a quote — far below engine work",
        diy: "Advanced",
        note: "Check coverage before accepting a larger diagnosis",
      },
      {
        job: "Intake manifold gasket",
        parts: "Moderate",
        shop: "Get a quote",
        diy: "Moderate to advanced",
        note: "Confirm with smoke before authorising",
      },
    ],
    dontReplace:
      "Do not buy an oxygen sensor because the code says the system is lean. The sensor is reporting extra oxygen accurately — that is its function. Clean the MAF, smoke-test the intake, and on an EcoBoost pressure-test the charge-air side first. And on a 1.5L with coolant loss alongside the lean code, check TSB 16-0150 coverage before anyone quotes you for engine work.",
    yearNotes: [
      "Almost every Fusion engine is an inline four, so Bank 1 is the whole engine. The 2.7L EcoBoost V6 in the Sport and the older 3.0L and 3.5L V6s do have two banks.",
      "TSB 16-0150 covers some 2014–2017 Fusion vehicles with the 1.5L GTDI where an intake manifold bolt backs out and damages the charge air cooler, presenting as low coolant and white smoke.",
      "On EcoBoost engines, PCV oil vapour contaminating the MAF sensor is a recognised cause of lean codes on this platform.",
      "The 2.5L Duratec and the 2.0L hybrid have no charge-air plumbing, which removes an entire category of leak from the diagnosis.",
    ],
    faqs: [
      {
        question: "What does P0171 mean on a Ford Fusion?",
        answer:
          "That the PCM added as much fuel as its calibration allows trying to correct a lean reading, and ran out of adjustment. Something is letting unmetered air in, or not enough fuel is arriving.",
      },
      {
        question: "Which Fusion engine do I have and does it matter?",
        answer:
          "It matters a great deal. Turbocharged engines add pressurised charge-air joints that the 2.5L and hybrid do not have, and the 1.5L has its own documented bulletin worth checking first.",
      },
      {
        question: "Can I drive with P0171?",
        answer:
          "Short-term, usually yes if it runs smoothly. A lean mixture burns hotter than designed though, and prolonged lean running can damage a catalytic converter.",
      },
      {
        question: "Why is my coolant low with a lean code on a 1.5L?",
        answer:
          "Check TSB 16-0150. It covers a backed-out intake manifold bolt damaging the charge air cooler on some 2014–2017 vehicles, and the symptoms are exactly low coolant, white smoke and a lit lamp.",
      },
      {
        question: "How much does it cost to fix P0171 on a Fusion?",
        answer:
          "From about $15 for MAF cleaner to several hundred for a gasket or charge-air repair. A $75–$150 smoke test is what decides which end of the range you are in.",
      },
      {
        question: "Do I need a new oxygen sensor?",
        answer:
          "Almost never for this code. The sensor is accurately reporting extra oxygen in the exhaust. Replacing it treats the messenger and leaves the leak exactly where it was.",
      },
      {
        question: "Why is my idle rough but driving is fine?",
        answer:
          "That pattern is close to diagnostic of a vacuum leak. At idle the leak is a large share of total airflow; open the throttle and it becomes a small share of a much bigger flow.",
      },
      {
        question: "Can a dirty MAF really cause a lean code?",
        answer:
          "Yes, and on EcoBoost engines it is common. PCV oil vapour leaves a film on the sensing element, the sensor under-reports airflow, and the PCM fuels for less air than is actually entering.",
      },
    ],
    closing: {
      title: "Confirming the repair with fuel trim, not the warning light",
      paragraphs: [
        "P0171 is verified with data. The fault is a gradual mixture error rather than a hard failure, so a lamp staying off for a day proves very little — the PCM needs to run its fuel monitor across a range of conditions first.",
        "Bring the engine to full operating temperature and watch long-term fuel trim at idle, then at a steady cruise. Both should sit near zero. A trim corrected at idle but still positive under load usually means you found one leak and left another — commonly a charge-air joint on an EcoBoost, which the idle smoke test could never have revealed.",
        "On the hybrid, allow noticeably more time. The engine cycles on and off, so trims take longer to settle into a value you can trust. Drive normally for a few days and re-check rather than judging from one short trip.",
      ],
    },
    sources: [fordObd2017, fordObd2024, nhtsaTsb, fordManuals],
  },
];
