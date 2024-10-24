import { Row, Col, Typography, Input, Button } from 'antd';
import '../login/login.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/adminAuth';
import { useState } from 'react';
import authApi from '../../../api/authApi';

const { Title, Text } = Typography;

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { account, setAccount } = useAuth(); 

    const handleLogin = async () => {	
        // Kiểm tra thông tin đầu vào
        if (username.trim() === "") {
            setError("Please enter username");
            return;
        }
        if (password.trim() === "") {
            setError("Please enter password");
            return;
        }
	
        try {
            // Gọi API đăng nhập
            const response = await authApi.adminLogin({ 
                userName: username, 
                password: password 
            });
            console.log(response);
	
            // Kiểm tra xem người dùng có vai trò là admin không
            if (response.data && response.data.access_token) {
                console.log(response.data.access_token);
                if (response.data.role !== 'admin') { // Kiểm tra vai trò
                    setError("You do not have permission to access this page.");
                    return;
                }
                
                // Lưu token vào local storage
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('account', JSON.stringify(response.data));
                // console.log(account);
                // localStorage.parse(account);
                
                // Lưu thông tin người dùng vào context
                setAccount({
                    id: response.data.id, 
                    userName: response.data.userName,
                    address: response.data.address,
                    email: response.data.email,
                    gender: response.data.gender,
                    phone: response.data.phone,
                    role: response.data.role,
                    avatar: response.data.avatar
                });
                navigate('/admin/dashboard');
                console.log(response.data.role);
            }
        } catch (error) {
            // Xử lý các lỗi từ API
            if (error.response && error.response.data.statusCode === 401) {
                setError("Wrong username or password");
            } else if (error.response && error.response.data.statusCode === 500) {
                setError("Server error occurred.");
                console.error(error);
            } else {
                console.error("Unknown error occurred: ", error);
            }
        }
    };
	
    return (
        <Row style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <Col xs={24} md={15} className="background-container">
                <div className="background-image"></div>
            </Col>

            <Col xs={24} md={9} className="login-form">
                <Title level={2} className="welcome-title">ProLaptop</Title>
                {error && <Text type="danger">{error}</Text>}
                <Row gutter={[0, 20]}>
                    <Col span={24}>
                        <Input 
                            placeholder="User name" 
                            className="input-field" 
                            value={username} 
                            onChange={(e) => setUserName(e.target.value)} 
                        />
                    </Col>
                    <Col span={24}>
                        <Input
                            type="password"
                            placeholder="Password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </Col>
                    <Col span={24}>
                        <Button 
                            type="primary" 
                            className="login-button" 
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Col>
                    <Col span={24} className="reset-password">
                        <Text className="reset-text">Reset password</Text>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default LoginPage;
