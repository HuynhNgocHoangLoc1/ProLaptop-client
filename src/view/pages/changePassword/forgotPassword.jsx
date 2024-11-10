import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mailApi from '../../../api/mailApi';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const onClickNext = async () => {
        try {
            // Gửi yêu cầu reset mật khẩu
            const response = await mailApi.sendMail({ email });
            console.log("Email sent successfully:", response);
            
            // Hiển thị thông báo khi email gửi thành công
            alert("Please check your email for the OTP code.");

            // Điều hướng tới trang checkToken nếu gửi thành công
            navigate('/checkToken', { state: { email } }); 
        } catch (error) {
            console.error("Failed to send email:", error);
            alert("Email not found. Please try again.");
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
        }}>Forgot password</h1>
        
        <input 
          type="email" 
          placeholder="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '300px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            backgroundColor: '#e0e0e0',
            marginBottom: '20px'
          }} 
        />
        
        <button style={{
          width: '300px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '10px',
          border: 'none',
          backgroundColor: "#053971",
          color: '#fff',
          cursor: 'pointer'
        }}
        onClick={onClickNext}>Next</button>
      </div>
    );
}

export default ForgotPassword;
