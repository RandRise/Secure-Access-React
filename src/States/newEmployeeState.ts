import { ICommonResponse } from "../Common/commonInterfaces";
import { AddEmployeeModel } from "../Models/AddEmployeeModel";

export interface newEmployeeState {
    response: ICommonResponse | null,
    employee: AddEmployeeModel[];
    loading: boolean;
}