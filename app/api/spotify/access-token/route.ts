import {
  SpotifyAccessTokenResponse,
  SpotifyAuthorizationCodeResponse,
} from "@/types/types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

// export async function GET(req: NextRequest, res: NextResponse) {
//   try {
//     const response = await axios.post(
//       "https://accounts.spotify.com/api/token",
//       {
//         grant_type: "client_credentials",
//         client_id,
//         client_secret,
//       },
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );
//     return NextResponse.json(response.data);
//   } catch (error: any) {
//     return NextResponse.error();
//   }
// }

export async function POST(req: NextRequest) {
  const body: SpotifyAuthorizationCodeResponse = await req.json();
  const res: SpotifyAccessTokenResponse = await axios.post(
    "https://accounts.spotify.com/api/token",
    body,
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return NextResponse.json(res);
}
