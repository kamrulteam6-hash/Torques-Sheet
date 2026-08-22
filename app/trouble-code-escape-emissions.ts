import type { TroubleCodeGuide } from "./trouble-code-data";
import { fordManuals, fordObd2017, fordObd2024, nhtsaTsb } from "./trouble-code-sources";
import { escapeVehicle, goPartsEscapeMaf, repairPalEscapeIntake } from "./trouble-code-escape";

/**
 * Escape emissions and fuel-control codes: P0420, P0456, P1450, P2196.
 */

const goPartsP0420Escape = {
  label: "P0420 on 2020–2022 Ford Escape: catalyst system inefficiency causes and fixes",
  url: "https://www.go-parts.com/garage/obd-p0420-ford-escape-2020-2022",
  note: "Sets out why a converter rarely fails on its own and what usually destroys it",
};

const repairPalEscapeCanister = {
  label: "Ford Escape evaporative canister replacement cost estimate",
  url: "https://repairpal.com/estimator/ford/escape/fuel-evaporative-canister-replacement-cost",
  note: "Published U.S. parts-and-labour range for the expensive EVAP outcome",
};

const emissionsVehicle = {
  ...escapeVehicle,
  yearsIntro:
    "Escape emissions hardware changed across generations and differs between the turbocharged, naturally aspirated and hybrid powertrains. Confirm your engine and model year from the VIN before ordering any component, and treat the layout under your own vehicle as the authority rather than a diagram from a different year.",
};

export const troubleCodeEscapeEmissions: TroubleCodeGuide[] = [
  /* ------------------------------------------------------------------ P0420 */
  {
    slug: "ford/escape/p0420",
    code: "P0420",
    title: "P0420 Code Ford Escape: Catalyst Causes & Real Fixes",
    description:
      "P0420 on a Ford Escape rarely means the converter failed on its own. What actually destroys it, how to find that first, and what it costs.",
    definition: "Catalyst System Efficiency Below Threshold (Bank 1)",
    severity: "Service soon",
    vehicle: emissionsVehicle,
    driveAdvice:
      "A steady P0420 on its own does not require you to stop, but it does need attention. What matters more is what caused it. If the converter is being damaged by misfire, coolant or oil reaching the exhaust, driving on will destroy the replacement too. Stop if the lamp begins flashing, if power falls away, or if you can smell an overheating converter.",
    quickAnswer:
      "P0420 means your Escape's catalyst monitor tested the converter's oxygen-storage performance and found it below the calibrated threshold. Here is the part that saves people money: a catalytic converter rarely fails on its own. Its failure is usually a symptom of something else — misfire putting raw fuel into the exhaust, a rich mixture, or oil and coolant getting where they should not. Fit a new converter without finding that cause and you will be buying another one. On an EcoBoost Escape with a coolant-loss history, that upstream cause deserves particular attention.",
    symptoms: [
      {
        key: "light-only",
        label: "Check-engine light with no change in how it drives",
        response:
          "The usual presentation. The catalyst monitor is an emissions test rather than a drivability one, so the engine can feel completely normal while failing it. The light is often the only sign.",
      },
      {
        key: "emissions-fail",
        label: "Failed an emissions inspection",
        response:
          "Expected with this code. Repair the underlying cause, then allow the catalyst monitor to run and pass before returning — that monitor needs specific conditions and will not complete immediately.",
      },
      {
        key: "misfire-codes",
        label: "Misfire codes stored alongside",
        response:
          "This is your actual job. Misfire pushes unburned fuel into the exhaust, which overheats the converter and destroys it. Repair the misfire first, then reassess whether the converter is genuinely finished.",
      },
      {
        key: "coolant-loss",
        label: "Coolant disappearing with no visible leak",
        response:
          "On an EcoBoost Escape this deserves urgent attention. Coolant reaching the exhaust contaminates a converter, and the coolant-intrusion problems documented on some of these engines can destroy both the engine and the converter together.",
      },
      {
        key: "oil-use",
        label: "Using oil between changes",
        response:
          "Oil reaching the combustion chamber coats the converter's internals and reduces its efficiency permanently. Address the consumption before replacing the converter or the new one will follow the old one.",
      },
      {
        key: "rotten-egg",
        label: "Sulphur or rotten-egg smell",
        response:
          "Associated with a converter working outside its normal operating window, often because the mixture is wrong. Look at fuel trims and fuel control before concluding the converter itself has failed.",
      },
    ],
    causes: [
      {
        cause: "Misfire damaging the converter",
        evidence:
          "Misfire codes stored now or in the history; rough running; unburned fuel reaching the exhaust",
        firstTest:
          "Read all stored and pending codes and repair any misfire before assessing the converter",
      },
      {
        cause: "Oxygen sensor performance or bias",
        evidence:
          "Downstream sensor mirrors the upstream one too closely; slow switching; sensor-related codes stored",
        firstTest:
          "Graph upstream and downstream sensor activity and compare their behaviour",
      },
      {
        cause: "Exhaust leak before or between sensors",
        evidence:
          "Ticking that changes with rpm; leak at a manifold, flange or gasket upstream of the downstream sensor",
        firstTest:
          "Inspect the exhaust from the head to the downstream sensor for cracks and failed gaskets",
      },
      {
        cause: "Rich or lean fuel-control fault",
        evidence:
          "Fuel trims well away from zero; lean or rich codes stored alongside",
        firstTest:
          "Read fuel trims at idle and under load and resolve any mixture fault before condemning the catalyst",
      },
      {
        cause: "Oil or coolant contamination",
        evidence:
          "Oil consumption, coolant loss with no external leak, white smoke or a sweet exhaust smell",
        firstTest:
          "Check coolant level and run a combustion-gas test; investigate oil consumption",
      },
      {
        cause: "Genuinely failed catalytic converter",
        evidence:
          "All of the above eliminated; converter is high mileage or physically damaged; monitor still fails after upstream repairs",
        firstTest:
          "Only after the causes above have been ruled out by testing rather than assumption",
      },
    ],
    deepDive: [
      {
        heading: "Why the converter is the last suspect, not the first",
        paragraphs: [
          "A catalytic converter has no moving parts. Left alone with clean combustion and correct mixture, it lasts a very long time. When one fails early, something else usually killed it.",
          "The three common killers are unburned fuel from misfire, which overheats the substrate; a rich mixture, which does the same thing more slowly; and contamination from oil or coolant reaching the exhaust, which coats the internals and stops them working. All three are upstream problems.",
          "That is why fitting a converter as the first move so often ends badly. If the misfire or the coolant intrusion is still there, the new converter goes the same way as the old one — and the second bill arrives with the knowledge that the first one was avoidable.",
        ],
      },
      {
        heading: "EcoBoost Escapes: check the coolant before the converter",
        paragraphs: [
          "This is the Escape-specific point that generic P0420 advice misses. Certain Escape EcoBoost engines have documented coolant-intrusion problems — 1.6L engines from 2013–2016 with head-gasket and cylinder-head porosity issues, and some 1.5L and 2.0L engines from 2017–2019 with cracking between cylinders.",
          "Coolant reaching the combustion chamber ends up in the exhaust, and the exhaust is where your converter lives. So on an EcoBoost Escape, a P0420 that arrives alongside coolant loss, white smoke or a sweet exhaust smell is not a converter problem with a coolant coincidence. It is a coolant problem that is destroying your converter as a side effect.",
          "Checking the coolant level and running a combustion-gas test costs very little and takes minutes. On this platform it belongs at the start of a P0420 diagnosis, not at the end.",
        ],
      },
      {
        heading: "How the monitor actually decides the converter has failed",
        paragraphs: [
          "The PCM compares the upstream oxygen sensor with the downstream one. A healthy converter stores and releases oxygen, which smooths the downstream signal — the upstream sensor swings, the downstream one stays comparatively flat. When the downstream sensor begins mirroring the upstream sensor closely, the PCM concludes that oxygen storage has fallen below threshold.",
          "That logic has a consequence worth knowing: anything that disturbs either sensor's reading can fail the test with a healthy converter behind it. An exhaust leak between the two sensors lets outside air in and distorts the comparison. A slow or biased downstream sensor produces a similar result. Both are far cheaper than a converter.",
        ],
      },
      {
        heading: "Before you authorise a converter, ask for three things",
        bullets: [
          "Evidence that no misfire is present now or in the recent history",
          "Fuel trim data showing mixture control is correct at idle and under load",
          "Confirmation that there is no exhaust leak between the head and the downstream sensor",
          "On an EcoBoost, confirmation that the cooling system is not losing coolant into a cylinder",
          "Oxygen sensor waveforms showing the downstream sensor is responding correctly",
          "A converter quote that names the reason the original one failed",
        ],
      },
    ],
    freezeFrame: [
      "Upstream and downstream oxygen sensor activity at the moment the monitor ran",
      "Short and long-term fuel trim, which reveal a mixture fault damaging the converter",
      "Engine coolant temperature and run time, confirming the monitor ran under valid conditions",
      "Vehicle speed and load, since the catalyst monitor needs sustained steady operation",
      "Any companion codes — misfire, lean, rich or sensor codes redirect the diagnosis entirely",
      "Whether the code is current or historic, and how many drive cycles have passed",
    ],
    steps: [
      {
        title: "Read every stored and pending code first",
        detail:
          "A misfire or fuel-trim code alongside P0420 is not a coincidence — it is very likely the cause. Repair those first and reassess the converter afterwards rather than in parallel.",
      },
      {
        title: "Check the coolant level on an EcoBoost",
        detail:
          "Coolant loss with no visible leak, combined with P0420, points at coolant reaching the exhaust. Run a combustion-gas test before you consider a converter, because a new one will not survive the same conditions.",
      },
      {
        title: "Read fuel trims at idle and under load",
        detail:
          "Trims well away from zero mean the mixture is wrong, and a converter cannot do its job on a mixture it was not designed for. Fix the mixture fault first.",
      },
      {
        title: "Inspect the exhaust for leaks",
        detail:
          "Check from the cylinder head through to the downstream sensor. A leak between the two sensors admits outside air and can fail the monitor with a perfectly healthy converter fitted.",
      },
      {
        title: "Graph both oxygen sensors",
        detail:
          "Watch the upstream sensor swinging and the downstream one responding. A downstream sensor that mirrors the upstream too closely is the monitor's evidence — but a slow or biased sensor produces the same picture for far less money.",
      },
      {
        title: "Investigate oil consumption if present",
        detail:
          "Oil reaching the exhaust coats the converter internals permanently. If the engine uses oil between changes, that needs addressing or the replacement converter will degrade the same way.",
      },
      {
        title: "Only then evaluate the converter itself",
        detail:
          "With misfire, mixture, leaks, sensors and contamination all eliminated, a converter that still fails the monitor is genuinely finished. That conclusion is now supported by evidence rather than by the code alone.",
      },
      {
        title: "Complete the drive cycle after repair",
        detail:
          "The catalyst monitor needs sustained steady driving under specific conditions before it will run again. Do not judge the repair — or return for an emissions test — until it has actually completed.",
      },
    ],
    costs: [
      {
        job: "Full code scan and fuel-trim read",
        parts: "$0",
        shop: "Standard diagnostic fee",
        diy: "Easy with a live-data tool",
        note: "Finds the upstream cause that killed the converter",
      },
      {
        job: "Coolant and combustion-gas test",
        parts: "Low — test fluid",
        shop: "Modest add-on",
        diy: "Easy with a kit",
        note: "Essential on an EcoBoost Escape before authorising a converter",
      },
      {
        job: "Exhaust leak repair",
        parts: "Low — gasket or clamp",
        shop: "Varies with location and corrosion",
        diy: "Moderate",
        note: "Cheap cause that mimics a failed converter",
      },
      {
        job: "Downstream oxygen sensor",
        parts: "Moderate",
        shop: "Usually straightforward access",
        diy: "Moderate — may need an O2 socket",
        note: "Only where waveforms show it responding incorrectly",
      },
      {
        job: "Misfire repair",
        parts: "Varies",
        shop: "Varies",
        diy: "Varies",
        note: "Cost belongs to the misfire code, but it must come first",
      },
      {
        job: "Catalytic converter replacement",
        parts: "Substantial",
        shop: "Get a written quote — Ford figures vary widely by year",
        diy: "Advanced",
        note: "Ask the shop to name the reason the original failed before agreeing",
      },
    ],
    dontReplace:
      "Do not buy a catalytic converter on the strength of this code alone. A converter with no moving parts does not usually fail by itself — misfire, a wrong mixture, or oil and coolant reaching the exhaust are what kill it. Ask any shop quoting a converter to show you why the original one failed. If they cannot, the replacement is likely to fail the same way and you will pay twice.",
    yearNotes: [
      "On EcoBoost Escapes with documented coolant-intrusion history, a P0420 arriving alongside coolant loss should be treated as an engine investigation rather than an exhaust one.",
      "Converter, sensor and exhaust layout vary across Escape generations and between the turbocharged, naturally aspirated and hybrid powertrains. Match parts to the VIN, not to the model name.",
      "Federal and California emissions applications may require different converters. Confirm which your vehicle is certified to before ordering, because the wrong part can fail the monitor even when new.",
      "On hybrids the engine runs intermittently, so the catalyst monitor takes longer to complete. Allow more driving before concluding a repair did or did not work.",
    ],
    faqs: [
      {
        question: "What does P0420 mean on a Ford Escape?",
        answer:
          "That the catalyst monitor measured the converter's oxygen-storage performance and found it below the calibrated threshold. It is a test result, not proof that the converter is the first thing that failed.",
      },
      {
        question: "Do I need a new catalytic converter?",
        answer:
          "Not necessarily, and not first. Misfire, a rich or lean mixture, an exhaust leak, a lazy oxygen sensor and oil or coolant contamination can all fail this test. Rule those out before spending on a converter.",
      },
      {
        question: "Can I drive with P0420?",
        answer:
          "A steady code on its own is not an emergency. But if it is accompanied by misfire or coolant loss, driving on is actively destroying the converter, so the answer changes to no.",
      },
      {
        question: "How much does it cost to fix P0420 on an Escape?",
        answer:
          "It spans an exhaust gasket to a full converter replacement. The diagnosis is what decides, which is why paying for a proper one is cheaper than guessing at a converter.",
      },
      {
        question: "Why did my new converter fail again?",
        answer:
          "Because whatever destroyed the first one was never fixed. Misfire, a wrong mixture, or oil and coolant reaching the exhaust will consume a replacement just as quickly as the original.",
      },
      {
        question: "Will an oxygen sensor fix P0420?",
        answer:
          "Sometimes, if the downstream sensor is genuinely slow or biased. Check its waveform first rather than replacing it hopefully — a sensor fitted on a guess is a common way to spend money without changing anything.",
      },
      {
        question: "Can coolant damage a catalytic converter?",
        answer:
          "Yes, and this matters on EcoBoost Escapes with documented coolant-intrusion problems. Coolant reaching the combustion chamber ends up in the exhaust and contaminates the converter internals.",
      },
      {
        question: "How long before the monitor runs again after a repair?",
        answer:
          "The catalyst monitor needs sustained steady driving under specific conditions, so it can take several drive cycles. On a hybrid it takes longer still because the engine runs intermittently.",
      },
    ],
    closing: {
      title: "Closing out a P0420 properly",
      paragraphs: [
        "The measure of a good P0420 repair is not that the light went out. It is that somebody can tell you why the converter stopped working.",
        "After repairing the upstream cause, complete the drive cycle and confirm the catalyst monitor runs and passes rather than simply noting that the lamp is off. The monitor needs specific sustained conditions, and on a hybrid it needs more patience than on a conventional Escape.",
        "If a converter was replaced, keep the documentation showing what was found and corrected alongside it. If the code returns later, that record is the difference between a warranty conversation and starting the whole diagnosis again from nothing.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsP0420Escape, nhtsaTsb, fordManuals],
  },

  /* ------------------------------------------------------------------ P0456 */
  {
    slug: "ford/escape/p0456",
    code: "P0456",
    title: "P0456 Code Ford Escape: Small EVAP Leak Causes & Fixes",
    description:
      "P0456 means a 0.020-inch EVAP leak on your Escape. Why the fuel cap comes first, what a smoke test costs, and when it gets expensive.",
    definition: "Evaporative Emission System Leak Detected (very small leak)",
    severity: "Service soon",
    vehicle: emissionsVehicle,
    driveAdvice:
      "P0456 will not strand you and it will not damage the engine. Your Escape is telling you that fuel vapour is escaping instead of being captured and burned. Drive it, but do not ignore it — it will fail an emissions inspection, and a leak this small does not seal itself with time.",
    quickAnswer:
      "P0456 means the evaporative-emissions monitor sealed the fuel-vapour system, watched the pressure, and detected a leak. The threshold is deliberately tiny — around 0.020 inches, which is roughly half a millimetre, about the size of a pinhole. Because the opening is that small, the cause usually is too. A fuel cap that was not turned until it clicked, a seal that has hardened with age, or a hairline crack in a vapour line account for most of these. The expensive components are possible but they are not where to start.",
    symptoms: [
      {
        key: "light-only",
        label: "Check-engine light with no drivability change",
        response:
          "Entirely normal for this code. The EVAP system handles vapour rather than fuel delivery, so the engine runs exactly as it did. The light is usually the only symptom you get.",
      },
      {
        key: "after-fuel",
        label: "Light appeared soon after filling up",
        response:
          "Start at the cap, because it is the one thing that changed. A cap not tightened until it clicks, or one with grit on its sealing surface, is the single most common cause of this code.",
      },
      {
        key: "fuel-smell",
        label: "Faint fuel smell around the vehicle",
        response:
          "Worth investigating properly even though P0456 describes a very small leak. A smell you can actually detect usually means something larger than the monitor threshold — check the filler neck, cap seal and vapour lines.",
      },
      {
        key: "emissions-fail",
        label: "Failed an emissions test",
        response:
          "Expected. This is an emissions fault by definition, and an illuminated lamp fails inspection in most places regardless of the code. Repair, then let the monitor complete before returning.",
      },
      {
        key: "intermittent",
        label: "Clears by itself then comes back",
        response:
          "Typical of a seal that only leaks at certain temperatures or fuel levels. The monitor runs only under particular conditions, so testing deliberately with smoke beats waiting for it to reappear.",
      },
      {
        key: "hard-start",
        label: "Brief hard start after refuelling",
        response:
          "Points more at a purge valve stuck open than at a plain leak, since raw vapour is reaching the intake when the engine cannot use it. Look for companion purge-circuit codes.",
      },
    ],
    causes: [
      {
        cause: "Fuel cap not sealing (check first)",
        evidence:
          "Recently refuelled; cap does not click; seal is cracked, hardened or has debris on it",
        firstTest:
          "Wipe the seal and filler neck, refit until it clicks, then let the monitor run again",
      },
      {
        cause: "Canister vent valve not sealing",
        evidence:
          "System will not hold vacuum with the vent commanded closed during a scan-tool test",
        firstTest:
          "Command the vent valve closed and watch the fuel-tank pressure sensor hold or drift",
      },
      {
        cause: "Cracked or hardened vapour hose",
        evidence:
          "Cracking at bends and clamps; smoke escapes from a line rather than a component",
        firstTest:
          "Smoke-test the sealed system and follow the smoke to the opening",
      },
      {
        cause: "Purge valve leaking through",
        evidence:
          "Valve passes when commanded closed; idle quality or trims disturbed alongside the EVAP code",
        firstTest:
          "Command the purge valve closed and confirm it actually seals",
      },
      {
        cause: "Charcoal canister or its seals",
        evidence:
          "Smoke escapes around the canister body or fittings; physical damage from road debris",
        firstTest:
          "Inspect the canister and its connections directly",
      },
      {
        cause: "Filler neck or tank seal damage",
        evidence:
          "Corrosion or impact damage at the filler neck; a seal flattened with age",
        firstTest:
          "Inspect the neck and sealing surface with a light before blaming the cap",
      },
    ],
    deepDive: [
      {
        heading: "Half a millimetre, and why that changes the approach",
        paragraphs: [
          "The monitor is looking for an opening around 0.020 inches — smaller than the lead in a mechanical pencil. That single fact explains almost everything about how this code behaves. You will not hear it, you will not see it, and usually you will not smell it either.",
          "It also explains why visual inspection so often comes up empty and why smoke testing is not optional. Introducing smoke into the sealed system and watching where it escapes is the only practical way to find an opening that size. The alternative — replacing likely components in order of suspicion — is how a $25 fuel cap problem becomes a $500 afternoon.",
        ],
      },
      {
        heading: "Why the light stays on after you tighten the cap",
        paragraphs: [
          "The EVAP monitor does not run continuously. It needs the fuel level within a specific range, an ambient temperature window, and a period of stable driving before it will test at all. Tighten the cap and the code sits exactly where it was until those conditions align again.",
          "This catches people out constantly. They tighten the cap, drive to a shop, see the light still on, and pay for a diagnosis of a fault they had already fixed. Give it several days of ordinary driving with the tank somewhere in the middle of its range before concluding the cap was not the problem.",
        ],
      },
      {
        heading: "Escape-specific notes",
        paragraphs: [
          "EVAP layout differs across Escape generations and between the conventional and hybrid powertrains, so confirm what your vehicle actually has before ordering a component. A diagram from a different model year can send you looking for a valve that is not where you expect it.",
          "On the plug-in hybrid in particular, the fuel system operates differently from a conventional car and the monitor runs under its own conditions. Expect readiness to take longer, and do not treat a slow-clearing monitor as evidence that the repair failed.",
          "If your Escape has a capless filler system, there is no cap to check — instead inspect the sealing flap and its adapter, which perform the same job and fail in similar ways.",
        ],
      },
      {
        heading: "How P0456 differs from the other EVAP codes",
        bullets: [
          "P0456 — very small leak, around 0.020 inches. Cap, seal or hairline crack",
          "P0455 — gross leak. A missing cap, a disconnected hose, something obviously open",
          "P0442 — medium leak, between the two",
          "P0446 — vent control circuit fault, pointing at the vent valve or its wiring",
          "P1450 — the opposite problem: vacuum trapped in the tank because it cannot vent",
        ],
      },
    ],
    freezeFrame: [
      "Fuel level when the monitor ran, confirming the test conditions were valid",
      "Ambient and coolant temperature, since the monitor only runs inside a defined window",
      "Fuel-tank pressure sensor reading, showing whether the system held vacuum at all",
      "Vehicle speed and run time before the test",
      "Any other EVAP codes stored at the same moment, which often name the failed part",
      "Drive cycles since the code set, distinguishing a current fault from a historic one",
    ],
    steps: [
      {
        title: "Inspect the cap properly",
        detail:
          "Remove it, look at the seal under good light, wipe the filler neck, and refit until it clicks. Look for a seal that has gone hard and shiny rather than staying soft and matte. This costs nothing and resolves a real share of these codes.",
      },
      {
        title: "Clear the code and drive several cycles",
        detail:
          "The monitor needs specific fuel-level and temperature conditions before it will test again. Keep the tank around half full and give it a few days before deciding the cap was innocent.",
      },
      {
        title: "Inspect the visible vapour lines",
        detail:
          "Work from the tank forward, paying attention to bends, clamps and anywhere a line runs near heat. Hardened plastic cracks where it flexes, and those cracks are visible once you know to look.",
      },
      {
        title: "Smoke-test the sealed system",
        detail:
          "This is the test that actually finds a half-millimetre opening. Expect roughly $75–$150 at a shop, which is cheaper than one wrong component.",
      },
      {
        title: "Command the valves and watch the sensor",
        detail:
          "Close the vent valve and operate the purge valve with a scan tool while watching the fuel-tank pressure sensor. A system that cannot hold vacuum with both shut has a leak or a valve that is not sealing.",
      },
      {
        title: "Inspect the canister and filler neck",
        detail:
          "Both sit low and exposed where road debris and winter salt reach them. Damage here is easy to see once the smoke test has narrowed down the area.",
      },
      {
        title: "Re-smoke before reassembling",
        detail:
          "Small EVAP leaks frequently come in pairs on an older vehicle, because every rubber component has aged at the same rate. Testing again before you close up saves a second diagnosis in a fortnight.",
      },
      {
        title: "Confirm the monitor completes and passes",
        detail:
          "The repair is not verified until the EVAP monitor has run again without setting the code. Plan on several days of normal driving rather than one trip around the block.",
      },
    ],
    costs: [
      {
        job: "Fuel cap replacement",
        parts: "About $20–$50",
        shop: "Parts plus minimal labour",
        diy: "Trivial",
        note: "Use a correct-specification cap; cheap generics are a repeat-failure cause",
      },
      {
        job: "EVAP smoke test",
        parts: "$0",
        shop: "Roughly $75–$150",
        diy: "Needs a smoke machine",
        note: "Almost always cheaper than one wrong component",
      },
      {
        job: "Vapour hose repair",
        parts: "About $100–$200",
        shop: "Parts plus access labour",
        diy: "Moderate",
        note: "Cost depends heavily on where in the system the crack sits",
      },
      {
        job: "Purge valve replacement",
        parts: "About $30–$75",
        shop: "Roughly $150–$400",
        diy: "Moderate — engine bay",
        note: "Check it seals when commanded before replacing it",
      },
      {
        job: "Canister vent valve",
        parts: "Moderate",
        shop: "Varies with location on your model year",
        diy: "Moderate",
        note: "Confirm the layout for your generation before ordering",
      },
      {
        job: "Charcoal canister replacement",
        parts: "Higher — full assembly",
        shop: "Get a quote — a substantial job on the Escape",
        diy: "Advanced",
        note: "The expensive outcome, and the reason to smoke-test first",
      },
    ],
    dontReplace:
      "Do not start with the charcoal canister or the purge valve. P0456 describes a pinhole, and the most common causes are the cap seal and a cracked hose — both far cheaper. Replacing an expensive EVAP component without a smoke test is guessing at a large bill when a small test would have shown you the actual opening.",
    yearNotes: [
      "EVAP layout differs across Escape generations and between conventional and hybrid powertrains. Confirm the layout for your model year before ordering any component.",
      "On the plug-in hybrid the fuel system operates differently and the monitor runs under its own conditions, so readiness can take noticeably longer to complete.",
      "If your Escape has a capless filler, inspect the sealing flap and adapter rather than looking for a cap.",
      "Any recent fuel-system work introduces new sealing surfaces. If the code appeared after that kind of job, start where the work was done.",
    ],
    faqs: [
      {
        question: "Will P0456 fail an emissions test?",
        answer:
          "Yes. It is an emissions fault by definition, and an illuminated check-engine light fails inspection in most jurisdictions regardless of the code behind it.",
      },
      {
        question: "Is it safe to drive with P0456?",
        answer:
          "Mechanically, yes. The EVAP system handles fuel vapour rather than fuel delivery, so the engine runs normally. Repair it anyway — it is releasing vapour and it will not fix itself.",
      },
      {
        question: "How small is the leak?",
        answer:
          "About 0.020 inches — roughly half a millimetre, or a pinhole. That is why it is invisible to inspection and why smoke testing is the practical way to find it.",
      },
      {
        question: "How much does it cost to fix P0456 on an Escape?",
        answer:
          "From about $25 for a fuel cap to several hundred for a canister. A $75–$150 smoke test is what tells you which end of that range you are actually facing.",
      },
      {
        question: "Why did the light stay on after I tightened the cap?",
        answer:
          "Because the monitor only runs under specific fuel-level and temperature conditions. It needs a few drive cycles to test again, so give it several days before deciding the cap was not the cause.",
      },
      {
        question: "What is the difference between P0456 and P0455?",
        answer:
          "Leak size. P0456 is the very small threshold; P0455 indicates a gross leak, far more likely to be a missing cap or a disconnected line.",
      },
      {
        question: "Does the fuel cap have to be a Ford part?",
        answer:
          "It must meet the correct specification and seal properly. Cheap generic caps are a recognised cause of repeat EVAP codes, so the correct part is worth the small extra cost here.",
      },
      {
        question: "Can I just keep clearing the code?",
        answer:
          "You can, but it will return and the vehicle will keep failing inspection. Clearing also resets the monitors, meaning more driving before the system can confirm anything.",
      },
    ],
    closing: {
      title: "Confirming an EVAP repair takes patience",
      paragraphs: [
        "EVAP repairs are the ones people most often believe they have finished. The monitor does not run continuously, so a light that is off immediately afterwards means very little.",
        "After the repair, clear the code and drive normally for several days with the tank somewhere in the middle of its range. Then check whether the EVAP monitor reports ready and whether the code stayed away. Monitor readiness status on a scan tool is the number to watch, not the dashboard.",
        "If the code returns after a genuine repair, smoke-test again rather than replacing a component. Small leaks come in pairs on older vehicles, and the second one is much faster to find now that you know how the system behaves.",
      ],
    },
    sources: [fordObd2017, fordObd2024, repairPalEscapeCanister, fordManuals],
  },

  /* ------------------------------------------------------------------ P1450 */
  {
    slug: "ford/escape/p1450",
    code: "P1450",
    title: "P1450 Code Ford Escape: Fuel Tank Vacuum Causes & Fixes",
    description:
      "P1450 means your Escape cannot bleed off fuel-tank vacuum. The hiss test, why the purge valve is usually to blame, and repair costs.",
    definition: "Unable to Bleed Up Fuel Tank Vacuum",
    severity: "Diagnose promptly",
    vehicle: emissionsVehicle,
    driveAdvice:
      "The engine will usually run normally, so this is not a stop-immediately code. The reason to deal with it soon is the fuel tank itself — trapped vacuum can pull a plastic tank out of shape, turning an inexpensive valve repair into a tank replacement. A hard start right after refuelling is the other sign worth acting on.",
    quickAnswer:
      "P1450 is a Ford-specific code describing a plumbing problem rather than an engine one. As fuel leaves the tank, air has to come back in through the evaporative-emissions system to replace it. When that path is blocked — or when engine vacuum is being applied to the tank continuously because a purge valve is stuck open — vacuum builds and will not bleed off. The PCM sees the fuel-tank pressure sensor reporting vacuum it cannot relieve and stores the code. It is the exact opposite of a leak code.",
    symptoms: [
      {
        key: "whoosh",
        label: "Loud rush of air when you open the fuel cap",
        response:
          "The most telling symptom here, and it costs nothing to check. That sound is atmospheric pressure equalising a tank that has been sitting under vacuum, and it confirms the code is describing something real.",
      },
      {
        key: "hard-start",
        label: "Hard start right after refuelling",
        response:
          "A classic sign of a purge valve stuck open. Raw vapour reaches the intake while you fill, and the engine then struggles to start on an over-rich mixture. If it only happens at the fuel station, start there.",
      },
      {
        key: "clickoff",
        label: "Pump keeps clicking off while filling",
        response:
          "A tank that cannot vent cannot accept fuel at full rate either. Repeated premature shut-off often accompanies this code and shares the same cause in the vent path.",
      },
      {
        key: "stall-low",
        label: "Hesitation or stalling as the tank empties",
        response:
          "Severe trapped vacuum can work against the fuel pump. If it runs worse with a low tank and noticeably better after you open the cap, treat the vent path as the prime suspect.",
      },
      {
        key: "deformed",
        label: "Visible deformation of the fuel tank",
        response:
          "This is the outcome the code exists to prevent. Sustained vacuum can collapse a plastic tank inward. If you can see it, the repair now includes the tank.",
      },
      {
        key: "light-only",
        label: "Just the check-engine light",
        response:
          "Common early on when the restriction is partial. The tank builds vacuum slowly and you never notice — which is exactly why the tank damage this code warns about happens quietly.",
      },
    ],
    causes: [
      {
        cause: "Purge valve stuck open",
        evidence:
          "Engine vacuum reaching the tank continuously; hard start after refuelling; trims disturbed at idle",
        firstTest:
          "Command the purge valve closed and confirm it seals rather than passing vacuum through",
      },
      {
        cause: "Canister vent valve stuck closed or clogged",
        evidence:
          "Vent does not open when commanded; tank vacuum does not relieve during a scan-tool test",
        firstTest:
          "Command the vent valve open and watch tank pressure move toward atmospheric",
      },
      {
        cause: "Blocked or pinched vent line",
        evidence:
          "Line kinked, crushed, or packed with debris, mud or insect nesting",
        firstTest:
          "Trace the vent path from canister to atmospheric inlet and confirm it is clear",
      },
      {
        cause: "Restricted charcoal canister",
        evidence:
          "Canister saturated with liquid fuel from repeated overfilling, or internally blocked",
        firstTest:
          "Confirm air passes freely through the canister vent side before condemning a valve",
      },
      {
        cause: "Fuel-tank pressure sensor reading incorrectly",
        evidence:
          "Sensor reports vacuum that opening the cap does not confirm; value does not change when the seal is broken",
        firstTest:
          "Compare the live sensor value against what happens when you open the fuel cap",
      },
      {
        cause: "Filler neck or rollover valve restriction",
        evidence:
          "Poor fill rate with the vent valve confirmed working",
        firstTest:
          "Inspect the filler neck and the tank's own venting hardware for obstruction",
      },
    ],
    deepDive: [
      {
        heading: "The hiss test: thirty seconds and no tools",
        paragraphs: [
          "Drive the vehicle for twenty minutes, park, and slowly open the fuel cap while listening. A healthy system gives you a faint sound or nothing. A vehicle with genuine trapped vacuum produces an unmistakable rush of air inward.",
          "Do this before connecting anything, because it splits the diagnosis immediately. A strong inward rush means the vacuum is real and you should be looking at the purge valve, the vent valve and the vent path. No rush at all, with the code still setting, moves the fuel-tank pressure sensor and its wiring much higher up the list.",
        ],
      },
      {
        heading: "Why a stuck-open purge valve causes a vacuum code",
        paragraphs: [
          "This surprises people, because a purge valve failure sounds like it ought to cause a leak rather than a vacuum problem. The purge valve connects the EVAP system to the intake manifold, and the intake manifold is under vacuum whenever the engine runs.",
          "If that valve will not close, the engine spends every minute of operation drawing vacuum on the fuel tank through the EVAP system. The vent side cannot keep pace, vacuum accumulates, and the PCM reports that it cannot bleed it off. The same failure explains the hard-start-after-refuelling symptom, because raw vapour is being pulled into the intake at precisely the wrong moment.",
        ],
      },
      {
        heading: "P1450 is a blockage, not a leak",
        bullets: [
          "P0456, P0455, P0442 — vapour escaping. Something is open that should be sealed",
          "P1450 — air cannot get in. Something is closed or blocked that should be open",
          "P0446 — vent control circuit fault, which often appears alongside P1450 and names the part",
          "A vehicle can have both types at once, which usually means the EVAP system has aged as a whole",
          "Diagnosing a blockage as if it were a leak wastes an afternoon looking for a hole that is not there",
        ],
      },
      {
        heading: "Why acting early is worth real money",
        paragraphs: [
          "The engine runs normally with this code, which makes it easy to postpone. The consequence of postponing is not a rougher-running vehicle — it is the fuel tank.",
          "A plastic tank held under sustained vacuum deforms. Once it does, a repair that would have been an inexpensive valve becomes a tank replacement. That is the entire reason this code carries a prompt-diagnosis rating despite producing no drivability complaint.",
        ],
      },
    ],
    freezeFrame: [
      "Fuel-tank pressure sensor value when the code set, showing how much vacuum was present",
      "Fuel level, since a nearly empty tank builds vacuum faster than a full one",
      "Ambient temperature, because cooling fuel contracts and adds vacuum on its own",
      "Engine run time before the fault, separating gradual build-up from an immediate problem",
      "Companion EVAP codes such as vent or purge circuit faults, which often name the part directly",
      "Vehicle speed, which helps identify whether road debris or motion is involved",
    ],
    steps: [
      {
        title: "Open the fuel cap and listen",
        detail:
          "Do this on a vehicle that has been driven. A strong rush of air inward confirms trapped vacuum before you connect any equipment, and it takes half a minute.",
      },
      {
        title: "Read the fuel-tank pressure sensor live",
        detail:
          "Compare what it reports with the cap on and then off. A sensor that does not move when you break the seal is either faulty or not seeing the tank, which changes the whole direction of the diagnosis.",
      },
      {
        title: "Command the purge valve closed",
        detail:
          "Confirm it seals rather than passing vacuum through toward the tank. It sits in the engine bay where access is usually straightforward, and it is a common cause.",
      },
      {
        title: "Command the vent valve open",
        detail:
          "Watch whether tank pressure moves toward atmospheric. A vent that will not open is the other common cause, and this test identifies it in seconds.",
      },
      {
        title: "Trace the vent path physically",
        detail:
          "Follow the line from the canister to where it draws air. On a vehicle used on unpaved roads, mud, debris and insect nests block this path more often than anyone expects.",
      },
      {
        title: "Check the canister for fuel saturation",
        detail:
          "Repeated topping-off past the pump's first click pushes liquid fuel into the charcoal canister, restricting airflow through it. That blocks the vent path with no valve or hose being faulty.",
      },
      {
        title: "Inspect the tank before finishing",
        detail:
          "If the vehicle has run under trapped vacuum for a while, check the tank for deformation. Finding it now beats discovering it after you have paid for a valve and reassembled everything.",
      },
      {
        title: "Repeat the cap test after repair",
        detail:
          "Drive, then open the cap and listen again. Silence is the result you want. Any remaining rush of air means the path is still restricted somewhere you have not looked.",
      },
    ],
    costs: [
      {
        job: "Cap hiss test",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Trivial",
        note: "Confirms trapped vacuum is real before anything is bought",
      },
      {
        job: "Purge valve replacement",
        parts: "About $30–$75",
        shop: "Roughly $150–$400",
        diy: "Easy to moderate — engine bay",
        note: "One of the two most common causes of this code",
      },
      {
        job: "Canister vent valve",
        parts: "Moderate",
        shop: "Varies with location on your model year",
        diy: "Moderate",
        note: "The other common cause; access is the main variable",
      },
      {
        job: "Vent line clearing or repair",
        parts: "Low",
        shop: "Mostly labour to access and trace",
        diy: "Moderate — dirty work underneath",
        note: "Often just clearing a blocked inlet rather than replacing anything",
      },
      {
        job: "Charcoal canister replacement",
        parts: "Higher — full assembly",
        shop: "Get a quote for your model year",
        diy: "Advanced",
        note: "Usually the result of long-term overfilling rather than a defect",
      },
      {
        job: "Fuel tank replacement",
        parts: "Substantial",
        shop: "Get a written quote",
        diy: "Advanced",
        note: "The outcome prompt diagnosis is meant to avoid",
      },
    ],
    dontReplace:
      "Do not replace the fuel-tank pressure sensor because the code mentions tank vacuum. P1450 usually describes a real physical problem and the sensor is reporting it accurately. Prove the sensor is wrong — by comparing its reading against what happens when you open the cap — before condemning it, or you will fit a new sensor and still have a purge valve holding vacuum on your tank.",
    yearNotes: [
      "P1450 is a Ford-specific code, so generic code lists frequently describe it incorrectly or confuse it with a leak. Use Ford information for your model year.",
      "EVAP component locations differ across Escape generations. Confirm where your vent valve and canister actually sit before spending time under the wrong part of the vehicle.",
      "Vehicles used on unpaved roads see far more blocked vent paths. Inspect the vent inlet for packed mud and debris before suspecting an electrical component.",
      "On hybrid models the fuel system and monitor conditions differ, so allow more time for verification after a repair.",
    ],
    faqs: [
      {
        question: "What does P1450 mean on a Ford Escape?",
        answer:
          "That the PCM could not relieve vacuum in the fuel tank. Air normally enters the tank through the EVAP system as fuel is used, and this code means that is not happening.",
      },
      {
        question: "Why does my fuel cap hiss loudly?",
        answer:
          "Because the tank is under vacuum that could not bleed off. That rush of air is the clearest symptom of P1450 and confirms the fault before any equipment is connected.",
      },
      {
        question: "Can P1450 damage my fuel tank?",
        answer:
          "Yes, and it is the main reason to act promptly. Sustained vacuum can deform a plastic tank, turning an inexpensive valve repair into a tank replacement.",
      },
      {
        question: "How much does it cost to fix P1450 on an Escape?",
        answer:
          "Most repairs land between about $150 and $500. Purge valves and vent valves are the usual parts, and both are commonly under $75 in parts alone.",
      },
      {
        question: "Why does my Escape struggle to start after filling up?",
        answer:
          "That points at a purge valve stuck open. Raw vapour reaches the intake while you fill, and the engine then has to start on a mixture that is far too rich.",
      },
      {
        question: "Is P1450 the same as an EVAP leak?",
        answer:
          "No — they are opposites. P0456 means vapour is escaping. P1450 means air cannot get in. One is a leak, the other a blockage, and they are diagnosed in different directions.",
      },
      {
        question: "Can overfilling the tank cause P1450?",
        answer:
          "It can contribute. Topping off past the first click pushes liquid fuel into the charcoal canister, and a saturated canister restricts the airflow the tank needs to vent.",
      },
      {
        question: "Can I keep driving with P1450?",
        answer:
          "Short-term yes, since the engine runs normally. But trapped vacuum is working on the tank the whole time, so treat it as a repair for this week rather than next month.",
      },
    ],
    closing: {
      title: "What a complete P1450 repair looks like",
      paragraphs: [
        "A finished P1450 job accounts for two things: the restriction itself, and any damage the trapped vacuum caused while it went unnoticed. Skipping the second means fixing the valve and leaving a deformed tank to fail later.",
        "After the repair, drive normally and then open the fuel cap. Silence is what you want. If you still hear a rush of air, the vent path is still restricted somewhere you have not looked, regardless of what you replaced.",
        "Then confirm the EVAP monitor runs and passes without setting P1450 or a companion code. That monitor needs specific fuel-level and temperature conditions, so give it several days of ordinary driving before calling the repair verified.",
      ],
    },
    sources: [fordObd2017, fordObd2024, repairPalEscapeCanister, fordManuals],
  },

  /* ------------------------------------------------------------------ P2196 */
  {
    slug: "ford/escape/p2196",
    code: "P2196",
    title: "P2196 Code Ford Escape: O2 Sensor Stuck Rich Diagnosis",
    description:
      "P2196 on a Ford Escape means the upstream O2 sensor reads stuck rich. How to tell a failed sensor from a genuinely rich engine, and costs.",
    definition: "O2 Sensor Signal Biased/Stuck Rich (Bank 1, Sensor 1)",
    severity: "Diagnose promptly",
    vehicle: emissionsVehicle,
    driveAdvice:
      "The Escape will usually drive, but fuel control is compromised and that has consequences. A genuinely rich mixture wastes fuel, dilutes engine oil and can overheat the catalytic converter. Get it diagnosed before it becomes a converter bill, and stop if the engine misfires or the lamp begins flashing.",
    quickAnswer:
      "P2196 means the upstream oxygen sensor is reporting a rich mixture and staying there rather than switching the way a working sensor should. There are only two real possibilities and the whole diagnosis is about separating them: either the engine truly is running rich and the sensor is accurate, or the sensor has failed in a way that makes it report rich regardless. Every Escape engine since 2013 is an inline design, so Bank 1 is the whole engine and there is no second bank to compare against — which makes fuel trim data more important here than on a V-engine.",
    symptoms: [
      {
        key: "economy",
        label: "Fuel economy has dropped noticeably",
        response:
          "Consistent with a genuinely rich condition. Check long-term fuel trim — if it has gone strongly negative, the PCM is actively pulling fuel out, which suggests the rich reading is real rather than a sensor fault.",
      },
      {
        key: "fuel-smell",
        label: "Fuel smell from the exhaust",
        response:
          "Points toward an actually rich mixture. Look at fuel pressure, injector condition and anything else adding fuel before condemning the sensor.",
      },
      {
        key: "black-smoke",
        label: "Black smoke from the tailpipe",
        response:
          "Unambiguous evidence of a rich mixture. The sensor is telling the truth. Stop looking at it and start looking at what is delivering too much fuel.",
      },
      {
        key: "rough-idle",
        label: "Rough idle or hesitation",
        response:
          "A rich mixture fouls plugs and can misfire. If misfire codes stored alongside, resolve the fuel-control problem first — the misfire is very likely the consequence.",
      },
      {
        key: "light-only",
        label: "Light on but it drives normally",
        response:
          "More consistent with a biased sensor than a genuinely rich engine. If fuel trims sit near zero while the sensor insists the mixture is rich, the sensor is disagreeing with the rest of the system.",
      },
      {
        key: "oil-smell",
        label: "Fuel smell in the engine oil",
        response:
          "A sign the rich condition is real and significant. Fuel dilution damages the oil's ability to protect the engine, so this raises the urgency considerably.",
      },
    ],
    causes: [
      {
        cause: "Genuinely rich mixture",
        evidence:
          "Long-term fuel trim strongly negative as the PCM removes fuel; sooty plugs; black smoke",
        firstTest:
          "Read fuel trims at idle and under load — a real rich condition shows there before anywhere else",
      },
      {
        cause: "Contaminated or failed sensor",
        evidence:
          "Sensor voltage sits high and does not respond to a forced mixture change",
        firstTest:
          "Force a mixture change and watch whether the sensor reacts at all",
      },
      {
        cause: "Wiring, connector or heater-circuit fault",
        evidence:
          "Chafed harness near the exhaust; heater-circuit codes stored; open or high-resistance circuit",
        firstTest:
          "Inspect the sensor harness and connector for heat damage and corrosion",
      },
      {
        cause: "Dirty or drifting MAF sensor",
        evidence:
          "Airflow reading does not match expected values for load; oily film on the element from PCV vapour",
        firstTest:
          "Inspect and clean the MAF with MAF-specific cleaner, then recheck airflow against expected values",
      },
      {
        cause: "Excess fuel pressure or leaking injector",
        evidence:
          "Fuel pressure above specification; one cylinder noticeably richer than the rest",
        firstTest:
          "Compare commanded against actual fuel pressure, then test injector delivery",
      },
      {
        cause: "Sensor contamination from oil or coolant",
        evidence:
          "Engine consumes oil or loses coolant; sensor tip visibly fouled when removed",
        firstTest:
          "Remove and inspect the sensor, and investigate the consumption rather than just replacing it",
      },
    ],
    deepDive: [
      {
        heading: "Fuel trims settle the argument",
        paragraphs: [
          "Fuel trim is what separates a lying sensor from a rich engine, and it does so more reliably than anything else you can measure. The logic is straightforward.",
          "If the engine is genuinely running rich, the PCM is actively removing fuel to compensate, and long-term fuel trim will sit noticeably negative. The sensor and the PCM agree with each other and both are describing something real. If instead the trims sit near zero while the sensor insists the mixture is rich, the sensor is disagreeing with the rest of the system — and the rest of the system is usually right.",
          "On the Escape there is no second bank to use as a control group, which is a genuine disadvantage compared with diagnosing this code on a V6 or V8. That makes the trim data, the MAF reading and the fuel-pressure comparison more important rather than less.",
        ],
      },
      {
        heading: "EcoBoost engines: check the MAF first",
        paragraphs: [
          "On the turbocharged Escape engines, the PCV system routes oil-laden crankcase vapour back into the intake, and over time that vapour leaves an oily film on the mass-airflow sensor element. A contaminated MAF misreports airflow, the PCM fuels to match the wrong number, and the mixture ends up wrong.",
          "That makes inspecting and cleaning the MAF a sensible early step on any EcoBoost Escape with a fuel-control code. It costs about $15 in cleaner, takes fifteen minutes, and it addresses a documented characteristic of this platform rather than a generic possibility.",
          "Use MAF-specific cleaner only and never touch the sensing element. Let it dry completely before refitting.",
        ],
      },
      {
        heading: "Why this is the code where good sensors get thrown away",
        bullets: [
          "The code names a sensor, so the sensor gets replaced — even though the code describes what the sensor reported",
          "A new sensor in a genuinely rich engine reports exactly the same thing, and the code returns",
          "By then the diagnostic budget is spent and the actual fault is untouched",
          "Fuel trims answer the question in minutes and cost nothing to read",
          "On an EcoBoost, a $15 can of MAF cleaner is a more sensible first purchase than a sensor",
        ],
      },
      {
        heading: "What a rich mixture is doing while you decide",
        paragraphs: [
          "This is not a code to leave indefinitely. Excess fuel reaching the exhaust raises catalytic converter temperature and shortens its life, which turns a moderate repair into a much larger one.",
          "Excess fuel also washes past the piston rings into the oil. Fuel dilution reduces the oil's ability to protect bearings and cylinder walls, and it accumulates the longer the condition continues. If you can smell fuel in the oil, the condition has been going on long enough to matter and an oil change should follow the repair.",
        ],
      },
    ],
    freezeFrame: [
      "Short and long-term fuel trim — the single most useful measurement for this code",
      "Oxygen sensor voltage or lambda at the moment the code set",
      "Mass airflow reading against engine speed and load",
      "Engine coolant temperature, separating a cold-start-only fault from a fully warm one",
      "Commanded and actual fuel rail pressure where reported",
      "Any companion codes — misfire, lean codes or MAF performance codes change the order of work",
    ],
    steps: [
      {
        title: "Read fuel trims at idle and under load",
        detail:
          "Strongly negative trims mean the PCM already agrees the mixture is rich, so the sensor is telling the truth. Trims near zero while the sensor reports rich point at the sensor or its circuit.",
      },
      {
        title: "Inspect and clean the MAF sensor",
        detail:
          "On EcoBoost engines especially, PCV oil vapour contaminates the element and makes it misreport airflow. About $15 and fifteen minutes, using MAF-specific cleaner and never touching the element.",
      },
      {
        title: "Watch the sensor respond to a forced change",
        detail:
          "Create a deliberate mixture change and watch the sensor. A working sensor moves quickly; one that is stuck barely moves at all. That difference is the clearest evidence available without removing anything.",
      },
      {
        title: "Inspect the harness and connector",
        detail:
          "Oxygen sensor wiring runs close to the exhaust and takes heat, vibration and road salt. An open or high-resistance circuit produces this code with a perfectly good sensor on the end of it.",
      },
      {
        title: "Compare commanded against actual fuel pressure",
        detail:
          "Pressure above specification over-fuels every cylinder. This test separates a fuel-delivery cause from a sensor cause quickly and without disassembly.",
      },
      {
        title: "Test injector delivery",
        detail:
          "A leaking or over-delivering injector produces a genuinely rich mixture. If the trim data says the mixture really is rich and pressure is correct, this is the next place to look.",
      },
      {
        title: "Inspect the sensor itself",
        detail:
          "Remove it and look. A tip fouled with oil or coolant residue tells you both that the sensor is finished and that something else caused it — and the second part matters more.",
      },
      {
        title: "Verify with trim data after repair",
        detail:
          "Confirm trims return near zero at idle and under load and that the sensor switches actively. A code that has not returned yet is not the same as fuel control proven correct.",
      },
    ],
    costs: [
      {
        job: "Fuel trim read",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Easy with a live-data tool",
        note: "Decides sensor versus rich engine before money is spent",
      },
      {
        job: "MAF sensor cleaning",
        parts: "About $15",
        shop: "Often inside a diagnostic fee",
        diy: "Easy — 15 minutes",
        note: "Sensible first step on any EcoBoost Escape",
      },
      {
        job: "MAF sensor replacement",
        parts: "Moderate",
        shop: "Quick job once diagnosed",
        diy: "Easy",
        note: "Only if cleaning does not restore correct airflow readings",
      },
      {
        job: "Upstream oxygen sensor",
        parts: "Moderate",
        shop: "Get a quote — access is usually good",
        diy: "Moderate — may need an O2 socket",
        note: "Only after trims and wiring have cleared the engine of being genuinely rich",
      },
      {
        job: "Fuel pressure diagnosis",
        parts: "$0",
        shop: "Standard diagnostic charge",
        diy: "Moderate with a gauge",
        note: "Separates fuel delivery from sensor faults",
      },
      {
        job: "Injector replacement",
        parts: "Higher on direct-injection engines",
        shop: "Get a written quote",
        diy: "Advanced on EcoBoost",
        note: "Direct-injection parts and labour cost considerably more",
      },
    ],
    dontReplace:
      "Do not replace the oxygen sensor as your first move. P2196 is the code where a healthy sensor most often gets blamed for accurately reporting a rich engine. Read fuel trims first — strongly negative trims mean the PCM already agrees the mixture is rich, and a new sensor will report exactly the same thing for the same money. On an EcoBoost, clean the MAF before buying anything at all.",
    yearNotes: [
      "Every Escape engine since 2013 is an inline design, so Bank 1 is the whole engine and there is no second bank to compare against. Trim data matters more here than on a V-engine.",
      "On EcoBoost engines, PCV oil vapour contaminating the MAF sensor is a documented characteristic of this platform and a sensible early check for any fuel-control code.",
      "Sensor type and connector differ across model years. Match the part to the VIN rather than to a generic listing for the engine family.",
      "If the engine consumes oil or loses coolant, expect repeat sensor contamination. Replacing the sensor without addressing the consumption returns the same code later.",
    ],
    faqs: [
      {
        question: "What does P2196 mean on a Ford Escape?",
        answer:
          "The upstream oxygen sensor is reporting a rich mixture and not switching normally. Either the engine really is rich, or the sensor has failed in a way that makes it report rich regardless.",
      },
      {
        question: "Do I need a new oxygen sensor?",
        answer:
          "Not necessarily, and this is the code most often fixed by replacing the wrong part. Read fuel trims first. Strongly negative trims mean the engine really is rich and the sensor is accurate.",
      },
      {
        question: "Which sensor is Bank 1 Sensor 1?",
        answer:
          "The upstream sensor, before the catalytic converter. On the Escape's inline engines Bank 1 is simply the whole engine, so there is only one upstream sensor to consider.",
      },
      {
        question: "Can a dirty MAF sensor cause P2196?",
        answer:
          "Yes, and on EcoBoost engines it is worth checking early. PCV oil vapour leaves a film on the sensing element, the sensor misreports airflow, and the PCM fuels to match the wrong number.",
      },
      {
        question: "How much does it cost to fix P2196 on an Escape?",
        answer:
          "It depends entirely on the cause. MAF cleaner is about $15. A sensor is moderate. Injector work on a direct-injection engine is substantially more, which is exactly why the diagnosis matters.",
      },
      {
        question: "Can P2196 damage my catalytic converter?",
        answer:
          "A genuinely rich mixture can, yes. Excess fuel raises converter temperature and shortens its life, which is why this is worth diagnosing promptly rather than driving on indefinitely.",
      },
      {
        question: "Why did P2196 return after a new sensor?",
        answer:
          "Almost always because the engine was genuinely rich and the original sensor was correct. Look at fuel pressure, injectors and the MAF sensor instead.",
      },
      {
        question: "Can a rich mixture damage the engine oil?",
        answer:
          "Yes. Excess fuel washes past the rings into the oil and dilutes it, reducing its ability to protect the engine. If you can smell fuel in the oil, change it once the fault is repaired.",
      },
    ],
    closing: {
      title: "Proving fuel control is right again",
      paragraphs: [
        "Verification here is data, because the failure mode is a sensor reporting plausibly wrong values. A code that has not yet returned tells you very little on its own.",
        "Bring the engine to full operating temperature and check that short and long-term fuel trims sit near zero at idle and under load, and that the upstream sensor switches actively rather than parking at one value. Then drive the conditions from your original freeze frame and confirm it still behaves.",
        "If trims stay skewed after a sensor replacement, stop replacing sensors. That pattern means the mixture itself is wrong, and the answer is in fuel pressure, injectors or airflow measurement — which is what the sensor was reporting accurately all along.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsEscapeMaf, repairPalEscapeIntake, fordManuals],
  },
];
