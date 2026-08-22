import Link from "next/link";
import { specsForCategory } from "../data";
import { JsonLd, collectionSchema, pageMetadata } from "../seo";
import { Footer, Header, LineIcon } from "../ui";

export const metadata = pageMetadata({ title: "Vehicle and Engine Diagrams", description: "Browse print-friendly firing-order, bolt-sequence, timing, wiring, and mechanical reference diagrams by vehicle and engine.", path: "/diagrams" });

export default function Page() {
  const rows = specsForCategory("diagrams");
  const schema = collectionSchema({
    name: "Mechanical diagrams",
    description: "Print-friendly firing orders, torque patterns and engine reference layouts.",
    path: "/diagrams",
    trail: [{ name: "Home", path: "/" }, { name: "Diagrams", path: "/diagrams" }],
    items: rows.map((s) => ({ name: s.title, path: `/specs/${s.slug}` })),
  });
  return <><Header/><main className="inner-page"><section className="page-hero"><div className="shell"><div className="breadcrumbs"><Link href="/">Home</Link> / Diagrams</div><h1>Mechanical diagrams</h1><p>Print-friendly firing orders, torque patterns and engine reference layouts.</p></div></section><section className="shell page-content"><div className="hub-grid">{rows.map(s=><Link className="hub-card" href={`/specs/${s.slug}`} key={s.slug}><span className="icon-box"><LineIcon name="diagram"/></span><h3>{s.title}</h3><p>{s.make} · {s.model}</p><span className="mini-link">Open diagram reference →</span></Link>)}</div></section><JsonLd data={schema}/></main><Footer/></>;
}
