"use client";

import { useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";

const Providers = ({ children }: { children: ReactNode }) => {
  const [store] = useState(makeStore);

  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
