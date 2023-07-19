"use client";

import { Controls } from "@/components/Controls";
import { HorizontalTrack } from "@/components/HorizontalTrack";
import { PlaylistBanner } from "@/components/PlaylistBanner";
import { YoutubePlayer } from "@/components/YoutubePlayer";
import { useAuthData } from "@/hooks/useAuthData";
import { useFetch } from "@/hooks/useFetch";
import { useGlobalData } from "@/hooks/useGlobalData";
import { useUpdateLogger } from "@/hooks/useUpdateLogger";
import { Playlist } from "@/types/playlists";
import { Item, TracksPayload } from "@/types/tracks";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VerticalBar } from "./VerticalBar";

const Page = () => {
  const pathname = usePathname();
  const { playlists } = useGlobalData();
  const { accessToken } = useAuthData();

  const playlist: Playlist = playlists?.find(
    (playlist) => playlist.id === pathname.replace("/", "")
  )!;

  const [tracksPayload, isFetching, errors] = useFetch<TracksPayload>(
    playlist.tracks.href,
    "GET",
    {
      Authorization: `Bearer ${accessToken}`,
    },
    true,
    null
  );

  const [currentPlayingItemIndex, setCurrentPlayingItemIndex] = useState(0);
  const [currentPlayingItem, setCurrentPlayingItem] = useState<Item | null>(
    null
  );
  // state of the player
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [loop, setLoop] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (currentPlayingItemIndex) {
      setCurrentPlayingItem(
        tracksPayload?.items[currentPlayingItemIndex] ?? null
      );
      setIsPlaying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayingItemIndex]);

  const goToNextSong = () => {
    if (shuffle) {
      const randomIndex = Math.floor(
        Math.random() * tracksPayload!.items.length
      );
      setCurrentPlayingItemIndex(randomIndex);
    } else {
      setCurrentPlayingItemIndex((prev) => ++prev);
    }
  };

  const goToPreviousSong = () => {
    if (shuffle) {
      const randomIndex = Math.floor(
        Math.random() * tracksPayload!.items.length
      );
      setCurrentPlayingItemIndex(randomIndex);
    } else {
      setCurrentPlayingItemIndex((prev) => --prev);
    }
  };

  const handleStartPlaying = () => {
    if (currentPlayingItem) {
      setIsPlaying(true);
    } else {
      setIsPlaying(true);
      setCurrentPlayingItem(tracksPayload?.items[0] ?? null);
    }
  };
  return (
    <div className="flex w-screen h-screen overflow-x-hidden relative">
      <VerticalBar />
      {isFetching
        ? "loading..."
        : errors
        ? "An error occurred :("
        : currentPlayingItem && (
            <YoutubePlayer
              currentItem={currentPlayingItem!}
              setCurrentPlayingItemIndex={setCurrentPlayingItemIndex}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              shuffle={shuffle}
              itemsLength={tracksPayload?.items.length!}
              loop={loop}
              volume={volume}
            />
          )}

      <div className={`show h-screen flex flex-col flex-1`}>
        <PlaylistBanner
          description={playlist.description}
          image={playlist.images[0]}
          name={playlist.name}
          handleStartPlaying={handleStartPlaying}
        />
        {isFetching ? (
          "loading..."
        ) : errors ? (
          "An error occurred :("
        ) : (
          <div className="mt-10 show w-full overflow-auto">
            {tracksPayload?.items.map((item, i) => (
              <HorizontalTrack
                i={i}
                item={item}
                key={i}
                currentPlayingItem={currentPlayingItem}
                setIsPlaying={setIsPlaying}
                items={tracksPayload.items}
                setCurrentPlayingItemIndex={setCurrentPlayingItemIndex}
              />
            ))}
          </div>
        )}
      </div>
      <Controls
        playlist={playlist}
        item={currentPlayingItem}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        goToNextSong={goToNextSong}
        goToPreviousSong={goToPreviousSong}
        handleStartPlaying={handleStartPlaying}
        setShuffle={setShuffle}
        shuffle={shuffle}
        loop={loop}
        volume={volume}
        setLoop={setLoop}
        setVolume={setVolume}
      />
    </div>
  );
};

export default Page;
