import { USER_LOGIN_SUCCESS } from "../../Actions/actions";
import { userState } from "../../States/userState";

const initialState: userState = {
    isAuthenticated: false
}

const userAuthenticationReducer = (state = initialState, action: any): userState => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return { isAuthenticated: true }
        default:
            return state;
    }
}

export default userAuthenticationReducer;