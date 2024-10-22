import React, { useState } from 'react';
import { DatePicker, Card, Statistic, Row, Col } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const { RangePicker } = DatePicker;

export default function DashBoard() {
  const [data, setData] = useState([
    { date: '12/09', revenue: 500 },
    { date: '13/09', revenue: 600 },
    { date: '14/09', revenue: 700 },
    { date: '15/09', revenue: 800 },
    { date: '16/09', revenue: 750 },
    { date: '17/09', revenue: 900 },
  ]);
  
  const [totalRevenue, setTotalRevenue] = useState(4250); // Tổng doanh thu
  const [selectedRange, setSelectedRange] = useState([moment().subtract(5, 'days'), moment()]);

  // Hàm xử lý khi chọn khoảng thời gian
  const onDateRangeChange = (dates) => {
    if (!dates) return;
    
    const start = moment(dates[0]);
    const end = moment(dates[1]);
    
    // Giả lập việc thay đổi dữ liệu theo khoảng thời gian, bạn sẽ cần call API thực tế ở đây
    const filteredData = [
      { date: '12/09', revenue: 500 },
      { date: '13/09', revenue: 600 },
      { date: '14/09', revenue: 700 },
      { date: '15/09', revenue: 800 },
      { date: '16/09', revenue: 750 },
      { date: '17/09', revenue: 900 },
    ].filter((d) => moment(d.date, 'DD/MM').isBetween(start, end, undefined, '[]'));

    setData(filteredData);

    // Cập nhật tổng doanh thu
    const total = filteredData.reduce((sum, item) => sum + item.revenue, 0);
    setTotalRevenue(total);
    
    // Cập nhật khoảng thời gian đã chọn
    setSelectedRange([start, end]);
  };

  return (
    <div>
      <h1>Dashboard Management</h1>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic title="Tổng Doanh Thu" value={totalRevenue} suffix="VND" />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <RangePicker
              value={selectedRange}
              onChange={onDateRangeChange}
              format="DD/MM/YYYY"
            />
          </Card>
        </Col>
      </Row>

      <Card title="Doanh Thu Theo Ngày">
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
    </div>
  );
}
