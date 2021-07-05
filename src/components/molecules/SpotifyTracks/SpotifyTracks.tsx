import Styled from "./SpotifyTracks.styles";
import { Variants, Variant } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCallback, useEffect, useState } from "react";
import Loading from "components/atoms/Loading";
import Image from "next/image";
import useSpotify from "hooks/useSpotify";

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
		rotate: -12,
	},
	anim: {
		rotate: 0,
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

	return (
		<Styled.Card variants={card}>
			<Styled.SongTitle>{track.name}</Styled.SongTitle>
			<Styled.SongArtist>
				{track.artists.map((a) => a.name).join(" - ")}
			</Styled.SongArtist>
			<Styled.SongImg variants={cardImg}>
				<a href={track.external_urls.spotify} target="_blank" rel="noreferrer">
					<Image src={image.url} alt={track.name} layout="fill" />
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
	const [offset, setOffset] = useState(0);
	const [partial, setPartial] = useState<typeof tracks>([]);

	const appendNewTracks = useCallback((reset?: boolean) => {
		const initOffset = reset ? 0 : offset;
		const endOffset = initOffset + limit;

		const slicedTracks = tracks?.slice(initOffset, endOffset);

		if (slicedTracks) {
			const newPartial =
				reset || !partial ? slicedTracks : partial.concat(slicedTracks);

			setOffset(endOffset);
			setPartial(newPartial);
		}
	}, []);

	useEffect(() => {
		appendNewTracks(true);
	}, [tracks]);

	if (tracks?.length === 0)
		return (
			<Styled.NotFoundText>
				No songs match search parameters
			</Styled.NotFoundText>
		);

	const limit = 30;

	return (
		<InfiniteScroll
			dataLength={partial.length}
			next={appendNewTracks}
			hasMore={offset < tracks.length}
			loader={<Loading text="Fetching more songs..." />}
		>
			<Styled.Songs initial="hide" animate="anim">
				{partial?.map((track) => (
					<SpotifyCard key={track.id} {...{ track }} />
				))}
			</Styled.Songs>
		</InfiniteScroll>
	);
};

export default SpotifyTracks;
