import type { ReactNode } from "react";

const StatTile = ({ label, value, note }: { label: string; value: string; note?: ReactNode }) => (
  <div className="bg-white p-4">
    <p className="text-xs text-zinc-500">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
    {note}
  </div>
);

export default StatTile;
