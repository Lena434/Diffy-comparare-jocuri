import React, { useMemo, useEffect } from "react";
import axios from "axios";
import type { AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { AxiosContext } from "./context";
import { createApi } from "./create-api";
import type { ApiClient } from "./types";

interface AxiosProviderProps {
  children: React.ReactNode;
  baseURL: string;
}

export function AxiosProvider({ children, baseURL }: AxiosProviderProps): React.ReactElement {
  const navigate = useNavigate();

  const client: AxiosInstance = useMemo(() => axios.create({ baseURL }), [baseURL]);

  useEffect(() => {
    const interceptorId = client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!error.response) {
          navigate(ROUTES.ERROR_500);
          return Promise.reject(error);
        }
        const { status } = error.response;
        if (status === 401) {
          localStorage.removeItem("diffy-current-user");
          navigate(ROUTES.LOGIN);
        } else if (status === 403) {
          navigate(ROUTES.ERROR_403);
        } else if (status >= 500) {
          navigate(ROUTES.ERROR_500);
        }
        return Promise.reject(error);
      }
    );

    return () => client.interceptors.response.eject(interceptorId);
  }, [client, navigate]);

  const api: ApiClient = useMemo(() => createApi(client), [client]);

  const value = useMemo(() => ({ client, api }), [client, api]);

  return <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>;
}
