import { Table, Button, Modal, Form, Input } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, KeyOutlined } from '@ant-design/icons';
import { useState } from 'react';

const UserManagement = () => {
	const [users, setUsers] = useState([
		{
			id: 1,
			name: 'Thao Doan',
			email: 'user1@gmail.com',
			address: 'Da Nang',
			phone: '0905450317',
			password: '********', 
		},
		{
			id: 2,
			name: 'Dung Nguyen',
			email: 'user2@gmail.com',
			address: 'Da Nang',
			phone: '0905450317',
			password: '********', 
		},
	]);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();

	const handleBlockUser = (userId) => {
		
	};

	const handleAddUser = () => {
		form.resetFields(); // Reset form fields before showing modal
		setIsModalVisible(true);
	};

	const handleOk = () => {
		form.validateFields().then(values => {
			// Tạo một user mới từ form
			const newUser = {
				...values,
				id: users.length + 1, // Set ID mới cho user
			};
			setUsers([...users, newUser]); // Thêm user vào danh sách
			setIsModalVisible(false); // Đóng modal sau khi thêm thành công
		}).catch(info => {
			console.log('Validate Failed:', info);
		});
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const columns = [
		{
			id: 'id',
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
		},
		
		{
			title: 'Functions',
			key: 'actions',
			render: (text, record) => (
				<span>
					<Button
						type="default"
						icon={<KeyOutlined />}
						danger
						onClick={() => handleBlockUser(record.id)}
						style={{ marginLeft: 8, color: 'red' }}
					/>
					{/* <Button
						type="default"
						icon={<EditOutlined />}
						onClick={() => console.log('Editing user with ID:', record.id)}
						style={{ marginLeft: 8, color: '#1890ff' }}
					/> */}
				</span>
			),
		},
	];

	return (
		<div>
			<h1>User Management</h1>
			{/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
				<Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
					Add Account
				</Button>
			</div> */}

			<Table
				dataSource={users}
				columns={columns}
				rowKey="id"
				bordered
				pagination={{ pageSize: 10 }} 
			/>

			{/* Modal for Adding User */}
			<Modal
				title="Add User"
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="name"
						label="Name"
						rules={[{ required: true, message: 'Please input the name!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="email"
						label="Email"
						rules={[{ required: true, message: 'Please input the email!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="address"
						label="Address"
						rules={[{ required: true, message: 'Please input the address!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="phone"
						label="Phone"
						rules={[{ required: true, message: 'Please input the phone!' }]}
					>
						<Input />
					</Form.Item>
				
				</Form>
			</Modal>
		</div>
	);
};

export default UserManagement;
