import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message, Rate } from 'antd';
import reviewApi from '../../../../api/reviewApi';
import { DeleteOutlined } from '@ant-design/icons';

export default function Review() {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true); // State để kiểm soát loading

	// Fetch reviews từ API khi component được mount
	useEffect(() => {
		const fetchReviews = async () => {
			try {
				setLoading(true); // Bắt đầu loading
				const response = await reviewApi.getReview();
				const formattedData = response.data.data.map((review, index) => ({
					key: index + 1,
					id: review.id,
					comment: review.comment,
					rating: review.rating,
					date: new Date(review.date).toLocaleDateString(),
				}));
				setReviews(formattedData);
			} catch (error) {
				message.error('Failed to load reviews!');
			} finally {
				setLoading(false); // Kết thúc loading
			}
		};

		fetchReviews();
	}, []);

	// Xử lý xóa review
	const handleDelete = async (id) => {
		try {
			await reviewApi.deleteReview(id);
			setReviews(reviews.filter((review) => review.id !== id));
			message.success('Review deleted successfully!');
		} catch (error) {
			message.error('Failed to delete review!');
		}
	};

	// Cấu hình các cột trong bảng
	const columns = [
		{
			title: 'No',
			key: 'no',
			render: (_, __, index) => index + 1,
		},
		{
			title: 'Comment',
			dataIndex: 'comment',
			key: 'comment',
		},
		{
			title: 'Rating',
			dataIndex: 'rating',
			key: 'rating',
			render: (rating) => (
				<Rate value={rating} disabled style={{ color: '#faad14' }} />
			),
		},
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Popconfirm
					title="Are you sure to delete this review?"
					onConfirm={() => handleDelete(record.id)}
					okText="Yes"
					cancelText="No"
				>
					<Button
						icon={<DeleteOutlined />}
						type="text"
						style={{ color: 'red' }}
					/>
				</Popconfirm>
			),
		},
	];

	return (
		<div>
			<h1>Review Management</h1>
			<Table
				columns={columns}
				dataSource={reviews}
				loading={loading} // Thêm thuộc tính loading vào Table
				pagination={{ pageSize: 5, position: ['bottomCenter'] }}
			/>
		</div>
	);
}
