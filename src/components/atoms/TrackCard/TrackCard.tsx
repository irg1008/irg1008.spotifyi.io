import useSpotify from "hooks/useSpotify";
import { Suspense } from "react";
import Styled from "./TrackCard.styles";
import Image from "next/image";

interface ITrackCardProps {
	track: SpotifyApi.TrackObjectFull;
}

const FilledCard = ({ track }: ITrackCardProps) => {
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

const EmptyCard = () => {
	return (
		<Styled.Card>
			<Styled.EmptyTitle />
			<Styled.EmptyArtist />
			<Styled.EmptyImage />
			<Styled.Buttons>
				<Styled.EmptyButton />
				<Styled.EmptyButton />
			</Styled.Buttons>
		</Styled.Card>
	);
};

const TrackCard = ({ track }: ITrackCardProps) =>
	!!track ? <FilledCard {...{ track }} /> : <EmptyCard />;

export default TrackCard;
