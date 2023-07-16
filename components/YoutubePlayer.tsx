import { Track, TrackItem } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export const YoutubePlayer = ({ tracks }: { tracks: TrackItem[] }) => {
  const [currentTrack, setCurrentTrack] = useState<TrackItem>(tracks[0]);

  useEffect(() => {
    const params = new URLSearchParams();

    params.append(
      "q",
      [currentTrack.track.name, currentTrack.track.artists.join(", ")].join(
        ", "
      )
    );

    getSearchResults(params)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, [currentTrack]);

  return <div className="show w-1/2">YoutubePlayer</div>;
};

const getSearchResults = async (urlEncodedQ: URLSearchParams) => {
  return await axios
    .get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&${urlEncodedQ}&key=[${apiKey}]`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
