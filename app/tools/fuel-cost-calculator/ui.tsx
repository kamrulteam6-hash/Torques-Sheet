"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { annualCost, fuelFigures } from "../engine-math";
import { round } from "../tire-math";

const DEFAULTS = {
  miles: "320",
  gal: "18",
  price: "3.45",
  tank: "23",
  year: "12000",
};

const money = (value: number, decimals = 2) => `$${value.toFixed(decimals)}`;

export function FuelCostCalculator() {
  const { values, set, reset } = useToolState("fuel-cost", DEFAULTS);
  const num = (key: string) => Number(values[key] ?? DEFAULTS[key as keyof typeof DEFAULTS]) || 0;

  const miles = num("miles");
  const gallons = num("gal");
  const price = num("price");
  const tank = num("tank");
  const perYear = num("year");

  const result = useMemo(
    () => fuelFigures({ miles, gallons, pricePerGallon: price, tankGallons: tank }),
    [miles, gallons, price, tank],
  );
  const yearly = annualCost(perYear, result.costPerMile);

  const summary = [
    `${miles} miles on ${gallons} gallons`,
    `${round(result.mpg, 1)} MPG (${round(result.litresPer100Km, 1)} L/100km)`,
    `Cost per mile: ${money(result.costPerMile, 3)} at ${money(price)}/gal`,
    `This trip: ${money(result.tripCost)}`,
    `Tank range: ${Math.round(result.tankRange)} miles, ${money(result.fillCost)} to fill`,
    `Annual at ${perYear.toLocaleString()} miles: ${money(yearly, 0)}`,
  ].join("\n");

  const tone = result.mpg >= 30 ? "good" : result.mpg >= 18 ? "warn" : "bad";

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">FROM YOUR OWN FILL-UP</span>
        <h2 id="calculator-title">Real economy, and what it costs you</h2>
        <p>
          Trip computers estimate. This measures. Fill the tank, reset the trip meter, drive normally,
          then fill again and enter the two numbers from that second fill — the miles shown and the
          gallons it took.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Miles driven" value={values.miles ?? DEFAULTS.miles} onChange={(v) => set("miles", v)} step={10} min={1} max={2000} suffix="mi" hint="Trip meter since the last fill" />
        <StepField label="Gallons to refill" value={values.gal ?? DEFAULTS.gal} onChange={(v) => set("gal", v)} step={0.5} min={0.5} max={80} suffix="gal" hint="From the pump receipt" />
        <StepField label="Price per gallon" value={values.price ?? DEFAULTS.price} onChange={(v) => set("price", v)} step={0.05} min={0.5} max={12} suffix="$" />
      </div>

      <div className="tool-inputs pair">
        <StepField label="Tank capacity" value={values.tank ?? DEFAULTS.tank} onChange={(v) => set("tank", v)} step={0.5} min={3} max={60} suffix="gal" hint="From the owner's manual" />
        <StepField label="Miles per year" value={values.year ?? DEFAULTS.year} onChange={(v) => set("year", v)} step={1000} min={500} max={100000} suffix="mi" />
      </div>

      <Verdict
        tone={tone}
        headline={`${round(result.mpg, 1)} MPG — ${money(result.costPerMile, 3)} per mile`}
        detail={`At ${money(price)} a gallon, every mile costs you ${money(result.costPerMile, 3)}. Over ${perYear.toLocaleString()} miles a year that is ${money(yearly, 0)} in fuel alone. Improving economy by 10% would save about ${money(yearly - annualCost(perYear, price / (result.mpg * 1.1)), 0)} a year at the same price and mileage.`}
      />

      <div className="tool-metrics wide">
        <Metric label="Miles per gallon" value={round(result.mpg, 1).toFixed(1)} note="US gallons" tone={tone} />
        <Metric label="L/100 km" value={round(result.litresPer100Km, 1).toFixed(1)} note="Metric equivalent" />
        <Metric label="km per litre" value={round(result.kilometresPerLitre, 1).toFixed(1)} note="Metric equivalent" />
        <Metric label="Cost per mile" value={money(result.costPerMile, 3)} note={`At ${money(price)}/gal`} />
      </div>

      <div className="tool-metrics wide">
        <Metric label="This trip cost" value={money(result.tripCost)} note={`${miles} miles`} />
        <Metric label="Range on a tank" value={`${Math.round(result.tankRange)} mi`} note={`${tank} gallon tank`} />
        <Metric label="Cost to fill" value={money(result.fillCost)} note="From empty" />
        <Metric label="Annual fuel cost" value={money(yearly, 0)} note={`${perYear.toLocaleString()} miles`} />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Fuel price</th>
              <th>Cost per mile</th>
              <th>Cost to fill</th>
              <th>Annual cost</th>
              <th>Against now</th>
            </tr>
          </thead>
          <tbody>
            {[-1, -0.5, 0, 0.5, 1].map((delta) => {
              const p = Math.max(0.5, price + delta);
              const cpm = result.mpg > 0 ? p / result.mpg : 0;
              const yr = perYear * cpm;
              return (
                <tr key={delta} className={delta === 0 ? "row-active" : undefined}>
                  <th>{money(p)}</th>
                  <td>{money(cpm, 3)}</td>
                  <td>{money(tank * p)}</td>
                  <td>{money(yr, 0)}</td>
                  <td>{delta === 0 ? "current" : `${yr > yearly ? "+" : "−"}${money(Math.abs(yr - yearly), 0).slice(1)}`}</td>
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
              <th>If you achieved</th>
              <th>Cost per mile</th>
              <th>Annual cost</th>
              <th>Saving per year</th>
            </tr>
          </thead>
          <tbody>
            {[-4, -2, 0, 2, 4, 6].map((delta) => {
              const mpg = Math.max(1, result.mpg + delta);
              const cpm = price / mpg;
              const yr = perYear * cpm;
              return (
                <tr key={delta} className={delta === 0 ? "row-active" : undefined}>
                  <th>{round(mpg, 1)} MPG</th>
                  <td>{money(cpm, 3)}</td>
                  <td>{money(yr, 0)}</td>
                  <td>{delta === 0 ? "current" : `${yearly - yr >= 0 ? "+" : "−"}${money(Math.abs(yearly - yr), 0).slice(1)}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Fitting larger tires?{" "}
        <Link href="/tools/speedometer-error-calculator">
          Check the odometer error first
        </Link>{" "}
        — a distorted mileage reading makes every MPG figure wrong by the same proportion.
      </p>
    </section>
  );
}
