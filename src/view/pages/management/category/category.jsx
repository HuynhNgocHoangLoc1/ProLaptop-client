import React, { useState } from 'react';
import { Table, Button, Modal, Input, Upload, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

const initialData = [
  {
    key: '1',
    id: '1',
    name: 'Laptops',
    image: 'https://via.placeholder.com/100',
  },
  {
    key: '2',
    id: '2',
    name: 'Smartphones',
    image: 'https://via.placeholder.com/100',
  },
];

export default function Category() {
  const [dataSource, setDataSource] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name category',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="category" width={50} height={50} />,
    },
  ];

  const handleAddCategory = () => {
    if (!categoryName || !image) {
      message.error('Please enter a name and select an image!');
      return;
    }

    const newCategory = {
      key: dataSource.length + 1,
      id: dataSource.length + 1,
      name: categoryName,
      image: URL.createObjectURL(image),
    };

    setDataSource([...dataSource, newCategory]);
    setCategoryName('');
    setImage(null);
    setIsModalOpen(false);
  };

  const handleImageUpload = ({ file }) => {
    setImage(file);
  };

  return (
    <div>
      <h1>Categories Management</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
        Add Category
      </Button>
      </div>

      <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} />

      <Modal
        title="Add New Category"
        visible={isModalOpen}
        onOk={handleAddCategory}
        onCancel={() => setIsModalOpen(false)}
        okText="Add"
      >
        <Input
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          style={{ marginBottom: 10 }}
        />

        <Upload beforeUpload={() => false} onChange={handleImageUpload} maxCount={1}>
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
      </Modal>
    </div>
  );
}
