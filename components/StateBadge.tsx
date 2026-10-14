import { stateLabel } from "@/utils/rules";
import type { EventState } from "@/utils/types";

const tones: Record<EventState, string> = {
  draft: "bg-zinc-100 text-zinc-700",
  scheduled: "bg-blue-100 text-blue-800",
  ready: "bg-emerald-100 text-emerald-800",
  live: "bg-red-100 text-red-700",
  completed: "bg-zinc-200 text-zinc-800",
  replay: "bg-violet-100 text-violet-800",
};

const StateBadge = ({ state }: { state: EventState }) => (
  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[state]}`}>
    {state === "live" && "● "}
    {stateLabel(state)}
  </span>
);

export default StateBadge;
