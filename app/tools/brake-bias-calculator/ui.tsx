"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { brakeBias, staticBiasFromWeight } from "../brake-math";
import { round } from "../tire-math";

const DEFAULTS = { front: "700", rear: "300", frontWeight: "2100", rearWeight: "1400" };

export function BrakeBiasCalculator() {
  const { values, set, reset } = useToolState("brake-bias", DEFAULTS);
  const frontTorque = Number(values.front ?? DEFAULTS.front) || 0;
  const rearTorque = Number(values.rear ?? DEFAULTS.rear) || 0;
  const frontWeight = Number(values.frontWeight ?? DEFAULTS.frontWeight) || 0;
  const rearWeight = Number(values.rearWeight ?? DEFAULTS.rearWeight) || 0;

  const bias = useMemo(() => brakeBias(frontTorque, rearTorque), [frontTorque, rearTorque]);
  const staticBias = useMemo(() => staticBiasFromWeight(frontWeight, rearWeight), [frontWeight, rearWeight]);
  const diffFromStatic = bias.frontPct - staticBias;

  const summary = [
    `Front torque: ${frontTorque} lb·ft, rear: ${rearTorque} lb·ft`,
    `Brake bias: ${round(bias.frontPct, 1)}% front / ${round(bias.rearPct, 1)}% rear`,
    `Static weight bias: ${round(staticBias, 1)}% front`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">ACTUAL TORQUE, AGAINST A WEIGHT BASELINE</span>
        <h2 id="calculator-title">Front-to-rear brake bias</h2>
        <p>
          Bias is simply each axle&apos;s share of total torque. The static weight distribution is shown
          alongside as a baseline for comparison — dynamic weight transfer under braking moves the
          genuinely ideal bias further forward than static weight alone suggests.
        </p>
      </div>

      <div className="tool-inputs pair">
        <StepField label="Front axle torque" value={values.front ?? DEFAULTS.front} onChange={(v) => set("front", v)} step={10} min={0} max={2000} suffix="lb·ft" hint="Per wheel, from the brake pressure calculator" />
        <StepField label="Rear axle torque" value={values.rear ?? DEFAULTS.rear} onChange={(v) => set("rear", v)} step={10} min={0} max={2000} suffix="lb·ft" />
      </div>

      <div className="tool-inputs pair">
        <StepField label="Front axle weight" value={values.frontWeight ?? DEFAULTS.frontWeight} onChange={(v) => set("frontWeight", v)} step={25} min={200} max={5000} suffix="lb" />
        <StepField label="Rear axle weight" value={values.rearWeight ?? DEFAULTS.rearWeight} onChange={(v) => set("rearWeight", v)} step={25} min={200} max={5000} suffix="lb" />
      </div>

      <Verdict
        tone={Math.abs(diffFromStatic) <= 10 ? "good" : "warn"}
        headline={`${round(bias.frontPct, 1)}% front / ${round(bias.rearPct, 1)}% rear`}
        detail={`Static weight distribution alone puts front bias at ${round(staticBias, 1)}%, so this setup runs ${signed(diffFromStatic)} percentage points ${diffFromStatic >= 0 ? "further forward" : "further rearward"} than static weight. Some forward bias beyond static is normal and expected — weight transfers toward the front under braking, and biasing torque to match keeps the rear from locking prematurely.`}
      />

      <div className="tool-metrics wide">
        <Metric label="Front bias" value={`${round(bias.frontPct, 1)}%`} note={`${frontTorque} lb·ft`} tone="good" />
        <Metric label="Rear bias" value={`${round(bias.rearPct, 1)}%`} note={`${rearTorque} lb·ft`} />
        <Metric label="Static weight bias (front)" value={`${round(staticBias, 1)}%`} note="Baseline for comparison" />
        <Metric label="Difference from static" value={`${signed(diffFromStatic)} pts`} note={diffFromStatic >= 0 ? "Forward of static" : "Rearward of static"} />
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Working out the torque figures from your hardware?{" "}
        <Link href="/tools/brake-pressure-calculator">The brake pressure calculator</Link> runs the full
        pedal-to-rotor chain for each axle.
      </p>
    </section>
  );
}

function signed(value: number) {
  return `${value >= 0 ? "+" : "−"}${Math.abs(value).toFixed(1)}`;
}
