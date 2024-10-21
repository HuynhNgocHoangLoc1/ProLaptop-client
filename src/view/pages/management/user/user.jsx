// pages/admin/UserManagement.jsx
import { Table, Button } from 'antd';

const UserManagement = () => {
	const users = [
		{
			id: 1,
			name: 'Thao Doan',
			email: 'user1@gmail.com',
			address: 'Da Nang',
			phone: '0905450317',
			status: 'active',
		},
		{
			id: 2,
			name: 'Dung Nguyen',
			email: 'user2@gmail.com',
			address: 'Da Nang',
			phone: '0905450317',
			status: 'blocked',
		},
		// Thêm các user khác
	];

	const handleActivate = (userId) => {
		console.log('Activating user with ID:', userId);
		// Xử lý API kích hoạt tài khoản
	};

	const handleBlock = (userId) => {
		console.log('Blocking user with ID:', userId);
		// Xử lý API block tài khoản
	};

	const handleDelete = (userId) => {
		console.log('Deleting user with ID:', userId);
		// Xử lý API xóa tài khoản
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
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (text, record) => (
				<span>
					{record.status === 'active' ? (
						<Button
							type="primary"
							danger
							onClick={() => handleBlock(record.id)}
						>
							Block
						</Button>
					) : (
						<Button type="primary" onClick={() => handleActivate(record.id)}>
							Activate
						</Button>
					)}
					<Button
						type="default"
						danger
						onClick={() => handleDelete(record.id)}
						style={{ marginLeft: 8 }}
					>
						Delete
					</Button>
				</span>
			),
		},
	];

	return (
		<div>
			<h1>User Management</h1>
			<Table
				dataSource={users}
				columns={columns}
				rowKey="id"
				bordered
				pagination={false}
			/>
		</div>
	);
};

export default UserManagement;
