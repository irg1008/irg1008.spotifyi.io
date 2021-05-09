import useSpotify from "hooks/useSpotify";
import { useCallback, useEffect, useState } from "react";
import Styled from "./SpotifyControls.styles";
import { Variants, Variant } from "framer-motion";

interface CustomVariants extends Variants {
  hide: Variant;
  show: Variant;
}

const buttonsCont: CustomVariants = {
  hide: {
    translateY: 100,
  },
  show: {
    translateY: 0,
    transition: {
      type: "spring",
      duration: 2,
      bounce: 0,
      staggerChildren: 0.2,
    },
  },
};

const button: CustomVariants = {
  hide: {
    opacity: 0,
    translateY: "100%",
  },
  show: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 2,
      type: "spring",
      bounce: 0.15,
    },
  },
};

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
    <Styled.Controls initial="hide" animate="show" variants={buttonsCont}>
      <Styled.Button onClick={previous} variants={button}>
        <Styled.Previous />
      </Styled.Button>
      <Styled.Button onClick={togglePlay} variants={button}>
        {isPlaying ? <Styled.Pause /> : <Styled.Play />}
      </Styled.Button>
      <Styled.Button onClick={next} variants={button}>
        <Styled.Next />
      </Styled.Button>
    </Styled.Controls>
  );
};

export default SpotifyControls;
