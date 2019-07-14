import * as actionType from "./action.types";

const initialState = {
	cloudData:        null,
	cloudDataLoading: false,
	solarData:        null,
	solarDataLoading: false,
	panelData:        null,
	panelDataLoading: false,
};

// reducers
export default function(state = initialState, action) {
	switch (action.type) {
		case actionType.SET_CLOUD_DATA_LOADING:
			return { ...state, cloudDataLoading: action.payload };
		case actionType.SET_CLOUD_DATA:
			return { ...state, cloudData: action.payload };
		case actionType.SET_SOLAR_DATA_LOADING:
			return { ...state, solarDataLoading: action.payload };
		case actionType.SET_SOLAR_DATA:
			return { ...state, solarData: action.payload };
		case actionType.SET_PANEL_DATA_LOADING:
			return { ...state, panelDataLoading: action.payload };
		case actionType.SET_PANEL_DATA:
			return { ...state, panelData: action.payload };
		default:
			return state;
	}
}
