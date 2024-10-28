import React, { useState } from 'react';
import {
	Table,
	Button,
	Modal,
	Form,
	Input,
	Select,
	Upload,
	message,
} from 'antd';
import {
	EditOutlined,
	DeleteOutlined,
	PlusOutlined,
	UploadOutlined,
} from '@ant-design/icons';

const { Option } = Select;

export default function Product() {
	const initialData = [
		{
			key: '1',
			name: 'Product A',
			categoryID: '1',
			price: 500,
			stockQuantity: 100,
			ram: '8GB',
			cpu: 'Intel i5',
			card: 'NVIDIA GTX 1050',
			imageUrl:
				'https://res.cloudinary.com/dh6dvndzn/image/upload/v1729507608/a4jlhpccjf2xvdhd4cfe.png', // Image URL
		},
		{
			key: '2',
			name: 'Product B',
			categoryID: '2',
			price: 700,
			stockQuantity: 50,
			ram: '16GB',
			cpu: 'Intel i7',
			card: 'NVIDIA GTX 1650',
			imageUrl:
				'https://res.cloudinary.com/dh6dvndzn/image/upload/v1729507608/a4jlhpccjf2xvdhd4cfe.png', // Image URL
		},
	];

	const categoryData = [
		{ key: '1', name: 'Category 1' },
		{ key: '2', name: 'Category 2' },
	];

	const [dataSource, setDataSource] = useState(initialData);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const [imageUrl, setImageUrl] = useState('');

	const showModal = (record) => {
		setEditingProduct(record || null);
		setImageUrl(record?.imageUrl || ''); // Set image URL for editing
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setEditingProduct(null);
		setImageUrl('');
	};

	const handleSave = (values) => {
		const newProduct = {
			...values,
			imageUrl: imageUrl || 'https://via.placeholder.com/100', // Fallback image if none uploaded
		};

		if (editingProduct) {
			const updatedData = dataSource.map((item) =>
				item.key === editingProduct.key ? { ...item, ...newProduct } : item,
			);
			setDataSource(updatedData);
		} else {
			const newData = {
				key: `${dataSource.length + 1}`,
				...newProduct,
			};
			setDataSource([...dataSource, newData]);
		}
		setIsModalVisible(false);
		setImageUrl('');
	};

	const handleDelete = (key) => {
		const newData = dataSource.filter((item) => item.key !== key);
		setDataSource(newData);
	};

	const handleImageChange = (info) => {
		if (info.file.status === 'done') {
			const url = URL.createObjectURL(info.file.originFileObj);
			setImageUrl(url); // Set the image URL to display
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	};

	const columns = [
		{
			title: 'Product Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Category',
			dataIndex: 'categoryID',
			key: 'categoryID',
			render: (text) => {
				const category = categoryData.find((cat) => cat.key === text);
				return category ? category.name : 'Unknown';
			},
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: 'Stock Quantity',
			dataIndex: 'stockQuantity',
			key: 'stockQuantity',
		},
		{
			title: 'RAM',
			dataIndex: 'ram',
			key: 'ram',
		},
		{
			title: 'CPU',
			dataIndex: 'cpu',
			key: 'cpu',
		},
		{
			title: 'Graphics Card',
			dataIndex: 'card',
			key: 'card',
		},
		{
			title: 'Image', // New Image Column
			dataIndex: 'imageUrl',
			key: 'imageUrl',
			render: (text) => <img src={text} alt="Product" style={{ width: 100 }} />,
		},
		{
			title: 'Functions',
			dataIndex: 'actions',
			key: 'actions',
			render: (_, record) => (
				<>
					<Button
						type="link"
						icon={<EditOutlined />}
						onClick={() => showModal(record)}
						style={{ marginRight: 10 }}
					/>
					<Button
						type="link"
						icon={<DeleteOutlined />}
						danger
						onClick={() => handleDelete(record.key)}
					/>
				</>
			),
		},
	];

	return (
		<div>
			<h1>Product Management</h1>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					marginBottom: 16,
				}}
			>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => showModal(null)}
				>
					Add Product
				</Button>
			</div>
			<Table
				columns={columns}
				dataSource={dataSource}
				pagination={{ pageSize: 5, position: ['bottomCenter'] }}
			/>
			<Modal
				title={editingProduct ? 'Edit Product' : 'Add Product'}
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={null}
			>
				<Form
					layout="vertical"
					initialValues={editingProduct}
					onFinish={handleSave}
				>
					<Form.Item
						name="name"
						label="Product Name"
						rules={[
							{ required: true, message: 'Please input the product name!' },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="categoryID"
						label="Category"
						rules={[{ required: true, message: 'Please select a category!' }]}
					>
						<Select>
							{categoryData.map((category) => (
								<Option key={category.key} value={category.key}>
									{category.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						name="price"
						label="Price"
						rules={[{ required: true, message: 'Please input the price!' }]}
					>
						<Input type="number" />
					</Form.Item>
					<Form.Item
						name="stockQuantity"
						label="Stock Quantity"
						rules={[
							{ required: true, message: 'Please input the stock quantity!' },
						]}
					>
						<Input type="number" />
					</Form.Item>
					<Form.Item name="ram" label="RAM">
						<Input />
					</Form.Item>
					<Form.Item name="cpu" label="CPU">
						<Input />
					</Form.Item>
					<Form.Item name="card" label="Graphics Card">
						<Input />
					</Form.Item>
					<Form.Item name="imageUrl" label="Product Image">
						<Upload
							name="image"
							listType="picture"
							showUploadList={false}
							onChange={handleImageChange}
						>
							<Button icon={<UploadOutlined />}>Click to Upload</Button>
						</Upload>
						{imageUrl && (
							<img
								src={imageUrl}
								alt="Product"
								style={{ width: 100, marginTop: 10 }}
							/>
						)}
					</Form.Item>
					<Button type="primary" htmlType="submit">
						{editingProduct ? 'Save Changes' : 'Add Product'}
					</Button>
				</Form>
			</Modal>
		</div>
	);
}
