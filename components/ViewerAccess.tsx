"use client";

import { Ban, Eye } from "lucide-react";
import { useAppSelector } from "@/store";
import { selectTicket } from "@/store/selectors";
import { accessByState, steps, viewerAccess } from "@/utils/rules";
import Card from "./Card";
import { useEvent } from "./EventContext";

const ViewerAccess = () => {
  const event = useEvent();
  const ticket = useAppSelector((state) => selectTicket(state, event.id));
  const access = viewerAccess(event.state, Boolean(ticket));
  const Icon = access.blocked ? Ban : Eye;

  return (
    <>
      <div
        className={`flex items-start gap-3 rounded-xl border p-4 ${
          access.blocked ? "border-orange-200 bg-orange-50" : "border-zinc-200"
        }`}
      >
        <Icon className={`mt-0.5 size-5 ${access.blocked ? "text-orange-600" : "text-zinc-500"}`} />
        <div>
          <p className="text-xs text-zinc-500">What ticket holders can do now</p>
          <p className="font-semibold">{access.title}</p>
          <p className="text-sm text-zinc-600">{access.detail}</p>
          {ticket && (
            <p className="mt-1 text-sm text-zinc-500">{ticket.sold} people hold a ticket.</p>
          )}
        </div>
      </div>

      <Card title="Access at each stage">
        <ul className="divide-y divide-zinc-100">
          {steps.map((step) => {
            const current = step.state === event.state;
            return (
              <li
                key={step.state}
                aria-current={current ? "step" : undefined}
                className={`grid gap-1 py-2.5 text-sm sm:grid-cols-[180px_1fr] ${
                  current ? "font-medium" : "text-zinc-500"
                }`}
              >
                <span>
                  {step.label}
                  {current && <span className="ml-2 text-xs text-orange-600">Now</span>}
                </span>
                <span>{accessByState[step.state].detail}</span>
              </li>
            );
          })}
        </ul>
      </Card>
    </>
  );
};

export default ViewerAccess;
