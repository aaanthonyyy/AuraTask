import { /* getLocalStorageTodos, */ addLocalStorage } from "./useLocalStorage";

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

const handleSort = (state, sortAsc) => {
	const newState = [...state].reverse();
	addLocalStorage(newState);

	return newState;
};

const reduceTodos = (state, action) => {
	switch (action.type) {
		case "ADD_TODO": {
			if (action.sort) {
				addLocalStorage([...state, action.payload]);
				return [...state, action.payload];
			}
			addLocalStorage([action.payload, ...state]);
			return [action.payload, ...state];
		}
		case "DELETE":
			return handleDelete(state, action);

		case "COMPLETE": {
			return handleComplete(state, action);
		}

		case "EDIT": {
			return handleEdit(state, action);
		}

		case "REFRESH": {
			return action.payload;
		}

		case "SORT": {
			console.log(typeof action.payload);
			return handleSort(action.payload, action.sortAsc);
		}

		default:
			return state;
	}
};

export default reduceTodos;
