"use client";

import { useMemo } from "react";
import { Field, Metric, ShareRow, useToolState } from "../tool-kit";
import { measure, round } from "../tire-math";

const DEFAULTS = { size: "225/65R17" };

export function TireSizeConverter() {
  const { values, set, reset } = useToolState("tire-convert", DEFAULTS);
  const sizeInput = values.size ?? DEFAULTS.size;
  const geometry = useMemo(() => measure(sizeInput), [sizeInput]);

  const flotationLabel = geometry
    ? `${round(geometry.diameter, 1)}X${round(geometry.sectionWidth, 2)}R${geometry.size.rim}`
    : "";

  const summary = geometry
    ? [
        `Entered: ${sizeInput}`,
        `Metric: ${geometry.size.label}`,
        `Flotation: ${flotationLabel}`,
        `Inches: ${round(geometry.sectionWidth, 2)}" wide x ${round(geometry.sidewall, 2)}" sidewall x ${geometry.size.rim}" rim`,
        `Overall diameter: ${round(geometry.diameter, 2)}"`,
      ].join("\n")
    : "";

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">ONE SIZE, EVERY NOTATION</span>
        <h2 id="calculator-title">See a tire size every way it gets written</h2>
        <p>
          Enter a size in whichever notation you have it — metric or flotation — and see it converted
          into the other, plus a plain-inches breakdown of width, sidewall and rim.
        </p>
      </div>

      <div className="tool-inputs single">
        <Field label="Tire size" value={sizeInput} onChange={(v) => set("size", v)} placeholder="225/65R17 or 33x12.50R15" invalid={Boolean(sizeInput) && !geometry} />
      </div>

      {!geometry && sizeInput && (
        <p className="tool-error" role="alert">
          That size is not readable yet. Try a metric size like <b>225/65R17</b>, or a flotation size like{" "}
          <b>33x12.50R15</b>.
        </p>
      )}

      {geometry && (
        <>
          <div className="tool-metrics wide">
            <Metric label="Metric notation" value={geometry.size.label} note="Width(mm)/aspect ratio R rim" tone="good" />
            <Metric label="Flotation notation" value={flotationLabel} note="Diameter X width R rim, all in inches" tone="good" />
            <Metric label="Section width" value={`${round(geometry.sectionWidth, 2)}"`} note={`${round(geometry.size.width, 0)} mm`} />
            <Metric label="Sidewall height" value={`${round(geometry.sidewall, 2)}"`} note={`${round(geometry.size.width * (geometry.size.aspect / 100), 0)} mm`} />
            <Metric label="Rim diameter" value={`${geometry.size.rim}"`} note="Both notations agree here" />
            <Metric label="Overall diameter" value={`${round(geometry.diameter, 2)}"`} note="The figure both notations imply" />
          </div>

          <ShareRow summary={summary} onReset={reset} />
        </>
      )}
    </section>
  );
}
