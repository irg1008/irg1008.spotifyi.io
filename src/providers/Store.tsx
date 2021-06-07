import { SpotifyProvider } from "./SpotifyProvider";

const Store: React.FC = ({ children }) => {
	return <SpotifyProvider>{children}</SpotifyProvider>;
};

export default Store;
