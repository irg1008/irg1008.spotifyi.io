import { useSpotify as useSpotifyConsumer } from "providers/SpotifyProvider";
import { getNewToken } from "middleware/spotify";
import { getLocalData, ISpotifyTokenResponse } from "lib/spotify";

const useSpotify = () => {
  const {
    state: { spotify },
    dispatch,
  } = useSpotifyConsumer();

  const withSpotify = async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      return await fn();
    } catch (error) {
      const spotifyError = JSON.parse(error.response).error;
      // If expired token.
      if (spotifyError.status === 401) {
        // Get refresh token from local data.
        const { refresh_token } = getLocalData();

        // Ask for new token.
        const res = await getNewToken(refresh_token);
        const { access_token }: Partial<ISpotifyTokenResponse> = res?.data;

        // Set new token.
        dispatch({
          type: "LOG_IN",
          payload: { access_token, refresh_token },
        });

        // Call function again.
        return await fn();
      }
    }
  };

  return { withSpotify, spotify };
};

export default useSpotify;
