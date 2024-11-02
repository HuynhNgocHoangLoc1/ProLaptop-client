import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import mailApi from '../../../api/mailApi';

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
            alert("OTP is correct!"); // Hiển thị thông báo khi OTP đúng

            // Điều hướng tới trang changePassword nếu xác nhận thành công
            navigate('/changePassword', { state: { email } });
        } catch (error) {
            console.error("Failed to verify OTP:", error);
            alert("Failed to verify OTP. Please try again.");
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
          color: '#053971'
        }}>Confirm OTP</h1>
        
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px'
        }}>
          {otp.map((_, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              style={{
                width: '50px',
                height: '50px',
                fontSize: '24px',
                textAlign: 'center',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: '#d9d7d7'
              }}
            />
          ))}
        </div>
        
        <button 
          onClick={handleSubmit}
          style={{
            width: '200px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: "#053971",
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          Confirm
        </button>
      </div>
    );
}

export default CheckToken;
