import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input, Button, Typography, message } from 'antd';
import mailApi from '../../../api/mailApi';

const { Title } = Typography;

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy email từ location.state (giả sử email đã được truyền qua state khi điều hướng đến trang này)
  const email = location.state?.email;

  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await mailApi.resetPassword({ email, newPassword });
      console.log("Password reset successfully:", response);

      // Hiển thị thông báo thành công
      message.success("Password changed successfully!");

      // Điều hướng về trang Home
      navigate('/');
    } catch (error) {
      console.error("Failed to reset password:", error);
      message.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#fff',
    }}>
      <Title level={1} style={{
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: "#053971",
      }}>
        Change Password
      </Title>
      
      <Input.Password
        placeholder="Enter new password"
        value={newPassword}
        onChange={handleChange}
        style={{
          width: '300px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '10px',
          marginBottom: '20px',
        }}
      />
      
      <Button
        type="primary"
        size="large"
        style={{
          width: '300px',
          borderRadius: '10px',
          backgroundColor: "#053971",
        }}
        onClick={handleSubmit}
      >
        Save Change
      </Button>
    </div>
  );
}

export default ChangePassword;
