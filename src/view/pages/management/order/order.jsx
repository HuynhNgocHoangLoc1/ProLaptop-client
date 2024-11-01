import React, { useState, useEffect } from 'react';
import { Table, Select, message } from 'antd';
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
	const [loading, setLoading] = useState(true);

	// Gọi API lấy danh sách orders
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await orderApi.getAllOrder();
				console.log(response.data.orders);
				const fetchedOrders = response.data.orders.map((order, index) => ({
					key: index + 1,
					id: order.id,
					email: order.email,
					phoneNumber: order.phoneNumber,
					shippingAddress: order.shippingAddress,
					price: order.price,
					paymentMethod: order.paymentMethod,
					statusDelivery: order.statusDelivery,
					date: order.date,
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
			const response = await orderApi.updateOrderStatus(id, {
				statusDelivery: newStatus,
			});
			const updatedData = orders.map((item) => {
				if (item.id === id) {
					return { ...item, statusDelivery: newStatus };
				}
				return item;
			});
			setOrders(updatedData);
			message.success('Order status updated successfully!');
		} catch (error) {
			console.error('Failed to update order status:', error);
			message.error('Failed to update order status!');
		}
	};

	// Hàm để xác định màu sắc cho trạng thái
	const getStatusColor = (status) => {
		switch (status) {
			case StatusDelivery.PENDING:
				return { color: 'purple' }; // Màu tím
			case StatusDelivery.DELIVERING:
				return { color: 'orange' }; // Màu vàng
			case StatusDelivery.SUCCESS:
				return { color: 'green' }; // Màu xanh lá
			case StatusDelivery.CANCELLED:
				return { color: 'red' }; // Màu đỏ
			default:
				return { color: 'black' }; // Mặc định
		}
	};

	const columns = [
		{
			title: 'No',
			key: 'no',
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
					onChange={(value) => handleStatusChange(record.id, value)}
					style={{ width: 150 }}
				>
					<Select.Option value={StatusDelivery.PENDING}>
						<span style={getStatusColor(StatusDelivery.PENDING)}>Pending</span>
					</Select.Option>
					<Select.Option value={StatusDelivery.DELIVERING}>
						<span style={getStatusColor(StatusDelivery.DELIVERING)}>Delivering</span>
					</Select.Option>
					<Select.Option value={StatusDelivery.SUCCESS}>
						<span style={getStatusColor(StatusDelivery.SUCCESS)}>Success</span>
					</Select.Option>
					<Select.Option value={StatusDelivery.CANCELLED}>
						<span style={getStatusColor(StatusDelivery.CANCELLED)}>Cancelled</span>
					</Select.Option>
				</Select>
			),
		},
		{
			title: 'Order Date',
			dataIndex: 'date',
			key: 'orderDate',
		},
	];

	return (
		<div>
			<h1>Order Management</h1>
			<Table
				columns={columns}
				dataSource={orders}
				loading={loading}
				pagination={{ pageSize: 5, position: ['bottomCenter'] }}
			/>
		</div>
	);
}
