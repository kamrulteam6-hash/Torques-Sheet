import type { TroubleCodeGuide } from "./trouble-code-data";
import {
  fordDriveCycle,
  fordManuals,
  fordObd2017,
  fordObd2024,
  goPartsP1450,
  repairPalCanister,
  repairPalPurge,
} from "./trouble-code-sources";
import {
  autopianCoyoteTick,
  coyoteOilTsb,
  coyoteTickSsm,
  mustangVehicle,
  slashgearCoyoteOil,
} from "./trouble-code-mustang";

/** Mustang timing, EVAP and readiness codes. */
export const troubleCodeMustangC: TroubleCodeGuide[] = [
  /* ------------------------------------------------------------------ P0016 */
  {
    slug: "ford/mustang/p0016",
    code: "P0016",
    title: "P0016 Code Ford Mustang: Cam/Crank Timing Causes & Fixes",
    description:
      "P0016 on a Ford Mustang. Coyote cam phasers, why oil condition decides the outcome, and how to tell a phaser rattle from the normal tick.",
    definition: "Crankshaft Position / Camshaft Position Correlation (Bank 1 Sensor A)",
    severity: "Stop soon",
    vehicle: mustangVehicle,
    driveAdvice:
      "Treat this as serious. The PCM is reporting that the camshaft is not where crankshaft position says it should be, and on an interference engine a timing component that slips far enough does expensive damage. If the engine also rattles on start-up, runs rough, or the oil is low or overdue, stop driving and have it looked at before the next journey.",
    quickAnswer:
      "P0016 means the PCM compared the crankshaft and camshaft position signals on Bank 1 and found them out of correlation. On the 5.0L Coyote the first question is almost never the timing chain — it is the oil. The Coyote uses variable cam timing driven by oil pressure through the cam phasers, so oil that is low, thick with age, or the wrong viscosity leaves the phasers unable to reach or hold their commanded position, and the PCM sees exactly the mismatch this code describes. That matters doubly on a 2018–2020 car, where Ford documented oil consumption that owners do not always notice.",
    symptoms: [
      {
        key: "startup-rattle",
        label: "Rattle for a second or two on cold start",
        response:
          "Worth taking seriously here. Oil pressure takes a moment to reach the phasers after a cold start, and a phaser that cannot lock rattles until it does. A rattle that lengthens over weeks is a phaser or chain tensioner story rather than a sensor one.",
      },
      {
        key: "oil-low",
        label: "Oil level low or the change is overdue",
        response:
          "Check this before anything else. The whole variable-cam-timing system runs on oil pressure, and it is the cheapest and most common cause on this engine by a wide margin.",
      },
      {
        key: "oil-use",
        label: "Using oil between changes on a 2018–2020 car",
        response:
          "Ford documented consumption on Gen 3 Coyote engines with no external leak. If the level has dropped between services, the phasers may have been running short of pressure without you ever seeing a warning.",
      },
      {
        key: "rough-run",
        label: "Rough running or noticeably down on power",
        response:
          "Cam timing away from its commanded position changes valve events, and the engine breathes badly as a result. Combined with a rattle this points at a mechanical fault rather than a sensor.",
      },
      {
        key: "hard-start",
        label: "Long cranking before it catches",
        response:
          "The PCM uses cam and crank signals to decide when to fire and inject. A signal it cannot correlate delays that decision, and starting takes longer.",
      },
      {
        key: "tick-confusion",
        label: "A tick you are trying to identify",
        response:
          "Direct-injection tick at hot idle is normal on this engine and Ford has said so. A phaser or timing rattle is different in character and timing — see the deep dive below for how to separate them.",
      },
    ],
    causes: [
      {
        cause: "Low, degraded or wrong-viscosity engine oil",
        evidence:
          "Level below the mark, service overdue, or an oil grade other than the one specified for the engine",
        firstTest:
          "Check level and condition, and confirm the viscosity actually in the sump matches specification",
      },
      {
        cause: "Cam phaser wear or a stuck phaser",
        evidence:
          "Cold-start rattle that lengthens over time; commanded and actual cam position diverging in live data",
        firstTest:
          "Log commanded against actual cam timing and watch whether the phaser reaches its target",
      },
      {
        cause: "Variable cam timing oil control solenoid",
        evidence:
          "Solenoid screen blocked with debris; sluggish or no response to a commanded change",
        firstTest:
          "Command a cam timing change and watch the actual position respond, then inspect the solenoid screen",
      },
      {
        cause: "Timing chain stretch or a worn tensioner or guide",
        evidence:
          "High mileage; rattle present beyond start-up; correlation error persisting after oil and solenoid work",
        firstTest:
          "Only after oil, solenoid and phaser control have been eliminated, since access is expensive",
      },
      {
        cause: "Camshaft or crankshaft position sensor or wiring",
        evidence:
          "Intermittent code with no noise and normal oil; sensor circuit codes stored alongside",
        firstTest:
          "Inspect both sensors and their connectors, and check the signals for dropouts",
      },
      {
        cause: "Oil pressure below specification",
        evidence:
          "Pressure reading low at idle when warm; consumption that has gone unnoticed",
        firstTest:
          "Measure actual oil pressure rather than relying on the dashboard indicator",
      },
    ],
    deepDive: [
      {
        heading: "On the Coyote, oil is the diagnosis",
        paragraphs: [
          "The 5.0L Coyote uses variable cam timing, and the mechanism is hydraulic. The PCM commands a position, an oil control solenoid meters engine oil to a phaser mounted on the end of the camshaft, and oil pressure rotates the cam relative to the sprocket that drives it.",
          "Every part of that depends on oil that is at the right level, the right viscosity and clean enough to flow through small passages. Oil that is low cannot maintain pressure. Oil that has sheared down or thickened with age moves through the control passages differently. Oil carrying debris blocks the solenoid screens.",
          "In all three cases the phaser fails to reach or hold the position the PCM asked for, the PCM compares cam against crank, finds them out of correlation, and stores P0016. No component has failed — the system simply had nothing to work with.",
          "This is why the first action on a Coyote is checking oil level, condition and grade, and why on a 2018–2020 car with documented consumption it deserves even more weight. An engine quietly using a quart every few thousand miles can spend a long time running the phasers short of pressure before anybody notices.",
        ],
      },
      {
        heading: "Telling a phaser rattle from the normal Coyote tick",
        paragraphs: [
          "Coyote owners hear noises and worry, and the internet is not helpful about which ones matter. Two are worth separating clearly.",
          "The direct-injection tick — the sound owners call the BBQ tick or typewriter tick — is the high-pressure fuel injectors operating. It is most obvious at hot idle, it is present from new, and Ford has stated it is a normal characteristic. It does not indicate a fault and it has nothing to do with this code.",
          "A phaser or timing rattle sounds different and behaves differently. It is loudest in the first seconds after a cold start, before oil pressure has reached the phasers, and it fades once pressure builds. It is a rattle rather than a tick, it gets worse over weeks and months rather than staying constant, and it very often arrives alongside exactly the code you are reading about.",
          "The first-generation Coyote also had connecting rod bearing failures that produce a knock, and that is a genuine problem rather than a characteristic. If a noise is deep, load-dependent and accompanied by metal in the oil, stop driving and have it inspected properly.",
        ],
      },
      {
        heading: "Reading commanded against actual cam position",
        bullets: [
          "Both values are available in live data on this engine",
          "A healthy system tracks the command closely and quickly",
          "A phaser that lags badly or never arrives is the fault you are looking for",
          "Sluggish response across the range points at oil supply or the solenoid",
          "No response at all points at the solenoid or its circuit",
          "This single test separates a control problem from a mechanical timing problem",
        ],
      },
    ],
    freezeFrame: [
      "Engine oil temperature and coolant temperature when the code set — cold-only faults point at oil flow",
      "Engine speed and load, separating a start-up event from one under load",
      "Commanded against actual camshaft position where reported",
      "Oil pressure if available, since the whole system depends on it",
      "Run time before the code set, which distinguishes a start-up correlation error from a running one",
      "Any companion codes for cam or crank sensor circuits or VCT solenoid control",
    ],
    steps: [
      {
        title: "Check oil level, condition and grade first",
        detail:
          "Not as a formality. The variable cam timing system runs on oil pressure, so oil that is low, old or the wrong viscosity produces this code with no component faulty. It is also the cheapest possible outcome.",
      },
      {
        title: "Measure oil consumption on a 2018–2020 car",
        detail:
          "Ford documented consumption on Gen 3 Coyote engines with no external leak. An engine quietly losing oil can starve the phasers long before a warning appears.",
      },
      {
        title: "Listen carefully at cold start",
        detail:
          "A rattle in the first seconds that fades as pressure builds points at a phaser. The steady tick at hot idle is the direct injection system and is normal. The distinction changes what you do next.",
      },
      {
        title: "Log commanded against actual cam position",
        detail:
          "Watch whether the phaser reaches the target and how quickly. Lag or no response separates a control fault from a mechanical timing fault before anything is disassembled.",
      },
      {
        title: "Inspect the VCT solenoid and its screen",
        detail:
          "Debris in the screen restricts oil to the phaser. A blocked screen also tells you something about oil condition and service history that is worth acting on.",
      },
      {
        title: "Check the cam and crank sensors and wiring",
        detail:
          "Where there is no noise, oil is correct and the code is intermittent, a sensor or connector fault becomes the likely explanation rather than the last resort.",
      },
      {
        title: "Fresh oil and filter, then retest",
        detail:
          "With correct grade and a new filter, clear the code and drive it. On this engine a meaningful proportion of P0016 faults do not come back after this step alone.",
      },
      {
        title: "Only then consider chain and phaser work",
        detail:
          "Access is expensive, so reach it by elimination rather than assumption. If the rattle persists beyond start-up and cam position never tracks its command, the mechanical case is made.",
      },
    ],
    tsbs: [coyoteOilTsb, coyoteTickSsm],
    costs: [
      {
        job: "Oil and filter change with correct grade",
        parts: "Modest",
        shop: "Routine service pricing",
        diy: "Easy",
        note: "First step, and a genuine fix more often than people expect",
      },
      {
        job: "Oil consumption measurement",
        parts: "Cost of oil",
        shop: "Documented test over set mileage",
        diy: "Easy but takes weeks",
        note: "Important on a 2018–2020 Gen 3 Coyote",
      },
      {
        job: "Live-data cam timing analysis",
        parts: "$0",
        shop: "Standard diagnostic fee",
        diy: "Needs a capable scan tool",
        note: "Separates control faults from mechanical timing faults",
      },
      {
        job: "VCT oil control solenoid",
        parts: "Moderate",
        shop: "Access varies by bank",
        diy: "Moderate",
        note: "Inspect the screen before ordering a replacement",
      },
      {
        job: "Cam or crank position sensor",
        parts: "Low to moderate",
        shop: "Usually modest labour",
        diy: "Moderate",
        note: "Where the code is intermittent and the engine is quiet",
      },
      {
        job: "Cam phaser or timing chain work",
        parts: "Substantial",
        shop: "Significant labour — get a written quote",
        diy: "Advanced",
        note: "Reach this by elimination, never by assumption",
      },
    ],
    dontReplace:
      "Do not authorise timing chain or phaser work as a first move on a Coyote. The variable cam timing system is hydraulic, so oil level, oil condition and oil grade decide whether it can function at all — and those cost a fraction of an afternoon. Equally, do not buy a cam sensor because the code names camshaft position. The code describes a relationship between two signals, and the cam is far more often in the wrong place than the sensor is wrong about it.",
    yearNotes: [
      "The 5.0L Coyote uses hydraulic variable cam timing, so oil level, viscosity and condition directly determine whether the phasers can reach their commanded position.",
      "2018–2020 Gen 3 Coyote engines are covered by a Ford bulletin describing oil consumption with no external leak, which can starve the phasers unnoticed.",
      "Ford has stated that the direct-injection tick at hot idle is a normal characteristic of this engine. It is not related to this code.",
      "First-generation Coyote engines had connecting rod bearing failures producing a knock. That is a genuine fault and warrants stopping rather than diagnosis by ear.",
    ],
    faqs: [
      {
        question: "What does P0016 mean on a Ford Mustang?",
        answer:
          "The PCM compared crankshaft and camshaft position on Bank 1 and found them out of correlation. The camshaft is not where crank position says it should be.",
      },
      {
        question: "Can low oil cause P0016 on a Coyote?",
        answer:
          "Yes, and it is the most common cause. Variable cam timing is driven by oil pressure through the phasers, so low, old or wrong-viscosity oil leaves them unable to reach their commanded position.",
      },
      {
        question: "Is the ticking noise related to this code?",
        answer:
          "Usually not. The tick at hot idle is the direct injection system and Ford has said it is normal. A phaser problem rattles in the first seconds after a cold start and fades as oil pressure builds.",
      },
      {
        question: "Can I drive with P0016?",
        answer:
          "Not comfortably. If the engine also rattles, runs rough or the oil is low, stop. A timing component that slips far enough on an interference engine causes damage that dwarfs the diagnosis cost.",
      },
      {
        question: "Do I need a new timing chain?",
        answer:
          "Not before oil, the VCT solenoid and phaser control have been checked. Chain work is expensive and should be reached by elimination rather than assumed from the code.",
      },
      {
        question: "Why does it rattle only on cold start?",
        answer:
          "Oil pressure takes a moment to reach the phasers after starting. A phaser that cannot lock rattles until pressure arrives, which is why the noise fades within seconds.",
      },
      {
        question: "Does oil viscosity really matter here?",
        answer:
          "Very much. The phasers are controlled by metering oil through small passages, and a grade other than the one specified changes how that oil flows and how quickly the phaser responds.",
      },
      {
        question: "How much does P0016 cost to fix?",
        answer:
          "It ranges enormously — from an oil and filter change to substantial timing work. That range is precisely why the cheap checks come first.",
      },
    ],
    closing: {
      title: "Confirming cam timing is right again",
      paragraphs: [
        "Verification here is a live-data question rather than a dashboard one. Clear the code, bring the engine to full operating temperature, and watch commanded against actual cam position across a range of speeds and loads.",
        "A healthy system follows the command closely and quickly. A phaser that arrives slowly, or that tracks well when warm but lags badly when cold, is telling you the oil supply story is not finished even if the code has not returned yet.",
        "Then listen at the next cold start. The rattle should be gone. The tick at hot idle will still be there, and that is fine — it was never the fault.",
      ],
    },
    sources: [fordObd2017, fordObd2024, autopianCoyoteTick, slashgearCoyoteOil, fordManuals],
  },

  /* ------------------------------------------------------------------ P0456 */
  {
    slug: "ford/mustang/p0456",
    code: "P0456",
    title: "P0456 Code Ford Mustang: Small EVAP Leak Causes & Fixes",
    description:
      "P0456 on a Ford Mustang. Why the fuel cap is genuinely first, how low-mileage and stored cars set it, and what a smoke test costs.",
    definition: "Evaporative Emission System Leak Detected (Very Small Leak)",
    severity: "Service soon",
    vehicle: mustangVehicle,
    driveAdvice:
      "This one is safe to drive with. P0456 is an emissions code describing fuel vapour escaping rather than anything that affects how the engine runs. Fix it before an inspection is due, and do not ignore it indefinitely — but there is no need to change your plans today.",
    quickAnswer:
      "P0456 means your Mustang's evaporative emission system was sealed and tested, and the PCM detected a leak at the smallest threshold it can measure — roughly the area of a pinhole. The system exists to trap fuel vapour from the tank and route it into the engine to be burned instead of released. Because the threshold is so small, the fuel cap really is the first thing to check, and on a Mustang there is a second consideration worth knowing: these cars are often stored seasonally or driven infrequently, and a car that rarely completes a full drive cycle tests its EVAP system rarely too.",
    symptoms: [
      {
        key: "light-only",
        label: "Check-engine light and nothing else",
        response:
          "Almost always how this presents. EVAP faults do not affect running because the system handles vapour rather than the combustion mixture.",
      },
      {
        key: "after-fuel",
        label: "Appeared shortly after filling up",
        response:
          "Points straight at the fuel cap. Check the seal for cracks and debris, refit it until it clicks, and give the monitor a few drive cycles before concluding anything.",
      },
      {
        key: "fuel-smell",
        label: "Faint fuel smell near the rear of the car",
        response:
          "Worth investigating rather than dismissing. It suggests the leak is large enough to notice, and a visual inspection of the tank area may find it without a smoke machine.",
      },
      {
        key: "stored",
        label: "The car is stored or driven infrequently",
        response:
          "Relevant on this platform. Seasonal cars complete fewer drive cycles, so the monitor runs rarely and a small leak can go undetected for a long time before appearing. Aged rubber on a stored car is also more likely to have hardened.",
      },
      {
        key: "intermittent",
        label: "The light comes and goes",
        response:
          "Typical of a marginal seal. A cap or valve that seals in some conditions and not others fails the test intermittently, which is why the code can seem to fix itself.",
      },
      {
        key: "emissions-fail",
        label: "Failed an emissions inspection",
        response:
          "Expected. After repairing it, complete a full drive cycle so the EVAP monitor runs and passes before returning for a retest.",
      },
    ],
    causes: [
      {
        cause: "Fuel cap seal or sealing surface",
        evidence:
          "Code appeared after refuelling; cracked or hardened seal; debris on the filler neck",
        firstTest:
          "Inspect the seal and the neck, refit until it clicks, and allow several drive cycles",
      },
      {
        cause: "Cracked or perished EVAP hose",
        evidence:
          "Aged rubber, especially on an older or infrequently used car; smoke escaping during a test",
        firstTest:
          "Smoke-test the sealed system rather than searching visually for a pinhole",
      },
      {
        cause: "Purge valve not sealing",
        evidence:
          "Valve leaks when it should be closed; rough idle sometimes present alongside",
        firstTest:
          "Test the valve for a proper seal in its closed state as part of the smoke test",
      },
      {
        cause: "Vent valve or canister fault",
        evidence:
          "System will not hold the applied vacuum or pressure; leak located at the canister assembly",
        firstTest:
          "Include the canister and vent valve in the smoke test rather than only checking the tank",
      },
      {
        cause: "Filler neck corrosion or damage",
        evidence:
          "Visible corrosion or damage at the neck; leak located there during testing",
        firstTest:
          "Inspect the neck and its sealing surface with the cap removed",
      },
      {
        cause: "Fuel tank pressure sensor",
        evidence:
          "Sensor reporting implausible pressure; system passes a smoke test yet the code persists",
        firstTest:
          "Compare the sensor reading against actual conditions once the system is proven sealed",
      },
    ],
    deepDive: [
      {
        heading: "How the test works, and why the threshold is so small",
        paragraphs: [
          "The evaporative emission system captures fuel vapour from the tank in a charcoal canister and later draws it into the engine to be burned. Because it is sealed, it can be tested by sealing it fully and watching whether it holds.",
          "The PCM closes the vent valve, applies vacuum or lets natural vapour pressure build depending on the strategy, and watches the fuel tank pressure sensor. If the reading changes faster than a sealed system should allow, it concludes there is a leak and sizes it by how fast the change happens.",
          "P0456 is the smallest category the system can report — a leak roughly the size of a pinhole. That is why the fuel cap genuinely is the first thing to check rather than a cliché: a seal with a hairline crack or a piece of grit on it leaks exactly that much.",
          "It is also why finding the leak by eye is close to hopeless. A hole that small does not announce itself, which is what a smoke test is for.",
        ],
      },
      {
        heading: "Stored and low-mileage Mustangs",
        paragraphs: [
          "A lot of Mustangs do not live like commuter cars. Many are stored through winter, driven at weekends, or covered a few thousand miles a year, and that changes the picture for this code in two ways.",
          "First, the EVAP monitor needs particular conditions to run — a certain fuel level, a cold start after a long soak, and a drive of reasonable length. A car that does short trips and then sits may go a long time without ever completing the test, which means a leak can exist for months before the code appears, and equally that a repair takes a while to confirm.",
          "Second, rubber ages by time as much as by use. Hoses and seals on a low-mileage car ten or fifteen years old can be harder and more cracked than those on a higher-mileage car that has been driven regularly and kept warm. When a stored Mustang sets this code, aged rubber deserves as much attention as any valve.",
        ],
      },
      {
        heading: "Why a smoke test is the honest shortcut",
        bullets: [
          "The leak is smaller than the eye can reliably find",
          "A smoke machine fills the sealed system and shows exactly where it escapes",
          "It covers the tank, hoses, canister, valves and filler neck in one operation",
          "Roughly $75–$150 typically, against the cost of guessing at parts",
          "It also proves the system sealed afterwards, which the dashboard cannot",
          "Replacing a purge valve on suspicion is a coin flip; this is not",
        ],
      },
    ],
    freezeFrame: [
      "Fuel level when the monitor ran, since the test needs the tank within a specific range",
      "Ambient and engine coolant temperature, which affect vapour pressure and monitor eligibility",
      "Fuel tank pressure sensor reading at the moment the code set",
      "Vehicle speed and run time, confirming the monitor ran under valid conditions",
      "Whether the code is current or historic, and drive cycles completed since",
      "Any companion EVAP codes, which point at a specific valve rather than a general leak",
    ],
    steps: [
      {
        title: "Inspect and reseat the fuel cap",
        detail:
          "Look at the rubber seal for cracks and hardening, and at the filler neck for debris. Refit until it clicks. This resolves a genuine share of these codes at zero cost.",
      },
      {
        title: "Give the monitor time to run",
        detail:
          "The EVAP monitor needs a cold start after a long soak, a specific fuel range and a drive of reasonable length. On a car driven infrequently that may take longer than you expect.",
      },
      {
        title: "Inspect visible hoses and the canister area",
        detail:
          "Look for cracked, hardened or disconnected lines, particularly on a car that has been stored. Rubber ages with time rather than mileage.",
      },
      {
        title: "Smoke-test the sealed system",
        detail:
          "This is the step that actually finds a pinhole. Cover the tank, hoses, valves, canister and filler neck rather than stopping at the first plausible suspect.",
      },
      {
        title: "Verify the purge and vent valves seal",
        detail:
          "A valve that does not close fully leaks continuously, and it can also cause a rough idle. Test them for a proper closed seal as part of the same session.",
      },
      {
        title: "Check the filler neck sealing surface",
        detail:
          "Corrosion or damage there prevents even a new cap from sealing, and it is easy to miss when the cap has already been blamed.",
      },
      {
        title: "Consider the tank pressure sensor last",
        detail:
          "If the system proves sealed under smoke and the code still returns, a sensor reporting implausible pressure becomes the remaining explanation.",
      },
      {
        title: "Complete a full drive cycle to confirm",
        detail:
          "Do not judge the repair by the lamp. Drive it until the EVAP monitor actually runs and reports ready, particularly before an emissions retest.",
      },
    ],
    costs: [
      {
        job: "Fuel cap inspection and reseating",
        parts: "$0",
        shop: "Usually free to check",
        diy: "Trivial",
        note: "Genuinely first, because the threshold is that small",
      },
      {
        job: "Replacement fuel cap",
        parts: "About $15–$40",
        shop: "Parts cost plus a moment",
        diy: "Trivial",
        note: "Use a correct-specification cap rather than a generic one",
      },
      {
        job: "EVAP smoke test",
        parts: "$0",
        shop: "Roughly $75–$150",
        diy: "Needs a smoke machine",
        note: "The most cost-effective step by a distance",
      },
      {
        job: "EVAP hose replacement",
        parts: "Low",
        shop: "Mostly labour to access",
        diy: "Easy to moderate",
        note: "Common on stored and older low-mileage cars",
      },
      {
        job: "Purge or vent valve",
        parts: "Moderate",
        shop: "Access varies by location",
        diy: "Moderate",
        note: "Replace on test evidence, not on suspicion",
      },
      {
        job: "Charcoal canister",
        parts: "Higher",
        shop: "Get a written quote",
        diy: "Moderate to advanced",
        note: "Rarely needed for a very small leak specifically",
      },
    ],
    dontReplace:
      "Do not order a purge valve, vent valve or canister because a forum post named one. P0456 describes a leak the size of a pinhole somewhere in a sealed system that includes the tank, the cap, the neck, several metres of hose, two valves and a canister. A smoke test tells you which of those it is for less than most of those parts cost individually, and it also proves the system sealed afterwards.",
    yearNotes: [
      "P0456 is the smallest leak category the EVAP monitor reports, which is why a cracked or dirty fuel cap seal is a realistic cause rather than a cliché.",
      "The EVAP monitor needs specific conditions to run, including fuel level within a set range and a cold start after a long soak. Infrequently driven cars complete it rarely.",
      "Rubber hoses and seals age with time as well as mileage, so a stored low-mileage Mustang can have harder, more brittle EVAP lines than a higher-mileage daily driver.",
      "P0455 indicates a large leak and P0442 a medium one. The size category changes where it is worth looking first.",
    ],
    faqs: [
      {
        question: "What does P0456 mean on a Ford Mustang?",
        answer:
          "The evaporative emission system was sealed and tested, and a very small leak was detected — roughly pinhole sized. It is an emissions fault rather than a running fault.",
      },
      {
        question: "Can a loose fuel cap really cause it?",
        answer:
          "Yes. The detection threshold is about the size of a pinhole, so a cap that is not fully seated, or has a cracked or dirty seal, leaks exactly that much.",
      },
      {
        question: "Is it safe to drive with P0456?",
        answer:
          "Yes. Nothing about how the engine runs is affected. Repair it before an emissions inspection, but there is no urgency today.",
      },
      {
        question: "How long before the light goes out after fixing it?",
        answer:
          "Several drive cycles, and longer on a car driven infrequently. The monitor needs a cold start after a long soak and a specific fuel range before it will run at all.",
      },
      {
        question: "Why does my stored Mustang set this code?",
        answer:
          "Two reasons. Aged rubber hardens and cracks with time rather than mileage, and a car that rarely completes a full drive cycle rarely runs the test, so faults surface unpredictably.",
      },
      {
        question: "Should I just replace the purge valve?",
        answer:
          "Not on suspicion. The leak could be anywhere in a large sealed system. A smoke test costs less than most of the parts people replace by guesswork.",
      },
      {
        question: "How much does it cost to fix?",
        answer:
          "From nothing for a reseated cap, to roughly $15–$40 for a new one, to a $75–$150 smoke test plus whatever it finds. Most repairs land at the cheap end.",
      },
      {
        question: "What is the difference between P0456 and P0455?",
        answer:
          "Size. P0456 is a very small leak, P0455 a large one. A large leak is more likely to be a missing cap or a disconnected hose you can find by eye.",
      },
    ],
    closing: {
      title: "Proving the system is sealed again",
      paragraphs: [
        "The lamp going out is not the same as the system passing. Confirm the EVAP monitor has actually run and reported ready, which any scan tool showing monitor status will tell you.",
        "That matters most before an emissions retest. Arriving with monitors incomplete fails the test just as surely as a leak does, and on a car driven at weekends it can take a while to get there.",
        "If the code returns after a repair, resist widening the parts list. Smoke-test again instead — a second leak in an aged system is far more likely than the first repair having been wrong.",
      ],
    },
    sources: [fordObd2017, fordObd2024, repairPalPurge, repairPalCanister, fordManuals],
  },

  /* ------------------------------------------------------------------ P1450 */
  {
    slug: "ford/mustang/p1450",
    code: "P1450",
    title: "P1450 Code Ford Mustang: Fuel Tank Vacuum Causes & Fixes",
    description:
      "P1450 on a Ford Mustang. Why the tank cannot vent, the stalling-after-refuel pattern, and how to test the vent side properly.",
    definition: "Unable to Bleed Up Fuel Tank Vacuum",
    severity: "Service soon",
    vehicle: mustangVehicle,
    driveAdvice:
      "Usually safe to drive, but with one caveat. Strong tank vacuum can restrict fuel delivery, and cars with this code sometimes stall or run poorly shortly after refuelling. If that has happened, treat it as more pressing — a stall pulling out of a fuel station is a safety problem rather than an emissions one.",
    quickAnswer:
      "P1450 is a Ford-specific code meaning the PCM could not relieve vacuum in the fuel tank. As fuel is used, air has to enter the tank to replace it, and that air comes through the EVAP vent path via the charcoal canister. If that path is blocked — a stuck vent valve, a crushed or kinked line, a saturated canister — vacuum builds instead of bleeding away. The classic version on a Mustang is a car that runs fine, gets filled up, and then stalls or hesitates shortly afterwards, because the refuelling event changed the pressure balance in a tank that cannot equalise.",
    symptoms: [
      {
        key: "stall-after-fill",
        label: "Stalling or hesitation shortly after refuelling",
        response:
          "The signature pattern. Filling the tank changes its pressure balance, and a tank that cannot vent ends up with vacuum strong enough to fight the fuel pump.",
      },
      {
        key: "whoosh",
        label: "A loud rush of air when you open the fuel cap",
        response:
          "Strong evidence on its own. That sound is stored pressure or vacuum equalising, and it means the vent path is not doing its job in normal running.",
      },
      {
        key: "hard-start-full",
        label: "Hard starting when the tank is full",
        response:
          "Consistent with a venting problem. The fuel system struggles hardest against tank vacuum when the pump has to overcome it from rest.",
      },
      {
        key: "power-loss",
        label: "Power falling away on a long drive",
        response:
          "Vacuum builds as fuel is consumed, so a tank that cannot vent gets progressively harder to draw from over the course of a journey.",
      },
      {
        key: "no-symptom",
        label: "The light with no drivability change",
        response:
          "Common. A partial restriction can fail the test without ever building enough vacuum to affect fuel delivery, which is the better version to have.",
      },
      {
        key: "with-evap",
        label: "Other EVAP codes stored alongside",
        response:
          "Useful. A vent valve code or a leak code alongside this one narrows the search considerably, since the same components serve both functions.",
      },
    ],
    causes: [
      {
        cause: "Vent valve stuck closed",
        evidence:
          "Valve does not open when commanded; vacuum never relieves; other EVAP codes may accompany",
        firstTest:
          "Command the vent valve open and confirm it actually moves and passes air",
      },
      {
        cause: "Blocked, kinked or crushed vent line",
        evidence:
          "Physical damage or a pinched line; restriction found when the vent path is tested for flow",
        firstTest:
          "Trace the vent line from the canister to atmosphere looking for damage and blockage",
      },
      {
        cause: "Saturated or contaminated charcoal canister",
        evidence:
          "History of repeated overfilling at the pump; canister heavy or wet with liquid fuel",
        firstTest:
          "Inspect the canister for liquid fuel contamination, which blocks airflow through it",
      },
      {
        cause: "Obstructed canister vent filter or inlet",
        evidence:
          "Debris or road contamination at the vent inlet; restriction with the valve itself healthy",
        firstTest:
          "Inspect the vent inlet and any filter for debris before condemning components",
      },
      {
        cause: "Fuel tank pressure sensor reporting wrongly",
        evidence:
          "Vent path proven clear and functional, yet the code persists; implausible sensor readings",
        firstTest:
          "Compare the sensor reading against measured tank pressure once venting is proven good",
      },
      {
        cause: "Purge valve stuck open",
        evidence:
          "Continuous vacuum applied to the tank from the running engine; rough idle sometimes present",
        firstTest:
          "Verify the purge valve seals when closed rather than assuming it does",
      },
    ],
    deepDive: [
      {
        heading: "Why a fuel tank has to breathe in",
        paragraphs: [
          "Fuel leaves the tank continuously while the engine runs, and something has to take its place. If nothing did, the tank would gradually pull itself into a vacuum and eventually the pump would be fighting to lift fuel against it.",
          "So the EVAP system provides a controlled path for air to enter, through the charcoal canister and a vent valve. Vapour goes out toward the engine to be burned; fresh air comes in through the same general path when the tank needs to equalise. The vent valve is what the PCM opens and closes to control that.",
          "P1450 is the PCM reporting that it tried to relieve tank vacuum and could not. Something in that inbound path is not letting air through — a valve that will not open, a line that is crushed, a canister that is blocked or saturated, or an inlet full of road debris.",
          "That framing is what makes the code easy to diagnose sensibly. You are testing a path for airflow, in one direction, with a small number of components on it.",
        ],
      },
      {
        heading: "The stall-after-refuelling pattern",
        paragraphs: [
          "The complaint that brings most people to this code is a car that drives normally, gets filled up, and then stalls or hesitates on the way out of the station.",
          "Refuelling changes the pressure balance in the tank abruptly — the incoming fuel displaces vapour, the tank is briefly open, and then the cap goes back on and it seals again. A healthy system settles from that within moments. A system that cannot vent does not, and the fuel pump ends up working against a vacuum it was never designed to overcome.",
          "There is also a habit that makes it worse. Topping up repeatedly after the pump clicks off pushes liquid fuel into the charcoal canister, which is designed for vapour. A canister saturated with liquid fuel does not pass air properly, and that turns an occasional annoyance into a permanent restriction and eventually a replacement part.",
          "If the stalling pattern matches your car, mention it when you book the work. It is one of the more diagnostically useful things an owner can report.",
        ],
      },
      {
        heading: "Testing the vent side specifically",
        bullets: [
          "Command the vent valve open and confirm it physically moves",
          "Check that air actually passes when it is open, not just that it clicks",
          "Trace the vent line for kinks, crush damage and blockage",
          "Inspect the canister for liquid fuel contamination",
          "Check the vent inlet and filter for road debris",
          "Confirm the purge valve seals closed so it is not applying vacuum continuously",
        ],
      },
    ],
    freezeFrame: [
      "Fuel tank pressure at the moment the code set — the central reading for this fault",
      "Fuel level, since venting demand changes with how much fuel is being consumed",
      "Vent and purge valve command state when the PCM attempted to relieve vacuum",
      "Ambient temperature, which affects vapour pressure inside the tank",
      "Engine run time and vehicle speed, showing whether vacuum built gradually",
      "Any companion EVAP codes, which usually name the component directly",
    ],
    steps: [
      {
        title: "Ask when the symptoms occur",
        detail:
          "Stalling shortly after refuelling is the signature pattern and points firmly at venting. No drivability symptom at all suggests a partial restriction instead.",
      },
      {
        title: "Listen at the fuel cap",
        detail:
          "A loud rush of air when the cap is opened is stored pressure or vacuum equalising. It is free evidence that the vent path is not working in normal running.",
      },
      {
        title: "Command the vent valve and watch it",
        detail:
          "Confirm it opens when told and that air actually passes. A valve that clicks but does not flow fails this test just as completely as one that does nothing.",
      },
      {
        title: "Trace the vent line end to end",
        detail:
          "Look for kinks, crush damage and blockage from the canister through to atmosphere. Physical damage is easy to find once you are actually following the line.",
      },
      {
        title: "Inspect the canister for liquid fuel",
        detail:
          "A canister saturated by repeated overfilling at the pump will not pass air. It also usually needs replacing rather than drying out.",
      },
      {
        title: "Check the vent inlet and filter for debris",
        detail:
          "Road contamination at the inlet restricts airflow with every component otherwise healthy — a cheap find that is often overlooked.",
      },
      {
        title: "Verify the purge valve seals when closed",
        detail:
          "A purge valve stuck open applies engine vacuum to the tank continuously, which produces the same complaint from the opposite direction.",
      },
      {
        title: "Retest tank pressure after the repair",
        detail:
          "Watch fuel tank pressure over a normal drive and confirm it stays within a sensible range instead of drifting toward vacuum as fuel is used.",
      },
    ],
    costs: [
      {
        job: "Vent path inspection",
        parts: "$0",
        shop: "Part of a diagnostic fee",
        diy: "Easy if you can reach the canister",
        note: "Kinks and debris are found by looking, not by buying",
      },
      {
        job: "Vent valve replacement",
        parts: "Moderate",
        shop: "Access varies by location",
        diy: "Moderate",
        note: "The most common single repair for this code",
      },
      {
        job: "Vent hose or line",
        parts: "Low",
        shop: "Mostly labour",
        diy: "Easy to moderate",
        note: "Crush damage underneath is a realistic cause",
      },
      {
        job: "EVAP smoke and flow testing",
        parts: "$0",
        shop: "Roughly $75–$150",
        diy: "Needs equipment",
        note: "Confirms both sealing and airflow rather than one or the other",
      },
      {
        job: "Charcoal canister",
        parts: "Higher",
        shop: "Get a written quote",
        diy: "Moderate to advanced",
        note: "Needed where repeated overfilling has saturated it with liquid fuel",
      },
      {
        job: "Fuel tank pressure sensor",
        parts: "Moderate",
        shop: "Depends heavily on access",
        diy: "Moderate to advanced",
        note: "Only once the vent path is proven clear and functional",
      },
    ],
    dontReplace:
      "Do not replace the fuel pump because the car stalls after refuelling. That symptom with this code describes a tank that cannot equalise, and the pump is struggling against vacuum rather than failing. And do not stop at the vent valve — a crushed line, a debris-blocked inlet or a canister saturated by overfilling produce the same code for far less money.",
    yearNotes: [
      "P1450 is a Ford-specific code covering the tank venting function rather than a generic EVAP leak, so treat it as an airflow problem rather than a sealing one.",
      "Repeatedly topping up after the pump clicks off pushes liquid fuel into the charcoal canister, which is designed for vapour and blocks when saturated.",
      "Strong tank vacuum can restrict fuel delivery enough to stall the engine, which is why the stalling-after-refuelling pattern is so diagnostically useful.",
      "A purge valve stuck open applies engine vacuum to the tank continuously and can produce the same complaint from the opposite direction.",
    ],
    faqs: [
      {
        question: "What does P1450 mean on a Ford Mustang?",
        answer:
          "The PCM could not relieve vacuum in the fuel tank. Something in the vent path that lets air into the tank is blocked or not opening.",
      },
      {
        question: "Why does my Mustang stall after filling up?",
        answer:
          "Refuelling changes the tank pressure balance abruptly. A tank that cannot vent ends up with vacuum strong enough to fight the fuel pump, and the engine stalls or hesitates.",
      },
      {
        question: "Is P1450 safe to drive with?",
        answer:
          "Usually, but with a caveat. If it has caused stalling, treat it as more pressing — stalling while pulling out of a fuel station is a safety issue rather than an emissions one.",
      },
      {
        question: "Does topping up the tank cause this?",
        answer:
          "It contributes. Adding fuel after the pump clicks off pushes liquid into the charcoal canister, which is built for vapour and blocks airflow once saturated.",
      },
      {
        question: "What is that whoosh when I open the cap?",
        answer:
          "Pressure or vacuum equalising all at once. On a healthy system that is minimal, so a loud rush is real evidence that the tank is not venting normally.",
      },
      {
        question: "Do I need a new fuel pump?",
        answer:
          "Very unlikely for this code. The pump is working against tank vacuum rather than failing. Fix the venting and the fuel delivery complaint usually goes with it.",
      },
      {
        question: "How is P1450 different from P0456?",
        answer:
          "P0456 is a sealing problem — vapour escaping. P1450 is an airflow problem — the tank unable to draw air in. Same system, opposite failure.",
      },
      {
        question: "How much does it cost to fix?",
        answer:
          "Often modest. A blocked inlet or damaged line costs little; a vent valve is moderate; a saturated canister is the expensive end and is usually self-inflicted by overfilling.",
      },
    ],
    closing: {
      title: "Confirming the tank vents properly again",
      paragraphs: [
        "Verification here is straightforward because the fault has a measurable signature. Watch fuel tank pressure over a normal drive and confirm it stays in a sensible range rather than drifting toward vacuum as fuel is used.",
        "Then repeat the free test: open the fuel cap after a decent drive and listen. A brief soft sound is normal; a loud rush means something in the vent path is still restricted.",
        "If the original complaint was stalling after refuelling, the real confirmation is a full tank followed by a normal drive away from the station. That is the condition that produced the fault, so it is the condition that proves the repair.",
      ],
    },
    sources: [fordObd2017, fordObd2024, goPartsP1450, repairPalCanister, fordManuals],
  },

  /* ------------------------------------------------------------------ P1000 */
  {
    slug: "ford/mustang/p1000",
    code: "P1000",
    title: "P1000 Code Ford Mustang: Monitors Not Ready Explained",
    description:
      "P1000 on a Ford Mustang is not a fault. Why tuning, battery disconnects and stored cars trigger it, and how to clear the monitors.",
    definition: "OBD-II Drive Cycle Not Complete",
    severity: "Informational",
    vehicle: mustangVehicle,
    driveAdvice:
      "Drive it normally. P1000 is not a fault code — it records that the onboard monitors have not finished running since the memory was last cleared. It matters only when you need to pass an emissions inspection, because a car with incomplete monitors is rejected regardless of whether anything is wrong with it.",
    quickAnswer:
      "P1000 is Ford's way of saying the self-tests have not all completed yet. Every time the PCM memory is cleared — by a scan tool, a battery disconnect, or a calibration change — the readiness monitors reset and have to run again, and until they do the PCM stores P1000. On a Mustang this appears more than on most cars for a specific reason: these are the cars that get tuned, dyno-tested, have batteries disconnected for storage, and get scanned repeatedly by owners chasing other codes. Every one of those events resets the monitors.",
    symptoms: [
      {
        key: "after-clearing",
        label: "Appeared right after codes were cleared",
        response:
          "Expected, not a problem. Clearing memory resets every readiness monitor, and P1000 stores until they have all run again.",
      },
      {
        key: "after-tune",
        label: "Appeared after a tune, flash or dyno session",
        response:
          "Normal. A calibration change resets the monitors just as clearing codes does. Drive the car through a full cycle before judging anything.",
      },
      {
        key: "battery",
        label: "Appeared after a battery change or disconnect",
        response:
          "Also normal, and common on stored cars where the battery is disconnected or run down over winter. The monitors simply need to run again.",
      },
      {
        key: "emissions-reject",
        label: "Turned away from an emissions test",
        response:
          "This is the only situation where P1000 actually costs you something. Complete the drive cycle so the monitors report ready, then return.",
      },
      {
        key: "wont-clear",
        label: "It will not go away despite plenty of driving",
        response:
          "Now it is worth investigating. Either the driving has not met the specific conditions the monitors need, or another fault is preventing a monitor from completing.",
      },
      {
        key: "other-codes",
        label: "Other codes stored alongside it",
        response:
          "Deal with those. A stored fault can stop the related monitor from ever completing, which keeps P1000 in place indefinitely.",
      },
    ],
    causes: [
      {
        cause: "Codes recently cleared with a scan tool",
        evidence:
          "P1000 present immediately after a diagnostic session",
        firstTest:
          "None needed — drive the car and allow the monitors to run",
      },
      {
        cause: "Battery disconnected or replaced",
        evidence:
          "Recent battery work, or a car brought out of storage on a dead battery",
        firstTest:
          "None needed — the monitors reset and need a full cycle",
      },
      {
        cause: "Calibration change, tune or dyno work",
        evidence:
          "New or updated calibration loaded; monitors reset at the same time",
        firstTest:
          "Complete a full drive cycle before assessing anything else about the car",
      },
      {
        cause: "Driving pattern never meets monitor conditions",
        evidence:
          "Only short trips, weekend use, or a car that sits between drives",
        firstTest:
          "Follow the drive cycle deliberately rather than hoping normal use covers it",
      },
      {
        cause: "Another stored fault blocking a monitor",
        evidence:
          "Other codes present; one monitor consistently reports not ready",
        firstTest:
          "Read monitor status individually to see which one never completes",
      },
      {
        cause: "Fuel level outside the range a monitor requires",
        evidence:
          "EVAP monitor never completes; tank consistently very full or very low",
        firstTest:
          "Keep the tank in the middle of its range and drive the cycle again",
      },
    ],
    deepDive: [
      {
        heading: "What readiness monitors actually are",
        paragraphs: [
          "Modern engine management does not just watch for faults as they happen. It runs deliberate self-tests on individual systems — the catalyst, the EVAP system, the oxygen sensors and their heaters, and others depending on the vehicle.",
          "Each of those tests has entry conditions, because most of them are only valid under particular circumstances. The catalyst monitor needs sustained steady driving. The EVAP monitor needs a cold start after a long soak and a fuel level within a set range. The oxygen sensor monitor needs the engine fully warm and in closed-loop operation.",
          "When those tests have run, the monitor reports ready. When memory is cleared, every one of them resets to not ready, and P1000 records that state until they finish.",
          "So P1000 does not describe anything wrong. It describes something incomplete — which is why the fix is driving rather than repairing.",
        ],
      },
      {
        heading: "Why Mustangs see this more than most cars",
        paragraphs: [
          "This code turns up on Mustang forums out of all proportion to how often it appears on family saloons, and the reasons are all about how these cars are owned rather than how they are built.",
          "Tuning is the big one. Every calibration change resets the monitors, and a car that has been to the dyno two or three times has had them reset two or three times. Owners also scan and clear codes far more often on a modified car, chasing conditions the modifications caused — and each clear starts the count again.",
          "Storage is the second. Cars laid up for winter often have the battery disconnected or on a tender, and a battery that gets disconnected or fully discharged clears the memory. Come spring, the car sets P1000 on its first drive.",
          "And the third is simply how the cars are used. Weekend driving with the tank kept full for storage is close to the opposite of what the EVAP monitor needs, so that monitor in particular can take a surprisingly long time to complete.",
        ],
      },
      {
        heading: "Getting the monitors to complete",
        bullets: [
          "Keep the fuel tank between roughly a quarter and three quarters full",
          "Start cold after the car has sat overnight",
          "Include a period of steady cruising, not only short trips",
          "Include some idling and some varied speeds",
          "Repeat across a few days rather than expecting one drive to do it",
          "Check monitor status with a scan tool rather than guessing",
        ],
      },
    ],
    freezeFrame: [
      "Which individual monitors report ready and which do not — the single most useful reading",
      "Whether other codes are stored, since a fault can block a monitor indefinitely",
      "Fuel level, which gates the EVAP monitor specifically",
      "Engine coolant temperature at start-up, which the cold-start requirement depends on",
      "Drive cycles completed since memory was last cleared",
      "Whether a calibration change was made recently, which resets everything",
    ],
    steps: [
      {
        title: "Confirm nothing else is stored",
        detail:
          "P1000 alone is informational. P1000 alongside other codes means those need repairing first, because an active fault can stop the related monitor completing at all.",
      },
      {
        title: "Read monitor status individually",
        detail:
          "Do not treat readiness as one thing. A scan tool will show each monitor separately, and knowing which one is holding out tells you what conditions to aim for.",
      },
      {
        title: "Establish what reset them",
        detail:
          "A tune, a dyno session, a battery disconnect or a scan-tool clear all do it. Knowing which one applies tells you whether to expect anything unusual.",
      },
      {
        title: "Set the fuel level correctly",
        detail:
          "The EVAP monitor will not run outside a set fuel range. Keeping the tank between roughly a quarter and three quarters is the single easiest thing to get right.",
      },
      {
        title: "Start cold after an overnight soak",
        detail:
          "Several monitors require a genuine cold start. Restarting a warm engine does not satisfy that condition no matter how far you then drive.",
      },
      {
        title: "Drive a varied cycle including steady cruising",
        detail:
          "Mix idling, acceleration and a sustained steady speed. The catalyst monitor in particular needs consistent conditions rather than stop-start traffic.",
      },
      {
        title: "Repeat over several days",
        detail:
          "Monitors complete across multiple cycles rather than in one journey. On a weekend car that means a few weekends rather than a few hours.",
      },
      {
        title: "Recheck before booking an emissions test",
        detail:
          "Verify readiness with a scan tool rather than assuming. Arriving with monitors incomplete fails the test exactly as a real fault would.",
      },
    ],
    costs: [
      {
        job: "Reading monitor readiness status",
        parts: "$0",
        shop: "Often free at a parts store",
        diy: "Easy with a basic scan tool",
        note: "Tells you which monitor is holding out and why",
      },
      {
        job: "Completing the drive cycle",
        parts: "Fuel only",
        shop: "$0",
        diy: "Free — just driving",
        note: "The actual fix in the overwhelming majority of cases",
      },
      {
        job: "Diagnosing a blocked monitor",
        parts: "$0",
        shop: "Standard diagnostic fee",
        diy: "Needs live data",
        note: "Only where one monitor never completes after repeated cycles",
      },
      {
        job: "Repairing a fault that blocks a monitor",
        parts: "Varies",
        shop: "Varies",
        diy: "Varies",
        note: "Cost belongs to that code, not to P1000",
      },
      {
        job: "Battery replacement",
        parts: "Moderate",
        shop: "Modest labour",
        diy: "Easy",
        note: "Only relevant as the cause of the reset, not as a fix",
      },
      {
        job: "Second emissions test after rejection",
        parts: "Retest fee",
        shop: "Varies by jurisdiction",
        diy: "—",
        note: "Avoidable entirely by checking readiness first",
      },
    ],
    dontReplace:
      "Do not buy any part for this code. P1000 is not a fault — it is a status message saying the self-tests have not finished since memory was last cleared. The only thing worth spending on is a scan tool read of monitor status, and that is often free. If a shop quotes you for repairs on the strength of P1000 alone, ask which monitor is incomplete and why.",
    yearNotes: [
      "P1000 is Ford-specific and informational. It records that readiness monitors have not completed since the PCM memory was last cleared.",
      "Any calibration change, including an aftermarket tune or a dyno session, resets the monitors exactly as clearing codes does.",
      "A battery disconnect or a fully discharged battery clears the memory, which is why stored cars set this code on their first drive of the season.",
      "The EVAP monitor requires fuel level within a set range and a cold start after a long soak, which is why it is usually the last to complete.",
    ],
    faqs: [
      {
        question: "What does P1000 mean on a Ford Mustang?",
        answer:
          "That the onboard readiness monitors have not all completed since the PCM memory was last cleared. It is a status message, not a fault.",
      },
      {
        question: "Is P1000 something to worry about?",
        answer:
          "No, unless you need an emissions test. A car with incomplete monitors is rejected regardless of whether anything is actually wrong with it.",
      },
      {
        question: "Does a tune cause P1000?",
        answer:
          "Yes. Any calibration change resets the readiness monitors, so P1000 after a tune or a dyno session is expected rather than a sign of a problem.",
      },
      {
        question: "How do I clear P1000?",
        answer:
          "By driving, not by scanning. Complete a full drive cycle — cold start, mixed speeds, a period of steady cruising — repeated over several days.",
      },
      {
        question: "How long does it take to go away?",
        answer:
          "Anything from a couple of days to a few weeks. On a weekend car it takes longer because the monitors need cycles rather than hours.",
      },
      {
        question: "Why does it keep coming back?",
        answer:
          "Either something keeps clearing the memory — repeated scanning, a tune, a battery disconnect — or a stored fault is preventing one monitor from ever completing.",
      },
      {
        question: "Why does my stored Mustang set it every spring?",
        answer:
          "Because the battery was disconnected or discharged over winter, which clears the memory. The monitors reset and have to run again once you start driving.",
      },
      {
        question: "Which monitor takes longest?",
        answer:
          "Usually EVAP. It needs a cold start after a long soak and fuel level within a specific range, and a car kept full for storage rarely meets that.",
      },
    ],
    closing: {
      title: "Knowing when the car is actually ready",
      paragraphs: [
        "The only meaningful confirmation here is a scan tool showing monitor status, because there is no warning lamp for incomplete readiness on most cars and no feel to it at all.",
        "Read each monitor individually rather than looking for the code to disappear. If most are ready and one is not, you know exactly what conditions to aim for on the next drive instead of guessing.",
        "And if you are heading for an emissions test, check the day before rather than the morning of. On a car driven at weekends, discovering the EVAP monitor is still incomplete gives you time to do something about it.",
      ],
    },
    sources: [fordObd2017, fordObd2024, fordDriveCycle, fordManuals],
  },
];
