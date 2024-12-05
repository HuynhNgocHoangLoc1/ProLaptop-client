import axiosClient from "./axiosClient";

const messagesApi = {
    send: async (data) => {
        const url = '/messages';
        return await axiosClient.application.post(url, data);
    },
    getMessages: async (id) => {
        const url = `/messages/${id}/63330ead-553c-440a-80d5-e9a2f7f1ab7e`;
        // console.log(url)
        return await axiosClient.application.get(url);
    },
    getListMessages: async () => {
        const url = '/messages';
        return await axiosClient.application.get(url);
    },
};
export default messagesApi