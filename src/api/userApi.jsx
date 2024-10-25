import axiosClient from "./axiosClient";

const userApi = {
    getAllUser: async () => {
        const url = "/user";
        return await axiosClient.applicationNoAuth.get(url);
    },
    blockUser: async (id, isBlock) => {
        const url = `/user/block/${id}`;
        return await axiosClient.applicationNoAuth.post(url, { isBlock }); // Gửi trạng thái isBlocked dưới dạng JSON
      }
      
}
export default userApi