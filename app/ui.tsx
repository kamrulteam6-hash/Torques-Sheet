"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories, makes, popular, specs, vehicleData, slugify, type IconName } from "./data";

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

export function LineIcon({ name, size = 32 }: { name: IconName; size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>;
}

export function SearchIcon({ size = 20 }: { size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg>;
}

export function Brand() {
  return <Link className="brand" href="/" aria-label="TorqueSheet home"><span className="brand-mark"><span>TS</span></span><span className="brand-copy"><strong>TORQUE<span>SHEET</span></strong><small>MECHANICAL REFERENCE</small></span></Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="shell header-inner"><Brand/><button className="menu-button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}><span/><span/><span/></button><nav className={open ? "nav open" : "nav"}><Link href="/category/torque-specs">Specifications</Link><Link href="/makes/chevrolet">Makes</Link><Link href="/editorial-policy">Editorial policy</Link><Link href="/about">About</Link></nav></div></header>;
}

export function Footer() {
  return <><section className="assurance"><div className="shell assurance-grid"><div><span className="trust-symbol">✓</span><p><strong>Sources shown.</strong><br/>Check the application.</p></div><div><span className="trust-symbol">▤</span><p><strong>{specs.length} reference pages.</strong><br/>{makes.length} vehicle makes.</p></div><div><span className="trust-symbol">◷</span><p><strong>Review status visible.</strong><br/>Drafts stay out of search.</p></div></div></section><footer><div className="shell footer-inner"><p>© 2026 TorqueSheet Mechanical Reference</p><nav><Link href="/about">About</Link><Link href="/editorial-policy">Editorial Policy</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Use</Link></nav></div></footer></>;
}

export function StaticPage({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return <><Header/><main className="inner-page"><section className="page-hero"><div className="shell"><div className="breadcrumbs"><Link href="/">Home</Link> / {eyebrow}</div><h1>{title}</h1></div></section><section className="shell page-content utility">{children}</section></main><Footer/></>;
}

function VehicleSelector() {
  const router = useRouter();
  const [year, setYear] = useState(""); const [make, setMake] = useState(""); const [model, setModel] = useState(""); const [engine, setEngine] = useState("");
  const models = make ? Object.keys(vehicleData[make] || {}) : [];
  const engines = make && model ? vehicleData[make]?.[model] || [] : [];
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (!make) return; const match = specs.find(s => s.make === make && s.model.toLowerCase().includes(model.toLowerCase().split(" ")[0])); router.push(match ? `/specs/${match.slug}` : `/makes/${slugify(make)}?model=${slugify(model)}&year=${year}&engine=${slugify(engine)}`); };
  return <form className="selector" onSubmit={submit}><div className="selector-grid"><label>YEAR<select value={year} onChange={e=>setYear(e.target.value)} required><option value="">Select Year</option>{Array.from({length:31},(_,i)=>2026-i).map(y=><option key={y}>{y}</option>)}</select></label><label>MAKE<select value={make} onChange={e=>{setMake(e.target.value);setModel("");setEngine("");}} required><option value="">Select Make</option>{makes.map(m=><option key={m}>{m}</option>)}</select></label><label>MODEL<select value={model} onChange={e=>{setModel(e.target.value);setEngine("");}} required disabled={!make}><option value="">Select Model</option>{models.map(m=><option key={m}>{m}</option>)}</select></label><label>ENGINE<select value={engine} onChange={e=>setEngine(e.target.value)} required disabled={!model}><option value="">Select Engine</option>{engines.map(e=><option key={e}>{e}</option>)}</select></label></div><button className="primary" type="submit">FIND SPECS <span>→</span></button></form>;
}

function SearchBox() {
  const router = useRouter(); const [query,setQuery]=useState("");
  const results = useMemo(()=>query.length<2?[]:specs.filter(x=>`${x.title} ${x.keyword}`.toLowerCase().includes(query.toLowerCase())).slice(0,5).map(x=>({label:x.title,href:`/specs/${x.slug}`})),[query]);
  const submit=(e:React.FormEvent)=>{e.preventDefault(); if(results[0]) router.push(results[0].href); else router.push(`/search?q=${encodeURIComponent(query)}`)};
  return <div className="search-wrap"><form className="search-box" onSubmit={submit}><SearchIcon size={24}/><input value={query} onChange={e=>setQuery(e.target.value)} aria-label="Search specifications" placeholder="Search by keyword (e.g., Chevy 350 firing order, F-150 lug nut torque…)"/><button type="submit">Search</button></form>{results.length>0&&<div className="search-suggestions">{results.map(r=><Link href={r.href} key={r.href}><SearchIcon size={16}/>{r.label}</Link>)}</div>}</div>;
}

function Stat({ icon, value, label }: { icon: IconName; value: string; label: string }) { return <div className="stat"><LineIcon name={icon}/><p><strong>{value}</strong><span>{label}</span></p></div>; }

export function HomePage() {
  return <div><Header/><main><section className="hero"><div className="grid-noise"/><div className="shell hero-inner"><div className="eyebrow">THE MECHANIC&apos;S QUICK REFERENCE</div><h1>Find the Exact Specs<br/>for Any Vehicle</h1><p className="hero-copy">Torque values, firing orders, fluid capacities, spark plug gaps and diagrams—organized by year, make, model and engine.</p><VehicleSelector/><SearchBox/></div></section><section className="shell content"><div className="stats"><Stat icon="diagram" value={String(specs.length)} label="Specification pages"/><Stat icon="timing" value={String(makes.length)} label="Vehicle makes"/><Stat icon="sequence" value="Source-linked" label="Review status shown"/><Stat icon="firing" value="Interactive" label="Downloadable diagrams"/></div><section className="section-block"><div className="section-heading"><div><span className="kicker">START WITH THE JOB</span><h2>Browse by specification</h2></div><Link href="/category/torque-specs">View all categories →</Link></div><div className="category-grid">{categories.map(c=><Link className="category-card" href={c.slug==="diagrams"?"/diagrams":`/category/${c.slug}`} key={c.slug}><span className="icon-box"><LineIcon name={c.icon}/></span><span className="category-copy"><strong>{c.title}</strong><small>{c.note}</small></span><span className="arrow">→</span></Link>)}</div></section><section className="section-block"><div className="section-heading"><div><span className="kicker">QUICK ACCESS</span><h2>Popular lookups</h2></div></div><div className="popular-grid">{popular.map(p=><Link href={p.href} key={p.href}><SearchIcon size={19}/><span>{p.label}</span><b>→</b></Link>)}</div></section><section className="section-block makes-block"><div className="section-heading"><div><span className="kicker">SHOP BY BRAND</span><h2>Browse popular makes</h2></div><Link href="/makes/chevrolet">All makes →</Link></div><div className="make-grid">{makes.map((m)=><Link href={`/makes/${slugify(m)}`} key={m}><span className="car-icon"><i/><i/><i/></span><strong>{m}</strong><small>{specs.filter((s)=>s.make===m).length} reference pages</small></Link>)}</div></section><div className="safety-note"><span>!</span><p><strong>Precision matters.</strong> Always match the model year, engine code and fastener before beginning service. Critical values should be confirmed against current manufacturer information.</p></div></section></main><Footer/></div>;
}
