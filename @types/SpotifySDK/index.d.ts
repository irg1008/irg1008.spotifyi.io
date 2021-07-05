declare module "SpotifySDK" {
  type TEvent =
    | "player_state_changed"
    | "ready"
    | "not_ready"
    | "initialization_error"
    | "authentication_error"
    | "account_error"
    | "playback_error";

  type TCallback = (data: any) => void;
  type TEventFn = (type: TEvent, cb: TCallback) => boolean;

  type Empty = Promise<null>;

  export type TTokenCallback = (access_token: string) => void;

  export interface IPlaybackPlayer {
    device_id: string;
  }

  export interface ISpotifyPlayer {
    connect: () => Promise<boolean>;
    disconnect: () => Promise<boolean>;
    addListener: TEventFn;
    removeListener: TEventFn;
    getCurrentState: () => Promise<ISpotifyState>;
    setName: (name: string) => Empty;
    getVolume: () => Promise<number>;
    setVolume: (volume: number) => Empty;
    pause: () => Empty;
    resume: () => Empty;
    togglePlay: () => Empty;
    seek: (position_ms: number) => Empty;
    previousTrack: () => Empty;
    nextTrack: () => Empty;
  }

  export interface ISpotifyAlbum {
    uri: string;
    name: string;
    images: { url: string }[];
  }

  export interface ISpotifyArtist {
    uri: string;
    name: string;
  }

  export interface ISpotifyState {
    context: {
      uri: string;
      metadata: any | null;
    };
    disallows: {
      pausing: boolean;
      peeking_next: boolean;
      peeking_prev: boolean;
      resuming: boolean;
      seeking: boolean;
      skipping_next: boolean;
      skipping_prev: boolean;
    };
    duration: number;
    loading: boolean;
    paused: boolean;
    position: number;
    repeat_mode: number; // 0: No Repeat, 1: Once-Repeat, 2: Full Repeat.
    shuffle: boolean;
    track_window: {
      current_track: ISpotifyTrack;
      previous_tracks: ISpotifyTrack[];
      next_tracks: ISpotifyTrack[];
    };
  }

  export interface ISpotifyTrack {
    uri: string;
    id: string | null;
    type: "track" | "episode" | "ad";
    media_type: "audio" | "video";
    name: string;
    is_playable: boolean;
    album: ISpotifyAlbum;
    artists: ISpotifyArtist[];
  }

  export interface IInitPlayer {
    name: string;
    getOAuthToken: (cb: TTokenCallback) => Promise<void>;
    volume?: number;
  }

  export interface IError {
    message: string;
  }

  export interface ISpotifySDK {
    player: ISpotifyPlayer;
    state: ISpotifyState;
    setPlayer: (newPlayer: ISpotifyPlayer) => void;
    setState: (newState: ISpotifyState) => void;
  }
}
