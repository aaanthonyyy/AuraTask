import styled from "styled-components";

const TodoCard = styled.div`
	background-color: #fff;
	border-left: 5px solid ${(props) => props.color} !important;
	padding: 8px 20px;
	padding-right: 10px;
	margin-bottom: 20px;
	border-radius: 8px;
	transition: all 200ms ease-in-out;

	& > div {
		display: flex;
		justify-content: space-between;
		/* align-items: stretch; */
		gap: 20px;
	}

	input[type="text"] {
		width: 100%;
		font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
			Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
		font-weight: 600;
		padding-left: 15px;
		border: none;
		outline: 1px dotted ${(props) => props.color};
		color: #373737c5;
		background-color: #f5f6fa;

		&::placeholder {
		}
	}

	h1 {
		text-decoration: ${(props) => (props.isComplete ? "line-through" : "none")};
		color: ${(props) => (props.isComplete ? "#9fa9ac" : "#373737")};
		font-weight: ${(props) => (props.isComplete ? "500" : "600")};
		transition: all 100ms ease-in-out;
		/* user-select: none; */
		cursor: pointer;
		font-size: 14px;
		margin-bottom: -2px;
		margin-left: 20px;

		&::before {
			content: "\\2713";
			color: white;
			font-size: 10px;
			line-height: 15px;
			text-align: center;
			display: inline-block;
			margin-bottom: -10px;
			margin-left: -20px;
			margin-right: 10px;
			height: 13px;
			width: 13px;
			border-radius: 20px;
			background-color: ${(props) => (props.isComplete ? props.color : "#fff")};
			border: 3px solid ${(props) => props.color};
			outline-offset: 10px;
		}
	}

	span {
		cursor: pointer;
		color: hsl(228, 33.33333333333327%, 50%);
		padding: 5px 10px;
		border-radius: 4px;
		transition: background-color 200ms ease-in-out;
		vertical-align: middle;

		&:hover {
			background-color: hsl(228, 33%, 95%);
		}
	}

	small {
		color: #9a9ead;
		font-size: 0.75rem;
		user-select: none;
	}
`;

export default TodoCard;
