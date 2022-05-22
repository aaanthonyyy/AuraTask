import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        transition: 200ms ease-in-out;
        transition-property: background-color, color, border;
    }
    body {
    background-color: ${({ theme }) => theme.body};
    transition: 200ms ease-in-out;
    transition-property: background-color, color, border; 
    }

	svg.sort {
		stroke: ${(props) => props.theme.text + "55"};
		transition: stroke 100ms ease-in-out;
		height: auto;
	}
`;

export const lightTheme = {
	gradient: "linear-gradient(133deg, #48c6ef 0%, #6f86d6 100%)",
	body: "#F5F6FA",
	text: "#373737",
	placeholder: "#A4A6AE",
	border: "#ebeff6",
	filter: {
		background: "#ffffff",
		hover: "#F2F2F2",
		active: "#80818B",
	},
	card: {
		background: "#FFFFFF",
		time: "#9A9EAD",
		check: "F5F6FA",
		textComplete: "#9FA9AC",
		textActive: "#373737",
		edit: "#f5f6fa",
	},
};

export const darkTheme = {
	gradient: "linear-gradient(133deg,#57bcdb 0%,#3b3e9a 100%)",
	body: "#082032",
	text: "#dbdcec",
	border: "#273b49",
	placeholder: "#7c84a4",
	filter: {
		background: "#1B2B41",
		hover: "#13243b",
		active: "#0d1d29",
	},
	card: {
		background: "#1B2B41",
		time: "#B5B3BC",
		check: "1B2B41",
		textComplete: "#7d8e9c",
		textActive: "#d3e0fa",
		edit: "#082032",
	},
};
