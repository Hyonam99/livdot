"use client";

import Link from "next/link";
import { CalendarDays, Plus, SearchX } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectEvents, selectFilteredEvents } from "@/store/selectors";
import { clearFilters } from "@/store/uiSlice";
import { buttonCls } from "./Button";
import EventFilters from "./EventFilters";
import EventRow from "./EventRow";

const EventList = () => {
  const dispatch = useAppDispatch();
  const total = useAppSelector(selectEvents).length;
  const events = useAppSelector(selectFilteredEvents);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Your events</h1>
          <p className="text-sm text-zinc-500">Pick an event to manage it and prepare it for broadcast.</p>
        </div>
        <Link href="/events/new" className={buttonCls()}>
          <Plus className="size-4" />
          Create event
        </Link>
      </div>

      {total === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-300 p-10 text-center">
          <CalendarDays className="size-6 text-zinc-400" />
          <p className="font-medium">No events yet</p>
          <p className="text-sm text-zinc-500">Create your first event to get started.</p>
        </div>
      ) : (
        <>
          <EventFilters />
          {events.length === 0 ? (
            <div className="mt-4 flex flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-300 p-10 text-center">
              <SearchX className="size-6 text-zinc-400" />
              <p className="font-medium">No events match your filters</p>
              <button className="text-sm underline" onClick={() => dispatch(clearFilters())}>
                Clear filters
              </button>
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200">
              {events.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default EventList;
