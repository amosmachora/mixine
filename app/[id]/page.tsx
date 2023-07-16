"use client";

import { HorizontalTrack } from "@/components/HorizontalTrack";
import { PlaylistBanner } from "@/components/PlaylistBanner";
import { YoutubePlayer } from "@/components/YoutubePlayer";
import { useFetch } from "@/hooks/useFetch";
import { useGlobalData } from "@/hooks/useGlobalData";
import { Playlist, TracksPayload } from "@/types/types";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { VerticalBar } from "./VerticalBar";

const Page = () => {
  const pathname = usePathname();
  const { playlists, accessToken } = useGlobalData();

  const playlist: Playlist = playlists?.find(
    (playlist) => playlist.id === pathname.replace("/", "")
  )!;

  const { data, errors, isFetching } = useFetch<TracksPayload>(
    playlist.tracks.href,
    "GET",
    {
      Authorization: `Bearer ${accessToken}`,
    }
  );

  const [isPlayingVideos, setIsPlayingVideos] = useState(false);

  return playlist ? (
    <div className="flex">
      <VerticalBar />
      {isPlayingVideos && <YoutubePlayer tracks={data?.items!} />}
      <div className="flex-1">
        <PlaylistBanner
          description={playlist.description}
          image={playlist.images[0]}
          name={playlist.name}
          setIsPlayingVideos={setIsPlayingVideos}
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
