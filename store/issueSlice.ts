import { createAsyncThunk, createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { issueData, refundData, refundReasons, refundViewers } from "@/constants/issueData";
import { wait } from "@/utils/wait";
import type { RefundRequest } from "@/utils/types";
import { streamFailed } from "./actions";
import type { AppThunk } from "./index";
import { checkSignal } from "./ingestSlice";

type RefundInput = Pick<RefundRequest, "eventId" | "viewer" | "reason" | "amount" | "currency">;

export const resolveRefund = createAsyncThunk(
  "issues/resolveRefund",
  (arg: { id: string; eventId: string; approve: boolean }) => wait(1500).then(() => arg),
);

const issueSlice = createSlice({
  name: "issues",
  initialState: { issues: issueData, refunds: refundData },
  reducers: {
    refundRequested: {
      reducer: (state, { payload }: PayloadAction<RefundRequest>) => {
        state.refunds.unshift(payload);
      },
      prepare: (input: RefundInput) => ({
        payload: {
          ...input,
          id: nanoid(),
          status: "pending" as const,
          at: new Date().toISOString(),
        },
      }),
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(streamFailed, (state, { payload }) => {
        state.issues.unshift({ ...payload, status: "open" });
      })
      .addCase(checkSignal.fulfilled, (state, { payload }) => {
        state.issues
          .filter((issue) => issue.eventId === payload)
          .forEach((issue) => (issue.status = "resolved"));
      })
      .addCase(resolveRefund.pending, (state, { meta }) => {
        const refund = state.refunds.find((item) => item.id === meta.arg.id);
        if (refund) refund.processing = true;
      })
      .addCase(resolveRefund.fulfilled, (state, { payload }) => {
        const refund = state.refunds.find((item) => item.id === payload.id);
        if (!refund) return;
        refund.processing = false;
        refund.status = payload.approve ? "approved" : "denied";
      });
  },
});

export const { refundRequested } = issueSlice.actions;

const failureMessages = {
  ready:
    "Encoder signal lost while ready for streaming. The event moved back to Scheduled until the signal is restored.",
  live: "Encoder signal lost during the broadcast. Viewers may see buffering until it is restored.",
  other: "Encoder signal lost. Reconnect the encoder before marking the event ready.",
};

export const loseSignal =
  (eventId: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState().events.entities[eventId]?.state;
    const message =
      state === "ready" || state === "live" ? failureMessages[state] : failureMessages.other;
    dispatch(streamFailed(eventId, message));
  };

export const simulateRefund =
  (eventId: string): AppThunk =>
  (dispatch, getState) => {
    const { tickets, issues } = getState();
    const ticket = tickets.find((item) => item.eventId === eventId);
    if (!ticket) return;
    const index = issues.refunds.length;
    dispatch(
      refundRequested({
        eventId,
        viewer: refundViewers[index % refundViewers.length],
        reason: refundReasons[index % refundReasons.length],
        amount: ticket.price,
        currency: ticket.currency,
      }),
    );
  };

export default issueSlice.reducer;
