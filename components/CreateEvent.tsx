"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { createEvent } from "@/store/eventSlice";
import type { EventDetails } from "@/utils/types";
import Card from "./Card";
import EventForm from "./EventForm";

const emptyEvent: EventDetails = { title: "", description: "", startsAt: "" };

const CreateEvent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const create = (details: EventDetails) => {
    const { payload } = dispatch(createEvent(details));
    router.push(`/events/${payload.id}`);
  };

  return (
    <Card title="Event information">
      <EventForm
        initial={emptyEvent}
        submitLabel="Create draft"
        onSubmit={create}
        onCancel={() => router.push("/")}
      />
    </Card>
  );
};

export default CreateEvent;
