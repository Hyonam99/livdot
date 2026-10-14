"use client";

import { useAppSelector } from "@/store";
import { selectTicket } from "@/store/selectors";
import { canEdit } from "@/utils/rules";
import Card from "./Card";
import { useEvent } from "./EventContext";
import LockNotice from "./LockNotice";
import PricingForm from "./PricingForm";
import SalesStats from "./SalesStats";

const PricingSection = () => {
  const event = useEvent();
  const ticket = useAppSelector((state) => selectTicket(state, event.id));
  const editable = canEdit(event.state);

  return (
    <>
      <p className="text-sm text-zinc-600">
        Viewers pay this price for access to the live stream and the replay. Tickets go on sale
        once the event is scheduled and a price is set.
      </p>

      {ticket && <SalesStats ticket={ticket} />}

      {editable ? (
        <Card title="Pricing">
          <PricingForm eventId={event.id} ticket={ticket} />
        </Card>
      ) : (
        <LockNotice text="Pricing is locked once the event is ready for streaming." />
      )}
    </>
  );
};

export default PricingSection;
