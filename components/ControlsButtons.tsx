import { useUpdateLogger } from "@/hooks/useUpdateLogger";
import { Playlist } from "@/types/playlists";
import { Item } from "@/types/tracks";
import { PlayerState } from "@/types/types";
import { formatDuration, secondsToMinutes } from "@/util/functions";
import {
  faShuffle,
  faBackwardStep,
  faCirclePause,
  faCirclePlay,
  faForwardStep,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

export const ControlsButtons = ({
  item,
  playerState,
  goToNextSong,
  goToPreviousSong,
  setPlayerState,
  pause,
  play,
  className,
}: {
  item: Item | null;
  playerState: PlayerState;
  goToNextSong: () => void;
  goToPreviousSong: () => void;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  play: () => void;
  pause: () => void;
  className: string;
}) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-x-7 mx-auto show w-max mb-3">
        <FontAwesomeIcon
          icon={faShuffle}
          onClick={() =>
            setPlayerState((prev) => {
              return {
                ...prev,
                shuffle: !prev.shuffle,
              };
            })
          }
          className={`${
            playerState.shuffle ? "text-green-500" : ""
          } cursor-pointer`}
        />
        <FontAwesomeIcon
          icon={faBackwardStep}
          onClick={goToPreviousSong}
          className="cursor-pointer"
        />
        {playerState.isPlaying ? (
          <FontAwesomeIcon
            icon={faCirclePause}
            className="h-7 cursor-pointer"
            onClick={pause}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCirclePlay}
            className="h-7 cursor-pointer"
            onClick={play}
          />
        )}
        <FontAwesomeIcon
          icon={faForwardStep}
          onClick={goToNextSong}
          className="cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faRepeat}
          onClick={() =>
            setPlayerState((prev) => {
              return {
                ...prev,
                loop: !prev.loop,
              };
            })
          }
          className={`${
            playerState.loop ? "text-green-500" : ""
          } cursor-pointer`}
        />
      </div>
      <div className="text-xs flex w-full justify-between show items-center">
        <p className="mr-2">
          {secondsToMinutes(
            parseInt(
              (playerState.played * playerState.videoDuration).toFixed(0)
            )
          )}
        </p>
        <input
          type="range"
          className="bg-white h-1 flex-1 rounded-full custom-range"
          value={(playerState.played * 100).toFixed(0)}
          min={0}
          max={100}
        />
        <p className="ml-2">{secondsToMinutes(playerState.videoDuration)}</p>
      </div>
    </div>
  );
};
