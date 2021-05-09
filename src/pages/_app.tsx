import Head from "components/atoms/Head";
import Store from "providers/Store";
import Layout from "templates/Layout";

interface AppProps {
  Component: React.ComponentType;
  pageProps: null;
}

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
