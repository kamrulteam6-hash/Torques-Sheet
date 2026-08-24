import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { rimWidthRange, tireRimAssociation } from "../tool-sources";
import { SuspensionClearanceCalculator } from "./ui";

const tool = toolBySlug("suspension-clearance-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Inner clearance — to the strut body, the control arm, sometimes the brake caliper — is usually tighter than outer clearance and considerably harder to inspect by eye. This works the same way as the fender clearance calculator, but for the side of the wheel that almost never gets checked until something already rubs."
      steps={[
        {
          title: "Measure the current inner gap yourself",
          detail: "Between the tire's inner sidewall and the nearest suspension component — usually the strut body — with the wheel straight and the vehicle at normal ride height. This requires actually looking behind the wheel, which is why it gets skipped.",
        },
        {
          title: "Get the inward movement figure",
          detail: "From the wheel fitment calculator's inner edge output, for a wheel or tire width and offset change.",
        },
        {
          title: "Read the remaining clearance",
          detail: "Again a static figure — with the wheel straight and the vehicle standing still.",
        },
        {
          title: "Turn the wheel to full lock, both directions, before finalising",
          detail: "Inner clearance problems overwhelmingly show up at full steering lock rather than with the wheel straight, which this static calculation cannot see.",
        },
      ]}
      formula={[
        {
          label: "Remaining clearance",
          expression: "remaining = baseline measurement − inward movement",
          note: "The same subtraction as the fender clearance calculator, applied to the inner side of the wheel instead.",
        },
      ]}
      sections={[
        {
          heading: "Why inner clearance gets missed more often than outer",
          paragraphs: [
            "Outer clearance is visible from outside the vehicle — anyone can glance at the gap between a tire and a fender lip. Inner clearance requires actually looking behind the wheel, at the strut body and control arm, which most people simply don't do until something has already made contact.",
            "It is also frequently the tighter of the two. Modern strut and multi-link suspension designs pack components close to the wheel to maximise interior space and minimise unsprung weight, which leaves genuinely little room to spare on the inboard side compared to what is usually available toward the fender.",
            "This is precisely why a wider wheel or a reduced offset — both of which move the wheel's position outboard, reducing inner clearance while sometimes appearing to improve outer clearance — deserves an inner-clearance check as seriously as the more visible outer one.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I measure inner wheel clearance?",
          answer: "With the wheel straight and the vehicle at normal ride height, measure the gap between the tire's inner sidewall and the nearest suspension component — typically the strut body.",
        },
        {
          question: "Why is inner clearance often tighter than outer clearance?",
          answer: "Modern suspension designs pack components close to the wheel to maximise interior space, leaving less room on the inboard side than is typically available toward the fender.",
        },
        {
          question: "Does a lower offset wheel reduce inner clearance?",
          answer: "Yes — lower offset moves the entire wheel outboard, which can improve outer (fender) clearance while simultaneously reducing inner clearance to the strut and control arm.",
        },
        {
          question: "When does inner clearance contact actually happen?",
          answer: "Overwhelmingly at full steering lock rather than with the wheel straight, which is why a static, straight-ahead measurement should always be followed by a full-lock check in both directions.",
        },
      ]}
      sources={[tireRimAssociation, rimWidthRange]}
    >
      <SuspensionClearanceCalculator />
    </ToolPage>
  );
}
