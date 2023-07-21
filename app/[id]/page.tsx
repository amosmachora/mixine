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
  const { currentPlaylist } = useGlobalData();
  const { accessToken } = useAuthData();

  const [tracksPayload, isFetching, errors, fetchTracks] =
    useFetch<TracksPayload>({
      body: null,
      fetchOnMount: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
      saveAble: true,
      url: currentPlaylist?.tracks.href ?? "",
    });

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
    <div className="h-screen">
      <div className="flex show bg-green-200 h-[88vh]">
        <VerticalBar />
        <div className="w-1/2">
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
        </div>
        <div className="w-5/12 flex-1 show flex flex-col flex-grow">
          <PlaylistBanner
            description={currentPlaylist!.description}
            image={currentPlaylist!.images[0]}
            name={currentPlaylist!.name}
            handleStartPlaying={handleStartPlaying}
          />
          <div className="flex-grow overflow-y-scroll">
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
        </div>
      </div>
      <Controls
        playlist={currentPlaylist!}
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
