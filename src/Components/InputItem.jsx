import styled from "styled-components";

const InputItem = styled.input`
	color: ${({ theme }) => theme.text};
	position: sticky;
	outline: none !important;
	border: 3px solid transparent;
	background-color: ${({ theme }) => theme.card.background};
	border-radius: 8px;
	margin: auto;
	width: 100%;
	height: 4rem;
	padding: 20px;
	padding-right: 2.5rem;
	box-shadow: 0 5px 12px -4px #32343517;

	resize: none;

	font-family: inherit;
	letter-spacing: 0.5px;

	/* transition: 200ms border ease-in-out !important; */

	&:focus {
		border-color: #4d6ac43b;
	}

	&::placeholder {
		color: ${({ theme }) => theme.placeholder};
	}
`;

export default InputItem;
