import { SpotifyProvider } from "./SpotifyProvider";

const Store: React.FC = ({ children }) => (
  <SpotifyProvider>{children}</SpotifyProvider>
);

export default Store;
