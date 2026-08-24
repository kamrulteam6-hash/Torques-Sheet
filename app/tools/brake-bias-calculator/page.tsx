import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation } from "../tool-sources";
import { BrakeBiasCalculator } from "./ui";

const tool = toolBySlug("brake-bias-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Brake bias is simply each axle's share of total braking torque, expressed as a percentage. This works it out from actual torque figures — front and rear — and compares the result against static weight distribution, which is the honest baseline to reason from before accounting for weight transfer under braking."
      steps={[
        {
          title: "Get real torque figures for both axles",
          detail: "From the brake pressure calculator, run once per axle with that axle's actual hardware — master cylinder, calipers, pads and rotor radius often differ front to rear.",
        },
        {
          title: "Enter the vehicle's static weight distribution",
          detail: "Front and rear corner weights, or axle weights from a scale. This gives the baseline every real bias setup should be compared against, not a target in itself.",
        },
        {
          title: "Read the difference from static, not just the raw percentage",
          detail: "A bias percentage alone doesn't tell you whether it's appropriate — comparing it against static weight distribution shows how much forward bias has been deliberately built in beyond what weight alone would suggest.",
        },
      ]}
      formula={[
        {
          label: "Brake bias",
          expression: "front bias (%) = front torque ÷ (front torque + rear torque) × 100",
          note: "Each axle's share of the total torque the brake system can generate.",
        },
        {
          label: "Static weight bias",
          expression: "front weight bias (%) = front weight ÷ total weight × 100",
          note: "The comparison baseline, before any dynamic weight transfer under braking is considered.",
        },
      ]}
      sections={[
        {
          heading: "Why bias should sit forward of static weight distribution",
          paragraphs: [
            "Weight transfers toward the front axle under braking — deceleration pitches the vehicle's mass forward, loading the front tires more heavily and unloading the rear. That means the front tires have more available grip during braking than static weight distribution alone would suggest, and the rear has less.",
            "Bias built purely to match static weight distribution would ask the rear axle to generate more braking force than its available grip supports once weight has transferred off it — the classic setup for premature rear lockup, which is dangerous because a car with locked rear wheels loses directional stability entirely.",
            "This is why real brake systems, across nearly every vehicle category, run noticeably more forward bias than static weight distribution alone implies — the exact amount depends on how hard the vehicle decelerates and its centre of gravity height, both of which increase how much weight transfers forward under hard braking.",
          ],
        },
      ]}
      faqs={[
        {
          question: "What is a good brake bias percentage?",
          answer: "It depends entirely on the vehicle's weight distribution, centre of gravity height and how hard it decelerates — there is no universal target. What matters is comparing the actual setup against that specific vehicle's static and dynamic weight behaviour.",
        },
        {
          question: "Why does brake bias need to be forward of static weight distribution?",
          answer: "Because weight transfers toward the front under braking, giving the front tires more available grip than static weight suggests and the rear less. Bias matching only static weight risks rear lockup once weight has transferred.",
        },
        {
          question: "How do I calculate brake bias?",
          answer: "Divide front axle torque by total torque (front plus rear) and multiply by 100. Torque for each axle comes from that axle's own master cylinder, caliper, pad and rotor combination.",
        },
        {
          question: "Does a proportioning valve change brake bias?",
          answer: "Yes — a proportioning valve limits rear line pressure above a certain threshold specifically to bias the system more toward the front under hard braking, when weight transfer is greatest.",
        },
      ]}
      sources={[fordDynoTips, tireRimAssociation]}
    >
      <BrakeBiasCalculator />
    </ToolPage>
  );
}
