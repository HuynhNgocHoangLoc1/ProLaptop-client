import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input, Button, Typography, message } from 'antd';
import mailApi from '../../../api/mailApi';

const { Title } = Typography;

function CheckToken() {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState(["", "", "", ""]);

    // Lấy email từ location.state
    const email = location.state?.email;

    // Xử lý thay đổi trong các ô nhập
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value) || value === "") { // Chỉ cho phép nhập số từ 0-9
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            
            // Tự động chuyển sang ô tiếp theo nếu có giá trị
            if (value !== "" && index < otp.length - 1) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    // Gửi mã OTP khi bấm nút Confirm
    const handleSubmit = async () => {
        try {
            const otpCode = otp.join(''); // Ghép các ký tự lại thành chuỗi
            const response = await mailApi.confirmMail({ email, otp: otpCode });
            console.log("OTP verified successfully:", response);
            message.success("OTP is correct!"); // Hiển thị thông báo khi OTP đúng

            navigate('/changePassword', { state: { email } });
        } catch (error) {
            console.error("Failed to verify OTP:", error);
            message.error("Failed to verify OTP. Please try again.");
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
        <Title level={1} style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#053971'
        }}>Confirm OTP</Title>
        
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px'
        }}>
          {otp.map((_, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              style={{
                width: '50px',
                height: '50px',
                fontSize: '24px',
                textAlign: 'center',
                borderRadius: '5px',
                backgroundColor: '#d9d7d7',
              }}
            />
          ))}
        </div>
        
        <Button 
          type="primary"
          size="large"
          onClick={handleSubmit}
          style={{
            width: '200px',
            borderRadius: '10px',
            backgroundColor: "#053971"
          }}
        >
          Confirm
        </Button>
      </div>
    );
}

export default CheckToken;
