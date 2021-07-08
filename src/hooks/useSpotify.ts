import { useSpotify as useSpotifyConsumer } from "providers/SpotifyProvider";
import { getNewToken } from "middleware/spotify";
import { getLocalData, ISpotifyTokenResponse } from "lib/spotify";
import { useCallback, useEffect, useMemo, useState } from "react";

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
    console.log(deviceId);
    await withSpotify(async () => await spotify.transferMyPlayback([deviceId]));
  };

  return { activeDevice, transferPlayback };
};

type TTracks = SpotifyApi.TrackObjectFull[];

const useTracks = (value: string = "") => {
  const { spotify, withSpotify } = useSpotify();
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>();

  const addTracks = (newTracks: SpotifyApi.TrackObjectFull[]) =>
    setTracks((old) => (!!old ? [...old, ...newTracks] : newTracks));

  // Filter tracks.
  const filteredTracks =
    useMemo(
      () =>
        tracks?.filter(
          (t) =>
            t.name.toLowerCase().includes(value?.toLowerCase()) ||
            t.artists.some((a) => a.name.toLowerCase().includes(value))
        ),
      [value, tracks]
    ) || tracks;

  // Get 50 next tracks.
  const fetchTracks = useMemo(
    () =>
      async function* () {
        const limit = 50;
        let offset = 0;

        while (true) {
          const res = await withSpotify(() =>
            spotify.getMySavedTracks({ limit, offset })
          );

          const newTracks = res?.items.map((i) => i.track);
          yield newTracks;

          const total = res?.total;
          offset += limit;
          if (offset > total) break;
        }
      },
    [spotify, withSpotify]
  );

  const getTracks = useCallback(async () => {
    for await (const i of fetchTracks()) addTracks(i);
  }, [fetchTracks]);

  // ON LOAD.
  useEffect(() => {
    getTracks();
  }, [getTracks]);

  return { tracks, filteredTracks };
};

export { useSpotifyDevice, useTracks };
export default useSpotify;
