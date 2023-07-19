import { useFetch } from "@/hooks/useFetch";
import { SavedYoutubeId, YoutubeSearchResult } from "@/types/youtube";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Item } from "@/types/tracks";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export const YoutubePlayer = ({
  currentItem,
  setCurrentPlayingItemIndex,
  isPlaying,
  itemsLength,
  shuffle,
  loop,
  volume,
  setIsPlaying,
}: {
  currentItem: Item;
  setCurrentPlayingItemIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isPlaying: boolean;
  itemsLength: number;
  shuffle: boolean;
  loop: boolean;
  volume: number;
}) => {
  const params = new URLSearchParams();

  const searchQuery: string = [
    currentItem.track.name,
    currentItem.track.artists.map((artist) => artist.name).join(", "),
    "official video",
  ].join(", ");

  params.append("q", searchQuery);

  const [, isFetching, errors, fetchFunction] = useFetch<YoutubeSearchResult>(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&${params}&key=${apiKey}&maxResults=1`,
    "GET",
    null,
    false,
    null
  );

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
    <div className="show flex-1 flex flex-col">
      {isFetching ? (
        "Loading..."
      ) : errors ? (
        "An error occurred :("
      ) : (
        <div className="mx-auto show">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${savedYoutubeInfo?.videoId}`}
            onEnded={() => {
              if (shuffle) {
                const randomIndex = Math.floor(Math.random() * itemsLength);
                setCurrentPlayingItemIndex(randomIndex);
              } else {
                setCurrentPlayingItemIndex((prev) => prev + 1);
              }
            }}
            config={{
              playerVars: { autoplay: 1 },
            }}
            playing={isPlaying}
            loop={loop}
            volume={volume}
            onStart={() => setIsPlaying(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            // width={550}
            // height={(550 * 9) / 16}
          />
          <p className="show mt-5">{savedYoutubeInfo?.channelTitle}</p>
          <p className="show">{savedYoutubeInfo?.description}</p>
          <p className="show">{savedYoutubeInfo?.title}</p>
        </div>
      )}
    </div>
  );
};

const saveSearchResult = (id: string, data: SavedYoutubeId) => {
  setDoc(doc(db, "YoutubeSearchResults", id), data, {
    merge: true,
  }).then(() => console.log("Successfully saved the search result"));
};
