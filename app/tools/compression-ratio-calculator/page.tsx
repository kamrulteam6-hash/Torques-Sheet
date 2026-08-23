import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { chevyHardcoreCompression, fordDynoTips, grassrootsOctane } from "../tool-sources";
import { CompressionRatioCalculator } from "./ui";

const tool = toolBySlug("compression-ratio-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Compression ratio compares how much space is above the piston at the bottom of its travel against how little is left at the top. The first figure is easy. The second is made up of four separate volumes — the chamber, the gasket, the deck clearance and the piston crown — and leaving any one of them out is why a hand-calculated ratio almost always comes out higher than the engine actually builds."
      steps={[
        {
          title: "Start with bore and stroke",
          detail:
            "These give the swept volume, which is the straightforward half of the calculation. Use measured figures on a rebuilt block rather than nominal ones — a block bored 0.030 over is no longer at its published bore.",
        },
        {
          title: "Get a real chamber volume",
          detail:
            "Published figures are nominal and heads vary, particularly after any machining. If the ratio matters, check the chamber with a burette and a plate rather than trusting the casting number.",
        },
        {
          title: "Use the compressed gasket thickness",
          detail:
            "Gaskets are quoted both as-supplied and compressed, and the difference is meaningful. Use the compressed figure and the gasket's own bore, which is usually a little larger than the cylinder bore.",
        },
        {
          title: "Measure deck clearance rather than assuming zero",
          detail:
            "Deck clearance is how far the piston crown sits below the deck surface at top dead centre. It is rarely zero on a production engine, and on a 4-inch bore even 0.025 inches is 5.1 cc of volume you would otherwise miss — enough to move the ratio by more than half a point.",
        },
        {
          title: "Enter the piston crown volume with the correct sign",
          detail:
            "A dish adds volume, so it is positive. A dome displaces volume, so it is negative. A flat top is zero. Getting the sign backwards is the single most common error in this calculation.",
        },
      ]}
      formula={[
        {
          label: "Compression ratio",
          expression: "CR = (swept volume + clearance volume) ÷ clearance volume",
          note: "The total volume at bottom dead centre divided by what remains at top dead centre.",
        },
        {
          label: "Swept volume",
          expression: "swept (cc) = π ÷ 4 × bore² × stroke × 16.387",
          note: "One cylinder's displacement, converted from cubic inches to cc.",
        },
        {
          label: "Gasket volume",
          expression: "gasket (cc) = π ÷ 4 × gasket bore² × compressed thickness × 16.387",
          note: "Uses the gasket's own bore, not the cylinder bore — they are rarely the same.",
        },
        {
          label: "Deck volume",
          expression: "deck (cc) = π ÷ 4 × bore² × deck clearance × 16.387",
          note: "Positive when the piston sits below the deck at TDC, negative when it protrudes above it.",
        },
      ]}
      sections={[
        {
          heading: "The four volumes people forget",
          paragraphs: [
            "Ask someone to work out a compression ratio and they will usually divide the cylinder volume by the chamber volume. That gives a number, and the number is wrong — generally by a full point or more.",
            "The chamber is only one of four contributions to clearance volume. The head gasket adds a disc of space between the block deck and the head, and on a typical 4.1-inch gasket bore at 0.041 inches compressed, that is about 8.9 cc. On the small-block worked through above, leaving it out takes the answer from 10.19:1 to 11.36:1 — over a full point of pure optimism.",
            "Deck clearance adds another. Unless the block has been decked to zero, the piston stops slightly below the deck surface, and that thin cylinder of space counts. On a 4-inch bore, 0.025 inches of deck is 5.1 cc — smaller than the gasket, but still more than half of it.",
            "And the piston crown works in either direction. A dished piston adds its dish volume; a domed piston subtracts the volume its dome occupies. Getting that sign wrong swings the answer dramatically in the wrong direction, which is why the tool above labels it explicitly.",
          ],
        },
        {
          heading: "Static ratio is not what the engine runs",
          paragraphs: [
            "Everything calculated here is the static compression ratio, measured from bottom dead centre. It is the standard figure, it is what parts are specified against, and it is not what the engine actually experiences.",
            "The reason is the camshaft. The intake valve does not close at bottom dead centre — it stays open well past it, and on a performance camshaft, considerably past it. Until that valve shuts, the piston is pushing mixture back out of the cylinder rather than compressing it. Effective compression only begins once it closes.",
            "That gives dynamic compression ratio, which is always lower than the static figure and depends on the camshaft as much as on the geometry. It is why a build can carry a static ratio that looks alarming on pump fuel and still be perfectly happy: a late-closing intake valve bleeds off enough cylinder pressure at low RPM to keep detonation away.",
            "The street rule of thumb among engine builders is a maximum dynamic ratio of about 8.5:1 with aluminium heads and 8.0:1 with iron. Reaching either figure assumes everything else is right — quench, operating temperature, mixture and the shape of the timing curve — which is the real point. Quench in particular does a great deal of work: a tight quench area squeezes mixture across the chamber and creates turbulence that speeds the flame front, while a chamber with little or no quench, such as a hemispherical one with a domed piston, gives the mixture nothing to work with and tolerates detonation poorly.",
            "The practical rule that follows: static compression and camshaft timing must be chosen together. A high static ratio with a mild camshaft is asking for detonation. A modest static ratio with a long-duration camshaft gives away low-end response for nothing. Neither problem is visible from the static number on its own.",
          ],
        },
        {
          heading: "What a single cc is worth",
          bullets: [
            "On a typical small-block, one cc of clearance volume moves the ratio by roughly 0.12 points",
            "A 5 cc chamber difference between two sets of heads is worth about half a ratio point",
            "Gasket thickness from 0.028 to 0.065 inches swings the ratio by close to a full point",
            "Decking the block 0.010 inches recovers about a quarter of a point",
            "Piston dish and dome volumes are the largest single lever, at up to 20 cc either way",
            "Which is why measuring matters more than any of the individual assumptions",
          ],
        },
        {
          heading: "Choosing a ratio you can actually run",
          paragraphs: [
            "The ratio a build can tolerate depends on far more than the number itself, but a few boundaries are reliable enough to plan around.",
            "The head material sets much of it, and the allowance is larger and better documented than most people expect. Aluminium conducts heat roughly six times better than cast iron, so an aluminium head pulls heat out of the charge faster and leaves less of it available to trigger detonation. Piston manufacturers generally put the limit for cast iron heads on 93 octane at about 9.5:1, and for aluminium heads on the same fuel at about 10.5:1. Drop to 87 octane and both fall by roughly three quarters of a point, to around 8.7:1 on iron and 9.7:1 on aluminium.",
            "Those are not hard walls, but they are a realistic starting point — and they explain a common experience: an iron-headed 10:1 engine that rattles on 92 octane will frequently stop rattling when aluminium heads of the same chamber volume are fitted, with nothing else changed.",
            "Above 10.5:1 you are committed to premium fuel and to getting the rest of it right: ignition timing, chamber shape, and a camshaft that bleeds off some low-speed cylinder pressure. Hot weather and a heavy load are what find the margin, not a cold morning.",
            "For a boosted engine the logic inverts. Compression is deliberately kept low — often 8.0:1 to 9.0:1 — because the turbocharger or supercharger is adding cylinder pressure on top of whatever the geometry already produces. A high static ratio plus meaningful boost is how pistons get holed.",
            "In every case the static figure is a starting point for the conversation rather than the end of it. Fuel quality, chamber design, cooling, timing and camshaft all move the boundary.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do you calculate compression ratio?",
          answer:
            "Add the swept volume to the clearance volume, then divide by the clearance volume. Clearance volume is the chamber plus the gasket plus the deck clearance plus or minus the piston crown volume.",
        },
        {
          question: "Does head gasket thickness affect compression?",
          answer:
            "Considerably. On a typical V8, moving from a 0.028-inch to a 0.065-inch compressed gasket adds around 8 cc of clearance volume, which can drop the ratio by more than a full point.",
        },
        {
          question: "What compression ratio is safe on pump gas?",
          answer:
            "On 93 octane, piston manufacturers generally put the limit around 9.5:1 with cast iron heads and 10.5:1 with aluminium. On 87 octane those drop to roughly 8.7:1 and 9.7:1. Chamber design, quench and cam timing all move the boundary.",
        },
        {
          question: "How much more compression can aluminium heads take?",
          answer:
            "About a full ratio point at the same fuel quality. Aluminium conducts heat roughly six times better than cast iron, so it pulls heat out of the charge faster and leaves less available to trigger detonation.",
        },
        {
          question: "What is a safe dynamic compression ratio for the street?",
          answer:
            "The commonly used figures are about 8.5:1 with aluminium heads and 8.0:1 with iron. Reaching either assumes quench, operating temperature, mixture and timing curve are all correct.",
        },
        {
          question: "Is a dome piston positive or negative volume?",
          answer:
            "Negative. A dome occupies space in the chamber, reducing clearance volume and raising the ratio. A dish adds volume and is entered as positive.",
        },
        {
          question: "What is deck clearance?",
          answer:
            "How far the piston crown sits below the block deck surface at top dead centre. It forms a thin cylinder of clearance volume that is easy to forget and often as significant as the gasket.",
        },
        {
          question: "What is the difference between static and dynamic compression?",
          answer:
            "Static is calculated from bottom dead centre and ignores valve timing. Dynamic measures from where the intake valve actually closes, so it is always lower and depends heavily on the camshaft.",
        },
        {
          question: "What compression ratio should a turbo engine have?",
          answer:
            "Lower than a naturally aspirated equivalent — commonly 8.0:1 to 9.0:1 — because the boost adds cylinder pressure on top of the mechanical ratio. High static compression with meaningful boost is how engines get damaged.",
        },
        {
          question: "How much does 1 cc change the compression ratio?",
          answer:
            "On a typical small-block V8, about 0.12 of a ratio point. Which is why a 5 cc difference in chamber volume between two sets of heads is worth roughly half a ratio point, and why measuring beats assuming.",
        },
      ]}
      sources={[chevyHardcoreCompression, grassrootsOctane, fordDynoTips]}
    >
      <CompressionRatioCalculator />
    </ToolPage>
  );
}
