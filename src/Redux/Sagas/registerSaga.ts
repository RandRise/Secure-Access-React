import { takeLatest, put, call, all } from "redux-saga/effects";
import {
    CONFIRM_EMAIL_REQUEST,
    CONFIRM_EMAIL_SUCCESS,
    GET_GENERAL_RESPONSE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    RESEND_VERIFICATION_CODE,
    RESEND_VERIFICATION_CODE_REQUEST,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS
} from "../../Actions/actions";

import { Authentication } from "../../Services/apiService";


function* registerUserSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(Authentication.registerUserAPI, action.payload);
        if (response.Code === 200) {
            yield put({ type: REGISTER_USER_SUCCESS, payload: response });
        }
        // else {
        //     // const errorMessage = response.Message;
        //     // yield put({ type: GET_GENERAL_RESPONSE, payload: errorMessage });
        // }
    } catch (error) {
        yield put({ type: GET_GENERAL_RESPONSE, payload: error });
    }
}

function* confirmEmailSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(Authentication.confirmUserAPI, action.payload);
        console.log('Confirmation API Response:', response);
        if (response.Code === 200) {

            yield put({ type: CONFIRM_EMAIL_SUCCESS, payload: response });
        }
    } catch (error: any) {

        yield put({ type: GET_GENERAL_RESPONSE, payload: error });
    }
}

function* resendVerificationCodeSaga(action: any): Generator<any, void, any> {
    try {

        const response = yield call(Authentication.resendVerificationCodeAPI, action.payload);

        if (response.Code === 200) {
            yield put({ type: RESEND_VERIFICATION_CODE, payload: response });
        }
    } catch (error) {
        yield put({ type: GET_GENERAL_RESPONSE, payload: error })
    }
}

function* userLoginSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(Authentication.loginAPI, action.payload);
        console.log("RESPONSE", response)

        if (response.Code === 200) {
            yield put({ type: USER_LOGIN_SUCCESS, payload: response });
            console.log('Login API Response:', response);
        }

    } catch (error: any) {
        yield put({ type: GET_GENERAL_RESPONSE, payload: error })
    }
}



function* watchRegisterUserSaga(): Generator<any, void, any> {
    yield takeLatest(REGISTER_USER_REQUEST, registerUserSaga);

}
function* watchConfirmEmailSaga(): Generator<any, void, any> {
    yield takeLatest(CONFIRM_EMAIL_REQUEST, confirmEmailSaga);
}

function* watchResendVerificationCodeSaga(): Generator<any, void, any> {
    yield takeLatest(RESEND_VERIFICATION_CODE_REQUEST, resendVerificationCodeSaga)
}

function* watchUserLoginSaga(): Generator<any, void, any> {
    yield takeLatest(USER_LOGIN_REQUEST, userLoginSaga);
}

export default function* registrationSaga() {
    yield all([
        watchRegisterUserSaga(),
        watchConfirmEmailSaga(),
        watchResendVerificationCodeSaga(),
        watchUserLoginSaga(),
    ]);
};