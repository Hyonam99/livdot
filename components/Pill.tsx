import type { ReactNode } from "react";

const Pill = ({ cls, children }: { cls: string; children: ReactNode }) => (
  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
    {children}
  </span>
);

export default Pill;
