"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { displacement } from "../engine-math";
import { cylinderVolumes } from "../fuel-air-math";
import { round } from "../tire-math";

const DEFAULTS = { bore: "4", stroke: "3.48", ratio: "10.2" };

export function CylinderVolumeCalculator() {
  const { values, set, reset } = useToolState("cyl-volume", DEFAULTS);
  const bore = Number(values.bore ?? DEFAULTS.bore) || 0;
  const stroke = Number(values.stroke ?? DEFAULTS.stroke) || 0;
  const ratio = Number(values.ratio ?? DEFAULTS.ratio) || 0;

  const disp = useMemo(() => displacement(bore, stroke, 1), [bore, stroke]);
  const vols = useMemo(() => cylinderVolumes(disp.perCylinderCc, ratio), [disp.perCylinderCc, ratio]);

  const summary = [
    `${bore}" bore x ${stroke}" stroke, ${ratio}:1 CR`,
    `Swept: ${round(vols.sweptCc, 1)} cc`,
    `Clearance: ${round(vols.clearanceCc, 1)} cc`,
    `Total (BDC): ${round(vols.totalCc, 1)} cc`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">SWEPT, CLEARANCE, TOTAL</span>
        <h2 id="calculator-title">One cylinder&apos;s volume, broken into its parts</h2>
        <p>
          Every cylinder has three volumes worth knowing: how much it sweeps between top and bottom dead
          centre, how much is left at the top, and the two added together. Static compression ratio ties
          all three together.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Bore" value={values.bore ?? DEFAULTS.bore} onChange={(v) => set("bore", v)} step={0.005} min={1} max={7} suffix="in" />
        <StepField label="Stroke" value={values.stroke ?? DEFAULTS.stroke} onChange={(v) => set("stroke", v)} step={0.01} min={1} max={7} suffix="in" />
        <StepField label="Static compression ratio" value={values.ratio ?? DEFAULTS.ratio} onChange={(v) => set("ratio", v)} step={0.1} min={5} max={16} suffix=":1" />
      </div>

      <div className="tool-metrics wide">
        <Metric label="Swept volume" value={`${round(vols.sweptCc, 1)} cc`} note="Between TDC and BDC" tone="good" />
        <Metric label="Clearance volume" value={`${round(vols.clearanceCc, 1)} cc`} note="Left above the piston at TDC" tone="good" />
        <Metric label="Total volume (BDC)" value={`${round(vols.totalCc, 1)} cc`} note="Swept + clearance" />
        <Metric label="Per cylinder, cubic inches" value={`${round(disp.perCylinderCi, 2)} ci`} note="Swept volume in ci" />
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Building compression from the four real volumes rather than an assumed clearance?{" "}
        <Link href={`/tools/compression-ratio-calculator?bore=${bore}&stroke=${stroke}`}>
          The full compression ratio calculator
        </Link>{" "}
        itemises chamber, gasket, deck and piston separately.
      </p>
    </section>
  );
}
