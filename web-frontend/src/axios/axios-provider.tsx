import React, { useMemo } from "react";
import axios from "axios";
import type { AxiosInstance } from "axios";
import { AxiosContext } from "./context";
import { createApi } from "./create-api";
import type { ApiClient } from "./types";

interface AxiosProviderProps {
  children: React.ReactNode;
  baseURL: string;
}

export function AxiosProvider({ children, baseURL }: AxiosProviderProps): React.ReactElement {
  const client: AxiosInstance = useMemo(() => axios.create({ baseURL }), [baseURL]);

  const api: ApiClient = useMemo(() => createApi(client), [client]);

  const value = useMemo(() => ({ client, api }), [client, api]);

  return <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>;
}
