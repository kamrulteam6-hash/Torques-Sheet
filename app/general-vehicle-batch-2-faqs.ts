/**
 * Hand-written FAQs for pages in general-vehicle-batch-2-content.ts.
 *
 * Replaces the generated three-question block, which asked the same two
 * questions on every page and answered all three by repeating `answer`,
 * `scope` and `detail` verbatim from the intro and body. Every figure below
 * comes from the matching record. Records without an entry keep the generated
 * block and do not emit FAQPage markup.
 */
export const generalVehicleBatch2Faqs: Record<string, { q: string; a: string }[]> = {
  "chevrolet/blazer/towing-capacity": [
    {
      q: "How much can a 2023 Chevy Blazer tow?",
      a: "The 2023 Chevrolet Trailering Guide lists a 4,500-lb maximum trailer weight for a properly equipped Blazer. It is a model maximum rather than a rating every Blazer carries.",
    },
    {
      q: "Is 4,500 lb the same as payload or GCWR?",
      a: "No. It is a maximum trailer-weight rating only. Payload and GCWR are separate limits, and trailer tongue weight counts against available vehicle payload rather than against the trailer rating.",
    },
    {
      q: "Does this cover a K5 Blazer or a Trailblazer?",
      a: "No. This page covers the modern U.S.-market 2023 Blazer crossover only. The classic K5 and the Trailblazer are different vehicles with their own ratings.",
    },
    {
      q: "Can I judge the rating from the engine?",
      a: "No — engine displacement and appearance prove nothing about the rating. Drivetrain, trailering equipment, the payload label and the owner information for that specific vehicle establish its usable limit, along with an approved hitch, wiring, cooling provisions and any trailer-brake requirement.",
    },
  ],
  "chevrolet/colorado/towing-capacity": [
    {
      q: "How much can a 2023 Chevy Colorado tow?",
      a: "3,500 lb with the 237-hp 2.7L Turbo, and as much as 7,700 lb with the 2.7L Turbo Plus (310 hp, 390 lb-ft) or the High-Output tune (310 hp, 430 lb-ft).",
    },
    {
      q: "Why is the ZR2 rated lower than its engine allows?",
      a: "The ZR2 is capped at 6,000 lb even though it uses the High-Output engine. Its off-road configuration sets the limit, so the engine tune alone does not establish the rating.",
    },
    {
      q: "Does the engine badge tell me the towing rating?",
      a: "Only partly. All three 2023 ratings come from the same 2.7L displacement, so cab, trim, drivetrain, axle, hitch and trailering equipment still decide which row applies.",
    },
    {
      q: "Does this chart apply to a 2022 Colorado?",
      a: "No. It is for the redesigned U.S.-market 2023 truck. A 2022-or-earlier Colorado, a different model year, or a truck missing the equipment its trailering label requires must be checked against its own guide.",
    },
  ],
  "chevrolet/suburban/fuel-tank-capacity": [
    {
      q: "How big is the 2025 Chevy Suburban fuel tank?",
      a: "Approximately 28 US gal (106 L), in both 2WD and 4WD form.",
    },
    {
      q: "Why does my Suburban never take 28 gallons at the pump?",
      a: "28 gal is a nominal tank volume, not an expected refill amount. The low-fuel warning appears while usable reserve remains, and fuel stays in the tank, lines and module. Temperature, pump shutoff behavior and how the vehicle is parked all change how much it accepts.",
    },
    {
      q: "Does the Tahoe use the same tank?",
      a: "No. The shorter Tahoe is listed at 24 US gal. Do not substitute its figure, and do not carry the 28-gal number back to an older Suburban 1500 or 2500.",
    },
    {
      q: "Should I keep adding fuel after the nozzle clicks off?",
      a: "No. Repeated clicking means the tank is full at that filling angle and temperature. Use the gauge and range estimate as aids rather than trying to prove nominal capacity at the pump.",
    },
  ],
  "dodge/durango/horsepower": [
    {
      q: "How much horsepower does a 2023 Dodge Durango have?",
      a: "Up to 295 hp with the 3.6L V6, 360 hp with the 5.7L HEMI, 475 hp with the 6.4L SRT 392, and 710 hp with the supercharged 6.2L SRT Hellcat.",
    },
    {
      q: "What are the matching torque figures?",
      a: "Up to 260 lb-ft for the 3.6L, 390 lb-ft for the 5.7L, 470 lb-ft for the 6.4L and 645 lb-ft for the Hellcat.",
    },
    {
      q: "Does the 710-hp figure apply to an SRT 392 or R/T?",
      a: "No. 710 hp belongs only to the supercharged 6.2L Hellcat. The SRT 392 is rated at 475 hp and the R/T's 5.7L at 360 hp.",
    },
    {
      q: "Does more horsepower mean a higher towing capacity?",
      a: "No. Engine cooling, axle ratio, brakes, hitch equipment, GCWR and the vehicle's payload label are separate limits that horsepower does not override.",
    },
  ],
  "ford/bronco/wheel-torque": [
    {
      q: "What is the wheel nut torque on a 2022 Ford Bronco?",
      a: "100 lb-ft (135 N·m) for the M12 x 1.5 wheel nuts on the 2022 full-size Bronco.",
    },
    {
      q: "Does this apply to a Bronco Sport?",
      a: "No. The Bronco Sport has its own manual, and this row must not be transferred to it — or to a classic Bronco.",
    },
    {
      q: "Do beadlock-capable wheel rings use 100 lb-ft?",
      a: "No. Accessory beadlock-capable ring hardware is a separate component with its own instructions, and the wheel-nut value must not be assigned to it.",
    },
    {
      q: "When do Bronco wheel nuts need rechecking?",
      a: "Ford requires retightening to specification within 100 miles (160 km) after any wheel disturbance, including rotation or removal.",
    },
  ],
  "ford/escape/spark-plug-gap": [
    {
      q: "What is the spark plug gap on a 2019 Ford Escape 1.5L EcoBoost?",
      a: "0.025–0.029 in (0.65–0.75 mm), per the Ford owner manual for the 2019 Escape's 1.5L four-cylinder EcoBoost.",
    },
    {
      q: "Does the 2020+ 1.5L use the same gap?",
      a: "No. The later 1.5L is a three-cylinder — a different engine architecture with its own specification. The 1.6L and 2.0L EcoBoost, the 2.5L naturally aspirated engine and the hybrids each have separate rows too.",
    },
    {
      q: "How can I confirm I have the four-cylinder 1.5L?",
      a: "Its firing order is 1-3-4-2, which confirms a four-cylinder rather than the later three-cylinder engine. Also check the Motorcraft-equivalent plug listed for the VIN before measuring.",
    },
    {
      q: "Can I regap a plug that is out of range?",
      a: "Use a wire gauge and handle the fine-wire center electrode carefully. A plug with a damaged electrode or insulator should be replaced rather than forced into range.",
    },
  ],
  "ford/expedition/wheel-torque": [
    {
      q: "What is the lug nut torque on a 2021 Ford Expedition?",
      a: "150 lb-ft (204 N·m) for the M14 x 1.5 wheel lug nuts, from the 2021 U.S. Expedition owner manual for factory wheel hardware.",
    },
    {
      q: "Does 150 lb-ft apply to an older Expedition?",
      a: "No. Earlier generations, aftermarket wheels and replacement fasteners with a different seat design all require their own instructions.",
    },
    {
      q: "When must the lug nuts be rechecked?",
      a: "Within 100 miles (160 km) after tire rotation, flat-tire service or any other wheel removal.",
    },
    {
      q: "Why does the hub need to be clean first?",
      a: "The joint depends on clean metal-to-metal contact. Dirt, rust and loose corrosion on the hub pilot or mating faces prevent the wheel from seating, so the clamp load reached at 150 lb-ft will not survive the debris settling.",
    },
  ],
  "ford/maverick/towing-capacity": [
    {
      q: "How much can a 2022 Ford Maverick tow?",
      a: "2,000 lb as standard. The 2.0L EcoBoost reaches 4,000 lb only when equipped with the available 4K Tow Package.",
    },
    {
      q: "Does having the 2.0L EcoBoost mean I can tow 4,000 lb?",
      a: "No. A 2.0L engine by itself does not prove the truck has the 4K package — a 2.0L without the qualifying setup remains a 2,000-lb truck, in FWD or AWD.",
    },
    {
      q: "What can the 2.5L hybrid tow?",
      a: "2,000 lb. That is the standard 2022 rating and the package does not change it.",
    },
    {
      q: "How do I confirm my truck has the tow package?",
      a: "Check the powertrain and factory tow package from the VIN/build data, then use the certification label to calculate remaining payload. Maximum payload runs up to about 1,500 lb, but the actual door-label figure varies and tongue weight, passengers, bed cargo and accessories all consume it.",
    },
  ],
  "ford/transit/oil-capacity": [
    {
      q: "How much oil does a 2022 Ford Transit take?",
      a: "6.0 US qt (5.7 L) including the filter, for both gasoline engines in the 2022 U.S. full-size Transit — the naturally aspirated 3.5L Duratec and the 3.5L EcoBoost.",
    },
    {
      q: "If both engines take 6 quarts, does the engine matter?",
      a: "Yes. Shared capacity does not mean shared oil identity — you still need to confirm which engine and market you have, because the chart is limited to the 2022 U.S./Canada full-size Transit and other variants differ.",
    },
    {
      q: "Which oil grade does the 2022 Transit require?",
      a: "SAE 5W-30 meeting Ford WSS-M2C961-A1. For extremely cold climates, at -22°F (-30°C) or below, Ford identifies SAE 0W-30 meeting WSS-M2C963-A1.",
    },
    {
      q: "How much oil moves the dipstick from minimum to nominal?",
      a: "About 1.0 US qt (0.9 L). That is why you should add less than six quarts after a filter change, run the engine, inspect for leaks, wait for drain-back on level ground and approach the full mark gradually — Ford warns against filling above maximum.",
    },
    {
      q: "Does this cover a Transit Connect or a diesel Transit?",
      a: "No. Transit Connect, E-Series, the European-market 2.0L EcoBlue and the 2.2L/3.2L diesels are all outside this chart, as is any other model year or a replacement oil pan.",
    },
  ],
  "honda/fit/oil-capacity": [
    {
      q: "How much oil does a 2016 Honda Fit take?",
      a: "3.5 US qt (3.3 L) when the oil filter is changed, or 3.3 US qt (3.1 L) for an oil-only change, on the U.S.-market 2016 Fit 1.5L.",
    },
    {
      q: "Which oil does it require?",
      a: "SAE 0W-20 meeting the quality requirement stated in the manual.",
    },
    {
      q: "Does this apply to other Fit or Jazz model years?",
      a: "No. These quantities are for the 2016 U.S.-market car with the 1,498 cc engine. Other Fit and Jazz generations and markets are not grouped into this row — identify the model year first.",
    },
    {
      q: "What should I replace besides the oil and filter?",
      a: "Install a new drain-plug washer. After refilling, run the engine, inspect the filter and drain plug for leaks, then stop the engine, allow drain-back on level ground and use the dipstick's upper mark as the final check rather than treating the published quantity as an instruction to overfill.",
    },
  ],
  "honda/ridgeline/towing-capacity": [
    {
      q: "How much can a 2024 Honda Ridgeline tow?",
      a: "Up to 5,000 lb, with a 600-lb maximum tongue weight, using the Class III towing equipment Honda describes for 2024.",
    },
    {
      q: "Are the trailer weight and tongue weight separate limits?",
      a: "Yes. Both must be respected independently — staying under 5,000 lb does not license more than 600 lb on the hitch.",
    },
    {
      q: "Does the 5,000-lb rating apply to an older Ridgeline?",
      a: "No. These are 2024 U.S. brochure figures and do not automatically transfer to an earlier front-wheel-drive Ridgeline, a truck missing a towing component, an overloaded truck, or a trailer whose own rating is lower.",
    },
    {
      q: "Does tongue weight count against payload?",
      a: "Yes. Tongue weight is part of the truck's load, so passengers, cargo, bed accessories and hitch load all have to fit within the payload shown for that specific vehicle. Confirm the receiver, ball mount, ball, safety chains, seven-pin connection and any brake-controller requirement as well.",
    },
  ],
  "hyundai/elantra-n/horsepower": [
    {
      q: "How much horsepower does the 2022 Hyundai Elantra N make?",
      a: "276 hp and 289 lb-ft from the 2.0L turbo engine. On the eight-speed DCT, N Grin Shift briefly raises output to 286 hp.",
    },
    {
      q: "What is N Grin Shift and how long does it last?",
      a: "Pressing the NGS control on an eligible DCT car increases turbo boost and transmission response for up to 20 seconds. The conditions and safeguards in the owner's manual still apply.",
    },
    {
      q: "Does the manual-transmission Elantra N get 286 hp?",
      a: "No. The six-speed manual is rated at 276 hp — the DCT overboost function is not available on it, and 286 hp is a temporary figure rather than the engine's continuous rating.",
    },
    {
      q: "At what rpm does the Elantra N make peak power and torque?",
      a: "Maximum standard power is delivered from 5,500–6,000 rpm, and the 289 lb-ft torque plateau runs from 2,100–4,700 rpm.",
    },
    {
      q: "Is the Elantra N Line the same car?",
      a: "No. The N Line is a different trim with a different powertrain, and these ratings do not apply to it.",
    },
  ],
  "hyundai/genesis/horsepower-by-year": [
    {
      q: "How much horsepower does a 2015 Hyundai Genesis have?",
      a: "311 hp with the 3.8L V6 and 420 hp with the 5.0L V8, in U.S.-market form.",
    },
    {
      q: "What are the torque and rpm figures?",
      a: "The direct-injected 3.8L Lambda V6 makes 311 hp at 6,000 rpm and 293 lb-ft at 5,000 rpm. The direct-injected 5.0L Tau V8 makes 420 hp at 6,000 rpm and 383 lb-ft at 5,000 rpm.",
    },
    {
      q: "Does this cover the Genesis Coupe?",
      a: "No. This is the redesigned 2015 Hyundai-branded Genesis sedan only. The Genesis Coupe, the earlier 2013–2014 sedan and later vehicles sold under the standalone Genesis marque are all separate.",
    },
    {
      q: "Does regular fuel change the rating?",
      a: "Hyundai notes that regular fuel can slightly reduce peak power. The published figures are factory SAE output, and comparisons should use factory ratings at the same model year rather than chassis-dyno results or altered-fuel claims.",
    },
  ],
  "hyundai/kona/oil-capacity": [
    {
      q: "How much oil does a 2024 Hyundai Kona take?",
      a: "4.5 US qt (4.3 L) for a drain-and-refill on the Smartstream 2.0L Atkinson engine, or 5.1 US qt (4.8 L) on the Smartstream 1.6L T-GDi.",
    },
    {
      q: "Why does identifying the engine matter so much here?",
      a: "The two gasoline rows differ by 0.6 qt, so confirming the engine before opening bottles is the difference between a correct fill and an overfill.",
    },
    {
      q: "Which oil do both engines require?",
      a: "Full-synthetic SAE 0W-20 meeting API SN PLUS/SP or ILSAC GF-6, for both gasoline rows in this manual.",
    },
    {
      q: "Does this apply to the Kona Electric or Kona N?",
      a: "No. These values come from the U.S.-market 2024 SX2 Kona manual and do not cover the electric Kona, the Kona N, another market's 1.0L engine or an earlier generation.",
    },
  ],
  "hyundai/palisade/oil-capacity": [
    {
      q: "How much oil does a 2026 Hyundai Palisade take?",
      a: "6.13 US qt (5.8 L) for a drain-and-refill on the 2026 Palisade's Smartstream 3.5L GDI V6.",
    },
    {
      q: "Can I use the oil capacity from my older Palisade?",
      a: "No. Earlier Palisades use a 3.8L V6 with a different service quantity, and that familiar number must not be carried forward to the redesigned 3.5L vehicle.",
    },
    {
      q: "Which oil does the 2026 Palisade require?",
      a: "SAE 0W-20 full-synthetic oil meeting API SN PLUS/SP or ILSAC GF-6.",
    },
    {
      q: "Should I add all 6.13 quarts before checking the dipstick?",
      a: "No. Refill short of the listed quantity, start the engine and check for leaks, then shut it down on level ground and allow oil to return to the pan before bringing the dipstick to full. A published refill quantity is not permission to overfill.",
    },
  ],
  "jeep/compass/tire-pressure": [
    {
      q: "What tire pressure should a 2023 Jeep Compass run?",
      a: "The cold value printed on that vehicle's own driver-side B-pillar or door-edge Tire and Loading Information placard. Mopar does not publish a single universal number for every tire package.",
    },
    {
      q: "Isn't the 2023 Compass 33 psi?",
      a: "No — the manual uses 33 psi only as a TPMS temperature example, not as a blanket specification. Trim, original tire size, replacement load rating, market and spare-wheel equipment all change what appears on the placard.",
    },
    {
      q: "What counts as a cold tire?",
      a: "The vehicle has been parked for at least three hours, or driven less than 1 mile after that rest. Pressure also shifts by about 1 psi for each 12°F (7 kPa per 6.5°C) of ambient temperature change, and driving raises it — so do not bleed a warm tire back to the cold target.",
    },
    {
      q: "Can I use the pressure printed on the tire sidewall?",
      a: "No. The sidewall figure is the tire's maximum permissible pressure, not Jeep's recommended operating pressure, and it must never be substituted for the placard value.",
    },
    {
      q: "What should I do after setting the pressures?",
      a: "Set all four road tires from the placard with an accurate gauge, check the spare separately if one is fitted, reinstall the valve caps, and allow the TPMS time to update while driving.",
    },
  ],
  "jeep/grand-wagoneer/towing-capacity": [
    {
      q: "How much can a 2025 Jeep Grand Wagoneer L tow?",
      a: "Up to 9,450 lb (4,286 kg), per the Stellantis Canada fact sheet for the long-wheelbase model when properly equipped.",
    },
    {
      q: "Does this rating cover the standard-wheelbase Grand Wagoneer?",
      a: "No. This figure is specific to the 2025 Grand Wagoneer L. The standard-wheelbase Grand Wagoneer, the regular Wagoneer, another model year and U.S.-market configurations each have their own towing charts.",
    },
    {
      q: "What equipment does the maximum rating require?",
      a: "The Heavy-Duty Trailer Tow Package and the exact configuration matter. Verify the certification label, payload, GCWR, receiver rating, axle and cooling equipment on the actual vehicle.",
    },
    {
      q: "Could payload stop me before 9,450 lb?",
      a: "Yes, and often it does. Occupants, luggage, accessories and tongue weight can make payload the limiting number well before the advertised trailer maximum is reached.",
    },
  ],
  "jeep/patriot/wheel-torque": [
    {
      q: "What is the lug nut torque on a 2017 Jeep Patriot?",
      a: "100 ft-lb (135 N·m), per the 2017 Patriot user guide, on the factory M12 x 1.5 fasteners with their original conical-seat wheel interface.",
    },
    {
      q: "What is the correct tightening pattern?",
      a: "Start every nut by hand, lower the vehicle enough to prevent rotation, then tighten in a star pattern until every nut has been torqued twice.",
    },
    {
      q: "When should Patriot wheel nuts be rechecked?",
      a: "Mopar calls for another torque check after 25 miles (40 km).",
    },
    {
      q: "What socket does the 2017 Patriot use?",
      a: "19 mm — and a six-point socket, to avoid rounding the fastener.",
    },
    {
      q: "Do aftermarket wheels use the same 100 ft-lb?",
      a: "Not necessarily. Aftermarket wheels can specify different hardware or a different procedure, so this row applies to the factory fasteners and seat design.",
    },
  ],
  "nissan/armada/towing-capacity": [
    {
      q: "How much can a 2024 Nissan Armada tow?",
      a: "Up to 8,500 lb when properly equipped, with a published maximum tongue-weight capacity of 850 lb.",
    },
    {
      q: "Does tongue weight reduce what I can carry inside?",
      a: "Yes. Tongue weight is part of the Armada's carried load, so passengers, luggage, accessories and hitch load all come out of the door-label payload allowance.",
    },
    {
      q: "Which limits have to be satisfied besides the 8,500-lb figure?",
      a: "GVWR, GAWR (front and rear), GCWR, receiver rating and tire limits — none may be exceeded. Weigh the loaded combination rather than relying on an empty-trailer brochure figure.",
    },
    {
      q: "Can a stronger aftermarket hitch raise the rating?",
      a: "No. Installing a stronger hitch never raises a vehicle limit. Use trailer brakes and weight-distributing equipment where Nissan requires them, and keep roughly the guide-recommended share of trailer weight on the hitch.",
    },
    {
      q: "Does this cover the 2025 Armada?",
      a: "No. Earlier Armadas and the redesigned 2025 twin-turbo model require their own publications.",
    },
  ],
  "nissan/frontier/oil-capacity": [
    {
      q: "How much oil does a 2024 Nissan Frontier take?",
      a: "About 5.25 US qt (5.0 L) with a new filter, or 5.0 US qt (4.7 L) when the filter is not changed, on the U.S.-market 2024 Frontier 3.8L V6.",
    },
    {
      q: "Which oil does Nissan recommend?",
      a: "Genuine Nissan 0W-20 SP, or an equivalent synthetic SAE 0W-20 meeting API SP and ILSAC GF-6A.",
    },
    {
      q: "Can I use the capacity from my older Frontier?",
      a: "No. The older 2.5L four-cylinder and 4.0L V6 trucks use different rows, so a familiar figure from an earlier generation should not be carried forward.",
    },
    {
      q: "Why does Nissan call the quantity approximate?",
      a: "Oil temperature and drain time change how much comes out and therefore how much goes back in. Add less than the listed amount first, run the engine, inspect for leaks, shut it down, wait more than 10 minutes on level ground and set the final level from the dipstick.",
    },
  ],
  "ram/1500/spark-plug-gap": [
    {
      q: "What is the spark plug gap on a 2011 Ram 1500?",
      a: "0.043 in (1.09 mm) for both the 3.7L V6 and the 5.7L HEMI. The 4.7L V8 is different: 0.039 in (0.99 mm) for its upper plugs and 0.051 in (1.30 mm) for its lower plugs.",
    },
    {
      q: "Why does the 4.7L use two different gaps?",
      a: "The 4.7L uses two plugs per cylinder, and the upper and lower positions intentionally take different plugs — FR8TE2 above and FR8T1332 below — with different gaps to match.",
    },
    {
      q: "Which plugs do the 3.7L and 5.7L use?",
      a: "The 3.7L V6 is listed with the ZFR6F-11G and the 5.7L HEMI with the LZFR5C-11, both at 0.043 in.",
    },
    {
      q: "Do later Ram trucks use these gaps?",
      a: "No. These rows are specific to the 2011 Ram 1500 and are not a universal specification for later 3.6L Pentastar trucks, later 5.7L plug revisions, or any Cummins diesel.",
    },
    {
      q: "Can I bend a fine-wire plug to reach the gap?",
      a: "A fine-wire plug with a damaged electrode should be replaced, not aggressively bent toward a target. Match the engine and the listed replacement plug before measuring.",
    },
  ],
  "subaru/ascent/towing-capacity": [
    {
      q: "How much can a 2019 Subaru Ascent tow?",
      a: "Up to 5,000 lb, from Subaru's U.S. 2019 launch specifications for the 2.4L turbo BOXER and high-torque Lineartronic CVT.",
    },
    {
      q: "Does Trailer Stability Assist increase the towing limit?",
      a: "No. Subaru lists the feature, but an electronic aid cannot raise the mechanical rating or compensate for poor loading.",
    },
    {
      q: "Can I apply the 5,000-lb figure to another Ascent model year?",
      a: "No. The maximum is configuration- and equipment-dependent and should not be copied onto another model year. The exact owner's manual and vehicle labels control hitch requirements, trailer-brake rules, tongue load and each trim's rating.",
    },
    {
      q: "What does the 2019 Ascent's engine produce?",
      a: "260 hp and 277 lb-ft from the 2.4L turbocharged BOXER, driving through a high-torque Lineartronic CVT with an eight-speed manual mode.",
    },
  ],
  "subaru/wrx/oil-capacity": [
    {
      q: "How much oil does a 2018 Subaru WRX take?",
      a: "5.4 US qt (5.1 L) for an oil-and-filter change on the 2018 WRX. The 2018 WRX STI takes 4.5 US qt (4.3 L) — the two turbo models do not share one quantity.",
    },
    {
      q: "Why does the STI hold less oil than the WRX?",
      a: "They are different engines: the WRX uses the FA20DIT and the STI the EJ257. The STI's lower published quantity is not a typo, and the WRX figure is not a safe substitute.",
    },
    {
      q: "Which oil grade do both cars use?",
      a: "Synthetic SAE 5W-30 meeting API SN with Resource Conserving wording, or ILSAC GF-5, in this guide.",
    },
    {
      q: "Do these figures cover the newer FA24 WRX?",
      a: "No. They are limited to the 2018 U.S. WRX and WRX STI and should not be transferred to the later FA24 WRX, an earlier EJ-series car, or another market without checking its manual.",
    },
  ],
  "toyota/crown/oil-capacity": [
    {
      q: "How much oil does a 2024 Toyota Crown take?",
      a: "4.5 US qt (4.3 L) with filter for the 2.5L A25A-FXS hybrid, and 5.6 US qt (5.3 L) with filter for the 2.4L turbo T24A-FTS Hybrid MAX. Without a filter change the figures are 4.2 qt (4.0 L) and 5.3 qt (5.0 L).",
    },
    {
      q: "Do the two Crown powertrains use the same oil?",
      a: "No. The naturally aspirated 2.5L hybrid row calls for JASO GLV-1 SAE 0W-8, while the 2.4L turbo row calls for the model-year Toyota-approved grade shown in its manual.",
    },
    {
      q: "Which trims have which engine?",
      a: "The 2024 XLE and Limited use the 2.5L A25A-FXS; the Platinum uses the 2.4L T24A-FTS.",
    },
    {
      q: "What is the correct fill procedure on a hybrid?",
      a: "Warm the engine, shut the hybrid system off, wait about five minutes on level ground, add below the total first, then finish at the dipstick rather than forcing the whole bottle count into the crankcase.",
    },
    {
      q: "Does this cover the Crown Signia?",
      a: "No. These figures are for the 2024 U.S./Canada Crown crossover sedan and must be matched by engine code. The Crown Signia, older imported Crown generations, Japanese-market body styles and other Toyotas sharing a related engine are all outside this chart.",
    },
  ],
  "toyota/sienna/oil-capacity": [
    {
      q: "How much oil does a Toyota Sienna take?",
      a: "It depends on the generation. The 2020 3.5L V6 takes 5.8 US qt (5.5 L) with filter when equipped with the towing package, or 5.7 US qt (5.4 L) without it. The 2021-and-newer 2.5L hybrid uses 4.5 US qt (4.3 L) with filter.",
    },
    {
      q: "Why does the towing package change the oil capacity?",
      a: "On the 2020 V6, the towing-package distinction changes the filter refill by 0.1 qt. Without a filter change, capacity is 5.6 qt.",
    },
    {
      q: "What changed in 2021?",
      a: "Toyota changed both engine family and powertrain architecture: the V6 ended and the fourth-generation A25A-FXS hybrid began. The hybrid must not be filled from the V6 chart.",
    },
    {
      q: "Does this cover an older 3.0L or 3.3L Sienna?",
      a: "No. Earlier 3.0L/3.3L vans, older 2GR-FE years, regional models and other model years each require their matching manual rather than a generation-wide guess.",
    },
    {
      q: "What is the correct fill procedure?",
      a: "Warm the engine, shut it down or switch the hybrid system off, wait more than five minutes on level ground, add below the reference quantity first and finish from the dipstick.",
    },
  ],
};
