import axiosClient from "./axiosClient";

const authApi = {
    adminLogin: async (credentials) => {
        const url = "/auth/login";
        return await axiosClient.applicationNoAuth.post(url, credentials);
    },
};

export default authApi;
