import useSpotify from "hooks/useSpotify";
import { useEffect, useState } from "react";
import idGen from "util/idGen";
import SpotifyControls from "components/atoms/SpotifyControls";
import Styled from "./SpotifyHome.styles";

const Tracks = () => {
  const { spotify, withSpotify } = useSpotify();

  // TRACKS
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>();
  const getTracks = async () => {
    const res = await withSpotify(() =>
      spotify.getMySavedTracks({ limit: 50 })
    );
    const tracks = res?.items?.map((item) => item.track);
    setTracks(tracks);
  };

  // ON LOAD.
  useEffect(() => {
    getTracks();
  }, []);

  return (
    <>
      <Styled.Title>SONGS</Styled.Title>
      <Styled.Songs>
        {Array.isArray(tracks) &&
          tracks?.map((t) => (
            <Styled.Card key={idGen()}>
              <Styled.SongTitle>{t.name}</Styled.SongTitle>
              <Styled.SongArtist>
                {t.artists.map((a) => a.name).join(" - ")}
              </Styled.SongArtist>
              <a href={t.external_urls.spotify} target="_blank">
                <Styled.SongImg src={t.album?.images[0].url} alt={t.name} />
              </a>
              <Styled.Audio controls>
                <source src={t.preview_url} />
              </Styled.Audio>
            </Styled.Card>
          ))}
      </Styled.Songs>
    </>
  );
};

const Playlists = () => {
  const { spotify, withSpotify } = useSpotify();

  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >();
  const getPlaylists = async () => {
    const res = await withSpotify(() => spotify.getUserPlaylists());
    setPlaylists(res.items);
  };

  // ON LOAD.
  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <>
      <Styled.Title>PLAYLISTS</Styled.Title>
      <Styled.Songs>
        {Array.isArray(playlists) &&
          playlists?.map((p) => (
            <Styled.Card key={idGen()}>
              <Styled.SongTitle>{p.name}</Styled.SongTitle>
              <Styled.SongArtist>{p.description}</Styled.SongArtist>
              <Styled.SongArtist>{p.owner.display_name}</Styled.SongArtist>
              <a href={p.external_urls.spotify} target="_blank">
                <Styled.SongImg src={p.images[0]?.url} alt={p.name} />
              </a>
            </Styled.Card>
          ))}
      </Styled.Songs>
    </>
  );
};

const SpotifyHome = () => {
  return (
    <Styled.Home>
      <Tracks />
      <Playlists />
      <SpotifyControls />
    </Styled.Home>
  );
};

export default SpotifyHome;
