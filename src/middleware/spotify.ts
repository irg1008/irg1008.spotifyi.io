import axios from "axios";
import { withMiddle } from "util/api";
import { getUrl } from "lib/spotify";

const baseApiUrl = getUrl({ path: "/api/spotify/" });

const getAuthUrl = () => withMiddle(() => axios.get(baseApiUrl + "authUrl"));

const getToken = (code: string) =>
	withMiddle(() => axios.post(baseApiUrl + "logIn", { code }));

const getNewToken = (refreshToken: string) =>
	withMiddle(() => axios.post(baseApiUrl + "getNewToken", { refreshToken }));

export { getAuthUrl, getToken, getNewToken };
