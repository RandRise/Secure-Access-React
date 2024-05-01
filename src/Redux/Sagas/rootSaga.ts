import { all } from "redux-saga/effects";
import registrationSaga from './registerSaga'
import employeeSaga from "./EmployeeSaga";
export default function* rootSaga() {
    yield all ([
        registrationSaga(),
        employeeSaga(),
    ])
}