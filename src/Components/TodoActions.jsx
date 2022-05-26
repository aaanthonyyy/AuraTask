import styled from "styled-components";

const TodoActions = styled.div`
	display: flex;
	align-items: center;
	gap: 2px;
	border-radius: 8px;
	/* margin-left: auto; */

	& > svg:not(:last-of-type) {
		cursor: pointer;
		border: 1px solid ${({theme}) => theme.border};
		width: 35px;
		height: 35px;
		padding: 8px;
		border-radius: 4px;

		fill: #9c9cb6;
		transition: all;
		transition: 200ms ease-in-out;
		
		&:hover {
			fill: #777791;
			background-color: ${({theme})=> theme.filter.hover + "AA"};
		}

		&:active,
		&:focus {
			background-color: ${({theme})=> theme.filter.hover};
		}
	}
	& svg:last-of-type {
		fill: #afb3b8;
		margin-right: 0;
		margin-left: 20px;
	}
`;

export default TodoActions;
