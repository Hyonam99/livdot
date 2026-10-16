import type { ReactNode } from "react";
import Button from "./Button";

type SimButtonProps = {
  onClick: () => void;
  reason: string | null;
  busy?: boolean;
  children: ReactNode;
};

const SimButton = ({ onClick, reason, busy = false, children }: SimButtonProps) => (
  <div className="space-y-1">
    <Button variant="secondary" disabled={busy || reason !== null} onClick={onClick}>
      {children}
    </Button>
    {reason && <p className="max-w-56 text-xs text-zinc-500">{reason}</p>}
  </div>
);

export default SimButton;
