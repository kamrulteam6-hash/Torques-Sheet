"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { atmosphericPressureAtAltitude, boostPressureRatio } from "../fuel-air-math";
import { round } from "../tire-math";

const DEFAULTS = { boost: "15", altitude: "0" };

export function BoostPressureRatioCalculator() {
  const { values, set, reset } = useToolState("boost-pr", DEFAULTS);
  const boost = Number(values.boost ?? DEFAULTS.boost) || 0;
  const altitude = Number(values.altitude ?? DEFAULTS.altitude) || 0;

  const result = useMemo(() => boostPressureRatio({ boostPsi: boost, altitudeFt: altitude }), [boost, altitude]);
  const seaLevelResult = useMemo(() => boostPressureRatio({ boostPsi: boost, altitudeFt: 0 }), [boost]);

  const summary = [
    `${boost} psi boost at ${altitude} ft`,
    `Atmospheric pressure: ${round(result.atmosphericPsi, 3)} psi`,
    `Absolute pressure: ${round(result.absolutePsi, 3)} psi`,
    `Pressure ratio: ${round(result.pressureRatio, 3)}`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">CORRECTED FOR ALTITUDE</span>
        <h2 id="calculator-title">The pressure ratio a compressor map reads</h2>
        <p>
          A boost gauge reads gauge pressure — pressure above whatever the atmosphere already provides.
          A compressor map is built on absolute pressure ratio, which needs the actual atmospheric
          pressure at your altitude, not the sea-level figure most rules of thumb assume.
        </p>
      </div>

      <div className="tool-inputs pair">
        <StepField label="Boost pressure (gauge)" value={values.boost ?? DEFAULTS.boost} onChange={(v) => set("boost", v)} step={1} min={0} max={40} suffix="psi" />
        <StepField label="Altitude" value={values.altitude ?? DEFAULTS.altitude} onChange={(v) => set("altitude", v)} step={250} min={0} max={12000} suffix="ft" />
      </div>

      <div className="tool-metrics wide">
        <Metric label="Pressure ratio" value={round(result.pressureRatio, 3).toString()} note="What the compressor map reads" tone="good" />
        <Metric label="Atmospheric pressure here" value={`${round(result.atmosphericPsi, 3)} psi`} note={`At ${altitude.toLocaleString()} ft`} />
        <Metric label="Absolute pressure" value={`${round(result.absolutePsi, 3)} psi`} note="Boost + atmospheric" />
        <Metric label="PR at sea level (same boost)" value={round(seaLevelResult.pressureRatio, 3).toString()} note={`${signedDiff(result.pressureRatio, seaLevelResult.pressureRatio)} at altitude`} />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Altitude</th>
              <th>Atmospheric pressure</th>
              <th>PR at {boost} psi boost</th>
            </tr>
          </thead>
          <tbody>
            {[0, 1000, 2500, 5000, 7500, 10000].map((alt) => {
              const r = boostPressureRatio({ boostPsi: boost, altitudeFt: alt });
              return (
                <tr key={alt} className={alt === altitude ? "row-active" : undefined}>
                  <th>{alt.toLocaleString()} ft</th>
                  <td>{round(atmosphericPressureAtAltitude(alt), 2)} psi</td>
                  <td>{round(r.pressureRatio, 3)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Want a rough power-potential estimate from this pressure ratio too?{" "}
        <Link href={`/tools/turbo-boost-calculator?boost=${boost}&altitude=${altitude}`}>
          The turbo boost calculator
        </Link>{" "}
        adds that on top, clearly labelled as a ceiling rather than a prediction.
      </p>
    </section>
  );
}

function signedDiff(a: number, b: number) {
  const diff = a - b;
  return `${diff >= 0 ? "+" : ""}${diff.toFixed(3)}`;
}
