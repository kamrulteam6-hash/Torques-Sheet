export type TroubleCodeGuide = {
  slug: string;
  code: string;
  title: string;
  description: string;
  definition: string;
  severity: "Stop soon" | "Diagnose promptly" | "Service soon";
  driveAdvice: string;
  quickAnswer: string;
  symptoms: { key: string; label: string; response: string }[];
  causes: { cause: string; evidence: string; firstTest: string }[];
  freezeFrame: string[];
  steps: { title: string; detail: string }[];
  dontReplace: string;
  yearNotes: string[];
  faqs: { question: string; answer: string }[];
  sources: { label: string; url: string; note: string }[];
};

const fordObd2024 = {
  label: "Ford 2024–2025 gasoline OBD operation summary",
  url: "https://www.fordservicecontent.com/Ford_Content/catalog/motorcraft/OBD_Operation_Summary_to_Gasoline_MY_2024_2025.pdf",
  note: "Ford monitor logic and enabling conditions",
};

const fordObd2017 = {
  label: "Ford 2017 gasoline OBD operation summary",
  url: "https://www.fordservicecontent.com/ford_content/catalog/motorcraft/OBDSM1704.pdf",
  note: "Ford catalyst, fuel, misfire and VCT monitor descriptions",
};

export const troubleCodeGuides: TroubleCodeGuide[] = [
  {
    slug: "ford/f-150/5-0/p0300",
    code: "P0300",
    title: "P0300 Code on a Ford F-150 5.0L: Random Misfire Diagnosis",
    description: "Diagnose a P0300 random or multiple-cylinder misfire on a Ford F-150 5.0L with scan-data clues, generation notes and a test-first workflow.",
    definition: "Random/Multiple Cylinder Misfire Detected",
    severity: "Stop soon",
    driveAdvice: "A flashing check-engine light means active misfire severe enough to threaten the catalytic converters. Reduce load and stop driving as soon as it is safe. A steady light with smooth operation may allow a short, gentle trip for diagnosis, but continuing to tow or accelerate hard can turn a small fault into catalyst damage.",
    quickAnswer: "P0300 means the PCM detected crankshaft-speed changes consistent with misfire across more than one cylinder or without one cylinder dominating. It does not identify a failed coil, plug or injector. Read the cylinder-specific P0301–P0308 counters, freeze-frame data and fuel trims before buying parts.",
    symptoms: [
      { key: "flash", label: "Check-engine light flashes", response: "Treat this as an active catalyst-damaging misfire. Stop heavy acceleration or towing. Inspect for an obvious disconnected coil/injector, then arrange diagnosis without extended driving." },
      { key: "idle", label: "Rough mainly at idle", response: "Look for an intake or PCV air leak, purge flow that should not be present, low-cylinder contribution, or a plug/coil issue that is most apparent at low speed." },
      { key: "load", label: "Breaks up under load", response: "Prioritize ignition reserve, plug condition and gap, fuel pressure and injector delivery. Review which cylinder counters rise during a controlled loaded test." },
      { key: "cold", label: "Only after cold start", response: "Record coolant temperature and misfire counts immediately. Consider moisture, cold-start fueling, injector behavior and mechanical sealing; do not diagnose after the symptom has disappeared." },
    ],
    causes: [
      { cause: "Worn, fouled or incorrectly gapped spark plugs", evidence: "Misfire rises under load; plug shows abnormal deposits, damage or excessive gap", firstTest: "Inspect all plugs and compare cylinders; use the year-specific Motorcraft specification" },
      { cause: "Weak coil or poor coil/connector contact", evidence: "A cylinder counter follows a known-good coil swap", firstTest: "Swap only after identifying an affected cylinder; inspect boot and terminal first" },
      { cause: "Unmetered air or PCV/intake leak", evidence: "Positive fuel trims are strongest at idle and improve at higher airflow", firstTest: "Smoke-test the intake and inspect PCV connections rather than spraying flammable cleaner" },
      { cause: "Fuel delivery or injector imbalance", evidence: "Low rail pressure, injector circuit code, or repeatable contribution imbalance", firstTest: "Compare commanded/actual fuel pressure and perform an appropriate injector test" },
      { cause: "Mechanical or cam-timing problem", evidence: "Low compression/leak-down result, abnormal cam data, noise or correlation codes", firstTest: "Run relative compression, then mechanical compression/leak-down as evidence requires" },
    ],
    freezeFrame: ["Engine rpm and calculated load when P0300 set", "Coolant and intake-air temperature", "Short- and long-term fuel trim for both banks", "Fuel rail pressure commanded versus actual, if the scan tool exposes it", "Mode $06 or Ford misfire counters by cylinder", "Companion codes, especially P0301–P0308, fuel-trim, coil, injector or cam-correlation codes"],
    steps: [
      { title: "Preserve the evidence", detail: "Scan every module, save codes, freeze frame and monitor status before clearing anything. Note whether the lamp flashed and the exact temperature, load and fuel level when the symptom occurred." },
      { title: "Identify the pattern", detail: "Use cylinder misfire counts during idle, a 1,500–2,000 rpm hold and a safe loaded run. One dominant cylinder calls for a cylinder test; both banks or scattered cylinders call for system-level checks." },
      { title: "Inspect before swapping", detail: "Check intake ducting, grounds, vacuum and PCV connections, coil connectors and harness routing. Verify oil and coolant condition. Look for evidence of water or oil in plug wells." },
      { title: "Separate ignition from fuel", detail: "If one cylinder leads, inspect its plug and boot and use a controlled coil swap. If the count stays with the cylinder, move to injector command/delivery and mechanical sealing rather than replacing more coils." },
      { title: "Use fuel trims intelligently", detail: "High positive trim at idle that improves with rpm points toward unmetered air. Similar positive trim under load moves fuel supply or measured-air accuracy higher on the list. Bank-to-bank differences help localize the fault." },
      { title: "Prove the repair", detail: "Clear codes only after recording evidence, repeat the operating condition that produced the fault, and verify that cylinder counters remain stable and relevant monitors can run." },
    ],
    dontReplace: "Do not install eight coils because P0300 contains the word 'misfire.' P0300 is a detection result, not a component verdict. Random replacement can hide the pattern, introduce connector damage and leave an intake leak, fueling fault or mechanical problem untouched.",
    yearNotes: ["2011–2014: first-generation 5.0L Coyote; ignition, PCV and calibration details must be matched to the exact year.", "2015–2017: second-generation 5.0L; do not import 2018+ direct-injection assumptions into these trucks.", "2018–2020: third-generation 5.0L adds port and direct injection, changing fuel-system diagnosis.", "2021 and newer: fourth-generation control strategy and hardware differ again; use VIN-correct service information and current calibration checks."],
    faqs: [
      { question: "Can I drive my F-150 with P0300?", answer: "Do not continue driving with a flashing lamp or severe shaking. A steady lamp and smooth engine may permit a short diagnostic trip, but avoid towing and hard acceleration until the cause is known." },
      { question: "Will new spark plugs fix P0300?", answer: "Only if testing or inspection shows the plugs are the cause. Plugs are common service items, but air leaks, coils, injectors, fuel pressure, wiring and mechanical faults can set the same code." },
      { question: "Why is there no cylinder-specific code?", answer: "The PCM may see misfire spread among cylinders or may not have enough evidence to assign one cylinder. Misfire counters and Mode $06 data can reveal a pattern before another code matures." },
      { question: "Should I clear the code first?", answer: "No. Save freeze frame, pending codes and monitor data first. Clearing erases diagnostic context and resets readiness monitors." },
    ],
    sources: [fordObd2024, fordObd2017],
  },
  {
    slug: "ford/f-150/5-0/p0171",
    code: "P0171",
    title: "P0171 Code on a Ford F-150 5.0L: Bank 1 Too Lean",
    description: "A test-first guide to Ford F-150 5.0L P0171, with bank identification, fuel-trim interpretation, air-leak checks and generation cautions.",
    definition: "System Too Lean (Bank 1)",
    severity: "Diagnose promptly",
    driveAdvice: "P0171 usually allows careful short-distance driving when the engine runs normally, but lean operation can cause hesitation, misfire and excess heat. Stop if the lamp flashes, power drops sharply or the engine knocks. Avoid towing until fuel supply and mixture control are verified.",
    quickAnswer: "P0171 means the PCM has added more fuel than its calibrated limit on Bank 1 while trying to correct a lean indication. On the Ford 5.0L V8, Bank 1 is the passenger-side bank containing cylinder 1. The code can result from extra air, insufficient fuel, biased sensor data or an exhaust leak—not automatically a bad oxygen sensor.",
    symptoms: [
      { key: "idle", label: "Trim highest at idle", response: "A vacuum, PCV, intake-gasket or purge-flow leak moves up the list because a fixed air leak has greater percentage effect at low airflow. Confirm with a smoke test." },
      { key: "load", label: "Trim worsens under load", response: "Check commanded versus actual fuel pressure, fuel volume and measured-air accuracy. A supply shortfall becomes more visible as demand rises." },
      { key: "bank", label: "Only Bank 1 is lean", response: "Focus on passenger-side intake sealing, Bank 1 exhaust leakage before the upstream sensor, injector delivery and wiring. A common MAF error often affects both banks." },
      { key: "both", label: "P0171 and P0174 together", response: "A fault common to both banks—MAF contamination/bias, intake duct leak, PCV/purge leak or fuel supply—becomes more likely than eight separate injector faults." },
    ],
    causes: [
      { cause: "Bank 1 intake, PCV or vacuum leak", evidence: "Bank 1 trim is positive, especially at idle", firstTest: "Smoke-test the sealed intake and inspect hose connections" },
      { cause: "Purge valve flowing when it should be closed", evidence: "Rough idle or trim change when purge line is safely isolated", firstTest: "Command/measure purge or check flow with the valve closed" },
      { cause: "Exhaust leak ahead of Bank 1 upstream sensor", evidence: "Cold tick, soot or false lean indication localized to one bank", firstTest: "Inspect cold and perform a low-pressure smoke test where appropriate" },
      { cause: "Fuel pressure/volume shortfall", evidence: "Both banks trend lean as load rises; actual pressure misses command", firstTest: "Graph pressure during the condition rather than relying only on idle" },
      { cause: "MAF contamination, intake duct leak or biased input", evidence: "Both banks behave similarly and airflow/load data is implausible", firstTest: "Inspect post-MAF ducting and compare scan data with known-good expectations" },
    ],
    freezeFrame: ["Bank 1 and Bank 2 short- and long-term fuel trims", "RPM, load and throttle position", "Coolant temperature and closed-loop status", "Mass-airflow value and barometric pressure", "Commanded and actual fuel pressure where available", "Upstream oxygen/air-fuel sensor behavior and any companion P0174, misfire or purge codes"],
    steps: [
      { title: "Confirm the code and bank", detail: "Save freeze frame and verify whether P0171 is alone, paired with P0174, or accompanied by misfire, purge, airflow or fuel-pressure codes. Bank 1 is the passenger side on this V8." },
      { title: "Compare trims at two airflow points", detail: "With the engine warm in closed loop, record trims at idle and around 2,500 rpm with no load. Improvement with rpm suggests a fixed air leak; worsening with load points more toward fuel delivery or airflow measurement." },
      { title: "Inspect the air path", detail: "Check the filter housing, duct between MAF and throttle, PCV plumbing, brake-booster connection and intake seals. Use smoke; do not introduce a fire hazard with spray around a running engine." },
      { title: "Localize a one-bank fault", detail: "If Bank 2 remains normal, inspect Bank 1 exhaust sealing, intake runners, injector electrical operation and fuel delivery. Compare upstream sensor behavior rather than replacing the sensor because it reports lean." },
      { title: "Verify fuel and purge control", detail: "Graph fuel pressure through the failing condition and test purge flow when commanded closed. Direct-injection-equipped 2018+ engines require year-correct high- and low-side procedures." },
      { title: "Confirm correction", detail: "After repair, reset learned values only when the service procedure calls for it, operate through idle and load ranges, and verify trims remain centered without pending codes." },
    ],
    dontReplace: "Do not replace the Bank 1 oxygen sensor merely because it reports lean. A healthy sensor is often the messenger. Prove sensor bias by comparing response, commanded mixture and bank behavior after air, exhaust and fuel faults are excluded.",
    yearNotes: ["2011–2014 and 2015–2017 trucks use port injection; verify generation-specific PCV and intake arrangements.", "2018–2020 trucks add direct injection alongside port injection, so low- and high-pressure fuel data both matter.", "2021+ trucks use later control strategies; scan PIDs and tests can vary by tool and calibration.", "Aftermarket intakes, oiled filters, catch cans and tuning can alter the diagnostic baseline and should be documented before testing."],
    faqs: [
      { question: "Which side is Bank 1 on the F-150 5.0?", answer: "Bank 1 is the passenger-side cylinder bank because it contains cylinder 1. Confirm orientation from the driver's seat, not while facing the engine." },
      { question: "Does P0171 mean the engine is actually lean?", answer: "It means the PCM reached a correction threshold based on its inputs. Extra air or insufficient fuel can make the mixture lean, while an exhaust leak or biased sensor can make the feedback appear lean." },
      { question: "Can a dirty MAF cause only P0171?", answer: "It can influence fueling, but a common MAF bias often affects both banks. A one-bank code makes a localized leak, exhaust issue or injector imbalance more important to test." },
      { question: "What fuel-trim number is bad?", answer: "There is no universal single cutoff for every operating state. Evaluate short- and long-term trims together, compare banks and observe how they change between idle and load." },
    ],
    sources: [fordObd2024, fordObd2017],
  },
  {
    slug: "ford/f-150/5-0/p0420",
    code: "P0420",
    title: "P0420 Code on a Ford F-150 5.0L: Catalyst Efficiency Diagnosis",
    description: "Diagnose Ford F-150 5.0L P0420 without guessing at a catalytic converter, using monitor prerequisites, bank checks and root-cause testing.",
    definition: "Catalyst System Efficiency Below Threshold (Bank 1)",
    severity: "Service soon",
    driveAdvice: "A steady P0420 by itself often does not require an immediate stop, but it should not be ignored. Stop if the converter glows, power falls, temperature rises or the check-engine lamp flashes. Active misfire or a rich mixture can overheat and destroy a converter quickly.",
    quickAnswer: "P0420 means Ford's catalyst monitor judged Bank 1 oxygen-storage performance below its calibrated threshold. It does not prove the converter is the first failed part. Resolve misfire, fuel-control, oxygen-sensor and exhaust-leak faults before condemning the catalyst.",
    symptoms: [
      { key: "alone", label: "P0420 is the only code", response: "Inspect for leaks and compare upstream/downstream sensor behavior under valid monitor conditions. Converter aging becomes plausible, but still requires confirmation." },
      { key: "misfire", label: "Misfire code also present", response: "Diagnose the misfire first. Unburned fuel can overheat the catalyst, and Ford's catalyst monitor normally requires no active misfire faults before evaluation." },
      { key: "lean", label: "P0171/P0174 also present", response: "Correct the mixture fault before assessing catalyst efficiency. Fuel-control codes can block or distort the catalyst monitor and may reveal the upstream cause." },
      { key: "rattle", label: "Rattle or power loss", response: "Check promptly for a broken or restricted substrate. Avoid hard driving; a restriction can create high exhaust backpressure and heat." },
    ],
    causes: [
      { cause: "Aged or damaged Bank 1 catalytic converter", evidence: "Monitor repeatedly fails after all prerequisites and upstream faults are corrected", firstTest: "Compare sensor response and apply Ford's VIN-correct catalyst test" },
      { cause: "Prior or current misfire/rich operation", evidence: "Misfire history, fuel smell, overheated shell or damaged plug", firstTest: "Resolve combustion fault and assess whether catalyst damage remains" },
      { cause: "Exhaust leak near a sensor or converter", evidence: "Cold tick, soot, damaged flange or oxygen intrusion", firstTest: "Inspect and low-pressure smoke-test the exhaust" },
      { cause: "Biased or slow oxygen sensor / wiring fault", evidence: "Response test fails or signal is implausible independently of catalyst behavior", firstTest: "Verify heater, wiring, response and reference before replacement" },
      { cause: "Oil or coolant consumption contamination", evidence: "Deposits, smoke, falling fluid level or related engine symptoms", firstTest: "Find the consumption source before installing a new converter" },
    ],
    freezeFrame: ["Coolant and intake-air temperature", "Vehicle speed, RPM, load and time since start", "Fuel trims and closed-loop status", "Bank 1 upstream and downstream sensor data", "Misfire counts and pending codes", "Monitor completion history after repairs or battery disconnect"],
    steps: [
      { title: "Save all codes and history", detail: "Record confirmed, pending and permanent codes plus freeze frame. Ask whether misfire, oil consumption, coolant loss or previous catalyst work occurred before P0420 appeared." },
      { title: "Repair enabling faults first", detail: "Ford's catalyst monitor depends on valid oxygen-sensor, fuel, misfire, airflow and VCT operation. A related code is not background noise; it may prevent a valid catalyst judgment." },
      { title: "Inspect Bank 1 exhaust integrity", detail: "On the F-150 5.0L, Bank 1 is passenger side. Check manifolds, fasteners, flanges, sensor bungs and pipe joints for leakage or impact damage." },
      { title: "Evaluate sensors under the right conditions", detail: "A simple idle snapshot is not a complete catalyst test. Warm the vehicle, graph both sensors and follow the year-specific Ford procedure so temperature, load and closed-loop conditions are appropriate." },
      { title: "Check for the cause of catalyst damage", detail: "Review misfire counters, fuel trims, injector behavior and oil/coolant use. Replacing a converter without correcting the damaging condition risks a repeat failure." },
      { title: "Complete the monitor", detail: "After a verified repair, follow a safe drive cycle and confirm catalyst readiness. Permanent codes clear only after the OBD system observes enough passing operation; a scan-tool erase cannot simply remove them." },
    ],
    dontReplace: "Do not replace both catalytic converters or both oxygen sensors from a Bank 1 P0420 alone. The code is bank-specific, and Ford's own monitor logic shows that sensor response, fuel control, misfire and other prerequisites affect the test.",
    yearNotes: ["Converter, sensor and exhaust layouts change across 2011–2014, 2015–2017, 2018–2020 and 2021+ trucks.", "Federal and California emissions packages may use different part numbers and coverage; identify the emissions label before ordering.", "Aftermarket exhaust components, spacers or tuning can change monitor behavior and may violate emissions law.", "Check warranty and applicable emissions coverage before authorizing an expensive converter replacement."],
    faqs: [
      { question: "Does P0420 always mean a bad catalytic converter?", answer: "No. It means the catalyst monitor failed. The converter may be worn, but exhaust leaks, sensor faults, misfire, mixture problems and contamination must be evaluated." },
      { question: "Can I clean the converter to fix P0420?", answer: "Additives cannot repair a melted, broken or chemically depleted substrate. Diagnose the underlying condition rather than relying on a cleaner to establish a repair." },
      { question: "Which side is Bank 1?", answer: "Bank 1 is the passenger side of the 5.0L V8. Use vehicle orientation from the driver's seat." },
      { question: "Why did P0420 return after converter replacement?", answer: "Possible reasons include an unresolved misfire or mixture fault, oil/coolant contamination, an exhaust leak, the wrong converter for the emissions package, or a sensor/wiring issue." },
    ],
    sources: [fordObd2017, fordObd2024],
  },
  {
    slug: "ford/f-150/5-0/p0016",
    code: "P0016",
    title: "P0016 Code on a Ford F-150 5.0L: Cam/Crank Correlation",
    description: "A generation-aware Ford F-150 5.0L P0016 diagnostic guide covering oil, VCT data, sensors, wiring and mechanical timing checks.",
    definition: "Crankshaft Position–Camshaft Position Correlation (Bank 1, Sensor A)",
    severity: "Stop soon",
    driveAdvice: "Limit operation until the cause is known. Stop for abnormal chain noise, difficult starting, stalling, low oil pressure or a flashing lamp. A true mechanical timing error can worsen and cause major engine damage; towing or high-rpm testing is inappropriate before basic checks.",
    quickAnswer: "P0016 means the PCM sees Bank 1 intake-cam position outside its expected relationship to crankshaft position. 'Sensor A' refers to the intake cam on Bank 1; it does not mean the sensor itself is necessarily defective. Oil supply, VCT control, wiring, learned position and mechanical timing all require consideration.",
    symptoms: [
      { key: "noise", label: "Rattle at startup", response: "Stop repeated starts. Verify oil level/pressure and inspect the mechanical timing and VCT system using year-correct procedures before assuming an electrical sensor fault." },
      { key: "after", label: "Appeared after engine work", response: "Recheck connector placement, grounds, phaser/chain timing, trigger-wheel handling and required relearn procedures. The repair history is high-value evidence." },
      { key: "oil", label: "Low/dirty oil or wrong viscosity", response: "Correct the oil level and specification and check pressure. VCT is hydraulically controlled, but do not assume an oil change alone repairs a mechanical timing fault." },
      { key: "codes", label: "Multiple correlation/VCT codes", response: "Look for a common oil-pressure, timing-installation, power/ground or crank-signal issue before replacing several cam sensors." },
    ],
    causes: [
      { cause: "Incorrect mechanical cam timing or timing-component wear", evidence: "Noise, repeatable angle offset, recent timing work or multiple correlation faults", firstTest: "Verify mechanical timing with the correct generation procedure and tools" },
      { cause: "Low, aerated, contaminated or incorrect engine oil", evidence: "Low level/pressure, poor maintenance evidence or VCT response problem", firstTest: "Verify level, viscosity, condition and mechanical oil pressure when indicated" },
      { cause: "Bank 1 intake VCT solenoid/phaser control problem", evidence: "Commanded and actual cam angle disagree; circuit and oil feed checks narrow it", firstTest: "Graph desired/actual angle and test the solenoid circuit and oil path" },
      { cause: "Cam or crank sensor circuit / trigger issue", evidence: "Signal dropout, companion circuit code, harness damage or implausible waveform", firstTest: "Inspect wiring and compare cam/crank waveforms with known-good data" },
      { cause: "Learned-position or calibration issue after repair", evidence: "Code began after component/PCM work with mechanical timing verified", firstTest: "Check Ford service instructions for relearn and current calibration" },
    ],
    freezeFrame: ["Engine speed, load and coolant temperature", "Oil temperature/pressure data if supported", "Desired versus actual Bank 1 intake cam angle", "All VCT, cam-sensor, crank-sensor and oil-pressure companion codes", "Battery voltage during start and while running", "Whether the fault sets during cranking, idle, deceleration or commanded cam movement"],
    steps: [
      { title: "Stop and listen", detail: "Confirm oil level before starting. If there is chain, phaser or low-pressure noise, do not repeatedly run the engine to collect data. Mechanical inspection takes priority." },
      { title: "Map the code correctly", detail: "Bank 1 is passenger side; Sensor A is the intake cam. Record every related P0010–P0025, P0340-series, crank-sensor and oil-pressure code to determine whether this is localized or system-wide." },
      { title: "Verify oil and electrical basics", detail: "Confirm the exact oil viscosity/specification, condition, level, battery voltage, grounds and connector integrity. Inspect for oil intrusion, pin fit and harness damage near recently serviced areas." },
      { title: "Graph commanded versus actual angle", detail: "Use a capable scan tool to compare desired and actual Bank 1 intake-cam positions through a controlled rpm change or bidirectional test. Compare with Bank 2 for context, not as an automatic pass/fail rule." },
      { title: "Separate control from mechanical timing", detail: "Test solenoid command, circuit and oil feed. If the cam remains offset, response is implausible or noise/history supports it, verify mechanical timing and trigger integrity with VIN-correct procedures." },
      { title: "Perform required relearn and verification", detail: "After repair, complete any Ford-specified crank/cam relearn, clear codes, repeat the setting condition and confirm desired/actual angles track without pending faults." },
    ],
    dontReplace: "Do not replace the Bank 1 intake cam sensor solely because the code says 'camshaft position.' P0016 is a relationship test. A new sensor cannot correct a jumped chain, phaser fault, oil-pressure problem, damaged trigger or incorrect timing installation.",
    yearNotes: ["The 5.0L changed substantially across its four F-150 generations; timing drives, phasers, sensors, torque procedures and scan PIDs are not safely interchangeable.", "2018+ dual-injection engines add complexity but P0016 remains a cam/crank relationship fault, not a fuel-injector verdict.", "Recent timing, cylinder-head, oil-pump or engine replacement work changes the diagnostic priority toward installation and relearn checks.", "Use the VIN and emission/calibration information to select Ford Workshop Manual tests; generic timing-mark diagrams are not enough for this repair."],
    faqs: [
      { question: "Is P0016 just a bad cam sensor?", answer: "Usually it cannot be concluded from the code alone. P0016 compares cam and crank relationship, so wiring, trigger wheels, VCT control, oil supply and mechanical timing must be tested." },
      { question: "Which cam is Bank 1 Sensor A?", answer: "On the F-150 5.0L, Bank 1 is passenger side and Sensor A refers to the intake camshaft." },
      { question: "Can an oil change fix P0016?", answer: "Correct oil level and viscosity are essential for VCT operation, but an oil change cannot repair worn or incorrectly installed timing components. Verify the result rather than clearing and hoping." },
      { question: "Can I keep driving with P0016?", answer: "Driving is not recommended until noise, oil pressure and timing integrity are evaluated. Stop immediately for rattle, stalling, hard starting or low oil pressure." },
    ],
    sources: [fordObd2024, fordObd2017],
  },
];

export function troubleCodePath(item: TroubleCodeGuide) {
  return `/trouble-codes/${item.slug}`;
}
