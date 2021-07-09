import Head from "components/atoms/Head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getToken } from "middleware/spotify";
import { ISpotifyTokenResponse, ISpotifyError } from "lib/spotify";
import { GetServerSideProps } from "next";
import { useNotifications } from "hooks/useNotifications";
import useSpotify from "hooks/useSpotify";

type TSpotifyError = "access_denied";

const spotifyErrors: Record<string, TSpotifyError> = {
	accessDenied: "access_denied",
};

interface IAuthProps {
	data?: ISpotifyTokenResponse;
	spotifyError?: ISpotifyError;
}

const Auth = ({ data, spotifyError }: IAuthProps) => {
	const router = useRouter();
	const { logIn: spotifyLogIn } = useSpotify();
	const { addNotification } = useNotifications();

	useEffect(() => {
		const logIn = () => {
			// If error
			if (!!spotifyError) {
				const accessDenied = spotifyError.error === spotifyErrors.accessDenied;
				if (accessDenied) {
					addNotification({
						id: "access_denied_error",
						type: "error",
						component: <p>The user has canceled the operation</p>,
						timeout: 4000,
					});
				}
				return;
			}

			// If data => Log in with data.
			if (!!data) {
				// Log in with spotify.
				spotifyLogIn(data);
			}
		};

		logIn();
		router.replace("/");
	}, [data, router, spotifyError, addNotification, spotifyLogIn]);

	return (
		<>
			<Head title="Redirecting..." />
		</>
	);
};

export const getServerSideProps: GetServerSideProps<IAuthProps> = async ({
	query,
}) => {
	const { code, error } = query;

	// If error recieving code.
	if (!!error) {
		const spotifyError: ISpotifyError = {
			success: false,
			error: error.toString(),
			error_description: "User has canceled the operation.",
		};
		return { props: { spotifyError } };
	}

	// If code recieved.
	if (!!code) {
		// Get token.
		const { res, error: spotifyError } = await getToken(code.toString());

		// If error on token response. 400 bad request or any other.
		if (!!error) return { props: { spotifyError } };

		// If otherwise, return token data.
		return { props: { data: res?.data } };
	}

	// If no query params recieved => 404.
	return { notFound: true };
};

export default Auth;
