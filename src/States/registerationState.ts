import { ICommonResponse } from "../Common/commonInterfaces";

export interface registrationState {
    loading: boolean;
    response: ICommonResponse | null;
}