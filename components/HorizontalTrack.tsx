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

  return (
    <div
      className="flex justify-between px-4 items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setCurrentPlayingItemIndex(items.indexOf(item));
        setIsPlaying(true);
      }}
    >
      <div
        className={`flex items-center ${
          currentPlayingItem ? "w-1/2" : "w-1/3"
        } show`}
      >
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
        <div>
          <p className={`${isCurrentlyPlaying ? "text-green-500" : ""}`}>
            {item.track.name}
          </p>
          <div className="flex items-center">
            {item.track.artists.map((artist, index: number) => (
              <div className="flex items-center" key={index}>
                <p key={artist.id} className="text-sm">
                  {artist.name}
                </p>
                {index !== item.track.artists.length - 1 && (
                  <span className="mr-1">,</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p
        className={`show text-sm truncate ${
          currentPlayingItem ? "w-1/4" : `w-1/3`
        }`}
      >
        {item.track.album.name}
      </p>
      <p className="show">{formatDuration(item.track.duration_ms)}</p>
    </div>
  );
};
