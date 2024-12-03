"use client";
import React from "react";
import { ContextProvider } from "../context/userContext";

interface Props {
  children: React.ReactNode;
}

export default function Provider({ children }: Props) {
  return <ContextProvider>{children}</ContextProvider>;
}
