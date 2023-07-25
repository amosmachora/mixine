import { useUpdateLogger } from "@/hooks/useUpdateLogger";
import { Playlist } from "@/types/playlists";
import { Item, Track } from "@/types/tracks";
import { PlayerState } from "@/types/types";
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
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ControlsButtons } from "./ControlsButtons";

export const Controls = ({
  playlist,
  item,
  playerState,
  goToNextSong,
  goToPreviousSong,
  setPlayerState,
  pause,
  play,
}: {
  playlist: Playlist | null;
  item: Item | null;
  playerState: PlayerState;
  goToNextSong: () => void;
  goToPreviousSong: () => void;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  play: () => void;
  pause: () => void;
}) => {
  return (
    <div className="show flex justify-between py-4 items-center bg-black text-white px-[2%] h-[15vh] md:h-[12vh] flex-wrap z-50 relative">
      <ControlsButtons
        className="md:absolute md:-translate-x-1/2 md:left-1/2 w-full md:w-1/3 show px-5 md:px-0"
        goToNextSong={goToNextSong}
        goToPreviousSong={goToPreviousSong}
        item={item}
        pause={pause}
        play={play}
        playerState={playerState}
        setPlayerState={setPlayerState}
      />
      <div className="flex items-center show w-1/2 md:w-auto">
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
            src={playlist?.images[0].url ?? ""}
            height={640}
            width={640}
            alt={playlist?.name!}
            className="h-10 w-10"
          />
        )}
        <div className="ml-4 truncate">
          <p className="text-sm">{item?.track.name}</p>
          <p className="text-xs">
            {item?.track.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>
      <div className="flex items-center show">
        {playerState.volume <= 0 ? (
          <FontAwesomeIcon icon={faVolumeXmark} />
        ) : playerState.volume <= 0.5 ? (
          <FontAwesomeIcon icon={faVolumeLow} />
        ) : (
          <FontAwesomeIcon icon={faVolumeHigh} />
        )}
        <input
          className="w-20 h-1 bg-white rounded-full ml-1 cursor-pointer"
          type="range"
          onChange={(e) =>
            setPlayerState((prev) => {
              return {
                ...prev,
                volume: parseInt(e.target.value) / 100,
              };
            })
          }
        />
      </div>
    </div>
  );
};
