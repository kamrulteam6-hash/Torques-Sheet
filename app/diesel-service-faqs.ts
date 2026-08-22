/**
 * Hand-written FAQs for the pages in diesel-service-content.ts that were still
 * ending with the shared "Does aftermarket hardware use the stock torque?" /
 * "Can extra torque stop a leak?" pair. Both are real questions on a sealing
 * joint, but the useful answer is component-specific — a stamped oil-pan rail,
 * a starter nose and a water-pump flange fail in different ways.
 */
export const dieselServiceFaqs: Record<string, { q: string; a: string }[]> = {
  "chevrolet/350/oil-pan-bolt-torque": [
    {
      q: "What is the Chevy 350 oil pan bolt torque?",
      a: "For the Chevrolet Performance 350 HO Deluxe: 97 in-lb (11 N·m) on the side-rail bolts and 15 lb-ft (20 N·m) on the corner bolts. The drain plug is also listed at 15 lb-ft (20 N·m).",
    },
    {
      q: "Why are the corner bolts tightened so much harder than the rail bolts?",
      a: "They are different fasteners doing different jobs — the small side-rail bolts clamp a thin stamped flange along its length, while the larger corner fasteners locate the pan at its ends. Separate the two groups before you start rather than working around the pan with one setting.",
    },
    {
      q: "Will tightening the pan bolts more stop an oil-pan leak?",
      a: "No — it usually makes it worse. Extra torque bows the stamped flange between bolts, which opens the gasket gap rather than closing it. Flatten pulled bolt holes, place sealant only where the gasket instructions call for it, and tighten in gradual alternating passes.",
    },
    {
      q: "Do these values apply to an aftermarket cast pan?",
      a: "No. They apply to the pan and hardware arrangement supplied or specified for the cited 350 HO Deluxe package. Earlier two-piece seals, aftermarket cast pans, one-piece gasket kits and mixed-size production hardware can use different location groups entirely.",
    },
  ],
  "chevrolet/350/starter-bolt-torque": [
    {
      q: "What is the Chevy 350 starter bolt torque?",
      a: "There is no single number. The Chevrolet Performance 350 HO Turn Key guide specifies 30 lb-ft (40 N·m), while the 350 HO Deluxe and 350/265 HP long-block guides specify 35 lb-ft (48 N·m). Use the value for the installed starter and engine package.",
    },
    {
      q: "Can I split the difference between 30 and 35 lb-ft?",
      a: "No. These are package-specific specifications, not a range to average. Production engines, replacement mini-starters, different bolt diameters and aftermarket nose housings can carry their own instructions.",
    },
    {
      q: "Does correct torque guarantee the starter is installed properly?",
      a: "No. A starter that shifts or sits crooked can damage the nose, the bolt holes and the ring gear even when a torque wrench reaches the nominal number. Verify pinion-to-ring-gear engagement before adding shims.",
    },
    {
      q: "Do the starter bolts need to be a specific type?",
      a: "Yes — use correct shouldered or knurled starter bolts of the prescribed length, and install any factory brace. The shoulder locates the starter; a plain bolt of the right diameter does not.",
    },
  ],
  "chevrolet/350/timing-cover-bolt-torque": [
    {
      q: "What is the Chevy 350 timing cover bolt torque?",
      a: "97 in-lb (11 N·m) for the front-cover bolts on the Chevrolet Performance 350 HO Deluxe.",
    },
    {
      q: "When should the timing cover be fitted during assembly?",
      a: "Fit it loosely before the oil-pan corner seals are compressed, and center it to the crank seal as the installation procedure requires. Sequence matters here as much as torque.",
    },
    {
      q: "Will more torque stop a front-cover leak?",
      a: "No. The joint seals through correct alignment and gasket compression. Overtightening can dish a stamped flange, squeeze the seal out or create a new leak path that was not there before.",
    },
    {
      q: "Does 97 in-lb apply to a cast aftermarket cover?",
      a: "No. Cast aftermarket covers, reinforcement plates, different washers and accessory brackets change the fastener stack, so the manufacturer's instructions apply instead.",
    },
  ],
  "chevrolet/350/water-pump-bolt-torque": [
    {
      q: "What is the Chevy 350 water pump bolt torque?",
      a: "30 lb-ft (40 N·m), per the Chevrolet Performance 350/265 HP long-block guide for the covered Gen I small-block crate-engine arrangement.",
    },
    {
      q: "Do the water-pump bolts all go back in the same holes?",
      a: "Yes. Keep each bolt in its original position, because the lengths can differ — a long bolt in a short hole can bottom out and read as torqued while clamping nothing.",
    },
    {
      q: "Do the water-pump bolts need thread sealant?",
      a: "It depends on the application. Confirm whether the exact bolt hole or pump instructions require it — some of these holes break into a coolant passage and some do not.",
    },
    {
      q: "Should I retorque the water pump after it heats up?",
      a: "Recheck for leaks after the first complete heat cycle, but do not automatically retorque. Clean the block and pump faces and start all bolts by hand so the pump does not cock against the gasket in the first place.",
    },
  ],
  "mitsubishi/4g63/head-bolt-torque": [
    {
      q: "What is the head bolt torque on a Mitsubishi 4G63?",
      a: "For the turbo application in the linked Mitsubishi overhaul manual: tighten the oiled factory bolts to 78 ± 2 N·m, loosen them completely, tighten to 20 ± 2 N·m, then turn every bolt 90° and another 90° in sequence.",
    },
    {
      q: "Can factory 4G63 head bolts be reused?",
      a: "Inspect bolt length before reuse against the manual's limit, and oil the threads and washer faces as specified.",
    },
    {
      q: "What if I turn a bolt past the angle mark?",
      a: "The manual directs loosening the bolt completely and restarting the procedure — not backing it off to the mark. Use paint marks for both angle passes.",
    },
    {
      q: "Does this cover a 6-bolt 4G63 or an Evo engine?",
      a: "No. This procedure covers the factory-bolt turbo revision documented in the linked manual. Earlier 6-bolt engines, naturally aspirated variants, Evolution revisions and aftermarket studs must be matched to their own manual or fastener chart.",
    },
    {
      q: "Can a stud kit use the factory procedure?",
      a: "No. A stud kit changes both the fastener and the friction condition the factory stages assume — use the stud maker's torque, lubricant and sequence for that exact kit.",
    },
  ],
};
