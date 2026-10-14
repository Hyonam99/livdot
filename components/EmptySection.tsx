import { Construction } from "lucide-react";

const EmptySection = ({ text }: { text: string }) => (
  <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-300 p-10 text-center">
    <Construction className="size-6 text-zinc-400" />
    <p className="font-medium">Coming soon</p>
    <p className="max-w-sm text-sm text-zinc-500">{text}</p>
  </div>
);

export default EmptySection;
