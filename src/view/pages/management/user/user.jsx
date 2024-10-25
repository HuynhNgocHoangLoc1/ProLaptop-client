import { Table, Button, Modal, Form, Input } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import userApi from '../../../../api/userApi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // User được chọn
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userApi.getAllUser();
        setUsers(response.data.data); // Sử dụng ID thực tế từ API
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []); // Chỉ chạy một lần khi component mount

  const handleBlockUser = async (userId, isBlocked) => {
    try {
      const newStatus = !isBlocked; // Đảo ngược trạng thái hiện tại
      await userApi.blockUser(userId, newStatus); // Gọi API với userId thực tế

      // Cập nhật UI
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
      title: `Are you sure ${action} user ?`,
      onOk: () => {
        setConfirmLoading(true);
        handleBlockUser(userId, isBlocked);
        setConfirmLoading(false);
      },
      onCancel: () => {
        // Có thể thêm logic nếu cần
      },
      okText: 'Yes',
      cancelText: 'Cancel',
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'No',
      key: 'no',
      render: (_, __, index) => index + 1, // Tạo cột số thứ tự
    },
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
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
        <span style={{ color: isBlock ? 'red' : 'green' }}>
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
            type="default"
            icon={<KeyOutlined />}
            danger={record.isBlock}
            onClick={() => showConfirm(record.id, record.isBlock)} // Hiện modal xác nhận
            style={{ marginLeft: 8, color: record.isBlock ? 'red' : 'green' }}
          >
            {record.isBlock ? 'Unblock' : 'Block'}
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
