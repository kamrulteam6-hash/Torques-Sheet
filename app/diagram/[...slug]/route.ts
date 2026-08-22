import { specs } from "../../data";
import { buildDiagramSvg } from "../../diagram-svg";
import { troubleCodeGuides } from "../../trouble-code-data";
import { buildTroubleCodeSvg } from "../../trouble-code-diagram";

/** Trouble-code diagrams live under /diagram/trouble-codes/<guide slug>.svg */
const TROUBLE_PREFIX = "trouble-codes/";

/**
 * Serves each page's static diagram as a real .svg asset.
 *
 * The same markup is inlined on the spec page so it renders without a second
 * request, but Image Search can only index a file at a URL — this route gives
 * the diagram one, and the page's ImageObject schema points here.
 */

export const dynamic = "force-static";

const diagramFor = (slug: string) => {
  if (slug.startsWith(TROUBLE_PREFIX)) {
    const guide = troubleCodeGuides.find((g) => g.slug === slug.slice(TROUBLE_PREFIX.length));
    return guide ? buildTroubleCodeSvg(guide) : null;
  }
  const spec = specs.find((s) => s.slug === slug);
  return spec ? buildDiagramSvg(spec) : null;
};

const asParams = (slug: string) => {
  const parts = slug.split("/");
  return { slug: [...parts.slice(0, -1), `${parts[parts.length - 1]}.svg`] };
};

export function generateStaticParams() {
  return [
    ...specs.filter((spec) => buildDiagramSvg(spec)).map((spec) => asParams(spec.slug)),
    ...troubleCodeGuides
      .filter((guide) => buildTroubleCodeSvg(guide))
      .map((guide) => asParams(`${TROUBLE_PREFIX}${guide.slug}`)),
  ];
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const parts = [...slug];
  const last = parts.pop();
  if (!last?.endsWith(".svg")) return new Response("Not found", { status: 404 });

  const diagram = diagramFor([...parts, last.replace(/\.svg$/, "")].join("/"));
  if (!diagram) return new Response("Not found", { status: 404 });

  return new Response(diagram.svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
