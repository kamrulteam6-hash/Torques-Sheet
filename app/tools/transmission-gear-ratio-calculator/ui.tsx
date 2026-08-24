"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { transmissionRatioFromRpm } from "../perf-math";
import { round } from "../tire-math";

const DEFAULTS = { input: "3500", output: "1000" };

const NAMED_RANGES: { range: [number, number]; label: string }[] = [
  { range: [2.8, 4.0], label: "First gear — typical range" },
  { range: [1.8, 2.6], label: "Second gear — typical range" },
  { range: [1.2, 1.7], label: "Third gear — typical range" },
  { range: [0.95, 1.05], label: "Direct drive (1:1) — common fourth or top gear" },
  { range: [0.6, 0.94], label: "Overdrive — common highest gear on a 5+ speed" },
];

export function TransmissionGearRatioCalculator() {
  const { values, set, reset } = useToolState("trans-ratio", DEFAULTS);
  const inputRpm = Number(values.input ?? DEFAULTS.input) || 0;
  const outputRpm = Number(values.output ?? DEFAULTS.output) || 0;

  const ratio = useMemo(() => transmissionRatioFromRpm(inputRpm, outputRpm), [inputRpm, outputRpm]);

  const named = NAMED_RANGES.find((n) => ratio >= n.range[0] && ratio <= n.range[1]);
  const isOverdrive = ratio < 0.98;
  const isDirect = ratio >= 0.98 && ratio <= 1.02;

  const summary = [
    `Input (engine/converter): ${inputRpm} rpm`,
    `Output (driveshaft): ${outputRpm} rpm`,
    `Gear ratio: ${round(ratio, 3)}:1`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">MEASURED ON A LIFT</span>
        <h2 id="calculator-title">One gear&apos;s ratio, from shaft speeds</h2>
        <p>
          With the vehicle safely on a lift, wheels off the ground, run the engine in the gear you want
          to measure. Compare input shaft speed (engine or torque converter) against output shaft speed
          (the driveshaft) and the ratio follows directly — no disassembly needed.
        </p>
      </div>

      <div className="tool-inputs pair">
        <StepField label="Input shaft speed" value={values.input ?? DEFAULTS.input} onChange={(v) => set("input", v)} step={50} min={500} max={9000} suffix="rpm" hint="Engine speed, or converter input on an automatic" />
        <StepField label="Output shaft speed" value={values.output ?? DEFAULTS.output} onChange={(v) => set("output", v)} step={50} min={100} max={9000} suffix="rpm" hint="Driveshaft speed" />
      </div>

      <Verdict
        tone="good"
        headline={`${round(ratio, 3)}:1${named ? ` — ${named.label}` : ""}`}
        detail={
          isDirect
            ? "This is a 1:1 direct-drive gear — the output shaft turns at the same speed as the input, meaning nothing is being multiplied or divided by this gear alone."
            : isOverdrive
              ? "This is an overdrive gear: the output shaft turns faster than the input. Overdrives exist specifically to lower engine speed at cruising RPM for fuel economy and quietness."
              : "The output shaft is turning slower than the input, meaning this gear is multiplying torque at the cost of speed — typical of the lower, numerically higher gears."
        }
      />

      <div className="tool-metrics wide">
        <Metric label="Gear ratio" value={`${round(ratio, 3)}:1`} note="Input ÷ output" tone="good" />
        <Metric label="Input speed" value={`${inputRpm} rpm`} note="Engine or converter input" />
        <Metric label="Output speed" value={`${outputRpm} rpm`} note="Driveshaft" />
        <Metric label="Character" value={isDirect ? "Direct (1:1)" : isOverdrive ? "Overdrive" : "Underdrive"} note="Relative to 1:1" />
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Got the final drive ratio too?{" "}
        <Link href={`/tools/overall-gear-ratio-calculator?gear=${round(ratio, 3)}`}>
          Multiply them into the overall ratio
        </Link>{" "}
        that actually relates engine speed to road speed.
      </p>
    </section>
  );
}
