import React, { useState, useEffect } from 'react';
import { Card, Statistic, Row, Col, Spin } from 'antd';
import {
	UserOutlined,
	DollarOutlined,
	TagsOutlined,
	StarOutlined,
} from '@ant-design/icons';
import './dashBoard.css';
import userApi from '../../../../api/userApi';
import categoryApi from '../../../../api/categoryApi';
import reviewApi from '../../../../api/reviewApi';
import orderApi from '../../../../api/orderApi';
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Tooltip,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Legend,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function DashBoard() {
	const [categoryData, setCategoryData] = useState([]);
	const [totalRevenue, setTotalRevenue] = useState();
	const [totalUsers, setTotalUsers] = useState();
	const [totalCategories, setTotalCategories] = useState();
	const [totalRatings, setTotalRatings] = useState();
	const [weeklyRevenueData, setWeeklyRevenueData] = useState([]);
	const [loadingRevenue, setLoadingRevenue] = useState(true);
	const [loadingStats, setLoadingStats] = useState(true);
	const [loadingCategory, setLoadingCategory] = useState(true); // New loading state for category data

	useEffect(() => {
		const fetchWeeklyRevenue = async () => {
			setLoadingRevenue(true);
			try {
				const response = await orderApi.getOrderSuccessWeekly();
				setWeeklyRevenueData(response.data);
			} catch (error) {
				console.error('Failed to fetch weekly revenue:', error);
			} finally {
				setLoadingRevenue(false);
			}
		};
		fetchWeeklyRevenue();
	}, []);

	useEffect(() => {
		const fetchStats = async () => {
			setLoadingStats(true);
			try {
				const [userResponse, categoryResponse, reviewResponse, revenueResponse] = await Promise.all([
					userApi.countUser(),
					categoryApi.countCategory(),
					reviewApi.countReview(),
					orderApi.getOrderTotalSuccess(),
				]);
				
				setTotalUsers(userResponse.data.total);
				setTotalCategories(categoryResponse.data.total);
				setTotalRatings(reviewResponse.data.total);
				setTotalRevenue(revenueResponse.data.totalAmount);
			} catch (error) {
				console.error('Failed to fetch stats:', error);
			} finally {
				setLoadingStats(false);
			}
		};
		fetchStats();
	}, []);

	useEffect(() => {
        const fetchProductCount = async () => {
			setLoadingCategory(true); // Start loading for category data
            try {
                const response = await categoryApi.getProductCount();
                const { data } = response;
                
                if (Array.isArray(data.data)) {
                    const formattedData = data.data.map((item) => ({
                        name: item.category,
                        value: item.count,
                    }));
                    setCategoryData(formattedData);
                } else {
                    console.error('Data is not an array:', data.data);
                    setCategoryData([]);
                }
            } catch (error) {
                console.error('Failed to fetch product count:', error);
            } finally {
				setLoadingCategory(false); // End loading for category data
            }
        };
        fetchProductCount();
    }, []);
    
	return (
		<div>
			<h1 style={{ color: "#053971" }}>Dashboard Management</h1>
			<div></div>
			<Row gutter={16}>
				<Col span={6}>
					<Card>
						{loadingStats ? (
							<Spin size="large" />
						) : (
							<Statistic
								style={{ textAlign: 'center', fontWeight: 'bold' }}
								title="Total Revenue"
								value={totalRevenue}
								suffix="$"
								prefix={<DollarOutlined />}
								valueStyle={{ color: 'green', fontWeight: 'bold' }}
							/>
						)}
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						{loadingStats ? (
							<Spin size="large" />
						) : (
							<Statistic
								style={{ textAlign: 'center', fontWeight: 'bold' }}
								title="Total Users"
								value={totalUsers}
								prefix={<UserOutlined />}
								valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
							/>
						)}
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						{loadingStats ? (
							<Spin size="large" />
						) : (
							<Statistic
								style={{ textAlign: 'center', fontWeight: 'bold' }}
								title="Total Categories"
								value={totalCategories}
								prefix={<TagsOutlined />}
								valueStyle={{ color: 'red', fontWeight: 'bold' }}
							/>
						)}
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						{loadingStats ? (
							<Spin size="large" />
						) : (
							<Statistic
								style={{ textAlign: 'center', fontWeight: 'bold' }}
								title="Total Ratings"
								value={totalRatings}
								prefix={<StarOutlined />}
								valueStyle={{ color: 'gold', fontWeight: 'bold' }}
							/>
						)}
					</Card>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={16}>
					<Card title="Daily Revenue" style={{ marginTop: 16 }}>
						{loadingRevenue ? (
							<Spin size="large" />
						) : weeklyRevenueData.length > 0 ? (
							<ResponsiveContainer width="100%" height={450}>
								<LineChart data={weeklyRevenueData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis
										dataKey="date"
										tickFormatter={(date) =>
											new Date(date).toLocaleDateString('en-GB', {
												month: '2-digit',
												day: '2-digit',
											})
										}
									/>
									<YAxis />
									<Tooltip />
									<Legend />
									<Line type="monotone" dataKey="revenue" stroke="#8884d8" />
								</LineChart>
							</ResponsiveContainer>
						) : (
							<p>No data available for daily revenue.</p>
						)}
					</Card>
				</Col>
				<Col span={8}>
					<Card title="Product Categories" style={{ marginTop: 16 }}>
						{loadingCategory ? (
							<Spin size="large" />
						) : categoryData.length > 0 ? (
							<ResponsiveContainer width="100%" height={449}>
								<PieChart>
									<Pie
										data={categoryData}
										dataKey="value"
										nameKey="name"
										cx="50%"
										cy="50%"
										outerRadius={80}
										fill="#8884d8"
										label
									>
										{categoryData.map((entry, index) => (
											<Cell 
												key={`cell-${index}`}
												fill={COLORS[index % COLORS.length]}
											/>
										))}
									</Pie>
									<Tooltip />
									<Legend layout="vertical" verticalAlign="middle" align="right" />
								</PieChart>
							</ResponsiveContainer>
						) : (
							<p>No data available for product categories.</p>
						)}
					</Card>
				</Col>
			</Row>
		</div>
	);
}
