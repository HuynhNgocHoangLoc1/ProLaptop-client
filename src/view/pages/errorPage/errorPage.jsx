import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/'); // Chuyển hướng về trang chính
  };

  return (
    <Result
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column', // Canh giữa nội dung theo chiều dọc
        overflow: 'hidden', // Ngăn việc kéo lên hoặc kéo xuống
      }}
      icon={
        <img 
          src="https://sitechecker.pro/wp-content/uploads/2023/06/403-status-code.png" 
          alt="Error 403" 
          style={{ width: '1000px', height: 'auto' }} // Thay đổi kích thước hình ảnh
        />
      }
      subTitle="Sorry, you do not have permission to access this page." // Thông điệp lỗi
      extra={<Button type="primary" onClick={handleBackHome}>Back to login</Button>} // Nút quay về trang chính
    />
  );
}

export default ErrorPage; // Đảm bảo tên xuất khẩu đúng
