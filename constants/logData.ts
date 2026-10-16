import type { LogEntry } from "@/utils/types";

export const logData: LogEntry[] = [
  { id: "log_1", eventId: "evt_004", text: "Moved to Live", tone: "success", at: "2026-10-14T09:00:00Z" },
  { id: "log_2", eventId: "evt_004", text: "Moved to Ready for Streaming", tone: "success", at: "2026-10-13T16:30:00Z" },
  { id: "log_3", eventId: "evt_005", text: "Replay finished processing", tone: "success", at: "2026-10-10T22:05:00Z" },
  { id: "log_4", eventId: "evt_005", text: "Moved to Completed", tone: "success", at: "2026-10-10T21:40:00Z" },
  { id: "log_5", eventId: "evt_005", text: "Encoder signal restored", tone: "success", at: "2026-10-10T20:42:00Z" },
  { id: "log_6", eventId: "evt_005", text: "Encoder signal dropped for 40 seconds during the broadcast.", tone: "error", at: "2026-10-10T20:41:00Z" },
  { id: "log_7", eventId: "evt_006", text: "Moved to Replay Available", tone: "success", at: "2026-10-05T09:00:00Z" },
];
