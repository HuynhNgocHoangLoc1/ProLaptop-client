import axiosClient from "./axiosClient";


const reviewApi = {
    getReview: async () => {
        const url = "/review";
        return await axiosClient.applicationNoAuth.get(url);
    },

    deleteReview: async (id) => {
        const url = `/review/${id}`;
        return await axiosClient.applicationNoAuth.delete(url);
    },

    countReview: async () => {
        const url = "/review/count";
        return await axiosClient.applicationNoAuth.get(url);
    }
}

export default reviewApi