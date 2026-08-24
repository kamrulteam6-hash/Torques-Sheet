import type { IconName } from "../data";

/**
 * Registry for the /tools section. Server-only metadata: the hub page, the
 * header nav, the sitemap and the cross-links between tools all read from here
 * so a new tool is added in exactly one place.
 */

export type ToolEntry = {
  slug: string;
  /** Short name used in navigation and cross-links. */
  name: string;
  /** H1 and <title> subject — matches how people search for it. */
  title: string;
  metaTitle: string;
  description: string;
  /** One line for the hub card. */
  blurb: string;
  icon: IconName;
  /** Grouping on the hub page. */
  family:
    | "tire"
    | "drivetrain"
    | "fitment"
    | "engine"
    | "running-cost"
    | "identity"
    | "performance"
    | "conversion"
    | "fueling"
    | "forced-induction"
    | "brake"
    | "suspension"
    | "fastener";
  /** Slugs of tools worth offering next. */
  related: string[];
};

export const toolPath = (slug: string) => `/tools/${slug}`;

export const tools: ToolEntry[] = [
  {
    slug: "tire-size-calculator",
    name: "Tire Size Calculator",
    title: "Tire Size Calculator",
    metaTitle: "Tire Size Calculator — Diameter, Width & Revs Per Mile",
    description:
      "Enter any tire size and get overall diameter, sidewall height, section width, circumference and revolutions per mile — with the working shown.",
    blurb: "Overall diameter, sidewall, circumference and revs per mile from any metric or flotation size.",
    icon: "diagram",
    family: "tire",
    related: ["tire-size-comparison", "speedometer-error-calculator", "gear-ratio-calculator"],
  },
  {
    slug: "tire-size-comparison",
    name: "Tire Size Comparison",
    title: "Tire Size Comparison Tool",
    metaTitle: "Tire Size Comparison — Side-by-Side Diameter & Speedo Error",
    description:
      "Compare two tire sizes side by side. See the diameter change, clearance gain, speedometer error and whether the swap stays inside the 3% rule.",
    blurb: "Two sizes, scale drawing, diameter delta, clearance change and speedometer error.",
    icon: "timing",
    family: "tire",
    related: ["tire-size-calculator", "speedometer-error-calculator", "wheel-offset-calculator"],
  },
  {
    slug: "speedometer-error-calculator",
    name: "Speedometer Error Calculator",
    title: "Speedometer Error Calculator",
    metaTitle: "Speedometer Error Calculator — Tire Size Speedo & Odometer Drift",
    description:
      "Work out how far your speedometer reads off after a tire size change, what your true speed is, and how much the odometer drifts per 1,000 miles.",
    blurb: "True speed against indicated speed after a tire change, plus odometer drift.",
    icon: "timing",
    family: "drivetrain",
    related: ["tire-size-comparison", "gear-ratio-calculator", "tire-size-calculator"],
  },
  {
    slug: "gear-ratio-calculator",
    name: "Gear Ratio Calculator",
    title: "Gear Ratio Calculator",
    metaTitle: "Gear Ratio Calculator — RPM, Axle Ratio & Tire Size",
    description:
      "Calculate cruising RPM from axle ratio, transmission gear and tire diameter — and find the axle ratio that restores stock RPM after a tire size change.",
    blurb: "Cruising RPM from axle ratio and tire size, plus the regear that restores stock behaviour.",
    icon: "firing",
    family: "drivetrain",
    related: ["speedometer-error-calculator", "tire-size-comparison", "tire-size-calculator"],
  },
  {
    slug: "wheel-offset-calculator",
    name: "Wheel Offset Calculator",
    title: "Wheel Offset Calculator",
    metaTitle: "Wheel Offset Calculator — Offset, Backspacing & Poke",
    description:
      "Compare a new wheel against your current one. See how far it pokes out, how much closer it sits to the strut, and the backspacing that offset works out to.",
    blurb: "How far a new offset pokes out or tucks in, with backspacing conversion.",
    icon: "sequence",
    family: "fitment",
    related: ["wheel-backspacing-calculator", "tire-size-comparison", "tire-size-calculator"],
  },
  {
    slug: "wheel-backspacing-calculator",
    name: "Wheel Backspacing Calculator",
    title: "Wheel Backspacing Calculator",
    metaTitle: "Wheel Backspacing Calculator — Backspacing to Offset Conversion",
    description:
      "Convert between wheel backspacing and offset in both directions, and see what a backspacing change does to inboard clearance and track width.",
    blurb: "Backspacing to offset and back, with the clearance consequence of each change.",
    icon: "sequence",
    family: "fitment",
    related: ["wheel-offset-calculator", "tire-size-comparison", "tire-size-calculator"],
  },
  {
    slug: "engine-displacement-calculator",
    name: "Engine Displacement Calculator",
    title: "Engine Displacement Calculator",
    metaTitle: "Engine Displacement Calculator — Bore, Stroke, CI, cc & Litres",
    description:
      "Calculate engine displacement from bore, stroke and cylinder count in cubic inches, cc and litres, with overbore steps and the bore/stroke ratio.",
    blurb: "Cubic inches, cc and litres from bore and stroke, plus overbore steps.",
    icon: "diagram",
    family: "engine",
    related: ["compression-ratio-calculator", "horsepower-torque-rpm-calculator", "gear-ratio-calculator"],
  },
  {
    slug: "compression-ratio-calculator",
    name: "Compression Ratio Calculator",
    title: "Compression Ratio Calculator",
    metaTitle: "Compression Ratio Calculator — Chamber, Gasket, Deck & Piston",
    description:
      "Work out static compression ratio from bore, stroke, chamber volume, gasket, deck clearance and piston dome or dish — and see what each one contributes.",
    blurb: "Static compression from every volume above the piston, itemised.",
    icon: "valve",
    family: "engine",
    related: ["engine-displacement-calculator", "horsepower-torque-rpm-calculator", "gear-ratio-calculator"],
  },
  {
    slug: "horsepower-torque-rpm-calculator",
    name: "HP, Torque & RPM Calculator",
    title: "Horsepower, Torque and RPM Calculator",
    metaTitle: "Horsepower & Torque Calculator — Solve HP, Torque or RPM",
    description:
      "Solve for horsepower, torque or RPM from the other two. Includes kW, Nm and PS conversions, and why every curve crosses at 5,252 RPM.",
    blurb: "Solve any one of horsepower, torque or RPM from the other two.",
    icon: "firing",
    family: "engine",
    related: ["engine-displacement-calculator", "compression-ratio-calculator", "gear-ratio-calculator"],
  },
  {
    slug: "fuel-cost-calculator",
    name: "MPG & Fuel Cost Calculator",
    title: "MPG and Fuel Cost Calculator",
    metaTitle: "Fuel Cost & MPG Calculator — Cost Per Mile, Trip & Range",
    description:
      "Calculate real MPG from your own fill-up, then cost per mile, trip cost, annual fuel spend and how far a tank will take you. Includes L/100km.",
    blurb: "Real MPG from a fill-up, then cost per mile, trip cost and tank range.",
    icon: "fluid",
    family: "running-cost",
    related: ["tire-size-calculator", "gear-ratio-calculator", "engine-displacement-calculator"],
  },
  {
    slug: "tire-diameter-calculator",
    name: "Tire Diameter Calculator",
    title: "Tire Diameter Calculator",
    metaTitle: "Tire Diameter Calculator — Find Sizes by Overall Height",
    description:
      "Work out a tire's overall diameter, or go the other way: name the height you want and see which real sizes actually reach it on your rim.",
    blurb: "Diameter from a size, and — the useful direction — real sizes that hit a target height.",
    icon: "diagram",
    family: "tire",
    related: ["tire-size-calculator", "tire-circumference-calculator", "tire-size-comparison"],
  },
  {
    slug: "tire-circumference-calculator",
    name: "Tire Circumference Calculator",
    title: "Tire Circumference Calculator",
    metaTitle: "Tire Circumference Calculator — Rolling Distance & Revs Per Mile",
    description:
      "Rolling circumference and revolutions per mile for any tire size — the two figures your speedometer, odometer, ABS and traction control are all calibrated against.",
    blurb: "Rolling distance per revolution and revs per mile, the figures the ECU actually uses.",
    icon: "timing",
    family: "tire",
    related: ["tire-diameter-calculator", "speedometer-error-calculator", "tire-size-calculator"],
  },
  {
    slug: "vin-decoder",
    name: "VIN Decoder",
    title: "VIN Decoder",
    metaTitle: "Free VIN Decoder — Check Digit Validation & NHTSA Lookup",
    description:
      "Decode any 17-character VIN against NHTSA's public database, and validate the check digit in your browser first so a mistyped VIN is caught before anything is sent.",
    blurb: "Check-digit validation in the browser, then a full decode from NHTSA. Nothing logged.",
    icon: "sequence",
    family: "identity",
    related: ["tire-size-calculator", "engine-displacement-calculator", "fuel-cost-calculator"],
  },
  {
    slug: "bolt-pattern-calculator",
    name: "Bolt Pattern Calculator",
    title: "Bolt Pattern Calculator",
    metaTitle: "Bolt Pattern Calculator — PCD, mm to Inch & Compatibility",
    description:
      "Convert a bolt pattern between millimetres and inches, work out PCD from a stud measurement, and see which patterns are genuinely interchangeable rather than merely close.",
    blurb: "PCD in both units, measured from your own wheel, with the close-but-wrong patterns flagged.",
    icon: "sequence",
    family: "fitment",
    related: ["wheel-offset-calculator", "wheel-backspacing-calculator", "tire-size-calculator"],
  },
  {
    slug: "torque-converter",
    name: "Torque Converter",
    title: "Torque Unit Converter",
    metaTitle: "Nm to lb-ft Converter — Torque Units Including kgf·m",
    description:
      "Convert torque between newton-metres, pound-feet, kilogram-force metres and pound-inches, with the tolerance guidance a specification actually needs.",
    blurb: "Nm, lb·ft, kgf·m and lb·in, with a note on how much rounding a spec can take.",
    icon: "torque",
    family: "conversion",
    related: ["horsepower-torque-rpm-calculator", "wheel-torque-calculator", "tire-pressure-converter"],
  },
  {
    slug: "tire-pressure-converter",
    name: "Tire Pressure Converter",
    title: "Tire Pressure Converter",
    metaTitle: "PSI to Bar & kPa Converter — Tire Pressure Units",
    description:
      "Convert tire pressure between psi, bar, kPa, atmospheres and kgf/cm², with the cold-pressure and temperature rules that decide what to actually set.",
    blurb: "psi, bar, kPa and more — plus why the placard figure is a cold pressure.",
    icon: "fluid",
    family: "conversion",
    related: ["tire-size-calculator", "torque-converter", "tire-size-comparison"],
  },
  {
    slug: "rpm-speed-calculator",
    name: "RPM and Speed Calculator",
    title: "Engine RPM and Road Speed Calculator",
    metaTitle: "Engine RPM at Speed Calculator — Speed at RPM & Overall Ratio",
    description:
      "Solve engine RPM from road speed or road speed from RPM, through every transmission gear, with the overall drivetrain ratio shown for each.",
    blurb: "RPM at any speed and speed at any RPM, gear by gear, with overall ratios.",
    icon: "timing",
    family: "drivetrain",
    related: ["gear-ratio-calculator", "wheel-torque-calculator", "tire-size-calculator"],
  },
  {
    slug: "power-to-weight-calculator",
    name: "Power-to-Weight Calculator",
    title: "Power-to-Weight Ratio Calculator",
    metaTitle: "Power-to-Weight Ratio Calculator — hp/ton, lb/hp & W/kg",
    description:
      "Work out power to weight in every unit it gets quoted in, and see what the figure actually predicts about how a vehicle performs.",
    blurb: "hp per ton, pounds per hp, W/kg and kW/tonne, with what each figure implies.",
    icon: "firing",
    family: "performance",
    related: ["quarter-mile-calculator", "horsepower-torque-rpm-calculator", "wheel-torque-calculator"],
  },
  {
    slug: "quarter-mile-calculator",
    name: "Quarter Mile & 0–60 Calculator",
    title: "Quarter Mile and 0–60 MPH Calculator",
    metaTitle: "Quarter Mile Calculator — ET, Trap Speed & 0-60 MPH Estimate",
    description:
      "Estimate quarter-mile elapsed time and trap speed with the Hale formulas, plus a 0–60 figure from the energy method, and see why trap speed is the number to trust.",
    blurb: "ET and trap speed from the drag-strip formulas, plus an honest 0–60 estimate.",
    icon: "firing",
    family: "performance",
    related: ["power-to-weight-calculator", "horsepower-torque-rpm-calculator", "rpm-speed-calculator"],
  },
  {
    slug: "wheel-torque-calculator",
    name: "Wheel Torque Calculator",
    title: "Wheel Torque Calculator",
    metaTitle: "Wheel Torque Calculator — Torque at the Drive Wheels",
    description:
      "Work out torque at the drive wheels through the transmission and final drive, and the tractive force it puts at the contact patch.",
    blurb: "Engine torque multiplied through the drivetrain, and the force it produces.",
    icon: "torque",
    family: "performance",
    related: ["rpm-speed-calculator", "gear-ratio-calculator", "power-to-weight-calculator"],
  },
  {
    slug: "piston-speed-calculator",
    name: "Piston Speed Calculator",
    title: "Mean Piston Speed Calculator",
    metaTitle: "Piston Speed Calculator — Mean Piston Speed & Safe RPM Limit",
    description:
      "Calculate mean piston speed from stroke and RPM, and find the engine speed at which a given stroke reaches each accepted durability threshold.",
    blurb: "Mean piston speed from stroke and RPM — the real limit on a long-stroke engine.",
    icon: "valve",
    family: "engine",
    related: ["engine-displacement-calculator", "compression-ratio-calculator", "horsepower-torque-rpm-calculator"],
  },
  {
    slug: "psi-bar-converter",
    name: "PSI to Bar Converter",
    title: "PSI to Bar Converter",
    metaTitle: "PSI to Bar Converter — Tire and Fastener Pressure",
    description:
      "Convert between psi and bar in either direction, with the tire and small-fastener pressures each unit is normally used for.",
    blurb: "psi and bar, either direction, with common tire pressures already worked out.",
    icon: "fluid",
    family: "conversion",
    related: ["tire-pressure-converter", "psi-kpa-converter", "tire-size-calculator"],
  },
  {
    slug: "psi-kpa-converter",
    name: "PSI to kPa Converter",
    title: "PSI to kPa Converter",
    metaTitle: "PSI to kPa Converter — SI Pressure Conversion",
    description:
      "Convert between psi and kilopascals in either direction — the SI pressure unit used on many import vehicle placards and workshop equipment.",
    blurb: "psi and kPa, either direction, matched against common placard values.",
    icon: "fluid",
    family: "conversion",
    related: ["tire-pressure-converter", "psi-bar-converter", "tire-size-calculator"],
  },
  {
    slug: "mpg-l100km-converter",
    name: "MPG to L/100km Converter",
    title: "MPG to L/100km Converter",
    metaTitle: "MPG to L/100km Converter — Fuel Economy Unit Conversion",
    description:
      "Convert fuel economy between miles per US gallon and litres per 100 kilometres, and see why equal MPG gains are not equal fuel savings.",
    blurb: "MPG and L/100km, either direction, with the inverse-scale trap explained.",
    icon: "fluid",
    family: "conversion",
    related: ["fuel-cost-calculator", "tire-pressure-converter", "torque-converter"],
  },
  {
    slug: "hp-kw-converter",
    name: "HP to kW Converter",
    title: "Horsepower to kW Converter",
    metaTitle: "HP to kW Converter — Horsepower, Kilowatts & PS",
    description:
      "Convert between mechanical horsepower, kilowatts and metric horsepower (PS), the three units engine power gets quoted in worldwide.",
    blurb: "hp, kW and PS together, with the three-way mix-up explained.",
    icon: "firing",
    family: "conversion",
    related: ["horsepower-torque-rpm-calculator", "torque-converter", "power-to-weight-calculator"],
  },
  {
    slug: "final-drive-ratio-calculator",
    name: "Final Drive / Differential Ratio Calculator",
    title: "Final Drive and Differential Ratio Calculator",
    metaTitle: "Final Drive Ratio Calculator — From Ring & Pinion Teeth",
    description:
      "Work out final drive (differential) ratio directly from ring and pinion tooth counts — the physical definition of the number stamped on the axle tag.",
    blurb: "Axle ratio from ring and pinion tooth counts, the way it is actually defined.",
    icon: "sequence",
    family: "drivetrain",
    related: ["gear-ratio-calculator", "regear-calculator", "overall-gear-ratio-calculator"],
  },
  {
    slug: "transmission-gear-ratio-calculator",
    name: "Transmission Gear Ratio Calculator",
    title: "Transmission Gear Ratio Calculator",
    metaTitle: "Transmission Gear Ratio Calculator — From Input & Output RPM",
    description:
      "Measure a single transmission gear's ratio from input and output shaft speed, without pulling the gearbox apart to count teeth.",
    blurb: "One gear's ratio from a lift-test RPM reading, input against output.",
    icon: "sequence",
    family: "drivetrain",
    related: ["overall-gear-ratio-calculator", "final-drive-ratio-calculator", "gear-ratio-calculator"],
  },
  {
    slug: "overall-gear-ratio-calculator",
    name: "Overall Gear Ratio Calculator",
    title: "Overall Gear Ratio Calculator",
    metaTitle: "Overall Gear Ratio Calculator — Transmission × Axle × Transfer Case",
    description:
      "Multiply transmission gear, final drive and an optional transfer case ratio into the single overall ratio that actually relates engine speed to the road.",
    blurb: "The full chain multiplied together, transfer case included.",
    icon: "sequence",
    family: "drivetrain",
    related: ["final-drive-ratio-calculator", "transmission-gear-ratio-calculator", "wheel-torque-calculator"],
  },
  {
    slug: "regear-calculator",
    name: "Regear Calculator",
    title: "Regear Calculator",
    metaTitle: "Regear Calculator — Axle Ratio for a Target Cruising RPM",
    description:
      "Work backwards from a target cruising RPM to the axle ratio that produces it — for a tire size change, a build, or matching a specific highway speed.",
    blurb: "Start from the RPM you want and solve for the ratio that gets you there.",
    icon: "firing",
    family: "drivetrain",
    related: ["gear-ratio-calculator", "final-drive-ratio-calculator", "rpm-speed-calculator"],
  },
  {
    slug: "bore-stroke-calculator",
    name: "Bore & Stroke Calculator",
    title: "Bore and Stroke Calculator",
    metaTitle: "Bore & Stroke Calculator — Solve for Bore, Stroke or Displacement",
    description:
      "Solve for the bore or stroke a target displacement requires, or check what a specific bore and stroke combination actually displaces.",
    blurb: "Work backwards from a target displacement to the bore or stroke it needs.",
    icon: "valve",
    family: "engine",
    related: ["engine-displacement-calculator", "compression-ratio-calculator", "piston-speed-calculator"],
  },
  {
    slug: "cylinder-volume-calculator",
    name: "Cylinder Volume Calculator",
    title: "Cylinder Volume Calculator",
    metaTitle: "Cylinder Volume Calculator — Swept, Clearance & Total Volume",
    description:
      "Work out swept, clearance and total cylinder volume from bore, stroke and static compression ratio — the quick reference version of the full compression ratio breakdown.",
    blurb: "Swept, clearance and total volume per cylinder, from bore, stroke and CR.",
    icon: "diagram",
    family: "engine",
    related: ["compression-ratio-calculator", "engine-displacement-calculator", "bore-stroke-calculator"],
  },
  {
    slug: "volumetric-efficiency-calculator",
    name: "Volumetric Efficiency Calculator",
    title: "Volumetric Efficiency Calculator",
    metaTitle: "Volumetric Efficiency Calculator — VE From Airflow & Displacement",
    description:
      "Calculate volumetric efficiency from measured airflow, displacement and RPM — the figure that describes how well an engine actually fills its cylinders.",
    blurb: "VE from actual airflow against the theoretical 100% figure.",
    icon: "valve",
    family: "engine",
    related: ["engine-displacement-calculator", "air-fuel-lambda-calculator", "boost-pressure-ratio-calculator"],
  },
  {
    slug: "air-fuel-lambda-calculator",
    name: "Air-Fuel Ratio & Lambda Calculator",
    title: "Air-Fuel Ratio and Lambda Calculator",
    metaTitle: "AFR to Lambda Converter — Multi-Fuel Stoichiometric Ratios",
    description:
      "Convert between air-fuel ratio and lambda for gasoline, E85, ethanol, methanol, diesel and more, with each fuel's stoichiometric ratio shown.",
    blurb: "AFR and lambda together, across eight fuels with real stoichiometric figures.",
    icon: "fluid",
    family: "fueling",
    related: ["fuel-injector-calculator", "volumetric-efficiency-calculator", "boost-pressure-ratio-calculator"],
  },
  {
    slug: "fuel-injector-calculator",
    name: "Fuel Injector Size & Duty Cycle Calculator",
    title: "Fuel Injector Size and Duty Cycle Calculator",
    metaTitle: "Fuel Injector Calculator — Size From HP, or Duty Cycle From Injector",
    description:
      "Solve for the injector size a target horsepower needs, or check the duty cycle a specific injector will run at — both directions of the same BSFC-based formula.",
    blurb: "Solve for injector size, or check the duty cycle of injectors you already have.",
    icon: "fluid",
    family: "fueling",
    related: ["fuel-pump-calculator", "air-fuel-lambda-calculator", "horsepower-torque-rpm-calculator"],
  },
  {
    slug: "fuel-pump-calculator",
    name: "Fuel Pump Size Calculator",
    title: "Fuel Pump Size Calculator",
    metaTitle: "Fuel Pump Size Calculator — Required Flow in LPH",
    description:
      "Work out the fuel pump flow rate a target horsepower figure needs, in litres per hour, with a safety margin built in for voltage sag and line loss.",
    blurb: "Required pump flow in LPH from target horsepower and fuel type.",
    icon: "fluid",
    family: "fueling",
    related: ["fuel-injector-calculator", "air-fuel-lambda-calculator", "compression-ratio-calculator"],
  },
  {
    slug: "turbo-boost-calculator",
    name: "Turbo Boost Calculator",
    title: "Turbo Boost Power Potential Calculator",
    metaTitle: "Turbo Boost Calculator — Power Potential From Boost Pressure",
    description:
      "Estimate the power potential of adding boost to a naturally aspirated baseline, using absolute pressure ratio — an honest ceiling estimate, not a prediction.",
    blurb: "A ceiling estimate of boosted power from a NA baseline and boost pressure.",
    icon: "firing",
    family: "forced-induction",
    related: ["boost-pressure-ratio-calculator", "intercooler-efficiency-calculator", "power-to-weight-calculator"],
  },
  {
    slug: "boost-pressure-ratio-calculator",
    name: "Boost Pressure Ratio Calculator",
    title: "Boost Pressure Ratio Calculator",
    metaTitle: "Boost Pressure Ratio Calculator — PR From Boost & Altitude",
    description:
      "Calculate the absolute pressure ratio a given boost level produces, correcting for altitude — the figure a compressor map is actually read against.",
    blurb: "The compressor-map pressure ratio, corrected for altitude.",
    icon: "firing",
    family: "forced-induction",
    related: ["turbo-boost-calculator", "intercooler-efficiency-calculator", "volumetric-efficiency-calculator"],
  },
  {
    slug: "intercooler-efficiency-calculator",
    name: "Intercooler Efficiency Calculator",
    title: "Intercooler Efficiency Calculator",
    metaTitle: "Intercooler Efficiency Calculator — Charge Air Cooler Effectiveness",
    description:
      "Work out intercooler effectiveness from measured inlet and outlet charge temperatures against ambient — the same formula used for any heat exchanger.",
    blurb: "Real intercooler effectiveness from measured temperatures.",
    icon: "fluid",
    family: "forced-induction",
    related: ["boost-pressure-ratio-calculator", "turbo-boost-calculator", "compression-ratio-calculator"],
  },
  {
    slug: "brake-pressure-calculator",
    name: "Brake Pressure Calculator",
    title: "Brake Pressure Calculator",
    metaTitle: "Brake Pressure Calculator — Pedal Force to Rotor Torque",
    description:
      "Follow the full hydraulic chain from pedal force through master cylinder pressure, caliper clamp force and pad friction to torque at the rotor.",
    blurb: "The full chain: pedal force to line pressure to clamp force to torque.",
    icon: "torque",
    family: "brake",
    related: ["brake-bias-calculator", "braking-force-calculator", "brake-rotor-size-calculator"],
  },
  {
    slug: "brake-bias-calculator",
    name: "Brake Bias Calculator",
    title: "Brake Bias Calculator",
    metaTitle: "Brake Bias Calculator — Front/Rear Torque Distribution",
    description:
      "Work out front-to-rear brake bias from each axle's actual torque output, and compare it against a static-weight baseline.",
    blurb: "Front/rear bias from actual torque, against a weight-based baseline.",
    icon: "torque",
    family: "brake",
    related: ["brake-pressure-calculator", "braking-force-calculator", "brake-rotor-size-calculator"],
  },
  {
    slug: "braking-force-calculator",
    name: "Braking Force Calculator",
    title: "Braking Force Calculator",
    metaTitle: "Braking Force Calculator — Force & Deceleration From Target G",
    description:
      "Calculate total braking force from a target deceleration, plus an idealized theoretical-minimum stopping distance — clearly labelled as a ceiling, not a prediction.",
    blurb: "Braking force from target g-force, with an idealized stopping distance.",
    icon: "torque",
    family: "brake",
    related: ["brake-pressure-calculator", "brake-rotor-size-calculator", "brake-bias-calculator"],
  },
  {
    slug: "brake-rotor-size-calculator",
    name: "Brake Rotor Size Calculator",
    title: "Brake Rotor Size Calculator",
    metaTitle: "Brake Rotor Size Calculator — Stop Energy & Sizing Guidance",
    description:
      "Work out the kinetic energy a rotor must dissipate per stop, and see rule-of-thumb rotor diameter guidance by use case, from street to track.",
    blurb: "Kinetic energy per stop, plus sizing guidance by use case.",
    icon: "diagram",
    family: "brake",
    related: ["braking-force-calculator", "brake-pressure-calculator", "brake-bias-calculator"],
  },
  {
    slug: "suspension-spring-rate-calculator",
    name: "Suspension Spring Rate Calculator",
    title: "Suspension Spring Rate Calculator",
    metaTitle: "Spring Rate Calculator — Wheel Rate & Natural Frequency",
    description:
      "Convert spring rate to wheel rate through motion ratio, and to natural frequency through corner weight — solve any one of the three from the others.",
    blurb: "Spring rate, wheel rate and natural frequency, solved either direction.",
    icon: "sequence",
    family: "suspension",
    related: ["ride-height-calculator", "wheel-travel-calculator", "camber-calculator"],
  },
  {
    slug: "ride-height-calculator",
    name: "Ride Height Calculator",
    title: "Ride Height Change Calculator",
    metaTitle: "Ride Height Calculator — Change From Spring Length & Motion Ratio",
    description:
      "Work out how a spring length change translates into a ride height change at the wheel, through the suspension's motion ratio.",
    blurb: "Ride height change from spring length change, via motion ratio.",
    icon: "diagram",
    family: "suspension",
    related: ["suspension-spring-rate-calculator", "wheel-travel-calculator", "camber-calculator"],
  },
  {
    slug: "wheel-travel-calculator",
    name: "Wheel Travel Calculator",
    title: "Wheel Travel Calculator",
    metaTitle: "Wheel Travel Calculator — From Shock Travel & Motion Ratio",
    description:
      "Convert shock (damper) travel into wheel travel through the suspension's motion ratio, or work out the shock travel a target wheel travel needs.",
    blurb: "Wheel travel from shock travel, or the reverse, via motion ratio.",
    icon: "diagram",
    family: "suspension",
    related: ["suspension-spring-rate-calculator", "ride-height-calculator", "regear-calculator"],
  },
  {
    slug: "camber-calculator",
    name: "Camber Calculator",
    title: "Camber Angle Calculator",
    metaTitle: "Camber Calculator — Measure Camber Without a Gauge",
    description:
      "Work out camber angle from a level and a tape measure, using the top-to-bottom offset across a wheel — the same trig a camber gauge automates.",
    blurb: "Camber angle from a measured offset, no gauge required.",
    icon: "sequence",
    family: "suspension",
    related: ["caster-calculator", "toe-angle-calculator", "wheel-offset-calculator"],
  },
  {
    slug: "caster-calculator",
    name: "Caster Calculator",
    title: "Caster Angle Calculator",
    metaTitle: "Caster Calculator — Sweep Method Caster Angle",
    description:
      "Work out caster angle from the sweep method — turning the wheel a set angle each way and reading the camber change — the formula built into caster gauges.",
    blurb: "Caster angle from a two-position sweep measurement.",
    icon: "sequence",
    family: "suspension",
    related: ["camber-calculator", "toe-angle-calculator", "final-drive-ratio-calculator"],
  },
  {
    slug: "toe-angle-calculator",
    name: "Toe Angle Calculator",
    title: "Toe Angle Calculator",
    metaTitle: "Toe Angle Calculator — Convert Toe Inches to Degrees",
    description:
      "Convert a toe-plate distance measurement into toe angle in degrees, or work out the distance a target toe angle implies, using tire diameter.",
    blurb: "Toe distance to angle and back, using tire diameter.",
    icon: "sequence",
    family: "suspension",
    related: ["camber-calculator", "caster-calculator", "tire-size-calculator"],
  },
  {
    slug: "turning-radius-calculator",
    name: "Turning Radius & Turning Circle Calculator",
    title: "Turning Radius and Turning Circle Calculator",
    metaTitle: "Turning Radius Calculator — Wheelbase, Steering Angle & Turning Circle",
    description:
      "Calculate turning radius and turning circle from wheelbase, steering angle and track width, using the same curb-to-curb model manufacturers publish figures from.",
    blurb: "Centreline and curb-to-curb turning radius, plus the full turning circle.",
    icon: "sequence",
    family: "fitment",
    related: ["wheel-fitment-calculator", "tire-size-calculator", "final-drive-ratio-calculator"],
  },
  {
    slug: "tire-revolutions-per-mile-calculator",
    name: "Tire Revolutions Per Mile Calculator",
    title: "Tire Revolutions Per Mile Calculator",
    metaTitle: "Tire Revolutions Per Mile Calculator — Revs From Any Size",
    description:
      "Work out how many times a tire turns per mile from its size, plus the same figure per kilometre — the number your speedometer and odometer are calibrated against.",
    blurb: "Revolutions per mile and per kilometre from any tire size.",
    icon: "timing",
    family: "tire",
    related: ["tire-size-calculator", "speedometer-error-calculator", "gear-ratio-calculator"],
  },
  {
    slug: "tire-load-index-calculator",
    name: "Tire Load Index Calculator",
    title: "Tire Load Index Calculator",
    metaTitle: "Tire Load Index Chart — Decode the Number to lbs & kg",
    description:
      "Decode a tire's load index number into its maximum load capacity in pounds and kilograms, or find the minimum index a target load requires.",
    blurb: "Load index decoded to lbs/kg, or the index a target load needs.",
    icon: "diagram",
    family: "tire",
    related: ["tire-speed-rating-decoder", "tire-size-calculator", "wheel-width-calculator"],
  },
  {
    slug: "tire-speed-rating-decoder",
    name: "Tire Speed Rating Decoder",
    title: "Tire Speed Rating Decoder",
    metaTitle: "Tire Speed Rating Chart — Decode the Letter to MPH & KM/H",
    description:
      "Decode a tire's speed rating letter into its maximum sustained speed in mph and km/h, from L through Y.",
    blurb: "Every speed rating letter decoded to mph and km/h.",
    icon: "timing",
    family: "tire",
    related: ["tire-load-index-calculator", "tire-size-calculator", "speedometer-error-calculator"],
  },
  {
    slug: "tire-dot-date-age-calculator",
    name: "Tire DOT Date & Age Calculator",
    title: "Tire DOT Date and Age Calculator",
    metaTitle: "Tire Age Calculator — Decode the DOT Date Code",
    description:
      "Decode the four-digit DOT date code on a tire's sidewall into its manufacture date, then see its current age against industry replacement guidance.",
    blurb: "DOT code decoded to a manufacture date, plus how old that makes it.",
    icon: "diagram",
    family: "tire",
    related: ["tire-load-index-calculator", "tire-speed-rating-decoder", "tire-size-calculator"],
  },
  {
    slug: "tire-size-converter",
    name: "Tire Size Converter",
    title: "Tire Size Converter",
    metaTitle: "Tire Size Converter — Metric, Flotation & Inches Together",
    description:
      "Convert a tire size between metric (225/65R17), flotation (33x12.50R17) and plain inch measurements, seeing all three notations for the same size at once.",
    blurb: "One size, shown in metric, flotation and inches simultaneously.",
    icon: "diagram",
    family: "tire",
    related: ["tire-size-calculator", "tire-aspect-ratio-calculator", "tire-size-comparison"],
  },
  {
    slug: "tire-aspect-ratio-calculator",
    name: "Tire Aspect Ratio Calculator",
    title: "Tire Aspect Ratio Calculator",
    metaTitle: "Tire Aspect Ratio Calculator — Solve From Sidewall or Width",
    description:
      "Calculate aspect ratio from a measured sidewall height and section width, or work out the sidewall height a given aspect ratio implies.",
    blurb: "Aspect ratio from a real sidewall measurement, or the reverse.",
    icon: "diagram",
    family: "tire",
    related: ["tire-size-calculator", "tire-size-converter", "wheel-width-calculator"],
  },
  {
    slug: "wheel-width-calculator",
    name: "Wheel Width Calculator",
    title: "Wheel Width Calculator",
    metaTitle: "Wheel Width Calculator — Ideal Rim Width for a Tire Size",
    description:
      "Find the recommended rim width range for a given tire section width, following the same TRA/ETRTO convention tire manufacturers publish charts from.",
    blurb: "The approved rim-width band for any tire section width.",
    icon: "sequence",
    family: "fitment",
    related: ["wheel-fitment-calculator", "tire-size-calculator", "wheel-offset-calculator"],
  },
  {
    slug: "wheel-fitment-calculator",
    name: "Wheel Fitment Calculator",
    title: "Wheel Fitment Calculator",
    metaTitle: "Wheel Fitment Calculator — Tire Bulge Plus Wheel Offset",
    description:
      "Combine wheel width and offset with tire section width to find where the tire's actual outer and inner edges sit — the wheel offset calculation plus the tire bulge it leaves out.",
    blurb: "Tire edge position from wheel width, offset and tire section width together.",
    icon: "sequence",
    family: "fitment",
    related: ["wheel-offset-calculator", "fender-clearance-calculator", "suspension-clearance-calculator"],
  },
  {
    slug: "fender-clearance-calculator",
    name: "Fender Clearance Calculator",
    title: "Fender Clearance Calculator",
    metaTitle: "Fender Clearance Calculator — Remaining Clearance After a Size Change",
    description:
      "Work out remaining outer clearance after a tire or wheel change, from a measured baseline and the diameter or width increase involved.",
    blurb: "Remaining fender clearance from a baseline measurement and a size change.",
    icon: "diagram",
    family: "fitment",
    related: ["wheel-fitment-calculator", "tire-size-comparison", "suspension-clearance-calculator"],
  },
  {
    slug: "suspension-clearance-calculator",
    name: "Suspension Clearance Calculator",
    title: "Suspension Clearance Calculator",
    metaTitle: "Suspension Clearance Calculator — Inner Clearance After a Fitment Change",
    description:
      "Work out remaining inner clearance to the strut or control arm after a wheel fitment change, from a measured baseline and the inward movement involved.",
    blurb: "Remaining inner (strut/control arm) clearance after a fitment change.",
    icon: "diagram",
    family: "fitment",
    related: ["wheel-fitment-calculator", "wheel-offset-calculator", "fender-clearance-calculator"],
  },
  {
    slug: "bolt-thread-converter",
    name: "Bolt & Thread Size Converter",
    title: "Bolt and Thread Size Converter",
    metaTitle: "Metric to Imperial Bolt Converter — Size & Thread Reference",
    description:
      "Convert bolt sizes between metric and imperial, with standard coarse and fine thread pitches for each — covers metric-to-imperial, thread size and bolt size conversion together.",
    blurb: "Metric and imperial bolt sizes side by side, with standard thread pitches.",
    icon: "sequence",
    family: "fastener",
    related: ["thread-pitch-calculator", "bolt-torque-calculator", "torque-converter"],
  },
  {
    slug: "thread-pitch-calculator",
    name: "Thread Pitch Calculator",
    title: "Thread Pitch Calculator",
    metaTitle: "Thread Pitch Calculator — mm to TPI, Lead Angle & Pitch Diameter",
    description:
      "Convert thread pitch between millimetres and threads per inch, and work out lead angle and pitch diameter for a given major diameter and pitch.",
    blurb: "Pitch to TPI and back, plus lead angle and pitch diameter.",
    icon: "sequence",
    family: "fastener",
    related: ["bolt-thread-converter", "bolt-torque-calculator", "torque-angle-calculator"],
  },
  {
    slug: "torque-angle-calculator",
    name: "Torque Angle Calculator",
    title: "Torque-to-Angle Calculator",
    metaTitle: "Torque Angle Calculator — Additional Turn Travel for TTY Fasteners",
    description:
      "Work out the additional linear clamp travel a torque-to-yield angle specification produces, from thread pitch and the specified turn angle.",
    blurb: "The clamp travel a torque-to-yield angle spec actually produces.",
    icon: "sequence",
    family: "fastener",
    related: ["bolt-torque-calculator", "thread-pitch-calculator", "torque-converter"],
  },
  {
    slug: "bolt-torque-calculator",
    name: "Bolt Torque Calculator",
    title: "Bolt Torque Calculator",
    metaTitle: "Bolt Torque Calculator — Torque From Grade, Diameter & Friction",
    description:
      "Estimate tightening torque from bolt diameter, thread pitch, grade and friction condition, using the standard T = K x D x P relationship.",
    blurb: "Starting torque from bolt grade, size and friction condition.",
    icon: "torque",
    family: "fastener",
    related: ["torque-angle-calculator", "bolt-thread-converter", "torque-converter"],
  },
];

export const toolBySlug = (slug: string) => tools.find((tool) => tool.slug === slug);

export const FAMILIES: { key: ToolEntry["family"]; title: string; note: string }[] = [
  {
    key: "tire",
    title: "Tire sizing",
    note: "Read a sidewall, measure it, and compare one size against another",
  },
  {
    key: "drivetrain",
    title: "Drivetrain and speed",
    note: "What a size change does to engine speed, indicated speed and mileage",
  },
  {
    key: "fitment",
    title: "Wheel fitment",
    note: "Offset, backspacing, poke and inboard clearance",
  },
  {
    key: "engine",
    title: "Engine building",
    note: "Displacement, compression and the relationship between power and torque",
  },
  {
    key: "running-cost",
    title: "Running costs",
    note: "What the vehicle actually costs to fuel, per mile and per year",
  },
  {
    key: "identity",
    title: "Vehicle identity",
    note: "Reading what a vehicle actually is, from the number stamped on it",
  },
  {
    key: "performance",
    title: "Performance estimates",
    note: "What the numbers predict about acceleration and force at the road",
  },
  {
    key: "conversion",
    title: "Unit conversion",
    note: "Torque and pressure between the units specifications actually use",
  },
  {
    key: "fueling",
    title: "Fueling",
    note: "Air-fuel mixture, injector sizing and fuel delivery",
  },
  {
    key: "forced-induction",
    title: "Forced induction",
    note: "Boost pressure, compressor maps and charge cooling",
  },
  {
    key: "brake",
    title: "Brakes",
    note: "The hydraulic chain from pedal to rotor, bias and stopping force",
  },
  {
    key: "suspension",
    title: "Suspension and alignment",
    note: "Spring rate, travel and the angles a wheel actually sits at",
  },
  {
    key: "fastener",
    title: "Fasteners",
    note: "Thread size, pitch and torque across metric and imperial",
  },
];
