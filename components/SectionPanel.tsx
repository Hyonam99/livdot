"use client";

import { findSection } from "@/constants/navData";
import { useAppSelector } from "@/store";
import { selectSection } from "@/store/selectors";
import type { SectionId } from "@/utils/types";
import CrewSection from "./CrewSection";
import EmptySection from "./EmptySection";
import EventDetails from "./EventDetails";
import IngestSection from "./IngestSection";
import Overview from "./Overview";
import PricingSection from "./PricingSection";
import ViewerAccess from "./ViewerAccess";

const placeholders: Partial<Record<SectionId, string>> = {
  issues: "Stream failures and warnings during the broadcast will appear here.",
  activity: "A timeline of state changes and operational events.",
  refunds: "Review and resolve viewer refund requests.",
};

const renderSection = (id: SectionId) => {
  if (id === "overview") return <Overview />;
  if (id === "details") return <EventDetails />;
  if (id === "crew") return <CrewSection />;
  if (id === "ingest") return <IngestSection />;
  if (id === "pricing") return <PricingSection />;
  if (id === "access") return <ViewerAccess />;
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
