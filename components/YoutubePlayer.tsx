import { useFetch } from "@/hooks/useFetch";
import { Item } from "@/types/types";
import { YoutubeSearchResult } from "@/types/youtube";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";

const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export const YoutubePlayer = ({
  currentItem,
  setCurrentPlayingTrackIndex,
}: {
  currentItem: Item;
  setCurrentPlayingTrackIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const params = new URLSearchParams();

  const artists = [];
  for (let i = 0; i < currentItem.track.artists.length; i++) {
    const artist = currentItem.track.artists[i];
    artists.push(artist.name);
  }

  params.append("q", [currentItem.track.name, artists.join(", ")].join(", "));
  const { data, errors, fetchFunction, isFetching } =
    useFetch<YoutubeSearchResult>(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&${params}&key=${apiKey}`,
      "GET",
      null
    );

  const [currentYoutubeVideoId, setCurrentYoutubeVideoId] = useState<
    string | null
  >(data?.items[0].id.videoId ?? null);

  useEffect(() => {
    //TODO save data to avoid refetching
    fetchFunction().then((data) =>
      setCurrentYoutubeVideoId(data?.items[0].id.videoId ?? null)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItem]);

  return (
    <div className="show w-1/2">
      {isFetching ? (
        "Loading..."
      ) : errors ? (
        "An error occurred :("
      ) : (
        <div className="mx-auto">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${currentYoutubeVideoId}`}
            onEnded={() => {
              setCurrentPlayingTrackIndex((prev) => prev + 1);
            }}
          />
        </div>
      )}
    </div>
  );
};
