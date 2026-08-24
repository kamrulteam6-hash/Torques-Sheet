import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation } from "../tool-sources";
import { SuspensionSpringRateCalculator } from "./ui";

const tool = toolBySlug("suspension-spring-rate-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="A spring's printed rate is only half the story — what the tire actually feels is wheel rate, which passes through the suspension's motion ratio first. This converts spring rate to wheel rate, and wheel rate to natural frequency through corner weight, so a spring choice can be checked against known handling targets rather than compared as a raw number."
      steps={[
        {
          title: "Get the spring's rated stiffness",
          detail: "Printed on the spring or in its part specification — the raw lb/in or N/mm figure before any suspension geometry is applied.",
        },
        {
          title: "Establish the suspension's motion ratio",
          detail: "The ratio of wheel travel to spring travel over a small range of motion, usually below 1.0 on most double-wishbone and strut designs — measured directly, or taken from published suspension geometry for the vehicle.",
        },
        {
          title: "Enter corner weight",
          detail: "The sprung weight that specific corner supports — from a corner-weight scale reading for real accuracy, since it varies with driver, fuel load and ballast placement.",
        },
        {
          title: "Compare natural frequency against a target range for the intended use",
          detail: "The guidance table below gives broad ranges by use case, from soft street comfort through to high-downforce racing — the right target depends entirely on what the vehicle is built for.",
        },
      ]}
      formula={[
        {
          label: "Wheel rate",
          expression: "wheel rate = spring rate × motion ratio²",
          note: "Squared because motion ratio scales both the force multiplication and the distance the linkage passes through.",
        },
        {
          label: "Natural frequency",
          expression: "frequency (Hz) = 3.13 × √(wheel rate ÷ corner weight)",
          note: "The 3.13 constant comes from (1 ÷ 2π) × √386.4, where 386.4 is standard gravity in inches per second squared — the unit conversion that lets lb/in and lb produce Hz directly.",
        },
      ]}
      sections={[
        {
          heading: "Why motion ratio is squared, not applied once",
          paragraphs: [
            "Motion ratio describes how much the spring compresses for a given amount of wheel travel — a lever-arm relationship, and like any lever it affects both force and distance simultaneously, in opposite directions.",
            "A motion ratio below 1.0 means the wheel moves more than the spring does for the same suspension travel. That geometry multiplies the force reaching the spring (mechanical advantage works both ways), but it also means the spring's own stiffness gets divided down by the same ratio when felt at the wheel — and those two effects compound rather than cancel, which is why the relationship comes out squared.",
            "This is a genuinely counterintuitive result the first time you encounter it: a suspension with a 0.7 motion ratio needs a spring roughly twice as stiff as the desired wheel rate would suggest at first glance (1 ÷ 0.7² ≈ 2.04), not 1.43 times stiffer as a linear guess would produce.",
          ],
        },
        {
          heading: "Why natural frequency is the number worth comparing, not raw spring rate",
          paragraphs: [
            "Spring rate alone means very little without knowing what it's supporting. A 400 lb/in spring on a lightweight formula car and the same 400 lb/in spring on a heavy sedan produce completely different ride characteristics, because the mass being controlled is entirely different.",
            "Natural frequency accounts for that by folding in corner weight, producing a figure — cycles per second the suspension would oscillate at if disturbed — that is directly comparable across completely different vehicles. This is why race engineers talk in Hz rather than lb/in when discussing suspension stiffness targets.",
            "The published ranges vary enormously by intended use, and that variation is deliberate rather than arbitrary: a soft street car targets low frequency for ride comfort, while a high-downforce race car targets high frequency to control aerodynamic platform movement, at the direct cost of ride quality neither car is built to prioritize the same way.",
          ],
        },
      ]}
      faqs={[
        {
          question: "What is the difference between spring rate and wheel rate?",
          answer: "Spring rate is what's printed on the spring itself. Wheel rate is what the tire actually experiences, after the suspension's motion ratio has scaled it — wheel rate equals spring rate times motion ratio squared.",
        },
        {
          question: "Why is motion ratio squared in the wheel rate formula?",
          answer: "Because it's a lever-arm relationship that affects both force and distance simultaneously in opposite directions, and those two effects compound multiplicatively rather than adding — producing a squared relationship.",
        },
        {
          question: "How do I calculate suspension natural frequency?",
          answer: "Multiply 3.13 by the square root of wheel rate divided by corner weight, with wheel rate in lb/in and corner weight in lb. The 3.13 constant converts those units into a result in Hz.",
        },
        {
          question: "What natural frequency should my suspension have?",
          answer: "It depends entirely on the intended use — roughly 1.0-1.5 Hz for soft street comfort, 1.5-2.5 Hz for sport street or mild track use, and up toward 3.0-4.0 Hz for high-downforce racing where platform control matters more than ride comfort.",
        },
      ]}
      sources={[fordDynoTips, tireRimAssociation]}
    >
      <SuspensionSpringRateCalculator />
    </ToolPage>
  );
}
