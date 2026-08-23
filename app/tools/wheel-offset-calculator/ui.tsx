"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { fitmentChange, offsetToBackspacing, round, signed } from "../tire-math";

const DEFAULTS = {
  cw: "8",
  co: "45",
  nw: "9",
  no: "20",
};

/**
 * Cross-section looking down at the wheel from above: the mounting face is
 * fixed, and the two wheels are drawn either side of it to the same scale.
 * Seeing the inner edge move toward the suspension is the whole point.
 */
function FitmentDrawing({
  currentWidth,
  currentOffset,
  newWidth,
  newOffset,
}: {
  currentWidth: number;
  currentOffset: number;
  newWidth: number;
  newOffset: number;
}) {
  const box = { w: 300, h: 150 };
  const scale = 16; // pixels per inch
  const hubX = box.w / 2;

  const bar = (width: number, offset: number, y: number, className: string, label: string) => {
    const offsetIn = offset / 25.4;
    // Positive offset moves the mounting face outboard, i.e. the wheel body inboard.
    const centre = hubX - offsetIn * scale;
    const half = (width / 2) * scale;
    return (
      <g className={className}>
        <rect x={centre - half} y={y} width={half * 2} height={22} rx={3} />
        <text x={centre} y={y + 15} textAnchor="middle" className="bar-label">
          {label}
        </text>
      </g>
    );
  };

  return (
    <svg
      className="fitment-drawing"
      viewBox={`0 0 ${box.w} ${box.h}`}
      role="img"
      aria-label={`Top-down comparison: current wheel ${currentWidth} inches wide at ${currentOffset} mm offset against a new wheel ${newWidth} inches wide at ${newOffset} mm offset`}
    >
      <text x={8} y={14} className="axis-label">
        inboard (suspension)
      </text>
      <text x={box.w - 8} y={14} textAnchor="end" className="axis-label">
        outboard (fender)
      </text>
      <line x1={hubX} y1={22} x2={hubX} y2={box.h - 8} className="hub-line" />
      <text x={hubX + 5} y={box.h - 12} className="axis-label">
        hub face
      </text>
      {bar(currentWidth, currentOffset, 34, "wheel-current", "current")}
      {bar(newWidth, newOffset, 78, "wheel-new", "new")}
    </svg>
  );
}

export function WheelOffsetCalculator() {
  const { values, set, reset } = useToolState("wheel-offset", DEFAULTS);
  const cw = Number(values.cw ?? DEFAULTS.cw) || 0;
  const co = Number(values.co ?? DEFAULTS.co) || 0;
  const nw = Number(values.nw ?? DEFAULTS.nw) || 0;
  const no = Number(values.no ?? DEFAULTS.no) || 0;

  const change = useMemo(
    () => fitmentChange({ currentWidth: cw, currentOffset: co, newWidth: nw, newOffset: no }),
    [cw, co, nw, no],
  );

  const currentBack = offsetToBackspacing(cw, co);
  const newBack = offsetToBackspacing(nw, no);

  const summary = [
    `Current: ${cw}" wide, ${co} mm offset, ${round(currentBack, 2)}" backspacing`,
    `New: ${nw}" wide, ${no} mm offset, ${round(newBack, 2)}" backspacing`,
    `Outer edge moves ${signed(change.outward)}" (${change.outward >= 0 ? "poke" : "tuck"})`,
    `Inner edge moves ${signed(change.inward)}" toward the suspension`,
    `Track width change: ${signed(change.trackChange)}" across the axle`,
  ].join("\n");

  const pokeTone = change.outward > 0.75 ? "bad" : change.outward > 0.25 ? "warn" : "good";
  const innerTone = change.inward > 0.5 ? "bad" : change.inward > 0.2 ? "warn" : "good";
  const worst = pokeTone === "bad" || innerTone === "bad" ? "bad" : pokeTone === "warn" || innerTone === "warn" ? "warn" : "good";

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">COMPARE TWO WHEELS</span>
        <h2 id="calculator-title">Where the new wheel actually sits</h2>
        <p>
          Offset on its own tells you nothing useful — a 9-inch wheel at +20 sits quite differently from
          an 8-inch wheel at +20. Enter both wheels and this works out how far the new one pokes out and
          how much closer it sits to the suspension.
        </p>
      </div>

      <div className="wheel-input-grid">
        <div className="wheel-column">
          <span className="column-head">Current wheel</span>
          <StepField label="Width" value={values.cw ?? DEFAULTS.cw} onChange={(v) => set("cw", v)} step={0.5} min={5} max={16} suffix="in" />
          <StepField label="Offset" value={values.co ?? DEFAULTS.co} onChange={(v) => set("co", v)} step={5} min={-100} max={80} suffix="mm" hint="Stamped on the back of the spokes as ET" />
        </div>
        <div className="wheel-column">
          <span className="column-head">New wheel</span>
          <StepField label="Width" value={values.nw ?? DEFAULTS.nw} onChange={(v) => set("nw", v)} step={0.5} min={5} max={16} suffix="in" />
          <StepField label="Offset" value={values.no ?? DEFAULTS.no} onChange={(v) => set("no", v)} step={5} min={-100} max={80} suffix="mm" hint="Negative offset pushes the wheel outward" />
        </div>
      </div>

      <Verdict
        tone={worst}
        headline={
          Math.abs(change.outward) < 0.1 && Math.abs(change.inward) < 0.1
            ? "The new wheel sits essentially where the old one does"
            : `Outer edge moves ${signed(change.outward)}", inner edge moves ${signed(change.inward)}" inboard`
        }
        detail={
          worst === "good"
            ? "A change this small is usually absorbed without trouble, though tire section width still has the final say on clearance. Check at full steering lock before assuming it clears."
            : worst === "warn"
              ? `This is the range where fitment starts to depend on your specific vehicle. ${change.outward > 0.25 ? `The wheel and tire will sit ${round(change.outward, 2)} inches further out, so check the fender lip at full compression. ` : ""}${change.inward > 0.2 ? `The inner edge moves ${round(change.inward, 2)} inches closer to the strut and control arm — that is the clearance to measure before ordering.` : ""}`
              : `This is a significant fitment change. ${change.outward > 0.75 ? `Poke of ${round(change.outward, 2)} inches usually means fender contact at full lock or full compression unless the arches have been modified. ` : ""}${change.inward > 0.5 ? `The inner edge moving ${round(change.inward, 2)} inches inboard is very likely to foul the strut or control arm — measure the actual gap rather than hoping.` : ""}`
        }
      />

      <div className="tool-result-split">
        <FitmentDrawing currentWidth={cw} currentOffset={co} newWidth={nw} newOffset={no} />
        <div className="tool-metrics">
          <Metric label="Outer edge (poke)" value={`${signed(change.outward)}"`} note={change.outward >= 0 ? "Further toward the fender" : "Tucked further in"} tone={pokeTone} />
          <Metric label="Inner edge" value={`${signed(change.inward)}"`} note="Toward the strut and control arm" tone={innerTone} />
          <Metric label="Track width" value={`${signed(change.trackChange)}"`} note="Across the axle, both wheels" />
          <Metric label="Current backspacing" value={`${round(currentBack, 2)}"`} note={`${cw}" wheel at ${co >= 0 ? "+" : ""}${co} mm`} />
          <Metric label="New backspacing" value={`${round(newBack, 2)}"`} note={`${nw}" wheel at ${no >= 0 ? "+" : ""}${no} mm`} />
          <Metric label="Backspacing change" value={`${signed(newBack - currentBack)}"`} note="Negative means less inboard depth" />
        </div>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Measuring a wheel you already own rather than comparing two?{" "}
        <Link href="/tools/wheel-backspacing-calculator">Convert backspacing to offset instead</Link>.
      </p>
    </section>
  );
}
