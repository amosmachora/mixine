"use client";

import { Controls } from "@/components/Controls";
import { HorizontalTrack } from "@/components/HorizontalTrack";
import { PlaylistBanner } from "@/components/PlaylistBanner";
import { TracksSkeleton } from "@/components/TracksSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { YoutubePlayer } from "@/components/YoutubePlayer";
import { YoutubePlayerSkeleton } from "@/components/YoutubePlayerSkeleton";
import { useAuthData } from "@/hooks/useAuthData";
import { useFetch } from "@/hooks/useFetch";
import { useGlobalData } from "@/hooks/useGlobalData";
import { useUpdateLogger } from "@/hooks/useUpdateLogger";
import { Playlist } from "@/types/playlists";
import { Item, TracksPayload } from "@/types/tracks";
import { PlayerState } from "@/types/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VerticalBar } from "./VerticalBar";

const Page = () => {
  //local hooks
  const {
    personalPlaylists,
    featuredPlaylists,
    fetchFeaturedPlaylists,
    fetchPersonalPlaylists,
  } = useGlobalData();
  const { accessToken } = useAuthData();

  //navigation hooks
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get("src");
  const playlistId = pathName.replace("/", "");

  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);

  //fetch hook
  const [tracksPayload, isFetching, , fetchTracks] = useFetch<TracksPayload>({
    body: null,
    fetchOnMount: false,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: "GET",
    saveAble: true,
    url: currentPlaylist?.tracks.href ?? "",
  });

  const [currentPlayingItemIndex, setCurrentPlayingItemIndex] = useState(0);
  const [currentPlayingItem, setCurrentPlayingItem] = useState<Item | null>(
    tracksPayload?.items[0] ?? null
  );
  // state of the player
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    loop: false,
    shuffle: false,
    volume: 0.5,
  });

  useEffect(() => {
    const init = async () => {
      if (type === "featured") {
        if (!featuredPlaylists) {
          await fetchFeaturedPlaylists();
        }
        const playlist = featuredPlaylists?.playlists.items.find(
          (item) => item.id === playlistId
        );
        setCurrentPlaylist(playlist ?? null);
      } else {
        if (!personalPlaylists) {
          await fetchPersonalPlaylists();
        }
        const playlist = personalPlaylists?.items.find(
          (item) => item.id === playlistId
        );
        setCurrentPlaylist(playlist ?? null);
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentPlaylist) {
      fetchTracks().then((res) => setCurrentPlayingItem(res?.items[0]!));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlaylist]);

  useEffect(() => {
    if (currentPlayingItemIndex !== 0) {
      setCurrentPlayingItem(
        tracksPayload?.items[currentPlayingItemIndex] ?? null
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayingItemIndex]);

  useUpdateLogger(currentPlayingItemIndex, "currentPLayingItemIdx");
  useUpdateLogger(currentPlayingItem, "currentPLayingItem");
  useUpdateLogger(tracksPayload, "tracksPayload");
  useUpdateLogger(currentPlaylist, "currentPlaylist");

  const play = () => {
    setPlayerState((prev) => {
      return {
        ...prev,
        isPlaying: true,
      };
    });
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
    <div className="h-[100dvh] md:h-screen">
      <div className="flex show bg-gray-200 h-[85vh] md:h-[88vh] flex-col md:flex-row">
        <VerticalBar />
        <div className="w-full md:w-1/2">
          {!currentPlayingItem ? (
            <YoutubePlayerSkeleton />
          ) : (
            <YoutubePlayer
              currentItem={currentPlayingItem!}
              playerState={playerState}
              play={play}
              pause={pause}
              goToNextSong={goToNextSong}
            />
          )}
        </div>
        <div className="w-full md:w-5/12 flex-1 show flex flex-col flex-grow">
          <PlaylistBanner
            description={currentPlaylist?.description ?? null}
            image={currentPlaylist?.images[0] ?? null}
            name={currentPlaylist?.name ?? null}
          />
          <div className="flex-grow overflow-y-scroll h-0 md:h-auto">
            {!tracksPayload ? (
              <TracksSkeleton />
            ) : (
              tracksPayload?.items.map((item, i) => (
                <HorizontalTrack
                  i={i}
                  item={item}
                  key={i}
                  currentPlayingItem={currentPlayingItem}
                  items={tracksPayload.items}
                  setCurrentPlayingItemIndex={setCurrentPlayingItemIndex}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <Controls
        playlist={currentPlaylist}
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
