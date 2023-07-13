import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

export const POST = async (req: NextRequest) => {
  const { refresh_token } = await req.json();

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refresh_token);

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
  } catch (error) {
    return NextResponse.error();
  }
};
