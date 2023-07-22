"use client";

import { Controls } from "@/components/Controls";
import { HorizontalTrack } from "@/components/HorizontalTrack";
import { PlaylistBanner } from "@/components/PlaylistBanner";
import { Skeleton } from "@/components/ui/skeleton";
import { YoutubePlayer } from "@/components/YoutubePlayer";
import { YoutubePlayerSkeleton } from "@/components/YoutubePlayerSkeleton";
import { useAuthData } from "@/hooks/useAuthData";
import { useFetch } from "@/hooks/useFetch";
import { useGlobalData } from "@/hooks/useGlobalData";
import { useUpdateLogger } from "@/hooks/useUpdateLogger";
import { Item, TracksPayload } from "@/types/tracks";
import { PlayerState } from "@/types/types";
import React, { useEffect, useState } from "react";
import { VerticalBar } from "./VerticalBar";

const Page = () => {
  const { currentPlaylist } = useGlobalData();
  const { accessToken } = useAuthData();

  const [tracksPayload, isFetching, errors] = useFetch<TracksPayload>({
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
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    loop: false,
    shuffle: false,
    volume: 0.5,
  });

  useEffect(() => {
    if (tracksPayload) {
      setCurrentPlayingItem(tracksPayload.items[0]);
    }
  }, [tracksPayload]);

  useEffect(() => {
    if (currentPlayingItemIndex) {
      setCurrentPlayingItem(
        tracksPayload?.items[currentPlayingItemIndex] ?? null
      );
      setPlayerState((prev) => {
        return {
          ...prev,
          isPlaying: true,
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayingItemIndex]);

  const play = () => {
    if (currentPlayingItem) {
      setPlayerState((prev) => {
        return {
          ...prev,
          isPlaying: true,
        };
      });
    } else {
      setCurrentPlayingItem(tracksPayload?.items[0] ?? null);
      setPlayerState((prev) => {
        return {
          ...prev,
          isPlaying: true,
        };
      });
    }
  };

  const pause = () => {
    setPlayerState((prev) => {
      return {
        ...prev,
        isPlaying: false,
      };
    });
  };

  const goToNextSong = () => {
    if (playerState.shuffle) {
      const randomIndex = Math.floor(
        Math.random() * tracksPayload!.items.length
      );
      setCurrentPlayingItemIndex(randomIndex);
    } else {
      setCurrentPlayingItemIndex((prev) => ++prev);
    }
  };

  const goToPreviousSong = () => {
    if (playerState.shuffle) {
      const randomIndex = Math.floor(
        Math.random() * tracksPayload!.items.length
      );
      setCurrentPlayingItemIndex(randomIndex);
    } else {
      setCurrentPlayingItemIndex((prev) => --prev);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex show bg-gray-200 h-[88vh]">
        <VerticalBar />
        <div className="w-1/2">
          {isFetching ? (
            <YoutubePlayerSkeleton />
          ) : (
            currentPlayingItem && (
              <YoutubePlayer
                currentItem={currentPlayingItem!}
                playerState={playerState}
                play={play}
                pause={pause}
                goToNextSong={goToNextSong}
              />
            )
          )}
        </div>
        <div className="w-5/12 flex-1 show flex flex-col flex-grow">
          <PlaylistBanner
            description={currentPlaylist!.description}
            image={currentPlaylist!.images[0]}
            name={currentPlaylist!.name}
          />
          <div className="flex-grow overflow-y-scroll">
            {isFetching
              ? Array.from({ length: 12 }, (_, i) => i + 1).map((i) => (
                  <div
                    className="flex justify-between items-center my-3"
                    key={i}
                  >
                    <div className="flex items-center">
                      <Skeleton className="h-2 w-2 mx-2" />
                      <Skeleton className="w-10 h-10 mr-5 rounded" />
                    </div>
                    <div className="w-1/4">
                      <Skeleton className="h-2 w-full mb-2" />
                      <Skeleton className="h-2 w-full" />
                    </div>
                    <Skeleton className="h-2 w-1/4" />
                    <Skeleton className="h-2 w-5" />
                  </div>
                ))
              : tracksPayload?.items.map((item, i) => (
                  <HorizontalTrack
                    i={i}
                    item={item}
                    key={i}
                    currentPlayingItem={currentPlayingItem}
                    setPlayerState={setPlayerState}
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
        goToNextSong={goToNextSong}
        goToPreviousSong={goToPreviousSong}
        play={play}
        playerState={playerState}
        setPlayerState={setPlayerState}
        pause={pause}
      />
    </div>
  );
};

export default Page;
