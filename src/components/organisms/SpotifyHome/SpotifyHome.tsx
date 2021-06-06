import useSpotify from "hooks/useSpotify";
import { useEffect, useState, useCallback, useMemo } from "react";
import SpotifyControls from "components/atoms/SpotifyControls";
import Styled from "./SpotifyHome.styles";
import SearchBar from "components/atoms/SearchBar";
import SpotifyTracks from "components/molecules/SpotifyTracks";
import Loading from "components/atoms/Loading";
import { useSpotify as useSpotifyConsumer } from "providers/SpotifyProvider";
import ToggleFlip from "components/atoms/ToggleFlip";
import ToggleTheme from "components/atoms/ToggleTheme";

const Tracks = () => {
  // Get 50 next tracks tracks.
  const fetchTracks = async function* () {
    const limit = 50;
    let offset = 0;

    while (true) {
      const res = await withSpotify(() =>
        spotify.getMySavedTracks({ limit, offset })
      );

      const newTracks = res?.items.map((i) => i.track);
      yield newTracks;

      const total = res.total;
      offset += limit;
      if (offset > total) break;
    }
  };

  const { spotify, withSpotify } = useSpotify();

  // TRACKS
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
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

  const [loaded, setLoaded] = useState(false);

  const getTracks = useCallback(async () => {
    for await (const i of fetchTracks()) {
      setTracks((oldTracks) => [...oldTracks, ...i]);
      !loaded && setLoaded(true);
    }
  }, []);

  // ON LOAD.
  useEffect(() => {
    getTracks();
  }, []);

  return (
    <Styled.Tracks>
      <Styled.Title>Songs</Styled.Title>
      {loaded ? (
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

  const { spotify, withSpotify } = useSpotify();

  // Get user pipeline.
  const [user, setUser] = useState<SpotifyApi.CurrentUsersProfileResponse>();
  const fetchUser = async () => await withSpotify(() => spotify.getMe());
  const getUser = async () => {
    const user = await fetchUser();
    setUser(user);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Styled.Navbar>
      <ToggleTheme />
      <ToggleFlip />
      <Styled.Button onClick={logOut}>Log Out</Styled.Button>
      {user?.product === "premium" ? (
        <Styled.PremiumIcon />
      ) : (
        <Styled.PoorIcon />
      )}
      <Styled.Name>{user?.display_name}</Styled.Name>
      <a href={user?.uri} target="_blank">
        <Styled.Img src={user?.images[0].url} />
      </a>
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
