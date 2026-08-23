import Link from "next/link";
import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { COMPARISON_PAIRS, comparisonPairPath } from "./pairs";
import { TireSizeComparison } from "./ui";

const tool = toolBySlug("tire-size-comparison")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  const featured = COMPARISON_PAIRS.slice(0, 24);
  return (
    <ToolPage
      slug={tool.slug}
      intro="Two tire sizes can look almost identical written down and be an inch apart in practice. This puts them side by side to scale, then works out what the difference does to ride height, section width, speedometer accuracy and odometer readings — so the decision is made on numbers rather than on how the size reads."
      steps={[
        {
          title: "Start from what is actually fitted",
          detail:
            "Read the size off the sidewall rather than from paperwork. Previous owners change sizes, and comparing against the wrong baseline makes every figure below wrong too.",
        },
        {
          title: "Enter the size you are considering",
          detail:
            "Metric and flotation sizes can be mixed freely — comparing a 285/70R17 against a 33x12.50R17 is one of the more useful things this tool does.",
        },
        {
          title: "Look at the drawing before the table",
          detail:
            "The overlay is drawn to a shared scale. If the two circles look nearly identical, the change is minor regardless of how different the sizes read.",
        },
        {
          title: "Check the diameter change against the 3% line",
          detail:
            "Inside 3% is generally treated as a routine substitution. Outside it, treat the change as a modification and verify clearance physically.",
        },
        {
          title: "Read the speedometer consequence",
          detail:
            "The true-speed figure tells you how fast you are really going when the dial reads 60. That number matters for tickets, for fuel calculations and for warranty mileage.",
        },
      ]}
      formula={[
        {
          label: "Diameter change",
          expression: "change (%) = (new diameter − old diameter) ÷ old diameter × 100",
          note: "The single most important figure in the comparison. Speedometer error and odometer drift both follow it exactly.",
        },
        {
          label: "Ride height change",
          expression: "ride height change = diameter change ÷ 2",
          note: "Only half the diameter change appears as lift, because the other half is inside the wheel arch.",
        },
        {
          label: "True speed",
          expression: "true speed = indicated speed × (new diameter ÷ old diameter)",
          note: "A taller tire covers more ground per revolution, so the vehicle is going faster than the dial admits.",
        },
        {
          label: "Odometer drift",
          expression: "actual miles = indicated miles × (new diameter ÷ old diameter)",
          note: "Over a warranty period or a lease this compounds into a meaningful number.",
        },
      ]}
      sections={[
        {
          heading: "Why half the diameter change disappears",
          paragraphs: [
            "The most common mistake when planning a size change is assuming a one-inch bigger tire raises the vehicle by an inch. It does not. It raises it by half an inch.",
            "The reason is simple once you picture it. Overall diameter is measured across the whole tire, but the vehicle sits on the axle at the centre. Half the extra diameter goes downward, pushing the axle further from the ground; the other half goes upward, into the wheel arch.",
            "So a change from 32 inches to 34 inches — a substantial jump — yields one inch of extra ground clearance at the axle and one inch less space above the tire. That second half is where fitment problems live, and it is the half people forget to check.",
          ],
        },
        {
          heading: "Speedometer error is not a rounding issue",
          paragraphs: [
            "Speedometers infer road speed from how fast the wheels turn, using a rolling circumference figure fixed when the vehicle was calibrated. Change the tire and that assumption becomes wrong by exactly the proportion the diameter changed.",
            "A taller tire covers more ground per revolution than the calibration expects, so the vehicle is travelling faster than the dial shows. A 4% increase means an indicated 60 mph is really about 62.4 mph — enough to matter where enforcement tolerances are tight.",
            "The odometer inherits the same error. At 4% over, every indicated 1,000 miles is really 1,040. Across a three-year lease that is thousands of miles that never appear on the clock, and across a warranty period it works the other way if the tires are smaller than stock.",
            "Some vehicles allow the tire size to be recalibrated in software, either at a dealer or with an aftermarket tool. Where that option exists it is worth taking, because it corrects the speedometer, the odometer and anything else that derives speed from wheel rotation.",
          ],
        },
        {
          heading: "What to check when the change is more than 3%",
          bullets: [
            "Clearance at full steering lock in both directions, not just straight ahead",
            "Clearance at full suspension compression, which is where liners and mud flaps get caught",
            "Whether the section width change brings the tire closer to the strut or the control arm",
            "Whether the load rating still meets the vehicle's placard requirement",
            "Whether the vehicle allows a speedometer recalibration for the new size",
            "Whether the gearing still suits the vehicle, particularly on a truck that tows",
          ],
        },
        {
          heading: "Comparing metric against flotation sizes",
          paragraphs: [
            "This is where a comparison tool earns its keep, because the two notations are genuinely hard to compare mentally.",
            "A flotation size states its overall diameter outright: 33x12.50R17 is a nominal 33 inches tall and 12.5 inches wide on a 17-inch rim. A metric size hides its diameter behind a percentage calculation, so 285/70R17 gives no hint that it works out at roughly 32.7 inches.",
            "Put through the same arithmetic, those two sizes are within about a third of an inch of each other in height, while the flotation tire is a little wider. That is why they are so often cross-shopped — and why choosing between them usually comes down to width, load rating and what is available in the tread pattern you want, rather than height.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How much taller is one tire size than another?",
          answer:
            "Enter both sizes above and read the overall diameter difference. As a rule, each 10 mm of section width at the same aspect ratio adds roughly 0.1 inches of diameter, and each 5 points of aspect ratio adds considerably more.",
        },
        {
          question: "What is the 3% rule for tire sizes?",
          answer:
            "The convention that a replacement size should stay within 3% of the original overall diameter. Inside that band, speedometer error stays small and clearance margins are largely preserved.",
        },
        {
          question: "How much lift does a bigger tire give?",
          answer:
            "Half the diameter increase. A tire one inch larger in diameter raises the vehicle half an inch at the axle, and takes the other half inch out of the space above the tire.",
        },
        {
          question: "Will bigger tires make my speedometer wrong?",
          answer:
            "Yes, by the same percentage as the diameter change. Taller tires make the speedometer read low, meaning you are going faster than it shows. Some vehicles can be recalibrated for the new size.",
        },
        {
          question: "Is 285/70R17 the same as a 33-inch tire?",
          answer:
            "Close enough that they are routinely cross-shopped. A 285/70R17 calculates to about 32.7 inches against a nominal 33, so the height difference is under half an inch. The flotation tire is usually the wider of the two.",
        },
        {
          question: "Does a wider tire have to be taller?",
          answer:
            "Only if the aspect ratio stays the same. Because aspect ratio is a percentage of width, widening at a fixed aspect ratio adds sidewall too. Dropping the aspect ratio as you widen is how people keep the diameter constant.",
        },
        {
          question: "Do I need to change all four tires at once?",
          answer:
            "On an all-wheel-drive or four-wheel-drive vehicle, yes — mismatched rolling circumferences force the differentials and transfer case to work continuously. On a two-wheel-drive vehicle, match at least per axle.",
        },
        {
          question: "How does a size change affect my odometer?",
          answer:
            "In direct proportion to the diameter change. A 4% taller tire means every indicated 1,000 miles is actually about 1,040, so the vehicle accumulates real distance faster than the clock records it.",
        },
      ]}
    >
      <TireSizeComparison />

      <section className="article-section" id="popular-comparisons">
        <span className="kicker">ALREADY WORKED OUT</span>
        <h2>Popular tire size comparisons</h2>
        <p>
          These pages carry the full calculation for a specific pair, so you can send someone a link
          rather than a set of instructions. The calculator above handles any combination not listed.
        </p>
        <div className="pair-grid">
          {featured.map((pair) => (
            <Link href={comparisonPairPath(pair)} key={`${pair.from}-${pair.to}`}>
              <b>{pair.from}</b>
              <em>vs</em>
              <b>{pair.to}</b>
            </Link>
          ))}
        </div>
      </section>
    </ToolPage>
  );
}
