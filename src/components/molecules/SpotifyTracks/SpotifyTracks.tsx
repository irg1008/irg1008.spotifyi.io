import Styled from "./SpotifyTracks.styles";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMemo, useState } from "react";
import Loading from "components/atoms/Loading";
import TrackCard from "components/atoms/TrackCard";

interface ISpotifyTracks {
	tracks: SpotifyApi.TrackObjectFull[];
}

const SpotifyTracks = ({ tracks }: ISpotifyTracks) => {
	const initialValue = 40;
	const incrementValue = 20;

	const [offset, setOffset] = useState<number>(initialValue);
	const partials = useMemo(() => tracks.slice(0, offset), [offset, tracks]);
	const tracksLength = useMemo(() => tracks?.length, [tracks]);
	const hasMore = useMemo(() => offset < tracksLength, [offset, tracksLength]);

	const next = () =>
		setOffset((oldOffset) =>
			Math.min(oldOffset + incrementValue, tracksLength),
		);

	return tracksLength === 0 ? (
		<Styled.NotFoundText>No songs match search parameters</Styled.NotFoundText>
	) : (
		<InfiniteScroll
			dataLength={partials?.length}
			{...{ hasMore, next }}
			loader={
				<Loading text={`Fetching more songs (${offset}/${tracksLength})`} />
			}
			endMessage={<Loading text={`${offset} songs loaded`} />}
		>
			<Styled.Songs>
				{partials?.map((track) => (
					<TrackCard key={track.id} {...{ track }} />
				))}
			</Styled.Songs>
		</InfiniteScroll>
	);
};

export default SpotifyTracks;
