import type { Metadata } from "next";
import Link from "next/link";
import { makes, slugify, specs } from "../../data";
import { pageMetadata } from "../../seo";
import { Footer, Header, LineIcon } from "../../ui";
import { editorialStatus } from "../../content-quality";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return makes.map((make) => ({ make: slugify(make) }));
}

const findMake = (slug: string) => makes.find((make) => slugify(make) === slug);

export async function generateMetadata({ params }: { params: Promise<{ make: string }> }): Promise<Metadata> {
  const { make } = await params;
  const title = findMake(make);
  if (!title) return { title: "Vehicle Make Not Found" };
  return pageMetadata({
    title: `${title} Specifications, Torque Values and Diagrams`,
    description: `Browse ${title} torque specifications, firing orders, fluid capacities, ignition data, service charts, and mechanical diagrams.`,
    path: `/makes/${make}`,
  });
}

export default async function MakePage({ params }: { params: Promise<{ make: string }> }) {
  const { make } = await params; const title = findMake(make); if (!title) notFound(); const matches=specs.filter(s=>s.make===title);
  return <><Header/><main className="inner-page"><section className="page-hero"><div className="shell"><div className="breadcrumbs"><Link href="/">Home</Link> / Makes / {title}</div><h1>{title} specifications</h1><p>Technical reference pages for {title} engines, models and service procedures. Each page shows whether it has a direct document citation or needs application-specific verification.</p></div></section><section className="shell page-content">{matches.length?<><div className="hub-grid">{matches.map(s=><Link className="hub-card" href={`/specs/${s.slug}`} key={s.slug}><span className="icon-box"><LineIcon name="torque"/></span><h3>{s.title}</h3><p>{s.category} · {s.model}</p><small>{editorialStatus(s).label}</small><span className="mini-link">View spec →</span></Link>)}</div>{title==="Chevrolet"&&<p className="hub-more"><Link href="/makes/chevrolet/350">Browse the complete Chevy 350 engine hub →</Link></p>}</>:<div className="critical-callout"><span>i</span><div><strong>Coverage is being prepared</strong><p>No {title} reference has passed the current source-trail requirements yet.</p></div></div>}</section></main><Footer/></>;
}
