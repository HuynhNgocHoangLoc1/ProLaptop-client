import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import mailApi from '../../../api/mailApi';

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
      alert("Change password success!");

      // Điều hướng về trang Home
      navigate('/');
    } catch (error) {
      console.error("Failed to reset password:", error);
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#fff'
    }}>
      <h1 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: "#053971"
      }}>Change password</h1>
      
      <input
        type="password"
        placeholder="new password"
        value={newPassword}
        onChange={handleChange}
        style={{
          width: '300px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '20px',
          border: '1px solid #ccc',
          backgroundColor: '#d9d7d7',
          marginBottom: '20px',
        }}
      />
      
      <button 
        onClick={handleSubmit}
        style={{
          width: '300px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '10px',
          border: 'none',
          backgroundColor: "#053971",
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        Save change
      </button>
    </div>
  );
}

export default ChangePassword;
