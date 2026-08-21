export type ComparisonMetric = {
  label: string;
  f150: string;
  rival: string;
  winner: "F-150" | "Rival" | "Tie";
  note: string;
};

export type Comparison = {
  slug: string;
  title: string;
  description: string;
  rival: string;
  rivalShort: string;
  verdict: string;
  bestForF150: string;
  bestForRival: string;
  metrics: ComparisonMetric[];
  priorities: { key: string; label: string; winner: string; reason: string }[];
  powertrain: string[];
  ownership: string[];
  configurationAdvice: string;
  faqs: { question: string; answer: string }[];
  sources: { label: string; url: string; note: string }[];
};

const fordSource = {
  label: "2025 Ford F-150 towing guide",
  url: "https://www.ford.com/content/dam/brand_ford/en_us/brand/towing/pdf/2025-Ford-F150-Towing-Guide-1.pdf",
  note: "Ford configuration-level towing, payload and powertrain ratings",
};

const sharedPriorities = (rival: string, special: { comfort: string; value: string }) => [
  { key: "tow", label: "Maximum towing", winner: "Ford F-150", reason: "The properly equipped 2025 F-150 reaches 13,500 lb. That headline is configuration-specific, so compare the door-jamb and trailering labels on the two trucks you are actually considering." },
  { key: "payload", label: "Payload flexibility", winner: "Check configuration", reason: "Cab, bed, drivetrain and options can remove hundreds of pounds from payload. Use the yellow Tire and Loading label—not a model-wide maximum—to decide which physical truck carries more." },
  { key: "powertrain", label: "Powertrain choice", winner: "Ford F-150", reason: "Ford offers a broad spread that includes turbo V6, V8 and full-hybrid choices. The best engine still depends on trailer weight, annual mileage and how often the truck works near its ratings." },
  { key: "comfort", label: "Ride and cabin", winner: rival, reason: special.comfort },
  { key: "value", label: "Value for your use", winner: "Compare local builds", reason: special.value },
];

export const comparisons: Comparison[] = [
  {
    slug: "ford-f150-vs-chevrolet-silverado-1500",
    title: "2025 Ford F-150 vs. Chevrolet Silverado 1500",
    description: "A configuration-aware 2025 Ford F-150 vs Chevrolet Silverado 1500 comparison covering towing, payload, engines, beds and everyday ownership.",
    rival: "Chevrolet Silverado 1500",
    rivalShort: "Silverado 1500",
    verdict: "The F-150 has the higher published maximum towing and payload figures, while the Silverado counters with a diesel option, a wide bed/cab catalog and straightforward V8 choices. There is no honest one-line winner: match the engine, axle, cab, bed and equipment to the load you will actually carry.",
    bestForF150: "Buy the F-150 if you want the broadest powertrain menu, the highest published 2025 maximum tow rating, or the PowerBoost hybrid's onboard-power capability.",
    bestForRival: "Buy the Silverado if the 3.0L Duramax diesel, familiar small-block V8 character, or a specific Chevrolet bed-and-cab build fits your work better.",
    metrics: [
      { label: "Maximum advertised towing", f150: "13,500 lb", rival: "13,300 lb", winner: "F-150", note: "Properly equipped maximums; most retail configurations rate lower." },
      { label: "Maximum advertised payload", f150: "2,440 lb", rival: "2,260 lb", winner: "F-150", note: "Occupants, cargo, accessories and tongue weight all consume payload." },
      { label: "Gas engine range", f150: "2.7L/3.5L turbo V6, 5.0L V8, hybrid", rival: "2.7L turbo I4, 5.3L/6.2L V8", winner: "Tie", note: "Different strengths: Ford adds hybrid; Chevrolet retains two V8 choices." },
      { label: "Light-duty diesel", f150: "Not offered for 2025", rival: "3.0L Duramax I6", winner: "Rival", note: "Useful for buyers who specifically want diesel range and low-rpm torque." },
      { label: "Bed material", f150: "Aluminum body/bed panels", rival: "Steel bed", winner: "Tie", note: "Material alone does not decide durability; repair method and use matter." },
    ],
    priorities: sharedPriorities("Chevrolet Silverado 1500", { comfort: "Drive equivalent trims back-to-back. Seat shape, control layout and suspension tuning are personal; tire and off-road packages can change the ride more than the badge.", value: "Price the equipment you need, not similarly named trims. Incentives, tow packages and standard equipment can reverse the apparent price advantage." }),
    powertrain: [
      "Ford's 3.5L EcoBoost is the route to the 13,500-lb maximum, while the 5.0L V8 reaches 12,900 lb in the correct configuration.",
      "Chevrolet's 3.0L Duramax is the major differentiator for high-mileage towing buyers; the 6.2L V8 is the naturally aspirated performance choice.",
      "Do not compare engine peak torque alone. Axle ratio, cooling package, wheelbase, curb weight and GCWR determine what a completed truck can tow.",
    ],
    ownership: [
      "Check rear-seat space and bed length together. A crew cab is convenient, but the longer wheelbase and bed combination may be awkward in a short garage.",
      "Price replacement tires before choosing large wheels. Smaller factory wheels often improve tire cost, sidewall compliance and payload margin.",
      "For frequent towing, test the integrated brake controller, camera views, mirror coverage and hitch setup—not just acceleration on an empty test drive.",
    ],
    configurationAdvice: "Start with the trailer's loaded weight and realistic tongue weight. Add passengers, tools, a hitch and bed cargo, then compare that total with the payload number on the candidate truck's Tire and Loading Information label. After payload passes, confirm the exact truck's GCWR, axle rating and trailer rating. A model-wide 'up to' number is not permission to tow that amount with every F-150 or Silverado.",
    faqs: [
      { question: "Which can tow more in 2025?", answer: "Ford publishes a 13,500-lb maximum for a properly equipped F-150; Chevrolet publishes 13,300 lb for the Silverado 1500. The 200-lb headline difference is less important than the rating of the exact cab, engine, axle and bed configuration." },
      { question: "Which truck has the better V8?", answer: "That depends on the job. Ford's 5.0L is the only F-150 V8, while Chevrolet offers 5.3L and 6.2L V8s. Compare the full tow rating, fuel requirement, axle ratio and purchase cost rather than displacement alone." },
      { question: "Is the Silverado diesel automatically better for towing?", answer: "No. The Duramax's torque delivery and range can suit frequent towing, but payload, purchase price, fuel availability, emissions hardware and the exact trailer rating still matter." },
      { question: "Why is my door-sticker payload lower than this table?", answer: "The table shows model-line maximums. Cab style, four-wheel drive and optional equipment increase curb weight, leaving less capacity for people, cargo and tongue weight." },
    ],
    sources: [fordSource, { label: "2025 Chevrolet Trailering Guide", url: "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicle-groups/trailering-and-towing/trucks/04-pdfs/CH-CAT-GEN-TRBRND020_2025%20Chevrolet%20Trailering%20Guide%20260721.pdf", note: "Chevrolet ratings, definitions and configuration tables" }],
  },
  {
    slug: "ford-f150-vs-gmc-sierra-1500",
    title: "2025 Ford F-150 vs. GMC Sierra 1500",
    description: "Compare the 2025 Ford F-150 and GMC Sierra 1500 by towing, payload, engines, luxury trims and real-world truck configuration.",
    rival: "GMC Sierra 1500",
    rivalShort: "Sierra 1500",
    verdict: "Choose the F-150 for the highest published tow figure, hybrid availability and a particularly broad work-truck powertrain range. Choose the Sierra when the 3.0L Duramax or GMC's AT4/Denali trim strategy is the better fit. Exact truck labels matter more than the small gap between headline ratings.",
    bestForF150: "The F-150 is the stronger paper choice for maximum-trailer builds, hybrid buyers and shoppers who want many powertrain combinations.",
    bestForRival: "The Sierra is compelling for buyers who want a light-duty diesel, GMC's premium cabin treatment or factory off-road trims with distinctive hardware.",
    metrics: [
      { label: "Maximum advertised towing", f150: "13,500 lb", rival: "13,200 lb", winner: "F-150", note: "GMC's 2025 vehicle page lists 13,200 lb; exact label governs." },
      { label: "Example maximum base payload", f150: "2,440 lb", rival: "2,440 lb", winner: "Tie", note: "A GMC Pro 2WD double-cab build shows 2,440 lb; equipped trucks vary." },
      { label: "Hybrid option", f150: "3.5L PowerBoost", rival: "None", winner: "F-150", note: "Ford's hybrid also supports available Pro Power Onboard." },
      { label: "Diesel option", f150: "None for 2025", rival: "3.0L Duramax I6", winner: "Rival", note: "The Sierra diesel is rated up to 13,200 lb when properly configured." },
      { label: "Premium/off-road focus", f150: "Platinum, Tremor, Raptor", rival: "Denali, AT4, AT4X", winner: "Tie", note: "Compare the hardware and tires on the exact trim." },
    ],
    priorities: sharedPriorities("GMC Sierra 1500", { comfort: "GMC's Denali trims place a strong emphasis on premium presentation, while Ford's upper trims package technology differently. Sit in both; the interface and seat fit are subjective.", value: "A Sierra Pro and F-150 XL are a different comparison from Denali and Platinum. Normalize cab, drive system, engine and required packages before comparing transaction prices." }),
    powertrain: ["The F-150's maximum tow build uses the 3.5L EcoBoost; the 5.0L V8 and PowerBoost hybrid serve different buyer priorities.", "The Sierra offers TurboMax, two gasoline V8s and the 3.0L Duramax diesel, giving it the clearer diesel advantage.", "GMC's Max Trailering Package changes axle ratio, cooling, springs and related hardware. A truck without the package does not inherit the model's maximum."],
    ownership: ["GMC's MultiPro tailgate and Ford's Pro Access Tailgate solve similar access problems differently; try them with your hitch or tonneau setup.", "Off-road tires and suspension packages can reduce tow ratings and alter highway ride. Compare the exact AT4, Tremor or other trim—not the base model's figures.", "For a travel trailer, payload and rear-axle capacity often become limiting before advertised maximum towing."],
    configurationAdvice: "Photograph the trailering label and Tire and Loading Information label of each truck. Enter the actual passenger, hitch, accessory and cargo weights. Then compare the remaining payload with loaded tongue weight and verify GCWR and rear GAWR. This five-minute check is more useful than choosing between 13,500 and 13,200 lb model-line claims.",
    faqs: [
      { question: "Is the F-150 more capable than the Sierra 1500?", answer: "At the model-line maximum, Ford publishes a slightly higher tow number. Specific Sierra and F-150 configurations can be higher or lower than one another, so capability must be checked by VIN configuration and labels." },
      { question: "Which offers a diesel in 2025?", answer: "The Sierra 1500 offers the 3.0L Duramax inline-six. Ford does not offer a diesel F-150 for 2025." },
      { question: "Is Denali better than Platinum?", answer: "Neither is universally better. Denali and Platinum bundle materials, driver assistance, displays and exterior details differently. Compare the exact equipment list and drive both on imperfect pavement." },
      { question: "Can every Sierra tow 13,200 pounds?", answer: "No. That is an available maximum reached only by a particular properly equipped configuration. The truck-specific trailering label is the controlling reference." },
    ],
    sources: [fordSource, { label: "2025 GMC Sierra 1500", url: "https://www.gmc.com/content/gmc/na/us/en/index/trucks/previous-year/sierra/1500.html", note: "GMC model-line towing and equipment information" }, { label: "GMC 2025 build specifications", url: "https://www.gmc.com/byo-vc/client/en/US/gmc/sierra/2025/sierra_1500/config/dimensions/2", note: "Configuration-specific payload example" }],
  },
  {
    slug: "ford-f150-vs-ram-1500",
    title: "2025 Ford F-150 vs. Ram 1500",
    description: "A practical 2025 Ford F-150 vs Ram 1500 comparison with towing, payload, Hurricane engines, ride, cab and configuration guidance.",
    rival: "Ram 1500",
    rivalShort: "Ram 1500",
    verdict: "The F-150 wins the maximum-towing contest and offers V8 and hybrid choices. The redesigned Ram counters with a coil-spring rear suspension, a high-output Hurricane option and a strong cabin brief. Work backward from payload and trailer needs before treating either as the winner.",
    bestForF150: "Choose F-150 for maximum towing, a traditional V8 option, hybrid utility or the widest spread of work-oriented configurations.",
    bestForRival: "Choose Ram 1500 if unladen ride, cabin finish or the high-output Hurricane's performance matters more than the last portion of maximum tow rating.",
    metrics: [
      { label: "Maximum advertised towing", f150: "13,500 lb", rival: "11,550 lb", winner: "F-150", note: "Properly equipped 2025 configurations." },
      { label: "Maximum advertised payload", f150: "2,440 lb", rival: "2,370 lb", winner: "F-150", note: "Ram maximum is with the 3.6L; high-output builds carry less." },
      { label: "Top engine output", f150: "Raptor R: 720 hp", rival: "Hurricane HO: 540 hp", winner: "F-150", note: "Specialty performance is not a tow-rating comparison." },
      { label: "Rear suspension", f150: "Leaf spring", rival: "Coil spring", winner: "Tie", note: "Ram targets ride comfort; Ford's setup supports its configuration strategy." },
      { label: "V8/hybrid availability", f150: "5.0L V8 and PowerBoost", rival: "Neither for 2025", winner: "F-150", note: "Ram's 2025 gasoline range uses V6 and Hurricane inline-six engines." },
    ],
    priorities: sharedPriorities("Ram 1500", { comfort: "Ram's coil-spring rear suspension and cabin execution make it a strong empty-truck road-test candidate. Payload and tire selection still influence ride.", value: "Ram engine output rises quickly by trim, but so can price. Compare similarly equipped crew cabs and include tow hardware, driver assistance and warranty terms." }),
    powertrain: ["Ram's 3.6L Pentastar has the highest published payload in its lineup but not its highest tow rating.", "The 420-hp standard-output Hurricane provides Ram's maximum towing configuration; the 540-hp high-output version is aimed more at performance and premium trims.", "Ford retains a naturally aspirated 5.0L V8 and adds PowerBoost hybrid capability, neither of which has a direct 2025 Ram equivalent."],
    ownership: ["An empty test drive favors comfort impressions; a loaded test drive tells you more about control. Ask to compare representative tire pressures and wheel sizes.", "Ram's high-output engine does not produce the highest tow or payload number. More horsepower is not the same as more rated work capacity.", "If garage length matters, compare overall length and turning circle for the exact cab/bed combination."],
    configurationAdvice: "The Ram chart demonstrates why engine-based assumptions fail: its 3.6L has the highest payload, its standard-output Hurricane has the highest tow rating, and its high-output Hurricane leads horsepower. Ford ratings vary just as sharply. Decide whether your constraint is tongue weight, total trailer weight, cargo or performance, then choose the matching configuration.",
    faqs: [
      { question: "Which 2025 truck tows more?", answer: "The F-150's published maximum is 13,500 lb versus approximately 11,550 lb for the Ram 1500. Those are properly equipped maximums, not ratings for every truck." },
      { question: "Did Ram discontinue the Hemi for 2025?", answer: "The 2025 Ram 1500 powertrain chart lists the 3.6L Pentastar and 3.0L Hurricane engines rather than a Hemi V8. Check the model year when shopping used or leftover inventory." },
      { question: "Does the 540-hp Ram tow the most?", answer: "No. Ram's own chart assigns the highest 2025 tow rating to the standard-output Hurricane, while the high-output engine has a lower maximum payload and tow rating." },
      { question: "Which rides better?", answer: "Ram's coil-spring rear suspension is a meaningful design difference, but trim, tires, wheelbase and load affect the result. A back-to-back drive on the same route is the useful test." },
    ],
    sources: [fordSource, { label: "2025 Ram 1500 payload and towing chart", url: "https://www.ramtrucks.com/content/dam/fca-brands/na/ramtrucks/en_us/towing/towing-capacity-guide/brochure/25MY_Ram_1500_Customer_PayTow_2.0.pdf", note: "Ram engine output, maximum payload and towing figures" }],
  },
  {
    slug: "ford-f150-vs-toyota-tundra",
    title: "2025 Ford F-150 vs. Toyota Tundra",
    description: "Compare the 2025 Ford F-150 and Toyota Tundra by towing, payload, hybrid systems, cab and bed choices, and real truck labels.",
    rival: "Toyota Tundra",
    rivalShort: "Tundra",
    verdict: "The F-150 publishes higher maximum tow and payload figures and offers more powertrain variety. The Tundra uses a focused twin-turbo V6 lineup, coil-spring rear suspension and an available performance-oriented hybrid. Buyers should compare exact configurations because the Tundra's highest-output hybrid is not its maximum-payload setup.",
    bestForF150: "Choose F-150 when maximum published capacity, powertrain variety, a V8 or the utility of Pro Power Onboard is central to the purchase.",
    bestForRival: "Choose Tundra if its focused V6 lineup, coil-spring ride, composite bed or Toyota-specific trim and dealer experience better suit you.",
    metrics: [
      { label: "Maximum advertised towing", f150: "13,500 lb", rival: "12,000 lb", winner: "F-150", note: "Properly equipped maximums." },
      { label: "Maximum advertised payload", f150: "2,440 lb", rival: "1,940 lb", winner: "F-150", note: "Highest-output hybrids are not the payload leaders." },
      { label: "Core engine strategy", f150: "Turbo V6, V8, hybrid", rival: "Twin-turbo V6, hybrid", winner: "F-150", note: "Ford offers more architectures; Toyota keeps a narrower range." },
      { label: "Hybrid peak output", f150: "430 hp / 570 lb-ft", rival: "437 hp / 583 lb-ft", winner: "Rival", note: "Peak output does not equal maximum towing or payload." },
      { label: "Rear suspension", f150: "Leaf spring", rival: "Coil spring", winner: "Tie", note: "Different tuning and packaging priorities." },
    ],
    priorities: sharedPriorities("Toyota Tundra", { comfort: "Tundra's coil-spring rear suspension is worth a back-to-back drive. Tire sidewall, TRD hardware and payload still change how either truck feels.", value: "Compare the exact trim and included safety, towing and convenience hardware. A lower trim with the right packages may serve better than a costly flagship." }),
    powertrain: ["Toyota's standard i-FORCE twin-turbo V6 reaches 389 hp and 479 lb-ft in its higher-output tune.", "The i-FORCE MAX hybrid raises output to 437 hp and 583 lb-ft, but Toyota's 12,000-lb maximum tow rating comes from a non-hybrid SR5 4x2 configuration.", "Ford separates its maximum-tow EcoBoost, V8 and PowerBoost use cases more clearly; always connect the rating to the exact build."],
    ownership: ["The Tundra's composite bed and F-150's aluminum body/bed construction call for different repair approaches; neither material is a substitute for a liner where the job demands one.", "Toyota's 8.1-foot bed is limited to Double Cab configurations, while crew-cab shoppers will compare shorter bed choices.", "Hybrid badges do not mean the same thing here: Toyota emphasizes combined performance; Ford also promotes stationary exportable power."],
    configurationAdvice: "Toyota's own table shows tow ratings from 8,300 to 12,000 lb and payload from 1,485 to 1,940 lb depending on cab, bed, drive system and grade. Ford's spread is also broad. Use the configuration table to shortlist, then verify the physical truck's labels before signing or hitching.",
    faqs: [
      { question: "Does the F-150 tow more than the Tundra?", answer: "At their published 2025 maximums, yes: 13,500 lb for F-150 and 12,000 lb for Tundra. Many configurations of both trucks rate well below those numbers." },
      { question: "Which hybrid is stronger?", answer: "Toyota publishes 437 hp and 583 lb-ft for i-FORCE MAX; Ford publishes 430 hp and 570 lb-ft for PowerBoost. Output alone does not determine payload, towing, efficiency or ownership fit." },
      { question: "Is the Tundra hybrid the best Tundra for towing?", answer: "Not by the maximum number. Toyota's 2025 configuration table assigns the 12,000-lb maximum to an i-FORCE SR5 Double Cab 4x2, not an i-FORCE MAX hybrid." },
      { question: "Which has more payload?", answer: "Ford's model-line maximum is 2,440 lb; Toyota's is 1,940 lb. The yellow label on an equipped retail truck will normally show less than the headline maximum." },
    ],
    sources: [fordSource, { label: "2025 Toyota Tundra brochure", url: "https://www.toyota.com/content/dam/toyota/brochures/pdf/2025/tundra_ebrochure.pdf", note: "Toyota configuration-level towing and payload tables" }, { label: "2025 Toyota Tundra overview", url: "https://www.toyota.com/tundra/2025/section/performance-capability/tab/max-towing/", note: "Toyota engine output and maximum towing overview" }],
  },
];

export function comparisonPath(item: Comparison) {
  return `/compare/${item.slug}`;
}
