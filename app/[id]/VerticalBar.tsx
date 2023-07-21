import { useGlobalData } from "@/hooks/useGlobalData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const VerticalBar = () => {
  const { playlists } = useGlobalData();
  const router = useRouter();
  return (
    <div className="show flex flex-col justify-between px-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.jpg"
        alt="logo"
        className="w-10 h-10 mx-auto rounded-full mt-5 cursor-pointer outline-primary outline-2 outline-dashed hover:outline-4 transition-all"
        onClick={() => router.push("/")}
      />
      <div>
        {playlists?.slice(0, 7).map((playlist) => (
          <Link key={playlist.id} href={playlist.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={playlist.images[0].url}
              alt={playlist.name}
              className="h-12 w-12 cursor-pointer my-5 rounded object-cover mx-auto"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
