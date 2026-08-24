"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { measure, round, signed } from "../tire-math";

const DEFAULTS = { size: "225/65R17", distance: "1" };

export function TireCircumferenceCalculator() {
  const { values, set, reset } = useToolState("tire-circumference", DEFAULTS);
  const sizeInput = values.size ?? DEFAULTS.size;
  const miles = Number(values.distance ?? DEFAULTS.distance) || 0;

  const geometry = useMemo(() => measure(sizeInput), [sizeInput]);

  const revsForDistance = geometry ? geometry.revsPerMile * miles : 0;
  const revsPerKm = geometry ? geometry.revsPerMile / 1.609344 : 0;
  // At 60 mph the wheel covers one mile a minute, so revs per mile is also
  // revolutions per minute at that speed.
  const rpmAt60 = geometry ? geometry.revsPerMile : 0;

  const summary = geometry
    ? [
        `${geometry.size.label}`,
        `Circumference: ${round(geometry.circumference, 2)} in (${round(geometry.circumference * 25.4, 0)} mm)`,
        `Revolutions per mile: ${Math.round(geometry.revsPerMile)}`,
        `Revolutions per km: ${Math.round(revsPerKm)}`,
        `Wheel speed at 60 mph: ${Math.round(rpmAt60)} rpm`,
      ].join("\n")
    : "";

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">ROLLING DISTANCE PER REVOLUTION</span>
        <h2 id="calculator-title">Circumference and revolutions per mile</h2>
        <p>
          Circumference is how far the vehicle travels for one turn of the wheel. Revolutions per mile
          is the same fact inverted — and it is the figure your speedometer, odometer, ABS and traction
          control are all calibrated against.
        </p>
      </div>

      <div className="tool-inputs pair">
        <Field
          label="Tire size"
          value={sizeInput}
          onChange={(value) => set("size", value)}
          placeholder="225/65R17"
          hint="Metric or flotation sizes both work"
          invalid={Boolean(sizeInput) && !geometry}
        />
        <StepField
          label="Distance"
          value={values.distance ?? DEFAULTS.distance}
          onChange={(value) => set("distance", value)}
          step={1}
          min={0.1}
          max={5000}
          suffix="mi"
          hint="To count total revolutions over a journey"
        />
      </div>

      {!geometry && sizeInput && (
        <p className="tool-error" role="alert">
          That size is not readable yet. The expected form is <b>225/65R17</b>.
        </p>
      )}

      {geometry && (
        <>
          <div className="tool-metrics wide">
            <Metric
              label="Circumference"
              value={`${round(geometry.circumference, 2)}"`}
              note={`${round(geometry.circumference * 25.4, 0)} mm · ${round(geometry.circumference / 12, 2)} ft`}
              tone="good"
            />
            <Metric
              label="Revolutions per mile"
              value={String(Math.round(geometry.revsPerMile))}
              note="What the calibration is built on"
            />
            <Metric label="Revolutions per km" value={String(Math.round(revsPerKm))} note="Metric equivalent" />
            <Metric
              label="Wheel speed at 60 mph"
              value={`${Math.round(rpmAt60)} rpm`}
              note="At 60 mph, revs per mile equals revs per minute"
            />
          </div>

          <div className="tool-metrics wide">
            <Metric label="Overall diameter" value={`${round(geometry.diameter, 2)}"`} note="Circumference ÷ π" />
            <Metric
              label={`Revolutions over ${round(miles, 1)} mi`}
              value={Math.round(revsForDistance).toLocaleString()}
              note="Total wheel rotations"
            />
            <Metric
              label="Distance per 1,000 revs"
              value={`${round((geometry.circumference * 1000) / 63360, 3)} mi`}
              note={`${round((geometry.circumference * 1000) / 12, 0)} ft`}
            />
            <Metric
              label="Revolutions per hour at 60 mph"
              value={Math.round(rpmAt60 * 60).toLocaleString()}
              note="Duty cycle on a sustained highway run"
            />
          </div>

          <div className="table-scroll">
            <table className="diagnostic-table">
              <thead>
                <tr>
                  <th>Road speed</th>
                  <th>Wheel speed</th>
                  <th>Revolutions per hour</th>
                </tr>
              </thead>
              <tbody>
                {[20, 30, 45, 60, 75].map((mph) => {
                  const rpm = (mph * 63360) / (geometry.circumference * 60);
                  return (
                    <tr key={mph} className={mph === 60 ? "row-active" : undefined}>
                      <th>{mph} mph</th>
                      <td>{Math.round(rpm)} rpm</td>
                      <td>{Math.round(rpm * 60).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="table-scroll">
            <table className="diagnostic-table">
              <thead>
                <tr>
                  <th>Tread wear</th>
                  <th>Diameter</th>
                  <th>Circumference</th>
                  <th>Revs per mile</th>
                  <th>Odometer effect</th>
                </tr>
              </thead>
              <tbody>
                {[0, 4, 8].map((thirtySeconds) => {
                  // Each 1/32 inch of tread lost removes 2/32 inch of diameter.
                  const lost = (thirtySeconds / 32) * 2;
                  const dia = geometry.diameter - lost;
                  const circ = dia * Math.PI;
                  const revs = 63360 / circ;
                  const drift = (revs / geometry.revsPerMile - 1) * 100;
                  return (
                    <tr key={thirtySeconds} className={thirtySeconds === 0 ? "row-active" : undefined}>
                      <th>{thirtySeconds === 0 ? "New" : `${thirtySeconds}/32" worn`}</th>
                      <td>{round(dia, 2)}&quot;</td>
                      <td>{round(circ, 2)}&quot;</td>
                      <td>{Math.round(revs)}</td>
                      <td>{thirtySeconds === 0 ? "baseline" : `${signed(drift, 2)}%`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <ShareRow summary={summary} onReset={reset} />

          <p className="tool-next">
            Changed size and need the calibration consequence?{" "}
            <Link
              href={`/tools/speedometer-error-calculator?from=${encodeURIComponent(geometry.size.label)}`}
            >
              The speedometer error calculator works from these same revs-per-mile figures
            </Link>
            .
          </p>
        </>
      )}
    </section>
  );
}
