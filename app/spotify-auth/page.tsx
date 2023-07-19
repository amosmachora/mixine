"use client";

import { useAuthData } from "@/hooks/useAuthData";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const SpotifyAuthPage = () => {
  const router = useRouter();
  const urlParams = useSearchParams();
  const { setAuthorizationCodeResponse } = useAuthData();

  useEffect(() => {
    const code = urlParams?.get("code");
    const state = urlParams?.get("state");
    const error = urlParams?.get("error");

    if (error) {
      router.push(`/?error=${error}`);
    }
    if (code && state) {
      setAuthorizationCodeResponse({
        code,
        state,
      });
    }
    router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>Redirecting...</div>;
};

export default SpotifyAuthPage;
