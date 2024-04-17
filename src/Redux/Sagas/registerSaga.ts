import { takeLatest, put, call, all } from "redux-saga/effects";
import {
    CONFIRM_EMAIL_REQUEST,
    CONFIRM_EMAIL_SUCCESS,
    GET_GENERAL_RESPONSE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "../../Actions/actions";

import { Authentication } from "../../Services/apiService";


function* registerUserSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(Authentication.registerUserAPI, action.payload);
        if (response.Code === 200) {
            yield put({ type: REGISTER_USER_SUCCESS, payload: response })

        }
        else {
            yield put({ type: GET_GENERAL_RESPONSE, payload: response })
        }
    } catch (error) {
        console.log(error);
    }
}

function* confirmEmailSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(Authentication.confirmUserAPI, action.payload);
        if (response.Code === 200) {

            yield put({ type: CONFIRM_EMAIL_SUCCESS, payload: response });
        } else {
            yield put({ type: GET_GENERAL_RESPONSE, payload: response })
        }

    } catch (error) {
        console.error("Error confirming email:", error);
    }
}

function* watchConfirmEmailSaga(): Generator<any, void, any> {
    yield takeLatest(CONFIRM_EMAIL_REQUEST, confirmEmailSaga);
}


function* watchRegisterUserSaga(): Generator<any, void, any> {
    yield takeLatest(REGISTER_USER_REQUEST, registerUserSaga);
}

export default function* registrationSaga() {
    yield all([
        watchRegisterUserSaga(),
        watchConfirmEmailSaga(),
    ]);
};