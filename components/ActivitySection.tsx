"use client";

import { logDots } from "@/constants/statusData";
import { useAppSelector } from "@/store";
import { selectEventLog } from "@/store/selectors";
import { formatTime } from "@/utils/format";
import Card from "./Card";
import { useEvent } from "./EventContext";

const ActivitySection = () => {
  const event = useEvent();
  const log = useAppSelector((state) => selectEventLog(state, event.id));

  return (
    <Card title="Timeline" aside={<span className="text-sm text-zinc-500">Newest first</span>}>
      {log.length === 0 ? (
        <p className="text-sm text-zinc-500">
          Nothing has happened yet. Changes to this event will appear here.
        </p>
      ) : (
        <ol className="space-y-3">
          {log.map((entry) => (
            <li key={entry.id} className="flex gap-3">
              <span className={`mt-1.5 size-2 shrink-0 rounded-full ${logDots[entry.tone]}`} />
              <div>
                <p className="text-sm">{entry.text}</p>
                <p className="text-xs text-zinc-500">{formatTime(entry.at)}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
};

export default ActivitySection;
