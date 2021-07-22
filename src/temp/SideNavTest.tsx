import Dropdown from "components/atoms/Dropdown";
import SideNav from "components/molecules/SideNav";
import { INotification, useNotifications } from "hooks/useNotifications";
import tw from "twin.macro";
import idGen from "util/idGen";
import { themes, TTheme, useTheme } from "theme";
import Styled from "./SideNavTest.styles";

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
		<Dropdown title="Add notifications">
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
			<button onClick={() => addNewNotification({ type: "info" })}>
				Add info notification
			</button>
			<button onClick={() => addNewNotification({})}>
				Add normal notification
			</button>
			<button
				onClick={() => addNewNotification({ type: "success", timeout: 10000 })}
			>
				Add success notification with 10000 timeout
			</button>
			<button
				onClick={() => addNewNotification({ type: "error", timeout: 10000 })}
			>
				Add error notification with 10000 timeout
			</button>
			<button
				onClick={() => addNewNotification({ type: "warning", timeout: 10000 })}
			>
				Add warning notification with 10000 timeout
			</button>
			<button
				onClick={() => addNewNotification({ type: "info", timeout: 10000 })}
			>
				Add info notification with 10000 timeout
			</button>
			<button onClick={() => addNewNotification({ timeout: 10000 })}>
				Add normal notification with 10000 timeout
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

const ThemeDropdown = () => {
	const { theme: currentTheme, setTheme } = useTheme();

	const { addNotification } = useNotifications();

	const changeTheme = (newTheme: TTheme) => {
		addNotification({
			id: idGen(),
			component: (
				<p>
					Theme changed from {currentTheme} to {newTheme}
				</p>
			),
			timeout: 3000,
		});
		setTheme(newTheme);
	};

	return (
		<Dropdown title="Chose theme">
			<p>Current theme: {currentTheme}</p>
			{themes.map((theme) => (
				<button
					key={theme}
					disabled={theme === currentTheme}
					onClick={() => changeTheme(theme)}
				>
					Apply {theme} theme
				</button>
			))}
		</Dropdown>
	);
};

const SideNavTest = () => {
	return (
		<SideNav>
			<ThemeDropdown />
			<NotificationTest />
			<button>Holiwis</button>
		</SideNav>
	);
};

export default SideNavTest;
