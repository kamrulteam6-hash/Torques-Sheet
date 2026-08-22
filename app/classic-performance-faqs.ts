/**
 * Hand-written FAQs for the head-bolt pages in classic-performance-content.ts.
 *
 * The generated block ended every one of these pages with the same two
 * questions — "Can the original head bolts be reused?" and "Do aftermarket
 * studs use the stock torque?" — answered with the same two sentences. Both
 * questions are worth answering, but the answer differs by engine: some of
 * these manuals publish a dimensional limit for reuse and some do not. Every
 * figure below comes from the matching record.
 */
export const classicPerformanceFaqs: Record<string, { q: string; a: string }[]> = {
  "chevrolet/327/head-bolt-torque": [
    {
      q: "What is the head bolt torque on a Chevy 327?",
      a: "A production-style Gen I small-block commonly finishes at 65 lb-ft. Chevrolet Performance's documented HT383 procedure reaches it in three passes — 25 lb-ft (34 N·m), 40 lb-ft (54 N·m), then 65 lb-ft (88 N·m).",
    },
    {
      q: "Does the 327 need sealant on the head bolts?",
      a: "The cited Gen I guide specifies Teflon pipe sealant for its covered assembly, because the bolt holes break into the water jacket. Apply only the sealer or lubricant prescribed for your exact gasket and hardware — the thread treatment changes the clamp load a given torque produces.",
    },
    {
      q: "Is a head bolt retorque required on a 327?",
      a: "Chevrolet Performance calls for a 10-hour head-bolt recheck on its HT383 package. Apply that recheck only when your exact engine and gasket instructions require it, rather than as a general rule.",
    },
    {
      q: "Does 65 lb-ft apply to aluminum heads or a stud kit?",
      a: "No. The 65-lb-ft reference is for traditional iron-block, iron-head, factory-style bolt architecture. Aluminum heads and aftermarket studs use the component maker's own lubricant and clamp load, and original 327 year and casting data can differ as well.",
    },
  ],
  "dodge/318/head-bolt-torque": [
    {
      q: "What is the head bolt torque on a Dodge 318?",
      a: "The referenced Chrysler service manual specifies 85 lb-ft for production-style cylinder-head bolts on the LA 318.",
    },
    {
      q: "How should the 85 lb-ft be reached?",
      a: "Through progressive center-out passes — a practical staged workflow is 30, then 60, then 85 lb-ft — keeping the exact numbered order on every pass rather than taking one bolt to final torque at a time.",
    },
    {
      q: "Does this cover a Magnum 5.2L or a Poly 318?",
      a: "No. The value covers traditional Chrysler LA 318 iron-head combinations. The Magnum 5.2L, the Poly 318, and aftermarket aluminum heads or stud kits are separate applications.",
    },
    {
      q: "What if the gasket maker's instructions disagree with 85 lb-ft?",
      a: "Follow the gasket or replacement-fastener maker when its lubricant or retorque instructions differ, and verify whether your exact application calls for sealant in the first place.",
    },
  ],
  "dodge/360/head-bolt-torque": [
    {
      q: "What is the head bolt torque on a Dodge 360?",
      a: "The covered 1994 5.9L Magnum procedure tightens in sequence to 50 lb-ft (68 N·m), then repeats the full sequence to a final 105 lb-ft (142 N·m).",
    },
    {
      q: "Can I use the Magnum chart on an earlier LA 360?",
      a: "No. The numerical chart is tied to the documented 1994 5.9L Magnum factory-bolt application. Earlier LA passenger, truck and marine engines are year- and casting-specific and must use their own instructions.",
    },
    {
      q: "What should I keep track of during disassembly?",
      a: "Keep the pushrods and rocker assemblies identified so they return to their original positions, and clean the deck and bolt holes before starting every bolt by hand.",
    },
    {
      q: "Does lubricant on the bolts change the result?",
      a: "Yes — fastener lubricant or sealant changes the clamping load a given torque produces, which is why aluminum heads and stud kits use the component maker's procedure rather than the 50/105 figures.",
    },
  ],
  "ford/289/head-bolt-torque": [
    {
      q: "What is the head bolt torque on a Ford 289?",
      a: "The 1966 Ford shop manual specifies three progressive passes: 50 lb-ft (68 N·m), 60 lb-ft (81 N·m), then a final 65–70 lb-ft (88–95 N·m), following the illustrated sequence.",
    },
    {
      q: "Can I use 5.0L Windsor figures on a 289?",
      a: "No. Later 5.0L long-bolt and short-bolt figures must not be substituted for the 1966 procedure — that is a different bolt-group arrangement.",
    },
    {
      q: "What should I check before lowering the head on?",
      a: "Clean the block's bolt holes and confirm every bolt length before the head goes over the dowels, then apply only the thread treatment prescribed for that exact gasket and hardware.",
    },
    {
      q: "Should each bolt go straight to final torque?",
      a: "No. Complete each pass across the entire head before increasing torque, so the gasket is compressed evenly rather than being pulled down at one end first.",
    },
  ],
  "ford/351-cleveland/head-bolt-torque": [
    {
      q: "What is the head bolt torque on a Ford 351 Cleveland?",
      a: "Fel-Pro's production-engine table lists 95–105 lb-ft for 1970–1974 351C cylinder-head bolts, reached through progressive center-out passes.",
    },
    {
      q: "Does this apply to a 351 Windsor or a 351M/400?",
      a: "No. Those are different engine families despite the shared displacement in the name. Boss 351 hardware and Australian Cleveland variants are also separate applications — identify the engine by casting and architecture before assembly.",
    },
    {
      q: "Why do the blind bolt holes need cleaning?",
      a: "Oil trapped in a blind hole can hydraulically crack the block or give a false torque reading, because the wrench is working against trapped fluid instead of clamping the joint.",
    },
    {
      q: "Should every bolt go in the same position it came from?",
      a: "Yes. Install every bolt in its correct location and finish each progressive pass in the exact factory pattern, matching the gasket and bolt manufacturer's lubricant requirement.",
    },
  ],
  "ford/460/head-bolt-torque": [
    {
      q: "What is the head bolt torque on a Ford 460?",
      a: "For the covered 1984 F-250 7.5L/460, tighten in sequence to 80 lb-ft (108 N·m), then 110 lb-ft (149 N·m), then a final 130–140 lb-ft (177–189 N·m).",
    },
    {
      q: "Does a 460 need a retorque after running?",
      a: "The manual states that no extended-operation retorque is required when this procedure is followed.",
    },
    {
      q: "Where do the longer head bolts go?",
      a: "In the lower-row positions identified by the manual. Keeping bolt locations correct matters as much as the torque value.",
    },
    {
      q: "Can I just tighten to 140 lb-ft?",
      a: "No. Do not pick the top of the range without matching model year, bolt position and thread condition. Earlier passenger-car 429/460 engines, later EFI revisions, industrial engines, aluminum heads and stud kits all require their own instructions.",
    },
  ],
  "honda/b18c/head-bolt-torque": [
    {
      q: "What is the head bolt torque on a Honda B18C?",
      a: "For the 1998 Acura Integra GS-R B18C1: tighten all head bolts in sequence to 29 N·m (22 lb-ft), then repeat the sequence to a final 85 N·m (63 lb-ft).",
    },
    {
      q: "Do the B18C head bolts need oil?",
      a: "Yes. Apply clean engine oil to the bolt threads and the under-head seating surfaces before tightening — the specified torque assumes that friction condition.",
    },
    {
      q: "Can B18C head bolts be reused?",
      a: "Only when the exact service procedure permits reuse and the bolts pass its inspection limits. Reuse is a decision made against the manual's criteria, not a general assumption.",
    },
    {
      q: "Do ARP or aftermarket studs use the 85 N·m figure?",
      a: "No. Use the stud maker's value, lubricant and sequence for the exact kit — a stud kit changes both the fastener and the friction condition the factory number was written for.",
    },
  ],
  "honda/k20/head-bolt-torque": [
    {
      q: "What is the head bolt torque on a Honda K20?",
      a: "For the early Acura RSX procedure: oil the bolt threads and under-head surfaces, tighten the ten head bolts to 39 N·m (29 lb-ft), then turn each bolt 90° and another 90° in sequence. A new factory bolt receives one additional 90° turn.",
    },
    {
      q: "How do I know whether a K20 head bolt can be reused?",
      a: "Measure every bolt at the manual's A and B points and replace it if either diameter is below 10.6 mm. Reuse is decided by that measurement, not by appearance.",
    },
    {
      q: "What if a bolt goes past its angle mark?",
      a: "Remove it and restart the installation step. Do not back it off to the paint mark — the joint has already been loaded past its specification.",
    },
    {
      q: "Does this cover a K20Z, K20C or a swap?",
      a: "No. These stages apply to the 2002–2005-era K20A2/K20A3 RSX procedure in the linked service manual. Later K20Z and K20C turbo engines, swaps, mixed K20/K24 assemblies and aftermarket studs need their exact engine-code and fastener instructions.",
    },
  ],
  "honda/k24/head-bolt-torque": [
    {
      q: "What is the head bolt torque on a Honda K24?",
      a: "For the K24Z7 factory-bolt procedure: oil the threads and under-head surfaces, tighten the ten bolts to 39 N·m (29 lb-ft), then turn every bolt 90° and another 90° in sequence. A new factory head bolt receives one additional 90° turn.",
    },
    {
      q: "How do I know whether a K24 head bolt can be reused?",
      a: "Measure each factory bolt at both inspection points and replace it if either diameter is below 10.6 mm (0.417 in). This engine publishes a dimensional limit, so reuse is a measurement rather than a judgment call.",
    },
    {
      q: "What if I over-turn a bolt past its angle mark?",
      a: "Remove it and restart the prescribed operation. Do not back the bolt up to the paint mark — the same applies if a bolt makes noise while tightening.",
    },
    {
      q: "Does this procedure cover other K-series engines?",
      a: "No. These stages are specific to the K24Z7 procedure in the cited Civic service information. The K24A, K24A2/A4/A8, K24Z2/Z3, Earth Dreams K24W, mixed K20/K24 builds and aftermarket stud kits each require their own engine-code or fastener-maker procedure.",
    },
    {
      q: "What kind of wrench should be used for the 39 N·m stage?",
      a: "A beam-type wrench, or a click wrench tightened slowly, so the reading is not overshot before the tool releases.",
    },
  ],
  "nissan/rb26dett/head-bolt-torque": [
    {
      q: "What is the head bolt torque on an RB26DETT?",
      a: "The R32 RB26DETT engine manual specifies 29 N·m (22 lb-ft), then 108 N·m (80 lb-ft), then complete loosening, then 29 N·m again, and finally an 85–90° turn, for the fourteen M12 bolts.",
    },
    {
      q: "Why does the procedure loosen the bolts completely partway through?",
      a: "The loosen-and-retighten step returns all bolts to zero so the final angle stage starts from a known, uniform base torque rather than from whatever load each bolt happened to retain.",
    },
    {
      q: "What if I do not have an angle wrench?",
      a: "The manual gives 103–113 N·m only as the alternative for that case. Never estimate the final angle visually — use the published torque alternative instead.",
    },
    {
      q: "Do the small M6 bolts use the same specification?",
      a: "No. The M6 end bolts have a separate 9–12 N·m specification and must never receive the M12 stages.",
    },
  ],
  "nissan/sr20det/head-bolt-torque": [
    {
      q: "What is the head bolt torque on an SR20DET?",
      a: "For the 1994 S14 procedure: tighten the ten main bolts to 39 N·m (29 lb-ft), then 78 N·m (58 lb-ft), loosen them completely, retighten to 34–44 N·m (25–33 lb-ft), then turn each bolt 90–95° in sequence.",
    },
    {
      q: "How do I know if an SR20DET head bolt is stretched?",
      a: "Replace any bolt longer than the 158.2 mm (6.228 in) limit. That published length is the reuse criterion for this engine.",
    },
    {
      q: "Can I do the final angle as one 180–190° turn?",
      a: "No. If you are using the manual's paint-mark alternative rather than an angle wrench, complete one 90–95° pass — do not attempt the total at once.",
    },
    {
      q: "Does this cover an S13 or S15 SR20DET?",
      a: "No. These stages are tied to the S14 workshop manual. S13 and S15 market revisions, GTi-R transverse installations, replacement blocks or heads, nonstandard gaskets and aftermarket studs must be checked against their own documentation.",
    },
  ],
  "pontiac/400/head-bolt-torque": [
    {
      q: "What is the head bolt torque on a Pontiac 400?",
      a: "The cited 1968 Pontiac service manual specifies 95 lb-ft (129 N·m) for the traditional Pontiac V8 cylinder-head bolts, with the matching production-style iron head, factory-type bolt and manual-specified thread condition.",
    },
    {
      q: "In what order should Pontiac head bolts be tightened?",
      a: "Center outward, using the exact numbered Pontiac pattern, approaching 95 lb-ft through even passes rather than tightening any bolt to full value alone.",
    },
    {
      q: "Does 95 lb-ft apply to a Ram Air engine or aluminum heads?",
      a: "No. Ram Air variations, later emissions-era revisions, aftermarket aluminum heads, studs and Chevrolet-engine swaps all require separate documentation, even though they may sit in a Pontiac chassis.",
    },
    {
      q: "Can aftermarket fastener lubricant affect the result?",
      a: "Yes, materially. Lubricant changes the clamp load produced at a given torque, so a stud or bolt kit's own instructions replace the factory value rather than supplementing it.",
    },
  ],
  "subaru/fa20/head-bolt-torque": [
    {
      q: "What is the head bolt torque on a Subaru FA20?",
      a: "For the naturally aspirated BRZ FA20: oil the six main bolt threads and washers, tighten in order to 20 N·m (14.8 lb-ft), then 100 N·m (73.8 lb-ft), loosen each 360°, retighten to 20 N·m and then 42 N·m (31.0 lb-ft), then complete the angle turns.",
    },
    {
      q: "What are the FA20's angle stages?",
      a: "After the 42 N·m stage, turn all six bolts 100° in sequence. The two designated bolts then receive another 100°, while the other four receive another 50° — so the final angle is position-specific, not uniform.",
    },
    {
      q: "Does this cover the turbo FA20DIT?",
      a: "No. These stages apply to the FA20D/4U-GSE BRZ-style engine in the linked service manual. The turbo FA20DIT in the WRX and Forester, the later FA24 engines and aftermarket studs all use different procedures.",
    },
    {
      q: "What if a bolt makes a stick-slip noise while tightening?",
      a: "Restart the specified preparation for that bolt rather than continuing. Use the factory angle tool and order for each bank.",
    },
  ],
  "toyota/2jz-gte/head-bolt-torque": [
    {
      q: "What is the head bolt torque on a 2JZ-GTE?",
      a: "The 1997 Toyota Supra repair manual specifies 34 N·m (25 lb-ft) for the oiled factory bolts, reached in several passes, followed by 90° and another 90° in the illustrated 14-bolt sequence.",
    },
    {
      q: "Are the plate washers required?",
      a: "Yes — all 14, one under every bolt head. They are part of the specified joint, not an optional part.",
    },
    {
      q: "When should a 2JZ-GTE head bolt be replaced?",
      a: "Replace any bolt that breaks, deforms, or cannot meet the initial torque requirement.",
    },
    {
      q: "How do I verify the angle stages?",
      a: "Paint-mark the bolt heads before both angle turns; when the procedure is complete the marks finish toward the rear. Aftermarket stud kits do not use the factory angle stages at all — follow the stud maker's procedure instead.",
    },
  ],
  "toyota/4age/head-bolt-torque": [
    {
      q: "What is the head bolt torque on a Toyota 4A-GE?",
      a: "For the later 4A-GE revision in Toyota's repair manual: oil the bolt threads and undersides, tighten the ten bolts to 29 N·m (22 lb-ft) in several even passes, then turn each bolt 90° and another 90° in sequence.",
    },
    {
      q: "Does an AE86-era 4A-GE use the same procedure?",
      a: "Not necessarily — early 4A-GE engines can use a different final-torque procedure. Never merge an early single-torque chart with the later angle procedure; confirm the engine and year before assembly.",
    },
    {
      q: "Are all 4A-GE head bolts the same length?",
      a: "No. Toyota identifies two bolt lengths, and the positions must not be interchanged.",
    },
    {
      q: "How are the angle turns verified?",
      a: "With paint marks on the bolt heads, checked after each of the two 90° stages. Inspect the bolts against the manual's dimensional limits before reuse.",
    },
  ],
};
