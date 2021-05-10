import Head from "components/atoms/Head";
import SpotifyHome from "components/organisms/SpotifyHome";
import LogIn from "components/atoms/LogIn";
import { useSpotify } from "providers/SpotifyProvider";

const Home = () => {
  const {
    state: { isLogged },
  } = useSpotify();

  return (
    <>
      <Head title="Inicio" />
      {isLogged ? <SpotifyHome /> : <LogIn />}
    </>
  );
};

export default Home;
