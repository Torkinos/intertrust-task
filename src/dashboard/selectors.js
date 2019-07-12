import { createSelector } from "reselect";

const cloudData = state => state.dashboard.cloudData;
const solarData = state => state.dashboard.solarData;
const panelData = state => state.dashboard.panelData;

export const getCloudData = createSelector(
	[cloudData],
	cloudData => {
		if (cloudData) {
			return cloudData;
		}

		return null;
	}
);

export const getSolarData = createSelector(
	[solarData],
	solarData => {
		if (solarData) {
			return solarData;
		}

		return null;
	}
);

export const getPanelData = createSelector(
	[panelData],
	panelData => {
		if (panelData) {
			return panelData;
		}

		return null;
	}
);

export const getTotalKw = createSelector(
	[panelData],
	panelData => {
		if (panelData) {
			return panelData.reduce((total, item) => total + item.wattage, 0);
		}

		return null;
	}
);
