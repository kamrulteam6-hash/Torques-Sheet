import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation } from "../tool-sources";
import { TurningRadiusCalculator } from "./ui";

const tool = toolBySlug("turning-radius-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="A vehicle's turning radius comes from geometry alone — wheelbase and how far the front wheels can turn. This works out both the simplified centreline radius engineers reach for as a quick estimate, and the curb-to-curb figure manufacturers actually publish, which accounts for track width and the wider path the outer wheel sweeps."
      steps={[
        {
          title: "Find the vehicle's wheelbase",
          detail: "The distance between front and rear axle centres, in a manufacturer's specification sheet or measured directly.",
        },
        {
          title: "Find or estimate the average steering angle at full lock",
          detail: "The inner and outer front wheels turn to slightly different angles at full lock (Ackermann geometry); the average of the two is what this simplified model uses.",
        },
        {
          title: "Enter front track width",
          detail: "The distance between the centres of the two front tires — this is what separates the simplified centreline radius from the real curb-to-curb figure.",
        },
        {
          title: "Read turning circle as the practical figure",
          detail: "This is the diameter — twice the curb-to-curb radius — and it is the number that actually tells you whether a U-turn fits in a given road width.",
        },
      ]}
      formula={[
        {
          label: "Centreline turning radius",
          expression: "R = wheelbase ÷ tan(steering angle)",
          note: "The simplified bicycle-model approximation, treating the vehicle as a single two-wheeled bicycle rather than modelling each front wheel individually.",
        },
        {
          label: "Curb-to-curb radius",
          expression: "R = wheelbase ÷ sin(steering angle) + track width ÷ 2",
          note: "Tracks the outer front wheel's actual path — the figure manufacturers publish — adding half the track width because the outer tire sits further out than the vehicle's centreline.",
        },
      ]}
      sections={[
        {
          heading: "Why sin and tan give different answers",
          paragraphs: [
            "Both formulas describe the same turning vehicle, but they answer slightly different questions. The centreline (tan) version asks where the midpoint between the front wheels traces its path — a simplification useful for quick estimates and for path-planning algorithms.",
            "The curb-to-curb (sin) version specifically tracks the outer front wheel, which is the widest point the vehicle actually sweeps and therefore the figure that determines whether a turn physically fits. Because sine is always greater than tangent for the same angle under 90 degrees, the sin-based curb-to-curb radius comes out larger than the simplified centreline figure — a real and expected difference, not a rounding error.",
            "Manufacturers publish curb-to-curb figures because that is what matters for parking and manoeuvring. The centreline figure is more of an engineering and robotics convenience, used in path-planning models where the exact width of the vehicle is handled separately.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate turning radius?",
          answer: "Divide the wheelbase by the tangent of the average steering angle for a simplified centreline estimate, or by the sine of the steering angle plus half the track width for the curb-to-curb figure manufacturers publish.",
        },
        {
          question: "What is the difference between turning radius and turning circle?",
          answer: "Turning radius is the distance from the centre of the turn to the outer wheel's path. Turning circle is the full diameter — twice the radius — and is usually the figure quoted for practical purposes like fitting a U-turn.",
        },
        {
          question: "Why does track width matter for turning radius?",
          answer: "Because the outer wheel — the one that determines how much room a turn actually needs — sits half the track width away from the vehicle's centreline, which the curb-to-curb formula accounts for and the simplified centreline formula does not.",
        },
        {
          question: "Does wheelbase or track width matter more for turning radius?",
          answer: "Wheelbase has the larger effect — it appears directly in both formulas as the primary distance, while track width only contributes half its value as an addition to the curb-to-curb figure.",
        },
      ]}
      sources={[fordDynoTips, tireRimAssociation]}
    >
      <TurningRadiusCalculator />
    </ToolPage>
  );
}
