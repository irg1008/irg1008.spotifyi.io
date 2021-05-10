import Head from "components/atoms/Head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { logIn } from "middleware/spotify";
import { useSpotify } from "providers/SpotifyProvider";
import { ISpotifyTokenResponse } from "lib/spotify";
import Loading from "components/atoms/Loading";

const Auth = () => {
  const router = useRouter();
  const { dispatch } = useSpotify();

  useEffect(() => {
    const checkLogIn = async () => {
      const { code } = router.query;
      if (code) {
        // Log in and recieve access token.
        const res = await logIn(code.toString());
        const data: ISpotifyTokenResponse = res?.data;

        if (data) {
          // Set access token to spotify object.
          dispatch({
            type: "SET_ACCESS_TOKEN",
            payload: data,
          });
        }
      }
    };
    checkLogIn();
  }, [router.query]);

  useEffect(() => {
    router.replace("/");
  }, []);

  return (
    <>
      <Head title="Redirecting..." />
      <Loading text="Redirecting..." />
    </>
  );
};

export default Auth;
