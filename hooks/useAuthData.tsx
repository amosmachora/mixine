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

  const [, , , fetchAccessTokenFirstTime] = useFetch<AccessTokenResponse>(
    "/api/spotify/access-token",
    "POST",
    null,
    false,
    authorizationCodeResponse
  );

  const [, , , fetchRefreshToken] = useFetch<RefreshTokenResponse>(
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
      fetchAccessTokenFirstTime().then((res) => {
        setAccessToken(res?.access_token!);
        setRefreshToken(res?.refresh_token!);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizationCodeResponse]);

  useEffect(() => {
    if (refreshToken) {
      fetchRefreshToken().then((res) => setAccessToken(res?.access_token!));
    }
    const id = setInterval(() => {
      console.log("Refreshed");
      fetchRefreshToken().then((res) => setAccessToken(res?.access_token!));
    }, 3600 * 1000);

    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
