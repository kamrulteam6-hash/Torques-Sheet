import type { TroubleCodeGuide } from "./trouble-code-data";

/**
 * Second batch of Ford F-150 5.0L trouble-code guides.
 *
 * Sourcing note: these cite Ford's own OBD operation summaries, which document
 * the monitor logic behind each of these codes (EVAP, misfire, fuel control,
 * comprehensive components). Where a page would need a value we cannot source —
 * a specific vacuum threshold, a repair price — it says so rather than
 * inventing one.
 */

const fordObd2024 = {
  label: "Ford 2024–2025 gasoline OBD operation summary",
  url: "https://www.fordservicecontent.com/Ford_Content/catalog/motorcraft/OBD_Operation_Summary_to_Gasoline_MY_2024_2025.pdf",
  note: "Ford monitor logic, enabling conditions and drive-cycle requirements",
};

const fordObd2017 = {
  label: "Ford 2017 gasoline OBD operation summary",
  url: "https://www.fordservicecontent.com/ford_content/catalog/motorcraft/OBDSM1704.pdf",
  note: "Ford EVAP, misfire, fuel and comprehensive-component monitor descriptions",
};

const fordManuals = {
  label: "Ford owner manuals and warranty guides",
  url: "https://www.ford.com/support/owner-manuals/",
  note: "Official year- and VIN-specific manual lookup for your truck",
};

export const troubleCodeBatch2: TroubleCodeGuide[] = [
  /* ------------------------------------------------------------------ P0301 */
  {
    slug: "ford/f-150/5-0/p0301",
    code: "P0301",
    title: "P0301 Code Ford F150: Cylinder 1 Misfire Causes & Fixes",
    description:
      "What P0301 means on a Ford F-150 5.0L, where cylinder 1 actually is, and how to prove which part failed before you replace anything.",
    definition: "Cylinder 1 Misfire Detected",
    severity: "Stop soon",
    driveAdvice:
      "If the light is flashing, the misfire is bad enough to threaten your catalytic converters — ease off and stop as soon as you safely can. A steady light with an engine that still pulls cleanly may give you a short, gentle trip to get it diagnosed, but every mile of towing or hard acceleration raises the odds you turn a coil into a converter.",
    quickAnswer:
      "P0301 is the code your PCM stores when it counts misfire events on cylinder 1 specifically. That is genuinely good news compared with P0300 — the truck has already narrowed the fault to one cylinder for you. On the 5.0L V8, cylinder 1 sits at the front of Bank 1, the passenger-side bank. What the code still does not tell you is which part in that cylinder gave up: the plug, the coil, the injector, or the compression behind them.",
    symptoms: [
      {
        key: "rough-idle",
        label: "Rough or shaking idle that smooths out under load",
        response:
          "Classic single-cylinder misfire behaviour. At idle there is no load to mask the missing contribution, so you feel it most sitting still. Pull freeze-frame data before you touch anything — it records the rpm, load and coolant temperature where the misfire actually happened.",
      },
      {
        key: "flashing-light",
        label: "Check-engine light is flashing",
        response:
          "Stop driving as soon as it is safe. A flashing lamp means raw fuel is reaching the exhaust in quantity, and a catalytic converter can be destroyed in minutes rather than months. This is the one symptom on this page that overrides everything else.",
      },
      {
        key: "cold-only",
        label: "Only misfires when cold, then clears",
        response:
          "Look hardest at the plug gap, a cracked insulator, or a coil boot that leaks only until it warms and expands. Cold-only misfire also points at fuel that is momentarily too lean at start-up, so check trims and any companion EVAP or fuel codes.",
      },
      {
        key: "no-symptom",
        label: "Code set but the engine feels fine",
        response:
          "Intermittent misfire that has not yet become continuous. Do not clear it and hope — save the freeze frame, then graph misfire counters while you drive the conditions the freeze frame recorded. A fault you cannot reproduce is a fault you cannot verify you fixed.",
      },
    ],
    causes: [
      {
        cause: "Worn, fouled or wrong-gap spark plug",
        evidence:
          "Cylinder 1 plug looks different from the other seven — eroded electrode, cracked insulator, fuel or oil fouling, gap out of specification",
        firstTest:
          "Pull the cylinder 1 plug and lay it beside the rest; compare against the year-specific Motorcraft part and gap",
      },
      {
        cause: "Failing coil-on-plug or its connector",
        evidence:
          "Misfire follows the coil when you move it to another cylinder; boot shows carbon tracking or the connector lock is broken",
        firstTest:
          "Swap the cylinder 1 coil with a neighbouring cylinder, clear codes, and see whether the misfire follows the coil",
      },
      {
        cause: "Injector fault on cylinder 1",
        evidence:
          "Misfire stays on cylinder 1 after a coil and plug swap; injector is noticeably quiet, or its electrical resistance is out of line with the others",
        firstTest:
          "Listen with a stethoscope, compare injector resistance across cylinders, then run the injector test your scan tool supports",
      },
      {
        cause: "Low compression or a mechanical fault",
        evidence:
          "Misfire will not move with parts; relative compression on cylinder 1 is down, or you hear valvetrain noise from that corner",
        firstTest:
          "Run relative compression from the scan tool first, then a mechanical compression or leak-down test if it looks low",
      },
      {
        cause: "Vacuum leak feeding that runner",
        evidence:
          "Bank 1 fuel trims run positive as well as the misfire; a hiss changes with a smoke test near the intake or a broken PCV fitting",
        firstTest:
          "Smoke-test the intake and inspect the PCV connections — never spray flammable cleaner at a hot running engine",
      },
    ],
    freezeFrame: [
      "Engine rpm and calculated load when the misfire counted — idle-only and load-only faults point in different directions",
      "Engine coolant temperature, which separates a cold-start fault from a fully warm one",
      "Short and long-term fuel trim on Bank 1; positive trims alongside the misfire suggest air or fuel rather than ignition",
      "Misfire counters for all eight cylinders, so you can confirm cylinder 1 really is dominating",
      "Vehicle speed and throttle position, which tell you whether it happens under acceleration or at steady cruise",
      "Any companion codes stored at the same moment — P0171, P0316 or a cam/crank code changes the order you work in",
    ],
    steps: [
      {
        title: "Save the evidence before you clear anything",
        detail:
          "Record the freeze frame and the misfire counters for every cylinder. Once you clear the code that information is gone, and you will have no way to prove your repair worked other than waiting for the light to come back.",
      },
      {
        title: "Confirm cylinder 1 is genuinely dominating",
        detail:
          "Compare the counters. If cylinders 1 and 5 are both climbing, you are looking at a coil-pack or bank-level issue rather than one failed part. If only cylinder 1 counts, the fault is physically in that cylinder.",
      },
      {
        title: "Inspect the plug before you buy a coil",
        detail:
          "Cylinder 1 is the front cylinder on the passenger side and one of the easier plugs to reach. Compare it directly against the others — a plug that looks different from its neighbours has usually already told you the answer.",
      },
      {
        title: "Move the coil, not your money",
        detail:
          "Swap the cylinder 1 coil with a neighbour, clear the code, and drive the conditions from your freeze frame. If the misfire moves to the other cylinder, the coil is the fault. If it stays on cylinder 1, you have just ruled the coil out for free.",
      },
      {
        title: "Test the injector on that cylinder",
        detail:
          "With the plug and coil eliminated, listen to the injector and compare its resistance with the rest. Many scan tools can also cut individual injectors and show the rpm drop, which tells you whether that cylinder was contributing at all.",
      },
      {
        title: "Check compression when parts do not move the fault",
        detail:
          "A misfire that refuses to follow any component is a mechanical one. Relative compression from the scan tool is quick and non-invasive; follow it with a proper compression or leak-down test if the numbers look wrong.",
      },
      {
        title: "Verify with data, not with the dash light",
        detail:
          "After the repair, drive the load and temperature conditions the freeze frame recorded and watch the misfire counters stay at zero. A lamp that stays off for five minutes at idle proves nothing.",
      },
    ],
    dontReplace:
      "Do not replace all eight coils and all eight plugs because one cylinder misfired. P0301 has already done the hard part and named the cylinder. Blanket replacement costs eight times as much, risks damaging seven healthy connectors, and — if the real fault is compression or an injector — leaves you exactly where you started with an empty wallet.",
    yearNotes: [
      "Cylinder 1 is the front cylinder on Bank 1, the passenger-side bank on the 5.0L V8. Do not carry a bank convention over from another manufacturer, because it will send you to the wrong side of the engine.",
      "Spark-plug part numbers and gap specifications changed across 5.0L generations. Look yours up by VIN rather than trusting a parts-counter cross-reference.",
      "Later trucks store more detailed misfire data than early ones. If your scan tool shows only a code and no counters, borrow one that reads live misfire data before you start replacing parts.",
    ],
    faqs: [
      {
        question: "Where is cylinder 1 on a Ford F-150 5.0L?",
        answer:
          "At the front of Bank 1, which is the passenger-side bank. That makes it one of the more accessible cylinders on this engine, so plug and coil inspection is usually straightforward.",
      },
      {
        question: "Can I drive with P0301?",
        answer:
          "Only briefly and gently, and only if the light is steady rather than flashing. A flashing light means the misfire is actively threatening your catalytic converters, and you should stop as soon as it is safe to do so.",
      },
      {
        question: "Should I replace the coil or the plug first?",
        answer:
          "Inspect the plug first, because it costs nothing and it frequently shows the fault outright. Then move the coil to a different cylinder — if the misfire follows it, you have identified the coil without buying anything.",
      },
      {
        question: "What is the difference between P0301 and P0300?",
        answer:
          "P0301 names cylinder 1 specifically. P0300 means the PCM saw misfire across several cylinders, or with no single cylinder dominating. P0301 is the easier of the two to chase because the diagnosis starts in one place.",
      },
      {
        question: "Why did P0301 come back after I replaced the plug and coil?",
        answer:
          "Because the fault was never in the ignition system. A misfire that survives new plugs and coils is usually an injector or a compression problem, and both are diagnosed by testing rather than by buying more parts.",
      },
    ],
    closing: {
      title: "How to confirm the P0301 repair actually held",
      paragraphs: [
        "Clear the code only after you have fixed something specific, and only after the original freeze frame is written down. Clearing first destroys the one record you have of the conditions the misfire happened under.",
        "Drive the truck through the rpm, load and coolant-temperature window your freeze frame recorded, and watch the cylinder 1 misfire counter while you do it. Zero counts across the conditions that previously set the code is the proof you want. A dashboard that simply stays dark is not the same thing.",
        "If the counter starts climbing again, resist the temptation to clear and re-drive. Save the new data instead. A misfire that returns under a different load or temperature than before is telling you something useful about which system is actually failing.",
      ],
    },
    sources: [fordObd2017, fordObd2024, fordManuals],
  },

  /* ------------------------------------------------------------------ P0456 */
  {
    slug: "ford/f-150/5-0/p0456",
    code: "P0456",
    title: "P0456 Code Ford F150: Small EVAP Leak Causes & Fixes",
    description:
      "P0456 means a very small evaporative-emissions leak on your F-150. Here is what actually causes it, and why the fuel cap is worth checking first.",
    definition: "Evaporative Emission System Leak Detected (very small leak)",
    severity: "Service soon",
    driveAdvice:
      "P0456 will not leave you stranded and it will not damage the engine. Your truck is telling you that fuel vapour is escaping to the atmosphere instead of being captured and burned. Drive it, but do not ignore it — it will fail an emissions test, and the leak will not seal itself.",
    quickAnswer:
      "P0456 means Ford's evaporative-emissions monitor sealed the fuel-vapour system, watched the pressure, and found a leak small enough to sit at the very bottom of what it can detect. On most applications that threshold is around a 0.020-inch opening — roughly a pinhole. Because the leak is that small, the cause is usually equally small: a cap that was not turned until it clicked, a hardened seal, or a hairline crack in a vapour line.",
    symptoms: [
      {
        key: "light-only",
        label: "Check-engine light with no drivability change",
        response:
          "This is the normal presentation, and it is expected. The EVAP system handles fuel vapour, not fuel delivery, so a very small leak does not change how the engine runs. The light is the only symptom you will get.",
      },
      {
        key: "after-fuel",
        label: "Light appeared shortly after refuelling",
        response:
          "Start at the cap. Removing and reinstalling it is the one variable that changed, and a cap that was not tightened until it clicked — or that trapped debris on its seal — is the single most common cause of this code.",
      },
      {
        key: "fuel-smell",
        label: "Faint fuel smell near the rear of the truck",
        response:
          "Worth taking seriously even though P0456 is a small leak. Inspect the filler neck, the cap seal and the vapour lines above the tank. A smell you can detect usually indicates something larger than the monitor threshold.",
      },
      {
        key: "comes-and-goes",
        label: "Code clears itself then returns later",
        response:
          "Typical of a seal that leaks only at certain temperatures or fuel levels. The EVAP monitor runs only under specific conditions, so an intermittent code means you need to test the system deliberately rather than wait for it.",
      },
    ],
    causes: [
      {
        cause: "Fuel cap not sealing",
        evidence:
          "Cap was recently removed, does not click when tightened, or its rubber seal is cracked, glazed or has debris on it",
        firstTest:
          "Remove the cap, wipe the seal and filler neck, refit until it clicks, then clear the code and let the monitor run again",
      },
      {
        cause: "Cracked or hardened vapour hose",
        evidence:
          "Visible cracking near clamps and bends, or a smoke test shows vapour escaping from a line rather than a component",
        firstTest:
          "Smoke-test the sealed EVAP system and follow the smoke — a very small leak is far easier to see than to find by hand",
      },
      {
        cause: "Vent or purge valve not sealing",
        evidence:
          "Valve does not hold when commanded closed, or the system will not build and hold vacuum during a monitor test",
        firstTest:
          "Command the valves with a scan tool and watch the fuel-tank pressure sensor respond; a valve that will not seal shows immediately",
      },
      {
        cause: "Charcoal canister or its seals",
        evidence:
          "Smoke escapes around the canister body or its fittings; canister shows physical damage from road debris",
        firstTest:
          "Inspect the canister and its connections directly, since it sits where stones and salt reach it",
      },
      {
        cause: "Filler neck or tank seal damage",
        evidence:
          "Corrosion or impact damage around the filler neck, or a seal that has flattened with age",
        firstTest:
          "Inspect the neck and its sealing surface with a light before assuming the cap itself is at fault",
      },
    ],
    freezeFrame: [
      "Fuel level at the moment the monitor ran — the EVAP test needs the tank within a specific range, and this tells you it was valid",
      "Ambient and coolant temperature, since the monitor only runs inside a defined temperature window",
      "Fuel-tank pressure sensor reading, which shows whether the system held vacuum at all",
      "Vehicle speed and run time before the test, which confirm the enabling conditions were met",
      "Whether any other EVAP codes stored at the same time, such as a vent or purge circuit fault",
      "How many drive cycles have passed since the code set, which tells you whether it is current or historic",
    ],
    steps: [
      {
        title: "Check the cap properly, not casually",
        detail:
          "Remove it, look at the rubber seal under good light, wipe the filler neck, and refit until it clicks. A surprising share of P0456 codes end here — and it costs nothing to rule out first.",
      },
      {
        title: "Clear the code and let the monitor run",
        detail:
          "The EVAP monitor only runs under particular fuel-level and temperature conditions, so the code will not clear the moment you tighten the cap. Give it a few drive cycles before deciding the cap was not the problem.",
      },
      {
        title: "Inspect the visible vapour lines",
        detail:
          "Work along the lines from the tank forward, paying attention to bends, clamps and anywhere a line passes near heat. Hardened plastic cracks where it flexes, and those cracks are often visible once you know to look.",
      },
      {
        title: "Smoke-test the sealed system",
        detail:
          "This is the test that actually finds a 0.020-inch leak. Introduce smoke into the sealed EVAP system and watch where it escapes. Trying to find a leak this small by feel or by ear wastes hours.",
      },
      {
        title: "Command the valves and watch the sensor",
        detail:
          "Use a scan tool to close the vent valve and operate the purge valve while watching the fuel-tank pressure sensor. A system that cannot hold vacuum with both valves commanded shut has a leak or a valve that is not sealing.",
      },
      {
        title: "Inspect the canister and filler neck",
        detail:
          "Both sit low and exposed on a pickup, and both take road debris and salt. Physical damage here is easy to see once the smoke test has pointed you to the right area.",
      },
      {
        title: "Confirm the monitor completes and passes",
        detail:
          "The repair is not verified until the EVAP monitor has run again and reported ready without setting the code. That takes specific conditions, so plan on a few days of normal driving rather than one trip around the block.",
      },
    ],
    dontReplace:
      "Do not start by replacing the charcoal canister or the purge valve. P0456 describes a leak the size of a pinhole, and the most common causes are a cap seal and a cracked hose — both far cheaper. Replacing an expensive EVAP component without a smoke test is guessing at a part when a five-minute test would have shown you the actual hole.",
    yearNotes: [
      "EVAP system layout changed across F-150 generations, and later trucks may use a different vent-valve location and canister design. Confirm the layout for your model year before you go looking for a component.",
      "Some model years are more prone to cap-seal complaints than others. If your truck has a service history of EVAP codes, check whether a cap or filler-neck update applies to it.",
      "A capless filler system removes the cap as a variable but adds its own sealing flap and adapter. If your truck has one, inspect the flap seal rather than looking for a cap that is not there.",
    ],
    faqs: [
      {
        question: "Will P0456 fail an emissions test?",
        answer:
          "Yes. It is an emissions fault by definition, and an illuminated check-engine light fails inspection in most jurisdictions regardless of the specific code.",
      },
      {
        question: "Is it safe to keep driving with P0456?",
        answer:
          "Mechanically, yes. The EVAP system handles fuel vapour rather than fuel delivery, so the engine runs normally. Get it repaired anyway — it is releasing fuel vapour, and it will not fix itself.",
      },
      {
        question: "How small is the leak in a P0456?",
        answer:
          "Very small — on most applications the monitor is looking for an opening around 0.020 inches, roughly a pinhole. That is why the cause is usually a seal or a hairline crack rather than an obvious failure.",
      },
      {
        question: "Why did the code not clear when I tightened the cap?",
        answer:
          "Because the EVAP monitor only runs inside a specific fuel-level and temperature window. It needs a few drive cycles to test again and confirm the system now seals.",
      },
      {
        question: "What is the difference between P0456 and P0455?",
        answer:
          "They describe the same system and differ in leak size. P0456 is the very small leak threshold; P0455 indicates a gross leak, which is more likely to be a missing cap or a disconnected line.",
      },
    ],
    closing: {
      title: "Confirming an EVAP repair, which takes patience",
      paragraphs: [
        "EVAP repairs are the ones people most often think they have completed. The monitor does not run continuously, so the absence of a light immediately after the repair means very little.",
        "After you have fixed the leak, clear the code and drive normally for several days with the tank somewhere in the middle of its range. Then check whether the EVAP monitor reports ready and whether the code stayed away. If your scan tool shows monitor readiness status, that is the number to watch rather than the dash.",
        "If the code returns after a genuine repair, smoke-test again rather than replacing a component. Small EVAP leaks frequently come in pairs, and finding the second one is much faster the second time around.",
      ],
    },
    sources: [fordObd2017, fordObd2024, fordManuals],
  },

  /* ------------------------------------------------------------------ P1450 */
  {
    slug: "ford/f-150/5-0/p1450",
    code: "P1450",
    title: "P1450 Code Ford F150: Fuel Tank Vacuum Causes & Fixes",
    description:
      "P1450 means your F-150 could not bleed off fuel-tank vacuum. Here is what traps it, why the tank can deform, and how to find the restriction.",
    definition: "Unable to Bleed Up Fuel Tank Vacuum",
    severity: "Diagnose promptly",
    driveAdvice:
      "The engine will usually run normally, so this is not a stop-immediately code. The reason to deal with it promptly is the fuel tank: trapped vacuum can pull a plastic tank out of shape, and that turns an inexpensive valve or hose repair into a tank replacement.",
    quickAnswer:
      "P1450 is a Ford-specific code, and it describes a plumbing problem rather than an engine one. As fuel is drawn out of the tank, air has to come back in through the evaporative-emissions system to replace it. When something blocks that path, vacuum builds in the tank and will not bleed off. Your PCM sees the fuel-tank pressure sensor reporting vacuum it cannot relieve, and stores P1450.",
    symptoms: [
      {
        key: "whoosh",
        label: "Loud rush of air when you open the fuel cap",
        response:
          "The most telling symptom on this page. That sound is atmospheric pressure rushing in to equalise a tank that has been sitting under vacuum. It points directly at a blocked vent path rather than anything electrical.",
      },
      {
        key: "fill-clickoff",
        label: "Pump keeps clicking off while refuelling",
        response:
          "A tank that cannot vent properly cannot accept fuel at full rate either. Repeated premature shut-off at the pump often shows up alongside P1450 and shares the same root cause.",
      },
      {
        key: "stall-lowfuel",
        label: "Hesitation or stalling when the tank gets low",
        response:
          "Severe trapped vacuum can fight the fuel pump. If the truck runs worse as the tank empties and better after you open the cap, treat the vent path as the prime suspect.",
      },
      {
        key: "light-only",
        label: "Check-engine light with nothing else obvious",
        response:
          "Common early on. The restriction may be partial, so the tank builds vacuum slowly and you never notice it. Inspect anyway — the tank damage this code warns about happens quietly.",
      },
    ],
    causes: [
      {
        cause: "Vent valve stuck closed",
        evidence:
          "Valve does not open when commanded, and tank vacuum does not relieve during a scan-tool test",
        firstTest:
          "Command the vent valve open with a scan tool and watch the fuel-tank pressure sensor move toward atmospheric",
      },
      {
        cause: "Blocked or pinched vent line",
        evidence:
          "Line is kinked, crushed against the frame, or packed with debris, mud or insect nesting",
        firstTest:
          "Trace the vent path from the canister to its atmospheric inlet and check it is physically clear",
      },
      {
        cause: "Restricted charcoal canister",
        evidence:
          "Canister is saturated with liquid fuel from repeated overfilling, or internally blocked",
        firstTest:
          "Check that air passes freely through the canister vent side before condemning any valve",
      },
      {
        cause: "Fuel-tank pressure sensor reading wrong",
        evidence:
          "Sensor reports vacuum that a mechanical gauge does not confirm, or its value does not change when the cap is removed",
        firstTest:
          "Compare the sensor value on the scan tool against what actually happens when you open the fuel cap",
      },
      {
        cause: "Purge valve stuck open",
        evidence:
          "Engine vacuum reaches the tank continuously; trims disturbed at idle alongside the P1450",
        firstTest:
          "Command the purge valve closed and confirm it seals rather than passing vacuum through to the tank",
      },
    ],
    freezeFrame: [
      "Fuel-tank pressure sensor value when the code set, which tells you how much vacuum was actually present",
      "Fuel level, because a nearly empty tank builds vacuum faster than a full one",
      "Ambient temperature, since cooling fuel contracts and adds vacuum on its own",
      "Engine run time before the fault, separating a long-drive build-up from an immediate one",
      "Any companion EVAP codes such as vent or purge circuit faults, which usually name the failed part directly",
      "Vehicle speed at the time, which helps identify whether the restriction is affected by road debris or motion",
    ],
    steps: [
      {
        title: "Listen at the fuel cap first",
        detail:
          "Open the cap on a truck that has been driven and listen. A strong rush of air in confirms trapped vacuum immediately and tells you the problem is real before you connect any equipment.",
      },
      {
        title: "Read the fuel-tank pressure sensor live",
        detail:
          "Watch what the sensor reports with the cap on and then with it off. A sensor that does not move when you break the seal is either reading incorrectly or is not seeing the tank at all.",
      },
      {
        title: "Command the vent valve and watch",
        detail:
          "With a scan tool, open the vent valve and see whether the tank pressure moves toward atmospheric. A valve that will not open is the most direct cause of this code, and this test finds it in seconds.",
      },
      {
        title: "Trace the vent path physically",
        detail:
          "Follow the line from the canister to where it draws air. On a pickup this path runs low and exposed, and mud, road debris and insect nests block it more often than anyone expects.",
      },
      {
        title: "Check the canister for fuel saturation",
        detail:
          "Repeated overfilling pushes liquid fuel into the charcoal canister, which restricts airflow through it. A saturated canister blocks the vent path without any valve or hose being at fault.",
      },
      {
        title: "Confirm the purge side seals",
        detail:
          "A purge valve stuck open lets engine vacuum reach the tank continuously. Command it closed and verify it actually seals rather than assuming the fault is only on the vent side.",
      },
      {
        title: "Inspect the tank before you finish",
        detail:
          "If the truck has run under trapped vacuum for a while, look at the tank itself for deformation. Finding a distorted tank now is better than discovering it after you have paid for a valve.",
      },
    ],
    dontReplace:
      "Do not replace the fuel-tank pressure sensor because the code mentions tank vacuum. P1450 usually describes a genuine physical restriction, and the sensor is reporting it accurately. Prove the sensor is lying — by comparing its reading against what happens when you open the cap — before you condemn it, or you will fit a new sensor and keep the same blocked vent.",
    yearNotes: [
      "P1450 is a Ford manufacturer-specific code, so generic code lists frequently describe it incorrectly. Use Ford documentation for your model year rather than a universal definition.",
      "Vent-valve location and canister design vary across F-150 generations. Confirm where yours actually sits before tracing lines under the truck.",
      "Trucks that spend time on unpaved roads see far more blocked vent paths. If yours does, inspect the vent inlet for packed mud and debris before suspecting any electrical component.",
    ],
    faqs: [
      {
        question: "What does P1450 mean on a Ford F-150?",
        answer:
          "That the PCM could not relieve vacuum in the fuel tank. Air normally enters the tank through the EVAP system to replace fuel as it is used, and P1450 means that path is not working.",
      },
      {
        question: "Why does my fuel cap hiss loudly when I open it?",
        answer:
          "Because the tank is under vacuum that could not bleed off. That rush of air is the clearest symptom of P1450 and points directly at a restricted vent path.",
      },
      {
        question: "Can P1450 damage my fuel tank?",
        answer:
          "Yes, and that is the main reason to fix it promptly. Sustained vacuum can deform a plastic fuel tank, turning an inexpensive valve or hose repair into a tank replacement.",
      },
      {
        question: "Is P1450 the same as a small EVAP leak?",
        answer:
          "No — they are opposites. P0456 means vapour is escaping the system. P1450 means air cannot get into the tank. One is a leak, the other is a blockage.",
      },
      {
        question: "Can overfilling the tank cause P1450?",
        answer:
          "It can contribute. Topping off past the pump's first click can push liquid fuel into the charcoal canister, and a saturated canister restricts the airflow the tank depends on.",
      },
    ],
    closing: {
      title: "What a complete P1450 repair looks like",
      paragraphs: [
        "A finished P1450 job accounts for two things: the restriction itself and any damage the trapped vacuum caused while it went unnoticed. Skipping the second means fixing the valve and leaving a deformed tank in place.",
        "After the repair, drive the truck normally and then open the fuel cap. Silence is what you want. If you still hear a rush of air, the vent path is still restricted somewhere you have not looked yet, regardless of what you replaced.",
        "Then confirm the EVAP monitor runs and passes without setting P1450 or a companion code. Because that monitor needs specific fuel-level and temperature conditions, give it several days of ordinary driving before you call the repair verified.",
      ],
    },
    sources: [fordObd2017, fordObd2024, fordManuals],
  },

  /* ------------------------------------------------------------------ P1299 */
  {
    slug: "ford/f-150/5-0/p1299",
    code: "P1299",
    title: "P1299 Code Ford F150: Overheat Protection Causes & Fixes",
    description:
      "P1299 means your F-150 entered cylinder-head overheat protection. Here is what triggered it, and why the code is a symptom rather than the fault.",
    definition: "Cylinder Head Over Temperature Protection Active",
    severity: "Stop soon",
    driveAdvice:
      "Treat this as the most urgent code on this section of the site. P1299 means the engine already reached a temperature high enough that Ford's protection strategy intervened to save the cylinder head. Stop as soon as it is safe, shut the engine down, and let it cool before you investigate. Continuing to drive risks a warped head or a failed gasket.",
    quickAnswer:
      "P1299 is not a component fault — it is a record that your engine got dangerously hot and the PCM stepped in. Ford's fail-safe cooling strategy reduces engine output to limit heat generation and protect the cylinder head from damage. The code tells you protection activated. It does not tell you why the engine overheated, and that is the question the rest of this page is about.",
    symptoms: [
      {
        key: "power-loss",
        label: "Sudden, dramatic loss of power",
        response:
          "That is the protection strategy working as designed, not a separate fault. The PCM is deliberately limiting output to reduce heat. Stop and let the engine cool rather than trying to drive through it.",
      },
      {
        key: "temp-gauge",
        label: "Temperature gauge high or in the red",
        response:
          "Shut down as soon as you can do so safely. Do not open the cooling system while it is hot — the pressure and temperature will cause serious burns. Let it cool completely before checking coolant level.",
      },
      {
        key: "coolant-loss",
        label: "Coolant low or visibly leaking",
        response:
          "Find the leak before topping up and driving on. A loss large enough to trigger overheat protection is usually visible: hoses, radiator, water pump weep hole, or the ground where the truck was parked.",
      },
      {
        key: "no-heat",
        label: "Cabin heater blows cold",
        response:
          "A classic sign of low coolant or air trapped in the system, because the heater core sits high in the circuit. It often appears before the temperature gauge moves and is worth acting on early.",
      },
    ],
    causes: [
      {
        cause: "Coolant loss from a leak",
        evidence:
          "Level low in the reservoir, visible residue at a hose or the water-pump weep hole, or coolant on the ground where you parked",
        firstTest:
          "Inspect the whole cooling system cold, then pressure-test it to find where the coolant is leaving",
      },
      {
        cause: "Thermostat stuck closed",
        evidence:
          "Upper radiator hose stays cool while the engine temperature climbs, meaning coolant is not circulating to the radiator",
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
          "Inspect for weeping and play, then confirm whether coolant is actually circulating when hot",
      },
      {
        cause: "Head gasket or combustion-gas intrusion",
        evidence:
          "Coolant disappears with no external leak, bubbles in the reservoir, white exhaust smoke, or pressure that builds quickly",
        firstTest:
          "Run a combustion-gas test on the cooling system before assuming the overheating had an external cause",
      },
    ],
    freezeFrame: [
      "Cylinder head temperature and coolant temperature at the moment protection activated",
      "Engine load and vehicle speed, which separate a towing overheat from an idling-in-traffic one",
      "Ambient temperature, since a hot day narrows the margin the cooling system has to work with",
      "Engine run time before activation, showing whether heat built gradually or spiked suddenly",
      "Fan command state, which tells you whether the PCM asked for cooling and did not get it",
      "Any companion codes for coolant temperature or cylinder head temperature sensors",
    ],
    steps: [
      {
        title: "Stop and let it cool completely",
        detail:
          "Nothing useful can be diagnosed on a hot engine, and opening a pressurised cooling system will injure you. Park it, shut it down and wait. This step is not optional.",
      },
      {
        title: "Check coolant level and look for the leak",
        detail:
          "With the engine cold, check the level and inspect hoses, the radiator, the water pump weep hole and the ground under the truck. A leak large enough to cause overheating usually leaves evidence.",
      },
      {
        title: "Pressure-test the cooling system",
        detail:
          "This finds leaks that only appear under operating pressure, including ones that evaporate before you see them. It is the fastest way to separate an external leak from an internal one.",
      },
      {
        title: "Confirm the thermostat opens",
        detail:
          "Watch the upper and lower radiator hoses as the engine warms. If the upper hose stays cool while temperature climbs, coolant is not reaching the radiator and the thermostat is the prime suspect.",
      },
      {
        title: "Verify the cooling fan responds",
        detail:
          "Overheating that happens in traffic but not at highway speed points here. Confirm the fan runs when the PCM commands it and that its control circuit is intact.",
      },
      {
        title: "Test for combustion gas in the coolant",
        detail:
          "If coolant is disappearing with no external leak, this test tells you whether exhaust gas is entering the cooling system. It is far cheaper than disassembly and it answers the expensive question directly.",
      },
      {
        title: "Assess whether the overheat caused damage",
        detail:
          "P1299 exists because the temperature was high enough to matter. After fixing the cause, check for head-gasket symptoms, oil and coolant cross-contamination, and any change in how the engine runs.",
      },
    ],
    dontReplace:
      "Do not simply refill the coolant, clear the code and carry on. P1299 records that your engine reached a damaging temperature, and topping up without finding why treats the gauge rather than the fault. The coolant went somewhere. Until you know where, you are driving toward the same event with less warning next time.",
    yearNotes: [
      "Ford's fail-safe cooling strategy behaves differently across model years and engines. Confirm how yours responds — some reduce power progressively, others more abruptly.",
      "The cylinder head temperature sensor is central to this strategy. If it or its wiring is faulty, protection can activate without a genuine overheat, so verify the sensor reading against actual coolant temperature.",
      "Trucks used for towing operate with much less thermal margin. If P1299 appeared while towing, evaluate the cooling system's condition and capacity rather than treating it as a one-off event.",
    ],
    faqs: [
      {
        question: "What does P1299 mean on a Ford F-150?",
        answer:
          "That cylinder-head overheat protection activated. The PCM detected a temperature high enough to threaten the cylinder head and reduced engine output to protect it.",
      },
      {
        question: "Why did my truck suddenly lose power?",
        answer:
          "That is the protection strategy, not a second failure. Reducing output lowers heat production and buys time to stop before the head is damaged.",
      },
      {
        question: "Can I keep driving with P1299?",
        answer:
          "No. Stop as soon as it is safe and let the engine cool. Continuing to drive an engine that has already reached protection temperature risks a warped head or a failed gasket.",
      },
      {
        question: "Is P1299 the same as a blown head gasket?",
        answer:
          "Not by itself. A failed head gasket can cause the overheating that triggers P1299, and severe overheating can also cause a gasket to fail. The code records the temperature event, not the mechanical cause.",
      },
      {
        question: "Can a bad sensor cause P1299 without real overheating?",
        answer:
          "Yes. A faulty cylinder head temperature sensor or its wiring can make the PCM believe the engine is overheating. Verify the sensor reading against actual coolant temperature before assuming the worst.",
      },
    ],
    closing: {
      title: "After a P1299 event, verify more than the code",
      paragraphs: [
        "Repairing the cause is only half of a P1299 job. The other half is establishing whether the overheat that triggered it did any damage on the way through.",
        "Once the cooling fault is fixed, bring the engine to full operating temperature and watch coolant and cylinder head temperature stabilise where they should. Then check for the aftermath: coolant in the oil, oil in the coolant, bubbles in the reservoir, a reservoir that pressurises quickly, or a misfire that was not there before.",
        "Keep the freeze-frame data from the original event. If a head-gasket question comes up later, the record of how hot the engine actually got and under what load is the most useful evidence you will have.",
      ],
    },
    sources: [fordObd2017, fordObd2024, fordManuals],
  },

  /* ------------------------------------------------------------------ P2196 */
  {
    slug: "ford/f-150/5-0/p2196",
    code: "P2196",
    title: "P2196 Code Ford F150: O2 Sensor Stuck Rich Diagnosis",
    description:
      "P2196 means the Bank 1 upstream oxygen sensor is reporting rich and not responding. Here is how to tell a lying sensor from a genuinely rich engine.",
    definition: "O2 Sensor Signal Biased/Stuck Rich (Bank 1, Sensor 1)",
    severity: "Diagnose promptly",
    driveAdvice:
      "The truck will usually drive, but fuel control on Bank 1 is compromised and that has consequences. A genuinely rich mixture wastes fuel, dilutes oil and can overheat a catalytic converter. Get it diagnosed before it becomes a converter bill, and stop if the engine misfires or the lamp begins flashing.",
    quickAnswer:
      "P2196 means the upstream oxygen sensor on Bank 1 is reporting a rich mixture and staying there instead of switching the way a working sensor should. There are only two real possibilities, and the whole diagnosis is about separating them: either the engine truly is running rich and the sensor is reporting accurately, or the sensor has failed in a way that makes it report rich regardless of what is happening in the exhaust. Bank 1 on the 5.0L V8 is the passenger-side bank containing cylinder 1.",
    symptoms: [
      {
        key: "fuel-economy",
        label: "Noticeably worse fuel economy",
        response:
          "Consistent with a genuinely rich condition. Check long-term fuel trim on Bank 1 — if it has gone strongly negative, the PCM is pulling fuel out to compensate, which suggests the rich indication is real.",
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
          "A rich mixture can foul plugs and produce misfire. Check whether misfire codes stored alongside P2196 — if they did, resolve the fuel-control problem first because it is likely causing the misfire.",
      },
      {
        key: "light-only",
        label: "Light on but the truck drives normally",
        response:
          "More consistent with a biased sensor than a genuinely rich engine. Compare Bank 1 and Bank 2 behaviour: if only one bank looks wrong and trims are normal, suspicion shifts toward the sensor.",
      },
    ],
    causes: [
      {
        cause: "Genuinely rich mixture on Bank 1",
        evidence:
          "Long-term fuel trim strongly negative on Bank 1 as the PCM removes fuel; plugs on that bank look sooty",
        firstTest:
          "Compare Bank 1 and Bank 2 fuel trims — a real rich condition usually shows in the trim data before anywhere else",
      },
      {
        cause: "Contaminated or failed sensor",
        evidence:
          "Sensor voltage sits high and does not respond to forced mixture changes; other bank behaves normally",
        firstTest:
          "Force a mixture change and watch whether the sensor reacts at all; a stuck sensor simply does not move",
      },
      {
        cause: "Wiring, connector or heater-circuit fault",
        evidence:
          "Damaged or chafed harness near the exhaust; heater-circuit codes stored alongside P2196",
        firstTest:
          "Inspect the sensor harness and connector for heat damage and corrosion before replacing anything",
      },
      {
        cause: "Excess fuel pressure or a leaking injector",
        evidence:
          "Fuel pressure above specification, or one cylinder on Bank 1 running noticeably richer than the rest",
        firstTest:
          "Compare commanded against actual fuel pressure, then test injectors on that bank",
      },
      {
        cause: "Sensor contamination from oil or coolant consumption",
        evidence:
          "Engine consumes oil or coolant; sensor tip is visibly fouled when removed",
        firstTest:
          "Remove and inspect the sensor, and investigate the consumption rather than just fitting a replacement",
      },
    ],
    freezeFrame: [
      "Short and long-term fuel trim on both banks, which is the single most useful comparison for this code",
      "Oxygen sensor voltage or lambda at the moment the code set",
      "Engine coolant temperature, separating a cold-start-only fault from a fully warm one",
      "Engine load and rpm, since some fuel-control faults only appear at idle or only under load",
      "Any companion codes — misfire, EVAP purge or fuel-pressure faults change the diagnostic order",
      "Calculated fuel pressure or commanded rail pressure where your scan tool reports it",
    ],
    steps: [
      {
        title: "Compare the two banks before anything else",
        detail:
          "Bank 2 is your control group. If Bank 1 trims are strongly negative while Bank 2 sits normal, the rich condition is probably real. If both banks look normal and only the sensor reads odd, the sensor becomes the suspect.",
      },
      {
        title: "Watch the sensor respond to a forced change",
        detail:
          "Create a deliberate mixture change and watch the sensor. A working sensor moves quickly. One that is stuck rich barely moves at all, and that difference is the clearest evidence you can gather.",
      },
      {
        title: "Inspect the harness and connector",
        detail:
          "Oxygen sensor wiring runs close to the exhaust and takes heat, vibration and road salt. Check for chafing, melted insulation and corroded terminals before you order a sensor.",
      },
      {
        title: "Check fuel pressure against commanded",
        detail:
          "Pressure above specification over-fuels every cylinder it feeds. Comparing commanded with actual pressure separates a fuel-delivery cause from a sensor cause quickly.",
      },
      {
        title: "Test the injectors on Bank 1",
        detail:
          "A leaking or over-delivering injector produces a genuinely rich bank. If trim data says the mixture really is rich, this is where to look next.",
      },
      {
        title: "Inspect the sensor itself",
        detail:
          "Remove it and look. A tip fouled with oil, coolant residue or silicone tells you both that the sensor is finished and that something else caused it — and that second part matters more.",
      },
      {
        title: "Verify with trim data, not just a cleared code",
        detail:
          "After the repair, confirm Bank 1 trims sit near Bank 2 and that the sensor switches normally. A code that has not returned yet is not the same as fuel control that has been proven correct.",
      },
    ],
    dontReplace:
      "Do not replace the oxygen sensor as your first move. P2196 is exactly the code where a healthy sensor gets blamed for accurately reporting a rich engine. Check fuel trims on both banks first: if Bank 1 trims have gone strongly negative, the PCM already agrees the mixture is rich, and a new sensor will report the same thing.",
    yearNotes: [
      "Bank 1 on the 5.0L V8 is the passenger-side bank containing cylinder 1. Sensor 1 is upstream of the catalytic converter. Confirm both before working, because replacing a downstream sensor will not address this code.",
      "Sensor type and connector differ across model years. Match the part to your VIN rather than to a generic listing for the engine family.",
      "If your truck consumes oil or coolant, expect repeat sensor contamination. Fitting a replacement without addressing the consumption gives you the same code again later.",
    ],
    faqs: [
      {
        question: "What does P2196 mean on a Ford F-150?",
        answer:
          "The upstream oxygen sensor on Bank 1 is reporting a rich mixture and is not switching normally. Either the engine really is rich, or the sensor has failed in a way that makes it report rich.",
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
        question: "Can P2196 damage my catalytic converter?",
        answer:
          "A genuinely rich mixture can, yes. Excess fuel reaching the converter raises its temperature and shortens its life, which is why this is worth diagnosing promptly rather than driving on.",
      },
      {
        question: "Why did P2196 come back after a new sensor?",
        answer:
          "Almost always because the engine was genuinely running rich and the original sensor was correct. Look at fuel pressure, injectors and anything causing over-fuelling on that bank.",
      },
    ],
    closing: {
      title: "Proving fuel control is right again",
      paragraphs: [
        "The verification for P2196 is data, because the failure mode is a sensor that reports plausibly wrong values. A code that has not yet returned tells you very little on its own.",
        "Bring the engine to full operating temperature and compare the two banks. Bank 1 short and long-term trims should sit close to Bank 2, and the upstream sensor should switch actively rather than parking at one value. Then drive the load and temperature conditions from your original freeze frame and confirm it still behaves.",
        "If Bank 1 trims stay skewed after a sensor replacement, stop replacing sensors. That pattern means the mixture itself is wrong, and the answer is in fuel pressure, injectors or something else adding fuel that the sensor was reporting accurately all along.",
      ],
    },
    sources: [fordObd2017, fordObd2024, fordManuals],
  },

  /* ------------------------------------------------------------------ P1000 */
  {
    slug: "ford/f-150/5-0/p1000",
    code: "P1000",
    title: "P1000 Code Ford F150: Why It Sets and How to Clear It",
    description:
      "P1000 is not a fault. It means your F-150 has not finished its OBD self-tests yet — here is why it appears and how to complete the drive cycle.",
    definition: "OBD-II Monitor Testing Not Complete",
    severity: "Service soon",
    driveAdvice:
      "Drive normally. P1000 does not indicate anything wrong with the truck, and on its own it does not illuminate the check-engine light. The only thing it will stop you doing is passing an emissions inspection, because the testing station needs the self-tests finished before it can read a result.",
    quickAnswer:
      "P1000 is the code most often misunderstood, so here is the short version: it is not a fault. Your PCM runs a set of self-tests called monitors — catalyst, EVAP, oxygen sensor, misfire and others — and each needs specific conditions before it can run. P1000 simply means those tests have not all finished since the memory was last cleared. Disconnect the battery, clear codes after a repair, or have a module reprogrammed, and P1000 appears by design.",
    symptoms: [
      {
        key: "after-clearing",
        label: "Appeared right after clearing codes or disconnecting the battery",
        response:
          "Exactly what should happen. Clearing memory resets every monitor to incomplete, and P1000 records that state. It will clear itself once the monitors have run.",
      },
      {
        key: "emissions-fail",
        label: "Emissions test rejected the truck",
        response:
          "The common real-world consequence. Testing stations need monitors to report ready, and P1000 means they are not. You need to complete the drive cycle before returning, not repair anything.",
      },
      {
        key: "no-symptoms",
        label: "No symptoms and no check-engine light",
        response:
          "Normal for P1000. It is an informational code rather than a fault, and by itself it does not illuminate the lamp. Drive the truck and let the monitors complete.",
      },
      {
        key: "wont-clear",
        label: "Will not clear no matter how much you drive",
        response:
          "This is the case worth investigating. If P1000 persists across a lot of varied driving, a monitor is being blocked — often by another stored fault, or because the drive conditions a specific monitor needs have not been met.",
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
        cause: "Battery was disconnected or went flat",
        evidence:
          "Battery replacement, a jump start or a flat battery in the recent history",
        firstTest:
          "Confirm the readiness status and simply complete a drive cycle before assuming a fault exists",
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
          "Other codes present alongside P1000, and the same monitors never complete",
        firstTest:
          "Read all stored codes; a monitor will not run while a fault in its own system is active",
      },
      {
        cause: "Fuel level outside the required window",
        evidence:
          "EVAP monitor in particular stays incomplete while the tank is nearly full or nearly empty",
        firstTest:
          "Check fuel level against the range the EVAP monitor needs and adjust before repeating the drive cycle",
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
          "Read everything stored. P1000 on its own means the tests have not finished. P1000 alongside other codes means you have a real fault to repair first, and that fault is likely why a monitor cannot complete.",
      },
      {
        title: "Read monitor readiness, not just codes",
        detail:
          "Your scan tool can show which monitors are complete and which are not. That list tells you exactly what kind of driving is still needed, instead of guessing at it.",
      },
      {
        title: "Repair any genuine faults first",
        detail:
          "A monitor will not run while there is an active fault in the system it tests. Chasing P1000 before fixing a stored EVAP or misfire code wastes fuel and gets you nowhere.",
      },
      {
        title: "Set the tank to a middle fuel level",
        detail:
          "The EVAP monitor is usually the last to complete, and it needs the tank in a specific range — roughly middling rather than full or nearly empty. Getting this right first saves repeat attempts.",
      },
      {
        title: "Drive a genuine mixed cycle",
        detail:
          "Monitors need variety: a cold start, idling, steady cruise at road speed, and some deceleration. A truck used only for short town trips can go weeks without completing them all.",
      },
      {
        title: "Include a proper cold start",
        detail:
          "Several monitors only run after the engine has sat long enough to cool fully. An overnight park followed by a normal drive does more for readiness than an hour of restarts.",
      },
      {
        title: "Recheck readiness before returning for testing",
        detail:
          "Check the monitor status again rather than assuming enough driving has happened. Arriving at an inspection station with monitors still incomplete simply repeats the rejection.",
      },
    ],
    dontReplace:
      "Do not let anyone sell you parts for P1000. There is nothing to repair — the code reports that self-tests have not finished, not that something has failed. If a shop quotes a repair for P1000 by itself, ask which monitors are incomplete and why. The honest answer is usually that the truck needs driving, not parts.",
    yearNotes: [
      "P1000 is Ford-specific. Other manufacturers report incomplete monitors differently, so generic code lists often describe it poorly or treat it as a fault.",
      "The exact drive cycle Ford specifies varies by model year and engine. Use the procedure for your truck rather than a universal drive cycle from a forum.",
      "Trucks driven mainly on short trips struggle to complete monitors at all. If yours does short runs only, plan a deliberate longer drive rather than waiting for it to happen naturally.",
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
          "You do not clear it directly — it clears itself once all monitors have run and reported complete. That needs a proper drive cycle including a cold start, steady road speed and some deceleration.",
      },
      {
        question: "How long does it take for P1000 to go away?",
        answer:
          "Anywhere from one good mixed drive to several days, depending on how you use the truck and which monitors are outstanding. The EVAP monitor is usually the last to complete because it needs particular fuel-level and temperature conditions.",
      },
      {
        question: "Why does P1000 keep coming back?",
        answer:
          "Either the codes are being cleared repeatedly, or another stored fault is blocking a monitor from running. Read all stored codes and check monitor readiness rather than clearing again.",
      },
      {
        question: "Can I pass an emissions test with P1000?",
        answer:
          "Generally no. Testing stations require monitors to report ready, and P1000 means they are not. Complete the drive cycle first, then return.",
      },
    ],
    closing: {
      title: "Getting the monitors to complete without wasting a week",
      paragraphs: [
        "The most efficient approach to P1000 is to stop guessing and read monitor readiness. That single screen tells you which tests are outstanding, and different monitors need genuinely different driving.",
        "Plan one deliberate drive rather than hoping normal use gets there. Park overnight so the engine starts genuinely cold, keep the tank around half full for the EVAP monitor, then drive a mix of steady road speed, some town work and a few decelerations without touching the throttle. Most monitors complete within one or two cycles of that kind.",
        "If specific monitors still refuse to complete after several proper attempts, stop driving and start diagnosing. A monitor that will not run is usually being blocked by a fault in the system it tests, and that fault is the real job.",
      ],
    },
    sources: [fordObd2017, fordObd2024, fordManuals],
  },
];
