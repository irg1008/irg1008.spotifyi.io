import useSpotify from "hooks/useSpotify";
import Styled from "./TrackCard.styles";
import Image from "next/image";
import { useNotifications } from "hooks/useNotifications";
import idGen from "util/idGen";
import { AnimatePresence, Variants, AnimateSharedLayout } from "framer-motion";
import { useState } from "react";

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

	const buttonsVariants: Variants = {
		show: {
			opacity: 1,
			height: 100,
		},
		hide: {
			opacity: 0,
			height: 0,
		},
	};

	const [hoveringParent, setHoveringParent] = useState<boolean>();

	return (
		<Styled.Card
			onMouseEnter={() => setHoveringParent(true)}
			onMouseLeave={() => setHoveringParent(false)}
		>
			<Styled.SongTitle>{track.name}</Styled.SongTitle>
			<Styled.SongArtist>
				{track.artists.map((a) => a.name).join(" - ")}
			</Styled.SongArtist>
			<Styled.SongImg>
				<Image
					src={image.url}
					alt={track.name}
					width={image.width}
					height={image.height}
					placeholder="blur"
					blurDataURL={blurImage.url}
				/>
			</Styled.SongImg>
			{/*<Styled.Audio controls={false}>
					<source src={track.preview_url} />
				</Styled.Audio>*/}
			<Styled.ButtonsContainer
				variants={buttonsVariants}
				initial="hide"
				animate={hoveringParent ? "show" : "hide"}
				transition={{ type: "tween", duration: 0.3 }}
			>
				<Styled.Buttons>
					<Styled.Button onClick={playSong}>Play</Styled.Button>
					<Styled.Button onClick={addToQueue}>Add to Queue</Styled.Button>
				</Styled.Buttons>
			</Styled.ButtonsContainer>
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
