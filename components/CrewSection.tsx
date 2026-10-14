"use client";

import { UserPlus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { inviteCrew, removeCrew } from "@/store/crewSlice";
import { selectCrewMembers, selectEventCrew } from "@/store/selectors";
import { canEdit } from "@/utils/rules";
import Button from "./Button";
import Card from "./Card";
import CrewRow from "./CrewRow";
import { useEvent } from "./EventContext";
import InviteBadge from "./InviteBadge";
import LockNotice from "./LockNotice";

const removeLabels = { pending: "Cancel invite", accepted: "Remove", declined: "Remove" };

const CrewSection = () => {
  const dispatch = useAppDispatch();
  const event = useEvent();
  const members = useAppSelector(selectCrewMembers);
  const crew = useAppSelector((state) => selectEventCrew(state, event.id));
  const editable = canEdit(event.state);

  const confirmed = crew.filter((item) => item.status === "accepted").length;
  const available = members.filter((member) => !crew.some((item) => item.memberId === member.id));
  const findMember = (id: string) => members.find((member) => member.id === id)!;

  return (
    <>
      <p className="text-sm text-zinc-600">
        At least one confirmed crew member is needed before the event can be ready for streaming.
        Invites stay pending until the crew member replies.
      </p>

      {!editable && <LockNotice text="Crew is locked once the event is ready for streaming." />}

      <Card
        title="Assigned crew"
        aside={<span className="text-sm text-zinc-500">{confirmed} confirmed</span>}
      >
        {crew.length === 0 ? (
          <p className="text-sm text-zinc-500">No crew assigned yet.</p>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {crew.map((item) => (
              <CrewRow key={item.memberId} member={findMember(item.memberId)}>
                <InviteBadge status={item.status} />
                {editable && (
                  <Button
                    variant="secondary"
                    onClick={() => dispatch(removeCrew({ eventId: event.id, memberId: item.memberId }))}
                  >
                    {removeLabels[item.status]}
                  </Button>
                )}
              </CrewRow>
            ))}
          </ul>
        )}
      </Card>

      {editable && (
        <Card title="Available crew">
          {available.length === 0 ? (
            <p className="text-sm text-zinc-500">Everyone has been invited.</p>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {available.map((member) => (
                <CrewRow key={member.id} member={member}>
                  <Button
                    variant="secondary"
                    onClick={() => dispatch(inviteCrew({ eventId: event.id, memberId: member.id }))}
                  >
                    <UserPlus className="size-4" />
                    Invite
                  </Button>
                </CrewRow>
              ))}
            </ul>
          )}
        </Card>
      )}
    </>
  );
};

export default CrewSection;
