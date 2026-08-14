import Link from "next/link";
import { specs } from "../../data";
import { Footer, Header, LineIcon } from "../../ui";

export default async function MakePage({ params }: { params: Promise<{ make: string }> }) {
  const { make } = await params; const title = make.split("-").map(x=>x[0].toUpperCase()+x.slice(1)).join(" "); const matches=specs.filter(s=>s.make.toLowerCase()===title.toLowerCase());
  return <><Header/><main className="inner-page"><section className="page-hero"><div className="shell"><div className="breadcrumbs"><Link href="/">Home</Link> / Makes / {title}</div><h1>{title} specifications</h1><p>Technical reference pages for {title} engines, models and service procedures.</p></div></section><section className="shell page-content"><div className="hub-grid">{(matches.length?matches:specs.slice(0,6)).map(s=><Link className="hub-card" href={`/specs/${s.slug}`} key={s.slug}><span className="icon-box"><LineIcon name="torque"/></span><h3>{s.title}</h3><p>{s.category} · {s.model}</p><span className="mini-link">View spec →</span></Link>)}</div></section></main><Footer/></>;
}
