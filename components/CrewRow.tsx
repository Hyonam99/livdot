import type { ReactNode } from "react";
import type { CrewMember } from "@/utils/types";
import CrewAvatar from "./CrewAvatar";

type CrewRowProps = {
  member: CrewMember;
  children?: ReactNode;
};

const CrewRow = ({ member, children }: CrewRowProps) => (
  <li className="flex flex-wrap items-center gap-3 py-3">
    <CrewAvatar name={member.name} />
    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium">{member.name}</p>
      <p className="text-xs text-zinc-500">{member.role}</p>
    </div>
    {children}
  </li>
);

export default CrewRow;
