"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, Verdict, useToolState } from "../tool-kit";
import { VIN_FIELD_ORDER, checkVin, normaliseVin, vinRegion, vinSections } from "../vin";
import { slugify } from "../../slug";

const DEFAULTS = { vin: "", year: "" };

type DecodeState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | {
      status: "done";
      fields: Record<string, string>;
      errorText: string | null;
      additionalErrorText: string | null;
    };

export function VinDecoder() {
  const { values, set, reset } = useToolState("vin", DEFAULTS);
  const raw = values.vin ?? "";
  const year = values.year ?? "";
  const vin = useMemo(() => normaliseVin(raw), [raw]);
  const check = useMemo(() => checkVin(vin), [vin]);
  const sections = useMemo(() => vinSections(vin), [vin]);
  const [state, setState] = useState<DecodeState>({ status: "idle" });

  // Decode once the VIN is structurally complete. Nothing leaves the browser
  // before that, so a half-typed VIN is never sent anywhere.
  useEffect(() => {
    if (!check.wellFormed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ status: "idle" });
      return;
    }
    let cancelled = false;
    // Fetching is the external system this effect exists to drive, so the
    // loading state has to be set before it starts.
    setState({ status: "loading" });
    const query = new URLSearchParams({ vin });
    if (/^\d{4}$/.test(year)) query.set("year", year);
    fetch(`/api/vin?${query.toString()}`)
      .then(async (response) => {
        const payload = await response.json();
        if (cancelled) return;
        if (!payload.ok) {
          setState({ status: "error", message: payload.error ?? "That VIN could not be decoded." });
          return;
        }
        setState({
          status: "done",
          fields: payload.fields ?? {},
          errorText: payload.errorText ?? null,
          additionalErrorText: payload.additionalErrorText ?? null,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setState({ status: "error", message: "The decoder could not be reached. Try again shortly." });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [vin, year, check.wellFormed]);

  const fields = state.status === "done" ? state.fields : {};
  const shown = VIN_FIELD_ORDER.filter((entry) => fields[entry.key]);

  /**
   * vPIC returns displacement as an unrounded float, so a bus arrives as
   * "12.060879104" litres. Round anything numeric to a sane precision before
   * it is shown.
   */
  const display = (key: string, value: string) => {
    if (key === "DisplacementL") return `${Math.round(Number(value) * 10) / 10}`;
    if (key === "DisplacementCC" || key === "DisplacementCI") return String(Math.round(Number(value)));
    return value;
  };

  const make = fields.Make ?? "";
  const model = fields.Model ?? "";
  const modelYear = fields.ModelYear ?? "";

  const summary =
    state.status === "done"
      ? [
          `VIN ${vin}`,
          modelYear && make && model ? `${modelYear} ${make} ${model}` : "",
          ...shown.slice(0, 12).map((entry) => `${entry.label}: ${display(entry.key, fields[entry.key])}`),
        ]
          .filter(Boolean)
          .join("\n")
      : "";

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">NHTSA vPIC · FREE · NOT STORED</span>
        <h2 id="calculator-title">Decode a VIN</h2>
        <p>
          The structure is checked in your browser first, so a mistyped VIN is caught before anything is
          sent. Once it is structurally valid, the decode comes from the NHTSA vPIC database — the same
          public source manufacturers file their own data into.
        </p>
      </div>

      <div className="tool-inputs pair">
        <Field
          label="VIN"
          value={raw}
          onChange={(value) => set("vin", normaliseVin(value))}
          placeholder="1FTFW1ET5DFC10312"
          hint="17 characters. Never contains I, O or Q."
          invalid={vin.length === 17 && !check.wellFormed}
        />
        <Field
          label="Model year (optional)"
          value={year}
          onChange={(value) => set("year", value.replace(/\D/g, "").slice(0, 4))}
          placeholder="2013"
          inputMode="numeric"
          hint="Improves accuracy — position 10 repeats every 30 years"
        />
      </div>

      <div className="vin-progress" aria-live="polite">
        <small>{vin.length} / 17 characters</small>
        <div className="vin-bar">
          <span style={{ width: `${(Math.min(vin.length, 17) / 17) * 100}%` }} />
        </div>
      </div>

      {vin.length > 0 && vin.length < 17 && (
        <p className="tool-next">
          Keep going — nothing is sent anywhere until all 17 characters are entered.
          {vin.length >= 1 && <> First character suggests <b>{vinRegion(vin[0])}</b>.</>}
        </p>
      )}

      {vin.length === 17 && (
        <Verdict
          tone={check.checkDigitValid ? "good" : "warn"}
          headline={
            check.checkDigitValid
              ? "Check digit valid — this VIN is internally consistent"
              : "Check digit does not agree"
          }
          detail={
            check.checkDigitValid
              ? `Position 9 reads ${check.actualCheckDigit}, which is exactly what the other sixteen characters calculate to. That does not prove the vehicle exists, but it does rule out a typo.`
              : check.problems.join(" ") +
                " North American VINs must satisfy this check, so re-read the VIN from the door jamb or dashboard before relying on any decode below."
          }
        />
      )}

      {state.status === "loading" && (
        <p className="tool-next" role="status">
          Decoding against the NHTSA database…
        </p>
      )}

      {state.status === "error" && (
        <p className="tool-error" role="alert">
          {state.message}
        </p>
      )}

      {state.status === "done" && (
        <>
          {shown.length === 0 ? (
            <p className="tool-error" role="alert">
              The VIN is structurally valid but NHTSA returned no vehicle detail for it. That usually
              means the manufacturer has not filed data for this range, which is common on older,
              imported and low-volume vehicles.
            </p>
          ) : (
            <>
              <div className="tool-metrics wide">
                <Metric label="Model year" value={modelYear || "—"} note="From position 10, confirmed by NHTSA" tone="good" />
                <Metric label="Make" value={make || "—"} note={fields.Manufacturer ?? ""} />
                <Metric label="Model" value={model || "—"} note={fields.Series ?? fields.Trim ?? ""} />
                <Metric
                  label="Engine"
                  value={fields.DisplacementL ? `${display("DisplacementL", fields.DisplacementL)}L` : "—"}
                  note={[fields.EngineConfiguration, fields.EngineCylinders && `${fields.EngineCylinders} cyl`].filter(Boolean).join(" · ")}
                />
              </div>

              <div className="table-scroll">
                <table className="diagnostic-table">
                  <thead>
                    <tr>
                      <th>Field</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shown.map((entry) => (
                      <tr key={entry.key}>
                        <th>{entry.label}</th>
                        <td>{display(entry.key, fields[entry.key])}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {(state.errorText || state.additionalErrorText) && (
                <p className="tool-next">
                  <b>NHTSA note:</b>{" "}
                  {[state.additionalErrorText, state.errorText].filter(Boolean).join(" ")}
                </p>
              )}

              {make && (
                <p className="tool-next">
                  Looking for specifications or fault codes for this vehicle?{" "}
                  <Link href={`/makes/${slugify(make)}`}>
                    Browse {make.charAt(0) + make.slice(1).toLowerCase()} reference pages
                  </Link>
                  {", "}
                  <Link href="/trouble-codes">check the trouble-code guides</Link>, or{" "}
                  <Link href="/search">search the site</Link> for {model || make}.
                </p>
              )}
            </>
          )}
        </>
      )}

      {sections.length > 0 && (
        <div className="table-scroll">
          <table className="diagnostic-table">
            <thead>
              <tr>
                <th>Section</th>
                <th>Positions</th>
                <th>Your VIN</th>
                <th>What it encodes</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => (
                <tr key={section.label}>
                  <th>{section.label}</th>
                  <td>{section.positions}</td>
                  <td>
                    <b className="vin-chunk">{section.value}</b>
                  </td>
                  <td>{section.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        <b>Nothing is stored.</b> The VIN is passed to NHTSA and forgotten — it is not logged here. It
        stays in your address bar so you can bookmark the result, so clear the field before sharing your
        screen if the vehicle is not yours.
      </p>
    </section>
  );
}
