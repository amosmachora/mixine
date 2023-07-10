"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const SpotifyAuthPage = () => {
  const router = useRouter();
  const urlParams = useSearchParams();

  const code = urlParams?.get("code");
  const state = urlParams?.get("state");
  const error = urlParams?.get("error");

  if (error) {
    router.push("/?error=true");
  }

  if (code && state) {
    localStorage.setItem(
      "spotify-auth-credential",
      JSON.stringify({ code, state })
    );
  }
  router.push("/");
  return <div>Redirecting...</div>;
};

export default SpotifyAuthPage;
