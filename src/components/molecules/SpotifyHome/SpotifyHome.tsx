import useSpotify from "hooks/useSpotify";
import { useEffect, useState, useCallback, useMemo } from "react";
import SpotifyControls from "components/atoms/SpotifyControls";
import Styled from "./SpotifyHome.styles";
import { Variants, Variant } from "framer-motion";
import SearchBar from "components/atoms/SearchBar";

interface CustomVariants extends Variants {
  hide: Variant;
  show: Variant;
}

const card: CustomVariants = {
  hide: {
    opacity: 0,
    scale: 0.9,
    translateY: -40,
  },
  show: {
    opacity: 1,
    scale: 1,
    translateY: 0,
    transition: {
      duration: 1.5,
      type: "spring",
      bounce: 0.15,
    },
  },
};

const cardImg: CustomVariants = {
  hide: {
    rotate: 0,
  },
  show: {
    rotate: -12,
    scale: 0.8,
    transition: {
      duration: 2,
      type: "spring",
      bounce: 0.15,
    },
  },
};

const Tracks = () => {
  const { spotify, withSpotify } = useSpotify();

  // TRACKS
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>();
  const [value, setValue] = useState("");

  // Filter tracks.
  const filteredTracks =
    useMemo(
      () =>
        tracks?.filter(
          (t) =>
            t.name.toLowerCase().includes(value?.toLowerCase()) ||
            t.artists.some((a) => a.name.toLowerCase().includes(value))
        ),
      [value]
    ) || tracks;
  const filterTracks = (value: string) => setValue(value);

  // Get tracks.
  const getTracks = useCallback(async () => {
    const res = await withSpotify(() =>
      spotify.getMySavedTracks({ limit: 50 })
    );
    const tracks = res?.items?.map((item) => item.track);
    setTracks(tracks);
  }, []);

  // ON LOAD.
  useEffect(() => {
    getTracks();
  }, []);

  return (
    Array.isArray(tracks) && (
      <>
        <Styled.Title>SONGS</Styled.Title>
        <SearchBar ph="Searh name or artist" onChange={filterTracks} />
        {filteredTracks?.length === 0 ? (
          <Styled.NotFoundText>
            No songs match search parameters
          </Styled.NotFoundText>
        ) : (
          <Styled.Songs initial="hide" animate="show">
            {filteredTracks?.map((t) => (
              <Styled.Card key={t.id} variants={card}>
                <Styled.SongTitle>{t.name}</Styled.SongTitle>
                <Styled.SongArtist>
                  {t.artists.map((a) => a.name).join(" - ")}
                </Styled.SongArtist>
                <a href={t.external_urls.spotify} target="_blank">
                  <Styled.SongImg
                    src={t.album?.images[0].url}
                    alt={t.name}
                    variants={cardImg}
                  />
                </a>
                <Styled.Audio controls>
                  <source src={t.preview_url} />
                </Styled.Audio>
              </Styled.Card>
            ))}
          </Styled.Songs>
        )}
      </>
    )
  );
};

const SpotifyHome = () => {
  return (
    <Styled.Home>
      <Tracks />
      <SpotifyControls />
    </Styled.Home>
  );
};

export default SpotifyHome;
