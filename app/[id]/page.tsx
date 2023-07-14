"use client";

import { HorizontalTrack } from "@/components/HorizontalTrack";
import { useFetch } from "@/hooks/useFetch";
import { useGlobalData } from "@/hooks/useGlobalData";
import { Playlist, TracksPayload } from "@/types/types";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const pathname = usePathname();
  const { playlists, accessToken } = useGlobalData();

  const playlist: Playlist = playlists?.find(
    (playlist) => playlist.id === pathname.replace("/", "")
  )!;

  const playlistImage = playlist?.images[0];

  const { data, errors, isFetching } = useFetch<TracksPayload>(
    playlist.tracks.href,
    "GET",
    {
      Authorization: `Bearer ${accessToken}`,
    }
  );

  console.log(data);

  return playlist ? (
    <div>
      <div className="flex items-end">
        <Image
          src={playlistImage!.url}
          alt={playlist.name}
          height={playlistImage!.height ?? 640}
          width={playlistImage!.width ?? 640}
          className="h-[120px] w-[120px]"
        />
        <div>
          <p>{playlist.name}</p>
          {playlist.description && <p>{playlist.description}</p>}
        </div>
      </div>
      <div className="mt-10">
        {data?.items.map((item, i) => (
          <HorizontalTrack i={i} item={item} key={item.track.id} />
        ))}
      </div>
    </div>
  ) : (
    "loading..."
  );
};

export default Page;
