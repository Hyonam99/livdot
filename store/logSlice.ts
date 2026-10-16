import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { logData } from "@/constants/logData";
import type { LogEntry } from "@/utils/types";

const logSlice = createSlice({
  name: "log",
  initialState: logData,
  reducers: {
    addLog: {
      reducer: (state, { payload }: PayloadAction<LogEntry>) => {
        state.unshift(payload);
      },
      prepare: (entry: Omit<LogEntry, "id" | "at">) => ({
        payload: { ...entry, id: nanoid(), at: new Date().toISOString() },
      }),
    },
  },
});

export const { addLog } = logSlice.actions;

export default logSlice.reducer;
