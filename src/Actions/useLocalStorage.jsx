export const addLocalStorage = (todos) => {
	localStorage.setItem("todos", JSON.stringify(todos));
};

export const getLocalStorageTodos = () => {
	return JSON.parse(localStorage.getItem("todos")) || [];
};

export const getLocalFilters = () => {
	return localStorage.getItem("filter") || "ALL";
};
