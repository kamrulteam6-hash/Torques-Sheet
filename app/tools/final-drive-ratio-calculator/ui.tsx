"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { COMMON_AXLE_RATIOS, nearestAxleRatio, round } from "../tire-math";
import { ringPinionRatio } from "../perf-math";

const DEFAULTS = { ring: "41", pinion: "10" };

export function FinalDriveRatioCalculator() {
  const { values, set, reset } = useToolState("final-drive", DEFAULTS);
  const ring = Math.round(Number(values.ring ?? DEFAULTS.ring)) || 0;
  const pinion = Math.round(Number(values.pinion ?? DEFAULTS.pinion)) || 0;

  const ratio = useMemo(() => ringPinionRatio(ring, pinion), [ring, pinion]);
  const nearest = useMemo(() => nearestAxleRatio(ratio), [ratio]);
  const onStandard = Math.abs(nearest.errorPct) < 0.5;

  const summary = [
    `${ring} ring teeth ÷ ${pinion} pinion teeth`,
    `Final drive (differential) ratio: ${round(ratio, 2)}:1`,
    onStandard ? "Matches a standard production ratio" : `Nearest standard ratio: ${nearest.ratio}:1`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">FROM RING & PINION TEETH</span>
        <h2 id="calculator-title">The physical definition of the ratio</h2>
        <p>
          A final drive ratio — also called a differential ratio, since they name the same component —
          is simply the ring gear&apos;s tooth count divided by the pinion&apos;s. Count the teeth and the
          ratio follows exactly, no measurement or estimation involved.
        </p>
      </div>

      <div className="tool-inputs pair">
        <StepField label="Ring gear teeth" value={values.ring ?? DEFAULTS.ring} onChange={(v) => set("ring", v)} step={1} min={20} max={60} suffix="teeth" />
        <StepField label="Pinion gear teeth" value={values.pinion ?? DEFAULTS.pinion} onChange={(v) => set("pinion", v)} step={1} min={6} max={20} suffix="teeth" />
      </div>

      <Verdict
        tone={onStandard ? "good" : "warn"}
        headline={`${round(ratio, 2)}:1 final drive ratio`}
        detail={
          onStandard
            ? `This matches the standard ${nearest.ratio}:1 ratio almost exactly. If you counted the teeth yourself, this is a good confirmation that the count was accurate.`
            : `The nearest standard production ratio is ${nearest.ratio}:1, which this differs from by ${round(Math.abs(nearest.errorPct), 1)}%. That gap is worth double-checking — a common miscount is one tooth on the pinion, which moves the ratio noticeably.`
        }
      />

      <div className="tool-metrics wide">
        <Metric label="Final drive ratio" value={`${round(ratio, 3)}:1`} note="Ring ÷ pinion" tone="good" />
        <Metric label="Nearest standard ratio" value={`${nearest.ratio}:1`} note={`${round(nearest.errorPct, 1)}% difference`} />
        <Metric label="Ring teeth" value={String(ring)} note="Larger gear, bolted to the carrier" />
        <Metric label="Pinion teeth" value={String(pinion)} note="Smaller gear, driven by the driveshaft" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Standard ratio</th>
              <th>Ring teeth (typical)</th>
              <th>Pinion teeth (typical)</th>
            </tr>
          </thead>
          <tbody>
            {COMMON_AXLE_RATIOS.map((std) => {
              // Show a plausible teeth pair near a common pinion count.
              const pTeeth = 10;
              const rTeeth = Math.round(std * pTeeth);
              return (
                <tr key={std} className={std === nearest.ratio ? "row-active" : undefined}>
                  <th>{std}:1</th>
                  <td>{rTeeth}</td>
                  <td>{pTeeth}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Planning a tire size change against this ratio?{" "}
        <Link href={`/tools/regear-calculator?axle=${round(ratio, 2)}`}>
          Check what a size change does to it
        </Link>
        , or see the{" "}
        <Link href="/tools/overall-gear-ratio-calculator">overall ratio</Link> once the transmission gear
        is included.
      </p>
    </section>
  );
}
