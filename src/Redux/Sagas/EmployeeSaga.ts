import { put, call, all, takeEvery } from "redux-saga/effects";
import {
    GET_EMPLOYEES_REQUEST,
    GET_EMPLOYEES_SUCCESS,
    GET_GENERAL_RESPONSE,
} from "../../Actions/actions";

import { EmployeeServices } from "../../Services/apiService";

function* getEmployees(): Generator<any, void, any> {
    try {
        const response = yield call(EmployeeServices.getEmployeesAPI);
        yield put({ type: GET_EMPLOYEES_SUCCESS, payload: response.Data }); // Dispatch action with received data
    } catch (error) {
        yield put({ type: GET_GENERAL_RESPONSE, payload: error });
    }
}


function* watchGetEmployeesSaga(): Generator<any, void, any> {
    yield takeEvery(GET_EMPLOYEES_REQUEST, getEmployees)
}

export default function* employeeSaga() {
    yield all([
        watchGetEmployeesSaga(),
    ]);
};