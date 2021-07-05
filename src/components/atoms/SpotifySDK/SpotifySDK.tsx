import Script from "next/script";
import useSpotifySDK from "hooks/useSpotifySDK";
import { useEffect } from "react";

const SpotifySDK = () => {
	const { onSpotifySDKLoad } = useSpotifySDK();

	useEffect(() => {
		window["onSpotifyWebPlaybackSDKReady"] = onSpotifySDKLoad;
	}, [onSpotifySDKLoad]);

	return (
		<>
			<Script src="https://sdk.scdn.co/spotify-player.js" />
		</>
	);
};

export default SpotifySDK;
