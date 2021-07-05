import Styled from "./SpotifyControls.styles";
import { Variants, Variant } from "framer-motion";
import PopUp from "components/atoms/PopUp";
import Image from "next/image";
import useSpotifySDK from "hooks/useSpotifySDK";
import useToggle from "hooks/useToggle";
import Range from "components/atoms/Range";
import { parseMills } from "util/time";
import useSpotify from "hooks/useSpotify";
import { useEffect, useState } from "react";

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
	const { player, state, useVolume, useController, useProgress } =
		useSpotifySDK();

	// VOLUME.
	const { isMuted, toggleMuted, currentVolume, setVolume } = useVolume();

	// CONTROLLERS.
	const { nextTrack, prevTrack, togglePlay, goTo } = useController();

	// SONG.
	const song = state?.track_window.current_track;

	// PROGRESS.
	const { progress, setProgress, setPaused } = useProgress();

	// Pop Ups.
	const {
		isOn: isOpen,
		toggleIsOn: togglePopUp,
		setIsOn: setIsOpen,
	} = useToggle();

	const {
		isOn: isOpenVolume,
		toggleIsOn: togglePopUpVolume,
		setIsOn: setIsOpenVolume,
	} = useToggle();

	const { spotify, withSpotify } = useSpotify();

	return (
		<>
			<PopUp {...{ isOpen, setIsOpen }}>
				<p>Name: {song?.name}</p>
				<p>Artists: {song?.artists.map((artist) => artist.name).join(" - ")}</p>
			</PopUp>
			<PopUp isOpen={isOpenVolume} setIsOpen={setIsOpenVolume}>
				<Styled.Progress variants={button}>
					<Range
						min={0}
						max={1}
						step={0.01}
						value={currentVolume}
						onChangeEvent={(val) => setVolume(val)}
					/>
				</Styled.Progress>
			</PopUp>
			<Styled.Container>
				{!!state ? (
					<>
						<Styled.Progress variants={button}>
							<p>{parseMills(progress | 0)}</p>
							<Range
								min={0}
								max={state?.duration}
								step={200}
								value={progress}
								onChangeEvent={(val) => setProgress(val)}
								onReleaseEvent={() => {
									goTo(progress);
									setPaused(false);
								}}
								onDrag={() => setPaused(true)}
							/>
							<p>{parseMills(state?.duration | 0)}</p>
						</Styled.Progress>
						<Styled.Controls
							initial="hide"
							animate="show"
							variants={buttonsCont}
						>
							<Styled.Button
								onHoverStart={togglePopUp}
								onHoverEnd={togglePopUp}
								variants={button}
							>
								<Image
									src={song?.album.images[0].url}
									layout="fill"
									alt={song?.name}
								/>
							</Styled.Button>
							<Styled.Button onClick={prevTrack} variants={button}>
								<Styled.Previous />
							</Styled.Button>
							<Styled.Button onClick={togglePlay} variants={button}>
								{state?.paused ? <Styled.Play /> : <Styled.Pause />}
							</Styled.Button>
							<Styled.Button onClick={nextTrack} variants={button}>
								<Styled.Next />
							</Styled.Button>
							<Styled.Button
								onClick={toggleMuted}
								onHoverStart={togglePopUpVolume}
								variants={button}
							>
								{isMuted ? <Styled.Muted /> : <Styled.UnMuted />}
							</Styled.Button>
						</Styled.Controls>
					</>
				) : (
					<p>Elige este dispositivo en la aplicación de Spotify</p>
				)}
			</Styled.Container>
		</>
	);
};

export default SpotifyControls;
