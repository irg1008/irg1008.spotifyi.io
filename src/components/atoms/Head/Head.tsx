import NextHead from "next/head";

interface IHeadProps {
	title: string;
}

const Head = ({ title }: IHeadProps) => (
	<NextHead>
		<title>Spotify API - {title}</title>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="icon" href="/favicon.ico" />
	</NextHead>
);

export default Head;
