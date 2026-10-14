import type { ReactNode } from "react";

export const inputCls =
  "w-full rounded border border-zinc-300 px-2 py-1.5 text-sm focus:border-zinc-500 focus:outline-none";

type FieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

const Field = ({ label, error, children }: FieldProps) => (
  <label className="block space-y-1 text-sm">
    <span className="font-medium">{label}</span>
    {children}
    {error && <span className="block text-red-600">{error}</span>}
  </label>
);

export default Field;
