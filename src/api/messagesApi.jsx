import axiosClient from "./axiosClient";

const messagesApi = {
    sendMessage: async (data) => {
        const url = '/messages';
        return await axiosClient.application.post(url, data);
    },
    getMessages: async (id) => {
        const url = `/messages/${id}/1d9c91b5-404c-4e26-9ba8-ed571a037cb1`;
        // console.log(url)
        return await axiosClient.application.get(url);
    },
    getListMessages: async () => {
        const url = '/messages';
        return await axiosClient.application.get(url);
    },
};
export default messagesApi