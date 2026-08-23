"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { backspacingToOffset, offsetToBackspacing, round, signed } from "../tire-math";

const DEFAULTS = { width: "8", back: "4.5", mode: "back" };

/** Side-on section: the rim, the mounting face, and the backspacing dimension. */
function BackspacingDrawing({ width, backspacing }: { width: number; backspacing: number }) {
  const box = { w: 300, h: 140 };
  const scale = 20;
  const rimWidth = (width + 1) * scale;
  const left = (box.w - rimWidth) / 2;
  const right = left + rimWidth;
  const faceX = left + backspacing * scale;
  const top = 34;
  const bottom = 96;

  return (
    <svg
      className="fitment-drawing"
      viewBox={`0 0 ${box.w} ${box.h}`}
      role="img"
      aria-label={`Section view of a ${width} inch wide wheel with ${round(backspacing, 2)} inches of backspacing`}
    >
      <text x={left} y={18} className="axis-label">inboard</text>
      <text x={right} y={18} textAnchor="end" className="axis-label">outboard</text>

      <rect x={left} y={top} width={rimWidth} height={bottom - top} rx={3} className="rim-body" />
      <line x1={faceX} y1={top - 6} x2={faceX} y2={bottom + 6} className="mount-face" />
      <text x={faceX + 4} y={bottom + 18} className="axis-label">mounting face</text>

      <line x1={left} y1={top - 12} x2={faceX} y2={top - 12} className="dim-line" />
      <text x={(left + faceX) / 2} y={top - 16} textAnchor="middle" className="bar-label">
        {round(backspacing, 2)}&quot;
      </text>

      <line x1={left} y1={bottom + 24} x2={right} y2={bottom + 24} className="dim-line muted" />
      <text x={(left + right) / 2} y={bottom + 36} textAnchor="middle" className="axis-label">
        {width}&quot; bead seat + flanges
      </text>
    </svg>
  );
}

export function WheelBackspacingCalculator() {
  const { values, set, reset } = useToolState("wheel-backspacing", DEFAULTS);
  const width = Number(values.width ?? DEFAULTS.width) || 0;
  const mode = values.mode ?? DEFAULTS.mode;

  const backInput = values.back ?? DEFAULTS.back;
  const offsetInput = values.offset ?? "";

  // Whichever field the reader is editing drives the other.
  const { backspacing, offset } = useMemo(() => {
    if (mode === "offset") {
      const off = Number(offsetInput) || 0;
      return { backspacing: offsetToBackspacing(width, off), offset: off };
    }
    const back = Number(backInput) || 0;
    return { backspacing: back, offset: backspacingToOffset(width, back) };
  }, [mode, backInput, offsetInput, width]);

  const summary = [
    `${width}" wide wheel`,
    `Backspacing: ${round(backspacing, 2)}"`,
    `Offset: ${round(offset, 0)} mm`,
    `Front spacing: ${round(width + 1 - backspacing, 2)}"`,
  ].join("\n");

  const table = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7];

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">CONVERT EITHER DIRECTION</span>
        <h2 id="calculator-title">Backspacing and offset are the same measurement</h2>
        <p>
          Backspacing is measured in inches from the inner rim flange to the mounting face. Offset is
          measured in millimetres from the wheel&apos;s centreline. Give the tool a wheel width and
          either figure, and it produces the other.
        </p>
      </div>

      <div className="mode-toggle" role="group" aria-label="Choose which value you know">
        <button type="button" className={mode === "back" ? "active" : ""} onClick={() => set("mode", "back")}>
          I know the backspacing
        </button>
        <button
          type="button"
          className={mode === "offset" ? "active" : ""}
          onClick={() => {
            if (!values.offset) set("offset", String(Math.round(offset)));
            set("mode", "offset");
          }}
        >
          I know the offset
        </button>
      </div>

      <div className="tool-inputs pair">
        <StepField
          label="Wheel width"
          value={values.width ?? DEFAULTS.width}
          onChange={(value) => set("width", value)}
          step={0.5}
          min={4}
          max={16}
          suffix="in"
          hint="The bead seat width, cast into the wheel as in 17x8"
        />
        {mode === "back" ? (
          <StepField
            label="Backspacing"
            value={backInput}
            onChange={(value) => set("back", value)}
            step={0.25}
            min={1}
            max={12}
            suffix="in"
            hint="Straight-edge across the inner flange to the mounting face"
          />
        ) : (
          <StepField
            label="Offset"
            value={offsetInput || String(Math.round(offset))}
            onChange={(value) => set("offset", value)}
            step={5}
            min={-100}
            max={80}
            suffix="mm"
            hint="Stamped as ET on the back of the spokes"
          />
        )}
      </div>

      <div className="tool-result-split">
        <BackspacingDrawing width={width} backspacing={backspacing} />
        <div className="tool-metrics">
          <Metric label="Backspacing" value={`${round(backspacing, 2)}"`} note="Inner flange to mounting face" />
          <Metric label="Offset" value={`${round(offset, 0)} mm`} note={offset >= 0 ? "Positive — wheel sits inboard" : "Negative — wheel sits outboard"} />
          <Metric label="Front spacing" value={`${round(width + 1 - backspacing, 2)}"`} note="Mounting face to outer flange" />
          <Metric label="Zero-offset backspacing" value={`${round((width + 1) / 2, 2)}"`} note={`For a ${width}" wheel`} />
          <Metric label="Against zero offset" value={`${signed(backspacing - (width + 1) / 2)}"`} note="How far this differs from centred" />
          <Metric label="Overall rim width" value={`${round(width + 1, 2)}"`} note="Bead seat plus both flanges" />
        </div>
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Backspacing</th>
              <th>Offset on a {width}&quot; wheel</th>
              <th>Front spacing</th>
              <th>Relative to centred</th>
            </tr>
          </thead>
          <tbody>
            {table.map((back) => {
              const off = backspacingToOffset(width, back);
              const active = Math.abs(back - backspacing) < 0.13;
              return (
                <tr key={back} className={active ? "row-active" : undefined}>
                  <th>{back.toFixed(2)}&quot;</th>
                  <td>{round(off, 0)} mm</td>
                  <td>{round(width + 1 - back, 2)}&quot;</td>
                  <td>{signed(back - (width + 1) / 2)}&quot;</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Comparing a new wheel against the one on the vehicle?{" "}
        <Link href={`/tools/wheel-offset-calculator?cw=${width}&co=${Math.round(offset)}`}>
          Use the offset comparison tool
        </Link>{" "}
        to see how far each edge moves.
      </p>
    </section>
  );
}
