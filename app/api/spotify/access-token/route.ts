import axios from "axios";
import { NextResponse } from "next/server";

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

export async function GET() {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "client_credentials",
        client_id,
        client_secret,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(response.data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching spotify access token", error.message);
    return NextResponse.json({ error: "Error fetching spotify access token" });
  }
}
