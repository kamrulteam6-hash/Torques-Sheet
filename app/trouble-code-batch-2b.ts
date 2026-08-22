import type { TroubleCodeGuide } from "./trouble-code-data";
import {
  fordDriveCycle,
  fordManuals,
  fordObd2017,
  fordObd2024,
  goPartsP1299,
  goPartsP2196,
  nhtsaTsb,
  tsb202324,
} from "./trouble-code-sources";

/**
 * Ford F-150 trouble-code guides: P1299, P2196, P1000.
 *
 * P1299 in particular is worth reading carefully. The obvious reading of the
 * code is "your engine overheated", and on late-model trucks that is often not
 * what happened — the cylinder head temperature sensor and its wiring are a
 * more common cause than an actual cooling failure.
 */
export const troubleCodeBatch2b: TroubleCodeGuide[] = [
  /* ------------------------------------------------------------------ P1299 */
  {
    slug: "ford/f-150/5-0/p1299",
    code: "P1299",
    title: "P1299 Code Ford F150: Overheat Protection Causes & Fixes",
    description:
      "P1299 means overheat protection activated on your F-150. Why the CHT sensor is often the real cause, how limp mode works, and repair costs.",
    definition: "Cylinder Head Over Temperature Protection Active",
    severity: "Stop soon",
    driveAdvice:
      "Treat the first occurrence as genuine. Stop as soon as it is safe, shut the engine down and let it cool before investigating — if the engine really is that hot, continuing to drive risks a warped head. Once you have confirmed coolant level and temperature are actually normal, a repeat code with a cold engine and a full cooling system points somewhere very different, and this page covers both paths.",
    quickAnswer:
      "P1299 records that your PCM saw cylinder head temperature cross a critical threshold — commonly cited around 260°F (127°C) — and activated Ford's fail-safe cooling strategy to protect the engine. Here is the part most write-ups get wrong: on 2015–2022 F-150s, P1299 frequently points to a faulty cylinder head temperature sensor or its wiring rather than an engine that genuinely overheated. So the first question is not what failed in the cooling system. It is whether the engine actually got hot at all.",
    symptoms: [
      {
        key: "power-loss",
        label: "Sudden, dramatic loss of power and high fan noise",
        response:
          "That is the fail-safe strategy working as designed, not a second fault. The PCM is deliberately limiting output and running the fans hard to shed heat. Stop and let the engine cool rather than trying to drive through it.",
      },
      {
        key: "temp-gauge",
        label: "Temperature gauge high or in the red",
        response:
          "Shut down as soon as you can do so safely. Do not open the cooling system while it is hot — the pressure and temperature will cause serious burns. This symptom means the overheat is real, and the diagnosis is a cooling-system one.",
      },
      {
        key: "gauge-normal",
        label: "Power loss but the temperature gauge reads normal",
        response:
          "This is the pattern that points at the CHT sensor rather than the cooling system. If the gauge is normal, the coolant level is correct and there is no sign of loss, the sensor or its wiring is reporting a temperature the engine is not actually at.",
      },
      {
        key: "coolant-loss",
        label: "Coolant low or visibly leaking",
        response:
          "Find the leak before topping up and driving on. A loss large enough to trigger overheat protection is usually visible: hoses, radiator, water pump weep hole, or coolant on the ground where the truck was parked.",
      },
      {
        key: "no-heat",
        label: "Cabin heater blows cold",
        response:
          "A classic sign of low coolant or air trapped in the system, because the heater core sits high in the circuit. It often appears before the temperature gauge moves and is worth acting on early.",
      },
      {
        key: "intermittent",
        label: "Comes and goes, often over bumps or in cold weather",
        response:
          "Strongly suggests a wiring or connector fault at the CHT sensor rather than a thermal event. Intermittent electrical faults track with vibration and temperature in a way that a genuine cooling failure does not.",
      },
    ],
    causes: [
      {
        cause: "CHT sensor or its wiring (common on 2015–2022)",
        evidence:
          "Power loss with a normal gauge, correct coolant level and no sign of loss; reading disagrees with actual coolant temperature; fault is intermittent",
        firstTest:
          "Compare the CHT sensor reading against coolant temperature and against an infrared reading of the head itself",
      },
      {
        cause: "Coolant loss from a leak",
        evidence:
          "Level low in the reservoir, residue at a hose or the water-pump weep hole, or coolant on the ground where you parked",
        firstTest:
          "Inspect the whole cooling system cold, then pressure-test it to find where the coolant is leaving",
      },
      {
        cause: "Thermostat stuck closed",
        evidence:
          "Upper radiator hose stays cool while engine temperature climbs, meaning coolant is not circulating to the radiator",
        firstTest:
          "Compare upper and lower hose temperatures as the engine warms and watch when flow actually begins",
      },
      {
        cause: "Cooling fan or its control not working",
        evidence:
          "Overheating happens in traffic and improves at road speed, where airflow no longer depends on the fan",
        firstTest:
          "Verify the fan operates when commanded and when coolant temperature rises, and check its control circuit",
      },
      {
        cause: "Water pump failure",
        evidence:
          "Coolant weeping from the pump, noise from the pump bearing, or poor circulation with a thermostat known to be good",
        firstTest:
          "Inspect for weeping and play, then confirm whether coolant is actually circulating once hot",
      },
      {
        cause: "Head gasket or combustion-gas intrusion",
        evidence:
          "Coolant disappears with no external leak, bubbles in the reservoir, white exhaust smoke, or pressure that builds quickly",
        firstTest:
          "Run a combustion-gas test on the cooling system before assuming the overheating had an external cause",
      },
    ],
    deepDive: [
      {
        heading: "How Ford's fail-safe cooling actually works",
        paragraphs: [
          "This is not a generic limp mode. Ford's strategy is specific and, once you know what it does, the symptoms make far more sense. When cylinder head temperature crosses the threshold, the PCM begins disabling fuel injectors on some cylinders in rotation. Those cylinders keep pumping air without burning fuel, and that moving air carries heat out of the engine.",
          "In effect the engine turns part of itself into an air pump to cool the cylinder head. That is why the truck feels so dramatically down on power, why it runs rough rather than smoothly weak, and why the fans run hard at the same time. All three are the strategy operating as designed rather than three separate faults.",
          "It is a genuinely clever piece of engineering — it is intended to let you reach somewhere safe rather than stranding you — but it is not a mode to drive in. The strategy exists because the alternative is a warped cylinder head, and it is buying you distance, not permission.",
        ],
      },
      {
        heading: "The question to answer first: did it actually overheat?",
        paragraphs: [
          "Before you diagnose a cooling system, establish whether there was ever a thermal event. This single step separates an inexpensive sensor job from an expensive cooling-system one, and on late-model F-150s it frequently lands on the sensor.",
          "Check three things with the engine cold. Is the coolant level correct in both the reservoir and the radiator? Is there any external evidence of loss — residue, staining, a wet weep hole? Does the CHT sensor reading agree with the coolant temperature sensor and with an infrared thermometer pointed at the head?",
          "If the coolant is full, there is no sign of loss, and the sensor disagrees with the other two measurements, you are looking at a sensor or wiring fault. If coolant is low or the readings agree that the engine really was hot, work through the cooling system in the order below.",
        ],
      },
      {
        heading: "Why this code deserves respect even when the sensor is at fault",
        bullets: [
          "The protection strategy activating means the PCM believed a warped head was a live possibility",
          "A sensor that reads high intermittently can also read low, which would remove your protection when you need it",
          "Repeated activation while towing points at genuine thermal margin problems, not just a sensor",
          "If the overheat was real, the aftermath matters as much as the cause — check for head-gasket symptoms afterwards",
          "Never diagnose this code by clearing it and waiting to see whether it returns while driving",
        ],
      },
    ],
    freezeFrame: [
      "Cylinder head temperature and coolant temperature at the moment protection activated — if these disagree sharply, suspect the sensor",
      "Engine load and vehicle speed, which separate a towing overheat from an idling-in-traffic one",
      "Ambient temperature, since a hot day narrows the margin the cooling system has to work with",
      "Engine run time before activation, showing whether heat built gradually or the reading spiked suddenly",
      "Fan command state, which tells you whether the PCM asked for cooling and did not get it",
      "Any companion codes for coolant temperature or cylinder head temperature sensor circuits",
    ],
    steps: [
      {
        title: "Stop and let it cool completely",
        detail:
          "Nothing useful can be diagnosed on a hot engine, and opening a pressurised cooling system will injure you. Park it, shut it down and wait. This step is not optional regardless of what you suspect the cause to be.",
      },
      {
        title: "Check coolant level and look for loss",
        detail:
          "With the engine cold, check the level in both the reservoir and the radiator, then inspect hoses, the radiator, the water pump weep hole and the ground under the truck. A full system with no evidence of loss is your first clue that the overheat may not have been real.",
      },
      {
        title: "Compare the CHT sensor against reality",
        detail:
          "Read cylinder head temperature and coolant temperature side by side on a scan tool, then point an infrared thermometer at the cylinder head. Three measurements that agree mean the reading is trustworthy. A CHT sensor that disagrees with both others has found your fault.",
      },
      {
        title: "Inspect the sensor connector and wiring",
        detail:
          "This is where intermittent versions of this code live. Look for corroded terminals, chafed insulation where the harness passes near heat, and a connector that is not fully latched. Wiggle-test while watching live data if the fault comes and goes.",
      },
      {
        title: "Pressure-test the cooling system",
        detail:
          "If the overheat was real, this finds leaks that only appear under operating pressure, including ones that evaporate before you see them. It is the fastest way to separate an external leak from an internal one.",
      },
      {
        title: "Confirm the thermostat opens and the fan runs",
        detail:
          "Watch the upper and lower radiator hoses as the engine warms — an upper hose that stays cool while temperature climbs points at the thermostat. Then verify the fan responds when commanded, particularly if the overheating happened in traffic rather than at speed.",
      },
      {
        title: "Test for combustion gas in the coolant",
        detail:
          "If coolant is disappearing with no external leak, this test tells you whether exhaust gas is entering the cooling system. It is far cheaper than disassembly and answers the expensive question directly.",
      },
      {
        title: "Assess whether the overheat caused damage",
        detail:
          "P1299 exists because the temperature was high enough to matter. If the event was genuine, check afterwards for head-gasket symptoms, oil and coolant cross-contamination, and any change in how the engine runs or holds pressure.",
      },
    ],
    costs: [
      {
        job: "CHT sensor replacement",
        parts: "About $20–$50",
        shop: "Parts plus labour, varies by access",
        diy: "Often easy on 2.7L and 5.0L",
        note: "The common cause on 2015–2022 trucks and the cheapest outcome by a wide margin",
      },
      {
        job: "Cooling system pressure test",
        parts: "$0",
        shop: "Usually inside a diagnostic fee",
        diy: "Needs a pressure tester",
        note: "Decides whether you are chasing a leak or a sensor",
      },
      {
        job: "Thermostat replacement",
        parts: "Moderate",
        shop: "Get a quote — access varies by engine",
        diy: "Moderate",
        note: "Common where the upper hose stays cold as temperature climbs",
      },
      {
        job: "Water pump replacement",
        parts: "Moderate to high",
        shop: "Get a quote — labour-dominated",
        diy: "Advanced on some engines",
        note: "Labour is the larger share; often done with the thermostat",
      },
      {
        job: "Combustion-gas (block) test",
        parts: "Low — test fluid",
        shop: "Modest add-on to diagnosis",
        diy: "Easy with a test kit",
        note: "Cheap way to answer the head-gasket question before disassembly",
      },
      {
        job: "Head gasket repair",
        parts: "—",
        shop: "Substantial — get a written quote",
        diy: "Not a DIY job on this engine",
        note: "The outcome this protection strategy exists to prevent",
      },
    ],
    tsbs: [],
    dontReplace:
      "Do not simply refill the coolant, clear the code and carry on — and equally, do not authorise a head gasket because a code said 'over temperature'. Both mistakes come from skipping the same step. Establish whether the engine actually reached that temperature by comparing the CHT sensor against coolant temperature and an infrared reading. On late-model F-150s that comparison frequently ends the diagnosis at a $30 sensor.",
    yearNotes: [
      "On 2015–2022 F-150s, P1299 commonly traces to the cylinder head temperature sensor or its wiring rather than an actual cooling failure. Verify the reading before condemning the cooling system.",
      "The commonly cited activation threshold is around 260°F (127°C) at the cylinder head, though the exact figure and strategy behaviour vary by model year and engine. Confirm against service information for your VIN.",
      "Ford's fail-safe strategy differs across model years — some reduce output progressively, others more abruptly. How dramatic the power loss felt is not a reliable measure of how hot the engine actually got.",
      "Trucks used for towing operate with much less thermal margin. If P1299 appeared while towing, evaluate the cooling system's condition and capacity rather than treating it as a one-off event.",
    ],
    faqs: [
      {
        question: "What does P1299 mean on a Ford F-150?",
        answer:
          "That cylinder-head overheat protection activated. The PCM saw a head temperature above its critical threshold — commonly cited near 260°F — and reduced engine output to protect the cylinder head from warping.",
      },
      {
        question: "Why did my truck suddenly lose power?",
        answer:
          "That is the protection strategy, not a second failure. Ford's fail-safe cooling disables injectors on some cylinders so they pump air instead of burning fuel, which carries heat out of the engine. It feels dramatic because it is meant to.",
      },
      {
        question: "Can a bad sensor cause P1299 without real overheating?",
        answer:
          "Yes, and on 2015–2022 F-150s that is a common outcome. A faulty cylinder head temperature sensor or its wiring can make the PCM believe the engine is overheating when coolant level and gauge temperature are both normal.",
      },
      {
        question: "Can I keep driving with P1299?",
        answer:
          "Not on the first occurrence. Stop as soon as it is safe and let the engine cool. Only after you have confirmed the coolant system is full and the temperature reading is false should you treat it as an electrical fault rather than a thermal one.",
      },
      {
        question: "How much does it cost to fix P1299?",
        answer:
          "It splits sharply. A CHT sensor is roughly $20–$50 in parts and often a straightforward job on the 2.7L and 5.0L. A genuine cooling failure ranges from a thermostat to a head gasket, so establishing which path you are on first is what protects your wallet.",
      },
      {
        question: "Is P1299 the same as a blown head gasket?",
        answer:
          "No. A failed head gasket can cause the overheating that triggers P1299, and severe overheating can cause a gasket to fail. But the code records a temperature reading, not a mechanical diagnosis.",
      },
      {
        question: "Where is the cylinder head temperature sensor?",
        answer:
          "It threads into the cylinder head itself rather than sitting in a coolant passage, which is how it can report head temperature even if coolant is lost. Exact location varies by engine — confirm it for your VIN before ordering parts.",
      },
      {
        question: "Should I check anything after fixing the cause?",
        answer:
          "Yes, if the overheat was real. Look for coolant in the oil, oil in the coolant, bubbles in the reservoir, a system that pressurises unusually fast, or a misfire that was not there before. Overheating damage often shows up after the original fault is fixed.",
      },
    ],
    closing: {
      title: "After a P1299 event, verify more than the code",
      paragraphs: [
        "Repairing the cause is only half of a P1299 job. The other half is establishing whether the event that triggered it did any damage on the way through — and that only applies if the event was genuine in the first place.",
        "Once the fault is fixed, bring the engine to full operating temperature and watch coolant and cylinder head temperature stabilise where they should, with the two readings tracking each other sensibly. Then check for the aftermath: coolant in the oil, oil in the coolant, bubbles in the reservoir, a reservoir that pressurises quickly, or a misfire that was not there before.",
        "Keep the freeze-frame data from the original event. If a head-gasket question comes up later, the record of what temperature was reported, under what load, and whether the coolant sensor agreed with it is the most useful evidence you will have.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsP1299, fordManuals],
  },

  /* ------------------------------------------------------------------ P2196 */
  {
    slug: "ford/f-150/5-0/p2196",
    code: "P2196",
    title: "P2196 Code Ford F150: O2 Sensor Stuck Rich Diagnosis",
    description:
      "P2196 means the Bank 1 upstream O2 sensor reads stuck rich. How to tell a failed sensor from a genuinely rich engine, plus Ford TSB 20-2324.",
    definition: "O2 Sensor Signal Biased/Stuck Rich (Bank 1, Sensor 1)",
    severity: "Diagnose promptly",
    driveAdvice:
      "The truck will usually drive, but fuel control on Bank 1 is compromised and that has consequences. A genuinely rich mixture wastes fuel, dilutes engine oil and can overheat a catalytic converter. Get it diagnosed before it becomes a converter bill, and stop if the engine misfires or the lamp begins flashing.",
    quickAnswer:
      "P2196 means the upstream oxygen sensor on Bank 1 is reporting a rich mixture and staying there instead of switching the way a working sensor should. There are only two real possibilities, and the entire diagnosis is about separating them: either the engine truly is running rich and the sensor is reporting accurately, or the sensor has failed in a way that makes it report rich regardless of what is in the exhaust. Bank 1 on the 5.0L V8 is the passenger-side bank containing cylinder 1. If your truck is a 2.7L EcoBoost, check Ford TSB 20-2324 before buying anything — Ford links this code on those engines to leaking injectors and PCM software, not to the sensor.",
    symptoms: [
      {
        key: "fuel-economy",
        label: "Noticeably worse fuel economy",
        response:
          "Consistent with a genuinely rich condition. Check long-term fuel trim on Bank 1 — if it has gone strongly negative, the PCM is pulling fuel out to compensate, which means the rich indication is probably real rather than a sensor fault.",
      },
      {
        key: "fuel-smell",
        label: "Fuel smell from the exhaust",
        response:
          "Points toward an actually rich mixture rather than a lying sensor. Look at fuel pressure, injector condition and anything that would make the PCM over-fuel before you condemn the sensor.",
      },
      {
        key: "rough-idle",
        label: "Rough idle or hesitation",
        response:
          "A rich mixture can foul plugs and produce misfire. Check whether misfire codes stored alongside P2196 — if they did, and the truck is a 2.7L EcoBoost, that specific combination is what Ford TSB 20-2324 describes.",
      },
      {
        key: "companion-codes",
        label: "P2198, P0171 or misfire codes stored at the same time",
        response:
          "This cluster is significant on the 2.7L EcoBoost. Ford's bulletin covers exactly this pattern — P2196, P2198, P0300, P0301, P0306, P0316, P0171 and P0174 together — and attributes it to injectors leaking down or PCM calibration.",
      },
      {
        key: "black-smoke",
        label: "Black smoke from the tailpipe",
        response:
          "Unambiguous evidence of a genuinely rich mixture. The sensor is telling the truth. Stop looking at it and start looking at fuel pressure, injectors and anything else adding fuel the engine did not ask for.",
      },
      {
        key: "light-only",
        label: "Light on but the truck drives normally",
        response:
          "More consistent with a biased sensor than a genuinely rich engine. Compare Bank 1 and Bank 2 behaviour: if only one bank looks wrong and trims are otherwise normal, suspicion shifts toward the sensor and its wiring.",
      },
    ],
    causes: [
      {
        cause: "Leaking direct-injection injectors (2.7L EcoBoost)",
        evidence:
          "P2196 with P2198, misfire and lean codes together on a 2.7L; pattern matches Ford TSB 20-2324",
        firstTest:
          "Check whether TSB 20-2324 covers your VIN before any parts are purchased",
      },
      {
        cause: "Genuinely rich mixture on Bank 1",
        evidence:
          "Long-term fuel trim strongly negative on Bank 1 as the PCM removes fuel; plugs on that bank look sooty; black smoke",
        firstTest:
          "Compare Bank 1 and Bank 2 fuel trims — a real rich condition shows in the trim data before anywhere else",
      },
      {
        cause: "Contaminated or failed sensor",
        evidence:
          "Sensor voltage sits high and does not respond to forced mixture changes; the other bank behaves normally",
        firstTest:
          "Force a mixture change and watch whether the sensor reacts at all; a stuck sensor simply does not move",
      },
      {
        cause: "Wiring, connector or heater-circuit fault",
        evidence:
          "Damaged or chafed harness near the exhaust; heater-circuit codes stored alongside P2196; open or high-resistance circuit",
        firstTest:
          "Inspect the sensor harness and connector for heat damage and corrosion before replacing anything",
      },
      {
        cause: "Dirty or failing MAF sensor",
        evidence:
          "Airflow reading does not match expected values for load; both banks may be affected to differing degrees",
        firstTest:
          "Compare MAF reading against expected airflow at known engine speeds and loads",
      },
      {
        cause: "Excess fuel pressure or a vacuum-system fault",
        evidence:
          "Fuel pressure above specification, or an internal vacuum leak distorting the mixture the sensor sees",
        firstTest:
          "Compare commanded against actual fuel pressure, then check for internal vacuum leaks",
      },
    ],
    deepDive: [
      {
        heading: "Ford TSB 20-2324: check this before you buy a sensor",
        paragraphs: [
          "If your F-150 has the 2.7L EcoBoost, this is the most important paragraph on the page. Ford issued TSB 20-2324, which supersedes 18-2310, covering some 2018 F-150 trucks that store an illuminated MIL with P2196, P2198, P0300, P0301, P0306, P0316, P0171 and/or P0174.",
          "Ford attributes that condition to powertrain control module software or to direct-injection fuel injectors leaking down — not to the oxygen sensors that several of those codes appear to point at. The service procedure covers reprogramming the PCM and, where required, replacing the direct-injection injectors.",
          "A bulletin is not a recall and does not automatically apply to your truck. Confirm the model year, engine and build date coverage against your VIN through a Ford dealer or the NHTSA database. But if you own a 2018 2.7L that has stored several of those codes together, spending an hour confirming bulletin coverage is a far better use of your time than buying an oxygen sensor.",
        ],
      },
      {
        heading: "Reading fuel trims to settle the argument",
        paragraphs: [
          "Fuel trim is what separates a lying sensor from a rich engine, and it does so more reliably than any other single measurement. The logic is straightforward once you see it.",
          "If the engine is genuinely running rich, the PCM will be actively removing fuel to compensate, and long-term fuel trim on Bank 1 will sit noticeably negative. The sensor and the PCM agree with each other, and both are describing something real. If instead the trims sit near zero on both banks while the sensor insists the mixture is rich, the sensor is disagreeing with the rest of the system — and the rest of the system is usually right.",
          "Bank 2 is your control group throughout. A fault that affects only Bank 1 sits in Bank 1 hardware. A fault that affects both banks is upstream of them, in fuel supply or air measurement.",
        ],
      },
      {
        heading: "Why this is the code where good sensors get thrown away",
        bullets: [
          "The code names a sensor, so the sensor gets replaced — even though the code describes what the sensor reported",
          "A new sensor in a genuinely rich engine reports exactly the same thing, and the code returns",
          "By then the diagnostic budget is spent and the actual fault is untouched",
          "Fuel trims answer the question in minutes and cost nothing to read",
          "On the 2.7L, a documented Ford bulletin points somewhere else entirely",
        ],
      },
    ],
    freezeFrame: [
      "Short and long-term fuel trim on both banks — the single most useful comparison for this code",
      "Oxygen sensor voltage or lambda at the moment the code set",
      "Engine coolant temperature, separating a cold-start-only fault from a fully warm one",
      "Engine load and rpm, since some fuel-control faults only appear at idle or only under load",
      "Any companion codes — the P2196/P2198/misfire/lean cluster is what Ford's bulletin describes",
      "Commanded and actual fuel rail pressure where your scan tool reports it",
    ],
    steps: [
      {
        title: "Identify your engine, then check bulletin coverage",
        detail:
          "If it is a 2.7L EcoBoost and several of the codes in the TSB cluster are stored, confirm whether TSB 20-2324 covers your VIN before anything else. That single check can redirect the entire repair away from parts that were never faulty.",
      },
      {
        title: "Compare the two banks before anything else",
        detail:
          "Bank 2 is your control group. If Bank 1 trims are strongly negative while Bank 2 sits normal, the rich condition is probably real. If both banks look normal and only the sensor reads odd, the sensor becomes the suspect.",
      },
      {
        title: "Watch the sensor respond to a forced change",
        detail:
          "Create a deliberate mixture change and watch the sensor. A working sensor moves quickly and decisively. One that is stuck rich barely moves at all, and that difference is the clearest evidence you can gather without removing anything.",
      },
      {
        title: "Inspect the harness and connector",
        detail:
          "Oxygen sensor wiring runs close to the exhaust and takes heat, vibration and road salt. Check for chafing, melted insulation and corroded terminals — an open or high-resistance circuit produces this code with a perfectly good sensor on the end of it.",
      },
      {
        title: "Check fuel pressure against commanded",
        detail:
          "Pressure above specification over-fuels every cylinder it feeds. Comparing commanded with actual pressure separates a fuel-delivery cause from a sensor cause quickly and without disassembly.",
      },
      {
        title: "Evaluate the MAF sensor",
        detail:
          "A dirty or drifting mass-airflow sensor distorts the PCM's picture of how much air the engine is taking in, which distorts fuelling. Compare its reading against expected airflow for the engine speed and load before assuming the fault is downstream.",
      },
      {
        title: "Test the injectors on Bank 1",
        detail:
          "A leaking or over-delivering injector produces a genuinely rich bank. If trim data says the mixture really is rich and pressure is correct, this is where to look — and on direct-injection engines it is also where Ford's bulletin points.",
      },
      {
        title: "Verify with trim data, not just a cleared code",
        detail:
          "After the repair, confirm Bank 1 trims sit near Bank 2 and that the sensor switches actively. A code that has not returned yet is not the same as fuel control that has been proven correct across the operating range.",
      },
    ],
    tsbs: [tsb202324],
    costs: [
      {
        job: "Fuel trim comparison",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Easy with a live-data scan tool",
        note: "Decides sensor versus rich engine before any money is spent",
      },
      {
        job: "Upstream O2 sensor (Bank 1 Sensor 1)",
        parts: "Varies by model year",
        shop: "Get a quote — access is usually good",
        diy: "Moderate — may need an O2 socket",
        note: "Only after trims and wiring have cleared the engine of being genuinely rich",
      },
      {
        job: "MAF sensor clean or replace",
        parts: "Low to moderate",
        shop: "Modest",
        diy: "Easy",
        note: "Use MAF-specific cleaner only; never touch the sensing element",
      },
      {
        job: "PCM reprogramming (per TSB)",
        parts: "—",
        shop: "Roughly $150–$250 plus any software fees",
        diy: "Dealer or equipped shop only",
        note: "Where TSB 20-2324 applies, this may be the whole repair",
      },
      {
        job: "Direct-injection injector replacement",
        parts: "Substantial on DI engines",
        shop: "Get a written quote",
        diy: "Advanced",
        note: "The other half of the TSB remedy on affected 2.7L trucks",
      },
      {
        job: "PCM replacement",
        parts: "Roughly $800–$1,200 module",
        shop: "Plus roughly $200–$300 labour and programming",
        diy: "Not a DIY job — requires VIN-matched programming",
        note: "Rare for this code; reprogramming is the far more common remedy",
      },
    ],
    dontReplace:
      "Do not replace the oxygen sensor as your first move. P2196 is exactly the code where a healthy sensor gets blamed for accurately reporting a rich engine. Check fuel trims on both banks first — if Bank 1 trims have gone strongly negative, the PCM already agrees the mixture is rich, and a new sensor will report the same thing for the same money. On a 2.7L EcoBoost, check TSB 20-2324 before you buy anything at all.",
    yearNotes: [
      "Bank 1 on the 5.0L V8 is the passenger-side bank containing cylinder 1. Sensor 1 is upstream of the catalytic converter. Confirm both before working, because replacing a downstream sensor will not address this code.",
      "On 2018 F-150 trucks with the 2.7L EcoBoost, Ford TSB 20-2324 links P2196 and its companion codes to PCM software and leaking direct-injection injectors rather than to the oxygen sensor.",
      "Sensor type and connector differ across model years. Match the part to your VIN rather than to a generic listing for the engine family.",
      "If your truck consumes oil or coolant, expect repeat sensor contamination. Fitting a replacement without addressing the consumption gives you the same code again later.",
    ],
    faqs: [
      {
        question: "What does P2196 mean on a Ford F-150?",
        answer:
          "The upstream oxygen sensor on Bank 1 is reporting a rich mixture and is not switching normally. Either the engine really is rich, or the sensor has failed in a way that makes it report rich regardless.",
      },
      {
        question: "Which sensor is Bank 1 Sensor 1?",
        answer:
          "The upstream sensor on the passenger-side bank — the bank containing cylinder 1 on the 5.0L V8. It sits before the catalytic converter, not after it.",
      },
      {
        question: "Do I need a new oxygen sensor?",
        answer:
          "Not necessarily, and this is the code most often fixed by replacing the wrong part. Check Bank 1 fuel trims first. Strongly negative trims mean the engine really is rich and the sensor is telling the truth.",
      },
      {
        question: "Is there a Ford bulletin for P2196?",
        answer:
          "Yes. TSB 20-2324, which supersedes 18-2310, covers some 2018 F-150 trucks with the 2.7L EcoBoost storing P2196 alongside P2198, misfire and lean codes. Ford attributes it to PCM software or leaking direct-injection injectors.",
      },
      {
        question: "How much does it cost to fix P2196?",
        answer:
          "It depends entirely on the cause. A MAF clean is trivial, a sensor is moderate, and PCM reprogramming under the TSB runs roughly $150–$250 plus software fees. Injector replacement on a direct-injection engine is substantially more, which is why the diagnosis matters.",
      },
      {
        question: "Can P2196 damage my catalytic converter?",
        answer:
          "A genuinely rich mixture can, yes. Excess fuel reaching the converter raises its temperature and shortens its life, which is why this is worth diagnosing promptly rather than driving on indefinitely.",
      },
      {
        question: "Why did P2196 come back after a new sensor?",
        answer:
          "Almost always because the engine was genuinely running rich and the original sensor was correct. Look at fuel pressure, injectors, the MAF sensor and — on a 2.7L — bulletin coverage.",
      },
      {
        question: "What is the difference between P2196 and P2198?",
        answer:
          "They are the same fault on opposite banks. P2196 is Bank 1 Sensor 1; P2198 is Bank 2 Sensor 1. Both appearing together points away from an individual sensor and toward something affecting the whole engine.",
      },
    ],
    closing: {
      title: "Proving fuel control is right again",
      paragraphs: [
        "The verification for P2196 is data, because the failure mode is a sensor that reports plausibly wrong values. A code that has not yet returned tells you very little on its own.",
        "Bring the engine to full operating temperature and compare the two banks. Bank 1 short and long-term trims should sit close to Bank 2, and the upstream sensor should switch actively rather than parking at one value. Then drive the load and temperature conditions from your original freeze frame and confirm it still behaves.",
        "If Bank 1 trims stay skewed after a sensor replacement, stop replacing sensors. That pattern means the mixture itself is wrong, and the answer is in fuel pressure, injectors, airflow measurement or — on an affected 2.7L — the bulletin remedy that was pointing away from the sensor all along.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsP2196, nhtsaTsb, fordManuals],
  },

  /* ------------------------------------------------------------------ P1000 */
  {
    slug: "ford/f-150/5-0/p1000",
    code: "P1000",
    title: "P1000 Code Ford F150: Why It Sets and How to Clear It",
    description:
      "P1000 is not a fault. It means your F-150 has not finished its OBD self-tests — here is the drive cycle that clears it and why it fails inspection.",
    definition: "OBD-II Monitor Testing Not Complete",
    severity: "Service soon",
    driveAdvice:
      "Drive normally. P1000 does not indicate anything wrong with the truck, and on its own it does not illuminate the check-engine light. The only thing it will stop you doing is passing an emissions inspection, because the testing station needs the self-tests finished before it can read a result.",
    quickAnswer:
      "P1000 is the code most often misunderstood, so here is the short version: it is not a fault, and there is nothing to repair. Your PCM runs a set of self-tests called monitors — catalyst, EVAP, oxygen sensor, misfire and others — and each needs specific conditions before it can run. P1000 simply means those tests have not all finished since the memory was last cleared. Disconnect the battery, clear codes after a repair, have a module reprogrammed, or in some cases have the truck towed, and P1000 appears by design. Driving the truck is what clears it.",
    symptoms: [
      {
        key: "after-clearing",
        label: "Appeared right after clearing codes or disconnecting the battery",
        response:
          "Exactly what should happen. Clearing memory resets every monitor to incomplete, and P1000 records that state. It will clear itself once the monitors have run, with no intervention from you.",
      },
      {
        key: "emissions-fail",
        label: "Emissions test rejected the truck",
        response:
          "The common real-world consequence. Testing stations need monitors to report ready, and P1000 means they are not. You need to complete the drive cycle before returning, not repair anything.",
      },
      {
        key: "after-battery",
        label: "Appeared after a battery replacement or jump start",
        response:
          "Normal. Losing power to the PCM resets monitor status. The same thing happens after a flat battery, and occasionally after the truck has been towed.",
      },
      {
        key: "no-symptoms",
        label: "No symptoms and no check-engine light",
        response:
          "Normal for P1000. It is an informational code rather than a fault, and by itself it does not illuminate the lamp. Drive the truck and let the monitors complete in their own time.",
      },
      {
        key: "wont-clear",
        label: "Will not clear no matter how much you drive",
        response:
          "This is the case worth investigating. If P1000 persists across a lot of varied driving, a monitor is being blocked — often by another stored fault in the system that monitor tests, or because the specific drive conditions it needs have not been met.",
      },
      {
        key: "with-other-codes",
        label: "Stored alongside other trouble codes",
        response:
          "Then the other codes are your actual job. A monitor will not run while there is an active fault in the system it tests, so P1000 will keep reappearing until the real fault is repaired.",
      },
    ],
    causes: [
      {
        cause: "Codes were recently cleared",
        evidence:
          "A repair, code clear or scan-tool reset happened shortly before P1000 appeared",
        firstTest:
          "Check monitor readiness status on a scan tool and see how many monitors report incomplete",
      },
      {
        cause: "Battery disconnected, flat or jump-started",
        evidence:
          "Battery replacement, a jump start, a flat battery or a tow in the recent history",
        firstTest:
          "Confirm readiness status and simply complete a drive cycle before assuming a fault exists",
      },
      {
        cause: "Drive cycle conditions not yet met",
        evidence:
          "Truck is used only for short trips, or only for one kind of driving such as low-speed town use",
        firstTest:
          "Identify which specific monitors are incomplete, then drive the conditions those monitors require",
      },
      {
        cause: "Another stored fault is blocking a monitor",
        evidence:
          "Other codes present alongside P1000, and the same monitors never complete no matter how far you drive",
        firstTest:
          "Read all stored codes; a monitor will not run while a fault in its own system is active",
      },
      {
        cause: "Fuel level outside the required window",
        evidence:
          "The EVAP monitor in particular stays incomplete while the tank is nearly full or nearly empty",
        firstTest:
          "Check fuel level against the range the EVAP monitor needs and adjust before repeating the drive cycle",
      },
    ],
    deepDive: [
      {
        heading: "A drive cycle that actually completes the monitors",
        paragraphs: [
          "The single most common reason P1000 lingers is that the truck is being driven, but not in the variety of conditions the monitors need. Ten minutes of stop-start town driving every day can leave monitors incomplete for weeks.",
          "Plan one deliberate drive instead. Park overnight so the engine starts genuinely cold — several monitors will not run without a proper cold start. Keep the fuel tank somewhere around half full, because the EVAP monitor is gated on fuel level and is usually the last to complete. Then drive a mix: a period of steady road speed, some town-speed work, and a few decelerations where you come off the throttle and let the truck slow without braking hard.",
          "Fifteen to twenty minutes of that mixture will complete most monitors. The EVAP monitor may need a second cycle on another day, which is normal rather than a sign of a problem.",
        ],
      },
      {
        heading: "Read readiness status, not just codes",
        paragraphs: [
          "Almost every scan tool will show monitor readiness alongside stored codes, and that screen turns P1000 from guesswork into a checklist. It tells you exactly which tests are outstanding — catalyst, EVAP, oxygen sensor, EGR, secondary air, and so on.",
          "That matters because different monitors need genuinely different driving. If only the catalyst monitor is outstanding, you need sustained steady cruise. If only EVAP is outstanding, you need the right fuel level and a cold start rather than more miles. Driving randomly and hoping is how a two-day job becomes a three-week one.",
        ],
      },
      {
        heading: "When P1000 is genuinely telling you something",
        bullets: [
          "It persists after several proper drive cycles — a monitor is being blocked rather than simply unrun",
          "The same specific monitor never completes while others do — look at faults in that system",
          "Other codes are stored alongside it — repair those first; the monitor cannot run around them",
          "It reappears immediately every time — check whether something is clearing memory, such as a failing battery connection",
          "It appears with no clearing or battery event in the history — worth confirming nothing is resetting the PCM",
        ],
      },
    ],
    freezeFrame: [
      "Monitor readiness status — which specific monitors are complete and which are not is the whole diagnosis here",
      "Any other stored or pending codes, since an active fault will block its own monitor from running",
      "Fuel level, which gates the EVAP monitor in particular",
      "Ambient and coolant temperature, because several monitors only run inside a temperature window",
      "Distance and drive cycles since the memory was cleared",
      "Whether the check-engine lamp is on, which distinguishes a plain P1000 from P1000 alongside a real fault",
    ],
    steps: [
      {
        title: "Confirm P1000 is the only code",
        detail:
          "Read everything stored. P1000 on its own means the tests have not finished. P1000 alongside other codes means you have a real fault to repair first, and that fault is very likely why a monitor cannot complete.",
      },
      {
        title: "Read monitor readiness, not just codes",
        detail:
          "Your scan tool can show which monitors are complete and which are not. That list tells you exactly what kind of driving is still needed, instead of guessing at it and burning fuel on the wrong conditions.",
      },
      {
        title: "Repair any genuine faults first",
        detail:
          "A monitor will not run while there is an active fault in the system it tests. Chasing P1000 before fixing a stored EVAP or misfire code wastes days and gets you nowhere.",
      },
      {
        title: "Set the tank to a middle fuel level",
        detail:
          "The EVAP monitor is usually the last to complete, and it needs the tank in a specific range — roughly middling rather than full or nearly empty. Getting this right first saves repeat attempts.",
      },
      {
        title: "Start from a genuine cold start",
        detail:
          "Several monitors only run after the engine has sat long enough to cool fully. An overnight park followed by a normal drive does more for readiness than an hour of restarts on a warm engine.",
      },
      {
        title: "Drive a genuine mixed cycle",
        detail:
          "Monitors need variety: idling, steady cruise at road speed, town-speed driving and some decelerations. Fifteen to twenty minutes of mixed driving completes most of them. A truck used only for short town trips can go weeks without ever meeting the conditions.",
      },
      {
        title: "Recheck readiness before returning for testing",
        detail:
          "Check the monitor status again rather than assuming enough driving has happened. Arriving at an inspection station with monitors still incomplete simply repeats the rejection and costs you another test fee.",
      },
      {
        title: "Investigate only if it will not complete",
        detail:
          "If specific monitors still refuse to complete after several proper attempts, stop driving and start diagnosing. A monitor that will not run is usually blocked by a fault in the system it tests, and that fault is the real job.",
      },
    ],
    costs: [
      {
        job: "Completing the drive cycle",
        parts: "$0",
        shop: "$0",
        diy: "Easy — just fuel and time",
        note: "This is the entire repair in the overwhelming majority of cases",
      },
      {
        job: "Scan-tool readiness check",
        parts: "$0",
        shop: "Often free at a parts store",
        diy: "Easy with any basic scan tool",
        note: "Turns guesswork into a checklist of what still needs to run",
      },
      {
        job: "Diagnosing a blocked monitor",
        parts: "$0",
        shop: "Standard diagnostic fee",
        diy: "Moderate",
        note: "Only needed when P1000 persists after several proper drive cycles",
      },
      {
        job: "Repairing the underlying fault",
        parts: "Depends entirely on the fault",
        shop: "Depends entirely on the fault",
        diy: "Varies",
        note: "The cost belongs to that fault's own code, not to P1000",
      },
      {
        job: "Re-test at an inspection station",
        parts: "—",
        shop: "Local test fee",
        diy: "—",
        note: "Check readiness before you go, so you only pay once",
      },
    ],
    dontReplace:
      "Do not let anyone sell you parts for P1000. There is nothing to repair — the code reports that self-tests have not finished, not that something has failed. If a shop quotes a repair for P1000 by itself, ask which monitors are incomplete and why. The honest answer is that the truck needs driving in the right conditions, and that costs nothing but fuel.",
    yearNotes: [
      "P1000 is Ford-specific. Other manufacturers report incomplete monitors differently, so generic code lists often describe it poorly or treat it as a fault when it is not one.",
      "The exact drive cycle Ford specifies varies by model year and engine. Use the procedure for your truck rather than a universal drive cycle copied from a forum post.",
      "Trucks driven mainly on short trips struggle to complete monitors at all. If yours does short runs only, plan a deliberate longer drive rather than waiting for it to happen naturally.",
      "Some model years complete monitors noticeably faster than others. Persistence over a few days is normal; persistence over several weeks of varied driving is not.",
    ],
    faqs: [
      {
        question: "Is P1000 a serious problem?",
        answer:
          "No. It means your truck's OBD self-tests have not all finished since the memory was last cleared. It is informational, and on its own it does not illuminate the check-engine light.",
      },
      {
        question: "How do I clear P1000 on a Ford F-150?",
        answer:
          "You do not clear it directly — it clears itself once all monitors have run. That needs a proper drive cycle including a genuine cold start, steady road speed, town-speed driving and some decelerations. Fifteen to twenty minutes of mixed driving completes most monitors.",
      },
      {
        question: "How long does it take for P1000 to go away?",
        answer:
          "Anywhere from one good mixed drive to several days, depending on how you use the truck and which monitors are outstanding. The EVAP monitor is usually the last to complete because it needs particular fuel-level and temperature conditions.",
      },
      {
        question: "Why does P1000 keep coming back?",
        answer:
          "Either the codes are being cleared repeatedly, or another stored fault is blocking a monitor from running. Read all stored codes and check monitor readiness rather than clearing again and hoping.",
      },
      {
        question: "Can I pass an emissions test with P1000?",
        answer:
          "Generally no. Testing stations require monitors to report ready, and P1000 means they are not. Complete the drive cycle first, check readiness on a scan tool, then return.",
      },
      {
        question: "Does P1000 turn on the check-engine light?",
        answer:
          "Not by itself. If your lamp is on and P1000 is stored, read the codes again — there is almost certainly something else stored that is both illuminating the lamp and blocking a monitor.",
      },
      {
        question: "Do I need a scan tool to fix P1000?",
        answer:
          "You do not need one to clear it, since driving does that. But a scan tool that reads monitor readiness saves considerable time by telling you which specific tests are outstanding rather than leaving you to guess.",
      },
      {
        question: "Can towing the truck set P1000?",
        answer:
          "It can, in some circumstances. Anything that interrupts power to the PCM or resets its memory can set the code, which is why it sometimes appears after a tow, a jump start or a flat battery.",
      },
    ],
    closing: {
      title: "Getting the monitors to complete without wasting a week",
      paragraphs: [
        "The most efficient approach to P1000 is to stop guessing and read monitor readiness. That single screen tells you which tests are outstanding, and different monitors need genuinely different driving conditions.",
        "Plan one deliberate drive rather than hoping normal use gets there. Park overnight so the engine starts genuinely cold, keep the tank around half full for the EVAP monitor, then drive a mix of steady road speed, some town work and a few decelerations without touching the throttle. Most monitors complete within one or two cycles of that kind.",
        "If specific monitors still refuse to complete after several proper attempts, stop driving and start diagnosing. A monitor that will not run is usually being blocked by a fault in the system it tests, and that fault — not P1000 — is the real job.",
      ],
    },
    sources: [fordObd2017, fordObd2024, fordDriveCycle, fordManuals],
  },
];
