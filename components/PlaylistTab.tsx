import { Playlist } from "@/types/playlists";
import React from "react";
import Link from "next/link";
import { useGlobalData } from "@/hooks/useGlobalData";
import { useRouter } from "next/navigation";

export const PlaylistTab = ({ playlist }: { playlist: Playlist }) => {
  const { setCurrentPlaylist } = useGlobalData();
  const router = useRouter();
  return (
    <div
      className="w-1/6 show cursor-pointer bg-gray-900 text-white p-5 rounded hover:bg-gray-800 transition-colors"
      onClick={() => {
        setCurrentPlaylist(playlist);
        router.push(`/${playlist.id}`);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={playlist.images[0].url}
        alt="playlist image"
        className="mx-auto rounded object-cover"
      />
      <p className="text-sm my-4">{playlist.name}</p>
      {playlist.description && (
        <p className="text-xs">{playlist.description}</p>
      )}
    </div>
  );
};
