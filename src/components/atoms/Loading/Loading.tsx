import Styled from "./Loading.styles";

type TLoading = {
	text?: string;
};

const Loading = ({ text }: TLoading) => (
	<Styled.Loading>
		{!!text ? <Styled.Text>{text}</Styled.Text> : <Styled.LoadingIcon />}
	</Styled.Loading>
);

export default Loading;
