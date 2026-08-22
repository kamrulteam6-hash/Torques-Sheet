import type { TroubleCodeGuide } from "./trouble-code-data";
import { fordManuals, fordObd2017, fordObd2024, nhtsaTsb } from "./trouble-code-sources";

export const escapeVehicle = {
  name: "Ford Escape",
  kicker: "FORD ESCAPE · 1.5L & 2.0L ECOBOOST · 1.6L · 2.5L · HYBRID",
  breadcrumb: "Ford Escape",
  about: "Ford Escape",
  yearsIntro:
    "The Escape has carried at least five different engines since 2013, and P0171 behaves differently on each of them. Turbocharged EcoBoost engines have far more pressurised joints to leak from; the naturally aspirated 2.5L has fewer places to look but hides its most common failure underneath the intake manifold. Identify your engine first — the rest of this page is organised around it.",
};

export const goPartsEscapeMaf = {
  label: "P0101 on 2013–2019 Ford Escape: MAF sensor causes and fixes",
  url: "https://www.go-parts.com/garage/obd-p0101-ford-escape-2013-2019",
  note: "Documents how EcoBoost PCV oil vapour contaminates the MAF sensor on this platform",
};

export const goPartsEscapeHybrid = {
  label: "P0171 on 2005–2008 Ford Escape Hybrid: lean code causes and fixes",
  url: "https://www.go-parts.com/garage/obd-p0171-ford-escape-hybrid-2005-2008-2-3l-atkinson",
  note: "Identifies the hidden PCV hose crack beneath the intake manifold on the Atkinson engine",
};

export const repairPalEscapeIntake = {
  label: "Ford Escape intake manifold gasket replacement cost estimate",
  url: "https://repairpal.com/estimator/ford/escape/intake-manifold-gasket-replacement-cost",
  note: "Published U.S. parts-and-labour range used as a planning figure",
};

export const goPartsIntercooler = {
  label: "Ford Escape and Maverick intercooler guide",
  url: "https://www.go-parts.com/garage/intercooler-ford-escape-ford-maverick-lincoln-corsair-2013-2025",
  note: "Charge-air-cooler condensation and damage on EcoBoost applications",
};

export const troubleCodeEscape: TroubleCodeGuide[] = [
  {
    slug: "ford/escape/p0171",
    code: "P0171",
    title: "P0171 Code Ford Escape: Causes & Fixes by Engine",
    description:
      "P0171 on a Ford Escape, broken down by engine: 1.5L, 1.6L and 2.0L EcoBoost, 2.5L and Hybrid. Causes, tests, TSBs and repair costs.",
    definition: "System Too Lean (Bank 1)",
    severity: "Diagnose promptly",
    vehicle: escapeVehicle,
    driveAdvice:
      "You can usually keep driving an Escape with P0171 if it still runs smoothly, but do not leave it for months. A lean mixture burns hotter than the engine was designed for, and sustained lean running is one of the recognised ways people destroy a catalytic converter. Stop if the check-engine light starts flashing, if you feel misfire, or if power drops away sharply.",
    quickAnswer:
      "P0171 means your Escape's PCM added as much fuel as its calibration allows trying to correct a lean reading on Bank 1, and it ran out of room. Every Escape engine since 2013 is a four-cylinder or three-cylinder inline design, so Bank 1 is the whole engine — there is no second bank to compare against, which makes this code slightly harder to chase than it is on a V6 or V8. Two causes account for most repairs across the entire lineup: unmetered air getting in past the mass-airflow sensor, and a mass-airflow sensor that is under-reporting the air that does go through it. Which one is more likely depends heavily on whether your engine is turbocharged.",
    symptoms: [
      {
        key: "rough-idle",
        label: "Rough or unsteady idle that improves as you drive",
        response:
          "Classic vacuum-leak behaviour. At idle the manifold is under its strongest vacuum and the leak is a large proportion of total airflow, so the mixture error is at its worst. Open the throttle and the leak becomes a small fraction of a much larger flow, and the roughness fades.",
      },
      {
        key: "economy",
        label: "Fuel economy has dropped noticeably",
        response:
          "The PCM is adding fuel continuously to compensate for air it cannot account for. You are paying for that correction at every fill. Check long-term fuel trim — a strongly positive number confirms the PCM has been working hard for a while.",
      },
      {
        key: "hesitation",
        label: "Hesitation or stumble on acceleration",
        response:
          "On EcoBoost engines especially, check the charge-air plumbing between turbo and throttle body. A cracked or loose charge pipe leaks measured, pressurised air after the MAF has already counted it, and that produces exactly this feeling under load.",
      },
      {
        key: "with-p0174",
        label: "P0174 stored alongside P0171",
        response:
          "On the Escape's inline engines this pairing is less common than on a V-engine, but if you see both, look upstream of the intake — the MAF sensor, the air filter box, or a leak at the intake boot affects everything downstream at once.",
      },
      {
        key: "cold-start",
        label: "Worse when cold, better once warm",
        response:
          "Rubber and plastic shrink when cold, so a hose or gasket that seals adequately at operating temperature can open a gap on a cold morning. Inspect PCV hoses and intake gaskets while the engine is cold, not after it has been idling in the workshop.",
      },
      {
        key: "misfire",
        label: "Misfire codes appeared as well",
        response:
          "A lean mixture misfires when it gets lean enough. Fix the lean condition first — replacing plugs and coils while the engine is still starved of fuel treats the symptom and leaves the cause. If the lamp is flashing, stop driving.",
      },
    ],
    causes: [
      {
        cause: "Vacuum or PCV hose leak (most common overall)",
        evidence:
          "Rough idle that smooths under load; positive long-term fuel trim highest at idle; visible cracking on aged rubber hoses",
        firstTest:
          "Smoke-test the intake system — it finds in minutes what an hour of visual inspection often misses",
      },
      {
        cause: "Dirty or contaminated MAF sensor",
        evidence:
          "Airflow reading lower than expected for engine speed and load; oily film visible on the sensing element",
        firstTest:
          "Remove the sensor and inspect it, then clean with MAF-specific cleaner only — never touch the element",
      },
      {
        cause: "Intake manifold gasket leak",
        evidence:
          "Trim correction concentrated at idle; smoke escapes at the manifold-to-head joint during testing",
        firstTest:
          "Smoke-test with attention to the manifold sealing face, which is where the 2.5L most often leaks",
      },
      {
        cause: "Charge-air plumbing leak (EcoBoost only)",
        evidence:
          "Hesitation under boost; oily residue at a charge-pipe joint; leak worsens under load rather than at idle",
        firstTest:
          "Pressure-test the charge-air system — a leak after the MAF will not show up on an idle smoke test",
      },
      {
        cause: "Low fuel pressure or a restricted injector",
        evidence:
          "Trim correction is worst under load rather than at idle; fuel pressure below specification",
        firstTest:
          "Compare commanded against actual fuel pressure before assuming the fault is on the air side",
      },
      {
        cause: "Exhaust leak ahead of the oxygen sensor",
        evidence:
          "Audible ticking that changes with rpm; leak at a manifold or flange upstream of the sensor",
        firstTest:
          "Inspect the exhaust between the head and the upstream sensor for cracks and failed gaskets",
      },
    ],
    deepDive: [
      {
        heading: "Which Escape engine do you have? Start here",
        paragraphs: [
          "P0171 is the same code on every Escape, but the shortlist of likely causes is genuinely different depending on what is under the bonnet. Before you read further, confirm your engine from the VIN or the underbonnet emissions label rather than from the badge on the tailgate.",
        ],
        bullets: [
          "2013–2019 Escape: 2.5L Duratec naturally aspirated, 1.6L EcoBoost, or 2.0L EcoBoost",
          "2020–present Escape: 1.5L EcoBoost three-cylinder, 2.0L EcoBoost, or 2.5L Atkinson Hybrid and Plug-In Hybrid",
          "2005–2012 Escape: 2.3L Atkinson hybrid, 2.5L, or 3.0L V6 — the only Escape where Bank 1 is genuinely one bank of two",
          "Turbocharged engines add pressurised joints downstream of the MAF, which naturally aspirated engines simply do not have",
        ],
      },
      {
        heading: "1.5L EcoBoost (2020 onward, three-cylinder)",
        paragraphs: [
          "The 1.5L is a small, hard-working turbocharged three-cylinder, and its P0171 causes reflect that. Every joint between the turbo and the throttle body is under positive pressure some of the time and under vacuum at others, so the intake system has more places to leak than any naturally aspirated Escape.",
          "Pay particular attention to the PCV system. On EcoBoost engines the PCV routes oil-laden crankcase vapour back into the intake, and over time that vapour deposits an oily film on the mass-airflow sensor element. A contaminated MAF under-reports airflow, the PCM under-fuels to match, and you get a lean code with no leak at all. Cleaning the sensor is a fifteen-dollar first step and it resolves a meaningful share of these.",
          "There is also a documented manufacturing issue worth ruling out. Ford TSB 16-0150 covers 2014–2017 Fusion and 2017 Escape vehicles with the 1.5L GTDI engine where an intake manifold bolt can back out and damage the charge air cooler. The symptoms listed are low coolant, white exhaust smoke and an illuminated lamp — so if your lean code arrives with any of those, check bulletin coverage before you start replacing sensors.",
        ],
      },
      {
        heading: "2.0L EcoBoost (2013 onward)",
        paragraphs: [
          "The 2.0L shares the EcoBoost intake architecture and therefore the same two headline causes: PCV-related MAF contamination, and leaks in the charge-air plumbing between turbo, intercooler and throttle body.",
          "One specific item is worth checking on this engine. Ford issued TSB 16-0001 for some 2.0L EcoBoost vehicles concerning a fuel odour traced to the PCV hose that connects to the valve cover, with inspection and replacement as the remedy. A PCV hose that has degraded enough to produce an odour is also a hose that can leak unmetered air, so the two complaints can arrive together.",
          "Valve covers themselves are a known weak point across Ford's 2.0L EcoBoost applications. A cracked cover or a failed cover gasket creates a vacuum leak that produces P0171 and, on some vehicles, P0174 alongside it. Inspect the cover for hairline cracks, not just the gasket surface.",
        ],
      },
      {
        heading: "1.6L EcoBoost (2013–2016)",
        paragraphs: [
          "The 1.6L follows the same turbocharged logic as its larger sibling — PCV oil contaminating the MAF, and pressurised charge-air joints that can leak after the air has been measured.",
          "This engine has its own well-documented history around coolant and cylinder-head problems, which matters here for one specific reason: if your 1.6L is losing coolant, running hot or showing white exhaust smoke alongside the lean code, do not treat P0171 as an isolated fault. Establish the cooling-system condition first. A lean code sitting on top of a coolant-loss problem is a symptom of something considerably more serious than a cracked hose.",
        ],
      },
      {
        heading: "2.5L naturally aspirated (2013–2019) and 2.3L Atkinson",
        paragraphs: [
          "Without a turbo there is no charge-air plumbing, which removes an entire category of leak. That is the good news. The bad news is that this engine's single most common cause is genuinely awkward to find.",
          "On these engines a cracked PCV hose is the classic culprit, and the crack is frequently hidden on the underside of a bend that sits beneath the intake manifold. You can inspect the engine bay carefully, see nothing wrong, and still have a substantial leak. This is precisely the situation smoke testing exists for — the smoke finds the crack you cannot see from above without removing anything.",
          "Intake manifold gaskets are the other recurring cause on the naturally aspirated engines, along with the brake booster hose and the intake boot between the airbox and throttle body. All four are cheap parts; the cost is in finding which one it is.",
        ],
      },
      {
        heading: "2.5L Hybrid and Plug-In Hybrid (2020 onward)",
        paragraphs: [
          "The hybrid runs an Atkinson-cycle 2.5L without a turbocharger, so its leak paths resemble the naturally aspirated engines rather than the EcoBoost ones: PCV hoses, intake gaskets, the intake boot and the brake booster line.",
          "What changes is how you diagnose it. The engine on a hybrid stops and starts constantly, which makes fuel-trim data harder to read and makes some tests behave differently from a conventional car. Give the engine time to run continuously and reach full operating temperature before you judge trim values, and be aware that a hybrid's engine sees fewer cold starts and more short run cycles than a conventional Escape of the same age.",
        ],
      },
      {
        heading: "Why a smoke test is the shortcut on every one of these engines",
        paragraphs: [
          "Whatever engine you have, the fastest route from code to cause is usually the same: seal the intake, fill it with smoke, and watch where the smoke comes out. It takes minutes, it costs around $75–$150 at a shop, and it works equally well on a hidden PCV crack under a 2.5L manifold and on a charge pipe joint on a 2.0L EcoBoost.",
          "The alternative — replacing likely parts in order of suspicion — is how a $40 hose becomes a $400 afternoon. On an EcoBoost, add a charge-air pressure test alongside the smoke test, because a leak that only opens under boost will not show itself while the engine idles.",
        ],
      },
    ],
    freezeFrame: [
      "Short and long-term fuel trim, and crucially whether the correction is worst at idle or under load — idle points at vacuum leaks, load points at fuel supply or charge-air leaks",
      "Mass airflow reading against engine speed and load, which exposes a sensor that is under-reporting",
      "Engine coolant temperature, separating a cold-only leak from one present at full temperature",
      "Calculated engine load and rpm at the moment the code matured",
      "Any companion codes — P0174, misfire codes, MAF performance codes or EVAP purge faults change the diagnostic order",
      "Fuel rail pressure, commanded against actual, where your scan tool reports both",
    ],
    steps: [
      {
        title: "Confirm the engine before anything else",
        detail:
          "Read the VIN or the underbonnet emissions label. A 1.5L EcoBoost and a 2.5L Hybrid share this code and share almost none of its likely causes, so getting this wrong sends you looking in the wrong half of the engine bay.",
      },
      {
        title: "Read fuel trims at idle and at speed",
        detail:
          "This single comparison narrows the search more than any other. Correction that is worst at idle and improves as revs rise points at a vacuum leak. Correction that is worst under load points at fuel delivery or, on an EcoBoost, at a charge-air leak downstream of the MAF.",
      },
      {
        title: "Inspect and clean the MAF sensor",
        detail:
          "Remove it and look at the sensing element. On EcoBoost engines an oily film from PCV vapour is common and it makes the sensor under-report airflow. Use MAF-specific cleaner, never touch the element, and let it dry fully before refitting. Around $15 and fifteen minutes.",
      },
      {
        title: "Inspect the PCV hoses cold",
        detail:
          "Cold rubber shows cracks that warm rubber closes up. On the 2.5L, remember the known failure is on the underside of a bend beneath the intake manifold, so a clean visual from above does not clear it.",
      },
      {
        title: "Smoke-test the intake system",
        detail:
          "Seal the intake and introduce smoke, then watch the manifold gasket line, every hose junction, the intake boot, the brake booster line and the throttle body seal. This is the test that finds hidden leaks, and it is worth paying for if you do not own a smoke machine.",
      },
      {
        title: "Pressure-test the charge-air system (EcoBoost only)",
        detail:
          "A leak between turbo and throttle body only opens under positive pressure, so it stays invisible during an idle smoke test. If you have a turbocharged Escape and the smoke test was clean, this is your next step rather than a parts order.",
      },
      {
        title: "Check fuel pressure and injector delivery",
        detail:
          "If trims are worst under load and the air side is clean, move to fuel supply. Compare commanded with actual rail pressure, and consider a restricted injector or a weakening pump.",
      },
      {
        title: "Inspect the exhaust ahead of the oxygen sensor",
        detail:
          "A leak upstream of the sensor lets outside air reach it, so the sensor reports lean when the mixture is correct. Listen for a tick that changes with rpm and inspect the manifold and flange joints.",
      },
      {
        title: "Verify by watching trims, not the dashboard",
        detail:
          "After the repair, bring the engine to full temperature and confirm long-term fuel trim has returned near zero at idle and under load. A light that has not come back on yet is not proof, especially on a hybrid where the engine runs intermittently.",
      },
    ],
    tsbs: [
      {
        number: "TSB 16-0150",
        applies: "Some 2014–2017 Fusion and 2017 Escape with 1.5L GTDI",
        summary:
          "Intake manifold bolt backing out and damaging the charge air cooler, presenting as low coolant, white exhaust smoke and an illuminated MIL. Worth ruling out when a lean code arrives together with coolant loss on the 1.5L.",
      },
      {
        number: "TSB 16-0001",
        applies: "Some 2.0L EcoBoost vehicles",
        summary:
          "Fuel odour traced to the PCV hose connected to the valve cover, with inspection and replacement as the remedy. A hose degraded enough to smell is also a hose that can admit unmetered air.",
      },
    ],
    costs: [
      {
        job: "MAF sensor cleaning",
        parts: "About $15 for cleaner",
        shop: "Often inside a diagnostic fee",
        diy: "Easy — 15 minutes",
        note: "First step on any EcoBoost. Cheapest possible fix and a common one",
      },
      {
        job: "Smoke test diagnosis",
        parts: "$0",
        shop: "Roughly $75–$150",
        diy: "Needs a smoke machine",
        note: "Finds hidden leaks like the 2.5L PCV crack under the manifold",
      },
      {
        job: "PCV or vacuum hose replacement",
        parts: "Low — usually under $50",
        shop: "Roughly $150–$500 depending on access",
        diy: "Easy to moderate",
        note: "Cost is access, not the part. Under-manifold hoses take longer",
      },
      {
        job: "MAF sensor replacement",
        parts: "Moderate",
        shop: "Get a quote — quick job once diagnosed",
        diy: "Easy",
        note: "Only if cleaning does not restore correct airflow readings",
      },
      {
        job: "Charge-air pipe or clamp (EcoBoost)",
        parts: "Low to moderate",
        shop: "Mostly labour to access",
        diy: "Moderate",
        note: "Often just a loose clamp or a split coupler rather than a whole pipe",
      },
      {
        job: "Intake manifold gasket replacement",
        parts: "Moderate",
        shop: "Roughly $810–$1,040 on Escape",
        diy: "Advanced",
        note: "The expensive outcome — confirm with smoke before authorising it",
      },
    ],
    dontReplace:
      "Do not buy an oxygen sensor because the code says the system is lean. On P0171 the sensor is almost always reporting correctly — it is telling you there is more oxygen in the exhaust than there should be, which is exactly its job. Replacing it changes nothing and costs you the diagnostic budget. Clean the MAF, smoke-test the intake, and on an EcoBoost pressure-test the charge-air side before any part is ordered.",
    yearNotes: [
      "2013–2019 Escapes came with the 2.5L Duratec, the 1.6L EcoBoost or the 2.0L EcoBoost. The turbocharged pair share PCV-related MAF contamination and charge-air leaks; the 2.5L does not have charge-air plumbing at all.",
      "2020-onward Escapes use the 1.5L EcoBoost three-cylinder, the 2.0L EcoBoost, or the 2.5L Atkinson in hybrid and plug-in hybrid form. Diagnosing trims on a hybrid needs patience because the engine cycles on and off.",
      "Every Escape engine from 2013 onward is an inline design, so Bank 1 is the whole engine and there is no second bank to compare against. On the older 3.0L V6 there genuinely are two banks, which changes what P0174 alongside P0171 means.",
      "On the 1.6L EcoBoost, treat a lean code that arrives with coolant loss, overheating or white smoke as a cooling-system investigation first. That engine has a documented history there, and P0171 would be the smaller of the two problems.",
    ],
    faqs: [
      {
        question: "What does P0171 mean on a Ford Escape?",
        answer:
          "That the PCM has added as much fuel as its calibration allows trying to correct a lean reading, and it has run out of adjustment. Something is either letting unmetered air into the engine or preventing the correct amount of fuel from arriving.",
      },
      {
        question: "Which Escape engine does this code apply to?",
        answer:
          "All of them — the 1.5L, 1.6L and 2.0L EcoBoost, the 2.5L naturally aspirated, and the 2.5L Hybrid. What changes is the likely cause. Turbocharged engines add pressurised charge-air joints that the naturally aspirated engines simply do not have.",
      },
      {
        question: "Can I drive my Escape with P0171?",
        answer:
          "Short-term, usually yes, if it still runs smoothly. But a lean mixture burns hotter than designed, and prolonged lean running is a recognised way to damage a catalytic converter. Stop if the light flashes or you feel misfire.",
      },
      {
        question: "How much does it cost to fix P0171 on an Escape?",
        answer:
          "Anywhere from about $15 for MAF cleaner to roughly $810–$1,040 for an intake manifold gasket. Most repairs land in the $150–$500 range for a hose or gasket. A $75–$150 smoke test is what decides which end you are at.",
      },
      {
        question: "Do I need a new oxygen sensor for P0171?",
        answer:
          "Almost never. The sensor is reporting the extra oxygen accurately — that is its job. Replacing it treats the messenger and leaves the leak or the airflow error exactly where it was.",
      },
      {
        question: "Why is my Escape's idle rough but fine when driving?",
        answer:
          "That pattern is close to diagnostic of a vacuum leak. At idle the leak is a large share of total airflow; open the throttle and it becomes a small share of a much bigger flow, so the mixture error shrinks and the roughness disappears.",
      },
      {
        question: "Is there a Ford bulletin for P0171 on the Escape?",
        answer:
          "There are two worth checking. TSB 16-0150 covers 1.5L GTDI intake manifold bolts damaging the charge air cooler, and TSB 16-0001 covers a 2.0L EcoBoost PCV hose at the valve cover. Confirm VIN coverage before assuming either applies.",
      },
      {
        question: "Where is the PCV hose that cracks on the 2.5L?",
        answer:
          "The recognised failure is on the underside of a bend beneath the intake manifold, which is why it survives a careful visual inspection from above. Smoke testing finds it without removing anything.",
      },
      {
        question: "Can a dirty air filter cause P0171?",
        answer:
          "Rarely on its own. A restricted filter reduces airflow, which the MAF measures, so the PCM fuels accordingly. It is worth checking as part of a general inspection but it is not a typical cause of this code.",
      },
      {
        question: "Why does P0171 keep coming back after I fixed a leak?",
        answer:
          "Usually because there was more than one. Aged rubber degrades at the same rate across an engine bay, so a vehicle old enough to crack one hose is often old enough to crack two. Re-smoke the system before reassembling.",
      },
    ],
    closing: {
      title: "Confirming the repair with fuel trim, not the warning light",
      paragraphs: [
        "P0171 is a code you verify with data, because the fault is a gradual mixture error rather than a hard failure. The lamp staying off for a day proves very little — the PCM needs to run its fuel monitor across a range of conditions before it can conclude anything.",
        "Bring the engine to full operating temperature and watch long-term fuel trim at idle first, then at a steady cruise. Both should sit near zero. A trim that is corrected at idle but still positive under load usually means you found one leak and left another — commonly a charge-air joint on an EcoBoost that the idle smoke test could not reveal.",
        "On a hybrid, allow noticeably more time. The engine cycles on and off, so trims take longer to settle into a value you can trust. Drive it normally for a few days and re-check rather than judging from one short trip.",
      ],
    },
    sources: [
      fordObd2017,
      fordObd2024,
      goPartsEscapeMaf,
      goPartsEscapeHybrid,
      goPartsIntercooler,
      repairPalEscapeIntake,
      nhtsaTsb,
      fordManuals,
    ],
  },
];
