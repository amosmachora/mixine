import React from "react";
import Image from "next/image";
import { Image as PlaylistImage } from "@/types/playlists";

export const PlaylistBanner = ({
  name,
  image,
  description,
  handleStartPlaying,
}: {
  name: string;
  description: string | null;
  image: PlaylistImage;
  handleStartPlaying: () => void;
}) => {
  return (
    <div className="flex items-end show">
      <Image
        src={image!.url}
        alt={name}
        height={640}
        width={640}
        className="h-[120px] w-[120px]"
      />
      <p
        className="show py-3 px-3 mx-4 cursor-pointer"
        onClick={handleStartPlaying}
      >
        Play Button
      </p>
      <div>
        <p>{name}</p>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};
