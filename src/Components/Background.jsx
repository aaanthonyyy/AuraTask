import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DarkModeToggle from "react-dark-mode-toggle";

const Wrapper = styled.section`
	width: 100%;
	height: 33vh;
	max-height: 300px;
	min-height: 150px;
	padding: 20px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: #99ceff;
	background-image: ${({ theme }) => theme.gradient};
	background-size: cover;
	margin-bottom: -50px;

	h1 {
		font-size: 3rem;
		text-align: center;
		margin: 0;
		color: #ffffffda;
	}

	.mode-toggle {
		position: absolute;
		top: 20px;
		right: 20px;
	}
`;

const Background = (props) => {

	const handleTheme = useCallback(() => {
		props.setIsDarkTheme(!props.isDarkTheme);
		sessionStorage.setItem("theme", JSON.stringify(!props.isDarkTheme));
	}, [props.isDarkTheme]);

	return (
		<Wrapper>
			<DarkModeToggle
				onChange={handleTheme}
				checked={props.isDarkTheme}
				className="mode-toggle"
				size={60}
				speed={4}
			/>
			<h1>{props.title}</h1>
		</Wrapper>
	);
};

Background.propTypes = {
	title: PropTypes.string,
	setIsDarkTheme: PropTypes.func,
	isDarkTheme: PropTypes.bool
};

export default Background;
