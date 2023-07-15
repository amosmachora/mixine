"use client";

import { HorizontalTrack } from "@/components/HorizontalTrack";
import { PlaylistBanner } from "@/components/PlaylistBanner";
import { useFetch } from "@/hooks/useFetch";
import { useGlobalData } from "@/hooks/useGlobalData";
import { Playlist, TracksPayload } from "@/types/types";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { VerticalBar } from "./VerticalBar";

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

  return playlist ? (
    <div className="flex">
      <VerticalBar />
      <div className="flex-1">
        <PlaylistBanner
          description={playlist.description}
          image={playlistImage}
          name={playlist.name}
        />
        <div className="mt-10">
          {data?.items.map((item, i) => (
            <HorizontalTrack i={i} item={item} key={item.track.id} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    "loading..."
  );
};

export default Page;
