import { Layout, Menu, Input } from 'antd';
import {
    UserOutlined,
    DashboardOutlined,
    ShoppingCartOutlined,
    OrderedListOutlined,
    StarOutlined,
    LogoutOutlined,
    MessageOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import './layout.css'; // Đảm bảo bạn đã thêm CSS ở đây
import { useContext, useState, useEffect } from 'react'; 
import AccountContext from '../context/accountContext';

const { Sider, Content } = Layout;
const { Search } = Input;
const { SubMenu } = Menu;

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { account } = useContext(AccountContext);

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (account) {
            setUserName(account.userName || ''); 
            setEmail(account.email || ''); 
        }
    }, [account]);

    const onSearch = (value) => {
        console.log('Search:', value);
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            {/* Sidebar */}
            <Sider width={'19%'} style={{ backgroundColor: '#022c43', boxShadow: '2px 0 5px rgba(0,0,0,0.15)' }}>
                <div className="logo-container">
                    <div className="circular-logo" style={{ backgroundImage: `url(${account?.avatar})` }}></div>
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
                        icon={<DashboardOutlined style={{ color: '#fff', fontSize: '24px' }} />}
                    >
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </Menu.Item>

                    <SubMenu key="managements" title="Managements" icon={<AppstoreOutlined style={{ color: '#fff', fontSize: '24px' }} />} style={{ color: '#fff', backgroundColor: '#0C3A6C' }}>
                        <Menu.Item
                            key="/admin/users"
                            icon={<UserOutlined style={{ color: '#fff', fontSize: '24px' }} />}
                        >
                            <Link to="/admin/users">Account management</Link>
                        </Menu.Item>
                        <Menu.Item
                            key="/admin/orders"
                            icon={<OrderedListOutlined style={{ color: '#fff', fontSize: '24px' }} />}
                        >
                            <Link to="/admin/orders">Order management</Link>
                        </Menu.Item>
                        <Menu.Item
                            key="/admin/categories"
                            icon={<AppstoreOutlined style={{ color: '#fff', fontSize: '24px' }} />}
                        >
                            <Link to="/admin/categories">Category</Link>
                        </Menu.Item>
                        <Menu.Item
                            key="/admin/products"
                            icon={<ShoppingCartOutlined style={{ color: '#fff', fontSize: '24px' }} />}
                        >
                            <Link to="/admin/products">Product</Link>
                        </Menu.Item>
                        <Menu.Item
                            key="/admin/reviews"
                            icon={<StarOutlined style={{ color: '#fff', fontSize: '24px' }} />}
                        >
                            <Link to="/admin/reviews">Assessment management</Link>
                        </Menu.Item>
                        <Menu.Item
                            key="/admin/chat"
                            icon={<MessageOutlined style={{ color: '#fff', fontSize: '24px' }} />}
                        >
                            <Link to="/admin/chat">Message</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>

                {/* Footer */}
                <div className="admin-footer">
                    <div className="admin-info">
                        <UserOutlined className="admin-icon" />
                        <div>
                            <p>{userName}</p>
                            <p>{email}</p>
                        </div>
                    </div>
                    <LogoutOutlined className="logout-icon" onClick={handleLogout} />
                </div>
            </Sider>

            {/* Main Content */}
            <Layout>
                <Content className="site-layout">
                    {/* Conditionally render Search bar */}
                    {location.pathname !== '/admin/dashboard' && location.pathname !== '/admin/chat' && (
                        <Search
                            placeholder="Search..."
                            onSearch={onSearch}
                            enterButton
                            style={{ width: 400, borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}
                        />
                    )}
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
