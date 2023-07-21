import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

export const PlaySection = ({
  preview_url,
  songNo,
  isHovered,
}: {
  preview_url: null | string;
  songNo: number;
  isHovered: boolean;
}) => {
  const [noPreviewUrlError, setNoPreviewUrlError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(
    new Audio(preview_url ?? undefined)
  );
  const audio: HTMLAudioElement = audioRef.current;

  const handleAudioEnded = () => setIsPlaying(false);
  audio.addEventListener("ended", handleAudioEnded);

  useEffect(() => {
    return () => {
      audio.removeEventListener("ended", handleAudioEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      {isPlaying ? (
        <FontAwesomeIcon
          icon={faPause}
          onClick={() => {
            audio.pause();
            setIsPlaying(false);
          }}
          className="mx-2 w-4 cursor-pointer"
        />
      ) : isHovered && !isPlaying ? (
        <FontAwesomeIcon
          icon={faPlay}
          className="mx-2 w-4 cursor-pointer"
          onClick={() => {
            if (preview_url) {
              audio.play();
              setIsPlaying(true);
            } else {
              setNoPreviewUrlError(true);
            }
          }}
          onMouseLeave={() => setNoPreviewUrlError(false)}
        />
      ) : (
        <p className="mx-2 w-4">{songNo}</p>
      )}
      {noPreviewUrlError && (
        <p className="absolute top-0 translate-y-full">
          No preview URL available.
        </p>
      )}
    </div>
  );
};
