import { createAction, nanoid } from "@reduxjs/toolkit";

export const streamFailed = createAction(
  "issues/streamFailed",
  (eventId: string, message: string) => ({
    payload: { id: nanoid(), eventId, message, at: new Date().toISOString() },
  }),
);
