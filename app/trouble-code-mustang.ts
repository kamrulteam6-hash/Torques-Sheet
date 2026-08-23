import type { TroubleCodeGuide } from "./trouble-code-data";
import { fordManuals, fordObd2017, fordObd2024 } from "./trouble-code-sources";

/**
 * Ford Mustang trouble-code guides: shared definitions plus the misfire codes.
 *
 * The Mustang differs from the rest of the Ford range in two ways that shape
 * most of these pages. Its engines get worked far harder than the same units
 * in a truck or a crossover — track days, sustained high rpm, and a large
 * proportion of modified cars. And two specific documented faults sit behind a
 * lot of its codes: Gen 3 Coyote oil consumption, and the 2.3L EcoBoost
 * open-deck head-gasket flaw that Ford redesigned for 2020.
 */

export const mustangVehicle = {
  name: "Ford Mustang",
  kicker: "FORD MUSTANG · 5.0L COYOTE V8 · 2.3L ECOBOOST · 3.7L V6 · 5.2L",
  breadcrumb: "Ford Mustang",
  about: "Ford Mustang",
  yearsIntro:
    "Two things separate a Mustang from the same engine in a truck. It gets used harder — sustained high rpm, track days and a much higher proportion of modified cars — so heat, oil and fuelling all sit closer to their limits. And two documented faults sit behind a large share of its codes: Gen 3 Coyote oil consumption on 2018–2020 cars, and the 2.3L EcoBoost open-deck head-gasket flaw that Ford redesigned for the 2020 model year. Identify your engine and generation before you read any further.",
};

export const coyoteOilTsb = {
  number: "Ford TSB (2019) — Gen 3 Coyote oil consumption",
  applies: "Certain 2018–2020 5.0L Coyote engines",
  summary:
    "Ford advised dealers of excessive oil consumption on affected Gen 3 engines — reportedly over one quart per 3,000 miles with no visible external leak. The condition is associated with strong internal vacuum when fuel injection is reduced during deceleration, and with piston ring sealing. Confirm VIN coverage with a dealer rather than assuming it applies.",
};

export const coyoteTickSsm = {
  number: "Ford Special Service Message — Coyote 'typewriter tick'",
  applies: "5.0L Coyote engines across multiple model years",
  summary:
    "Ford has issued and repeatedly updated a message covering the irregular ticking at hot idle produced by the Coyote's direct-injection fuel system. Ford's position is that this particular noise is a normal characteristic rather than a fault. It is worth knowing about because it sounds alarming and gets confused with genuine mechanical noise.",
};

export const slashgearCoyoteOil = {
  label: "Ford Coyote 5.0 oil consumption: the Gen 3 intake valve problem",
  url: "https://www.slashgear.com/2161162/ford-coyote-5-0-engine-oil-consumption-gen-3-intake-valve-problem-overview/",
  note: "Documents the 2018–2020 oil consumption condition, its reported rate and Ford's bulletin response",
};

export const slashgearCoyoteProblems = {
  label: "Common problems with the Ford 5.0 Coyote engine",
  url: "https://www.slashgear.com/1819720/ford-5-0-coyote-engine-common-problems/",
  note: "Covers oil consumption, the tick, and head-gasket failure by Coyote generation",
};

export const autopianCoyoteTick = {
  label: "The Coyote engine tick, and why Ford says it is normal",
  url: "https://www.theautopian.com/nobody-knows-whats-making-fords-coyote-engines-tick/",
  note: "Explains Ford's Special Service Message position on the direct-injection ticking noise",
};

export const lemonLaw23 = {
  label: "Ford 2.3 EcoBoost problems and how to fix them",
  url: "https://lemonlawfirm.com/ford-2-3-liter-ecoboost-problems-how-to-fix-them/",
  note: "Documents the open-deck head-gasket flaw and the 2020 design change",
};

export const troubleCodeMustang: TroubleCodeGuide[] = [
  /* ------------------------------------------------------------------ P0300 */
  {
    slug: "ford/mustang/p0300",
    code: "P0300",
    title: "P0300 Code Ford Mustang: Random Misfire Causes & Fixes",
    description:
      "P0300 on a Ford Mustang by engine — Coyote oil consumption, the 2.3L open-deck head gasket, and why a modified car changes the diagnosis.",
    definition: "Random/Multiple Cylinder Misfire Detected",
    severity: "Stop soon",
    vehicle: mustangVehicle,
    driveAdvice:
      "Stop driving if the check-engine light is flashing — that means active misfire severe enough to destroy a catalytic converter, and on a car people drive hard that happens quickly. Check the oil level and the coolant level before driving anywhere with this code. On a Gen 3 Coyote the oil may simply be low; on a pre-2020 2.3L EcoBoost, coolant loss with misfire points at a documented head-gasket flaw.",
    quickAnswer:
      "P0300 means your Mustang's PCM saw misfire across more than one cylinder, or without one cylinder dominating. Three things make this code behave differently on a Mustang than on any other Ford. The 5.0L Coyote in 2018–2020 cars has a documented oil-consumption condition that fouls plugs. The 2.3L EcoBoost built before 2020 has an open-deck head-gasket flaw where coolant reaches the cylinders. And a large share of these cars carry aftermarket tunes, superchargers or exhaust work, any of which can produce misfire that no factory diagnostic tree will explain.",
    symptoms: [
      {
        key: "flashing",
        label: "Check-engine light is flashing",
        response:
          "Stop as soon as it is safe. Raw fuel is reaching the exhaust and a catalytic converter can be destroyed in minutes. On a car being driven enthusiastically, minutes is not an exaggeration.",
      },
      {
        key: "oil-low",
        label: "Oil level noticeably low with no visible leak",
        response:
          "On a 2018–2020 Coyote, check this before anything else. Ford documented affected Gen 3 engines consuming over a quart every 3,000 miles with nothing on the driveway. Oil reaching the combustion chamber fouls plugs and produces exactly this code.",
      },
      {
        key: "coolant-2-3",
        label: "Coolant disappearing on a 2.3L EcoBoost",
        response:
          "On a pre-2020 2.3L this is the symptom that matters most. The open-deck design routes coolant through slits between cylinders, and that is where the head gasket fails. Coolant reaching a cylinder causes misfire and, driven on, engine damage.",
      },
      {
        key: "modified",
        label: "The car has a tune, supercharger or exhaust work",
        response:
          "Say so before anyone starts diagnosing. A calibration asking for more timing or boost than the hardware supports produces misfire that no factory diagnostic tree accounts for. Returning to stock is a legitimate diagnostic step, not an inconvenience.",
      },
      {
        key: "track",
        label: "Appeared during or after a track session",
        response:
          "Heat, sustained high rpm and fuel-system demand all peak on track. Look at oil level and temperature, fuel supply under sustained load, and whether the misfire only appears above a certain rpm or after a certain duration.",
      },
      {
        key: "rough-idle",
        label: "Rough idle that clears as revs rise",
        response:
          "More typical of an ordinary cause — a vacuum leak, aged plugs or a weak coil. Pull freeze frame and the cylinder counters before replacing anything, and check the oil anyway.",
      },
    ],
    causes: [
      {
        cause: "Oil consumption fouling plugs (2018–2020 Coyote)",
        evidence:
          "Oil level dropping with no external leak; plugs oily on removal; documented Gen 3 condition",
        firstTest:
          "Check oil level and consumption rate, then inspect the plugs for oil fouling before buying coils",
      },
      {
        cause: "Head gasket flaw (pre-2020 2.3L EcoBoost)",
        evidence:
          "Coolant loss with no external leak; white smoke; overheating; misfire on one or more cylinders",
        firstTest:
          "Pressure-test the cooling system and run a combustion-gas test before replacing ignition parts",
      },
      {
        cause: "Worn plugs or failing coils",
        evidence:
          "High mileage or high-rpm use since the last change; misfire follows a coil when moved",
        firstTest:
          "Inspect all plugs together, then swap a coil to another cylinder and see whether the misfire follows",
      },
      {
        cause: "Aftermarket calibration or forced induction",
        evidence:
          "Tune, supercharger, turbo kit or exhaust modification fitted; misfire under boost or at high rpm",
        firstTest:
          "Return the car to stock calibration and confirm whether the misfire persists",
      },
      {
        cause: "Carbon build-up on intake valves",
        evidence:
          "Direct-injected engine at higher mileage; gradual onset; rough cold running that improves warm",
        firstTest:
          "Borescope the intake valves before assuming ignition components are at fault",
      },
      {
        cause: "Fuel supply falling short under load",
        evidence:
          "Misfire only at sustained high rpm or on track; fuel pressure dropping under demand",
        firstTest:
          "Log fuel pressure under the load and duration that actually produces the misfire",
      },
    ],
    deepDive: [
      {
        heading: "Gen 3 Coyote oil consumption (2018–2020)",
        paragraphs: [
          "If your Mustang has the 5.0L Coyote from these model years, check the oil before you spend anything. Ford advised dealers in a 2019 bulletin that affected Gen 3 engines could consume more than a quart every 3,000 miles with no visible external leak.",
          "Two mechanisms are described. One is the strong internal vacuum the engine creates when fuel injection is temporarily reduced during deceleration — the kind of overrun a Mustang sees constantly. The other is piston ring sealing. Either way the oil ends up in the combustion chamber, where it fouls plugs and produces misfire.",
          "The diagnostic implication is straightforward: if the plugs come out oily and the oil level has dropped with nothing on the driveway, replacing coils will change nothing. Establish the consumption rate first — measure it over a known distance rather than guessing — and check whether your VIN falls inside Ford's bulletin coverage before authorising any repair.",
        ],
      },
      {
        heading: "The 2.3L EcoBoost head gasket, and why 2020 matters",
        paragraphs: [
          "The 2.3L EcoBoost uses an open-deck block, which means the cylinders are not fully supported around their circumference. Coolant circulates through slits between the cylinders, and it is precisely at those slits that the head gasket has failed on these engines.",
          "The symptoms follow from that: coolant loss with no external leak, overheating, white exhaust smoke, and misfire on whichever cylinder the coolant reaches. Driven on, it progresses to engine damage.",
          "The detail that matters when you are buying or diagnosing one of these cars: Ford changed the design for the 2020 model year specifically because of this flaw. So a pre-2020 2.3L Mustang with coolant loss and misfire deserves a cooling-system pressure test and a combustion-gas test before anyone touches the ignition system. A 2020-or-later car is a different proposition.",
        ],
      },
      {
        heading: "The Coyote tick: which one are you hearing?",
        paragraphs: [
          "Coyote owners hear ticking and worry, and the internet does not help because two very different things produce a similar noise.",
          "The first is the so-called BBQ or typewriter tick — an irregular clicking at hot idle produced by the direct-injection fuel system. Ford has issued a Special Service Message on it and updated it repeatedly as new models arrived, and Ford's position is that this noise is a normal characteristic rather than a fault. It is not connected to misfire.",
          "The second is genuine mechanical noise. First-generation Coyote owners have reported failed connecting rod bearings, which also produce a tick. That is not normal, and it is not something to drive through.",
          "The distinguishing questions: does the noise change with load rather than just temperature? Is there any metal in the oil? Is oil pressure normal? A tick that only appears at hot idle and never changes under load fits Ford's described characteristic. One that deepens under load, or arrives with low oil pressure, does not — and that combination alongside a misfire code needs stopping for.",
        ],
      },
      {
        heading: "Modified cars change the diagnosis entirely",
        bullets: [
          "A calibration requesting more timing than the fuel supports produces knock-driven misfire",
          "A supercharger or turbo kit changes fuelling demand well beyond the factory design point",
          "Colder plugs fitted for boost can foul at part throttle and misfire at idle",
          "Long-tube headers move oxygen sensors and change what the PCM sees",
          "Returning to stock calibration is a diagnostic step, not an admission of anything",
          "Tell the shop up front — hiding modifications wastes their time and your money",
        ],
      },
    ],
    freezeFrame: [
      "Individual cylinder misfire counters — which cylinders and how many events narrows this quickly",
      "Engine rpm and load at the moment of the fault, which separates idle misfire from high-rpm misfire",
      "Engine coolant temperature, separating a cold-start fault from a heat-related one",
      "Short and long-term fuel trim; positive trims alongside misfire point at a lean condition as the cause",
      "Any companion codes — lean codes, knock-related data or a cooling code redirect the diagnosis",
      "Vehicle speed and throttle position, which reveal whether it happens under sustained load",
    ],
    steps: [
      {
        title: "Check oil and coolant levels first",
        detail:
          "Two minutes, no cost, and on a Mustang it addresses the two most consequential possibilities. Low oil with no leak on a 2018–2020 Coyote, or coolant loss on a pre-2020 2.3L, both change the entire diagnosis.",
      },
      {
        title: "Declare any modifications",
        detail:
          "A tune, supercharger, header or exhaust change is directly relevant. Diagnosing a modified car against factory expectations wastes time, and returning to stock calibration is a legitimate step rather than a reflection on your choices.",
      },
      {
        title: "Save the freeze frame and cylinder counters",
        detail:
          "Record misfire counts for every cylinder before clearing. Note especially whether the fault happened at idle, at sustained high rpm, or under boost — those point in genuinely different directions.",
      },
      {
        title: "Pull the plugs and read them",
        detail:
          "Oily deposits point at oil consumption or valve seals. Wet with fuel means no ignition. Sooty means rich. On a Coyote, oily plugs alongside a dropping oil level is the Gen 3 pattern rather than a coil problem.",
      },
      {
        title: "Swap a coil rather than replacing the set",
        detail:
          "Move a coil from a misfiring cylinder to a healthy one, label both, clear the code and drive the conditions from your freeze frame. If the misfire follows, you have found it for free.",
      },
      {
        title: "Pressure-test the cooling system on a 2.3L",
        detail:
          "On a pre-2020 2.3L with any coolant loss, this comes before ignition parts. Combine it with a combustion-gas test to establish whether exhaust gas is entering the cooling system.",
      },
      {
        title: "Log fuel pressure under real load",
        detail:
          "If the misfire only appears at sustained high rpm or on track, idle testing will never show it. Log fuel pressure through the conditions that actually produce the fault.",
      },
      {
        title: "Consider intake-valve carbon on direct-injected engines",
        detail:
          "On a higher-mileage car with gradual onset and no other cause found, borescope the intake valves. Direct injection means no fuel washes them clean.",
      },
    ],
    tsbs: [coyoteOilTsb, coyoteTickSsm],
    costs: [
      {
        job: "Oil and coolant level check",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Trivial",
        note: "Addresses the two most consequential Mustang-specific possibilities",
      },
      {
        job: "Oil consumption measurement",
        parts: "Cost of oil",
        shop: "Usually a documented consumption test over set mileage",
        diy: "Easy but takes time",
        note: "Required evidence for any bulletin or warranty conversation on a Gen 3 Coyote",
      },
      {
        job: "Coil swap diagnostic",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Easy on the Coyote — coils sit on top",
        note: "Finds or eliminates the most common ignition cause for free",
      },
      {
        job: "Spark plug set",
        parts: "Moderate for eight on a V8",
        shop: "Straightforward access on the Coyote",
        diy: "Easy to moderate",
        note: "Track-used cars go through plugs faster than the interval suggests",
      },
      {
        job: "Cooling system and combustion-gas test",
        parts: "Low — test fluid",
        shop: "Modest add-on to diagnosis",
        diy: "Easy with a kit",
        note: "Essential on a pre-2020 2.3L with coolant loss",
      },
      {
        job: "Head gasket repair (2.3L)",
        parts: "—",
        shop: "Substantial — get a written quote",
        diy: "Not a DIY job",
        note: "The documented failure on pre-2020 open-deck 2.3L engines",
      },
    ],
    dontReplace:
      "Do not buy eight coils and eight plugs before checking the oil level on a 2018–2020 Coyote or the coolant level on a pre-2020 2.3L. Both engines have documented conditions that produce misfire and that no ignition part will touch. And if the car is modified, say so before diagnosis starts — a calibration asking for more than the hardware supports is a cause the factory diagnostic tree cannot find.",
    yearNotes: [
      "2018–2020 5.0L Coyote engines are covered by a Ford bulletin describing excessive oil consumption — reportedly over one quart per 3,000 miles with no external leak.",
      "Pre-2020 2.3L EcoBoost engines use an open-deck design where the head gasket has failed at the coolant slits between cylinders. Ford changed the design for the 2020 model year.",
      "Ford has a Special Service Message stating the Coyote's direct-injection 'typewriter tick' at hot idle is a normal characteristic, not a fault.",
      "First-generation Coyote engines have owner reports of failed connecting rod bearings, which produce a tick that is genuinely a problem — unlike the injector noise.",
    ],
    faqs: [
      {
        question: "What does P0300 mean on a Ford Mustang?",
        answer:
          "That the PCM detected misfire across more than one cylinder, or with none dominating. It names a symptom rather than a failed part.",
      },
      {
        question: "Why is my Coyote using oil with no leak?",
        answer:
          "On 2018–2020 Gen 3 engines that is a documented condition. Ford advised dealers of consumption over a quart per 3,000 miles, associated with internal vacuum during deceleration and with piston ring sealing.",
      },
      {
        question: "Can oil consumption cause a misfire?",
        answer:
          "Yes. Oil reaching the combustion chamber fouls the spark plug, and a fouled plug misfires. That is why oily plugs plus a dropping oil level points away from coils entirely.",
      },
      {
        question: "Is the ticking noise from my Coyote a problem?",
        answer:
          "Ford's position, in a Special Service Message it has updated repeatedly, is that the irregular tick at hot idle from the direct-injection system is a normal characteristic. A tick that changes with load, or arrives with low oil pressure, is a different matter.",
      },
      {
        question: "Why does my 2.3L EcoBoost keep losing coolant?",
        answer:
          "On pre-2020 engines the open-deck design puts coolant slits between the cylinders, and that is where the head gasket has failed. Ford redesigned it for 2020 because of this.",
      },
      {
        question: "Does my tune matter for this code?",
        answer:
          "A great deal. A calibration requesting more timing or boost than the fuel and hardware support produces misfire the factory diagnostic tree cannot explain. Returning to stock is a legitimate diagnostic step.",
      },
      {
        question: "My Mustang only misfires on track. Where do I look?",
        answer:
          "At fuel supply under sustained load, oil level and temperature, and whether the fault appears above a specific rpm or after a certain duration. Idle testing will never reproduce it.",
      },
      {
        question: "Should I replace all eight coils?",
        answer:
          "No. Read the individual counters, then swap one coil to test it. On a V8 that is eight times the cost for information the code has already given you.",
      },
    ],
    closing: {
      title: "Verifying a Mustang misfire repair",
      paragraphs: [
        "Write down the freeze frame and every cylinder counter before clearing anything. On a car driven hard, the conditions matter enormously — a misfire that only appears at 6,000 rpm cannot be verified in a car park.",
        "After the repair, drive the load, rpm and temperature conditions the freeze frame recorded and confirm the counters stay at zero. If the fault was track-related, that means reproducing track-like conditions rather than a gentle commute.",
        "On a Gen 3 Coyote, keep measuring oil consumption after the repair even if the misfire is gone. A documented consumption rate is the evidence any warranty or bulletin conversation will depend on, and gathering it takes weeks rather than minutes — so start now rather than when you need it.",
      ],
    },
    sources: [fordObd2017, fordObd2024, slashgearCoyoteOil, lemonLaw23, fordManuals],
  },

  /* ------------------------------------------------------------------ P0301 */
  {
    slug: "ford/mustang/p0301",
    code: "P0301",
    title: "P0301 Code Ford Mustang: Cylinder 1 Misfire Causes & Fixes",
    description:
      "P0301 on a Ford Mustang. Where cylinder 1 sits on the Coyote V8, the free coil test, and when oil consumption is the real cause.",
    definition: "Cylinder 1 Misfire Detected",
    severity: "Stop soon",
    vehicle: mustangVehicle,
    driveAdvice:
      "A flashing light means stop as soon as it is safe. A steady light with an engine that still pulls cleanly may allow a short, gentle trip for diagnosis — but gentle is the operative word, and towing or track use is out. Check the oil level before you drive anywhere on a 2018–2020 Coyote.",
    quickAnswer:
      "P0301 is more useful than P0300 because your Mustang has named the cylinder. On the 5.0L Coyote V8, cylinder 1 sits at the front of Bank 1 — the passenger-side bank — and its coil and plug are among the easier ones to reach. On the 2.3L EcoBoost, cylinder 1 is at the accessory-drive end of a single inline bank. Either way the same two free tests separate the two most likely causes in about fifteen minutes. The Mustang-specific twist: on a Gen 3 Coyote, an oil-fouled plug from the documented consumption condition can present as a single-cylinder misfire before it becomes a general one.",
    symptoms: [
      {
        key: "rough-idle",
        label: "Rough idle that smooths as revs rise",
        response:
          "Classic single-cylinder misfire. At idle nothing masks the missing contribution. Pull the freeze frame before touching anything — it records the conditions where the misfire actually happened.",
      },
      {
        key: "flashing",
        label: "Check-engine light is flashing",
        response:
          "Stop as soon as it is safe. Raw fuel reaching the exhaust destroys converters quickly, and quicker still on a car being driven with enthusiasm.",
      },
      {
        key: "oily-plug",
        label: "Cylinder 1 plug comes out oily",
        response:
          "On a 2018–2020 Coyote this points at the documented oil-consumption condition rather than a coil. Check the oil level and establish the consumption rate before buying ignition parts.",
      },
      {
        key: "cold-only",
        label: "Misfires cold, clears when warm",
        response:
          "Look at plug gap, a cracked insulator, or a coil boot leaking until it warms and expands. On a modified car, also consider a colder plug fouling at part throttle.",
      },
      {
        key: "high-rpm",
        label: "Only misfires at high rpm or under boost",
        response:
          "Points at fuel supply, ignition energy under load, or a calibration asking for more than the hardware delivers. Idle testing will not reproduce it — log data through the conditions that do.",
      },
      {
        key: "power-loss",
        label: "Down on power with worse economy",
        response:
          "One cylinder of eight on a V8, or one of four on the 2.3L — the latter is far more noticeable. Either way the PCM is still injecting fuel that is not being burned.",
      },
    ],
    causes: [
      {
        cause: "Failing coil on cylinder 1",
        evidence:
          "Misfire follows the coil when moved to another cylinder; carbon tracking in the boot",
        firstTest:
          "Swap the cylinder 1 coil with a neighbour, clear the code and see whether the misfire moves",
      },
      {
        cause: "Worn or fouled spark plug",
        evidence:
          "Cylinder 1 plug differs from the others — eroded electrode, cracked insulator, oil or fuel fouling",
        firstTest:
          "Remove it and compare directly against the other plugs and the specification for your engine",
      },
      {
        cause: "Oil fouling from consumption (2018–2020 Coyote)",
        evidence:
          "Oil level dropping with no external leak; plug oily rather than merely worn",
        firstTest:
          "Check oil level and measure the consumption rate over a known distance",
      },
      {
        cause: "Injector fault on cylinder 1",
        evidence:
          "Misfire stays after plug and coil are eliminated; injector quiet or resistance out of line",
        firstTest:
          "Listen with a stethoscope, compare resistance, then run the scan tool's injector test",
      },
      {
        cause: "Coolant reaching that cylinder (pre-2020 2.3L)",
        evidence:
          "Coolant loss with no external leak; white smoke; overheating history",
        firstTest:
          "Pressure-test the cooling system and run a combustion-gas test",
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
        heading: "Where cylinder 1 is, by engine",
        paragraphs: [
          "On the 5.0L Coyote V8, cylinder 1 is at the front of Bank 1, which is the passenger-side bank. That is genuinely convenient — it is one of the more accessible coils and plugs on the engine, so both of the free tests below are quick.",
          "On the 2.3L EcoBoost, there is only one bank. Cylinders run in a line from the accessory-drive end, and cylinder 1 is at that end.",
          "On the 3.7L V6, the layout is different again and worth confirming for your specific car rather than assuming, because carrying over a V8 convention will send you to the wrong side.",
        ],
      },
      {
        heading: "The two free tests, in order",
        paragraphs: [
          "First, pull the cylinder 1 plug and lay it beside the others. What you find narrows the cause immediately. A light tan insulator means it was firing correctly and the fault is elsewhere. Wet with fuel means no ignition at all. Sooty black means rich. And oily means oil is entering the chamber — which on a Gen 3 Coyote points at the consumption condition rather than at anything you can fix with a coil.",
          "Second, swap the cylinder 1 coil with a neighbouring one. Label both, clear the code, then drive the conditions your freeze frame recorded. If the code returns naming the cylinder that now holds the original coil, the coil is faulty and you proved it for nothing. If it comes back as P0301, the coil is fine and the most common cause is eliminated.",
          "Between them these two tests cost nothing and resolve most single-cylinder misfires. On a V8 in particular they are worth doing before buying anything, because eight coils is a serious bill for information the code already gave you.",
        ],
      },
      {
        heading: "When it is oil rather than ignition",
        paragraphs: [
          "This is the Mustang-specific branch. Ford's 2019 bulletin describes affected 2018–2020 Gen 3 Coyote engines consuming over a quart of oil every 3,000 miles with no visible external leak, associated with internal vacuum during deceleration and with piston ring sealing.",
          "Oil that reaches a combustion chamber fouls the plug in that cylinder, and a fouled plug misfires. So the sequence people run into is: P0301 appears, a new plug fixes it for a while, then it returns — because the oil is still arriving and fouling the new plug too.",
          "If the cylinder 1 plug comes out oily and your oil level has been dropping with nothing on the driveway, stop and measure the consumption rate properly over a known distance. That measurement is also the evidence any bulletin or warranty conversation will require, so it is worth starting early rather than when you need it.",
        ],
      },
      {
        heading: "Why replacing all eight is the wrong instinct",
        bullets: [
          "P0301 already named the cylinder — that is the code doing the hard part for you",
          "Eight coils on a V8 is eight times the cost for no extra information",
          "It disturbs seven connectors that were working perfectly",
          "If the cause is oil, an injector or compression, new coils change nothing at all",
          "The coil swap answers the same question for free in fifteen minutes",
        ],
      },
    ],
    freezeFrame: [
      "Misfire counters for every cylinder, confirming cylinder 1 genuinely dominates",
      "Engine rpm and load when the counters climbed — idle, high rpm and boost point differently",
      "Engine coolant temperature, separating a cold-start fault from a heat-related one",
      "Short and long-term fuel trim; positive trims suggest air or fuel rather than ignition",
      "Any companion codes — lean codes, knock data or a second misfire code change the order",
      "Vehicle speed and throttle position at the time of the fault",
    ],
    steps: [
      {
        title: "Check the oil level and condition",
        detail:
          "On a 2018–2020 Coyote this comes first. Low oil with no external leak, alongside a misfire, points at the documented consumption condition rather than at any ignition component.",
      },
      {
        title: "Confirm cylinder 1 is genuinely dominating",
        detail:
          "Read all counters. If several cylinders are climbing together, you have a broader problem than one failed part and the diagnosis changes.",
      },
      {
        title: "Pull the cylinder 1 plug and read it",
        detail:
          "Compare it against the others. Oily, wet, sooty or clean each point somewhere different, and on the Coyote cylinder 1 is one of the easier plugs to reach.",
      },
      {
        title: "Swap the coil and label both",
        detail:
          "Move the cylinder 1 coil to a neighbouring cylinder, clear the code and drive the freeze-frame conditions. If the misfire follows, you have found it without spending anything.",
      },
      {
        title: "Inspect the boot and connector",
        detail:
          "Carbon tracking looks like a thin black line down the insulator and lets spark escape to ground. A broken connector lock lets the coil work loose under vibration — more likely on a car driven hard.",
      },
      {
        title: "Declare and remove any tune",
        detail:
          "If the car is modified, returning to stock calibration is a diagnostic step. A tune asking for more timing than the fuel supports produces misfire that no factory tree will find.",
      },
      {
        title: "Test the injector on that cylinder",
        detail:
          "With plug and coil eliminated, listen to the injector, compare its resistance with the others, and use the scan tool's injector test where available.",
      },
      {
        title: "Check compression when nothing moves the fault",
        detail:
          "Relative compression from the scan tool first, then a mechanical compression or leak-down test. This is where the job stops being a weekend task.",
      },
    ],
    tsbs: [coyoteOilTsb],
    costs: [
      {
        job: "Plug inspection and coil swap",
        parts: "$0",
        shop: "Part of diagnosis",
        diy: "Easy — 15 minutes on the Coyote",
        note: "Together these identify most P0301 faults at no cost",
      },
      {
        job: "Single ignition coil",
        parts: "Moderate",
        shop: "Typically under an hour of labour",
        diy: "Easy — coils sit on top on the Coyote",
        note: "Replace the one you proved faulty, not all eight",
      },
      {
        job: "Spark plug set",
        parts: "Moderate for eight on a V8",
        shop: "Straightforward access",
        diy: "Easy to moderate",
        note: "Track-used cars need them sooner than the service interval implies",
      },
      {
        job: "Oil consumption measurement",
        parts: "Cost of oil",
        shop: "Documented test over set mileage",
        diy: "Easy but takes weeks",
        note: "The evidence any bulletin or warranty conversation will require",
      },
      {
        job: "Injector diagnosis and replacement",
        parts: "Higher on direct-injection engines",
        shop: "Get a quote",
        diy: "Advanced",
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
      "Do not replace all eight coils because one cylinder misfired — that is eight times the cost for information P0301 already gave you free. Pull the plug, then swap the coil. And if that plug comes out oily on a 2018–2020 Coyote, stop: you are looking at the documented oil-consumption condition, and no ignition part will fix a plug that keeps getting fouled.",
    yearNotes: [
      "On the 5.0L Coyote V8, cylinder 1 is at the front of Bank 1, the passenger-side bank, and is among the more accessible coils and plugs on the engine.",
      "On the 2.3L EcoBoost there is a single bank, with cylinder 1 at the accessory-drive end.",
      "2018–2020 Gen 3 Coyote engines are covered by a Ford bulletin describing oil consumption over a quart per 3,000 miles with no external leak, which fouls plugs and causes misfire.",
      "Pre-2020 2.3L EcoBoost engines have a documented open-deck head-gasket flaw that lets coolant reach the cylinders. Ford redesigned it for 2020.",
    ],
    faqs: [
      {
        question: "Where is cylinder 1 on a Mustang GT?",
        answer:
          "At the front of Bank 1 on the 5.0L Coyote, which is the passenger-side bank. It is one of the more accessible cylinders for plug and coil work.",
      },
      {
        question: "Can I drive with P0301?",
        answer:
          "Briefly and gently if the light is steady, and not at all if it is flashing. Track use is out entirely until it is diagnosed.",
      },
      {
        question: "Why is my cylinder 1 plug oily?",
        answer:
          "Oil is reaching that combustion chamber. On a 2018–2020 Coyote that matches the documented consumption condition, and it explains a misfire that keeps coming back after new plugs.",
      },
      {
        question: "Should I replace the coil or the plug first?",
        answer:
          "Inspect the plug first — it costs nothing and frequently shows the fault outright. Then swap the coil to another cylinder. Those two free steps identify most P0301 faults.",
      },
      {
        question: "Does my aftermarket tune affect this?",
        answer:
          "It can cause it. A calibration requesting more timing or boost than the fuel and hardware support produces misfire the factory diagnostic tree cannot explain. Return to stock to find out.",
      },
      {
        question: "Why did P0301 return after new plugs and coils?",
        answer:
          "Because the fault was never in the ignition system. On a Coyote, oil fouling the new plug is a common explanation. Otherwise look at the injector or compression.",
      },
      {
        question: "Is one misfiring cylinder worse on the 2.3L?",
        answer:
          "It feels worse — losing one of four cylinders removes a quarter of the engine, against one of eight on the V8. The diagnosis is the same, but the symptom is far more obvious.",
      },
      {
        question: "How much does it cost to fix P0301 on a Mustang?",
        answer:
          "Usually modest — a plug or a single coil, both accessible on these engines. It becomes expensive when the cause is oil consumption, an injector or compression, which is why the free tests come first.",
      },
    ],
    closing: {
      title: "Confirming the cylinder 1 repair held",
      paragraphs: [
        "Write down the freeze frame and all cylinder counters before clearing anything. Clearing first destroys the record of conditions you need to reproduce, and on a car whose misfire may only appear at high rpm that record is everything.",
        "Then drive the rpm, load and temperature window the freeze frame recorded and watch the cylinder 1 counter. Zero counts across those exact conditions is the proof. A dark dashboard during a gentle drive proves nothing about a fault that appeared at 6,000 rpm.",
        "If the plug was oily, check it again in a few thousand miles even if the misfire has gone. A plug that is fouling again tells you the oil is still arriving, and that is a different repair from the one you just did.",
      ],
    },
    sources: [fordObd2017, fordObd2024, slashgearCoyoteProblems, autopianCoyoteTick, fordManuals],
  },
];
