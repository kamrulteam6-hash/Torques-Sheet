import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation } from "../tool-sources";
import { BrakePressureCalculator } from "./ui";

const tool = toolBySlug("brake-pressure-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Pedal effort becomes stopping torque through five stages of mechanical and hydraulic multiplication, each one a straightforward calculation once you know the hardware. This follows the whole chain — pedal ratio, master cylinder bore, caliper piston area, pad friction and rotor radius — to a single torque figure at the wheel."
      steps={[
        {
          title: "Enter pedal force and pedal ratio",
          detail: "Pedal ratio is the mechanical advantage between where your foot pushes and where the pushrod connects to the master cylinder — typically 4:1 to 6:1 on a passenger car.",
        },
        {
          title: "Enter the master cylinder bore",
          detail: "Pushrod force divided by the master cylinder's piston area gives line pressure — a smaller bore produces higher pressure for the same pushrod force, at the cost of more pedal travel.",
        },
        {
          title: "Enter every caliper piston bore, comma-separated",
          detail: "A caliper's total piston area is the sum of all its pistons on one side — a twin-piston caliper needs both bores entered, a four-piston caliper all four.",
        },
        {
          title: "Enter pad friction coefficient and effective rotor radius",
          detail: "Friction coefficient is a property of the pad compound, typically 0.35-0.45 for street pads. Effective radius is measured from the rotor's centre to the centre of the pad's contact area, not to the rotor's outer edge.",
        },
      ]}
      formula={[
        {
          label: "Line pressure",
          expression: "pressure = (pedal force × pedal ratio) ÷ master cylinder piston area",
          note: "Pascal's law: force applied to a confined fluid produces pressure equal across the whole system.",
        },
        {
          label: "Clamp force",
          expression: "clamp force = line pressure × total caliper piston area",
          note: "The same pressure acting on a larger total piston area at the caliper.",
        },
        {
          label: "Torque at the rotor",
          expression: "torque = clamp force × pad friction × effective radius × 2",
          note: "Doubled because a caliper squeezes both faces of the rotor — both pads generate friction torque.",
        },
      ]}
      sections={[
        {
          heading: "Why smaller pistons somewhere in the chain can mean more stopping power",
          paragraphs: [
            "This trips people up because it runs against instinct: a smaller master cylinder bore, for the same pedal effort, produces higher line pressure — not lower — because the same force is now spread across less piston area.",
            "That higher pressure then acts on the caliper pistons, which is where the increased clamp force comes from. The trade is pedal travel: a smaller master cylinder bore needs more fluid displacement to fill the same caliper volume, which means a longer pedal stroke for the same amount of piston movement at the caliper.",
            "This is the entire logic behind master cylinder bore selection in brake system building — going smaller firms up the pedal and increases mechanical advantage, at the cost of needing more pedal travel to move the same amount of fluid. Every stage of the chain trades one of these against another somewhere.",
          ],
        },
        {
          heading: "Why effective radius, not rotor diameter",
          paragraphs: [
            "Torque depends on where the friction force is actually applied, which is the centre of the pad's contact patch on the rotor — not the rotor's outer edge, and not its centre bore.",
            "A larger rotor with the same caliper position increases effective radius directly, which is why upgrading to a bigger rotor increases torque even with identical clamp force — the same force is now acting through a longer lever arm.",
            "This is also why caliper position along the rotor matters when comparing brake kits, not just rotor diameter alone — a caliper mounted further out on the same rotor produces more torque for identical clamp force, purely from the longer effective radius.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate brake torque?",
          answer: "Follow the chain: pedal force times pedal ratio gives pushrod force; divide by master cylinder piston area for line pressure; multiply by total caliper piston area for clamp force; multiply by pad friction coefficient, effective rotor radius and 2 for torque.",
        },
        {
          question: "Why does a smaller master cylinder increase clamp force?",
          answer: "The same pushrod force acting on a smaller piston area produces higher hydraulic pressure, which then produces more clamp force at the calipers — at the cost of needing more pedal travel to move the same fluid volume.",
        },
        {
          question: "What is effective rotor radius?",
          answer: "The distance from the rotor's centre to the centre of the caliper pad's contact area — not the rotor's outer edge. This is what actually determines the lever arm the friction force works through.",
        },
        {
          question: "Why is brake torque multiplied by 2?",
          answer: "Because a disc brake caliper squeezes both faces of the rotor simultaneously, and both pads generate friction torque acting in the same rotational direction.",
        },
      ]}
      sources={[fordDynoTips, tireRimAssociation]}
    >
      <BrakePressureCalculator />
    </ToolPage>
  );
}
