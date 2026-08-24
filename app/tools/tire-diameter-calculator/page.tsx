import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { rimWidthRange, tireRimAssociation, yokohamaSidewall } from "../tool-sources";
import { TireDiameterCalculator } from "./ui";

const tool = toolBySlug("tire-diameter-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Overall diameter is the one tire dimension that decides almost everything else — ride height, gearing, speedometer accuracy, and whether the tire clears the arch. It is also the one dimension a metric tire size does not tell you. This calculates it from a size, and then does the harder and more useful thing: takes a height you want and lists the sizes that actually reach it."
      steps={[
        {
          title: "Decide which direction you need",
          detail:
            "If you have a size and want its height, use the first mode. If you know the height you want — a 33-inch tire, say — use the second, because that is the question you cannot answer by reading a sidewall.",
        },
        {
          title: "For a reverse lookup, fix the rim first",
          detail:
            "Rim diameter constrains everything. A 33-inch tire on a 17-inch wheel needs eight inches of sidewall; on a 20-inch wheel it needs six and a half. Set the wheel you intend to keep before searching.",
        },
        {
          title: "Read the difference column, not just the size",
          detail:
            "Manufactured sizes come in fixed steps, so an exact match rarely exists. What matters is how close the nearest real size gets and whether that lands inside the 3% envelope.",
        },
        {
          title: "Check the section width you are being offered",
          detail:
            "Two sizes can reach the same height with very different widths. The rim-width column shows the band each section width is designed for, which is often what rules a candidate out.",
        },
        {
          title: "Verify against the vehicle before ordering",
          detail:
            "A calculated diameter is a nominal figure. Measure the actual arch clearance at full lock and full compression, particularly on a reverse lookup where you are deliberately aiming for a taller tire.",
        },
      ]}
      formula={[
        {
          label: "Overall diameter",
          expression: "diameter (in) = rim (in) + 2 × (width (mm) × aspect ÷ 100 ÷ 25.4)",
          note: "Two sidewalls plus the rim. The doubling is what makes aspect ratio changes so influential.",
        },
        {
          label: "Sidewall needed for a target",
          expression: "sidewall (in) = (target diameter − rim) ÷ 2",
          note: "The reverse lookup starts here — it is the height each sidewall has to provide.",
        },
        {
          label: "Aspect ratio needed",
          expression: "aspect = sidewall (in) × 25.4 ÷ width (mm) × 100",
          note: "For a given section width, this is the aspect ratio that reaches the target. Real sizes only come in steps of five, which is why exact matches are rare.",
        },
        {
          label: "Radius",
          expression: "radius = diameter ÷ 2",
          note: "The unloaded figure. Loaded rolling radius is slightly less, because the tire flattens where it meets the road.",
        },
      ]}
      sections={[
        {
          heading: "Why a diameter is easy to want and hard to buy",
          paragraphs: [
            "Nobody walks into a tire shop asking for 32.7 inches. But plenty of people arrive knowing they want something around 33 inches, because that is how height gets discussed — in whole inches, in fitment threads, in lift kit instructions.",
            "The problem is that metric tires are not sold by height. They are sold by section width and aspect ratio, and the height is a consequence of those two. So the question 'what size gives me 33 inches' has no direct answer; it has a list of candidates, each landing slightly above or below.",
            "That list is also shorter than people expect, because both inputs come in fixed steps. Section widths run in tens of millimetres and aspect ratios in fives, so on any given rim there are only a few dozen combinations that exist at all, and only a handful land near any particular height.",
            "This is exactly why the reverse lookup is worth having. Working forwards from a target by hand means guessing a width, calculating, adjusting, and repeating — and it is easy to converge on a size nobody manufactures.",
          ],
        },
        {
          heading: "The rim decides how much sidewall you have to find",
          paragraphs: [
            "Overall diameter is rim diameter plus two sidewalls, so the wheel sets the starting point and the sidewalls have to make up the difference.",
            "Reaching 33 inches on a 17-inch wheel means finding 8 inches of sidewall — 4 inches per side, or about 102 mm. On a 20-inch wheel the same target needs only 6.5 inches total, 3.25 per side. On a 22-inch wheel, 5.5 inches.",
            "That has a practical consequence: the larger the wheel, the fewer sizes can reach a tall target, because you need a low aspect ratio on a wide section and those combinations run out. It is why serious off-road fitments tend to stay on 17-inch wheels. A tall tire needs somewhere to put its sidewall.",
            "It also runs the other way. On a small wheel, a modest-looking aspect ratio produces a very tall tire, which is how a 15-inch wheel ends up carrying a 31-inch tire without anything looking unusual.",
          ],
        },
        {
          heading: "Diameter is not the whole fitment question",
          bullets: [
            "Two sizes at the same height can differ by two inches in section width",
            "Every section width has an approved rim-width band, so the wheel you own may rule one out",
            "Only half the diameter increase becomes ground clearance; the other half fills the arch",
            "Width is what contacts the strut inboard and the liner outboard",
            "Load rating must still meet the vehicle placard, and it falls as sidewalls shorten",
            "A taller tire changes gearing and speedometer accuracy by the same percentage as the height",
          ],
        },
        {
          heading: "Nominal against measured, and why they differ",
          paragraphs: [
            "Every figure this tool produces is calculated from the marked size, and marked sizes are nominal. Real tires differ, and knowing why keeps expectations sensible.",
            "Manufacturing tolerance accounts for some of it — two tires of the same size from different makers can differ by several millimetres in overall diameter, because the standards define a target rather than an exact value. Tread pattern accounts for more: an aggressive off-road tread has deeper blocks than a highway tread, and that depth is part of the diameter.",
            "Then there is wear. A tire loses height as it wears, roughly the depth of the tread lost, doubled — so a tire worn from 12/32 to 4/32 has shed about half an inch of diameter. Inflation pressure moves it a little further, and load flattens the contact patch so the loaded radius is always slightly less than half the unloaded diameter.",
            "None of this makes the calculation wrong. It means the calculated figure is the right number for planning and comparing, and a tape measure across an actual mounted tire is the right number for a fitment with no margin left.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate tire diameter?",
          answer:
            "Multiply the section width by the aspect ratio, divide by 100 for the sidewall in millimetres, divide by 25.4 for inches, then add two sidewalls to the rim diameter. A 265/70R17 works out at about 31.6 inches.",
        },
        {
          question: "What size tire is 33 inches?",
          answer:
            "On a 17-inch wheel, 285/70R17 at 32.7 inches and 315/70R17 at 34.4 are the usual candidates, with nothing landing exactly on 33. Use the reverse lookup above with your own rim to see the full list.",
        },
        {
          question: "How tall is a 265/70R17?",
          answer:
            "About 31.6 inches in overall diameter, with 7.3 inches of sidewall on each side and a section width of 10.4 inches.",
        },
        {
          question: "Why is there no exact size for my target diameter?",
          answer:
            "Because section widths come in steps of ten millimetres and aspect ratios in steps of five. Only a limited set of combinations exists, so the practical answer is the closest manufactured size rather than an exact one.",
        },
        {
          question: "Does a bigger rim mean a bigger overall diameter?",
          answer:
            "Not necessarily. Plus-sizing pairs a larger rim with a shorter sidewall specifically to keep the overall diameter roughly the same. The rim is only one of the three figures that set the height.",
        },
        {
          question: "How much does tread wear change tire diameter?",
          answer:
            "Roughly twice the tread depth lost. Wearing from 12/32 to 4/32 of an inch removes about half an inch of overall diameter, which is enough to shift speedometer readings slightly.",
        },
        {
          question: "Is loaded radius the same as half the diameter?",
          answer:
            "No, it is slightly less. The tire flattens where it contacts the road under load, so the distance from axle centre to ground is a little shorter than the unloaded radius.",
        },
        {
          question: "Why can I not get a tall tire on a 22-inch wheel?",
          answer:
            "Because the sidewall has less room to work with. A 33-inch target on a 22-inch rim needs only 5.5 inches of total sidewall, and the wide, low-profile combinations that produce it quickly stop being manufactured.",
        },
      ]}
      sources={[tireRimAssociation, rimWidthRange, yokohamaSidewall]}
    >
      <TireDiameterCalculator />
    </ToolPage>
  );
}
