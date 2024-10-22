import React, { useState } from 'react';
import { Table, Button, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// Enum cho status delivery
export const StatusDelivery = {
	PENDING: 'pending',
	DELIVERING: 'delivering',
	SUCCESS: 'success',
	CANCELLED: 'cancelled',
};

export default function Order() {
	// Dữ liệu mặc định
	const initialData = [
		{
			key: '1',
			email: 'user1@gmail.com',
			phoneNumber: '0123456789',
			shippingAddress: 'Da Nang',
			productName: 'Product A',
			price: 500,
			paymentMethod: 'Thanh toán online',
			statusDelivery: StatusDelivery.SUCCESS,
			orderDate: '24/04/2023 19:24:58',
		},
		{
			key: '2',
			email: 'user2@gmail.com',
			phoneNumber: '0987654321',
			shippingAddress: 'Hà Nội',
			productName: 'Product B',
			price: 700,
			paymentMethod: 'Thanh toán sau khi nhận',
			statusDelivery: StatusDelivery.PENDING,
			orderDate: '23/04/2023 16:22:55',
		},
		// Thêm dữ liệu khác nếu cần
	];

	const [dataSource, setDataSource] = useState(initialData);

	// Hàm để thay đổi trạng thái giao hàng
	const handleStatusChange = (key, newStatus) => {
		const updatedData = dataSource.map((item) => {
			if (item.key === key) {
				return { ...item, statusDelivery: newStatus };
			}
			return item;
		});
		setDataSource(updatedData);
	};

	const columns = [
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
			title: 'Product Name',
			dataIndex: 'productName',
			key: 'productName',
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
					onChange={(value) => handleStatusChange(record.key, value)}
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
		// {
		//   title: 'Actions',
		//   key: 'actions',
		//   render: (_, record) => (
		//     <>
		//       <Button
		//         type="link"
		//         icon={<EditOutlined />}
		//         style={{ marginRight: 10 }}
		//       />
		//       <Button type="link" icon={<DeleteOutlined />} danger />
		//     </>
		//   ),
		// },
	];

	return (
		<div>
			<h1>Order Management</h1>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					marginBottom: 16,
				}}
			>
				{/* <Button type="primary" icon={<PlusOutlined />}>
					Add Account
				</Button> */}
			</div>
			<Table
				columns={columns}
				dataSource={dataSource}
				pagination={{ pageSize: 10 }} 
			/>
		</div>
	);
}
