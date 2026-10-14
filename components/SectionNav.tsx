"use client";

import { findSection, sections } from "@/constants/navData";
import { checkLooks } from "@/constants/statusData";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectSection } from "@/store/selectors";
import { openSection } from "@/store/uiSlice";
import { useChecks } from "./EventContext";

const SectionNav = () => {
  const dispatch = useAppDispatch();
  const active = useAppSelector(selectSection);
  const checks = useChecks();
  const tab = findSection(active).tab;

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-zinc-200 p-2 md:flex-col md:border-b-0 md:border-r">
      {sections
        .filter((section) => section.tab === tab)
        .map((section) => {
          const status = checks.find((check) => check.id === section.check)?.status;
          const isActive = section.id === active;

          return (
            <button
              key={section.id}
              aria-current={isActive ? "page" : undefined}
              onClick={() => dispatch(openSection(section.id))}
              className={`flex shrink-0 items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${
                isActive ? "bg-zinc-100 font-medium text-zinc-900" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {section.label}
              {status && (
                <span
                  title={checkLooks[status].text}
                  className={`size-2 rounded-full ${checkLooks[status].dotCls}`}
                />
              )}
            </button>
          );
        })}
    </nav>
  );
};

export default SectionNav;
