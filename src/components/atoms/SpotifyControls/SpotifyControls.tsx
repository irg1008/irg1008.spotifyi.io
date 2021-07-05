import Styled from "./SpotifyControls.styles";
import { Variants, Variant } from "framer-motion";
import PopUp from "components/atoms/PopUp";
import Image from "next/image";
import useSpotifySDK from "hooks/useSpotifySDK";
import useToggle from "hooks/useToggle";
import Range from "components/atoms/Range";
import { parseMills } from "util/time";

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
	const { state, useVolume, useController, useProgress } = useSpotifySDK();

	// VOLUME.
	const { isMuted, toggleMuted, currentVolume, setVolume } = useVolume();

	// CONTROLLERS.
	const { nextTrack, prevTrack, togglePlay, goTo } = useController();

	// SONG.
	const song = state?.track_window.current_track;

	// PROGRESS
	const { progress, setProgress } = useProgress();

	// Pop Up.
	const {
		isOn: isOpen,
		toggleIsOn: togglePopUp,
		setIsOn: setIsOpen,
	} = useToggle();

	const {
		isOn: isOpen2,
		toggleIsOn: togglePopUp2,
		setIsOn: setIsOpen2,
	} = useToggle();

	const {
		isOn: isOpen3,
		toggleIsOn: togglePopUp3,
		setIsOn: setIsOpen3,
	} = useToggle();

	const {
		isOn: isOpen4,
		toggleIsOn: togglePopUp4,
		setIsOn: setIsOpen4,
	} = useToggle();

	return (
		<>
			<PopUp {...{ isOpen, setIsOpen }}>
				<p>Name: {song?.name}</p>
				<p>Artists: {song?.artists.map((artist) => artist.name).join(" - ")}</p>
			</PopUp>
			<PopUp isOpen={isOpen2} setIsOpen={setIsOpen2}>
				<p>NEXT SONGS</p>
				{state?.track_window.next_tracks.map((t) => (
					<p key={t.id}>{t.name}</p>
				))}
			</PopUp>
			<PopUp isOpen={isOpen3} setIsOpen={setIsOpen3}>
				<p>PREVIOUS SONGS</p>
				{state?.track_window.previous_tracks.map((t) => (
					<p key={t.id}>{t.name}</p>
				))}
			</PopUp>
			<PopUp isOpen={isOpen4} setIsOpen={setIsOpen4}>
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
			<Styled.Controls initial="hide" animate="show" variants={buttonsCont}>
				{song && (
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
				)}
				<Styled.Progress variants={button}>
					<p>{parseMills(progress)}</p>
					<Range
						min={0}
						max={state?.duration}
						step={200}
						value={progress}
						onChangeEvent={(val) => setProgress(val)}
						onReleaseEvent={() => goTo(progress)}
					/>
					<p>{parseMills(state?.duration)}</p>
				</Styled.Progress>
				<Styled.Button
					onClick={prevTrack}
					onHoverStart={togglePopUp3}
					onHoverEnd={togglePopUp3}
					variants={button}
				>
					<Styled.Previous />
				</Styled.Button>
				<Styled.Button onClick={togglePlay} variants={button}>
					{state?.paused ? <Styled.Play /> : <Styled.Pause />}
				</Styled.Button>
				<Styled.Button
					onClick={nextTrack}
					onHoverStart={togglePopUp2}
					onHoverEnd={togglePopUp2}
					variants={button}
				>
					<Styled.Next />
				</Styled.Button>
				<Styled.Button
					onClick={toggleMuted}
					onHoverStart={togglePopUp4}
					variants={button}
				>
					{isMuted ? <Styled.Muted /> : <Styled.UnMuted />}
				</Styled.Button>
			</Styled.Controls>
		</>
	);
};

export default SpotifyControls;
