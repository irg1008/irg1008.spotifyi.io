import axios from "axios";
import { withMiddle } from "util/api";

const baseApiUrl = "/api/spotify/";

const getAuthUrl = () => withMiddle(() => axios.post(baseApiUrl + "authUrl"));

const getToken = (code: string) =>
  withMiddle(() => axios.post(baseApiUrl + "logIn", { code }));

const getNewToken = (refreshToken: string) =>
  withMiddle(() => axios.post(baseApiUrl + "getNewToken", { refreshToken }));

export { getAuthUrl, getToken, getNewToken };
