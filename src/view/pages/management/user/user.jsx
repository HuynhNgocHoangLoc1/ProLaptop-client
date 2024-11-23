import { Table, Button, Modal, Form, Input, Pagination } from 'antd';
import { KeyOutlined, SearchOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import userApi from '../../../../api/userApi';

const UserManagement = () => {
	const [users, setUsers] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();
	const [search, setSearch] = useState('');
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await userApi.getAllUser();
				setUsers(response.data.data);
				setFilteredUsers(response.data.data);
				setLoading(false);
			} catch (error) {
				console.error('Failed to fetch users:', error);
				setLoading(false);
			}
		};
		fetchUsers();
	}, []);

	useEffect(() => {
		if (search.length !== 0) {
			setFilteredUsers(
				users.filter((user) =>
					['userName', 'email', 'address', 'phoneNumber','isBlock'].some((key) =>
						user[key]?.toString().toLowerCase().includes(search.toLowerCase())
					)
				)
			);
		} else {
			setFilteredUsers(users);
		}
	}, [users, search]);

	const handleBlockUser = async (userId, isBlocked) => {
		try {
			const newStatus = !isBlocked;
			await userApi.blockUser(userId, newStatus);
			setUsers((prevUsers) =>
				prevUsers.map((user) =>
					user.id === userId ? { ...user, isBlock: newStatus } : user,
				),
			);
			setFilteredUsers((prevUsers) =>
				prevUsers.map((user) =>
					user.id === userId ? { ...user, isBlock: newStatus } : user,
				),
			);
		} catch (error) {
			console.error('Failed to block/unblock user:', error);
		}
	};

	const showConfirm = (userId, isBlocked) => {
		const action = isBlocked ? 'Unblock' : 'Block';
		Modal.confirm({
			title: `Are you sure you want to ${action} this user?`,
			onOk: () => {
				setConfirmLoading(true);
				handleBlockUser(userId, isBlocked);
				setConfirmLoading(false);
			},
			okText: 'Yes',
			cancelText: 'Cancel',
		});
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const columns = [
		{
			title: 'Name',
			dataIndex: 'userName',
			key: 'userName',
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
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
		},
		{
			title: 'Status',
			dataIndex: 'isBlock',
			key: 'isBlock',
			render: (isBlock) => (
				<span style={{ color: isBlock ? 'red' : 'green', fontWeight: 'bold' }}>
					{isBlock ? 'Blocked' : 'Active'}
				</span>
			),
		},
		{
			title: 'Functions',
			key: 'actions',
			render: (text, record) => (
				<span>
					<Button
						type={record.isBlock ? 'default' : 'primary'}
						icon={<KeyOutlined />}
						danger={record.isBlock}
						onClick={() => showConfirm(record.id, record.isBlock)}
						style={{
							marginLeft: 8,
							backgroundColor: record.isBlock ? 'green' : 'red',
							borderColor: 'transparent',
							color: 'white',
						}}
					>
						{record.isBlock ? 'Unblock' : 'Block'}
					</Button>
				</span>
			),
		},
	];

	return (
		<div >
			<div className="header-wrapper search">
				<Input
					placeholder="Type here to search"
					value={search}
					onChange={handleSearch}
					size="large"
					prefix={<SearchOutlined />}
					style={{
						width: 300,
						backgroundColor: '#fff',
						color: 'blue',
						border: 'none',
					}}
				/>
			</div>
			<h1 style={{ color: '#053971' }}>User Management</h1>
			<Table
				dataSource={filteredUsers}
				columns={columns}
				rowKey="id"
				bordered
				loading={isLoading}
				pagination={{
					pageSize,
					current: currentPage,
					onChange: handlePageChange,
					position: ['bottomCenter'],
				}}
			/>
			<Modal
				title="Add User"
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={null}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="userName"
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
						name="phoneNumber"
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
