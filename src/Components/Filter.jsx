import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
	background-color: ${({theme}) => theme.filter.background};
	max-width: 400px;
	margin: auto;
	padding: 5px;
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(3, 1fr);
	justify-content: space-between;
	border-radius: 12px;
	box-shadow: 0 5px 12px -4px #32343517;
	margin-bottom: 20px;

	& > div {
		position: relative;
	}

	input[type="radio"] {
		visibility: hidden;
		position: absolute;
		opacity: 0;
		width: 1px;
		height: 1px;
	}

	label {
		color: ${({theme}) => theme.text};
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: auto;
		width: 100% !important;
		padding: 5px;
		border-radius: 8px;
		text-align: center;
		transition: all 100ms ease-in-out;
		vertical-align: center;
		z-index: 101;

		&:hover {
			background-color: ${({theme}) => theme.filter.hover};
		}

		span {
			display: inline-block;
			font-size: 12px;
			margin-left: 10px;
			color: #646464;
			background-color: #d1d1d5;
			border-radius: 100px;
			padding: 2px 10px;
		}
	}

	input:checked + label {
		color: #fff;
		background-color: ${({theme}) => theme.filter.active};
		transition: background-color 300ms ease-in-out;

		span {
			background-color: #fff;
			color: #80818b;
		}
	}
`;

const Filter = (props) => {
	return (
		<Wrapper filter={props.filter}>
			<div>
				<input
					type="radio"
					id="all"
					name="filter"
					value="ALL"
					checked={props.filter === "ALL"}
					onChange={() => props.handleFilter("ALL")}
				/>
				<label htmlFor="all">
					All<span>{props.count < 100 ? props.count : "99+"}</span>
				</label>
			</div>

			<div>
				<input
					type="radio"
					id="completed"
					name="filter"
					value="COMPLETED"
					checked={props.filter === "COMPLETED"}
					onChange={() => props.handleFilter("COMPLETED")}
				/>
				<label htmlFor="completed">Completed</label>
			</div>

			<div>
				<input
					type="radio"
					id="active"
					name="filter"
					value="ACTIVE"
					checked={props.filter === "ACTIVE"}
					onChange={() => props.handleFilter("ACTIVE")}
				/>
				<label htmlFor="active">Active</label>
			</div>
		</Wrapper>
	);
};

Filter.propTypes = {
	filter: PropTypes.string,
	handleFilter: PropTypes.func,
	count: PropTypes.number,
};

export default Filter;
