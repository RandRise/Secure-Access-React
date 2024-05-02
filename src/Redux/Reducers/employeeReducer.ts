import { EmployeeState } from "../../States/employeeState";
import { GET_EMPLOYEES_SUCCESS, GET_GENERAL_RESPONSE } from "../../Actions/actions";

const initialState: EmployeeState = {
    employees: [],
    response: null,

};


const employeeReducer = (state = initialState, action: any): EmployeeState => {
    switch (action.type) {
        case GET_EMPLOYEES_SUCCESS:
            return { ...state, response: action.payload, employees: action.payload };
        case GET_GENERAL_RESPONSE:
            return { ...state, response: action.payload };
        default:
            return state;
    }
};

export default employeeReducer;
