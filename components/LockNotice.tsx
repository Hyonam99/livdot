import { Lock } from "lucide-react";

const LockNotice = ({ text }: { text: string }) => (
  <p className="flex items-center gap-2 rounded-lg bg-zinc-50 p-3 text-sm text-zinc-600">
    <Lock className="size-4 shrink-0" />
    {text}
  </p>
);

export default LockNotice;
