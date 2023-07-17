"use client";

import { HorizontalTrack } from "@/components/HorizontalTrack";
import { PlaylistBanner } from "@/components/PlaylistBanner";
import { YoutubePlayer } from "@/components/YoutubePlayer";
import { useFetch } from "@/hooks/useFetch";
import { useGlobalData } from "@/hooks/useGlobalData";
import { Item, TracksPayload } from "@/types/tracks";
import { Playlist } from "@/types/types";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
    },
    true
  );

  const [currentPlayingItemIndex, setCurrentPlayingItemIndex] = useState(0);

  const [currentPlayingItem, setCurrentPlayingItem] = useState<Item | null>(
    null
  );

  useEffect(() => {
    if (currentPlayingItemIndex) {
      setCurrentPlayingItem(data?.items[currentPlayingItemIndex] ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayingItemIndex]);

  return (
    <div className="flex">
      <VerticalBar />
      {currentPlayingItem && (
        <YoutubePlayer
          currentItem={currentPlayingItem}
          setCurrentPlayingTrackIndex={setCurrentPlayingItemIndex}
        />
      )}
      <div className="flex-1 show h-screen flex flex-col">
        <PlaylistBanner
          description={playlist.description}
          image={playlist.images[0]}
          name={playlist.name}
          handleStartPlaying={() =>
            setCurrentPlayingItem(data?.items[0] ?? null)
          }
        />
        {isFetching ? (
          "loading..."
        ) : errors ? (
          "An error occurred :("
        ) : (
          <div className="mt-10 show flex-1 overflow-auto">
            {data?.items.map((item, i) => (
              <HorizontalTrack
                i={i}
                item={item}
                key={i}
                currentPlayingItem={currentPlayingItem}
                setCurrentPlayingItem={setCurrentPlayingItem}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
