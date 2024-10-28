import { Table, Button, Modal, Form, Input, Pagination } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import userApi from '../../../../api/userApi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  
  // Thêm state cho pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userApi.getAllUser();
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleBlockUser = async (userId, isBlocked) => {
    try {
      const newStatus = !isBlocked;
      await userApi.blockUser(userId, newStatus);
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, isBlock: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Failed to block/unblock user:", error);
    }
  };

  const showConfirm = (userId, isBlocked) => {
    const action = isBlocked ? "Unblock" : "Block";
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

  const columns = [
    {
      title: 'No',
      key: 'no',
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
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
    <div style={{ padding: '20px' }}>
      <h1>User Management</h1>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        bordered
        loading={isLoading}
				pagination={{ pageSize: 5, position: ['bottomCenter'] }}
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
