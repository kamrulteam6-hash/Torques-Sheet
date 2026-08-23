import Link from "next/link";
import { Footer, Header, LineIcon } from "../ui";
import { JsonLd, ORIGIN, breadcrumbSchema } from "../seo";
import { toolBySlug, toolPath, type ToolEntry } from "./tools-data";
import { REVIEWED, type ToolSource } from "./tool-sources";

/** Same review date as the visible line, in the form schema.org expects. */
const REVIEWED_ISO = "2026-08-23";

/**
 * Server shell shared by every calculator page. It owns the chrome, the JSON-LD
 * and the surrounding editorial content; the interactive part is passed in as
 * `children` and is the only client code on the page.
 */

/**
 * The closing caveat differs by what the tool measures. A tire page needs to
 * say that nominal sizes are not measured ones; an engine page needs to say
 * that a calculated volume is not a checked one. Sharing a single tire-specific
 * note across all of them was simply wrong on the engine pages.
 */
const CAVEATS: Record<ToolEntry["family"], { title: string; body: string }> = {
  tire: {
    title: "Nominal sizes, not measured ones.",
    body: "Every figure here is calculated from the size marked on the sidewall. Real tires vary from nominal by a few millimetres between manufacturers, and more as tread wears or pressure changes. Use these numbers to plan and to sanity-check a quote — measure the actual tire before committing to a tight fitment.",
  },
  drivetrain: {
    title: "Calculated, not measured.",
    body: "These figures assume nominal tire sizes and the ratios you entered. Real rolling radius changes with load, pressure and wear, and a vehicle's actual axle ratio is not always the one on the door sticker. Verify the ratio on the differential tag before spending anything on gearing.",
  },
  fitment: {
    title: "The wheel is only half the fitment.",
    body: "This calculates where the rim sits. The tire mounted on it reaches further out and further in than the rim does, and that rubber is what makes contact. Check the actual gaps at the strut and inside the fender, at full steering lock and full suspension compression, before ordering.",
  },
  engine: {
    title: "Nominal dimensions, not checked ones.",
    body: "These results are only as good as the figures entered. On a rebuilt engine, bore, chamber volume and deck clearance all differ from the published specification — sometimes considerably. Where the answer matters, measure the chamber with a burette and check deck clearance rather than trusting a casting number.",
  },
  "running-cost": {
    title: "One measurement is a sample, not a pattern.",
    body: "A single tank reflects the driving you happened to do: weather, traffic, load and terrain all move the figure. Take several measurements across different conditions before treating any one of them as your vehicle's real economy, and recalculate when fuel prices move.",
  },
};

export type ToolSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ToolFaq = { question: string; answer: string };

export type ToolStep = { title: string; detail: string };

export function toolSchema({
  tool,
  faqs,
  steps,
  sources,
}: {
  tool: ToolEntry;
  faqs: ToolFaq[];
  steps: ToolStep[];
  sources: ToolSource[];
}) {
  const url = `${ORIGIN}${toolPath(tool.slug)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebApplication", "SoftwareApplication"],
        "@id": `${url}#app`,
        name: tool.title,
        description: tool.description,
        url,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@type": "Organization", name: "TorqueSheet", url: ORIGIN },
        dateModified: REVIEWED_ISO,
        citation: sources.map((source) => ({
          "@type": "CreativeWork",
          name: source.label,
          url: source.url,
        })),
      },
      {
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: `How to use the ${tool.name}`,
        description: tool.description,
        step: steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.title,
          text: step.detail,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Tools", path: "/tools" },
        { name: tool.name, path: toolPath(tool.slug) },
      ]),
    ],
  };
}

export function ToolPage({
  slug,
  intro,
  children,
  steps,
  sections,
  faqs,
  formula,
  sources,
}: {
  slug: string;
  intro: string;
  children: React.ReactNode;
  steps: ToolStep[];
  sections: ToolSection[];
  faqs: ToolFaq[];
  formula?: { label: string; expression: string; note: string }[];
  sources: ToolSource[];
}) {
  const tool = toolBySlug(slug)!;
  const related = tool.related.map((item) => toolBySlug(item)!).filter(Boolean);

  return (
    <>
      <Header />
      <main className="inner-page">
        <section className="page-hero tool-hero">
          <div className="shell">
            <div className="breadcrumbs">
              <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / {tool.name}
            </div>
            <div className="tool-heading">
              <span className="tool-icon">
                <LineIcon name={tool.icon} size={34} />
              </span>
              <div>
                <span className="kicker">FREE · NO SIGN-UP · WORKS OFFLINE ONCE LOADED</span>
                <h1>{tool.title}</h1>
              </div>
            </div>
            <p>{intro}</p>
            <div className="review-line">
              <span>TORQUESHEET RESEARCH DESK</span>
              <span>·</span>
              <span>FORMULA PUBLISHED</span>
              <span>·</span>
              <span>REVIEWED {REVIEWED.toUpperCase()}</span>
            </div>
          </div>
        </section>

        <div className="shell tool-layout">
          <article>
            {children}

            <section className="article-section" id="how-to-use">
              <span className="kicker">HOW TO USE IT</span>
              <h2>Getting a number you can act on</h2>
              <ol className="procedure-list">
                {steps.map((step, index) => (
                  <li key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <p>{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {formula && formula.length > 0 && (
              <section className="article-section" id="formula">
                <span className="kicker">THE ARITHMETIC</span>
                <h2>What the calculator is actually doing</h2>
                <p>
                  Nothing here is proprietary. If you would rather check it by hand, or explain it to
                  someone at a counter, these are the same expressions the tool evaluates.
                </p>
                <div className="formula-stack">
                  {formula.map((item) => (
                    <div className="formula-row" key={item.label}>
                      <small>{item.label}</small>
                      <code>{item.expression}</code>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {sections.map((section, index) => (
              <section className="article-section" id={`detail-${index}`} key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="check-list long-checks">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="article-section faq-section" id="faq">
              <span className="kicker">COMMON QUESTIONS</span>
              <h2>{tool.name} FAQ</h2>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>
                    {faq.question}
                    <span>+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </section>

            <section className="article-section source-section" id="sources">
              <span className="kicker">SOURCE TRAIL</span>
              <h2>Standards and references behind these figures</h2>
              <p>
                The arithmetic on this page is fixed, but the boundaries and conventions around it come
                from published standards and manufacturer guidance. These are the documents they come
                from, so you can check them rather than take them on trust.
              </p>
              {sources.map((source, index) => (
                <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <span>
                    <strong>{source.label}</strong>
                    <small>{source.note}</small>
                  </span>
                  <em>↗</em>
                </a>
              ))}
            </section>

            <div className="safety-note">
              <span>!</span>
              <p>
                <strong>{CAVEATS[tool.family].title}</strong> {CAVEATS[tool.family].body}
              </p>
            </div>
          </article>

          <aside className="comparison-aside">
            <div className="side-card">
              <span className="kicker">ON THIS PAGE</span>
              <a href="#calculator">The calculator</a>
              <a href="#how-to-use">How to use it</a>
              {formula && formula.length > 0 && <a href="#formula">The arithmetic</a>}
              {sections.map((section, index) => (
                <a href={`#detail-${index}`} key={section.heading}>
                  {section.heading}
                </a>
              ))}
              <a href="#faq">FAQ</a>
              <a href="#sources">Sources</a>
            </div>
            <div className="side-card">
              <span className="kicker">RELATED TOOLS</span>
              {related.map((item) => (
                <Link href={toolPath(item.slug)} key={item.slug}>
                  {item.name}
                </Link>
              ))}
              <Link href="/tools">All tools →</Link>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <JsonLd data={toolSchema({ tool, faqs, steps, sources })} />
    </>
  );
}
