import rootSaga from "./Sagas/rootSaga";
import registrationReducer from "./Reducers/registrationReducer";
import { legacy_createStore as createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware } from "redux";


const rootReducer = combineReducers({
    registrations: registrationReducer,
})

const sagaMiddleWare = createSagaMiddleware();
let middleware = [sagaMiddleWare];
const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleWare.run(rootSaga);

export default store;