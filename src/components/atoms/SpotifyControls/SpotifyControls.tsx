import useSpotify from "hooks/useSpotify";
import { useCallback, useEffect, useState } from "react";
import Styled from "./SpotifyControls.styles";

const SpotifyControls = () => {
  const { spotify, withSpotify } = useSpotify();

  const [isPlaying, setIsPlaying] = useState(false);

  // CHECK IF USER IS PLAYING.
  const checkPlayState = useCallback(async () => {
    const res = await withSpotify(() => spotify.getMyCurrentPlaybackState());
    setIsPlaying(res?.is_playing);
  }, []);

  // TOGGLE PLAY.
  const togglePlay = async () => {
    isPlaying
      ? await withSpotify(() => spotify.pause())
      : await withSpotify(() => spotify.play());

    setIsPlaying(!isPlaying);
  };

  // NEXT-PREV.
  const next = async () => {
    await withSpotify(() => spotify.skipToNext());
    setIsPlaying(true);
  };
  const previous = async () => {
    await withSpotify(() => spotify.skipToPrevious());
    setIsPlaying(true);
  };

  // ON LOAD.
  useEffect(() => {
    checkPlayState();
  }, []);

  return (
    <Styled.Controls>
      <Styled.Button onClick={previous}>
        <Styled.Previous />
      </Styled.Button>
      <Styled.Button onClick={togglePlay}>
        {isPlaying ? <Styled.Pause /> : <Styled.Play />}
      </Styled.Button>
      <Styled.Button onClick={next}>
        <Styled.Next />
      </Styled.Button>
    </Styled.Controls>
  );
};

export default SpotifyControls;
