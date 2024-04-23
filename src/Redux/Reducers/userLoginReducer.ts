import { USER_LOGIN_SUCCESS } from "../../Actions/actions";
import { userLoginState } from "../../States/userLoginState";

const initialState: userLoginState = {
    loading: false,
    response: null,
    isUserLoginSuccess: false,

}

const userLoginReducer = (state = initialState, action: any): userLoginState => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return { ...state, response: action.payload, isUserLoginSuccess: true }
        default:
            return state;
    }
}

export default userLoginReducer;