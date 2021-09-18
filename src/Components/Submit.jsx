import ReactTooltip from "react-tooltip";
import styled from "styled-components";

const Plus = styled.input.attrs({
	type: "submit",
	value: "   ",
})`
	background-color: transparent;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z' fill='rgb(156, 156, 182)'/%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-position: center;
	border: none;
	outline: none;
	position: absolute;
	padding: 5px;
	left: unset;
	top:	15px;
	right: 15px;
	transition: all 100ms ease-in-out;

	&:hover {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z' fill='rgb(92, 92, 104)'/%3E%3C/svg%3E");
	}
`;

const Submit = (props) => {
	return (
		<>
			<Plus
				data-tip="Add Todo"
				data-effect="solid"
				onClick={(event) => props.handleSubmit(event)}
			/>
			<ReactTooltip />
		</>
	);
};

export default Submit;
