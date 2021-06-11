import { getAuthUrl } from "middleware/spotify";
import Styled from "./LogIn.styles";

const LogIn = () => {
	const logIn = async () => {
		// Get Spotify Url.
		const { url } = await getAuthUrl();
		// Redirect to url.
		window.location.href = url;
	};

	return (
		<Styled.Container>
			<Styled.Title>SPOTIFY API SONG TEST</Styled.Title>
			<Styled.LogIn>
				<Styled.Button
					drag
					dragConstraints={{
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
					}}
					dragElastic={0.1}
					whileDrag={{ scale: 0.9 }}
					onDragEnd={logIn}
				>
					LOG IN
				</Styled.Button>
			</Styled.LogIn>
			<Styled.Container>
				<Styled.Arrow />
				<Styled.InfoText>Drag to Log In with Spotify</Styled.InfoText>
			</Styled.Container>
		</Styled.Container>
	);
};

export default LogIn;
