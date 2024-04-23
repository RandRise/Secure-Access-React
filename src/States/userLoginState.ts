import { ICommonResponse } from "../Common/commonInterfaces";

export interface userLoginState {
    loading: boolean,
    response: ICommonResponse | null
    isUserLoginSuccess: boolean,
}