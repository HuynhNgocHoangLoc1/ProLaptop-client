import { Layout, Menu, Input } from 'antd';
import {
	UserOutlined,
	DashboardOutlined,
	ShoppingCartOutlined,
	OrderedListOutlined,
	StarOutlined,
	LogoutOutlined,
	MessageOutlined,
} from '@ant-design/icons';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import './layout.css';

const { Sider, Content } = Layout;
const { Search } = Input;

const AdminLayout = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const onSearch = (value) => {
		console.log('Search:', value);
	};

	const handleLogout = () => {
		navigate('/');
	};


	

	return (
		<Layout style={{ minHeight: '100vh' }}>
			{/* Sidebar */}
			<Sider width={'19%'} style={{ backgroundColor: '#011640' }}>
				<div className="logo-container">
					<div className="circular-logo"></div>
					<h2 className="brand-name">PRO LAPTOP</h2>
				</div>

				{/* Menu */}
				<Menu
					theme=""
					mode="inline"
					selectedKeys={[location.pathname]}
					className="custom-menu"
				>
					<Menu.Item
						key="/admin/dashboard"
						icon={
							<DashboardOutlined style={{ color: '#fff', fontSize: '25px' }} />
						}
					>
						<Link to="/admin/dashboard">Dashboard</Link>
					</Menu.Item>
					<Menu.Item
						key="/admin/users"
						icon={<UserOutlined style={{ color: '#fff', fontSize: '25px' }} />}
					>
						<Link to="/admin/users">Account management</Link>
					</Menu.Item>
					<Menu.Item
						key="/admin/orders"
						icon={
							<OrderedListOutlined
								style={{ color: '#fff', fontSize: '25px' }}
							/>
						}
					>
						<Link to="/admin/orders">Order management</Link>
					</Menu.Item>
					<Menu.Item
						key="/admin/products"
						icon={
							<ShoppingCartOutlined
								style={{ color: '#fff', fontSize: '25px' }}
							/>
						}
					>
						<Link to="/admin/products">Product</Link>
					</Menu.Item>
					<Menu.Item
						key="/admin/reviews"
						icon={<StarOutlined style={{ color: '#fff', fontSize: '25px' }} />}
					>
						<Link to="/admin/reviews">Assessment management</Link>
					</Menu.Item>
					
					<Menu.Item
						key="/admin/chat"
						icon={
							<MessageOutlined style={{ color: '#fff', fontSize: '25px' }} />
						}
					>
						<Link to="/admin/chat">Message</Link>
					</Menu.Item>
				</Menu>

				{/* Footer */}
				<div className="admin-footer">
					<div className="admin-info">
						<UserOutlined className="admin-icon" />
						<div>
							<p>Admin</p>
							<p>admin@gmail.com</p>
						</div>
					</div>
					<LogoutOutlined className="logout-icon" onClick={handleLogout} />
				</div>
			</Sider>

			{/* Main Content */}
			<Layout>
				{/* Content */}
				<Content className="site-layout">
					{/* Hiển thị ô tìm kiếm ngoại trừ trang dashboard */}
					{location.pathname !== '/admin/dashboard' &&
						location.pathname !== '/admin/chat' && (
							<Search
								placeholder="Search..."
								onSearch={onSearch}
								enterButton
								style={{ width: 400 }}
							/>
						)}

					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default AdminLayout;
