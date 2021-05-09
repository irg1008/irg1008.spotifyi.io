import { withApi, NReq, NRes } from "util/api";
import { spotifyBaseUri } from "lib/spotify";
import axios, { AxiosRequestConfig } from "axios";
import qs from "query-string";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

const getNewToken = async (req: NReq, res: NRes) => {
  const baseUrl = spotifyBaseUri + "api/token";
  const { refreshToken } = req.body;

  const data = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
  };

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  // Token and so on.
  const spotifyRes = await axios.post(baseUrl, qs.stringify(data), config);

  return res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data: spotifyRes.data,
  });
};

export default async (req: NReq, res: NRes) =>
  withApi(req, res, "POST", getNewToken);
