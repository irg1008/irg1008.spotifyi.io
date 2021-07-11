import Dropdown from "components/atoms/Dropdown";
import PopUp from "components/atoms/PopUp";
import SideNav from "components/molecules/SideNav";
import { INotification, useNotifications } from "hooks/useNotifications";
import tw from "twin.macro";
import idGen from "util/idGen";
import Range from "components/atoms/Range";
import { useState } from "react";

const Comp = ({ value }: { value: string }) => <p>{value}</p>;

const NotificationTest = () => {
	const { addNotification, removeAllNotifications } = useNotifications();

	const addNewNotification = ({
		type,
		timeout,
		component,
	}: Partial<INotification>) => {
		addNotification({
			id: idGen(),
			component: component || (
				<Comp
					value={`Added new notification with type ${type} and ${
						!!timeout ? `timeout ${timeout}` : "no timeout"
					}`}
				/>
			),
			type,
			timeout,
		});
	};

	return (
		<Dropdown title="Add notifications" openOnLoad>
			<button
				onClick={() => addNewNotification({ type: "success" })}
				title="Add notification"
			>
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
				onClick={() => addNewNotification({ type: "success", timeout: 2000 })}
			>
				Add success notification with 2000 timeout
			</button>
			<button
				onClick={() => addNewNotification({ type: "error", timeout: 2000 })}
			>
				Add error notification with 2000 timeout
			</button>
			<button
				onClick={() => addNewNotification({ type: "warning", timeout: 2000 })}
			>
				Add warning notification with 2000 timeout
			</button>
			<button onClick={() => addNewNotification({ timeout: 2000 })}>
				Add normal notification with 2000 timeout
			</button>
			<button
				onClick={() =>
					addNewNotification({
						component: (
							<h1>
								HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
							</h1>
						),
					})
				}
			>
				Add large notifications
			</button>
			<button onClick={() => addNewNotification({ component: <h1>1</h1> })}>
				Add small notifications
			</button>
			<button
				onClick={() =>
					addNewNotification({
						component: <button>Click Me</button>,
					})
				}
			>
				Add notification with button
			</button>
			<button onClick={removeAllNotifications}>Remove all notifications</button>
		</Dropdown>
	);
};

const Link = tw.a`
	hover:underline
`;

const SideNavTest = () => {
	const [value, setValue] = useState(0);
	return (
		<SideNav>
			<NotificationTest />
			<Dropdown title="Click My Links">
				<Link href="#">One</Link>
				<Link href="#">Two</Link>
				<Link href="#">Three</Link>
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
			<Dropdown title="¡And text! Or Anything You Want">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
				hic beatae aut sapiente ducimus voluptates soluta deserunt autem unde
				non rem delectus tempora, quam odio earum qui nulla magni enim?
				<button>Two</button>
				<button>Three</button>
				<button>Four</button>
				<button>Five</button>
				<Link href="#">Two</Link>
				<Link href="#">Three</Link>
				<Dropdown title="A dropdown inside a dropdown! Hell yeah">
					<button>Two</button>
					<Link href="#">Two</Link>
					<button>Three</button>
					<Link href="#">Three</Link>
				</Dropdown>
			</Dropdown>
		</SideNav>
	);
};

export default SideNavTest;
