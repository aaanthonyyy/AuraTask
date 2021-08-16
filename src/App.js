import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import randomColor from "randomcolor";

import InputItem from "./Components/InputItem";
import TodoItem from "./Components/TodoItem";
import Background from "./Components/Background";
import Filter from "./Components/Filter";
import Submit from "./Components/Submit";
import Info from "./Components/Info";

const Form = styled.form`
	position: relative;
	margin-bottom: 40px;
`;

const App = () => {
	const [todoItems, setTodoItems] = useState([]);
	const [filter, setFilter] = useState("all");

	const ref = useRef("InputItem");

	useEffect(() => {
		function handleKeyDown(event) {
			if (event.key === "/") {
				setTimeout(() => {
					ref.current.focus();
				}, 1);
			} else if (event.key === "Escape") {
				setTimeout(() => {
					ref.current.blur();
				}, 1);
			}
		}

		document.addEventListener("keydown", handleKeyDown);


		// Don't forget to clean up
		return function cleanup() {
			document.removeEventListener("keydown", handleKeyDown);
		};

	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();

		const date = new Date();

		if (ref.current.value && ref.current.value !== " ") {
			setTodoItems([
				...todoItems,
				{
					item: ref.current.value,
					color: randomColor(),
					isComplete: false,
					time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
				},
			]);

			setTimeout(() => {
				handleFilter(filter)
			}, 100);
			ref.current.value = null;
		}

		console.log(todoItems);
	};

	const handleDelete = (index) => {
		console.log("deleted");
		setTodoItems(todoItems.filter((item, i) => i !== index));
	};

	const handleComplete = (index) => {
		console.log("completed");
		const newItems = todoItems.map((data, i) => {
			if (i === index) {
				data.isComplete = !data.isComplete;
			}

			return data;
		});

		setTodoItems(newItems);
	};

	const handleFilter = (filter) => {
		switch (filter) {
			case "all":
				return todoItems;

			case "completed":
					return todoItems.filter((item) => {
						return item.isComplete === true;
					})

			case "active":
					return todoItems.filter((item) => {
						return item.isComplete === false;
					})

			default:
				return todoItems;
		}
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

				<Filter handleFilter={setFilter} />

				{handleFilter(filter).length > 0 ? (
					handleFilter(filter).map((item, index) => {
						return (
							<TodoItem
								key={index}
								handleDelete={() => handleDelete(index)}
								handleComplete={() => handleComplete(index)}
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
