import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { tireRimAssociation } from "../tool-sources";
import { TireLoadIndexCalculator } from "./ui";

const tool = toolBySlug("tire-load-index-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="The load index printed after a tire size — the 91 in 225/65R91 — is a code for a specific maximum load per tire, set by a published standards table rather than any formula. This decodes an index into its actual capacity, or finds the minimum index a target load requires."
      steps={[
        {
          title: "Find the load index on the sidewall",
          detail: "It follows the rim diameter in the size designation, typically a two- or three-digit number immediately before the speed rating letter.",
        },
        {
          title: "Decode it to a load capacity",
          detail: "This gives the maximum weight that single tire can carry at its rated maximum pressure — not the vehicle's total capacity.",
        },
        {
          title: "Or work in the other direction from a target load",
          detail: "If you know how much weight each tire needs to carry — from a vehicle's GVWR divided across the axles, for instance — find the minimum index that covers it.",
        },
        {
          title: "Never go below the original equipment index",
          detail: "The index on the vehicle's tire placard is the minimum the vehicle was engineered around. Going lower, even if the tire otherwise fits, can under-rate the vehicle's actual load capacity.",
        },
      ]}
      sections={[
        {
          heading: "Why load index is a table, not a formula",
          paragraphs: [
            "Unlike most of the arithmetic elsewhere in this tool section, load index capacity is not calculated from a physical relationship — it is a standards table published by bodies including the Tire and Rim Association, assigning a specific load figure to each index number.",
            "The values increase roughly but not exactly exponentially as the index rises, reflecting the practical range of tire constructions rather than a clean mathematical curve. That is why this tool reproduces the table directly rather than approximating it with an equation — an approximation would be wrong at exactly the values that matter.",
            "A higher load index does not mean a physically larger tire in every case. Two tires of the same size can carry different load indices depending on their internal construction and ply rating, which is why the index — not just the size — matters when confirming a replacement tire is adequate.",
          ],
        },
        {
          heading: "How to use this when replacing tires",
          bullets: [
            "Find the original equipment load index on the vehicle's door-jamb placard, not the tire currently fitted if it may have been changed",
            "A replacement tire should match or exceed that index — never go lower",
            "Four-tire total capacity is not the same as vehicle GVWR — GVWR accounts for uneven load distribution and other factors",
            "A dual-rated tire (two numbers separated by a slash) shows single and dual-wheel-application capacity separately",
            "Load index and speed rating are independent figures — check both against the vehicle's requirement",
          ],
        },
      ]}
      faqs={[
        {
          question: "What does tire load index mean?",
          answer: "A code number that maps, via a published standards table, to the maximum load a single tire can carry at its rated maximum pressure.",
        },
        {
          question: "What is load index 91 in pounds?",
          answer: "1,356 lbs (615 kg) per tire, at the tire's rated maximum pressure.",
        },
        {
          question: "Can I use a tire with a lower load index than the original?",
          answer: "Not advisable. The original equipment load index reflects what the vehicle was engineered to carry safely — going lower under-rates the vehicle's actual load capacity even if the tire otherwise fits.",
        },
        {
          question: "Is load index the same as tire size?",
          answer: "No — it is a separate figure in the full size designation. Two tires of identical size can carry different load indices depending on internal construction.",
        },
        {
          question: "How is load index different from vehicle GVWR?",
          answer: "Load index is per tire; GVWR is the vehicle's total rated weight and accounts for load distribution and other factors, so simply multiplying tire capacity by four does not equal GVWR.",
        },
      ]}
      sources={[tireRimAssociation]}
    >
      <TireLoadIndexCalculator />
    </ToolPage>
  );
}
