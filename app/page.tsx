"use client";

import { Navbar } from "@/components/Navbar";
import { NoUser } from "@/components/NoUser";
import { PlaylistsSkeleton } from "@/components/PlaylistsSkeleton";
import { PlaylistTab } from "@/components/PlaylistTab";
import { useAuthData } from "@/hooks/useAuthData";
import { useFetch } from "@/hooks/useFetch";
import { useGlobalData } from "@/hooks/useGlobalData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useUpdateLogger } from "@/hooks/useUpdateLogger";
import { FeaturedPlaylists } from "@/types/featuredplaylists";
import { PlaylistPayload } from "@/types/playlists";
import { User } from "@/types/types";
import { getGreeting } from "@/util/functions";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");
  const anErrorOccurred: boolean = Boolean(error);
  const {
    personalPlaylists,
    isFetchingPersonalPlaylists,
    notify,
    isFetchingFeaturedPlaylists,
    featuredPlaylists,
  } = useGlobalData();

  if (anErrorOccurred) {
    notify(error!);
  }

  const [user, setUser] = useState<User | null>(null);

  return (
    <main className="px-5 bg-gray-200">
      <Navbar setUser={setUser} />
      {user ? (
        <p className="text-3xl mt-5">
          {getGreeting()} {user?.display_name}{" "}
        </p>
      ) : (
        <NoUser />
      )}

      {isFetchingPersonalPlaylists ? (
        <PlaylistsSkeleton />
      ) : (
        personalPlaylists && (
          <div className="flex flex-wrap mt-5 gap-y-5 show">
            {personalPlaylists?.items.map((playlist) => (
              <PlaylistTab
                playlist={playlist}
                key={playlist.id}
                type="personal"
              />
            ))}
          </div>
        )
      )}

      <p className="text-3xl mt-5">{featuredPlaylists?.message}</p>
      {isFetchingFeaturedPlaylists ? (
        <PlaylistsSkeleton />
      ) : (
        featuredPlaylists && (
          <div className="flex flex-wrap mt-5 gap-y-5 show">
            {featuredPlaylists?.playlists.items.map((playlist) => (
              <PlaylistTab
                playlist={playlist}
                key={playlist.id}
                type="featured"
              />
            ))}
          </div>
        )
      )}

      <a
        href="https://amosmachora.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center fixed bottom-5 right-5 bg-gray-900 text-white p-2 hover:p-4 transition-all rounded text-xs italic cursor-pointer"
      >
        Meet the dev!
        <FontAwesomeIcon icon={faHeart} className="text-red-600 mx-2" />
      </a>
    </main>
  );
}
