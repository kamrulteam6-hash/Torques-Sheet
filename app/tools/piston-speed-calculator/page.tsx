import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { chevyHardcoreCompression, fordDynoTips } from "../tool-sources";
import { PistonSpeedCalculator } from "./ui";

const tool = toolBySlug("piston-speed-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Redline is usually set by valvetrain limits, by the point fuel and ignition can no longer keep up, or simply by what a manufacturer is confident will survive warranty. Underneath all of that sits a more fundamental limit: how fast the piston itself is physically travelling up and down the bore. That figure is mean piston speed, and it depends on stroke and RPM alone — nothing else about the engine changes it."
      steps={[
        {
          title: "Enter the stroke, not the bore",
          detail:
            "Piston speed has nothing to do with bore diameter or displacement. Two engines with identical strokes have identical piston speeds at the same RPM regardless of how different their bores or cylinder counts are.",
        },
        {
          title: "Enter the engine speed you want to check",
          detail:
            "Often this is a proposed or actual redline, but it is worth checking at a typical cruising RPM too, to see how much margin exists during normal driving.",
        },
        {
          title: "Read the band, not just the raw number",
          detail:
            "The figure alone means little without context. The band tells you roughly what kind of engine build is expected to run sustained at that piston speed.",
        },
        {
          title: "Use the threshold table to find your own RPM ceiling",
          detail:
            "Rather than checking one RPM at a time, the table shows the engine speed your specific stroke reaches at each commonly cited threshold — useful when planning how far a given bottom end can realistically be pushed.",
        },
        {
          title: "Treat this as one input among several, not a complete verdict",
          detail:
            "Piston speed sets a durability expectation. It says nothing about valvetrain, oiling, ignition or fuel delivery, all of which can limit a real engine well before piston speed does.",
        },
      ]}
      formula={[
        {
          label: "Mean piston speed",
          expression: "MPS (ft/min) = 2 × stroke (in) × RPM ÷ 12",
          note: "Reduces to stroke × RPM ÷ 6. The 2 accounts for two strokes — up and down — per revolution.",
        },
        {
          label: "Why bore is absent",
          expression: "MPS depends only on stroke and RPM",
          note: "Bore determines displacement and airflow, but the piston's own travel distance is set entirely by the crank throw.",
        },
        {
          label: "RPM at a target piston speed",
          expression: "RPM = target MPS × 6 ÷ stroke",
          note: "The same formula solved for engine speed, useful for finding a stroke's practical RPM ceiling.",
        },
        {
          label: "Metric conversion",
          expression: "m/s = ft/min × 0.3048 ÷ 60",
          note: "European and Japanese literature often quotes piston speed in metres per second instead.",
        },
      ]}
      sections={[
        {
          heading: "Why stroke alone decides it",
          paragraphs: [
            "A piston travels the full length of the stroke twice per crankshaft revolution — once up, once down — and it has to decelerate to zero and reverse direction at both ends of that travel. Mean piston speed simply averages that motion over one full stroke.",
            "Because it is purely a distance-over-time calculation, only the distance (stroke) and the time (RPM) matter. Bore changes how much air and fuel the cylinder holds and how big the flame front has to travel, but it changes nothing about how far the piston itself moves in a given revolution.",
            "This is why two engines with very different displacements can share an identical piston speed limit. A short-stroke, big-bore engine and a modest-bore, longer-stroke engine at the same stroke length experience exactly the same piston speed at the same RPM, however different their character and output.",
          ],
        },
        {
          heading: "Why this figure is a real engineering limit",
          paragraphs: [
            "Piston speed matters because acceleration, not top speed, is what stresses components. The piston is not moving at constant velocity through the stroke — it starts at zero at top dead centre, accelerates hard through the middle, and decelerates back to zero at bottom dead centre, all within a fraction of a second at high RPM.",
            "That acceleration produces genuinely large inertial loads on the connecting rod, the wrist pin, the rod bolts and the bearings — loads that scale with the square of engine speed, which is why the relationship gets punishing quickly as RPM rises rather than increasing gently.",
            "Ring seal is affected too. At sufficiently high piston speed, the rings begin to struggle to follow the cylinder wall accurately through the direction changes, which costs both power and oil control. This is one of several reasons very high piston speeds correlate with declining volumetric and mechanical efficiency, independent of anything else about the engine.",
          ],
        },
        {
          heading: "Roughly where the bands sit, and why they are approximate",
          bullets: [
            "Under about 2,000 ft/min — ordinary production engines cruise here for their full service life",
            "2,000 to 3,000 ft/min — where most factory performance engines sit at redline",
            "3,000 to 4,000 ft/min — forged internals and careful oiling become the norm rather than the exception",
            "4,000 to 5,000 ft/min — genuine race-engine territory, with a correspondingly race-engine rebuild interval",
            "Above 5,000 ft/min — the range Formula 1 engines have operated in, demanding exotic materials",
            "These thresholds are widely cited engineering rules of thumb rather than hard physical limits — metallurgy, rod design and oiling all shift where trouble actually begins",
          ],
        },
        {
          heading: "How this interacts with the stroker decision",
          paragraphs: [
            "Piston speed is the other side of the trade-off whenever a build lengthens the stroke to add displacement, and it is worth weighing alongside the extra cubic inches.",
            "A longer stroke reaches any given piston speed at a lower RPM than a shorter one does. That is precisely why long-stroke engines characteristically make their power lower in the rev range and why short-stroke, oversquare engines can rev so much further — for the same piston speed limit, the shorter stroke simply gets there at a higher RPM.",
            "This is why a stroker build aimed at more torque, built with high-RPM cylinder heads and camshaft, is fighting itself. The added stroke lowers the practical RPM ceiling at the same time as the valvetrain is asking for more of it, and piston speed is the reason that conflict is real rather than theoretical.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate mean piston speed?",
          answer:
            "Multiply the stroke in inches by the RPM, then divide by 6. A 3.48-inch stroke at 6,000 rpm gives 3,480 feet per minute.",
        },
        {
          question: "Does bore affect piston speed?",
          answer:
            "No. Mean piston speed depends only on stroke and RPM. Two engines with identical strokes have identical piston speeds at the same engine speed regardless of how different their bores are.",
        },
        {
          question: "What is a safe piston speed for a street engine?",
          answer:
            "Most factory performance engines run their redline somewhere between 2,000 and 3,000 feet per minute. Sustained running above about 4,000 typically calls for a forged rotating assembly and a race-engine service schedule.",
        },
        {
          question: "Why does a longer stroke lower an engine's redline?",
          answer:
            "Because it reaches any given piston speed at a lower RPM. A longer stroke travels further per revolution, so the piston hits the same speed limit sooner as RPM climbs — which is why long-stroke engines characteristically make power lower in the range.",
        },
        {
          question: "Why do short-stroke engines rev higher?",
          answer:
            "For the same piston speed limit, a shorter stroke reaches it at a higher RPM, because there is less distance to cover per revolution. That is the mechanical reason oversquare, short-stroke engines can safely rev further than long-stroke ones.",
        },
        {
          question: "What piston speed do Formula 1 engines run?",
          answer:
            "In the region of 5,000 feet per minute or more at their extremely high redlines, which is why they rely on exotic materials and a completely different approach to the rotating assembly than any street engine.",
        },
        {
          question: "Does piston speed affect ring seal?",
          answer:
            "At sufficiently high speeds, yes — the rings begin to struggle to track the cylinder wall accurately through the rapid direction changes at each end of the stroke, costing both power and oil control.",
        },
        {
          question: "Is piston speed the only thing that limits RPM?",
          answer:
            "No. Valvetrain limits, fuel delivery, ignition and oiling can all impose a lower practical ceiling than piston speed does. It is a durability expectation, not the sole determining factor.",
        },
      ]}
      sources={[chevyHardcoreCompression, fordDynoTips]}
    >
      <PistonSpeedCalculator />
    </ToolPage>
  );
}
