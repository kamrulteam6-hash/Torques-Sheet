"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Shared interaction primitives for every calculator. Deliberately small and
 * data-free: each tool imports this, so anything expensive added here is paid
 * for on every tool page.
 *
 * The important behaviour is `useToolState`. Inputs live in the URL query, so
 * any result a reader reaches is a link they can bookmark, share or send to a
 * shop — and the last-used values are restored from localStorage on a return
 * visit. That is what turns a calculator into something people come back to.
 */

type StateMap = Record<string, string>;

const STORE_PREFIX = "ts-tool:";

/** Read the query string without needing a Suspense boundary. */
const readQuery = (keys: string[]): StateMap => {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const found: StateMap = {};
  for (const key of keys) {
    const value = params.get(key);
    if (value !== null && value !== "") found[key] = value;
  }
  return found;
};

const readStore = (id: string): StateMap => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORE_PREFIX + id);
    return raw ? (JSON.parse(raw) as StateMap) : {};
  } catch {
    return {};
  }
};

export function useToolState(id: string, defaults: StateMap) {
  const keys = useMemo(() => Object.keys(defaults), [defaults]);
  // Values and readiness travel together so hydration is a single state write.
  const [state, setState] = useState<{ values: StateMap; ready: boolean }>({
    values: defaults,
    ready: false,
  });
  const { values, ready } = state;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate after mount: the URL wins over storage, storage wins over defaults.
  //
  // This has to be an effect rather than lazy initial state. The server renders
  // the defaults, so reading the URL or localStorage during the first render
  // would produce a hydration mismatch. Reading an external system once after
  // mount is exactly what effects are for, so the set-state rule is suppressed
  // on the single write below rather than worked around.
  useEffect(() => {
    const fromQuery = readQuery(keys);
    const restored = Object.keys(fromQuery).length > 0 ? fromQuery : readStore(id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState((prev) => ({ values: { ...prev.values, ...restored }, ready: true }));
  }, [id, keys]);

  // Mirror state into the URL and storage, debounced so typing stays cheap.
  useEffect(() => {
    if (!ready) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const params = new URLSearchParams();
      for (const key of keys) {
        if (values[key] && values[key] !== defaults[key]) params.set(key, values[key]);
      }
      const query = params.toString();
      const next = `${window.location.pathname}${query ? `?${query}` : ""}`;
      window.history.replaceState(null, "", next);
      try {
        window.localStorage.setItem(STORE_PREFIX + id, JSON.stringify(values));
      } catch {
        /* storage disabled — the URL still carries the state */
      }
    }, 350);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [values, ready, id, keys, defaults]);

  const set = useCallback((key: string, value: string) => {
    setState((prev) => ({ ...prev, values: { ...prev.values, [key]: value } }));
  }, []);

  const reset = useCallback(() => {
    setState({ values: defaults, ready: true });
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
      try {
        window.localStorage.removeItem(STORE_PREFIX + id);
      } catch {
        /* nothing to clear */
      }
    }
  }, [defaults, id]);

  return { values, set, reset, ready };
}

/* ------------------------------------------------------------------- inputs */

export function Field({
  label,
  hint,
  value,
  onChange,
  placeholder,
  suffix,
  invalid,
  inputMode = "text",
  list,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: string;
  invalid?: boolean;
  inputMode?: "text" | "decimal" | "numeric";
  list?: string;
}) {
  return (
    <label className={invalid ? "tool-field invalid" : "tool-field"}>
      <span className="tool-field-label">{label}</span>
      <span className="tool-field-input">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          list={list}
          autoComplete="off"
          spellCheck={false}
          aria-invalid={invalid || undefined}
        />
        {suffix && <em>{suffix}</em>}
      </span>
      {hint && <small>{hint}</small>}
    </label>
  );
}

/** A stepped numeric input for ratios and widths, where typing is tedious. */
export function StepField({
  label,
  hint,
  value,
  onChange,
  step,
  min,
  max,
  suffix,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  step: number;
  min: number;
  max: number;
  suffix?: string;
}) {
  const nudge = (direction: number) => {
    const current = Number(value) || 0;
    const next = Math.min(max, Math.max(min, Number((current + direction * step).toFixed(3))));
    onChange(String(next));
  };
  return (
    <div className="tool-field step-field">
      <span className="tool-field-label">{label}</span>
      <span className="tool-field-input">
        <button type="button" onClick={() => nudge(-1)} aria-label={`Decrease ${label}`}>
          −
        </button>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          inputMode="decimal"
          autoComplete="off"
        />
        {suffix && <em>{suffix}</em>}
        <button type="button" onClick={() => nudge(1)} aria-label={`Increase ${label}`}>
          +
        </button>
      </span>
      {hint && <small>{hint}</small>}
    </div>
  );
}

/* ------------------------------------------------------------------ results */

export function Metric({
  label,
  value,
  note,
  tone = "neutral",
}: {
  label: string;
  value: string;
  note?: string;
  tone?: "neutral" | "good" | "warn" | "bad";
}) {
  return (
    <div className={`tool-metric tone-${tone}`}>
      <small>{label}</small>
      <strong>{value}</strong>
      {note && <span>{note}</span>}
    </div>
  );
}

export function Verdict({
  tone,
  headline,
  detail,
}: {
  tone: "good" | "warn" | "bad";
  headline: string;
  detail: string;
}) {
  return (
    <div className={`tool-verdict tone-${tone}`} role="status" aria-live="polite">
      <span aria-hidden="true">{tone === "good" ? "✓" : tone === "warn" ? "!" : "×"}</span>
      <div>
        <strong>{headline}</strong>
        <p>{detail}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- share */

export function ShareRow({ summary, onReset }: { summary: string; onReset: () => void }) {
  const [copied, setCopied] = useState<"link" | "result" | null>(null);

  const copy = async (kind: "link" | "result") => {
    const text = kind === "link" ? window.location.href : summary;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard blocked — the URL bar still holds the shareable state */
    }
  };

  return (
    <div className="tool-share">
      <button type="button" onClick={() => copy("link")}>
        {copied === "link" ? "Link copied" : "Copy link to this result"}
      </button>
      <button type="button" onClick={() => copy("result")}>
        {copied === "result" ? "Result copied" : "Copy the numbers"}
      </button>
      <button type="button" className="ghost" onClick={onReset}>
        Reset
      </button>
      <small>Your numbers stay in the address bar — bookmark it and it comes back as you left it.</small>
    </div>
  );
}
