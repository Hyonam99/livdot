import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  nanoid,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { eventData } from "@/constants/eventData";
import { findTransition } from "@/utils/rules";
import { wait } from "@/utils/wait";
import type { ActionId, EventDetails, EventRecord, EventState } from "@/utils/types";
import type { RootState } from "./index";
import { selectActions } from "./selectors";

export const eventAdapter = createEntityAdapter<EventRecord>();

const initialState = eventAdapter.getInitialState(
  undefined,
  eventData.map((event) => ({ ...event, pending: null, error: null })),
);

export const processReplay = createAsyncThunk(
  "events/processReplay",
  (id: string) => wait(5000).then(() => id),
);

export const runAction = createAsyncThunk<
  EventState,
  { id: string; action: ActionId },
  { state: RootState; rejectValue: string }
>("events/runAction", async ({ id, action }, { getState, dispatch, rejectWithValue }) => {
  await wait(1200);
  const item = selectActions(getState(), id).find((entry) => entry.id === action);
  if (!item) return rejectWithValue("This action is no longer available.");
  if (!item.enabled) return rejectWithValue(item.reasons.join(" "));
  if (action === "end") void dispatch(processReplay(id));
  return findTransition(action).to;
});

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    createEvent: {
      reducer: eventAdapter.addOne,
      prepare: (details: EventDetails) => ({
        payload: {
          ...details,
          id: nanoid(),
          state: "draft",
          replay: "none",
          pending: null,
          error: null,
        } satisfies EventRecord,
      }),
    },
    saveDetails: (state, { payload }: PayloadAction<{ id: string; details: EventDetails }>) => {
      eventAdapter.updateOne(state, { id: payload.id, changes: payload.details });
    },
    clearError: (state, { payload }: PayloadAction<string>) => {
      eventAdapter.updateOne(state, { id: payload, changes: { error: null } });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runAction.pending, (state, { meta }) => {
        const event = state.entities[meta.arg.id];
        event.pending = meta.arg.action;
        event.error = null;
      })
      .addCase(runAction.fulfilled, (state, { payload, meta }) => {
        const event = state.entities[meta.arg.id];
        event.state = payload;
        event.pending = null;
      })
      .addCase(runAction.rejected, (state, { payload, meta }) => {
        const event = state.entities[meta.arg.id];
        event.pending = null;
        event.error = payload ?? "Something went wrong. Try again.";
      })
      .addCase(processReplay.pending, (state, { meta }) => {
        state.entities[meta.arg].replay = "processing";
      })
      .addCase(processReplay.fulfilled, (state, { payload }) => {
        state.entities[payload].replay = "ready";
      });
  },
});

export const { createEvent, saveDetails, clearError } = eventSlice.actions;

export default eventSlice.reducer;
