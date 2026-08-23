import type { TroubleCodeGuide } from "./trouble-code-data";
import { fordManuals, fordObd2017, fordObd2024 } from "./trouble-code-sources";
import {
  coyoteOilTsb,
  lemonLaw23,
  mustangVehicle,
  slashgearCoyoteOil,
  slashgearCoyoteProblems,
} from "./trouble-code-mustang";

/** Mustang fuel, catalyst, cooling and readiness codes. */
export const troubleCodeMustangB: TroubleCodeGuide[] = [
  /* ------------------------------------------------------------------ P0171 */
  {
    slug: "ford/mustang/p0171",
    code: "P0171",
    title: "P0171 Code Ford Mustang: Causes & Fixes by Engine",
    description:
      "P0171 on a Ford Mustang. Which side is Bank 1 on the Coyote, why modified cars set it, and what the repair actually costs.",
    definition: "System Too Lean (Bank 1)",
    severity: "Diagnose promptly",
    vehicle: mustangVehicle,
    driveAdvice:
      "You can keep driving a Mustang with P0171 if it still runs smoothly, but do not treat it as permanent. A lean mixture burns hotter than designed, and on a car that sees sustained high-load running that extra heat has less margin to absorb. Stop if the light flashes, if you feel misfire, or before any track session.",
    quickAnswer:
      "P0171 means your Mustang's PCM added as much fuel as its calibration allows trying to correct a lean reading on Bank 1, then ran out of adjustment. On the 5.0L Coyote V8, Bank 1 is the passenger-side bank containing cylinders 1 to 4 — and because there is a Bank 2, you get a comparison that four-cylinder owners do not. On the 2.3L EcoBoost there is one bank, so Bank 1 is the whole engine. The Mustang-specific consideration on either: this car is modified more often than almost anything else Ford builds, and intake, exhaust and calibration changes all move what the PCM expects to see.",
    symptoms: [
      {
        key: "rough-idle",
        label: "Rough idle that improves as revs rise",
        response:
          "Classic vacuum-leak behaviour. At idle the leak is a large proportion of total airflow; open the throttle and it becomes a small fraction of a much bigger flow.",
      },
      {
        key: "one-bank",
        label: "P0171 without P0174",
        response:
          "Useful on the V8. A lean condition confined to Bank 1 sits in Bank 1 hardware — a gasket, a hose or an exhaust leak on the passenger side. Both banks lean points upstream instead.",
      },
      {
        key: "both-banks",
        label: "P0171 and P0174 together",
        response:
          "Both banks lean means the cause sits before the split — the MAF sensor, the intake duct, the PCV system or fuel supply. A single gasket cannot affect both cylinder heads equally.",
      },
      {
        key: "modified",
        label: "Cold air intake, headers or a tune fitted",
        response:
          "Highly relevant. An intake that changes airflow characteristics past the MAF, or headers that relocate oxygen sensors, both change what the PCM measures. Mention it before diagnosis begins.",
      },
      {
        key: "hesitation",
        label: "Hesitation under boost on a 2.3L",
        response:
          "Check the charge-air plumbing. A cracked or loose charge pipe leaks air the MAF has already counted, and that only happens under positive pressure — an idle test will miss it entirely.",
      },
      {
        key: "cold-worse",
        label: "Worse when cold, better once warm",
        response:
          "Rubber and plastic shrink when cold, so a hose or gasket that seals at operating temperature can open a gap on a cold morning. Inspect while the engine is cold.",
      },
    ],
    causes: [
      {
        cause: "Vacuum or PCV hose leak",
        evidence:
          "Rough idle smoothing under load; positive long-term fuel trim highest at idle; cracked aged rubber",
        firstTest:
          "Smoke-test the intake system rather than hunting hoses that seal until pressurised",
      },
      {
        cause: "Aftermarket intake or MAF calibration mismatch",
        evidence:
          "Cold air intake fitted without matching calibration; airflow reading implausible for the engine",
        firstTest:
          "Compare MAF reading against expected airflow, and return to stock intake and calibration if fitted",
      },
      {
        cause: "Dirty or contaminated MAF sensor",
        evidence:
          "Both banks affected; airflow reading lower than expected; oily film on the element",
        firstTest:
          "Remove and inspect the sensor, then clean with MAF-specific cleaner only",
      },
      {
        cause: "Exhaust leak ahead of the Bank 1 sensor",
        evidence:
          "Ticking that changes with rpm; leak at a manifold, header flange or gasket upstream of the sensor",
        firstTest:
          "Inspect the Bank 1 exhaust from the head to the upstream sensor — check header work particularly",
      },
      {
        cause: "Charge-air leak (2.3L EcoBoost)",
        evidence:
          "Hesitation under boost; oily residue at a joint; worse under load rather than at idle",
        firstTest:
          "Pressure-test the charge-air system, since a boost leak stays invisible at idle",
      },
      {
        cause: "Fuel supply falling short",
        evidence:
          "Trim correction worst under sustained load; fuel pressure dropping when demand is high",
        firstTest:
          "Log commanded against actual fuel pressure through the load that produces the fault",
      },
    ],
    deepDive: [
      {
        heading: "Bank 1 on the Coyote, and what the comparison tells you",
        paragraphs: [
          "On the 5.0L Coyote V8, Bank 1 is the passenger-side bank and holds cylinders 1 to 4. Bank 2 is the driver's side with cylinders 5 to 8. That matters because it hands you a diagnostic tool an inline-four owner does not have.",
          "If Bank 1 fuel trim is strongly positive while Bank 2 sits near zero, the fault is physically on the passenger side — a gasket, a hose, or an exhaust leak on that bank. Half the engine bay is eliminated before you pick up a tool.",
          "If both banks correct positive together, the cause is upstream of where they split: the MAF sensor, the intake duct, the PCV system or fuel supply. In that case P0174 usually stores alongside P0171, and looking for a bank-specific leak wastes the afternoon.",
          "On the 2.3L EcoBoost there is only one bank, so that shortcut is gone. Read trim at idle and then at cruise instead — worst at idle points at a vacuum leak, worst under load points at fuel delivery or a charge-air leak.",
        ],
      },
      {
        heading: "Modified Mustangs and lean codes",
        paragraphs: [
          "More Mustangs are modified than almost anything else Ford sells, and three of the most common modifications interact directly with this code.",
          "A cold air intake changes the shape and diameter of the tube the MAF sits in, which changes how airflow behaves across the sensing element. Fitted without a matching calibration, the MAF misreports and the mixture goes with it. That is not a fault in any component — it is a mismatch, and no amount of parts replacement resolves it.",
          "Long-tube headers move the oxygen sensors further from the head and change exhaust scavenging. Both alter what the PCM sees, and header flanges are also a common place for the exhaust leaks that make a sensor read lean when the mixture is correct.",
          "And a tune changes the fuelling targets outright. If your car has any of this, the honest first step is returning to stock hardware and calibration to establish a baseline. It is not a judgement on the modifications; it is the only way to know whether there is a fault at all.",
        ],
      },
      {
        heading: "Why the oxygen sensor is not the answer",
        bullets: [
          "The sensor is reporting extra oxygen in the exhaust — that is exactly its job",
          "Replacing it changes the messenger, not the message",
          "The unmetered air or fuel shortfall is still there afterwards",
          "An exhaust leak upstream of it makes a perfect sensor read lean",
          "Clean the MAF, smoke-test the intake and check the exhaust before considering a sensor",
        ],
      },
    ],
    freezeFrame: [
      "Short and long-term fuel trim on both banks where available — the fastest narrowing tool on the V8",
      "Whether correction is worst at idle or under load, separating vacuum leaks from fuel supply",
      "Mass airflow reading against engine speed and load, which exposes a MAF mismatch",
      "Engine coolant temperature, separating a cold-only leak from one present when warm",
      "Any companion codes — P0174, misfire codes or MAF performance codes change the order",
      "Fuel rail pressure, commanded against actual, where reported",
    ],
    steps: [
      {
        title: "Declare modifications before anything else",
        detail:
          "Intake, headers, exhaust or a tune all change what the PCM expects. Establishing a stock baseline is the only way to know whether there is a genuine fault to find.",
      },
      {
        title: "Compare Bank 1 and Bank 2 trims on the V8",
        detail:
          "One bank positive with the other normal means a bank-specific fault. Both positive points upstream. This single reading eliminates half the engine bay or redirects you entirely.",
      },
      {
        title: "Read trims at idle and at cruise",
        detail:
          "Essential on the 2.3L where there is no second bank. Worst at idle points at a vacuum leak; worst under load points at fuel supply or a charge-air leak.",
      },
      {
        title: "Inspect and clean the MAF sensor",
        detail:
          "Use MAF-specific cleaner only, never touch the element, and let it dry fully. If an aftermarket intake is fitted, also check whether the calibration was ever matched to it.",
      },
      {
        title: "Smoke-test the intake system",
        detail:
          "Watch the manifold gasket line, hose junctions, the intake duct and the throttle body seal. This is what finds leaks that hold at rest and open when the engine breathes.",
      },
      {
        title: "Inspect the exhaust ahead of the sensor",
        detail:
          "A leak upstream lets outside air reach the sensor, which then reports lean with a correct mixture. Check header flanges particularly on a car with aftermarket headers.",
      },
      {
        title: "Pressure-test charge-air on the 2.3L",
        detail:
          "A leak between turbo and throttle body only opens under boost. If the smoke test was clean on a turbocharged car, this is the next step rather than a parts order.",
      },
      {
        title: "Verify with trims rather than the dashboard",
        detail:
          "After the repair, bring the engine to full temperature and confirm long-term trim has returned near zero on both banks, at idle and under load.",
      },
    ],
    costs: [
      {
        job: "MAF sensor cleaning",
        parts: "About $15 for cleaner",
        shop: "Often inside a diagnostic fee",
        diy: "Easy — 15 minutes",
        note: "Cheapest possible fix and worth doing first",
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
        job: "Exhaust or header gasket",
        parts: "Low",
        shop: "Varies with header design and corrosion",
        diy: "Moderate",
        note: "A common cause on cars with aftermarket headers",
      },
      {
        job: "Returning to stock intake and calibration",
        parts: "Varies",
        shop: "Dealer or tuner",
        diy: "Depends on the setup",
        note: "A diagnostic step where modifications are involved",
      },
      {
        job: "Charge-air pipe or clamp (2.3L)",
        parts: "Low to moderate",
        shop: "Mostly labour to access",
        diy: "Moderate",
        note: "Often a loose clamp or split coupler rather than a whole pipe",
      },
    ],
    dontReplace:
      "Do not buy an oxygen sensor because the code says lean. The sensor is accurately reporting extra oxygen — that is its function. And on a modified Mustang, do not let anyone diagnose against factory expectations without knowing what has been fitted. An intake without a matching calibration will produce this code indefinitely, and no replacement part will resolve a mismatch.",
    yearNotes: [
      "On the 5.0L Coyote V8, Bank 1 is the passenger-side bank containing cylinders 1 to 4. Bank 2 is the driver's side with cylinders 5 to 8.",
      "On the 2.3L EcoBoost there is a single bank, so Bank 1 is the whole engine and there is no second bank to compare against.",
      "Aftermarket intakes fitted without a matching calibration are a recognised cause of lean codes on this platform, because the MAF sensing environment changes.",
      "Long-tube headers relocate the oxygen sensors and introduce new flange joints, both of which can produce or mimic a lean condition.",
    ],
    faqs: [
      {
        question: "Which side is Bank 1 on a Mustang GT?",
        answer:
          "The passenger side, containing cylinders 1 to 4 on the 5.0L Coyote. Bank 2 is the driver's side with cylinders 5 to 8.",
      },
      {
        question: "What does P0171 with P0174 mean?",
        answer:
          "Both banks are lean, which points upstream of the split — the MAF sensor, the intake duct, the PCV system or fuel supply. A single gasket cannot make both banks lean equally.",
      },
      {
        question: "Can a cold air intake cause P0171?",
        answer:
          "Yes, if it was fitted without a matching calibration. Changing the tube around the MAF changes how airflow behaves across the sensing element, and the PCM fuels for a reading that no longer reflects reality.",
      },
      {
        question: "Can headers cause a lean code?",
        answer:
          "They can, in two ways. They relocate the oxygen sensors, and their flanges introduce new joints where an exhaust leak can let outside air reach a sensor that then reports lean.",
      },
      {
        question: "Do I need a new oxygen sensor?",
        answer:
          "Almost never for this code. The sensor is reporting accurately. Clean the MAF, smoke-test the intake and check the exhaust for leaks first.",
      },
      {
        question: "Can I track the car with P0171?",
        answer:
          "Not advisable. A lean mixture burns hotter than designed, and a track session is exactly when the cooling and exhaust systems have least margin to spare.",
      },
      {
        question: "How much does it cost to fix P0171 on a Mustang?",
        answer:
          "From about $15 for MAF cleaner to several hundred for a gasket or exhaust repair. A $75–$150 smoke test is what determines which end of that range you are in.",
      },
      {
        question: "Why is my idle rough but driving is fine?",
        answer:
          "That pattern strongly suggests a vacuum leak. At idle the leak is a large share of total airflow; open the throttle and it becomes a small share of a much larger flow.",
      },
    ],
    closing: {
      title: "Confirming the repair with fuel trim, not the warning light",
      paragraphs: [
        "This is a code you verify with data. The fault is a gradual mixture error rather than a hard failure, so a lamp staying off for a day proves very little.",
        "Bring the engine to full operating temperature and watch long-term fuel trim on both banks, at idle and then at a steady cruise. All readings should sit near zero. A bank corrected at idle but still positive under load usually means you found one leak and left another.",
        "If the car is modified and you removed the modifications to diagnose it, refit them one at a time and re-check trims after each. That is slower, but it is the only way to find out which change was causing the problem rather than guessing.",
      ],
    },
    sources: [fordObd2017, fordObd2024, slashgearCoyoteProblems, fordManuals],
  },

  /* ------------------------------------------------------------------ P0420 */
  {
    slug: "ford/mustang/p0420",
    code: "P0420",
    title: "P0420 Code Ford Mustang: Catalyst Causes & Real Fixes",
    description:
      "P0420 on a Ford Mustang. Why oil consumption and track heat kill converters here, and what to check before buying one.",
    definition: "Catalyst System Efficiency Below Threshold (Bank 1)",
    severity: "Service soon",
    vehicle: mustangVehicle,
    driveAdvice:
      "A steady P0420 alone is not urgent, but the cause behind it may be. If misfire, oil consumption or a rich mixture is feeding the exhaust, a replacement converter will go the same way. Stop if the lamp flashes, if power falls away, or if you can smell an overheating converter — and postpone track sessions until it is diagnosed.",
    quickAnswer:
      "P0420 means the catalyst monitor tested Bank 1's converter and found oxygen storage below threshold. On a Mustang there are two causes worth putting ahead of the usual list. The 2018–2020 Gen 3 Coyote has a documented oil-consumption condition, and oil reaching the exhaust coats a converter's precious-metal surface permanently. And these cars get driven hard — sustained high load puts converters closer to their thermal limit than the same part in a commuter car ever sees. Neither is fixed by fitting another converter.",
    symptoms: [
      {
        key: "light-only",
        label: "Light on, car drives perfectly",
        response:
          "The usual presentation. The catalyst monitor is an emissions test rather than a drivability one, so nothing changes in how the car feels.",
      },
      {
        key: "oil-use",
        label: "Using oil between changes",
        response:
          "On a 2018–2020 Coyote this is the first thing to quantify. Oil reaching the exhaust coats the converter's catalyst surface, and no amount of replacement parts fixes an engine still sending oil down there.",
      },
      {
        key: "misfire",
        label: "Misfire codes stored now or recently",
        response:
          "That is your real job. Misfire pushes unburned fuel into the exhaust, where it ignites and takes the converter far beyond design temperature. Repair the misfire, then reassess the converter.",
      },
      {
        key: "track",
        label: "Appeared after track use",
        response:
          "Sustained high load runs converters at the top of their thermal range. A converter already weakened by oil, fuel or age will often fail its monitor first after a hard session.",
      },
      {
        key: "modified",
        label: "Aftermarket exhaust or headers fitted",
        response:
          "Relevant on two counts. High-flow or off-road catted parts may not meet the monitor's expectations, and header flanges introduce leak points that distort what the sensors see.",
      },
      {
        key: "emissions",
        label: "Failed an emissions inspection",
        response:
          "Expected with this code. Repair the upstream cause, then let the monitor run and pass before returning rather than paying for a second failed test.",
      },
    ],
    causes: [
      {
        cause: "Oil consumption contaminating the converter",
        evidence:
          "Oil level dropping with no external leak; documented on 2018–2020 Gen 3 Coyote engines",
        firstTest:
          "Measure oil consumption over a known distance before considering a converter",
      },
      {
        cause: "Misfire damaging the converter",
        evidence:
          "Misfire codes stored now or in the history; rough running; unburned fuel reaching the exhaust",
        firstTest:
          "Read all stored and pending codes and repair any misfire first",
      },
      {
        cause: "Aftermarket exhaust or high-flow catalyst",
        evidence:
          "Non-standard exhaust fitted; monitor fails despite no other symptom",
        firstTest:
          "Establish what is actually fitted before assuming a factory part has failed",
      },
      {
        cause: "Exhaust leak between the sensors",
        evidence:
          "Ticking that changes with rpm; leak at a header flange or gasket upstream of the downstream sensor",
        firstTest:
          "Inspect the Bank 1 exhaust from the head to the downstream sensor",
      },
      {
        cause: "Oxygen sensor performance or bias",
        evidence:
          "Downstream sensor mirrors the upstream too closely; slow switching; sensor codes stored",
        firstTest:
          "Graph both Bank 1 sensors and compare their behaviour",
      },
      {
        cause: "Genuinely failed converter",
        evidence:
          "All of the above eliminated; high mileage, heavy track use or physical damage",
        firstTest:
          "Only after the causes above are ruled out by testing rather than assumption",
      },
    ],
    deepDive: [
      {
        heading: "Oil consumption is the Mustang-specific cause",
        paragraphs: [
          "A catalytic converter is a ceramic honeycomb coated in platinum, palladium and rhodium. Exhaust gas passes through and the coating drives the reactions that clean it. There is nothing to wear out mechanically — which is why an early failure almost always means something poisoned or cooked it.",
          "Oil is one of the poisons. It coats the precious-metal surface and stops the reactions happening, and the damage does not reverse. On 2018–2020 Gen 3 Coyote engines, Ford documented consumption exceeding a quart every 3,000 miles with no visible external leak, associated with internal vacuum during deceleration and with piston ring sealing.",
          "Put those two facts together and the conclusion is uncomfortable but clear: on an affected car, fitting a new converter without addressing the oil consumption buys you a second converter on the same schedule as the first. Measure the consumption rate before authorising anything.",
        ],
      },
      {
        heading: "Why track cars fail this monitor first",
        paragraphs: [
          "Converters have a working temperature range, and sustained high load sits near the top of it. A car doing school runs rarely approaches that; a car doing twenty-minute track sessions approaches it repeatedly.",
          "That does not mean track use destroys converters on its own — a healthy engine with correct fuelling can be driven hard indefinitely. What it means is that any existing weakness shows up sooner. A converter already degraded by oil contamination, a mixture running slightly rich, or simply age, will fail its monitor after a hard weekend rather than gradually over a year.",
          "So a P0420 that appears right after track use is not necessarily caused by the track use. More often the session revealed a condition that was already developing, and the useful question is what that condition is.",
        ],
      },
      {
        heading: "Modified exhausts and this code",
        bullets: [
          "High-flow catalysts may not store enough oxygen to satisfy the factory monitor",
          "Off-road or catless pipes will fail it by definition",
          "Header flanges add joints where a leak distorts the sensor comparison",
          "Relocated sensors change the readings the monitor is calibrated around",
          "None of this is a fault to diagnose — it is a configuration to account for",
          "Be straightforward with any shop about what is fitted; it saves everyone time",
        ],
      },
      {
        heading: "What to establish before buying a converter",
        paragraphs: [
          "The monitor compares upstream and downstream oxygen sensors. A healthy converter smooths the downstream signal; when the downstream sensor starts mirroring the upstream one closely, the PCM concludes storage has fallen below threshold.",
          "That means anything disturbing either sensor can fail the test with a good converter fitted. An exhaust leak between them admits outside air. A lazy downstream sensor produces the same picture. Both cost a fraction of a converter.",
          "So the checklist before you spend: oil consumption rate measured, no misfire in the stored or pending history, fuel trims near zero at idle and load, no exhaust leak between the sensors, and downstream sensor waveforms confirmed healthy. If all of that is clean and the monitor still fails, the converter has genuinely earned its replacement.",
        ],
      },
    ],
    freezeFrame: [
      "Upstream and downstream Bank 1 oxygen sensor activity when the monitor ran",
      "Short and long-term fuel trim, which reveal a mixture fault damaging the converter",
      "Engine coolant temperature and run time, confirming the monitor ran under valid conditions",
      "Vehicle speed and load, since the catalyst monitor needs sustained steady operation",
      "Any companion codes — misfire, lean, rich or P0430 redirect the diagnosis",
      "Whether the code is current or historic, and drive cycles since it set",
    ],
    steps: [
      {
        title: "Measure oil consumption on a Gen 3 Coyote",
        detail:
          "Over a known distance rather than by impression. On a 2018–2020 car this is the most likely upstream cause, and the measurement is also the evidence any warranty conversation needs.",
      },
      {
        title: "Read every stored and pending code",
        detail:
          "A misfire alongside P0420 is very likely the cause rather than a coincidence. Repair it first and reassess the converter afterwards.",
      },
      {
        title: "Establish what exhaust is actually fitted",
        detail:
          "High-flow or off-road catalysts, relocated sensors and aftermarket headers all change what the monitor sees. This is configuration rather than fault, and it needs to be known before diagnosis.",
      },
      {
        title: "Read fuel trims at idle and under load",
        detail:
          "Trims well away from zero mean the mixture is wrong, and a converter cannot do its job on a mixture it was not designed for.",
      },
      {
        title: "Inspect the Bank 1 exhaust for leaks",
        detail:
          "From the head through to the downstream sensor, with particular attention to header flanges. A leak between the sensors can fail the monitor with a healthy converter.",
      },
      {
        title: "Graph both Bank 1 oxygen sensors",
        detail:
          "Watch the upstream sensor swinging and the downstream one responding. A downstream sensor mirroring the upstream too closely is the evidence — but a lazy sensor looks identical for far less money.",
      },
      {
        title: "Only then evaluate the converter",
        detail:
          "With oil consumption, misfire, mixture, leaks and sensors all eliminated, a converter that still fails has genuinely earned replacement — and the conclusion is now supported by evidence.",
      },
      {
        title: "Complete the drive cycle after repair",
        detail:
          "The catalyst monitor needs sustained steady driving before it runs again. Do not judge the repair, or return for testing, until it has completed.",
      },
    ],
    tsbs: [coyoteOilTsb],
    costs: [
      {
        job: "Oil consumption measurement",
        parts: "Cost of oil",
        shop: "Documented test over set mileage",
        diy: "Easy but takes weeks",
        note: "The most important early step on a 2018–2020 Coyote",
      },
      {
        job: "Full code scan and fuel-trim read",
        parts: "$0",
        shop: "Standard diagnostic fee",
        diy: "Easy with a live-data tool",
        note: "Finds the upstream cause that killed the converter",
      },
      {
        job: "Exhaust or header gasket repair",
        parts: "Low",
        shop: "Varies with header design",
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
      "Do not buy a converter on the strength of this code alone. A ceramic honeycomb with no moving parts does not wear out — it gets cooked by misfire or poisoned by oil. On a 2018–2020 Coyote, measure the oil consumption first: if the engine is sending oil down the exhaust, a new converter is a consumable rather than a repair.",
    yearNotes: [
      "2018–2020 Gen 3 Coyote engines are covered by a Ford bulletin describing oil consumption over a quart per 3,000 miles with no external leak — and oil contaminates converters permanently.",
      "Sustained track use runs converters near the top of their thermal range, which tends to reveal existing weakness rather than create it.",
      "High-flow or off-road catalysts and relocated oxygen sensors change what the monitor measures. That is configuration rather than a fault, but it needs to be known.",
      "Federal and California emissions applications may require different converters. Confirm which your car is certified to before ordering.",
    ],
    faqs: [
      {
        question: "What does P0420 mean on a Ford Mustang?",
        answer:
          "That the catalyst monitor measured Bank 1's converter oxygen-storage performance and found it below threshold. It is a test result, not proof the converter failed first.",
      },
      {
        question: "Can oil consumption kill a catalytic converter?",
        answer:
          "Yes, and this is the Mustang-specific angle. Oil coats the precious-metal surface and stops the reactions happening. On a 2018–2020 Coyote with documented consumption, that is a live possibility.",
      },
      {
        question: "Did track driving cause this?",
        answer:
          "Usually it revealed rather than caused it. Sustained load runs converters near their thermal limit, so an already-weakened one fails its monitor after a hard session rather than gradually.",
      },
      {
        question: "Do I need a new converter?",
        answer:
          "Not necessarily, and not first. Misfire, oil consumption, a wrong mixture, an exhaust leak and a lazy sensor can all fail this test with a good converter fitted.",
      },
      {
        question: "Will an aftermarket exhaust set P0420?",
        answer:
          "It can. High-flow catalysts may not store enough oxygen to satisfy the factory monitor, and off-road pipes will fail it by definition. That is configuration rather than a fault.",
      },
      {
        question: "Why did my new converter fail again?",
        answer:
          "Because whatever destroyed the first one was never fixed. Oil consumption in particular will consume a replacement on exactly the same schedule.",
      },
      {
        question: "Can I drive with P0420?",
        answer:
          "A steady code alone is not urgent. If it comes with misfire or oil consumption, driving on is actively degrading the converter — and track sessions should wait.",
      },
      {
        question: "What is actually inside a converter?",
        answer:
          "A ceramic honeycomb coated with platinum, palladium and rhodium. No moving parts, which is why early failure points at something upstream rather than at the converter itself.",
      },
    ],
    closing: {
      title: "Closing out a P0420 properly",
      paragraphs: [
        "The measure of a good repair here is not that the light went out. It is whether someone can tell you what killed the converter.",
        "After repairing the upstream cause, complete the drive cycle and confirm the catalyst monitor runs and passes rather than noting the lamp is off. That monitor needs sustained steady conditions, so it takes more than a short trip.",
        "If oil consumption was the cause, keep measuring it after the repair. A converter fitted to an engine still consuming oil is on a countdown, and knowing the rate tells you whether the underlying work actually resolved anything.",
      ],
    },
    sources: [fordObd2017, fordObd2024, slashgearCoyoteOil, fordManuals],
  },

  /* ------------------------------------------------------------------ P2196 */
  {
    slug: "ford/mustang/p2196",
    code: "P2196",
    title: "P2196 Code Ford Mustang: O2 Sensor Stuck Rich Diagnosis",
    description:
      "P2196 on a Ford Mustang. Using Bank 2 as a control group, why oil consumption fouls sensors, and what a tune changes.",
    definition: "O2 Sensor Signal Biased/Stuck Rich (Bank 1, Sensor 1)",
    severity: "Diagnose promptly",
    vehicle: mustangVehicle,
    driveAdvice:
      "The car will usually drive, but fuel control on Bank 1 is compromised. A genuinely rich mixture wastes fuel, dilutes engine oil and overheats catalytic converters. Get it diagnosed before it becomes a converter bill, and stop if the engine misfires or the lamp begins flashing.",
    quickAnswer:
      "P2196 means the upstream oxygen sensor on Bank 1 is reporting rich and staying there instead of switching. Two possibilities and the whole diagnosis is separating them: the engine really is rich and the sensor is honest, or the sensor has failed in a way that reports rich regardless. On the 5.0L Coyote V8 you have Bank 2 as a control group, which settles it quickly. Two Mustang-specific considerations sit behind that: a tune changes fuelling targets outright, and on a 2018–2020 Coyote, oil reaching the exhaust can foul the sensor itself.",
    symptoms: [
      {
        key: "bank-compare",
        label: "Bank 1 trims negative, Bank 2 normal",
        response:
          "The single most useful observation available on the V8. A mixture fault confined to one bank sits in that bank's hardware — an injector, fuel supply to that bank, or the sensor itself.",
      },
      {
        key: "both-banks",
        label: "P2198 stored alongside P2196",
        response:
          "Both banks reporting rich points away from an individual sensor and toward something affecting the whole engine — fuel pressure, the MAF sensor, or a calibration.",
      },
      {
        key: "tuned",
        label: "The car has an aftermarket tune",
        response:
          "Directly relevant. A calibration targeting a richer mixture for safety under boost or high load will show exactly this. Establish a stock baseline before diagnosing components.",
      },
      {
        key: "oil-use",
        label: "Using oil between changes",
        response:
          "On a 2018–2020 Coyote, oil reaching the exhaust can foul the sensor tip directly. Replacing the sensor without addressing the consumption gives you the same code again later.",
      },
      {
        key: "economy",
        label: "Fuel economy noticeably worse",
        response:
          "Consistent with a genuinely rich condition. Check whether long-term trim has gone strongly negative — if it has, the PCM agrees with the sensor.",
      },
      {
        key: "fuel-in-oil",
        label: "Fuel smell in the engine oil",
        response:
          "Evidence the rich condition is real and has been going on a while. Fuel dilution reduces the oil's protective ability, so change it once the fault is repaired.",
      },
    ],
    causes: [
      {
        cause: "Genuinely rich mixture on Bank 1",
        evidence:
          "Bank 1 long-term trim strongly negative while Bank 2 sits normal; sooty plugs on that bank",
        firstTest:
          "Compare Bank 1 and Bank 2 fuel trims — the fastest way to settle this on a V8",
      },
      {
        cause: "Aftermarket calibration targeting rich",
        evidence:
          "Tune fitted; mixture deliberately richer under load; both banks may be affected equally",
        firstTest:
          "Return to stock calibration and re-read trims before diagnosing hardware",
      },
      {
        cause: "Sensor contaminated by oil",
        evidence:
          "Oil consumption on a Gen 3 Coyote; sensor tip visibly fouled when removed",
        firstTest:
          "Remove and inspect the sensor, and measure oil consumption rather than just fitting a new one",
      },
      {
        cause: "Failed or biased sensor",
        evidence:
          "Sensor voltage sits high and does not respond to a forced mixture change; Bank 2 normal",
        firstTest:
          "Force a mixture change and watch whether the Bank 1 sensor reacts at all",
      },
      {
        cause: "Wiring, connector or heater-circuit fault",
        evidence:
          "Chafed harness near the exhaust; heater-circuit codes stored; open or high-resistance circuit",
        firstTest:
          "Inspect the Bank 1 sensor harness and connector for heat damage and corrosion",
      },
      {
        cause: "Excess fuel pressure or leaking injector",
        evidence:
          "Fuel pressure above specification; one cylinder on Bank 1 noticeably richer",
        firstTest:
          "Compare commanded against actual fuel pressure, then test injectors on that bank",
      },
    ],
    deepDive: [
      {
        heading: "Bank 2 settles this in minutes",
        paragraphs: [
          "On the Coyote V8 you have something four-cylinder owners do not: a second bank running the same fuel, the same air and the same calibration, with its own independent oxygen sensor. Use it.",
          "If Bank 1 long-term trim has gone strongly negative while Bank 2 sits near zero, the PCM is actively pulling fuel out of one bank only. That means the rich condition is real and physically located on Bank 1 — an injector, fuel delivery to that bank, or something else on the passenger side.",
          "If both banks read near zero while the Bank 1 sensor insists the mixture is rich, nothing else in the system can see what the sensor claims. The sensor is the outlier, and that points at the sensor, its wiring or its connector.",
          "And if both banks are strongly negative together, look upstream of the split — fuel pressure, the MAF sensor, or the calibration. P2198 usually stores alongside in that case.",
        ],
      },
      {
        heading: "Tunes and rich targets",
        paragraphs: [
          "A great many Mustangs run an aftermarket calibration, and a common characteristic of performance tunes is a deliberately richer mixture under load. Extra fuel cools the charge and provides margin against knock, which is a reasonable engineering trade — but it changes what the oxygen sensor reports.",
          "That creates an obvious diagnostic problem: the code describes a condition the tune may have created on purpose. No component is faulty, and no replacement part will change it.",
          "So on a tuned car, establishing a stock baseline is not optional. Return to the factory calibration, clear the codes, drive it, and see whether the condition persists. If it does, you have a genuine fault to find. If it does not, the conversation is with whoever wrote the tune rather than with a parts counter.",
        ],
      },
      {
        heading: "Why oil consumption matters here too",
        bullets: [
          "Oil reaching the exhaust can foul the oxygen sensor tip directly",
          "A fouled sensor reports inaccurately regardless of what the mixture is doing",
          "On 2018–2020 Gen 3 Coyote engines, consumption is a documented condition",
          "Fitting a new sensor without addressing the oil gives you a fouled new sensor",
          "Inspect the removed sensor — a visibly contaminated tip is telling you something",
        ],
      },
    ],
    freezeFrame: [
      "Short and long-term fuel trim on both banks — the fastest way to settle sensor versus rich engine",
      "Bank 1 oxygen sensor voltage or lambda at the moment the code set",
      "Mass airflow reading against engine speed and load",
      "Engine coolant temperature, separating a cold-start-only fault from a fully warm one",
      "Commanded and actual fuel rail pressure where reported",
      "Any companion codes — P2198, misfire codes or MAF performance codes change the order",
    ],
    steps: [
      {
        title: "Compare Bank 1 and Bank 2 trims",
        detail:
          "One bank negative with the other normal means a real bank-specific rich condition. Both near zero with the sensor reporting rich points at the sensor. Both negative points upstream.",
      },
      {
        title: "Establish a stock calibration baseline",
        detail:
          "If the car is tuned, return to factory calibration before diagnosing hardware. A tune targeting a rich mixture produces this code by design, and no part replacement resolves it.",
      },
      {
        title: "Check the oil consumption rate",
        detail:
          "On a 2018–2020 Coyote, oil reaching the exhaust fouls sensors. Measuring consumption tells you whether a new sensor would survive.",
      },
      {
        title: "Watch the sensor respond to a forced change",
        detail:
          "Create a deliberate mixture change and watch it. A working sensor moves quickly; one that is stuck barely moves. That difference is the clearest evidence available without removing anything.",
      },
      {
        title: "Inspect the harness and connector",
        detail:
          "Oxygen sensor wiring runs close to the exhaust and takes heat and vibration — more of both on a car driven hard. An open or high-resistance circuit produces this code with a good sensor fitted.",
      },
      {
        title: "Compare commanded against actual fuel pressure",
        detail:
          "Pressure above specification over-fuels every cylinder it feeds and would affect both banks. This separates fuel delivery from a bank-specific cause.",
      },
      {
        title: "Test injector delivery on Bank 1",
        detail:
          "A leaking or over-delivering injector produces a genuinely rich bank. If trims say Bank 1 only and pressure is correct, this is where to look.",
      },
      {
        title: "Inspect the sensor when you remove it",
        detail:
          "A tip fouled with oil residue tells you both that the sensor is finished and that something else caused it — and the second part is the one that matters.",
      },
    ],
    tsbs: [coyoteOilTsb],
    costs: [
      {
        job: "Bank 1 versus Bank 2 trim comparison",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Easy with a live-data tool",
        note: "Settles sensor versus rich engine before money is spent",
      },
      {
        job: "Return to stock calibration",
        parts: "Varies",
        shop: "Dealer or tuner",
        diy: "Depends on the setup",
        note: "Necessary baseline on a tuned car",
      },
      {
        job: "MAF sensor cleaning",
        parts: "About $15",
        shop: "Often inside a diagnostic fee",
        diy: "Easy",
        note: "Worth doing when both banks are affected",
      },
      {
        job: "Upstream O2 sensor — Bank 1",
        parts: "Moderate",
        shop: "Usually straightforward access",
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
      "Do not replace the oxygen sensor first. Compare Bank 1 against Bank 2 — it takes minutes and costs nothing, and it tells you whether the sensor is lying or reporting honestly. And on a tuned car, establish a stock baseline before buying anything: a calibration targeting a rich mixture under load produces this code by design, and no component replacement will change that.",
    yearNotes: [
      "On the 5.0L Coyote V8, Bank 1 is the passenger-side bank. Sensor 1 is upstream of the catalytic converter.",
      "P2198 is the same fault on Bank 2. Both together point away from an individual sensor and toward something affecting the whole engine.",
      "Performance calibrations commonly target a richer mixture under load for knock margin, which can produce this code without any component being faulty.",
      "On 2018–2020 Gen 3 Coyote engines, documented oil consumption can foul the sensor tip directly — so a replacement sensor may not last.",
    ],
    faqs: [
      {
        question: "What does P2196 mean on a Ford Mustang?",
        answer:
          "The upstream oxygen sensor on Bank 1 is reporting rich and not switching normally. Either the engine really is rich, or the sensor has failed in a way that makes it report rich.",
      },
      {
        question: "Which side is Bank 1 Sensor 1?",
        answer:
          "The upstream sensor on the passenger-side bank of the Coyote V8, before the catalytic converter.",
      },
      {
        question: "How do I tell if the sensor is wrong?",
        answer:
          "Compare Bank 1 and Bank 2 fuel trims. Bank 1 strongly negative with Bank 2 normal means the engine really is rich. Both near zero while the sensor says rich makes the sensor the outlier.",
      },
      {
        question: "Can my tune cause P2196?",
        answer:
          "Yes. Performance calibrations frequently target a richer mixture under load for knock margin. Establish a stock baseline before diagnosing any component.",
      },
      {
        question: "Can oil consumption foul an oxygen sensor?",
        answer:
          "Yes, and on a 2018–2020 Coyote that is worth checking. Oil reaching the exhaust coats the sensor tip, and a new sensor fitted to the same engine will be fouled in turn.",
      },
      {
        question: "What does P2196 with P2198 mean?",
        answer:
          "Both banks reporting rich, which points upstream of the split — fuel pressure, the MAF sensor or the calibration rather than an individual sensor.",
      },
      {
        question: "Can P2196 damage my catalytic converter?",
        answer:
          "A genuinely rich mixture can. Excess fuel raises converter temperature and shortens its life, which is why this is worth diagnosing rather than living with.",
      },
      {
        question: "Why did P2196 return after a new sensor?",
        answer:
          "Almost always because the engine was genuinely rich and the original sensor was correct — or because oil is fouling the new sensor as it fouled the old one.",
      },
    ],
    closing: {
      title: "Proving fuel control is right again",
      paragraphs: [
        "Verification is data, because the failure mode is a sensor reporting plausibly wrong values. A code that has not yet returned tells you very little.",
        "Bring the engine to full operating temperature and compare the two banks again. Bank 1 trims should sit close to Bank 2, and the upstream sensor should switch actively rather than parking at one value.",
        "If the car is tuned and you established a stock baseline to diagnose it, reload the tune and re-check afterwards. If the condition returns only with the tune loaded, the calibration is the answer — and that is a conversation with the tuner rather than a parts purchase.",
      ],
    },
    sources: [fordObd2017, fordObd2024, slashgearCoyoteOil, fordManuals],
  },

  /* ------------------------------------------------------------------ P1299 */
  {
    slug: "ford/mustang/p1299",
    code: "P1299",
    title: "P1299 Code Ford Mustang: Overheat Protection Causes & Fixes",
    description:
      "P1299 means your Mustang entered cylinder-head overheat protection. Track heat, the 2.3L head gasket, and what to check first.",
    definition: "Cylinder Head Over Temperature Protection Active",
    severity: "Stop soon",
    vehicle: mustangVehicle,
    driveAdvice:
      "Treat this as the most urgent code on this section. P1299 means the PCM saw cylinder head temperature reach a level high enough to threaten the head, and intervened to protect it. Stop as soon as it is safe, shut down and let it cool. If it happened on track, come off the circuit rather than completing the session.",
    quickAnswer:
      "P1299 records that cylinder head temperature crossed a critical threshold and Ford's fail-safe cooling strategy activated. On a Mustang there are two contexts worth separating immediately. If it happened during hard or track driving, the cooling system may simply have run out of margin under a load it was not sized for. If it happened in ordinary driving on a pre-2020 2.3L EcoBoost, the documented open-deck head-gasket flaw is a live candidate. Both need stopping for, but they lead in very different directions.",
    symptoms: [
      {
        key: "power-loss",
        label: "Sudden dramatic power loss",
        response:
          "That is the fail-safe strategy, not a second fault. The PCM disables fuel to some cylinders so they pump air and carry heat out of the head. It feels alarming because it is meant to make you stop.",
      },
      {
        key: "track",
        label: "Happened on track or during hard driving",
        response:
          "Come off the circuit and let it cool properly before restarting. Then work out whether the cooling system is healthy but under-specified for that use, or whether something has genuinely failed.",
      },
      {
        key: "coolant-2-3",
        label: "Coolant disappearing on a 2.3L EcoBoost",
        response:
          "On a pre-2020 car this points at the documented open-deck head-gasket flaw. Coolant escaping into a cylinder both causes overheating and gets worse the longer you drive on it.",
      },
      {
        key: "gauge-normal",
        label: "Power loss but the temperature gauge reads normal",
        response:
          "Worth investigating rather than dismissing. If coolant level is correct and there is no sign of loss, a cylinder head temperature sensor or its wiring may be reporting a temperature the engine is not actually at.",
      },
      {
        key: "no-heat",
        label: "Cabin heater blows cold",
        response:
          "A classic sign of low coolant or air trapped in the system, since the heater core sits high in the circuit. It often appears before the gauge moves.",
      },
      {
        key: "modified-cooling",
        label: "Aftermarket cooling or a supercharger fitted",
        response:
          "Relevant. Forced induction adds heat the standard cooling system was not designed around, and aftermarket radiators and thermostats change how the system behaves. Establish what is fitted before diagnosing.",
      },
    ],
    causes: [
      {
        cause: "Head gasket flaw (pre-2020 2.3L EcoBoost)",
        evidence:
          "Coolant loss with no external leak; white smoke; overheating in ordinary driving; misfire alongside",
        firstTest:
          "Pressure-test the cooling system and run a combustion-gas test",
      },
      {
        cause: "Cooling system at its limit under track load",
        evidence:
          "Only occurs during sustained hard driving; system healthy and full; returns to normal when cooled",
        firstTest:
          "Log coolant and cylinder head temperature through a session to see where the margin runs out",
      },
      {
        cause: "Coolant loss from a leak",
        evidence:
          "Level low, residue at a hose or the water-pump weep hole, coolant on the ground",
        firstTest:
          "Inspect the cooling system cold, then pressure-test it to find where coolant is leaving",
      },
      {
        cause: "Thermostat stuck closed",
        evidence:
          "Upper radiator hose stays cool while engine temperature climbs",
        firstTest:
          "Compare upper and lower hose temperatures as the engine warms",
      },
      {
        cause: "Cylinder head temperature sensor or wiring",
        evidence:
          "Power loss with a normal gauge, correct coolant level and no sign of loss; intermittent behaviour",
        firstTest:
          "Compare the CHT reading against coolant temperature and an infrared reading of the head",
      },
      {
        cause: "Cooling fan or its control",
        evidence:
          "Overheating in traffic that improves at speed, where airflow no longer depends on the fan",
        firstTest:
          "Verify the fan operates when commanded and when coolant temperature rises",
      },
    ],
    deepDive: [
      {
        heading: "What Ford's fail-safe cooling actually does",
        paragraphs: [
          "This is not a generic limp mode, and knowing the mechanism makes the symptoms make sense.",
          "When cylinder head temperature crosses the threshold, the PCM begins disabling fuel injectors on some cylinders in rotation. Those cylinders keep pumping air without burning fuel, and that moving air carries heat out of the cylinder head.",
          "In effect the engine converts part of itself into an air pump to cool its own head. That is why the power loss is so dramatic, why it runs rough rather than smoothly weak, and why the fans are working hard at the same time — three symptoms, one strategy.",
          "It is designed to let you reach somewhere safe rather than stranding you. It is not a mode to drive in, and on track it is not a mode to complete a session in.",
        ],
      },
      {
        heading: "Track heat versus a genuine fault",
        paragraphs: [
          "A Mustang on track asks more of its cooling system than almost any road use. Sustained high rpm, high load, and often limited airflow in traffic on circuit all stack up.",
          "That produces a genuine question worth answering honestly: did something fail, or did a healthy system simply run out of margin under a duty cycle it was never sized for? Those have different answers. The first needs a repair; the second needs either a cooling upgrade or a change in how the car is used.",
          "The way to tell is data. Log coolant temperature and cylinder head temperature through a session and watch where they diverge from normal. A system that climbs steadily under sustained load and recovers on the cool-down lap is behaving as designed at its limit. A system that spikes suddenly, or that never fully recovers, has a fault.",
          "Either way, do not treat repeated activation as acceptable. The strategy exists because the alternative is a warped head.",
        ],
      },
      {
        heading: "The 2.3L EcoBoost open-deck problem",
        paragraphs: [
          "If your Mustang has the 2.3L EcoBoost built before 2020 and this code arrived during ordinary driving rather than on track, the head gasket deserves early attention.",
          "The engine uses an open-deck block with coolant slits between the cylinders, and that is precisely where the head gasket has failed on these engines. Coolant escapes into a cylinder, which causes overheating, misfire and white exhaust smoke, and it gets worse the longer the car is driven on it.",
          "Ford changed the design for the 2020 model year specifically because of this flaw, which is a useful dividing line when you are diagnosing — or buying — one of these cars.",
        ],
      },
      {
        heading: "After the event, check the aftermath",
        bullets: [
          "Coolant in the oil, or oil in the coolant",
          "Bubbles in the expansion tank once running",
          "A cooling system that pressurises unusually quickly",
          "A misfire that was not there before",
          "White exhaust smoke on start-up",
          "Any of these means the overheat did damage, and that damage is now the job",
        ],
      },
    ],
    freezeFrame: [
      "Cylinder head temperature and coolant temperature when protection activated — if they disagree sharply, suspect the sensor",
      "Engine load and vehicle speed, separating track load from idling in traffic",
      "Ambient temperature, since a hot day narrows the cooling system's margin",
      "Engine run time before activation, showing whether heat built gradually or spiked",
      "Fan command state, which tells you whether the PCM asked for cooling and did not get it",
      "Any companion codes for coolant or cylinder head temperature sensor circuits",
    ],
    steps: [
      {
        title: "Stop and let it cool completely",
        detail:
          "Nothing can be diagnosed on a hot engine, and opening a pressurised cooling system will injure you. On track, come in rather than finishing the session.",
      },
      {
        title: "Check coolant level cold and look for loss",
        detail:
          "Inspect hoses, the radiator, the water-pump weep hole and the ground. A full system with no evidence of loss is your first clue that the overheat may not have been real.",
      },
      {
        title: "Compare the CHT sensor against reality",
        detail:
          "Read cylinder head and coolant temperature side by side, then point an infrared thermometer at the head. Three readings that agree mean the reading is trustworthy; one that disagrees has found your fault.",
      },
      {
        title: "Pressure-test the cooling system",
        detail:
          "This finds leaks that only appear under operating pressure. On a pre-2020 2.3L, follow it with a combustion-gas test to check for exhaust gas in the coolant.",
      },
      {
        title: "Establish what cooling hardware is fitted",
        detail:
          "Aftermarket radiators, thermostats, and any forced-induction kit all change the thermal picture. Diagnosing against factory expectations on a modified car wastes time.",
      },
      {
        title: "Confirm the thermostat opens and the fan runs",
        detail:
          "Watch the radiator hoses as the engine warms, then verify the fan responds when commanded — particularly if the overheat happened at low speed rather than at load.",
      },
      {
        title: "Log temperatures through a real session",
        detail:
          "If the event was track-related, this is the only way to distinguish a healthy system at its limit from a genuine fault. Watch where the curves depart from normal.",
      },
      {
        title: "Assess whether damage was done",
        detail:
          "After fixing the cause, check for coolant in the oil, bubbles in the reservoir, a system that pressurises fast, or a new misfire. Overheat damage often surfaces after the original fault is repaired.",
      },
    ],
    tsbs: [],
    costs: [
      {
        job: "CHT sensor replacement",
        parts: "About $20–$50",
        shop: "Parts plus labour, varies by access",
        diy: "Often straightforward",
        note: "The cheapest outcome by a wide margin where the reading is false",
      },
      {
        job: "Cooling system pressure test",
        parts: "$0",
        shop: "Usually inside a diagnostic fee",
        diy: "Needs a pressure tester",
        note: "Decides whether you are chasing a leak, a sensor or a limit",
      },
      {
        job: "Combustion-gas (block) test",
        parts: "Low — test fluid",
        shop: "Modest add-on",
        diy: "Easy with a kit",
        note: "Essential on a pre-2020 2.3L with coolant loss",
      },
      {
        job: "Thermostat replacement",
        parts: "Moderate",
        shop: "Get a quote — access varies by engine",
        diy: "Moderate",
        note: "Common where the upper hose stays cold as temperature climbs",
      },
      {
        job: "Cooling upgrade for track use",
        parts: "Varies widely",
        shop: "Specialist work",
        diy: "Moderate to advanced",
        note: "Where a healthy system is simply under-specified for the duty cycle",
      },
      {
        job: "Head gasket repair (2.3L)",
        parts: "—",
        shop: "Substantial — get a written quote",
        diy: "Not a DIY job",
        note: "The documented failure on pre-2020 open-deck engines",
      },
    ],
    dontReplace:
      "Do not simply top up the coolant, clear the code and carry on — and equally, do not authorise head-gasket work because a code mentioned over-temperature. Both mistakes skip the same step. Establish whether the engine actually reached that temperature by comparing the CHT sensor against coolant temperature and an infrared reading, and establish whether the event happened at track load or in ordinary driving. Those two facts point in completely different directions.",
    yearNotes: [
      "Pre-2020 2.3L EcoBoost engines have a documented open-deck head-gasket flaw at the coolant slits between cylinders. Ford changed the design for 2020.",
      "Ford's fail-safe cooling disables fuel to some cylinders so they pump air and carry heat out of the cylinder head, which is why the power loss is so pronounced.",
      "Track use asks far more of the cooling system than road use, so distinguish a healthy system at its limit from a genuine failure before spending on repairs.",
      "A faulty cylinder head temperature sensor or its wiring can activate protection without a real overheat. Verify the reading before assuming the worst.",
    ],
    faqs: [
      {
        question: "What does P1299 mean on a Ford Mustang?",
        answer:
          "That cylinder-head overheat protection activated. The PCM saw a head temperature high enough to threaten the cylinder head and reduced engine output to protect it.",
      },
      {
        question: "Why did my Mustang suddenly lose all power?",
        answer:
          "That is the protection strategy. Ford's fail-safe cooling disables fuel to some cylinders so they pump air and carry heat out of the head. It is deliberately dramatic so that you stop.",
      },
      {
        question: "It happened on track. Is the car broken?",
        answer:
          "Not necessarily. A healthy cooling system can run out of margin under sustained track load. Logging coolant and head temperature through a session distinguishes that from a genuine fault.",
      },
      {
        question: "Can I keep driving with P1299?",
        answer:
          "No. Stop as soon as it is safe and let the engine cool. Only after confirming the coolant system is full and the temperature reading is false should you treat it as an electrical fault.",
      },
      {
        question: "Why does my 2.3L keep losing coolant?",
        answer:
          "On pre-2020 engines the open-deck design puts coolant slits between the cylinders, and that is where the head gasket has failed. Ford redesigned it for 2020 because of this.",
      },
      {
        question: "Can a sensor cause P1299 without real overheating?",
        answer:
          "Yes. A faulty cylinder head temperature sensor or its wiring can make the PCM believe the engine is overheating while the gauge and coolant level are both normal.",
      },
      {
        question: "How much does it cost to fix P1299?",
        answer:
          "It splits sharply. A CHT sensor is roughly $20–$50 in parts. A head gasket on a 2.3L is substantial. Establishing which path you are on first is what protects your wallet.",
      },
      {
        question: "Should I check anything after fixing the cause?",
        answer:
          "Yes, if the overheat was real. Look for coolant in the oil, oil in the coolant, bubbles in the reservoir, rapid pressurisation, or a misfire that was not there before.",
      },
    ],
    closing: {
      title: "After a P1299 event, verify more than the code",
      paragraphs: [
        "Repairing the cause is only half the job. The other half is establishing whether the temperature event did damage on the way through — and that only applies if the event was genuine.",
        "Once the fault is fixed, bring the engine to full operating temperature and watch coolant and cylinder head temperature stabilise where they should, tracking each other sensibly. Then look for the aftermath: coolant in the oil, bubbles in the reservoir, rapid pressurisation, or a new misfire.",
        "If the event was track-related, verify under track-like conditions rather than on a commute. A cooling system that behaves perfectly at 40 mph tells you nothing about how it behaves at sustained high load, which is the only condition that produced the code in the first place.",
      ],
    },
    sources: [fordObd2017, fordObd2024, lemonLaw23, fordManuals],
  },
];
