import Link from "next/link";
import { Footer, Header, LineIcon } from "../ui";
import { JsonLd, collectionSchema, pageMetadata } from "../seo";
import { FAMILIES, toolPath, tools } from "./tools-data";
import { COMPARISON_PAIRS, comparisonPairPath } from "./tire-size-comparison/pairs";

export const metadata = pageMetadata({
  title: "Automotive Calculators & Tools",
  description:
    "Free tire size, gear ratio, speedometer error and wheel fitment calculators. No sign-up, no ads, and every result is a link you can bookmark or send to a shop.",
  path: "/tools",
});

export default function Page() {
  const schema = collectionSchema({
    name: "Automotive calculators and tools",
    description:
      "Tire sizing, drivetrain and wheel fitment calculators, each showing the arithmetic behind the result.",
    path: "/tools",
    trail: [
      { name: "Home", path: "/" },
      { name: "Tools", path: "/tools" },
    ],
    items: tools.map((tool) => ({ name: tool.name, path: toolPath(tool.slug) })),
  });

  return (
    <>
      <Header />
      <main className="inner-page">
        <section className="page-hero code-hub-hero">
          <div className="shell">
            <div className="breadcrumbs">
              <Link href="/">Home</Link> / Tools
            </div>
            <h1>Automotive calculators</h1>
            <p>
              Working tools rather than lead-capture forms. Every calculator runs entirely in your
              browser, shows the formula it used, and puts your inputs in the address bar — so the
              result is a link you can bookmark, send to a shop, or come back to next week and find
              exactly as you left it.
            </p>
            <span className="kicker">
              {tools.length} TOOLS · {COMPARISON_PAIRS.length} PRE-CALCULATED COMPARISONS · NO SIGN-UP
            </span>
          </div>
        </section>

        <section className="shell page-content">
          {FAMILIES.map((family) => {
            const members = tools.filter((tool) => tool.family === family.key);
            if (members.length === 0) return null;
            return (
              <section className="section-block" key={family.key}>
                <div className="section-heading">
                  <div>
                    <span className="kicker">{family.note.toUpperCase()}</span>
                    <h2>{family.title}</h2>
                  </div>
                </div>
                <div className="category-grid tool-grid">
                  {members.map((tool) => (
                    <Link className="category-card" href={toolPath(tool.slug)} key={tool.slug}>
                      <span className="icon-box">
                        <LineIcon name={tool.icon} />
                      </span>
                      <span className="category-copy">
                        <strong>{tool.name}</strong>
                        <small>{tool.blurb}</small>
                      </span>
                      <span className="arrow">→</span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          <section className="section-block">
            <div className="section-heading">
              <div>
                <span className="kicker">ALREADY WORKED OUT</span>
                <h2>Popular tire size comparisons</h2>
              </div>
              <Link href="/tools/tire-size-comparison">Compare any two sizes →</Link>
            </div>
            <div className="pair-grid">
              {COMPARISON_PAIRS.slice(0, 30).map((pair) => (
                <Link href={comparisonPairPath(pair)} key={`${pair.from}-${pair.to}`}>
                  <b>{pair.from}</b>
                  <em>vs</em>
                  <b>{pair.to}</b>
                </Link>
              ))}
            </div>
          </section>

          <section className="section-block">
            <div className="section-heading">
              <div>
                <span className="kicker">HOW THESE ARE BUILT</span>
                <h2>Why the arithmetic is on the page</h2>
              </div>
            </div>
            <div className="choose-grid">
              <div>
                <small>NOTHING HIDDEN</small>
                <p>
                  Every tool publishes the expressions it evaluates. If you would rather check a result
                  by hand, or explain it to someone at a parts counter, the working is there to follow
                  rather than something to take on trust.
                </p>
              </div>
              <div>
                <small>NOMINAL, NOT MEASURED</small>
                <p>
                  Tire figures are calculated from the size marked on the sidewall. Real tires vary from
                  nominal by a few millimetres between manufacturers, and more as tread wears. These
                  numbers plan a job; a tape measure finishes it.
                </p>
              </div>
            </div>
          </section>

          <div className="safety-note">
            <span>!</span>
            <p>
              <strong>Plan with these, verify on the vehicle.</strong> Calculated clearance is not
              measured clearance. Before committing to a tight fitment, check the actual gaps at full
              steering lock and full suspension compression, and confirm load ratings against the
              vehicle&apos;s own tire placard.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <JsonLd data={schema} />
    </>
  );
}
