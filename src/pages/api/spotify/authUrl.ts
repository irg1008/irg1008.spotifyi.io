import { withApi, NReq, NRes } from "util/api";
import { spotifyBaseUri, getRedirectUri } from "lib/spotify";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;

const authUrl = async (req: NReq, res: NRes) => {
  const baseUrl = spotifyBaseUri + "authorize";
  const redirectUri = getRedirectUri({ base: req.headers.origin });

  const scopes = [
    "ugc-image-upload",
    "user-read-recently-played",
    "user-top-read",
    "user-read-playback-position",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "app-remote-control",
    "streaming",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-follow-modify",
    "user-follow-read",
    "user-library-modify",
    "user-library-read",
    "user-read-email",
    "user-read-private",
  ];

  const url =
    baseUrl +
    `?client_id=${clientId}` +
    `&redirect_uri=${redirectUri}` +
    `&scope=${scopes.join("%20")}` +
    "&response_type=code" +
    "&show_dialog=true";

  return res
    .status(200)
    .json({ success: true, message: "URL successfully created", url });
};

export default async (req: NReq, res: NRes) =>
  withApi(req, res, "POST", authUrl);
