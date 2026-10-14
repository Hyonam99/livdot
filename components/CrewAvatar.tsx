import { initials } from "@/utils/format";

const CrewAvatar = ({ name }: { name: string }) => (
  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">
    {initials(name)}
  </span>
);

export default CrewAvatar;
