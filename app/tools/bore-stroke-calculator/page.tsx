import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { chevyHardcoreCompression, fordDynoTips } from "../tool-sources";
import { BoreStrokeCalculator } from "./ui";

const tool = toolBySlug("bore-stroke-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Displacement, bore and stroke are three numbers locked together by one formula, and most calculators only run it forward — bore and stroke in, displacement out. This solves it in whichever direction is actually useful for planning a build: a target displacement and a fixed stroke solved for the bore that hits it, the reverse, or a straightforward check of a specific combination."
      steps={[
        {
          title: "Choose what you're solving for",
          detail: "Solving for bore is the usual stroker-build question — a target displacement with a crankshaft stroke already chosen. Solving for stroke is less common but useful when the block's bore is fixed and the crank hasn't been picked yet.",
        },
        {
          title: "Enter the target displacement",
          detail: "The capacity you're aiming for, in cubic inches. This is the figure the calculator works backward from.",
        },
        {
          title: "Enter the dimension you already know",
          detail: "Stroke, if solving for bore; bore, if solving for stroke. This should be a real, measured or specified figure rather than a nominal one where precision matters.",
        },
        {
          title: "Check the bore/stroke ratio the result implies",
          detail: "A displacement target can often be hit by more than one bore/stroke combination. The ratio tells you which side of square the result lands on, which matters for how the engine will actually behave.",
        },
        {
          title: "Verify against what a specific block can actually take",
          detail: "This calculator works in pure geometry. It does not know a block's maximum safe overbore or a crankshaft's available stroke lengths — check the solved figure against what your specific block and crank combination can support.",
        },
      ]}
      formula={[
        {
          label: "Bore for a target displacement",
          expression: "bore = √( (displacement ÷ cylinders) ÷ (π/4 × stroke) )",
          note: "Because bore is squared in the forward displacement formula, solving for it requires a square root rather than a division.",
        },
        {
          label: "Stroke for a target displacement",
          expression: "stroke = (displacement ÷ cylinders) ÷ (π/4 × bore²)",
          note: "Stroke is not squared in the forward formula, so solving for it is a straightforward division.",
        },
      ]}
      sections={[
        {
          heading: "Why solving for bore needs a square root",
          paragraphs: [
            "The forward displacement formula squares the bore and leaves the stroke untouched, which is why the two backward solves look different from each other even though they come from the same equation.",
            "Solving for stroke given a target displacement and a fixed bore is simple rearrangement — divide the swept volume by the bore's cross-sectional area. Solving for bore given a target displacement and a fixed stroke requires undoing that square, which means taking a square root rather than dividing.",
            "The practical consequence is that bore has a more powerful effect on displacement than stroke does, so relatively small bore changes move the target displacement more than the same-sized stroke change would — visible directly by comparing the two directions on the table below.",
          ],
        },
        {
          heading: "Why a target displacement usually has more than one solution",
          paragraphs: [
            "For any target displacement, there is a whole family of bore-and-stroke combinations that reach it — a large bore with a short stroke, a small bore with a long stroke, and everything between. The calculator finds whichever one matches the dimension you've already fixed, but it's worth knowing the choice exists at all.",
            "That is exactly the decision a stroker build is making. Two engines can share an identical final displacement while behaving completely differently, because one combination is heavily oversquare and revs freely while the other is undersquare and makes its power low in the range. The displacement number alone says nothing about which kind of engine results — only the actual bore and stroke figures do.",
            "This is why the bore/stroke ratio shown alongside the solved dimension matters as much as the dimension itself. The same target displacement reached two different ways is, in every meaningful sense, two different engines.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate bore from displacement and stroke?",
          answer: "Divide the target displacement by the cylinder count, divide that by π/4 times the stroke, then take the square root. This calculator does it directly.",
        },
        {
          question: "How do I calculate stroke from displacement and bore?",
          answer: "Divide the target displacement by the cylinder count, then divide by π/4 times the bore squared. Unlike solving for bore, this needs no square root.",
        },
        {
          question: "Why does the same displacement have different bore/stroke options?",
          answer: "Because displacement depends on the combination of bore and stroke, not on either alone — many different pairings can reach the same total volume, each with a different bore/stroke ratio and therefore a different character.",
        },
        {
          question: "What bore do I need for a 383 out of a 350 block?",
          answer: "With the standard 3.75-inch stroker crank and a 0.030-inch overbore (4.030-inch bore), the combination lands at about 383 cubic inches. Enter 383, a 3.75 stroke and 8 cylinders here to see the exact figure.",
        },
        {
          question: "Does this calculator check whether a bore is safe for my block?",
          answer: "No — it works in pure geometry. Always verify a solved bore against the block's actual maximum safe overbore and cylinder wall thickness before machining anything.",
        },
      ]}
      sources={[chevyHardcoreCompression, fordDynoTips]}
    >
      <BoreStrokeCalculator />
    </ToolPage>
  );
}
