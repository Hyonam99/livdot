export type EventState =
  | "draft"
  | "scheduled"
  | "ready"
  | "live"
  | "completed"
  | "replay";

export type ReplayStatus = "none" | "processing" | "ready";

export type EventDetails = {
  title: string;
  description: string;
  startsAt: string;
};

export type EventInfo = EventDetails & {
  id: string;
  state: EventState;
  replay: ReplayStatus;
};

export type EventRecord = EventInfo & {
  pending: ActionId | null;
  error: string | null;
};

export type CheckId = "crew" | "ingest" | "pricing";

export type CheckStatus = "missing" | "pending" | "done";

export type Check = {
  id: CheckId;
  label: string;
  status: CheckStatus;
  detail: string;
};

export type ReadinessFacts = {
  crew: { accepted: number; pending: number; declined: number };
  ingest: { configured: boolean; connected: boolean };
  pricing: { price: number | null; currency: string };
};

export type ActionId = "schedule" | "markReady" | "goLive" | "end" | "publishReplay";

export type EventAction = {
  id: ActionId;
  label: string;
  prompt: string;
  confirm?: string;
  enabled: boolean;
  reasons: string[];
};

export type TabId = "manage" | "viewers";

export type SectionId =
  | "overview"
  | "details"
  | "crew"
  | "ingest"
  | "issues"
  | "activity"
  | "pricing"
  | "access"
  | "refunds";

export type InviteStatus = "pending" | "accepted" | "declined";

export type CrewMember = {
  id: string;
  name: string;
  role: string;
  declines?: boolean;
};

export type CrewAssignment = {
  eventId: string;
  memberId: string;
  status: InviteStatus;
  requestId?: string;
};

export type TicketInfo = {
  eventId: string;
  price: number;
  currency: string;
  capacity: number;
  sold: number;
};

export type IngestInfo = {
  eventId: string;
  server: string;
  streamKey: string;
  connected: boolean;
  checking?: boolean;
};
