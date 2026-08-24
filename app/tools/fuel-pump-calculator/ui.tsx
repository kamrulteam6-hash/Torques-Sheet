"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { BSFC_PRESETS, requiredPumpFlowLph } from "../fuel-air-math";
import { round } from "../tire-math";

const DEFAULTS = { hp: "400", bsfc: "0.55", safety: "25" };

export function FuelPumpCalculator() {
  const { values, set, reset } = useToolState("fuel-pump", DEFAULTS);
  const hp = Number(values.hp ?? DEFAULTS.hp) || 0;
  const bsfc = Number(values.bsfc ?? DEFAULTS.bsfc) || 0;
  const safetyPct = Number(values.safety ?? DEFAULTS.safety) || 0;
  const safetyFactor = 1 + safetyPct / 100;

  const lph = useMemo(() => requiredPumpFlowLph({ targetHp: hp, bsfc, safetyFactor }), [hp, bsfc, safetyFactor]);
  const lphNoMargin = useMemo(() => requiredPumpFlowLph({ targetHp: hp, bsfc, safetyFactor: 1 }), [hp, bsfc]);
  const gph = lph / 3.78541;

  const summary = [
    `${hp}hp target, BSFC ${bsfc}, ${safetyPct}% safety margin`,
    `Required pump flow: ${round(lph, 0)} LPH (${round(gph, 1)} GPH)`,
    `Minimum, no margin: ${round(lphNoMargin, 0)} LPH`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">FLOW REQUIRED, NOT JUST MINIMUM</span>
        <h2 id="calculator-title">Fuel pump sizing from target power</h2>
        <p>
          A pump has to supply more than the engine&apos;s bare fuel consumption — voltage sag, line losses
          and pressure drop all eat into rated flow before it reaches the rail. This works out the bare
          requirement and a sized-with-margin figure separately.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Target power" value={values.hp ?? DEFAULTS.hp} onChange={(v) => set("hp", v)} step={10} min={50} max={2000} suffix="hp" />
        <StepField label="BSFC" value={values.bsfc ?? DEFAULTS.bsfc} onChange={(v) => set("bsfc", v)} step={0.01} min={0.35} max={0.9} hint="lb fuel / hp / hr" />
        <StepField label="Safety margin" value={values.safety ?? DEFAULTS.safety} onChange={(v) => set("safety", v)} step={5} min={0} max={60} suffix="%" hint="25% is a common sizing margin" />
      </div>

      <div className="quick-sizes">
        <small>BSFC presets</small>
        {BSFC_PRESETS.map((preset) => (
          <button type="button" key={preset.key} className={String(preset.bsfc) === values.bsfc ? "active" : ""} onClick={() => set("bsfc", String(preset.bsfc))}>
            {preset.label}
          </button>
        ))}
      </div>

      <div className="tool-metrics wide">
        <Metric label="Required pump flow" value={`${round(lph, 0)} LPH`} note={`${round(gph, 1)} GPH`} tone="good" />
        <Metric label="Bare minimum, no margin" value={`${round(lphNoMargin, 0)} LPH`} note="At the fuel system's true consumption" />
        <Metric label="Margin added" value={`${round(lph - lphNoMargin, 0)} LPH`} note={`${safetyPct}% headroom`} />
        <Metric label="Fuel consumption" value={`${round(hp * bsfc, 1)} lb/hr`} note="At wide-open throttle" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Target power</th>
              <th>Required flow (LPH)</th>
              <th>Required flow (GPH)</th>
            </tr>
          </thead>
          <tbody>
            {[200, 300, 400, 500, 700, 1000].map((h) => {
              const l = requiredPumpFlowLph({ targetHp: h, bsfc, safetyFactor });
              return (
                <tr key={h} className={h === hp ? "row-active" : undefined}>
                  <th>{h} hp</th>
                  <td>{round(l, 0)} LPH</td>
                  <td>{round(l / 3.78541, 1)} GPH</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Also check the injectors can flow this much fuel individually —{" "}
        <Link href={`/tools/fuel-injector-calculator?hp=${hp}&bsfc=${bsfc}`}>the injector calculator</Link>{" "}
        uses the same BSFC figure.
      </p>
    </section>
  );
}
