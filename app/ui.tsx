import Link from "next/link";
import { categories, makes, popular, searchIndex, siteStats, slugify, specsForMake, vehicleData, type IconName } from "./data";
import { comparisons, comparisonPath } from "./compare-data";
import { troubleCodeGuides, troubleCodePath } from "./trouble-code-data";
import { JsonLd, pageSchema } from "./seo";
import { HeaderNav, SearchBox, SearchIcon, VehicleSelector } from "./ui-client";

export { SearchIcon };

const paths: Record<IconName, string> = {
  torque: "M5 17 15 7m-1-3 6 6-3 3-3-3-8 8-5 1 1-5 8-8Z",
  firing: "M6 18 18 6M8 8l3-3m5 8 3-3M5 15l4 4m5-5 5 5M11 10l3 3",
  fluid: "M4 10h11l3 3h2v5H8l-4-4v-4Zm3 0V6h6l2 4",
  spark: "m14 3-4 7 4 2-5 9 9-11-4-2 3-7Z",
  sequence: "M6 6h12M6 18h12M6 6v12M18 6v12M9 12h6M12 9v6",
  timing: "M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M12 12l4-3",
  valve: "M10 3h4v4l3 11H7l3-11V3Zm-4 17h12",
  diagram: "M4 5h16v14H4V5Zm3 3h5v4H7V8Zm8 1h2m-2 4h2M7 16h10",
};

/** Client-side lookup payload: labels and hrefs only, never full spec records. */
const lookupIndex = [
  ...searchIndex,
  ...comparisons.map((x) => ({ label: x.title, href: comparisonPath(x), text: `${x.title} ${x.rival}`.toLowerCase() })),
  ...troubleCodeGuides.map((x) => ({ label: x.title, href: troubleCodePath(x), text: `${x.code} ${x.title} ${x.definition}`.toLowerCase() })),
];

export function LineIcon({ name, size = 32 }: { name: IconName; size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>;
}

export function Brand() {
  return <Link className="brand" href="/" aria-label="TorqueSheet home"><span className="brand-mark"><span>TS</span></span><span className="brand-copy"><strong>TORQUE<span>SHEET</span></strong><small>MECHANICAL REFERENCE</small></span></Link>;
}

export function Header() {
  return <header className="site-header"><div className="shell header-inner"><Brand/><HeaderNav/></div></header>;
}

export function Footer() {
  return <><section className="assurance"><div className="shell assurance-grid"><div><span className="trust-symbol">✓</span><p><strong>Sources shown.</strong><br/>Check the application.</p></div><div><span className="trust-symbol">▤</span><p><strong>{siteStats.specCount} reference pages.</strong><br/>{siteStats.makeCount} vehicle makes.</p></div><div><span className="trust-symbol">◷</span><p><strong>Review status visible.</strong><br/>Every page shows its source trail.</p></div></div></section><footer><div className="shell footer-inner"><p>© 2026 TorqueSheet Mechanical Reference</p><nav><Link href="/about">About</Link><Link href="/editorial-policy">Editorial Policy</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Use</Link></nav></div></footer></>;
}

export function StaticPage({ title, eyebrow, children, path, description, pageType = "WebPage" }: { title: string; eyebrow: string; children: React.ReactNode; path?: string; description?: string; pageType?: "AboutPage" | "ContactPage" | "WebPage" }) {
  const schema = path
    ? pageSchema({
        type: pageType,
        name: title,
        description: description ?? title,
        path,
        trail: [{ name: "Home", path: "/" }, { name: eyebrow, path }],
      })
    : null;
  return <><Header/><main className="inner-page"><section className="page-hero"><div className="shell"><div className="breadcrumbs"><Link href="/">Home</Link> / {eyebrow}</div><h1>{title}</h1></div></section><section className="shell page-content utility">{children}</section>{schema && <JsonLd data={schema}/>}</main><Footer/></>;
}

function Stat({ icon, value, label }: { icon: IconName; value: string; label: string }) { return <div className="stat"><LineIcon name={icon}/><p><strong>{value}</strong><span>{label}</span></p></div>; }

export function HomePage() {
  return <div><Header/><main><section className="hero"><div className="grid-noise"/><div className="shell hero-inner"><div className="eyebrow">THE MECHANIC&apos;S QUICK REFERENCE</div><h1>Find the Exact Specs<br/>for Any Vehicle</h1><p className="hero-copy">Torque values, firing orders, fluid capacities, trouble-code diagnostics and vehicle comparisons—organized so the application and source stay visible.</p><VehicleSelector makes={makes} vehicleData={vehicleData} index={lookupIndex}/><SearchBox index={lookupIndex}/></div></section><section className="shell content"><div className="stats"><Stat icon="diagram" value={String(siteStats.specCount)} label="Specification pages"/><Stat icon="timing" value={String(siteStats.makeCount)} label="Vehicle makes"/><Stat icon="sequence" value="Source-linked" label="Review status shown"/><Stat icon="firing" value="Interactive" label="Tools and diagrams"/></div><section className="section-block"><div className="section-heading"><div><span className="kicker">START WITH THE JOB</span><h2>Browse by specification</h2></div><Link href="/category/torque-specs">View all categories →</Link></div><div className="category-grid">{categories.map(c=><Link className="category-card" href={c.slug==="diagrams"?"/diagrams":`/category/${c.slug}`} key={c.slug}><span className="icon-box"><LineIcon name={c.icon}/></span><span className="category-copy"><strong>{c.title}</strong><small>{c.note}</small></span><span className="arrow">→</span></Link>)}</div></section><section className="section-block"><div className="section-heading"><div><span className="kicker">MAKE A SHORTLIST</span><h2>Compare full-size trucks</h2></div><Link href="/compare">All comparisons →</Link></div><div className="home-feature-grid">{comparisons.map((item)=><Link className="home-feature-card compare-entry" href={comparisonPath(item)} key={item.slug}><small>2025 COMPARISON</small><strong>F-150 vs. {item.rivalShort}</strong><span>Ratings, powertrains and buyer tool →</span></Link>)}</div></section><section className="section-block"><div className="section-heading"><div><span className="kicker">DIAGNOSE BEFORE REPLACING</span><h2>Ford F-150 5.0L trouble codes</h2></div><Link href="/trouble-codes">All trouble codes →</Link></div><div className="home-feature-grid">{troubleCodeGuides.map((guide)=><Link className="home-feature-card code-entry" href={troubleCodePath(guide)} key={guide.code}><span className="code-token">{guide.code}</span><strong>{guide.definition}</strong><small>Symptoms, scan data and test sequence</small></Link>)}</div></section><section className="section-block"><div className="section-heading"><div><span className="kicker">QUICK ACCESS</span><h2>Popular lookups</h2></div></div><div className="popular-grid">{popular.map(p=><Link href={p.href} key={p.href}><SearchIcon size={19}/><span>{p.label}</span><b>→</b></Link>)}</div></section><section className="section-block makes-block"><div className="section-heading"><div><span className="kicker">SHOP BY BRAND</span><h2>Browse popular makes</h2></div><Link href="/makes/chevrolet">All makes →</Link></div><div className="make-grid">{makes.map((m)=><Link href={`/makes/${slugify(m)}`} key={m}><span className="car-icon"><i/><i/><i/></span><strong>{m}</strong><small>{specsForMake(m).length} reference pages</small></Link>)}</div></section><div className="safety-note"><span>!</span><p><strong>Precision matters.</strong> Always match the model year, engine code and fastener before beginning service. Critical values should be confirmed against current manufacturer information.</p></div></section></main><Footer/></div>;
}
