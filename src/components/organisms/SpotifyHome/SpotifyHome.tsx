import useSpotify, { useTracks } from "hooks/useSpotify";
import { useEffect, useState, useCallback } from "react";
import SpotifyControls from "components/atoms/SpotifyControls";
import Styled from "./SpotifyHome.styles";
import SearchBar from "components/atoms/SearchBar";
import SpotifyTracks from "components/molecules/SpotifyTracks";
import Loading from "components/atoms/Loading";
import Image from "next/image";
import SpotifySDK from "components/atoms/SpotifySDK";
import SideNavTest from "temp/SideNavTest";
import ToggleFlip from "components/atoms/ToggleFlip";

const Tracks = () => {
	const [value, setValue] = useState<string>();
	const { tracks, filteredTracks } = useTracks(value);

	return (
		<Styled.Tracks>
			<Styled.Title>Songs</Styled.Title>
			{!!tracks ? (
				<>
					<SearchBar ph="Searh name or artist" onChange={setValue} />
					<SpotifyTracks tracks={filteredTracks} />
				</>
			) : (
				<Loading text="Loading Songs..." />
			)}
		</Styled.Tracks>
	);
};

const Navbar = () => {
	const { spotify, withSpotify, logOut } = useSpotify();

	// Get user pipeline.
	const [user, setUser] = useState<SpotifyApi.CurrentUsersProfileResponse>();

	const getUser = useCallback(async () => {
		const user = await withSpotify(() => spotify.getMe());
		setUser(user);
	}, [spotify, withSpotify]);

	useEffect(() => {
		getUser();
	}, [getUser]);

	return (
		<Styled.Navbar>
			{user && (
				<>
					<Styled.Name>{user?.display_name}</Styled.Name>
					<Styled.Avatar
						href={user?.uri}
						target="_blank"
						rel="noreferrer"
						title={`Visit profile (${user.product} user)`}
					>
						<Styled.Img>
							<Image
								src={user.images[0].url}
								width={10}
								height={10}
								layout="responsive"
								alt={user?.display_name}
							/>
						</Styled.Img>
						{user.product === "premium" ? (
							<Styled.PremiumIcon />
						) : (
							<Styled.PoorIcon />
						)}
					</Styled.Avatar>
					<Styled.Button onClick={logOut}>Log Out</Styled.Button>
				</>
			)}
		</Styled.Navbar>
	);
};

const SpotifyHome = () => {
	return (
		<Styled.Home>
			<Navbar />
			<Tracks />
			<SpotifyControls />
			<SpotifySDK />
			<SideNavTest />
		</Styled.Home>
	);
};

export default SpotifyHome;
