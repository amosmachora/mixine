import React from "react";
import Image from "next/image";
import { Image as PlaylistImage } from "@/types/types";

export const PlaylistBanner = ({
  name,
  image,
  description,
  setIsPlayingVideos,
}: {
  name: string;
  description: string | null;
  image: PlaylistImage;
  setIsPlayingVideos: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-end">
      <Image
        src={image!.url}
        alt={name}
        height={image!.height ?? 640}
        width={image!.width ?? 640}
        className="h-[120px] w-[120px]"
      />
      <p
        className="border-red-500 border py-3 px-3 mx-4 cursor-pointer"
        onClick={() => setIsPlayingVideos(true)}
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
