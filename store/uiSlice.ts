import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { EventState, SectionId } from "@/utils/types";

export type StateFilter = EventState | "all";

type UiSlice = {
  section: SectionId;
  search: string;
  stateFilter: StateFilter;
};

const initialState: UiSlice = { section: "overview", search: "", stateFilter: "all" };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openSection: (state, { payload }: PayloadAction<SectionId>) => {
      state.section = payload;
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

export const { openSection, setSearch, setStateFilter, clearFilters } = uiSlice.actions;

export default uiSlice.reducer;
