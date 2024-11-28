import axiosClient from "./axiosClient";

const userApi = {
    getAllUser: async () => {
        const url = "/user";
        return await axiosClient.applicationNoAuth.get(url);
    },
    blockUser: async (id, isBlock) => {
        const url = `/user/block/${id}`;
        return await axiosClient.applicationNoAuth.post(url, { isBlock }); 
    },
    countUser: async () => {
        const url = "/user/count";
        return await axiosClient.applicationNoAuth.get(url);
    },
    updateUser: async (id, data) => {
        const url = `/user/${id}`;
        return await axiosClient.formData.patch(url, data);
    },
      
}
export default userApi