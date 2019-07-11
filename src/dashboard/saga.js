import { takeEvery } from "redux-saga/effects";
import * as actions  from "./action.types";
import * as SagaApi  from "./saga.api";

export function* sagaActions() {

	yield takeEvery(actions.FETCH_CLOUD_DATA, SagaApi.fetchCloudData);

	yield takeEvery(actions.FETCH_SOLAR_DATA, SagaApi.fetchSolarData);

	yield takeEvery(actions.FETCH_PANEL_DATA, SagaApi.fetchPanelData);
}
