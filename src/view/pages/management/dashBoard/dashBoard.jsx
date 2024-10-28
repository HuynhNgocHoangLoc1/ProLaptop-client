import React, { useState } from 'react';
import { DatePicker, Card, Statistic, Row, Col } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { UserOutlined, DollarOutlined, TagsOutlined, StarOutlined } from '@ant-design/icons'; // Import icons
import moment from 'moment';
import './dashBoard.css';

const { RangePicker } = DatePicker;

const categoryData = [
  { name: 'Asus', value: 30 },
  { name: 'Macbook', value: 40 },
  { name: 'MSI', value: 25 },
  { name: 'LG', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function DashBoard() {
  const [data, setData] = useState([
    { date: '12/09', revenue: 500 },
    { date: '13/09', revenue: 600 },
    { date: '14/09', revenue: 700 },
    { date: '15/09', revenue: 800 },
    { date: '16/09', revenue: 750 },
    { date: '17/09', revenue: 900 },
  ]);
  
  const [totalRevenue, setTotalRevenue] = useState(4250);
  const [totalUsers, setTotalUsers] = useState(120);
  const [totalCategories, setTotalCategories] = useState(15);
  const [totalRatings, setTotalRatings] = useState(50); // Tổng đánh giá
  const [selectedRange, setSelectedRange] = useState([moment().subtract(5, 'days'), moment()]);

  const onDateRangeChange = (dates) => {
    if (!dates) return;
    
    const start = moment(dates[0]);
    const end = moment(dates[1]);
    
    const filteredData = [
      { date: '12/09', revenue: 500 },
      { date: '13/09', revenue: 600 },
      { date: '14/09', revenue: 700 },
      { date: '15/09', revenue: 800 },
      { date: '16/09', revenue: 750 },
      { date: '17/09', revenue: 900 },
    ].filter((d) => moment(d.date, 'DD/MM').isBetween(start, end, undefined, '[]'));

    setData(filteredData);

    const total = filteredData.reduce((sum, item) => sum + item.revenue, 0);
    setTotalRevenue(total);
    setSelectedRange([start, end]);
  };

  return (
    <div>
      <h1>Dashboard Management</h1>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic style={{ textAlign: 'center', fontWeight: 'bold' }} 
              title="Total Revenue" 
              value={totalRevenue} 
              suffix="VND" 
              prefix={<DollarOutlined />} 
              valueStyle={{ color: 'green', fontWeight: 'bold' }} // Màu xanh lá cây cho giá trị
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic style={{ textAlign: 'center', fontWeight: 'bold' }}
              title="Total Users" 
              value={totalUsers} 
              prefix={<UserOutlined />} 
              valueStyle={{ color: '#1890ff', fontWeight: 'bold' }} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic style={{ textAlign: 'center', fontWeight: 'bold' }}
              title="Total Categories" 
              value={totalCategories} 
              prefix={<TagsOutlined />} 
              valueStyle={{ color: 'red', fontWeight: 'bold' }} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic style={{ textAlign: 'center', fontWeight: 'bold' }}
              title="Total Ratings" 
              value={totalRatings} 
              prefix={<StarOutlined />} 
              valueStyle={{ color: 'gold',  fontWeight: 'bold' }} 
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <Card title="Daily Revenue" style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <RangePicker
                value={selectedRange}
                onChange={onDateRangeChange}
                format="DD/MM/YYYY"
              />
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Product Categories" style={{ marginTop: 16 }}>
            <ResponsiveContainer width="100%" height={329}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Ghi chú cho các màu sắc */}
            <div style={{ marginTop: 16 }}>
              {categoryData.map((entry, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ backgroundColor: COLORS[index % COLORS.length], width: 20, height: 20, marginRight: 8 }}></div>
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
