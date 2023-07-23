"use client";

import { useAuthData } from "@/hooks/useAuthData";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/types";
import React, { useEffect } from "react";
import Image from "next/image";
import { addUserToDb } from "@/firebase/firebase";
import { Skeleton } from "./ui/skeleton";

const handleLogin = async () => {
  window.location.href = "/api/spotify/login";
};

const handleLogOut = () => {
  localStorage.clear();
  window.location.reload();
};

export const Navbar = ({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const { accessToken } = useAuthData();

  const [user, isFetchingUser, fetchUserError, fetchUser] = useFetch<User>({
    url: "https://api.spotify.com/v1/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: null,
    fetchOnMount: false,
    saveAble: true,
  });

  useEffect(() => {
    if (!user && accessToken) {
      fetchUser().then((user) => {
        setUser(user);
        addUserToDb(user!);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <div className="flex items-center justify-between sm:pl-5 show">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.jpg" alt="logo" className="w-24 object-cover" />
      <div className="flex items-center show">
        {isFetchingUser ? (
          <div className="flex items-center space-x-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        ) : (
          <div className="show text-black hidden sm:flex text-sm ">
            <div>
              <p>{user?.display_name}</p>
              <p>{user?.email}</p>
            </div>
            <Image
              src={user?.images[0].url!}
              alt={user?.display_name!}
              height={user?.images[0].height}
              width={user?.images[0].width}
              className="object-cover rounded-full h-10 w-10 border-2 border-primary cursor-pointer ml-3"
            />
          </div>
        )}
        <a
          className="p-3 show"
          href="https://github.com/amosmachora/mixine"
          target="_blank"
        >
          ⭐ On Github
        </a>
        <button
          className="p-3 show"
          onClick={user ? handleLogOut : handleLogin}
        >
          {user ? "Log out" : "Login With Spotify"}
        </button>
      </div>
    </div>
  );
};
