"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectEventById } from "@/store/selectors";
import { enterEvent } from "@/store/uiSlice";
import { EventIdContext } from "./EventContext";
import EventTitle from "./EventTitle";
import IssueBanner from "./IssueBanner";
import SectionNav from "./SectionNav";
import SectionPanel from "./SectionPanel";
import TabSwitch from "./TabSwitch";

const EventDashboard = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const event = useAppSelector((state) => selectEventById(state, id));

  useEffect(() => {
    dispatch(enterEvent(id));
  }, [dispatch, id]);

  if (!event)
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 p-10 text-center">
        <p className="font-medium">Event not found</p>
        <p className="mt-1 text-sm text-zinc-500">
          Events are kept in memory, so new ones are cleared when the page reloads.
        </p>
        <Link href="/" className="mt-3 inline-block text-sm underline">
          Back to all events
        </Link>
      </div>
    );

  return (
    <EventIdContext value={id}>
      <EventTitle />
      <IssueBanner />
      <div className="mt-4">
        <TabSwitch />
      </div>
      <div className="mt-4 grid rounded-xl border border-zinc-200 md:grid-cols-[240px_1fr]">
        <SectionNav />
        <SectionPanel />
      </div>
    </EventIdContext>
  );
};

export default EventDashboard;
