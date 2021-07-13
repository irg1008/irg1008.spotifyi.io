import { useCallback, useEffect, useMemo, useState } from "react";
import useSpotify, { useSpotifyDevice } from "hooks/useSpotify";
import create from "zustand";
import {
  ISpotifySDK,
  ISpotifyPlayer,
  IInitPlayer,
  IPlaybackPlayer,
  IError,
  ISpotifyState,
} from "SpotifySDK";
import { useInterval } from "hooks/useTime";

const useSpotifySDKStore = create<ISpotifySDK>((set) => ({
  player: undefined,
  state: undefined,
  device: undefined,
  isReady: false,
  setPlayer: (newPlayer) => set(() => ({ player: newPlayer })),
  setState: (newState) => set(() => ({ state: newState })),
  setDevice: (newDevice) => set(() => ({ device: newDevice })),
  setIsReady: (isReady: boolean) => set(() => ({ isReady })),
}));

// VOLUME HOOK.
const useSpotifyVolume = (player: ISpotifyPlayer) => {
  const [currentVolume, setCurrentVolume] = useState<number>();
  const [previousVolume, setPreviousVolume] = useState<number>();
  const isMuted = useMemo(() => currentVolume === 0, [currentVolume]);

  const getVolume = useCallback(async () => {
    const volume = await player?.getVolume();
    setCurrentVolume(volume);
  }, [player]);

  const setVolume = (volume: number) => {
    player?.setVolume(volume);
    setCurrentVolume(volume);
  };

  const toggleMuted = () => {
    setPreviousVolume(currentVolume || previousVolume);
    setVolume(isMuted ? previousVolume : 0);
  };

  useEffect(() => {
    getVolume();
  }, [getVolume]);

  useEffect(() => {
    setCurrentVolume(0);
    setPreviousVolume(0);
  }, []);

  return { currentVolume, isMuted, toggleMuted, setVolume };
};

// CONTROLLER HOOKS
const useSpotifyController = (player: ISpotifyPlayer) => {
  const togglePlay = () => player?.togglePlay();
  const nextTrack = () => player?.nextTrack();
  const prevTrack = () => player?.previousTrack();
  const goTo = (position_ms: number) => player?.seek(position_ms);

  return { togglePlay, nextTrack, prevTrack, goTo };
};

// PROGRESS
const useSpotifyProgress = (state: ISpotifyState) => {
  const [progress, setProgress] = useState<number>();
  const [paused, setPaused] = useState<boolean>();

  const second = 500;

  const cb = () =>
    !state?.paused && !paused && setProgress((oldValue) => oldValue + second);

  useInterval({ mills: second, cb });

  useEffect(() => {
    setProgress(state?.position);
  }, [state?.position]);

  return { progress, setProgress, setPaused };
};

const useSpotifySDK = () => {
  const {
    player,
    state,
    device,
    isReady,
    setPlayer,
    setState,
    setDevice,
    setIsReady,
  } = useSpotifySDKStore();
  const { withSpotify, spotify } = useSpotify();

  const getToken = useCallback(
    async () => await withSpotify(async () => spotify.getAccessToken()),
    [withSpotify, spotify]
  );

  const initPlayer: IInitPlayer = useMemo(
    () => ({
      name: "Spotify API",
      getOAuthToken: async (cb) => {
        cb(await getToken());
      },
    }),
    [getToken]
  );

  const updateState = useCallback(async () => {
    if (!!player) {
      const newState = await player.getCurrentState();
      !!newState && setState(newState);
    }
  }, [player, setState]);

  const connect = useCallback(async () => {
    if (!!player) {
      await player.connect();
    }
  }, [player]);

  const onSpotifySDKLoad = useCallback(() => {
    // @ts-ignore
    const player: ISpotifyPlayer = new Spotify.Player(initPlayer);
    setIsReady(false);

    // Ready.
    player.addListener("ready", ({ device_id }: IPlaybackPlayer) => {
      console.log("Ready with Device ID", device_id);
      setDevice({ deviceId: device_id, deviceName: initPlayer.name });
      setPlayer(player);
      setIsReady(true);
    });

    // Not Ready.
    player.addListener("not_ready", ({ device_id }: IPlaybackPlayer) => {
      //console.log("Device ID has gone offline", device_id);
      setIsReady(false);
      setDevice(undefined);
      return () => player.disconnect();
    });

    // Playback Status Updates.
    player.addListener("player_state_changed", (newState) => {
      //console.log("State changed");
      setState(newState);
    });

    // Error Handling.
    const errorHandler = (error: IError) => {
      console.log(error);
    };
    player.addListener("initialization_error", errorHandler);
    player.addListener("authentication_error", errorHandler);
    player.addListener("account_error", errorHandler);
    player.addListener("playback_error", errorHandler);

    // Connect to the player!
    player.connect();
  }, [initPlayer, setPlayer, setState, setDevice, setIsReady]);

  // On player change => Update state.
  useEffect(() => {
    updateState();
    return () => {
      player?.disconnect();
    };
  }, [updateState, player]);

  // VOLUME HOOK.
  const useVolume = () => useSpotifyVolume(player);

  // CONTROLLER HOOK.
  const useController = () => useSpotifyController(player);

  // PROGRESS.
  const useProgress = () => useSpotifyProgress(state);

  return {
    onSpotifySDKLoad,
    state,
    device,
    useVolume,
    useController,
    useProgress,
    updateState,
    isReady,
    connect,
  };
};

export default useSpotifySDK;
