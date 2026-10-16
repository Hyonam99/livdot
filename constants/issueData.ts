import type { RefundRequest, StreamIssue } from "@/utils/types";

export const issueData: StreamIssue[] = [
  {
    id: "iss_1",
    eventId: "evt_005",
    message: "Encoder signal dropped for 40 seconds during the broadcast.",
    status: "resolved",
    at: "2026-10-10T20:41:00Z",
  },
];

export const refundData: RefundRequest[] = [
  {
    id: "rf_1",
    eventId: "evt_004",
    viewer: "Ifeoma N.",
    reason: "The stream kept buffering on mobile.",
    amount: 15000,
    currency: "NGN",
    status: "pending",
    at: "2026-10-14T09:20:00Z",
  },
  {
    id: "rf_2",
    eventId: "evt_005",
    viewer: "Segun A.",
    reason: "Missed the first half because of the signal drop.",
    amount: 3000,
    currency: "NGN",
    status: "pending",
    at: "2026-10-11T08:05:00Z",
  },
  {
    id: "rf_3",
    eventId: "evt_005",
    viewer: "Halima B.",
    reason: "Bought two tickets by mistake.",
    amount: 3000,
    currency: "NGN",
    status: "approved",
    at: "2026-10-10T18:12:00Z",
  },
  {
    id: "rf_4",
    eventId: "evt_006",
    viewer: "Tobi K.",
    reason: "Did not enjoy the show.",
    amount: 2500,
    currency: "NGN",
    status: "denied",
    at: "2026-10-05T10:00:00Z",
  },
];

export const refundViewers = ["Ada O.", "Musa I.", "Grace E.", "Yemi F.", "Bola T."];

export const refundReasons = [
  "The stream would not load on my TV.",
  "I can no longer attend.",
  "Audio was out of sync.",
];
