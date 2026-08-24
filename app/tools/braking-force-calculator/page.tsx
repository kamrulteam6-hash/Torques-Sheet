import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation } from "../tool-sources";
import { BrakingForceCalculator } from "./ui";

const tool = toolBySlug("braking-force-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Braking force is simply mass times deceleration — the total force a vehicle's brakes, tires and road contact together have to produce to slow it at a given rate. This works out that force from a target g-force, alongside an idealized stopping distance that is explicitly a theoretical floor, not a prediction of how any real vehicle stops."
      steps={[
        {
          title: "Enter vehicle weight",
          detail: "Include driver and typical load — the mass being decelerated is what actually generates the force requirement, not a brochure curb weight figure.",
        },
        {
          title: "Set a target deceleration in g",
          detail: "1.0g is a genuinely hard stop on good tires and a dry road. Race-prepared cars on sticky tires can exceed that; a typical street tire on a wet road may struggle to reach even 0.6-0.7g.",
        },
        {
          title: "Read force, not distance, as the primary design figure",
          detail: "Force and torque calculations feed directly into sizing brake hardware. Stopping distance depends on far more than the brakes alone, which is exactly why it carries a heavier caveat.",
        },
        {
          title: "Treat the stopping-distance figure as a floor, not an answer",
          detail: "It assumes constant deceleration, perfect traction throughout and zero reaction time — none of which a real stop achieves. Real stopping distances are consistently longer than this idealized figure.",
        },
      ]}
      formula={[
        {
          label: "Braking force",
          expression: "force (lb) = weight (lb) × deceleration (g)",
          note: "Newton's second law, expressed in the units brake system builders actually work in.",
        },
        {
          label: "Idealized stopping distance",
          expression: "distance (ft) = speed² ÷ (2 × deceleration)",
          note: "Constant-deceleration kinematics — an idealized floor that assumes perfect, unwavering traction throughout the stop and zero reaction time.",
        },
      ]}
      sections={[
        {
          heading: "Why the stopping-distance figure carries such a heavy caveat",
          paragraphs: [
            "The kinematic formula behind stopping distance is exact — for a vehicle decelerating at a genuinely constant rate with no delay before braking begins. Neither condition holds in the real world, which is precisely why this figure is presented as a theoretical minimum rather than an expected result.",
            "Real deceleration is never perfectly constant. It builds as the driver applies the brakes, may be limited by ABS intervention as it modulates to keep the tires just short of full lockup, and tire grip itself varies with load transfer, temperature, and surface condition throughout the stop rather than staying fixed.",
            "Reaction time is the other large omission, and it is often the larger factor in a real emergency stop. A driver's reaction time of even three-quarters of a second at 60 mph covers roughly 66 feet before the brakes are even applied — a distance this idealized calculation, which starts the clock at the moment of maximum braking, does not include at all.",
            "The honest use of this tool is as a force and torque input for sizing brake hardware, where the physics is exact and directly useful — not as a stopping-distance prediction for a specific vehicle in a specific real situation.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate braking force?",
          answer: "Multiply vehicle weight by the target deceleration in g. A 3,500 lb vehicle decelerating at 1.0g requires 3,500 lb of total braking force.",
        },
        {
          question: "What deceleration is a hard stop?",
          answer: "Around 1.0g is a genuinely hard stop on a dry road with good tires. Race-prepared vehicles on sticky tires can exceed that; typical street tires on a wet or marginal surface may struggle to reach even 0.6-0.7g.",
        },
        {
          question: "Why is the calculated stopping distance shorter than real stopping distances?",
          answer: "The calculation assumes perfectly constant deceleration throughout the stop and zero reaction time before braking begins. Real stops have neither — reaction time alone typically adds tens of feet at highway speed.",
        },
        {
          question: "Does this calculator predict how far my car will actually take to stop?",
          answer: "No, and it says so explicitly. It gives a theoretical floor under idealized conditions, useful for sizing brake hardware through force and torque, not for predicting a real stopping distance which depends on tires, road surface, ABS behaviour and driver reaction time.",
        },
      ]}
      sources={[fordDynoTips, tireRimAssociation]}
    >
      <BrakingForceCalculator />
    </ToolPage>
  );
}
