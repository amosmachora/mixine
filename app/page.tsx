"use client";

import { useAuthData } from "@/hooks/useAuthData";
import { useFetch } from "@/hooks/useFetch";
import { useGlobalData } from "@/hooks/useGlobalData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PlaylistPayload } from "@/types/playlists";
import { User } from "@/types/types";
import { LocalStorageKeys } from "@/util/Constants";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const handleLogin = async () => {
  window.location.href = "/api/spotify/login";
};

export default function Home() {
  const searchParams = useSearchParams();
  const anErrorOccurred: boolean = Boolean(searchParams?.get("error"));
  const { setPlaylistPayload, playlists } = useGlobalData();
  const { accessToken } = useAuthData();

  const [playListPayload, isFetching, errors, fetchPlaylists] =
    useFetch<PlaylistPayload>(
      "api/spotify/playlists",
      "GET",
      {
        Authorization: accessToken,
      },
      false,
      null
    );
  const [, isFetchingUser, fetchUserError, fetchUser] = useFetch<User>(
    "https://api.spotify.com/v1/me",
    "GET",
    {
      Authorization: `Bearer ${accessToken}`,
    },
    false,
    null
  );
  const router = useRouter();

  const [currentUser, setCurrentUser] = useLocalStorage<User | null>(
    null,
    LocalStorageKeys.user
  );

  useEffect(() => {
    if (playlists === null && accessToken !== null) {
      fetchPlaylists().then((res) => setPlaylistPayload(res));
    }

    if (!currentUser && accessToken !== null) {
      console.log("Here");
      fetchUser().then((res) => setCurrentUser(res));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  if (anErrorOccurred) {
    console.log("An error occurred while trying to log you in!");
  }

  const handleLogOut = () => {
    localStorage.clear();
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="show">Logo</p>
        <div className="flex items-center">
          {isFetchingUser ? (
            "Fetching user..."
          ) : fetchUserError ? (
            "An error occurred fetching the user"
          ) : (
            <div className="show">
              <p>{currentUser?.display_name}</p>
              <p>{currentUser?.email}</p>
              <Image
                src={currentUser?.images[0].url!}
                alt={currentUser?.display_name!}
                height={currentUser?.images[0].height}
                width={currentUser?.images[0].width}
              />
              <p>{currentUser?.followers.total} followers</p>
            </div>
          )}
          <button
            className="border p-3 mt-5 ml-5 show"
            onClick={currentUser ? handleLogOut : handleLogin}
          >
            {currentUser ? "Log out" : "Login With Spotify"}
          </button>
        </div>
      </div>
      <div className="flex flex-wrap mt-5">
        {isFetching
          ? "Loading..."
          : errors
          ? "An error occurred!"
          : playListPayload?.items.map((playlist) => (
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
