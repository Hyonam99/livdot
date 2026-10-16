import { createListenerMiddleware, type UnknownAction } from "@reduxjs/toolkit";
import { formatMoney } from "@/utils/format";
import { findTransition, stateLabel } from "@/utils/rules";
import type { LogEntry } from "@/utils/types";
import { streamFailed } from "./actions";
import { inviteCrew, removeCrew } from "./crewSlice";
import { createEvent, processReplay, runAction, saveDetails } from "./eventSlice";
import type { RootState } from "./index";
import { checkSignal, generateKey } from "./ingestSlice";
import { refundRequested, resolveRefund } from "./issueSlice";
import { addLog } from "./logSlice";
import { savePricing } from "./ticketSlice";

type Entry = Omit<LogEntry, "id" | "at">;

const memberName = (state: RootState, id: string) =>
  state.crew.members.find((member) => member.id === id)?.name ?? "Crew member";

const describe = (action: UnknownAction, before: RootState, after: RootState): Entry | null => {
  if (createEvent.match(action))
    return { eventId: action.payload.id, text: "Event created as a draft", tone: "info" };
  if (saveDetails.match(action))
    return { eventId: action.payload.id, text: "Event details updated", tone: "info" };
  if (runAction.fulfilled.match(action))
    return { eventId: action.meta.arg.id, text: `Moved to ${stateLabel(action.payload)}`, tone: "success" };
  if (runAction.rejected.match(action))
    return {
      eventId: action.meta.arg.id,
      text: `${findTransition(action.meta.arg.action).label} was blocked. ${action.payload ?? ""}`,
      tone: "error",
    };
  if (processReplay.fulfilled.match(action))
    return { eventId: action.payload, text: "Replay finished processing", tone: "success" };
  if (inviteCrew.pending.match(action))
    return {
      eventId: action.meta.arg.eventId,
      text: `Invited ${memberName(after, action.meta.arg.memberId)} to the crew`,
      tone: "info",
    };
  if (inviteCrew.fulfilled.match(action)) {
    const live = after.crew.assignments.some((item) => item.requestId === action.meta.requestId);
    if (!live) return null;
    const accepted = action.payload === "accepted";
    return {
      eventId: action.meta.arg.eventId,
      text: `${memberName(after, action.meta.arg.memberId)} ${accepted ? "accepted" : "declined"} the crew invite`,
      tone: accepted ? "success" : "warn",
    };
  }
  if (removeCrew.match(action))
    return {
      eventId: action.payload.eventId,
      text: `Removed ${memberName(after, action.payload.memberId)} from the crew`,
      tone: "info",
    };
  if (generateKey.match(action))
    return { eventId: action.payload.eventId, text: "New stream key generated", tone: "info" };
  if (checkSignal.fulfilled.match(action)) {
    const wasLost = before.ingest.find((item) => item.eventId === action.payload)?.lost;
    return {
      eventId: action.payload,
      text: wasLost ? "Encoder signal restored" : "Encoder signal received",
      tone: "success",
    };
  }
  if (savePricing.match(action))
    return {
      eventId: action.payload.eventId,
      text: `Ticket pricing set to ${formatMoney(action.payload.price, "NGN")} for ${action.payload.capacity} tickets`,
      tone: "info",
    };
  if (streamFailed.match(action))
    return { eventId: action.payload.eventId, text: action.payload.message, tone: "error" };
  if (refundRequested.match(action))
    return {
      eventId: action.payload.eventId,
      text: `${action.payload.viewer} requested a refund of ${formatMoney(action.payload.amount, action.payload.currency)}`,
      tone: "warn",
    };
  if (resolveRefund.fulfilled.match(action)) {
    const refund = after.issues.refunds.find((item) => item.id === action.payload.id);
    return {
      eventId: action.payload.eventId,
      text: `Refund for ${refund?.viewer ?? "a viewer"} ${action.payload.approve ? "approved" : "denied"}`,
      tone: action.payload.approve ? "success" : "info",
    };
  }
  return null;
};

const listener = createListenerMiddleware();

listener.startListening({
  predicate: (action) => !addLog.match(action),
  effect: (action, api) => {
    const entry = describe(action, api.getOriginalState() as RootState, api.getState() as RootState);
    if (entry) api.dispatch(addLog(entry));
  },
});

export const logMiddleware = listener.middleware;
