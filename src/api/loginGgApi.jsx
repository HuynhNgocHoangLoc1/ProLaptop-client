import axiosClient from "./axiosClient";

const loginGG = {
    loginGG: async (credentials) => {
        const url = "/auth/google/login";
        return await axiosClient.applicationNoAuth.post(url, credentials);
    },
};

export default loginGG;
