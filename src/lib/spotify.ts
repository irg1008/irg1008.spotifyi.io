interface ISpotifyTokenResponse {
  access_token: string;
  expires_in?: number;
  refresh_token: string;
  scope?: string;
  token_type?: string;
}

interface ISpotifyError {
  success: boolean;
  error: string;
  error_description: string;
}

const getUrl = ({ path }: { path?: string }) =>
  `${
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PRODUCTION_URL
      : process.env.NEXT_PUBLIC_DEVELOPMENT_URL
  }${path}`;

const getRedirectUri = () => getUrl({ path: "/auth/" });

const spotifyBaseUri = "https://accounts.spotify.com/";

export { getUrl, getRedirectUri, spotifyBaseUri };
export type { ISpotifyTokenResponse, ISpotifyError };
