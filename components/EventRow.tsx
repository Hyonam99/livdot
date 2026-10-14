"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAppSelector } from "@/store";
import { selectActions, selectChecks } from "@/store/selectors";
import { formatDate } from "@/utils/format";
import { progressNote } from "@/utils/rules";
import type { EventRecord } from "@/utils/types";
import StateBadge from "./StateBadge";

const EventRow = ({ event }: { event: EventRecord }) => {
  const checks = useAppSelector((state) => selectChecks(state, event.id));
  const [action] = useAppSelector((state) => selectActions(state, event.id));

  return (
    <li>
      <Link
        href={`/events/${event.id}`}
        className="flex flex-wrap items-center gap-x-6 gap-y-2 p-4 hover:bg-zinc-50"
      >
        <div className="min-w-0 flex-1 basis-56">
          <p className="truncate font-medium">{event.title}</p>
          <p className="text-sm text-zinc-500">{formatDate(event.startsAt)}</p>
        </div>
        <div className="w-36">
          <StateBadge state={event.state} />
        </div>
        <p className="w-52 text-sm text-zinc-600">{progressNote(event, checks)}</p>
        <p className={`w-56 text-sm font-medium ${action ? "text-orange-600" : "text-zinc-400"}`}>
          {action?.prompt ?? "All steps complete"}
        </p>
        <ChevronRight className="size-4 text-zinc-400" />
      </Link>
    </li>
  );
};

export default EventRow;
