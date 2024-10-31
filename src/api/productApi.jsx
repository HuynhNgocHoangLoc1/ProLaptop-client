import axiosClient from "./axiosClient";

const productApi = {
    getAllProduct: async () => {
        const url = "/product";
        return await axiosClient.applicationNoAuth.get(url);
    },
    createProduct: async (product) => {
        const url = "/product";
        return await axiosClient.formData.post(url, product);
    },
    updateProduct: async (id, product) => {
        const url = `/product/${id}`;
        return await axiosClient.formData.patch(url, product);
    },
    deleteProduct: async (id) => {
        const url = `/product/${id}`;
        return await axiosClient.applicationNoAuth.delete(url);
    },
};

export default productApi;
