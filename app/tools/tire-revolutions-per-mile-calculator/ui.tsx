"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, useToolState } from "../tool-kit";
import { measure, round } from "../tire-math";

const DEFAULTS = { size: "225/65R17" };

export function TireRevolutionsPerMileCalculator() {
  const { values, set, reset } = useToolState("revs-mile", DEFAULTS);
  const sizeInput = values.size ?? DEFAULTS.size;
  const geometry = useMemo(() => measure(sizeInput), [sizeInput]);

  const revsPerKm = geometry ? geometry.revsPerMile / 1.60934 : 0;

  const summary = geometry
    ? [
        `${sizeInput}`,
        `Revolutions per mile: ${Math.round(geometry.revsPerMile)}`,
        `Revolutions per kilometre: ${Math.round(revsPerKm)}`,
        `Circumference: ${round(geometry.circumference, 2)} in`,
      ].join("\n")
    : "";

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">WHAT THE SPEEDOMETER IS CALIBRATED AGAINST</span>
        <h2 id="calculator-title">Revolutions per mile from tire size</h2>
        <p>
          Every speedometer and odometer reading ultimately comes from counting wheel rotations and
          multiplying by an assumed distance per rotation. This works out that figure directly from a
          tire size.
        </p>
      </div>

      <div className="tool-inputs single">
        <Field label="Tire size" value={sizeInput} onChange={(v) => set("size", v)} placeholder="225/65R17" invalid={Boolean(sizeInput) && !geometry} />
      </div>

      {!geometry && sizeInput && (
        <p className="tool-error" role="alert">
          That tire size is not readable yet. The expected form is <b>225/65R17</b>, or a flotation size
          such as <b>33x12.50R15</b>.
        </p>
      )}

      {geometry && (
        <>
          <div className="tool-metrics wide">
            <Metric label="Revolutions per mile" value={Math.round(geometry.revsPerMile).toString()} note="63,360 ÷ circumference" tone="good" />
            <Metric label="Revolutions per kilometre" value={Math.round(revsPerKm).toString()} note="Revs per mile ÷ 1.60934" tone="good" />
            <Metric label="Circumference" value={`${round(geometry.circumference, 2)}"`} note="One full revolution" />
            <Metric label="Overall diameter" value={`${round(geometry.diameter, 2)}"`} note={sizeInput} />
          </div>

          <ShareRow summary={summary} onReset={reset} />

          <p className="tool-next">
            Changing tire size and want to know the speedometer consequence?{" "}
            <Link href="/tools/speedometer-error-calculator">The speedometer error calculator</Link> uses
            this exact figure for both sizes.
          </p>
        </>
      )}
    </section>
  );
}
