"use client";

import { findSection, sections, tabs } from "@/constants/navData";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectSection } from "@/store/selectors";
import { openSection } from "@/store/uiSlice";
import type { TabId } from "@/utils/types";

const TabSwitch = () => {
  const dispatch = useAppDispatch();
  const current = findSection(useAppSelector(selectSection)).tab;

  const openTab = (tab: TabId) => {
    const first = sections.find((section) => section.tab === tab)!;
    dispatch(openSection(first.id));
  };

  return (
    <div role="tablist" className="inline-flex rounded-xl border border-zinc-200 bg-white p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={tab.id === current}
          onClick={() => openTab(tab.id)}
          className={`rounded-lg px-4 py-1.5 text-sm ${
            tab.id === current ? "bg-zinc-900 text-white" : "text-zinc-600 hover:text-zinc-900"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSwitch;
