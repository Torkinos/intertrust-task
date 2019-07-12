import { all, fork } from "redux-saga/effects";

import * as dashBoardSagas from "../dashboard/saga";

export default function* rootSaga() {
	yield all([
		...Object.values(dashBoardSagas),
	].map(fork));
}
