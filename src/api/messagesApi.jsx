import axiosClient from "./axiosClient";

const messagesApi = {
    send: async (data) => {
        const url = '/messages';
        return await axiosClient.application.post(url, data);
    },
    getMessages: async (id) => {
        const url = `/messages/${id}/474c4675-3050-4e00-8c86-38c3347c9ea6`;
        // console.log(url)
        return await axiosClient.application.get(url);
    },
    getListMessages: async () => {
        const url = '/messages';
        return await axiosClient.application.get(url);
    },
};
export default messagesApi