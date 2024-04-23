import { ICommonResponse } from "../Common/commonInterfaces";

export interface confirmationState {
    loading: boolean;
    response: ICommonResponse | null;
    isConfirmedEmail: boolean;
}