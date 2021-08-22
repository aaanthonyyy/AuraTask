import styled from "styled-components";

const TodoActions = styled.div`
	display: flex;
	align-items: center;
	gap: 2px;
	border-radius: 8px;

	& > svg:not(:last-of-type) {
		cursor: pointer;
		border: 1px solid #f5f5f5;
		width: 35px;
		height: 35px;
		padding: 8px;
		border-radius: 4px;

		fill: #9c9cb6;
		&:hover {
			fill: #5c5c68;
			background-color: hsl(210, 28.571428571428513%, 95%);
		}
	}
	& svg:last-of-type {
		fill: #afb3b8;
		margin-right: 0;
		margin-left: 20px;
	}
`;

export default TodoActions;
