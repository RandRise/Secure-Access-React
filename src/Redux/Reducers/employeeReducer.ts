import { EmployeeState } from "../../States/employeeState";
import { ADD_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE_SUCCESS, GET_EMPLOYEES_SUCCESS, GET_GENERAL_RESPONSE, UPDATE_EMPLOYEE_SUCCESS } from "../../Actions/actions";

const initialState: EmployeeState = {
    employees: [],
    response: null,

};


const employeeReducer = (state = initialState, action: any): EmployeeState => {
    switch (action.type) {
        case GET_EMPLOYEES_SUCCESS:
            return { ...state, employees: action.payload };
        case GET_GENERAL_RESPONSE:
            return { ...state, response: action.payload };
        case DELETE_EMPLOYEE_SUCCESS:
            return { ...state, response: action.payload };
        case ADD_EMPLOYEE_SUCCESS:
            return { ...state, response: action.payload };
        case UPDATE_EMPLOYEE_SUCCESS:
            return { ...state, response: action.payload };
        default:
            return state;
    }
};

export default employeeReducer;
