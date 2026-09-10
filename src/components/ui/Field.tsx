import type { ReactNode } from "react";

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}

export function Field({ id, label, hint, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-1">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
    </div>
  );
}

interface ResultCardProps {
  label: string;
  value: string;
  accent?: "default" | "green" | "navy";
  sub?: string;
}

export function ResultCard({ label, value, accent = "default", sub }: ResultCardProps) {
  const accentClass =
    accent === "green"
      ? "text-green"
      : accent === "navy"
        ? "text-navy"
        : "text-text-primary";
  return (
    <div className="rounded-lg bg-surface border border-border p-4">
      <p className="text-sm text-text-secondary mb-1">{label}</p>
      <p className={`text-2xl font-bold ${accentClass}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-text-muted">{sub}</p>}
    </div>
  );
}