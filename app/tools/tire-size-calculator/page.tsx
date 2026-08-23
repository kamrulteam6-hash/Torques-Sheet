import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { TireSizeCalculator } from "./ui";

const tool = toolBySlug("tire-size-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="A tire size is three measurements written in two different units, which is why it is so easy to misread. Enter the size and this works out the overall diameter, the sidewall height, the section width, the rolling circumference and the revolutions per mile — the five numbers that actually decide whether a tire fits and how the vehicle behaves on it."
      steps={[
        {
          title: "Read the size off the sidewall, not the invoice",
          detail:
            "The size is moulded into the rubber in the form 225/65R17. What is fitted now is not always what the vehicle left the factory with, so take the number from the tire in front of you.",
        },
        {
          title: "Type it in any format you like",
          detail:
            "225/65R17, 225 65 17, P225/65R17 and LT225/65R17 all resolve to the same geometry. The service prefix describes the tire's intended duty, not its dimensions.",
        },
        {
          title: "Read the overall diameter first",
          detail:
            "This is the number that matters most. It sets ride height, gearing, speedometer accuracy and whether the tire clears the arch at full lock.",
        },
        {
          title: "Check revolutions per mile against your current size",
          detail:
            "The speedometer and odometer are both calibrated to a specific revs-per-mile figure. Change it and both readings shift by the same proportion.",
        },
        {
          title: "Compare before you commit",
          detail:
            "If you are changing size rather than replacing like for like, run both sizes through the comparison tool. A size that looks close on paper can be an inch taller in practice.",
        },
      ]}
      formula={[
        {
          label: "Sidewall height",
          expression: "sidewall (in) = section width (mm) × aspect ÷ 100 ÷ 25.4",
          note: "The aspect ratio is a percentage of the section width, not a fixed measurement. That is why a 45-series tire on a 275 section is taller than a 45-series tire on a 225.",
        },
        {
          label: "Overall diameter",
          expression: "diameter (in) = rim (in) + 2 × sidewall (in)",
          note: "Two sidewalls, because there is one above the wheel and one below it.",
        },
        {
          label: "Rolling circumference",
          expression: "circumference (in) = π × diameter (in)",
          note: "The distance covered in one revolution, ignoring the small flattening under load.",
        },
        {
          label: "Revolutions per mile",
          expression: "revs per mile = 63,360 ÷ circumference (in)",
          note: "63,360 is the number of inches in a mile. This figure is what the speedometer and odometer are calibrated against.",
        },
      ]}
      sections={[
        {
          heading: "Why the aspect ratio catches people out",
          paragraphs: [
            "The first number in a metric tire size is a width in millimetres. The last number is a rim diameter in inches. The middle number is neither — it is a percentage.",
            "That mixed notation is the source of most sizing mistakes. A 55-series tire does not have a 55 mm sidewall; it has a sidewall equal to 55% of its section width. So 225/55R17 has a 123.75 mm sidewall, while 275/55R17 has a 151.25 mm one. Same aspect ratio, sidewalls nearly 28 mm apart, and an overall diameter difference of well over two inches.",
            "This is also why widening a tire without lowering the aspect ratio makes it taller. If you go from 225/55R17 to 245/55R17, you have not just added 20 mm of width — you have added 11 mm of sidewall at each end and roughly 0.87 inches of overall diameter. That is often the difference between clearing an inner liner and rubbing on it.",
          ],
        },
        {
          heading: "Flotation sizes work the other way round",
          paragraphs: [
            "Light-truck tires are frequently sold in flotation sizing instead: 33x12.50R15. Here the notation is far more direct, because every figure is already in inches.",
            "The first number is the overall diameter — 33 inches. The second is the section width — 12.5 inches. The last is the rim diameter, 15 inches. There is no aspect ratio to calculate, because the diameter is stated outright.",
            "That makes flotation sizes easier to reason about but harder to compare with metric ones, which is exactly what this calculator is for. It converts both notations into the same set of measurements so you can put a 285/70R17 and a 33x12.50R17 next to each other honestly. In that particular case they are within a quarter of an inch of each other, which surprises a lot of people.",
          ],
        },
        {
          heading: "What overall diameter actually controls",
          bullets: [
            "Ride height — half the diameter change appears at the axle, so a 1-inch taller tire lifts the vehicle half an inch",
            "Effective gearing — a taller tire acts like a numerically lower axle ratio, dulling acceleration and lowering cruising RPM",
            "Speedometer and odometer accuracy, both of which shift by the same percentage as the diameter",
            "Arch and suspension clearance, particularly at full steering lock and full suspension compression",
            "Anti-lock braking and stability control, which infer wheel speed from a calibrated rolling radius",
            "Load rating and pressure requirements, which change with the air volume the tire encloses",
          ],
        },
        {
          heading: "The 3% rule, and where it comes from",
          paragraphs: [
            "The convention across the industry is that a replacement size should stay within about 3% of the original overall diameter. It is not a legal limit in most places, and it is not a hard engineering boundary — it is a practical tolerance.",
            "It exists because 3% is roughly where several things start to matter at once. Speedometer error becomes noticeable rather than academic. Clearance margins designed around the original size start being consumed. And systems that infer vehicle speed from wheel rotation begin working with an assumption that is measurably wrong.",
            "Inside 3% you are generally making a change the vehicle can absorb. Outside it, you are making a modification, and the honest approach is to treat it as one — check clearance physically, expect the speedometer to be off, and consider whether recalibration or a gearing change is warranted.",
          ],
        },
      ]}
      faqs={[
        {
          question: "What does 225/65R17 mean?",
          answer:
            "225 is the section width in millimetres. 65 is the aspect ratio — the sidewall height as a percentage of that width, so 146.25 mm here. R means radial construction. 17 is the rim diameter in inches. Overall diameter works out to about 28.5 inches.",
        },
        {
          question: "How do I calculate tire diameter from the size?",
          answer:
            "Multiply the section width by the aspect ratio and divide by 100 to get the sidewall in millimetres, convert to inches by dividing by 25.4, then add two sidewalls to the rim diameter. The calculator above does exactly this.",
        },
        {
          question: "Does the P or LT prefix change the size?",
          answer:
            "No. P indicates a passenger-rated tire and LT a light-truck one. They describe load capability and construction, not geometry, so a P225/65R17 and an LT225/65R17 measure the same.",
        },
        {
          question: "How much bigger can I go without problems?",
          answer:
            "The usual guidance is within 3% of the original overall diameter. Beyond that, speedometer error becomes noticeable and clearance margins designed around the original size start being used up.",
        },
        {
          question: "Is a 33-inch tire the same as 285/70R17?",
          answer:
            "Very nearly. A 285/70R17 calculates to about 32.7 inches, so it is within half an inch of a nominal 33. That is why the two are commonly treated as interchangeable, though the section widths differ.",
        },
        {
          question: "Why is my tire not exactly the calculated diameter?",
          answer:
            "Because the size is nominal. Manufacturing tolerances, tread depth, inflation pressure and load all move the real figure by a few millimetres. Calculated diameter is the right number for planning; a tape measure is the right number for a tight fitment.",
        },
        {
          question: "What are revolutions per mile used for?",
          answer:
            "It is the figure the speedometer and odometer are calibrated against. If your new tire turns fewer times per mile than the original, the speedometer will read lower than your true speed by the same proportion.",
        },
        {
          question: "Can I put a wider tire on the same wheel?",
          answer:
            "Often, within a range — each rim width suits a band of section widths. But widening without reducing the aspect ratio also makes the tire taller, which is the part people forget. Check both dimensions, not just the width.",
        },
      ]}
    >
      <TireSizeCalculator />
    </ToolPage>
  );
}
