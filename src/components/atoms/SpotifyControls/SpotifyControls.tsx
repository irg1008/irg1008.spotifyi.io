import Styled from "./SpotifyControls.styles";
import { Variants, Variant } from "framer-motion";
import PopUp from "components/atoms/PopUp";
import Image from "next/image";
import useSpotifySDK from "hooks/useSpotifySDK";
import useToggle from "hooks/useToggle";
import Range from "components/atoms/Range";
import { parseMills } from "util/time";
import { useSpotifyDevice } from "hooks/useSpotify";
import { HiChevronDown as ChevronDownIcon } from "react-icons/hi";
import useRefData from "hooks/useRefData";
import Tooltip from "components/atoms/Tooltip";
import { useEffect } from "react";

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

const SpotifyDevices = () => {
	const { isReady, device, state } = useSpotifySDK();

	// CURRENT DEVICES.
	const { getDevices, devices, transferPlayback, activeDevice } =
		useSpotifyDevice();

	useEffect(() => {
		if (isReady) {
			getDevices();
		}
	}, [isReady, getDevices, state]);

	return (
		<Tooltip
			content={
				<Styled.Devices>
					{devices?.map((device) => (
						<Styled.Device
							key={device.id}
							active={device.is_active}
							onClick={() => transferPlayback(device.id)}
						>
							{device.is_active && <Styled.SoundIcon />}
							{device.name}
						</Styled.Device>
					))}
				</Styled.Devices>
			}
			onHoverOutclose={false}
		>
			<Styled.Button>
				<Styled.DevicesIcon />
			</Styled.Button>
		</Tooltip>
	);
};

const MuteButton = () => {
	const { useVolume } = useSpotifySDK();

	// VOLUME.
	const { isMuted, toggleMuted, currentVolume, setVolume } = useVolume();

	return (
		<Tooltip
			content={
				<Styled.Progress>
					<Range
						min={0}
						max={1}
						step={0.01}
						value={currentVolume}
						onChangeEvent={(val) => setVolume(val)}
					/>
				</Styled.Progress>
			}
			onHoverOutclose={false}
			position="right"
		>
			<Styled.Button onClick={toggleMuted} variants={button}>
				{isMuted ? <Styled.MutedIcon /> : <Styled.UnMutedIcon />}
			</Styled.Button>
		</Tooltip>
	);
};

const TrackImage = () => {
	const { state } = useSpotifySDK();

	// SONG.
	const song = state?.track_window.current_track;

	return (
		!!song && (
			<Tooltip
				content={
					<>
						<Styled.Text>
							<h4>{song.name}</h4>
							<span>
								{song.artists.map((artist) => artist.name).join(" - ")}
							</span>
						</Styled.Text>
					</>
				}
				position="left"
			>
				<Styled.Button variants={button}>
					<Image src={song.album.images[1].url} layout="fill" alt={song.name} />
				</Styled.Button>
			</Tooltip>
		)
	);
};

const SpotifyControls = () => {
	const { state, useController, useProgress } = useSpotifySDK();

	// CONTROLLERS.
	const { nextTrack, prevTrack, togglePlay, goTo } = useController();

	// PROGRESS.
	const { progress, setProgress, setPaused } = useProgress();

	// Pop Ups.
	const [showControls, toggleShowControls] = useToggle(true);

	// CONTAINER HEIGHT.
	const [containerRef, { height: containerHeight }] =
		useRefData<HTMLDivElement>();

	return (
		<>
			<Styled.Container height={containerHeight} isOpen={showControls}>
				<Styled.Down onClick={toggleShowControls}>
					<Styled.Chevron isOpen={showControls}>
						<ChevronDownIcon />
					</Styled.Chevron>
				</Styled.Down>
				<Styled.Wrapper ref={containerRef}>
					<SpotifyDevices />
					{!!state && (
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
								<TrackImage />
								<Styled.Button onClick={prevTrack} variants={button}>
									<Styled.PreviousIcon />
								</Styled.Button>
								<Styled.Button onClick={togglePlay} variants={button}>
									{state?.paused ? <Styled.PlayIcon /> : <Styled.PauseIcon />}
								</Styled.Button>
								<Styled.Button onClick={nextTrack} variants={button}>
									<Styled.NextIcon />
								</Styled.Button>
								<MuteButton />
							</Styled.Controls>
						</>
					)}
				</Styled.Wrapper>
			</Styled.Container>
		</>
	);
};

export default SpotifyControls;
