import Head from "components/atoms/Head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getToken } from "middleware/spotify";
import { useSpotify } from "providers/SpotifyProvider";
import { ISpotifyTokenResponse } from "lib/spotify";

const Auth = () => {
  const router = useRouter();
  const {
    dispatch,
    state: { isLogged },
  } = useSpotify();

  useEffect(() => {
    const checkLogIn = async () => {
      const { code } = router.query;
      if (code) {
        // Log in and recieve access token.
        const res = await getToken(code.toString());
        const data: ISpotifyTokenResponse = res?.data;

        if (data) {
          // Set access token to spotify object.
          dispatch({
            type: "LOG_IN",
            payload: data,
          });
        }
      }
    };
    checkLogIn();
  }, [router.query]);

  useEffect(() => {
    isLogged && router.replace("/");
  }, [isLogged]);

  return (
    <>
      <Head title="Redirecting..." />
    </>
  );
};

// TODO: Change the log in check to server side props.

export default Auth;
