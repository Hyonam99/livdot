"use client";

import { createContext, useContext } from "react";
import { useAppSelector } from "@/store";
import { selectActions, selectChecks, selectEventById } from "@/store/selectors";
import type { EventRecord } from "@/utils/types";

export const EventIdContext = createContext("");

export const useEventId = () => useContext(EventIdContext);

export const useEvent = () => {
  const id = useEventId();
  return useAppSelector((state) => selectEventById(state, id)) as EventRecord;
};

export const useChecks = () => {
  const id = useEventId();
  return useAppSelector((state) => selectChecks(state, id));
};

export const useActions = () => {
  const id = useEventId();
  return useAppSelector((state) => selectActions(state, id));
};
