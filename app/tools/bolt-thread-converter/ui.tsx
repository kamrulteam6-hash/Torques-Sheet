"use client";

import { useState } from "react";
import { Metric, ShareRow, useToolState } from "../tool-kit";
import { IMPERIAL_BOLTS, METRIC_BOLTS, nearestImperialBolt, nearestMetricBolt } from "../bolt-math";
import { round } from "../tire-math";

const DEFAULTS = { metric: "M10" };

export function BoltThreadConverter() {
  const { values, set, reset } = useToolState("bolt-convert", DEFAULTS);
  const [direction, setDirection] = useState<"m2i" | "i2m">("m2i");
  const metricKey = values.metric ?? DEFAULTS.metric;
  const imperialKey = values.imperial ?? IMPERIAL_BOLTS[3].fraction;

  const metricBolt = METRIC_BOLTS.find((b) => b.metric === metricKey) ?? METRIC_BOLTS[3];
  const imperialBolt = IMPERIAL_BOLTS.find((b) => b.fraction === imperialKey) ?? IMPERIAL_BOLTS[3];

  const matchedImperial = nearestImperialBolt(metricBolt.diameterMm);
  const matchedMetric = nearestMetricBolt(imperialBolt.decimalIn);

  const summary =
    direction === "m2i"
      ? `${metricBolt.metric} (${metricBolt.diameterMm}mm) ≈ ${matchedImperial.fraction} (${round(matchedImperial.decimalIn, 3)}")`
      : `${imperialBolt.fraction} (${round(imperialBolt.decimalIn, 3)}") ≈ ${matchedMetric.metric} (${matchedMetric.diameterMm}mm)`;

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">SIZE AND STANDARD THREAD, TOGETHER</span>
        <h2 id="calculator-title">Metric and imperial bolts side by side</h2>
        <p>
          Pick a bolt in either system and see its nearest equivalent in the other, along with the
          standard coarse and fine thread pitches each size normally comes in.
        </p>
      </div>

      <div className="mode-toggle" role="group" aria-label="Choose a direction">
        <button type="button" className={direction === "m2i" ? "active" : ""} onClick={() => setDirection("m2i")}>
          Metric → Imperial
        </button>
        <button type="button" className={direction === "i2m" ? "active" : ""} onClick={() => setDirection("i2m")}>
          Imperial → Metric
        </button>
      </div>

      <div className="tool-inputs single">
        {direction === "m2i" ? (
          <label className="tool-field">
            <span className="tool-field-label">Metric size</span>
            <span className="tool-field-input">
              <select value={metricKey} onChange={(e) => set("metric", e.target.value)} className="tool-select">
                {METRIC_BOLTS.map((b) => (
                  <option key={b.metric} value={b.metric}>
                    {b.metric} ({b.diameterMm} mm)
                  </option>
                ))}
              </select>
            </span>
          </label>
        ) : (
          <label className="tool-field">
            <span className="tool-field-label">Imperial size</span>
            <span className="tool-field-input">
              <select value={imperialKey} onChange={(e) => set("imperial", e.target.value)} className="tool-select">
                {IMPERIAL_BOLTS.map((b) => (
                  <option key={b.fraction} value={b.fraction}>
                    {b.fraction} ({round(b.decimalIn, 3)}&quot;)
                  </option>
                ))}
              </select>
            </span>
          </label>
        )}
      </div>

      {direction === "m2i" ? (
        <div className="tool-metrics wide">
          <Metric label="Metric size" value={metricBolt.metric} note={`${metricBolt.diameterMm} mm`} tone="good" />
          <Metric label="Nearest imperial" value={matchedImperial.fraction} note={`${round(matchedImperial.decimalIn, 3)}"`} tone="good" />
          <Metric label="Coarse pitch (metric)" value={`${metricBolt.coarsePitchMm} mm`} note="Standard coarse thread" />
          <Metric label="Fine pitch (metric)" value={metricBolt.finePitchMm ? `${metricBolt.finePitchMm} mm` : "—"} note="Standard fine thread, where available" />
        </div>
      ) : (
        <div className="tool-metrics wide">
          <Metric label="Imperial size" value={imperialBolt.fraction} note={`${round(imperialBolt.decimalIn, 3)}"`} tone="good" />
          <Metric label="Nearest metric" value={matchedMetric.metric} note={`${matchedMetric.diameterMm} mm`} tone="good" />
          <Metric label="UNC (coarse)" value={`${imperialBolt.unc} TPI`} note="Threads per inch, coarse" />
          <Metric label="UNF (fine)" value={imperialBolt.unf ? `${imperialBolt.unf} TPI` : "—"} note="Threads per inch, fine, where available" />
        </div>
      )}

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Nearest imperial</th>
              <th>Metric coarse pitch</th>
              <th>UNC (coarse) TPI</th>
            </tr>
          </thead>
          <tbody>
            {METRIC_BOLTS.map((b) => {
              const eq = nearestImperialBolt(b.diameterMm);
              return (
                <tr key={b.metric} className={b.metric === metricKey ? "row-active" : undefined}>
                  <th>{b.metric}</th>
                  <td>{eq.fraction}</td>
                  <td>{b.coarsePitchMm} mm</td>
                  <td>{eq.unc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
