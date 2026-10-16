import type { ReactNode } from "react";
import { FlaskConical } from "lucide-react";

const SimulateCard = ({ children }: { children: ReactNode }) => (
  <section className="rounded-xl border border-dashed border-amber-300 bg-amber-50/50 p-4">
    <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-800">
      <FlaskConical className="size-4" />
      Simulate
    </p>
    <p className="mb-3 text-xs text-amber-800/80">
      Demo controls that stand in for events a real backend would send.
    </p>
    <div className="flex flex-wrap items-start gap-4">{children}</div>
  </section>
);

export default SimulateCard;
