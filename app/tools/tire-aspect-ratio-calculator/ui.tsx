"use client";

import { useMemo, useState } from "react";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { aspectRatioFromDimensions, sidewallFromAspectRatio } from "../tire-id-math";
import { round } from "../tire-math";

const DEFAULTS = { width: "225", sidewall: "146.25", ratio: "65" };

export function TireAspectRatioCalculator() {
  const { values, set, reset } = useToolState("aspect-ratio", DEFAULTS);
  const [mode, setMode] = useState<"ratio" | "sidewall">("ratio");
  const widthMm = Number(values.width ?? DEFAULTS.width) || 0;
  const sidewallMm = Number(values.sidewall ?? DEFAULTS.sidewall) || 0;
  const ratioInput = Number(values.ratio ?? DEFAULTS.ratio) || 0;

  const solvedRatio = useMemo(() => aspectRatioFromDimensions(sidewallMm, widthMm), [sidewallMm, widthMm]);
  const solvedSidewall = useMemo(() => sidewallFromAspectRatio(widthMm, ratioInput), [widthMm, ratioInput]);

  const summary =
    mode === "ratio"
      ? `${sidewallMm}mm sidewall on ${widthMm}mm width -> aspect ratio ${round(solvedRatio, 1)}`
      : `${widthMm}mm width at ${ratioInput} aspect ratio -> ${round(solvedSidewall, 1)}mm sidewall`;

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">SOLVE EITHER DIRECTION</span>
        <h2 id="calculator-title">Aspect ratio from a real measurement</h2>
        <p>
          Aspect ratio is sidewall height as a percentage of section width — normally read off a size
          designation, but this works it out from an actual measured sidewall instead, or goes the other
          way to find what sidewall a target ratio implies.
        </p>
      </div>

      <div className="mode-toggle" role="group" aria-label="Choose a direction">
        <button type="button" className={mode === "ratio" ? "active" : ""} onClick={() => setMode("ratio")}>
          Solve for aspect ratio
        </button>
        <button type="button" className={mode === "sidewall" ? "active" : ""} onClick={() => setMode("sidewall")}>
          Solve for sidewall height
        </button>
      </div>

      <div className="tool-inputs pair">
        <StepField label="Section width" value={values.width ?? DEFAULTS.width} onChange={(v) => set("width", v)} step={5} min={125} max={355} suffix="mm" />
        {mode === "ratio" ? (
          <StepField label="Measured sidewall height" value={values.sidewall ?? DEFAULTS.sidewall} onChange={(v) => set("sidewall", v)} step={1} min={40} max={300} suffix="mm" />
        ) : (
          <StepField label="Target aspect ratio" value={values.ratio ?? DEFAULTS.ratio} onChange={(v) => set("ratio", v)} step={5} min={25} max={85} />
        )}
      </div>

      <div className="tool-metrics wide">
        {mode === "ratio" ? (
          <Metric label="Aspect ratio" value={round(solvedRatio, 1).toString()} note="Sidewall ÷ width × 100" tone="good" />
        ) : (
          <Metric label="Sidewall height" value={`${round(solvedSidewall, 1)} mm`} note={`${round(solvedSidewall / 25.4, 2)}"`} tone="good" />
        )}
        <Metric label="Section width" value={`${widthMm} mm`} note={`${round(widthMm / 25.4, 2)}"`} />
        <Metric label="Sidewall in inches" value={`${round((mode === "ratio" ? sidewallMm : solvedSidewall) / 25.4, 2)}"`} note="Same figure, imperial" />
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
