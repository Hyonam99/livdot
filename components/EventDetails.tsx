"use client";

import { useState } from "react";
import { useAppDispatch } from "@/store";
import { saveDetails } from "@/store/eventSlice";
import { formatDate } from "@/utils/format";
import { canEdit } from "@/utils/rules";
import type { EventDetails as Details } from "@/utils/types";
import Button from "./Button";
import Card from "./Card";
import { useEvent } from "./EventContext";
import EventForm from "./EventForm";
import StateBadge from "./StateBadge";

const EventDetails = () => {
  const event = useEvent();
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const editable = canEdit(event.state);

  const save = (details: Details) => {
    dispatch(saveDetails({ id: event.id, details }));
    setEditing(false);
  };

  return (
    <Card title="Event information" aside={<StateBadge state={event.state} />}>
      {editing && editable ? (
        <EventForm
          initial={{ title: event.title, description: event.description, startsAt: event.startsAt }}
          submitLabel="Save details"
          onSubmit={save}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-sm text-zinc-500">{formatDate(event.startsAt)}</p>
          </div>
          <p className="text-sm text-zinc-700">{event.description}</p>
          <div className="flex items-center gap-3">
            <Button variant="secondary" disabled={!editable} onClick={() => setEditing(true)}>
              Edit details
            </Button>
            {!editable && (
              <span className="text-xs text-zinc-500">
                Details are locked once the event is ready for streaming.
              </span>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default EventDetails;
