"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { fitmentEdges } from "../fitment-math";
import { round } from "../tire-math";

const DEFAULTS = { width: "9", offset: "20", tire: "265" };

export function WheelFitmentCalculator() {
  const { values, set, reset } = useToolState("wheel-fitment", DEFAULTS);
  const wheelWidthIn = Number(values.width ?? DEFAULTS.width) || 0;
  const offsetMm = Number(values.offset ?? DEFAULTS.offset) || 0;
  const tireSectionWidthMm = Number(values.tire ?? DEFAULTS.tire) || 0;

  const edges = useMemo(() => fitmentEdges({ wheelWidthIn, offsetMm, tireSectionWidthMm }), [wheelWidthIn, offsetMm, tireSectionWidthMm]);
  const tireWidthIn = tireSectionWidthMm / 25.4;
  const bulgePerSide = Math.max(0, (tireWidthIn - wheelWidthIn) / 2);

  const summary = [
    `${wheelWidthIn}" wheel @ ${offsetMm}mm offset, ${tireSectionWidthMm}mm tire`,
    `Outer edge from hub face: ${round(edges.outerEdgeIn, 2)}"`,
    `Inner edge from hub face: ${round(edges.innerEdgeIn, 2)}"`,
    `Tire bulge per side: ${round(bulgePerSide, 2)}"`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">WHEEL POSITION PLUS TIRE BULGE</span>
        <h2 id="calculator-title">Where the tire actually ends up</h2>
        <p>
          A wheel offset calculation tells you where the rim sits. It does not tell you where the tire
          sits, and the tire is what actually contacts things. This adds the tire&apos;s bulge — where it
          is wider than the wheel — on top of the wheel&apos;s own position.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Wheel width" value={values.width ?? DEFAULTS.width} onChange={(v) => set("width", v)} step={0.5} min={5} max={16} suffix="in" />
        <StepField label="Wheel offset" value={values.offset ?? DEFAULTS.offset} onChange={(v) => set("offset", v)} step={5} min={-50} max={80} suffix="mm" />
        <StepField label="Tire section width" value={values.tire ?? DEFAULTS.tire} onChange={(v) => set("tire", v)} step={5} min={155} max={355} suffix="mm" />
      </div>

      <div className="tool-metrics wide">
        <Metric label="Outer edge from hub" value={`${round(edges.outerEdgeIn, 2)}"`} note="Toward the fender" tone="good" />
        <Metric label="Inner edge from hub" value={`${round(edges.innerEdgeIn, 2)}"`} note="Toward the strut" tone="good" />
        <Metric label="Tire bulge per side" value={`${round(bulgePerSide, 2)}"`} note="Beyond the rim edges" />
        <Metric label="Overall width at tire" value={`${round(edges.outerEdgeIn + edges.innerEdgeIn, 2)}"`} note="Outer + inner" />
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Check what these edge positions leave against your fender and strut —{" "}
        <Link href={`/tools/fender-clearance-calculator?movement=${round(edges.outerEdgeIn, 2)}`}>fender clearance</Link> and{" "}
        <Link href={`/tools/suspension-clearance-calculator?movement=${round(edges.innerEdgeIn, 2)}`}>suspension clearance</Link>{" "}
        both take a measured baseline.
      </p>
    </section>
  );
}
