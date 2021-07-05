import { useSpotify as useSpotifyConsumer } from "providers/SpotifyProvider";
import { getNewToken } from "middleware/spotify";
import { getLocalData, ISpotifyTokenResponse } from "lib/spotify";
import { useEffect, useMemo, useState } from "react";

const useSpotify = () => {
  const {
    state: { spotify, isLogged },
    dispatch,
  } = useSpotifyConsumer();

  const withSpotify = useMemo(
    () => async <T>(fn: () => Promise<T>): Promise<T> => {
      try {
        return await fn();
      } catch (error) {
        const spotifyError = JSON.parse(error.response).error;
        // If expired token.
        if (spotifyError.status === 401) {
          // Get refresh token from local data.
          const { refresh_token } = getLocalData();

          // Ask for new token.
          const { res, error } = await getNewToken(refresh_token);
          if (error) {
            console.log(error);
          } else if (res) {
            const { access_token }: Partial<ISpotifyTokenResponse> = res.data;

            // Set new token.
            dispatch({
              type: "LOG_IN",
              payload: { access_token, refresh_token },
            });

            // Call function again.
            return await withSpotify(fn);
          }
        }
      }
    },
    [dispatch]
  );

  return { withSpotify, spotify, isLogged };
};

const useSpotifyDevice = () => {
  const { spotify, withSpotify } = useSpotify();

  const [activeDevice, setActiveDevice] = useState<SpotifyApi.UserDevice>();

  useEffect(() => {
    const getActiveDevice = async () => {
      const res = await withSpotify(
        async () => await spotify.getMyCurrentPlaybackState()
      );
      setActiveDevice(res?.device);
    };
    getActiveDevice();
  }, [spotify, withSpotify]);

  const transferPlayback = async (deviceId: string) => {
    await withSpotify(
      async () => await spotify.transferMyPlayback([deviceId], { play: true })
    );
  };

  return { activeDevice, transferPlayback };
};

export { useSpotifyDevice };
export default useSpotify;
