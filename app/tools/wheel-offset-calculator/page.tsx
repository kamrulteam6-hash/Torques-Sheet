import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { iso5775, rimWidthRange, tireRimAssociation } from "../tool-sources";
import { WheelOffsetCalculator } from "./ui";

const tool = toolBySlug("wheel-offset-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Offset is the one wheel specification people quote on its own, and it is the one that means least on its own. A +20 offset on a nine-inch wheel and a +20 on an eight-inch wheel sit in completely different places. What matters is where each edge of the wheel ends up — how far the outer face moves toward the fender, and how much closer the inner edge sits to the strut."
      steps={[
        {
          title: "Find your current wheel's specification",
          detail:
            "Offset is stamped on the back of the spokes or inside the barrel, usually as ET followed by a number in millimetres. Width is normally cast in alongside the diameter, as in 17x8.",
        },
        {
          title: "Enter both wheels, not just the new one",
          detail:
            "There is no such thing as a good offset in isolation. The only meaningful question is how the new wheel sits relative to what is on the vehicle now and known to fit.",
        },
        {
          title: "Read the inner edge figure first",
          detail:
            "Poke is visible and annoying; inner clearance is invisible and expensive. The strut, the control arm and the brake caliper are all on that side, and there is far less room there than at the fender.",
        },
        {
          title: "Account for the tire as well as the wheel",
          detail:
            "A wider tire on the same wheel adds section width, most of which appears on the outboard side as bulge. The wheel calculation is the starting point, not the whole answer.",
        },
        {
          title: "Measure before you commit",
          detail:
            "Turn the wheel to full lock in both directions and check the gap at the strut and inside the fender. A tape measure now is cheaper than a return shipment later.",
        },
      ]}
      formula={[
        {
          label: "Backspacing from offset",
          expression: "backspacing (in) = (wheel width + 1) ÷ 2 + offset (mm) ÷ 25.4",
          note: "The + 1 accounts for the rim flanges, which sit roughly half an inch outside the bead seat on each side.",
        },
        {
          label: "Offset from backspacing",
          expression: "offset (mm) = (backspacing − (width + 1) ÷ 2) × 25.4",
          note: "The same relationship reversed, for when you have measured a wheel rather than read its stamp.",
        },
        {
          label: "Outer edge movement",
          expression: "poke = (new width − old width) ÷ 2 − (new offset − old offset) ÷ 25.4",
          note: "Half the width change pushes each edge outward; the offset change moves the whole wheel bodily.",
        },
        {
          label: "Track width change",
          expression: "track change = −2 × (new offset − old offset) ÷ 25.4",
          note: "Reducing offset by 25.4 mm on both sides widens the track by two inches. Width changes do not affect track — they move both edges symmetrically about the same centre.",
        },
      ]}
      sections={[
        {
          heading: "What offset actually measures",
          paragraphs: [
            "Offset is the distance between the wheel's mounting face — the flat surface that meets the hub — and the centreline of the wheel's width. It is quoted in millimetres and it can be positive, zero or negative.",
            "Positive offset means the mounting face sits outboard of the centreline, which pulls the wheel body inward toward the suspension. Most modern front-wheel-drive and unibody vehicles use substantial positive offsets for this reason.",
            "Negative offset puts the mounting face inboard of the centreline, pushing the wheel outward. This is the deep-dish look, and it is why lowering offset is the standard route to a wider stance.",
            "Zero offset means the mounting face sits exactly at the centreline. It is not a neutral or default value — whether it fits depends entirely on what the vehicle was designed around.",
          ],
        },
        {
          heading: "Why width and offset must be read together",
          paragraphs: [
            "This is the single most common mistake in wheel fitment, and it produces more returned wheels than any other.",
            "Changing offset moves the whole wheel bodily — both edges shift the same distance in the same direction. Changing width moves the edges apart symmetrically about the mounting position, adding half the extra width to each side.",
            "Put those together and you get outcomes that surprise people. Going from an 8-inch wheel at +45 to a 9-inch wheel at +20 moves the outer edge out by 1.48 inches — while the inner edge actually moves 0.48 inches away from the suspension. The wheel got an inch wider and still gained inboard clearance, because the offset drop pulled it outward faster than the extra width pushed it in.",
            "Keep the offset instead — a 9-inch wheel at +45 replacing an 8-inch at +45 — and the change splits evenly, adding half an inch on each side. Identical width increase, opposite consequence at the strut, purely because of what the offset did.",
          ],
        },
        {
          heading: "Poke and tuck, and what each one costs you",
          bullets: [
            "Outboard movement risks fender contact, worst at full steering lock and full suspension compression",
            "Outboard movement also throws more water and stone chips down the side of the vehicle",
            "Inboard movement risks contact with the strut body, the control arm and sometimes the brake caliper",
            "Inboard clearance is usually the tighter of the two, and the harder to inspect",
            "Reduced offset increases the scrub radius, which changes steering feel and loads the wheel bearing differently",
            "Wider track improves lateral stability but adds leverage on the bearing and the ball joint",
          ],
        },
        {
          heading: "The tire is half the equation",
          paragraphs: [
            "The wheel calculation tells you where the rim sits. It does not tell you where the tire sits, and the tire is what actually contacts things.",
            "A tire mounted on a wheel narrower than its section width bulges outward on both sides. Fit a 285-section tire on a 9-inch wheel and the tire is roughly 11.2 inches at its widest against a 9-inch rim, so about an inch of rubber sits proud on each side of the wheel edges.",
            "That is why a wheel that clears on paper can still rub. The sequence that avoids this is to calculate the wheel position first, then add the tire's bulge on each side, then check the result against the actual gaps on the vehicle at full lock and full compression.",
            "It is also why people who fit wider tires without changing wheels are surprised by contact. Nothing about the wheel moved — but the rubber now reaches further out and further in than it did.",
          ],
        },
      ]}
      faqs={[
        {
          question: "What does wheel offset mean?",
          answer:
            "It is the distance in millimetres between the wheel's mounting face and its centreline. Positive offset pulls the wheel inward toward the suspension; negative offset pushes it outward toward the fender.",
        },
        {
          question: "Is higher or lower offset better?",
          answer:
            "Neither on its own. The right offset is the one that places both wheel edges where your vehicle has clearance. That depends on wheel width, tire section width and the vehicle's own geometry.",
        },
        {
          question: "How much offset change is safe?",
          answer:
            "Small changes of five to ten millimetres are usually absorbed without trouble. Beyond about 20 mm you are meaningfully relocating the wheel, and both fender and strut clearance need checking physically.",
        },
        {
          question: "Will lower offset cause rubbing?",
          answer:
            "It moves the wheel outward, so it risks fender contact rather than suspension contact — typically at full steering lock or when the suspension compresses over a bump with the wheel turned.",
        },
        {
          question: "How do I find my wheel's offset?",
          answer:
            "It is usually stamped on the back of the spokes or inside the barrel as ET followed by a number. If there is no marking, measure the backspacing and convert it using the formula above.",
        },
        {
          question: "What is the difference between offset and backspacing?",
          answer:
            "They describe the same thing from different reference points. Offset is measured from the wheel's centreline in millimetres; backspacing is measured from the inner rim flange in inches. Either converts to the other.",
        },
        {
          question: "Does changing offset affect my suspension?",
          answer:
            "It changes the scrub radius, which alters steering feel and how the wheel loads the bearing. Large reductions in offset increase the leverage on the bearing and ball joint, and that leverage is constant rather than occasional.",
        },
        {
          question: "Do spacers do the same thing as lower offset?",
          answer:
            "Geometrically yes — a 20 mm spacer produces the same wheel position as 20 mm less offset. The difference is mechanical: a spacer adds a joint and needs correctly rated hardware and enough remaining stud engagement.",
        },
      ]}
      sources={[tireRimAssociation, rimWidthRange, iso5775]}
    >
      <WheelOffsetCalculator />
    </ToolPage>
  );
}
