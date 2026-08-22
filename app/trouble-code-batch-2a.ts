import type { TroubleCodeGuide } from "./trouble-code-data";
import { fordManuals, fordObd2017, fordObd2024, goPartsP0301, goPartsP1450, nhtsaTsb, repairPalCanister, repairPalPurge, tsb202324 } from "./trouble-code-sources";

/**
 * Ford F-150 5.0L trouble-code guides: P0301, P0456, P1450.
 *
 * Cost ranges are planning figures taken from published U.S. estimate data and
 * are labelled as such on the page. Where a figure could not be sourced, the
 * page says so instead of carrying an invented number.
 */
export const troubleCodeBatch2a: TroubleCodeGuide[] = [
  /* ------------------------------------------------------------------ P0301 */
  {
    slug: "ford/f-150/5-0/p0301",
    code: "P0301",
    title: "P0301 Code Ford F150: Cylinder 1 Misfire Causes & Fixes",
    description:
      "What P0301 means on a Ford F-150, where cylinder 1 actually is, the free coil-swap test that finds the fault, and what the repair costs.",
    definition: "Cylinder 1 Misfire Detected",
    severity: "Stop soon",
    driveAdvice:
      "If the light is flashing, the misfire is bad enough to threaten your catalytic converters — ease off and stop as soon as you safely can. A steady light with an engine that still pulls cleanly may give you a short, gentle trip to get it diagnosed, but every mile of towing or hard acceleration raises the odds you turn a $60 coil into a four-figure converter bill.",
    quickAnswer:
      "P0301 is the code your PCM stores when it counts misfire events on cylinder 1 specifically. That is genuinely good news compared with P0300 — the truck has already narrowed the fault to one cylinder for you. On the 5.0L V8, cylinder 1 sits at the front of Bank 1, the passenger-side bank. What the code still does not tell you is which part in that cylinder gave up. Across F-150 model years, a failed ignition coil or a worn spark plug account for the large majority of P0301 repairs, and you can separate those two for free in about fifteen minutes before spending anything.",
    symptoms: [
      {
        key: "rough-idle",
        label: "Rough or shaking idle that smooths out under load",
        response:
          "Classic single-cylinder misfire behaviour. At idle there is no load to mask the missing contribution, so you feel it most sitting still. Pull freeze-frame data before you touch anything — it records the rpm, load and coolant temperature where the misfire actually happened, and that context is gone the moment you clear the code.",
      },
      {
        key: "flashing-light",
        label: "Check-engine light is flashing",
        response:
          "Stop driving as soon as it is safe. A flashing lamp means raw fuel is reaching the exhaust in quantity, and a catalytic converter can be destroyed in minutes rather than months. This is the one symptom on this page that overrides everything else, including your schedule.",
      },
      {
        key: "cold-only",
        label: "Only misfires when cold, then clears",
        response:
          "Look hardest at the plug gap, a cracked porcelain insulator, or a coil boot that leaks only until it warms and expands. Cold-only misfire also points at fuel that is momentarily too lean at start-up, so check trims and any companion EVAP or fuel codes before assuming the coil.",
      },
      {
        key: "power-loss",
        label: "Noticeable power loss and worse fuel economy",
        response:
          "One cylinder out of eight is roughly an eighth of your power gone, and the PCM is still injecting fuel into a cylinder that is not burning it properly. That fuel leaves through the exhaust, which is both why economy drops and why the converter is at risk.",
      },
      {
        key: "smell",
        label: "Fuel smell from the exhaust",
        response:
          "Unburned fuel reaching the tailpipe. Combined with a misfire code this raises the urgency considerably, because that fuel ignites inside the catalytic converter and takes its temperature well beyond design. Treat it like a flashing light.",
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
        cause: "Failing coil-on-plug (most common)",
        evidence:
          "Misfire follows the coil when you move it to another cylinder; boot shows carbon tracking or the connector lock is broken",
        firstTest:
          "Swap the cylinder 1 coil with a neighbouring cylinder, clear codes, and see whether the misfire follows the coil",
      },
      {
        cause: "Worn, fouled or wrong-gap spark plug",
        evidence:
          "Cylinder 1 plug looks different from the other seven — eroded electrode, cracked insulator, fuel or oil fouling, gap out of specification",
        firstTest:
          "Pull the cylinder 1 plug and lay it beside the rest; compare against the year-specific Motorcraft part number and gap",
      },
      {
        cause: "Injector fault on cylinder 1",
        evidence:
          "Misfire stays on cylinder 1 after a coil and plug swap; injector is noticeably quiet, or its electrical resistance is out of line with the others",
        firstTest:
          "Listen with a stethoscope, compare injector resistance across cylinders, then run the injector test your scan tool supports",
      },
      {
        cause: "Vacuum leak feeding that runner",
        evidence:
          "Bank 1 fuel trims run positive as well as the misfire; a hiss changes with a smoke test near the intake or a broken PCV fitting",
        firstTest:
          "Smoke-test the intake and inspect the PCV connections — never spray flammable cleaner at a hot running engine",
      },
      {
        cause: "Low compression or a mechanical fault",
        evidence:
          "Misfire will not move with parts; relative compression on cylinder 1 is down, or you hear valvetrain noise from that corner",
        firstTest:
          "Run relative compression from the scan tool first, then a mechanical compression or leak-down test if it looks low",
      },
    ],
    deepDive: [
      {
        heading: "The coil swap: the most valuable free test you can run",
        paragraphs: [
          "Before you buy anything, move the cylinder 1 coil to another cylinder and move that cylinder's coil to position 1. Clear the code, then drive the conditions your freeze frame recorded. What happens next answers the question that would otherwise cost you money.",
          "If the code comes back as P0302 or whichever cylinder now holds the original coil, the coil is faulty and you have proven it without spending a cent. If it comes back as P0301 again, the coil is fine and you have eliminated the single most common cause for free. Either result is worth more than a guess, and this is why every competent diagnostic sequence for a cylinder-specific misfire starts here.",
          "One caution: label the coils before you move them. It is embarrassingly easy to lose track of which coil started where, and then the test tells you nothing.",
        ],
      },
      {
        heading: "What the spark plug tells you when you pull it",
        bullets: [
          "Light tan or grey insulator — the plug has been running correctly; look elsewhere for the fault",
          "Black and sooty — running rich on that cylinder, which points at an injector or a fuel-control problem",
          "Wet with fuel — that cylinder is not igniting at all, consistent with a dead coil or an injector stuck open",
          "Oily deposits — oil is entering the combustion chamber, which is a valve-seal or ring problem rather than an ignition one",
          "Cracked porcelain insulator — replace it; a hairline crack lets spark escape to ground and produces exactly this code",
          "Gap noticeably wider than the others — normal wear, and on a high-mileage truck often the whole answer",
        ],
      },
      {
        heading: "Why replacing all eight coils is the expensive mistake",
        paragraphs: [
          "P0301 has already done the diagnostic work that P0300 leaves you to do. It named the cylinder. Replacing all eight coils on that information throws away the one advantage the code gave you, multiplies the parts bill by eight, and disturbs seven connectors that were working perfectly.",
          "There is a second cost that is easy to miss. If the real fault is an injector or low compression on cylinder 1, eight new coils will not fix it — and now you have spent the diagnostic budget and still have the original misfire. Shops see this sequence constantly: parts first, diagnosis second, and the diagnosis eventually happens anyway.",
        ],
      },
    ],
    freezeFrame: [
      "Engine rpm and calculated load when the misfire counted — idle-only and load-only faults point in different directions",
      "Engine coolant temperature, which separates a cold-start fault from a fully warm one",
      "Short and long-term fuel trim on Bank 1; positive trims alongside the misfire suggest air or fuel rather than ignition",
      "Misfire counters for all eight cylinders, so you can confirm cylinder 1 really is dominating rather than merely leading",
      "Vehicle speed and throttle position, which tell you whether it happens under acceleration or at steady cruise",
      "Any companion codes stored at the same moment — P0171, P0316 or a cam/crank code changes the order you work in",
    ],
    steps: [
      {
        title: "Save the evidence before you clear anything",
        detail:
          "Record the freeze frame and the misfire counters for every cylinder. Once you clear the code that information is gone, and you will have no way to prove your repair worked other than waiting to see whether the light returns.",
      },
      {
        title: "Confirm cylinder 1 is genuinely dominating",
        detail:
          "Compare the counters across all eight cylinders. If cylinders 1 and 5 are both climbing, you are looking at something bank-level rather than one failed part. If only cylinder 1 counts, the fault is physically in that cylinder and the search area is now very small.",
      },
      {
        title: "Inspect the plug before you buy a coil",
        detail:
          "Cylinder 1 is the front cylinder on the passenger side and one of the more accessible plugs on this engine. Compare it directly against the others — a plug that looks different from its neighbours has usually already told you the answer, and the read-out from its deposits narrows the cause further.",
      },
      {
        title: "Move the coil, not your money",
        detail:
          "Swap the cylinder 1 coil with a neighbour, label both, clear the code and drive the conditions from your freeze frame. If the misfire moves, the coil is the fault. If it stays on cylinder 1, you have just ruled out the most common cause for free.",
      },
      {
        title: "Check the coil boot and connector while it is out",
        detail:
          "Carbon tracking inside the boot looks like a thin black line running down the insulator, and it lets spark escape to ground. A broken connector lock lets the coil work loose over time. Both are cheap fixes that get missed when someone only inspects the coil body.",
      },
      {
        title: "Test the injector on that cylinder",
        detail:
          "With the plug and coil eliminated, listen to the injector and compare its resistance with the rest. Many scan tools can also cut individual injectors and show the resulting rpm drop, which tells you whether that cylinder was contributing at all.",
      },
      {
        title: "Check compression when parts do not move the fault",
        detail:
          "A misfire that refuses to follow any component is a mechanical one. Relative compression from the scan tool is quick and non-invasive; follow it with a proper compression or leak-down test if the numbers look wrong. This is the point at which the job stops being a DIY afternoon.",
      },
      {
        title: "Verify with data, not with the dash light",
        detail:
          "After the repair, drive the load and temperature conditions the freeze frame recorded and watch the misfire counters stay at zero. A lamp that stays off for five minutes at idle proves nothing about a misfire that only appeared under load.",
      },
    ],
    tsbs: [
      tsb202324,
    ],
    costs: [
      {
        job: "Coil swap diagnostic test",
        parts: "$0",
        shop: "Usually inside a diagnostic fee",
        diy: "Easy — 15 minutes, basic hand tools",
        note: "Identifies or eliminates the most common cause before you spend anything",
      },
      {
        job: "Single ignition coil replacement",
        parts: "About $40–$100",
        shop: "Roughly $150–$300 per coil",
        diy: "Easy on the 5.0L — coil is on top of the plug",
        note: "Labour is typically under an hour; parts are widely available",
      },
      {
        job: "Spark plug (single cylinder)",
        parts: "About $15–$25",
        shop: "Often bundled with coil labour",
        diy: "Easy for cylinder 1; harder for rear cylinders",
        note: "Many owners replace the boot at the same time",
      },
      {
        job: "Full set of eight plugs",
        parts: "About $120–$200",
        shop: "Varies widely by model year and access",
        diy: "Moderate — rear cylinders are tight",
        note: "Sensible as maintenance at interval; not a diagnosis for P0301",
      },
      {
        job: "Fuel injector (single)",
        parts: "Varies by engine and year",
        shop: "Get a quote — direct-injection parts cost more",
        diy: "Advanced on direct-injection engines",
        note: "Only after coil and plug are eliminated by testing",
      },
      {
        job: "Typical all-in P0301 repair",
        parts: "—",
        shop: "Commonly $100–$500",
        diy: "—",
        note: "Wide range because the cause ranges from a $20 plug to internal engine work",
      },
    ],
    dontReplace:
      "Do not replace all eight coils and all eight plugs because one cylinder misfired. P0301 has already done the hard part and named the cylinder. Blanket replacement costs eight times as much, risks damaging seven healthy connectors, and — if the real fault is compression or an injector — leaves you exactly where you started with an empty wallet. Do the free coil swap first. It takes fifteen minutes and it either finds the fault or eliminates the most likely one.",
    yearNotes: [
      "Cylinder 1 is the front cylinder on Bank 1, the passenger-side bank on the 5.0L V8. Do not carry a bank convention over from another manufacturer, because it will send you to the wrong side of the engine.",
      "Spark-plug part numbers and gap specifications changed across 5.0L generations. Look yours up by VIN rather than trusting a parts-counter cross-reference, and note that some model years use a plug that is not intended to be re-gapped.",
      "On 2.7L EcoBoost trucks, Ford has linked P0301 alongside other misfire and fuel-trim codes to leaking direct-injection fuel injectors and PCM calibration. If your truck is a 2.7L rather than a 5.0L, check whether a bulletin covers your VIN before buying ignition parts.",
      "Later trucks store more detailed misfire data than early ones. If your scan tool shows only a code and no counters, borrow one that reads live misfire data before you start replacing parts.",
    ],
    faqs: [
      {
        question: "Where is cylinder 1 on a Ford F-150 5.0L?",
        answer:
          "At the front of Bank 1, which is the passenger-side bank. That makes it one of the more accessible cylinders on this engine, so plug and coil inspection is usually straightforward compared with the rear cylinders.",
      },
      {
        question: "Can I drive with P0301?",
        answer:
          "Only briefly and gently, and only if the light is steady rather than flashing. A flashing light means the misfire is actively threatening your catalytic converters, and you should stop as soon as it is safe to do so.",
      },
      {
        question: "How much does it cost to fix P0301 on an F-150?",
        answer:
          "Most repairs land somewhere between $100 and $500 all-in. A coil is commonly $150–$300 fitted, and a single spark plug can be under $50. The range is wide because the same code can mean a $20 plug or internal engine work.",
      },
      {
        question: "Should I replace the coil or the plug first?",
        answer:
          "Inspect the plug first, because it costs nothing and it frequently shows the fault outright. Then move the coil to a different cylinder — if the misfire follows it, you have identified the coil without buying anything at all.",
      },
      {
        question: "What is the difference between P0301 and P0300?",
        answer:
          "P0301 names cylinder 1 specifically. P0300 means the PCM saw misfire across several cylinders, or with no single cylinder dominating. P0301 is much easier to chase because the diagnosis starts in one known place.",
      },
      {
        question: "Why did P0301 come back after I replaced the plug and coil?",
        answer:
          "Because the fault was never in the ignition system. A misfire that survives new plugs and coils is usually an injector or a compression problem, and both are diagnosed by testing rather than by buying more parts.",
      },
      {
        question: "Can a vacuum leak cause a single-cylinder misfire?",
        answer:
          "Yes, if the leak feeds one intake runner or one injector seal. The tell is positive Bank 1 fuel trims alongside the misfire. A smoke test finds it quickly and safely.",
      },
      {
        question: "Is P0301 covered by any Ford service bulletin?",
        answer:
          "On 2018 F-150 trucks with the 2.7L EcoBoost, Ford TSB 20-2324 lists P0301 among several codes linked to PCM software and leaking direct-injection injectors. It does not apply to the 5.0L, and a bulletin only applies if your VIN falls inside its coverage.",
      },
    ],
    closing: {
      title: "How to confirm the P0301 repair actually held",
      paragraphs: [
        "Clear the code only after you have fixed something specific, and only after the original freeze frame is written down. Clearing first destroys the one record you have of the conditions the misfire happened under, which is exactly what you need to reproduce for verification.",
        "Drive the truck through the rpm, load and coolant-temperature window your freeze frame recorded, and watch the cylinder 1 misfire counter while you do it. Zero counts across the conditions that previously set the code is the proof you want. A dashboard that simply stays dark is not the same thing, particularly for a fault that only appeared under load or when cold.",
        "If the counter starts climbing again, resist the temptation to clear and re-drive. Save the new data instead. A misfire that returns under a different load or temperature than before is telling you something useful about which system is actually failing, and that information disappears every time you reset the memory.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsP0301, nhtsaTsb, fordManuals],
  },

  /* ------------------------------------------------------------------ P0456 */
  {
    slug: "ford/f-150/5-0/p0456",
    code: "P0456",
    title: "P0456 Code Ford F150: Small EVAP Leak Causes & Fixes",
    description:
      "P0456 means a 0.020-inch EVAP leak on your F-150. What actually causes it, why the cap is worth checking first, and what a smoke test costs.",
    definition: "Evaporative Emission System Leak Detected (very small leak)",
    severity: "Service soon",
    driveAdvice:
      "P0456 will not leave you stranded and it will not damage the engine. Your truck is telling you that fuel vapour is escaping to the atmosphere instead of being captured and burned. Drive it, but do not ignore it — it will fail an emissions test, and a leak this small does not seal itself.",
    quickAnswer:
      "P0456 means Ford's evaporative-emissions monitor sealed the fuel-vapour system, watched the pressure, and found a leak. The threshold is genuinely tiny: the monitor is looking for an opening of about 0.020 inches, which is roughly 0.5 mm — a pinhole. Because the leak is that small, the cause is usually equally small. On F-150s the fuel cap and the EVAP canister vent valve between them account for the majority of P0456 repairs, and one of those two costs nothing to check.",
    symptoms: [
      {
        key: "light-only",
        label: "Check-engine light with no drivability change",
        response:
          "This is the normal presentation, and it is expected. The EVAP system handles fuel vapour, not fuel delivery, so a very small leak does not change how the engine runs. The light is the only symptom you will get, which is precisely why it gets ignored.",
      },
      {
        key: "after-fuel",
        label: "Light appeared shortly after refuelling",
        response:
          "Start at the cap. Removing and reinstalling it is the one variable that changed, and a cap that was not tightened until it clicked — or that trapped grit on its seal — is the single most common cause of this code.",
      },
      {
        key: "fuel-smell",
        label: "Faint fuel smell near the rear of the truck",
        response:
          "Worth taking seriously even though P0456 describes a small leak. Inspect the filler neck, the cap seal and the vapour lines above the tank. A smell you can actually detect usually indicates something larger than the monitor threshold.",
      },
      {
        key: "emissions-fail",
        label: "Failed an emissions inspection",
        response:
          "Expected with this code. P0456 is an emissions fault by definition, and an illuminated lamp fails inspection in most jurisdictions regardless of which code caused it. Repair, then let the EVAP monitor complete before returning.",
      },
      {
        key: "comes-and-goes",
        label: "Code clears itself then returns later",
        response:
          "Typical of a seal that leaks only at certain temperatures or fuel levels. The EVAP monitor runs only under specific conditions, so an intermittent code means you need to test the system deliberately with smoke rather than waiting for it to reappear.",
      },
      {
        key: "hard-start",
        label: "Brief hard start right after filling up",
        response:
          "Points more toward a purge valve stuck open than a plain leak, because raw vapour is reaching the intake at a moment the engine cannot use it. Check for companion purge-circuit codes alongside the P0456.",
      },
    ],
    causes: [
      {
        cause: "Fuel cap not sealing (check first)",
        evidence:
          "Cap was recently removed, does not click when tightened, or its rubber seal is cracked, glazed or has debris on it",
        firstTest:
          "Remove the cap, wipe the seal and filler neck, refit until it clicks, then clear the code and let the monitor run again",
      },
      {
        cause: "EVAP canister vent valve",
        evidence:
          "Valve will not seal when commanded closed, or the system cannot hold vacuum during a scan-tool test",
        firstTest:
          "Command the vent valve closed and watch whether the fuel-tank pressure sensor holds its reading",
      },
      {
        cause: "Cracked or hardened vapour hose",
        evidence:
          "Visible cracking near clamps and bends, or a smoke test shows vapour escaping from a line rather than a component",
        firstTest:
          "Smoke-test the sealed EVAP system and follow the smoke — a 0.020-inch leak is far easier to see than to find by hand",
      },
      {
        cause: "Purge valve not sealing",
        evidence:
          "Valve passes when commanded closed; idle quality or fuel trims disturbed alongside the EVAP code",
        firstTest:
          "Command the purge valve closed and confirm it actually seals rather than leaking through",
      },
      {
        cause: "Charcoal canister or its seals",
        evidence:
          "Smoke escapes around the canister body or its fittings; canister shows physical damage from road debris",
        firstTest:
          "Inspect the canister and its connections directly, since it sits where stones and road salt reach it",
      },
      {
        cause: "Filler neck or tank seal damage",
        evidence:
          "Corrosion or impact damage around the filler neck, or a seal that has flattened with age",
        firstTest:
          "Inspect the neck and its sealing surface with a light before assuming the cap itself is at fault",
      },
    ],
    deepDive: [
      {
        heading: "How small is a 0.020-inch leak, really?",
        paragraphs: [
          "Half a millimetre. That is smaller than the lead in a mechanical pencil, and it explains almost everything about how this code behaves. You will not hear it, you will not see it, and in most cases you will not smell it. A visual inspection of the EVAP system can be completely honest and completely unhelpful at the same time.",
          "It also explains why smoke testing is not an optional luxury on this code. Introducing smoke into the sealed system and watching where it escapes is the only practical way to locate an opening that size. Trying to find it by feel, by ear or by replacing likely components in sequence is how people spend $400 on a code that a $25 cap would have fixed.",
        ],
      },
      {
        heading: "Why the monitor will not clear the moment you tighten the cap",
        paragraphs: [
          "Ford's EVAP monitor does not run continuously. It needs the fuel level inside a specific range, an ambient temperature window, and a period of stable driving before it will test at all. Tighten the cap and the code stays exactly where it was until those conditions line up again.",
          "This trips people up constantly. They tighten the cap, drive to the shop, see the light still on, and conclude the cap was not the problem — then pay for a diagnosis of a fault they had already fixed. Give it a few days of ordinary driving with the tank somewhere in the middle of its range before you decide the cap was innocent.",
        ],
      },
      {
        heading: "P0456 versus the other EVAP codes",
        bullets: [
          "P0456 — very small leak, around the 0.020-inch threshold. Cap, seal or hairline crack territory",
          "P0455 — gross leak. A missing cap, a disconnected hose or something obviously open",
          "P0442 — medium leak, sitting between the two above",
          "P0446 — vent control circuit fault, which points at the vent valve or its wiring rather than a leak",
          "P1450 — the opposite problem: the tank cannot vent and vacuum is trapped inside it",
        ],
      },
    ],
    freezeFrame: [
      "Fuel level at the moment the monitor ran — the EVAP test needs the tank within a specific range, and this tells you the test was valid",
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
          "Remove it, look at the rubber seal under good light, wipe the filler neck, and refit until it clicks. A surprising share of P0456 codes end here — and it costs nothing to rule out first. Look for a seal that has gone hard, shiny or cracked rather than soft and matte.",
      },
      {
        title: "Clear the code and let the monitor run",
        detail:
          "The EVAP monitor only runs under particular fuel-level and temperature conditions, so the code will not clear the moment you tighten the cap. Give it a few drive cycles with the tank around half full before deciding the cap was not the problem.",
      },
      {
        title: "Inspect the visible vapour lines",
        detail:
          "Work along the lines from the tank forward, paying attention to bends, clamps and anywhere a line passes near heat. Hardened plastic cracks where it flexes, and those cracks are often visible once you know to look for them specifically.",
      },
      {
        title: "Smoke-test the sealed system",
        detail:
          "This is the test that actually finds a 0.020-inch leak. Introduce smoke into the sealed EVAP system and watch where it escapes. A shop typically charges around $75–$150 for this, and it is money well spent compared with replacing components speculatively.",
      },
      {
        title: "Command the valves and watch the sensor",
        detail:
          "Use a scan tool to close the vent valve and operate the purge valve while watching the fuel-tank pressure sensor. A system that cannot hold vacuum with both valves commanded shut has either a leak or a valve that is not sealing, and the sensor trace tells you which.",
      },
      {
        title: "Inspect the canister and filler neck",
        detail:
          "Both sit low and exposed on a pickup, and both take road debris and winter salt. Physical damage here is easy to see once the smoke test has pointed you to the right area of the truck.",
      },
      {
        title: "Repair, then re-smoke before you reassemble",
        detail:
          "Small EVAP leaks frequently come in pairs, especially on an older truck where every rubber component has aged at the same rate. Testing again before you put everything back saves a second diagnosis in a fortnight.",
      },
      {
        title: "Confirm the monitor completes and passes",
        detail:
          "The repair is not verified until the EVAP monitor has run again and reported ready without setting the code. That takes specific conditions, so plan on a few days of normal driving rather than one trip around the block.",
      },
    ],
    costs: [
      {
        job: "Fuel cap replacement",
        parts: "About $20–$50",
        shop: "Parts plus minimal labour",
        diy: "Trivial — no tools",
        note: "Use a correct Ford-specification cap; generic caps are a common repeat-failure cause",
      },
      {
        job: "EVAP smoke-test diagnosis",
        parts: "$0",
        shop: "Roughly $75–$150",
        diy: "Needs a smoke machine",
        note: "Before parts. Almost always cheaper than guessing wrong once",
      },
      {
        job: "Vapour hose repair or replacement",
        parts: "About $100–$200",
        shop: "Parts plus labour to access",
        diy: "Moderate — access varies by location",
        note: "Cost depends heavily on where in the system the crack sits",
      },
      {
        job: "Canister vent solenoid",
        parts: "Varies by model year",
        shop: "From roughly $153 fitted",
        diy: "Moderate — often near the spare tyre",
        note: "A common F-150 failure point alongside the cap",
      },
      {
        job: "Purge valve replacement",
        parts: "About $30–$75",
        shop: "Roughly $150–$400",
        diy: "Moderate — engine-bay location",
        note: "RepairPal puts F-150 purge valve replacement around $220–$257",
      },
      {
        job: "Charcoal canister replacement",
        parts: "Higher — full assembly",
        shop: "Roughly $367–$597 by model year",
        diy: "Advanced — often requires tank access",
        note: "The expensive outcome, and the reason to smoke-test before condemning it",
      },
    ],
    dontReplace:
      "Do not start by replacing the charcoal canister or the purge valve. P0456 describes a leak the size of a pinhole, and the most common causes on an F-150 are the cap seal and the vent valve — both far cheaper. Replacing an expensive EVAP component without a smoke test is guessing at a $500 part when a $100 test would have shown you the actual hole.",
    yearNotes: [
      "EVAP system layout changed across F-150 generations, and later trucks may use a different vent-valve location and canister design. Confirm the layout for your model year before you go looking for a component under the bed.",
      "The canister vent valve is a recognised failure point on F-150s and sits near the spare tyre on many model years, where it collects road salt and debris.",
      "A capless filler system removes the cap as a variable but adds its own sealing flap and adapter. If your truck has one, inspect the flap seal rather than looking for a cap that is not there.",
      "Any aftermarket fuel-system work — a replacement tank, a sending unit, a lift pump — introduces new sealing surfaces. If the code appeared after that kind of job, start where the work was done.",
    ],
    faqs: [
      {
        question: "Will P0456 fail an emissions test?",
        answer:
          "Yes. It is an emissions fault by definition, and an illuminated check-engine light fails inspection in most jurisdictions regardless of the specific code behind it.",
      },
      {
        question: "Is it safe to keep driving with P0456?",
        answer:
          "Mechanically, yes. The EVAP system handles fuel vapour rather than fuel delivery, so the engine runs normally. Get it repaired anyway — it is releasing fuel vapour into the atmosphere, and it will not fix itself.",
      },
      {
        question: "How small is the leak in a P0456?",
        answer:
          "About 0.020 inches, or roughly half a millimetre — a pinhole. That is why the cause is usually a seal or a hairline crack rather than anything you could find by looking.",
      },
      {
        question: "How much does it cost to fix P0456?",
        answer:
          "Anywhere from about $25 for a fuel cap to roughly $600 for a charcoal canister. A smoke-test diagnosis runs around $75–$150 and is what decides which end of that range you are actually in.",
      },
      {
        question: "Why did the code not clear when I tightened the cap?",
        answer:
          "Because the EVAP monitor only runs inside a specific fuel-level and temperature window. It needs a few drive cycles to test again and confirm the system now seals, so give it several days before concluding the cap was innocent.",
      },
      {
        question: "What is the difference between P0456 and P0455?",
        answer:
          "They describe the same system and differ in leak size. P0456 is the very small leak threshold; P0455 indicates a gross leak, which is far more likely to be a missing cap or a disconnected line.",
      },
      {
        question: "Can I just keep clearing the code?",
        answer:
          "You can, but it will keep coming back and the truck will keep failing inspection. Clearing also resets the monitors, which means more driving before the system can confirm anything either way.",
      },
      {
        question: "Does the fuel cap need to be a Ford part?",
        answer:
          "It needs to meet the correct specification and seal properly. Cheap generic caps are a recognised cause of repeat EVAP codes, so this is one place where the correct part is worth the small extra cost.",
      },
    ],
    closing: {
      title: "Confirming an EVAP repair, which takes patience",
      paragraphs: [
        "EVAP repairs are the ones people most often think they have completed. The monitor does not run continuously, so the absence of a light immediately after the repair means very little on its own.",
        "After you have fixed the leak, clear the code and drive normally for several days with the tank somewhere in the middle of its range. Then check whether the EVAP monitor reports ready and whether the code stayed away. If your scan tool shows monitor readiness status, that is the number to watch rather than the dashboard.",
        "If the code returns after a genuine repair, smoke-test again rather than replacing a component. Small EVAP leaks frequently come in pairs on an older truck, and finding the second one is much faster the second time around because you already know how the system behaves.",
      ],
    },
    sources: [fordObd2017, fordObd2024, repairPalPurge, repairPalCanister, fordManuals],
  },

  /* ------------------------------------------------------------------ P1450 */
  {
    slug: "ford/f-150/5-0/p1450",
    code: "P1450",
    title: "P1450 Code Ford F150: Fuel Tank Vacuum Causes & Fixes",
    description:
      "P1450 means your F-150 could not bleed off fuel-tank vacuum. What traps it, why the tank can deform, the hiss test, and repair costs.",
    definition: "Unable to Bleed Up Fuel Tank Vacuum",
    severity: "Diagnose promptly",
    driveAdvice:
      "The engine will usually run normally, so this is not a stop-immediately code. The reason to deal with it promptly is the fuel tank: trapped vacuum can pull a plastic tank out of shape, and that turns an inexpensive valve repair into a tank replacement. A hard start right after refuelling is the other warning sign worth acting on.",
    quickAnswer:
      "P1450 is a Ford-specific code, and it describes a plumbing problem rather than an engine one. As fuel is drawn out of the tank, air has to come back in through the evaporative-emissions system to replace it. When something blocks that path — or when engine vacuum is being applied to the tank continuously — vacuum builds and will not bleed off. On F-150s the two components that cause this most often are a canister purge valve stuck open in the engine bay and a clogged canister vent solenoid near the spare tyre.",
    symptoms: [
      {
        key: "whoosh",
        label: "Loud rush of air when you open the fuel cap",
        response:
          "The most telling symptom on this page. That sound is atmospheric pressure rushing in to equalise a tank that has been sitting under vacuum. It points directly at a blocked vent path or a purge valve stuck open, and it costs nothing to check.",
      },
      {
        key: "hard-start-fuel",
        label: "Hard start right after refuelling",
        response:
          "A classic P1450 symptom on Ford trucks. A purge valve stuck open lets raw vapour into the intake while you fill, and the engine then struggles to start on an over-rich mixture. If your truck cranks and cranks only at the fuel station, start with the purge valve.",
      },
      {
        key: "fill-clickoff",
        label: "Pump keeps clicking off while refuelling",
        response:
          "A tank that cannot vent properly cannot accept fuel at full rate either. Repeated premature shut-off at the pump often shows up alongside P1450 and shares the same root cause in the vent path.",
      },
      {
        key: "stall-lowfuel",
        label: "Hesitation or stalling when the tank gets low",
        response:
          "Severe trapped vacuum can fight the fuel pump. If the truck runs worse as the tank empties and noticeably better after you open the cap, treat the vent path as the prime suspect rather than chasing fuel-delivery components.",
      },
      {
        key: "deformed-tank",
        label: "Visible deformation of the fuel tank",
        response:
          "This is why the code is worth acting on promptly. Sustained vacuum can collapse a plastic tank inward. If you can see it, the repair now includes the tank, and you should establish how long the truck has been driven in this condition.",
      },
      {
        key: "light-only",
        label: "Check-engine light with nothing else obvious",
        response:
          "Common early on. The restriction may be partial, so the tank builds vacuum slowly and you never notice it. Inspect anyway — the tank damage this code warns about happens quietly and without drivability symptoms.",
      },
    ],
    causes: [
      {
        cause: "Purge valve stuck open (very common)",
        evidence:
          "Engine vacuum reaches the tank continuously; hard start after refuelling; trims disturbed at idle alongside the P1450",
        firstTest:
          "Command the purge valve closed and confirm it seals rather than passing vacuum through to the tank",
      },
      {
        cause: "Clogged canister vent solenoid",
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
          "Trace the vent path from the canister to its atmospheric inlet and confirm it is physically clear",
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
        cause: "Filler-neck or rollover valve restriction",
        evidence:
          "Fill rate is poor and vacuum builds even with the vent valve confirmed working",
        firstTest:
          "Inspect the filler neck and confirm the tank's own venting hardware is not obstructed",
      },
    ],
    deepDive: [
      {
        heading: "The hiss test: thirty seconds, no tools",
        paragraphs: [
          "Drive the truck for twenty minutes, park it, and slowly open the fuel cap while you listen. A working system gives you a faint sound or nothing at all. A truck with P1450 frequently produces an unmistakable rush of air inward, and that single observation tells you the code is describing something real rather than a sensor reporting incorrectly.",
          "It is worth doing before you connect anything, because it splits the diagnosis in two straight away. Strong inward rush means genuine trapped vacuum, and you should be looking at the purge valve, the vent solenoid and the vent path. No rush at all, with the code still setting, moves the fuel-tank pressure sensor and its wiring up your list considerably.",
        ],
      },
      {
        heading: "Why a purge valve stuck open causes a vacuum code",
        paragraphs: [
          "This catches people out, because a purge valve failure sounds like it should cause a leak code rather than a vacuum one. The purge valve connects the EVAP system to the intake manifold, and the intake manifold is under vacuum whenever the engine runs.",
          "If that valve does not close, the engine spends every minute of operation pulling vacuum on the fuel tank through the EVAP system. The vent side cannot keep up, vacuum accumulates, and the PCM eventually reports that it cannot bleed it off. The same failure explains the hard-start-after-refuelling symptom, because raw vapour is being drawn into the intake at exactly the wrong moment.",
        ],
      },
      {
        heading: "P1450 is the opposite of a leak code",
        bullets: [
          "P0456, P0455, P0442 — vapour is escaping the system. Something is open that should be sealed",
          "P1450 — air cannot get in. Something is closed or blocked that should be open",
          "P0446 — vent control circuit fault, which frequently appears alongside P1450 and often names the failed part directly",
          "A truck can have both types at once, which usually means the EVAP system as a whole is aged rather than one part having failed",
        ],
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
          "Open the cap on a truck that has been driven and listen. A strong rush of air in confirms trapped vacuum immediately and tells you the problem is real before you connect any equipment. It also costs nothing and takes half a minute.",
      },
      {
        title: "Read the fuel-tank pressure sensor live",
        detail:
          "Watch what the sensor reports with the cap on and then with it off. A sensor that does not move when you break the seal is either reading incorrectly or is not seeing the tank at all, and that changes the whole direction of the diagnosis.",
      },
      {
        title: "Command the purge valve closed",
        detail:
          "On F-150s this is one of the two most common causes, and it is in the engine bay where access is easy. Confirm the valve actually seals rather than passing vacuum through toward the tank.",
      },
      {
        title: "Command the vent valve open and watch",
        detail:
          "With a scan tool, open the vent valve and see whether the tank pressure moves toward atmospheric. A valve that will not open is the other most common cause of this code, and this test finds it in seconds.",
      },
      {
        title: "Trace the vent path physically",
        detail:
          "Follow the line from the canister to where it draws air. On a pickup this path runs low and exposed near the spare tyre, and mud, road debris and insect nests block it more often than anyone expects.",
      },
      {
        title: "Check the canister for fuel saturation",
        detail:
          "Repeated topping-off past the pump's first click pushes liquid fuel into the charcoal canister, which restricts airflow through it. A saturated canister blocks the vent path without any valve or hose being faulty at all.",
      },
      {
        title: "Inspect the tank before you finish",
        detail:
          "If the truck has run under trapped vacuum for a while, look at the tank itself for deformation. Finding a distorted tank now is better than discovering it after you have paid for a valve and put everything back together.",
      },
      {
        title: "Verify with the cap test after repair",
        detail:
          "Drive the truck, then open the cap and listen again. Silence is the result you want. If you still hear a rush of air, the vent path is still restricted somewhere you have not looked yet — regardless of what you replaced.",
      },
    ],
    costs: [
      {
        job: "Cap hiss test",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Trivial — no tools",
        note: "Confirms whether trapped vacuum is real before anything is bought",
      },
      {
        job: "Purge valve replacement",
        parts: "About $30–$75",
        shop: "Roughly $220–$257 on F-150",
        diy: "Easy — engine-bay location",
        note: "One of the two most common P1450 repairs; RepairPal figure for F-150",
      },
      {
        job: "Canister vent solenoid",
        parts: "About $30–$75",
        shop: "From roughly $153 fitted",
        diy: "Moderate — usually near the spare tyre",
        note: "The other common cause; access is the main difficulty",
      },
      {
        job: "Vent line repair",
        parts: "Low — hose and clamps",
        shop: "Mostly labour to access and trace",
        diy: "Moderate — dirty work under the truck",
        note: "Often just clearing a blocked inlet rather than replacing anything",
      },
      {
        job: "Charcoal canister replacement",
        parts: "Higher — full assembly",
        shop: "Roughly $367–$597 by model year",
        diy: "Advanced",
        note: "Usually the result of long-term overfilling rather than a component defect",
      },
      {
        job: "Fuel tank replacement",
        parts: "Substantial",
        shop: "Get a quote — varies widely",
        diy: "Advanced",
        note: "The outcome this code exists to help you avoid by acting early",
      },
    ],
    dontReplace:
      "Do not replace the fuel-tank pressure sensor because the code mentions tank vacuum. P1450 usually describes a genuine physical problem, and the sensor is reporting it accurately. Prove the sensor is lying — by comparing its reading against what happens when you open the cap — before you condemn it, or you will fit a new sensor and still have the same purge valve holding vacuum on your tank.",
    yearNotes: [
      "P1450 is a Ford manufacturer-specific code, so generic code lists frequently describe it incorrectly or confuse it with a leak. Use Ford documentation for your model year rather than a universal definition.",
      "On 1999–2003 F-150s in particular, a stuck-open canister purge valve in the engine bay and a clogged canister vent solenoid near the spare tyre are the two documented common causes.",
      "Vent-valve location and canister design vary across F-150 generations. Confirm where yours actually sits before spending an afternoon tracing lines under the wrong part of the truck.",
      "Trucks that spend time on unpaved roads see far more blocked vent paths. If yours does, inspect the vent inlet for packed mud and debris before suspecting any electrical component.",
    ],
    faqs: [
      {
        question: "What does P1450 mean on a Ford F-150?",
        answer:
          "That the PCM could not relieve vacuum in the fuel tank. Air normally enters the tank through the EVAP system to replace fuel as it is used, and P1450 means that is not happening — either because the path is blocked or because engine vacuum is being applied continuously.",
      },
      {
        question: "Why does my fuel cap hiss loudly when I open it?",
        answer:
          "Because the tank is under vacuum that could not bleed off. That rush of air is the clearest symptom of P1450 and confirms the code is describing something real before you connect any equipment.",
      },
      {
        question: "Can P1450 damage my fuel tank?",
        answer:
          "Yes, and that is the main reason to fix it promptly. Sustained vacuum can deform a plastic fuel tank, turning an inexpensive valve repair into a tank replacement that costs many times more.",
      },
      {
        question: "How much does it cost to fix P1450?",
        answer:
          "Most repairs land between about $150 and $500. A purge valve on an F-150 runs roughly $220–$257 at a shop, and a vent solenoid starts around $153 fitted. Parts alone are commonly under $75, which makes this a genuinely DIY-friendly job.",
      },
      {
        question: "Why does my truck struggle to start after filling up?",
        answer:
          "That is a classic P1450 symptom and it usually points at a purge valve stuck open. Raw vapour reaches the intake while you fill, and the engine then has to start on a mixture that is far too rich.",
      },
      {
        question: "Is P1450 the same as a small EVAP leak?",
        answer:
          "No — they are opposites. P0456 means vapour is escaping the system. P1450 means air cannot get into the tank. One is a leak, the other is a blockage, and they are diagnosed in different directions.",
      },
      {
        question: "Can overfilling the tank cause P1450?",
        answer:
          "It can contribute. Topping off past the pump's first click can push liquid fuel into the charcoal canister, and a saturated canister restricts the airflow the tank depends on to vent.",
      },
      {
        question: "Can I drive with P1450?",
        answer:
          "Short-term, yes — the engine runs normally. But the trapped vacuum is working on your fuel tank the whole time, so treat it as a repair to schedule this week rather than one to think about next month.",
      },
    ],
    closing: {
      title: "What a complete P1450 repair looks like",
      paragraphs: [
        "A finished P1450 job accounts for two things: the restriction itself and any damage the trapped vacuum caused while it went unnoticed. Skipping the second means fixing the valve and leaving a deformed tank in place to fail later.",
        "After the repair, drive the truck normally and then open the fuel cap. Silence is what you want. If you still hear a rush of air, the vent path is still restricted somewhere you have not looked yet, regardless of which component you replaced.",
        "Then confirm the EVAP monitor runs and passes without setting P1450 or a companion code. Because that monitor needs specific fuel-level and temperature conditions, give it several days of ordinary driving before you call the repair verified.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsP1450, repairPalPurge, fordManuals],
  },
];
