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
