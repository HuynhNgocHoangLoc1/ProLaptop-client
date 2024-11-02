import axiosClient from "./axiosClient";

const mailApi = {
    sendMail: async (data) => {
        const url = '/auth/request-password-reset';
        return await axiosClient.application.post(url, data);
    },

    confirmMail: async (data) => {
        const url = '/auth/verify-otp';
        return await axiosClient.application.post(url, data);
    },

    resetPassword: async (data) => {
        const url = '/auth/reset-password';
        return await axiosClient.application.post(url, data);
    }
}
export default mailApi