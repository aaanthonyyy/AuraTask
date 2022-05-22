import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as SortAsc } from "../Assets/sort-asc.svg";
import { ReactComponent as SortDesc } from "../Assets/sort-desc.svg";
import * as Select from "@radix-ui/react-select";

const SortIcon = (props) => {
	// const [sortAsc, setSortAsc] = useState(props.sortAsc);

	return (
		<Box>
			<span>Sort By: </span>
			<Select.Root value={props.sortAsc} onValueChange={props.handleSortAsc}>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>

				<Select.Content>
					<SelectViewport>
						<SelectItem value={true}>
							<SelectItemText>
								<SortAsc />
								<span>First Added</span>
							</SelectItemText>
						</SelectItem>
						<SelectItem value={false}>
							<SelectItemText>
								<SortDesc />
								<span>Last Added</span>
							</SelectItemText>
						</SelectItem>
					</SelectViewport>
				</Select.Content>
			</Select.Root>
		</Box>
	);
};

SortIcon.propTypes = {
	sortAsc: PropTypes.any,
	handleSortAsc: PropTypes.func,
};

const SelectViewport = styled(Select.Viewport)`
	background-color: ${(props) => props.theme.card.background};
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	border: 1px solid ${(props) => props.theme.border};
	padding: 2px;
`;

const SelectItem = styled(Select.Item)`
	padding: 0.5rem 1rem;
	cursor: pointer;
	border-radius: 8px;
	display: flex;
	align-items: center;
	gap: 2rem;
	font-size: 12px;

	> * {
		display: flex;
		gap: 1rem;
		color: ${(props) => props.theme.text};
	}

	svg {
		stroke: ${({ theme }) => theme.card.time};
		transition: stroke 200ms ease-in-out;
	}

	&:hover {
		background-color: ${(props) => props.theme.filter.hover};
		border: none;
		outline: none;

		svg {
			stroke: ${(props) => props.theme.text};
		}
	}
`;

const SelectItemText = styled(Select.ItemText)`
	display: flex;
	align-items: center;
	background-color: red;
`;

const SelectValue = styled(Select.Value)`
	display: flex;
	align-items: center;
`;

const SelectTrigger = styled(Select.Trigger)`
	background-color: transparent;
	cursor: pointer;
	border: none;
	padding: 0.75rem 1rem;
	border-radius: 8px;
	height: auto;
	color: ${(props) => props.theme.text + "AA"};

	&:hover {
		stroke: ${(props) => props.theme.text};
		background-color: ${(props) => props.theme.filter.hover};
	}

	> span {
		height: auto;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	svg {
		height: auto;
	}
`;

const Box = styled.div`
	user-select: none;
	display: flex;
	gap: 1rem;
	width: 100%;
	justify-content: flex-end;
	align-items: center;
	margin-bottom: 1rem;
	transition-duration: 100ms !important;

	& {
		color: ${(props) => props.theme.card.time + "88"};
		font-size: 0.75rem;
	}

	button {
		transition-duration: 200ms !important;
	}
`;

export default SortIcon;
