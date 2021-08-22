import { useState, useRef, useEffect } from "react";
import uuid from "react-uuid";
import randomColor from "randomcolor";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./animations.css";

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
	const [filter, setFilter] = useState(localStorage.getItem("filter") || "all");

	const ref = useRef("InputItem");

	useEffect(() => {
		const items = localStorage?.getItem("todos");
		items && setTodoItems(JSON.parse(items));

		console.log(filter);

		const localFilter = localStorage?.getItem("filter");
		localFilter && setFilter(localFilter)
	}, [filter]);

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

	const addToLocalStorage = (todos) => {
		localStorage.setItem("todos", JSON.stringify(todos));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const date = new Date();

		if (ref.current.value && ref.current.value !== " ") {
			const newItem = {
				item: ref.current.value,
				color: randomColor(),
				isComplete: false,
				time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
				uuid: uuid(),
			};

			addToLocalStorage([...todoItems, newItem]);
			setTodoItems([...todoItems, newItem]);

			setTimeout(() => {
				handleFilter(filter);
			}, 100);
			ref.current.value = null;
		}

	};

	const handleDelete = (uuid) => {
		addToLocalStorage(todoItems.filter((item) => item.uuid !== uuid));
		setTodoItems(todoItems.filter((item) => item.uuid !== uuid));
	};

	const handleComplete = (uuid) => {
		const newItems = todoItems.map((data) => {
			if (data.uuid === uuid) {
				data.isComplete = !data.isComplete;
			}

			return data;
		});

		addToLocalStorage(newItems);
		setTodoItems(newItems);
	};

	const handleFilter = (filter) => {
		switch (filter) {
			case "all":
				localStorage.setItem("filter", "all");
				return todoItems;

			case "completed":
				localStorage.setItem("filter", "completed");
				return todoItems.filter((item) => {
					return item.isComplete === true;
				});

			case "active":
				localStorage.setItem("filter", "active");
				return todoItems.filter((item) => {
					return item.isComplete === false;
				});

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

				<Filter handleFilter={setFilter} filter={filter} />
				{handleFilter(filter).length > 0 ? (
					<TransitionGroup appear={true} enter={true} exit={true}>
						{handleFilter(filter).map((item) => {
							return (
								<CSSTransition key={item.uuid} classNames="item">
									<TodoItem
										id={item.uuid}
										key={item.uuid}
										handleDelete={() => handleDelete(item.uuid)}
										handleComplete={() => handleComplete(item.uuid)}
										{...item}
									/>
								</CSSTransition>
							);
						})}
					</TransitionGroup>
				) : (
					<Info style={{ marginTop: "20vh" }}>You have no items to complete!</Info>
				)}
			</main>
		</>
	);
};

export default App;
