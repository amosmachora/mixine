"use client";

import { Playlist, PlaylistPayload } from "@/types/playlists";
import React, { createContext, useContext, useState } from "react";

const GlobalData = createContext<{
  playlists: Playlist[] | null;
  setPlaylistPayload: React.Dispatch<
    React.SetStateAction<PlaylistPayload | null>
  >;
  setCurrentPlaylist: React.Dispatch<React.SetStateAction<Playlist | null>>;
  currentPlaylist: Playlist | null;
}>({
  playlists: null,
  setPlaylistPayload: () => {},
  currentPlaylist: null,
  setCurrentPlaylist: () => {},
});

export const GlobalDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [playlistPayload, setPlaylistPayload] =
    useState<PlaylistPayload | null>(null);

  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);

  return (
    <GlobalData.Provider
      value={{
        playlists: playlistPayload?.items ?? null,
        setPlaylistPayload,
        currentPlaylist,
        setCurrentPlaylist,
      }}
    >
      {children}
    </GlobalData.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalData);
