import * as actionType from "./action.types";

/*Saga actions*/
export const fetchCloudData = () => {
	return { type: actionType.FETCH_CLOUD_DATA };
};

export const fetchSolarData = () => {
	return { type: actionType.FETCH_SOLAR_DATA };
};

export const fetchPanelData = () => {
	return { type: actionType.FETCH_PANEL_DATA };
};

/*Actions*/
export const setCloudDataLoading = payload => {
	return { type: actionType.SET_CLOUD_DATA_LOADING, payload };
};

export const setCloudData = payload => {
	return { type: actionType.SET_CLOUD_DATA, payload };
};

export const setSolarDataLoading = payload => {
	return { type: actionType.SET_SOLAR_DATA_LOADING, payload };
};

export const setSolarData = payload => {
	return { type: actionType.SET_SOLAR_DATA, payload };
};

export const setPanelDataLoading = payload => {
	return { type: actionType.SET_PANEL_DATA_LOADING, payload };
};

export const setPanelData = payload => {
	return { type: actionType.SET_PANEL_DATA, payload };
};
