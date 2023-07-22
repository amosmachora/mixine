import React from "react";
import Image from "next/image";
import { Image as PlaylistImage } from "@/types/playlists";

export const PlaylistBanner = ({
  name,
  image,
  description,
}: {
  name: string;
  description: string | null;
  image: PlaylistImage;
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
      <div className="ml-4">
        <p>{name}</p>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};
