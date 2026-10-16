import type {
  CheckStatus,
  InviteStatus,
  LogTone,
  RefundStatus,
  StreamIssue,
} from "@/utils/types";

export const checkLooks: Record<
  CheckStatus,
  { text: string; textCls: string; dotCls: string }
> = {
  done: { text: "Done", textCls: "text-emerald-700", dotCls: "bg-emerald-500" },
  pending: { text: "In progress", textCls: "text-amber-600", dotCls: "bg-amber-400" },
  missing: { text: "Missing", textCls: "text-red-600", dotCls: "bg-red-500" },
};

export const inviteLooks: Record<InviteStatus, { text: string; cls: string }> = {
  pending: { text: "Awaiting reply", cls: "bg-amber-100 text-amber-800" },
  accepted: { text: "Confirmed", cls: "bg-emerald-100 text-emerald-800" },
  declined: { text: "Declined", cls: "bg-red-100 text-red-700" },
};

export const refundLooks: Record<RefundStatus, { text: string; cls: string }> = {
  pending: { text: "Pending", cls: "bg-amber-100 text-amber-800" },
  approved: { text: "Refunded", cls: "bg-emerald-100 text-emerald-800" },
  denied: { text: "Denied", cls: "bg-zinc-100 text-zinc-600" },
};

export const issueLooks: Record<StreamIssue["status"], { text: string; cls: string }> = {
  open: { text: "Open", cls: "bg-red-100 text-red-700" },
  resolved: { text: "Resolved", cls: "bg-emerald-100 text-emerald-800" },
};

export const logDots: Record<LogTone, string> = {
  info: "bg-zinc-400",
  success: "bg-emerald-500",
  warn: "bg-amber-400",
  error: "bg-red-500",
};
