import type { IngestInfo } from "@/utils/types";

export const ingestServer = "rtmp://ingest.livdot.live/live";

export const ingestData: IngestInfo[] = [
  { eventId: "evt_003", server: ingestServer, streamKey: "lvd_hl3_9f2k", connected: true },
  { eventId: "evt_004", server: ingestServer, streamKey: "lvd_tk4_7c1m", connected: true },
  { eventId: "evt_005", server: ingestServer, streamKey: "lvd_su5_2b8q", connected: true },
  { eventId: "evt_006", server: ingestServer, streamKey: "lvd_gp6_5d4r", connected: true },
];
