import type { TroubleCodeGuide } from "./trouble-code-data";
import { fordManuals, fordObd2017, fordObd2024, nhtsaTsb } from "./trouble-code-sources";
import { escapeVehicle } from "./trouble-code-escape";

/**
 * Escape misfire and timing codes: P0300, P0301, P0016.
 *
 * These pages carry a warning the generic versions of this content do not.
 * Certain Escape EcoBoost engines have a documented coolant-intrusion problem
 * that presents first as misfire, and continuing to drive one can destroy the
 * engine. A misfire page for this vehicle that omits that is doing the reader
 * a disservice, so it appears near the top rather than buried in a footnote.
 */

const goPartsP0300Escape = {
  label: "P0300 on 2015–2022 Ford Escape: random misfire causes and fixes",
  url: "https://www.go-parts.com/garage/obd-p0300-ford-escape-2015-2022",
  note: "Documents the EcoBoost coolant-intrusion pattern behind misfire on this platform",
};

const goPartsP0016Escape = {
  label: "P0016 on 2015–2021 Ford Escape: crank/cam correlation causes and fixes",
  url: "https://www.go-parts.com/garage/obd-p0016-ford-escape-2015-2021",
  note: "Separates the belt-driven and chain-driven Escape engines for this code",
};

const goPartsEscapeBelt = {
  label: "Ford Escape 1.5L and 1.6L EcoBoost timing belt guide",
  url: "https://www.go-parts.com/garage/ps-2011-2020-ford-escape-engine-timing-belt",
  note: "Confirms which Escape engines use a belt rather than a chain",
};

const misfireVehicle = {
  ...escapeVehicle,
  yearsIntro:
    "Misfire on an Escape is not one problem with one answer. The naturally aspirated 2.5L behaves like a conventional engine and is usually cured by ignition or fuel parts. Certain EcoBoost engines have a documented coolant-intrusion history where misfire is the first visible symptom of something far more serious. Identify your engine and model year before you spend anything, because on some of these vehicles the correct first step is a cooling-system check rather than a coil.",
};

export const troubleCodeEscapeMisfire: TroubleCodeGuide[] = [
  /* ------------------------------------------------------------------ P0300 */
  {
    slug: "ford/escape/p0300",
    code: "P0300",
    title: "P0300 Code Ford Escape: Random Misfire Causes & Fixes",
    description:
      "P0300 on a Ford Escape by engine, including the EcoBoost coolant-intrusion issue that makes this code urgent on some model years.",
    definition: "Random/Multiple Cylinder Misfire Detected",
    severity: "Stop soon",
    vehicle: misfireVehicle,
    driveAdvice:
      "Stop driving if the check-engine light is flashing — that means active misfire severe enough to destroy a catalytic converter. On certain EcoBoost Escapes there is a second reason to stop: if the misfire is caused by coolant entering a cylinder, continued driving can lead to catastrophic engine failure and, in the worst case, hydro-lock while you are moving. Check your coolant level before you drive anywhere with this code.",
    quickAnswer:
      "P0300 means your Escape's PCM detected misfire across more than one cylinder, or without any single cylinder dominating. On the 2.5L naturally aspirated engine that usually points at ordinary things — plugs, coils, a vacuum leak, fuel delivery. On some EcoBoost Escapes it can mean something considerably worse. Certain 2013–2016 1.6L engines suffered coolant intrusion into cylinder 3 from head-gasket and cylinder-head porosity problems, and some 2017–2019 1.5L and 2.0L engines have a documented cracking issue between cylinders. On those vehicles, misfire is the first symptom of a failing engine rather than a failing coil.",
    symptoms: [
      {
        key: "flashing-light",
        label: "Check-engine light is flashing",
        response:
          "Stop as soon as it is safe. Raw fuel is reaching the exhaust in quantity and a catalytic converter can be destroyed in minutes. This overrides every other consideration on the page.",
      },
      {
        key: "coolant-loss",
        label: "Coolant level dropping with no visible leak",
        response:
          "On an EcoBoost Escape treat this as urgent. Coolant disappearing with no puddle underneath, combined with misfire, is the recognised signature of coolant entering a cylinder. Stop driving and have the cooling system tested before anything else.",
      },
      {
        key: "white-smoke",
        label: "White smoke or sweet smell from the exhaust",
        response:
          "Coolant burning in the combustion chamber. Combined with misfire on an EcoBoost engine this is the pattern that leads to engine replacement if it is driven on. Do not clear the code and continue.",
      },
      {
        key: "rough-idle",
        label: "Rough idle that smooths out under load",
        response:
          "More typical of an ordinary cause — a vacuum leak, aged plugs or a weak coil. Pull freeze frame and the individual cylinder counters before replacing anything, and check coolant level anyway.",
      },
      {
        key: "cold-start",
        label: "Misfires on cold start then clears",
        response:
          "Often plugs, a coil boot leaking until it warms, or fuel that is momentarily too lean. On an EcoBoost with any coolant-loss history, cold-start misfire deserves a cooling-system check too.",
      },
      {
        key: "power-loss",
        label: "Noticeable power loss and poor economy",
        response:
          "Several cylinders not contributing properly. The PCM is still injecting fuel into cylinders that are not burning it, which is why economy drops and why the converter is at risk.",
      },
    ],
    causes: [
      {
        cause: "Coolant intrusion (EcoBoost, specific years)",
        evidence:
          "Coolant loss with no external leak, white exhaust smoke, sweet smell, misfire concentrated on one cylinder on the 1.6L",
        firstTest:
          "Check coolant level and run a combustion-gas test before replacing any ignition part",
      },
      {
        cause: "Worn or fouled spark plugs",
        evidence:
          "High mileage since the last change; plugs show eroded electrodes, wrong gap or fouling",
        firstTest:
          "Remove and compare all plugs against each other and the specification for your engine",
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
          "Positive fuel trims alongside the misfire; rough idle that improves under load; lean codes stored too",
        firstTest:
          "Smoke-test the intake system rather than spraying flammable cleaner near a hot engine",
      },
      {
        cause: "Fuel delivery problem",
        evidence:
          "Misfire worse under load; fuel pressure below specification; injector imbalance",
        firstTest:
          "Compare commanded against actual fuel pressure, then test injector delivery",
      },
      {
        cause: "Carbon build-up on intake valves (direct injection)",
        evidence:
          "Gradual onset on a higher-mileage EcoBoost; rough cold running that improves as the engine warms",
        firstTest:
          "Borescope the intake valves before assuming ignition components are at fault",
      },
    ],
    deepDive: [
      {
        heading: "Read this first if you have an EcoBoost Escape",
        paragraphs: [
          "There is a documented pattern on certain Escape EcoBoost engines where misfire is the first visible sign of coolant entering a cylinder, and it changes what you should do next.",
          "On certain 2013–2016 Escapes with the 1.6L EcoBoost, coolant intrusion into cylinder 3 has been attributed to head-gasket and cylinder-head porosity problems. It typically shows up as a P0303 misfire on that specific cylinder, and if it is ignored it progresses to catastrophic engine damage.",
          "On some 2017–2019 Escapes with the 1.5L or 2.0L EcoBoost, the reported issue is a lack of support in the casting between cylinders, creating a weak point where cracks can form and let coolant into the combustion chamber. Where that is confirmed, the remedy is engine replacement rather than a repair.",
          "So before you buy plugs and coils for an EcoBoost Escape with P0300, spend five minutes on three checks: is the coolant level correct, is there white smoke or a sweet smell from the exhaust, and does a combustion-gas test show exhaust gas in the cooling system? If any of those points the wrong way, stop driving the vehicle. Continued driving with coolant entering a cylinder risks hydro-lock, which is a safety problem as well as a mechanical one.",
        ],
      },
      {
        heading: "2.5L naturally aspirated and 2.5L Hybrid",
        paragraphs: [
          "Without a turbocharger and without direct injection, these engines misfire for conventional reasons and respond to conventional diagnosis. Work through plugs, coils, vacuum leaks and fuel delivery in that order and you will find most faults.",
          "Start with the plugs. They are the cheapest thing to inspect, they frequently show the answer outright, and on a high-mileage vehicle they are often simply due. Then use the free coil-swap test: move a coil to a different cylinder, clear the code, and see whether the misfire follows it.",
          "On the hybrid, allow for the fact that the engine stops and starts constantly. Live data is harder to read, and the engine sees more short run cycles than a conventional car of the same age. Give it time to run continuously before judging fuel trims or misfire counters.",
        ],
      },
      {
        heading: "1.5L, 1.6L and 2.0L EcoBoost: the ordinary causes too",
        paragraphs: [
          "Coolant intrusion is the possibility you must rule out, but it is not the only cause of P0300 on these engines. Once the cooling system is confirmed healthy, the ordinary suspects apply.",
          "Turbocharged engines are harder on spark plugs than naturally aspirated ones because cylinder pressure is higher, so plugs wear faster and gap growth causes misfire sooner. Charge-air leaks and vacuum leaks both produce a lean condition that can misfire. And on the direct-injected engines, carbon accumulation on the intake valves is a genuine cause on higher-mileage vehicles because there is no port fuel spray washing the valves clean.",
          "Check for lean codes stored alongside the misfire. P0171 with P0300 usually means the lean condition is the cause and the misfire is the consequence — fix the air leak and the misfire goes with it.",
        ],
      },
      {
        heading: "The order that saves money on any Escape",
        bullets: [
          "Check coolant level and look for white smoke — costs nothing, rules out the expensive scenario",
          "Read the individual cylinder counters, not just the P0300 — a dominant cylinder narrows the search dramatically",
          "Inspect the plugs and compare them against each other before buying anything",
          "Swap a coil rather than replacing four or five of them",
          "Smoke-test for vacuum leaks if fuel trims are positive",
          "Only then move to fuel delivery, injectors and carbon build-up",
        ],
      },
    ],
    freezeFrame: [
      "Individual cylinder misfire counters — a dominant cylinder changes P0300 into a much easier diagnosis",
      "Engine coolant temperature, separating a cold-start-only fault from a fully warm one",
      "Short and long-term fuel trim; positive trims alongside misfire point at a lean condition as the cause",
      "Engine load and rpm at the time, which distinguish idle misfire from load misfire",
      "Any companion codes — P0171, a cylinder-specific misfire code, or a cooling-related code all redirect the diagnosis",
      "Vehicle speed and throttle position when the counters climbed",
    ],
    steps: [
      {
        title: "Check the coolant level before anything else",
        detail:
          "On an EcoBoost Escape this is the step that protects you from spending money on the wrong problem — and from driving a vehicle that should not be driven. Coolant loss with no visible leak alongside misfire needs a cooling-system test, not a coil.",
      },
      {
        title: "Save the freeze frame and cylinder counters",
        detail:
          "Record misfire counts for every cylinder before you clear anything. If one cylinder dominates, you effectively have a cylinder-specific code and the search area shrinks to a single cylinder.",
      },
      {
        title: "Run a combustion-gas test if coolant is low",
        detail:
          "This tells you whether exhaust gas is entering the cooling system. It is inexpensive, quick, and it answers the expensive question directly rather than by disassembly.",
      },
      {
        title: "Inspect the spark plugs and compare them",
        detail:
          "Lay them out in cylinder order. A plug that looks different from its neighbours has usually already told you the answer, and the deposits narrow the cause further — sooty for rich, wet for no ignition, oily for oil intrusion.",
      },
      {
        title: "Swap a coil rather than replacing several",
        detail:
          "Move a coil from a misfiring cylinder to a healthy one, label both, clear the code and drive the conditions from your freeze frame. If the misfire follows the coil, you have found it without buying anything.",
      },
      {
        title: "Smoke-test for vacuum and charge-air leaks",
        detail:
          "If fuel trims are positive alongside the misfire, the lean condition is likely the cause. On an EcoBoost, add a charge-air pressure test because a boost leak will not show at idle.",
      },
      {
        title: "Check fuel pressure and injector delivery",
        detail:
          "Misfire that is worse under load and unaffected by ignition parts points at fuel supply. Compare commanded against actual pressure before condemning injectors.",
      },
      {
        title: "Consider intake-valve carbon on direct-injected engines",
        detail:
          "On a higher-mileage EcoBoost with gradual onset and no other cause found, borescope the intake valves. Direct injection means no fuel washes them, and accumulated carbon disrupts airflow into the cylinder.",
      },
    ],
    costs: [
      {
        job: "Coolant check and combustion-gas test",
        parts: "Low — test fluid",
        shop: "Modest add-on to diagnosis",
        diy: "Easy with a test kit",
        note: "The single most valuable early test on an EcoBoost Escape",
      },
      {
        job: "Coil swap diagnostic",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Easy",
        note: "Finds or eliminates the most common ignition cause for free",
      },
      {
        job: "Spark plug set",
        parts: "Moderate for a set",
        shop: "Access is easy on the 2.5L, tighter on EcoBoost",
        diy: "Easy to moderate",
        note: "Often due as maintenance anyway on a higher-mileage vehicle",
      },
      {
        job: "Ignition coil (single)",
        parts: "Moderate",
        shop: "Under an hour of labour typically",
        diy: "Easy",
        note: "Replace the one you proved faulty, not the whole set",
      },
      {
        job: "Intake valve carbon cleaning",
        parts: "Service cost",
        shop: "Get a quote — walnut blasting is specialist work",
        diy: "Advanced",
        note: "Direct-injection engines only, and usually higher mileage",
      },
      {
        job: "Engine replacement (coolant intrusion)",
        parts: "—",
        shop: "Substantial — the worst-case outcome",
        diy: "Not a DIY job",
        note: "Why the five-minute coolant check at the start matters so much",
      },
    ],
    dontReplace:
      "Do not buy a full set of plugs and coils for an EcoBoost Escape before you have checked the coolant level and run a combustion-gas test. On some of these engines misfire is the first symptom of coolant entering a cylinder, and ignition parts will not touch it — you will spend the money, keep the misfire, and continue driving a vehicle that is progressively destroying itself. The check costs almost nothing and takes five minutes.",
    yearNotes: [
      "Certain 2013–2016 Escapes with the 1.6L EcoBoost have a documented coolant-intrusion problem affecting cylinder 3, attributed to head-gasket and cylinder-head porosity. It typically presents as a P0303 misfire and progresses to major engine damage if driven on.",
      "Some 2017–2019 Escapes with the 1.5L or 2.0L EcoBoost have a reported cracking issue between cylinders caused by insufficient casting support, allowing coolant into the combustion chamber. Where confirmed, engine replacement is the remedy.",
      "The 2.5L naturally aspirated engine and the 2.5L hybrid are not part of those patterns and respond to conventional misfire diagnosis.",
      "Direct-injected EcoBoost engines accumulate carbon on the intake valves over time because no fuel washes them. This is a genuine misfire cause on higher-mileage vehicles and does not apply to port-injected engines.",
    ],
    faqs: [
      {
        question: "What does P0300 mean on a Ford Escape?",
        answer:
          "That the PCM detected misfire across more than one cylinder, or with no single cylinder dominating. It identifies a symptom rather than a failed part.",
      },
      {
        question: "Can I drive my Escape with P0300?",
        answer:
          "Not if the light is flashing, and not if the coolant level is dropping. On some EcoBoost Escapes misfire signals coolant entering a cylinder, and continued driving risks catastrophic engine damage and even hydro-lock.",
      },
      {
        question: "Is P0300 on an EcoBoost Escape serious?",
        answer:
          "It can be. Certain 1.6L engines from 2013–2016 and some 1.5L and 2.0L engines from 2017–2019 have documented coolant-intrusion problems where misfire is the first symptom. Check coolant level and run a combustion-gas test before assuming it is ignition.",
      },
      {
        question: "Why is my coolant disappearing with no leak?",
        answer:
          "On an affected EcoBoost engine that usually means it is going into a cylinder and leaving through the exhaust. Combined with misfire it is the recognised pattern, and it is a reason to stop driving rather than to top up and continue.",
      },
      {
        question: "How much does it cost to fix P0300 on an Escape?",
        answer:
          "Anywhere from the price of a single coil to an engine replacement. That enormous range is exactly why the coolant check comes first — it tells you which end of the scale you are dealing with before you spend anything.",
      },
      {
        question: "Should I replace all the coils and plugs?",
        answer:
          "No. Read the individual cylinder counters first, then swap a single coil to test it. Blanket replacement is expensive and, if the real cause is coolant intrusion or a vacuum leak, it changes nothing.",
      },
      {
        question: "What is the difference between P0300 and P0301?",
        answer:
          "P0301 names cylinder 1 specifically. P0300 means misfire across several cylinders or with no clear leader. On the 1.6L, a P0303 in particular is worth taking seriously because cylinder 3 is the one associated with coolant intrusion.",
      },
      {
        question: "Can a vacuum leak cause P0300?",
        answer:
          "Yes. A lean mixture misfires once it gets lean enough. If P0171 is stored alongside P0300, fix the lean condition first — the misfire is very likely the consequence rather than the cause.",
      },
    ],
    closing: {
      title: "Verifying a misfire repair on an Escape",
      paragraphs: [
        "Do not clear the code until you have written down the freeze frame and the individual cylinder counters. Those are the only record you have of the conditions that produced the misfire, and you need them to prove the repair worked.",
        "After the repair, drive the load, rpm and temperature conditions your freeze frame recorded and watch the misfire counters stay at zero across all of them. A lamp that stays off during a short idle proves nothing about a misfire that only appeared under load.",
        "On an EcoBoost, check the coolant level again a week later even if the misfire is gone. Coolant intrusion can be intermittent early on, and a level that has dropped again while the engine appears to run fine is telling you something important before it becomes expensive.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsP0300Escape, nhtsaTsb, fordManuals],
  },

  /* ------------------------------------------------------------------ P0301 */
  {
    slug: "ford/escape/p0301",
    code: "P0301",
    title: "P0301 Code Ford Escape: Cylinder 1 Misfire Causes & Fixes",
    description:
      "P0301 on a Ford Escape by engine. The free coil-swap test, why cylinder-specific codes are good news, and when misfire means something worse.",
    definition: "Cylinder 1 Misfire Detected",
    severity: "Stop soon",
    vehicle: misfireVehicle,
    driveAdvice:
      "A flashing light means stop as soon as it is safe — active misfire that severe threatens the catalytic converter. A steady light with an engine that still runs reasonably may allow a short, gentle trip for diagnosis. On an EcoBoost Escape, check the coolant level before you drive anywhere, because misfire on some of these engines is the first sign of coolant entering a cylinder.",
    quickAnswer:
      "P0301 is better news than P0300, because your Escape has already done part of the diagnosis for you — it has named cylinder 1. On every Escape engine since 2013 the cylinders sit in a single inline row, and cylinder 1 is at the accessory-drive end of the block. What the code still does not say is which component in that cylinder failed: the plug, the coil, the injector, or the compression behind them. You can separate the first two for free in about fifteen minutes, and that is where this diagnosis should start on any engine.",
    symptoms: [
      {
        key: "rough-idle",
        label: "Rough idle that smooths out as you drive",
        response:
          "Classic single-cylinder misfire. At idle nothing masks the missing contribution. Pull the freeze frame before touching anything — it records the conditions where the misfire actually happened.",
      },
      {
        key: "flashing-light",
        label: "Check-engine light is flashing",
        response:
          "Stop as soon as it is safe. Raw fuel is reaching the exhaust and a catalytic converter can be ruined in minutes rather than months.",
      },
      {
        key: "coolant-check",
        label: "Coolant level is low",
        response:
          "On an EcoBoost Escape, treat misfire plus coolant loss as a cooling-system investigation before an ignition one. Run a combustion-gas test rather than fitting a coil and hoping.",
      },
      {
        key: "cold-only",
        label: "Misfires cold, clears when warm",
        response:
          "Look at plug gap, a cracked insulator, or a coil boot that leaks until it warms and expands. Cold-only misfire can also come from a momentarily lean mixture at start-up.",
      },
      {
        key: "power-economy",
        label: "Down on power with worse fuel economy",
        response:
          "One cylinder of four not contributing is a quarter of your power on most Escape engines, and a third of it on the 1.5L three-cylinder. That is why it is so noticeable on the smaller engine.",
      },
      {
        key: "no-symptom",
        label: "Code stored but it feels fine",
        response:
          "Intermittent misfire that has not yet become continuous. Save the freeze frame and graph the cylinder 1 counter while driving those conditions rather than clearing it and hoping.",
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
        cause: "Injector fault on cylinder 1",
        evidence:
          "Misfire stays on cylinder 1 after plug and coil are eliminated; injector quiet or resistance out of line",
        firstTest:
          "Listen with a stethoscope, compare resistance, then run your scan tool's injector test",
      },
      {
        cause: "Vacuum leak affecting that runner",
        evidence:
          "Positive fuel trims alongside the misfire; lean codes stored; hiss that changes on a smoke test",
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
      {
        cause: "Coolant intrusion (EcoBoost, specific years)",
        evidence:
          "Coolant loss with no external leak, white smoke, sweet smell — most associated with cylinder 3 on the 1.6L but worth ruling out on any cylinder",
        firstTest:
          "Check coolant level and run a combustion-gas test before buying ignition parts",
      },
    ],
    deepDive: [
      {
        heading: "The coil swap: fifteen minutes, no money",
        paragraphs: [
          "This is the highest-value test on the page and it costs nothing. Move the cylinder 1 coil to another cylinder and move that cylinder's coil into position 1. Label both so you do not lose track. Clear the code, then drive the conditions your freeze frame recorded.",
          "If the code returns naming the cylinder that now holds the original coil, the coil is faulty and you have proved it without spending a penny. If it returns as P0301 again, the coil is fine — and you have eliminated the single most common cause for free. Either outcome moves the diagnosis forward, which is more than buying a part can claim.",
        ],
      },
      {
        heading: "Where cylinder 1 sits on each Escape engine",
        paragraphs: [
          "Every Escape engine from 2013 onward is an inline design — a three-cylinder on the 1.5L EcoBoost, a four-cylinder on everything else. There is only one bank, so cylinder numbering runs straight along the block from the accessory-drive end.",
          "That makes cylinder 1 comparatively accessible on all of these engines, which is good news for the plug inspection and the coil swap. It is worth confirming the orientation for your specific engine before you start rather than assuming, particularly if you are used to working on a V-engine where the convention is different.",
        ],
      },
      {
        heading: "When a single-cylinder misfire is not an ignition problem",
        paragraphs: [
          "A misfire that refuses to move when you swap the coil and does not improve with a new plug is telling you something. At that point the fault is in fuel delivery to that cylinder or in the cylinder itself.",
          "Injectors are the next check — listen to them, compare resistance across cylinders, and use the scan tool's injector test if it has one. After that, compression. Relative compression from a scan tool is quick and non-invasive and will show a low cylinder without removing anything.",
          "On an EcoBoost Escape there is one further possibility that belongs on the list: coolant entering the cylinder. It is most associated with cylinder 3 on the 1.6L, but if your coolant is disappearing with no visible leak, run the combustion-gas test regardless of which cylinder the code names.",
        ],
      },
      {
        heading: "Why you should not replace all the coils",
        bullets: [
          "P0301 has already narrowed the fault to one cylinder — that is the code doing you a favour",
          "Replacing every coil throws that advantage away and multiplies the bill",
          "It disturbs healthy connectors that were working perfectly",
          "If the real cause is an injector or compression, new coils change nothing",
          "The coil swap test costs nothing and answers the same question definitively",
        ],
      },
    ],
    freezeFrame: [
      "Misfire counters for every cylinder, confirming cylinder 1 genuinely dominates rather than merely leading",
      "Engine coolant temperature, separating a cold-start fault from a warm one",
      "Short and long-term fuel trim; positive trims alongside misfire suggest air or fuel rather than ignition",
      "Engine load and rpm when the counters climbed",
      "Any companion codes — a lean code, a cooling code or a second misfire code changes the order of work",
      "Vehicle speed and throttle position at the time of the fault",
    ],
    steps: [
      {
        title: "Check coolant level first on an EcoBoost",
        detail:
          "Five minutes, no cost, and on some Escape EcoBoost engines it is the difference between an ignition repair and an engine problem. Low coolant with no visible leak means run a combustion-gas test before anything else.",
      },
      {
        title: "Save the freeze frame and all cylinder counters",
        detail:
          "Confirm cylinder 1 really is dominating. If two cylinders are climbing together, you are looking at something broader than one failed part and the diagnosis changes.",
      },
      {
        title: "Pull the cylinder 1 plug and compare",
        detail:
          "Lay it beside the others. A plug that looks different has usually already answered the question, and its deposits tell you more — sooty for rich, wet for no ignition, oily for oil intrusion.",
      },
      {
        title: "Swap the coil, not your money",
        detail:
          "Move the cylinder 1 coil to a neighbouring cylinder, label both, clear the code and drive. If the misfire follows the coil you have found it; if it stays you have eliminated it. Either way you have spent nothing.",
      },
      {
        title: "Inspect the boot and connector while it is out",
        detail:
          "Carbon tracking looks like a thin black line down the insulator and lets spark escape to ground. A broken connector lock lets the coil work loose. Both are cheap and both get missed.",
      },
      {
        title: "Test the injector on that cylinder",
        detail:
          "With plug and coil eliminated, listen to the injector, compare its resistance with the others, and use the scan tool's injector test where available.",
      },
      {
        title: "Check compression when nothing moves the fault",
        detail:
          "A misfire that will not follow any component is mechanical. Relative compression from the scan tool first, then a mechanical compression or leak-down test if it looks low.",
      },
      {
        title: "Verify with counters rather than the dash",
        detail:
          "After the repair, drive the conditions the freeze frame recorded and confirm the cylinder 1 counter stays at zero. A dark dashboard at idle is not proof for a fault that appeared under load.",
      },
    ],
    costs: [
      {
        job: "Coolant and combustion-gas check",
        parts: "Low — test fluid",
        shop: "Modest add-on",
        diy: "Easy with a kit",
        note: "First step on any EcoBoost Escape with misfire",
      },
      {
        job: "Coil swap diagnostic",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Easy — 15 minutes",
        note: "Identifies or eliminates the most common cause at no cost",
      },
      {
        job: "Single ignition coil",
        parts: "Moderate",
        shop: "Typically under an hour of labour",
        diy: "Easy",
        note: "Replace the one you proved faulty, not the whole set",
      },
      {
        job: "Spark plug (single or set)",
        parts: "Low per plug",
        shop: "Access is straightforward on inline engines",
        diy: "Easy to moderate",
        note: "A full set is reasonable as maintenance, but it is not a diagnosis",
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
      "Do not replace every coil and plug because one cylinder misfired. P0301 already named the cylinder, and blanket replacement throws that away while multiplying the cost. Swap the coil first — fifteen minutes, no money, and it either finds the fault or rules out the most likely one. And on an EcoBoost Escape, check the coolant before you buy any ignition part at all.",
    yearNotes: [
      "Every Escape engine from 2013 onward is inline, so cylinder 1 sits at the accessory-drive end of the block and there is no second bank. The 1.5L EcoBoost is a three-cylinder; the rest are four-cylinders.",
      "On the 1.5L three-cylinder, losing one cylinder costs a third of the engine's output rather than a quarter, which is why the symptom feels more severe on that engine.",
      "Certain 2013–2016 1.6L EcoBoost engines have a documented coolant-intrusion problem centred on cylinder 3. If your coolant is dropping, run a combustion-gas test regardless of which cylinder the code names.",
      "Spark plug specifications and service intervals differ between the naturally aspirated and turbocharged engines. Turbocharged engines are harder on plugs, so gap growth causes misfire sooner.",
    ],
    faqs: [
      {
        question: "Where is cylinder 1 on a Ford Escape?",
        answer:
          "At the accessory-drive end of the block. Every Escape engine since 2013 is an inline three or four cylinder with a single bank, so the cylinders run in a straight line from there.",
      },
      {
        question: "Can I drive with P0301?",
        answer:
          "Briefly and gently if the light is steady. Stop if it is flashing. On an EcoBoost Escape, check the coolant level first — misfire with coolant loss is a reason not to drive at all.",
      },
      {
        question: "Should I replace the coil or the plug first?",
        answer:
          "Inspect the plug first because it costs nothing and often shows the fault. Then swap the coil to another cylinder. Between those two free steps you will identify most P0301 faults.",
      },
      {
        question: "How much does it cost to fix P0301 on an Escape?",
        answer:
          "Usually modest — a plug or a single coil. It becomes expensive only when the cause is an injector, low compression, or coolant intrusion, which is exactly why the free tests come first.",
      },
      {
        question: "What if the misfire moves to another cylinder after the coil swap?",
        answer:
          "Then the coil is faulty and you have proved it without spending anything. Replace that one coil rather than the set.",
      },
      {
        question: "Why did P0301 come back after new plugs and coils?",
        answer:
          "Because the fault was never in the ignition system. A misfire that survives both is usually an injector or a compression problem — and on an EcoBoost, possibly coolant entering the cylinder.",
      },
      {
        question: "Is P0301 worse on the 1.5L three-cylinder?",
        answer:
          "It feels worse. Losing one cylinder of three removes a third of the engine's output, so the roughness and power loss are more pronounced than on a four-cylinder.",
      },
      {
        question: "Can a vacuum leak cause a single-cylinder misfire?",
        answer:
          "Yes, if it feeds one intake runner or one injector seal. The tell is positive fuel trims alongside the misfire, and a smoke test finds it quickly.",
      },
    ],
    closing: {
      title: "Confirming the cylinder 1 repair held",
      paragraphs: [
        "Write down the freeze frame and the cylinder counters before clearing anything. Clearing first destroys the record of the conditions you need to reproduce in order to verify the repair.",
        "Then drive the rpm, load and temperature window the freeze frame recorded and watch the cylinder 1 counter. Zero counts across those exact conditions is the proof. A dashboard that stays dark during a gentle drive is not, particularly for a fault that only appeared under load or when cold.",
        "If the counter climbs again, save the new data rather than clearing and repeating. A misfire that returns under different conditions than before is telling you which system is actually failing, and that information disappears every time you reset the memory.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsP0300Escape, nhtsaTsb, fordManuals],
  },

  /* ------------------------------------------------------------------ P0016 */
  {
    slug: "ford/escape/p0016",
    code: "P0016",
    title: "P0016 Code Ford Escape: Cam/Crank Timing Causes & Fixes",
    description:
      "P0016 on a Ford Escape. Why the 1.5L and 1.6L use a timing belt and the 2.0L uses a chain, what that changes, and repair costs.",
    definition: "Crankshaft Position — Camshaft Position Correlation (Bank 1, Sensor 'A')",
    severity: "Stop soon",
    vehicle: {
      ...misfireVehicle,
      yearsIntro:
        "The single most important thing to establish on this code is whether your Escape uses a timing belt or a timing chain, because it changes the diagnosis, the cost and the maintenance implications entirely. The 1.5L and 1.6L EcoBoost engines use a belt. The 2.0L EcoBoost and the 2.5L engines use a chain. Confirm which you have before reading any further.",
    },
    driveAdvice:
      "Limit driving until you know the cause. Stop immediately for chain or belt noise, hard starting, stalling or low oil pressure. A genuine mechanical timing error gets worse as you drive on it, and on an interference engine a timing component that fails completely can bend valves — turning a maintenance job into an engine rebuild.",
    quickAnswer:
      "P0016 means your Escape's PCM compared the crankshaft position against the Bank 1 intake camshaft position and did not find the relationship it expects. Something in the timing drive has moved, or something is reporting position incorrectly. The critical branch point is what drives your camshafts: the 1.5L and 1.6L EcoBoost engines use a timing belt, while the 2.0L EcoBoost and the 2.5L engines use a chain. A belt that has jumped a tooth can sometimes be corrected by loosening the tensioner and repositioning it; a stretched chain with worn guides is a much larger job.",
    symptoms: [
      {
        key: "hard-start",
        label: "Long cranking before it starts",
        response:
          "Typical of a timing relationship that is out. The engine needs longer to find a workable combination of spark and valve timing. If it is accompanied by noise from the timing cover, stop driving.",
      },
      {
        key: "noise",
        label: "Rattle or whine from the timing cover area",
        response:
          "Take this seriously and stop. Noise from the timing drive alongside this code suggests a chain, tensioner or guide that is failing mechanically rather than a sensor reporting incorrectly.",
      },
      {
        key: "rough-running",
        label: "Rough running or misfire codes alongside",
        response:
          "Valve timing that is off disturbs combustion in every cylinder. Fix the timing relationship first — replacing ignition parts while the cam is out of position treats the symptom.",
      },
      {
        key: "power-loss",
        label: "Noticeable loss of power",
        response:
          "The PCM may also limit output when it cannot trust the cam relationship. Both the direct effect of wrong valve timing and the protective response reduce performance.",
      },
      {
        key: "oil-pressure",
        label: "Low oil pressure or overdue oil change",
        response:
          "Variable cam timing is hydraulically operated, so it depends on correct oil pressure and clean oil. Low pressure or heavily degraded oil can produce this code without any mechanical timing fault at all.",
      },
      {
        key: "intermittent",
        label: "Comes and goes, often on cold start",
        response:
          "Points more toward a phaser or oil-pressure issue than a jumped belt or chain. A mechanical timing error is generally constant rather than intermittent.",
      },
    ],
    causes: [
      {
        cause: "Timing belt slipped a tooth (1.5L and 1.6L)",
        evidence:
          "Belt-driven engine; timing marks do not line up; hard starting or rough running from a specific point in time",
        firstTest:
          "Verify camshaft and crankshaft alignment against the factory marks with the correct locking tools",
      },
      {
        cause: "Stretched timing chain or worn guides (2.0L and 2.5L)",
        evidence:
          "Chain-driven engine; rattle from the timing cover, particularly at start-up; high mileage",
        firstTest:
          "Inspect chain slack and guide condition; listen for start-up rattle before it settles",
      },
      {
        cause: "Low oil pressure or degraded oil",
        evidence:
          "Overdue oil change, low level, or measured pressure below specification; code often intermittent",
        firstTest:
          "Check oil level and condition, then measure actual oil pressure against specification",
      },
      {
        cause: "Cam phaser stuck or failing",
        evidence:
          "Actual cam position does not follow the commanded position on live data; noise from the phaser area",
        firstTest:
          "Graph desired against actual Bank 1 intake cam position through the operating range",
      },
      {
        cause: "Camshaft or crankshaft position sensor fault",
        evidence:
          "Signal dropouts on a scope; damaged reluctor or trigger wheel; wiring chafed near heat",
        firstTest:
          "Inspect sensors, connectors and wiring, then check signal quality before disassembly",
      },
      {
        cause: "VCT solenoid or its circuit",
        evidence:
          "Solenoid does not respond to commands; screen blocked with debris; circuit codes stored alongside",
        firstTest:
          "Command the solenoid and confirm the cam responds; inspect its filter screen for debris",
      },
    ],
    deepDive: [
      {
        heading: "Belt or chain? This decides everything else",
        paragraphs: [
          "Confirm this before you do anything else, because it changes the diagnosis, the cost and the maintenance conversation entirely.",
          "The 1.5L EcoBoost and the 1.6L EcoBoost use a timing belt. That matters in two ways. First, a belt is a maintenance item with a replacement interval rather than a component expected to last the life of the engine — so if yours is overdue, that is directly relevant. Second, when a belt has jumped a single tooth, a technician can sometimes loosen the tensioner and reposition the belt on the cam gear to correct the alignment, rather than replacing everything.",
          "The 2.0L EcoBoost and the 2.5L engines use a chain. Chains do not have a scheduled replacement interval, but they stretch over time and their plastic guides wear. A stretched chain with worn guides is a significantly larger repair, and the cost reflects that.",
          "One caution that applies to both: this work requires the camshafts and crankshaft to be locked in precise alignment with the correct special tools. It is not a job to improvise, and for most owners it belongs with a professional.",
        ],
      },
      {
        heading: "Check the oil before you open the engine",
        paragraphs: [
          "Variable camshaft timing is operated hydraulically by engine oil under pressure. The phasers, the solenoids and the control circuits all depend on adequate pressure and clean oil to move the camshaft where the PCM asks.",
          "That means low oil level, an overdue oil change, or oil pressure below specification can produce this code with a perfectly healthy belt or chain. Sludge and debris can also block the small filter screen in a VCT solenoid, which stops it controlling the phaser regardless of the phaser's own condition.",
          "So before anyone quotes you for timing work, check the oil level and condition and measure actual oil pressure. It is the cheapest step in the entire diagnosis and it occasionally ends it.",
        ],
      },
      {
        heading: "Sensor, phaser or mechanical? Telling them apart",
        bullets: [
          "Intermittent, often at cold start — points at oil pressure or a phaser rather than a jumped belt or chain",
          "Constant, with hard starting — points at a mechanical timing error that has already happened",
          "Rattle from the timing cover at start-up — chain and guide wear on the 2.0L or 2.5L",
          "Actual cam position never follows the command — phaser or VCT solenoid",
          "Signal dropouts on a scope — sensor, trigger wheel or wiring rather than the timing drive",
          "Code appeared right after other engine work — check what was disturbed before assuming wear",
        ],
      },
      {
        heading: "Why you should not keep driving on it",
        paragraphs: [
          "A timing relationship that is already out of specification does not stabilise. A chain that has stretched enough to set this code continues to stretch, and its guides continue to wear. A belt that has jumped one tooth can jump another.",
          "The reason that matters more on these engines than on some others is what happens if a timing component fails completely. On an interference design, the valves and pistons occupy the same space at different moments, and only correct timing keeps them apart. Lose timing entirely and they meet — which converts a maintenance-scale repair into an engine rebuild.",
        ],
      },
    ],
    freezeFrame: [
      "Desired against actual Bank 1 intake camshaft position — the core measurement for this code",
      "Engine oil temperature and, where reported, oil pressure",
      "Engine rpm and load when the correlation error was detected",
      "Engine run time before the fault, separating a cold-start-only fault from a constant one",
      "Any companion codes — VCT circuit codes, misfire codes or oil-pressure codes redirect the diagnosis",
      "Coolant temperature, since some VCT faults appear only when fully warm",
    ],
    steps: [
      {
        title: "Establish whether you have a belt or a chain",
        detail:
          "The 1.5L and 1.6L EcoBoost use a belt; the 2.0L EcoBoost and the 2.5L use a chain. Everything after this — the diagnosis, the cost and whether a maintenance interval applies — depends on the answer.",
      },
      {
        title: "Check oil level, condition and pressure",
        detail:
          "Variable cam timing runs on oil pressure. Low level, degraded oil or pressure below specification can set this code with a healthy timing drive. This is the cheapest step and it sometimes ends the job.",
      },
      {
        title: "Listen at start-up",
        detail:
          "A rattle from the timing cover that settles after a second or two is characteristic of a stretched chain and worn guides on the chain-driven engines. Noise plus this code means stop driving.",
      },
      {
        title: "Graph desired against actual cam position",
        detail:
          "Watch both through the operating range on live data. A cam that never follows the command points at the phaser or the VCT solenoid; a cam that holds a fixed offset points at mechanical timing.",
      },
      {
        title: "Inspect the sensors and their wiring",
        detail:
          "Check the camshaft and crankshaft position sensors, their connectors and the harness where it passes near heat. A damaged trigger wheel or a chafed wire produces this code with the timing drive intact.",
      },
      {
        title: "Command the VCT solenoid and check its screen",
        detail:
          "Confirm the solenoid responds, and inspect its filter screen for debris. A blocked screen stops oil reaching the phaser and mimics a phaser failure at a fraction of the cost.",
      },
      {
        title: "Verify mechanical timing with the proper tools",
        detail:
          "If the electrical and oil-side checks are clean, the timing itself needs verifying against the factory marks using the correct camshaft and crankshaft locking tools. Do not attempt this by eye.",
      },
      {
        title: "Complete any required relearn after repair",
        detail:
          "Timing work usually requires a cam or crank relearn procedure before the PCM will trust the relationship again. Skipping it can leave the code stored even after a correct repair.",
      },
    ],
    costs: [
      {
        job: "Oil level, condition and pressure check",
        parts: "Low — oil and filter if due",
        shop: "Part of diagnosis",
        diy: "Easy for level; moderate for pressure",
        note: "Cheapest possible outcome and worth ruling out first",
      },
      {
        job: "Cam or crank position sensor",
        parts: "Low to moderate",
        shop: "Usually modest labour",
        diy: "Easy to moderate",
        note: "Only after signal quality has actually been checked",
      },
      {
        job: "VCT solenoid",
        parts: "Moderate",
        shop: "Modest labour on most engines",
        diy: "Moderate",
        note: "Inspect the filter screen before condemning the phaser behind it",
      },
      {
        job: "Timing belt service (1.5L and 1.6L)",
        parts: "Moderate — kit with tensioner",
        shop: "Get a quote — requires locking tools",
        diy: "Advanced — special tools essential",
        note: "A maintenance item on these engines, so check whether yours is overdue",
      },
      {
        job: "Belt repositioned by one tooth",
        parts: "Minimal",
        shop: "Labour only where the belt is otherwise sound",
        diy: "Advanced",
        note: "Possible on belt engines where the belt has jumped but is not worn out",
      },
      {
        job: "Timing chain, guides and tensioner (2.0L, 2.5L)",
        parts: "Higher — full kit",
        shop: "Commonly $800–$3,500",
        diy: "Advanced",
        note: "Labour-dominated; the large end of the range on harder-access engines",
      },
    ],
    dontReplace:
      "Do not replace the camshaft position sensor because the code says 'camshaft position'. P0016 is a relationship test between two measurements, and a new sensor cannot correct a stretched chain, a slipped belt, a stuck phaser, low oil pressure or a blocked VCT screen. Check the oil first, graph desired against actual cam position second, and only then decide what actually needs replacing.",
    yearNotes: [
      "The 1.5L EcoBoost and 1.6L EcoBoost use a timing belt, which is a scheduled maintenance item rather than a lifetime component. If yours is overdue, that is directly relevant to this code.",
      "The 2.0L EcoBoost and the 2.5L engines use a timing chain. Chains have no replacement interval but stretch with age, and their plastic guides wear — the classic symptom is a rattle at start-up.",
      "Timing work on these engines requires special tools to lock the camshafts and crankshaft in precise alignment. This is not a job to improvise, and for most owners it belongs with a professional.",
      "On a belt engine where the belt has jumped a single tooth but is otherwise sound, a technician can sometimes loosen the tensioner and reposition it rather than replacing the whole drive.",
    ],
    faqs: [
      {
        question: "What does P0016 mean on a Ford Escape?",
        answer:
          "That the PCM compared crankshaft position against the Bank 1 intake camshaft position and did not find the expected relationship. Something in the timing drive has moved, or something is reporting position incorrectly.",
      },
      {
        question: "Does my Escape have a timing belt or a chain?",
        answer:
          "The 1.5L and 1.6L EcoBoost use a belt. The 2.0L EcoBoost and the 2.5L engines use a chain. This is the first thing to establish because it changes the diagnosis and the cost.",
      },
      {
        question: "Can I drive with P0016?",
        answer:
          "Keep it to a minimum, and stop entirely for timing-cover noise, hard starting, stalling or low oil pressure. On an interference engine, a timing component that fails completely can bend valves.",
      },
      {
        question: "How much does it cost to fix P0016 on an Escape?",
        answer:
          "It ranges enormously. An oil change or a VCT solenoid is modest. A timing chain with guides and tensioner is commonly $800 to $3,500. Establishing which you need before authorising work is the whole point of the diagnosis.",
      },
      {
        question: "Can low oil cause P0016?",
        answer:
          "Yes. Variable cam timing is operated by oil pressure, so low level, degraded oil or pressure below specification can set this code with a perfectly healthy belt or chain. Always check the oil first.",
      },
      {
        question: "Do I need a new camshaft position sensor?",
        answer:
          "Usually not. The code is a relationship test, not a sensor test. A new sensor cannot correct a slipped belt, a stretched chain, a stuck phaser or low oil pressure.",
      },
      {
        question: "Can a jumped timing belt be fixed without replacing it?",
        answer:
          "Sometimes. Where a belt has jumped a single tooth but is otherwise in good condition, a technician can loosen the tensioner and reposition it on the cam gear. Whether that is appropriate depends on the belt's age and condition.",
      },
      {
        question: "What does a rattle at start-up mean?",
        answer:
          "On the chain-driven 2.0L and 2.5L engines it is characteristic of a stretched chain and worn guides. Combined with P0016 it is a reason to stop driving rather than to monitor it.",
      },
    ],
    closing: {
      title: "Verifying a timing repair properly",
      paragraphs: [
        "A quiet engine is not verification. Timing repairs need confirming with data and with the relearn procedure the PCM expects, or the code can remain stored after entirely correct work.",
        "After the repair, complete any cam or crank relearn the service information specifies, then graph desired against actual Bank 1 intake cam position across the operating range that originally set the code. The actual value should track the command closely and settle where it is asked to.",
        "Then check the conditions rather than just the code. Confirm oil level and pressure are correct, that no debris was found suggesting further wear, and that no new noise has appeared. Keep the before-and-after scan data — it documents that the correlation itself returned to normal, which is a stronger record than a warning light that happens to be off.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsP0016Escape, goPartsEscapeBelt, fordManuals],
  },
];
