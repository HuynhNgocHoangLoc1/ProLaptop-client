import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../../layout/layout';
import UserManagement from '../pages/management/user/user';
import Order from '../pages/management/order/order';
import Product from '../pages/management/product/product';
import Review from '../pages/management/review/review';
import DashBoard from '../pages/management/dashBoard/dashBoard';
import LoginPage from '../pages/login/login';
import Chat from '../pages/management/chat/chat';
import Category from '../pages/management/category/category';
import ErrorPage from '../pages/errorPage/errorPage';
import ForgotPassword from '../pages/changePassword/forgotPassword';
import CheckToken from '../pages/changePassword/checkToken';
import ChangePassword from '../pages/changePassword';
import ChatList from '../pages/management/chat/listMess';
import Profile from '../pages/profile/profile';

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
                path: 'dashboard',
                element: <DashBoard />,
            },
            {
                path: 'users',
                element: <UserManagement />,
            },
            {
                path: 'orders',
                element: <Order />,
            },
            {
                path: 'categories',
                element: <Category />,
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
                path: 'chat',
                element: <Chat />,
            },
            {
                path: 'listMess',
                element: <ChatList />,
            },
            {
                path: 'profile',
                element: <Profile/>
            }            
        ],
    },
    {
        path: '/error',
        element: <ErrorPage />, 
    },
    {
        path: '/forgotPassword',
        element: <ForgotPassword/>
    },
    {
        path: '/checkToken',
        element: <CheckToken/>
    },
    {
        path: '/changePassword',
        element: <ChangePassword/>
    },
    

]);

export default Router;
