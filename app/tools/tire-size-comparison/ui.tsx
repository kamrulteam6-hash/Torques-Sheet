"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, Verdict, useToolState } from "../tool-kit";
import { compareTires, measure, round, signed } from "../tire-math";

const DEFAULTS = { from: "265/70R17", to: "285/70R17" };

const COMMON = [
  "205/55R16",
  "225/45R17",
  "225/65R17",
  "235/60R18",
  "245/70R17",
  "265/70R17",
  "275/55R20",
  "285/70R17",
  "33X12.50R17",
  "35X12.50R17",
];

/**
 * Concentric overlay drawn to a shared scale. Seeing the two circles together
 * communicates the size change faster than any table of numbers can.
 */
function OverlayDrawing({
  fromDiameter,
  toDiameter,
  rim,
}: {
  fromDiameter: number;
  toDiameter: number;
  rim: number;
}) {
  const box = 280;
  const pad = 18;
  const largest = Math.max(fromDiameter, toDiameter);
  const scale = (box - pad * 2) / largest;
  const centre = box / 2;

  return (
    <svg
      className="overlay-drawing"
      viewBox={`0 0 ${box} ${box}`}
      role="img"
      aria-label={`Scale overlay comparing a ${round(fromDiameter, 1)} inch tire with a ${round(toDiameter, 1)} inch tire`}
    >
      <circle cx={centre} cy={centre} r={(largest / 2) * scale} className="ghost" />
      <circle cx={centre} cy={centre} r={(fromDiameter / 2) * scale} className="from-tire" />
      <circle cx={centre} cy={centre} r={(toDiameter / 2) * scale} className="to-tire" />
      <circle cx={centre} cy={centre} r={(rim / 2) * scale} className="rim" />
      <text x={centre} y={centre + 4} className="drawing-rim" textAnchor="middle">
        {rim}&quot;
      </text>
    </svg>
  );
}

export function TireSizeComparison() {
  const { values, set, reset } = useToolState("tire-compare", DEFAULTS);
  const fromInput = values.from ?? DEFAULTS.from;
  const toInput = values.to ?? DEFAULTS.to;

  const from = useMemo(() => measure(fromInput), [fromInput]);
  const to = useMemo(() => measure(toInput), [toInput]);
  const result = useMemo(() => (from && to ? compareTires(from, to) : null), [from, to]);

  const swap = () => {
    set("from", toInput);
    set("to", fromInput);
  };

  const summary = result
    ? [
        `${result.from.size.label} → ${result.to.size.label}`,
        `Diameter: ${round(result.from.diameter, 2)} in → ${round(result.to.diameter, 2)} in (${signed(result.diameterDiff)} in, ${signed(result.diameterPct, 1)}%)`,
        `Ride height change: ${signed(result.clearanceDiff)} in`,
        `Section width change: ${signed(result.widthDiff)} in`,
        `True speed at an indicated 60 mph: ${round(result.actualAt60, 1)} mph`,
        `Odometer drift: ${signed(result.odometerDriftPer1000, 0)} miles per 1,000 indicated`,
        result.withinTolerance
          ? "Within the conventional 3% substitution envelope"
          : "Outside the conventional 3% substitution envelope",
      ].join("\n")
    : "";

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">COMPARE TWO SIZES</span>
        <h2 id="calculator-title">Put the sizes side by side</h2>
        <p>
          Enter what is on the vehicle now and what you are considering. The drawing is to scale, so
          the difference you see is the difference you get.
        </p>
      </div>

      <div className="tool-inputs pair">
        <Field
          label="Current size"
          value={fromInput}
          onChange={(value) => set("from", value)}
          placeholder="265/70R17"
          invalid={Boolean(fromInput) && !from}
          list="compare-sizes"
        />
        <button type="button" className="swap-button" onClick={swap} aria-label="Swap the two sizes">
          ⇄
        </button>
        <Field
          label="New size"
          value={toInput}
          onChange={(value) => set("to", value)}
          placeholder="285/70R17"
          invalid={Boolean(toInput) && !to}
          list="compare-sizes"
        />
        <datalist id="compare-sizes">
          {COMMON.map((size) => (
            <option key={size} value={size} />
          ))}
        </datalist>
      </div>

      {(!from || !to) && (
        <p className="tool-error" role="alert">
          Both sizes need to be readable before anything can be compared. The expected format is{" "}
          <b>265/70R17</b>, or a flotation size such as <b>33x12.50R17</b>.
        </p>
      )}

      {result && (
        <>
          <Verdict
            tone={result.withinTolerance ? "good" : Math.abs(result.diameterPct) <= 5 ? "warn" : "bad"}
            headline={
              result.withinTolerance
                ? `Inside the 3% envelope — ${signed(result.diameterPct, 1)}% diameter change`
                : `Outside the 3% envelope — ${signed(result.diameterPct, 1)}% diameter change`
            }
            detail={
              result.withinTolerance
                ? "This is the range in which a substitution is generally treated as routine. Speedometer error stays small and clearance margins designed around the original size are mostly preserved. Check physical clearance anyway if the section width is also changing."
                : `A change this size is a modification rather than a substitution. Expect a visible speedometer error, check arch and suspension clearance at full lock and full compression, and consider whether the gearing still suits the vehicle. At an indicated 60 mph you would actually be doing about ${round(result.actualAt60, 1)} mph.`
            }
          />

          <div className="tool-result-split">
            <OverlayDrawing
              fromDiameter={result.from.diameter}
              toDiameter={result.to.diameter}
              rim={result.to.size.rim}
            />
            <div className="tool-metrics">
              <Metric
                label="Overall diameter"
                value={`${signed(result.diameterDiff)}"`}
                note={`${round(result.from.diameter, 2)}" → ${round(result.to.diameter, 2)}"`}
                tone={result.withinTolerance ? "good" : "warn"}
              />
              <Metric
                label="Ride height at the axle"
                value={`${signed(result.clearanceDiff)}"`}
                note="Half the diameter change"
              />
              <Metric
                label="Section width"
                value={`${signed(result.widthDiff)}"`}
                note={`${round(result.from.sectionWidth, 2)}" → ${round(result.to.sectionWidth, 2)}"`}
              />
              <Metric
                label="Sidewall height"
                value={`${signed(result.sidewallDiff)}"`}
                note={`${round(result.from.sidewall, 2)}" → ${round(result.to.sidewall, 2)}"`}
              />
              <Metric
                label="True speed at indicated 60"
                value={`${round(result.actualAt60, 1)} mph`}
                note={
                  result.diameterDiff >= 0
                    ? "The speedometer under-reads"
                    : "The speedometer over-reads"
                }
                tone={Math.abs(result.speedoErrorPct) <= 3 ? "good" : "warn"}
              />
              <Metric
                label="Odometer per 1,000 miles"
                value={`${signed(result.odometerDriftPer1000, 0)} mi`}
                note="Distance actually covered against distance shown"
              />
            </div>
          </div>

          <div className="table-scroll">
            <table className="diagnostic-table">
              <thead>
                <tr>
                  <th>Measurement</th>
                  <th>{result.from.size.label}</th>
                  <th>{result.to.size.label}</th>
                  <th>Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Overall diameter</th>
                  <td>{round(result.from.diameter, 2)}&quot;</td>
                  <td>{round(result.to.diameter, 2)}&quot;</td>
                  <td>
                    {signed(result.diameterDiff)}&quot; ({signed(result.diameterPct, 1)}%)
                  </td>
                </tr>
                <tr>
                  <th>Section width</th>
                  <td>{round(result.from.sectionWidth, 2)}&quot;</td>
                  <td>{round(result.to.sectionWidth, 2)}&quot;</td>
                  <td>{signed(result.widthDiff)}&quot;</td>
                </tr>
                <tr>
                  <th>Sidewall height</th>
                  <td>{round(result.from.sidewall, 2)}&quot;</td>
                  <td>{round(result.to.sidewall, 2)}&quot;</td>
                  <td>{signed(result.sidewallDiff)}&quot;</td>
                </tr>
                <tr>
                  <th>Circumference</th>
                  <td>{round(result.from.circumference, 2)}&quot;</td>
                  <td>{round(result.to.circumference, 2)}&quot;</td>
                  <td>{signed(result.to.circumference - result.from.circumference)}&quot;</td>
                </tr>
                <tr>
                  <th>Revolutions per mile</th>
                  <td>{Math.round(result.from.revsPerMile)}</td>
                  <td>{Math.round(result.to.revsPerMile)}</td>
                  <td>{signed(result.revsDiff, 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ShareRow summary={summary} onReset={reset} />

          <p className="tool-next">
            Planning to correct the gearing?{" "}
            <Link
              href={`/tools/gear-ratio-calculator?from=${encodeURIComponent(result.from.size.label)}&to=${encodeURIComponent(result.to.size.label)}`}
            >
              Work out the axle ratio that restores stock RPM
            </Link>
            .
          </p>
        </>
      )}
    </section>
  );
}
