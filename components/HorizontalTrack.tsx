"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PlaySection } from "./PlaySection";
import { Item } from "@/types/tracks";
import { formatDuration } from "@/util/functions";

export const HorizontalTrack = ({
  item,
  i,
  currentPlayingItem,
  setCurrentPlayingItemIndex,
  setIsPlaying,
  items,
}: {
  items: Item[];
  item: Item;
  i: number;
  currentPlayingItem: Item | null;
  setCurrentPlayingItemIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isCurrentlyPlaying = currentPlayingItem?.track.id === item.track.id;

  const commaSeparatedArtists = item.track.artists
    .map((artist) => artist.name)
    .join(", ");

  return (
    <div
      className="flex justify-between items-center cursor-pointer my-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setCurrentPlayingItemIndex(items.indexOf(item));
        setIsPlaying(true);
      }}
    >
      <div className="flex items-center w-1/2">
        <PlaySection
          isHovered={isHovered}
          preview_url={item.track.preview_url}
          songNo={i + 1}
        />
        <Image
          src={item.track.album.images[0].url}
          height={640}
          width={640}
          alt={item.track.album.name}
          className="w-10 h-10 object-cover mr-5"
        />
        <div className="w-full">
          <p
            className={`text-sm ${isCurrentlyPlaying ? "text-green-500" : ""}`}
          >
            {item.track.name}
          </p>
          <p className="text-xs">{commaSeparatedArtists}</p>
        </div>
      </div>
      <p className={`text-sm truncate w-1/4`}>{item.track.album.name}</p>
      <p className="">{formatDuration(item.track.duration_ms)}</p>
    </div>
  );
};
