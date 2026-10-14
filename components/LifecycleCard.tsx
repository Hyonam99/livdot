"use client";

import { formatDate } from "@/utils/format";
import { steps } from "@/utils/rules";
import { useActions, useEvent } from "./EventContext";

const barCls = (index: number, current: number) => {
  if (index <= current) return "bg-emerald-600";
  if (index === current + 1) return "bg-orange-500";
  return "bg-zinc-200";
};

const LifecycleCard = () => {
  const event = useEvent();
  const [action] = useActions();
  const current = steps.findIndex((step) => step.state === event.state);
  const next = steps[current + 1];

  const nextNote = () => {
    if (!action) return "Lifecycle complete";
    if (event.pending === action.id) return "In progress…";
    if (action.enabled) return "Available now";
    return `Blocked by ${action.reasons.length} item${action.reasons.length > 1 ? "s" : ""}`;
  };

  return (
    <section className="rounded-xl border border-zinc-200 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-medium">Event lifecycle</h3>
        {action && (
          <p className="text-sm">
            Next step: <span className="font-semibold text-orange-600">{action.label}</span>{" "}
            {action.enabled ? "is available" : "is blocked"}
          </p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2">
        <div className="pr-4">
          <p className="flex items-center gap-1.5 text-xs text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-600" /> Current
          </p>
          <p className="mt-1 font-medium">{steps[current].label}</p>
          <p className="text-sm text-zinc-500">
            {event.state === "draft" ? "Not scheduled" : formatDate(event.startsAt)}
          </p>
        </div>
        <div className="border-l border-zinc-200 pl-4">
          <p className="flex items-center gap-1.5 text-xs text-orange-600">
            <span className="size-1.5 rounded-full bg-orange-500" /> Up next
          </p>
          <p className="mt-1 font-medium">{next?.label ?? "Nothing left"}</p>
          <p className="text-sm text-zinc-500">{nextNote()}</p>
        </div>
      </div>

      <ol className="mt-5 grid grid-cols-6 gap-1">
        {steps.map((step, index) => (
          <li key={step.state} aria-current={index === current ? "step" : undefined}>
            <div className={`h-1 rounded-full ${barCls(index, current)}`} />
            <p
              className={`mt-1.5 hidden text-[11px] sm:block ${
                index === current ? "font-semibold text-zinc-900" : "text-zinc-500"
              }`}
            >
              {step.label}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default LifecycleCard;
