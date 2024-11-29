import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Typography, message } from 'antd';
import mailApi from '../../../api/mailApi';

const { Title } = Typography;

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const onClickNext = async () => {
        try {
            // Gửi yêu cầu reset mật khẩu
            const response = await mailApi.sendMail({ email });
            console.log("Email sent successfully:", response);

            // Hiển thị thông báo khi email gửi thành công
            message.success("Please check your email for the OTP code.");

            // Điều hướng tới trang checkToken nếu gửi thành công
            navigate('/checkToken', { state: { email } });
        } catch (error) {
            console.error("Failed to send email:", error);
            message.error("Email not found. Please try again.");
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
                Forgot Password
            </Title>

            <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                style={{
                    width: '300px',
                    height: '40px',
                    fontSize: '16px',
                    borderRadius: '10px',
                    backgroundColor: "#053971",
                }}
                onClick={onClickNext}
            >
                Next
            </Button>
        </div>
    );
}

export default ForgotPassword;
