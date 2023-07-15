import { useGlobalData } from "@/hooks/useGlobalData";
import Image from "next/image";
import React from "react";

export const VerticalBar = () => {
  const { playlists } = useGlobalData();
  return (
    <div className="border border-red-500 flex flex-col justify-end h-screen px-4">
      {playlists?.map((playlist) => (
        <Image
          src={playlist.images[0].url}
          alt={playlist.name}
          height={playlist.images[0].height ?? 120}
          width={playlist.images[0].width ?? 120}
          className="h-14 w-14 cursor-pointer my-3 rounded"
          key={playlist.id}
        />
      ))}
    </div>
  );
};
