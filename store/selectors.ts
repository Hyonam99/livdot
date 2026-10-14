import { createSelector } from "@reduxjs/toolkit";
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

export const selectTicket = (state: RootState, id: string) =>
  state.tickets.find((item) => item.eventId === id);

export const selectIngest = (state: RootState, id: string) =>
  state.ingest.find((item) => item.eventId === id);

export const selectFacts = createSelector(
  [selectEventCrew, selectTicket, selectIngest],
  (crew, ticket, ingest): ReadinessFacts => ({
    crew: {
      accepted: crew.filter((item) => item.status === "accepted").length,
      pending: crew.filter((item) => item.status === "pending").length,
      declined: crew.filter((item) => item.status === "declined").length,
    },
    ingest: { configured: Boolean(ingest), connected: Boolean(ingest?.connected) },
    pricing: { price: ticket?.price ?? null, currency: ticket?.currency ?? "NGN" },
  }),
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
