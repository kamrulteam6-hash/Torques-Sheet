import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, specs } from "../../data";
import { Footer, Header, LineIcon } from "../../ui";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  const matches = specs.filter((spec) => {
    if (slug === "torque-specs") return spec.category === "Torque Specs";
    if (slug === "firing-order") return spec.category === "Firing Order";
    if (slug === "fluid-capacities") return spec.category === "Fluid Capacities";
    if (slug === "ignition-specs") return spec.category === "Ignition Specs";
    if (slug === "bolt-sequences")
      return ["intake", "head", "main", "rod"].includes(spec.diagram.type);
    if (slug === "timing-ignition") return spec.category === "Timing & Ignition";
    if (slug === "valve-specs") return spec.category === "Valve Specifications";
    if (slug === "diagrams") return true;
    return false;
  });
  return (
    <>
      <Header />
      <main className="inner-page">
        <section className="page-hero">
          <div className="shell">
            <div className="breadcrumbs">
              <Link href="/">Home</Link> / Categories / {category.title}
            </div>
            <h1>{category.title}</h1>
            <p>
              Browse precise, configuration-aware {category.title.toLowerCase()}{" "}
              organized by vehicle and engine.
            </p>
          </div>
        </section>
        <section className="shell page-content">
          <div className="hub-grid">
            {matches.map((s) => (
              <Link className="hub-card" href={`/specs/${s.slug}`} key={s.slug}>
                <span className="icon-box">
                  <LineIcon name={category.icon} />
                </span>
                <h3>{s.title}</h3>
                <p>
                  {s.make} · {s.model}
                </p>
                <span className="mini-link">Open reference →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
