import Styled from "./SpotifyControls.styles";
import { Variants, Variant } from "framer-motion";
import PopUp from "components/atoms/PopUp";
import Image from "next/image";
import useSpotifySDK from "hooks/useSpotifySDK";
import useToggle from "hooks/useToggle";
import Range from "components/atoms/Range";
import { parseMills } from "util/time";
import { useSpotifyDevice } from "hooks/useSpotify";
import { ChevronDownIcon } from "@heroicons/react/solid";
import useRefData from "hooks/useRefData";

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
	const { state, useVolume, useController, useProgress, device } =
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
	const [isOpenSong, toggleIsOpenSong] = useToggle();
	const [isOpenVolume, togglePopUpVolume] = useToggle();
	const [showControls, toggleShowControls] = useToggle(true);

	// CURRENT DEVICES.
	const { activeDevice, transferPlayback } = useSpotifyDevice();

	// CONTAINER HEIGHT.
	const [containerRef, { height: containerHeight }] =
		useRefData<HTMLDivElement>();

	const listenHere = () => transferPlayback(device?.deviceId);

	return (
		<>
			<PopUp isOpen={isOpenSong} onBGClick={toggleIsOpenSong}>
				<Styled.Text>Name: {song?.name}</Styled.Text>
				<Styled.Text>
					Artists: {song?.artists.map((artist) => artist.name).join(" - ")}
				</Styled.Text>
			</PopUp>
			<PopUp isOpen={isOpenVolume} onBGClick={togglePopUpVolume}>
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
			<Styled.Container height={containerHeight} isOpen={showControls}>
				<Styled.Down onClick={toggleShowControls}>
					<Styled.Chevron isOpen={showControls}>
						<ChevronDownIcon />
					</Styled.Chevron>
				</Styled.Down>
				<Styled.Wrapper ref={containerRef}>
					{!!state ? (
						<>
							<Styled.Progress variants={button}>
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
								<Styled.Text>{parseMills(progress | 0)}</Styled.Text>
								<Styled.Text>{parseMills(state?.duration | 0)}</Styled.Text>
							</Styled.Progress>
							<Styled.Controls
								initial="hide"
								animate="show"
								variants={buttonsCont}
							>
								<Styled.Button
									onHoverStart={toggleIsOpenSong}
									onHoverEnd={toggleIsOpenSong}
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
						<>
							<Styled.Text>
								{!!activeDevice
									? `Active device: ${activeDevice?.name}`
									: "There is no active device"}
							</Styled.Text>
							<button onClick={listenHere}>Listen here</button>
						</>
					)}
				</Styled.Wrapper>
			</Styled.Container>
		</>
	);
};

export default SpotifyControls;
