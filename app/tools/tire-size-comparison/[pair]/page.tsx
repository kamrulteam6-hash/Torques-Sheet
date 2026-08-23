import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "../../../ui";
import { JsonLd, ORIGIN, breadcrumbSchema, pageMetadata } from "../../../seo";
import { compareTires, round, signed, tireGeometry } from "../../tire-math";
import { COMPARISON_PAIRS, comparisonPairPath, pairSlug, parsePairSlug, relatedPairs, segmentLabel } from "../pairs";

export function generateStaticParams() {
  return COMPARISON_PAIRS.map((pair) => ({ pair: pairSlug(pair) }));
}

type Params = { params: Promise<{ pair: string }> };

const resolve = (slug: string) => {
  const parsed = parsePairSlug(slug);
  if (!parsed) return null;
  const from = tireGeometry(parsed.from);
  const to = tireGeometry(parsed.to);
  return { from, to, result: compareTires(from, to) };
};

export async function generateMetadata({ params }: Params) {
  const { pair } = await params;
  const data = resolve(pair);
  if (!data) return pageMetadata({ title: "Tire Size Comparison", description: "Compare two tire sizes.", path: "/tools/tire-size-comparison" });
  const { from, to, result } = data;
  const taller = result.diameterDiff >= 0 ? "taller" : "shorter";
  return pageMetadata({
    title: `${from.size.label} vs ${to.size.label} — Tire Size Comparison`,
    description: `${to.size.label} is ${round(Math.abs(result.diameterDiff), 2)} inches ${taller} than ${from.size.label}, a ${signed(result.diameterPct, 1)}% diameter change. Full comparison of width, sidewall, clearance and speedometer error.`,
    path: `/tools/tire-size-comparison/${pair}`,
  });
}

/** Server-rendered scale overlay — indexable, and needs no client JavaScript. */
function Overlay({ fromD, toD, rim, fromLabel, toLabel }: { fromD: number; toD: number; rim: number; fromLabel: string; toLabel: string }) {
  const box = 300;
  const pad = 20;
  const largest = Math.max(fromD, toD);
  const scale = (box - pad * 2) / largest;
  const c = box / 2;
  return (
    <svg className="overlay-drawing large" viewBox={`0 0 ${box} ${box}`} role="img" aria-label={`Scale overlay: ${fromLabel} measures ${round(fromD, 2)} inches in overall diameter, ${toLabel} measures ${round(toD, 2)} inches`}>
      <circle cx={c} cy={c} r={(fromD / 2) * scale} className="from-tire" />
      <circle cx={c} cy={c} r={(toD / 2) * scale} className="to-tire" />
      <circle cx={c} cy={c} r={(rim / 2) * scale} className="rim" />
      <text x={c} y={c + 4} className="drawing-rim" textAnchor="middle">{rim}&quot;</text>
    </svg>
  );
}

export default async function Page({ params }: Params) {
  const { pair } = await params;
  const data = resolve(pair);
  if (!data) notFound();
  const { from, to, result } = data;
  const known = COMPARISON_PAIRS.find((item) => pairSlug(item) === pair);
  const related = known ? relatedPairs(known) : [];

  const taller = result.diameterDiff >= 0;
  const wider = result.widthDiff >= 0;
  const path = `/tools/tire-size-comparison/${pair}`;
  const speeds = [30, 45, 60, 75];

  /**
   * Classify the shape of the swap so the page can talk about what someone is
   * actually doing, rather than reciting the same generic advice under every
   * pair of numbers. Four situations cover almost everything people compare.
   */
  const rimChanged = from.size.rim !== to.size.rim;
  const aspectDropped = to.size.aspect < from.size.aspect - 1;
  const kind = rimChanged
    ? aspectDropped
      ? "plus-size"
      : "rim-change"
    : Math.abs(result.diameterPct) < 1.5
      ? "lateral"
      : taller
        ? "upsize"
        : "downsize";

  const framing: Record<string, { heading: string; paragraphs: string[] }> = {
    "plus-size": {
      heading: "This is a plus-size: bigger wheel, shorter sidewall",
      paragraphs: [
        `Going from ${from.size.label} to ${to.size.label} moves the rim from ${from.size.rim} inches to ${to.size.rim} and drops the aspect ratio from ${round(from.size.aspect, 0)} to ${round(to.size.aspect, 0)}. That is the classic plus-size pattern, and the intention behind it is usually appearance and steering response rather than clearance.`,
        `The sidewall shrinks from ${round(from.sidewall, 2)} inches to ${round(to.sidewall, 2)} — ${round(Math.abs(result.sidewallDiff), 2)} inches less rubber between the rim and the road. Less sidewall flex sharpens turn-in and makes the steering feel more immediate, which is the point.`,
        `The trade is real and worth stating plainly. A shorter sidewall transmits more of the road surface into the cabin, and it leaves the rim far more exposed to pothole damage. Replacement cost also rises, because both the larger wheel and the lower-profile tire are more expensive than what they replace.`,
      ],
    },
    "rim-change": {
      heading: "This swap changes the wheel as well as the tire",
      paragraphs: [
        `${from.size.label} and ${to.size.label} sit on different rims — ${from.size.rim} inches against ${to.size.rim}. That makes this a wheel purchase rather than a tire purchase, and the cost difference between the two is substantial.`,
        `Because the aspect ratio has not dropped to compensate, the overall diameter moves by ${signed(result.diameterPct, 1)}%. Check that figure against the 3% guidance before treating this as a straight swap.`,
        `Also confirm the new wheel's offset and width suit the vehicle. A different rim diameter says nothing about where the wheel sits laterally, and that is decided separately by offset and width.`,
      ],
    },
    lateral: {
      heading: "Effectively the same rolling diameter",
      paragraphs: [
        `These two sizes differ by only ${signed(result.diameterPct, 1)}% in overall diameter, which for most purposes means they are interchangeable. Your speedometer, odometer and gearing barely notice a change this small.`,
        `What does change is the ${wider ? "width" : "profile"}. Section width moves from ${round(from.sectionWidth, 2)} inches to ${round(to.sectionWidth, 2)}, and sidewall height from ${round(from.sidewall, 2)} to ${round(to.sidewall, 2)}. So this is a handling and appearance decision rather than a fitment one.`,
        `The practical checks are narrower than usual here: confirm your rim width suits ${to.size.label}, and check inner clearance if the tire is getting wider. Height is not the issue with this pairing.`,
      ],
    },
    upsize: {
      heading: "A step up in height on the same rim",
      paragraphs: [
        `${to.size.label} keeps the ${from.size.rim}-inch rim but stands ${round(Math.abs(result.diameterDiff), 2)} inches taller than ${from.size.label}. Because the wheel stays the same, this is a tire-only change — the existing wheels carry over provided their width suits the new section.`,
        `The extra height splits evenly: ${round(Math.abs(result.clearanceDiff), 2)} inches of additional ground clearance at the axle, and ${round(Math.abs(result.clearanceDiff), 2)} inches less space above the tire. That second half is where fitment problems appear, and it is the one nobody measures.`,
        `Sidewall grows from ${round(from.sidewall, 2)} inches to ${round(to.sidewall, 2)}, which softens the ride and gives more protection against rim damage on rough surfaces. It also introduces a little more flex under cornering load.`,
      ],
    },
    downsize: {
      heading: "A step down in height on the same rim",
      paragraphs: [
        `${to.size.label} sits ${round(Math.abs(result.diameterDiff), 2)} inches shorter than ${from.size.label} on the same ${from.size.rim}-inch rim. That lowers the vehicle by ${round(Math.abs(result.clearanceDiff), 2)} inches at the axle and frees the same amount of space in the arch.`,
        `People arrive at this comparison for two reasons: recovering clearance after a fitment problem, or reducing cost, since smaller sizes are generally cheaper and more widely stocked.`,
        `Be careful about load rating. A smaller tire encloses less air, and the load index on ${to.size.label} must still meet the figure on the vehicle's tire placard — particularly on anything that tows or carries weight.`,
      ],
    },
  };
  const story = framing[kind];

  const faqs = [
    {
      question: `Is ${to.size.label} bigger than ${from.size.label}?`,
      answer: `${to.size.label} measures ${round(to.diameter, 2)} inches in overall diameter against ${round(from.diameter, 2)} inches for ${from.size.label}. That makes it ${round(Math.abs(result.diameterDiff), 2)} inches ${taller ? "taller" : "shorter"}, a change of ${signed(result.diameterPct, 1)}%. It is also ${round(Math.abs(result.widthDiff), 2)} inches ${wider ? "wider" : "narrower"} in section width.`,
    },
    {
      question: `Will ${to.size.label} fit in place of ${from.size.label}?`,
      answer: result.withinTolerance
        ? `The diameter change is ${signed(result.diameterPct, 1)}%, which falls inside the 3% envelope generally treated as a routine substitution. That makes it a plausible swap, but the section width also changes by ${round(Math.abs(result.widthDiff), 2)} inches, so confirm the rim width suits the new size and check clearance at full lock.`
        : `The diameter change is ${signed(result.diameterPct, 1)}%, which is outside the 3% envelope usually treated as a routine substitution. Treat this as a modification: verify clearance at full steering lock and full suspension compression, confirm the load rating meets the vehicle placard, and expect the speedometer to read incorrectly unless it can be recalibrated.`,
    },
    {
      question: `How much lift does ${to.size.label} give over ${from.size.label}?`,
      answer: `${round(Math.abs(result.clearanceDiff), 2)} inches at the axle — half the diameter difference. The other half of the change goes upward into the wheel arch, which is where fitment problems usually appear.`,
    },
    {
      question: `How far off will my speedometer be?`,
      answer: taller
        ? `The speedometer will read low by about ${round(Math.abs(result.speedoErrorPct), 1)}%. At an indicated 60 mph you would actually be travelling about ${round(result.actualAt60, 1)} mph, and every indicated 1,000 miles would really be about ${round(1000 + result.odometerDriftPer1000, 0)}.`
        : `The speedometer will read high by about ${round(Math.abs(result.speedoErrorPct), 1)}%. At an indicated 60 mph you would actually be travelling about ${round(result.actualAt60, 1)} mph, so the vehicle covers less ground than the dial claims.`,
    },
    {
      question: `Do I need to regear for ${to.size.label}?`,
      answer: Math.abs(result.diameterPct) <= 3
        ? `A ${signed(result.diameterPct, 1)}% change is small enough that most vehicles absorb it without complaint. Regearing is usually considered from around 10% upward, or sooner on a vehicle that tows regularly.`
        : `A ${signed(result.diameterPct, 1)}% change shifts the effective gearing noticeably. To restore the original engine speed you would multiply the current axle ratio by ${round(to.diameter / from.diameter, 3)}. Whether that is worth doing depends on how the vehicle is used — towing and heavily loaded driving make the case sooner than commuting does.`,
    },
    {
      question: `What is the revolutions-per-mile difference?`,
      answer: `${from.size.label} turns about ${Math.round(from.revsPerMile)} times per mile and ${to.size.label} about ${Math.round(to.revsPerMile)} — a difference of ${signed(result.revsDiff, 0)} revolutions. That figure is what the speedometer and odometer are calibrated against, which is why both readings shift.`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${ORIGIN}${path}#page`,
        name: `${from.size.label} vs ${to.size.label} tire size comparison`,
        description: `Full dimensional comparison of ${from.size.label} and ${to.size.label}.`,
        url: `${ORIGIN}${path}`,
        isPartOf: { "@type": "WebSite", name: "TorqueSheet", url: ORIGIN },
        publisher: { "@type": "Organization", name: "TorqueSheet", url: ORIGIN },
      },
      {
        "@type": "FAQPage",
        "@id": `${ORIGIN}${path}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Tools", path: "/tools" },
        { name: "Tire Size Comparison", path: "/tools/tire-size-comparison" },
        { name: `${from.size.label} vs ${to.size.label}`, path },
      ]),
    ],
  };

  return (
    <>
      <Header />
      <main className="inner-page">
        <section className="page-hero tool-hero">
          <div className="shell">
            <div className="breadcrumbs">
              <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> /{" "}
              <Link href="/tools/tire-size-comparison">Tire Size Comparison</Link> / {from.size.label} vs {to.size.label}
            </div>
            <div className="tool-heading">
              <div>
                <span className="kicker">{known ? segmentLabel(known.segment).toUpperCase() : "TIRE"} SIZE COMPARISON</span>
                <h1>{from.size.label} vs {to.size.label}</h1>
              </div>
            </div>
            <p>
              {to.size.label} is {round(Math.abs(result.diameterDiff), 2)} inches {taller ? "taller" : "shorter"} and{" "}
              {round(Math.abs(result.widthDiff), 2)} inches {wider ? "wider" : "narrower"} than {from.size.label} — a{" "}
              {signed(result.diameterPct, 1)}% change in overall diameter. Every consequence of that difference is worked
              out below.
            </p>
          </div>
        </section>

        <div className="shell tool-layout">
          <article>
            <div className={`tool-verdict tone-${result.withinTolerance ? "good" : Math.abs(result.diameterPct) <= 5 ? "warn" : "bad"}`}>
              <span aria-hidden="true">{result.withinTolerance ? "✓" : "!"}</span>
              <div>
                <strong>
                  {result.withinTolerance
                    ? `Inside the 3% substitution envelope (${signed(result.diameterPct, 1)}%)`
                    : `Outside the 3% substitution envelope (${signed(result.diameterPct, 1)}%)`}
                </strong>
                <p>
                  {result.withinTolerance
                    ? `A change this small is generally treated as a straight substitution. Speedometer error stays under three percent and the clearance designed around ${from.size.label} is largely preserved. The section width still changes by ${round(Math.abs(result.widthDiff), 2)} inches, so confirm your rim width suits ${to.size.label} before ordering.`
                    : `This is a modification rather than a substitution. Check clearance at full steering lock and full suspension compression, confirm the load rating meets the placard, and expect the speedometer to read ${taller ? "low" : "high"} by about ${round(Math.abs(result.speedoErrorPct), 1)}% unless it can be recalibrated for the new size.`}
                </p>
              </div>
            </div>

            <section className="tool-panel static" id="calculator">
              <div className="tool-result-split">
                <Overlay fromD={from.diameter} toD={to.diameter} rim={to.size.rim} fromLabel={from.size.label} toLabel={to.size.label} />
                <div className="tool-metrics">
                  <div className="tool-metric tone-neutral"><small>Overall diameter</small><strong>{signed(result.diameterDiff)}&quot;</strong><span>{round(from.diameter, 2)}&quot; → {round(to.diameter, 2)}&quot;</span></div>
                  <div className="tool-metric tone-neutral"><small>Ride height at the axle</small><strong>{signed(result.clearanceDiff)}&quot;</strong><span>Half the diameter change</span></div>
                  <div className="tool-metric tone-neutral"><small>Section width</small><strong>{signed(result.widthDiff)}&quot;</strong><span>{round(from.sectionWidth, 2)}&quot; → {round(to.sectionWidth, 2)}&quot;</span></div>
                  <div className="tool-metric tone-neutral"><small>Sidewall height</small><strong>{signed(result.sidewallDiff)}&quot;</strong><span>{round(from.sidewall, 2)}&quot; → {round(to.sidewall, 2)}&quot;</span></div>
                  <div className={`tool-metric tone-${Math.abs(result.speedoErrorPct) <= 3 ? "good" : "warn"}`}><small>True speed at indicated 60</small><strong>{round(result.actualAt60, 1)} mph</strong><span>Speedometer reads {taller ? "low" : "high"}</span></div>
                  <div className="tool-metric tone-neutral"><small>Odometer per 1,000 miles</small><strong>{signed(result.odometerDriftPer1000, 0)} mi</strong><span>Real distance against indicated</span></div>
                </div>
              </div>
              <p className="tool-next">
                Want to try other sizes against these?{" "}
                <Link href={`/tools/tire-size-comparison?from=${encodeURIComponent(from.size.label)}&to=${encodeURIComponent(to.size.label)}`}>
                  Open this comparison in the interactive tool
                </Link>
                .
              </p>
            </section>

            <section className="article-section" id="what-this-is">
              <span className="kicker">WHAT THIS SWAP IS</span>
              <h2>{story.heading}</h2>
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <section className="article-section" id="full-table">
              <span className="kicker">EVERY MEASUREMENT</span>
              <h2>{from.size.label} and {to.size.label} measured against each other</h2>
              <p>
                Both sizes reduced to the same units. The diameter row is the one that drives everything else on this
                page — ride height, gearing, speedometer accuracy and odometer readings all follow from it.
              </p>
              <div className="table-scroll">
                <table className="diagnostic-table">
                  <thead>
                    <tr><th>Measurement</th><th>{from.size.label}</th><th>{to.size.label}</th><th>Difference</th></tr>
                  </thead>
                  <tbody>
                    <tr><th>Overall diameter</th><td>{round(from.diameter, 2)}&quot;</td><td>{round(to.diameter, 2)}&quot;</td><td>{signed(result.diameterDiff)}&quot; ({signed(result.diameterPct, 1)}%)</td></tr>
                    <tr><th>Section width</th><td>{round(from.sectionWidth, 2)}&quot; ({round(from.size.width, 0)} mm)</td><td>{round(to.sectionWidth, 2)}&quot; ({round(to.size.width, 0)} mm)</td><td>{signed(result.widthDiff)}&quot;</td></tr>
                    <tr><th>Sidewall height</th><td>{round(from.sidewall, 2)}&quot;</td><td>{round(to.sidewall, 2)}&quot;</td><td>{signed(result.sidewallDiff)}&quot;</td></tr>
                    <tr><th>Rim diameter</th><td>{from.size.rim}&quot;</td><td>{to.size.rim}&quot;</td><td>{signed(to.size.rim - from.size.rim, 1)}&quot;</td></tr>
                    <tr><th>Circumference</th><td>{round(from.circumference, 2)}&quot;</td><td>{round(to.circumference, 2)}&quot;</td><td>{signed(to.circumference - from.circumference)}&quot;</td></tr>
                    <tr><th>Revolutions per mile</th><td>{Math.round(from.revsPerMile)}</td><td>{Math.round(to.revsPerMile)}</td><td>{signed(result.revsDiff, 0)}</td></tr>
                    <tr><th>Ride height at axle</th><td>Baseline</td><td>{signed(result.clearanceDiff)}&quot;</td><td>{signed(result.clearanceDiff)}&quot;</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="article-section" id="speedometer">
              <span className="kicker">SPEEDOMETER EFFECT</span>
              <h2>What the dial shows against how fast you are going</h2>
              <p>
                Your speedometer was calibrated to {from.size.label}, which turns about {Math.round(from.revsPerMile)}{" "}
                times per mile. Fit {to.size.label} at about {Math.round(to.revsPerMile)} revolutions per mile and the
                same wheel speed now represents a {taller ? "greater" : "smaller"} road speed than the instrument
                assumes. The error is {round(Math.abs(result.speedoErrorPct), 1)}% at every speed, so it grows in
                absolute terms the faster you go.
              </p>
              <div className="table-scroll">
                <table className="diagnostic-table">
                  <thead>
                    <tr><th>Speedometer reads</th><th>You are actually doing</th><th>Difference</th></tr>
                  </thead>
                  <tbody>
                    {speeds.map((speed) => {
                      const actual = speed * (to.diameter / from.diameter);
                      return (
                        <tr key={speed}>
                          <th>{speed} mph</th>
                          <td>{round(actual, 1)} mph</td>
                          <td>{signed(actual - speed, 1)} mph</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p>
                Over distance the same proportion applies to the odometer. Every indicated 1,000 miles on{" "}
                {to.size.label} is really about {round(1000 + result.odometerDriftPer1000, 0)} miles covered
                {taller
                  ? " — worth knowing on a leased vehicle, where recorded mileage and real mileage drift apart."
                  : " — so the vehicle accumulates recorded mileage faster than it actually travels."}
              </p>
            </section>

            <section className="article-section" id="considerations">
              <span className="kicker">BEFORE YOU ORDER</span>
              <h2>What this particular change asks you to check</h2>
              <ul className="check-list long-checks">
                <li>
                  {wider
                    ? `Section width grows by ${round(Math.abs(result.widthDiff), 2)} inches, so the tire sits closer to the strut and the inner liner on both sides.`
                    : `Section width drops by ${round(Math.abs(result.widthDiff), 2)} inches, which gains inboard clearance but reduces contact patch.`}
                </li>
                <li>
                  {taller
                    ? `Overall height grows by ${round(Math.abs(result.diameterDiff), 2)} inches, of which ${round(Math.abs(result.clearanceDiff), 2)} inches goes upward into the arch — check at full lock and full compression.`
                    : `Overall height drops by ${round(Math.abs(result.diameterDiff), 2)} inches, lowering the vehicle ${round(Math.abs(result.clearanceDiff), 2)} inches at the axle.`}
                </li>
                <li>
                  {from.size.rim === to.size.rim
                    ? `Both sizes use a ${from.size.rim}-inch rim, so the existing wheels carry over if their width suits the new section.`
                    : `The rim diameter changes from ${from.size.rim} inches to ${to.size.rim} inches, so this swap needs different wheels as well as different tires.`}
                </li>
                <li>
                  Speedometer error of {round(Math.abs(result.speedoErrorPct), 1)}% — check whether your vehicle supports
                  recalibrating for a new tire size.
                </li>
                <li>
                  Confirm the load index on {to.size.label} meets or exceeds the figure on the vehicle&apos;s tire placard,
                  particularly if the vehicle tows or carries load.
                </li>
                <li>
                  On all-wheel-drive and four-wheel-drive vehicles, change all four together — mismatched rolling
                  circumferences load the differentials and transfer case continuously.
                </li>
              </ul>
            </section>

            <section className="article-section faq-section" id="faq">
              <span className="kicker">COMMON QUESTIONS</span>
              <h2>{from.size.label} vs {to.size.label} FAQ</h2>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}<span>+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </section>

            <div className="safety-note">
              <span>!</span>
              <p>
                <strong>These are nominal figures.</strong> Every number above is calculated from the marked size. Real
                tires vary from nominal by a few millimetres between manufacturers, and by more as tread wears or
                pressure changes. Use this to plan and to check a quote — measure the actual tire before committing to a
                tight fitment.
              </p>
            </div>
          </article>

          <aside className="comparison-aside">
            <div className="side-card">
              <span className="kicker">ON THIS PAGE</span>
              <a href="#calculator">The comparison</a>
              <a href="#what-this-is">What this swap is</a>
              <a href="#full-table">Every measurement</a>
              <a href="#speedometer">Speedometer effect</a>
              <a href="#considerations">Before you order</a>
              <a href="#faq">FAQ</a>
            </div>
            {related.length > 0 && (
              <div className="side-card">
                <span className="kicker">RELATED COMPARISONS</span>
                {related.map((item) => (
                  <Link href={comparisonPairPath(item)} key={pairSlug(item)}>
                    {item.from} vs {item.to}
                  </Link>
                ))}
              </div>
            )}
            <div className="side-card">
              <span className="kicker">RELATED TOOLS</span>
              <Link href="/tools/tire-size-calculator">Tire Size Calculator</Link>
              <Link href="/tools/speedometer-error-calculator">Speedometer Error Calculator</Link>
              <Link href="/tools/gear-ratio-calculator">Gear Ratio Calculator</Link>
              <Link href="/tools">All tools →</Link>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <JsonLd data={schema} />
    </>
  );
}
