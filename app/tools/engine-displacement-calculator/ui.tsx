"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { OVERBORES, displacement } from "../engine-math";
import { round } from "../tire-math";

const DEFAULTS = { bore: "4", stroke: "3.48", cyl: "8" };

const PRESETS = [
  { label: "Chevy 350", bore: 4, stroke: 3.48, cyl: 8 },
  { label: "Chevy 383", bore: 4.03, stroke: 3.75, cyl: 8 },
  { label: "Ford 302", bore: 4, stroke: 3, cyl: 8 },
  { label: "Ford 351W", bore: 4, stroke: 3.5, cyl: 8 },
  { label: "Coyote 5.0", bore: 3.63, stroke: 3.65, cyl: 8 },
  { label: "LS 6.0", bore: 4, stroke: 3.62, cyl: 8 },
  { label: "Mopar 440", bore: 4.32, stroke: 3.75, cyl: 8 },
  { label: "Ford 300 I6", bore: 4, stroke: 3.98, cyl: 6 },
];

export function EngineDisplacementCalculator() {
  const { values, set, reset } = useToolState("displacement", DEFAULTS);
  const bore = Number(values.bore ?? DEFAULTS.bore) || 0;
  const stroke = Number(values.stroke ?? DEFAULTS.stroke) || 0;
  const cyl = Math.round(Number(values.cyl ?? DEFAULTS.cyl)) || 0;

  const result = useMemo(() => displacement(bore, stroke, cyl), [bore, stroke, cyl]);

  const summary = [
    `${cyl} cylinders, ${bore}" bore × ${stroke}" stroke`,
    `Displacement: ${round(result.totalCi, 1)} ci / ${Math.round(result.totalCc)} cc / ${round(result.totalLitres, 2)} L`,
    `Per cylinder: ${round(result.perCylinderCi, 2)} ci (${round(result.perCylinderCc, 1)} cc)`,
    `Bore/stroke ratio: ${round(result.boreStrokeRatio, 3)} (${result.character})`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">BORE, STROKE AND CYLINDERS</span>
        <h2 id="calculator-title">Work out displacement in every unit</h2>
        <p>
          Displacement is the volume the pistons sweep, so it needs only three figures: how wide each
          cylinder is, how far the piston travels, and how many of them there are.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Bore" value={values.bore ?? DEFAULTS.bore} onChange={(v) => set("bore", v)} step={0.005} min={1} max={7} suffix="in" hint="Cylinder diameter" />
        <StepField label="Stroke" value={values.stroke ?? DEFAULTS.stroke} onChange={(v) => set("stroke", v)} step={0.01} min={1} max={7} suffix="in" hint="Crank throw × 2" />
        <StepField label="Cylinders" value={values.cyl ?? DEFAULTS.cyl} onChange={(v) => set("cyl", v)} step={1} min={1} max={16} suffix="cyl" />
      </div>

      <div className="quick-sizes">
        <small>Common engines</small>
        {PRESETS.map((preset) => (
          <button
            type="button"
            key={preset.label}
            className={bore === preset.bore && stroke === preset.stroke && cyl === preset.cyl ? "active" : ""}
            onClick={() => {
              set("bore", String(preset.bore));
              set("stroke", String(preset.stroke));
              set("cyl", String(preset.cyl));
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="tool-metrics wide">
        <Metric label="Cubic inches" value={round(result.totalCi, 1).toFixed(1)} note="How American engines are named" />
        <Metric label="Cubic centimetres" value={String(Math.round(result.totalCc))} note="Metric displacement" />
        <Metric label="Litres" value={round(result.totalLitres, 2).toFixed(2)} note="Rounded on the badge, exact here" />
        <Metric label="Per cylinder" value={`${round(result.perCylinderCc, 1)} cc`} note={`${round(result.perCylinderCi, 2)} ci each`} />
      </div>

      <div className="tool-metrics wide">
        <Metric
          label="Bore / stroke ratio"
          value={round(result.boreStrokeRatio, 3).toFixed(3)}
          note={result.character}
          tone={result.character === "oversquare" ? "good" : "neutral"}
        />
        <Metric label="Bore" value={`${bore}"`} note={`${round(bore * 25.4, 1)} mm`} />
        <Metric label="Stroke" value={`${stroke}"`} note={`${round(stroke * 25.4, 1)} mm`} />
        <Metric label="Nearest badge" value={`${round(result.totalLitres, 1).toFixed(1)}L`} note={`${Math.round(result.totalCi)} ci`} />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Overbore</th>
              <th>Bore</th>
              <th>Cubic inches</th>
              <th>Litres</th>
              <th>Gain</th>
            </tr>
          </thead>
          <tbody>
            {OVERBORES.map((over) => {
              const bored = displacement(bore + over, stroke, cyl);
              return (
                <tr key={over} className={over === 0 ? "row-active" : undefined}>
                  <th>{over === 0 ? "Standard" : `+${over.toFixed(3)}"`}</th>
                  <td>{round(bore + over, 3)}&quot;</td>
                  <td>{round(bored.totalCi, 1)}</td>
                  <td>{round(bored.totalLitres, 2)}</td>
                  <td>{over === 0 ? "—" : `+${round(bored.totalCi - result.totalCi, 1)} ci`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Building rather than measuring?{" "}
        <Link href={`/tools/compression-ratio-calculator?bore=${bore}&stroke=${stroke}`}>
          Carry these figures into the compression ratio calculator
        </Link>
        .
      </p>
    </section>
  );
}
