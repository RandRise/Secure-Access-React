import { GET_GENERAL_RESPONSE, USER_LOGIN_SUCCESS } from "../../Actions/actions";
import { userLoginState } from "../../States/userLoginState";

const initialState: userLoginState = {
    loading: false,
    response: null,
    isUserLoginSuccess: false,

}

const userLoginReducer = (state = initialState, action: any): userLoginState => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return { ...state, isUserLoginSuccess: true, }
        case GET_GENERAL_RESPONSE:
            return { ...state, response: action.payload }
        default:
            return state;
    }
}

export default userLoginReducer;