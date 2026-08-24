"use client";

import { useMemo } from "react";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { camberFromOffset } from "../suspension-math";
import { round } from "../tire-math";

const DEFAULTS = { offset: "1.0", span: "18" };

export function CamberCalculator() {
  const { values, set, reset } = useToolState("camber", DEFAULTS);
  const offset = Number(values.offset ?? DEFAULTS.offset) || 0;
  const span = Number(values.span ?? DEFAULTS.span) || 0;

  const camber = useMemo(() => camberFromOffset(offset, span), [offset, span]);

  const summary = [
    `${offset}" horizontal offset over an ${span}" vertical span`,
    `Camber angle: ${round(camber, 2)}° ${camber >= 0 ? "negative (top-in)" : "positive (top-out)"}`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">MEASURED WITH A LEVEL AND A TAPE</span>
        <h2 id="calculator-title">Camber without a gauge</h2>
        <p>
          Hold a level vertically against the tire and measure how far the top or bottom leans away from
          it, over a known vertical span. That offset and span are all the trigonometry needs — the same
          calculation a digital camber gauge automates.
        </p>
      </div>

      <div className="tool-inputs pair">
        <StepField label="Horizontal offset" value={values.offset ?? DEFAULTS.offset} onChange={(v) => set("offset", v)} step={0.0625} min={0} max={4} suffix="in" hint="Gap between the level and the tire, top vs. bottom" />
        <StepField label="Vertical measuring span" value={values.span ?? DEFAULTS.span} onChange={(v) => set("span", v)} step={0.5} min={6} max={30} suffix="in" hint="Distance between your two measurement points" />
      </div>

      <Verdict
        tone="good"
        headline={`${round(camber, 2)}° camber`}
        detail="Negative camber — the top of the tire leaning in toward the engine — is what most performance alignments target, since it helps the tire's contact patch stay flatter under cornering load. This calculation gives the angle; whether it matches a target spec depends on the vehicle."
      />

      <div className="tool-metrics wide">
        <Metric label="Camber angle" value={`${round(camber, 2)}°`} note="From the measured offset" tone="good" />
        <Metric label="Offset entered" value={`${offset}"`} note="Top-to-bottom lean" />
        <Metric label="Measuring span" value={`${span}"`} note="Vertical distance used" />
        <Metric label="Offset per foot" value={`${round((offset / span) * 12, 3)}"`} note="A common way alignment shops describe it" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Horizontal offset</th>
              <th>Camber angle (over {span}&quot; span)</th>
            </tr>
          </thead>
          <tbody>
            {[0.25, 0.5, 0.75, 1.0, 1.5, 2.0].map((o) => (
              <tr key={o} className={o === offset ? "row-active" : undefined}>
                <th>{o.toFixed(2)}&quot;</th>
                <td>{round(camberFromOffset(o, span), 2)}°</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
