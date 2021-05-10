import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GlobalStyle from "styles/GlobalStyle";
import Styled from "./Layout.styles";
import Loading from "components/atoms/Loading";

const Layout: React.FC = ({ children }) => (
  <Styled.Layout>
    <header></header>
    <Styled.Main>{children}</Styled.Main>
    <footer></footer>
  </Styled.Layout>
);

const DynamicLayout: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const pageLoading = () => setLoading(true);
  const pageLoaded = () => setLoading(false);

  const router = useRouter();

  // Handle page load.
  useEffect(() => {
    router.events.on("routeChangeStart", pageLoading);
    router.events.on("routeChangeComplete", pageLoaded);
    router.events.on("routeChangeError", pageLoaded);
  }, []);

  return (
    <>
      {loading && <Loading />}
      <GlobalStyle />
      <Layout>{children}</Layout>
    </>
  );
};

export default DynamicLayout;
