import axios from "axios";
import { withMiddle } from "util/api";
import { getRedirectUri } from "lib/spotify";

const baseApiUrl = "/api/spotify/";

const getAuthUrl = () =>
  withMiddle(() =>
    axios.post(baseApiUrl + "authUrl", { redirectUri: getRedirectUri() })
  );

const getToken = (code: string) =>
  withMiddle(() =>
    axios.post(baseApiUrl + "logIn", { code, redirectUri: getRedirectUri() })
  );

const getNewToken = (refreshToken: string) =>
  withMiddle(() => axios.post(baseApiUrl + "getNewToken", { refreshToken }));

export { getAuthUrl, getToken, getNewToken };
