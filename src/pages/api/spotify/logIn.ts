import { withApi, NReq, NRes } from "util/api";
import { spotifyBaseUri, getRedirectUri } from "lib/spotify";
import axios, { AxiosRequestConfig } from "axios";
import qs from "query-string";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

const logIn = async (req: NReq, res: NRes) => {
  const baseUrl = spotifyBaseUri + "api/token";
  const { code } = req.body;

  const data = {
    code,
    grant_type: "authorization_code",
    redirect_uri: getRedirectUri(),
    client_id: clientId,
    client_secret: clientSecret,
  };

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  // Get token if valid code, otherwise return error.
  try {
    const spotifyRes = await axios.post(baseUrl, qs.stringify(data), config);
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: spotifyRes.data,
    });
  } catch (error) {
    return res.status(400).json({ success: false, ...error.response.data });
  }
};

export default async (req: NReq, res: NRes) => withApi(req, res, "POST", logIn);
