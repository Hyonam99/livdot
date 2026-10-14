"use client";

import { useState } from "react";
import { Check, Copy, Eye, EyeOff } from "lucide-react";

type CopyFieldProps = {
  label: string;
  value: string;
  secret?: boolean;
};

const CopyField = ({ label, value, secret = false }: CopyFieldProps) => {
  const [shown, setShown] = useState(!secret);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-1 text-sm">
      <p className="font-medium">{label}</p>
      <div className="flex items-center gap-2 rounded border border-zinc-200 bg-zinc-50 px-2 py-1.5">
        <code className="min-w-0 flex-1 truncate font-mono text-xs">
          {shown ? value : "•".repeat(16)}
        </code>
        {secret && (
          <button
            aria-label={shown ? `Hide ${label}` : `Show ${label}`}
            onClick={() => setShown(!shown)}
            className="text-zinc-500 hover:text-zinc-900"
          >
            {shown ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
        <button
          aria-label={`Copy ${label}`}
          onClick={copy}
          className="text-zinc-500 hover:text-zinc-900"
        >
          {copied ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4" />}
        </button>
      </div>
    </div>
  );
};

export default CopyField;
