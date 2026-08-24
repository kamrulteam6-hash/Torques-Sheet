"use client";

import { useMemo } from "react";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { intercoolerEfficiency } from "../fuel-air-math";
import { round } from "../tire-math";

const DEFAULTS = { hotIn: "250", hotOut: "130", ambient: "80" };

export function IntercoolerEfficiencyCalculator() {
  const { values, set, reset } = useToolState("ic-efficiency", DEFAULTS);
  const hotIn = Number(values.hotIn ?? DEFAULTS.hotIn) || 0;
  const hotOut = Number(values.hotOut ?? DEFAULTS.hotOut) || 0;
  const ambient = Number(values.ambient ?? DEFAULTS.ambient) || 0;

  const efficiency = useMemo(() => intercoolerEfficiency({ hotInF: hotIn, hotOutF: hotOut, ambientF: ambient }), [hotIn, hotOut, ambient]);
  const tempDrop = hotIn - hotOut;
  const bestPossible = hotIn - ambient;

  const band = efficiency < 50 ? { tone: "bad" as const, label: "Poor — significant heat soak" }
    : efficiency < 65 ? { tone: "warn" as const, label: "Below typical performance range" }
    : efficiency <= 85 ? { tone: "good" as const, label: "Typical good performance range" }
    : { tone: "good" as const, label: "Excellent — near the theoretical limit" };

  const summary = [
    `Charge in: ${hotIn}F, out: ${hotOut}F, ambient: ${ambient}F`,
    `Temperature drop: ${round(tempDrop, 1)}F`,
    `Best theoretically possible: ${round(bestPossible, 1)}F drop`,
    `Efficiency: ${round(efficiency, 1)}%`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">MEASURED, NOT MODELLED</span>
        <h2 id="calculator-title">Intercooler effectiveness from real temperatures</h2>
        <p>
          Efficiency here is the same definition used for any heat exchanger: how much of the available
          temperature drop — from the hot charge-air inlet all the way down to ambient — the intercooler
          actually achieved. Measure inlet and outlet charge temperature under load for a real figure.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Charge temp in (hot side)" value={values.hotIn ?? DEFAULTS.hotIn} onChange={(v) => set("hotIn", v)} step={5} min={100} max={500} suffix="°F" hint="Compressor discharge, before the cooler" />
        <StepField label="Charge temp out (cold side)" value={values.hotOut ?? DEFAULTS.hotOut} onChange={(v) => set("hotOut", v)} step={5} min={50} max={400} suffix="°F" hint="After the cooler, before the throttle" />
        <StepField label="Ambient air temp" value={values.ambient ?? DEFAULTS.ambient} onChange={(v) => set("ambient", v)} step={5} min={-20} max={130} suffix="°F" />
      </div>

      <Verdict
        tone={band.tone}
        headline={`${round(efficiency, 1)}% efficiency — ${band.label}`}
        detail={`The charge dropped ${round(tempDrop, 1)}°F out of a theoretical maximum possible drop of ${round(bestPossible, 1)}°F (all the way to ambient). No intercooler reaches 100% — some approach to ambient is normal — but a low figure under sustained load points at heat soak, restricted airflow through the core, or a core that is simply undersized for the airflow going through it.`}
      />

      <div className="tool-metrics wide">
        <Metric label="Efficiency" value={`${round(efficiency, 1)}%`} note="Actual drop ÷ maximum possible drop" tone={band.tone} />
        <Metric label="Actual temperature drop" value={`${round(tempDrop, 1)}°F`} note={`${hotIn}°F → ${hotOut}°F`} />
        <Metric label="Best theoretically possible" value={`${round(bestPossible, 1)}°F`} note={`Down to ${ambient}°F ambient`} />
        <Metric label="Approach to ambient" value={`${round(hotOut - ambient, 1)}°F`} note="How close the outlet got to ambient" />
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
