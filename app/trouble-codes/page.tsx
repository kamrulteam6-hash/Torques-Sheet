import Link from "next/link";
import { pageMetadata } from "../seo";
import { troubleCodeGuides, troubleCodePath } from "../trouble-code-data";
import { Footer, Header } from "../ui";

export const metadata = pageMetadata({
  title: "OBD-II Trouble Code Diagnostic Guides",
  description: "Vehicle- and engine-specific OBD-II trouble-code guides with severity, scan-data clues, test sequences and source trails.",
  path: "/trouble-codes",
});

export default function TroubleCodeHub(){
  const schema={"@context":"https://schema.org","@type":"CollectionPage",name:"TorqueSheet trouble-code guides",url:"https://torquesheet.com/trouble-codes",hasPart:troubleCodeGuides.map((guide)=>({"@type":"TechArticle",name:guide.title,url:`https://torquesheet.com${troubleCodePath(guide)}`}))};
  return <><Header/><main className="inner-page"><section className="page-hero code-hub-hero"><div className="shell"><div className="breadcrumbs"><Link href="/">Home</Link> / Trouble Codes</div><span className="kicker">TEST FIRST. REPLACE SECOND.</span><h1>Vehicle-specific trouble-code guides</h1><p>A code tells you which monitor failed—not which part to buy. Start with the exact vehicle, engine, symptoms and freeze-frame conditions.</p></div></section><section className="shell page-content"><div className="code-card-grid">{troubleCodeGuides.map((guide)=><Link className="code-card" href={troubleCodePath(guide)} key={guide.slug}><span className="code-token">{guide.code}</span><div><small>FORD F-150 · 5.0L V8</small><h2>{guide.definition}</h2><p>{guide.description}</p><b>Open diagnostic guide →</b></div></Link>)}</div><div className="critical-callout"><span>!</span><div><strong>A trouble code is not a parts verdict</strong><p>Save freeze frame and companion codes before clearing them. A flashing check-engine light, severe shaking, overheating, low oil pressure or abnormal mechanical noise warrants stopping rather than continuing a test drive.</p></div></div></section></main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></>;
}
