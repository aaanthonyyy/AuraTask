const addLocalStorage = (todos) => {
	localStorage.setItem("todos", JSON.stringify(todos));
};

const handleDelete = (state, action) => {
	const newState = state.filter((item) => item.uuid !== action.uuid);
	addLocalStorage(newState);
	return newState;
};

const handleComplete = (state, action) => {
	const newState = state.map((data) => {
		if (data.uuid === action.uuid) {
			return {
				...data,
				isComplete: !data.isComplete,
			};
		}
		return data;
	});
	addLocalStorage(newState);
	return newState;
};

const handleEdit = (state, action) => {
	const newState = state.map((data) => {
		if (data.uuid === action.uuid) {
			return {
				...data,
				item: action.value,
			};
		}
		return data;
	});
	addLocalStorage(newState);
	return newState;
};

const reduceTodos = (state, action) => {
	switch (action.type) {
		case "ADD_TODO":
			addLocalStorage([...state, action.payload]);
			return [...state, action.payload];

		case "DELETE":
			return handleDelete(state, action);

		case "COMPLETE": {
			return handleComplete(state, action);
		}

		case "EDIT": {
			return handleEdit(state, action);
		}

		default:
			return state;
	}
};

export default reduceTodos;
