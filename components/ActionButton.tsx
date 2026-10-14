"use client";

import { useState } from "react";
import type { EventAction } from "@/utils/types";
import Button from "./Button";

type ActionButtonProps = {
  action: EventAction;
  pending: boolean;
  busy: boolean;
  onRun: () => void;
};

const ActionButton = ({ action, pending, busy, onRun }: ActionButtonProps) => {
  const [confirming, setConfirming] = useState(false);

  const run = () => {
    setConfirming(false);
    onRun();
  };

  if (confirming)
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-red-700">{action.confirm}</span>
        <Button variant="danger" onClick={run}>
          Yes, {action.label.toLowerCase()}
        </Button>
        <Button variant="secondary" onClick={() => setConfirming(false)}>
          Cancel
        </Button>
      </div>
    );

  return (
    <Button
      disabled={!action.enabled || busy}
      onClick={action.confirm ? () => setConfirming(true) : onRun}
    >
      {pending ? "Working…" : action.label}
    </Button>
  );
};

export default ActionButton;
