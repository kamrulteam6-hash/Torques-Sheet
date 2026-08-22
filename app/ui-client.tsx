"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { slugify } from "./slug";

export type SearchEntry = { label: string; href: string; text: string };

export function SearchIcon({ size = 20 }: { size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg>;
}

export function HeaderNav() {
  const [open, setOpen] = useState(false);
  return <><button className="menu-button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}><span/><span/><span/></button><nav className={open ? "nav open" : "nav"}><Link href="/category/torque-specs">Specifications</Link><Link href="/compare">Compare</Link><Link href="/guides">Guides</Link><Link href="/trouble-codes">Trouble Codes</Link><Link href="/makes/chevrolet">Makes</Link></nav></>;
}

export function VehicleSelector({ makes, vehicleData, index }: { makes: string[]; vehicleData: Record<string, Record<string, string[]>>; index: SearchEntry[] }) {
  const router = useRouter();
  const [year, setYear] = useState(""); const [make, setMake] = useState(""); const [model, setModel] = useState(""); const [engine, setEngine] = useState("");
  const models = make ? Object.keys(vehicleData[make] || {}) : [];
  const engines = make && model ? vehicleData[make]?.[model] || [] : [];
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make) return;
    const needle = `${make} ${model.split(" ")[0]}`.toLowerCase();
    const match = index.find((entry) => entry.text.includes(needle));
    router.push(match ? match.href : `/makes/${slugify(make)}?model=${slugify(model)}&year=${year}&engine=${slugify(engine)}`);
  };
  return <form className="selector" onSubmit={submit}><div className="selector-grid"><label>YEAR<select value={year} onChange={e=>setYear(e.target.value)} required><option value="">Select Year</option>{Array.from({length:31},(_,i)=>2026-i).map(y=><option key={y}>{y}</option>)}</select></label><label>MAKE<select value={make} onChange={e=>{setMake(e.target.value);setModel("");setEngine("");}} required><option value="">Select Make</option>{makes.map(m=><option key={m}>{m}</option>)}</select></label><label>MODEL<select value={model} onChange={e=>{setModel(e.target.value);setEngine("");}} required disabled={!make}><option value="">Select Model</option>{models.map(m=><option key={m}>{m}</option>)}</select></label><label>ENGINE<select value={engine} onChange={e=>setEngine(e.target.value)} required disabled={!model}><option value="">Select Engine</option>{engines.map(e=><option key={e}>{e}</option>)}</select></label></div><button className="primary" type="submit">FIND SPECS <span>→</span></button></form>;
}

export function SearchBox({ index }: { index: SearchEntry[] }) {
  const router = useRouter(); const [query,setQuery]=useState("");
  const results = useMemo(()=>{
    if(query.length<2)return[];
    const needle=query.toLowerCase();
    return index.filter(x=>x.text.includes(needle)).slice(0,5);
  },[query,index]);
  const submit=(e:React.FormEvent)=>{e.preventDefault(); if(results[0]) router.push(results[0].href); else router.push(`/search?q=${encodeURIComponent(query)}`)};
  return <div className="search-wrap"><form className="search-box" onSubmit={submit}><SearchIcon size={24}/><input value={query} onChange={e=>setQuery(e.target.value)} aria-label="Search specifications" placeholder="Search by keyword (e.g., Chevy 350 firing order, F-150 lug nut torque…)"/><button type="submit">Search</button></form>{results.length>0&&<div className="search-suggestions">{results.map(r=><Link href={r.href} key={r.href}><SearchIcon size={16}/>{r.label}</Link>)}</div>}</div>;
}
