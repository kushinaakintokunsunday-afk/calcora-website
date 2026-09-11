"use client";

import { useState, useEffect, useRef } from "react";

export function NumberInput({
  value,
  onChange,
  min = 0,
  max,
  step,
  id,
  label,
  className,
  prefix,
  suffix,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
  id: string;
  label: string;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const [raw, setRaw] = useState(String(value));
  const rafRef = useRef(0);

  useEffect(() => {
    rafRef.current = window.requestAnimationFrame(() => {
      if (document.activeElement?.id !== id) {
        setRaw(String(value));
      }
    });
    return () => window.cancelAnimationFrame(rafRef.current);
  }, [value, id]);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-1">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-text-muted">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={raw}
          onChange={(e) => {
            setRaw(e.target.value);
            const n = parseFloat(e.target.value);
            if (!isNaN(n)) onChange(n);
          }}
          onBlur={() => {
            const n = parseFloat(raw);
            if (isNaN(n) || n < min) {
              setRaw(String(min));
              onChange(min);
            }
          }}
          className={`${prefix ? "pl-7" : ""} ${suffix ? "pr-10" : ""} ${className ?? "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-text-muted">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}