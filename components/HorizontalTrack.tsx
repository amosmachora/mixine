"use client";

import { TrackItem } from "@/types/types";
import React, { useState } from "react";
import Image from "next/image";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const HorizontalTrack = ({
  item,
  i,
}: {
  item: TrackItem;
  i: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="flex justify-between px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center w-1/3">
        {isHovered ? (
          <FontAwesomeIcon icon={faPlay} className="mr-2 w-4 cursor-pointer" />
        ) : (
          <p className="mr-2 w-4">{i + 1}</p>
        )}
        <Image
          src={item.track.album.images[0].url}
          height={640}
          width={640}
          alt={item.track.album.name}
          className="w-10 h-10 object-cover mr-5"
        />
        <div>
          <p>{item.track.name}</p>
          <div className="flex items-center">
            {item.track.artists.map((artist, index) => (
              <>
                <p key={artist.id} className="text-sm">
                  {artist.name}
                </p>
                {index !== item.track.artists.length - 1 && (
                  <span className="mr-1">,</span>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
      <p className="w-1/3">{item.track.album.name}</p>
      <p>{formatDuration(item.track.duration_ms)}</p>
    </div>
  );
};

const formatDuration = (duration_ms: number): string => {
  const minutes = Math.floor(duration_ms / 60000);
  const seconds = Math.floor((duration_ms % 60000) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
