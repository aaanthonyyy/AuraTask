import React, { useState, useRef, useEffect, useReducer } from "react";
import {
	getLocalStorageTodos,
	getLocalFilters,
} from "./Actions/useLocalStorage";

import { lightTheme, darkTheme, GlobalStyles } from "./theme";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import "react-toastify/dist/ReactToastify.css";
import "./animations.css";

import useFilter from "./Actions/useFilters";
import reduceTodos from "./Actions/reduceTodos";

import uuid from "react-uuid";
import randomColor from "randomcolor";

import { ThemeProvider } from "styled-components";
import InputItem from "./Components/InputItem";
import { TodoItem } from "./Components/TodoItem";
import Background from "./Components/Background";
import Filter from "./Components/Filter";
import Submit from "./Components/Submit";
import Form from "./Components/Form";
import Info from "./Components/Info";
import moment from "moment";

const App = () => {
	const [todoItems, dispatch] = useReducer(
		reduceTodos,
		JSON.parse(localStorage.getItem("todos")) || []
	);
	const [filter, setFilter] = useState(localStorage.getItem("filter") || "ALL");

	const prefersDark =
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches;

	const [isDarkTheme, setIsDarkTheme] = useState(
		JSON.parse(sessionStorage.getItem("theme")) || prefersDark
	);

	// input ref
	const ref = useRef();
	useEffect(() => {
		if (isDarkTheme) {
			document
				.querySelector("meta[name='theme-color']")
				.setAttribute("content", "#082032");
			document
				.querySelector("meta[name='msapplication-navbutton-color']")
				.setAttribute("content", "#082032");
			document
				.querySelector("meta[name='apple-mobile-web-app-status-bar-style']")
				.setAttribute("content", "#082032");
		} else {
			document
				.querySelector("meta[name='theme-color']")
				.setAttribute("content", "#F5F6FA");
			document
				.querySelector("meta[name='msapplication-navbutton-color']")
				.setAttribute("content", "#F5F6FA");
			document
				.querySelector("meta[name='apple-mobile-web-app-status-bar-style']")
				.setAttribute("content", "#F5F6FA");
		}

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

	useEffect(() => {
		// Sync accross tabs
		const handleStorage = () => {
			setFilter(getLocalFilters());
			dispatch({ type: "REFRESH", payload: getLocalStorageTodos() });
		};

		const handleTimeout = setTimeout(() => {
			window.addEventListener("focus", handleStorage);
		}, 300);

		return () => {
			window.removeEventListener("focus", handleStorage);
			clearTimeout(handleTimeout);
		};
	}, [todoItems]);

	const handleSubmit = (event) => {
		event.preventDefault();

		const date = moment();
		console.log(date);

		if (ref.current.value && ref.current.value !== " ") {
			const newItem = {
				item: ref.current.value,
				color: randomColor(),
				isComplete: false,
				time: date,
				uuid: uuid(),
			};
			ref.current.value = null;
			dispatch({ type: "ADD_TODO", payload: newItem });
		}
	};

	const filteredItems = useFilter({
		type: filter,
		payload: todoItems,
	});

	return (
		<ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
			<>
				<GlobalStyles />
				<Background
					background={isDarkTheme ? darkTheme : lightTheme}
					title="Todo List"
					setIsDarkTheme={setIsDarkTheme}
					isDarkTheme={isDarkTheme}
				/>
				<main>
					<Form>
						<InputItem ref={ref} placeholder="Add new todo item" />
						<Submit handleSubmit={handleSubmit} />
						<Info onClick={() => ref.current.focus()}>
							Press <kbd>/</kbd> to focus input
						</Info>
					</Form>
					<Filter
						handleFilter={setFilter}
						filter={filter}
						count={todoItems.length}
					/>
					{filteredItems.length > 0 ? (
						<TransitionGroup className="todo-list">
							{filteredItems.map((item) => {
								return (
									<CSSTransition
										classNames="item"
										key={item.uuid}
										timeout={500}
										unmountOnExit
									>
										<TodoItem
											handleComplete={() =>
												dispatch({ type: "COMPLETE", uuid: item.uuid })
											}
											handleDelete={() => dispatch({ type: "DELETE", uuid: item.uuid })}
											dispatchEdit={dispatch}
											text={item.item}
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
		</ThemeProvider>
	);
};

export default App;
