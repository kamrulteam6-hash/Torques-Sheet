import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { EngineDisplacementCalculator } from "./ui";

const tool = toolBySlug("engine-displacement-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Displacement is the total volume the pistons sweep in one full cycle, and it comes from three numbers only: bore, stroke and cylinder count. This works it out in cubic inches, cubic centimetres and litres at once, shows what each standard overbore step adds, and gives the bore-to-stroke ratio that tells you what kind of engine you are looking at."
      steps={[
        {
          title: "Measure the bore, or take it from the specification",
          detail:
            "Bore is the cylinder diameter in inches. On a rebuilt engine, measure it rather than assuming — a block that has been bored before is no longer at its nominal size, and that is exactly the case where the calculation matters.",
        },
        {
          title: "Enter the stroke",
          detail:
            "Stroke is how far the piston travels between top and bottom dead centre, which is twice the crankshaft throw. It is a property of the crankshaft, so a stroker crank changes it and boring the block does not.",
        },
        {
          title: "Set the cylinder count",
          detail:
            "Straightforward, but worth checking on unfamiliar engines. The per-cylinder figure the calculator gives is often the more useful number when comparing designs across different layouts.",
        },
        {
          title: "Read the overbore table if the block is being machined",
          detail:
            "Standard cleanup steps are +0.020, +0.030 and +0.040 inches. The table shows what each one does to displacement, which is usually less than people expect.",
        },
        {
          title: "Check the bore/stroke ratio for character",
          detail:
            "Above 1.0 the engine is oversquare and inclined to rev; below 1.0 it is undersquare and inclined toward low-end torque. It is the single most descriptive number about how an engine will behave.",
        },
      ]}
      formula={[
        {
          label: "Swept volume per cylinder",
          expression: "volume (ci) = π ÷ 4 × bore² × stroke",
          note: "The area of a circle multiplied by the height the piston sweeps through it.",
        },
        {
          label: "Total displacement",
          expression: "displacement (ci) = π ÷ 4 × bore² × stroke × cylinders",
          note: "Simply the per-cylinder figure repeated for every cylinder.",
        },
        {
          label: "Cubic inches to cc",
          expression: "cc = cubic inches × 16.387064",
          note: "An exact conversion, since an inch is defined as exactly 25.4 mm.",
        },
        {
          label: "Bore to stroke ratio",
          expression: "ratio = bore ÷ stroke",
          note: "Above 1.0 is oversquare, below 1.0 undersquare, and 1.0 exactly is square.",
        },
      ]}
      sections={[
        {
          heading: "Why bore matters more than stroke",
          paragraphs: [
            "Look at the formula and one thing jumps out: bore is squared, stroke is not. That single asymmetry explains a great deal about how engines get built.",
            "Doubling the stroke doubles the displacement. Doubling the bore quadruples it. So a small change in bore moves displacement considerably more than the same change in stroke, which is why boring a block is such an efficient way to find capacity.",
            "It also explains why overbore steps are quoted in thousandths of an inch. On a four-inch bore, going +0.030 adds about 5 cubic inches across a V8 — real, but modest. Going a full quarter-inch larger would add over 40, which is why block wall thickness rather than arithmetic is what limits how far you can go.",
            "The practical consequence for anyone rebuilding an engine: the displacement gain from a cleanup bore is a side effect, not the reason. You bore a block to get a true, round, straight cylinder. The extra capacity is a bonus you would not pay for on its own.",
          ],
        },
        {
          heading: "What the bore/stroke ratio tells you",
          paragraphs: [
            "This one number describes an engine's temperament better than its displacement does.",
            "An oversquare engine — bore larger than stroke, ratio above 1.0 — has a shorter piston travel for a given capacity. That means lower piston speed at any given RPM, which lets the engine rev higher safely. It also allows larger valves, because there is more room in the bore to fit them. These engines make their power high in the range.",
            "An undersquare engine — stroke longer than bore, ratio below 1.0 — has more leverage on the crankshaft throw and generally fills its cylinders well at low speed. Piston speed climbs quickly with RPM, so these engines are usually happier lower down. Diesel engines and older truck engines are strongly undersquare for exactly this reason.",
            "The Ford 300 inline-six is a good illustration: a 4-inch bore with a 3.98-inch stroke is very nearly square, but it was tuned for low-speed pulling and became one of the most durable truck engines ever built. Meanwhile the Coyote 5.0 at 3.63 by 3.65 is nearly square too, and revs to 7,000. The ratio sets the possibilities; the cylinder head and camshaft decide what is done with them.",
          ],
        },
        {
          heading: "Why badge sizes rarely match the arithmetic",
          bullets: [
            "A Chevrolet 350 calculates to about 350.0 cubic inches, which is unusually honest",
            "A Ford 302 is closer to 301.6, and a 351 Windsor to 351.9",
            "A 5.7-litre badge covers anything from about 345 to 350 cubic inches",
            "Marketing rounds to the nearest attractive number, and always has",
            "Metric badges round to one decimal place, hiding up to 50 cc either way",
            "For machining and compression work, use the calculated figure rather than the badge",
          ],
        },
        {
          heading: "Stroking, and why it is the other route to capacity",
          paragraphs: [
            "If bore is limited by the block, the remaining variable is stroke — and that is a crankshaft change rather than a machining operation.",
            "The best known example is the 383: a Chevrolet 350 block bored 0.030 over, with the 3.75-inch crankshaft from a 400 fitted in place of the 3.48-inch original. Bore goes up slightly, stroke goes up considerably, and the result is around 383 cubic inches from a 350 block.",
            "Stroking changes the engine's character as well as its size. A longer stroke lowers the bore/stroke ratio, moving the engine toward low-end torque and away from high-RPM breathing. That is usually the intention, but it is worth being deliberate about — a stroker built with high-RPM cylinder heads and camshaft is working against itself.",
            "It also raises piston speed at any given engine speed, which is the real limit on how hard a long-stroke engine can be revved. Capacity is easy to add; the consequences arrive with it.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do you calculate engine displacement?",
          answer:
            "Multiply π divided by 4 by the bore squared, then by the stroke, then by the number of cylinders. With bore and stroke in inches the answer is in cubic inches; multiply by 16.387 for cc.",
        },
        {
          question: "How many cc is a 350 cubic inch engine?",
          answer:
            "About 5,735 cc, or 5.7 litres. The conversion is exactly 16.387064 cc per cubic inch, so 350 × 16.387064 = 5,735.5.",
        },
        {
          question: "How much displacement does boring 0.030 over add?",
          answer:
            "On a typical 4-inch bore V8, roughly 5 cubic inches in total. Bore is squared in the formula, so the gain grows with the starting bore, but it is always modest at cleanup depths.",
        },
        {
          question: "What is the difference between bore and stroke?",
          answer:
            "Bore is the cylinder's diameter; stroke is how far the piston travels within it. Boring changes the block, stroking changes the crankshaft, and only bore is squared in the displacement formula.",
        },
        {
          question: "What does oversquare mean?",
          answer:
            "That the bore is larger than the stroke. Oversquare engines have lower piston speed at a given RPM and room for larger valves, so they typically rev higher and make power further up the range.",
        },
        {
          question: "Why is a 5.7L badged as a 350?",
          answer:
            "They are the same engine described in two unit systems, both rounded. 350 cubic inches is 5,735 cc, which rounds to 5.7 litres. Neither figure is exact.",
        },
        {
          question: "How do I make a 350 into a 383?",
          answer:
            "Bore the 350 block 0.030 over and fit the 3.75-inch stroke crankshaft from a 400. The extra stroke does most of the work; the overbore contributes only a few cubic inches.",
        },
        {
          question: "Does displacement determine horsepower?",
          answer:
            "It sets the ceiling rather than the result. Displacement decides how much air the engine can move per cycle; the heads, camshaft, induction and how hard it can be revved decide how much of that potential becomes power.",
        },
      ]}
    >
      <EngineDisplacementCalculator />
    </ToolPage>
  );
}
