import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation, uneceR39 } from "../tool-sources";
import { GearRatioCalculator } from "./ui";

const tool = toolBySlug("gear-ratio-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Tire diameter and axle ratio do the same job from opposite ends. Both decide how many times the engine turns for each turn of the wheel, which is why fitting taller tires feels like losing a gear — and why a regear can hand it back. This works out cruising RPM on either size and the axle ratio that returns the engine to where it started."
      steps={[
        {
          title: "Find your current axle ratio",
          detail:
            "It is stamped on a tag at the differential cover on most vehicles, and encoded in the axle code on the door sticker. If you are unsure, count driveshaft turns against one full wheel rotation — the ratio is the answer.",
        },
        {
          title: "Choose the gear you actually cruise in",
          detail:
            "Enter 1.00 for a direct-drive gear, or your overdrive ratio for highway cruising. Modern eight and ten-speed transmissions have deep overdrives, so entering 1.00 will overstate real cruising RPM considerably.",
        },
        {
          title: "Enter both tire sizes",
          detail:
            "The calculation is driven by overall diameter rather than by how the sizes read, so a metric size and a flotation size can be compared directly.",
        },
        {
          title: "Read the RPM difference at your usual speed",
          detail:
            "This is the figure that tells you whether the change is worth worrying about. A drop of a hundred RPM is barely noticeable; a drop of five hundred changes how the vehicle drives.",
        },
        {
          title: "Compare the ideal ratio against what you can buy",
          detail:
            "The calculated ratio is rarely one that exists. The tool shows the nearest commonly available ratio and how much error it leaves, which is the practical decision.",
        },
      ]}
      formula={[
        {
          label: "Engine speed",
          expression: "RPM = (MPH × gear ratio × axle ratio × 1056) ÷ (π × tire diameter)",
          note: "1056 folds together inches per mile and minutes per hour: 63,360 ÷ 60.",
        },
        {
          label: "Road speed",
          expression: "MPH = (RPM × π × tire diameter) ÷ (gear ratio × axle ratio × 1056)",
          note: "The same relationship rearranged, useful for working out top speed in a given gear.",
        },
        {
          label: "Equivalent axle ratio",
          expression: "new ratio = current ratio × (new diameter ÷ old diameter)",
          note: "Taller tires need a numerically higher ratio to restore the original engine speed.",
        },
        {
          label: "Effective gearing change",
          expression: "change (%) = (new diameter − old diameter) ÷ old diameter × 100",
          note: "A 10% taller tire has the same effect as a 10% numerically lower axle ratio.",
        },
      ]}
      sections={[
        {
          heading: "Why taller tires feel like losing a gear",
          paragraphs: [
            "Between the engine and the road there is a chain of ratios: the transmission gear, the axle ratio, and then the tire, which is a ratio too even though nobody writes it as one.",
            "A tire converts rotation into distance. A taller tire covers more ground per revolution, so for a given road speed it turns fewer times per minute — and everything upstream of it, including the engine, turns proportionally more slowly.",
            "That is why fitting taller tires reduces cruising RPM without touching the drivetrain, and why it dulls acceleration. The engine is being asked to move the vehicle through a longer effective gear, exactly as if someone had fitted a numerically lower axle ratio while you were not looking.",
            "The relationship is exact and symmetrical: a 10% taller tire is a 10% numerically lower axle ratio, and a 10% numerically higher axle ratio cancels it out. That symmetry is what makes regearing a genuine solution rather than a workaround.",
          ],
        },
        {
          heading: "When regearing is actually worth it",
          paragraphs: [
            "Not every size change justifies opening a differential. The honest threshold depends far more on how the vehicle is used than on the percentage itself.",
            "Under about 3%, almost nobody regears. The engine barely notices, and a modern transmission with many closely spaced ratios absorbs the difference by shifting slightly differently.",
            "Between 3% and 10%, it depends. A vehicle that commutes will simply feel a little lazier off the line and slightly more relaxed at speed, which some owners prefer. A vehicle that tows, carries load, or spends time on gradients will feel it as genuine strain — the transmission hunting between gears, higher torque converter slip, and more heat.",
            "Above 10%, regearing becomes the normal answer for anything that works for a living. At that point the transmission is being operated outside the range its calibration expects, and the consequences show up as heat and wear rather than as anything you can hear.",
          ],
        },
        {
          heading: "Reading the ratio you actually have",
          bullets: [
            "A metal tag under a differential cover bolt carries the ratio on most rear axles",
            "The door sticker axle code maps to a ratio in the vehicle's own documentation",
            "Counting driveshaft revolutions per single wheel turn gives it directly — 3.55 turns means 3.55:1",
            "Limited-slip and locking differentials do not change the ratio, only how torque is split",
            "Front and rear ratios must match on a four-wheel-drive vehicle, so both axles get regeared",
            "Transmission gear ratios are published per model — the overdrive ratio is the one that matters for cruising",
          ],
        },
        {
          heading: "Why the perfect ratio usually does not exist",
          paragraphs: [
            "Run the numbers on almost any tire change and the ratio that exactly restores the original engine speed will be something like 3.87 or 4.21 — figures nobody manufactures.",
            "Ring and pinion sets come in a fixed set of tooth counts, which is why the available ratios cluster around familiar numbers: 3.55, 3.73, 4.10, 4.56, 4.88. The practical decision is which side of your calculated figure to land on.",
            "Going numerically higher than the calculated figure over-corrects, giving slightly livelier acceleration and slightly higher cruising RPM than stock. Going lower under-corrects, leaving some of the original loss in place. For a truck that tows, over-correcting is usually the better error; for a vehicle that mostly cruises, under-correcting keeps the engine quieter.",
            "The tool shows how much error the nearest available ratio leaves so that choice is made with a number rather than a feeling.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate RPM from gear ratio and tire size?",
          answer:
            "Multiply road speed by the transmission gear ratio, the axle ratio and 1056, then divide by π times the tire diameter in inches. The constant converts inches per mile into minutes per hour.",
        },
        {
          question: "What gear ratio do I need for 35-inch tires?",
          answer:
            "Multiply your current axle ratio by 35 divided by your current tire diameter. Going from 32-inch tires on a 3.55 axle, that gives about 3.88, so 3.73 or 4.10 would be the realistic choices either side.",
        },
        {
          question: "Do bigger tires lower my RPM?",
          answer:
            "Yes, in direct proportion to the diameter increase. A tire 10% taller reduces engine speed by 10% at any given road speed, because the wheel turns fewer times to cover the same distance.",
        },
        {
          question: "Is a higher gear ratio better for towing?",
          answer:
            "Numerically higher ratios — 4.10 rather than 3.55 — multiply torque more, which suits towing. The trade is higher cruising RPM and more fuel used when running empty.",
        },
        {
          question: "How much RPM change is too much?",
          answer:
            "Under about 150 RPM at cruising speed is barely noticeable. Beyond 400 or 500 you will feel the transmission working differently, and on a vehicle that tows that is the point at which regearing starts to pay for itself.",
        },
        {
          question: "What is the difference between axle ratio and gear ratio?",
          answer:
            "The axle ratio is the fixed final drive at the differential. The gear ratio is whichever transmission gear is currently engaged. Both multiply together, along with tire diameter, to set engine speed.",
        },
        {
          question: "Do I need to regear both axles on a 4x4?",
          answer:
            "Yes. Front and rear ratios must match, otherwise the axles fight each other whenever four-wheel drive is engaged, loading the transfer case continuously.",
        },
        {
          question: "Will regearing improve my fuel economy?",
          answer:
            "Sometimes, if oversized tires have pushed the engine out of its efficient range or made the transmission hunt between gears. Regearing to compensate for tires you have already fitted often recovers economy that the tire change cost you.",
        },
      ]}
      sources={[tireRimAssociation, fordDynoTips, uneceR39]}
    >
      <GearRatioCalculator />
    </ToolPage>
  );
}
