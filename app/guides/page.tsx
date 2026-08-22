import Link from "next/link";
import { guidePath, guides } from "../guides-data";
import { specs } from "../data";
import { JsonLd, collectionSchema, pageMetadata } from "../seo";
import { Footer, Header, LineIcon } from "../ui";

export const metadata = pageMetadata({
  title: "Procedure Guides",
  description:
    "Shared service procedures referenced across TorqueSheet specification pages: torque method, firing-order verification and engine-oil service.",
  path: "/guides",
});

const FAMILIES = [
  { key: "torque", title: "Torque method", note: "Thread condition · pattern · recheck · tools", icon: "torque" as const },
  { key: "firing", title: "Firing order and ignition", note: "Numbering · TDC · routing · verification", icon: "firing" as const },
  { key: "oil", title: "Engine oil service", note: "Capacity vs. viscosity · dipstick · filter · intervals", icon: "fluid" as const },
  { key: "ignition", title: "Ignition service", note: "Plug inspection · gap · installation torque", icon: "spark" as const },
];

export default function Page() {
  const usageCount = (slug: string) => specs.filter((spec) => spec.guides?.includes(slug)).length;
  const schema = collectionSchema({
    name: "Procedure guides",
    description: "Shared service procedures referenced across TorqueSheet specification pages.",
    path: "/guides",
    trail: [
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
    ],
    items: guides.map((guide) => ({ name: guide.title, path: guidePath(guide.slug) })),
  });

  return (
    <>
      <Header />
      <main className="inner-page">
        <section className="page-hero">
          <div className="shell">
            <div className="breadcrumbs">
              <Link href="/">Home</Link> / Guides
            </div>
            <h1>Procedure guides</h1>
            <p>
              These procedures are shared by many specification pages. They live here
              once, in full, rather than being repeated on every page that needs them —
              so each specification page can stay focused on the values for that exact
              vehicle.
            </p>
          </div>
        </section>
        <section className="shell page-content">
          {FAMILIES.map((family) => (
            <section className="section-block" key={family.key}>
              <div className="section-heading">
                <div>
                  <span className="kicker">{family.note}</span>
                  <h2>{family.title}</h2>
                </div>
              </div>
              <div className="hub-grid">
                {guides
                  .filter((guide) => guide.family === family.key)
                  .map((guide) => (
                    <Link className="hub-card" href={guidePath(guide.slug)} key={guide.slug}>
                      <span className="icon-box">
                        <LineIcon name={family.icon} />
                      </span>
                      <h3>{guide.title}</h3>
                      <p>{guide.metaDescription}</p>
                      <small>Used by {usageCount(guide.slug)} reference pages</small>
                      <span className="mini-link">Read the procedure →</span>
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </section>
        <JsonLd data={schema} />
      </main>
      <Footer />
    </>
  );
}
