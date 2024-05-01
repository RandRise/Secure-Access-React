import { ICommonResponse } from "../Common/commonInterfaces";
import { EmployeeModel } from "../Models/employeeModel";

export interface EmployeeState {
    employees: EmployeeModel[];
    response: ICommonResponse | null;
}
