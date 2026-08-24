import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation } from "../tool-sources";
import { CasterCalculator } from "./ui";

const tool = toolBySlug("caster-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Caster can't be read directly off a stationary wheel the way camber and toe can — it's the tilt of the steering axis itself, which only reveals itself as the wheel turns. This uses the sweep method every caster gauge is built on: turn the wheel a set angle each way from centre, read how camber changes between those two positions, and the trigonometry gives caster."
      steps={[
        {
          title: "Set the front wheels straight ahead",
          detail: "This is the starting reference position both steering sweeps are measured from.",
        },
        {
          title: "Turn the wheel a fixed angle to one side and measure camber",
          detail: "20 degrees each way (40 degrees total sweep) is a common gauge setting, but any consistent, known angle works for this calculation.",
        },
        {
          title: "Turn the wheel the same angle to the other side and measure camber again",
          detail: "The difference between these two camber readings — not either one alone — is what the caster calculation actually uses.",
        },
        {
          title: "Enter the camber change and the total sweep angle",
          detail: "Total sweep is both directions added together — 40 degrees for a 20-degrees-each-way test, not 20.",
        },
      ]}
      formula={[
        {
          label: "Caster from the sweep method",
          expression: "caster = arctan(camber change ÷ (2 × sin(sweep angle ÷ 2)))",
          note: "The exact trigonometric relationship built into bubble and digital caster gauges, worked from a two-position camber measurement.",
        },
      ]}
      sections={[
        {
          heading: "Why caster can only be measured indirectly",
          paragraphs: [
            "Camber and toe are both angles you can, in principle, read directly off a stationary wheel — camber from vertical lean, toe from the wheel's angle relative to the vehicle's centreline. Caster has no such direct reading available, because it describes the tilt of the steering axis itself, not the wheel's resting position.",
            "That steering axis tilt only becomes visible through its effect on camber as the wheel turns. On a car with positive caster, turning the wheel causes the outside wheel to gain negative camber and the inside wheel to gain positive camber — a real, measurable consequence of the steering axis geometry, even though caster itself was never directly observed.",
            "The sweep method exploits exactly that relationship: measure camber at two known steering angles, and the camber change between them, combined with how far the wheel was turned, mathematically implies the caster angle that would produce it.",
          ],
        },
        {
          heading: "What more caster actually does",
          bullets: [
            "Increases self-centring — the steering wants to return to straight ahead after a turn, without driver input",
            "Improves straight-line stability at speed, which is why most vehicles run meaningfully positive caster",
            "Increases steering effort, since the geometry works against the driver as much as it works for stability",
            "Changes camber gain through steering input — more positive caster means more camber change as the wheel turns, which affects contact patch during hard cornering with substantial steering angle",
            "Power steering assistance is largely why modern vehicles can run more positive caster than older unassisted-steering cars typically could",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I measure caster without a gauge?",
          answer: "Use the sweep method: turn the wheel a known angle each way from straight ahead, measure the camber change between those two positions, and calculate caster from the camber change and the total sweep angle.",
        },
        {
          question: "Why can't I measure caster the same way as camber?",
          answer: "Camber is a directly observable lean of the stationary wheel. Caster describes the steering axis tilt, which has no direct static reading — it only reveals itself through how camber changes as the wheel is turned.",
        },
        {
          question: "What sweep angle should I use for a caster measurement?",
          answer: "20 degrees each way (40 degrees total) is a common setting on commercial caster gauges, but any known, consistent sweep angle works for the calculation — accuracy comes from measuring the angle precisely, not from a specific value.",
        },
        {
          question: "What does more positive caster do?",
          answer: "Increases straight-line stability and steering self-centring, at the cost of heavier steering effort. It also increases how much camber changes as the wheel is turned.",
        },
      ]}
      sources={[fordDynoTips, tireRimAssociation]}
    >
      <CasterCalculator />
    </ToolPage>
  );
}
