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
  /** Closing verification section. Data-driven so new codes need no page edits. */
  closing?: { title: string; paragraphs: string[] };
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

import { troubleCodeBatch2 } from "./trouble-code-batch-2";

const troubleCodeBatch1: TroubleCodeGuide[] = [
  {
    slug: "ford/f-150/5-0/p0300",
    code: "P0300",
    title: "P0300 Code Ford F150 5.0: Causes, Fixes & Diagnostic Steps",
    description: "What does P0300 mean on Ford F150? Learn causes, DIY fixes, diagnostic steps, repair costs, spark plug replacement, and when to see a mechanic.",
    definition: "Random/Multiple Cylinder Misfire Detected",
    severity: "Stop soon",
    driveAdvice: "A flashing light changes the urgency completely. It means the misfire is active and severe enough to threaten your catalytic converters, so ease off the throttle and stop as soon as you safely can. A steady light with a smooth-running engine may allow a short, gentle trip for diagnosis — but keep towing or accelerating hard and you can turn a cheap fault into a converter bill.",
    quickAnswer: "Your PCM watches crankshaft speed, and it stores P0300 when that speed wobbles the way misfire makes it wobble — across more than one cylinder, or without any single cylinder dominating. Notice what the code does not say: it names no failed coil, plug or injector. Before you buy a single part, read the cylinder-specific P0301–P0308 counters, the freeze-frame data and your fuel trims. Those tell you where to look. P0300 only tells you to look.",
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
    dontReplace: "Do not fit eight coils because the code contains the word 'misfire.' P0300 is a detection result, not a component verdict. Replacing parts at random hides the very pattern you need, risks connector damage, and leaves an intake leak, a fueling fault or a mechanical problem sitting exactly where it was.",
    yearNotes: ["2011–2014: first-generation 5.0L Coyote; ignition, PCV and calibration details must be matched to the exact year.", "2015–2017: second-generation 5.0L; do not import 2018+ direct-injection assumptions into these trucks.", "2018–2020: third-generation 5.0L adds port and direct injection, changing fuel-system diagnosis.", "2021 and newer: fourth-generation control strategy and hardware differ again; use VIN-correct service information and current calibration checks."],
    faqs: [
      { question: "Can I drive my F-150 with P0300?", answer: "Do not continue driving with a flashing check-engine light, severe shaking, raw-fuel smell, overheating or mechanical noise. Those symptoms can indicate an active misfire capable of damaging the catalytic converters or a mechanical fault that may worsen. A steady lamp with a smooth-running engine may permit a short, gentle trip for diagnosis, but avoid towing, high rpm and hard acceleration. Monitor oil pressure and temperature, and stop immediately if the warning begins flashing." },
      { question: "How much does it cost to fix P0300?", answer: "The code has no single repair price because it does not identify a failed part. Diagnosis may cost roughly $120–$250 in many U.S. markets. A complete spark-plug service may land near $300–$500 professionally, while one coil can be roughly $180–$450 installed. Injector, fuel-pressure, timing or internal-engine work can cost substantially more. These are August 2026 planning ranges, not quotes; model year, labor rate, parts and test results determine the actual estimate." },
      { question: "Will P0300 go away on its own?", answer: "The warning lamp may turn off after enough trips without another detected misfire, but that does not prove the cause repaired itself. Moisture, a loose connector or marginal ignition part can produce an intermittent fault that returns under load or in different weather. The code can remain in history or as a permanent code until the monitor passes. Save the original data, inspect the truck and confirm misfire counters remain stable before calling it resolved." },
      { question: "Will new spark plugs fix P0300?", answer: "Only if inspection and testing support worn, fouled, damaged or incorrectly gapped plugs. They are a logical early check when service is overdue or the misfire worsens under load, but P0300 can also come from coils, injectors, air leaks, fuel-pressure problems, wiring, cam timing or poor compression. Read cylinder counters first and preserve the old plugs in cylinder order; their condition can reveal whether the fault is isolated or system-wide." },
      { question: "Why is there no cylinder-specific code?", answer: "The PCM may see the misfire distributed among several cylinders, or the event count may not be consistent enough to assign one cylinder when the code matures. Ford-capable scan data, Mode $06 results and live cylinder counters can expose a leading cylinder before a P0301–P0308 code appears. Test at the same coolant temperature, rpm and load recorded in freeze frame because an idle-only snapshot may miss a load-dependent failure." },
      { question: "Should I clear P0300 before diagnosing it?", answer: "No. First save confirmed, pending and permanent codes, freeze frame, readiness status, fuel trims and available misfire counters. Clearing removes valuable context, resets monitors and may make an intermittent fault harder to reproduce. After the cause is proven and repaired, clear codes if the procedure calls for it, repeat the original operating condition and verify that no pending code or rising misfire count returns." },
    ],
    sources: [fordObd2024, fordObd2017, { label: "Ford F-150 spark plug replacement cost estimate", url: "https://repairpal.com/estimator/ford/f-150/spark-plug-replacement-cost", note: "Current U.S. planning estimate used to frame, not guarantee, repair cost" }, { label: "2026 Ford F-150 5.0L engine specifications", url: "https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?ProcUid=G2424027&Uid=G2424604&buildtype=web&countryCode=USA&div=f&languageCode=en&moidRef=G2421390&userMarket=usa&vFilteringEnabled=False&variantid=10802", note: "Example of Ford year-specific spark-plug specification data" }],
  },
  {
    slug: "ford/f-150/5-0/p0171",
    code: "P0171",
    title: "P0171 Code Ford F150 5.0: Causes, Fixes & Fuel-Trim Diagnosis",
    description: "What does P0171 mean on a Ford F150 5.0? Learn Bank 1 lean causes, fuel-trim tests, DIY leak checks, repair costs, and when to see a mechanic.",
    definition: "System Too Lean (Bank 1)",
    severity: "Diagnose promptly",
    driveAdvice: "You can usually drive a short distance with P0171 if the engine still runs normally, but lean operation brings hesitation, misfire and extra heat with it. Stop if the lamp starts flashing, power drops sharply or you hear knock. Leave the trailer at home until you have verified fuel supply and mixture control.",
    quickAnswer: "P0171 means your PCM ran out of room. It kept adding fuel to correct a lean indication on Bank 1 and finally crossed its calibrated limit. On the Ford 5.0L V8, Bank 1 is the passenger-side bank — the one containing cylinder 1. Extra air, not enough fuel, a biased sensor reading or an exhaust leak can all produce that result, so treat a failing oxygen sensor as one candidate rather than the conclusion.",
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
    dontReplace: "Do not replace the Bank 1 oxygen sensor just because it reports lean. More often than not that sensor is the messenger, and it is reporting accurately. Prove bias before you condemn it: compare its response against commanded mixture and against the other bank, once air, exhaust and fuel faults are out of the picture.",
    yearNotes: ["2011–2014 and 2015–2017 trucks use port injection; verify generation-specific PCV and intake arrangements.", "2018–2020 trucks add direct injection alongside port injection, so low- and high-pressure fuel data both matter.", "2021+ trucks use later control strategies; scan PIDs and tests can vary by tool and calibration.", "Aftermarket intakes, oiled filters, catch cans and tuning can alter the diagnostic baseline and should be documented before testing."],
    faqs: [
      { question: "Which side is Bank 1 on the F-150 5.0?", answer: "Bank 1 is the passenger-side cylinder bank because it contains cylinder 1. Confirm orientation from the driver's seat, not while standing in front of the open hood. That distinction matters when inspecting the intake, exhaust manifold and upstream sensor. A P0171-only condition deserves comparison with Bank 2: a localized Bank 1 leak or injector problem is more plausible when the opposite bank's trims remain normal under the same conditions." },
      { question: "Does P0171 mean the engine is actually lean?", answer: "It means the PCM reached a fuel-correction threshold based on the signals it received. Extra unmetered air or insufficient fuel can create a genuinely lean mixture. An exhaust leak ahead of the upstream sensor can introduce oxygen and make the exhaust appear lean, while a biased sensor or airflow input can distort the calculation. Confirm the physical cause with trims, smoke testing, pressure data and sensor response instead of treating the description as a parts diagnosis." },
      { question: "Can a dirty MAF cause only P0171?", answer: "A contaminated or biased MAF can influence fueling, but because it measures air shared by both banks, a common MAF error often moves both banks in the same direction. A one-bank code makes a localized intake or exhaust leak, injector imbalance or wiring issue more important. Inspect the post-MAF duct and compare data first. If cleaning is justified, use only sensor-specific cleaner and never touch the sensing element; replacement still requires proof." },
      { question: "What fuel-trim number is bad?", answer: "There is no universal single cutoff that diagnoses every F-150 at every altitude, temperature and load. Add short- and long-term behavior conceptually, compare Bank 1 with Bank 2, and watch how the correction changes between warm idle and higher airflow. A large positive correction that improves with rpm suggests a fixed air leak; correction that worsens with load shifts attention toward fuel delivery or measured-air accuracy. Ford's year-specific diagnostic thresholds remain controlling." },
      { question: "Can I drive with P0171?", answer: "A smooth-running truck with a steady lamp may tolerate a short, gentle diagnostic trip, but avoid towing and hard acceleration. Stop if the lamp flashes, the engine hesitates severely, backfires, loses power or begins overheating. Lean operation can promote misfire and excess combustion heat. The safest decision depends on the symptoms and companion codes, not P0171 alone." },
    ],
    sources: [fordObd2024, fordObd2017, { label: "Ford F-150 mass-airflow sensor cost estimate", url: "https://repairpal.com/estimator/ford/f-150/mass-airflow-sensor-replacement-cost", note: "Current U.S. cost reference; diagnosis must precede replacement" }],
  },
  {
    slug: "ford/f-150/5-0/p0420",
    code: "P0420",
    title: "P0420 Code Ford F150 5.0: Causes, Catalyst Tests & Repair Costs",
    description: "What does P0420 mean on a Ford F150 5.0? Learn Bank 1 catalyst causes, oxygen-sensor tests, repair costs, DIY checks, and when to stop driving.",
    definition: "Catalyst System Efficiency Below Threshold (Bank 1)",
    severity: "Service soon",
    driveAdvice: "A steady P0420 on its own rarely means stop right now — but it does not mean ignore it either. Pull over if the converter glows, power falls away, temperatures climb or the lamp begins flashing. An active misfire or a rich mixture can cook a converter in a remarkably short time.",
    quickAnswer: "P0420 means Ford's catalyst monitor ran its test on Bank 1 and found oxygen-storage performance below the calibrated threshold. That is a test result, not a verdict on the converter. Clear the misfire, fuel-control, oxygen-sensor and exhaust-leak faults first — any one of them can fail this test with a healthy catalyst sitting underneath.",
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
    dontReplace: "Do not replace both converters or both oxygen sensors on the strength of a Bank 1 P0420. The code is bank-specific, and Ford's own monitor logic makes clear that sensor response, fuel control, misfire and other prerequisites all feed into whether this test passes.",
    yearNotes: ["Converter, sensor and exhaust layouts change across 2011–2014, 2015–2017, 2018–2020 and 2021+ trucks.", "Federal and California emissions packages may use different part numbers and coverage; identify the emissions label before ordering.", "Aftermarket exhaust components, spacers or tuning can change monitor behavior and may violate emissions law.", "Check warranty and applicable emissions coverage before authorizing an expensive converter replacement."],
    faqs: [
      { question: "Does P0420 always mean a bad catalytic converter?", answer: "No. It means the Bank 1 catalyst-efficiency monitor failed under its enabling conditions. A converter with depleted oxygen-storage capacity is one possibility, but an exhaust leak, sensor or wiring fault, unresolved misfire, rich/lean operation and oil or coolant contamination must be evaluated. Ford's monitor also depends on several other systems being fault-free. A converter becomes a defensible diagnosis only after those prerequisites and the Bank 1 test results are verified." },
      { question: "Can I clean the converter to fix P0420?", answer: "An additive cannot restore precious-metal activity, reattach a broken substrate or repair a melted/restricted converter. Some products may change operating conditions temporarily, but that does not establish a repair. If contamination came from oil burning, coolant entry or rich operation, correct that source first. Then evaluate whether the catalyst monitor passes. Do not pour unapproved chemicals into the intake or exhaust, and do not treat a temporarily extinguished lamp as proof." },
      { question: "Which side is Bank 1 on the F-150 5.0?", answer: "Bank 1 is the passenger side because it contains cylinder 1. Use the truck's orientation from the driver's seat. P0420 concerns the Bank 1 catalyst path; P0430 is the corresponding Bank 2 code. The exhaust layout and number/location of sensors vary by model year and emissions package, so use the underhood emissions label and VIN-correct diagram before ordering a sensor or converter." },
      { question: "Why did P0420 return after converter replacement?", answer: "Possible causes include an unresolved misfire or mixture fault that damaged the replacement, continuing oil/coolant contamination, an exhaust leak, incorrect converter certification or capacity, sensor/wiring trouble, or incomplete diagnosis before installation. Review the original companion codes and fuel-trim history. A replacement part should not be condemned until the monitor prerequisites, exhaust integrity and sensor response are checked again under the correct operating conditions." },
      { question: "How much does P0420 cost to repair?", answer: "Diagnosis and an exhaust leak or sensor repair can cost far less than a converter. RepairPal's August 2026 F-150 average for catalytic-converter replacement is roughly $1,627–$1,693, while year-specific examples vary substantially. Taxes, location, emissions certification, OEM versus compliant aftermarket parts and root-cause repairs change the total. Obtain a VIN-specific written estimate only after testing identifies what failed." },
    ],
    sources: [fordObd2017, fordObd2024, { label: "Ford F-150 catalytic-converter cost estimate", url: "https://repairpal.com/estimator/ford/f-150/catalytic-converter-replacement-cost", note: "Updated August 2026 national and model-year planning figures" }],
  },
  {
    slug: "ford/f-150/5-0/p0016",
    code: "P0016",
    title: "P0016 Code Ford F150 5.0: Cam/Crank Causes, Tests & Repair Costs",
    description: "What does P0016 mean on a Ford F150 5.0? Learn cam/crank correlation causes, VCT tests, oil checks, repair costs, and when to stop driving.",
    definition: "Crankshaft Position–Camshaft Position Correlation (Bank 1, Sensor A)",
    severity: "Stop soon",
    driveAdvice: "Keep driving to a minimum until you know the cause. Stop outright for abnormal chain noise, hard starting, stalling, low oil pressure or a flashing lamp. A genuine mechanical timing error gets worse as you drive on it, and it can take the engine with it — so towing and high-rpm testing have no place before the basic checks are done.",
    quickAnswer: "P0016 means your PCM compared Bank 1 intake-cam position against crankshaft position and did not find the relationship it expected. 'Sensor A' identifies the intake cam on Bank 1 — it points at a location, not at a defective part. Oil supply, VCT control, wiring, the learned position and the mechanical timing itself all sit inside that relationship, and any one of them can break it.",
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
    dontReplace: "Do not replace the Bank 1 intake cam sensor just because the code says 'camshaft position.' P0016 is a relationship test. A new sensor will not correct a jumped chain, a phaser fault, an oil-pressure problem, a damaged trigger wheel or timing that was installed wrong.",
    yearNotes: ["The 5.0L changed substantially across its four F-150 generations; timing drives, phasers, sensors, torque procedures and scan PIDs are not safely interchangeable.", "2018+ dual-injection engines add complexity but P0016 remains a cam/crank relationship fault, not a fuel-injector verdict.", "Recent timing, cylinder-head, oil-pump or engine replacement work changes the diagnostic priority toward installation and relearn checks.", "Use the VIN and emission/calibration information to select Ford Workshop Manual tests; generic timing-mark diagrams are not enough for this repair."],
    faqs: [
      { question: "Is P0016 just a bad cam sensor?", answer: "No conclusion can be made from the code wording alone. P0016 compares the measured relationship between camshaft and crankshaft. Wiring, connector integrity, trigger wheels, VCT command, oil supply, phaser operation, mechanical chain timing and learned position all affect that relationship. A sensor should be replaced only after its circuit or waveform fails a test. A new sensor cannot correct a camshaft that is physically out of time." },
      { question: "Which cam is Bank 1 Sensor A?", answer: "On the F-150 5.0L, Bank 1 is the passenger-side cylinder bank and Sensor A refers to its intake camshaft. That identification does not make the intake cam sensor the automatic cause. Use the VIN-correct connector view because locations and harness routing change across Coyote generations, and compare desired versus actual cam angle before disconnecting components." },
      { question: "Can an oil change fix P0016?", answer: "Correct oil level, viscosity, condition and filter application are essential because Ford's VCT system uses engine oil hydraulically. Correcting a low level or wrong oil may restore control if that was the proven cause. An oil change cannot repair a jumped chain, worn guide, failed phaser, damaged trigger or incorrect timing installation. Save data, correct the oil issue, perform required relearns and verify the relationship rather than clearing and hoping." },
      { question: "Can I keep driving with P0016?", answer: "Driving is not recommended until oil pressure, noise and timing integrity are evaluated. Stop immediately for startup or continuous rattle, stalling, hard starting, a flashing lamp or low oil-pressure warning. If the engine is quiet and the code is intermittent, a professional may perform a controlled diagnostic run, but towing and high-rpm testing are inappropriate until mechanical timing is ruled out." },
      { question: "How much does P0016 cost to fix?", answer: "A connector, oil-service or proven sensor fault may cost a few hundred dollars, while VCT, phaser or timing-drive work can reach several thousand. RepairPal's current F-150 camshaft-replacement average is about $2,226–$3,031, but P0016 does not automatically require a camshaft. Model year, internal damage and the confirmed failure determine the estimate. Pay for correlation diagnosis before authorizing major engine work." },
    ],
    sources: [fordObd2024, fordObd2017, { label: "Ford F-150 camshaft repair cost estimate", url: "https://repairpal.com/estimator/ford/f-150/camshaft-replacement-cost", note: "Current cost context for internal camshaft work—not a P0016 diagnosis" }],
  },
];

export const troubleCodeGuides: TroubleCodeGuide[] = [...troubleCodeBatch1, ...troubleCodeBatch2];

export function troubleCodePath(item: TroubleCodeGuide) {
  return `/trouble-codes/${item.slug}`;
}
