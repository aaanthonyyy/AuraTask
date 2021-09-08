import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.section`
	width: 100%;
	height: 33vh;
	max-height: 300px;
	min-height: 150px;
	padding: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: #99ceff;
	background-image: linear-gradient(120deg, #48c6ef 0%, #6f86d6 100%);
	background-size: cover;
	margin-bottom: -50px;

	h1 {
		font-size: 3rem;
		text-align: center;
		margin: 0;
		color: #ffffffda;
	}
`;

const Background = (props) => {
	return (
		<Wrapper>
			<h1>{props.title}</h1>
		</Wrapper>
	);
};

Background.propTypes = {
	title: PropTypes.string,
};

export default Background;
