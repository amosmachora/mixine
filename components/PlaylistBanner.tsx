import React from "react";
import Image from "next/image";
import { Image as PlaylistImage } from "@/types/playlists";

export const PlaylistBanner = ({
  name,
  image,
  description,
}: {
  name: string | null;
  description: string | null;
  image: PlaylistImage | null;
}) => {
  return (
    <div className="flex items-end show p-3 md:p-5">
      <Image
        src={image?.url ?? ""}
        alt={name ?? "test"}
        height={640}
        width={640}
        className="h-8 w-8 md:h-[120px] md:w-[120px] outline-2 outline-primary"
      />
      <div className="ml-4">
        <p>{name}</p>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};
