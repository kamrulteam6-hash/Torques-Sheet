import type { TroubleCodeGuide } from "./trouble-code-data";
import { fordManuals, fordObd2017, fordObd2024, nhtsaTsb } from "./trouble-code-sources";
import {
  explorerVehicle,
  goPartsExplorerBank,
  goPartsExplorerP0420,
  goPartsExplorerWaterPump,
} from "./trouble-code-explorer";

/** Explorer emissions and fuel-control codes: P0420, P2196, P0456, P1450. */
export const troubleCodeExplorerEmissions: TroubleCodeGuide[] = [
  /* ------------------------------------------------------------------ P0420 */
  {
    slug: "ford/explorer/p0420",
    code: "P0420",
    title: "P0420 Code Ford Explorer: Catalyst Causes & Real Fixes",
    description:
      "P0420 on a Ford Explorer names Bank 1 — the rear bank on the V6. Why converters rarely fail alone, what kills them here, and costs.",
    definition: "Catalyst System Efficiency Below Threshold (Bank 1)",
    severity: "Service soon",
    vehicle: explorerVehicle,
    driveAdvice:
      "A steady P0420 on its own is not an emergency, but what caused it might be. If misfire, coolant or oil is reaching the exhaust, driving on will destroy the replacement converter as surely as it destroyed the first. Stop if the lamp begins flashing, if power falls away, or if you can smell an overheating converter.",
    quickAnswer:
      "P0420 means your Explorer's catalyst monitor tested Bank 1's converter and found oxygen-storage performance below threshold. Two things matter here that generic advice misses. First, a converter with no moving parts rarely fails on its own — it is usually killed by misfire, a wrong mixture, or oil and coolant reaching the exhaust. Second, on a V6 Explorer this code names one specific bank, and on the 2011–2019 transverse engines Bank 1 is the rear bank against the firewall. That is both a diagnostic clue and a warning about the labour bill.",
    symptoms: [
      {
        key: "light-only",
        label: "Check-engine light with no change in how it drives",
        response:
          "The usual presentation. The catalyst monitor is an emissions test rather than a drivability one, so the engine can feel completely normal while failing it.",
      },
      {
        key: "emissions-fail",
        label: "Failed an emissions inspection",
        response:
          "Expected with this code. Repair the upstream cause first, then allow the catalyst monitor to run and pass before returning — it needs specific sustained conditions and will not complete immediately.",
      },
      {
        key: "misfire",
        label: "Misfire codes stored alongside",
        response:
          "This is your actual job. Misfire pushes unburned fuel into the exhaust, which overheats the converter and destroys it. Repair the misfire first, then reassess whether the converter is genuinely finished.",
      },
      {
        key: "milky-oil",
        label: "Milky oil or coolant loss with no visible leak",
        response:
          "On the 3.5L or 3.7L V6, take this seriously. The internal water pump can leak coolant into the oil, and coolant reaching the exhaust contaminates a converter permanently.",
      },
      {
        key: "oil-use",
        label: "Using oil between changes",
        response:
          "Oil reaching the combustion chamber coats the converter internals and reduces efficiency permanently. Address the consumption or the replacement converter will follow the original.",
      },
      {
        key: "only-bank1",
        label: "P0420 but no P0430",
        response:
          "Useful information on a V6. A fault affecting only Bank 1 sits in Bank 1 hardware — that converter, that bank's sensors, or an exhaust leak on that side. Both banks failing points at something affecting the whole engine.",
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
        cause: "Coolant or oil contamination",
        evidence:
          "Milky oil, coolant loss with no external leak, oil consumption, white smoke or a sweet smell",
        firstTest:
          "Inspect the oil and run a combustion-gas test — on the V6 this points at the internal water pump",
      },
      {
        cause: "Oxygen sensor performance or bias",
        evidence:
          "Downstream sensor mirrors the upstream too closely; slow switching; sensor codes stored",
        firstTest:
          "Graph both Bank 1 sensors and compare their behaviour",
      },
      {
        cause: "Exhaust leak before or between sensors",
        evidence:
          "Ticking that changes with rpm; leak at a manifold or flange upstream of the downstream sensor",
        firstTest:
          "Inspect the Bank 1 exhaust from the head to the downstream sensor — rear-bank access is restricted",
      },
      {
        cause: "Rich or lean fuel-control fault",
        evidence:
          "Bank 1 fuel trims well away from zero; lean or rich codes stored alongside",
        firstTest:
          "Read trims on both banks and resolve any mixture fault before condemning the catalyst",
      },
      {
        cause: "Genuinely failed catalytic converter",
        evidence:
          "All of the above eliminated; high mileage or physical damage; monitor still fails after upstream repairs",
        firstTest:
          "Only after the causes above have been ruled out by testing rather than assumption",
      },
    ],
    deepDive: [
      {
        heading: "Bank 1 is the rear bank — and that changes the quote",
        paragraphs: [
          "On the 2011–2019 Explorer with a transverse V6, Bank 1 is the rear bank against the firewall, containing cylinders 1, 2 and 3. Bank 2 is the front bank nearest the radiator.",
          "For a catalyst code that has two consequences. The diagnostic one is useful: P0420 without P0430 tells you the problem is on the rear bank specifically, which narrows what you inspect. The practical one is less welcome — anything requiring access to the rear-bank exhaust, sensors or converter is harder and more expensive than the same work on the front.",
          "If a shop has quoted you for a converter on this vehicle, confirm they have identified which bank. A quote based on front-bank access applied to a rear-bank job will not hold, and a quote for both converters when only one has failed is money you did not need to spend.",
        ],
      },
      {
        heading: "On the V6, check the oil before the converter",
        paragraphs: [
          "The 3.5L and 3.7L V6 engines use a water pump mounted inside the engine and driven by the timing chain. When its seal fails, coolant leaks into the oil rather than onto the ground.",
          "That matters for a catalyst code because coolant that reaches the combustion chambers ends up in the exhaust, and the exhaust is where your converter lives. Coolant contamination coats a converter's internals and reduces its efficiency permanently — a new converter fitted to an engine still doing this will fail the same way.",
          "The check is free. Pull the dipstick. Milky or coffee-coloured oil, or a level that has risen rather than fallen, means coolant is getting in. Combined with coolant disappearing and no puddle underneath, that pattern belongs at the start of a P0420 diagnosis on these engines rather than at the end.",
        ],
      },
      {
        heading: "How the monitor decides, and what else can fail it",
        paragraphs: [
          "The PCM compares the upstream oxygen sensor against the downstream one. A healthy converter stores and releases oxygen, which smooths the downstream signal — the upstream sensor swings, the downstream one stays comparatively flat. When the downstream sensor starts mirroring the upstream closely, the monitor concludes oxygen storage has fallen below threshold.",
          "The consequence of that logic is that anything disturbing either sensor can fail the test with a perfectly good converter behind it. An exhaust leak between the two sensors admits outside air and distorts the comparison. A slow or biased downstream sensor produces a similar picture. Both are far cheaper than a converter, and both are worth eliminating first.",
        ],
      },
      {
        heading: "Before you authorise a converter, ask for these",
        bullets: [
          "Which bank has failed, and confirmation that it is the rear bank if this is a transverse V6",
          "Evidence that no misfire is present now or in the recent history",
          "Bank 1 fuel trim data showing mixture control is correct at idle and under load",
          "Confirmation there is no exhaust leak between the head and the downstream sensor",
          "On a V6, confirmation that the oil is not contaminated with coolant",
          "Oxygen sensor waveforms showing the downstream sensor responds correctly",
        ],
      },
    ],
    freezeFrame: [
      "Upstream and downstream Bank 1 oxygen sensor activity when the monitor ran",
      "Short and long-term fuel trim on both banks, which reveal a mixture fault damaging the converter",
      "Engine coolant temperature and run time, confirming the monitor ran under valid conditions",
      "Vehicle speed and load, since the catalyst monitor needs sustained steady operation",
      "Any companion codes — misfire, lean, rich, P0430 or sensor codes redirect the diagnosis",
      "Whether the code is current or historic, and drive cycles since it set",
    ],
    steps: [
      {
        title: "Read every stored and pending code first",
        detail:
          "A misfire or fuel-trim code alongside P0420 is not a coincidence — it is very likely the cause. Repair those first and reassess the converter afterwards.",
      },
      {
        title: "Check the oil on a V6 Explorer",
        detail:
          "Milky oil means coolant is entering the engine from the internal water pump, and coolant reaching the exhaust contaminates converters. This free check belongs before any converter conversation.",
      },
      {
        title: "Confirm which bank failed",
        detail:
          "P0420 is Bank 1; P0430 is Bank 2. On the 2011–2019 transverse V6, Bank 1 is the rear bank, which affects both what you inspect and what the labour will cost.",
      },
      {
        title: "Read fuel trims on both banks",
        detail:
          "Trims well away from zero mean the mixture is wrong, and a converter cannot do its job on a mixture it was not designed for. Bank 2 also gives you a control group.",
      },
      {
        title: "Inspect the Bank 1 exhaust for leaks",
        detail:
          "Check from the cylinder head through to the downstream sensor. A leak between sensors admits outside air and can fail the monitor with a healthy converter fitted. Rear-bank access is restricted, so allow time.",
      },
      {
        title: "Graph both Bank 1 oxygen sensors",
        detail:
          "Watch the upstream sensor swinging and the downstream one responding. A downstream sensor mirroring the upstream too closely is the monitor's evidence — but a slow sensor produces the same picture for far less money.",
      },
      {
        title: "Investigate oil consumption if present",
        detail:
          "Oil reaching the exhaust coats the converter permanently. If the engine uses oil between changes, that needs addressing or the replacement will degrade the same way.",
      },
      {
        title: "Complete the drive cycle after repair",
        detail:
          "The catalyst monitor needs sustained steady driving before it will run again. Do not judge the repair — or return for an emissions test — until it has actually completed.",
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
        job: "Oil and coolant inspection",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Trivial",
        note: "Essential on a V6 Explorer before authorising a converter",
      },
      {
        job: "Exhaust leak repair",
        parts: "Low — gasket or clamp",
        shop: "Higher on the rear bank",
        diy: "Moderate to advanced",
        note: "Cheap cause that mimics a failed converter",
      },
      {
        job: "Downstream oxygen sensor — Bank 1",
        parts: "Moderate",
        shop: "Rear-bank access raises the labour",
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
        job: "Catalytic converter — Bank 1",
        parts: "Substantial",
        shop: "Get a written quote naming the bank",
        diy: "Advanced",
        note: "Confirm the shop has identified which bank before agreeing",
      },
    ],
    dontReplace:
      "Do not buy a catalytic converter on the strength of this code alone, and do not accept a quote for both converters when only Bank 1 has failed. A converter with no moving parts does not usually fail by itself — misfire, a wrong mixture, or oil and coolant reaching the exhaust are what kill it. On a V6 Explorer, check the oil for coolant contamination first. Ask any shop quoting a converter to name the bank and the reason the original failed.",
    yearNotes: [
      "On the 2011–2019 transverse V6, Bank 1 is the rear bank against the firewall. P0420 therefore points at the harder-to-access side, which affects the labour quote.",
      "P0430 is the same fault on Bank 2. Only one code stored means only one bank has failed, and only one converter needs consideration.",
      "The 3.5L and 3.7L V6 use an internal water pump that can leak coolant into the oil; coolant reaching the exhaust contaminates converters permanently.",
      "Federal and California emissions applications may require different converters. Confirm which your vehicle is certified to, because the wrong part can fail the monitor even when new.",
    ],
    faqs: [
      {
        question: "What does P0420 mean on a Ford Explorer?",
        answer:
          "That the catalyst monitor measured Bank 1's converter oxygen-storage performance and found it below threshold. It is a test result, not proof the converter is the first thing that failed.",
      },
      {
        question: "Which bank is Bank 1 on my Explorer?",
        answer:
          "On the 2011–2019 transverse V6 it is the rear bank against the firewall, containing cylinders 1, 2 and 3. Confirm separately for 2020-onward vehicles, which use a longitudinal layout.",
      },
      {
        question: "Do I need a new catalytic converter?",
        answer:
          "Not necessarily, and not first. Misfire, a wrong mixture, an exhaust leak, a lazy oxygen sensor and oil or coolant contamination can all fail this test. Rule those out before spending.",
      },
      {
        question: "Do I need to replace both converters?",
        answer:
          "Not if only P0420 is stored. That names Bank 1 alone. P0430 would indicate Bank 2. Replacing both when one has failed is a common and expensive mistake.",
      },
      {
        question: "Can coolant damage a catalytic converter?",
        answer:
          "Yes, and it matters on the V6 Explorer. The internal water pump can leak coolant into the oil, and coolant reaching the combustion chambers ends up in the exhaust where it contaminates the converter.",
      },
      {
        question: "Why did my new converter fail again?",
        answer:
          "Because whatever destroyed the first one was never fixed. Misfire, a wrong mixture, or oil and coolant reaching the exhaust will consume a replacement just as quickly.",
      },
      {
        question: "Will an oxygen sensor fix P0420?",
        answer:
          "Sometimes, if the downstream sensor is genuinely slow or biased. Check its waveform first — a sensor fitted on a guess is a common way to spend money without changing anything.",
      },
      {
        question: "How long before the monitor runs again after a repair?",
        answer:
          "The catalyst monitor needs sustained steady driving under specific conditions, so it can take several drive cycles. Check monitor readiness before returning for an emissions test.",
      },
    ],
    closing: {
      title: "Closing out a P0420 properly",
      paragraphs: [
        "The measure of a good P0420 repair is not that the light went out. It is whether somebody can tell you why the converter stopped working.",
        "After repairing the upstream cause, complete the drive cycle and confirm the catalyst monitor runs and passes rather than simply noting the lamp is off. The monitor needs specific sustained conditions.",
        "If a converter was replaced, keep the documentation showing what was found and corrected alongside it — and confirm the invoice names the bank. If the code returns later, that record is the difference between a warranty conversation and starting the diagnosis again from nothing.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsExplorerP0420, goPartsExplorerWaterPump, nhtsaTsb, fordManuals],
  },

  /* ------------------------------------------------------------------ P2196 */
  {
    slug: "ford/explorer/p2196",
    code: "P2196",
    title: "P2196 Code Ford Explorer: O2 Sensor Stuck Rich Diagnosis",
    description:
      "P2196 on a Ford Explorer names Bank 1 — the rear bank on the V6. How to tell a failed sensor from a genuinely rich engine, and costs.",
    definition: "O2 Sensor Signal Biased/Stuck Rich (Bank 1, Sensor 1)",
    severity: "Diagnose promptly",
    vehicle: explorerVehicle,
    driveAdvice:
      "The Explorer will usually drive, but fuel control on Bank 1 is compromised and that has consequences. A genuinely rich mixture wastes fuel, dilutes engine oil and can overheat a catalytic converter. Get it diagnosed before it becomes a converter bill, and stop if the engine misfires or the lamp begins flashing.",
    quickAnswer:
      "P2196 means the upstream oxygen sensor on Bank 1 is reporting a rich mixture and staying there rather than switching the way a working sensor should. There are only two real possibilities: either the engine truly is running rich and the sensor is accurate, or the sensor has failed in a way that makes it report rich regardless. On a V6 Explorer you have a genuine advantage in settling that — Bank 2 acts as a control group. And on the 2011–2019 transverse engines, Bank 1 is the rear bank against the firewall, so confirm the location before planning any access.",
    symptoms: [
      {
        key: "economy",
        label: "Fuel economy has dropped noticeably",
        response:
          "Consistent with a genuinely rich condition. Check long-term fuel trim on Bank 1 — strongly negative means the PCM is actively pulling fuel out, which suggests the rich reading is real.",
      },
      {
        key: "bank-compare",
        label: "Bank 1 trims negative, Bank 2 normal",
        response:
          "The most useful observation on this page. A mixture fault confined to one bank sits in that bank's hardware — an injector, fuel supply to that bank, or the sensor itself.",
      },
      {
        key: "both-banks",
        label: "P2198 stored alongside P2196",
        response:
          "Both banks reporting rich points away from an individual sensor and toward something affecting the whole engine — fuel pressure, the MAF sensor, or a calibration issue.",
      },
      {
        key: "fuel-smell",
        label: "Fuel smell from the exhaust or in the oil",
        response:
          "Points toward an actually rich mixture. Fuel in the oil is particularly worth acting on — it dilutes the lubricant and reduces its ability to protect the engine.",
      },
      {
        key: "black-smoke",
        label: "Black smoke from the tailpipe",
        response:
          "Unambiguous evidence of a rich mixture. The sensor is telling the truth. Stop looking at it and start looking at what is delivering too much fuel.",
      },
      {
        key: "light-only",
        label: "Light on but it drives normally",
        response:
          "More consistent with a biased sensor than a genuinely rich engine. If both banks' trims sit near zero while the sensor insists the mixture is rich, the sensor is disagreeing with the rest of the system.",
      },
    ],
    causes: [
      {
        cause: "Genuinely rich mixture on Bank 1",
        evidence:
          "Bank 1 long-term fuel trim strongly negative while Bank 2 is normal; sooty plugs on that bank",
        firstTest:
          "Compare Bank 1 and Bank 2 trims — this is the comparison a four-cylinder owner does not get",
      },
      {
        cause: "Contaminated or failed sensor",
        evidence:
          "Sensor voltage sits high and does not respond to a forced mixture change; Bank 2 behaves normally",
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
          "Fuel pressure above specification; one cylinder on Bank 1 noticeably richer than the rest",
        firstTest:
          "Compare commanded against actual fuel pressure, then test injectors on that bank",
      },
      {
        cause: "Dirty or drifting MAF sensor",
        evidence:
          "Both banks affected; airflow reading does not match expected values for load",
        firstTest:
          "Inspect and clean the MAF, then recheck airflow against expected values",
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
        heading: "Bank 2 is your control group — use it",
        paragraphs: [
          "This is the advantage a V6 Explorer gives you that a four-cylinder does not, and it settles the central question of this code faster than anything else.",
          "If the engine is genuinely running rich on Bank 1, the PCM will be actively removing fuel from that bank and long-term fuel trim will sit noticeably negative there — while Bank 2, with no such problem, sits near zero. The two banks disagreeing tells you the fault is real and physically located on Bank 1.",
          "If instead both banks read near zero while the Bank 1 sensor insists the mixture is rich, the sensor is disagreeing with the rest of the system, and the rest of the system is usually right. That points at the sensor, its wiring or its connector.",
          "And if both banks show a strongly negative trim together, the cause is upstream of the split — fuel pressure, the MAF sensor, or something affecting the whole engine's fuelling. In that case P2198 is often stored alongside P2196.",
        ],
      },
      {
        heading: "Where the Bank 1 sensor actually is",
        paragraphs: [
          "On the 2011–2019 transverse V6, Bank 1 is the rear bank against the firewall. Sensor 1 is the upstream sensor on that bank, before the catalytic converter.",
          "Access is restricted, which affects both the diagnosis and the labour cost. Inspecting the harness properly, or replacing the sensor, is a longer job than the equivalent on the front bank — and a quote that assumed front-bank access will not hold.",
          "Do not confuse Sensor 1 with Sensor 2. Sensor 2 is downstream of the converter and does a different job; replacing it will not address this code. Confirm both the bank and the position before ordering a part.",
        ],
      },
      {
        heading: "Why this is the code where good sensors get thrown away",
        bullets: [
          "The code names a sensor, so the sensor gets replaced — even though it describes what the sensor reported",
          "A new sensor in a genuinely rich engine reports exactly the same thing and the code returns",
          "By then the diagnostic budget is spent and the real fault is untouched",
          "The Bank 1 versus Bank 2 trim comparison answers the question in minutes and costs nothing",
          "On the rear bank, replacing a sensor you did not need is more expensive than on a four-cylinder",
        ],
      },
      {
        heading: "What a rich mixture is doing while you decide",
        paragraphs: [
          "This is not a code to leave indefinitely. Excess fuel reaching the exhaust raises catalytic converter temperature and shortens its life, which turns a moderate repair into a much larger one — and on this vehicle that converter is on the rear bank where replacement costs more.",
          "Excess fuel also washes past the piston rings into the oil. Fuel dilution reduces the oil's ability to protect bearings and cylinder walls, and it accumulates the longer the condition continues. If you can smell fuel in the oil, change it once the fault is repaired.",
        ],
      },
    ],
    freezeFrame: [
      "Short and long-term fuel trim on both banks — the single most useful measurement available on a V6",
      "Bank 1 oxygen sensor voltage or lambda at the moment the code set",
      "Mass airflow reading against engine speed and load",
      "Engine coolant temperature, separating a cold-start-only fault from a fully warm one",
      "Commanded and actual fuel rail pressure where reported",
      "Any companion codes — P2198, misfire codes or MAF performance codes change the order of work",
    ],
    steps: [
      {
        title: "Compare Bank 1 and Bank 2 trims first",
        detail:
          "One bank negative with the other normal means a real, bank-specific rich condition. Both near zero with the sensor reporting rich points at the sensor. Both negative points upstream. This single reading directs everything after it.",
      },
      {
        title: "Confirm which bank and which sensor",
        detail:
          "On the 2011–2019 transverse V6, Bank 1 is the rear bank and Sensor 1 is upstream of the converter. Getting this wrong means working on the wrong side of the engine or the wrong sensor entirely.",
      },
      {
        title: "Watch the sensor respond to a forced change",
        detail:
          "Create a deliberate mixture change and watch it. A working sensor moves quickly; one that is stuck barely moves at all. That difference is the clearest evidence available without removing anything.",
      },
      {
        title: "Inspect the harness and connector",
        detail:
          "Oxygen sensor wiring runs close to the exhaust and takes heat, vibration and road salt. On the rear bank this needs proper access, but an open or high-resistance circuit produces this code with a good sensor fitted.",
      },
      {
        title: "Compare commanded against actual fuel pressure",
        detail:
          "Pressure above specification over-fuels every cylinder it feeds and would affect both banks. This test separates a fuel-delivery cause from a bank-specific one quickly.",
      },
      {
        title: "Inspect and clean the MAF sensor",
        detail:
          "Particularly if both banks are affected. A drifting MAF distorts the PCM's picture of airflow and therefore its fuelling, and cleaning is inexpensive.",
      },
      {
        title: "Test injector delivery on Bank 1",
        detail:
          "A leaking or over-delivering injector produces a genuinely rich bank. If trim data says the mixture really is rich on Bank 1 only and pressure is correct, this is where to look.",
      },
      {
        title: "Verify with trim data after repair",
        detail:
          "Confirm Bank 1 trims return near Bank 2 and the sensor switches actively. A code that has not returned is not the same as fuel control proven correct.",
      },
    ],
    costs: [
      {
        job: "Bank 1 versus Bank 2 trim comparison",
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
        note: "Worth doing when both banks are affected",
      },
      {
        job: "Upstream O2 sensor — Bank 1",
        parts: "Moderate",
        shop: "Rear-bank access raises labour",
        diy: "Moderate to advanced",
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
        diy: "Advanced",
        note: "Rear-bank injectors cost more in labour than front-bank",
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
      "Do not replace the oxygen sensor as your first move — and on a V6 Explorer that advice carries extra weight, because the Bank 1 sensor is on the rear bank where the labour costs more. Compare Bank 1 and Bank 2 fuel trims first. If Bank 1 trims are strongly negative, the PCM already agrees the mixture is rich and a new sensor will report exactly the same thing.",
    yearNotes: [
      "On the 2011–2019 transverse V6, Bank 1 is the rear bank against the firewall. Sensor 1 is upstream of the converter on that bank.",
      "P2198 is the same fault on Bank 2. Both codes together point away from an individual sensor and toward something affecting the whole engine.",
      "Sensor type and connector differ across model years and engines. Match the part to the VIN rather than to a generic listing.",
      "If the engine consumes oil or loses coolant, expect repeat sensor contamination. Replacing the sensor without addressing the consumption returns the same code later.",
    ],
    faqs: [
      {
        question: "What does P2196 mean on a Ford Explorer?",
        answer:
          "The upstream oxygen sensor on Bank 1 is reporting a rich mixture and not switching normally. Either the engine really is rich on that bank, or the sensor has failed in a way that makes it report rich.",
      },
      {
        question: "Which sensor is Bank 1 Sensor 1 on my Explorer?",
        answer:
          "The upstream sensor on Bank 1, before the catalytic converter. On the 2011–2019 transverse V6, Bank 1 is the rear bank against the firewall.",
      },
      {
        question: "Do I need a new oxygen sensor?",
        answer:
          "Not necessarily, and this is the code most often fixed by replacing the wrong part. Compare Bank 1 and Bank 2 fuel trims first — strongly negative Bank 1 trims mean the engine really is rich.",
      },
      {
        question: "What does P2196 with P2198 mean?",
        answer:
          "Both banks are reporting rich, which points away from an individual sensor and toward something affecting the whole engine — fuel pressure, the MAF sensor or a calibration issue.",
      },
      {
        question: "Why is this more expensive to fix on an Explorer?",
        answer:
          "Because the Bank 1 sensor sits on the rear bank of the transverse V6, where access is restricted. The part costs the same but the labour is higher than the equivalent front-bank job.",
      },
      {
        question: "Can P2196 damage my catalytic converter?",
        answer:
          "A genuinely rich mixture can, yes. Excess fuel raises converter temperature and shortens its life — and on this vehicle the Bank 1 converter is the more expensive one to replace.",
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
        "Bring the engine to full operating temperature and compare the two banks again. Bank 1 short and long-term trims should sit close to Bank 2, and the upstream sensor should switch actively rather than parking at one value. Then drive the conditions from your original freeze frame and confirm it still behaves.",
        "If Bank 1 trims stay skewed after a sensor replacement, stop replacing sensors. That pattern means the mixture itself is wrong, and the answer is in fuel pressure, injectors or airflow measurement — which is what the sensor was reporting accurately all along.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsExplorerBank, nhtsaTsb, fordManuals],
  },

  /* ------------------------------------------------------------------ P0456 */
  {
    slug: "ford/explorer/p0456",
    code: "P0456",
    title: "P0456 Code Ford Explorer: Small EVAP Leak Causes & Fixes",
    description:
      "P0456 means a 0.020-inch EVAP leak on your Explorer. Why the fuel cap comes first, what a smoke test costs, and when it gets expensive.",
    definition: "Evaporative Emission System Leak Detected (very small leak)",
    severity: "Service soon",
    vehicle: explorerVehicle,
    driveAdvice:
      "P0456 will not strand you and it will not damage the engine. Your Explorer is telling you that fuel vapour is escaping instead of being captured and burned. Drive it, but do not ignore it — it will fail an emissions inspection, and a leak this small does not seal itself with time.",
    quickAnswer:
      "P0456 means the evaporative-emissions monitor sealed the fuel-vapour system, watched the pressure, and detected a leak of about 0.020 inches — roughly half a millimetre, about the size of a pinhole. Because the opening is that small, the cause usually is too. A fuel cap that was not turned until it clicked, a seal that has hardened with age, or a hairline crack in a vapour line account for most of these. The expensive components are possible but they are not where to start, particularly on a vehicle where the canister and vent hardware sit under the body where access is awkward.",
    symptoms: [
      {
        key: "light-only",
        label: "Check-engine light with no drivability change",
        response:
          "Entirely normal. The EVAP system handles vapour rather than fuel delivery, so the engine runs exactly as it did. The light is usually the only symptom.",
      },
      {
        key: "after-fuel",
        label: "Light appeared soon after filling up",
        response:
          "Start at the cap, because it is the one thing that changed. A cap not tightened until it clicks, or with grit on its sealing surface, is the single most common cause.",
      },
      {
        key: "fuel-smell",
        label: "Faint fuel smell around the vehicle",
        response:
          "Worth investigating properly. A smell you can actually detect usually means something larger than the monitor threshold — check the filler neck, cap seal and vapour lines.",
      },
      {
        key: "emissions-fail",
        label: "Failed an emissions test",
        response:
          "Expected. This is an emissions fault by definition. Repair, then let the monitor complete before returning rather than paying for a second failed test.",
      },
      {
        key: "intermittent",
        label: "Clears by itself then comes back",
        response:
          "Typical of a seal that only leaks at certain temperatures or fuel levels. Testing deliberately with smoke beats waiting for it to reappear on its own.",
      },
      {
        key: "hard-start",
        label: "Brief hard start after refuelling",
        response:
          "Points more at a purge valve stuck open than a plain leak, since raw vapour is reaching the intake when the engine cannot use it. Look for companion purge-circuit codes.",
      },
    ],
    causes: [
      {
        cause: "Fuel cap not sealing (check first)",
        evidence:
          "Recently refuelled; cap does not click; seal cracked, hardened or with debris on it",
        firstTest:
          "Wipe the seal and filler neck, refit until it clicks, then let the monitor run again",
      },
      {
        cause: "Canister vent valve not sealing",
        evidence:
          "System will not hold vacuum with the vent commanded closed during a scan-tool test",
        firstTest:
          "Command the vent valve closed and watch whether the fuel-tank pressure sensor holds",
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
          "Valve passes when commanded closed; idle quality or trims disturbed alongside",
        firstTest:
          "Command the purge valve closed and confirm it actually seals",
      },
      {
        cause: "Charcoal canister or its seals",
        evidence:
          "Smoke escapes around the canister body or fittings; physical damage from road debris",
        firstTest:
          "Inspect the canister and its connections — on an SUV these sit low and exposed",
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
        heading: "An SUV's EVAP hardware lives a harder life",
        paragraphs: [
          "The threshold for this code is about 0.020 inches — half a millimetre, roughly a pinhole. On most vehicles the usual suspects are the fuel cap seal and a hardened vapour hose, and that holds true here. But an Explorer adds a category that a low, garage-kept car largely avoids: physical damage.",
          "The canister and its connections sit under the body, exposed to stones, mud, winter salt and whatever the vehicle is driven through. A cracked fitting from a rock strike, or a corroded joint after several salted winters, is a realistic cause on this vehicle in a way it is not on a commuter car. That is worth knowing because it changes where you point the smoke.",
          "It also means inspection has value here that it lacks elsewhere. On most vehicles a visual check of the EVAP system is close to useless at this leak size. On an underbody-mounted system with impact damage, you can sometimes see the problem.",
        ],
      },
      {
        heading: "Order of work that suits this vehicle",
        paragraphs: [
          "Start with the cap regardless — it costs nothing and it remains the most common single cause across every vehicle. Wipe the seal and the filler neck, refit until it clicks, and give the monitor several drive cycles with the tank around half full before deciding it was innocent.",
          "Then go underneath with a light before you book a smoke test. On an Explorer that inspection occasionally finds the answer outright, and even when it does not, it tells the technician where to concentrate. Note anything that looks impact-damaged, corroded at a joint, or chafed where a line passes a bracket.",
          "Then smoke-test. At this leak size that remains the test that actually locates the opening, and the roughly $75–$150 it costs is less than one wrongly chosen component.",
        ],
      },
      {
        heading: "Why the monitor takes its time",
        bullets: [
          "It runs only within a specific fuel-level window — keep the tank near half full",
          "It needs an ambient temperature window as well, so cold snaps delay it",
          "It wants a period of stable driving rather than short trips",
          "Which is why the light stays on for days after a genuine repair",
          "Check monitor readiness on a scan tool rather than judging by the dashboard",
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
        title: "Deal with the cap first, properly",
        detail:
          "Remove it, look at the seal in good light, wipe both the seal and the filler neck, and refit until it clicks. A seal that has gone hard and glossy rather than staying soft has stopped sealing even if it looks intact.",
      },
      {
        title: "Give the monitor several days before judging",
        detail:
          "It only tests within a specific fuel-level and temperature window. Keep the tank near half full and drive normally for a few days. People routinely pay for a diagnosis of a fault they had already fixed because they expected the light to go out immediately.",
      },
      {
        title: "Inspect underneath before booking a smoke test",
        detail:
          "This is where an Explorer differs from a low, garage-kept car. Its canister and lines sit exposed to stones, mud and salt. Look for impact damage, a corroded joint, or a line chafed where it passes a bracket — occasionally the answer is visible.",
      },
      {
        title: "Smoke-test the sealed system",
        detail:
          "At half a millimetre, this is what actually locates the opening. Around $75 to $150 at a shop, and less than the cost of one wrongly chosen component.",
      },
      {
        title: "Watch the tank pressure sensor while commanding the valves",
        detail:
          "Close the vent, operate the purge, and see whether the system holds. A system that cannot hold vacuum with both commanded shut has either a leak or a valve that is not sealing, and the trace distinguishes them.",
      },
      {
        title: "Check the filler neck and its sealing face",
        detail:
          "Corrosion and impact damage around the neck are realistic on a vehicle of this type. A neck that no longer presents a clean sealing surface will defeat even a new cap.",
      },
      {
        title: "Smoke it again before you put it back together",
        detail:
          "Rubber across an EVAP system ages at the same rate, so a vehicle old enough to crack one component is often old enough to crack two. Testing again before reassembly saves a repeat visit.",
      },
      {
        title: "Confirm readiness rather than watching the dashboard",
        detail:
          "The repair is verified when the EVAP monitor has run again and reported ready without setting the code. Check monitor status on a scan tool before returning for an emissions test.",
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
        note: "Confirm it seals when commanded before replacing it",
      },
      {
        job: "Canister vent valve",
        parts: "Moderate",
        shop: "Underbody access on an SUV",
        diy: "Moderate",
        note: "Confirm the layout for your generation before ordering",
      },
      {
        job: "Charcoal canister replacement",
        parts: "Higher — full assembly",
        shop: "Get a quote for your model year",
        diy: "Advanced",
        note: "The expensive outcome, and the reason to smoke-test first",
      },
    ],
    dontReplace:
      "Do not start with the charcoal canister or the purge valve. P0456 describes a pinhole, and the most common causes are the cap seal and a cracked hose — both far cheaper. Replacing an expensive EVAP component without a smoke test is guessing at a large bill when a small test would have shown you the actual opening.",
    yearNotes: [
      "EVAP layout differs across Explorer generations, and the 2020 platform change moved a great deal of hardware. Confirm the layout for your model year before ordering.",
      "On an SUV the canister and vent hardware sit under the body where road debris, mud and salt reach them, so physical damage and corrosion are realistic causes.",
      "If your Explorer has a capless filler, inspect the sealing flap and adapter rather than looking for a cap.",
      "Any recent fuel-system work introduces new sealing surfaces. If the code appeared after that kind of job, start where the work was done.",
    ],
    faqs: [
      {
        question: "What is actually leaking with P0456?",
        answer:
          "Fuel vapour, through an opening of roughly 0.020 inches — about half a millimetre. It is a pinhole, which is why it produces no drivability symptom and why looking for it rarely works.",
      },
      {
        question: "Why does an Explorer get this more than a small car?",
        answer:
          "Its EVAP hardware lives under the body, exposed to stones, mud and winter salt. Impact damage and corrosion are realistic causes here in a way they are not on a low, garage-kept vehicle.",
      },
      {
        question: "Is the fuel cap really worth checking first?",
        answer:
          "Yes. It is free, it takes a minute, and it remains the single most common cause across every vehicle. Wipe the seal and the filler neck and refit until it clicks.",
      },
      {
        question: "Why is the light still on after I fixed it?",
        answer:
          "The EVAP monitor does not run continuously. It needs a specific fuel level, an ambient temperature window and stable driving. Expect several days before it tests again and confirms the repair.",
      },
      {
        question: "How much will this cost me?",
        answer:
          "From about $25 for a cap to several hundred if the canister is involved. A $75–$150 smoke test is what determines which, and it is the cheapest way to avoid buying the wrong part.",
      },
      {
        question: "Can I drive it in the meantime?",
        answer:
          "Yes, safely. The EVAP system handles vapour, not fuel delivery, so the engine is unaffected. It will fail an emissions inspection though, and the leak will not close on its own.",
      },
      {
        question: "What is the difference between P0456 and P0455?",
        answer:
          "Leak size only. P0456 is the very small threshold. P0455 is a gross leak — a missing cap or a line off its fitting, something you might actually find by looking.",
      },
      {
        question: "Does a generic fuel cap work?",
        answer:
          "It needs to meet the correct specification and seal properly. Cheap generic caps are a recognised cause of repeat EVAP codes, so this is a poor place to save a few dollars.",
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
    sources: [fordObd2017, fordObd2024, fordManuals],
  },

  /* ------------------------------------------------------------------ P1450 */
  {
    slug: "ford/explorer/p1450",
    code: "P1450",
    title: "P1450 Code Ford Explorer: Fuel Tank Vacuum Causes & Fixes",
    description:
      "P1450 means your Explorer cannot bleed off fuel-tank vacuum. The hiss test, why the purge valve is usually to blame, and repair costs.",
    definition: "Unable to Bleed Up Fuel Tank Vacuum",
    severity: "Diagnose promptly",
    vehicle: explorerVehicle,
    driveAdvice:
      "The engine will usually run normally, so this is not a stop-immediately code. The reason to deal with it soon is the fuel tank — trapped vacuum can pull a plastic tank out of shape, turning an inexpensive valve repair into a tank replacement. A hard start right after refuelling is the other sign worth acting on.",
    quickAnswer:
      "P1450 is a Ford-specific code describing a plumbing problem rather than an engine one, and it is the exact opposite of a leak code. As fuel leaves the tank, air has to come back in through the evaporative-emissions system to replace it. When that path is blocked — or when engine vacuum is being applied to the tank continuously because a purge valve is stuck open — vacuum builds and will not bleed off. The PCM sees the fuel-tank pressure sensor reporting vacuum it cannot relieve and stores the code.",
    symptoms: [
      {
        key: "whoosh",
        label: "Loud rush of air when you open the fuel cap",
        response:
          "The most telling symptom here, and it costs nothing to check. That sound is atmospheric pressure equalising a tank that has been under vacuum, and it confirms the code is describing something real.",
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
          "Severe trapped vacuum can work against the fuel pump. If it runs worse with a low tank and better after you open the cap, treat the vent path as the prime suspect.",
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
        heading: "Why this code is worse on a body-on-frame SUV",
        paragraphs: [
          "P1450 describes trapped vacuum, and the reason it matters is what that vacuum does to the fuel tank. On an Explorer that concern is sharper than on a small car for a straightforward reason: the tank is larger, it sits between frame members where you cannot see most of it, and by the time deformation is visible from underneath it is usually well advanced.",
          "It also means a deformed tank is more expensive to replace here. So the calculation is different from a compact hatchback where the same code costs a $40 valve. On an Explorer, acting in the first week rather than the third month is the difference between a purge valve and a fuel tank.",
          "Get underneath and look while you still have the choice. A tank that has started to draw inward at its flatter faces is telling you how long this has been happening.",
        ],
      },
      {
        heading: "Where the vent path runs on an Explorer",
        paragraphs: [
          "The vent path draws atmospheric air from under the body, and on an SUV that inlet sits in an area that collects everything the road throws at it. Mud, gravel, road salt and — genuinely, more often than people expect — insect nesting all block it.",
          "This makes physical obstruction a realistic first suspect on this vehicle rather than an exotic one. If your Explorer sees unpaved roads, tows through wet fields, or has been driven through standing water, trace the vent path and confirm it is physically clear before ordering any electrical component.",
          "Vent hardware also moved when the Explorer changed platform for 2020. A diagram from a 2015 vehicle will send you looking in the wrong place on a 2022, so confirm the layout for your own generation first.",
        ],
      },
      {
        heading: "The two-minute test that comes before everything",
        bullets: [
          "Drive the vehicle for twenty minutes, then park it",
          "Open the fuel cap slowly and listen",
          "A strong rush of air inward means the trapped vacuum is real — look at the purge valve, vent valve and vent path",
          "Silence, with the code still setting, moves the fuel-tank pressure sensor and its wiring up the list",
          "Either result costs nothing and directs everything you do afterwards",
        ],
      },
    ],
    freezeFrame: [
      "Fuel-tank pressure sensor value when the code set, showing how much vacuum was present",
      "Fuel level, since a nearly empty tank builds vacuum faster than a full one",
      "Ambient temperature, because cooling fuel contracts and adds vacuum on its own",
      "Engine run time before the fault, separating gradual build-up from an immediate problem",
      "Companion EVAP codes such as vent or purge circuit faults, which often name the part",
      "Vehicle speed, which helps identify whether road debris or motion is involved",
    ],
    steps: [
      {
        title: "Do the cap test before you book anything",
        detail:
          "Drive twenty minutes, park, open the cap slowly and listen. A strong rush of air inward confirms the vacuum is real. It takes thirty seconds and it decides whether you are chasing hardware or a sensor.",
      },
      {
        title: "Get the vehicle up and look underneath",
        detail:
          "This is the step that differs most on an Explorer. Before any scan tool comes out, put it on a lift or ramps and inspect the vent inlet, the canister and the lines running along the frame. On an SUV that has seen unpaved roads or standing water, you are looking for packed mud, a crushed line against a frame member, or nesting debris.",
      },
      {
        title: "Inspect the tank while you are under there",
        detail:
          "You are already in position, and this is the damage the code exists to warn you about. Look at the flatter faces of the tank for any sign of drawing inward. Finding deformation now changes the conversation before you spend money on a valve.",
      },
      {
        title: "Command the purge valve closed",
        detail:
          "Back in the engine bay, confirm it seals rather than passing manifold vacuum through toward the tank. A purge valve stuck open applies engine vacuum to the tank continuously, which is exactly what this code describes.",
      },
      {
        title: "Command the vent valve open and watch the sensor",
        detail:
          "Tank pressure should move toward atmospheric. If it does not, either the valve is not opening or the path beyond it is blocked — and your underbody inspection has probably already told you which.",
      },
      {
        title: "Cross-check the sensor against the cap",
        detail:
          "Compare the live fuel-tank pressure reading with the cap on and then off. A sensor that does not respond when you break the seal is either reading incorrectly or is not seeing the tank at all.",
      },
      {
        title: "Check the canister for fuel saturation",
        detail:
          "Repeated topping-off past the pump's first click pushes liquid fuel into the charcoal canister and restricts airflow through it. That blocks the vent path with every valve working correctly.",
      },
      {
        title: "Re-test at the cap, not on the scan tool",
        detail:
          "After the repair, drive the vehicle and open the cap again. Silence is the result you want. That single check is more informative than a cleared code, because the code will not return until the monitor next runs.",
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
        shop: "Underbody access on an SUV",
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
      "EVAP component locations differ across Explorer generations, and the 2020 platform change moved a great deal of hardware. Confirm where your vent valve and canister sit before spending time underneath.",
      "On an SUV used on unpaved roads, a physically blocked vent inlet is a realistic first suspect. Inspect for packed mud and debris before suspecting an electrical component.",
      "Repeated overfilling past the pump's first click pushes liquid fuel into the charcoal canister, which restricts the vent path without any component being defective.",
    ],
    faqs: [
      {
        question: "What does P1450 mean on a Ford Explorer?",
        answer:
          "That vacuum built up inside the fuel tank and the PCM could not relieve it. Air is supposed to enter the tank through the EVAP system as fuel is drawn out, and something is stopping that.",
      },
      {
        question: "Is P1450 a leak or a blockage?",
        answer:
          "A blockage — and that distinction saves you an afternoon. Leak codes like P0456 mean vapour is escaping. P1450 means air cannot get in, so you are looking for something closed rather than something open.",
      },
      {
        question: "Can mud or debris really block the vent on an SUV?",
        answer:
          "Yes, and on an Explorer it is one of the first things worth checking. The vent draws air from under the body, and packed mud, gravel or insect nesting can obstruct it entirely.",
      },
      {
        question: "Why should I check the fuel tank itself?",
        answer:
          "Because sustained vacuum deforms a plastic tank, and on an Explorer the tank is large, mostly hidden between frame members, and expensive to replace. Inspecting it while the vehicle is already on a lift costs nothing.",
      },
      {
        question: "Why does my Explorer crank for ages after refuelling?",
        answer:
          "That points at the purge valve stuck open. Raw vapour is drawn into the intake while you fill, leaving the engine to start on a mixture far too rich to fire cleanly.",
      },
      {
        question: "How much does it cost to fix?",
        answer:
          "Usually $150 to $500. The purge valve and the canister vent valve are the two common parts, and both are typically under $75 before labour. Underbody access is what moves the number.",
      },
      {
        question: "Can I ignore it if the engine runs fine?",
        answer:
          "The engine will run fine, which is exactly why people leave it. Meanwhile the trapped vacuum works on the tank continuously. Treat it as this week's job rather than next quarter's.",
      },
      {
        question: "Will a scan tool find this on its own?",
        answer:
          "Partly. It will command the valves and show you tank pressure, but it cannot see a vent line packed with mud. On this vehicle the underbody inspection carries as much weight as the scan data.",
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
    sources: [fordObd2017, fordObd2024, fordManuals],
  },
];
