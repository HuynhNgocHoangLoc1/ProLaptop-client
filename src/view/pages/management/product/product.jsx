import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Input,
  Upload,
  message,
  Popconfirm,
  Row,
  Col,
  Select,
} from 'antd';
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import productApi from '../../../../api/productApi';
import '../product/product.css';
import categoryApi from '../../../../api/categoryApi';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);

  // Các thuộc tính khác của sản phẩm
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [ram, setRam] = useState('');
  const [cpu, setCpu] = useState('');
  const [chip, setChip] = useState('');
  const [card, setCard] = useState('');
  const [hardDrive, setHardDrive] = useState('');
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productApi.getAllProduct();
        const fetchProducts = response.data.data.map((product) => ({
          key: product.id,
          id: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          category: product.category,
          price: product.price,
          ram: product.ram,
          cpu: product.cpu,
          chip: product.chip,
          hardDrive: product.hardDrive,
          description: product.description,
          stockQuantity: product.stockQuantity,
          card: product.card,
        }));
        setProducts(fetchProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        message.error('Failed to load products!');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await categoryApi.getAllCategory();
        const fetchCategories = response.data.data.map((category) => ({
          id: category.id,
          categoryName: category.name,
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

  useEffect(() => {
    if (search.length !== 0) {
      setFilteredProducts(
        products.filter((product) =>
          [
            'name',
            'category',
            'description',
            'ram',
            'cpu',
            'chip',
            'card',
            'hardDrive',
            'stockQuantity',
            'price',
          ].some((key) =>
            product[key]?.toString().toLowerCase().includes(search.toLowerCase())
          )
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, search]);

  const columns = [
    { title: 'Product Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text) => <img src={text} alt="product" width={70} height={70} />,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => category?.name || 'Unknown Category',
    },
    {
      title: 'Stock Quantity',
      dataIndex: 'stockQuantity',
      key: 'stockQuantity',
    },
    { title: 'RAM', dataIndex: 'ram', key: 'ram' },
    { title: 'CPU', dataIndex: 'cpu', key: 'cpu' },
    { title: 'Chip', dataIndex: 'chip', key: 'chip' },
    { title: 'Card', dataIndex: 'card', key: 'card' },
    { title: 'Hard Drive', dataIndex: 'hardDrive', key: 'hardDrive' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Actions',
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
            title="Are you sure to delete this product?"
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
    setProductName(record ? record.name : '');
    setImageUrl(record ? record.imageUrl : null);
    setPreviewImageUrl(record ? record.imageUrl : null);
    setPrice(record ? record.price : 0);
    setCategoryId(record && record.category ? record.category.id : '');
    setDescription(record ? record.description : '');
    setQuantity(record ? record.stockQuantity : 0);
    setRam(record ? record.ram : '');
    setCpu(record ? record.cpu : '');
    setChip(record ? record.chip : '');
    setCard(record ? record.card : '');
    setHardDrive(record ? record.hardDrive : '');
    setEditProductId(record ? record.id : null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await productApi.deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      message.success('Product deleted successfully!');
    } catch (error) {
      message.error('Failed to delete product!');
    }
  };

  const handleCreateProduct = async () => {
    if (!productName || !imageUrl || !price || !categoryId || !description || !quantity || !ram || !cpu || !chip || !card || !hardDrive) {
      message.error('Please enter all required fields!');
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('imageUrl', imageUrl);
    formData.append('price', price);
    formData.append('categoryId', categoryId);
    formData.append('description', description);
    formData.append('stockQuantity', quantity);
    formData.append('ram', ram);
    formData.append('cpu', cpu);
    formData.append('chip', chip);
    formData.append('card', card);
    formData.append('hardDrive', hardDrive);

    try {
      const response = await productApi.createProduct(formData);
      const newProduct = {
        key: response.data.product.id,
        id: response.data.product.id,
        category: response.data.product.category,
        chip: response.data.product.chip,
        cpu: response.data.product.cpu,
        description: response.data.product.description,
        hardDrive: response.data.product.hardDrive,
        imageUrl: response.data.product.imageUrl,
        name: response.data.product.name,
        price: response.data.product.price,
        ram: response.data.product.ram,
        stockQuantity: response.data.product.stockQuantity,
        card: response.data.product.card,
      };
      setProducts([newProduct, ...products]);
      message.success('Product created successfully!');
    } catch (error) {
      message.error('Failed to create product!');
    } finally {
      resetModal();
    }
  };

  const handleUpdateProduct = async () => {
    if (!productName || !imageUrl || !price || !categoryId || !description || !quantity || !ram || !cpu || !chip || !card || !hardDrive) {
      message.error('Please enter all required fields!');
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('imageUrl', imageUrl);
    formData.append('price', price);
    formData.append('categoryId', categoryId);
    formData.append('description', description);
    formData.append('stockQuantity', quantity);
    formData.append('ram', ram);
    formData.append('cpu', cpu);
    formData.append('chip', chip);
    formData.append('card', card);
    formData.append('hardDrive', hardDrive);

    try {
      const response = await productApi.updateProduct(editProductId, formData);
      const updatedCategory = categories.find((cat) => cat.id === categoryId);

      const updatedProduct = {
        id: editProductId,
        name: productName,
        imageUrl: response.data?.imageUrl || previewImageUrl,
        price: price,
        category: { id: categoryId, name: updatedCategory.categoryName },
        description: description,
        stockQuantity: quantity,
        ram: ram,
        cpu: cpu,
        chip: chip,
        card: card,
        hardDrive: hardDrive,
      };

      const updatedProducts = products.map((product) =>
        product.id === editProductId ? updatedProduct : product
      );

      setProducts(updatedProducts);
      message.success('Product updated successfully!');
    } catch (error) {
      message.error('Failed to update product!');
      console.error(error);
    } finally {
      resetModal();
    }
  };

  const resetModal = () => {
    setProductName('');
    setImageUrl(null);
    setPreviewImageUrl(null);
    setPrice(0);
    setCategoryId('');
    setDescription('');
    setQuantity(0);
    setRam('');
    setCpu('');
    setChip('');
    setCard('');
    setHardDrive('');
    setIsModalOpen(false);
  };

  const handleImageUpload = ({ file }) => {
    setImageUrl(file);
    setPreviewImageUrl(URL.createObjectURL(file));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

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
      <h1 style={{ color: "#053971" }}>Product Management</h1>
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
          style={{ marginBottom: 20 }}
        >
          Add Product
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredProducts}
        loading={isLoading}
        pagination={{ pageSize: 5, position: ['bottomCenter'] }}
        scroll={{ y: 400 }}
      />

      <Modal
        title={editProductId ? 'Edit Product' : 'Create Product'}
        visible={isModalOpen}
        onCancel={resetModal}
        footer={[
          <Button key="cancel" onClick={resetModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={editProductId ? handleUpdateProduct : handleCreateProduct}
          >
            {editProductId ? 'Update' : 'Create'}
          </Button>,
        ]}
      >
        <Row gutter={16}>
          <Col span={12}>
            <label className="form-label">Product Name</label>
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Col>
          <Col span={12}>
            <label className="form-label">Price</label>
            <Input
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Col>
        </Row>
        
        <Row gutter={16}>
          <label
            className="form-label"
            style={{ marginTop: '10px', marginLeft: '10px' }}
          >
            Category
          </label>
          <Select
            placeholder="Select Category"
            style={{ width: '100%', marginBottom: '10px', marginLeft: '7px' }}
            value={categoryId}
            onChange={setCategoryId}
          >
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.categoryName}
              </Select.Option>
            ))}
          </Select>
          <Col span={12}>
            <label className="form-label">Quantity</label>
            <Input
              value={quantity}
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <label className="form-label">RAM</label>
            <Input value={ram} onChange={(e) => setRam(e.target.value)} />
          </Col>
          <Col span={12}>
            <label className="form-label">CPU</label>
            <Input value={cpu} onChange={(e) => setCpu(e.target.value)} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <label className="form-label">Chip</label>
            <Input value={chip} onChange={(e) => setChip(e.target.value)} />
          </Col>
          <Col span={12}>
            <label className="form-label">Card</label>
            <Input value={card} onChange={(e) => setCard(e.target.value)} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <label className="form-label">Hard Drive</label>
            <Input
              value={hardDrive}
              onChange={(e) => setHardDrive(e.target.value)}
            />
          </Col>
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
            <Button icon={<UploadOutlined />} style={{ marginTop: 20 }}>
              Select Image
            </Button>
          </Upload>
        </Row>
        <label className="form-label">Description</label>
        <Input.TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Modal>
    </div>
  );
}
