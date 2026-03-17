import { createContext, useContext } from "react";
import type { AxiosInstance } from "axios";
import type { ApiClient } from "./types";

interface AxiosContextValue {
  client: AxiosInstance;
  api: ApiClient;
}

export const AxiosContext = createContext<AxiosContextValue | null>(null);

export function useAxios(): AxiosContextValue {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error("useAxios must be used within an AxiosProvider");
  }
  return context;
}
