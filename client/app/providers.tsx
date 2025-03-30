"use client";

// This is a place where we keep all the providers or
// anything that needs to be put in the Global State
// for the application

import React from "react";
import StoreProvider from "@/state/redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default Providers;
