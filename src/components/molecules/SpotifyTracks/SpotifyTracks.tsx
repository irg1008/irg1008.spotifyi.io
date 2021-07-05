import Styled from "./SpotifyTracks.styles";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMemo, useState } from "react";
import Loading from "components/atoms/Loading";
import Image from "next/image";
import useSpotify from "hooks/useSpotify";
type TTrack = SpotifyApi.TrackObjectFull;

interface ISpotifyTrack {
	track: TTrack;
}

interface ISpotifyTracks {
	tracks: TTrack[];
}

const SpotifyCard = ({ track }: ISpotifyTrack) => {
	const { spotify, withSpotify } = useSpotify();

	const addToQueue = async () => {
		await withSpotify(() => spotify.queue(track.uri));
	};

	const playSong = async () => {
		await addToQueue();
		await withSpotify(() => spotify.skipToNext());
	};

	const image = track.album?.images[0];
	const blurImage = track.album?.images[1];

	return (
		<Styled.Card>
			<Styled.SongTitle>{track.name}</Styled.SongTitle>
			<Styled.SongArtist>
				{track.artists.map((a) => a.name).join(" - ")}
			</Styled.SongArtist>
			<Styled.SongImg>
				<a href={track.external_urls.spotify} target="_blank" rel="noreferrer">
					<Image
						src={image.url}
						alt={track.name}
						width={image.width}
						height={image.height}
						placeholder="blur"
						blurDataURL={blurImage.url}
					/>
				</a>
			</Styled.SongImg>
			<Styled.Audio controls={false}>
				<source src={track.preview_url} />
			</Styled.Audio>
			<Styled.Buttons>
				<Styled.Button onClick={playSong}>Play</Styled.Button>
				<Styled.Button onClick={addToQueue}>Add to Queue</Styled.Button>
			</Styled.Buttons>
		</Styled.Card>
	);
};

const SpotifyTracks = ({ tracks }: ISpotifyTracks) => {
	const initialValue = 40;
	const incrementValue = 20;

	const [offset, setOffset] = useState(initialValue);
	const partials = useMemo(() => tracks.slice(0, offset), [offset, tracks]);
	const tracksLength = useMemo(() => tracks?.length, [tracks]);
	const hasMore = useMemo(() => offset < tracksLength, [offset, tracksLength]);

	const next = () => setOffset(offset + incrementValue);

	return tracksLength === 0 ? (
		<Styled.NotFoundText>No songs match search parameters</Styled.NotFoundText>
	) : (
		<InfiniteScroll
			dataLength={partials?.length}
			{...{ hasMore, next }}
			loader={<Loading text="Fetching more songs..." />}
		>
			<Styled.Songs>
				{partials?.map((track) => (
					<SpotifyCard key={track.id} {...{ track }} />
				))}
			</Styled.Songs>
		</InfiniteScroll>
	);
};

export default SpotifyTracks;
