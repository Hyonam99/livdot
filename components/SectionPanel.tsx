"use client";

import { findSection } from "@/constants/navData";
import { useAppSelector } from "@/store";
import { selectSection } from "@/store/selectors";
import type { SectionId } from "@/utils/types";
import ActivitySection from "./ActivitySection";
import CrewSection from "./CrewSection";
import EventDetails from "./EventDetails";
import IngestSection from "./IngestSection";
import IssuesSection from "./IssuesSection";
import Overview from "./Overview";
import PricingSection from "./PricingSection";
import RefundsSection from "./RefundsSection";
import ViewerAccess from "./ViewerAccess";

const renderSection = (id: SectionId) => {
  if (id === "overview") return <Overview />;
  if (id === "details") return <EventDetails />;
  if (id === "crew") return <CrewSection />;
  if (id === "ingest") return <IngestSection />;
  if (id === "pricing") return <PricingSection />;
  if (id === "access") return <ViewerAccess />;
  if (id === "issues") return <IssuesSection />;
  if (id === "refunds") return <RefundsSection />;
  return <ActivitySection />;
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
