import {
    REGISTER_USER_SUCCESS,
    CONFIRM_EMAIL_SUCCESS,
    RESEND_VERIFICATION_CODE,
    USER_LOGIN_SUCCESS,
    GET_GENERAL_RESPONSE,
    REGISTER_USER_REQUEST,
    CONFIRM_EMAIL_REQUEST,
    USER_LOGIN_REQUEST,
    RESEND_VERIFICATION_CODE_REQUEST,
} from "../../Actions/actions";
import { registrationState } from "../../States/registerationState";

const initialState: registrationState = {
    loading: false,
    response: null,
    isSuccess: false,
};

const registrationReducer = (state = initialState, action: any): registrationState => {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return { ...state, loading: false, response: action.payload, isSuccess: true }

        case USER_LOGIN_SUCCESS:
            return { ...state, loading: false, response: action.payload, isSuccess: false };

        case RESEND_VERIFICATION_CODE:

        case GET_GENERAL_RESPONSE:
            return { ...state, response: action.payload };
        default:
            return state;
    }
}
export default registrationReducer;