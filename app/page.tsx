"use client";

import { PlaylistTab } from "@/components/PlaylistTab";
import { useAuthData } from "@/hooks/useAuthData";
import { useFetch } from "@/hooks/useFetch";
import { useGlobalData } from "@/hooks/useGlobalData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FeaturedPlaylists } from "@/types/featuredplaylists";
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
    useFetch<PlaylistPayload>({
      body: null,
      fetchOnMount: false,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
      saveAble: true,
      url: "https://api.spotify.com/v1/me/playlists",
    });

  const [, isFetchingUser, fetchUserError, fetchUser] = useFetch<User>({
    url: "https://api.spotify.com/v1/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: null,
    fetchOnMount: false,
    saveAble: true,
  });

  const [
    featuredPlaylists,
    isFetchingFeaturedPlaylists,
    featuredPlaylistsError,
    fetchFeaturedPlaylists,
  ] = useFetch<FeaturedPlaylists>({
    url: "https://api.spotify.com/v1/browse/featured-playlists",
    method: "GET",
    body: null,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    fetchOnMount: false,
    saveAble: true,
  });

  const [currentUser, setCurrentUser] = useLocalStorage<User | null>(
    null,
    LocalStorageKeys.user
  );

  useEffect(() => {
    if (accessToken) {
      if (!playlists) {
        fetchPlaylists().then((res) => setPlaylistPayload(res));
      }

      if (!currentUser) {
        fetchUser().then((res) => setCurrentUser(res));
      }

      if (!featuredPlaylists) {
        fetchFeaturedPlaylists();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  if (anErrorOccurred) {
    console.log("An error occurred while trying to log you in!");
  }

  const handleLogOut = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  console.log(errors);
  return (
    <main className="w-screen overflow-x-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/robotman.png"
        alt="man"
        className="absolute top-0 bottom-0 right-0 -z-10 h-screen object-cover w-[20vw]"
      />
      <div className="flex items-center justify-between px-5 show">
        <p className="show">Logo</p>
        <div className="flex items-center show text-white">
          {isFetchingUser ? (
            <p>Fetching user...</p>
          ) : fetchUserError ? (
            <p> An error occurred fetching the user</p>
          ) : (
            currentUser && (
              <div className="show text-black">
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
            )
          )}
          <a className="p-3" href="https://github.com/amosmachora/mixine">
            ⭐ On Github
          </a>
          <button
            className="p-3 show"
            onClick={currentUser ? handleLogOut : handleLogin}
          >
            {currentUser ? "Log out" : "Login With Spotify"}
          </button>
        </div>
      </div>
      <p>Good Afternoon {currentUser?.display_name} </p>
      {isFetching
        ? "Loading..."
        : errors
        ? "An error occurred!"
        : playListPayload && (
            <div className="flex flex-wrap mt-5">
              {playListPayload?.items.map((playlist) => (
                <PlaylistTab playlist={playlist} key={playlist.id} />
              ))}
            </div>
          )}
      {isFetchingFeaturedPlaylists
        ? "Loading..."
        : featuredPlaylistsError
        ? "An Error occurred"
        : featuredPlaylists && (
            <div className="show">
              <p>{featuredPlaylists.message}</p>
              <div className="flex flex-wrap mt-5">
                {featuredPlaylists?.playlists.items.map((playlist) => (
                  <PlaylistTab playlist={playlist} key={playlist.id} />
                ))}
              </div>
            </div>
          )}
      {!currentUser && (
        <div>
          So imagine Youtube and Spotify had a baby.. How would it look like?
        </div>
      )}
    </main>
  );
}
