"use client";

import { ReceiptText } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { simulateRefund } from "@/store/issueSlice";
import { selectEventRefunds, selectTicket } from "@/store/selectors";
import { formatMoney } from "@/utils/format";
import Card from "./Card";
import { useEvent } from "./EventContext";
import RefundRow from "./RefundRow";
import SimButton from "./SimButton";
import SimulateCard from "./SimulateCard";
import StatTile from "./StatTile";

const RefundsSection = () => {
  const dispatch = useAppDispatch();
  const event = useEvent();
  const refunds = useAppSelector((state) => selectEventRefunds(state, event.id));
  const ticket = useAppSelector((state) => selectTicket(state, event.id));

  const pending = refunds.filter((item) => item.status === "pending").length;
  const refunded = refunds
    .filter((item) => item.status === "approved")
    .reduce((sum, item) => sum + item.amount, 0);
  const requestReason =
    event.state === "draft" || !ticket?.sold ? "Nobody holds a ticket yet." : null;

  return (
    <>
      <p className="text-sm text-zinc-600">
        Ticket holders can ask for a refund, for example after a stream failure. Approving a refund
        returns the money and frees up the ticket.
      </p>

      <div className="grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 sm:grid-cols-3">
        <StatTile label="Pending requests" value={String(pending)} />
        <StatTile label="Total requests" value={String(refunds.length)} />
        <StatTile label="Refunded" value={formatMoney(refunded, ticket?.currency ?? "NGN")} />
      </div>

      <Card title="Requests">
        {refunds.length === 0 ? (
          <p className="text-sm text-zinc-500">No refund requests for this event.</p>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {refunds.map((refund) => (
              <RefundRow key={refund.id} refund={refund} />
            ))}
          </ul>
        )}
      </Card>

      <SimulateCard>
        <SimButton reason={requestReason} onClick={() => dispatch(simulateRefund(event.id))}>
          <ReceiptText className="size-4" />
          New refund request
        </SimButton>
      </SimulateCard>
    </>
  );
};

export default RefundsSection;
