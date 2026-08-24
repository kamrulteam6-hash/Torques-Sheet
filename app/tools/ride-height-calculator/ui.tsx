"use client";

import { useMemo } from "react";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { rideHeightChange } from "../suspension-math";
import { round } from "../tire-math";

const DEFAULTS = { spring: "1.0", motion: "0.7" };

export function RideHeightCalculator() {
  const { values, set, reset } = useToolState("ride-height", DEFAULTS);
  const springChangeIn = Number(values.spring ?? DEFAULTS.spring) || 0;
  const motionRatio = Number(values.motion ?? DEFAULTS.motion) || 0;

  const wheelChange = useMemo(() => rideHeightChange(springChangeIn, motionRatio), [springChangeIn, motionRatio]);

  const summary = [
    `Spring length change: ${springChangeIn}", motion ratio ${motionRatio}`,
    `Ride height change at the wheel: ${round(wheelChange, 2)}"`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">SPRING LENGTH TO RIDE HEIGHT</span>
        <h2 id="calculator-title">What a shorter or longer spring actually does</h2>
        <p>
          A change in spring free length or perch position does not translate one-to-one into ride
          height, because the suspension&apos;s motion ratio changes how much of that spring movement
          reaches the wheel. Below 1.0, the wheel moves more than the spring does.
        </p>
      </div>

      <div className="tool-inputs pair">
        <StepField label="Spring length change" value={values.spring ?? DEFAULTS.spring} onChange={(v) => set("spring", v)} step={0.1} min={-4} max={4} suffix="in" hint="Positive for shorter/more preload, however you track sign" />
        <StepField label="Motion ratio" value={values.motion ?? DEFAULTS.motion} onChange={(v) => set("motion", v)} step={0.01} min={0.3} max={1.5} hint="Wheel travel ÷ spring travel" />
      </div>

      <div className="tool-metrics wide">
        <Metric label="Ride height change at the wheel" value={`${round(wheelChange, 2)}"`} note="Spring change ÷ motion ratio" tone="good" />
        <Metric label="Spring length change entered" value={`${springChangeIn}"`} note="At the spring itself" />
        <Metric label="Motion ratio" value={motionRatio.toString()} note="Amplification factor for this change" />
        <Metric label="Amplification" value={`${round(1 / motionRatio, 2)}×`} note="How much the wheel moves per unit of spring movement" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Spring length change</th>
              <th>Ride height change at the wheel</th>
            </tr>
          </thead>
          <tbody>
            {[0.25, 0.5, 0.75, 1.0, 1.5, 2.0].map((s) => (
              <tr key={s} className={s === springChangeIn ? "row-active" : undefined}>
                <th>{s.toFixed(2)}&quot;</th>
                <td>{round(rideHeightChange(s, motionRatio), 2)}&quot;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
