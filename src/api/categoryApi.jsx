import axiosClient from "./axiosClient";

const categoryApi = {
    getAllCategory: async () => {
        const url = "/category";
        return await axiosClient.applicationNoAuth.get(url);
    },

    createCategory: async (data) => {
        const url = "/category";
        return await axiosClient.formData.post(url, data);
    },

    updateCategory: async (id, data) => {
        const url = `/category/${id}`;
        return await axiosClient.formData.patch(url, data);
    },

    deleteCategory: async (id) => {
        const url = `/category/${id}`;
        return await axiosClient.applicationNoAuth.delete(url);
    },

    countCategory: async () => {
        const url = "/category/count";
        return await axiosClient.applicationNoAuth.get(url);
    },

    getProductCount : async () => {
        const url = "/category/product-count";
        return await axiosClient.applicationNoAuth.get(url);
    }
}
export default categoryApi