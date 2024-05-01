import { takeLatest, put, call, all } from "redux-saga/effects";
import {
    GET_EMPLOYEES_REQUEST,
    GET_EMPLOYEES_SUCCESS,
    GET_GENERAL_RESPONSE,
} from "../../Actions/actions";

import { EmployeeServices } from "../../Services/apiService";
function* getEmployees(): Generator<any, void, any> {
    try {

        const response = yield EmployeeServices.getEmployeesAPI()
            .then(r => r.Data);
        yield put({ type: GET_EMPLOYEES_SUCCESS, payload: response })
    } catch (response) {
        yield put({ type: GET_GENERAL_RESPONSE, payload: response });
    }
}

function* watchGetEmployeesSaga(): Generator<any, void, any> {
    yield takeLatest(GET_EMPLOYEES_REQUEST, getEmployees)
}

export default function* employeeSaga() {
    yield all([
        watchGetEmployeesSaga(),
    ]);
};