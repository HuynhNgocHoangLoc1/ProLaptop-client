import { Table, Button, Modal, Form, Input } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, KeyOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import userApi from '../../../../api/userApi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userApi.getAllUser(); 
        setUsers(
          response.data.data.map((user, index) => ({
            ...user,
            id: index + 1, // Tạo id từ 1 -> n
          }))
        );
        setLoading(false); 
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setLoading(false); 
      }
    };
    fetchUsers();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleBlockUser = (userId) => {
    // Logic để khóa tài khoản user
  };

//   const handleAddUser = () => {
//     form.resetFields(); 
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     form.validateFields()
//       .then((values) => {
//         const newUser = {
//           ...values,
//           id: users.length + 1, 
//         };
//         setUsers([...users, newUser]); // Thêm user vào danh sách
//         setIsModalVisible(false); // Đóng modal sau khi thêm thành công
//       })
//       .catch((info) => {
//         console.log('Validate Failed:', info);
//       });
//   };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
	{
	  title: 'ID',
	  dataIndex: 'id',
	  key: 'id',
	},
	{
	  title: 'Name',
	  dataIndex: 'userName', // Dùng key từ API
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
	  dataIndex: 'phoneNumber', // Dùng key từ API
	  key: 'phoneNumber',
	},
	{
	  title: 'Status',
	  dataIndex: 'isBlocked',
	  key: 'isBlocked',
	  render: (isBlocked) => (
		<span style={{ color: isBlocked ? 'red' : 'green' }}>
		  {isBlocked ? 'Blocked' : 'Active'}
		</span>
	  ),
	},
	{
	  title: 'Functions',
	  key: 'actions',
	  render: (text, record) => (
		<span>
		  <Button
			type="default"
			icon={record.isBlocked ? <KeyOutlined /> : <KeyOutlined />}
			danger={record.isBlocked} // Nếu user bị khóa thì button sẽ có màu đỏ
			onClick={() => handleBlockUser(record.id, record.isBlocked)}
			style={{ marginLeft: 8, color: record.isBlocked ? 'red' : 'green' }}
		  >
			{record.isBlocked ? 'Unblock' : 'Block'}
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
        loading={isLoading} // Hiển thị loading khi đang fetch dữ liệu
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Add User"
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
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
