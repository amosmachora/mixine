"use client";

import { Playlist, PlaylistPayload } from "@/types/playlists";
import React, { createContext, useContext, useState } from "react";
import { toast, Id } from "react-toastify";

const GlobalData = createContext<{
  playlists: Playlist[] | null;
  setPlaylistPayload: React.Dispatch<
    React.SetStateAction<PlaylistPayload | null>
  >;
  setCurrentPlaylist: React.Dispatch<React.SetStateAction<Playlist | null>>;
  currentPlaylist: Playlist | null;
  notify: ((message: string) => Id) | (() => void);
}>({
  playlists: null,
  setPlaylistPayload: () => {},
  currentPlaylist: null,
  setCurrentPlaylist: () => {},
  notify: () => {},
});

export const GlobalDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [playlistPayload, setPlaylistPayload] =
    useState<PlaylistPayload | null>(null);

  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);

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

  return (
    <GlobalData.Provider
      value={{
        playlists: playlistPayload?.items ?? null,
        setPlaylistPayload,
        currentPlaylist,
        setCurrentPlaylist,
        notify,
      }}
    >
      {children}
    </GlobalData.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalData);
