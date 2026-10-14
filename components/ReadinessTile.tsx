"use client";

import { ChevronRight } from "lucide-react";
import { checkIcons, checkSection } from "@/constants/navData";
import { checkLooks } from "@/constants/statusData";
import { useAppDispatch } from "@/store";
import { openSection } from "@/store/uiSlice";
import type { Check } from "@/utils/types";

const ReadinessTile = ({ check }: { check: Check }) => {
  const dispatch = useAppDispatch();
  const Icon = checkIcons[check.id];
  const look = checkLooks[check.status];

  return (
    <div className="bg-white p-4">
      <div className="flex items-start gap-3">
        <Icon className="mt-4 size-5 shrink-0 text-zinc-500" />
        <div className="min-w-0 flex-1">
          <p className="text-xs text-zinc-500">{check.label}</p>
          <p className={`text-lg font-semibold ${look.textCls}`}>{look.text}</p>
        </div>
        <button
          onClick={() => dispatch(openSection(checkSection[check.id]))}
          className="flex items-center gap-0.5 text-sm font-medium underline underline-offset-2"
        >
          Manage <ChevronRight className="size-3.5" />
        </button>
      </div>
      <p className="mt-2 text-xs text-zinc-500">{check.detail}</p>
    </div>
  );
};

export default ReadinessTile;
