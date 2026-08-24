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
