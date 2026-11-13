import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    DashboardOutlined,
    ShoppingCartOutlined,
    OrderedListOutlined,
    StarOutlined,
    LogoutOutlined,
    MessageOutlined,
    AppstoreOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import './layout.css';
import { useContext, useState, useEffect } from 'react'; 
import AccountContext from '../context/accountContext';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { account } = useContext(AccountContext);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/error')
        }
        
        if (account) {
            setUserName(account.userName || ''); 
            setEmail(account.email || ''); 
        }
    }, [account, navigate]);

    

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.clear(); 
        navigate('/');
    };

    const handleToProfile = () => {
        navigate('/admin/profile');
    };

    return (
        <Layout className={`admin-layout${collapsed ? ' admin-layout-collapsed' : ''}`}>
            <Sider
                width={252}
                collapsedWidth={76}
                collapsed={collapsed}
                onCollapse={setCollapsed}
                breakpoint="md"
                trigger={null}
                className="admin-sidebar"
            >
                <div className="logo-container">
                    <button
                        type="button"
                        className="sidebar-toggle"
                        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </button>
                    <div className="circular-logo" style={{ backgroundImage: `url(${account?.avatar})` }} />
                    {!collapsed && <h2 className="brand-name">PRO LAPTOP</h2>}
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    defaultOpenKeys={['managements']}
                    className="custom-menu"
                >
                    <Menu.Item
                        key="/admin/dashboard"
                        icon={<DashboardOutlined style={{ color: '#fff', fontSize: '24px' }} />}
                    >
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </Menu.Item>

                    <SubMenu key="managements" title="Managements" icon={<AppstoreOutlined />}>
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
                        {/* <Menu.Item
                            key="/admin/chat"
                            icon={<MessageOutlined style={{ color: '#fff', fontSize: '24px' }} />}
                        >
                            <Link to="/admin/chat">Message</Link>
                        </Menu.Item> */}
                        <Menu.Item
                            key="/admin/listMess"
                            icon={<MessageOutlined style={{ color: '#fff', fontSize: '24px' }} />}
                        >
                            <Link to="/admin/listMess">List message</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>

                <div className="admin-footer">
                    <div className="admin-info">
                    <UserOutlined className="admin-icon" onClick={handleToProfile} />
                    <div>
                            <p>{userName}</p>
                            <p>{email}</p>
                        </div>
                    </div>
                    <LogoutOutlined className="logout-icon" onClick={handleLogout} />
                </div>
            </Sider>

            <Layout className="admin-main">
                <Content className="site-layout">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
