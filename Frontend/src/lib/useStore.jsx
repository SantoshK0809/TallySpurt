import { useContext } from "react";
import { StoreCtx } from "./storeContext.jsx";

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
