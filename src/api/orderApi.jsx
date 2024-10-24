import axiosClient from "./axiosClient";

const orderApi = {
    getAllOrder: async () => {
        const url = "/admin/order";
        return await axiosClient.applicationNoAuth.get(url);
    },

     updateOrderStatus: async (id, status) => {
        const url = `/order/${id}`;
        return await axiosClient.applicationNoAuth.patch(url,  status );
     },
}
export default orderApi