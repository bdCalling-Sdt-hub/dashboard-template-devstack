import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  message,
  Row,
  Col,
  Typography,
  Table,
  Space,
  Card,
  Divider,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  LoadingOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

// Dummy categories and subcategories data
const dummyCategories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Furniture" },
  { id: 4, name: "Books" },
  { id: 5, name: "Home Appliances" },
];

const dummySubCategories = [
  { id: 1, name: "Mobile Phones", parentCategory: "Electronics" },
  { id: 2, name: "Laptops", parentCategory: "Electronics" },
  { id: 3, name: "Audio", parentCategory: "Electronics" },
  { id: 4, name: "Wearables", parentCategory: "Electronics" },
  { id: 5, name: "Casual Wear", parentCategory: "Clothing" },
  { id: 6, name: "Outerwear", parentCategory: "Clothing" },
  { id: 7, name: "Bottoms", parentCategory: "Clothing" },
  { id: 8, name: "Footwear", parentCategory: "Clothing" },
  { id: 9, name: "Living Room", parentCategory: "Furniture" },
  { id: 10, name: "Bedroom", parentCategory: "Furniture" },
  { id: 11, name: "Dining Room", parentCategory: "Furniture" },
  { id: 12, name: "Storage", parentCategory: "Furniture" },
  { id: 13, name: "Fiction", parentCategory: "Books" },
  { id: 14, name: "Non-fiction", parentCategory: "Books" },
  { id: 15, name: "Kitchen", parentCategory: "Home Appliances" },
  { id: 16, name: "Cleaning", parentCategory: "Home Appliances" },
];

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// Available sizes
const sizeOptions = ["S", "M", "L", "XL", "XXL"];

// Common colors with hex values
const colorOptions = [
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#000000" },
  { name: "Primary", value: "#6200EE" },
  { name: "Red", value: "#ff0000" },
  { name: "Green", value: "#00ff00" },
  { name: "Blue", value: "#0000ff" },
  { name: "Yellow", value: "#ffff00" },
  { name: "Purple", value: "#800080" },
  { name: "Gray", value: "#808080" },
  { name: "Brown", value: "#a52a2a" },
];

const ProductFormModal = ({ visible, onCancel, onSave, product }) => {
  const [form] = Form.useForm();
  const [variantForm] = Form.useForm();
  const [variants, setVariants] = useState([]);
  const [editingVariant, setEditingVariant] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [variantFileList, setVariantFileList] = useState([]);

  useEffect(() => {
    if (visible) {
      // If product exists, we're in edit mode
      if (product) {
        form.setFieldsValue({
          name: product.name,
          category: product.category,
          subCategory: product.subCategory,
          quality: product.quality,
        });

        setSelectedCategory(product.category);

        // Set variants if they exist
        if (product.variants && product.variants.length) {
          setVariants(product.variants);
        } else {
          // No variants - create default from main product data
          if (product.price !== undefined && product.quantity !== undefined) {
            setVariants([
              {
                id: Date.now(),
                size: "M",
                color: "#000000",
                colorName: "Black",
                price: product.price,
                quantity: product.quantity,
                images: product.images || [],
              },
            ]);
          } else {
            setVariants([]);
          }
        }
      } else {
        // Reset form for add mode
        form.resetFields();
        setVariants([]);
        setSelectedCategory("");
      }
    }
  }, [visible, product, form]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    form.setFieldsValue({ subCategory: undefined });
  };

  const filteredSubCategories = dummySubCategories.filter(
    (subCat) => subCat.parentCategory === selectedCategory
  );

  const handleUploadChange = ({ fileList: newFileList }) => {
    setVariantFileList(newFileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => {
    setPreviewOpen(false);
  };

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleAddVariant = async () => {
    try {
      const values = await variantForm.validateFields();

      // Process images
      const images = variantFileList
        .map((file) => {
          if (file.originFileObj) {
            // For demo, we'll just use a placeholder URL
            return `https://picsum.photos/id/${Math.floor(
              Math.random() * 100
            )}/800/800`;
          } else if (file.url) {
            return file.url;
          }
          return null;
        })
        .filter(Boolean);

      // Find the selected color name
      const selectedColor = colorOptions.find(
        (color) => color.value === values.color
      );
      const colorName = selectedColor ? selectedColor.name : "Custom";

      const newVariant = {
        id: editingVariant ? editingVariant.id : Date.now(),
        size: values.size,
        color: values.color,
        colorName: colorName,
        price: values.price,
        quantity: values.quantity,
        images: images,
      };

      if (editingVariant) {
        // Update existing variant
        setVariants(
          variants.map((v) => (v.id === editingVariant.id ? newVariant : v))
        );
      } else {
        // Add new variant
        setVariants([...variants, newVariant]);
      }

      // Reset form and state
      variantForm.resetFields();
      setVariantFileList([]);
      setEditingVariant(null);

      message.success(
        `Variant ${editingVariant ? "updated" : "added"} successfully`
      );
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleEditVariant = (variant) => {
    setEditingVariant(variant);

    // Set form values
    variantForm.setFieldsValue({
      size: variant.size,
      color: variant.color,
      price: variant.price,
      quantity: variant.quantity,
    });

    // Set file list from images
    if (variant.images && variant.images.length) {
      const files = variant.images.map((img, index) => ({
        uid: `-${index}`,
        name: `image-${index}`,
        status: "done",
        url: img,
      }));
      setVariantFileList(files);
    } else {
      setVariantFileList([]);
    }
  };

  const handleDeleteVariant = (variantId) => {
    setVariants(variants.filter((v) => v.id !== variantId));
    message.success("Variant deleted successfully");
  };

  const resetVariantForm = () => {
    variantForm.resetFields();
    setVariantFileList([]);
    setEditingVariant(null);
  };

  const columns = [
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      align: "center",
    },
    {
      title: "Color",
      key: "color",
      align: "center",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              backgroundColor: record.color,
              border: "1px solid #d9d9d9",
              marginRight: 8,
              borderRadius: 4,
            }}
          />
          {record.colorName}
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Images",
      key: "images",
      align: "center",
      render: (_, record) => (
        <span>{record.images ? record.images.length : 0} images</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditVariant(record)}
            type="primary"
            size="small"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteVariant(record.id)}
            type="primary"
            danger
            size="small"
          />
        </Space>
      ),
    },
  ];

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (variants.length === 0) {
        message.error("Please add at least one variant");
        return;
      }

      // Combine basic product info with variants
      const productData = {
        ...values,
        variants: variants,
        // Use first variant's data for legacy fields
        price: variants[0].price,
        quantity: variants[0].quantity,
        images: variants[0].images,
        description: "",
        faq: [],
        hasFaq: false,
        hasDescription: false,
      };

      onSave(productData);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <>
      <Modal
        title={product ? "Edit Product" : "Add New Product"}
        open={visible}
        onCancel={onCancel}
        onOk={handleSubmit}
        width={1000}
        okText={product ? "Update Product" : "Add Product"}
        confirmLoading={uploading}
        style={{ top: 20 }} // Optional: Adjust the modal's position
      >
        <div style={{ maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}>
          <Form form={form} layout="vertical" name="productForm">
            <Card title="Basic Product Information" className="mb-4">
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    name="name"
                    label="Product Name"
                    rules={[
                      { required: true, message: "Please enter product name" },
                    ]}
                  >
                    <Input
                      placeholder="Enter product name"
                      style={{ height: 40 }}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                      { required: true, message: "Please select a category" },
                    ]}
                  >
                    <Select
                      placeholder="Select category"
                      onChange={handleCategoryChange}
                      style={{ height: 40 }}
                    >
                      {dummyCategories.map((cat) => (
                        <Option key={cat.id} value={cat.name}>
                          {cat.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="subCategory"
                    label="Sub Category"
                    rules={[
                      {
                        required: true,
                        message: "Please select a sub category",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select sub category"
                      disabled={!selectedCategory}
                      style={{ height: 40 }}
                    >
                      {filteredSubCategories.map((subCat) => (
                        <Option key={subCat.id} value={subCat.name}>
                          {subCat.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="quality"
                    label="Quality"
                    rules={[
                      { required: true, message: "Please select quality" },
                    ]}
                  >
                    <Select placeholder="Select quality" style={{ height: 40 }}>
                      <Option value="Premium">Premium</Option>
                      <Option value="Standard">Standard</Option>
                      <Option value="Economy">Economy</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="Product Variants" className="mb-4">
              <Table
                dataSource={variants}
                columns={columns}
                rowKey="id"
                pagination={false}
                size="small"
                bordered
              />
              <Form form={variantForm} layout="vertical" name="variantForm">
                <Row gutter={16}>
                  <Col span={6}>
                    <Form.Item
                      name="size"
                      label="Size"
                      rules={[
                        { required: true, message: "Please select size" },
                      ]}
                    >
                      <Select placeholder="Select size" style={{ height: 40 }}>
                        {sizeOptions.map((size) => (
                          <Option key={size} value={size}>
                            {size}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name="color"
                      label="Color"
                      rules={[
                        { required: true, message: "Please select color" },
                      ]}
                    >
                      <Select placeholder="Select color" style={{ height: 40 }}>
                        {colorOptions.map((color) => (
                          <Option key={color.value} value={color.value}>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div
                                style={{
                                  width: 16,
                                  height: 16,
                                  backgroundColor: color.value,
                                  border: "1px solid #d9d9d9",
                                  marginRight: 8,
                                  borderRadius: 2,
                                }}
                              />
                              {color.name}
                            </div>
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name="price"
                      label="Price"
                      rules={[
                        { required: true, message: "Please enter price" },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        placeholder="Enter price"
                        style={{ width: "100%", height: 40 }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name="quantity"
                      label="Quantity"
                      rules={[
                        { required: true, message: "Please enter quantity" },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        placeholder="Enter quantity"
                        style={{ width: "100%", height: 40 }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Variant Images">
                  <Upload
                    listType="picture-card"
                    fileList={variantFileList}
                    onPreview={handlePreview}
                    onChange={handleUploadChange}
                    beforeUpload={() => false} // Prevent auto upload
                    multiple
                  >
                    {variantFileList.length >= 8 ? null : uploadButton}
                  </Upload>
                </Form.Item>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 8,
                  }}
                >
                  {editingVariant && (
                    <Button onClick={resetVariantForm}>Cancel</Button>
                  )}
                  <Button type="primary" onClick={handleAddVariant}>
                    {editingVariant ? "Update Variant" : "Add Variant"}
                  </Button>
                </div>
              </Form>

              <Divider />
            </Card>
          </Form>
        </div>
      </Modal>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ProductFormModal;
