import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { iso5775, rimWidthRange, tireRimAssociation } from "../tool-sources";
import { WheelBackspacingCalculator } from "./ui";

const tool = toolBySlug("wheel-backspacing-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Backspacing and offset describe the same physical thing — where the mounting face sits within the width of the wheel — from two different reference points, in two different units. Older wheels and most American aftermarket catalogues quote backspacing in inches; almost everything modern quotes offset in millimetres. This converts between them in either direction, and shows what the number means on the wheel."
      steps={[
        {
          title: "Get the wheel width right first",
          detail:
            "Width is the bead seat measurement, not the overall rim width. It is normally cast into the wheel alongside the diameter, as in 17x8. Every conversion below depends on it.",
        },
        {
          title: "Choose which figure you already know",
          detail:
            "If you are reading a catalogue, you probably have offset. If you have measured a wheel on a bench, you have backspacing. The tool converts in whichever direction you need.",
        },
        {
          title: "Measure backspacing with a straight edge",
          detail:
            "Lay the wheel face down, put a straight edge across the inner flange, and measure straight down to the mounting pad. That distance is the backspacing.",
        },
        {
          title: "Check the result against the zero-offset figure",
          detail:
            "The tool shows what backspacing a centred wheel of your width would have. Comparing against that tells you immediately whether the wheel sits inboard or outboard of centre.",
        },
        {
          title: "Convert before comparing wheels",
          detail:
            "Never compare a backspacing figure against an offset figure directly. Put both into the same unit first — this is where most fitment mistakes originate.",
        },
      ]}
      formula={[
        {
          label: "Offset from backspacing",
          expression: "offset (mm) = (backspacing − (width + 1) ÷ 2) × 25.4",
          note: "Subtracting the centred backspacing gives the distance from the centreline, which is exactly what offset measures.",
        },
        {
          label: "Backspacing from offset",
          expression: "backspacing (in) = (width + 1) ÷ 2 + offset (mm) ÷ 25.4",
          note: "Start at the centre of the rim and move outboard by the offset.",
        },
        {
          label: "Zero-offset backspacing",
          expression: "centred backspacing (in) = (width + 1) ÷ 2",
          note: "Half the overall rim width. An 8-inch wheel with zero offset has 4.5 inches of backspacing.",
        },
        {
          label: "Front spacing",
          expression: "front spacing (in) = (width + 1) − backspacing",
          note: "The other half of the same measurement, and the figure that governs fender clearance.",
        },
      ]}
      sections={[
        {
          heading: "Where the extra inch comes from",
          paragraphs: [
            "Every formula on this page uses width plus one, and it is worth knowing why rather than taking it on faith.",
            "A wheel's stated width is the bead seat width — the distance between the two surfaces the tire beads actually sit on. It is not the overall width of the rim, because the flanges that retain the beads stand proud of those seats.",
            "Those flanges add roughly half an inch on each side, so an 8-inch wheel is about 9 inches across its outermost edges. Backspacing is measured from the inner flange, not the inner bead seat, which is why the conversion has to work from that overall figure.",
            "Get this wrong and every conversion is out by half an inch — which is more than enough to turn a wheel that clears into one that does not.",
          ],
        },
        {
          heading: "Why two systems exist at all",
          paragraphs: [
            "This is a historical split rather than a technical one, and knowing which world a specification came from prevents a lot of confusion.",
            "Backspacing in inches is the older American convention, and it persists throughout the domestic aftermarket — steel wheels, truck wheels and off-road catalogues still quote it routinely. It has a practical advantage: it is directly measurable with a straight edge and a ruler, no arithmetic required.",
            "Offset in millimetres is the European and Japanese convention, and it is what every original-equipment wheel now carries, stamped as ET followed by a number. It has a different advantage: because it is measured from the centreline, the sign tells you immediately which way the wheel sits without needing to know the width.",
            "The practical problem arrives when a vehicle's original wheels are specified in offset and the replacements are catalogued in backspacing. Comparing the two numbers directly is meaningless, and it is the origin of a great many wheels that arrive and do not fit.",
          ],
        },
        {
          heading: "Reading what the numbers imply",
          bullets: [
            "More backspacing pulls the wheel inboard, toward the strut and control arm",
            "Less backspacing pushes the wheel outboard, toward the fender",
            "Positive offset and high backspacing describe the same inboard position",
            "Negative offset and low backspacing describe the same outboard position",
            "A one-inch backspacing change equals about 25 mm of offset change",
            "Front spacing is what determines fender clearance, and it is simply the remainder",
          ],
        },
        {
          heading: "Measuring a wheel you already have",
          paragraphs: [
            "There is no need to trust a stamp you cannot find, because backspacing is genuinely easy to measure with a straight edge and a tape.",
            "Lay the wheel face down on a flat surface so the outboard face is against the ground and the mounting pad points upward. Lay a straight edge across the inner rim flange, spanning the barrel. Measure vertically from the straight edge down to the mounting pad — the flat annular surface that would contact the hub.",
            "That measurement is the backspacing, and putting it into the tool above with the wheel width gives you the offset. Two things to watch: measure to the mounting pad rather than to the centre bore or a raised centre section, and take the reading at more than one point around the wheel to confirm the straight edge is not rocking.",
            "For a wheel still on the vehicle, the same measurement can be taken through the spokes, though a stamped ET marking on the back of a spoke is quicker if you can find one.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I convert backspacing to offset?",
          answer:
            "Subtract half the overall rim width — that is wheel width plus one, divided by two — from the backspacing, then multiply by 25.4. The result is the offset in millimetres.",
        },
        {
          question: "What backspacing is zero offset?",
          answer:
            "Half the overall rim width. On an 8-inch wheel that is 4.5 inches; on a 10-inch wheel, 5.5 inches. The overall rim width is always about an inch more than the stated bead seat width.",
        },
        {
          question: "Why is the wheel width plus one in the formula?",
          answer:
            "Because stated width is the bead seat measurement, while backspacing is measured from the rim flange. The flanges stand roughly half an inch proud on each side, so the overall rim is about an inch wider than its stated size.",
        },
        {
          question: "Does more backspacing push the wheel in or out?",
          answer:
            "In. More backspacing moves the mounting face further outboard within the wheel, which pulls the wheel body inward toward the suspension.",
        },
        {
          question: "How do I measure backspacing at home?",
          answer:
            "Lay the wheel face down, put a straight edge across the inner flange, and measure straight down to the mounting pad. That distance is the backspacing — no calculation needed.",
        },
        {
          question: "Is backspacing the same as offset?",
          answer:
            "It describes the same physical position from a different reference point and in a different unit. Backspacing is measured in inches from the inner flange; offset in millimetres from the centreline.",
        },
        {
          question: "Which measurement should I use when buying wheels?",
          answer:
            "Whichever the seller quotes — but convert both wheels into the same unit before comparing them. Mixing a backspacing figure and an offset figure is the most common reason wheels arrive and do not fit.",
        },
        {
          question: "Does backspacing change if I fit a wider tire?",
          answer:
            "No. Backspacing is a property of the wheel alone. A wider tire changes where the rubber sits, which is what actually contacts things, but it does not move the wheel.",
        },
      ]}
      sources={[tireRimAssociation, rimWidthRange, iso5775]}
    >
      <WheelBackspacingCalculator />
    </ToolPage>
  );
}
