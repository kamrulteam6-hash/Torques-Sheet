"use client";

import { useMemo } from "react";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { NATURAL_FREQUENCY_GUIDANCE, springRateResult } from "../suspension-math";
import { round } from "../tire-math";

const DEFAULTS = { spring: "400", motion: "0.7", corner: "850" };

export function SuspensionSpringRateCalculator() {
  const { values, set, reset } = useToolState("spring-rate", DEFAULTS);
  const springRate = Number(values.spring ?? DEFAULTS.spring) || 0;
  const motionRatio = Number(values.motion ?? DEFAULTS.motion) || 0;
  const cornerWeight = Number(values.corner ?? DEFAULTS.corner) || 0;

  const result = useMemo(() => springRateResult(springRate, motionRatio, cornerWeight), [springRate, motionRatio, cornerWeight]);
  const band = NATURAL_FREQUENCY_GUIDANCE.find((g) => result.naturalFrequencyHz >= g.range[0] && result.naturalFrequencyHz < g.range[1]);

  const summary = [
    `${springRate} lb/in spring, ${motionRatio} motion ratio, ${cornerWeight}lb corner`,
    `Wheel rate: ${round(result.wheelRate, 1)} lb/in`,
    `Natural frequency: ${round(result.naturalFrequencyHz, 2)} Hz`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">SPRING RATE, WHEEL RATE, FREQUENCY</span>
        <h2 id="calculator-title">What the tire actually feels</h2>
        <p>
          Spring rate is what is printed on the spring. Wheel rate is what the tire actually feels, once
          the suspension&apos;s leverage — the motion ratio — is accounted for. Natural frequency turns
          that wheel rate into a number you can compare against known handling targets.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Spring rate" value={values.spring ?? DEFAULTS.spring} onChange={(v) => set("spring", v)} step={10} min={50} max={2000} suffix="lb/in" />
        <StepField label="Motion ratio" value={values.motion ?? DEFAULTS.motion} onChange={(v) => set("motion", v)} step={0.01} min={0.3} max={1.5} hint="Wheel travel ÷ spring travel — usually under 1.0" />
        <StepField label="Corner weight" value={values.corner ?? DEFAULTS.corner} onChange={(v) => set("corner", v)} step={10} min={200} max={2000} suffix="lb" />
      </div>

      <Verdict
        tone="good"
        headline={`${round(result.naturalFrequencyHz, 2)} Hz${band ? ` — ${band.use}` : ""}`}
        detail={`Wheel rate works out to ${round(result.wheelRate, 1)} lb/in — the spring rate multiplied by the motion ratio squared, because leverage affects both the force and the distance the linkage passes through. Natural frequency ranges are context-dependent: a soft street setup and a high-downforce race car target completely different numbers, both correctly.`}
      />

      <div className="tool-metrics wide">
        <Metric label="Wheel rate" value={`${round(result.wheelRate, 1)} lb/in`} note="Spring rate × motion ratio²" tone="good" />
        <Metric label="Natural frequency" value={`${round(result.naturalFrequencyHz, 2)} Hz`} note={band?.use ?? "See guidance table"} tone="good" />
        <Metric label="Motion ratio squared" value={round(motionRatio * motionRatio, 3).toString()} note="The leverage penalty on spring rate" />
        <Metric label="Spring rate entered" value={`${springRate} lb/in`} note="What is printed on the spring" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Use case</th>
              <th>Natural frequency range</th>
            </tr>
          </thead>
          <tbody>
            {NATURAL_FREQUENCY_GUIDANCE.map((g) => (
              <tr key={g.use} className={band === g ? "row-active" : undefined}>
                <th>{g.use}</th>
                <td>
                  {g.range[0].toFixed(1)}–{g.range[1].toFixed(1)} Hz
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
