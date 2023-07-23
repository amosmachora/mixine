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
    <div className="flex items-end show p-5">
      <Image
        src={image!.url}
        alt={name}
        height={640}
        width={640}
        className="h-16 w-16 md:h-[120px] md:w-[120px]"
      />
      <div className="ml-4">
        <p>{name}</p>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};
