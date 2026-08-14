import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { specs, slugify } from "../../data";
import { SpecVisual } from "../../spec-visual";
import { Footer, Header } from "../../ui";

const findSpec = (parts: string[]) =>
  specs.find((s) => s.slug === parts.join("/"));
export function generateStaticParams() {
  return specs.map((s) => ({ slug: s.slug.split("/") }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = findSpec(slug);
  if (!s) return { title: "Specification not found" };
  const url = `https://torquesheet.com/specs/${s.slug}`;
  return {
    title: s.title,
    description: s.metaDescription,
    keywords: [
      s.keyword,
      `${s.make} ${s.model} specs`,
      `${s.make} ${s.category}`,
      `${s.model} technical specifications`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${s.title} | TorqueSheet`,
      description: s.metaDescription,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: s.title,
      description: s.metaDescription,
    },
  };
}

export default async function SpecPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const s = findSpec(slug);
  if (!s) notFound();
  const index = specs.findIndex((x) => x.slug === s.slug);
  const related = [
    ...specs.filter(
      (x) => x.slug !== s.slug && x.make === s.make && x.model === s.model,
    ),
    ...specs.filter(
      (x) => x.slug !== s.slug && x.make === s.make && x.model !== s.model,
    ),
    ...specs.filter(
      (x) =>
        x.slug !== s.slug && x.make !== s.make && x.category === s.category,
    ),
  ]
    .filter((item, position, list) => list.indexOf(item) === position)
    .slice(0, 5);
  const url = `https://torquesheet.com/specs/${s.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        headline: s.title,
        description: s.metaDescription,
        dateModified: s.reviewed,
        datePublished: s.reviewed,
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: "TorqueSheet" },
        publisher: {
          "@type": "Organization",
          name: "TorqueSheet",
          url: "https://torquesheet.com",
        },
        about: [`${s.make} ${s.model}`, s.category],
        citation: s.sources.map((x) => x.url),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: s.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://torquesheet.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: s.make,
            item: `https://torquesheet.com/makes/${slugify(s.make)}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: s.title,
            item: url,
          },
        ],
      },
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
                <Link href="/">Home</Link> /{" "}
                <Link href={`/makes/${slugify(s.make)}`}>{s.make}</Link> /{" "}
                <span>{s.model}</span> / {s.category}
              </div>
              <div className="spec-label">
                <span>{s.category}</span>
                <span>Verified source trail</span>
              </div>
              <h1>{s.title}</h1>
              <p>{s.metaDescription}</p>
              <div className="review-line">
                <span>
                  Reviewed{" "}
                  {new Date(s.reviewed + "T00:00:00").toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" },
                  )}
                </span>
                <span>·</span>
                <span>
                  {s.sources.length} primary source
                  {s.sources.length === 1 ? "" : "s"}
                </span>
                <span>·</span>
                <span>Print-friendly</span>
              </div>
            </div>
          </section>
          <div className="shell article-shell">
            <aside className="toc">
              <strong>ON THIS PAGE</strong>
              <a href="#answer">Quick answer</a>
              <a href="#diagram">Interactive diagram</a>
              <a href="#procedure">Procedure</a>
              {s.sections.map((section, i) => (
                <a key={section.heading} href={`#section-${i}`}>
                  {section.heading}
                </a>
              ))}
              <a href="#faq">FAQs</a>
              <a href="#sources">Sources</a>
            </aside>
            <div className="article-main">
              <section id="answer" className="quick-answer">
                <small>QUICK ANSWER</small>
                <p>{s.answer}</p>
                <div className="scope-note">
                  <b>Application note:</b> {s.scope}
                </div>
              </section>
              <div className="intro-copy">
                {s.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <section id="diagram">
                <SpecVisual
                  diagram={s.diagram}
                  values={s.values}
                  copyText={`${s.title}\n${s.answer}\n${s.values.map((v) => `${v.label}: ${v.value} — ${v.note}`).join("\n")}\nSource: ${url}`}
                />
              </section>
              <section className="content-panel">
                <div className="content-panel-head">
                  <span className="kicker">REFERENCE TABLE</span>
                  <h2>{s.keyword.replace(/\b\w/g, (c) => c.toUpperCase())}</h2>
                </div>
                <div className="table-scroll">
                  <table className="spec-table">
                    <thead>
                      <tr>
                        <th>APPLICATION / ITEM</th>
                        <th>SPECIFICATION</th>
                        <th>NOTES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {s.values.map((v) => (
                        <tr key={v.label}>
                          <td>{v.label}</td>
                          <td>{v.value}</td>
                          <td>{v.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="table-note">{s.detail}</p>
              </section>
              <section id="procedure" className="article-section">
                <span className="kicker">STEP BY STEP</span>
                <h2>How to use this specification correctly</h2>
                <ol className="procedure-list">
                  {s.steps.map((step, i) => (
                    <li key={step}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
              {s.sections.map((section, i) => (
                <section
                  id={`section-${i}`}
                  className="article-section"
                  key={section.heading}
                >
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
                  <strong>Build-specific specifications take priority</strong>
                  <p>
                    {s.make} {s.model} specifications can change by model year,
                    engine, platform, wheel, and installed component. Confirm
                    the VIN or engine identity, part numbers, fastener
                    condition, and the current manufacturer instructions before
                    service.
                  </p>
                </div>
              </section>
              <section id="faq" className="article-section faq-section">
                <span className="kicker">COMMON QUESTIONS</span>
                <h2>{s.title} FAQs</h2>
                {s.faqs.map((f) => (
                  <details key={f.q}>
                    <summary>
                      {f.q}
                      <span>+</span>
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </section>
              <section id="sources" className="article-section source-section">
                <span className="kicker">SOURCE TRAIL</span>
                <h2>Technical sources</h2>
                <p>
                  TorqueSheet favors engine- and component-specific manufacturer
                  instructions over unsourced universal values.
                </p>
                {s.sources.map((source, i) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <b>{i + 1}</b>
                    <span>
                      <strong>{source.label}</strong>
                      <small>{source.note}</small>
                    </span>
                    <em>↗</em>
                  </a>
                ))}
                <div className="reviewed">
                  LAST TECHNICAL REVIEW · {s.reviewed}
                </div>
              </section>
              <section className="related-section">
                <span className="kicker">KEEP WORKING</span>
                <h2>Related {s.make} specifications</h2>
                <div className="related-grid">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/specs/${r.slug}`}>
                      <small>{r.category}</small>
                      <strong>{r.title}</strong>
                      <span>Open guide →</span>
                    </Link>
                  ))}
                </div>
              </section>
              <nav className="article-pagination">
                {index > 0 ? (
                  <Link href={`/specs/${specs[index - 1].slug}`}>
                    ← <span>Previous guide</span>
                  </Link>
                ) : (
                  <span />
                )}
                {index < specs.length - 1 && (
                  <Link href={`/specs/${specs[index + 1].slug}`}>
                    <span>Next guide</span> →
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
