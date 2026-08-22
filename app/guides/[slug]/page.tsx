import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guideBySlug, guidePath, guides } from "../../guides-data";
import { specs } from "../../data";
import { JsonLd, ORIGIN, breadcrumbSchema, pageMetadata } from "../../seo";
import { Footer, Header } from "../../ui";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  if (!guide) return { title: "Guide Not Found" };
  return pageMetadata({
    title: guide.title,
    description: guide.metaDescription,
    path: guidePath(guide.slug),
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  if (!guide) notFound();

  // Pages that link this guide — the reverse of spec.guides, so the
  // relationship is navigable in both directions.
  const using = specs.filter((spec) => spec.guides?.includes(guide.slug)).slice(0, 12);
  const usingCount = specs.filter((spec) => spec.guides?.includes(guide.slug)).length;
  const url = `${ORIGIN}${guidePath(guide.slug)}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: guide.title,
        description: guide.metaDescription,
        datePublished: guide.reviewed,
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: "TorqueSheet Research Desk", url: `${ORIGIN}/editorial-policy` },
        publisher: { "@type": "Organization", name: "TorqueSheet", url: ORIGIN, publishingPrinciples: `${ORIGIN}/editorial-policy` },
        step: (guide.procedure?.length
          ? guide.procedure.map((step, i) => ({ "@type": "HowToStep", position: i + 1, text: step }))
          : guide.sections.map((section, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: section.heading,
              text: [...(section.paragraphs ?? []), ...(section.bullets ?? [])].join(" "),
            }))),
      },
      ...(guide.faqs.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: guide.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: guide.title, path: guidePath(guide.slug) },
      ]),
    ],
  };

  return (
    <>
      <Header />
      <main className="inner-page">
        <article>
          <section className="page-hero spec-hero">
            <div className="shell">
              <div className="breadcrumbs">
                <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Procedure
              </div>
              <div className="spec-label">
                <span>Procedure guide</span>
                <span>Applies to {usingCount} reference pages</span>
              </div>
              <h1>{guide.title}</h1>
              <p>{guide.metaDescription}</p>
            </div>
          </section>
          <div className="shell article-shell">
            <aside className="toc">
              <strong>ON THIS PAGE</strong>
              {guide.procedure && guide.procedure.length > 0 && <a href="#procedure">Procedure</a>}
              {guide.sections.map((section, i) => (
                <a key={section.heading} href={`#section-${i}`}>
                  {section.heading}
                </a>
              ))}
              {guide.faqs.length > 0 && <a href="#faq">FAQs</a>}
              <a href="#applies-to">Where this applies</a>
            </aside>
            <div className="article-main">
              <div className="intro-copy">
                {guide.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {guide.procedure && guide.procedure.length > 0 && (
                <section id="procedure" className="article-section">
                  <span className="kicker">STEP BY STEP</span>
                  <h2>Procedure</h2>
                  <ol className="procedure-list">
                    {guide.procedure.map((step, i) => (
                      <li key={step}>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        <p>{step}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
              {guide.sections.map((section, i) => (
                <section id={`section-${i}`} className="article-section" key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs?.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {section.bullets && (
                    <ul className="check-list">
                      {section.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
              <section className="critical-callout">
                <span>!</span>
                <div>
                  <strong>This guide describes a general procedure</strong>
                  <p>
                    Values, sequences and intervals are vehicle-specific. Use the
                    specification page for your exact year, engine and component
                    alongside this procedure, and follow the manufacturer document it
                    cites.
                  </p>
                </div>
              </section>
              {guide.faqs.length > 0 && (
                <section id="faq" className="article-section faq-section">
                  <span className="kicker">COMMON QUESTIONS</span>
                  <h2>{guide.title} FAQs</h2>
                  {guide.faqs.map((f) => (
                    <details key={f.q}>
                      <summary>
                        {f.q}
                        <span>+</span>
                      </summary>
                      <p>{f.a}</p>
                    </details>
                  ))}
                </section>
              )}
              <section id="applies-to" className="related-section">
                <span className="kicker">WHERE THIS APPLIES</span>
                <h2>Specification pages using this procedure</h2>
                <div className="related-grid">
                  {using.map((spec) => (
                    <Link key={spec.slug} href={`/specs/${spec.slug}`}>
                      <small>{spec.category}</small>
                      <strong>{spec.title}</strong>
                      <span>Open specification →</span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </article>
        <JsonLd data={schema} />
      </main>
      <Footer />
    </>
  );
}
