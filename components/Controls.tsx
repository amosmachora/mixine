import { useUpdateLogger } from "@/hooks/useUpdateLogger";
import { Playlist } from "@/types/playlists";
import { Item, Track } from "@/types/tracks";
import { formatDuration } from "@/util/functions";
import {
  faShuffle,
  faBackwardStep,
  faCirclePlay,
  faForwardStep,
  faRepeat,
  faVolumeLow,
  faCirclePause,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const Controls = ({
  playlist,
  item,
  isPlaying,
  shuffle,
  loop,
  volume,
  setLoop,
  setIsPlaying,
  goToNextSong,
  goToPreviousSong,
  handleStartPlaying,
  setShuffle,
  setVolume,
}: {
  playlist: Playlist;
  item: Item | null;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isPlaying: boolean;
  goToNextSong: () => void;
  goToPreviousSong: () => void;
  handleStartPlaying: () => void;
  setShuffle: React.Dispatch<React.SetStateAction<boolean>>;
  shuffle: boolean;
  loop: boolean;
  volume: number;
  setLoop: React.Dispatch<React.SetStateAction<boolean>>;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (isPlaying) {
        setCurrentProgress((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [isPlaying]);

  useEffect(() => {
    setCurrentProgress(0);
  }, [item]);
  return (
    <div className="show flex justify-between py-4 items-center bg-black text-white px-[2%] h-[12vh]">
      <div className="flex items-center">
        {item ? (
          <Image
            src={item?.track.album.images[0].url}
            height={640}
            width={640}
            alt={item?.track.name!}
            className="h-10 w-10"
          />
        ) : (
          <Image
            src={playlist.images[0].url!}
            height={640}
            width={640}
            alt={playlist?.name!}
            className="h-10 w-10"
          />
        )}
        <div className="ml-4">
          <p className="text-sm">{item?.track.name}</p>
          <p className="text-xs">
            {item?.track.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>
      <div className="absolute -translate-x-1/2 left-1/2 w-1/3 show">
        <div className="flex items-center gap-x-7 mx-auto show w-max mb-3">
          <FontAwesomeIcon
            icon={faShuffle}
            onClick={() => setShuffle((prev) => !prev)}
            className={`${shuffle ? "text-green-500" : ""} cursor-pointer`}
          />
          <FontAwesomeIcon
            icon={faBackwardStep}
            onClick={goToPreviousSong}
            className="cursor-pointer"
          />
          {isPlaying ? (
            <FontAwesomeIcon
              icon={faCirclePause}
              className="h-7 cursor-pointer"
              onClick={() => setIsPlaying(false)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCirclePlay}
              className="h-7 cursor-pointer"
              onClick={handleStartPlaying}
            />
          )}
          <FontAwesomeIcon
            icon={faForwardStep}
            onClick={goToNextSong}
            className="cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faRepeat}
            onClick={() => setLoop((prev) => !prev)}
            className={`${loop ? "text-green-500" : ""} cursor-pointer`}
          />
        </div>
        <div className="text-xs flex w-full justify-between show items-center">
          <p className="mr-2">{0.0}</p>
          <input
            type="range"
            className="bg-white h-1 flex-1 rounded-full custom-range"
            value={currentProgress}
            min={0}
            max={item?.track.duration_ms ?? 0 / 1000}
          />
          <p className="ml-2">{formatDuration(item?.track.duration_ms!)}</p>
        </div>
      </div>
      <div className="flex items-center">
        {volume <= 0 ? (
          <FontAwesomeIcon icon={faVolumeXmark} />
        ) : volume <= 0.5 ? (
          <FontAwesomeIcon icon={faVolumeLow} />
        ) : (
          <FontAwesomeIcon icon={faVolumeHigh} />
        )}
        <input
          className="w-20 h-1 bg-white rounded-full ml-1 cursor-pointer"
          type="range"
          onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
        />
      </div>
    </div>
  );
};
