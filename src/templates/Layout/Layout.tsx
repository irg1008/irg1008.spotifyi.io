import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GlobalStyle from "styles/GlobalStyle";
import Styled from "./Layout.styles";
import useTheme from "hooks/useTheme";
import SideNav from "components/molecules/SideNav";
import Dropdown from "components/atoms/Dropdown";
import NotificationsHolder from "components/molecules/NotificationsHolder/NotificationsHolder";
import useNotifications, { TNotificationType } from "hooks/useNotifications";
import idGen from "util/idGen";

const Comp = ({ value }: { value: string }) => <p>{value}</p>;

const Layout: React.FC = ({ children }) => {
	const { addNotification } = useNotifications();

	const addNewNotification = ({
		type,
		timeout,
	}: {
		type?: TNotificationType;
		timeout?: number;
	}) => {
		addNotification({
			id: idGen(),
			component: (
				<Comp
					value={`Added new notifications with type ${type} and ${
						!!timeout ? `timeout ${timeout}` : "no timeout"
					}`}
				/>
			),
			type,
			timeout,
		});
	};

	return (
		<Styled.Layout>
			<header>
				<SideNav>
					<Dropdown title="Add notifications">
						<button onClick={() => addNewNotification({ type: "success" })}>
							Add success notification
						</button>
						<button onClick={() => addNewNotification({ type: "error" })}>
							Add error notification
						</button>
						<button onClick={() => addNewNotification({ type: "warning" })}>
							Add warning notification
						</button>
						<button onClick={() => addNewNotification({})}>
							Add normal notification
						</button>
						<button
							onClick={() =>
								addNewNotification({ type: "success", timeout: 2000 })
							}
						>
							Add success notification with 2000 timeout
						</button>
						<button
							onClick={() =>
								addNewNotification({ type: "error", timeout: 2000 })
							}
						>
							Add error notification with 2000 timeout
						</button>
						<button
							onClick={() =>
								addNewNotification({ type: "warning", timeout: 2000 })
							}
						>
							Add warning notification with 2000 timeout
						</button>
						<button onClick={() => addNewNotification({ timeout: 2000 })}>
							Add normal notification with 2000 timeout
						</button>
					</Dropdown>
					<Dropdown title="Click My Links">
						<Styled.Link href="#">One</Styled.Link>
						<Styled.Link href="#">Two</Styled.Link>
						<Styled.Link href="#">Three</Styled.Link>
					</Dropdown>
					<Dropdown title="I Store Buttons!">
						<button>One</button>
						<button>Two</button>
						<button>Three</button>
						<button>Four</button>
						<button>Five</button>
						<button>One</button>
					</Dropdown>
					<Dropdown
						title="Click me"
						onTitleClick={() => alert("I just alerted you!")}
					/>
					<Dropdown title="¡And text! Or Anything You Want" openOnLoad>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit.
						Doloremque, hic beatae aut sapiente ducimus voluptates soluta
						deserunt autem unde non rem delectus tempora, quam odio earum qui
						nulla magni enim?
						<button>Two</button>
						<button>Three</button>
						<button>Four</button>
						<button>Five</button>
						<Styled.Link href="#">Two</Styled.Link>
						<Styled.Link href="#">Three</Styled.Link>
					</Dropdown>
				</SideNav>
			</header>
			<NotificationsHolder />
			<Styled.Main>{children}</Styled.Main>
			<footer></footer>
		</Styled.Layout>
	);
};

const DynamicLayout: React.FC = ({ children }) => {
	const [loading, setLoading] = useState(false);

	// Theme store.
	useTheme();

	const pageLoading = () => setLoading(true);
	const pageLoaded = () => setLoading(false);

	const router = useRouter();

	// Handle page load.
	useEffect(() => {
		router.events.on("routeChangeStart", pageLoading);
		router.events.on("routeChangeComplete", () => pageLoaded);
		router.events.on("routeChangeError", pageLoaded);
	}, [router.events]);

	return (
		<>
			<GlobalStyle />
			<Layout>{children}</Layout>
		</>
	);
};

export default DynamicLayout;
