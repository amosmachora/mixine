"use client";

import { SpotifyAuthorizationCodeResponse } from "@/types/types";
import axios, { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";

const handleLogin = async () => {
  window.location.href = "/api/spotify/login";
};

export default function Home() {
  const searchParams = useSearchParams();
  const anErrorOccurred: boolean = Boolean(searchParams?.get("error"));

  if (anErrorOccurred) {
    // show spotify authentication error
  } else {
    // check if the state variable received is the same as the sent
    const savedSpotifyResponse = localStorage.getItem(
      "spotify-auth-credential"
    );

    if (savedSpotifyResponse) {
      const spotifyAuthorizationCodeResponse: SpotifyAuthorizationCodeResponse =
        JSON.parse(savedSpotifyResponse);

      //request access token
      axios
        .post("/api/spotify/access-token", spotifyAuthorizationCodeResponse)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <button className="border p-3 mt-5 ml-5" onClick={handleLogin}>
        Login With Spotify
      </button>
    </>
  );
}
