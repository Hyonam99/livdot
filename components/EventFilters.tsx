"use client";

import { ChevronDown, Search, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectEvents,
  selectSearch,
  selectStateCounts,
  selectStateFilter,
} from "@/store/selectors";
import { setSearch, setStateFilter, type StateFilter } from "@/store/uiSlice";
import { steps } from "@/utils/rules";

const EventFilters = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);
  const active = useAppSelector(selectStateFilter);
  const counts = useAppSelector(selectStateCounts);
  const total = useAppSelector(selectEvents).length;

  const filters: { id: StateFilter; label: string; count: number }[] = [
    { id: "all", label: "All states", count: total },
    ...steps.map((step) => ({ id: step.state, label: step.label, count: counts[step.state] ?? 0 })),
  ];

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <label className="flex flex-1 items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 focus-within:border-zinc-400">
        <Search className="size-4 text-zinc-400" />
        <input
          type="search"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          placeholder="Search events by title or description"
          aria-label="Search events"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {search && (
          <button aria-label="Clear search" onClick={() => dispatch(setSearch(""))}>
            <X className="size-4 text-zinc-400 hover:text-zinc-700" />
          </button>
        )}
      </label>
      <div className="relative sm:w-56">
        <select
          value={active}
          onChange={(e) => dispatch(setStateFilter(e.target.value as StateFilter))}
          aria-label="Filter by state"
          className="w-full cursor-pointer appearance-none rounded-lg border border-zinc-200 bg-white py-2 pr-9 pl-3 text-sm outline-none focus:border-zinc-400"
        >
          {filters.map((filter) => (
            <option key={filter.id} value={filter.id}>
              {filter.label} ({filter.count})
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-zinc-400" />
      </div>
    </div>
  );
};

export default EventFilters;
