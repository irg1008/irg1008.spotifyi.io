import renderer, { act, ReactTestRendererJSON } from "react-test-renderer";
import Link from "../__test_components__/Link";

test("Link changes the class when hovered", () => {
	const component = renderer.create(
		<Link href="http://www.facebook.com">Facebook</Link>,
	);

	let tree: any = component.toJSON();
	expect(tree).toMatchSnapshot();

	act(() => {
		tree.props.onMouseEnter();
		tree = component.toJSON();
		expect(tree).toMatchSnapshot();

		tree.props.onMouseLeave();
		tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
