import { EmployeeState } from "../../States/employeeState";
import { GET_EMPLOYEES_SUCCESS } from "../../Actions/actions";

const initialState: EmployeeState = {
    employees: [],
    response: null,
    
};


const employeeReducer = (state = initialState, action: any): EmployeeState => {
    switch (action.type) {
        case GET_EMPLOYEES_SUCCESS:
            return {...state, response: action.payload, employees: action.payload};
        default:
            return state;
    }
};

export default employeeReducer;
