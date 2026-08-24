"use client";

import { useMemo } from "react";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { pistonSpeed, rpmAtPistonSpeed } from "../perf-math";
import { round } from "../tire-math";

const DEFAULTS = { stroke: "3.48", rpm: "6000" };

const BAND_INFO: Record<string, { headline: string; detail: string; tone: "good" | "warn" | "bad" }> = {
  conservative: {
    headline: "Conservative — well inside typical limits",
    detail: "Ordinary production engines cruise in this range for their entire service life without piston speed being a meaningful factor in durability.",
    tone: "good",
  },
  production: {
    headline: "Production performance range",
    detail: "This is where most factory performance engines run at their redline — high enough to make good power, low enough that stock components handle it for a normal service life.",
    tone: "good",
  },
  performance: {
    headline: "Serious performance territory",
    detail: "Forged pistons, upgraded rods and careful oiling are the norm here rather than the exception. Many factory engines never see this range even at redline.",
    tone: "warn",
  },
  race: {
    headline: "Race-engine range",
    detail: "Sustained running here is a race-engine proposition: full forged rotating assembly, serious oiling system, and a rebuild schedule measured in hours rather than years.",
    tone: "bad",
  },
  extreme: {
    headline: "Extreme — F1-adjacent",
    detail: "This is the range Formula 1 engines have operated in. It demands exotic materials and a completely different approach to the rotating assembly than anything built for the street.",
    tone: "bad",
  },
};

export function PistonSpeedCalculator() {
  const { values, set, reset } = useToolState("piston-speed", DEFAULTS);
  const stroke = Number(values.stroke ?? DEFAULTS.stroke) || 0;
  const rpm = Number(values.rpm ?? DEFAULTS.rpm) || 0;

  const result = useMemo(() => pistonSpeed(stroke, rpm), [stroke, rpm]);
  const band = BAND_INFO[result.band];

  const thresholds = [2000, 3000, 4000, 5000];

  const summary = [
    `${stroke}" stroke @ ${rpm} rpm`,
    `Mean piston speed: ${round(result.feetPerMinute, 0)} ft/min (${round(result.metresPerSecond, 2)} m/s)`,
    `Band: ${result.band}`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">STROKE ALONE SETS THE LIMIT</span>
        <h2 id="calculator-title">Mean piston speed</h2>
        <p>
          Mean piston speed depends on stroke and RPM only — not bore, not cylinder count, not
          displacement. It is the figure that actually limits how hard a long-stroke engine can be
          revved, long before anything else does.
        </p>
      </div>

      <div className="tool-inputs pair">
        <StepField label="Stroke" value={values.stroke ?? DEFAULTS.stroke} onChange={(v) => set("stroke", v)} step={0.01} min={1} max={7} suffix="in" />
        <StepField label="Engine speed" value={values.rpm ?? DEFAULTS.rpm} onChange={(v) => set("rpm", v)} step={100} min={500} max={12000} suffix="rpm" />
      </div>

      <Verdict tone={band.tone} headline={`${round(result.feetPerMinute, 0)} ft/min — ${band.headline}`} detail={band.detail} />

      <div className="tool-metrics wide">
        <Metric label="Mean piston speed" value={`${round(result.feetPerMinute, 0)} ft/min`} note={round(result.metresPerSecond, 2) + " m/s"} tone={band.tone} />
        <Metric label="Per stroke" value={`${round(stroke / 12, 3)} ft`} note="Travel each direction" />
        <Metric label="Strokes per minute" value={String(rpm * 2)} note="Two per revolution" />
        <Metric label="Band" value={result.band} note="See the table for thresholds" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Target mean piston speed</th>
              <th>RPM at your stroke ({stroke}&quot;)</th>
              <th>Typical territory</th>
            </tr>
          </thead>
          <tbody>
            {thresholds.map((t) => (
              <tr key={t} className={Math.abs(rpmAtPistonSpeed(stroke, t) - rpm) < 200 ? "row-active" : undefined}>
                <th>{t.toLocaleString()} ft/min</th>
                <td>{Math.round(rpmAtPistonSpeed(stroke, t)).toLocaleString()} rpm</td>
                <td>
                  {t === 2000 && "Conservative / production"}
                  {t === 3000 && "Production performance limit"}
                  {t === 4000 && "Built performance engine"}
                  {t === 5000 && "Race engine territory"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
