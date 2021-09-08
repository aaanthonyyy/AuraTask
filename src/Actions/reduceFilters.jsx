const reduceFilter = (state, action) => {
	switch (action.type.toUpperCase()) {
		case "ALL":
			localStorage.setItem("filter", "ALL");
			return action.payload;

		case "COMPLETED":
			localStorage.setItem("filter", "COMPLETED");
			return action.payload.filter((item) => {
				return item.isComplete === true;
			});

		case "ACTIVE":
			localStorage.setItem("filter", "ACTIVE");
			return action.payload.filter((item) => {
				return item.isComplete === false;
			});

		default:
			return action.payload;
	}
};

export default reduceFilter;
