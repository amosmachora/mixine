import React from "react";
import Image from "next/image";
import { Image as PlaylistImage } from "@/types/types";

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
    <div className="flex items-end">
      <Image
        src={image!.url}
        alt={name}
        height={image!.height ?? 640}
        width={image!.width ?? 640}
        className="h-[120px] w-[120px]"
      />
      <p className="border-red-500 border py-3 px-3">Play Button</p>
      <div>
        <p>{name}</p>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};
