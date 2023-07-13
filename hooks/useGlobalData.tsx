"use client";

import { AccessTokenResponse, AuthorizationCodeResponse } from "@/types/types";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUpdateLogger } from "./useUpdateLogger";

const GlobalData = createContext<{
  setAuthorizationCodeResponse: React.Dispatch<
    React.SetStateAction<AuthorizationCodeResponse | null>
  >;
}>({
  setAuthorizationCodeResponse: () => {},
});

export const GlobalDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authorizationCodeResponse, setAuthorizationCodeResponse] =
    useState<AuthorizationCodeResponse | null>(null);
  const [accessTokenResponse, setAccessTokenResponse] =
    useState<AccessTokenResponse | null>(null);

  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (authorizationCodeResponse) {
      axios
        .post("/api/spotify/access-token", authorizationCodeResponse)
        .then((res) => setAccessTokenResponse(res.data))
        .catch((err) => console.log(err));
    }
  }, [authorizationCodeResponse]);

  useEffect(() => {
    if (accessTokenResponse) {
      setAccessToken(accessTokenResponse.access_token);
      const id = setInterval(() => {
        axios
          .post("/api/spotify/refresh-token", {
            refreshToken: accessTokenResponse.refresh_token,
          })
          .then((res) => setAccessToken(res.data.access_token));
      }, (accessTokenResponse.expires_in - 5 * 60) * 1000);

      return clearInterval(id);
    }
  }, [accessTokenResponse]);

  useUpdateLogger(accessToken, "accessToken");

  return (
    <GlobalData.Provider
      value={{
        setAuthorizationCodeResponse,
      }}
    >
      {children}
    </GlobalData.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalData);
