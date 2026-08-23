import type { TroubleCodeGuide } from "./trouble-code-data";
import { fordManuals, fordObd2017, fordObd2024 } from "./trouble-code-sources";

/**
 * Ford Fusion trouble-code guides: shared definitions plus the two misfire
 * codes, which are where the Fusion differs most sharply from other Ford
 * models. The 1.5L and 2.0L EcoBoost coolant-intrusion problem presents as
 * misfire and ends in a short-block replacement, and Ford publishes a specific
 * pressure test to confirm it. That test belongs at the top of these pages.
 */

export const fusionVehicle = {
  name: "Ford Fusion",
  kicker: "FORD FUSION · 1.5L, 1.6L, 2.0L & 2.7L ECOBOOST · 2.5L · HYBRID",
  breadcrumb: "Ford Fusion",
  about: "Ford Fusion",
  yearsIntro:
    "Almost every Fusion engine is an inline four, so Bank 1 is the whole engine and there is no second bank to compare against. The exception is the 2.7L EcoBoost V6 fitted to the Sport from 2017, and the older 3.0L and 3.5L V6s, where Bank 1 and Bank 2 are genuinely separate. More importantly for several codes on this site: the 1.5L and 2.0L EcoBoost engines have a documented coolant-intrusion problem, and Ford publishes a specific test to confirm it.",
};

export const tsb192346 = {
  number: "TSB 19-2346",
  applies: "2.0L EcoBoost engines with coolant consumption and misfire symptoms",
  summary:
    "Ford's diagnostic route for coolant intrusion. The cooling system is pressurised to 138 kPa (20 psi) and held for five hours; a drop of 27.57 kPa (4 psi) over that period, together with borescope inspection confirming coolant in the cylinders, calls for short-block replacement. Confirm VIN coverage with a dealer before assuming it applies.",
};

export const tsb160150Fusion = {
  number: "TSB 16-0150",
  applies: "Some 2014–2017 Fusion and 2017 Escape with 1.5L GTDI",
  summary:
    "An intake manifold bolt backing out and damaging the charge air cooler, presenting as low coolant, white exhaust smoke and an illuminated MIL. Worth ruling out on a 1.5L where a lean or misfire code arrives together with coolant loss, because the remedy is far smaller than a short block.",
};

export const goPartsFusionHybridMisfire = {
  label: "P0300 on 2014–2018 Ford Fusion Hybrid: random misfire causes and fixes",
  url: "https://www.go-parts.com/garage/obd-p0300-ford-fusion-hybrid-2014-2018",
  note: "Covers misfire diagnosis on the Atkinson hybrid, where the engine cycles on and off",
};

export const goPartsFusionHybridP0301 = {
  label: "P0301 on 2014–2018 Ford Fusion Hybrid: cylinder 1 misfire causes and fixes",
  url: "https://www.go-parts.com/garage/obd-p0301-ford-fusion-hybrid-2014-2018",
  note: "Cylinder-specific misfire on the hybrid powertrain and how its duty cycle affects testing",
};

export const nhtsaFusionCoolant = {
  label: "NHTSA service bulletin and complaint database",
  url: "https://www.nhtsa.gov/recalls",
  note: "Public record for confirming bulletin coverage and reported coolant-intrusion complaints by VIN",
};

export const troubleCodeFusion: TroubleCodeGuide[] = [
  /* ------------------------------------------------------------------ P0300 */
  {
    slug: "ford/fusion/p0300",
    code: "P0300",
    title: "P0300 Code Ford Fusion: Random Misfire Causes & Fixes",
    description:
      "P0300 on a Ford Fusion by engine, including the 1.5L and 2.0L EcoBoost coolant-intrusion problem and the pressure test that confirms it.",
    definition: "Random/Multiple Cylinder Misfire Detected",
    severity: "Stop soon",
    vehicle: fusionVehicle,
    driveAdvice:
      "Stop driving if the check-engine light is flashing. And before you drive anywhere with this code on a 1.5L or 2.0L EcoBoost Fusion, check the coolant level and look for white smoke. Coolant flooding a combustion chamber is a documented problem on those engines, it causes stalling and limp mode, and continuing to drive one risks damage that ends in a short-block replacement.",
    quickAnswer:
      "P0300 means your Fusion's PCM detected misfire across more than one cylinder, or without one cylinder dominating. On the 2.5L and the hybrid it usually means ordinary things — plugs, coils, a vacuum leak, fuel delivery. On a 1.5L or 2.0L EcoBoost it can mean something considerably worse. Those engines have a documented crack that forms in the narrow, unsupported casting between cylinders on the open-deck block, letting coolant flood the combustion chamber. The symptoms are coolant consumption, white exhaust smoke, stalling, limp mode and P0300 through P0304. That is not a coil problem, and Ford has a published test to confirm it.",
    symptoms: [
      {
        key: "flashing",
        label: "Check-engine light is flashing",
        response:
          "Stop as soon as it is safe. Raw fuel is reaching the exhaust in quantity and a catalytic converter can be destroyed in minutes rather than months.",
      },
      {
        key: "coolant-loss",
        label: "Coolant disappearing with no puddle underneath",
        response:
          "On a 1.5L or 2.0L EcoBoost this is the symptom that matters most on the whole page. Coolant vanishing with no external leak, alongside misfire, is the recognised coolant-intrusion pattern. Stop driving and have the cooling system pressure-tested before anything is replaced.",
      },
      {
        key: "white-smoke",
        label: "White smoke or a sweet smell from the exhaust",
        response:
          "Coolant burning in the combustion chamber. Combined with misfire on an EcoBoost Fusion this is the pattern that ends in engine work if it is driven on. Do not clear the code and continue.",
      },
      {
        key: "stall-limp",
        label: "Stalling or sudden limp mode",
        response:
          "Reported alongside the coolant-intrusion failure on these engines. Enough coolant reaching a cylinder disrupts combustion badly enough that the engine cannot keep running. Treat it as urgent rather than intermittent.",
      },
      {
        key: "rough-idle",
        label: "Rough idle that smooths out under load",
        response:
          "More typical of an ordinary cause — a vacuum leak, aged plugs or a weak coil. Pull freeze frame and the individual cylinder counters before replacing anything, and check the coolant level anyway.",
      },
      {
        key: "hybrid-rough",
        label: "Roughness on a hybrid when the engine cuts in",
        response:
          "On the hybrid the engine starts and stops constantly, so misfire is felt at those transitions. It also makes live data harder to read — give the engine time to run continuously before judging trims or counters.",
      },
    ],
    causes: [
      {
        cause: "Coolant intrusion (1.5L and 2.0L EcoBoost)",
        evidence:
          "Coolant loss with no external leak, white exhaust smoke, stalling or limp mode, misfire codes P0300–P0304",
        firstTest:
          "Pressure-test the cooling system to Ford's specification and hold it — see the deep-dive section below",
      },
      {
        cause: "Worn or fouled spark plugs",
        evidence:
          "High mileage since the last change; plugs show eroded electrodes, wrong gap or fouling",
        firstTest:
          "Remove and compare all plugs against each other and against the specification for your engine",
      },
      {
        cause: "Failing ignition coils",
        evidence:
          "Misfire follows a coil when moved to another cylinder; carbon tracking inside the boot",
        firstTest:
          "Swap a coil to a different cylinder, clear codes and see whether the misfire follows it",
      },
      {
        cause: "Vacuum or intake leak",
        evidence:
          "Positive fuel trims alongside the misfire; rough idle improving under load; lean codes stored too",
        firstTest:
          "Smoke-test the intake rather than spraying flammable cleaner near a hot engine",
      },
      {
        cause: "Intake manifold bolt damage (1.5L GTDI)",
        evidence:
          "Low coolant, white smoke and MIL on a 2014–2017 1.5L; charge air cooler damaged by a backed-out manifold bolt",
        firstTest:
          "Check whether TSB 16-0150 covers your VIN — the remedy is far smaller than a short block",
      },
      {
        cause: "Fuel delivery or injector fault",
        evidence:
          "Misfire worse under load; fuel pressure below specification; injector imbalance",
        firstTest:
          "Compare commanded against actual fuel pressure, then test injector delivery",
      },
    ],
    deepDive: [
      {
        heading: "The coolant-intrusion test, and why it takes five hours",
        paragraphs: [
          "If you have a 1.5L or 2.0L EcoBoost Fusion with misfire and coolant loss, this is the single most useful section on the page — because it describes a specific, published test rather than a general suspicion.",
          "The failure itself is a crack forming in the narrow, unsupported casting between cylinders on these open-deck blocks. Coolant escapes into the combustion chamber, which produces the misfire, the white smoke, the stalling and the limp mode. It is not a head-gasket failure in the conventional sense and it does not always show on a quick pressure check, because the leak can be slow.",
          "Ford's diagnostic route for the 2.0L, published in TSB 19-2346, is deliberately patient. The cooling system is pressurised to 138 kPa — 20 psi — and held for five hours. If pressure has dropped by 27.57 kPa (4 psi) over that period, and a borescope inspection confirms coolant inside the cylinders, the remedy is short-block replacement.",
          "That five-hour hold is the part people skip. A ten-minute pressure test can pass an engine that is genuinely losing coolant internally, which is exactly how these get misdiagnosed as ignition faults. If a shop tells you the cooling system holds pressure, ask how long they held it for.",
        ],
      },
      {
        heading: "What the repair actually involves",
        paragraphs: [
          "Where coolant intrusion is confirmed, the Ford-recommended repair is an engine long-block assembly. There is one detail worth knowing that saves money: Ford has found that returned 1.5L cylinder heads pass inspection, so the original head can be reused rather than replaced.",
          "If someone quotes you for a complete engine including a new head on a 1.5L, that is worth questioning against the published guidance. The block is the part that cracked; the head generally is not.",
          "It is also worth checking coverage before paying. Ford addressed this through service bulletins rather than a formal recall, but bulletin coverage, extended warranty programmes and ongoing legal action have all applied to various model years. Check your VIN through a dealer and through the NHTSA database before assuming the bill is entirely yours.",
        ],
      },
      {
        heading: "The cheaper 1.5L possibility worth ruling out first",
        paragraphs: [
          "Before you conclude a 1.5L Fusion needs a short block, check one much smaller thing. Ford TSB 16-0150 covers some 2014–2017 Fusion vehicles with the 1.5L GTDI engine where an intake manifold bolt backs out and damages the charge air cooler.",
          "The symptoms it lists overlap almost exactly with the ones that frighten people into expecting the worst: low coolant, white exhaust smoke and an illuminated lamp. The remedy, however, is nothing like a short block.",
          "So on a 1.5L with coolant loss and misfire, checking bulletin coverage costs you nothing and can change the outcome by thousands. Do that before authorising major work.",
        ],
      },
      {
        heading: "2.5L, 2.0L Hybrid and the ordinary causes",
        bullets: [
          "The 2.5L Duratec and the 2.0L Atkinson hybrid are not part of the coolant-intrusion pattern",
          "On those engines work plugs, coils, vacuum leaks and fuel delivery in that order",
          "Start with the plugs — cheapest to inspect and they frequently show the answer outright",
          "Use the free coil swap before buying anything: move a coil, clear the code, see if the misfire follows",
          "On the hybrid, allow for the engine cycling on and off; live data needs a continuous run to be readable",
          "Check the coolant level anyway — it costs nothing and rules out the expensive scenario",
        ],
      },
    ],
    freezeFrame: [
      "Individual cylinder misfire counters — P0301 through P0304 alongside P0300 narrows things considerably",
      "Engine coolant temperature, separating a cold-start fault from a fully warm one",
      "Short and long-term fuel trim; positive trims alongside misfire point at a lean condition as the cause",
      "Engine load and rpm, distinguishing idle misfire from load misfire",
      "Any companion codes — lean codes, a cooling-related code or a boost code redirect the diagnosis",
      "Whether the engine stalled or entered limp mode at the same moment",
    ],
    steps: [
      {
        title: "Check coolant level and look for white smoke",
        detail:
          "On a 1.5L or 2.0L EcoBoost this comes before everything else. Coolant loss with no puddle, white exhaust smoke or a sweet smell means you are potentially dealing with coolant intrusion rather than an ignition fault.",
      },
      {
        title: "Save the freeze frame and cylinder counters",
        detail:
          "Record misfire counts for every cylinder before clearing anything. If one cylinder dominates, the search area shrinks dramatically. If several climb together, that pattern matters too.",
      },
      {
        title: "Pressure-test the cooling system properly",
        detail:
          "Not for ten minutes. Ford's route for the 2.0L specifies 138 kPa (20 psi) held for five hours, with a 4 psi drop over that period indicating a problem. A short test can pass an engine that is genuinely leaking internally.",
      },
      {
        title: "Borescope the cylinders if pressure drops",
        detail:
          "The pressure drop tells you coolant is going somewhere. The borescope confirms it is going into the cylinders, which is what distinguishes coolant intrusion from an external leak you have not found yet.",
      },
      {
        title: "Check bulletin coverage on a 1.5L",
        detail:
          "TSB 16-0150 covers a backed-out intake manifold bolt damaging the charge air cooler on some 2014–2017 vehicles, with symptoms that look alarmingly similar. The remedy is far smaller. Check before authorising major work.",
      },
      {
        title: "Inspect the spark plugs and compare them",
        detail:
          "Lay them out in cylinder order. Deposits narrow the cause — sooty for rich, wet for no ignition, oily for oil intrusion. Coolant deposits look different again and point straight back to the cooling system.",
      },
      {
        title: "Swap a coil rather than replacing several",
        detail:
          "Move a coil from a misfiring cylinder to a healthy one, label both, clear the code and drive the conditions from your freeze frame. If the misfire follows the coil you have found it for free.",
      },
      {
        title: "Smoke-test for vacuum leaks",
        detail:
          "If fuel trims are positive alongside the misfire, the lean condition is likely the cause rather than a coincidence. On an EcoBoost, add a charge-air pressure test since a boost leak will not show at idle.",
      },
    ],
    tsbs: [tsb192346, tsb160150Fusion],
    costs: [
      {
        job: "Coolant check and visual inspection",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Trivial",
        note: "The most valuable two minutes you can spend on an EcoBoost Fusion",
      },
      {
        job: "Five-hour cooling system pressure test",
        parts: "$0",
        shop: "Charged as extended diagnosis — ask for it specifically",
        diy: "Needs a pressure tester and patience",
        note: "The test that actually confirms or clears coolant intrusion",
      },
      {
        job: "Coil swap diagnostic",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Easy",
        note: "Finds or eliminates the most common ignition cause at no cost",
      },
      {
        job: "Spark plug set",
        parts: "Moderate for four",
        shop: "Straightforward access on an inline four",
        diy: "Easy to moderate",
        note: "Often due as maintenance anyway on a higher-mileage car",
      },
      {
        job: "TSB 16-0150 remedy (1.5L)",
        parts: "Charge air cooler and manifold hardware",
        shop: "Get a quote — far below engine work",
        diy: "Advanced",
        note: "Worth ruling in before anyone quotes a short block",
      },
      {
        job: "Short block or long block replacement",
        parts: "Substantial",
        shop: "Get a written quote and check coverage first",
        diy: "Not a DIY job",
        note: "Ford reports 1.5L cylinder heads generally pass inspection and can be reused",
      },
    ],
    dontReplace:
      "Do not buy plugs and coils for a 1.5L or 2.0L EcoBoost Fusion until the cooling system has been properly pressure-tested. On these engines misfire is a documented symptom of coolant entering the cylinders, and ignition parts will not touch it — you will spend the money, keep the misfire, and keep driving a car that is progressively damaging itself. Equally, do not accept a short-block quote on a 1.5L without first checking whether TSB 16-0150 covers your VIN, because that remedy is a fraction of the cost.",
    yearNotes: [
      "The 2014–2019 Fusion with the 1.5L EcoBoost is known for coolant consumption and white exhaust smoke caused by a crack in the unsupported casting between cylinders on the open-deck block.",
      "Ford addressed the 2.0L EcoBoost version of this problem through TSB 19-2346 rather than a formal recall, with a specified pressure test and short-block replacement as the remedy.",
      "Ford reports that returned 1.5L cylinder heads pass inspection, so the original head can generally be reused in the repair rather than replaced.",
      "The 2.5L Duratec and the 2.0L Atkinson hybrid are not part of this pattern and respond to conventional misfire diagnosis.",
    ],
    faqs: [
      {
        question: "What does P0300 mean on a Ford Fusion?",
        answer:
          "That the PCM detected misfire across more than one cylinder, or with no single cylinder dominating. It names a symptom rather than a failed part.",
      },
      {
        question: "Is P0300 on a 1.5L EcoBoost Fusion serious?",
        answer:
          "It can be. The 2014–2019 1.5L is known for coolant intrusion caused by a crack between cylinders, which presents as misfire, coolant loss, white smoke and sometimes stalling or limp mode. Check the coolant before assuming ignition.",
      },
      {
        question: "How do I know if my Fusion has coolant intrusion?",
        answer:
          "Ford's route for the 2.0L is to pressurise the cooling system to 20 psi and hold it for five hours. A 4 psi drop over that period, with a borescope confirming coolant in the cylinders, points to short-block replacement.",
      },
      {
        question: "Why does the pressure test take five hours?",
        answer:
          "Because the leak is slow. A ten-minute test can pass an engine that is genuinely losing coolant internally, which is exactly how these get misdiagnosed as ignition faults. If a shop says it holds pressure, ask how long they held it.",
      },
      {
        question: "Do I need a new cylinder head as well?",
        answer:
          "Generally not on the 1.5L. Ford reports that returned heads pass inspection, so the original can be reused. Question any quote that includes a new head on this engine.",
      },
      {
        question: "Can I drive my Fusion with P0300?",
        answer:
          "Not if the light is flashing, and not if coolant is disappearing. On an affected EcoBoost engine, continuing to drive with coolant entering a cylinder makes the eventual repair larger.",
      },
      {
        question: "Is there a recall for the Fusion coolant problem?",
        answer:
          "Ford addressed it through service bulletins rather than a formal recall, though coverage programmes and legal action have applied to various model years. Check your VIN with a dealer and through NHTSA before assuming you pay.",
      },
      {
        question: "Should I replace all four coils?",
        answer:
          "No. Read the individual cylinder counters first, then swap one coil to test it. Blanket replacement is expensive and changes nothing if the real cause is coolant or a vacuum leak.",
      },
    ],
    closing: {
      title: "Verifying a Fusion misfire repair",
      paragraphs: [
        "Write down the freeze frame and all cylinder counters before clearing anything. Those numbers are your only record of the conditions that produced the misfire, and you need them to prove the repair worked.",
        "After the repair, drive the load, rpm and temperature conditions the freeze frame recorded and confirm the counters stay at zero across all of them. A lamp that stays off during a short idle proves nothing about a misfire that appeared under load.",
        "On a 1.5L or 2.0L EcoBoost, check the coolant level again a week later even if the misfire is gone. Coolant intrusion can be slow and intermittent in its early stages, and a level that has dropped again while the car appears to run fine is telling you something important while it is still cheap to act on.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsFusionHybridMisfire, nhtsaFusionCoolant, fordManuals],
  },

  /* ------------------------------------------------------------------ P0301 */
  {
    slug: "ford/fusion/p0301",
    code: "P0301",
    title: "P0301 Code Ford Fusion: Cylinder 1 Misfire Causes & Fixes",
    description:
      "P0301 on a Ford Fusion. The free coil-swap test, why a single-cylinder code is good news, and when it signals coolant intrusion instead.",
    definition: "Cylinder 1 Misfire Detected",
    severity: "Stop soon",
    vehicle: fusionVehicle,
    driveAdvice:
      "A flashing light means stop as soon as it is safe. A steady light with an engine that still runs reasonably may allow a short, gentle trip for diagnosis. On a 1.5L or 2.0L EcoBoost Fusion, check the coolant level first — a cylinder-specific misfire on those engines can be the first sign of coolant reaching that cylinder.",
    quickAnswer:
      "P0301 is better news than P0300 because your Fusion has already named the cylinder. Every Fusion inline-four numbers its cylinders in a straight line from the accessory-drive end, so cylinder 1 is at that end and generally accessible. What the code does not say is which component failed — plug, coil, injector or the compression behind them. Two free tests separate the first two in about fifteen minutes. The one exception worth knowing: on the 1.5L and 2.0L EcoBoost, coolant intrusion can present as a single-cylinder misfire before it becomes a multiple-cylinder one.",
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
          "Stop as soon as it is safe. Raw fuel is reaching the exhaust and a catalytic converter can be ruined in minutes.",
      },
      {
        key: "coolant",
        label: "Coolant level low with no visible leak",
        response:
          "On a 1.5L or 2.0L EcoBoost, investigate this before buying ignition parts. Coolant reaching one cylinder produces a cylinder-specific misfire first, and the cooling-system test is what confirms it.",
      },
      {
        key: "cold-only",
        label: "Misfires cold, clears once warm",
        response:
          "Look at plug gap, a cracked insulator, or a coil boot that leaks until it warms and expands. A momentarily lean mixture at start-up does the same thing.",
      },
      {
        key: "power-loss",
        label: "Down on power with worse fuel economy",
        response:
          "One cylinder of four is a quarter of your engine. On a Fusion that is genuinely noticeable, and the PCM is still injecting fuel into a cylinder that is not burning it.",
      },
      {
        key: "hybrid",
        label: "Roughness when the engine starts on a hybrid",
        response:
          "The hybrid's engine cycles on and off constantly, so misfire shows itself at those transitions and live data is harder to read. Let the engine run continuously before judging counters.",
      },
    ],
    causes: [
      {
        cause: "Failing ignition coil on cylinder 1",
        evidence:
          "Misfire follows the coil when moved to another cylinder; carbon tracking in the boot; broken connector lock",
        firstTest:
          "Swap the cylinder 1 coil with a neighbour, clear the code and see whether the misfire moves with it",
      },
      {
        cause: "Worn or damaged spark plug",
        evidence:
          "Cylinder 1 plug differs from the others — eroded electrode, cracked insulator, fouling or wrong gap",
        firstTest:
          "Remove it and compare directly against the other plugs and the specification for your engine",
      },
      {
        cause: "Coolant intrusion (1.5L and 2.0L EcoBoost)",
        evidence:
          "Coolant loss with no external leak; white smoke; misfire that spreads to other cylinders over time",
        firstTest:
          "Pressure-test the cooling system to specification and hold it before buying ignition parts",
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
          "Positive fuel trims alongside the misfire; lean codes stored; leak found on smoke test",
        firstTest:
          "Smoke-test the intake rather than spraying flammable cleaner near a hot engine",
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
        heading: "Two free tests, in this order",
        paragraphs: [
          "Before anything is purchased, do these. They cost nothing and between them they identify the majority of P0301 faults on a Fusion.",
          "First, pull the cylinder 1 plug and lay it beside the other three. A plug that looks different from its neighbours has usually already answered the question, and its deposits narrow the cause further — a light tan insulator means it was firing correctly, black and sooty means rich, wet with fuel means it was not igniting at all, and oily means oil is entering the chamber.",
          "Second, swap the cylinder 1 coil with a neighbouring one. Label both, clear the code, then drive the conditions your freeze frame recorded. If the code returns naming the cylinder that now holds the original coil, the coil is faulty and you have proved it for free. If it returns as P0301, the coil is fine and the most common cause is eliminated at no cost.",
          "Only after both of those should money be spent, and by then you will know roughly where it needs to go.",
        ],
      },
      {
        heading: "When a single-cylinder misfire means something bigger",
        paragraphs: [
          "On a 1.5L or 2.0L EcoBoost Fusion there is a scenario worth ruling out early: coolant intrusion. These engines can crack in the narrow casting between cylinders, letting coolant into the combustion chamber.",
          "That does not always start as a full P0300. It can begin as a single cylinder — the one nearest the crack — misfiring intermittently, and only later spread. So a P0301 that arrives alongside coolant disappearing with no puddle underneath deserves a cooling-system test before an ignition diagnosis.",
          "The distinguishing questions are simple. Is the coolant level dropping? Is there white smoke or a sweet smell from the exhaust? Has the car stalled or gone into limp mode? Any yes moves the cooling system to the front of the queue.",
        ],
      },
      {
        heading: "When the misfire will not follow any part",
        paragraphs: [
          "A misfire that survives a new plug and refuses to move when you swap the coil is telling you the fault is not in the ignition system. At that point there are three places left to look.",
          "The injector is the first. Listen to it with a stethoscope, compare its electrical resistance against the other three, and use your scan tool's injector test if it has one — many will cut individual injectors and show the resulting rpm drop, which tells you whether that cylinder was contributing at all.",
          "Compression is the second. Relative compression from a scan tool is quick and non-invasive and will show a low cylinder without removing anything. Follow it with a proper compression or leak-down test if the numbers look wrong.",
          "And on an EcoBoost, coolant intrusion is the third. It is the one that costs the most to miss.",
        ],
      },
      {
        heading: "Why replacing all four coils is the wrong move",
        bullets: [
          "P0301 already narrowed the fault to one cylinder — that is the code doing you a favour",
          "Replacing every coil throws that away and multiplies the bill fourfold",
          "It disturbs three healthy connectors that were working perfectly",
          "If the real cause is an injector, compression or coolant, new coils change nothing",
          "The coil swap answers the same question for free in fifteen minutes",
        ],
      },
    ],
    freezeFrame: [
      "Misfire counters for all four cylinders, confirming cylinder 1 genuinely dominates",
      "Engine coolant temperature, separating a cold-start fault from a warm one",
      "Short and long-term fuel trim; positive trims suggest air or fuel rather than ignition",
      "Engine load and rpm when the counters climbed",
      "Any companion codes — a lean code, a second misfire code or a cooling code change the order of work",
      "Vehicle speed and throttle position at the time of the fault",
    ],
    steps: [
      {
        title: "Check the coolant level first on an EcoBoost",
        detail:
          "Two minutes, no cost. On a 1.5L or 2.0L, coolant loss with no puddle alongside a misfire means a cooling-system test comes before any ignition part is purchased.",
      },
      {
        title: "Confirm cylinder 1 is genuinely dominating",
        detail:
          "Read all four counters. If two or more are climbing together, you are looking at something broader than one failed part, and the diagnosis changes accordingly.",
      },
      {
        title: "Pull the plug and compare it",
        detail:
          "Lay it beside the other three. Cylinder 1 is at the accessory-drive end and generally accessible on these inline engines, so this is a quick job with a high hit rate.",
      },
      {
        title: "Swap the coil, label both",
        detail:
          "Move the cylinder 1 coil to another cylinder, clear the code and drive the freeze-frame conditions. If the misfire follows the coil you have found it; if it stays you have eliminated it.",
      },
      {
        title: "Inspect the boot and connector while it is out",
        detail:
          "Carbon tracking looks like a thin black line down the insulator and lets spark escape to ground. A broken connector lock lets the coil work loose. Both are cheap and both get overlooked.",
      },
      {
        title: "Test the injector on that cylinder",
        detail:
          "With plug and coil eliminated, listen to the injector, compare its resistance with the others, and use the scan tool's injector test where available.",
      },
      {
        title: "Check compression when nothing moves the fault",
        detail:
          "Relative compression from the scan tool first, then a mechanical compression or leak-down test if the numbers look wrong. This is where the job stops being a DIY afternoon.",
      },
      {
        title: "Verify with counters rather than the dashboard",
        detail:
          "After the repair, drive the conditions the freeze frame recorded and confirm the cylinder 1 counter stays at zero. A dark dashboard at idle is not proof for a fault that appeared under load.",
      },
    ],
    tsbs: [tsb192346],
    costs: [
      {
        job: "Plug inspection and coil swap",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Easy — 15 minutes",
        note: "Between them these two identify most P0301 faults at no cost",
      },
      {
        job: "Single ignition coil",
        parts: "Moderate",
        shop: "Typically under an hour of labour",
        diy: "Easy on an inline four",
        note: "Replace the one you proved faulty, not the set",
      },
      {
        job: "Spark plug set",
        parts: "Moderate for four",
        shop: "Straightforward access",
        diy: "Easy to moderate",
        note: "Reasonable as maintenance, but it is not a diagnosis",
      },
      {
        job: "Cooling system pressure test",
        parts: "$0",
        shop: "Ask for the extended five-hour version",
        diy: "Needs a tester and patience",
        note: "Essential on a 1.5L or 2.0L with any coolant loss",
      },
      {
        job: "Injector diagnosis and replacement",
        parts: "Higher on direct-injection engines",
        shop: "Get a quote",
        diy: "Advanced on EcoBoost",
        note: "Only once plug and coil are eliminated by testing",
      },
      {
        job: "Compression or leak-down testing",
        parts: "$0",
        shop: "Standard diagnostic charge",
        diy: "Moderate with a gauge",
        note: "Where the misfire refuses to follow any component",
      },
    ],
    dontReplace:
      "Do not replace all four coils and plugs because one cylinder misfired. P0301 already named the cylinder, and the coil swap answers the same question for nothing. And on a 1.5L or 2.0L EcoBoost, check the coolant before buying any ignition part — a cylinder-specific misfire on those engines can be the opening act of coolant intrusion, and no coil will change that.",
    yearNotes: [
      "Fusion inline-four engines number cylinders in a straight line from the accessory-drive end, so cylinder 1 sits at that end and there is no second bank.",
      "The 2.7L EcoBoost V6 in the Sport, and the older 3.0L and 3.5L V6 engines, do have two banks — confirm cylinder layout for those before assuming this applies.",
      "On 1.5L and 2.0L EcoBoost engines, coolant intrusion can begin as a single-cylinder misfire before spreading, so coolant loss alongside P0301 deserves a cooling-system test.",
      "On the hybrid the engine cycles on and off, which makes misfire counters and fuel trims harder to read. Allow a continuous run before judging the data.",
    ],
    faqs: [
      {
        question: "Where is cylinder 1 on a Ford Fusion?",
        answer:
          "At the accessory-drive end of the block. Fusion inline-four engines run their cylinders in a straight line from there, with no second bank to confuse things.",
      },
      {
        question: "Can I drive with P0301?",
        answer:
          "Briefly and gently if the light is steady, and not at all if it is flashing. On a 1.5L or 2.0L EcoBoost, check the coolant level first — coolant loss with misfire changes the answer to no.",
      },
      {
        question: "Should I replace the coil or the plug first?",
        answer:
          "Inspect the plug first because it costs nothing and often shows the fault outright. Then swap the coil to another cylinder. Between those two free steps you will identify most P0301 faults.",
      },
      {
        question: "Can coolant intrusion cause a single-cylinder misfire?",
        answer:
          "Yes. On the 1.5L and 2.0L EcoBoost it often starts in the cylinder nearest the crack before spreading. That is why coolant loss alongside P0301 deserves a pressure test rather than a coil.",
      },
      {
        question: "Why did P0301 return after new plugs and coils?",
        answer:
          "Because the fault was never in the ignition system. A misfire that survives both is usually an injector, low compression, or on an EcoBoost, coolant entering that cylinder.",
      },
      {
        question: "What does the spark plug tell me?",
        answer:
          "A light tan insulator means it was firing correctly. Black and sooty means rich. Wet with fuel means no ignition at all. Oily means oil is entering the chamber. Each points somewhere different.",
      },
      {
        question: "Is P0301 worse on the hybrid?",
        answer:
          "Not worse, but harder to diagnose. The engine cycles on and off, so counters and trims need a continuous run before they can be read reliably.",
      },
      {
        question: "How much does it cost to fix P0301 on a Fusion?",
        answer:
          "Usually modest — a plug or a single coil on an accessible inline four. It becomes expensive only when the cause is an injector, compression or coolant intrusion, which is exactly why the free tests come first.",
      },
    ],
    closing: {
      title: "Confirming the cylinder 1 repair held",
      paragraphs: [
        "Write down the freeze frame and all four cylinder counters before clearing anything. Clearing first destroys the record of conditions you need to reproduce for verification.",
        "Then drive the rpm, load and temperature window the freeze frame recorded and watch the cylinder 1 counter. Zero counts across those exact conditions is the proof. A dashboard that stays dark during a gentle drive is not, particularly for a fault that only appeared under load or when cold.",
        "On a 1.5L or 2.0L EcoBoost, check the coolant level again a week after the repair. If a misfire returns on a different cylinder having been fixed on cylinder 1, that spreading pattern is characteristic of coolant intrusion rather than a second coincidental coil failure.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsFusionHybridP0301, nhtsaFusionCoolant, fordManuals],
  },
];
