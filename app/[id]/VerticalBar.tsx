import { useGlobalData } from "@/hooks/useGlobalData";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

export const VerticalBar = () => {
  const { personalPlaylists } = useGlobalData();

  const isCurrentlyPlaying = false;
  return (
    <div className="show flex flex-row md:flex-col justify-between px-5 md:px-3 py-2 md:py-0 items-center">
      <Link href="/">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.jpg"
          alt="logo"
          className="w-10 h-10 mx-auto rounded-full md:mt-5 cursor-pointer outline-primary outline-2 outline-dashed hover:outline-4 transition-all show"
        />
      </Link>
      <div className="flex flex-grow justify-between overflow-hidden md:block show ml-3 md:ml-0">
        {personalPlaylists?.items?.slice(0, 7).map((playlist) => {
          return (
            <Link href={`${playlist.id}?src=${"personal"}`} key={playlist.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                className={`h-8 md:h-12 aspect-square cursor-pointer md:my-5 rounded object-cover mx-auto ${
                  isCurrentlyPlaying &&
                  "outline-primary outline-2 outline-dashed"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
