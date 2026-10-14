import type { CheckStatus } from "@/utils/types";

export const checkLooks: Record<
  CheckStatus,
  { text: string; textCls: string; dotCls: string }
> = {
  done: { text: "Done", textCls: "text-emerald-700", dotCls: "bg-emerald-500" },
  pending: { text: "In progress", textCls: "text-amber-600", dotCls: "bg-amber-400" },
  missing: { text: "Missing", textCls: "text-red-600", dotCls: "bg-red-500" },
};
