"use client";

import { useEvent } from "./EventContext";
import StateBadge from "./StateBadge";

const EventTitle = () => {
  const { title, state } = useEvent();

  return (
    <div className="flex items-center gap-3">
      <h1 className="truncate text-2xl font-semibold">{title}</h1>
      <StateBadge state={state} />
    </div>
  );
};

export default EventTitle;
