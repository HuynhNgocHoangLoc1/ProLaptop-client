import React, { useState, useContext } from "react";
import { Form, Input, Button, Upload, Typography, Avatar, Space, Card, Row, Col, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import userApi from "../../../api/userApi";
import AccountContext from "../../../context/accountContext";

const { Title } = Typography;

const Profile = () => {
  const { account, setAccount } = useContext(AccountContext);
  const [formData, setFormData] = useState({
    userName: account?.userName || "",
    email: account?.email || "",
    phone: account?.phone || "",
    address: account?.address || "",
    avatar: account?.avatar || null,
    previewAvatar: account?.avatar || null,
  });

  const handleAvatarChange = (file) => {
    setFormData({
      ...formData,
      avatar: file,
      previewAvatar: URL.createObjectURL(file),
    });
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append("userName", formData.userName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    if (formData.avatar && formData.avatar !== account.avatar) {
      data.append("avatar", formData.avatar);
    }

    try {
      await userApi.updateUser(account.id, data);
      alert("Profile updated successfully!");
      setAccount({ ...account, ...formData, avatar: formData.previewAvatar });
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile");
    }
  };

  if (!account) {
    return (
      <Card style={{ maxWidth: 1000, margin: "0 auto", padding: 50 }}>
        <Typography.Text type="warning">No profile information available. Please log in.</Typography.Text>
      </Card>
    );
  }

  return (
    <Card
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        // padding: 30,
        borderRadius: 16,
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 50,
        marginLeft: 70

      }}
    >
      <Row gutter={[48, 48]}>
        <Col span={6} style={{ textAlign: "center", position: "relative" }}>
          <Avatar
            size={140}
            src={formData.previewAvatar}
            style={{
              marginTop: 200,
              marginBottom: 20,
              border: "4px solid #1890ff",
              cursor: "pointer",
            }}
          />
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              handleAvatarChange(file);
              return false;
            }}
          >
            <Tooltip title="Edit Avatar">
              <Button
                shape="circle"
                icon={<EditOutlined />}
                style={{
                  position: "absolute",
                  top: "calc(200px + 140px - 25px)", // Điều chỉnh vị trí theo avatar
                  right: "calc(50% - 70px)", // Đặt ở giữa avatar
                  zIndex: 10,
                }}
              />
            </Tooltip>
          </Upload>
        </Col>
        <Col span={18}>
          <Title level={2} style={{ marginBottom: 25, color: "#003366" }}>
            Admin Profile
          </Title>
          <Form layout="vertical">
            <Form.Item label="Username" style={{ marginBottom: 24 }}>
              <Input
                size="large"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Email" style={{ marginBottom: 24 }}>
              <Input
                size="large"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Phone" style={{ marginBottom: 24 }}>
              <Input
                size="large"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Address" style={{ marginBottom: 24 }}>
              <Input
                size="large"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Form.Item>
            <Button type="primary" block size="large" onClick={handleSave}>
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default Profile;
