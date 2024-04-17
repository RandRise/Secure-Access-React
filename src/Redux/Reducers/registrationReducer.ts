import {
    REGISTER_USER_SUCCESS,
    CONFIRM_EMAIL_SUCCESS
} from "../../Actions/actions";
import { registrationState } from "../../States/registerationState";

const initialState: registrationState = {
    loading: false,
    response: null,
    isSuccess: false
};

const registrationReducer = (state = initialState, action: any): registrationState => {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return { ...state, loading: true, response: action.payload, isSuccess: action.payload.Code === 200 }
        case CONFIRM_EMAIL_SUCCESS:
            return { ...state, loading: true, response: action.payload }
        default:
            return { ...state };
    }
}
export default registrationReducer;