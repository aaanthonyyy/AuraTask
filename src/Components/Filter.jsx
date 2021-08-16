import styled from "styled-components";

const Wrapper = styled.div`
	background-color: #fff;
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

	input[type="radio"] {
		visibility: hidden;
		position: absolute;
		opacity: 0;
		width: 1px;
		height: 1px;
	}

	label {
        cursor: pointer;
		display: inline-block;
		width: 100% !important;
		padding: 5px;
		border-radius: 4px;
		text-align: center;
		transition: all 200ms ease-in-out;

        &:hover{
            background-color: #f2f2f2;
        }
	}

	input:checked + label {
		color: #fff;
		background-color: #80818b;
	}
`;

const Filter = (props) => {
	return (
		<Wrapper>
			<div>
				<input
					type="radio"
					id="all"
					name="filter"
					value="all"
					defaultChecked
					onChange={() => props.handleFilter("all")}
				/>
				<label htmlFor="all">All</label>
			</div>

			<div>
				<input
					type="radio"
					id="completed"
					name="filter"
					value="completed"
					onChange={() => props.handleFilter("completed")}
				/>
				<label htmlFor="completed">Completed</label>
			</div>

			<div>
				<input type="radio" id="active" name="filter" value="active" onChange={() => props.handleFilter("active")} />
				<label htmlFor="active">Active</label>
			</div>
		</Wrapper>
	);
};

export default Filter;
