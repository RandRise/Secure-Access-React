import { put, call, all, takeEvery } from "redux-saga/effects";
import {
    GET_EMPLOYEES_REQUEST,
    GET_EMPLOYEES_SUCCESS,
    GET_GENERAL_RESPONSE,
    ADD_EMPLOYEE_REQUEST,
    ADD_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_REQUEST,
    DELETE_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_REQUEST,
} from "../../Actions/actions";

import { EmployeeServices } from "../../Services/apiService";

function* getEmployees(): Generator<any, void, any> {
    try {
        const response = yield call(EmployeeServices.getEmployeesAPI);
        yield put({ type: GET_EMPLOYEES_SUCCESS, payload: response.Data });
    } catch (error) {
        console.log(error)
    }
}

function* deleteEmployee(action: any): Generator<any, void, any> {
    try {
        const response = yield call(EmployeeServices.deleteEmployee, action.payload);
        yield put({ type: DELETE_EMPLOYEE_SUCCESS, payload: response })
        yield put({ type: GET_EMPLOYEES_REQUEST })
    } catch (error) {
        console.error('Error in DeleteEmployeeButton:', error);
        yield put({ type: GET_GENERAL_RESPONSE, payload: error })
    }
}

function* addEmployee(action: any): Generator<any, void, any> {
    try {
        const response = yield call(EmployeeServices.addEmployee, action.payload);
        yield put({ type: ADD_EMPLOYEE_SUCCESS, payload: response })
        yield put({ type: GET_EMPLOYEES_REQUEST })
    } catch (error) {
        yield put({ type: GET_GENERAL_RESPONSE, payload: error })
    }
}

function* updateEmployee(action: any): Generator<any, void, any> {
    try {
        const response = yield call(EmployeeServices.updateEmployee, action.payload);
        yield put({ type: UPDATE_EMPLOYEE_SUCCESS, payload: response });
        yield put({ type: GET_EMPLOYEES_REQUEST });
    } catch (error) {
        yield put({ type: GET_GENERAL_RESPONSE, payload: error })
    }
}

function* watchUpdateEmployeeSaga(): Generator<any, void, any> {
    yield takeEvery(UPDATE_EMPLOYEE_REQUEST, updateEmployee)
}

function* watchGetEmployeesSaga(): Generator<any, void, any> {
    yield takeEvery(GET_EMPLOYEES_REQUEST, getEmployees)
}

function* watchAddEmployeeSaga(): Generator<any, void, any> {
    yield takeEvery(ADD_EMPLOYEE_REQUEST, addEmployee)
}

function* watchDeleteEmployeeSaga(): Generator<any, void, any> {
    yield takeEvery(DELETE_EMPLOYEE_REQUEST, deleteEmployee)
}

export default function* employeeSaga() {
    yield all([
        watchGetEmployeesSaga(),
        watchAddEmployeeSaga(),
        watchDeleteEmployeeSaga(),
        watchUpdateEmployeeSaga(),
    ]);
};