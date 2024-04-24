import axios from "axios";
import { IAuthTokens, TokenRefreshRequest, applyAuthTokenInterceptor, getBrowserLocalStorage } from 'axios-jwt'
import { registrationModel } from "../Models/registrationModel";
import { ICommonResponse } from "../Common/commonInterfaces";
import { confirmationModel } from "../Models/confirmationModel";
import { userLoginModel } from "../Models/userLoginModel";

const REGISTER_API = 'https://task-follow-up.v2202305135856227727.ultrasrv.de/api/Auth/register';
const CONFIRM_API = 'https://task-follow-up.v2202305135856227727.ultrasrv.de/api/Auth/confirm-email';
const RESEND_VERIFICATION_CODE_API = 'https://task-follow-up.v2202305135856227727.ultrasrv.de/api/Auth/resend-confirm-code';
const USER_LOGIN_API = 'https://task-follow-up.v2202305135856227727.ultrasrv.de/api/Auth/login';
const REFRESH_TOKEN_API = 'https://task-follow-up.v2202305135856227727.ultrasrv.de/api/Auth/refresh-token';


const getStorage = getBrowserLocalStorage
const loginAxiosInstance = axios.create({ baseURL: USER_LOGIN_API })

const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {
    try {
        const response = await axios.post(REFRESH_TOKEN_API, { refreshToken })

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem('Token', accessToken)
        localStorage.setItem('RefreshToken', refreshToken)

        return { accessToken, refreshToken: newRefreshToken };
    } catch (error: any) {
        console.log("Token refresh failed", error)

        throw error.response?.data ?? error.message
    }
};

applyAuthTokenInterceptor(loginAxiosInstance, { requestRefresh, getStorage });

export class Authentication {
    static registerUserAPI = async (formData: registrationModel): Promise<ICommonResponse> => {
        try {
            const response = await axios.post(REGISTER_API, formData);
            return response.data;
        } catch (error: any) {
            throw error.response?.data ?? error.message;
        }
    }

    static confirmUserAPI = async (formData: confirmationModel): Promise<ICommonResponse> => {
        try {
            const response = await axios.post(CONFIRM_API, formData);
            return response.data;
        } catch (error: any) {
            throw error.response?.data ?? error.message;
        }
    }

    static resendVerificationCodeAPI = async (formData: registrationModel): Promise<ICommonResponse> => {
        try {
            const response = await axios.post(RESEND_VERIFICATION_CODE_API, { email: formData });
            return response.data;
        } catch (error: any) {
            throw error.response?.data ?? error.message;
        }
    }

    static loginAPI = async (formData: userLoginModel): Promise<ICommonResponse> => {
        try {
            const response = await loginAxiosInstance.post(USER_LOGIN_API, formData);
            return response.data;
        } catch (error: any) {
            throw error.response?.data ?? error.message
        }
    }


}
