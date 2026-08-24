import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, saeCorrection } from "../tool-sources";
import { BoostPressureRatioCalculator } from "./ui";

const tool = toolBySlug("boost-pressure-ratio-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="A boost gauge reads gauge pressure — how far above whatever the atmosphere already provides. A compressor map is built on absolute pressure ratio, which needs the actual atmospheric pressure feeding the compressor inlet, not an assumed sea-level figure. This calculates that ratio properly, correcting for altitude."
      steps={[
        {
          title: "Enter the boost pressure a gauge would read",
          detail: "This is gauge pressure by definition — the reading shows zero at atmospheric pressure and rises from there, which is exactly why the atmospheric baseline matters for what comes next.",
        },
        {
          title: "Enter the altitude the vehicle actually operates at",
          detail: "Not sea level by default unless that's genuinely where the vehicle runs. Even a few thousand feet changes the atmospheric baseline meaningfully.",
        },
        {
          title: "Read the pressure ratio, not the boost figure, against a compressor map",
          detail: "Compressor maps plot efficiency against pressure ratio and corrected mass flow — using gauge boost pressure directly against a map built on absolute pressure ratio will place the operating point in the wrong spot.",
        },
        {
          title: "Compare against sea level to see the altitude effect",
          detail: "The same boost gauge reading produces a measurably different pressure ratio at altitude, because the same delta represents a larger fraction of a lower atmospheric baseline.",
        },
      ]}
      formula={[
        {
          label: "Pressure ratio",
          expression: "PR = (boost psi + atmospheric psi) ÷ atmospheric psi",
          note: "Absolute pressure divided by absolute pressure — the figure a compressor map is actually built against.",
        },
        {
          label: "Atmospheric pressure at altitude",
          expression: "P = 14.696 × (1 − 6.8756×10⁻⁶ × altitude(ft))^5.2559",
          note: "The standard barometric formula for the US Standard Atmosphere model, used here rather than a rough linear approximation.",
        },
      ]}
      sections={[
        {
          heading: "Why the same boost pressure means a different pressure ratio at altitude",
          paragraphs: [
            "A boost gauge measures the difference between manifold pressure and whatever the atmosphere happens to be providing at that location — it has no way of knowing what atmospheric pressure actually is, only the gap above it.",
            "At sea level, atmospheric pressure is close to 14.7 psi, so 15 psi of boost produces an absolute pressure of about 29.7 psi against that 14.7 psi baseline — a pressure ratio near 2.02. At 5,000 feet, atmospheric pressure drops to roughly 12.2 psi, so the same 15 psi gauge reading now sits on top of a smaller baseline, producing an absolute pressure of about 27.2 psi against 12.2 — a pressure ratio near 2.23.",
            "That is a meaningfully different point on a compressor map from the same boost gauge number, which is exactly why altitude correction matters for anyone tuning at elevation, or comparing dyno results between a sea-level shop and a mountain-elevation one.",
          ],
        },
        {
          heading: "Why the barometric formula rather than a flat number per foot of altitude",
          bullets: [
            "Atmospheric pressure does not fall linearly with altitude — the rate of decrease itself slows as pressure drops",
            "The standard barometric formula used here models the real, non-linear relationship rather than a rough approximation",
            "At low altitudes (under a few thousand feet) a linear approximation is close enough for most purposes",
            "At higher elevations the difference from a linear guess becomes more significant",
            "The exponent in the formula comes from the physics of a compressible atmosphere under gravity, not an empirical fit",
          ],
        },
      ]}
      faqs={[
        {
          question: "What is boost pressure ratio?",
          answer: "The absolute pressure after boost is added, divided by atmospheric pressure. It is the figure compressor maps are built against — not the gauge boost pressure alone.",
        },
        {
          question: "How do I calculate pressure ratio from boost psi?",
          answer: "Add boost pressure to atmospheric pressure to get absolute pressure, then divide by atmospheric pressure. At sea level with 15 psi boost, that's (15 + 14.7) ÷ 14.7 ≈ 2.02.",
        },
        {
          question: "Does altitude affect turbo boost?",
          answer: "It affects the pressure ratio a given gauge boost reading produces — the same psi of boost sits on top of a lower atmospheric baseline at altitude, producing a higher pressure ratio than the identical reading at sea level.",
        },
        {
          question: "Why can't I just use gauge boost pressure on a compressor map?",
          answer: "Compressor maps are built on absolute pressure ratio, not gauge pressure. Using gauge pressure directly ignores the atmospheric baseline the compressor is actually working against, placing the operating point incorrectly on the map.",
        },
      ]}
      sources={[saeCorrection, fordDynoTips]}
    >
      <BoostPressureRatioCalculator />
    </ToolPage>
  );
}
