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

const GlobalData = createContext<{
  setAuthorizationCodeResponse: React.Dispatch<
    React.SetStateAction<AuthorizationCodeResponse | null>
  >;
  playlists: Playlist[] | null;
  accessToken: string | null;
  setPlaylistPayload: React.Dispatch<
    React.SetStateAction<PlaylistPayload | null>
  >;
}>({
  setAuthorizationCodeResponse: () => {},
  playlists: null,
  accessToken: null,
  setPlaylistPayload: () => {},
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

  const [playlistPayload, setPlaylistPayload] =
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

  return (
    <GlobalData.Provider
      value={{
        setAuthorizationCodeResponse,
        playlists: playlistPayload?.items ?? null,
        accessToken,
        setPlaylistPayload,
      }}
    >
      {children}
    </GlobalData.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalData);
