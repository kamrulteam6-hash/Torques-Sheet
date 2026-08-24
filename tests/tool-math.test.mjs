import { displacement, compressionRatio, horsepowerFrom, torqueFrom, fuelFigures, CI_PER_CC } from "../app/tools/engine-math.ts";
import { measure, offsetToBackspacing, backspacingToOffset, engineRpm } from "../app/tools/tire-math.ts";

const ok = (label, actual, expected, tol) => {
  const pass = Math.abs(actual - expected) <= tol;
  console.log(`${pass ? "PASS" : "FAIL"}  ${label.padEnd(46)} got ${Number(actual).toFixed(3).padStart(10)}  expect ~${expected}`);
  if (!pass) process.exitCode = 1;
};

console.log("--- displacement (known engines) ---");
ok("Chevy 350: 4.000 x 3.480 x 8", displacement(4, 3.48, 8).totalCi, 350.0, 0.5);
ok("Ford 302: 4.000 x 3.000 x 8", displacement(4, 3, 8).totalCi, 301.6, 0.5);
ok("Ford 351W: 4.000 x 3.500 x 8", displacement(4, 3.5, 8).totalCi, 351.9, 0.5);
ok("Chevy 383 stroker: 4.030 x 3.750", displacement(4.03, 3.75, 8).totalCi, 382.6, 0.6);
ok("Mopar 440: 4.320 x 3.750 x 8", displacement(4.32, 3.75, 8).totalCi, 439.7, 0.6);
ok("350 ci -> cc", displacement(4, 3.48, 8).totalCc, 5735.5, 10);
ok("Coyote 5.0: 3.630 x 3.650 x 8 (litres)", displacement(3.63, 3.65, 8).totalLitres, 4.95, 0.05);

console.log("\n--- compression ratio ---");
// Textbook SBC: 4.00 bore, 3.48 stroke, 64cc chamber, 4.100 gasket bore,
// 0.041 compressed, 0.025 deck, flat top.
const cr = compressionRatio({ bore: 4, stroke: 3.48, chamberCc: 64, gasketBore: 4.1, gasketThickness: 0.041, deckClearance: 0.025, pistonCc: 0 });
ok("SBC swept volume per cylinder (cc)", cr.sweptCc, 716.9, 1);
ok("gasket volume 4.100 x 0.041 (cc)", cr.gasketCc, 8.88, 0.15);
ok("deck volume 4.000 x 0.025 (cc)", cr.deckCc, 5.15, 0.05);
ok("clearance volume total (cc)", cr.clearanceCc, 78.02, 0.1);
ok("static compression ratio", cr.ratio, 10.19, 0.02);
// Dome should raise it, dish should lower it.
const dome = compressionRatio({ bore: 4, stroke: 3.48, chamberCc: 64, gasketBore: 4.1, gasketThickness: 0.041, deckClearance: 0.025, pistonCc: -12 });
const dish = compressionRatio({ bore: 4, stroke: 3.48, chamberCc: 64, gasketBore: 4.1, gasketThickness: 0.041, deckClearance: 0.025, pistonCc: 12 });
console.log(`${dome.ratio > cr.ratio ? "PASS" : "FAIL"}  dome raises ratio (${cr.ratio.toFixed(2)} -> ${dome.ratio.toFixed(2)})`);
console.log(`${dish.ratio < cr.ratio ? "PASS" : "FAIL"}  dish lowers ratio (${cr.ratio.toFixed(2)} -> ${dish.ratio.toFixed(2)})`);

console.log("\n--- power ---");
ok("400 lb-ft @ 5252 rpm = 400 hp", horsepowerFrom(400, 5252), 400, 0.01);
ok("400 lb-ft @ 5000 rpm", horsepowerFrom(400, 5000), 380.8, 0.2);
ok("500 hp @ 6500 rpm -> torque", torqueFrom(500, 6500), 403.8, 0.2);

console.log("\n--- tire ---");
ok("225/65R17 overall diameter", measure("225/65R17").diameter, 28.52, 0.02);
ok("285/70R17 overall diameter", measure("285/70R17").diameter, 32.71, 0.02);
ok("33x12.50R15 overall diameter", measure("33x12.50R15").diameter, 33.0, 0.01);
ok("225/65R17 revs per mile", measure("225/65R17").revsPerMile, 707, 2);
ok("LT265/70R17 parses same as 265/70R17", measure("LT265/70R17").diameter, measure("265/70R17").diameter, 0.001);

console.log("\n--- wheel fitment ---");
ok("8in wheel, +45mm -> backspacing", offsetToBackspacing(8, 45), 6.27, 0.02);
ok("8in wheel, 4.5in backspacing -> offset", backspacingToOffset(8, 4.5), 0, 0.01);
ok("10in wheel zero offset -> 5.5in backspacing", offsetToBackspacing(10, 0), 5.5, 0.01);

console.log("\n--- gearing ---");
// 70 mph, 3.55 axle, 1:1 gear, 31.61in tire (265/70R17)
ok("70mph 3.55 1:1 on 265/70R17", engineRpm({ mph: 70, axleRatio: 3.55, gearRatio: 1, tireDiameter: measure("265/70R17").diameter }), 2642, 15);

console.log("\n--- fuel ---");
const f = fuelFigures({ miles: 320, gallons: 18, pricePerGallon: 3.45, tankGallons: 23 });
ok("320mi / 18gal MPG", f.mpg, 17.78, 0.02);
ok("L/100km at 17.78 MPG", f.litresPer100Km, 13.23, 0.05);
ok("cost per mile at $3.45", f.costPerMile, 0.1941, 0.001);
ok("tank range 23 gal", f.tankRange, 408.9, 1);
ok("cc per cubic inch constant", CI_PER_CC, 16.387064, 0.000001);

console.log("\n--- reverse lookup + circumference ---");
const { sizesForDiameter, rimWidthRangeFor, STANDARD_WIDTHS } = await import("../app/tools/tire-math.ts");
const m33 = sizesForDiameter({ targetDiameter: 33, rim: 17, tolerancePct: 3 });
console.log(`${m33.length > 0 ? "PASS" : "FAIL"}  reverse lookup 33in on 17in returns ${m33.length} sizes`);
console.log(`${m33[0] && Math.abs(m33[0].diff) < 0.6 ? "PASS" : "FAIL"}  closest is ${m33[0]?.geometry.size.label} at ${m33[0]?.geometry.diameter.toFixed(2)}in`);
const allReal = m33.every((x) => STANDARD_WIDTHS.includes(x.geometry.size.width) && x.geometry.size.aspect % 5 === 0);
console.log(`${allReal ? "PASS" : "FAIL"}  every suggested size uses a manufactured width and aspect`);
const sorted = m33.every((x, i) => i === 0 || Math.abs(m33[i - 1].diff) <= Math.abs(x.diff));
console.log(`${sorted ? "PASS" : "FAIL"}  results ordered by closeness to target`);
const none = sizesForDiameter({ targetDiameter: 40, rim: 22, tolerancePct: 3 });
console.log(`${Array.isArray(none) ? "PASS" : "FAIL"}  impossible target returns an array (${none.length} results) rather than throwing`);
ok("225/65R17 circumference", measure("225/65R17").circumference, 89.59, 0.05);
ok("rim width band for 245 section (ideal)", rimWidthRangeFor(245).ideal, 8.0, 0.3);

console.log("\n--- VIN ---");
const V = await import("../app/tools/vin.ts");
// Known-good VINs whose check digits are documented.
console.log(`${V.computeCheckDigit("1M8GDM9AXKP042788") === "X" ? "PASS" : "FAIL"}  NHTSA reference VIN check digit is X (got ${V.computeCheckDigit("1M8GDM9AXKP042788")})`);
console.log(`${V.checkVin("1M8GDM9AXKP042788").checkDigitValid ? "PASS" : "FAIL"}  reference VIN validates`);
const bad = V.checkVin("1M8GDM9A1KP042788");
console.log(`${!bad.checkDigitValid ? "PASS" : "FAIL"}  altered check digit is rejected`);
const io = V.checkVin("1M8GDM9AXKP04I788");
console.log(`${!io.wellFormed ? "PASS" : "FAIL"}  VIN containing I is rejected`);
console.log(`${V.normaliseVin("1m8-gdm 9axkp042788").length === 17 ? "PASS" : "FAIL"}  normalise strips punctuation and uppercases`);
console.log(`${V.checkVin("1M8GDM9AXKP0427").problems.length > 0 ? "PASS" : "FAIL"}  short VIN reports a problem`);
console.log(`${V.vinRegion("1") === "United States" ? "PASS" : "FAIL"}  region code 1 is United States`);
console.log(`${V.vinRegion("W") === "Germany" ? "PASS" : "FAIL"}  region code W is Germany`);
// Position 10: D = 1983 or 2013; a letter in position 7 means the later cycle.
console.log(`${V.modelYearFromCode("D", "T") === "2013" ? "PASS" : "FAIL"}  year code D with letter in position 7 resolves to 2013 (got ${V.modelYearFromCode("D", "T")})`);
console.log(`${V.modelYearFromCode("D", "5") === "1983" ? "PASS" : "FAIL"}  year code D with digit in position 7 resolves to 1983 (got ${V.modelYearFromCode("D", "5")})`);
console.log(`${V.modelYearFromCode("D").includes("1983") && V.modelYearFromCode("D").includes("2013") ? "PASS" : "FAIL"}  year code D alone is reported as ambiguous`);
console.log(`${V.vinSections("1M8GDM9AXKP042788").length === 6 ? "PASS" : "FAIL"}  a valid VIN splits into six sections`);
console.log(`${V.vinSections("SHORT").length === 0 ? "PASS" : "FAIL"}  a short VIN yields no sections`);

console.log("\n--- performance ---");
const P = await import("../app/tools/perf-math.ts");
// Hale: a 3500 lb car with 300 hp runs a mid-13. Trap around 103 mph.
ok("Hale ET, 3500 lb / 300 hp", P.dragEstimate({ weightLb: 3500, hp: 300, efficiency: 0.5 }).etHale, 13.24, 0.05);
ok("trap speed, 3500 lb / 300 hp", P.dragEstimate({ weightLb: 3500, hp: 300, efficiency: 0.5 }).trapSpeed, 103.0, 0.5);
ok("Fox ET is slower than Hale", P.dragEstimate({ weightLb: 3500, hp: 300, efficiency: 0.5 }).etFox, 14.30, 0.06);
ok("0-60, 3300 lb / 300 hp @ 0.48", P.zeroToSixty({ weightLb: 3300, hp: 300, efficiency: 0.48 }), 4.99, 0.15);
ok("power to weight, hp per ton", P.powerToWeight(3500, 300).hpPerTon, 171.4, 0.2);
ok("power to weight, lb per hp", P.powerToWeight(3500, 300).poundsPerHp, 11.67, 0.02);
// Mean piston speed: 3.48in stroke at 6000 rpm = 3480 ft/min.
ok("piston speed 3.48in @ 6000", P.pistonSpeed(3.48, 6000).feetPerMinute, 3480, 1);
ok("piston speed in m/s", P.pistonSpeed(3.48, 6000).metresPerSecond, 17.68, 0.05);
ok("rpm at 4000 ft/min, 3.48 stroke", P.rpmAtPistonSpeed(3.48, 4000), 6896.6, 1);
// Wheel torque: 400 lb-ft, 3.0 first gear, 3.55 axle, 85% efficient.
const wt = P.wheelTorque({ engineTorque: 400, gearRatio: 3.0, finalDrive: 3.55, tireDiameter: 30 });
ok("overall ratio 3.0 x 3.55", wt.overallRatio, 10.65, 0.001);
ok("wheel torque at 85% efficiency", wt.wheelTorque, 3621, 1);
ok("tractive force on a 30in tire", wt.tractiveForce, 2896.8, 2);

console.log("\n--- unit conversion ---");
ok("1 bar to psi", P.convertPressure(1, "bar", "psi"), 14.5038, 0.001);
ok("35 psi to kPa", P.convertPressure(35, "psi", "kPa"), 241.32, 0.02);
ok("35 psi to bar", P.convertPressure(35, "psi", "bar"), 2.4132, 0.001);
ok("round trip psi->kPa->psi", P.convertPressure(P.convertPressure(32, "psi", "kPa"), "kPa", "psi"), 32, 1e-9);
ok("100 lb-ft to Nm", P.convertTorque(100, "lb·ft", "N·m"), 135.582, 0.01);
ok("100 Nm to lb-ft", P.convertTorque(100, "N·m", "lb·ft"), 73.756, 0.01);
ok("1 lb-ft to lb-in", P.convertTorque(1, "lb·ft", "lb·in"), 12, 0.001);
ok("10 kgf-m to Nm", P.convertTorque(10, "kgf·m", "N·m"), 98.0665, 0.001);

console.log("\n--- bolt pattern ---");
const B = await import("../app/tools/bolt-pattern.ts");
ok("5x114.3 in inches", B.boltPattern(5, 114.3).pcdIn, 4.5, 0.001);
ok("5x127 in inches", B.boltPattern(5, 127).pcdIn, 5.0, 0.001);
ok("5x139.7 in inches", B.boltPattern(5, 139.7).pcdIn, 5.5, 0.001);
ok("adjacent stud chord on 5x114.3", B.chordFor(114.3, 5), 67.17, 0.02);
ok("chord round trip", B.pcdFromChord(B.chordFor(114.3, 5), 5), 114.3, 1e-9);
ok("chord on 4x100 (adjacent)", B.chordFor(100, 4), 70.71, 0.02);
const near = B.nearbyPatterns(5, 114.3);
console.log(`${near[0].interchangeable ? "PASS" : "FAIL"}  5x114.3 matches itself as interchangeable`);
const risky = near.filter((m) => m.deceptivelyClose).map((m) => m.pattern.label);
console.log(`${risky.length > 0 ? "PASS" : "FAIL"}  5x114.3 flags close-but-wrong patterns: ${risky.join(", ")}`);
console.log(`${B.nearbyPatterns(5, 114.3).every((m) => m.pattern.lugs === 5) ? "PASS" : "FAIL"}  never suggests a different lug count`);

console.log("\n--- bore/stroke solve ---");
const E = await import("../app/tools/engine-math.ts");
// Chevy 350 forward: bore 4.00, stroke 3.48, 8cyl -> 349.85 ci. Solve backward for bore.
ok("solve bore for 350ci target, 3.48 stroke, 8cyl", E.boreForDisplacement(350, 3.48, 8), 4.001, 0.002);
ok("solve stroke for 350ci target, 4.00 bore, 8cyl", E.strokeForDisplacement(350, 4.0, 8), 3.482, 0.005);
// Round trip: forward then backward should recover the input.
const fwd350 = E.displacement(4.03, 3.75, 8); // 383 stroker
ok("round trip bore solve (383)", E.boreForDisplacement(fwd350.totalCi, 3.75, 8), 4.03, 0.001);
ok("round trip stroke solve (383)", E.strokeForDisplacement(fwd350.totalCi, 4.03, 8), 3.75, 0.001);

console.log("\n--- mpg <-> l/100km ---");
ok("30 mpg to L/100km", E.mpgToL100km(30), 7.8405, 0.001);
ok("7.84 L/100km to mpg", E.l100kmToMpg(7.8405), 30, 0.01);
ok("mpg/l100km round trip", E.l100kmToMpg(E.mpgToL100km(25)), 25, 1e-6);
ok("mpg constant matches fuelFigures", E.mpgToL100km(17.778), E.fuelFigures({ miles: 320, gallons: 18, pricePerGallon: 3.45, tankGallons: 23 }).litresPer100Km, 0.01);

console.log("\n--- drivetrain ratios ---");
ok("ring/pinion 41/10 teeth -> 4.10 ratio", P.ringPinionRatio(41, 10), 4.1, 0.001);
ok("ring/pinion 41/12 teeth -> 3.42 ratio", P.ringPinionRatio(41, 12), 3.4167, 0.001);
ok("transmission ratio from rpm 3500/1000", P.transmissionRatioFromRpm(3500, 1000), 3.5, 0.001);
ok("overall ratio, no transfer case", P.overallDriveRatio(3.5, 3.55), 12.425, 0.001);
ok("overall ratio, 2.72 low-range transfer case", P.overallDriveRatio(1.0, 3.55, 2.72), 9.656, 0.001);
// Axle ratio to hit 2500 rpm at 70 mph in a 0.8 overdrive, on a 31.6in tire (265/70R17).
const targetAxle = P.axleRatioForTargetRpm({ targetRpm: 2500, mph: 70, gearRatio: 0.8, tireDiameter: 31.606 });
ok("axle ratio for 2500 rpm @ 70mph, 0.8 OD, 265/70R17", targetAxle, 4.196, 0.01);
// Cross-check against forward engineRpm from tire-math.
const T = await import("../app/tools/tire-math.ts");
const checkRpm = T.engineRpm({ mph: 70, axleRatio: targetAxle, gearRatio: 0.8, tireDiameter: 31.606 });
ok("regear solve round-trips through engineRpm", checkRpm, 2500, 1);

console.log("\n--- fuel/air math ---");
const F = await import("../app/tools/fuel-air-math.ts");
// Cylinder volume: SBC 350, swept per cyl ~89.6cc, at CR 9.84:1 clearance was ~81.1cc earlier test.
ok("cylinder volumes: swept 716.6cc @ CR 10.19 -> clearance", F.cylinderVolumes(716.6, 10.185).clearanceCc, 78.02, 0.5);
ok("cylinder volumes: total = swept + clearance", F.cylinderVolumes(716.6, 10.185).totalCc, 716.6 + 78.02, 0.5);
// VE: 350ci at 6000rpm, 100% VE -> theoretical CFM.
ok("theoretical airflow 350ci @ 6000rpm", F.theoreticalAirflowCfm(350, 6000), 607.6, 0.5);
ok("VE 100% when actual = theoretical", F.volumetricEfficiency(F.theoreticalAirflowCfm(350, 6000), 350, 6000), 100, 0.01);
ok("VE 85%", F.volumetricEfficiency(0.85 * F.theoreticalAirflowCfm(350, 6000), 350, 6000), 85, 0.01);
// AFR/Lambda round trip and known fuel stoich values.
const gas = F.FUELS.find((f) => f.key === "gasoline");
ok("gasoline stoich AFR", gas.stoichAfr, 14.7, 0.01);
ok("lambda 1.0 at stoich AFR", F.afrToLambda(14.7, gas.stoichAfr), 1.0, 0.001);
ok("AFR 12.0 -> lambda", F.afrToLambda(12.0, gas.stoichAfr), 0.8163, 0.001);
ok("lambda round trip", F.lambdaToAfr(F.afrToLambda(13.2, gas.stoichAfr), gas.stoichAfr), 13.2, 1e-9);
const e85 = F.FUELS.find((f) => f.key === "e85");
ok("E85 lambda 1.0 AFR", F.lambdaToAfr(1.0, e85.stoichAfr), 9.8, 0.01);
// Injector conversion, verified constant 10.5.
ok("550cc/min to lb/hr", F.ccMinToLbHr(550), 52.38, 0.05);
ok("52.38 lb/hr to cc/min", F.lbHrToCcMin(52.38), 550, 1);
ok("flow at higher pressure (2bar->3bar, sqrt law)", F.flowAtPressure(100, 2, 3), 122.47, 0.05);
// Injector sizing: 400hp, BSFC 0.55, 8cyl, 80% max duty -> lb/hr per injector.
const reqFlow = F.requiredInjectorFlow({ targetHp: 400, bsfc: 0.55, cylinders: 8, maxDutyCycle: 0.8 });
ok("required injector flow, 400hp/8cyl/0.55 bsfc/80% duty", reqFlow, 34.375, 0.01);
// Duty cycle round-trips against the sizing formula.
ok("duty cycle at exactly-sized injector = target duty", F.injectorDutyCycle({ targetHp: 400, bsfc: 0.55, cylinders: 8, injectorLbHr: reqFlow }), 0.8, 0.001);
// Pump sizing sanity: bigger HP needs proportionally more flow.
const pump300 = F.requiredPumpFlowLph({ targetHp: 300, bsfc: 0.5 });
const pump600 = F.requiredPumpFlowLph({ targetHp: 600, bsfc: 0.5 });
ok("pump flow scales linearly with HP", pump600 / pump300, 2.0, 0.001);

console.log("\n--- forced induction ---");
ok("sea level atmospheric pressure", F.atmosphericPressureAtAltitude(0), 14.696, 0.01);
ok("atmospheric pressure at 5000ft (Denver-ish)", F.atmosphericPressureAtAltitude(5000), 12.23, 0.1);
const pr = F.boostPressureRatio({ boostPsi: 15, altitudeFt: 0 });
ok("PR at sea level, 15psi boost", pr.pressureRatio, 2.021, 0.01);
const prAlt = F.boostPressureRatio({ boostPsi: 15, altitudeFt: 5000 });
console.log(`${prAlt.pressureRatio > pr.pressureRatio ? "PASS" : "FAIL"}  higher altitude increases PR for same boost psi (${pr.pressureRatio.toFixed(3)} -> ${prAlt.pressureRatio.toFixed(3)})`);
ok("boosted power estimate, 300hp NA at PR 2.0", F.boostedPowerEstimate(300, 2.0), 600, 0.01);
ok("intercooler efficiency 70%", F.intercoolerEfficiency({ hotInF: 250, hotOutF: 130, ambientF: 80 }), 70.588, 0.01);

console.log("\n--- brake math ---");
const Bk = await import("../app/tools/brake-math.ts");
ok("piston area, 1.75in bore", Bk.pistonArea(1.75), 2.4053, 0.001);
// Full chain: 80lb pedal, 4:1 ratio, 0.875in MC, 2x1.75in caliper pistons (2 areas), 0.4 pad mu, 5.5in effective radius.
const chain = Bk.brakePressureChain({
  pedalForceLb: 80,
  pedalRatio: 4,
  masterCylinderBoreIn: 0.875,
  caliperPistonAreaIn2: Bk.pistonArea(1.75) * 2,
  padFriction: 0.4,
  effectiveRadiusIn: 5.5,
});
ok("pushrod force", chain.pushrodForceLb, 320, 0.01);
ok("line pressure", chain.linePsi, 532.4, 0.5);
ok("clamp force", chain.clampForceLb, 2561.9, 2);
ok("friction force (both pad faces)", chain.frictionForceLb, 2049.5, 2);
ok("torque", chain.torqueLbFt, 939.4, 1);
// Bias
const bias = Bk.brakeBias(700, 300);
ok("brake bias front %", bias.frontPct, 70, 0.01);
ok("static bias from weight", Bk.staticBiasFromWeight(2100, 1400), 60, 0.01);
// Braking force / idealized stopping distance: 3500lb car, 1.0g, 60mph.
const bf = Bk.brakingForceFromDecel({ weightLb: 3500, decelG: 1.0, speedMph: 60 });
ok("braking force at 1.0g", bf.totalForceLb, 3500, 0.01);
ok("idealized stopping distance, 60mph @ 1.0g", bf.stoppingDistanceFt, 120.35, 0.1);
// Stop energy: 3500lb from 60mph.
const energy = Bk.stopEnergy({ weightLb: 3500, speedMph: 60 });
ok("kinetic energy, 3500lb @ 60mph (BTU)", energy.kineticEnergyBtu, 541.3, 0.5);

console.log("\n--- suspension math ---");
const S = await import("../app/tools/suspension-math.ts");
// Wheel rate scales with motion ratio squared: 400lb/in spring, 0.7 motion ratio.
const spr = S.springRateResult(400, 0.7, 850);
ok("wheel rate = spring rate x MR^2", spr.wheelRate, 196, 0.01);
ok("natural frequency, 196lb/in wheel rate, 850lb corner", spr.naturalFrequencyHz, 1.503, 0.01);
// Round trip: spring rate for a target wheel rate.
ok("spring rate for wheel rate round trip", S.springRateForWheelRate(196, 0.7), 400, 0.01);
// Round trip: spring rate for target frequency.
ok("spring rate for frequency round trip", S.springRateForFrequency(1.503, 850, 0.7), 400, 0.5);
// Ride height / wheel travel via motion ratio, inverse of each other's direction.
ok("ride height change from spring change", S.rideHeightChange(1.0, 0.7), 1.4286, 0.001);
ok("spring change for ride height round trip", S.springChangeForRideHeight(1.4286, 0.7), 1.0, 0.001);
ok("wheel travel from shock travel", S.wheelTravelFromShockTravel(3.0, 0.6), 5.0, 0.001);
ok("shock travel for wheel travel round trip", S.shockTravelForWheelTravel(5.0, 0.6), 3.0, 0.001);
// Camber: a 20in wheel with a 1in offset top-to-bottom over an 18in span.
ok("camber from offset", S.camberFromOffset(1.0, 18), 3.1758, 0.01);
ok("offset from camber round trip", S.offsetFromCamber(3.1758, 18), 1.0, 0.01);
// Caster sweep: camber changes 4 deg across a 40deg total sweep (20 each way).
ok("caster from sweep", S.casterFromSweep(4, 40), 5.807, 0.05);
// Toe: 0.25in difference over a 24in tire diameter.
ok("toe angle from distance", S.toeAngleFromDistance(0.25, 24), 0.5968, 0.01);
ok("toe distance from angle round trip", S.toeDistanceFromAngle(0.5968, 24), 0.25, 0.001);
