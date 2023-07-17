import { useFetch } from "@/hooks/useFetch";
import { SavedYoutubeId, YoutubeSearchResult } from "@/types/youtube";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Item } from "@/types/tracks";
import Image from "next/image";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export const YoutubePlayer = ({
  currentItem,
  setCurrentPlayingTrackIndex,
}: {
  currentItem: Item;
  setCurrentPlayingTrackIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const params = new URLSearchParams();

  const searchQuery: string = [
    currentItem.track.name,
    currentItem.track.artists.map((artist) => artist.name).join(", "),
  ].join(", ");

  params.append("q", searchQuery);

  const { data, errors, fetchFunction, isFetching } =
    useFetch<YoutubeSearchResult>(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&${params}&key=${apiKey}&maxResults=1`,
      "GET",
      null,
      false
    );

  const [youtubeUrl, setYoutubeUrl] = useState(
    `https://www.youtube.com/watch?v=${data?.items[0].id.videoId ?? ""}`
  );

  useEffect(() => {
    const init = async () => {
      const docRef = doc(db, "YoutubeSearchResults", currentItem.track.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const savedData = docSnap.data();
        setYoutubeUrl(`https://www.youtube.com/watch?v=${savedData.videoId}`);
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
        fetchFunction().then((data) => {
          const videoId = data!.items[0].id.videoId;
          setYoutubeUrl(`https://www.youtube.com/watch?v=${videoId}`);
          saveSearchResult(currentItem.track.id, {
            searchQuery,
            videoId,
          });
        });
      }
    };

    init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItem]);

  console.log(data);

  return (
    <div className="show w-1/2 flex flex-col">
      {isFetching ? (
        "Loading..."
      ) : errors ? (
        "An error occurred :("
      ) : (
        <div className="mx-auto show">
          <ReactPlayer
            url={youtubeUrl}
            onEnded={() => {
              setCurrentPlayingTrackIndex((prev) => prev + 1);
            }}
            controls={true}
            config={{
              playerVars: { autoplay: 1 },
            }}
            playing
          />
          <p className="show mt-5">{data?.items[0].snippet.channelTitle}</p>
          <p className="show">{data?.items[0].snippet.description}</p>
          <p className="show">{data?.items[0].snippet.title}</p>
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
