import Link from "next/link";
import { specs } from "../data";
import { Footer, Header, LineIcon } from "../ui";
export default function Page(){return <><Header/><main className="inner-page"><section className="page-hero"><div className="shell"><div className="breadcrumbs"><Link href="/">Home</Link> / Diagrams</div><h1>Mechanical diagrams</h1><p>Print-friendly firing orders, torque patterns and engine reference layouts.</p></div></section><section className="shell page-content"><div className="hub-grid">{specs.map(s=><Link className="hub-card" href={`/specs/${s.slug}`} key={s.slug}><span className="icon-box"><LineIcon name="diagram"/></span><h3>{s.title}</h3><p>{s.make} · {s.model}</p><span className="mini-link">Open diagram reference →</span></Link>)}</div></section></main><Footer/></>}
