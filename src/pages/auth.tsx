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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const code = ctx.query["code"];
	return { props: { code } };
};

export default Auth;
