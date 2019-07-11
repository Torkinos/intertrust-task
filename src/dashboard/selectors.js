import { createSelector } from "reselect";

const data = state => state.dashboard.data;

export const getData = createSelector(
	[data],
	data => {
		if (data) {
			return data;
		}

		return null;
	}
);
