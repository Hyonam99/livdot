"use client";

import { ArrowRight, Info, PartyPopper } from "lucide-react";
import { useAppDispatch } from "@/store";
import { clearError, runAction } from "@/store/eventSlice";
import { stateHints } from "@/utils/rules";
import ActionButton from "./ActionButton";
import { useActions, useEvent } from "./EventContext";

const NextStep = () => {
  const dispatch = useAppDispatch();
  const actions = useActions();
  const { id, state, pending, error } = useEvent();

  return (
    <section className="overflow-hidden rounded-xl border border-zinc-200">
      {error && (
        <div role="alert" className="flex justify-between gap-2 bg-red-50 px-5 py-3 text-sm text-red-800">
          <span>{error}</span>
          <button className="text-xs underline" onClick={() => dispatch(clearError(id))}>
            Dismiss
          </button>
        </div>
      )}

      {actions.length === 0 && (
        <div className="flex items-center gap-4 p-5">
          <span className="flex size-11 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
            <PartyPopper className="size-5" />
          </span>
          <div>
            <p className="font-semibold">Lifecycle complete</p>
            <p className="text-sm text-zinc-600">{stateHints[state]}</p>
          </div>
        </div>
      )}

      {actions.map((action) => (
        <div key={action.id}>
          <div className="flex flex-wrap items-center gap-4 p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
              <ArrowRight className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">Next step</p>
              <p className="font-semibold">{action.label}</p>
              <p className="text-sm text-zinc-600">{stateHints[state]}</p>
            </div>
            <ActionButton
              action={action}
              pending={pending === action.id}
              busy={pending !== null}
              onRun={() => dispatch(runAction({ id, action: action.id }))}
            />
          </div>
          {action.reasons.length > 0 && (
            <div className="flex gap-2 border-t border-zinc-200 bg-zinc-50 px-5 py-3 text-sm">
              <Info className="mt-0.5 size-4 shrink-0 text-zinc-500" />
              <div>
                <p className="font-medium">Blocked because</p>
                <ul className="list-disc pl-4 text-zinc-600">
                  {action.reasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default NextStep;
