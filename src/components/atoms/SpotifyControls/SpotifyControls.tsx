import useSpotify from "hooks/useSpotify";
import { useCallback, useEffect, useState } from "react";
import Styled from "./SpotifyControls.styles";
import { Variants, Variant } from "framer-motion";
import PopUp from "../PopUp";
import Image from "next/image";

interface CustomVariants extends Variants {
	hide: Variant;
	show: Variant;
}

const buttonsCont: CustomVariants = {
	hide: {
		translateY: 100,
	},
	show: {
		translateY: 0,
		transition: {
			type: "spring",
			duration: 2,
			bounce: 0,
			staggerChildren: 0.2,
		},
	},
};

const button: CustomVariants = {
	hide: {
		opacity: 0,
		translateY: "100%",
	},
	show: {
		opacity: 1,
		translateY: 0,
		transition: {
			duration: 2,
			type: "spring",
			bounce: 0.15,
		},
	},
};

const SpotifyControls = () => {
	const { spotify, withSpotify } = useSpotify();

	const [song, setSong] = useState<SpotifyApi.TrackObjectFull>();
	const [device, setDevice] = useState<SpotifyApi.UserDevice>();
	const [playing, setPlaying] = useState<boolean>();
	const [progress, setProgress] = useState<number>();

	// CHECK IF USER IS PLAYING.
	const checkPlayState = useCallback(async () => {
		const res = await withSpotify(() => spotify.getMyCurrentPlaybackState());
		if (res) {
			const { item, device, is_playing, progress_ms } = res;
			setSong(item);
			setPlaying(is_playing);
			setDevice(device);
			setProgress(progress_ms);
		}
	}, []);

	// TOGGLE PLAY.
	const togglePlay = async () => {
		playing
			? await withSpotify(() => spotify.pause())
			: await withSpotify(() => spotify.play());
		checkPlayState();
	};

	// NEXT-PREV.
	const next = async () => {
		await withSpotify(() => spotify.skipToNext());
		checkPlayState();
	};
	const previous = async () => {
		await withSpotify(() => spotify.skipToPrevious());
		checkPlayState();
	};

	// ON LOAD.
	useEffect(() => {
		checkPlayState();
	}, [checkPlayState]);

	const parseMs = (ms: number) =>
		`${Math.floor((ms / 1000 / 60) << 0)}:${Math.floor((ms / 1000) & 60)}`;

	const [isOpen, setIsOpen] = useState(false);
	const togglePopUp = () => setIsOpen(!isOpen);

	return (
		<>
			{song && (
				<PopUp {...{ isOpen, setIsOpen }}>
					<p>Device: {device?.name}</p>
					<p>
						Progress: {parseMs(progress)}/{parseMs(song?.duration_ms)}
					</p>
					<p>Name: {song?.name}</p>
					<p>
						Artists: {song?.artists.map((artist) => artist.name).join(" - ")}
					</p>
				</PopUp>
			)}
			<Styled.Controls initial="hide" animate="show" variants={buttonsCont}>
				{song && (
					<Styled.Button onClick={togglePopUp} variants={button}>
						<Image
							src={song?.album.images[0].url}
							layout="fill"
							alt={song?.name}
						/>
					</Styled.Button>
				)}
				<Styled.Button onClick={previous} variants={button}>
					<Styled.Previous />
				</Styled.Button>
				<Styled.Button onClick={togglePlay} variants={button}>
					{playing ? <Styled.Pause /> : <Styled.Play />}
				</Styled.Button>
				<Styled.Button onClick={next} variants={button}>
					<Styled.Next />
				</Styled.Button>
			</Styled.Controls>
		</>
	);
};

export default SpotifyControls;
