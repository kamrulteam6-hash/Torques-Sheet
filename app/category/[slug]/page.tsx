import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, specsForCategory } from "../../data";
import { JsonLd, collectionSchema, pageMetadata } from "../../seo";
import { Footer, Header, LineIcon } from "../../ui";
import { editorialStatus } from "../../content-quality";

export function generateStaticParams() {
  // /category/diagrams redirects to /diagrams (see next.config.ts).
  return categories
    .filter((category) => category.slug !== "diagrams")
    .map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) return { title: "Specification Category Not Found" };
  return pageMetadata({
    title: `${category.title} by Vehicle and Engine`,
    description: `Browse source-linked ${category.title.toLowerCase()} organized by vehicle, engine, model year, and application.`,
    path: `/category/${category.slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  const matches = specsForCategory(slug);
  const schema = collectionSchema({
    name: category.title,
    description: `Source-linked ${category.title.toLowerCase()} organized by vehicle and engine.`,
    path: `/category/${category.slug}`,
    trail: [
      { name: "Home", path: "/" },
      { name: category.title, path: `/category/${category.slug}` },
    ],
    items: matches.map((s) => ({ name: s.title, path: `/specs/${s.slug}` })),
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
          <div className="critical-callout">
            <span>i</span>
            <div>
              <strong>Review status is shown on every reference</strong>
              <p>Every published reference is crawlable and included in the XML sitemap. The status label distinguishes pages with a direct application-specific source from broader reference pages that still require an exact vehicle-manual check before service work.</p>
            </div>
          </div>
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
                <small>{editorialStatus(s).label}</small>
                <span className="mini-link">Open reference →</span>
              </Link>
            ))}
          </div>
        </section>
        <JsonLd data={schema} />
      </main>
      <Footer />
    </>
  );
}
