import { createAsyncThunk, createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { ingestData, ingestServer } from "@/constants/ingestData";
import { wait } from "@/utils/wait";
import { streamFailed } from "./actions";

export const checkSignal = createAsyncThunk("ingest/checkSignal", (eventId: string) =>
  wait(2500).then(() => eventId),
);

const ingestSlice = createSlice({
  name: "ingest",
  initialState: ingestData,
  reducers: {
    generateKey: {
      reducer: (state, { payload }: PayloadAction<{ eventId: string; streamKey: string }>) => {
        const others = state.filter((item) => item.eventId !== payload.eventId);
        return [...others, { ...payload, server: ingestServer, connected: false }];
      },
      prepare: (eventId: string) => ({
        payload: { eventId, streamKey: `lvd_${nanoid(10)}` },
      }),
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkSignal.pending, (state, { meta }) => {
        const ingest = state.find((item) => item.eventId === meta.arg);
        if (ingest) ingest.checking = true;
      })
      .addCase(checkSignal.fulfilled, (state, { payload }) => {
        const ingest = state.find((item) => item.eventId === payload);
        if (ingest?.checking) {
          ingest.checking = false;
          ingest.connected = true;
          ingest.lost = false;
        }
      })
      .addCase(streamFailed, (state, { payload }) => {
        const ingest = state.find((item) => item.eventId === payload.eventId);
        if (!ingest) return;
        ingest.connected = false;
        ingest.checking = false;
        ingest.lost = true;
      });
  },
});

export const { generateKey } = ingestSlice.actions;

export default ingestSlice.reducer;
