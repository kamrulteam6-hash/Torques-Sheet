/**
 * Hand-written FAQs for pages in general-vehicle-content.ts.
 *
 * The generated block asked the same three questions on every page and answered
 * them by repeating `answer`, `scope` and `detail` — text already rendered in
 * the intro and body. These replace it with questions specific to the vehicle,
 * answered from that record's own published figures. Records without an entry
 * here keep the generated block and do not emit FAQPage markup.
 */
export const generalVehicleFaqs: Record<string, { q: string; a: string }[]> = {
  "chevrolet/traverse/towing-capacity": [
    {
      q: "How much can a 2024 Chevy Traverse tow?",
      a: "Up to 5,000 lb (2,268 kg) when properly equipped. That is the model's ceiling under Chevrolet's trailering conditions, not a rating every 2024 Traverse carries in every loading condition.",
    },
    {
      q: "Does the 2024 Traverse tow more than the earlier V6 generation?",
      a: "They are rated under separate equipment tables and should not be compared from memory. The 2024 car was introduced with the 2.5L turbo engine; earlier V6 Traverse model years have their own trailering figures that must be read from their own owner information.",
    },
    {
      q: "Does the Z71 automatically get the 5,000-lb rating?",
      a: "No. Chevrolet identifies trailering equipment as standard on the 2024 Z71, but the trim name does not replace the vehicle's labels and manual. Confirm the hitch and wiring actually installed, trailer-brake requirements, GCWR and the payload remaining on the door label.",
    },
    {
      q: "Why does my usable towing capacity come out below 5,000 lb?",
      a: "Passengers, cargo, accessories and trailer tongue weight all consume the vehicle's payload before the trailer does. The figure available at your vehicle is what remains after those loads, which is why the door-jamb label and GCWR govern rather than the headline number.",
    },
  ],
  "dodge/challenger/horsepower-by-year": [
    {
      q: "How much horsepower does the 2023 Challenger SRT Demon 170 make?",
      a: "1,025 hp at 6,500 rpm on an E85 ethanol blend, with 945 lb-ft of torque at 4,200 rpm. On E10 premium gasoline the same car is rated at 900 hp and 810 lb-ft.",
    },
    {
      q: "Why are two different horsepower figures published for the same car?",
      a: "Output changes automatically with the ethanol content the car detects, so the fuel is part of the specification rather than a footnote. Maximum output becomes available above the specified high-ethanol threshold, and the instrument cluster indicates the detected state.",
    },
    {
      q: "Does the Demon 170 rating apply to a Hellcat, Redeye or 2018 Demon?",
      a: "No. These figures describe only the factory Demon 170 and its ethanol-sensing calibration. The 2018 Demon, Hellcat, Redeye, Super Stock and ordinary Challenger models carry their own ratings even though several share related supercharged 6.2L HEMI architecture.",
    },
    {
      q: "Will running pump gas in a Demon 170 reduce its output?",
      a: "Yes — on E10 premium the factory rating is 900 hp and 810 lb-ft rather than 1,025 hp and 945 lb-ft. The reduction is a designed calibration response to detected ethanol content, not a fault.",
    },
  ],
  "ford/ranger/wheel-torque": [
    {
      q: "What is the wheel nut torque on a 2022 Ford Ranger?",
      a: "100 lb-ft (135 N·m) on the M12 x 1.5 wheel nuts fitted to the 2022 U.S.-market Ranger.",
    },
    {
      q: "Do I need to retighten Ranger wheel nuts after fitting a wheel?",
      a: "Yes. Ford directs owners to retighten the nuts within 100 miles (160 km) of any wheel removal.",
    },
    {
      q: "Does 100 lb-ft apply to a global-market or newer Ranger?",
      a: "Not automatically. This row is tied to the 2022 Ranger and its factory wheel hardware. Global-market Rangers and the redesigned North American generation can specify different values, so model year and market both matter.",
    },
    {
      q: "Why does the hub face need cleaning before torquing?",
      a: "Corrosion and loose particles trapped between the hub pilot and either mounting face stop the wheel seating flat, so the clamp load reached at 100 lb-ft is not the clamp load the joint keeps once the debris crushes or the rust flakes away.",
    },
  ],
  "honda/civic/tire-pressure": [
    {
      q: "What tire pressure does a 2025 Honda Civic Hatchback take?",
      a: "With the factory 235/40R18 tires, 33 psi front and 32 psi rear, measured cold. The Civic Type R on 265/30ZR19 tires uses 35 psi front and 33 psi rear.",
    },
    {
      q: "When is a tire cold enough to measure?",
      a: "After the car has been parked at least three hours, or driven less than one mile. A hot reading can sit 4–6 psi above the cold value.",
    },
    {
      q: "Can I bleed a warm tire down to 33 psi?",
      a: "No. Releasing air from a warm tire to hit the cold target leaves it underinflated once it cools. Set pressures cold, or add the expected warm offset rather than removing air.",
    },
    {
      q: "Do these pressures apply to a Civic Sedan or Si?",
      a: "No. These are the two tire rows in the U.S. 2025 Civic Hatchback manual. Sedan, Si, earlier model years and non-factory tire sizes carry their own placards and must not inherit these numbers.",
    },
    {
      q: "Is anything required after adjusting the pressures?",
      a: "On U.S. models, carry out the TPMS calibration procedure given in the manual. The driver-door label remains the vehicle-specific final check.",
    },
  ],
  "hyundai/santa-fe/oil-capacity": [
    {
      q: "How much oil does a 2024 Hyundai Santa Fe 2.5 turbo take?",
      a: "6.13 US qt (5.8 L) for a drain-and-refill on the U.S.-market 2024 Santa Fe's Smartstream 2.5L turbo engine.",
    },
    {
      q: "Which oil grade does the 2024 Santa Fe 2.5T require?",
      a: "Full-synthetic SAE 0W-30 meeting API SN PLUS/SP or ILSAC GF-6, from the same Hyundai table that lists the capacity.",
    },
    {
      q: "Does 6.13 qt apply to the Santa Fe Hybrid?",
      a: "No. This row is for the redesigned 2024 MX5a Santa Fe 2.5T only. The hybrid's 1.6T, the earlier 2.4L and 2.0T engines, the old 3.3L V6 and other markets' powertrains each have their own quantity.",
    },
    {
      q: "Should I pour in the full 6.13 quarts before checking?",
      a: "No. Add most of the quantity, circulate the oil, check for leaks, then wait for drain-back on level ground and finish at the dipstick's full mark. The amount actually recovered during draining varies, so the published figure is a service reference rather than a measured fill.",
    },
  ],
  "jeep/grand-cherokee/towing-capacity": [
    {
      q: "How much can a 2022 Jeep Grand Cherokee 4xe tow?",
      a: "6,000 lb (2,722 kg) maximum gross trailer weight, with a maximum trailer tongue weight of 600 lb (272 kg), on the 2022 two-row 4xe with AWD.",
    },
    {
      q: "What GCWR and frontal-area limits come with that rating?",
      a: "The same factory chart lists a 12,125-lb (5,568 kg) GCWR and a 40-sq-ft (3.72 m²) maximum trailer frontal area. A tall or boxy trailer can exceed the frontal-area limit while still sitting under 6,000 lb.",
    },
    {
      q: "Does this figure cover a Grand Cherokee L or a 3.6L model?",
      a: "No. This row applies to the 2022 WL two-row Grand Cherokee 4xe with the 2.0L plug-in-hybrid powertrain and AWD. The Grand Cherokee L, the 3.6L and 5.7L models and earlier WK2 vehicles are rated separately.",
    },
    {
      q: "Does the 6,000-lb rating leave room for passengers and gear?",
      a: "Not by itself. It is a ceiling, not a payload allowance — tongue weight, occupants, charging equipment, accessories and cargo must still fit within the door-label payload and the axle ratings. Use the lower of the vehicle, hitch and trailer limits.",
    },
  ],
  "nissan/altima/transmission-fluid-capacity": [
    {
      q: "What is the CVT fluid capacity of a 2024 Nissan Altima?",
      a: "Nissan publishes no universal quart figure for it — the owner-manual capacity table carries dashes rather than a number. The transmission is specified by fluid type and filled by the factory service-level procedure instead.",
    },
    {
      q: "Which fluid does the 2024 Altima CVT require?",
      a: "Genuine Nissan CVT Fluid NS-3, or a fluid carrying an equivalency statement to that requirement. NS-2, ordinary ATF and generic multi-vehicle fluids are not substitutes, and products without the NS-3 equivalency statement should not be mixed in.",
    },
    {
      q: "Why is no capacity published?",
      a: "The omission is meaningful rather than an oversight. A pan drain removes only part of the system volume, while a dry transmission, a cooler-line repair and a component replacement each retain different amounts, so a single number would be wrong in most of those cases.",
    },
    {
      q: "Can I just refill the amount I drained out?",
      a: "Use it only as a planning reference for how much fluid to have on hand. Final level must be set by the factory temperature-dependent procedure with the correct equipment — counting bottles is not a level check.",
    },
  ],
  "nissan/maxima/oil-capacity": [
    {
      q: "How much oil does a 2023 Nissan Maxima take?",
      a: "About 5.125 US qt (4.8 L) with a new oil filter, or 4.75 US qt (4.5 L) when the filter is retained, on the final-year 2023 Maxima 3.5L V6.",
    },
    {
      q: "Why are there two different quantities?",
      a: "The difference is the volume the filter itself holds. Changing the filter adds roughly three-eighths of a quart to the refill; leaving it in place means that oil is still in the system.",
    },
    {
      q: "Which oil does the 2023 Maxima require?",
      a: "Synthetic SAE 0W-20 meeting API SP and ILSAC GF-6, or the equivalent oil described by Nissan.",
    },
    {
      q: "Do these figures apply to an older Maxima or another VQ35 vehicle?",
      a: "No. They are specific to the U.S.-market 2023 Maxima and its VQ35DE. Earlier Maxima generations and other Nissan VQ applications can use different pans, filters or published quantities.",
    },
    {
      q: "Why is the capacity described as approximate?",
      a: "Drain time and oil temperature change how much comes out, so the amount going back in varies. Refill short, run the engine, inspect the drain plug and filter, shut down on level ground, allow drain-back and finish at the dipstick without overfilling.",
    },
  ],
  "subaru/crosstrek/tire-pressure": [
    {
      q: "What tire pressure does a 2022 Subaru Crosstrek Hybrid use?",
      a: "36 psi front and 35 psi rear, measured cold — roughly 248 kPa and 241 kPa.",
    },
    {
      q: "Do gasoline Crosstrek trims use the same pressures?",
      a: "Not necessarily. These values are for the 2022 U.S.-market Crosstrek Hybrid and its factory tire configuration. Gasoline trims, later Wilderness models, replacement wheel packages and other model years follow their own door-pillar label.",
    },
    {
      q: "Should I use the pressure printed on the tire sidewall?",
      a: "No. The sidewall figure is the tire's maximum, not the vehicle's setting. Use the Subaru specification or the driver-side pressure label.",
    },
    {
      q: "What if I check the pressure after driving?",
      a: "Check before driving, or after the car has been parked long enough for the tires to cool. Do not bleed pressure out of a warm tire to force it down to the cold target — recheck once it has cooled instead.",
    },
  ],
  "subaru/impreza/oil-capacity": [
    {
      q: "How much oil does a 2018 Subaru Impreza take?",
      a: "4.7 US qt (4.4 L) during an oil-and-filter change on the 2018 Impreza 2.0L.",
    },
    {
      q: "Does this figure cover a WRX or STI?",
      a: "No. It applies to the naturally aspirated U.S.-market 2018 Impreza. It is not a WRX or WRX STI value and should not be assumed for a different FB or EJ engine generation just because the badge still reads Impreza.",
    },
    {
      q: "Which oil does the 2018 Impreza 2.0L require?",
      a: "Synthetic SAE 0W-20 meeting ILSAC GF-5, or API SN with Resource Conserving wording, as stated in the guide.",
    },
    {
      q: "My dipstick reads low — can I add a full quart?",
      a: "No. Subaru's guide shows roughly one quart between the low and full marks, which is a correction reference rather than permission to add a quart without checking. Top up gradually and re-read the dipstick on level ground.",
    },
  ],
};
