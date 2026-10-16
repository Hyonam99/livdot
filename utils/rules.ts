import { eventSchema } from "./schemas";
import { formatMoney } from "./format";
import type {
  ActionId,
  Check,
  EventAction,
  EventInfo,
  EventState,
  ReadinessFacts,
} from "./types";

export const steps: { state: EventState; label: string }[] = [
  { state: "draft", label: "Draft" },
  { state: "scheduled", label: "Scheduled" },
  { state: "ready", label: "Ready for Streaming" },
  { state: "live", label: "Live" },
  { state: "completed", label: "Completed" },
  { state: "replay", label: "Replay Available" },
];

export const stateLabel = (state: EventState) =>
  steps.find((step) => step.state === state)?.label ?? state;

export const stateHints: Record<EventState, string> = {
  draft: "Add a start time, then schedule the event.",
  scheduled: "Complete every readiness check to get ready for streaming.",
  ready: "Everything is in place. Go live when you are ready.",
  live: "The event is broadcasting to ticket holders.",
  completed: "The broadcast has ended. Publish the replay once it is processed.",
  replay: "Ticket holders can now watch the replay.",
};

export const canEdit = (state: EventState) =>
  state === "draft" || state === "scheduled";

const crewCheck = ({ accepted, pending, declined }: ReadinessFacts["crew"]): Check => {
  const base = { id: "crew", label: "Production crew" } as const;
  if (accepted > 0)
    return { ...base, status: "done", detail: `${accepted} crew confirmed` };
  if (pending > 0)
    return { ...base, status: "pending", detail: `${pending} invite(s) awaiting reply` };
  if (declined > 0)
    return { ...base, status: "missing", detail: "Invite declined, invite someone else" };
  return { ...base, status: "missing", detail: "No crew assigned" };
};

const ingestCheck = ({ configured, connected, lost }: ReadinessFacts["ingest"]): Check => {
  const base = { id: "ingest", label: "Streaming ingest" } as const;
  if (lost)
    return { ...base, status: "missing", detail: "Encoder signal lost" };
  if (connected)
    return { ...base, status: "done", detail: "Encoder signal received" };
  if (configured)
    return { ...base, status: "pending", detail: "Waiting for encoder signal" };
  return { ...base, status: "missing", detail: "No stream key generated" };
};

const pricingCheck = ({ price, currency }: ReadinessFacts["pricing"]): Check => {
  const base = { id: "pricing", label: "Ticket pricing" } as const;
  if (price !== null)
    return { ...base, status: "done", detail: `${formatMoney(price, currency)} per ticket` };
  return { ...base, status: "missing", detail: "No ticket price set" };
};

export const getChecks = (facts: ReadinessFacts): Check[] => [
  crewCheck(facts.crew),
  ingestCheck(facts.ingest),
  pricingCheck(facts.pricing),
];

export const accessByState: Record<EventState, { title: string; detail: string }> = {
  draft: { title: "Not on sale", detail: "The event is not public yet, so viewers cannot buy tickets." },
  scheduled: { title: "Tickets on sale", detail: "Viewers can buy tickets and see when the stream starts." },
  ready: { title: "Waiting room open", detail: "Ticket holders can join the waiting room before the stream starts." },
  live: { title: "Watching live", detail: "Ticket holders can watch the live stream now." },
  completed: { title: "Stream ended", detail: "Ticket holders are told a replay is being prepared." },
  replay: { title: "Replay available", detail: "Ticket holders can watch the replay on demand." },
};

export const viewerAccess = (state: EventState, priced: boolean) => {
  if (state === "scheduled" && !priced)
    return { title: "Sales blocked", detail: "Set a ticket price to open ticket sales.", blocked: true };
  return { ...accessByState[state], blocked: false };
};

const openChecks = (checks: Check[]) =>
  checks
    .filter((check) => check.status !== "done")
    .map((check) => `${check.label}: ${check.detail.toLowerCase()}.`);

const replayReasons = (event: EventInfo) => {
  if (event.replay === "ready") return [];
  if (event.replay === "processing") return ["Replay is still processing."];
  return ["No recording is available yet."];
};

type Transition = {
  id: ActionId;
  from: EventState;
  to: EventState;
  label: string;
  prompt: string;
  confirm?: string;
  guard: (event: EventInfo, checks: Check[]) => string[];
};

export const transitions: Transition[] = [
  {
    id: "schedule",
    from: "draft",
    to: "scheduled",
    label: "Schedule event",
    prompt: "Ready to schedule?",
    guard: (event) => {
      const result = eventSchema.safeParse(event);
      return result.success ? [] : result.error.issues.map((issue) => issue.message);
    },
  },
  {
    id: "markReady",
    from: "scheduled",
    to: "ready",
    label: "Mark ready for streaming",
    prompt: "Ready to stream?",
    guard: (_, checks) => openChecks(checks),
  },
  {
    id: "goLive",
    from: "ready",
    to: "live",
    label: "Go live",
    prompt: "Ready to go live?",
    guard: (_, checks) => openChecks(checks),
  },
  {
    id: "end",
    from: "live",
    to: "completed",
    label: "End broadcast",
    prompt: "Ready to end the broadcast?",
    confirm: "Viewers will lose the live stream. End the broadcast?",
    guard: () => [],
  },
  {
    id: "publishReplay",
    from: "completed",
    to: "replay",
    label: "Publish replay",
    prompt: "Ready to publish the replay?",
    guard: replayReasons,
  },
];

export const findTransition = (id: ActionId) =>
  transitions.find((transition) => transition.id === id)!;

export const getActions = (event: EventInfo, checks: Check[]): EventAction[] =>
  transitions
    .filter((transition) => transition.from === event.state)
    .map(({ id, label, prompt, confirm, guard }) => {
      const reasons = guard(event, checks);
      return { id, label, prompt, confirm, enabled: reasons.length === 0, reasons };
    });

export const progressNote = (event: EventInfo, checks: Check[]) => {
  if (event.state === "live")
    return checks.every((check) => check.status === "done") ? "Broadcasting now" : "Stream degraded";
  if (event.state === "replay") return "Replay available to viewers";
  if (event.state === "completed")
    return event.replay === "ready" ? "Replay processed" : "Replay processing";
  const done = checks.filter((check) => check.status === "done").length;
  return `${done} of ${checks.length} checks done`;
};
