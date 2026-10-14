import { Antenna, Ticket, Users, type LucideIcon } from "lucide-react";
import type { CheckId, SectionId, TabId } from "@/utils/types";

export const hostName = "Bayo Events";

export const tabs: { id: TabId; label: string }[] = [
  { id: "manage", label: "Management" },
  { id: "viewers", label: "Viewers" },
];

export const sections: {
  id: SectionId;
  label: string;
  tab: TabId;
  check?: CheckId;
}[] = [
  { id: "overview", label: "Overview", tab: "manage" },
  { id: "details", label: "Event Details", tab: "manage" },
  { id: "crew", label: "Production Crew", tab: "manage", check: "crew" },
  { id: "ingest", label: "Streaming Ingest", tab: "manage", check: "ingest" },
  { id: "pricing", label: "Ticket Pricing", tab: "manage", check: "pricing" },
  { id: "issues", label: "Stream Issues", tab: "manage" },
  { id: "activity", label: "Activity Log", tab: "manage" },
  { id: "access", label: "Viewer Access", tab: "viewers" },
  { id: "refunds", label: "Refund Requests", tab: "viewers" },
];

export const findSection = (id: SectionId) =>
  sections.find((section) => section.id === id)!;

export const checkSection: Record<CheckId, SectionId> = {
  crew: "crew",
  ingest: "ingest",
  pricing: "pricing",
};

export const checkIcons: Record<CheckId, LucideIcon> = {
  crew: Users,
  ingest: Antenna,
  pricing: Ticket,
};
