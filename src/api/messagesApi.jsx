import axiosClient from "./axiosClient";

const messagesApi = {
    send: async (data) => {
        const url = '/messages';
        return await axiosClient.application.post(url, data);
    },
    getMessages: async (id) => {
        const url = `/messages/${id}/2dfd0de0-f0b8-42c0-8fe6-1e9d3ace3be0`;
        // console.log(url)
        return await axiosClient.application.get(url);
    },
    getListMessages: async () => {
        const url = '/messages';
        return await axiosClient.application.get(url);
    },
};
export default messagesApi