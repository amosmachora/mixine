"use client";

import { useGlobalData } from "@/hooks/useGlobalData";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const handleLogin = async () => {
  window.location.href = "/api/spotify/login";
};

export default function Home() {
  const searchParams = useSearchParams();
  const anErrorOccurred: boolean = Boolean(searchParams?.get("error"));
  const { playlists } = useGlobalData();
  const router = useRouter();

  if (anErrorOccurred) {
    console.log("An error occurred while trying to log you in!");
  }
  return (
    <>
      <button className="border p-3 mt-5 ml-5" onClick={handleLogin}>
        Login With Spotify
      </button>
      <div className="flex flex-wrap mt-5">
        {playlists?.map((playlist) => (
          <div
            key={playlist.id}
            className="w-1/5 show cursor-pointer"
            onClick={() => router.push(`/${playlist.id}`)}
          >
            <Image
              src={playlist.images[0].url}
              alt="playlist image"
              width={120}
              height={120}
              className="mx-auto"
            />
            <p className="text-center">{playlist.name}</p>
            {playlist.description && (
              <p className="text-center text-sm">{playlist.description}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
