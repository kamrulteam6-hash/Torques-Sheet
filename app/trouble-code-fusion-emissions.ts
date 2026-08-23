import type { TroubleCodeGuide } from "./trouble-code-data";
import { fordManuals, fordObd2017, fordObd2024, nhtsaTsb } from "./trouble-code-sources";
import { fusionVehicle, nhtsaFusionCoolant, tsb192346 } from "./trouble-code-fusion";

/** Fusion emissions and fuel-control codes: P0420, P2196, P0456, P1450. */
export const troubleCodeFusionEmissions: TroubleCodeGuide[] = [
  /* ------------------------------------------------------------------ P0420 */
  {
    slug: "ford/fusion/p0420",
    code: "P0420",
    title: "P0420 Code Ford Fusion: Catalyst Causes & Real Fixes",
    description:
      "P0420 on a Ford Fusion rarely means the converter failed first. What kills it here, including coolant intrusion on EcoBoost engines.",
    definition: "Catalyst System Efficiency Below Threshold (Bank 1)",
    severity: "Service soon",
    vehicle: fusionVehicle,
    driveAdvice:
      "A steady P0420 alone is not an emergency, but the cause behind it might be. If misfire, coolant or oil is reaching the exhaust, driving on will consume a replacement converter as surely as it consumed the first. Stop if the lamp flashes, if power falls away, or if you can smell an overheating converter.",
    quickAnswer:
      "P0420 means the catalyst monitor tested your Fusion's converter and found oxygen-storage performance below the calibrated threshold. The important thing to understand is what a converter actually is: a ceramic honeycomb with a precious-metal coating and no moving parts. Left alone with clean combustion it lasts a very long time. When one fails early, something poisoned or cooked it — and on a 1.5L or 2.0L EcoBoost Fusion, one of the candidates is coolant, because those engines have a documented intrusion problem that sends coolant straight through the combustion chamber and into the exhaust.",
    symptoms: [
      {
        key: "light-only",
        label: "Light on, car drives completely normally",
        response:
          "The usual presentation. The catalyst monitor is an emissions test rather than a drivability one, so the engine can feel perfect while failing it outright.",
      },
      {
        key: "emissions",
        label: "Failed an emissions inspection",
        response:
          "Expected. Repair whatever caused it, then let the catalyst monitor run and pass before returning. That monitor needs sustained steady driving and will not complete on a trip round the block.",
      },
      {
        key: "coolant-loss",
        label: "Coolant disappearing with no puddle",
        response:
          "On a 1.5L or 2.0L EcoBoost this is the symptom to act on. Coolant intrusion is documented on those engines, and coolant reaching the exhaust contaminates the converter permanently. Pressure-test the cooling system before buying anything.",
      },
      {
        key: "misfire",
        label: "Misfire codes stored alongside",
        response:
          "That is your real job. Misfire sends unburned fuel into the exhaust, where it ignites and takes the converter well past its design temperature. Fix the misfire, then reassess the converter.",
      },
      {
        key: "oil-use",
        label: "Using oil between changes",
        response:
          "Oil reaching the combustion chamber leaves deposits on the converter's coating that do not come off. Address the consumption or the replacement will degrade the same way.",
      },
      {
        key: "sulphur",
        label: "Sulphur or rotten-egg smell",
        response:
          "Associated with a converter operating outside its normal window, often because the mixture is wrong. Check fuel trims before concluding the converter itself is finished.",
      },
    ],
    causes: [
      {
        cause: "Coolant intrusion (1.5L and 2.0L EcoBoost)",
        evidence:
          "Coolant loss with no external leak, white smoke, misfire codes, stalling or limp mode",
        firstTest:
          "Pressure-test the cooling system to Ford's specification and hold it — a short test can pass a leaking engine",
      },
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
          "Downstream sensor mirrors the upstream too closely; slow switching; sensor codes stored",
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
        cause: "Fuel-control fault running rich or lean",
        evidence:
          "Fuel trims well away from zero; lean or rich codes stored alongside",
        firstTest:
          "Read trims at idle and under load and resolve any mixture fault before condemning the catalyst",
      },
      {
        cause: "Genuinely failed converter",
        evidence:
          "All of the above eliminated; high mileage or physical damage; monitor still fails after upstream repairs",
        firstTest:
          "Only after the causes above have been ruled out by testing rather than assumption",
      },
    ],
    deepDive: [
      {
        heading: "What actually kills a catalytic converter",
        paragraphs: [
          "A converter is a ceramic honeycomb coated with platinum, palladium and rhodium. Exhaust gas passes through it and the coating drives the reactions that clean it up. There is nothing to wear out mechanically, which is why a converter left alone with clean combustion and correct mixture can outlast the car.",
          "Three things destroy them. Excessive heat, usually from unburned fuel arriving via misfire or a rich mixture, which melts or cracks the substrate. Contamination, where oil or coolant coats the precious-metal surface and stops the reactions happening. And physical damage from impact or from a substrate that has already broken up internally.",
          "Every one of those is caused by something upstream. That is why replacing a converter without finding the cause is such a reliable way to buy two converters — the second one meets exactly the same conditions as the first.",
        ],
      },
      {
        heading: "The coolant question on EcoBoost engines",
        paragraphs: [
          "This is the Fusion-specific point. The 1.5L and 2.0L EcoBoost engines have a documented problem where a crack forms in the unsupported casting between cylinders, letting coolant into the combustion chamber.",
          "Coolant that burns in a cylinder leaves through the exhaust, and the exhaust is where your converter sits. So on these engines a P0420 arriving alongside coolant loss, white smoke or misfire is not a converter problem that happens to coincide with a coolant problem. It is a coolant problem consuming your converter as a side effect.",
          "Ford's diagnostic route for the 2.0L, in TSB 19-2346, pressurises the cooling system to 20 psi and holds for five hours, with a 4 psi drop plus borescope confirmation indicating short-block replacement. That five-hour hold matters — a quick pressure check can pass an engine that is genuinely leaking internally.",
          "Fit a converter to an engine still doing this and you will be replacing it again.",
        ],
      },
      {
        heading: "How the monitor reaches its verdict",
        paragraphs: [
          "The PCM watches the upstream oxygen sensor and the downstream one together. A healthy converter stores and releases oxygen, which smooths the downstream signal — upstream swings, downstream stays comparatively flat. When the downstream sensor starts tracking the upstream closely, the monitor concludes storage capacity has fallen below threshold.",
          "That has a useful implication. Anything that disturbs either sensor's reading can fail this test with a perfectly good converter in place. An exhaust leak between the two sensors lets outside air in and distorts the comparison. A slow or biased downstream sensor produces a similar picture. Both cost a fraction of a converter and both are worth eliminating first.",
        ],
      },
      {
        heading: "Questions to ask before authorising a converter",
        bullets: [
          "What caused the original one to fail?",
          "Has the cooling system been pressure-tested, and for how long?",
          "Are there any misfire codes in the stored or pending history?",
          "What do the fuel trims look like at idle and under load?",
          "Has the exhaust been checked for leaks between the head and the downstream sensor?",
          "Do the oxygen sensor waveforms show the downstream sensor responding correctly?",
        ],
      },
    ],
    freezeFrame: [
      "Upstream and downstream oxygen sensor activity at the moment the monitor ran",
      "Short and long-term fuel trim, which reveal a mixture fault damaging the converter",
      "Engine coolant temperature and run time, confirming the monitor ran under valid conditions",
      "Vehicle speed and load, since the catalyst monitor needs sustained steady operation",
      "Any companion codes — misfire, lean, rich or cooling-related codes redirect the diagnosis",
      "Whether the code is current or historic, and drive cycles since it set",
    ],
    steps: [
      {
        title: "Read every stored and pending code",
        detail:
          "A misfire or fuel-trim code alongside P0420 is very likely the cause rather than a coincidence. Repair those first and reassess the converter afterwards.",
      },
      {
        title: "Check the coolant on an EcoBoost",
        detail:
          "Coolant loss with no puddle, on a 1.5L or 2.0L, points at intrusion — and coolant reaching the exhaust contaminates converters. This check belongs before any converter conversation.",
      },
      {
        title: "Pressure-test the cooling system properly if coolant is low",
        detail:
          "Ford's route for the 2.0L specifies 20 psi held for five hours, with a 4 psi drop indicating a problem. A ten-minute test can pass an engine that is leaking internally.",
      },
      {
        title: "Read fuel trims at idle and under load",
        detail:
          "Trims well away from zero mean the mixture is wrong, and a converter cannot do its job on a mixture it was not designed for. Fix the mixture fault first.",
      },
      {
        title: "Inspect the exhaust for leaks",
        detail:
          "Check from the cylinder head through to the downstream sensor. A leak between the two sensors admits outside air and can fail the monitor with a healthy converter fitted.",
      },
      {
        title: "Graph both oxygen sensors",
        detail:
          "Watch the upstream sensor swinging and the downstream one responding. A downstream sensor mirroring the upstream too closely is the monitor's evidence — but a lazy sensor produces the same picture for far less money.",
      },
      {
        title: "Investigate oil consumption if present",
        detail:
          "Oil reaching the exhaust coats the converter's precious-metal surface permanently. If the engine uses oil between changes, that needs addressing first.",
      },
      {
        title: "Complete the drive cycle after repair",
        detail:
          "The catalyst monitor needs sustained steady driving before it runs again. Do not judge the repair, or return for an emissions test, until it has actually completed.",
      },
    ],
    tsbs: [tsb192346],
    costs: [
      {
        job: "Full code scan and fuel-trim read",
        parts: "$0",
        shop: "Standard diagnostic fee",
        diy: "Easy with a live-data tool",
        note: "Finds the upstream cause that killed the converter",
      },
      {
        job: "Five-hour cooling system pressure test",
        parts: "$0",
        shop: "Charged as extended diagnosis",
        diy: "Needs a tester and patience",
        note: "Essential on a 1.5L or 2.0L with any coolant loss",
      },
      {
        job: "Exhaust leak repair",
        parts: "Low — gasket or clamp",
        shop: "Varies with location and corrosion",
        diy: "Moderate",
        note: "Cheap cause that convincingly mimics a failed converter",
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
        shop: "Get a written quote naming the cause",
        diy: "Advanced",
        note: "Ask what killed the original before agreeing to fit another",
      },
    ],
    dontReplace:
      "Do not buy a catalytic converter on the strength of this code alone. A ceramic honeycomb with no moving parts does not usually wear out — it gets cooked by misfire or poisoned by oil or coolant. Ask any shop quoting a converter to tell you what killed the original. On a 1.5L or 2.0L EcoBoost, that answer may well be coolant, and fitting a new converter without addressing it means buying two.",
    yearNotes: [
      "The 1.5L and 2.0L EcoBoost engines have a documented coolant-intrusion problem that sends coolant through the combustion chamber into the exhaust, where it contaminates the converter.",
      "Ford addressed the 2.0L version through TSB 19-2346, with a five-hour pressure test and short-block replacement as the remedy.",
      "Federal and California emissions applications may require different converters. Confirm which your car is certified to, because the wrong part can fail the monitor even when new.",
      "On the hybrid the engine runs intermittently, so the catalyst monitor takes longer to complete. Allow more driving before concluding a repair did or did not work.",
    ],
    faqs: [
      {
        question: "What does P0420 mean on a Ford Fusion?",
        answer:
          "That the catalyst monitor measured the converter's oxygen-storage performance and found it below threshold. It is a test result, not proof the converter failed first.",
      },
      {
        question: "Do I need a new catalytic converter?",
        answer:
          "Not necessarily, and not first. Misfire, a wrong mixture, an exhaust leak, a lazy oxygen sensor and oil or coolant contamination can all fail this test with a good converter fitted.",
      },
      {
        question: "Can coolant destroy a catalytic converter?",
        answer:
          "Yes, and on the 1.5L and 2.0L EcoBoost this matters. Coolant entering the combustion chamber leaves through the exhaust and coats the converter's precious-metal surface, which does not recover.",
      },
      {
        question: "Why did my new converter fail again?",
        answer:
          "Because whatever destroyed the first one was never fixed. Misfire, a rich mixture, or oil and coolant reaching the exhaust will consume a replacement just as quickly.",
      },
      {
        question: "Will an oxygen sensor fix P0420?",
        answer:
          "Sometimes, if the downstream sensor is genuinely slow or biased. Check its waveform first — a sensor fitted on a guess is a common way to spend money without changing anything.",
      },
      {
        question: "Can I drive with P0420?",
        answer:
          "A steady code alone is not urgent. If it is accompanied by misfire or coolant loss, driving on is actively destroying the converter, so the answer changes.",
      },
      {
        question: "How long before the monitor runs again after a repair?",
        answer:
          "The catalyst monitor needs sustained steady driving under specific conditions, so it can take several drive cycles. Check readiness before returning for an emissions test.",
      },
      {
        question: "What is inside a catalytic converter anyway?",
        answer:
          "A ceramic honeycomb coated with platinum, palladium and rhodium. There are no moving parts, which is why early failure almost always points at something upstream rather than at the converter itself.",
      },
    ],
    closing: {
      title: "Closing out a P0420 properly",
      paragraphs: [
        "The measure of a good P0420 repair is not that the light went out. It is whether anyone can tell you why the converter stopped working.",
        "After repairing the upstream cause, complete the drive cycle and confirm the catalyst monitor runs and passes rather than simply noting the lamp is off. On a hybrid that takes longer because the engine runs intermittently.",
        "If a converter was replaced, keep the documentation of what was found and corrected alongside it. If the code returns later, that record is the difference between a warranty conversation and starting the whole diagnosis again from nothing.",
      ],
    },
    sources: [fordObd2017, fordObd2024, nhtsaFusionCoolant, fordManuals],
  },

  /* ------------------------------------------------------------------ P2196 */
  {
    slug: "ford/fusion/p2196",
    code: "P2196",
    title: "P2196 Code Ford Fusion: O2 Sensor Stuck Rich Diagnosis",
    description:
      "P2196 on a Ford Fusion. Why the sensor is usually right, how to read fuel trims without a second bank, and what it costs.",
    definition: "O2 Sensor Signal Biased/Stuck Rich (Bank 1, Sensor 1)",
    severity: "Diagnose promptly",
    vehicle: fusionVehicle,
    driveAdvice:
      "The Fusion will usually drive, but fuel control is compromised and that carries consequences. A genuinely rich mixture wastes fuel, washes past the rings into the oil, and can overheat the catalytic converter. Get it diagnosed before it becomes a converter bill, and stop if the engine misfires or the lamp begins flashing.",
    quickAnswer:
      "P2196 means the upstream oxygen sensor is reporting a rich mixture and staying there instead of switching. Two possibilities, and the whole diagnosis is separating them: the engine really is rich and the sensor is honest, or the sensor has failed in a way that makes it report rich regardless. On a V6 you would settle that by comparing Bank 1 against Bank 2. Almost every Fusion is an inline four, so that shortcut is not available — which makes the fuel trim numbers themselves, and what the MAF is reporting, carry the whole weight of the diagnosis.",
    symptoms: [
      {
        key: "economy",
        label: "Fuel economy has dropped noticeably",
        response:
          "Consistent with a genuinely rich condition. If long-term fuel trim has gone strongly negative, the PCM is actively pulling fuel out, which means it agrees with the sensor.",
      },
      {
        key: "black-smoke",
        label: "Black smoke from the tailpipe",
        response:
          "Unambiguous evidence of a rich mixture. The sensor is telling the truth. Stop examining it and start looking at what is delivering too much fuel.",
      },
      {
        key: "fuel-in-oil",
        label: "Fuel smell in the engine oil",
        response:
          "A sign the rich condition is real and has been going on a while. Fuel dilution reduces the oil's ability to protect bearings and cylinder walls, so plan an oil change once the fault is repaired.",
      },
      {
        key: "rough-idle",
        label: "Rough idle or hesitation",
        response:
          "A rich mixture fouls plugs and can misfire. If misfire codes stored alongside, resolve the fuel-control problem first — the misfire is very likely downstream of it.",
      },
      {
        key: "light-only",
        label: "Light on but the car drives normally",
        response:
          "More consistent with a biased sensor than a genuinely rich engine. If fuel trims sit near zero while the sensor insists the mixture is rich, the sensor is disagreeing with everything else.",
      },
      {
        key: "after-work",
        label: "Appeared after recent work near the exhaust",
        response:
          "Check the sensor harness and connector before anything else. Oxygen sensor wiring runs close to hot components and is easy to chafe or leave unlatched during other repairs.",
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
        cause: "Dirty or drifting MAF sensor",
        evidence:
          "Airflow reading does not match expected values for load; oily film on the element from PCV vapour",
        firstTest:
          "Inspect and clean the MAF with MAF-specific cleaner, then recheck airflow against expected values",
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
        heading: "Diagnosing without a second bank",
        paragraphs: [
          "On a V6 or V8 this code has an easy first move: compare the affected bank against the other one. A fault confined to Bank 1 sits in Bank 1 hardware; both banks skewed means something upstream. Almost every Fusion is an inline four, so there is no second bank and that shortcut does not exist.",
          "What replaces it is reading the trim numbers themselves and asking whether the rest of the system agrees with the sensor. If long-term fuel trim has gone strongly negative, the PCM has been actively removing fuel — which means it independently concluded the mixture is rich. Two systems agreeing is strong evidence that the condition is real.",
          "If instead the trims sit near zero while the sensor reports rich, the sensor is the outlier. Nothing else in the system can see what it claims to see, and that points at the sensor, its wiring or its connector.",
          "Then check what the MAF is reporting. A mass-airflow sensor that has drifted low tells the PCM less air is entering than actually is, so the PCM fuels for the smaller number and the mixture genuinely goes rich. That is a case where the sensor is honest, the engine is rich, and neither is the actual fault.",
        ],
      },
      {
        heading: "Start with a $15 can of cleaner",
        paragraphs: [
          "On the EcoBoost engines the PCV system routes oil-laden crankcase vapour back into the intake. Over time that vapour leaves an oily film on the MAF sensing element, and a contaminated MAF misreports airflow.",
          "That makes inspecting and cleaning the MAF the sensible first move on any turbocharged Fusion with a fuel-control code. It costs about $15, takes fifteen minutes, and it addresses a documented characteristic of the platform rather than a generic possibility.",
          "Use MAF-specific cleaner only, never touch the sensing element with anything, and let it dry completely before refitting. The element is delicate enough that wiping it will finish what the oil started.",
        ],
      },
      {
        heading: "What a rich mixture costs while you decide",
        bullets: [
          "Excess fuel raises catalytic converter temperature and shortens its life",
          "Fuel washes past the piston rings and dilutes the engine oil",
          "Diluted oil protects bearings and cylinder walls less well, and the effect accumulates",
          "Fouled plugs can turn a fuel-control fault into a misfire fault as well",
          "None of this is instant, but none of it reverses on its own either",
        ],
      },
      {
        heading: "Why the named part is usually innocent",
        paragraphs: [
          "This is the code where healthy oxygen sensors are most often replaced. The reasoning is understandable — the code names the sensor, so the sensor gets changed — but the code actually describes what the sensor reported.",
          "If the engine is genuinely rich, a new sensor reports exactly the same thing, the code returns, and the diagnostic budget is gone. Reading fuel trims first costs nothing and answers the question in minutes.",
        ],
      },
    ],
    freezeFrame: [
      "Short and long-term fuel trim — the central measurement without a second bank to compare",
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
          "Strongly negative trims mean the PCM already agrees the mixture is rich, so the sensor is honest. Trims near zero while the sensor reports rich point at the sensor or its circuit.",
      },
      {
        title: "Check what the MAF is reporting",
        detail:
          "Compare its airflow figure against expected values for the engine speed and load. A MAF reading low makes the PCM under-fuel on paper and over-fuel in practice.",
      },
      {
        title: "Inspect and clean the MAF sensor",
        detail:
          "On EcoBoost engines especially, PCV oil vapour contaminates the element. MAF-specific cleaner only, never touch the element, and let it dry fully before refitting.",
      },
      {
        title: "Watch the sensor respond to a forced change",
        detail:
          "Create a deliberate mixture change and watch it. A working sensor moves quickly and decisively; one that is stuck barely moves at all.",
      },
      {
        title: "Inspect the harness and connector",
        detail:
          "Oxygen sensor wiring runs close to the exhaust and takes heat, vibration and road salt. An open or high-resistance circuit produces this code with a good sensor on the end of it.",
      },
      {
        title: "Compare commanded against actual fuel pressure",
        detail:
          "Pressure above specification over-fuels every cylinder. This separates a fuel-delivery cause from a sensor cause quickly and without disassembly.",
      },
      {
        title: "Test injector delivery",
        detail:
          "A leaking or over-delivering injector produces a genuinely rich mixture. If trims say the mixture is rich and pressure is correct, this is the next place to look.",
      },
      {
        title: "Verify with trim data after repair",
        detail:
          "Confirm trims return near zero at idle and under load and that the sensor switches actively. A code that has not returned is not the same as fuel control proven correct.",
      },
    ],
    costs: [
      {
        job: "Fuel trim and MAF data read",
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
        note: "Sensible first purchase on any EcoBoost Fusion",
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
        shop: "Usually straightforward access on an inline four",
        diy: "Moderate — may need an O2 socket",
        note: "Only after trims have cleared the engine of being genuinely rich",
      },
      {
        job: "Fuel pressure diagnosis",
        parts: "$0",
        shop: "Standard diagnostic charge",
        diy: "Moderate with a gauge",
        note: "Separates fuel delivery from sensor faults",
      },
      {
        job: "Oil change after fuel dilution",
        parts: "Modest",
        shop: "Routine service pricing",
        diy: "Easy",
        note: "Worth doing once a genuine rich condition is repaired",
      },
    ],
    dontReplace:
      "Do not replace the oxygen sensor as your first move. This is the code where honest sensors most often get blamed for accurately reporting a rich engine. Read the fuel trims — if they have gone strongly negative, the PCM already agrees with the sensor and a new one will report the same thing. On an EcoBoost, clean the MAF before buying anything at all.",
    yearNotes: [
      "Almost every Fusion engine is an inline four, so there is no second bank to compare against. The 2.7L EcoBoost V6 in the Sport does have one, which makes this code easier to diagnose on that car.",
      "On EcoBoost engines, PCV oil vapour contaminating the MAF sensor is a recognised characteristic and a sensible early check for any fuel-control code.",
      "Sensor type and connector differ across model years and engines. Match the part to the VIN rather than to a generic listing.",
      "If the engine consumes oil or loses coolant, expect repeat sensor contamination. Replacing the sensor without addressing the consumption returns the same code later.",
    ],
    faqs: [
      {
        question: "What does P2196 mean on a Ford Fusion?",
        answer:
          "The upstream oxygen sensor is reporting a rich mixture and not switching normally. Either the engine really is rich, or the sensor has failed in a way that makes it report rich.",
      },
      {
        question: "How do I tell whether the sensor is wrong?",
        answer:
          "Read long-term fuel trim. Strongly negative means the PCM is actively removing fuel and agrees the mixture is rich. Trims near zero while the sensor reports rich makes the sensor the outlier.",
      },
      {
        question: "Do I need a new oxygen sensor?",
        answer:
          "Not necessarily, and this is the code most often fixed by replacing the wrong part. Check trims and the MAF reading first.",
      },
      {
        question: "Can a dirty MAF sensor cause P2196?",
        answer:
          "Yes. A MAF reading low tells the PCM less air is entering than actually is, so it fuels for the smaller number and the mixture genuinely goes rich. The sensor is honest and the MAF is the fault.",
      },
      {
        question: "How much does it cost to fix P2196 on a Fusion?",
        answer:
          "It depends entirely on the cause. MAF cleaner is about $15. A sensor is moderate. Injector work on a direct-injection engine is substantially more, which is why the diagnosis matters.",
      },
      {
        question: "Can a rich mixture damage the engine oil?",
        answer:
          "Yes. Excess fuel washes past the rings into the oil and dilutes it, reducing its ability to protect the engine. If you can smell fuel in the oil, change it once the fault is repaired.",
      },
      {
        question: "Why did P2196 return after a new sensor?",
        answer:
          "Almost always because the engine was genuinely rich and the original sensor was correct. Look at fuel pressure, injectors and the MAF sensor instead.",
      },
      {
        question: "Can P2196 damage my catalytic converter?",
        answer:
          "A genuinely rich mixture can. Excess fuel raises converter temperature and shortens its life, which is why this is worth diagnosing promptly rather than living with.",
      },
    ],
    closing: {
      title: "Proving fuel control is right again",
      paragraphs: [
        "Verification here is data, because the failure mode is a sensor reporting plausibly wrong values. A code that has not yet returned tells you very little.",
        "Bring the engine to full operating temperature and check that short and long-term trims sit near zero at idle and under load, and that the upstream sensor switches actively rather than parking at one value. Then drive the conditions from your original freeze frame and confirm it still behaves.",
        "If trims stay skewed after a sensor replacement, stop replacing sensors. That pattern means the mixture itself is wrong, and the answer is in fuel pressure, injectors or airflow measurement — which is what the original sensor was reporting accurately all along.",
      ],
    },
    sources: [fordObd2017, fordObd2024, nhtsaTsb, fordManuals],
  },

  /* ------------------------------------------------------------------ P0456 */
  {
    slug: "ford/fusion/p0456",
    code: "P0456",
    title: "P0456 Code Ford Fusion: Small EVAP Leak Causes & Fixes",
    description:
      "P0456 on a Ford Fusion. What the monitor is actually testing, why the light lingers after a fix, and what each repair costs.",
    definition: "Evaporative Emission System Leak Detected (very small leak)",
    severity: "Service soon",
    vehicle: fusionVehicle,
    driveAdvice:
      "This one will not strand you and it will not harm the engine. Your Fusion is reporting that fuel vapour is escaping to atmosphere instead of being captured and burned. Keep driving it — but it will fail an emissions inspection, and a leak this small does not close up on its own.",
    quickAnswer:
      "P0456 is what your Fusion stores when the evaporative-emissions monitor seals the fuel-vapour system, watches the pressure and finds it will not hold. The threshold is set deliberately low, at roughly 0.020 inches, so the code catches openings far too small to hear, see or smell. Practically, that means the likely causes are small too: a cap that never clicked, a seal that has gone hard, or a hairline crack in a vapour line. The expensive components exist but they are rarely where this ends.",
    symptoms: [
      {
        key: "light-only",
        label: "Check-engine light and nothing else",
        response:
          "The normal presentation and exactly what you should expect. The EVAP system handles vapour rather than fuel delivery, so the engine behaves identically with this code stored.",
      },
      {
        key: "after-fuel",
        label: "Appeared within a day or two of filling up",
        response:
          "The cap is the one thing that changed, so it is the one thing to check. A cap not turned until it clicked, or with grit caught on its seal, causes a large share of these codes.",
      },
      {
        key: "emissions",
        label: "Rejected at an emissions test",
        response:
          "Expected — this is an emissions fault by definition, and a lit lamp fails inspection almost everywhere. Fix it, let the monitor complete, then return rather than paying for a second failed test.",
      },
      {
        key: "smell",
        label: "Occasional fuel smell near the car",
        response:
          "Worth following up even though the code describes a tiny leak. Something you can actually smell is usually bigger than the monitor threshold, so check the filler neck and the visible vapour lines.",
      },
      {
        key: "comes-goes",
        label: "Clears on its own, then returns weeks later",
        response:
          "Characteristic of a seal that only leaks at certain temperatures or fuel levels. Waiting for it to reappear wastes weeks — test deliberately with smoke instead.",
      },
      {
        key: "hard-start-fuel",
        label: "Brief hard start immediately after refuelling",
        response:
          "Suggests the purge valve is passing when it should be closed rather than a plain leak. Look for companion purge-circuit codes stored alongside.",
      },
    ],
    causes: [
      {
        cause: "Fuel cap not sealing",
        evidence:
          "Recently refuelled; cap does not click; seal cracked, glazed or contaminated with debris",
        firstTest:
          "Wipe the seal and filler neck, refit until it clicks, then allow the monitor several drive cycles",
      },
      {
        cause: "Cracked or hardened vapour hose",
        evidence:
          "Cracking at bends and clamps; smoke escapes from a line rather than a component",
        firstTest:
          "Smoke-test the sealed system and follow the smoke to the opening",
      },
      {
        cause: "Canister vent valve not sealing",
        evidence:
          "System will not hold vacuum with the vent commanded closed during a scan-tool test",
        firstTest:
          "Command the vent valve closed and watch whether the fuel-tank pressure sensor holds",
      },
      {
        cause: "Purge valve leaking through",
        evidence:
          "Valve passes when commanded closed; idle quality or trims disturbed alongside",
        firstTest:
          "Command the purge valve closed and confirm it actually seals",
      },
      {
        cause: "Filler neck or its sealing face",
        evidence:
          "Corrosion or damage around the neck; a sealing surface that no longer presents cleanly",
        firstTest:
          "Inspect the neck with a light before assuming the cap is the problem",
      },
      {
        cause: "Charcoal canister or its seals",
        evidence:
          "Smoke escapes around the canister body or fittings",
        firstTest:
          "Inspect the canister and connections once smoke testing has narrowed the area",
      },
    ],
    deepDive: [
      {
        heading: "What the monitor actually does",
        paragraphs: [
          "Understanding the test explains most of this code's odd behaviour, including why it seems to ignore your repair.",
          "The EVAP system exists to capture fuel vapour from the tank and feed it into the engine to be burned rather than released. To check that it is sealed, the PCM closes the vent valve, uses engine vacuum through the purge valve to draw the system down, then closes that too and watches the fuel-tank pressure sensor. A sealed system holds. A leaking one drifts back toward atmospheric, and the rate of that drift tells the PCM how big the opening is.",
          "The 0.020-inch threshold is the smallest leak the test can distinguish reliably. That is why P0456 is the small-leak code and why the usual causes are seals rather than components — anything larger would set P0442 or P0455 instead.",
        ],
      },
      {
        heading: "Why the light does not go out when you fix it",
        paragraphs: [
          "This causes more wasted money than the fault itself. The monitor does not run continuously. It needs the fuel level inside a specific range, an ambient temperature window, and a stretch of stable driving before it will test at all.",
          "So you tighten the cap, the light stays on, you conclude the cap was not the problem, and you pay for a diagnosis of something you have already repaired. Meanwhile the monitor simply has not run yet.",
          "Give it several days of ordinary driving with the tank somewhere around half full. Then, rather than watching the dashboard, check monitor readiness status on a scan tool. That tells you whether the test has actually run and what it concluded — which is the only information that settles it.",
        ],
      },
      {
        heading: "The EVAP code family, ranked by leak size",
        bullets: [
          "P0455 — gross leak. Missing cap, disconnected line, something you might find by looking",
          "P0442 — medium leak, sitting between the two extremes",
          "P0456 — very small leak, around 0.020 inches. Seals and hairline cracks",
          "P0446 — vent control circuit fault rather than a leak at all",
          "P1450 — the inverse: vacuum trapped in the tank because it cannot vent",
        ],
      },
      {
        heading: "Spending order that keeps the bill small",
        paragraphs: [
          "Cap first, because it is free to check and causes a meaningful share of these. Then a smoke test, because at this leak size nothing else reliably locates the opening and it costs less than one wrongly chosen component.",
          "Only then parts, and only the part the smoke actually pointed at. The failure mode people fall into is buying a purge valve, then a vent valve, then a canister, in ascending order of price, hoping one of them was it. That approach frequently costs more than the smoke test would have and still ends with the original leak in place.",
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
        title: "Check the cap under good light",
        detail:
          "Remove it, examine the rubber seal, wipe both the seal and the filler neck, and refit until it clicks. A seal that has gone hard and glossy has stopped sealing even though it looks intact.",
      },
      {
        title: "Wait for the monitor before concluding anything",
        detail:
          "Keep the tank around half full and drive normally for several days. The monitor needs its conditions before it will re-test, and judging by the dashboard before then is how people pay twice.",
      },
      {
        title: "Check monitor readiness on a scan tool",
        detail:
          "This is the number that matters. It tells you whether the EVAP test has actually run since you cleared the code, which the warning light alone cannot.",
      },
      {
        title: "Inspect the visible vapour lines",
        detail:
          "Work from the tank forward, concentrating on bends, clamps and anywhere a line runs near heat. Hardened plastic cracks where it flexes, and those cracks are visible once you know the pattern.",
      },
      {
        title: "Smoke-test the sealed system",
        detail:
          "At this leak size it is the only reliable way to find the opening. Around $75 to $150 at a shop, and cheaper than a single wrongly chosen part.",
      },
      {
        title: "Command the valves and watch the sensor",
        detail:
          "Close the vent, operate the purge, and see whether the system holds vacuum. A system that cannot hold with both commanded shut has a leak or a valve that is not sealing.",
      },
      {
        title: "Inspect the filler neck sealing face",
        detail:
          "A neck that is corroded or damaged will defeat even a brand-new cap. Check it before concluding the cap you just replaced was faulty too.",
      },
      {
        title: "Re-test before reassembling",
        detail:
          "Rubber across an EVAP system ages at the same rate, so finding one crack often means there is a second. Smoking again before you close up saves a repeat visit.",
      },
    ],
    costs: [
      {
        job: "Fuel cap replacement",
        parts: "About $20–$50",
        shop: "Parts plus minimal labour",
        diy: "Trivial",
        note: "Use a correct-specification cap; cheap generics cause repeat codes",
      },
      {
        job: "EVAP smoke test",
        parts: "$0",
        shop: "Roughly $75–$150",
        diy: "Needs a smoke machine",
        note: "Cheaper than one wrongly chosen component",
      },
      {
        job: "Vapour hose repair",
        parts: "About $100–$200",
        shop: "Parts plus access labour",
        diy: "Moderate",
        note: "Depends heavily on where in the system the crack sits",
      },
      {
        job: "Purge valve replacement",
        parts: "About $30–$75",
        shop: "Roughly $150–$400",
        diy: "Moderate — engine bay",
        note: "Confirm it fails to seal when commanded before replacing it",
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
        shop: "Get a quote for your model year",
        diy: "Advanced",
        note: "The expensive ending, and the reason smoke testing comes first",
      },
    ],
    dontReplace:
      "Do not work up the price list hoping to hit the fault. Buying a purge valve, then a vent valve, then a canister in ascending order of cost is a common and expensive way to end up with the original leak still there. Check the cap, then smoke-test, then replace only the part the smoke identified.",
    yearNotes: [
      "EVAP layout differs across Fusion generations. Confirm the arrangement for your model year before ordering any component.",
      "On the plug-in Energi models the fuel system and monitor conditions differ from the conventional car, so readiness can take longer to complete.",
      "If your Fusion has a capless filler, inspect the sealing flap and adapter rather than looking for a cap that is not there.",
      "Any recent fuel-system work introduces new sealing surfaces. If the code appeared after that kind of job, start where the work was done.",
    ],
    faqs: [
      {
        question: "What is P0456 actually testing?",
        answer:
          "The PCM seals the fuel-vapour system, draws it down with engine vacuum, then watches the tank pressure sensor. A sealed system holds; a leaking one drifts back toward atmospheric, and the rate tells the PCM the leak size.",
      },
      {
        question: "How small is a 0.020-inch leak?",
        answer:
          "About half a millimetre — a pinhole. It is the smallest opening the test can distinguish reliably, which is why the causes are seals rather than broken components.",
      },
      {
        question: "Why is the light still on after I tightened the cap?",
        answer:
          "Because the monitor has not run yet. It needs a specific fuel level, temperature window and stable driving before it will re-test. Give it several days and check readiness on a scan tool rather than watching the dashboard.",
      },
      {
        question: "Will P0456 fail an emissions test?",
        answer:
          "Yes. It is an emissions fault by definition, and an illuminated lamp fails inspection in most jurisdictions regardless of the code behind it.",
      },
      {
        question: "How much does it cost to fix P0456 on a Fusion?",
        answer:
          "From about $25 for a cap to several hundred for a canister. A $75–$150 smoke test is what determines which, and skipping it is how the bill grows.",
      },
      {
        question: "Is it safe to keep driving?",
        answer:
          "Mechanically, yes. The EVAP system handles vapour rather than fuel delivery, so the engine is unaffected. Repair it anyway — it is releasing fuel vapour and will not seal itself.",
      },
      {
        question: "What is the difference between P0456 and P0455?",
        answer:
          "Leak size only. P0455 is a gross leak — a missing cap or a line off its fitting. P0456 is the small threshold, which is why looking rarely finds it.",
      },
      {
        question: "Does the cap need to be a genuine part?",
        answer:
          "It needs to meet the correct specification and seal properly. Cheap generic caps are a recognised cause of repeat EVAP codes, so this is a poor place to economise.",
      },
    ],
    closing: {
      title: "Knowing when the repair is actually confirmed",
      paragraphs: [
        "The dashboard is the least useful indicator on this code. Because the monitor runs only under specific conditions, a dark warning light can mean the repair worked or simply that the test has not run yet — and those are very different situations.",
        "After the repair, clear the code, keep the tank near half full and drive normally for several days. Then read monitor readiness on a scan tool. Ready and passing is confirmation; still incomplete means keep driving rather than assuming anything.",
        "If the code returns after a genuine repair, smoke-test again before replacing another part. On an older car the rubber has all aged together, so a second small leak is more likely than a mistaken first diagnosis.",
      ],
    },
    sources: [fordObd2017, fordObd2024, fordManuals],
  },

  /* ------------------------------------------------------------------ P1450 */
  {
    slug: "ford/fusion/p1450",
    code: "P1450",
    title: "P1450 Code Ford Fusion: Fuel Tank Vacuum Causes & Fixes",
    description:
      "P1450 means your Fusion cannot bleed off fuel-tank vacuum. What traps it, the free test that proves it, and why the tank is at risk.",
    definition: "Unable to Bleed Up Fuel Tank Vacuum",
    severity: "Diagnose promptly",
    vehicle: fusionVehicle,
    driveAdvice:
      "The engine runs normally with this code, which is exactly why it gets postponed. The reason not to is the fuel tank: sustained vacuum can pull a plastic tank inward, and a tank replacement costs many times what the valve behind it would have. A hard start straight after refuelling is the other symptom worth acting on quickly.",
    quickAnswer:
      "P1450 is a Ford-specific code, and it describes plumbing rather than an engine fault. Fuel leaving the tank has to be replaced by air drawn in through the evaporative-emissions system. When that path is blocked — or when a purge valve stuck open lets the engine pull vacuum on the tank continuously — the vacuum builds and will not bleed off. Note carefully that this is the opposite of an EVAP leak code. Diagnosing it as though something is open, when in fact something is closed, is how people spend an afternoon looking for a hole that does not exist.",
    symptoms: [
      {
        key: "whoosh",
        label: "A loud rush of air when you open the fuel cap",
        response:
          "The most useful symptom on the page and free to check. That sound is atmospheric pressure equalising a tank that has been sitting under vacuum, and it confirms the code is describing something physical.",
      },
      {
        key: "hard-start",
        label: "Hard start immediately after filling up",
        response:
          "Points at a purge valve stuck open. Raw vapour is drawn into the intake while you fill, and the engine then has to fire on a mixture far too rich. If it only happens at the pump, start there.",
      },
      {
        key: "clickoff",
        label: "The pump keeps clicking off while refuelling",
        response:
          "A tank that cannot vent cannot accept fuel at full rate. Premature shut-off frequently accompanies this code and shares the same restriction.",
      },
      {
        key: "stall-low",
        label: "Hesitation or stalling with a low tank",
        response:
          "Severe trapped vacuum works against the fuel pump. If the car runs worse as the tank empties and noticeably better after you open the cap, the vent path is the prime suspect.",
      },
      {
        key: "deformed",
        label: "Visible deformation of the fuel tank",
        response:
          "The outcome this code exists to prevent. If you can see it, the repair now includes the tank, and it is worth establishing how long the car has been driven in this condition.",
      },
      {
        key: "light-only",
        label: "Just the warning light, nothing else noticeable",
        response:
          "Common when the restriction is partial. Vacuum builds slowly and you never feel it — which is precisely why the tank damage happens quietly and without warning.",
      },
    ],
    causes: [
      {
        cause: "Purge valve stuck open",
        evidence:
          "Hard start after refuelling; idle trims disturbed; engine vacuum reaching the tank continuously",
        firstTest:
          "Command the purge valve closed and confirm it seals rather than passing vacuum through",
      },
      {
        cause: "Canister vent valve stuck closed",
        evidence:
          "Vent does not open when commanded; tank vacuum does not relieve during a scan-tool test",
        firstTest:
          "Command the vent valve open and watch tank pressure move toward atmospheric",
      },
      {
        cause: "Blocked or pinched vent line",
        evidence:
          "Line kinked, crushed against structure, or obstructed with debris",
        firstTest:
          "Trace the vent path from canister to atmospheric inlet and confirm it is physically clear",
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
          "Sensor reports vacuum that opening the cap does not confirm; value unchanged when the seal is broken",
        firstTest:
          "Compare the live sensor value against what happens when you open the fuel cap",
      },
      {
        cause: "Filler neck or rollover valve restriction",
        evidence:
          "Poor fill rate with the vent valve confirmed working correctly",
        firstTest:
          "Inspect the filler neck and the tank's own venting hardware for obstruction",
      },
    ],
    deepDive: [
      {
        heading: "The purge valve explanation that catches people out",
        paragraphs: [
          "A purge valve stuck open sounds like it should cause a leak, not a vacuum problem. Working out why it causes the opposite is what makes this code make sense.",
          "The purge valve is the connection between the EVAP system and the intake manifold. Its job is to open at appropriate moments and let stored vapour be drawn into the engine and burned. The intake manifold is under vacuum whenever the engine is running.",
          "If that valve fails to close, the engine spends every minute of operation applying manifold vacuum to the fuel tank through the EVAP system. The vent side is not designed to supply air at that rate continuously, so vacuum accumulates faster than it can be relieved, and eventually the PCM reports it cannot bleed it off.",
          "The same failure explains the hard-start-after-refuelling complaint. While you are filling, the tank is full of vapour, and a purge valve that will not close feeds that vapour straight into an intake on an engine you are about to start. The mixture is far too rich to fire cleanly.",
        ],
      },
      {
        heading: "Why the tank matters more than the code",
        paragraphs: [
          "The engine runs normally, so the practical temptation is to leave it. What that overlooks is that a plastic fuel tank held under sustained vacuum deforms — slowly, invisibly and permanently.",
          "That converts the economics of the repair entirely. Caught early, this is a purge valve or a vent valve, both commonly under $75 in parts. Caught late, it is those parts plus a fuel tank.",
          "Nothing about the driving experience tells you which stage you are at, which is the whole argument for acting on the code rather than on the symptoms.",
        ],
      },
      {
        heading: "Blockage codes versus leak codes",
        bullets: [
          "P1450 — air cannot get in. Something closed or blocked that should be open",
          "P0456, P0455, P0442 — vapour escaping. Something open that should be sealed",
          "P0446 — vent control circuit fault, often stored alongside P1450 and frequently naming the part",
          "Both types together usually mean the EVAP system as a whole has aged rather than one part failing",
          "Smoke testing finds leaks; it does not find blockages, so it is the wrong first tool for this code",
        ],
      },
      {
        heading: "The order that answers it fastest",
        paragraphs: [
          "Start with the cap test, because it costs nothing and immediately splits the diagnosis. A strong rush of air inward means the vacuum is genuine and you are looking for a blockage or a stuck-open purge valve. Silence, with the code still setting, moves the fuel-tank pressure sensor and its wiring up the list considerably.",
          "Then command both valves with a scan tool while watching the tank pressure sensor. Between the purge valve and the vent valve you have covered the two most common causes, and the sensor trace tells you which one is not doing its job.",
        ],
      },
    ],
    freezeFrame: [
      "Fuel-tank pressure sensor value when the code set, showing how much vacuum was present",
      "Fuel level, since a nearly empty tank builds vacuum faster than a full one",
      "Ambient temperature, because cooling fuel contracts and adds vacuum on its own",
      "Engine run time before the fault, separating gradual build-up from an immediate problem",
      "Companion EVAP codes such as vent or purge circuit faults, which often name the part",
      "Vehicle speed at the time, which can indicate whether motion or debris is involved",
    ],
    steps: [
      {
        title: "Drive it, then open the cap and listen",
        detail:
          "Twenty minutes of driving, then open the cap slowly. A strong rush of air inward confirms trapped vacuum before any equipment is connected, and it takes half a minute.",
      },
      {
        title: "Watch the tank pressure sensor with the cap on and off",
        detail:
          "A sensor that does not move when you break the seal is either reading incorrectly or not seeing the tank. That single comparison redirects the whole diagnosis.",
      },
      {
        title: "Command the purge valve closed",
        detail:
          "Confirm it seals rather than passing manifold vacuum toward the tank. It sits in the engine bay with reasonable access, and it is one of the two most common causes.",
      },
      {
        title: "Command the vent valve open",
        detail:
          "Tank pressure should move toward atmospheric. A vent that will not open is the other common cause, and this test identifies it within seconds.",
      },
      {
        title: "Trace the vent path physically",
        detail:
          "Follow the line from the canister to where it draws air, checking for kinks, crushing and debris. A blockage will not show up on any electrical test.",
      },
      {
        title: "Check the canister for fuel saturation",
        detail:
          "Repeated topping-off past the pump's first click forces liquid fuel into the charcoal canister, restricting airflow through it with every valve working correctly.",
      },
      {
        title: "Inspect the tank for deformation",
        detail:
          "Before you finish, look at the tank itself. Finding damage now is better than discovering it after paying for a valve and reassembling everything.",
      },
      {
        title: "Repeat the cap test after the repair",
        detail:
          "Drive, then open the cap again. Silence is the result you want, and it is available immediately — unlike the code, which will not clear until the monitor next runs.",
      },
    ],
    costs: [
      {
        job: "Cap listen test",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Trivial",
        note: "Confirms whether the trapped vacuum is real before anything is bought",
      },
      {
        job: "Purge valve replacement",
        parts: "About $30–$75",
        shop: "Roughly $150–$400",
        diy: "Easy to moderate — engine bay",
        note: "One of the two most common causes, and the one behind hard starts after refuelling",
      },
      {
        job: "Canister vent valve",
        parts: "About $30–$75",
        shop: "Varies with location by model year",
        diy: "Moderate",
        note: "The other common cause; access is the main variable",
      },
      {
        job: "Vent line clearing or repair",
        parts: "Low",
        shop: "Mostly labour to trace and access",
        diy: "Moderate",
        note: "Often just clearing an obstruction rather than replacing anything",
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
        note: "The outcome that acting promptly is meant to avoid entirely",
      },
    ],
    dontReplace:
      "Do not replace the fuel-tank pressure sensor because the code mentions tank vacuum. In most cases the sensor is accurately reporting a real physical condition. Prove it is lying first — compare its reading against what actually happens when you open the cap. Otherwise you will fit a new sensor and still have a purge valve holding vacuum on your tank.",
    yearNotes: [
      "P1450 is a Ford manufacturer-specific code, so generic code lists frequently describe it incorrectly or confuse it with a leak.",
      "EVAP component locations differ across Fusion generations. Confirm where your vent valve and canister sit before spending time looking in the wrong place.",
      "Repeated overfilling past the pump's first click pushes liquid fuel into the charcoal canister, restricting the vent path with no component being defective.",
      "On the Energi plug-in models the fuel system differs from the conventional car, so allow more time for verification after a repair.",
    ],
    faqs: [
      {
        question: "What does P1450 mean on a Ford Fusion?",
        answer:
          "That vacuum built up in the fuel tank and the PCM could not relieve it. Air should enter the tank through the EVAP system as fuel is used, and something is preventing that.",
      },
      {
        question: "Why does my fuel cap hiss loudly when I open it?",
        answer:
          "Because the tank is under vacuum that could not bleed off. That inrush of air is the clearest symptom of this code and confirms it before any equipment is connected.",
      },
      {
        question: "Why does a stuck-open purge valve cause a vacuum code?",
        answer:
          "Because the purge valve connects the EVAP system to the intake manifold, which is under vacuum whenever the engine runs. A valve that will not close applies that vacuum to the tank continuously.",
      },
      {
        question: "Can P1450 damage my fuel tank?",
        answer:
          "Yes, and that is the main reason to act promptly. Sustained vacuum deforms a plastic tank permanently, turning a valve repair into a tank replacement.",
      },
      {
        question: "How much does it cost to fix P1450 on a Fusion?",
        answer:
          "Usually $150 to $500. The purge valve and vent valve are the common parts and both are typically under $75 before labour.",
      },
      {
        question: "Why does my Fusion crank so long after filling up?",
        answer:
          "That points at the purge valve. While you fill, the tank is full of vapour, and a valve that will not close feeds it straight into the intake — leaving the engine to start on a mixture far too rich.",
      },
      {
        question: "Is P1450 the same as an EVAP leak?",
        answer:
          "No, it is the inverse. Leak codes mean vapour is escaping. P1450 means air cannot get in. Smoke testing finds leaks and will not find this.",
      },
      {
        question: "Can I keep driving with P1450?",
        answer:
          "Short-term, yes — the engine runs normally. But the trapped vacuum is working on the tank the entire time, so treat it as this week's job rather than next quarter's.",
      },
    ],
    closing: {
      title: "What a complete P1450 repair looks like",
      paragraphs: [
        "A finished job here covers two things: the restriction itself, and any damage the trapped vacuum caused while nobody was watching. Fixing the valve and leaving a deformed tank in place simply defers the second half.",
        "After the repair, drive normally and then open the fuel cap. Silence is what you want, and it is available immediately — which makes it a far better verification than the code, since that will not clear until the monitor next runs.",
        "Then confirm the EVAP monitor runs and passes without setting P1450 or a companion code. Because that monitor needs specific fuel-level and temperature conditions, give it several days of ordinary driving before calling the job done.",
      ],
    },
    sources: [fordObd2017, fordObd2024, fordManuals],
  },
];
