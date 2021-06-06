import { SpotifyProvider } from "./SpotifyProvider";
import usetheme from "hooks/useTheme";

const Store: React.FC = ({ children }) => {
	usetheme();
	return <SpotifyProvider>{children}</SpotifyProvider>;
};

export default Store;
