"use client";

import { Playlist, PlaylistPayload } from "@/types/playlists";
import React, { createContext, useContext, useState } from "react";

const GlobalData = createContext<{
  playlists: Playlist[] | null;
  setPlaylistPayload: React.Dispatch<
    React.SetStateAction<PlaylistPayload | null>
  >;
}>({
  playlists: null,
  setPlaylistPayload: () => {},
});

export const GlobalDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [playlistPayload, setPlaylistPayload] =
    useState<PlaylistPayload | null>(null);

  return (
    <GlobalData.Provider
      value={{
        playlists: playlistPayload?.items ?? null,
        setPlaylistPayload,
      }}
    >
      {children}
    </GlobalData.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalData);
