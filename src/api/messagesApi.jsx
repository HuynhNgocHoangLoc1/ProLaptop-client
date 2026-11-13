import axiosClient from "./axiosClient";

const messagesApi = {
    send: async (data) => {
        const url = '/messages';
        return await axiosClient.application.post(url, data);
    },
    getAdminId: async () => {
        const response = await axiosClient.application.get('/user/admin');
        return response.data?.id || response.data?.user?.id;
    },
    getMessages: async (id, receiverId = null) => {
        const targetId = receiverId || (await messagesApi.getAdminId());
        const url = `/messages/${id}/${targetId}`;
        return await axiosClient.application.get(url);
    },
    getListMessages: async () => {
        const url = '/messages';
        return await axiosClient.application.get(url);
    },
};
export default messagesApi