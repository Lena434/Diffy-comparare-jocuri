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
  const client: AxiosInstance = useMemo(() => {
    const instance = axios.create({ baseURL });

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!error.response) {
          console.error("Network error: server unavailable");
          return Promise.reject(error);
        }
        const { status } = error.response;
        if (status === 401) {
          localStorage.removeItem("diffy-current-user");
          window.location.href = "/login";
        } else if (status === 403) {
          console.warn("Access forbidden");
        } else if (status >= 500) {
          console.error("Server error:", status);
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [baseURL]);

  const api: ApiClient = useMemo(() => createApi(client), [client]);

  const value = useMemo(() => ({ client, api }), [client, api]);

  return <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>;
}
