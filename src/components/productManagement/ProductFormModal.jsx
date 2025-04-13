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
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

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

const ProductFormModal = ({ visible, onCancel, onSave, product }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    if (visible) {
      // If product exists, we're in edit mode
      if (product) {
        form.setFieldsValue({
          name: product.name,
          category: product.category,
          subCategory: product.subCategory,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          quality: product.quality,
        });

        setSelectedCategory(product.category);

        // Convert existing images to fileList format
        if (product.images && product.images.length) {
          const images = product.images.map((img, index) => ({
            uid: `-${index}`,
            name: `image-${index}`,
            status: "done",
            url: img,
          }));
          setFileList(images);
        } else {
          setFileList([]);
        }
      } else {
        // Reset form for add mode
        form.resetFields();
        setFileList([]);
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
    setFileList(newFileList);
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

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Prepare images data for submission
      const images = fileList
        .map((file) => {
          if (file.originFileObj) {
            // For demo, we'll just use a placeholder URL
            return `https://picsum.photos/id/${Math.floor(
              Math.random() * 100
            )}/800/800`;
          } else if (file.url) {
            // This is an existing image
            return file.url;
          }
          return null;
        })
        .filter(Boolean);

      onSave({ ...values, images });
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
        width={800}
        okText={product ? "Update" : "Add"}
        confirmLoading={uploading}
      >
        <Form form={form} layout="vertical" name="productForm">
          <Row gutter={16}>
            <Col span={12}>
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
            <Col span={12}>
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
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="subCategory"
                label="Sub Category"
                rules={[
                  { required: true, message: "Please select a sub category" },
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
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  { required: true, message: "Please enter product price" },
                ]}
              >
                <InputNumber
                  min={0}
                  placeholder="Enter price"
                  style={{ width: "100%", height: 40 }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[{ required: true, message: "Please enter quantity" }]}
              >
                <InputNumber
                  min={0}
                  placeholder="Enter quantity"
                  style={{ width: "100%", height: 40 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="quality"
                label="Quality"
                rules={[{ required: true, message: "Please enter quality" }]}
              >
                <Select placeholder="Select quality" style={{ height: 40 }}>
                  <Option value="Premium">Premium</Option>
                  <Option value="Standard">Standard</Option>
                  <Option value="Economy">Economy</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter product description" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Enter product description"
              style={{ height: 40 }}
            />
          </Form.Item>

          <Form.Item label="Product Images" required>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleUploadChange}
              beforeUpload={() => false} // Prevent auto upload
              multiple
            >
              {uploadButton}
            </Upload>
            <div className="ant-form-item-explain">
              Upload as many product images as needed.
            </div>
          </Form.Item>
        </Form>
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
