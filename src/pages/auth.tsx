import Head from "components/atoms/Head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getToken } from "middleware/spotify";
import { useSpotify } from "providers/SpotifyProvider";
import { ISpotifyTokenResponse, ISpotifyError } from "lib/spotify";
import { GetServerSideProps } from "next";

interface IAuthProps {
	data?: ISpotifyTokenResponse;
	spotifyError?: ISpotifyError;
}

const Auth = ({ data }: IAuthProps) => {
	const router = useRouter();
	const { dispatch } = useSpotify();

	useEffect(() => {
		if (!!data) {
			// Set access token to spotify object.
			dispatch({
				type: "LOG_IN",
				payload: data,
			});
		}

		router.replace("/");
	}, [data, dispatch, router]);

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
		return { props: { data: res.data } };
	}

	// If no query params recieved => 404.
	return { notFound: true };
};

export default Auth;
