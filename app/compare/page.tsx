import Link from "next/link";
import { comparisons, comparisonPath } from "../compare-data";
import { pageMetadata } from "../seo";
import { Footer, Header } from "../ui";

export const metadata = pageMetadata({
  title: "Truck Comparisons: Specs, Towing and Payload",
  description: "Compare full-size trucks with configuration-aware towing, payload, powertrain and ownership guidance—not just headline maximums.",
  path: "/compare",
});

export default function CompareHub() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TorqueSheet truck comparisons",
    url: "https://torquesheet.com/compare",
    hasPart: comparisons.map((item) => ({ "@type": "Article", name: item.title, url: `https://torquesheet.com${comparisonPath(item)}` })),
  };
  return <><Header/><main className="inner-page"><section className="page-hero compare-hub-hero"><div className="shell"><div className="breadcrumbs"><Link href="/">Home</Link> / Compare</div><span className="kicker">CONFIGURATION-AWARE BUYING GUIDES</span><h1>Compare trucks by the work they must do</h1><p>Headline ratings are only the starting point. These comparisons connect towing, payload, engine, cab and bed choices to the label on the truck you may actually buy.</p></div></section><section className="shell page-content"><div className="compare-card-grid">{comparisons.map((item) => <Link className="compare-card" href={comparisonPath(item)} key={item.slug}><small>2025 FULL-SIZE TRUCKS</small><h2>{item.title.replace("2025 ", "")}</h2><p>{item.description}</p><span>Open comparison →</span></Link>)}</div><div className="critical-callout"><span>!</span><div><strong>“Up to” is not your truck&apos;s rating</strong><p>Passengers, options, accessories, hitch weight and cargo consume payload. Use these pages to shortlist, then verify the certification, Tire and Loading Information, and trailering labels on the exact vehicle.</p></div></div></section></main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></>;
}
