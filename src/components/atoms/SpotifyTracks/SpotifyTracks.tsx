import Styled from "./SpotifyTracks.styles";
import { Variants, Variant } from "framer-motion";
import useReachingBottom from "hooks/useReachingBottom";
import useScroll from "hooks/useScroll";
import { useEffect, useMemo, useState } from "react";

interface CustomVariants extends Variants {
  hide: Variant;
  anim: Variant;
}

const card: CustomVariants = {
  hide: {
    opacity: 0,
    scale: 0.9,
    translateY: -40,
  },
  anim: {
    opacity: 1,
    scale: 1,
    translateY: 0,
    transition: {
      duration: 0.8,
      type: "spring",
      bounce: 0.15,
    },
  },
};

const cardImg: CustomVariants = {
  hide: {
    rotate: 0,
  },
  anim: {
    rotate: -12,
    scale: 0.8,
    transition: {
      duration: 1.2,
      type: "spring",
      bounce: 0.15,
    },
  },
};

type TTrack = SpotifyApi.TrackObjectFull;

interface ISpotifyTrack {
  track: TTrack;
}

interface ISpotifyTracks {
  tracks: TTrack[];
}

const SpotifyCard = ({ track }: ISpotifyTrack) => (
  <Styled.Card variants={card}>
    <Styled.SongTitle>{track.name}</Styled.SongTitle>
    <Styled.SongArtist>
      {track.artists.map((a) => a.name).join(" - ")}
    </Styled.SongArtist>
    <a href={track.external_urls.spotify} target="_blank">
      <Styled.SongImg
        src={track.album?.images[0].url}
        alt={track.name}
        variants={cardImg}
      />
    </a>
    <Styled.Audio controls>
      <source src={track.preview_url} />
    </Styled.Audio>
  </Styled.Card>
);

const SpotifyTracks = ({ tracks }: ISpotifyTracks) => {
  if (tracks?.length === 0)
    return (
      <Styled.NotFoundText>
        No songs match search parameters
      </Styled.NotFoundText>
    );

  const [offset, setOffset] = useState(0);
  const [partial, setPartial] = useState<typeof tracks>([]);

  const limit = 20;

  const appendNewTracks = (reset?: boolean) => {
    const initOffset = reset ? 0 : offset;
    const endOffset = initOffset + limit;
    
    const slicedTracks = tracks?.slice(initOffset, endOffset);

    if (slicedTracks) {
      const newPartial =
        reset || !partial ? slicedTracks : partial.concat(slicedTracks);

      setPartial(newPartial);
      setOffset(endOffset);
    }
  };

  useEffect(() => {
    appendNewTracks(true);
  }, [tracks]);

  useReachingBottom(appendNewTracks);

  return (
    <Styled.Songs initial="hide" animate="anim">
      {partial?.map((track) => (
        <SpotifyCard key={track.id} {...{ track }} />
      ))}
    </Styled.Songs>
  );
};

export default SpotifyTracks;
