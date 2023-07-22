import { useFetch } from "@/hooks/useFetch";
import { SavedYoutubeId, YoutubeSearchResult } from "@/types/youtube";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { doc, getDoc } from "firebase/firestore";
import { db, saveSearchResult } from "@/firebase/firebase";
import { Item } from "@/types/tracks";
import { PlayerState } from "@/types/types";
import { Skeleton } from "./ui/skeleton";
import { YoutubePlayerSkeleton } from "./YoutubePlayerSkeleton";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export const YoutubePlayer = ({
  currentItem,
  playerState,
  play,
  pause,
  goToNextSong,
}: {
  currentItem: Item;
  playerState: PlayerState;
  play: () => void;
  pause: () => void;
  goToNextSong: () => void;
}) => {
  const params = new URLSearchParams();

  const searchQuery: string = [
    currentItem.track.name,
    currentItem.track.artists.map((artist) => artist.name).join(", "),
    "official video",
  ].join(", ");

  params.append("q", searchQuery);

  const [, isFetching, , fetchFunction] = useFetch<YoutubeSearchResult>({
    body: null,
    fetchOnMount: false,
    headers: null,
    method: "GET",
    saveAble: false,
    url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&${params}&key=${apiKey}&maxResults=1`,
  });

  const [savedYoutubeInfo, setSavedYoutubeInfo] =
    useState<SavedYoutubeId | null>(null);

  useEffect(() => {
    const init = async () => {
      const docRef = doc(db, "YoutubeSearchResults", currentItem.track.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const savedData: SavedYoutubeId = docSnap.data() as SavedYoutubeId;
        setSavedYoutubeInfo(savedData);
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
        fetchFunction().then((data) => {
          const videoId = data!.items[0].id.videoId;
          const searchResultForSaving: SavedYoutubeId = {
            searchQuery,
            videoId,
            channelTitle: data?.items[0].snippet.channelTitle!,
            description: data?.items[0].snippet.description!,
            title: data?.items[0].snippet.title!,
          };
          setSavedYoutubeInfo(searchResultForSaving);
          saveSearchResult(currentItem.track.id, searchResultForSaving);
        });
      }
    };

    init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItem]);

  return (
    <div className="show flex-1 flex flex-col items-center pt-5">
      {isFetching ? (
        <YoutubePlayerSkeleton />
      ) : (
        <>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${savedYoutubeInfo?.videoId}`}
            onEnded={goToNextSong}
            config={{
              playerVars: { autoplay: 1 },
            }}
            playing={playerState.isPlaying}
            {...playerState}
            onStart={play}
            onPlay={play}
            onPause={pause}
          />
          <div className="mx-auto">
            <p className="show mt-5 font-semibold">{savedYoutubeInfo?.title}</p>
            <p className="show font-medium mt-6">
              {savedYoutubeInfo?.channelTitle}
            </p>
            <p className="show bg-gray-100 rounded p-2">
              {savedYoutubeInfo?.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
