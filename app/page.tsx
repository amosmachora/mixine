"use client";

import { useSearchParams } from "next/navigation";

const handleLogin = async () => {
  window.location.href = "/api/spotify/login";
};

export default function Home() {
  const searchParams = useSearchParams();
  const anErrorOccurred: boolean = Boolean(searchParams?.get("error"));

  if (anErrorOccurred) {
    console.log("An error occurred while trying to log you in!");
  }
  return (
    <>
      <button className="border p-3 mt-5 ml-5" onClick={handleLogin}>
        Login With Spotify
      </button>
    </>
  );
}
