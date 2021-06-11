import Head from "components/atoms/Head";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { getToken } from "middleware/spotify";
import { useSpotify } from "providers/SpotifyProvider";
import { ISpotifyTokenResponse } from "lib/spotify";
import { GetServerSideProps } from "next";

interface IAuthProps {
	code: string;
}

const Auth = ({ code }: IAuthProps) => {
	const router = useRouter();
	const { dispatch } = useSpotify();

	const goHome = () => router.replace("/");

	const checkLogIn = useCallback(async () => {
		if (code === undefined) goHome();

		if (code) {
			// Log in and recieve access token.
			const [res, _] = await getToken(code.toString());
			const data: ISpotifyTokenResponse = res?.data;

			if (data) {
				// Set access token to spotify object.
				dispatch({
					type: "LOG_IN",
					payload: data,
				});
			}
		}

		goHome();
	}, [router.query]);

	useEffect(() => {
		checkLogIn();
	}, []);

	return (
		<>
			<Head title="Redirecting..." />
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const code = query["code"].toString();

	// If spotify didn't redirect with valid code => Code not found.
	if (!code) return { notFound: true };

	// Now we get the token and redirect => Saving page creation and calling APIs on the back.
	// TODO: En vez de usar el request para saber la url, debemos ponerla en una variable global. Resta el hecho de que se pueda usar en todas las apps pero mejora mucho la velocidad en el front.
	//const [res, error] = await getToken(code);
	//console.log(error);

	return { props: { code } };
};

export default Auth;
