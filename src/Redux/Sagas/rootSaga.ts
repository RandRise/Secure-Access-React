import { all } from "redux-saga/effects";
import registrationSaga from './registerSaga'
export default function* rootSaga() {
    yield all ([
        registrationSaga(),
    ])
}