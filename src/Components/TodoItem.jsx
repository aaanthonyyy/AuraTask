import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "../App.css";

import { ReactComponent as Delete } from "../Assets/delete-bin-line.svg";
import { ReactComponent as Edit } from "../Assets/pencil-line.svg";
import { ReactComponent as Drag } from "../Assets/drag_indicator_black_24dp.svg";

import TodoActions from "./TodoActions";
import TodoCard from "./TodoCard";

const TodoItem = React.memo((props) => {
	const [isEdit, setIsEdit] = useState(false);
	const [editValue, setEditValue] = useState(props.text);

	const editRef = useRef();

	useEffect(() => {
		const handleEnter = (e) => {
			if (e.key === "Enter") {
				handleSubmit();
			} else if (e.key === "Escape") {
				setEditValue(props.text);
				setIsEdit(false);
			}
		};

		if (editRef.current && isEdit) {
			editRef.current.focus();
			document.addEventListener("keydown", handleEnter);
		}

		return () => {
			document.removeEventListener("keydown", handleEnter);
		};
	}, [isEdit, editValue, props]);

	const handleSubmit = () => {
		props.dispatchEdit({
			type: "EDIT",
			value: editValue,
			uuid: props.uuid,
		});
		setIsEdit(false);
	};

	return (
		<TodoCard {...props}>
			<div>
				{isEdit ? (
					<input
						ref={editRef}
						type="text"
						name="edit"
						id={`${props.uuid}-edit`}
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						onBlur={handleSubmit}
					/>
				) : (
					<h1 onClick={props.handleComplete}>{props.text}</h1>
				)}
				<TodoActions>
					{isEdit ? (
						<>
							<Delete onClick={() => setIsEdit(false)} />
							<Edit onClick={handleSubmit} />
						</>
					) : (
						<>
							<Delete
								onClick={() => {
									// props.toast("Deleting Todo");
									props.handleDelete();
								}}
							/>
							<Edit onClick={() => setIsEdit(true)} />
						</>
					)}
					<Drag />
				</TodoActions>
			</div>
			<small>{props.time}</small>
		</TodoCard>
	);
});

TodoItem.propTypes = {
	handleComplete: PropTypes.func,
	handleDelete: PropTypes.func,
	text: PropTypes.string,
	time: PropTypes.string,
	isEdit: PropTypes.bool,
	dispatchEdit: PropTypes.func,
	uuid: PropTypes.string,
};

export { TodoItem };
