import Head from "components/atoms/Head";
import Layout from "templates/Layout";
import type { AppProps } from "next/app";
import { SpotifyProvider } from "providers/SpotifyProvider";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head title="Your music API" />
			<SpotifyProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</SpotifyProvider>
		</>
	);
};

export default App;
