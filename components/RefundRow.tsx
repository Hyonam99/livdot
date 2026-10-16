"use client";

import { LoaderCircle } from "lucide-react";
import { refundLooks } from "@/constants/statusData";
import { useAppDispatch } from "@/store";
import { resolveRefund } from "@/store/issueSlice";
import { formatMoney, formatTime } from "@/utils/format";
import type { RefundRequest } from "@/utils/types";
import Button from "./Button";
import Pill from "./Pill";

const RefundRow = ({ refund }: { refund: RefundRequest }) => {
  const dispatch = useAppDispatch();
  const decide = (approve: boolean) =>
    dispatch(resolveRefund({ id: refund.id, eventId: refund.eventId, approve }));

  return (
    <li className="flex flex-wrap items-center gap-3 py-3">
      <div className="min-w-0 flex-1 basis-60">
        <p className="text-sm font-medium">
          {refund.viewer} · {formatMoney(refund.amount, refund.currency)}
        </p>
        <p className="text-sm text-zinc-600">{refund.reason}</p>
        <p className="text-xs text-zinc-500">Requested {formatTime(refund.at)}</p>
      </div>
      {refund.status === "pending" ? (
        refund.processing ? (
          <Pill cls="bg-zinc-100 text-zinc-600">
            <LoaderCircle className="size-3 animate-spin" />
            Processing…
          </Pill>
        ) : (
          <div className="flex gap-2">
            <Button onClick={() => decide(true)}>Approve</Button>
            <Button variant="secondary" onClick={() => decide(false)}>
              Deny
            </Button>
          </div>
        )
      ) : (
        <Pill cls={refundLooks[refund.status].cls}>{refundLooks[refund.status].text}</Pill>
      )}
    </li>
  );
};

export default RefundRow;
