"use client";

import { useFetch } from "@/hooks/useFetch";
import { SpotifyAccessTokenResponse } from "@/types/types";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  // const { data, errors, isFetching, fetchFunction } =
  //   useFetch<SpotifyAccessTokenResponse>(
  //     "/api/spotify/access-token",
  //     "GET",
  //     null
  //   );

  // useEffect(() => {
  //   fetchFunction();
  //   const interval = setInterval(fetchFunction, 58 * 60 * 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   if (data?.access_token) {
  //     axios
  //       .get("/api/spotify/user-playlists", {
  //         headers: {
  //           Authorization: `Bearer ${data.access_token}`,
  //         },
  //       })
  //       .then((res) => console.log(res.data))
  //       .catch((err) => console.error(err));
  //   }
  // }, [data]);

  return <></>;
}
