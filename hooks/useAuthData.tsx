"use client";

import {
  AccessTokenResponse,
  AuthorizationCodeResponse,
  RefreshTokenResponse,
  User,
} from "@/types/types";
import { LocalStorageKeys } from "@/util/Constants";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import { useLocalStorage } from "./useLocalStorage";
import { useUpdateLogger } from "./useUpdateLogger";

const AuthData = createContext<{
  setAuthorizationCodeResponse: React.Dispatch<
    React.SetStateAction<AuthorizationCodeResponse | null>
  >;
  accessToken: string | null;
}>({
  setAuthorizationCodeResponse: () => {},
  accessToken: null,
});

export const AuthDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authorizationCodeResponse, setAuthorizationCodeResponse] =
    useState<AuthorizationCodeResponse | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    null,
    LocalStorageKeys.refreshToken
  );

  const [firstTimeAccessToken, , , fetchAccessTokenFirstTime] =
    useFetch<AccessTokenResponse>(
      "/api/spotify/access-token",
      "POST",
      null,
      false,
      authorizationCodeResponse
    );

  const [refreshTokenResponse, , , fetchRefreshToken] =
    useFetch<RefreshTokenResponse>(
      "/api/spotify/refresh-token",
      "POST",
      null,
      false,
      {
        refresh_token: refreshToken,
      }
    );

  useEffect(() => {
    if (authorizationCodeResponse) {
      fetchAccessTokenFirstTime();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizationCodeResponse]);

  useEffect(() => {
    setAccessToken(firstTimeAccessToken?.access_token ?? null);
    setRefreshToken(firstTimeAccessToken?.refresh_token ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstTimeAccessToken]);

  useEffect(() => {
    if (refreshToken) {
      fetchRefreshToken().then((res) => setAccessToken(res?.access_token!));
    }
    const id = setInterval(() => {
      console.log("Refreshed");
      fetchRefreshToken().then((res) => setAccessToken(res?.access_token!));
    }, 55 * 60 * 1000);

    return clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateLogger(accessToken, "access-token");
  return (
    <AuthData.Provider
      value={{
        setAuthorizationCodeResponse,
        accessToken,
      }}
    >
      {children}
    </AuthData.Provider>
  );
};

export const useAuthData = () => useContext(AuthData);
