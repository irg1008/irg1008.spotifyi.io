import useSpotify from "hooks/useSpotify";
import { useEffect, useState, useCallback, useMemo } from "react";
import SpotifyControls from "components/atoms/SpotifyControls";
import Styled from "./SpotifyHome.styles";
import SearchBar from "components/atoms/SearchBar";
import SpotifyTracks from "components/molecules/SpotifyTracks";
import Loading from "components/atoms/Loading";
import { useSpotify as useSpotifyConsumer } from "providers/SpotifyProvider";

const Tracks = () => {
  const { spotify, withSpotify } = useSpotify();

  // TRACKS
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>();
  const [value, setValue] = useState("");

  // Filter tracks.
  const filterTracks = (value: string) => setValue(value);
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

  // Get tracks.
  const fetchTracks = async function* () {
    const limit = 50;
    let offset = 0;

    while (true) {
      const res = await withSpotify(() =>
        spotify.getMySavedTracks({ limit, offset })
      );

      const newTracks = res?.items.map((i) => i.track);
      yield* newTracks;

      const total = res.total;
      offset += limit;
      if (offset > total) break;
    }
  };

  const getTracks = useCallback(async () => {
    setTracksLoaded(false);
    const fetchedTracks: typeof tracks = [];
    for await (const i of fetchTracks()) fetchedTracks.push(i);
    setTracks(fetchedTracks);
    setTracksLoaded(true);
  }, []);

  // ON LOAD.
  const [tracksLoaded, setTracksLoaded] = useState<boolean>();
  useEffect(() => {
    getTracks();
  }, []);

  return (
    <Styled.Tracks>
      <Styled.Title>Songs</Styled.Title>
      {tracksLoaded ? (
        <>
          <SearchBar ph="Searh name or artist" onChange={filterTracks} />
          <SpotifyTracks tracks={filteredTracks} />
        </>
      ) : (
        <Loading text="Loading Songs..." />
      )}
    </Styled.Tracks>
  );
};

const Navbar = () => {
  const { dispatch } = useSpotifyConsumer();
  const logOut = () => dispatch({ type: "LOG_OUT" });
  return (
    <Styled.Navbar>
      <Styled.LogOut onClick={logOut}>Log Out</Styled.LogOut>
    </Styled.Navbar>
  );
};

const SpotifyHome = () => {
  return (
    <Styled.Home>
      <Tracks />
      <Navbar />
      <SpotifyControls />
    </Styled.Home>
  );
};

export default SpotifyHome;
