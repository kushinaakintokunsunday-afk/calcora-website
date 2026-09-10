"use client";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectInputProps {
  id: string;
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  options: SelectOption[];
}

export function SelectInput({ id, label, value, onChange, options }: SelectInputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
      >
        {options.map((option) => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}