import type { IngestInfo } from "@/utils/types";

const server = "rtmp://ingest.livdot.live/live";

export const ingestData: IngestInfo[] = [
  { eventId: "evt_003", server, streamKey: "lvd_hl3_9f2k" },
  { eventId: "evt_004", server, streamKey: "lvd_tk4_7c1m" },
  { eventId: "evt_005", server, streamKey: "lvd_su5_2b8q" },
  { eventId: "evt_006", server, streamKey: "lvd_gp6_5d4r" },
];
