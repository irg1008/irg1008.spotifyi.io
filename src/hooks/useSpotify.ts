import { getNewToken } from "middleware/spotify";
import { useCallback, useEffect, useMemo, useState } from "react";
import create from "zustand";
import SpotifyWebApi from "spotify-web-api-js";
import { persist } from "zustand/middleware";
import { ISpotifyTokenResponse } from "lib/spotify";

type TTokenData = Pick<ISpotifyTokenResponse, "access_token" | "refresh_token">;

interface ISpotifyState extends TTokenData {
  spotify: SpotifyWebApi.SpotifyWebApiJs;
  isLogged: boolean;
  logIn: (payload: ISpotifyTokenResponse) => void;
  logOut: () => void;
}

const useSpotifyStore = create<ISpotifyState>(
  persist(
    (set, get) => {
      const initialTokenData: TTokenData = {
        access_token: undefined,
        refresh_token: undefined,
      };

      const setData = (data: TTokenData) =>
        set(() => ({ ...data, isLogged: true }));
      const removeData = () =>
        set(() => ({ ...initialTokenData, isLogged: false }));

      const logIn = (payload: ISpotifyTokenResponse) => {
        const { spotify } = get();
        const { access_token } = payload;

        spotify.setAccessToken(access_token);
        setData(payload);
      };

      const logOut = () => removeData();

      return {
        ...initialTokenData,
        spotify: new SpotifyWebApi(),
        isLogged: false,
        logIn,
        logOut,
      };
    },
    {
      name: "spotify_tokens",
      whitelist: ["access_token", "refresh_token"],
    }
  )
);

const useSpotify = () => {
  const {
    spotify,
    isLogged,
    logIn,
    refresh_token,
    access_token,
    ...store
  } = useSpotifyStore();

  useEffect(() => {
    if (!isLogged && !!refresh_token && !!access_token) {
      logIn({ refresh_token, access_token });
    }
  }, [isLogged, logIn, refresh_token, access_token]);

  const withSpotify = useMemo(
    () => async <T>(fn: () => Promise<T>): Promise<T> => {
      try {
        return await fn();
      } catch (error) {
        const spotifyError = JSON.parse(error.response).error;

        // If expired token.
        if (spotifyError.status === 401) {
          // Ask for new token.
          const { res, error } = await getNewToken(refresh_token);
          if (error) {
            console.log(error);
          } else if (res) {
            const { access_token }: Partial<ISpotifyTokenResponse> = res.data;

            // Log in with new token.
            logIn({ access_token, refresh_token });

            // Call function again.
            return await withSpotify(fn);
          }
        }
        // Other errors
        else {
        }
      }
    },
    [logIn, refresh_token]
  );

  return { withSpotify, spotify, isLogged, logIn, ...store };
};

type TDevice = SpotifyApi.UserDevice;

const useSpotifyDevice = () => {
  const { spotify, withSpotify } = useSpotify();
  const [activeDevice, setActiveDevice] = useState<TDevice>();
  const [devices, setDevices] = useState<TDevice[]>();

  const getDevices = useCallback(async () => {
    const res = await withSpotify(() => spotify.getMyDevices());
    const devices = res?.devices;
    const active = devices?.find((device) => device.is_active);
    setDevices(res?.devices);
    setActiveDevice(active);
  }, [spotify, withSpotify]);

  const transferPlayback = useCallback(
    async (deviceId: string) => {
      await withSpotify(
        async () => await spotify.transferMyPlayback([deviceId])
      );
      // UPDATE activeDevice.
      await getDevices();
    },
    [spotify, withSpotify, getDevices]
  );

  useEffect(() => {
    getDevices();
  }, [getDevices]);

  return { activeDevice, devices, transferPlayback, getDevices };
};

type TTracks = SpotifyApi.TrackObjectFull[];

const useTracks = (value: string = "") => {
  const { spotify, withSpotify } = useSpotify();
  const [tracks, setTracks] = useState<TTracks>();

  const addTracks = (newTracks: TTracks) =>
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
