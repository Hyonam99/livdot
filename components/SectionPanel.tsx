"use client";

import { findSection } from "@/constants/navData";
import { useAppSelector } from "@/store";
import { selectSection } from "@/store/selectors";
import type { SectionId } from "@/utils/types";
import EmptySection from "./EmptySection";
import EventDetails from "./EventDetails";
import Overview from "./Overview";

const placeholders: Partial<Record<SectionId, string>> = {
  crew: "Assign production crew to run the broadcast. Invites stay pending until accepted.",
  ingest: "Add the stream key and ingest server your encoder will push to.",
  issues: "Stream failures and warnings during the broadcast will appear here.",
  activity: "A timeline of state changes and operational events.",
  pricing: "Set the ticket price and capacity viewers will pay for.",
  access: "See what ticket holders can do at each stage of the event.",
  refunds: "Review and resolve viewer refund requests.",
};

const renderSection = (id: SectionId) => {
  if (id === "overview") return <Overview />;
  if (id === "details") return <EventDetails />;
  return <EmptySection text={placeholders[id] ?? ""} />;
};

const SectionPanel = () => {
  const section = findSection(useAppSelector(selectSection));

  return (
    <div className="min-w-0 space-y-6 p-4 md:p-6">
      <h2 className="text-2xl font-semibold">{section.label}</h2>
      {renderSection(section.id)}
    </div>
  );
};

export default SectionPanel;
