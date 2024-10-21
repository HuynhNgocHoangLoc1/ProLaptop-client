// src/view/routers/Router.jsx
import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../../layout/layout';
// import LoginPage from '../pages/login/Login'; // Import trang login
import UserManagement from '../pages/management/user/user';
import Order from '../pages/management/order/order';
import Product from '../pages/management/product/product';
import Review from '../pages/management/review/review';
import DashBoard from '../pages/management/dashBoard/dashBoard';
import LoginPage from '../pages/login/login';

const Router = createBrowserRouter([
	{
		path: '',
		element: <LoginPage />,
	},
	{
		path: '/admin',
		element: <AdminLayout />,
		children: [
			{
				path: 'users',
				element: <UserManagement />,
			},
			{
				path: 'orders',
				element: <Order />,
			},
			{
				path: 'products',
				element: <Product />,
			},
			{
				path: 'reviews',
				element: <Review />,
			},
			{
				path: 'dashboard',
				element: <DashBoard />,
			},
		],
	},
]);

export default Router;
