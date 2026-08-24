import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { iso5775, rimWidthRange, tireRimAssociation } from "../tool-sources";
import { BoltPatternCalculator } from "./ui";

const tool = toolBySlug("bolt-pattern-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="A bolt pattern is two facts: how many studs there are, and the diameter of the circle their centres sit on. The trouble is that the same circle gets written in millimetres in one catalogue and inches in another, and that some patterns sit close enough together to thread a wheel on while holding it off-centre. This converts between the units, works the pattern out from a measurement, and separates genuinely interchangeable patterns from dangerously similar ones."
      steps={[
        {
          title: "Count the studs first",
          detail:
            "Lug count is never interchangeable. A five-lug wheel does not go on a six-lug hub under any circumstances, and no adapter makes that a good idea on a road vehicle.",
        },
        {
          title: "Use the known pattern if you have it",
          detail:
            "Most wheels have it stamped on the back, and most vehicle documentation lists it. Enter it directly and the tool gives you both unit forms plus the compatibility picture.",
        },
        {
          title: "Otherwise measure between adjacent studs",
          detail:
            "Centre to centre on two neighbouring studs, in millimetres. The tool works the pitch circle backwards from that, which avoids the awkward across-the-hub measurement entirely.",
        },
        {
          title: "Read the compatibility table carefully",
          detail:
            "Only the row marked as the same circle is interchangeable. Everything else in the list is there as a warning, not a suggestion — those are the patterns close enough to mislead you.",
        },
        {
          title: "Check the rest of the fitment",
          detail:
            "Pattern is necessary and nowhere near sufficient. Centre bore, offset, brake clearance and load rating all have to work too, and any one of them can rule a wheel out.",
        },
      ]}
      formula={[
        {
          label: "Adjacent stud spacing from PCD",
          expression: "chord = PCD × sin(180° ÷ number of lugs)",
          note: "The straight-line distance between two neighbouring stud centres. On a 5x114.3 that is 67.18 mm.",
        },
        {
          label: "PCD from a stud measurement",
          expression: "PCD = chord ÷ sin(180° ÷ number of lugs)",
          note: "The same relationship reversed, and the reason you never have to measure across an odd-lug hub.",
        },
        {
          label: "Millimetres to inches",
          expression: "PCD (in) = PCD (mm) ÷ 25.4",
          note: "114.3 mm is exactly 4.5 inches, which is why 5x114.3 and 5x4.5 are the same pattern.",
        },
        {
          label: "Interchangeability threshold",
          expression: "|difference| ≤ 0.5 mm → same circle",
          note: "Inside half a millimetre the studs line up within normal tolerance. Outside it, they do not, however easily the wheel threads on.",
        },
      ]}
      sections={[
        {
          heading: "Why five-lug patterns are the awkward ones",
          paragraphs: [
            "On an even-lug hub the pitch circle diameter is easy to measure: studs sit directly opposite each other, so you measure straight across from one centre to the opposite centre and you have it.",
            "Five lugs have no opposite stud. Nothing sits across from anything, which is why the traditional method is a fiddly measurement from the centre of one stud to the far edge of the stud two positions away — and why people get it wrong.",
            "The reliable approach is to measure between two adjacent studs instead, centre to centre, and calculate the pitch circle from that. The relationship is fixed: the chord between neighbours is the pitch circle multiplied by the sine of 180 degrees divided by the lug count. For five lugs that factor is 0.5878, so a 67.18 mm gap means a 114.3 mm circle.",
            "This matters because the patterns that get confused are only a millimetre or two apart. A measurement that is 2 mm out is enough to identify the wrong pattern entirely, and the wrong pattern is exactly the failure this tool exists to prevent.",
          ],
        },
        {
          heading: "The patterns that are close enough to be dangerous",
          paragraphs: [
            "This is the part most bolt pattern tools leave out, and it is the part that damages wheels.",
            "Around the 5-lug 110 to 120 mm range there are at least five distinct patterns: 110, 112, 114.3, 115 and 120. The gap between 5x114.3 and 5x115 is seven tenths of a millimetre. A wheel with one pattern will start onto studs of the other, and the lug nuts will turn, and it will feel as though it fits.",
            "It does not. The wheel is being pulled off centre by a fraction of a millimetre at each stud, which loads every stud in bending rather than tension. The consequences arrive later, as elongated stud holes, loosening lug nuts, vibration, and eventually sheared studs at speed.",
            "The rule is simple and worth holding to: within about half a millimetre the patterns are the same circle expressed two ways, and interchangeable. Beyond that they are different patterns, and the fact that a nut will thread on tells you nothing at all.",
          ],
        },
        {
          heading: "What else has to line up",
          bullets: [
            "Centre bore — the hole must clear the hub, and rings only correct an oversized bore, never an undersized one",
            "Offset and backspacing — the right pattern in the wrong position still rubs",
            "Brake clearance — caliper shape rules out many wheels that bolt on perfectly",
            "Stud or bolt thread size and seat type, which must match the lug nuts you are using",
            "Load rating, which matters most on trucks and anything that tows",
            "Tightening torque, which is a vehicle specification rather than a wheel one",
          ],
        },
        {
          heading: "Why the two unit systems both persist",
          paragraphs: [
            "The split is historical rather than technical, and it survives because both notations describe real hardware that is still in service.",
            "Imperial patterns came first in North America, which is why so many round numbers appear in inches: 5x4.5, 5x4.75, 5x5, 5x5.5, 6x5.5, 8x6.5. Converted to millimetres those become the awkward-looking 114.3, 120.65, 127, 139.7, 139.7 and 165.1 — numbers that look arbitrary until you divide them by 25.4.",
            "Metric patterns from European and Japanese manufacturers do the reverse: 100, 108, 112, 120 and 130 are clean in millimetres and untidy in inches.",
            "The practical consequence is that a pattern which looks unfamiliar may simply be one you know, written the other way. Before concluding that a wheel does not fit, convert — a great many apparent mismatches are the same circle under a different name.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I measure a 5-lug bolt pattern?",
          answer:
            "Measure centre to centre between two adjacent studs, then divide by 0.5878 to get the pitch circle diameter. On a 5x114.3 the adjacent spacing is 67.18 mm. Five-lug hubs have no opposite stud, so this is more reliable than measuring across.",
        },
        {
          question: "Is 5x114.3 the same as 5x4.5?",
          answer:
            "Yes, exactly. 114.3 mm divided by 25.4 is precisely 4.5 inches — the same circle written in two unit systems.",
        },
        {
          question: "Will a 5x115 wheel fit a 5x114.3 hub?",
          answer:
            "No. The patterns are 0.7 mm apart, which is enough to thread the nuts on while holding the wheel off centre. That loads the studs in bending and leads to elongated holes, loosening nuts and eventually sheared studs.",
        },
        {
          question: "How close do two bolt patterns have to be to interchange?",
          answer:
            "Within about half a millimetre. Inside that the studs line up within normal manufacturing tolerance. Beyond it they do not, regardless of whether the wheel appears to bolt up.",
        },
        {
          question: "What does PCD mean?",
          answer:
            "Pitch circle diameter — the diameter of the imaginary circle passing through the centre of every stud or bolt hole. It is the second number in a designation like 5x114.3.",
        },
        {
          question: "Can I use adapters to change bolt pattern?",
          answer:
            "They exist, and they move the wheel outboard by their own thickness while adding a bolted joint into the load path. On a road vehicle that is a decision to make deliberately, with correctly rated hardware and adequate remaining stud engagement.",
        },
        {
          question: "Does bolt pattern determine whether a wheel fits?",
          answer:
            "Only partly. Centre bore, offset, brake clearance, thread size, seat type and load rating all have to work as well. Pattern is the first check, not the last.",
        },
        {
          question: "Why are truck patterns quoted in inches so often?",
          answer:
            "Because they were designed in inches. 6x5.5 and 8x6.5 are clean imperial figures that become 139.7 mm and 165.1 mm when converted, which is why those metric numbers look so arbitrary.",
        },
      ]}
      sources={[tireRimAssociation, iso5775, rimWidthRange]}
    >
      <BoltPatternCalculator />
    </ToolPage>
  );
}
