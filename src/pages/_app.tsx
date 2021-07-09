import Head from "components/atoms/Head";
import Layout from "templates/Layout";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head title="Your music API" />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
};

export default App;
