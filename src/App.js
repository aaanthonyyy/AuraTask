import React, { useState, useRef, useEffect, useReducer } from "react";
import reduceTodos from "./Actions/reduceTodos";
import reduceFilter from "./Actions/reduceFilters";

import uuid from "react-uuid";
import randomColor from "randomcolor";

import InputItem from "./Components/InputItem";
import TodoItem from "./Components/TodoItem";
import Background from "./Components/Background";
import Filter from "./Components/Filter";
import Submit from "./Components/Submit";
import Form from "./Components/Form";
import Info from "./Components/Info";

const App = () => {
	const [todoItems, dispatch] = useReducer(
		reduceTodos,
		JSON.parse(localStorage.getItem("todos")) || []
	);
	const [filter, setFilter] = useState(localStorage.getItem("filter") || "ALL");
	const [filteredItems, dispatchFilter] = useReducer(reduceFilter, todoItems);

	useEffect(() => {
		handleFilter(filter);
	}, [filter, todoItems]);

	// input ref
	const ref = useRef();
	useEffect(() => {
		const handleKeyDown = (event) => {
			/* TODO: Refactor setTiemout blocks*/
			if (event.key === "/") {
				setTimeout(() => {
					ref.current.focus();
				}, 1);
			} else if (event.key === "Escape") {
				setTimeout(() => {
					ref.current.blur();
				}, 1);
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		// Don't forget to clean up
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();

		const date = new Date();

		if (ref.current.value && ref.current.value !== " ") {
			const newItem = {
				item: ref.current.value,
				color: randomColor(),
				isComplete: false,
				isEdit: false,
				time: date.toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
				}),
				uuid: uuid(),
			};

			dispatch({ type: "ADD_TODO", payload: newItem });
			ref.current.value = null;
		}
	};

	const handleFilter = (filter) => {
		dispatchFilter({ type: filter, payload: todoItems });
	};

	return (
		<>
			<Background title="Todo List" />
			<main>
				<Form>
					<InputItem ref={ref} placeholder="Add new todo item" />
					<Submit onClick={(event) => handleSubmit(event)} />
					<Info onClick={() => ref.current.focus()}>
						Press <kbd>/</kbd> to jump to input
					</Info>
				</Form>

				<Filter handleFilter={setFilter} filter={filter} count={todoItems.length} />
				{filteredItems.length > 0 ? (
					filteredItems.map((item) => {
						return (
							<TodoItem
								key={item.uuid}
								id={item.uuid}
								handleComplete={() => dispatch({ type: "COMPLETE", uuid: item.uuid })}
								handleDelete={() => dispatch({ type: "DELETE", uuid: item.uuid })}
								dispatchEdit={dispatch}
								{...item}
							/>
						);
					})
				) : (
					<Info style={{ marginTop: "20vh" }}>You have no items to complete!</Info>
				)}
			</main>
		</>
	);
};

export default App;
