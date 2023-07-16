"use client";

import {
  AccessTokenResponse,
  AuthorizationCodeResponse,
  Playlist,
  PlaylistPayload,
} from "@/types/types";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useUpdateLogger } from "./useUpdateLogger";

const GlobalData = createContext<{
  setAuthorizationCodeResponse: React.Dispatch<
    React.SetStateAction<AuthorizationCodeResponse | null>
  >;
  playlists: Playlist[] | null;
  accessToken: string | null;
}>({
  setAuthorizationCodeResponse: () => {},
  playlists: null,
  accessToken: null,
});

export const GlobalDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authorizationCodeResponse, setAuthorizationCodeResponse] =
    useState<AuthorizationCodeResponse | null>(null);

  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    null,
    "accessToken"
  );

  const [playlistPayLoad, setPlaylistPayLoad] =
    useState<PlaylistPayload | null>(null);

  useEffect(() => {
    if (authorizationCodeResponse) {
      axios
        .post("/api/spotify/access-token", authorizationCodeResponse)
        .then((res) => {
          const accessTokenResponse: AccessTokenResponse = res.data;
          setAccessToken(accessTokenResponse.access_token);

          // for automatically refetching of the access token
          const id = setInterval(() => {
            axios
              .post("/api/spotify/refresh-token", {
                refreshToken: accessTokenResponse.refresh_token,
              })
              .then((res) => setAccessToken(res.data.access_token));
          }, (accessTokenResponse.expires_in - 5 * 60) * 1000);

          return clearInterval(id);
        })
        .catch((err) => console.log(err));
    }
  }, [authorizationCodeResponse, setAccessToken]);

  useEffect(() => {
    if (accessToken) {
      axios
        .get("api/spotify/playlists", {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((res) => setPlaylistPayLoad(res.data))
        .catch((err) => console.log(err));
    }
  }, [accessToken]);

  return (
    <GlobalData.Provider
      value={{
        setAuthorizationCodeResponse,
        playlists: playlistPayLoad?.items ?? null,
        accessToken,
      }}
    >
      {children}
    </GlobalData.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalData);
