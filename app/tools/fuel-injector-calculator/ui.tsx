"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { BSFC_PRESETS, ccMinToLbHr, injectorDutyCycle, lbHrToCcMin, requiredInjectorFlow } from "../fuel-air-math";
import { round } from "../tire-math";

const DEFAULTS = { solve: "size", hp: "400", cyl: "8", bsfc: "0.55", duty: "80", injector: "550" };

export function FuelInjectorCalculator() {
  const { values, set, reset } = useToolState("injector", DEFAULTS);
  const solve = values.solve ?? DEFAULTS.solve;
  const hp = Number(values.hp ?? DEFAULTS.hp) || 0;
  const cyl = Math.round(Number(values.cyl ?? DEFAULTS.cyl)) || 0;
  const bsfc = Number(values.bsfc ?? DEFAULTS.bsfc) || 0;
  const maxDuty = (Number(values.duty ?? DEFAULTS.duty) || 0) / 100;
  const injectorCcMin = Number(values.injector ?? DEFAULTS.injector) || 0;
  const injectorLbHr = ccMinToLbHr(injectorCcMin);

  const requiredLbHr = useMemo(
    () => requiredInjectorFlow({ targetHp: hp, bsfc, cylinders: cyl, maxDutyCycle: maxDuty }),
    [hp, bsfc, cyl, maxDuty],
  );
  const dutyAtInjector = useMemo(
    () => injectorDutyCycle({ targetHp: hp, bsfc, cylinders: cyl, injectorLbHr }),
    [hp, bsfc, cyl, injectorLbHr],
  );

  const dutyTone = dutyAtInjector <= 0.8 ? "good" : dutyAtInjector <= 0.9 ? "warn" : "bad";

  const summary =
    solve === "size"
      ? `${hp}hp, ${cyl}cyl, BSFC ${bsfc}, max ${Math.round(maxDuty * 100)}% duty -> injector needed: ${round(lbHrToCcMin(requiredLbHr), 0)} cc/min (${round(requiredLbHr, 1)} lb/hr)`
      : `${injectorCcMin} cc/min injectors at ${hp}hp, ${cyl}cyl, BSFC ${bsfc} -> duty cycle: ${round(dutyAtInjector * 100, 1)}%`;

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">SOLVE EITHER DIRECTION</span>
        <h2 id="calculator-title">Injector size, or the duty cycle it runs at</h2>
        <p>
          Both questions use the same formula, worked in opposite directions: how big an injector does a
          power target need, or how hard is a specific injector already working. Pick whichever matches
          what you have.
        </p>
      </div>

      <div className="mode-toggle" role="group" aria-label="Choose what to solve for">
        <button type="button" className={solve === "size" ? "active" : ""} onClick={() => set("solve", "size")}>
          Solve for injector size
        </button>
        <button type="button" className={solve === "duty" ? "active" : ""} onClick={() => set("solve", "duty")}>
          Solve for duty cycle
        </button>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Target power" value={values.hp ?? DEFAULTS.hp} onChange={(v) => set("hp", v)} step={10} min={50} max={2000} suffix="hp" />
        <StepField label="Cylinders" value={values.cyl ?? DEFAULTS.cyl} onChange={(v) => set("cyl", v)} step={1} min={1} max={16} suffix="cyl" />
        <StepField label="BSFC" value={values.bsfc ?? DEFAULTS.bsfc} onChange={(v) => set("bsfc", v)} step={0.01} min={0.35} max={0.9} hint="lb fuel / hp / hr" />
      </div>

      <div className="quick-sizes">
        <small>BSFC presets</small>
        {BSFC_PRESETS.map((preset) => (
          <button type="button" key={preset.key} className={String(preset.bsfc) === values.bsfc ? "active" : ""} onClick={() => set("bsfc", String(preset.bsfc))}>
            {preset.label}
          </button>
        ))}
      </div>

      {solve === "size" ? (
        <div className="tool-inputs single">
          <StepField label="Maximum acceptable duty cycle" value={values.duty ?? DEFAULTS.duty} onChange={(v) => set("duty", v)} step={5} min={50} max={95} suffix="%" hint="80% is the conventional safe ceiling" />
        </div>
      ) : (
        <div className="tool-inputs single">
          <StepField label="Injector size" value={values.injector ?? DEFAULTS.injector} onChange={(v) => set("injector", v)} step={10} min={100} max={2000} suffix="cc/min" />
        </div>
      )}

      {solve === "size" ? (
        <div className="tool-metrics wide">
          <Metric label="Injector size needed" value={`${round(lbHrToCcMin(requiredLbHr), 0)} cc/min`} note={`${round(requiredLbHr, 2)} lb/hr`} tone="good" />
          <Metric label="Total fuel flow" value={`${round(hp * bsfc, 1)} lb/hr`} note="Across all cylinders" />
          <Metric label="Per cylinder flow" value={`${round((hp * bsfc) / cyl, 2)} lb/hr`} note="At 100% duty" />
          <Metric label="Target duty cycle" value={`${Math.round(maxDuty * 100)}%`} note="Sizing constraint" />
        </div>
      ) : (
        <>
          <Verdict
            tone={dutyTone}
            headline={`${round(dutyAtInjector * 100, 1)}% duty cycle`}
            detail={
              dutyTone === "good"
                ? "Comfortably inside the conventional 80% ceiling, leaving margin for injector wear, voltage sag and a richer safety margin under boost."
                : dutyTone === "warn"
                  ? "Above the conventional 80% ceiling. The injector can likely sustain this, but there is little margin left for wear, voltage sag or a richer tune — the next size up is worth considering."
                  : "Above 90% duty cycle. Injectors spend progressively less time fully open at this duty, which hurts fuel atomization and delivery linearity — this is the range where the next injector size up stops being optional."
            }
          />
          <div className="tool-metrics wide">
            <Metric label="Duty cycle at this power" value={`${round(dutyAtInjector * 100, 1)}%`} note={`${injectorCcMin} cc/min injectors`} tone={dutyTone} />
            <Metric label="Injector flow" value={`${round(injectorLbHr, 2)} lb/hr`} note={`${injectorCcMin} cc/min`} />
            <Metric label="Required per-cylinder flow" value={`${round((hp * bsfc) / cyl, 2)} lb/hr`} note="At 100% duty" />
            <Metric label="Headroom to 100%" value={`${round((injectorLbHr - (hp * bsfc) / cyl) , 2)} lb/hr`} note="Before running out of injector" />
          </div>
        </>
      )}

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Also need to confirm the pump can supply it?{" "}
        <Link href={`/tools/fuel-pump-calculator?hp=${hp}&bsfc=${bsfc}`}>The fuel pump calculator</Link>{" "}
        uses the same BSFC figure.
      </p>
    </section>
  );
}
