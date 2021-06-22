import Link from "next/link";

const _404 = () => {
	return (
		<>
			<Link href="/" passHref>
				<button>Ir a Home</button>
			</Link>
			<h1>404</h1>
		</>
	);
};

export default _404;
