"use client";

import { TriangleAlert } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectOpenIssue } from "@/store/selectors";
import { openSection } from "@/store/uiSlice";
import { useEvent } from "./EventContext";

const IssueBanner = () => {
  const dispatch = useAppDispatch();
  const event = useEvent();
  const issue = useAppSelector((state) => selectOpenIssue(state, event.id));

  if (!issue) return null;

  const live = event.state === "live";

  return (
    <div
      role="alert"
      className={`mt-4 flex flex-wrap items-start gap-3 rounded-xl border p-4 ${
        live ? "border-red-200 bg-red-50" : "border-orange-200 bg-orange-50"
      }`}
    >
      <TriangleAlert className={`mt-0.5 size-5 shrink-0 ${live ? "text-red-600" : "text-orange-600"}`} />
      <div className="min-w-0 flex-1">
        <p className={`font-semibold ${live ? "text-red-800" : "text-orange-800"}`}>
          {live ? "Stream degraded" : "Stream issue"}
        </p>
        <p className="text-sm text-zinc-700">{issue.message}</p>
      </div>
      <button
        onClick={() => dispatch(openSection("issues"))}
        className="text-sm font-medium underline underline-offset-2"
      >
        View stream issues
      </button>
    </div>
  );
};

export default IssueBanner;
