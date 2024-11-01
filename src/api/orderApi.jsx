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

     getOrderTotalSuccess: async () => {
        const url = "/order/total-success";
        return await axiosClient.applicationNoAuth.get(url);
     },

     getOrderSuccessWeekly: async () => {
        const url = "/order/daily-success-weekly";
        return await axiosClient.applicationNoAuth.get(url);
     }
}
export default orderApi