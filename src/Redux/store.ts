import rootSaga from "./Sagas/rootSaga";
import registrationReducer from "./Reducers/registrationReducer";
import confirmationReducer from "./Reducers/confirmationReducer"
import { legacy_createStore as createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
    registrations: registrationReducer,
    confirmations: confirmationReducer,
})

const sagaMiddleWare = createSagaMiddleware();
let middleware = [sagaMiddleWare];
const store = createStore (rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

sagaMiddleWare.run(rootSaga);

export default store;