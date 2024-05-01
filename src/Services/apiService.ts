import axios, { AxiosInstance } from "axios";
import { registrationModel } from "../Models/registrationModel";
import { ICommonResponse } from "../Common/commonInterfaces";
import { confirmationModel } from "../Models/confirmationModel";
import { userLoginModel } from "../Models/userLoginModel";

const baseURL = 'https://task-follow-up.v2202305135856227727.ultrasrv.de/api';


const registerAPI = '/Auth/register';
const confirmAPI = '/Auth/confirm-email';
const resendVerificationCodeAPI = '/Auth/resend-confirm-code';
const userLoginAPI = '/Auth/login';
const refreshTokenAPI = '/Auth/refresh-token';
const getEmployeesAPI = '/Employee/Employees'

const api = axios.create({
    baseURL: baseURL,
    headers:{
        Authorization: "Bearer " + localStorage.getItem('Token')
    }
})

api.interceptors.request.use(
    (config) => {
        const Token = localStorage.getItem('Token');
        if (Token) {
            config.headers.Authorization = `Bearer ${Token}`
        }
        return config;
    },
    (error) => Promise.reject(error)

)

api.interceptors.response.use(
    (response) => response,
    async (response) => {
        const originalRequest = response.config;

        if (response.Code === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const RefreshToken = localStorage.getItem('RefreshToken');
                const response = await axios.post(`${baseURL}${refreshTokenAPI}`, { RefreshToken });
                const { Token } = response.data.Data;
                localStorage.setItem('Token', Token);

                originalRequest.headers.Authorization = `Bearer ${Token}`;
                return axios(originalRequest);
            } catch (error) {

            }
            return Promise.reject(response);
        }
    }

)

export class Authentication {
    static registerUserAPI = async (formData: registrationModel): Promise<ICommonResponse> => {
        try {
            const response = await axios.post(`${baseURL}${registerAPI}`, formData);
            return response.data;
        } catch (error: any) {
            throw (error)
        }
    }

    static confirmUserAPI = async (formData: confirmationModel): Promise<ICommonResponse> => {
        try {
            const response = await axios.post(`${baseURL}${confirmAPI}`, formData);
            return response.data;
        } catch (error: any) {
            throw error.response?.data ?? error.message;
        }
    }

    static resendVerificationCodeAPI = async (formData: registrationModel): Promise<ICommonResponse> => {
        try {
            const response = await axios.post(`${baseURL}${resendVerificationCodeAPI}`, { email: formData });
            return response.data;
        } catch (error: any) {
            throw error.response?.data ?? error.message;
        }
    }

    static loginAPI = async (formData: userLoginModel): Promise<ICommonResponse> => {
        try {
            const response = await api.post(`${baseURL}${userLoginAPI}`, formData);
            console.log("Login API Response Data:", response.data); //  to see the response data
            const { Token, RefreshToken } = response.data.Data;
            console.log("Token:", Token); //to see the token value
            console.log("RefreshToken:", RefreshToken); //  to see the refresh token value
            localStorage.setItem('Token', Token);
            localStorage.setItem('RefreshToken', RefreshToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${Token}`;
            return response.data;
        } catch (error: any) {
            throw error.response?.data ?? error.message;
        }
    }
    
}
export class EmployeeServices {
    static getEmployeesAPI = async ():Promise<ICommonResponse> => {
        try {
            const response = await api.get(`${baseURL}${getEmployeesAPI}`)
            return response.data;
        }catch (error) {
            console.log("Error fetching employees",error)
            throw error;
        }
    }
}