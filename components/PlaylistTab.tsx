import { Playlist } from "@/types/playlists";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGlobalData } from "@/hooks/useGlobalData";

export const PlaylistTab = ({ playlist }: { playlist: Playlist }) => {
  const router = useRouter();
  const { setCurrentPlaylist } = useGlobalData();
  return (
    <div
      className="w-1/5 show cursor-pointer"
      onClick={() => setCurrentPlaylist(playlist)}
    >
      <Link href={`/${playlist.id}`}>
        <Image
          src={playlist.images[0].url}
          alt="playlist image"
          width={120}
          height={120}
          className="mx-auto"
        />
        <p className="text-center">{playlist.name}</p>
        {playlist.description && (
          <p className="text-center text-sm">{playlist.description}</p>
        )}
      </Link>
    </div>
  );
};
