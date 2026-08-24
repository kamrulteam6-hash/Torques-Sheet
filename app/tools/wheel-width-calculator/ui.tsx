"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { wheelWidthRange } from "../fitment-math";
import { round } from "../tire-math";

const DEFAULTS = { section: "245" };

export function WheelWidthCalculator() {
  const { values, set, reset } = useToolState("wheel-width", DEFAULTS);
  const sectionWidthMm = Number(values.section ?? DEFAULTS.section) || 0;

  const range = useMemo(() => wheelWidthRange(sectionWidthMm), [sectionWidthMm]);

  const summary = [
    `${sectionWidthMm}mm section width`,
    `Ideal rim width: ${round(range.idealIn, 2)}"`,
    `Approved range: ${round(range.minIn, 2)}" - ${round(range.maxIn, 2)}"`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">TRA/ETRTO CONVENTION</span>
        <h2 id="calculator-title">The rim width a tire actually wants</h2>
        <p>
          Every tire section width has an approved rim-width band, not a single correct wheel. Mount a
          tire outside that band and the sidewall is pulled into a shape it was not designed to hold.
        </p>
      </div>

      <div className="tool-inputs single">
        <StepField label="Tire section width" value={values.section ?? DEFAULTS.section} onChange={(v) => set("section", v)} step={5} min={125} max={355} suffix="mm" />
      </div>

      <div className="tool-metrics wide">
        <Metric label="Ideal rim width" value={`${round(range.idealIn, 2)}"`} note="~85% of section width" tone="good" />
        <Metric label="Minimum approved" value={`${round(range.minIn, 2)}"`} note="Roughly 1 inch narrower" />
        <Metric label="Maximum approved" value={`${round(range.maxIn, 2)}"`} note="Roughly 1 inch wider" />
        <Metric label="Section width" value={`${sectionWidthMm} mm`} note={`${round(sectionWidthMm / 25.4, 2)}"`} />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Section width</th>
              <th>Ideal rim width</th>
              <th>Approved range</th>
            </tr>
          </thead>
          <tbody>
            {[185, 205, 225, 245, 265, 285, 305, 325].map((w) => {
              const r = wheelWidthRange(w);
              return (
                <tr key={w} className={w === sectionWidthMm ? "row-active" : undefined}>
                  <th>{w} mm</th>
                  <td>{round(r.idealIn, 1)}&quot;</td>
                  <td>
                    {round(r.minIn, 1)}&quot;–{round(r.maxIn, 1)}&quot;
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Fitting a wheel with a specific offset too?{" "}
        <Link href="/tools/wheel-fitment-calculator">The wheel fitment calculator</Link> adds tire bulge
        on top of the wheel position.
      </p>
    </section>
  );
}
