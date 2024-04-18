import axios from "axios";
import { registrationModel } from "../Models/registrationModel";
import { ICommonResponse } from "../Common/commonInterfaces";
import { confirmationModel } from "../Models/confirmationModel";

const REGISTER_API = 'https://task-follow-up.v2202305135856227727.ultrasrv.de/api/Auth/register';
const CONFIRM_API = 'https://task-follow-up.v2202305135856227727.ultrasrv.de/api/Auth/confirm-email';
const RESEND_VERIFICATION_CODE_API = 'https://task-follow-up.v2202305135856227727.ultrasrv.de/api/Auth/resend-confirm-code';

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
            console.log(typeof(formData), formData)
            const response = await axios.post(RESEND_VERIFICATION_CODE_API, {email: formData});
            return response.data;
        } catch (error: any) {
            throw error.response?.data ?? error.message;
        }
    }
}
