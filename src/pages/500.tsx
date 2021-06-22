import Link from "next/link";

const _500 = () => {
	return (
		<>
			<Link href="/" passHref>
				<button>Ir a Home</button>
			</Link>
			<h1>500</h1>
		</>
	);
};

export default _500;
