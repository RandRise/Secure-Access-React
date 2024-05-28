import {
    REGISTER_USER_SUCCESS,
    RESEND_VERIFICATION_CODE,
    GET_GENERAL_RESPONSE,

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
        case RESEND_VERIFICATION_CODE:
            return { ...state, loading: false, response: action.payload, isSuccess: false };
        case GET_GENERAL_RESPONSE:
            return { loading: false, response: action.payload, isSuccess: false };
        default:
            return state;
    }
}
export default registrationReducer;