"use client";

import { KeyRound, LoaderCircle, Radio, RefreshCw } from "lucide-react";
import { checkLooks } from "@/constants/statusData";
import { useAppDispatch, useAppSelector } from "@/store";
import { checkSignal, generateKey } from "@/store/ingestSlice";
import { selectIngest } from "@/store/selectors";
import { canEdit } from "@/utils/rules";
import Button from "./Button";
import Card from "./Card";
import CopyField from "./CopyField";
import { useChecks, useEvent } from "./EventContext";
import LockNotice from "./LockNotice";

const IngestSection = () => {
  const dispatch = useAppDispatch();
  const event = useEvent();
  const ingest = useAppSelector((state) => selectIngest(state, event.id));
  const check = useChecks().find((item) => item.id === "ingest")!;
  const editable = canEdit(event.state);
  const look = checkLooks[check.status];

  return (
    <>
      <p className="text-sm text-zinc-600">
        Point your encoder (for example OBS) at the server below using your stream key. The check
        is done once LIV DOT receives a signal from the encoder.
      </p>

      {!editable && (
        <LockNotice text="The stream key is locked once the event is ready for streaming. You can still check the signal." />
      )}

      <Card
        title="Connection"
        aside={<span className={`text-sm font-medium ${look.textCls}`}>{check.detail}</span>}
      >
        {!ingest ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-zinc-500">No stream key yet. Generate one to get started.</p>
            {editable && (
              <Button onClick={() => dispatch(generateKey(event.id))}>
                <KeyRound className="size-4" />
                Generate stream key
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <CopyField label="Server URL" value={ingest.server} />
            <CopyField label="Stream key" value={ingest.streamKey} secret />
            {(editable || !ingest.connected) && (
              <div className="flex flex-wrap gap-2">
                {!ingest.connected && (
                  <Button
                    disabled={ingest.checking}
                    onClick={() => dispatch(checkSignal(event.id))}
                  >
                    {ingest.checking ? (
                      <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                      <Radio className="size-4" />
                    )}
                    {ingest.checking ? "Checking signal…" : "Check signal"}
                  </Button>
                )}
                {editable && (
                  <Button variant="secondary" onClick={() => dispatch(generateKey(event.id))}>
                    <RefreshCw className="size-4" />
                    Regenerate key
                  </Button>
                )}
              </div>
            )}
            {editable && ingest.connected && (
              <p className="text-xs text-zinc-500">
                Regenerating the key disconnects the encoder until it reconnects with the new key.
              </p>
            )}
          </div>
        )}
      </Card>
    </>
  );
};

export default IngestSection;
