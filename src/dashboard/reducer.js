import * as actionType from "./action.types";

const initialState = {
	cloudData: null,
	solarData: null,
	panelData: null
};

// reducers
export default function(state = initialState, action) {
	switch (action.type) {
		case actionType.SET_CLOUD_DATA:
			return { ...state, cloudData: action.payload };
		case actionType.SET_SOLAR_DATA:
			return { ...state, solarData: action.payload };
		case actionType.SET_PANEL_DATA:
			return { ...state, panelData: action.payload };
		default:
			return state;
	}
}
