import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { crewAssignments, crewMembers } from "@/constants/crewData";
import { wait } from "@/utils/wait";
import type { CrewAssignment, InviteStatus } from "@/utils/types";
import type { RootState } from "./index";

type CrewKey = { eventId: string; memberId: string };

const isMatch = (item: CrewAssignment, key: CrewKey) =>
  item.eventId === key.eventId && item.memberId === key.memberId;

export const inviteCrew = createAsyncThunk<InviteStatus, CrewKey, { state: RootState }>(
  "crew/invite",
  async ({ memberId }, { getState }) => {
    await wait(3000);
    const member = getState().crew.members.find((item) => item.id === memberId);
    return member?.declines ? "declined" : "accepted";
  },
);

const crewSlice = createSlice({
  name: "crew",
  initialState: { members: crewMembers, assignments: crewAssignments },
  reducers: {
    removeCrew: (state, { payload }: PayloadAction<CrewKey>) => {
      state.assignments = state.assignments.filter((item) => !isMatch(item, payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(inviteCrew.pending, (state, { meta }) => {
        state.assignments = state.assignments.filter((item) => !isMatch(item, meta.arg));
        state.assignments.push({ ...meta.arg, status: "pending", requestId: meta.requestId });
      })
      .addCase(inviteCrew.fulfilled, (state, { payload, meta }) => {
        const invite = state.assignments.find((item) => item.requestId === meta.requestId);
        if (invite) invite.status = payload;
      });
  },
});

export const { removeCrew } = crewSlice.actions;

export default crewSlice.reducer;
