import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const inDev = process.env.NEXT_PUBLIC_IN_DEVELOPMENT;

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  const redirect_uri =
    inDev === "true"
      ? "http://localhost:3000/spotify-auth"
      : "https://mixine.vercel.app/spotify-auth";

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirect_uri);

  const authHeader = Buffer.from(`${client_id}:${client_secret}`).toString(
    "base64"
  );

  try {
    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      params,
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.log(error);
    return NextResponse.error();
  }
}
