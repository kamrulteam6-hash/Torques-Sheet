import type { TroubleCodeGuide } from "./trouble-code-data";
import { fordManuals, fordObd2017, fordObd2024, nhtsaTsb } from "./trouble-code-sources";

/**
 * Ford Explorer trouble-code guides: shared vehicle definition, sources, and
 * the two codes where the Explorer differs most from the rest of the range —
 * P0171 (because Bank 1 is the hard-to-reach rear bank) and P0016 (because the
 * internal water pump is the documented root cause behind most of them).
 */

export const explorerVehicle = {
  name: "Ford Explorer",
  kicker: "FORD EXPLORER · 2.3L & 3.0L ECOBOOST · 3.5L V6 · 3.3L HYBRID",
  breadcrumb: "Ford Explorer",
  about: "Ford Explorer",
  yearsIntro:
    "Two things change everything on an Explorer. First, most of these engines are V6s, so Bank 1 and Bank 2 are real, separate halves of the engine — and on the 2011–2019 transverse V6, Bank 1 is the rear bank against the firewall, which is the harder one to reach. Second, the platform changed completely for 2020: the engine turned from transverse to longitudinal when the Explorer went back to rear-wheel drive. Confirm your generation and engine before applying any location-specific advice on this page.",
};

export const goPartsExplorerWaterPump = {
  label: "Ford 3.5L and 3.7L internal water pump guide (2012–2020)",
  url: "https://www.go-parts.com/garage/engine-water-pump-ford-edge-ford-explorer-lincoln-mkz-2012-2020",
  note: "Documents the internal water pump failure that contaminates oil and destroys timing components",
};

export const goPartsExplorerP0016 = {
  label: "P0016 on 2015–2020 Ford Explorer: crank/cam correlation causes and fixes",
  url: "https://www.go-parts.com/garage/obd-p0016-ford-explorer-2015-2020",
  note: "Links timing chain stretch on this platform back to coolant contamination of the oil",
};

export const goPartsExplorerP0299 = {
  label: "P0299 on 2016–2019 Ford Explorer 2.3L EcoBoost: turbo underboost causes and fixes",
  url: "https://www.go-parts.com/garage/obd-p0299-ford-explorer-2016-2019-2-3l-ecoboost",
  note: "Identifies the wastegate linkage and bypass valve as the common failure points",
};

export const goPartsExplorerP0420 = {
  label: "P0420 on 2020–2025 Ford Explorer 2.3L EcoBoost: causes, TSBs and fixes",
  url: "https://www.go-parts.com/garage/obd-p0420-ford-explorer-2020-2025-2-3l-ecoboost",
  note: "Catalyst monitor behaviour and bulletin coverage on the current generation",
};

export const goPartsExplorerBank = {
  label: "Ford 3.5L V6 cylinder numbering and bank layout guide",
  url: "https://fordmasterx.com/ford-3-5-v6-cylinder-numbering/",
  note: "Establishes that Bank 1 is the firewall-side bank on the transverse 3.5L V6",
};

export const repairPalExplorerIntake = {
  label: "Ford Explorer intake manifold gasket replacement cost estimate",
  url: "https://repairpal.com/estimator/ford/explorer/intake-manifold-gasket-replacement-cost",
  note: "Published U.S. parts-and-labour range used as a planning figure",
};

export const troubleCodeExplorer: TroubleCodeGuide[] = [
  /* ------------------------------------------------------------------ P0171 */
  {
    slug: "ford/explorer/p0171",
    code: "P0171",
    title: "P0171 Code Ford Explorer: Causes & Fixes by Engine",
    description:
      "P0171 on a Ford Explorer. Which bank is Bank 1, why that matters on the V6, causes by engine, and what the repair actually costs.",
    definition: "System Too Lean (Bank 1)",
    severity: "Diagnose promptly",
    vehicle: explorerVehicle,
    driveAdvice:
      "You can usually keep driving an Explorer with P0171 if it still runs smoothly, but do not leave it indefinitely. A lean mixture burns hotter than the engine was designed for, and sustained lean running is one of the recognised ways people destroy a catalytic converter. Stop if the check-engine light begins flashing, if you feel misfire, or if power drops away sharply.",
    quickAnswer:
      "P0171 means your Explorer's PCM added as much fuel as its calibration allows trying to correct a lean reading on Bank 1, and it ran out of room. On a V6 Explorer that word 'Bank 1' does real work: it tells you which half of the engine to investigate, and on the 2011–2019 transverse 3.5L it points at the rear bank against the firewall rather than the front one you can see. It also gives you something the four-cylinder models do not have — Bank 2 as a control group. If only Bank 1 is lean, the fault is in Bank 1 hardware. If both banks are lean, the cause sits upstream of them.",
    symptoms: [
      {
        key: "rough-idle",
        label: "Rough idle that improves as you drive",
        response:
          "Classic vacuum-leak behaviour. At idle the manifold pulls its strongest vacuum and the leak is a large proportion of total airflow. Open the throttle and the leak becomes a small fraction of a much bigger flow, so the roughness fades.",
      },
      {
        key: "economy",
        label: "Fuel economy has dropped",
        response:
          "The PCM is adding fuel continuously to compensate for air it cannot account for, and you pay for that at every fill. A strongly positive long-term fuel trim confirms it has been working hard for some time.",
      },
      {
        key: "p0174-too",
        label: "P0174 stored alongside P0171",
        response:
          "This pairing is genuinely useful on a V6. Both banks lean means the cause is upstream of the split — the MAF sensor, the air intake duct, the PCV system or fuel supply — rather than a gasket on one cylinder head.",
      },
      {
        key: "hesitation",
        label: "Hesitation or stumble under acceleration",
        response:
          "On EcoBoost Explorers, check the charge-air plumbing. A cracked or loose charge pipe leaks air the MAF has already measured, which produces exactly this feeling when you ask for boost.",
      },
      {
        key: "coolant",
        label: "Coolant level dropping as well",
        response:
          "Worth noting on the 3.5L V6. The intake manifold gasket on that engine also seals coolant passages, so a failing gasket can produce a vacuum leak and a coolant loss at the same time.",
      },
      {
        key: "cold-worse",
        label: "Worse when cold, better once warm",
        response:
          "Rubber and plastic shrink when cold, so a hose or gasket that seals adequately at operating temperature can open a gap on a cold morning. Inspect while the engine is cold rather than after it has been idling.",
      },
    ],
    causes: [
      {
        cause: "Intake manifold gasket leak",
        evidence:
          "Rough idle, hissing, positive trims worst at idle; on the 3.5L, possible coolant loss at the same time",
        firstTest:
          "Smoke-test the intake with attention to the manifold sealing faces on both banks",
      },
      {
        cause: "Vacuum or PCV hose leak",
        evidence:
          "Positive long-term fuel trim highest at idle; visible cracking on aged rubber; audible hiss",
        firstTest:
          "Smoke-test the intake system rather than spending an hour looking at hoses that seal until they are pressurised",
      },
      {
        cause: "Dirty or contaminated MAF sensor",
        evidence:
          "Both banks affected; airflow reading lower than expected for load; oily film on the element",
        firstTest:
          "Remove and inspect the sensor, then clean with MAF-specific cleaner only",
      },
      {
        cause: "Charge-air leak (EcoBoost engines)",
        evidence:
          "Hesitation under boost; oily residue at a charge-pipe joint; problem worsens under load rather than at idle",
        firstTest:
          "Pressure-test the charge-air system, since a leak after the MAF stays invisible at idle",
      },
      {
        cause: "Exhaust leak ahead of the Bank 1 sensor",
        evidence:
          "Ticking that changes with rpm; leak at a manifold or flange upstream of the upstream sensor",
        firstTest:
          "Inspect the exhaust between the head and the sensor — on the rear bank this needs proper access",
      },
      {
        cause: "Low fuel pressure or a restricted injector",
        evidence:
          "Trim correction worst under load rather than at idle; fuel pressure below specification",
        firstTest:
          "Compare commanded against actual fuel pressure before assuming the fault is on the air side",
      },
    ],
    deepDive: [
      {
        heading: "Where Bank 1 actually is on your Explorer",
        paragraphs: [
          "Get this wrong and you will spend an afternoon inspecting the wrong half of the engine. On the 2011–2019 Explorer with the transverse 3.5L V6, Bank 1 is the rear bank — the one against the firewall — and it contains cylinders 1, 2 and 3. Bank 2 is the front bank nearest the radiator, containing cylinders 4, 5 and 6.",
          "That is the opposite of what most people assume. The front bank is the one you can see and reach, so it feels like it ought to be Bank 1. It is not. On this engine the difficult, hard-to-access bank is the one the code is pointing at, which is part of why P0171 on an Explorer takes longer than the same code on a four-cylinder.",
          "One important caveat: the Explorer changed platform completely for 2020, moving from transverse front-wheel-drive architecture to a longitudinal rear-wheel-drive layout. That changes how the engine sits in the bay, so do not carry the 2011–2019 bank orientation onto a 2020-or-later vehicle. Confirm it for your generation before you start.",
        ],
      },
      {
        heading: "3.5L V6 (2011–2019): the intake gasket that also holds coolant",
        paragraphs: [
          "On the 3.5L V6, intake manifold gaskets are a recognised cause of lean codes, and Ford bulletin material points to leaking intake gaskets as a primary cause of P0171 and P0174 across its V6 range.",
          "There is a detail on this engine worth knowing. The intake manifold gasket also seals coolant passages, so a gasket that has begun to fail can leak air into the intake and coolant out at the same time. If your Explorer has both a lean code and a slowly dropping coolant level with no puddle underneath, do not treat those as two separate problems — check the intake gasket before you go looking for a head gasket.",
          "The PCV system is the other common source on this engine, and the hoses run in an area that gets hot. Cracks appear where the rubber flexes, and they seal well enough when warm to survive a casual inspection.",
        ],
      },
      {
        heading: "2.0L and 2.3L EcoBoost four-cylinders",
        paragraphs: [
          "On the four-cylinder Explorers there is only one bank, so P0171 refers to the whole engine and there is no second bank to compare against. That removes a useful diagnostic tool, and it makes fuel-trim behaviour across the rev range more important instead.",
          "These engines add pressurised charge-air plumbing that the naturally aspirated V6 does not have. Every joint between turbo, intercooler and throttle body carries measured air under pressure, and a split coupler leaks air the MAF has already counted. Because that leak only opens under boost, an idle smoke test will pass a system that leaks badly at full throttle. Pressure-test the charge-air side separately.",
          "The PCV system on these engines also routes oil-laden vapour back into the intake, which deposits a film on the MAF sensing element over time. A contaminated MAF under-reports airflow and produces a lean condition with no leak present at all.",
        ],
      },
      {
        heading: "3.5L and 3.0L EcoBoost V6 (Sport, ST, Platinum)",
        paragraphs: [
          "The turbocharged V6 combines both sets of problems: two banks to keep straight, and a charge-air system that can leak after the MAF. Work the bank comparison first, then the charge-air pressure test.",
          "If only Bank 1 shows a lean correction, the fault is in Bank 1 hardware — a gasket, a hose or an exhaust leak on that side. If both banks correct positive together, look upstream at the MAF, the intake duct or fuel supply, because a single-bank fault cannot affect both halves equally.",
        ],
      },
      {
        heading: "The bank comparison, which four-cylinder owners do not get",
        bullets: [
          "Bank 1 lean, Bank 2 normal — the fault is physically on Bank 1, which on the 2011–2019 transverse V6 means the rear bank",
          "Both banks lean — the cause is upstream of the split: MAF, intake duct, PCV, or fuel supply",
          "Neither trim is high but the code persists — suspect the oxygen sensor or its wiring on Bank 1",
          "Worst at idle — vacuum leak territory",
          "Worst under load — fuel supply, or a charge-air leak on a turbocharged engine",
        ],
      },
    ],
    freezeFrame: [
      "Short and long-term fuel trim on both banks — the single most useful comparison available on a V6",
      "Whether the correction is worst at idle or under load, which separates vacuum leaks from fuel-supply faults",
      "Mass airflow reading against engine speed and load, which exposes a sensor under-reporting",
      "Engine coolant temperature, separating a cold-only leak from one present when fully warm",
      "Any companion codes — P0174, misfire codes or MAF performance codes change the diagnostic order",
      "Fuel rail pressure, commanded against actual, where your scan tool reports both",
    ],
    steps: [
      {
        title: "Confirm your engine and generation",
        detail:
          "A 2015 3.5L V6 and a 2022 2.3L EcoBoost share this code and share very little else. Read the VIN and the underbonnet label, and note whether your Explorer is the 2011–2019 transverse platform or the 2020-onward longitudinal one.",
      },
      {
        title: "Compare Bank 1 and Bank 2 trims",
        detail:
          "On a V6 this is the highest-value reading you can take. One bank lean means a bank-specific fault; both banks lean means the cause is upstream of them. It narrows the search before you touch anything.",
      },
      {
        title: "Read trims at idle and at cruise",
        detail:
          "Correction that is worst at idle and improves with revs points at a vacuum leak. Correction that is worst under load points at fuel delivery, or at a charge-air leak on a turbocharged engine.",
      },
      {
        title: "Inspect and clean the MAF sensor",
        detail:
          "Particularly on EcoBoost engines where PCV vapour leaves an oily film. Use MAF-specific cleaner, never touch the element, and let it dry fully. About $15 and fifteen minutes.",
      },
      {
        title: "Smoke-test the intake system",
        detail:
          "Watch the manifold gasket line on both banks, every hose junction, the intake duct and the throttle body seal. On the 3.5L, pay particular attention to the manifold faces because that gasket is a known failure point.",
      },
      {
        title: "Check the coolant level on a 3.5L",
        detail:
          "The intake gasket on that engine also seals coolant passages. A lean code plus quietly dropping coolant is a strong pointer at the gasket rather than two unrelated faults.",
      },
      {
        title: "Pressure-test the charge-air system on EcoBoost engines",
        detail:
          "A leak between turbo and throttle body only opens under boost and will pass an idle smoke test completely. If the smoke test came back clean on a turbocharged Explorer, this is the next step.",
      },
      {
        title: "Verify with trims rather than the dashboard",
        detail:
          "After the repair, bring the engine to full temperature and confirm long-term fuel trim has returned near zero on both banks, at idle and under load. A light that has not come back on yet is not proof.",
      },
    ],
    costs: [
      {
        job: "MAF sensor cleaning",
        parts: "About $15 for cleaner",
        shop: "Often inside a diagnostic fee",
        diy: "Easy — 15 minutes",
        note: "First step on any EcoBoost Explorer; cheapest possible fix",
      },
      {
        job: "Smoke test diagnosis",
        parts: "$0",
        shop: "Roughly $75–$150",
        diy: "Needs a smoke machine",
        note: "Finds leaks that hours of visual inspection will not",
      },
      {
        job: "PCV or vacuum hose replacement",
        parts: "Low — usually under $50",
        shop: "Roughly $150–$500 depending on access",
        diy: "Easy to moderate",
        note: "Cost is access. Rear-bank work on the transverse V6 takes longer",
      },
      {
        job: "Intake manifold gasket set",
        parts: "Moderate",
        shop: "From roughly $278 upward by engine and year",
        diy: "Moderate to advanced",
        note: "A recognised lean-code cause on the 3.5L V6",
      },
      {
        job: "Charge-air pipe or clamp (EcoBoost)",
        parts: "Low to moderate",
        shop: "Mostly labour to access",
        diy: "Moderate",
        note: "Often a loose clamp or split coupler rather than a whole pipe",
      },
      {
        job: "MAF sensor replacement",
        parts: "Moderate",
        shop: "Quick once diagnosed",
        diy: "Easy",
        note: "Only if cleaning does not restore correct airflow readings",
      },
    ],
    dontReplace:
      "Do not buy an oxygen sensor because the code says the system is lean. On P0171 the sensor is reporting correctly — it is telling you there is more oxygen in the exhaust than there should be, which is precisely its job. And on a V6, do not start work before comparing Bank 1 against Bank 2. That single reading tells you whether to look at one cylinder head or at the whole intake, and getting it wrong on a transverse Explorer means dismantling access to the wrong bank.",
    yearNotes: [
      "On the 2011–2019 transverse 3.5L V6, Bank 1 is the rear bank against the firewall and holds cylinders 1, 2 and 3. Bank 2 is the front bank nearest the radiator with cylinders 4, 5 and 6.",
      "The Explorer changed to a longitudinal rear-wheel-drive platform for 2020, so bank orientation and component access differ. Do not carry the earlier layout onto a newer vehicle.",
      "On the 3.5L V6 the intake manifold gasket also seals coolant passages, so a failing gasket can produce a lean code and a coolant loss together.",
      "Four-cylinder Explorers (2.0L and 2.3L EcoBoost) have a single bank, so P0171 covers the whole engine and there is no second bank to compare against.",
    ],
    faqs: [
      {
        question: "Which side is Bank 1 on a Ford Explorer?",
        answer:
          "On the 2011–2019 transverse 3.5L V6 it is the rear bank, against the firewall, containing cylinders 1, 2 and 3. That is the opposite of what most people assume. Confirm separately for 2020-onward vehicles, which use a longitudinal layout.",
      },
      {
        question: "What does P0171 mean on a Ford Explorer?",
        answer:
          "That the PCM added as much fuel as its calibration allows trying to correct a lean reading on Bank 1, and ran out of adjustment. Something is letting unmetered air in, or not enough fuel is arriving.",
      },
      {
        question: "Can I drive with P0171?",
        answer:
          "Short-term, usually yes if it runs smoothly. But a lean mixture burns hotter than designed and prolonged lean running can damage a catalytic converter. Stop if the light flashes or you feel misfire.",
      },
      {
        question: "What does P0171 with P0174 mean on my Explorer?",
        answer:
          "Both banks are lean, which points upstream of the split — the MAF sensor, the intake duct, the PCV system or fuel supply. A single gasket on one cylinder head cannot make both banks lean equally.",
      },
      {
        question: "How much does it cost to fix P0171 on an Explorer?",
        answer:
          "From about $15 for MAF cleaner to several hundred for an intake manifold gasket set, which starts around $278. A $75–$150 smoke test is what decides which end of the range you are in.",
      },
      {
        question: "Why is my coolant dropping along with a lean code?",
        answer:
          "On the 3.5L V6 the intake manifold gasket also seals coolant passages, so a single failing gasket can cause both symptoms. Check that before assuming a head gasket.",
      },
      {
        question: "Do I need a new oxygen sensor?",
        answer:
          "Almost never for this code. The sensor is accurately reporting extra oxygen in the exhaust. Replacing it treats the messenger and leaves the leak exactly where it was.",
      },
      {
        question: "Why is P0171 harder to fix on an Explorer than a four-cylinder?",
        answer:
          "Because on the transverse V6, Bank 1 is the rear bank against the firewall. Access is genuinely more difficult, so the same repair takes longer and costs more in labour than the equivalent job on an inline engine.",
      },
    ],
    closing: {
      title: "Confirming the repair with fuel trim, not the warning light",
      paragraphs: [
        "P0171 is a code you verify with data. The fault is a gradual mixture error rather than a hard failure, so the lamp staying off for a day proves very little — the PCM needs to run its fuel monitor across a range of conditions first.",
        "Bring the engine to full operating temperature and watch long-term fuel trim on both banks, at idle and then at a steady cruise. All four readings should sit near zero. A bank that is corrected at idle but still positive under load usually means you found one leak and left another — commonly a charge-air joint on a turbocharged engine, which the idle smoke test could never have shown you.",
        "If Bank 1 comes back to normal and Bank 2 drifts, do not assume the repair failed. On a V6 with aged rubber throughout, finding a second leak on the other bank shortly after fixing the first is common rather than surprising.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsExplorerBank, repairPalExplorerIntake, nhtsaTsb, fordManuals],
  },

  /* ------------------------------------------------------------------ P0016 */
  {
    slug: "ford/explorer/p0016",
    code: "P0016",
    title: "P0016 Code Ford Explorer: Timing Chain & Water Pump Fixes",
    description:
      "P0016 on a Ford Explorer usually traces back to the internal water pump. Why the timing chain fails, what a full repair includes, and costs.",
    definition: "Crankshaft Position — Camshaft Position Correlation (Bank 1, Sensor 'A')",
    severity: "Stop soon",
    vehicle: {
      ...explorerVehicle,
      yearsIntro:
        "On the Explorer, P0016 is rarely just a timing chain. The 3.5L and 3.7L V6 engines use an internal water pump driven off the timing chain, and when its seal fails it leaks coolant straight into the engine oil. Contaminated oil then destroys the timing chain, guides and phasers — which is what finally sets this code. Understanding that chain of events is what stops you paying for the same repair twice.",
    },
    driveAdvice:
      "Limit driving and stop entirely for timing-cover noise, hard starting, stalling or low oil pressure. There is a second reason to stop on this engine: if coolant is entering the oil, every mile you drive circulates a lubricant that is no longer protecting bearings. A timing failure on an interference engine bends valves, so continued driving turns a large repair into a much larger one.",
    quickAnswer:
      "P0016 means your Explorer's PCM compared crankshaft position against the Bank 1 intake camshaft and did not find the relationship it expects. On the 3.5L and 3.7L V6 the common story behind it is specific and well documented: the water pump sits inside the engine, driven by the timing chain, and when its seal fails it leaks coolant directly into the oil pan. Coolant-contaminated oil then accelerates timing chain and guide wear until the correlation drifts far enough to set this code. That is why a proper repair replaces the water pump alongside the timing components — fitting a chain kit without it invites the same failure again.",
    symptoms: [
      {
        key: "rattle",
        label: "Rattle from the timing cover, worst at start-up",
        response:
          "The classic sign of a stretched chain and worn guides. On this engine it is also a prompt to check the oil for coolant contamination, because that is frequently what caused the wear.",
      },
      {
        key: "milky-oil",
        label: "Milky or coffee-coloured oil, or oil above its normal level",
        response:
          "Treat this as urgent. It means coolant is entering the oil, and on the 3.5L or 3.7L that points straight at the internal water pump. Stop driving — contaminated oil does not protect the engine.",
      },
      {
        key: "coolant-loss",
        label: "Coolant disappearing with no visible leak",
        response:
          "An internal water pump leak goes into the engine, not onto the ground, so there is nothing to see underneath. Coolant loss with no puddle on this engine is a recognised pattern and needs investigating before the timing components are damaged further.",
      },
      {
        key: "hard-start",
        label: "Long cranking before it starts",
        response:
          "Typical of a timing relationship that has drifted. The engine needs longer to find a workable combination of spark and valve timing. Combined with noise, stop driving.",
      },
      {
        key: "rough-power",
        label: "Rough running and reduced power",
        response:
          "Valve timing that is off disturbs combustion across the engine, and the PCM may also limit output when it cannot trust the cam relationship. Fix the timing before chasing ignition parts.",
      },
      {
        key: "intermittent",
        label: "Comes and goes, often on cold start",
        response:
          "Points more toward oil pressure or a phaser than a mechanically stretched chain. Check oil level, condition and actual pressure before assuming the worst.",
      },
    ],
    causes: [
      {
        cause: "Internal water pump leaking coolant into the oil",
        evidence:
          "Coolant loss with no external leak; milky oil or a rising oil level; timing chain wear on a moderate-mileage engine",
        firstTest:
          "Inspect the oil for coolant contamination and check the coolant level against the loss history",
      },
      {
        cause: "Stretched timing chain and worn guides",
        evidence:
          "Rattle at start-up; high mileage; cam correlation drifting steadily rather than intermittently",
        firstTest:
          "Listen at cold start, then measure actual against desired cam position on live data",
      },
      {
        cause: "Low oil pressure or degraded oil",
        evidence:
          "Overdue oil change, low level, or measured pressure below specification; code often intermittent",
        firstTest:
          "Check oil level and condition first, then measure actual oil pressure against specification",
      },
      {
        cause: "Cam phaser stuck or failing",
        evidence:
          "Actual cam position does not follow the command on live data; noise from the phaser area",
        firstTest:
          "Graph desired against actual Bank 1 intake cam position through the operating range",
      },
      {
        cause: "VCT solenoid or blocked filter screen",
        evidence:
          "Solenoid does not respond to commands; screen blocked with debris, often from contaminated oil",
        firstTest:
          "Command the solenoid and inspect its filter screen — debris here is a symptom of a bigger problem",
      },
      {
        cause: "Cam or crank position sensor fault",
        evidence:
          "Signal dropouts on a scope; damaged trigger wheel; wiring chafed near heat",
        firstTest:
          "Inspect sensors, connectors and wiring and check signal quality before any disassembly",
      },
    ],
    deepDive: [
      {
        heading: "The internal water pump: the root cause behind most of these",
        paragraphs: [
          "This is the single most important thing to understand about P0016 on a 3.5L or 3.7L Explorer, and it is what separates a repair that lasts from one that fails again in a year.",
          "Unlike a conventional engine where the water pump bolts to the outside and is driven by a belt, these engines place the pump inside the engine, driven by the timing chain. That design has one significant consequence: when the pump's seal fails, the coolant has nowhere external to go. It leaks directly into the oil pan.",
          "Coolant is a poor lubricant and an aggressive contaminant. Once it is in the oil, the timing chain, its guides and the cam phasers all run on a fluid that cannot protect them. Wear accelerates, the chain stretches, the cam and crank relationship drifts, and eventually the PCM stores P0016. By the time the code appears, the damage has usually been accumulating for a while.",
          "So the timing chain is often the visible failure, and the water pump is the reason it failed. A shop that replaces the chain kit alone has treated the symptom.",
        ],
      },
      {
        heading: "What a complete repair includes",
        paragraphs: [
          "The accepted approach on these engines is to replace the primary timing chain, tensioners, guides and cam phasers as a complete kit — and to replace the internal water pump at the same time.",
          "That last part is not optional in any practical sense. Almost all of the labour on this job is spent getting access to the timing components, and the water pump sits in the same area. Replacing the chain without the pump means paying for that access twice, and running new timing components in an engine that will contaminate them again.",
          "Expect a substantial bill. Published figures for this repair range from roughly $1,500 to over $3,000, with labour frequently the larger share — one breakdown puts labour around $1,725–$2,000 with parts near $1,500 for a total approaching $3,500. It is a labour-intensive job on a transverse V6 where access is limited.",
        ],
      },
      {
        heading: "Before you accept that quote: the cheap possibilities",
        paragraphs: [
          "Not every P0016 is a timing job, and it is worth ruling out the inexpensive causes before authorising several thousand dollars of work.",
          "Variable cam timing is operated hydraulically by engine oil. Low oil level, an overdue oil change, or oil pressure below specification can all set this code with the timing drive intact. Sludge or debris can also block the small filter screen inside a VCT solenoid, which stops oil reaching the phaser and mimics a phaser failure entirely.",
          "Position sensors and their wiring are the other inexpensive possibility. A chafed harness near the exhaust or a damaged trigger wheel produces this code with a perfectly healthy chain.",
          "Ask for the oil level and condition, an actual oil pressure reading, and a live graph of desired against actual cam position before anyone opens the front of the engine. If the oil is milky, though, that conversation is over — you are into the water pump and timing repair.",
        ],
      },
      {
        heading: "Which Explorer engines this applies to",
        bullets: [
          "3.5L Ti-VCT V6 and 3.7L V6 — internal timing-chain-driven water pump; the pattern described above",
          "3.5L EcoBoost V6 — also chain driven and known for chain stretch; verify the water pump arrangement for your specific engine",
          "2.0L and 2.3L EcoBoost four-cylinders — chain driven, single bank, no second bank to compare",
          "3.0L EcoBoost and 3.3L hybrid (2020 onward) — newer architecture; confirm details against service information for your VIN",
          "On every one of them, check the oil before assuming the chain is simply worn out",
        ],
      },
    ],
    freezeFrame: [
      "Desired against actual Bank 1 intake camshaft position — the core measurement for this code",
      "Engine oil temperature and, where reported, oil pressure",
      "Engine rpm and load when the correlation error was detected",
      "Engine run time before the fault, separating a cold-start-only fault from a constant one",
      "Companion codes — P0017, P0019, VCT circuit codes or oil pressure codes all redirect the diagnosis",
      "Coolant temperature, since some VCT faults appear only when fully warm",
    ],
    steps: [
      {
        title: "Check the oil for coolant contamination first",
        detail:
          "Pull the dipstick and look. Milky, coffee-coloured oil, or a level that has risen, means coolant is getting in — and on the 3.5L or 3.7L that points straight at the internal water pump. This costs nothing and it changes the entire diagnosis.",
      },
      {
        title: "Check the coolant level and loss history",
        detail:
          "Coolant disappearing with no puddle underneath is the signature of an internal leak. Combined with a timing code on this engine, that combination is close to diagnostic on its own.",
      },
      {
        title: "Check oil level, condition and pressure",
        detail:
          "Variable cam timing runs on oil pressure. Low level, degraded oil or pressure below specification can set this code with a healthy chain, and this is the cheapest possible outcome.",
      },
      {
        title: "Listen at cold start",
        detail:
          "A rattle from the timing cover that settles after a second or two is characteristic of a stretched chain and worn guides. Noise plus this code means stop driving rather than monitoring it.",
      },
      {
        title: "Graph desired against actual cam position",
        detail:
          "Watch both through the operating range. A cam holding a fixed offset points at mechanical timing; a cam that never follows the command points at the phaser, the solenoid or oil pressure.",
      },
      {
        title: "Inspect the VCT solenoid and its screen",
        detail:
          "A blocked filter screen stops oil reaching the phaser and mimics a much larger fault. Debris on that screen is also evidence in itself — it tells you what the oil has been carrying.",
      },
      {
        title: "Check the position sensors and wiring",
        detail:
          "Inspect the cam and crank sensors, their connectors and the harness where it passes near heat. A damaged trigger wheel or chafed wire produces this code with the timing drive intact.",
      },
      {
        title: "If it is the timing job, insist the water pump is included",
        detail:
          "On the 3.5L and 3.7L, replacing the chain, guides, tensioners and phasers without the internal water pump means paying for the same access again when the new components are contaminated. Ask for it in writing on the quote.",
      },
    ],
    costs: [
      {
        job: "Oil and coolant inspection",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Trivial",
        note: "Milky oil answers the biggest question before anything is spent",
      },
      {
        job: "Oil change with correct grade",
        parts: "Modest",
        shop: "Routine service pricing",
        diy: "Easy",
        note: "Cheapest possible outcome where degraded oil is the cause",
      },
      {
        job: "Oil pressure test",
        parts: "$0",
        shop: "Standard diagnostic charge",
        diy: "Moderate with a gauge",
        note: "Rules out the hydraulic causes before the mechanical ones",
      },
      {
        job: "VCT solenoid and screen service",
        parts: "Moderate",
        shop: "Modest labour on most engines",
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
        job: "Timing chain kit plus internal water pump",
        parts: "Around $1,500",
        shop: "Roughly $1,500–$3,500 all-in; labour often $1,725–$2,000",
        diy: "Not realistic for most owners",
        note: "The water pump must be included or the repair will not last",
      },
    ],
    dontReplace:
      "Do not let anyone replace the timing chain on a 3.5L or 3.7L Explorer without also replacing the internal water pump. The pump is very often what destroyed the chain in the first place, by leaking coolant into the oil, and almost all the labour on this job is spent reaching the same area. Leaving it out means paying for that access twice and running brand-new timing components in contaminated oil. And do not replace the camshaft position sensor because the code mentions camshafts — this is a relationship test, and a sensor cannot correct a stretched chain.",
    yearNotes: [
      "The 3.5L and 3.7L V6 engines use an internal water pump driven by the timing chain. When its seal fails, coolant enters the oil rather than leaking externally, which is why the loss has no visible puddle.",
      "Coolant-contaminated oil accelerates timing chain, guide and phaser wear, which is the usual chain of events behind P0016 on these engines.",
      "The 3.5L V6 and EcoBoost engines are widely recognised for timing chain stretch. As the chain stretches, cam and crank correlation drifts until the code sets.",
      "Companion codes P0017 and P0019 describe the same correlation problem on other camshafts. Seeing several together points at the timing drive rather than at one sensor.",
    ],
    faqs: [
      {
        question: "What does P0016 mean on a Ford Explorer?",
        answer:
          "That the PCM compared crankshaft position against the Bank 1 intake camshaft and did not find the expected relationship. On the V6 engines the usual underlying cause is timing chain wear, frequently driven by coolant contaminating the oil.",
      },
      {
        question: "Why does the water pump matter for a timing code?",
        answer:
          "Because on the 3.5L and 3.7L it sits inside the engine, driven by the timing chain. When its seal fails it leaks coolant into the oil, and contaminated oil destroys the timing components — which is what sets the code.",
      },
      {
        question: "How much does it cost to fix P0016 on an Explorer?",
        answer:
          "If it is the full timing job, roughly $1,500 to $3,500 including the internal water pump, with labour often the larger share. Cheaper outcomes exist — degraded oil, a VCT solenoid or a sensor — which is why the inexpensive checks come first.",
      },
      {
        question: "Can I drive with P0016?",
        answer:
          "Keep it to a minimum, and stop for timing-cover noise, hard starting or low oil pressure. If the oil is milky, stop entirely — contaminated oil is not protecting the engine while you drive on it.",
      },
      {
        question: "Why is my coolant disappearing with no leak underneath?",
        answer:
          "On the 3.5L or 3.7L that is the signature of the internal water pump. Because the pump is inside the engine, its coolant leaks into the oil rather than onto the ground.",
      },
      {
        question: "Do I need a new camshaft position sensor?",
        answer:
          "Usually not. P0016 is a relationship test between two measurements. A new sensor cannot correct a stretched chain, a stuck phaser, low oil pressure or a blocked VCT screen.",
      },
      {
        question: "Can low oil cause P0016?",
        answer:
          "Yes. Variable cam timing is hydraulically operated, so low level, degraded oil or pressure below specification can set this code with the timing drive intact. Always check the oil first.",
      },
      {
        question: "What does milky oil mean on my Explorer?",
        answer:
          "Coolant is mixing with the engine oil. On these V6 engines that most often means the internal water pump seal has failed, and it needs addressing before the timing components are damaged further.",
      },
    ],
    closing: {
      title: "Making sure the repair does not come back",
      paragraphs: [
        "The measure of a good P0016 repair on an Explorer is not that the code cleared. It is whether the reason the timing components wore out has been addressed.",
        "If the oil showed coolant contamination, the internal water pump must be part of the repair. Ask for it explicitly on the quote and confirm it appears on the invoice. A chain kit fitted into an engine that is still contaminating its own oil is a repair with a countdown on it.",
        "After the work, complete any cam or crank relearn the service information requires, then graph desired against actual Bank 1 intake cam position across the range that originally set the code. Check the oil again after a few hundred miles — clean oil at that point is the real confirmation that the underlying cause was found, and it is worth more than a dark dashboard.",
      ],
    },
    sources: [
      fordObd2017,
      fordObd2024,
      goPartsExplorerP0016,
      goPartsExplorerWaterPump,
      fordManuals,
    ],
  },
];
