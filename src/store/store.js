import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware             from "redux-saga";

import rootReducer from "../reducers";
import rootSaga    from "../saga/index";

const middleWare = [];

// Setup Redux-Saga.
const sagaMiddleware = createSagaMiddleware();

middleWare.push(sagaMiddleware);

const store = createStore(rootReducer, {}, applyMiddleware(...middleWare));

// Initiate the root saga.
sagaMiddleware.run(rootSaga);

export default store;
