import { specs } from "../../data";
import { buildDiagramSvg } from "../../diagram-svg";

/**
 * Serves each page's static diagram as a real .svg asset.
 *
 * The same markup is inlined on the spec page so it renders without a second
 * request, but Image Search can only index a file at a URL — this route gives
 * the diagram one, and the page's ImageObject schema points here.
 */

export const dynamic = "force-static";

const diagramFor = (slug: string) => {
  const spec = specs.find((s) => s.slug === slug);
  return spec ? buildDiagramSvg(spec) : null;
};

export function generateStaticParams() {
  return specs
    .filter((spec) => buildDiagramSvg(spec))
    .map((spec) => {
      const parts = spec.slug.split("/");
      return { slug: [...parts.slice(0, -1), `${parts[parts.length - 1]}.svg`] };
    });
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
