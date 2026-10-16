"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectPendingRefunds } from "@/store/selectors";
import { focusSection } from "@/store/uiSlice";

const NotifyBell = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectPendingRefunds);
  const [open, setOpen] = useState(false);
  const total = items.reduce((sum, item) => sum + item.count, 0);

  const goTo = (eventId: string) => {
    dispatch(focusSection({ eventId, section: "refunds" }));
    setOpen(false);
    router.push(`/events/${eventId}`);
  };

  return (
    <div className="relative">
      <button
        aria-label={`Notifications, ${total} pending refund requests`}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="relative flex size-9 items-center justify-center rounded-full border border-zinc-200 hover:bg-zinc-50"
      >
        <Bell className="size-4" />
        {total > 0 && (
          <span className="absolute -top-1 -right-1 flex size-4.5 items-center justify-center rounded-full bg-red-600 text-[10px] font-semibold text-white">
            {total}
          </span>
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg">
            <p className="px-2 py-1 text-xs font-medium text-zinc-500">Pending refund requests</p>
            {items.length === 0 ? (
              <p className="px-2 py-3 text-sm text-zinc-500">You are all caught up.</p>
            ) : (
              items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-zinc-50"
                >
                  <span className="min-w-0 flex-1 truncate">{item.title}</span>
                  <span className="text-xs text-orange-600">{item.count} pending</span>
                  <ChevronRight className="size-4 text-zinc-400" />
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotifyBell;
