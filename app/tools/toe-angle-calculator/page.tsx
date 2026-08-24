import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation } from "../tool-sources";
import { ToeAngleCalculator } from "./ui";

const tool = toolBySlug("toe-angle-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="A toe-plate or string measurement gives you a distance — how much closer or further apart the front and rear edges of a tire's track are — but alignment specifications are almost always written in degrees. This converts between the two, using the tire's own diameter as the geometric reference."
      steps={[
        {
          title: "Take a toe-plate or string measurement",
          detail: "The difference in track width measured at the front edge of the tires versus the rear edge — a positive difference (front narrower) is toe-in.",
        },
        {
          title: "Enter the tire's actual overall diameter",
          detail: "Not the wheel diameter alone — the tire's full diameter is the geometric reference the angle calculation scales against. Use the tire size calculator if you need this figure worked out from a size.",
        },
        {
          title: "Read the angle in degrees, and in minutes",
          detail: "Some alignment specifications and older shop equipment use minutes of arc rather than decimal degrees — both are shown, since 1 degree equals 60 minutes.",
        },
        {
          title: "Or solve the other direction",
          detail: "Given a target toe angle from a specification, this works out the physical distance a toe plate should read to achieve it.",
        },
      ]}
      formula={[
        {
          label: "Toe angle from distance",
          expression: "toe angle = arctan(track width difference ÷ tire diameter)",
          note: "Straightforward trigonometry using the tire as the reference length the small angle is measured against.",
        },
        {
          label: "Distance from a target angle",
          expression: "track width difference = tire diameter × tan(toe angle)",
          note: "The same relationship reversed, for working toward a spec written in degrees using a physical measuring method.",
        },
      ]}
      sections={[
        {
          heading: "Why tire diameter is the reference, not wheel diameter",
          paragraphs: [
            "A toe-plate measurement is taken at the tire's outer tread surface, not at the wheel — which is exactly why the calculation needs the tire's overall diameter, not the wheel's diameter alone, as its geometric reference.",
            "This matters more than it might seem to, because tire diameter varies meaningfully with tire size even on the same wheel. A larger-diameter tire on the same wheel means the same toe angle in degrees corresponds to a larger physical distance measurement at the tread — which is worth knowing if comparing toe distance measurements across a tire size change.",
            "This is also why toe angle in degrees, rather than a distance measurement, is the more portable and universal way alignment specifications get written — a degree figure means the same thing regardless of what tire happens to be fitted, while a distance figure only means something in the context of a specific tire diameter.",
          ],
        },
        {
          heading: "Toe-in versus toe-out, and why the small difference matters",
          bullets: [
            "Toe-in (front of the tire pointed slightly inward) generally improves straight-line stability",
            "Toe-out generally sharpens initial turn-in response, at some cost to straight-line stability",
            "Front and rear toe specifications are usually set independently and often differently",
            "Even a small toe misalignment — a fraction of a degree — causes continuous tire scrubbing at speed",
            "That scrubbing shows up as accelerated, uneven tire wear well before it's noticeable in handling",
            "This is why toe is checked as part of routine alignment service even without any handling complaint",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I convert toe inches to degrees?",
          answer: "Take the arctangent of the toe distance divided by the tire's overall diameter. A quarter-inch toe distance on a 24-inch tire works out to about 0.6 degrees.",
        },
        {
          question: "What is total toe versus individual toe?",
          answer: "Individual toe is one wheel's angle relative to the vehicle's centreline. Total toe is both wheels on an axle added together — the figure a toe-plate measurement typically captures directly.",
        },
        {
          question: "Why does tire size affect a toe distance measurement?",
          answer: "Toe angle in degrees stays constant regardless of tire size, but the physical distance a toe plate reads for that same angle scales with the tire's diameter — a larger tire shows a larger distance for an identical angle.",
        },
        {
          question: "What does toe-in do compared to toe-out?",
          answer: "Toe-in generally improves straight-line stability. Toe-out generally sharpens initial steering response at some cost to stability. Most passenger vehicles run a small amount of toe-in at the front.",
        },
      ]}
      sources={[fordDynoTips, tireRimAssociation]}
    >
      <ToeAngleCalculator />
    </ToolPage>
  );
}
