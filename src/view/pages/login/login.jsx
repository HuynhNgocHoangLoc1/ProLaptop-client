import { Row, Col, Typography, Input, Button } from 'antd';
import '../login/login.css';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

function LoginPage() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/admin/users');
    }
	return (
		<Row
			style={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			{/* Left side: Background Image */}
			<Col xs={24} md={15} className="background-container">
				<div className="background-image"></div>
				<div className="branding">
					{/* <Title className="brand-title">PRO LAPTOP</Title> */}
					{/* <img
            src="your-laptop-image-url"
            alt="Laptop images"
            className="laptop-images"
          /> */}
				</div>
			</Col>

			{/* Right side: Login form */}
			<Col xs={24} md={9} className="login-form">
				<Title level={2} className="welcome-title">
					ProLaptop
				</Title>
				<Row gutter={[0, 20]}>
					<Col span={24}>
						<Input placeholder="User name" className="input-field" />
					</Col>
					<Col span={24}>
						<Input
							type="password"
							placeholder="Password"
							className="input-field"
						/>
					</Col>
					<Col span={24}>
						<Button type="primary" className="login-button" onClick={handleLogin}>
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
