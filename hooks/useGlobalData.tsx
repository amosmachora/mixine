"use client";

import { FeaturedPlaylists } from "@/types/featuredplaylists";
import { Playlist, PlaylistPayload } from "@/types/playlists";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast, Id } from "react-toastify";
import { useAuthData } from "./useAuthData";
import { useFetch } from "./useFetch";

const GlobalData = createContext<{
  personalPlaylists: PlaylistPayload | null;
  notify: ((message: string) => Id) | (() => void);
  isFetchingPersonalPlaylists: boolean;
  featuredPlaylists: FeaturedPlaylists | null;
  isFetchingFeaturedPlaylists: boolean;
  fetchFeaturedPlaylists: () => Promise<FeaturedPlaylists | null>;
  fetchPersonalPlaylists: () => Promise<PlaylistPayload | null>;
}>({
  personalPlaylists: null,
  notify: () => {},
  isFetchingPersonalPlaylists: false,
  featuredPlaylists: null,
  isFetchingFeaturedPlaylists: false,
  fetchFeaturedPlaylists: () => Promise.resolve<FeaturedPlaylists | null>(null),
  fetchPersonalPlaylists: () => Promise.resolve<PlaylistPayload | null>(null),
});

export const GlobalDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { accessToken } = useAuthData();

  const [
    personalPlaylists,
    isFetchingPersonalPlaylists,
    personalPlaylistsError,
    fetchPersonalPlaylists,
  ] = useFetch<PlaylistPayload>({
    body: null,
    fetchOnMount: false,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: "GET",
    saveAble: true,
    url: "https://api.spotify.com/v1/me/playlists",
  });

  const [
    featuredPlaylists,
    isFetchingFeaturedPlaylists,
    featuredPlaylistsError,
    fetchFeaturedPlaylists,
  ] = useFetch<FeaturedPlaylists>({
    url: "https://api.spotify.com/v1/browse/featured-playlists",
    method: "GET",
    body: null,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    fetchOnMount: false,
    saveAble: true,
  });

  const notify = (message: string) =>
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    if (accessToken) {
      if (!personalPlaylists) {
        fetchPersonalPlaylists();
      }

      if (!featuredPlaylists) {
        fetchFeaturedPlaylists();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <GlobalData.Provider
      value={{
        personalPlaylists,
        isFetchingFeaturedPlaylists,
        featuredPlaylists,
        notify,
        isFetchingPersonalPlaylists,
        fetchFeaturedPlaylists,
        fetchPersonalPlaylists,
      }}
    >
      {children}
    </GlobalData.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalData);
