import useSpotify from "hooks/useSpotify";
import Styled from "./TrackCard.styles";
import Image from "next/image";
import { useNotifications } from "hooks/useNotifications";
import idGen from "util/idGen";

interface ITrackCardProps {
	track: SpotifyApi.TrackObjectFull;
}

const FilledCard = ({ track }: ITrackCardProps) => {
	const { spotify, withSpotify } = useSpotify();
	const { addNotification } = useNotifications();

	const addTrackNotification = (text: string) =>
		addNotification({
			id: idGen(),
			component: <p>{text}</p>,
			timeout: 1000,
			type: "info",
		});

	const addToSpotifyQueue = async () =>
		await withSpotify(() => spotify.queue(track.uri));

	const playOnSpotify = async () =>
		await withSpotify(() => spotify.play({ uris: [track.uri] }));

	const addToQueue = async () => {
		addToSpotifyQueue();
		addTrackNotification(`${track.name} added to queue`);
	};

	const playSong = async () => {
		await playOnSpotify();
		addTrackNotification(`${track.name} playing now`);
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
