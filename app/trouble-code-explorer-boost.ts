import type { TroubleCodeGuide } from "./trouble-code-data";
import { fordManuals, fordObd2017, fordObd2024, nhtsaTsb } from "./trouble-code-sources";
import { explorerVehicle, goPartsExplorerBank, goPartsExplorerP0299 } from "./trouble-code-explorer";

/**
 * Explorer boost and misfire codes: P0299, P0234, P0300, P0301.
 *
 * The boost pages apply only to the turbocharged engines and say so. The
 * misfire pages carry the bank/cylinder layout that catches people out on the
 * transverse V6, where Bank 1 sits against the firewall.
 */

const boostVehicle = {
  ...explorerVehicle,
  kicker: "FORD EXPLORER · 2.0L, 2.3L, 3.0L & 3.5L ECOBOOST · TURBO ONLY",
  yearsIntro:
    "This code needs a turbocharger, so it applies to the EcoBoost engines only — the 2.0L and 2.3L four-cylinders and the 3.5L and 3.0L EcoBoost V6s. The naturally aspirated 3.5L Ti-VCT, the 3.7L and the 3.3L hybrid have no turbocharger and cannot set it. On the V6 EcoBoost engines there are two turbochargers, which means two of everything in the boost-control system.",
};

export const troubleCodeExplorerBoost: TroubleCodeGuide[] = [
  /* ------------------------------------------------------------------ P0299 */
  {
    slug: "ford/explorer/p0299",
    code: "P0299",
    title: "P0299 Code Ford Explorer: Turbo Underboost Causes & Fixes",
    description:
      "P0299 on a Ford Explorer EcoBoost. Intercooler condensation, wastegate linkage, bypass valves, and why the turbo is the last suspect.",
    definition: "Turbocharger/Supercharger 'A' Underboost Condition",
    severity: "Diagnose promptly",
    vehicle: boostVehicle,
    driveAdvice:
      "You can drive it, but it will feel flat and sluggish because the PCM usually pulls power back when boost is off target. Continued driving is unlikely to destroy anything immediately, though it wastes fuel and can hide a second developing fault. If the shortfall arrives with a violent shudder under hard acceleration, that is a different problem — see the intercooler condensation section below.",
    quickAnswer:
      "P0299 means your Explorer's PCM asked for a certain amount of boost, measured what actually arrived, and found a shortfall. It does not say the turbocharger has failed, and on this platform it usually has not. On the 2016–2019 2.3L EcoBoost the wastegate linkage is a frequent failure point. On 2013-and-newer EcoBoost engines the electronic bypass valve on the intercooler is a prime suspect — check its diaphragm for tears. And on early 3.5L EcoBoost V6 engines there is a well-known condensation problem in the intercooler that produces a violent shudder and can trigger this code in humid conditions.",
    symptoms: [
      {
        key: "no-power",
        label: "Flat, sluggish acceleration",
        response:
          "The headline symptom. Without commanded boost these engines have very little left, and if the PCM has entered a reduced-power strategy the drop is sharper again.",
      },
      {
        key: "shudder",
        label: "Violent shudder under hard acceleration",
        response:
          "On an early 3.5L EcoBoost V6 this points at intercooler condensation rather than a leak. Water collected in the intercooler gets drawn into the intake in one slug under load, producing a shudder and misfire that can set this code. It is worst in humid climates.",
      },
      {
        key: "whistle",
        label: "Whistling or hissing under acceleration",
        response:
          "Air escaping from a pressurised joint. Follow the charge pipes from turbo through intercooler to throttle body looking for a split coupler or a relaxed clamp. This is the cheapest cause on the list and it announces itself.",
      },
      {
        key: "oily",
        label: "Oily film around a charge-pipe joint",
        response:
          "Oil mist travels through the charge-air system on any turbo engine and collects wherever pressurised air is escaping. That residue marks the leak location even when you cannot hear it.",
      },
      {
        key: "limp",
        label: "Reduced power mode",
        response:
          "The PCM protecting itself when boost is far from target. It is a consequence of the code rather than a separate fault, and it clears when the boost problem is repaired.",
      },
      {
        key: "intermittent",
        label: "Comes and goes, worse when working hard",
        response:
          "Typical of a wastegate linkage or actuator that is sticking rather than failed, or a leak that only opens at full boost. Drive the conditions from your freeze frame and watch commanded against actual boost.",
      },
    ],
    causes: [
      {
        cause: "Wastegate linkage or actuator",
        evidence:
          "Commanded and actual boost diverge; linkage binding, worn or disconnected; frequent failure point on the 2016–2019 2.3L",
        firstTest:
          "Inspect the linkage and confirm the actuator rod moves through its full travel",
      },
      {
        cause: "Electronic bypass valve diaphragm torn",
        evidence:
          "Boost builds then collapses; diaphragm split on inspection; prime suspect on 2013-and-newer EcoBoost engines",
        firstTest:
          "Remove the bypass valve from the intercooler and inspect the diaphragm directly",
      },
      {
        cause: "Cracked or loose charge pipe",
        evidence:
          "Whistling under load; oily residue at a joint; split coupler at a bend",
        firstTest:
          "Pressure-test the charge-air system rather than relying on a visual inspection",
      },
      {
        cause: "Intercooler condensation (early 3.5L EcoBoost)",
        evidence:
          "Violent shudder under hard acceleration, worse in humid weather; misfire codes alongside the boost code",
        firstTest:
          "Check the intercooler for accumulated water, particularly after short cold trips in humid conditions",
      },
      {
        cause: "Wastegate solenoid or control circuit",
        evidence:
          "Solenoid does not respond correctly when commanded; both under- and overboost codes in the history",
        firstTest:
          "Command the solenoid with a scan tool and confirm it actuates and holds",
      },
      {
        cause: "Turbocharger wear (least likely)",
        evidence:
          "Shaft play, noise or oil consumption alongside the shortfall, with the control system already proven good",
        firstTest:
          "Only after the linkage, bypass valve, charge-air system and solenoid have all been cleared",
      },
    ],
    deepDive: [
      {
        heading: "Intercooler condensation on the 3.5L EcoBoost V6",
        paragraphs: [
          "This one deserves its own section because it does not behave like an ordinary boost fault, and people chase turbochargers over it.",
          "Early 3.5L EcoBoost engines are known for accumulating condensation inside the factory intercooler, particularly in humid climates and on vehicles used for short trips where the intercooler never gets hot enough to evaporate the water. The water sits in the bottom of the intercooler doing nothing at light load.",
          "Then you accelerate hard. Airflow through the intercooler increases sharply, picks the collected water up in one slug, and delivers it into the intake. The result is a violent shudder, misfire, and in many cases a stored boost code. Owners describe it as the engine briefly stumbling badly under full throttle and then recovering.",
          "The characteristic that identifies it is the pattern: hard acceleration, humid conditions, a sudden shudder rather than a gradual loss of power, and often misfire codes stored alongside. Owner forums commonly discuss drilling a small weep hole in the bottom of the intercooler to let water drain, though that is an owner-level workaround rather than a factory remedy and it is worth understanding the implications before modifying a component.",
        ],
      },
      {
        heading: "2.3L EcoBoost (2016–2019): start at the wastegate linkage",
        paragraphs: [
          "On the 2016–2019 Explorer with the 2.3L EcoBoost, the wastegate linkage is a frequent point of failure. Linkages wear, bind and occasionally come adrift, and the result is a wastegate that no longer controls exhaust flow past the turbine the way the PCM expects.",
          "Because it is mechanical wear rather than an electrical failure, it often produces an intermittent fault that appears under heavy load and disappears in ordinary driving — which is exactly the pattern that makes people suspect the turbo itself.",
          "Inspect the linkage physically and confirm the actuator rod travels its full range. Ford also offers a service kit that allows the wastegate actuator to be replaced without buying a complete turbocharger assembly, which is worth asking about before anyone quotes you for a whole turbo.",
        ],
      },
      {
        heading: "The bypass valve on 2013-and-newer EcoBoost engines",
        paragraphs: [
          "On these engines the electronic bypass valve mounted on the intercooler is a recognised first suspect. Its job is to release pressurised air when the throttle closes, and it does that with a rubber diaphragm.",
          "Diaphragms tear. When one does, boost escapes through the valve instead of reaching the engine, and the PCM sees a shortfall. The failure mode is characteristic: boost builds and then collapses rather than never appearing at all.",
          "Removing the valve and inspecting the diaphragm directly takes minutes and either finds the fault or eliminates a common cause. It belongs early in the diagnosis rather than after a turbocharger quote.",
        ],
      },
      {
        heading: "Twin turbos mean two of everything",
        bullets: [
          "The 3.5L and 3.0L EcoBoost V6 engines have two turbochargers, each with its own wastegate and actuator",
          "A fault on one side produces a boost shortfall even though the other turbo is working perfectly",
          "Wastegate actuator replacement is commonly quoted per side, so establish which side before agreeing to both",
          "Ford's actuator service kit avoids buying a full turbo assembly where only the actuator has failed",
          "On the four-cylinder engines there is a single turbo, which simplifies the diagnosis considerably",
        ],
      },
    ],
    freezeFrame: [
      "Commanded boost against actual boost — the size and shape of the gap is the core evidence",
      "Engine load and rpm when the shortfall was detected",
      "Intake air temperature, which can point at an intercooler or charge-air problem",
      "Barometric pressure, since altitude affects what the PCM can achieve",
      "Wastegate duty cycle or position command, showing what the PCM asked the control system to do",
      "Any companion codes — misfire codes alongside a boost code suggest the condensation pattern",
    ],
    steps: [
      {
        title: "Confirm the engine is turbocharged",
        detail:
          "The naturally aspirated 3.5L Ti-VCT, the 3.7L and the 3.3L hybrid cannot set this code. Read the VIN or the underbonnet label before assuming a turbo exists to diagnose.",
      },
      {
        title: "Ask whether it shudders or just feels flat",
        detail:
          "A violent shudder under hard acceleration on an early 3.5L EcoBoost points at intercooler condensation, which is a completely different problem from a leak. A steady lack of power points at the control system or a leak.",
      },
      {
        title: "Watch commanded against actual boost",
        detail:
          "Graph both during a road test. Boost that never builds points at a control fault; boost that builds then collapses points at a leak or a bypass valve with a torn diaphragm.",
      },
      {
        title: "Inspect the bypass valve diaphragm",
        detail:
          "On 2013-and-newer EcoBoost engines this is a prime suspect and a quick check. Remove it from the intercooler and look at the diaphragm for tears before doing anything more involved.",
      },
      {
        title: "Inspect the wastegate linkage and actuator",
        detail:
          "Particularly on the 2016–2019 2.3L, where the linkage is a known weak point. Confirm the rod moves through its full travel and the linkage is not binding or disconnected.",
      },
      {
        title: "Pressure-test the charge-air system",
        detail:
          "A leak between turbo and throttle body only opens under boost and will pass an idle inspection completely. This is the test that finds split couplers and relaxed clamps.",
      },
      {
        title: "Command the wastegate solenoid",
        detail:
          "Confirm it actuates and holds. On twin-turbo V6 engines, check both sides — a fault on one produces a shortfall even with the other working normally.",
      },
      {
        title: "Only then consider the turbocharger",
        detail:
          "With the linkage, bypass valve, charge-air path and solenoid all proven good, check the turbo for shaft play, noise and oil consumption. Ask about the actuator service kit before agreeing to a complete assembly.",
      },
    ],
    costs: [
      {
        job: "Charge-air pressure test",
        parts: "$0",
        shop: "Usually inside a diagnostic fee",
        diy: "Needs a boost leak tester",
        note: "Eliminates the cheap causes before any part is ordered",
      },
      {
        job: "Bypass valve replacement",
        parts: "Moderate",
        shop: "Modest labour — mounted on the intercooler",
        diy: "Easy to moderate",
        note: "Prime suspect on 2013-and-newer EcoBoost engines",
      },
      {
        job: "Charge pipe or coupler",
        parts: "Low — often under $60",
        shop: "Mostly labour to access",
        diy: "Easy to moderate",
        note: "Frequently just a clamp or split coupler rather than a whole pipe",
      },
      {
        job: "Wastegate actuator (per side)",
        parts: "Ford service kit avoids a full turbo purchase",
        shop: "Roughly $400–$800 per side, parts and labour",
        diy: "Advanced",
        note: "Ask specifically about the actuator kit rather than a complete turbo assembly",
      },
      {
        job: "Intercooler drain or replacement",
        parts: "Varies",
        shop: "Get a quote",
        diy: "Moderate",
        note: "For the condensation pattern on early 3.5L EcoBoost engines",
      },
      {
        job: "Turbocharger replacement",
        parts: "Substantial",
        shop: "Get a written quote",
        diy: "Advanced",
        note: "The last resort, and only with everything else eliminated by testing",
      },
    ],
    dontReplace:
      "Do not price a turbocharger off this code. P0299 describes a boost shortfall, and on the Explorer it is usually produced by a torn bypass valve diaphragm, a worn wastegate linkage, a split charge-air coupler or — on early 3.5L EcoBoost engines — water sitting in the intercooler. Every one of those costs a fraction of a turbo. And if a wastegate actuator has genuinely failed, ask about Ford's actuator service kit before agreeing to buy the whole assembly.",
    yearNotes: [
      "P0299 applies only to the turbocharged engines: the 2.0L and 2.3L EcoBoost four-cylinders and the 3.5L and 3.0L EcoBoost V6s. The naturally aspirated 3.5L, the 3.7L and the 3.3L hybrid cannot set it.",
      "On 2016–2019 Explorers with the 2.3L EcoBoost, the wastegate linkage is a frequent failure point.",
      "On 2013-and-newer EcoBoost engines, the electronic bypass valve on the intercooler is a prime suspect — inspect its diaphragm for tears.",
      "Early 3.5L EcoBoost V6 engines are known for intercooler condensation, which produces a violent shudder under hard acceleration in humid conditions and can set boost and misfire codes together.",
    ],
    faqs: [
      {
        question: "What does P0299 mean on a Ford Explorer?",
        answer:
          "That the turbocharger produced less boost than the PCM asked for. It describes a shortfall in the result rather than naming a failed component.",
      },
      {
        question: "Which Explorer engines can set P0299?",
        answer:
          "Only turbocharged ones — the 2.0L and 2.3L EcoBoost four-cylinders and the 3.5L and 3.0L EcoBoost V6s. The naturally aspirated 3.5L, the 3.7L and the 3.3L hybrid have no turbo.",
      },
      {
        question: "Why does my Explorer shudder violently under hard acceleration?",
        answer:
          "On an early 3.5L EcoBoost that is the classic intercooler condensation pattern. Water collected in the intercooler is picked up in one slug when airflow increases, causing a shudder and misfire. It is worst in humid climates.",
      },
      {
        question: "Does P0299 mean my turbo has failed?",
        answer:
          "Usually not. The common causes on this platform are the bypass valve diaphragm, the wastegate linkage, charge-air leaks and intercooler condensation. The turbo is the last suspect, not the first.",
      },
      {
        question: "How much does it cost to fix P0299 on an Explorer?",
        answer:
          "It ranges widely. A charge-air coupler is under $60 in parts; a wastegate actuator runs roughly $400–$800 per side including labour. Ford's actuator service kit avoids buying a complete turbo assembly.",
      },
      {
        question: "Do twin-turbo Explorers have two of everything?",
        answer:
          "Yes. The 3.5L and 3.0L EcoBoost V6s have two turbochargers with their own wastegates and actuators, so establish which side has failed before agreeing to work on both.",
      },
      {
        question: "Will a boost leak show up at idle?",
        answer:
          "Generally not. The charge-air system is only pressurised when you accelerate, so a leak can stay completely invisible while the engine idles. That is why a pressure test matters more than looking.",
      },
      {
        question: "Can I drive with P0299?",
        answer:
          "Yes, though it will feel flat. It is unlikely to cause immediate damage, but it wastes fuel and can mask another developing fault, so it is worth diagnosing rather than living with.",
      },
    ],
    closing: {
      title: "Proving the boost fault is actually fixed",
      paragraphs: [
        "Verification here needs a road test with live data, not a quiet dashboard. The fault only appears when the engine is asked for boost, so it cannot be confirmed at idle in a workshop.",
        "Graph commanded against actual boost through a full acceleration in the conditions your freeze frame recorded. The two traces should track each other closely to peak. A gap that opens at the top of the range means there is still a leak or a control problem at full boost, even if low-speed driving now feels normal.",
        "If you were chasing the condensation pattern on a 3.5L EcoBoost, verify differently: drive it hard in the same humid conditions that produced the shudder, after the intercooler has had a chance to collect water again. A single dry-weather test tells you very little about a fault that depends on humidity.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsExplorerP0299, nhtsaTsb, fordManuals],
  },

  /* ------------------------------------------------------------------ P0234 */
  {
    slug: "ford/explorer/p0234",
    code: "P0234",
    title: "P0234 Code Ford Explorer: Turbo Overboost Causes & Fixes",
    description:
      "P0234 means your Explorer's turbo made more boost than allowed. Why the wastegate is usually to blame and why it matters more than underboost.",
    definition: "Turbocharger/Supercharger 'A' Overboost Condition",
    severity: "Stop soon",
    vehicle: boostVehicle,
    driveAdvice:
      "Take this more seriously than underboost. Boost above the calibrated limit puts cylinder pressure and temperature beyond design, and repeated overboost events are associated with head-gasket failure and turbocharger damage. Drive gently and get it diagnosed rather than continuing to load the engine.",
    quickAnswer:
      "P0234 means your Explorer produced more boost than its calibration permits. The PCM saw actual boost exceed the limit and stored the code, usually cutting power at the same time to protect the engine. The logic that follows is worth holding onto: a worn turbocharger makes too little boost, not too much. Overboost tells you the turbo is still perfectly capable of making pressure and that whatever is supposed to limit it has stopped working — which points at the wastegate, its linkage, its actuator or its control solenoid.",
    symptoms: [
      {
        key: "power-cut",
        label: "Sudden power cut or reduced-power mode",
        response:
          "The PCM protecting the engine when boost exceeds its limit. That intervention is the strategy working correctly, and it is usually how overboost gets noticed at all.",
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
        key: "both-codes",
        label: "P0299 also stored at some point",
        response:
          "A strong diagnostic signal. A leak can only cause underboost — it cannot make boost too high. A system that misses in both directions is a control fault, most often the wastegate or its solenoid.",
      },
      {
        key: "noise",
        label: "New noise from the turbo area",
        response:
          "Worth investigating carefully. Repeated overboost stresses the turbocharger, so a noise appearing alongside this code may mean the overboost has already caused damage.",
      },
      {
        key: "modified",
        label: "The vehicle has a tune or modified hardware",
        response:
          "Then this may not be a fault at all. An aftermarket calibration or boost controller can ask for more boost than the factory PCM permits. Return to stock before diagnosing components.",
      },
    ],
    causes: [
      {
        cause: "Wastegate stuck closed or linkage seized",
        evidence:
          "Actuator rod will not move through its range; linkage binding or seized so exhaust cannot bypass the turbine",
        firstTest:
          "Check the actuator rod moves freely through full travel with the engine off",
      },
      {
        cause: "Wastegate control solenoid",
        evidence:
          "Boost overshoots repeatedly; solenoid does not respond correctly to commands; both boost codes in the history",
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
          "Return the vehicle to stock calibration and hardware before diagnosing further",
      },
    ],
    deepDive: [
      {
        heading: "Why overboost matters more than underboost",
        paragraphs: [
          "Underboost is a performance complaint. Overboost is a durability problem, and the difference is worth understanding before you decide how urgently to act.",
          "When boost exceeds the calibrated limit, cylinder pressure and combustion temperature rise beyond what the head gasket, pistons and turbocharger bearings were designed to tolerate. A single brief event is unlikely to destroy anything. Repeated events are a different matter — sustained overboost is associated with blown head gaskets and turbocharger failure, and the damage accumulates quietly rather than announcing itself.",
          "The PCM cutting power when it sees overboost is protecting the engine. Treat that intervention as useful information rather than as an inconvenience to be driven around.",
        ],
      },
      {
        heading: "The wastegate is the component that limits boost",
        paragraphs: [
          "A turbocharger, left to itself, keeps making more boost as exhaust flow increases. The wastegate exists to bleed exhaust gas past the turbine so boost levels off at the calibrated target.",
          "That means overboost is almost always a wastegate story: the gate itself seized shut, a linkage that has worn or bound, an actuator that no longer moves it, or the solenoid that is supposed to command it. On the 2016–2019 2.3L in particular, the wastegate linkage is a recognised weak point and is worth inspecting physically rather than assuming it is fine because it looks intact.",
          "On the twin-turbo V6 engines there are two wastegates, so identify which side is overboosting before agreeing to work on both.",
        ],
      },
      {
        heading: "Check for modifications before anything else",
        paragraphs: [
          "An aftermarket calibration, a boost controller, or modified intake and exhaust hardware can all produce boost above what the factory PCM expects — which is precisely what this code reports.",
          "If your Explorer has any of that fitted, return it to stock before diagnosing. Chasing a wastegate solenoid on a vehicle that is deliberately being asked to make more boost than standard is a dead end, and no replacement part will resolve it.",
        ],
      },
      {
        heading: "P0234 and P0299 together",
        bullets: [
          "Both codes describe boost missing target, in opposite directions",
          "A leak causes underboost only — it physically cannot make boost too high",
          "A control fault can miss either way, which is why the pairing is diagnostic",
          "The wastegate and its control sit at the centre of both",
          "Seeing both should move the wastegate and solenoid straight to the top of your list",
        ],
      },
    ],
    freezeFrame: [
      "Commanded boost against actual boost, and by how much the actual value exceeded the limit",
      "Engine load, rpm and throttle position at the moment of the event",
      "Wastegate duty cycle or position command, showing whether the PCM asked the gate to open",
      "Barometric pressure and intake air temperature",
      "Vehicle speed and gear, indicating whether it happens under specific load conditions",
      "Any companion codes, especially P0299, misfire codes or knock-related data",
    ],
    steps: [
      {
        title: "Check for modifications first",
        detail:
          "A tune, a boost controller or modified hardware produces this code by design. Return the vehicle to stock calibration before any component diagnosis, or you will chase a fault that is not one.",
      },
      {
        title: "Read the freeze frame for how far over it went",
        detail:
          "A small brief overshoot suggests a control problem. A large excursion suggests the wastegate is not opening at all. The magnitude shapes where you look next.",
      },
      {
        title: "Check the wastegate moves freely",
        detail:
          "With the engine off, confirm the actuator rod travels its full range and the linkage is not seized or binding. On the 2.3L this linkage is a known weak point.",
      },
      {
        title: "Command the wastegate solenoid",
        detail:
          "Actuate it with a scan tool and confirm it moves through its range and holds. On twin-turbo V6 engines, check both sides.",
      },
      {
        title: "Verify the boost pressure sensor",
        detail:
          "Compare the reported value against an independent measurement. A sensor reading high produces this code with a perfectly healthy boost-control system behind it.",
      },
      {
        title: "Inspect the wastegate control lines",
        detail:
          "Look for cracked, disconnected or misrouted lines, particularly after recent work in that area. A control line off its fitting removes the PCM's ability to open the wastegate at all.",
      },
      {
        title: "Identify which turbo on a V6",
        detail:
          "The 3.5L and 3.0L EcoBoost have two turbochargers. Establishing which side is overboosting prevents paying for work on the side that was functioning correctly.",
      },
      {
        title: "Assess whether the overboost caused damage",
        detail:
          "After repairing the cause, check for consequences: coolant loss, head-gasket symptoms, turbo noise or shaft play. Repeated overboost is associated with exactly those failures.",
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
        job: "Wastegate solenoid",
        parts: "Low to moderate",
        shop: "Modest labour",
        diy: "Moderate",
        note: "Check both sides on a twin-turbo V6",
      },
      {
        job: "Wastegate actuator (per side)",
        parts: "Ford service kit available",
        shop: "Roughly $400–$800 per side, parts and labour",
        diy: "Advanced",
        note: "Ask about the actuator kit rather than a complete turbo assembly",
      },
      {
        job: "Boost pressure sensor",
        parts: "Low to moderate",
        shop: "Modest labour",
        diy: "Easy to moderate",
        note: "Only after comparing its reading against an independent gauge",
      },
      {
        job: "Returning a tuned vehicle to stock",
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
      "Do not replace the turbocharger for an overboost code. A worn turbo produces too little boost, not too much — overboost actually tells you the turbo is still capable of making pressure and that whatever limits it has stopped working. Check the wastegate movement, command the solenoid and verify the boost sensor before anything expensive is ordered. And on a twin-turbo V6, establish which side is at fault before agreeing to work on both.",
    yearNotes: [
      "P0234 applies only to the turbocharged engines. The naturally aspirated 3.5L, the 3.7L and the 3.3L hybrid have no turbocharger and cannot set it.",
      "On 2016–2019 Explorers with the 2.3L EcoBoost, the wastegate linkage is a documented weak point and is worth inspecting physically.",
      "The 3.5L and 3.0L EcoBoost V6 engines have two turbochargers, each with its own wastegate and actuator. Identify which side before authorising work.",
      "Any aftermarket tune or boost controller invalidates this diagnosis. Return the vehicle to stock calibration before treating the code as a component fault.",
    ],
    faqs: [
      {
        question: "What does P0234 mean on a Ford Explorer?",
        answer:
          "That the turbocharger produced more boost than the calibration allows. The PCM detected the excess and normally cut power to protect the engine.",
      },
      {
        question: "Is P0234 dangerous to drive with?",
        answer:
          "More so than underboost. Excess boost raises cylinder pressure and temperature beyond design, and repeated events are associated with head-gasket failure and turbocharger damage.",
      },
      {
        question: "Does overboost mean my turbo is fine?",
        answer:
          "It suggests the turbo is still capable of making pressure, which is a good sign for the turbo itself. The fault is in whatever is supposed to limit that pressure — usually the wastegate or its control.",
      },
      {
        question: "What usually causes P0234 on an Explorer?",
        answer:
          "A wastegate that is not opening — seized, with a worn or bound linkage, a failed actuator, or a control solenoid that is not commanding it. On the 2.3L the linkage is a recognised weak point.",
      },
      {
        question: "Can a tune cause P0234?",
        answer:
          "Yes, and commonly. An aftermarket calibration or boost controller can ask for more boost than the factory PCM permits. Return the vehicle to stock before diagnosing the code as a fault.",
      },
      {
        question: "My Explorer has two turbos — which one is the problem?",
        answer:
          "Establish that before authorising work. Wastegate actuator replacement is typically quoted per side, so identifying the failed side avoids paying twice for a job you needed once.",
      },
      {
        question: "How much does it cost to fix P0234?",
        answer:
          "A solenoid is modest; a wastegate actuator runs roughly $400–$800 per side including labour. Ford's actuator service kit means you should not need a complete turbo assembly for an actuator failure.",
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
        "Confirming this repair means putting the engine under load, which is also the condition that created the damage risk. Do it deliberately with data rather than driving hard and hoping.",
        "Graph commanded and actual boost through a controlled full-throttle acceleration. Actual boost should track the command and level off at target rather than overshooting. Watch for the PCM intervening — if power is still being cut, the fault is not resolved regardless of what was replaced.",
        "Then look at the consequences rather than just the code. Check coolant level and the reservoir for bubbles, listen for new turbo noise, and confirm no misfire codes have appeared. Overboost damage tends to surface after the original fault is fixed, and catching it early is much cheaper than catching it late.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsExplorerP0299, nhtsaTsb, fordManuals],
  },

  /* ------------------------------------------------------------------ P0300 */
  {
    slug: "ford/explorer/p0300",
    code: "P0300",
    title: "P0300 Code Ford Explorer: Random Misfire Causes & Fixes",
    description:
      "P0300 on a Ford Explorer by engine. Why rear-bank access matters on the V6, the intercooler shudder on EcoBoost, and repair costs.",
    definition: "Random/Multiple Cylinder Misfire Detected",
    severity: "Stop soon",
    vehicle: explorerVehicle,
    driveAdvice:
      "Stop driving if the check-engine light is flashing — that means active misfire severe enough to destroy a catalytic converter. Check the coolant level and the oil condition before driving anywhere with this code on a V6 Explorer, because coolant entering the oil is a documented problem on these engines and it changes the situation entirely.",
    quickAnswer:
      "P0300 means your Explorer's PCM detected misfire across more than one cylinder, or without any single cylinder dominating. On a V6 there is a practical complication the four-cylinder models do not have: on the 2011–2019 transverse engines, three of your six cylinders sit on the rear bank against the firewall, and reaching their coils and plugs is significantly harder than the front three. That access difference shapes both the diagnosis and the labour bill, and it is worth knowing before you start rather than halfway through.",
    symptoms: [
      {
        key: "flashing",
        label: "Check-engine light is flashing",
        response:
          "Stop as soon as it is safe. Raw fuel is reaching the exhaust in quantity and a catalytic converter can be destroyed in minutes. This overrides everything else on the page.",
      },
      {
        key: "shudder",
        label: "Violent shudder under hard acceleration only",
        response:
          "On an early 3.5L EcoBoost this is the intercooler condensation pattern rather than an ignition fault. Water collected in the intercooler is drawn into the intake in one slug under load. It is worst in humid climates.",
      },
      {
        key: "milky-oil",
        label: "Milky oil or coolant disappearing with no leak",
        response:
          "On the 3.5L or 3.7L V6, treat this as urgent. The internal water pump can leak coolant into the oil, and coolant reaching the combustion chambers causes misfire. Stop driving and investigate before replacing ignition parts.",
      },
      {
        key: "rough-idle",
        label: "Rough idle that improves under load",
        response:
          "More typical of an ordinary cause — a vacuum leak, aged plugs or a weak coil. Pull the freeze frame and individual cylinder counters before replacing anything.",
      },
      {
        key: "rear-cylinders",
        label: "Misfire counters concentrated on cylinders 1, 2 or 3",
        response:
          "On the 2011–2019 transverse V6 those are the rear bank against the firewall. Rear-bank plugs and coils are frequently overdue simply because they are harder to reach and get skipped during earlier service.",
      },
      {
        key: "power-economy",
        label: "Power loss and worse fuel economy",
        response:
          "Several cylinders not contributing properly. The PCM is still injecting fuel into cylinders that are not burning it, which is why economy drops and the converter is at risk.",
      },
    ],
    causes: [
      {
        cause: "Worn plugs or failing coils, often rear bank",
        evidence:
          "High mileage since the last change; counters concentrated on one bank; plugs on the rear bank visibly older than the front",
        firstTest:
          "Read counters by cylinder, then inspect plugs on the affected bank",
      },
      {
        cause: "Vacuum or intake manifold gasket leak",
        evidence:
          "Positive fuel trims alongside the misfire; rough idle improving under load; lean codes stored",
        firstTest:
          "Smoke-test the intake, paying attention to the manifold faces on both banks",
      },
      {
        cause: "Coolant entering the cylinders",
        evidence:
          "Milky oil, coolant loss with no external leak, white exhaust smoke or a sweet smell",
        firstTest:
          "Inspect the oil and run a combustion-gas test before replacing ignition components",
      },
      {
        cause: "Intercooler condensation (early 3.5L EcoBoost)",
        evidence:
          "Violent shudder under hard acceleration in humid conditions; misfire and boost codes stored together",
        firstTest:
          "Check the intercooler for accumulated water and consider the driving pattern and climate",
      },
      {
        cause: "Fuel delivery problem",
        evidence:
          "Misfire worse under load; fuel pressure below specification; injector imbalance",
        firstTest:
          "Compare commanded against actual fuel pressure, then test injector delivery",
      },
      {
        cause: "Timing chain wear affecting valve timing",
        evidence:
          "Rattle at start-up; correlation codes such as P0016 stored alongside; high mileage V6",
        firstTest:
          "Read all stored codes and graph desired against actual cam position",
      },
    ],
    deepDive: [
      {
        heading: "The rear bank problem on the transverse V6",
        paragraphs: [
          "On the 2011–2019 Explorer with a transverse V6, cylinders 1, 2 and 3 sit on the rear bank against the firewall. That single fact explains a great deal about misfire on these vehicles.",
          "Rear-bank plugs and coils are genuinely awkward to reach. The practical consequence is that they get skipped. A vehicle can arrive with three fresh front-bank plugs and three original rear-bank plugs, because a previous owner or a rushed service did the easy half. When misfire appears years later, it appears on the rear bank — not because those cylinders are weaker, but because those plugs are older.",
          "So when you read the misfire counters, note which bank they cluster on. Counters concentrated on cylinders 1, 2 and 3 on this platform should make you ask when those specific plugs were last changed, and whether they were changed at all.",
          "It also means a labour quote for rear-bank work will be higher than the same job on the front, and that is legitimate rather than a shop taking advantage.",
        ],
      },
      {
        heading: "Check the oil before you buy ignition parts",
        paragraphs: [
          "On the 3.5L and 3.7L V6 there is a documented failure that presents as misfire and is not an ignition problem at all. The water pump on these engines sits inside the engine, driven by the timing chain, and when its seal fails it leaks coolant directly into the oil.",
          "Coolant in the oil is bad enough on its own. Coolant reaching the combustion chambers causes misfire. And the same contamination accelerates timing chain wear, which disturbs valve timing and causes misfire by a second route.",
          "The check costs nothing. Pull the dipstick and look at the oil. Milky or coffee-coloured oil, or a level that has risen rather than fallen, means coolant is getting in. Combined with coolant disappearing and no puddle underneath, that is a recognised pattern on this engine and it needs addressing before any ignition part is purchased.",
        ],
      },
      {
        heading: "EcoBoost engines: the shudder that is not ignition",
        paragraphs: [
          "If your Explorer has an early 3.5L EcoBoost and the misfire arrives as a violent shudder under hard acceleration — particularly in humid weather — the cause may be water rather than spark.",
          "These engines are known for accumulating condensation inside the intercooler. At light load it sits harmlessly in the bottom. Under hard acceleration, increased airflow picks it up and delivers it into the intake in one slug, producing a shudder, misfire and often a boost code at the same time.",
          "The identifying pattern is specific: hard acceleration only, humid conditions, sudden shudder rather than gradual roughness, and frequently boost codes stored alongside the misfire. New plugs and coils will not change it.",
        ],
      },
      {
        heading: "The order that saves money on any Explorer",
        bullets: [
          "Check the oil and coolant — costs nothing and rules out the expensive scenario on a V6",
          "Read individual cylinder counters, not just P0300 — the pattern tells you which bank",
          "Ask whether the rear-bank plugs have ever been changed on a transverse V6",
          "Inspect plugs on the affected bank before buying coils",
          "Smoke-test for vacuum leaks if fuel trims are positive",
          "Consider intercooler condensation if the symptom is a shudder under load on an EcoBoost",
        ],
      },
    ],
    freezeFrame: [
      "Individual cylinder misfire counters — the bank they cluster on is genuinely informative on a V6",
      "Engine coolant temperature, separating a cold-start-only fault from a fully warm one",
      "Short and long-term fuel trim on both banks; positive trims point at a lean condition as the cause",
      "Engine load and rpm, distinguishing idle misfire from load misfire",
      "Any companion codes — lean codes, boost codes or a P0016 change the diagnosis entirely",
      "Vehicle speed and throttle position when the counters climbed",
    ],
    steps: [
      {
        title: "Inspect the oil and coolant first",
        detail:
          "On a 3.5L or 3.7L V6 this is the step that protects you from spending money on the wrong problem. Milky oil or coolant loss with no puddle means the internal water pump, not a coil.",
      },
      {
        title: "Save the freeze frame and all cylinder counters",
        detail:
          "Record misfire counts for every cylinder before clearing anything. On a V6, note which bank they cluster on — that is a real clue rather than an incidental detail.",
      },
      {
        title: "Ask when the rear-bank plugs were last done",
        detail:
          "On the 2011–2019 transverse V6, rear-bank plugs get skipped because they are hard to reach. Counters on cylinders 1, 2 and 3 with no service history for that bank is close to an answer on its own.",
      },
      {
        title: "Inspect plugs on the affected bank",
        detail:
          "Lay them out in cylinder order and compare. Deposits narrow the cause further — sooty for rich, wet for no ignition, oily for oil intrusion, and coolant deposits for something considerably worse.",
      },
      {
        title: "Swap a coil rather than replacing several",
        detail:
          "Move a coil from a misfiring cylinder to a healthy one, label both, clear the code and drive the conditions from your freeze frame. If the misfire follows the coil you have found it for free.",
      },
      {
        title: "Smoke-test for vacuum leaks",
        detail:
          "If fuel trims are positive alongside the misfire, the lean condition is likely the cause. On the 3.5L V6, the intake manifold gasket is a recognised leak point worth particular attention.",
      },
      {
        title: "Consider intercooler condensation on EcoBoost engines",
        detail:
          "If the symptom is a violent shudder under hard acceleration in humid conditions rather than a steady roughness, water in the intercooler is a more likely explanation than ignition parts.",
      },
      {
        title: "Read all codes for timing correlation faults",
        detail:
          "A P0016, P0017 or P0019 stored alongside the misfire points at timing chain wear disturbing valve timing. That is a different repair and it should be addressed before ignition parts.",
      },
    ],
    costs: [
      {
        job: "Oil and coolant inspection",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Trivial",
        note: "The single most valuable early check on a V6 Explorer",
      },
      {
        job: "Coil swap diagnostic",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Easy on the front bank, harder on the rear",
        note: "Finds or eliminates the most common ignition cause for free",
      },
      {
        job: "Spark plugs — front bank",
        parts: "Moderate for three",
        shop: "Straightforward access",
        diy: "Easy to moderate",
        note: "The half that usually gets done",
      },
      {
        job: "Spark plugs — rear bank",
        parts: "Same parts cost",
        shop: "Noticeably higher labour",
        diy: "Advanced on the transverse V6",
        note: "The half that usually gets skipped, which is why misfire appears there",
      },
      {
        job: "Intake manifold gasket set",
        parts: "Moderate",
        shop: "From roughly $278 upward",
        diy: "Moderate to advanced",
        note: "Where a vacuum leak is the underlying cause",
      },
      {
        job: "Internal water pump and timing repair",
        parts: "Around $1,500",
        shop: "Roughly $1,500–$3,500",
        diy: "Not realistic for most owners",
        note: "Where coolant contamination is confirmed — see the P0016 guide",
      },
    ],
    dontReplace:
      "Do not buy six coils and six plugs before checking the oil and coolant on a V6 Explorer. Coolant entering the oil from the internal water pump is a documented problem on these engines, it causes misfire, and no amount of ignition hardware will fix it. The check takes two minutes with a dipstick. And when you do replace plugs, do the rear bank too — leaving three original plugs in place because they are awkward to reach is exactly how the next misfire happens.",
    yearNotes: [
      "On the 2011–2019 transverse V6, cylinders 1, 2 and 3 are on the rear bank against the firewall. Their plugs and coils are harder to reach and frequently get skipped during service.",
      "The 3.5L and 3.7L V6 use an internal water pump that can leak coolant into the oil, causing misfire directly and accelerating timing chain wear.",
      "Early 3.5L EcoBoost engines are known for intercooler condensation producing a violent shudder and misfire under hard acceleration in humid conditions.",
      "The Explorer moved to a longitudinal rear-wheel-drive platform for 2020, changing engine orientation and component access. Do not carry the earlier layout onto a newer vehicle.",
    ],
    faqs: [
      {
        question: "What does P0300 mean on a Ford Explorer?",
        answer:
          "That the PCM detected misfire across more than one cylinder, or with no single cylinder dominating. It names a symptom rather than a failed part.",
      },
      {
        question: "Which cylinders are on the rear bank of my Explorer?",
        answer:
          "On the 2011–2019 transverse V6, cylinders 1, 2 and 3 sit on the rear bank against the firewall. Cylinders 4, 5 and 6 are on the front bank nearest the radiator.",
      },
      {
        question: "Why does misfire keep appearing on the rear bank?",
        answer:
          "Often because those plugs are older. Rear-bank plugs are awkward to reach on the transverse V6 and get skipped during service, so they wear out years after the front ones were replaced.",
      },
      {
        question: "Can I drive my Explorer with P0300?",
        answer:
          "Not if the light is flashing, and not if the oil looks milky. On a V6, coolant entering the oil from the internal water pump causes misfire and needs addressing before you drive on it.",
      },
      {
        question: "Why does my Explorer shudder only under hard acceleration?",
        answer:
          "On an early 3.5L EcoBoost that is the intercooler condensation pattern. Water collected in the intercooler is picked up in one slug when airflow increases. Ignition parts will not change it.",
      },
      {
        question: "How much does it cost to fix P0300 on an Explorer?",
        answer:
          "From a single coil to a timing and water pump repair costing several thousand. That range is exactly why the free oil and coolant check comes first.",
      },
      {
        question: "Should I replace all six coils?",
        answer:
          "No. Read the individual counters, then swap one coil to test it. On a transverse V6 the rear-bank labour makes blanket replacement expensive, and if the cause is coolant or a vacuum leak it changes nothing.",
      },
      {
        question: "What does milky oil mean on my Explorer?",
        answer:
          "Coolant is mixing with the engine oil. On the 3.5L and 3.7L that most often means the internal water pump seal has failed, and it explains both the misfire and any timing codes stored alongside.",
      },
    ],
    closing: {
      title: "Verifying a misfire repair on an Explorer",
      paragraphs: [
        "Write down the freeze frame and every cylinder counter before clearing anything. Those numbers are the only record of the conditions that produced the misfire, and you need them to prove the repair worked.",
        "After the repair, drive the load, rpm and temperature conditions the freeze frame recorded and confirm the counters stay at zero across all of them. On a V6, watch both banks — a repair that fixed the rear bank can leave a developing fault on the front one entirely unnoticed.",
        "If coolant contamination was involved, check the oil again after a few hundred miles. Clean oil at that point is the real confirmation that the underlying cause was addressed, and it is worth considerably more than a dashboard that happens to be dark.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsExplorerBank, nhtsaTsb, fordManuals],
  },

  /* ------------------------------------------------------------------ P0301 */
  {
    slug: "ford/explorer/p0301",
    code: "P0301",
    title: "P0301 Code Ford Explorer: Cylinder 1 Misfire Causes & Fixes",
    description:
      "P0301 on a Ford Explorer. Where cylinder 1 actually is on the V6, why that makes the job harder, and the free test that finds the fault.",
    definition: "Cylinder 1 Misfire Detected",
    severity: "Stop soon",
    vehicle: explorerVehicle,
    driveAdvice:
      "A flashing light means stop as soon as it is safe — active misfire that severe threatens the catalytic converter. A steady light with an engine that still runs reasonably may allow a short, gentle trip for diagnosis. On a V6 Explorer, check the oil for coolant contamination before you drive anywhere, because that is a documented cause of misfire on these engines.",
    quickAnswer:
      "P0301 is better news than P0300 because your Explorer has already named the cylinder. The catch on a V6 is where that cylinder is. On the 2011–2019 transverse 3.5L V6, cylinder 1 sits on the rear bank against the firewall — the harder half of the engine to reach, and the opposite of what most people assume. So the diagnosis is simpler than P0300 but the access is worse, and knowing that before you start saves an afternoon of looking at the wrong side of the engine bay.",
    symptoms: [
      {
        key: "rough-idle",
        label: "Rough idle that smooths as you drive",
        response:
          "Classic single-cylinder misfire. At idle nothing masks the missing contribution. Pull the freeze frame before touching anything — it records where the misfire actually happened.",
      },
      {
        key: "flashing",
        label: "Check-engine light is flashing",
        response:
          "Stop as soon as it is safe. Raw fuel is reaching the exhaust and a catalytic converter can be ruined in minutes rather than months.",
      },
      {
        key: "milky-oil",
        label: "Milky oil or unexplained coolant loss",
        response:
          "On the 3.5L or 3.7L V6, investigate this before anything else. The internal water pump can leak coolant into the oil, which causes misfire and damages timing components at the same time.",
      },
      {
        key: "cold-only",
        label: "Misfires cold, clears when warm",
        response:
          "Look at plug gap, a cracked insulator, or a coil boot that leaks until it warms and expands. A momentarily lean mixture at start-up can do the same thing.",
      },
      {
        key: "never-serviced",
        label: "Rear-bank plugs never changed",
        response:
          "A common and entirely mundane explanation on the transverse V6. Cylinder 1 is on the rear bank, and rear-bank plugs get skipped precisely because they are awkward. An original plug at high mileage is often the whole answer.",
      },
      {
        key: "power-loss",
        label: "Down on power with worse economy",
        response:
          "One cylinder of six not contributing. Less dramatic than on a four-cylinder, but the PCM is still injecting fuel that is not being burned, and that fuel goes to the converter.",
      },
    ],
    causes: [
      {
        cause: "Worn spark plug on cylinder 1",
        evidence:
          "High mileage with no rear-bank service history; plug visibly worn compared with the front bank",
        firstTest:
          "Remove the cylinder 1 plug and compare it against the others, particularly against a front-bank plug",
      },
      {
        cause: "Failing coil on cylinder 1",
        evidence:
          "Misfire follows the coil when moved; carbon tracking in the boot; broken connector lock",
        firstTest:
          "Swap the cylinder 1 coil with another on the same bank, clear the code and see whether the misfire moves",
      },
      {
        cause: "Injector fault on cylinder 1",
        evidence:
          "Misfire stays after plug and coil are eliminated; injector quiet or resistance out of line",
        firstTest:
          "Listen with a stethoscope, compare resistance, then run the scan tool's injector test",
      },
      {
        cause: "Vacuum leak affecting that runner",
        evidence:
          "Positive Bank 1 fuel trims alongside the misfire; lean codes stored; leak found on smoke test",
        firstTest:
          "Smoke-test the intake with attention to the rear-bank manifold face",
      },
      {
        cause: "Coolant entering the cylinder",
        evidence:
          "Milky oil, coolant loss with no external leak, white smoke or a sweet exhaust smell",
        firstTest:
          "Inspect the oil and run a combustion-gas test before buying ignition parts",
      },
      {
        cause: "Low compression on cylinder 1",
        evidence:
          "Misfire will not follow any component; relative compression down on that cylinder",
        firstTest:
          "Run relative compression from the scan tool, then a mechanical compression or leak-down test",
      },
    ],
    deepDive: [
      {
        heading: "Cylinder 1 is on the rear bank — plan for that",
        paragraphs: [
          "On the 2011–2019 Explorer with the transverse 3.5L V6, Bank 1 is the rear bank against the firewall and it contains cylinders 1, 2 and 3. Cylinder 1 itself sits toward the accessory-drive end.",
          "This matters practically rather than academically. The rear bank is the awkward one. Access to its coils and plugs is restricted, the job takes longer, and a labour quote for rear-bank work is legitimately higher than for the front. If someone has quoted you a low figure for a cylinder 1 coil on this engine, confirm they know which bank it is on.",
          "It also explains why cylinder 1 misfires disproportionately often on these vehicles. Rear-bank plugs get skipped during service because reaching them is inconvenient, so they stay in the engine long past their interval while the front three get replaced on schedule.",
          "For 2020-onward Explorers the platform changed to a longitudinal rear-wheel-drive layout, so confirm the orientation for your own generation rather than assuming this applies.",
        ],
      },
      {
        heading: "The coil swap, adapted for a V6",
        paragraphs: [
          "The principle is the same as on any engine: move the suspect coil to a different cylinder, clear the code, and see whether the misfire follows it. If it does, the coil is faulty and you have proved it for free. If it stays on cylinder 1, the coil is fine and you have eliminated the most common cause.",
          "The practical adaptation on a transverse V6 is to swap within the same bank where possible. Moving a coil from cylinder 1 to cylinder 2 keeps you working in one area rather than reaching across the engine twice, and it answers the same question.",
          "Label both coils before you move them. On a six-cylinder engine with restricted access it is genuinely easy to lose track, and a test you cannot interpret is worse than no test.",
        ],
      },
      {
        heading: "Check the oil first on the V6 engines",
        paragraphs: [
          "The 3.5L and 3.7L V6 engines use an internal water pump driven by the timing chain. When its seal fails, coolant leaks into the oil rather than onto the ground — which is why the loss leaves no puddle to find.",
          "Coolant reaching a combustion chamber causes misfire. The same contamination also accelerates timing chain wear, which disturbs valve timing and can cause misfire by a second route. Either way, ignition parts will not fix it.",
          "Pull the dipstick and look before you order anything. Milky or coffee-coloured oil, or a level that has risen, is the pattern. It takes two minutes and it can save you the entire cost of a set of coils.",
        ],
      },
      {
        heading: "Why blanket replacement is worse on a V6",
        bullets: [
          "P0301 already named the cylinder — replacing all six throws that away",
          "Rear-bank labour is significantly higher, so the waste is larger than on an inline engine",
          "It disturbs five healthy connectors in an area that is awkward to work in",
          "If the cause is an injector, compression or coolant, new coils change nothing",
          "The coil swap answers the same question at no cost",
        ],
      },
    ],
    freezeFrame: [
      "Misfire counters for every cylinder, confirming cylinder 1 genuinely dominates",
      "Engine coolant temperature, separating a cold-start fault from a warm one",
      "Bank 1 short and long-term fuel trim; positive trims suggest air or fuel rather than ignition",
      "Engine load and rpm when the counters climbed",
      "Any companion codes — lean codes, a P0016 or a second misfire code change the order of work",
      "Vehicle speed and throttle position at the time of the fault",
    ],
    steps: [
      {
        title: "Check the oil for coolant contamination",
        detail:
          "Two minutes with a dipstick on a V6 Explorer. Milky oil means the internal water pump, not a coil, and it changes the entire direction of the repair.",
      },
      {
        title: "Confirm cylinder 1 really is dominating",
        detail:
          "Read all six counters. If cylinders 1, 2 and 3 are all climbing, you have a rear-bank problem rather than a single failed part, and the diagnosis changes accordingly.",
      },
      {
        title: "Establish which bank cylinder 1 is on",
        detail:
          "On the 2011–2019 transverse V6 it is the rear bank against the firewall. Confirm for your own generation before planning access, because getting this wrong wastes an afternoon.",
      },
      {
        title: "Ask when the rear-bank plugs were last changed",
        detail:
          "If the answer is never, or nobody knows, that is a strong lead. Rear-bank plugs routinely outlive their interval on this platform because they are inconvenient to reach.",
      },
      {
        title: "Inspect the cylinder 1 plug and compare",
        detail:
          "Compare it against a front-bank plug in particular. A visible difference in wear between banks tells you the service history even when the paperwork does not.",
      },
      {
        title: "Swap the coil within the same bank",
        detail:
          "Move the cylinder 1 coil to cylinder 2 or 3, label both, clear the code and drive. If the misfire follows the coil you have found it without spending anything.",
      },
      {
        title: "Test the injector on that cylinder",
        detail:
          "With plug and coil eliminated, listen to the injector, compare its resistance with the others, and use the scan tool's injector test where available.",
      },
      {
        title: "Check compression when nothing moves the fault",
        detail:
          "A misfire that will not follow any component is mechanical. Relative compression first, then a mechanical compression or leak-down test if the numbers look wrong.",
      },
    ],
    costs: [
      {
        job: "Oil and coolant inspection",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Trivial",
        note: "Rules out the expensive scenario before anything is bought",
      },
      {
        job: "Coil swap diagnostic",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Moderate on the rear bank",
        note: "Identifies or eliminates the most common cause at no cost",
      },
      {
        job: "Single ignition coil — rear bank",
        parts: "Moderate",
        shop: "Higher labour than the front bank",
        diy: "Moderate to advanced",
        note: "Replace the one you proved faulty, not all six",
      },
      {
        job: "Spark plugs — rear bank set",
        parts: "Moderate for three",
        shop: "Noticeably higher labour",
        diy: "Advanced on the transverse V6",
        note: "Worth doing all three while access is open",
      },
      {
        job: "Injector diagnosis and replacement",
        parts: "Higher on direct-injection engines",
        shop: "Get a quote",
        diy: "Advanced",
        note: "Only once plug and coil are eliminated by testing",
      },
      {
        job: "Internal water pump and timing repair",
        parts: "Around $1,500",
        shop: "Roughly $1,500–$3,500",
        diy: "Not realistic for most owners",
        note: "Where coolant contamination is confirmed",
      },
    ],
    dontReplace:
      "Do not replace all six coils because one cylinder misfired — the waste is larger on a V6 than anywhere else because half the work is rear-bank labour. P0301 already named the cylinder. Swap the coil first, and check the oil before that. On a 3.5L or 3.7L, milky oil means the internal water pump is your problem and no ignition part will touch it.",
    yearNotes: [
      "On the 2011–2019 transverse 3.5L V6, cylinder 1 is on the rear bank against the firewall, with cylinders 2 and 3. That is the harder bank to reach and the opposite of what most people assume.",
      "Rear-bank plugs are frequently skipped during service on this platform, which is why cylinder-specific misfires appear there disproportionately often.",
      "The 3.5L and 3.7L V6 use an internal water pump that can leak coolant into the oil, causing misfire and accelerating timing chain wear.",
      "The Explorer changed to a longitudinal rear-wheel-drive platform for 2020, so confirm cylinder and bank orientation for your generation rather than assuming.",
    ],
    faqs: [
      {
        question: "Where is cylinder 1 on a Ford Explorer?",
        answer:
          "On the 2011–2019 transverse 3.5L V6, on the rear bank against the firewall, toward the accessory-drive end. That is the harder bank to reach. Confirm separately for 2020-onward vehicles, which use a longitudinal layout.",
      },
      {
        question: "Can I drive with P0301?",
        answer:
          "Briefly and gently if the light is steady, and not at all if it is flashing. On a V6, check the oil first — milky oil means coolant is getting in and you should not drive on it.",
      },
      {
        question: "Why is P0301 more expensive to fix on an Explorer?",
        answer:
          "Because cylinder 1 is on the rear bank of the transverse V6, where access is restricted. The parts cost the same but the labour is higher, and that is legitimate rather than a shop overcharging.",
      },
      {
        question: "Should I replace the coil or the plug first?",
        answer:
          "Inspect the plug first, because it costs nothing and often shows the fault. Then swap the coil within the same bank. Between those two free steps you will identify most P0301 faults.",
      },
      {
        question: "Why do rear-bank cylinders misfire more often?",
        answer:
          "Usually because their plugs are older. Rear-bank plugs are awkward to reach and get skipped during service, so they stay in the engine long past their interval while the front three get replaced.",
      },
      {
        question: "What does milky oil mean on my Explorer?",
        answer:
          "Coolant is mixing with the oil. On the 3.5L and 3.7L that most often means the internal water pump seal has failed, and it explains misfire without any ignition part being at fault.",
      },
      {
        question: "Why did P0301 return after new plugs and coils?",
        answer:
          "Because the fault was never in the ignition system. A misfire that survives both is usually an injector, low compression, or coolant reaching the cylinder.",
      },
      {
        question: "Can I swap the coil to any cylinder?",
        answer:
          "Any cylinder works for the test, but swapping within the same bank saves reaching across the engine twice on a transverse V6. Label both coils so you can interpret the result.",
      },
    ],
    closing: {
      title: "Confirming the cylinder 1 repair held",
      paragraphs: [
        "Write down the freeze frame and all six cylinder counters before clearing anything. Clearing first destroys the record of conditions you need to reproduce for verification.",
        "Then drive the rpm, load and temperature window the freeze frame recorded and watch the cylinder 1 counter. Zero counts across those exact conditions is the proof. A dashboard that stays dark during a gentle drive is not, particularly for a fault that only appeared under load.",
        "While you are in there, consider whether the other two rear-bank plugs are due as well. If cylinder 1's plug was original at high mileage, cylinders 2 and 3 almost certainly are too — and doing them while access is already open is far cheaper than returning for the same job in six months.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsExplorerBank, nhtsaTsb, fordManuals],
  },
];
