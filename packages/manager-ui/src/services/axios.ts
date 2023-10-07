import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ISessionData } from "@sellgauge/common";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { LS_SESSION_KEY } from "../context/AuthProvider";
import env from "../env";

const CLIENT_ID = "stockup-web";

const axiosConfig: AxiosRequestConfig = {
  baseURL: env.apiUrl,
};

const axiosInstance = axios.create(axiosConfig);

enum ETokenType {
  access_token = "access_token",
  refresh_token = "refresh_token",
}

function getToken(type: ETokenType) {
  const lsSession = localStorage.getItem(LS_SESSION_KEY);

  if (lsSession) {
    const auth = JSON.parse(lsSession) as ISessionData;

    return auth[type];
  }
  return null;
}

axiosInstance.interceptors.request.use((config) => {
  config.headers = config.headers || {};

  const access_token = getToken(ETokenType.access_token);

  if (access_token) config.headers["Authorization"] = `Bearer ${access_token}`;

  config.headers["X-Client-Id"] = CLIENT_ID;

  return config;
});

const refreshAxios = axios.create(axiosConfig);

createAuthRefreshInterceptor(axiosInstance, (failedRequest: AxiosError) => {
  const refresh_token = getToken(ETokenType.refresh_token);

  return refreshAxios
    .post<{ access_token: string }>(
      "/auth/refresh",
      { refresh_token },
      { headers: { "x-client-id": CLIENT_ID } }
    )
    .catch((reason) => {
      localStorage.removeItem(LS_SESSION_KEY);
      window.location.href = "/";
      return Promise.reject(reason);
    })
    .then((response) => {
      const { access_token } = response.data;

      const sessionData: ISessionData = JSON.parse(
        localStorage.getItem(LS_SESSION_KEY) || "null"
      );

      sessionData["access_token"] = access_token;

      localStorage.setItem(LS_SESSION_KEY, JSON.stringify(sessionData));

      failedRequest.response.headers[
        "Authorization"
      ] = `Bearer ${access_token}`;

      return Promise.resolve();
    });
});

const { get, post, put, patch, delete: remove } = axiosInstance;

export { get, post, put, patch, remove };
