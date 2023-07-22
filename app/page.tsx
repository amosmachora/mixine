"use client";

import { Navbar } from "@/components/Navbar";
import { PlaylistTab } from "@/components/PlaylistTab";
import { useAuthData } from "@/hooks/useAuthData";
import { useFetch } from "@/hooks/useFetch";
import { useGlobalData } from "@/hooks/useGlobalData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useUpdateLogger } from "@/hooks/useUpdateLogger";
import { FeaturedPlaylists } from "@/types/featuredplaylists";
import { PlaylistPayload } from "@/types/playlists";
import { User } from "@/types/types";
import { LocalStorageKeys } from "@/util/Constants";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");
  const anErrorOccurred: boolean = Boolean(error);
  const { accessToken } = useAuthData();
  const { setPlaylistPayload, notify } = useGlobalData();

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

  useEffect(() => {
    if (accessToken) {
      if (!playListPayload) {
        fetchPlaylists();
      }

      if (!featuredPlaylists) {
        fetchFeaturedPlaylists();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    if (playListPayload) {
      setPlaylistPayload(playListPayload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playListPayload]);

  if (anErrorOccurred) {
    notify!(error!);
  }

  const [user, setUser] = useState<User | null>(null);

  return (
    <main className="px-5">
      <Navbar setUser={setUser} />
      <p className="text-3xl mt-5">Good Afternoon {user?.display_name} </p>
      {isFetching
        ? "Loading..."
        : errors
        ? "An error occurred!"
        : playListPayload && (
            <div className="flex flex-wrap mt-5 gap-y-5">
              {playListPayload?.items.map((playlist) => (
                <PlaylistTab playlist={playlist} key={playlist.id} />
              ))}
            </div>
          )}

      <p className="text-3xl mt-5">{featuredPlaylists?.message}</p>
      {isFetchingFeaturedPlaylists
        ? "Loading..."
        : featuredPlaylistsError
        ? "An Error occurred"
        : featuredPlaylists && (
            <div className="show">
              <div className="flex flex-wrap mt-5 gap-y-5">
                {featuredPlaylists?.playlists.items.map((playlist) => (
                  <PlaylistTab playlist={playlist} key={playlist.id} />
                ))}
              </div>
            </div>
          )}
    </main>
  );
}
