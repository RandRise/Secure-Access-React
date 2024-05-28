import { CONFIRM_EMAIL_SUCCESS, GET_GENERAL_RESPONSE } from "../../Actions/actions";
import { confirmationState } from "../../States/confirmationState";

const initialState1: confirmationState = {
    loading: false,
    response: null,
    isConfirmedEmail: false,
}

const confirmationReducer = (state = initialState1, action: any): confirmationState => {
    switch (action.type) {
        case CONFIRM_EMAIL_SUCCESS:
            return { ...state, response: action.payload, isConfirmedEmail: true }
            
        case GET_GENERAL_RESPONSE:
            return { ...state, response: action.payload }

        default:
            return state;
    }
}
export default confirmationReducer;