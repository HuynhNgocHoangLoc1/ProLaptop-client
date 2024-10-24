import React, { useState, useEffect } from 'react';
import { Table, Select, message } from 'antd'; // Import message để thông báo
import orderApi from '../../../../api/orderApi';

// Enum cho status delivery
export const StatusDelivery = {
	PENDING: 'pending',
	DELIVERING: 'delivering',
	SUCCESS: 'success',
	CANCELLED: 'cancelled',
};

export default function Order() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true); // State loading để hiển thị trong Table

	// Gọi API lấy danh sách orders
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await orderApi.getAllOrder();
				console.log(response);
				const fetchedOrders = response.data.orders.map((order, index) => ({
					key: index + 1,
					id: order.id,
					email: order.email,
					phoneNumber: order.phoneNumber,
					shippingAddress: order.shippingAddress,
					price: order.price,
					paymentMethod: order.paymentMethod,
					statusDelivery: order.statusDelivery,
					orderDate: order.createdAt,
				}));
				setOrders(fetchedOrders);
				setLoading(false);
			} catch (error) {
				console.error('Failed to fetch orders:', error);
				setLoading(false);
			}
		};
		fetchOrders();
	}, []);

	// Hàm để thay đổi trạng thái giao hàng
	const handleStatusChange = async (id, newStatus) => {
		try {
			// Gọi API cập nhật trạng thái
			const response = await orderApi.updateOrderStatus(id, {
				statusDelivery: newStatus,
			});
			console.log(response);

			// Cập nhật state orders
			const updatedData = orders.map((item) => {
				if (item.id === id) {
					// Sử dụng id để tìm item
					return { ...item, statusDelivery: newStatus };
				}
				return item;
			});
			setOrders(updatedData);
			message.success('Order status updated successfully!'); // Hiển thị thông báo thành công
		} catch (error) {
			console.error('Failed to update order status:', error);
			message.error('Failed to update order status!'); // Hiển thị thông báo lỗi
		}
	};

	const columns = [
		{
			title: 'Id',
			key: 'index',
			render: (_, __, index) => index + 1,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Phone Number',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
		},
		{
			title: 'Shipping Address',
			dataIndex: 'shippingAddress',
			key: 'shippingAddress',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: 'Payment Method',
			dataIndex: 'paymentMethod',
			key: 'paymentMethod',
		},
		{
			title: 'Status Delivery',
			key: 'statusDelivery',
			render: (_, record) => (
				<Select
					value={record.statusDelivery}
					onChange={(value) => handleStatusChange(record.id, value)} // Gọi hàm cập nhật với id
					style={{ width: 150 }}
				>
					<Select.Option value={StatusDelivery.PENDING}>Pending</Select.Option>
					<Select.Option value={StatusDelivery.DELIVERING}>
						Delivering
					</Select.Option>
					<Select.Option value={StatusDelivery.SUCCESS}>Success</Select.Option>
					<Select.Option value={StatusDelivery.CANCELLED}>
						Cancelled
					</Select.Option>
				</Select>
			),
		},
		{
			title: 'Order Date',
			dataIndex: 'orderDate',
			key: 'orderDate',
		},
	];

	return (
		<div>
			<h1>Order Management</h1>
			<Table
				columns={columns}
				dataSource={orders} // Sử dụng dữ liệu từ API
				loading={loading} // Hiển thị loading khi đang fetch data
				pagination={{ pageSize: 5 }} // Thiết lập phân trang
			/>
		</div>
	);
}
