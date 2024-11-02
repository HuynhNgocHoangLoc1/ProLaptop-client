import React, { useState, useEffect } from 'react';
import {
	Table,
	Button,
	Popconfirm,
	message,
	Rate,
	Input,
} from 'antd';
import reviewApi from '../../../../api/reviewApi';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';

export default function Review() {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true); // State để kiểm soát loading
	const [search, setSearch] = useState('');
	const [filteredReviews, setFilteredReviews] = useState([]);

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

	useEffect(() => {
		if (search.length !== 0) {
			setFilteredReviews(
				reviews.filter((review) =>
					['comment', 'rating', 'date'].some((key) =>
						review[key]?.toString().toLowerCase().includes(search.toLowerCase()),
					)
				)
			);
		} else {
			setFilteredReviews(reviews);
		}
	}, [reviews, search]);

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

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
			<div className="header-wrapper search">
				<Input
					placeholder="Type here to search"
					value={search}
					onChange={handleSearch}
					size="large"
					prefix={<SearchOutlined />}
					style={{
						width: 300,
						backgroundColor: '#fff',
						color: 'blue',
						border: 'none',
					}}
				/>
			</div>
			<h1 style={{ color: '#053971' }}>Review Management</h1>
			<div></div>
			<Table
				columns={columns}
				dataSource={filteredReviews}
				loading={loading} // Thêm thuộc tính loading vào Table
				pagination={{ pageSize: 5, position: ['bottomCenter'] }}
			/>
		</div>
	);
}
