"use client";

import { LoaderCircle, PlugZap, Unplug } from "lucide-react";
import { issueLooks } from "@/constants/statusData";
import { useAppDispatch, useAppSelector } from "@/store";
import { checkSignal } from "@/store/ingestSlice";
import { loseSignal } from "@/store/issueSlice";
import { selectEventIssues, selectIngest } from "@/store/selectors";
import { formatTime } from "@/utils/format";
import Card from "./Card";
import { useEvent } from "./EventContext";
import Pill from "./Pill";
import SimButton from "./SimButton";
import SimulateCard from "./SimulateCard";

const IssuesSection = () => {
  const dispatch = useAppDispatch();
  const event = useEvent();
  const issues = useAppSelector((state) => selectEventIssues(state, event.id));
  const ingest = useAppSelector((state) => selectIngest(state, event.id));
  const ended = event.state === "completed" || event.state === "replay";

  const loseReason = ended
    ? "The broadcast has ended."
    : !ingest?.connected
      ? "The encoder is not connected."
      : null;
  const restoreReason = ingest?.lost ? null : "The signal has not been lost.";

  return (
    <>
      <p className="text-sm text-zinc-600">
        Losing the encoder signal while the event is ready moves it back to Scheduled. During a
        live broadcast the event stays live and is marked as degraded until the signal returns.
      </p>

      <Card title="Issues">
        {issues.length === 0 ? (
          <p className="text-sm text-zinc-500">No stream issues for this event.</p>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {issues.map((issue) => (
              <li key={issue.id} className="flex flex-wrap items-start gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm">{issue.message}</p>
                  <p className="text-xs text-zinc-500">{formatTime(issue.at)}</p>
                </div>
                <Pill cls={issueLooks[issue.status].cls}>{issueLooks[issue.status].text}</Pill>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <SimulateCard>
        <SimButton reason={loseReason} onClick={() => dispatch(loseSignal(event.id))}>
          <Unplug className="size-4" />
          Lose encoder signal
        </SimButton>
        <SimButton
          reason={ingest?.checking ? null : restoreReason}
          busy={ingest?.checking}
          onClick={() => dispatch(checkSignal(event.id))}
        >
          {ingest?.checking ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <PlugZap className="size-4" />
          )}
          {ingest?.checking ? "Reconnecting…" : "Reconnect encoder"}
        </SimButton>
      </SimulateCard>
    </>
  );
};

export default IssuesSection;
