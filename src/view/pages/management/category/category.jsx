import React, { useState, useEffect } from 'react';
import {
	Table,
	Button,
	Modal,
	Input,
	Upload,
	message,
	Spin,
	Popconfirm,
} from 'antd';
import {
	PlusOutlined,
	UploadOutlined,
	EditOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import categoryApi from '../../../../api/categoryApi';

export default function Category() {
	const [categories, setCategories] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [categoryName, setCategoryName] = useState('');
	const [iconUrl, setIconUrl] = useState(null);
	const [previewImageUrl, setPreviewImageUrl] = useState(null); // Thêm state cho preview ảnh
	const [editCategoryId, setEditCategoryId] = useState(null);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCategories = async () => {
			setLoading(true);
			try {
				const response = await categoryApi.getAllCategory();
				const fetchCategories = response.data.data.map((category) => ({
					key: category.id,
					id: category.id,
					name: category.name,
					iconUrl: category.iconUrl,
				}));
				setCategories(fetchCategories);
			} catch (error) {
				console.error('Error fetching categories:', error);
				message.error('Failed to load categories!');
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	const columns = [
		{
			title: 'No',
			key: 'no',
			render: (_, __, index) => index + 1,
		},
		{
			title: 'Name category',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Image',
			dataIndex: 'iconUrl',
			key: 'iconUrl',
			render: (text) => (
				<img src={text} alt="category" width={50} height={50} />
			),
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
					<Popconfirm
						title="Are you sure to delete this category?"
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
				</>
			),
		},
	];

	const showModal = (record) => {
		setEditCategoryId(record.id);
		setCategoryName(record.name);
		setIconUrl(record.iconUrl);
		setPreviewImageUrl(record.iconUrl); // Hiển thị ảnh hiện tại nếu đang chỉnh sửa
		setIsModalOpen(true);
	};

	const handleAddCategory = async () => {
		if (!categoryName || !iconUrl) {
			message.error('Please enter a name and select an image!');
			return;
		}

		const formData = new FormData();
		formData.append('name', categoryName);
		formData.append('iconUrl', iconUrl);

		try {
			const response = await categoryApi.createCategory(formData);

			console.log(response.data);
			const newCategory = {
				id: response.data.category.id,
				name: response.data.category.name,
				iconUrl: response.data.category.iconUrl,
			};
			// console.log(newCategory);
			setCategories([...categories, newCategory]);
			message.success('Category added successfully!');
		} catch (error) {
			message.error('Failed to add category!');
		} finally {
			resetModal();
		}
	};

	const handleUpdateCategory = async () => {
		if (!categoryName || !iconUrl) {
			message.error('Please enter a name and select an image!');
			return;
		}
	
		const formData = new FormData();
		formData.append('name', categoryName);
		formData.append('iconUrl', iconUrl);
	
		try {
			const response = await categoryApi.updateCategory(
				editCategoryId,
				formData,
			);
			// console.log("Response: ", response);
			
			const updatedCategory = {
				id: editCategoryId,
				name: categoryName,
				iconUrl: response?.data?.result?.iconUrl || iconUrl, // Use the new URL if provided
			};
			
			// console.log(updatedCategory);
	
			setCategories((prevCategories) =>
				prevCategories.map((category) =>
					category.id === editCategoryId ? updatedCategory : category
				)
			);			
			
			message.success('Category updated successfully!');
		} catch (error) {
			console.error('Error updating category:', error);
			message.error('Failed to update category!');
		} finally {
			resetModal();
		}
	};
	

	const handleDelete = async (id) => {
		try {
			await categoryApi.deleteCategory(id);
			setCategories((prevCategories) =>
				prevCategories.filter((category) => category.id !== id),
			);
			message.success('Category deleted successfully!');
		} catch (error) {
			console.error('Error deleting category:', error);
			message.error('Failed to delete category!');
		}
	};

	const resetModal = () => {
		setCategoryName('');
		setIconUrl(null);
		setPreviewImageUrl(null); // Xóa preview khi đóng modal
		setIsModalOpen(false);
		setEditCategoryId(null);
	};

	const handleImageUpload = ({ file }) => {
		setIconUrl(file);
		setPreviewImageUrl(URL.createObjectURL(file)); // Hiển thị URL ảnh tạm thời để preview
	};

	return (
		<div>
			<h1>Categories Management</h1>
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
					onClick={() => setIsModalOpen(true)}
				>
					Add Category
				</Button>
			</div>

			<Table
				columns={columns}
				dataSource={categories}
				pagination={{ pageSize: 5, position: ['bottomCenter'] }}
				loading={isLoading}
			/>

			<Modal
				title={editCategoryId ? 'Edit Category' : 'Add New Category'}
				visible={isModalOpen}
				onOk={editCategoryId ? handleUpdateCategory : handleAddCategory}
				onCancel={resetModal}
				okText={editCategoryId ? 'Update' : 'Add'}
			>
				<Input
					placeholder="Category Name"
					value={categoryName}
					onChange={(e) => setCategoryName(e.target.value)}
					style={{ marginBottom: 10 }}
				/>

				{previewImageUrl && (
					<img
						src={previewImageUrl}
						alt="Selected"
						width={100}
						style={{ marginBottom: 10 }}
					/>
				)}

				<Upload
					beforeUpload={() => false}
					onChange={handleImageUpload}
					maxCount={1}
				>
					<Button icon={<UploadOutlined />}>Select Image</Button>
				</Upload>
			</Modal>
		</div>
	);
}
