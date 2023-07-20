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

  const [, , , fetchAccessTokenFirstTime] = useFetch<AccessTokenResponse>({
    body: authorizationCodeResponse,
    fetchOnMount: false,
    headers: null,
    method: "POST",
    saveAble: false,
    url: "/api/spotify/access-token",
  });

  const [, , , fetchRefreshToken] = useFetch<RefreshTokenResponse>({
    url: "/api/spotify/refresh-token",
    method: "POST",
    body: {
      refresh_token: refreshToken,
    },
    fetchOnMount: false,
    headers: null,
    saveAble: false,
  });

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
