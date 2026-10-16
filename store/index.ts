import {
  combineReducers,
  configureStore,
  type ThunkAction,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import crewReducer from "./crewSlice";
import eventReducer from "./eventSlice";
import ingestReducer from "./ingestSlice";
import issueReducer from "./issueSlice";
import { logMiddleware } from "./logListener";
import logReducer from "./logSlice";
import ticketReducer from "./ticketSlice";
import uiReducer from "./uiSlice";

const rootReducer = combineReducers({
  events: eventReducer,
  crew: crewReducer,
  tickets: ticketReducer,
  ingest: ingestReducer,
  issues: issueReducer,
  log: logReducer,
  ui: uiReducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefault) => getDefault().prepend(logMiddleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
