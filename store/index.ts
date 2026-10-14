import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import crewReducer from "./crewSlice";
import eventReducer from "./eventSlice";
import uiReducer from "./uiSlice";

const rootReducer = combineReducers({
  events: eventReducer,
  crew: crewReducer,
  ui: uiReducer,
});

export const makeStore = () => configureStore({ reducer: rootReducer });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
