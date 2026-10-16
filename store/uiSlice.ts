import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { EventState, SectionId } from "@/utils/types";

export type StateFilter = EventState | "all";

type UiSlice = {
  eventId: string | null;
  section: SectionId;
  search: string;
  stateFilter: StateFilter;
};

const initialState: UiSlice = {
  eventId: null,
  section: "overview",
  search: "",
  stateFilter: "all",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    enterEvent: (state, { payload }: PayloadAction<string>) => {
      if (state.eventId === payload) return;
      state.eventId = payload;
      state.section = "overview";
    },
    openSection: (state, { payload }: PayloadAction<SectionId>) => {
      state.section = payload;
    },
    focusSection: (state, { payload }: PayloadAction<{ eventId: string; section: SectionId }>) => {
      state.eventId = payload.eventId;
      state.section = payload.section;
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    setStateFilter: (state, { payload }: PayloadAction<StateFilter>) => {
      state.stateFilter = payload;
    },
    clearFilters: (state) => {
      state.search = "";
      state.stateFilter = "all";
    },
  },
});

export const { enterEvent, openSection, focusSection, setSearch, setStateFilter, clearFilters } =
  uiSlice.actions;

export default uiSlice.reducer;
