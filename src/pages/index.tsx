import Head from "components/atoms/Head";
import SpotifyHome from "components/organisms/SpotifyHome";
import LogIn from "components/atoms/LogIn";
import useSpotify from "hooks/useSpotify";

const Home = () => {
	const { isLogged } = useSpotify();

	return (
		<>
			<Head title="Inicio" />
			{isLogged ? <SpotifyHome /> : <LogIn />}
		</>
	);
};

export default Home;
