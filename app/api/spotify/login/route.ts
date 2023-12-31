import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import queryString from "query-string";
import { uid } from "uid";

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const inDev = process.env.NEXT_PUBLIC_IN_DEVELOPMENT;

export async function GET() {
  const state = uid(16);
  const scope =
    "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public";
  const redirect_uri =
    inDev === "true"
      ? "http://localhost:3000/spotify-auth"
      : "https://mixine.vercel.app/spotify-auth";

  redirect(
    "https://accounts.spotify.com/authorize?" +
      queryString.stringify({
        response_type: "code",
        client_id,
        scope,
        redirect_uri,
        state,
      })
  );
}
