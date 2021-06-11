import Head from "components/atoms/Head";
import Store from "providers/Store";
import Layout from "templates/Layout";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Store>
			<Head title="Your music API" />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Store>
	);
};

export default App;
