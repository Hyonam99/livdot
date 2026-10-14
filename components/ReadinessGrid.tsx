"use client";

import { Check, TriangleAlert } from "lucide-react";
import { useChecks } from "./EventContext";
import ReadinessTile from "./ReadinessTile";

const ReadinessGrid = () => {
  const checks = useChecks();
  const open = checks.filter((check) => check.status !== "done").length;
  const ready = open === 0;

  return (
    <section className="overflow-hidden rounded-xl border border-zinc-200">
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-5 py-4">
        {ready ? (
          <Check className="size-5 text-emerald-700" />
        ) : (
          <TriangleAlert className="size-5 text-amber-600" />
        )}
        <h3 className={`text-lg font-medium ${ready ? "text-emerald-700" : "text-amber-700"}`}>
          {ready ? "Ready to stream" : "Needs attention"}
        </h3>
        <span
          className={`rounded px-1.5 text-xs font-semibold text-white ${
            ready ? "bg-emerald-700" : "bg-amber-600"
          }`}
        >
          {ready ? checks.length : open}
        </span>
      </div>
      <div className="grid gap-px bg-zinc-200 md:grid-cols-3">
        {checks.map((check) => (
          <ReadinessTile key={check.id} check={check} />
        ))}
      </div>
    </section>
  );
};

export default ReadinessGrid;
