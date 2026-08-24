import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { tireRimAssociation, uneceR39, yokohamaSidewall } from "../tool-sources";
import { TireCircumferenceCalculator } from "./ui";

const tool = toolBySlug("tire-circumference-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Circumference is the distance a tire covers in one revolution, and revolutions per mile is the same fact turned around. That second figure is the one that matters in practice, because it is what the speedometer, the odometer, the anti-lock brakes and the traction control are all calibrated against. Change it and every one of them inherits the error."
      steps={[
        {
          title: "Enter the size on the sidewall",
          detail:
            "Circumference follows directly from overall diameter, so any size the calculator can read produces a figure. Metric and flotation notations are treated identically.",
        },
        {
          title: "Read revolutions per mile as the working number",
          detail:
            "Circumference is the intuitive figure; revolutions per mile is the one engineers use, because wheel-speed sensors count rotations rather than measuring distance.",
        },
        {
          title: "Note the coincidence at 60 mph",
          detail:
            "At exactly 60 mph the vehicle covers one mile per minute, so revolutions per mile and revolutions per minute are the same number. It is a useful mental shortcut for sanity-checking sensor data.",
        },
        {
          title: "Set a distance to count total rotations",
          detail:
            "Useful for durability estimates and for understanding how often a given tread block meets the road — a tire on a highway vehicle passes ten million revolutions well inside its service life.",
        },
        {
          title: "Check the wear table before blaming a size change",
          detail:
            "A worn tire is measurably smaller than a new one of the same size. If a speedometer has drifted slightly and nothing was changed, tread depth is the usual explanation.",
        },
      ]}
      formula={[
        {
          label: "Circumference",
          expression: "circumference = π × overall diameter",
          note: "The rolling distance for one full revolution, treating the tire as a perfect circle.",
        },
        {
          label: "Revolutions per mile",
          expression: "revs per mile = 63,360 ÷ circumference (in)",
          note: "63,360 is the number of inches in a mile. This is the figure vehicle calibration is built around.",
        },
        {
          label: "Wheel speed",
          expression: "wheel rpm = (mph × 63,360) ÷ (circumference × 60)",
          note: "At 60 mph this collapses to the revs-per-mile figure, because one mile takes exactly one minute.",
        },
        {
          label: "Diameter lost to wear",
          expression: "diameter lost = 2 × tread depth lost",
          note: "Tread sits on both sides of the wheel, so losing 8/32 inch of depth removes 16/32 — half an inch — of diameter.",
        },
      ]}
      sections={[
        {
          heading: "Why vehicles count revolutions instead of measuring distance",
          paragraphs: [
            "No vehicle measures how far it has travelled. It counts how many times a wheel has turned, and multiplies by an assumed distance per turn. Every speed and distance reading on the dashboard is built on that multiplication.",
            "The sensor itself is simple: a toothed ring on the hub passing a magnetic or inductive pickup, producing a pulse per tooth. The control module knows how many teeth there are and how much distance one full rotation is supposed to represent, and everything else is arithmetic.",
            "That assumed distance per rotation is the rolling circumference, and it is fixed when the vehicle is calibrated for its original tire size. Fit a tire with a different circumference and the assumption becomes wrong — not gradually, and not approximately, but by exactly the proportion the circumference changed.",
            "This is why revolutions per mile is the number worth carrying rather than circumference. Two tire sizes that read very differently but share a revs-per-mile figure will produce identical speedometer readings, because the only thing the vehicle cares about is how many rotations a mile takes.",
          ],
        },
        {
          heading: "What else the same figure feeds",
          paragraphs: [
            "The speedometer is the visible consumer of wheel-speed data, but it is not the only one, and the others matter more.",
            "Anti-lock braking works by comparing wheel speeds against each other and against expected deceleration. Stability control does the same to detect a slide. Traction control compares driven wheels against undriven ones. All of them reason in rotations and convert to speed using the calibrated circumference.",
            "On all-wheel-drive and four-wheel-drive vehicles the consequence is mechanical as well as electronic. Differentials and transfer cases exist to accommodate small differences in wheel speed through corners, not to absorb a permanent mismatch. Fit tires of different circumference across an axle — or, worse, front to rear — and those components work continuously rather than occasionally.",
            "That is why the guidance to change all four tires together is not a sales tactic on such vehicles. A tire with a few thousand miles on it has a slightly smaller circumference than a new one, and on a tight-tolerance system even that difference is worth avoiding.",
          ],
        },
        {
          heading: "The 60 mph coincidence, and why it is useful",
          bullets: [
            "At 60 mph a vehicle covers exactly one mile per minute",
            "So revolutions per mile and wheel revolutions per minute are the same number at that speed",
            "A tire at 707 revs per mile is turning 707 rpm at 60 mph",
            "That makes it easy to sanity-check live wheel-speed data against a known size",
            "It also gives a quick feel for bearing and tire duty cycle at highway speed",
            "Above and below 60 the relationship scales linearly with road speed",
          ],
        },
        {
          heading: "Rolling circumference is not quite the geometric one",
          paragraphs: [
            "Everything calculated here treats the tire as a rigid circle, which it is not. Under load it flattens where it meets the road, and that changes the effective rolling distance slightly.",
            "The direction is not obvious. A flattened contact patch reduces the loaded radius, which would suggest less distance per revolution. But the tread in the contact patch is also stretched and compressed rather than simply following a smaller circle, so the actual rolling circumference sits close to the geometric figure rather than well below it — typically within a couple of percent.",
            "Manufacturers publish measured revolutions-per-mile figures for their tires precisely because this is easier to measure than to model. Where those figures are available for the exact tire you are fitting, they are better than any calculation, including this one.",
            "For everything short of calibration work, the geometric figure is the right tool: it compares two sizes correctly, it predicts speedometer error accurately, and it is available without waiting for a manufacturer data sheet.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do you calculate tire circumference?",
          answer:
            "Multiply the overall diameter by π. A 225/65R17 measures about 28.52 inches in diameter, so its circumference is roughly 89.6 inches.",
        },
        {
          question: "What are revolutions per mile?",
          answer:
            "How many times the tire turns to cover one mile — 63,360 inches divided by the circumference in inches. It is the figure vehicle speed and distance calibration is actually built on.",
        },
        {
          question: "Why does revolutions per mile matter more than circumference?",
          answer:
            "Because wheel-speed sensors count rotations rather than measuring distance. Two sizes with the same revs-per-mile figure produce identical speedometer readings regardless of how differently the sizes read.",
        },
        {
          question: "What is wheel RPM at 60 mph?",
          answer:
            "Numerically the same as revolutions per mile, because at 60 mph the vehicle covers one mile every minute. A tire at 707 revs per mile turns at 707 rpm.",
        },
        {
          question: "Does tire wear change circumference?",
          answer:
            "Yes. Every 1/32 inch of tread depth lost removes 2/32 inch of diameter, so a tire worn from 12/32 to 4/32 has shed about half an inch of diameter and roughly 1.6 inches of circumference.",
        },
        {
          question: "Does circumference affect ABS and traction control?",
          answer:
            "Directly. Both compare wheel rotation rates and convert them to speed using the calibrated circumference. A size change shifts the reference those comparisons are made against.",
        },
        {
          question: "Why should all four tires match on an AWD vehicle?",
          answer:
            "Because differentials and transfer cases are designed to absorb momentary speed differences through corners, not a permanent mismatch. Different circumferences make them work continuously, which generates heat and wear.",
        },
        {
          question: "Is calculated circumference the same as the manufacturer's figure?",
          answer:
            "Close, usually within a couple of percent. The calculation assumes a rigid circle, while a real tire deforms under load. Where a manufacturer publishes a measured revs-per-mile figure for your exact tire, use it.",
        },
      ]}
      sources={[tireRimAssociation, uneceR39, yokohamaSidewall]}
    >
      <TireCircumferenceCalculator />
    </ToolPage>
  );
}
