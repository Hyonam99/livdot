import type { EventInfo } from "@/utils/types";

export const eventData: EventInfo[] = [
  {
    id: "evt_001",
    title: "Lagos Jazz Night",
    description: "An evening of live jazz streamed from Freedom Park.",
    startsAt: "",
    state: "draft",
    replay: "none",
  },
  {
    id: "evt_002",
    title: "Afrobeats Live Session",
    description: "A studio session with three rising Afrobeats artists.",
    startsAt: "2026-11-28T20:00",
    state: "scheduled",
    replay: "none",
  },
  {
    id: "evt_003",
    title: "Highlife Classics Revival",
    description: "Veteran bands play the highlife hits of the 70s and 80s.",
    startsAt: "2026-10-30T19:00",
    state: "ready",
    replay: "none",
  },
  {
    id: "evt_004",
    title: "Lagos Tech Summit Keynote",
    description: "Opening keynote and founder panel, streamed live.",
    startsAt: "2026-10-14T09:00",
    state: "live",
    replay: "none",
  },
  {
    id: "evt_005",
    title: "Stand-up Saturday",
    description: "Five comedians, one stage, no filter.",
    startsAt: "2026-10-10T20:00",
    state: "completed",
    replay: "ready",
  },
  {
    id: "evt_006",
    title: "Gospel Praise Night",
    description: "A night of worship with the Mass Choir.",
    startsAt: "2026-10-04T18:00",
    state: "replay",
    replay: "ready",
  },
];
