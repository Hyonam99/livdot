import { createSelector } from "@reduxjs/toolkit";
import { ingestData } from "@/constants/ingestData";
import { ticketData } from "@/constants/ticketData";
import { getActions, getChecks } from "@/utils/rules";
import type { EventRecord, EventState, ReadinessFacts } from "@/utils/types";
import type { RootState } from "./index";

export const selectEvents = createSelector(
  [(state: RootState) => state.events.ids, (state: RootState) => state.events.entities],
  (ids, entities) => ids.map((id) => entities[id]),
);

export const selectEventById = (state: RootState, id: string): EventRecord | undefined =>
  state.events.entities[id];

export const selectSection = (state: RootState) => state.ui.section;

export const selectCrewMembers = (state: RootState) => state.crew.members;

export const selectEventCrew = createSelector(
  [(state: RootState) => state.crew.assignments, (_state: RootState, id: string) => id],
  (assignments, id) => assignments.filter((item) => item.eventId === id),
);

export const selectFacts = createSelector(
  [selectEventCrew, (_state: RootState, id: string) => id],
  (crew, id): ReadinessFacts => {
    const ticket = ticketData.find((item) => item.eventId === id);
    return {
      crew: {
        accepted: crew.filter((item) => item.status === "accepted").length,
        pending: crew.filter((item) => item.status === "pending").length,
        declined: crew.filter((item) => item.status === "declined").length,
      },
      ingest: { configured: ingestData.some((item) => item.eventId === id) },
      pricing: { price: ticket?.price ?? null, currency: ticket?.currency ?? "NGN" },
    };
  },
);

export const selectChecks = createSelector([selectFacts], getChecks);

export const selectActions = createSelector(
  [selectEventById, selectChecks],
  (event, checks) => (event ? getActions(event, checks) : []),
);

export const selectSearch = (state: RootState) => state.ui.search;

export const selectStateFilter = (state: RootState) => state.ui.stateFilter;

export const selectStateCounts = createSelector([selectEvents], (events) =>
  events.reduce<Partial<Record<EventState, number>>>((counts, event) => {
    counts[event.state] = (counts[event.state] ?? 0) + 1;
    return counts;
  }, {}),
);

export const selectFilteredEvents = createSelector(
  [selectEvents, selectSearch, selectStateFilter],
  (events, search, stateFilter) => {
    const query = search.trim().toLowerCase();
    return events.filter(
      (event) =>
        (stateFilter === "all" || event.state === stateFilter) &&
        (!query ||
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query)),
    );
  },
);
