import axiosClient from "./axiosClient";

const userApi = {
    getAllUser: async () => {
        const url = "/user";
        return await axiosClient.applicationNoAuth.get(url);
    },
}
export default userApi