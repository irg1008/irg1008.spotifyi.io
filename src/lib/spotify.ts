interface ISpotifyTokenResponse {
	access_token: string;
	expires_in?: number;
	refresh_token: string;
	scope?: string;
	token_type?: string;
}

const spotifyBaseUri = "https://accounts.spotify.com/";

const getRedirectUri = () => `${window.location.origin}/auth/`;

const setLocalData = (data: ISpotifyTokenResponse) => {
	const { access_token, refresh_token } = data;

	// Set local session data.
	localStorage.setItem("access_token", JSON.stringify(access_token));
	localStorage.setItem("refresh_token", JSON.stringify(refresh_token));
};

const getLocalData = (): ISpotifyTokenResponse => {
	// Set local session data.
	const access_token = JSON.parse(localStorage.getItem("access_token"));
	const refresh_token = JSON.parse(localStorage.getItem("refresh_token"));

	return { access_token, refresh_token };
};

const removeLocalData = () => {
	localStorage.removeItem("access_token");
	localStorage.removeItem("refresh_token");
};

export {
	getRedirectUri,
	spotifyBaseUri,
	setLocalData,
	getLocalData,
	removeLocalData,
};
export type { ISpotifyTokenResponse };
