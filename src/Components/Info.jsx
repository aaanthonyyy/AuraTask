import styled from "styled-components";

const Info = styled.div`
	color: ${({theme}) => theme.placeholder};
	text-align: center;
	font-size: 12px;
	margin-top: 10px;

	kbd {
		background-color: ${({theme}) => theme.card.background};
		border: 1px solid ${({theme}) => theme.border};
		border-radius: 4px;
		padding: 2px 5px;
	}
`;

export default Info;
