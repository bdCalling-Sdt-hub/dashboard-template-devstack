import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  Typography,
  Breadcrumb,
  Card,
  message, // Added the message import
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import SubCategoryManagement from "./SubCategoryManagement";
// import SubCategoryManagement from "./SubCategoryManagement";

const { Title } = Typography;

const CategoryManagement = () => {
  // State for categories
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSubCategories, setShowSubCategories] = useState(false);

  // Load initial data (mock data for demonstration)
  useEffect(() => {
    // In a real application, this would be an API call
    const mockCategories = [
      { id: 1, name: "Electronics", description: "Electronic devices" },
      { id: 2, name: "Clothing", description: "Fashion items" },
      { id: 3, name: "Books", description: "Reading materials" },
    ];

    setCategories(mockCategories);
  }, []);

  // Add or update a category
  const handleCategorySave = (values) => {
    if (editingId !== null) {
      // Edit existing category
      setCategories(
        categories.map((category) =>
          category.id === editingId ? { ...category, ...values } : category
        )
      );
      message.success("Category updated successfully");
    } else {
      // Add new category
      const newCategory = {
        id: Math.max(0, ...categories.map((c) => c.id)) + 1,
        ...values,
      };
      setCategories([...categories, newCategory]);
      message.success("Category added successfully");
    }
    resetModal();
  };

  // Delete a category
  const handleCategoryDelete = (id) => {
    // Delete the category
    setCategories(categories.filter((category) => category.id !== id));
    message.success("Category deleted successfully");
  };

  // Open modal for adding/editing
  const showModal = (id = null) => {
    setEditingId(id);

    // If editing, populate the form
    if (id !== null) {
      const category = categories.find((c) => c.id === id);
      form.setFieldsValue(category);
    } else {
      form.resetFields();
    }

    setModalVisible(true);
  };

  // Reset modal state
  const resetModal = () => {
    setModalVisible(false);
    setEditingId(null);
    form.resetFields();
  };

  // View subcategories for a specific category
  const viewSubCategories = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowSubCategories(true);
  };

  // Go back to categories list
  const backToCategories = () => {
    setShowSubCategories(false);
    setSelectedCategory(null);
  };

  // Category columns for table
  const categoryColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showModal(record.id)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this category?"
            description="All subcategories will also be deleted."
            onConfirm={() => handleCategoryDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
          <Button
            type="default"
            icon={<EyeOutlined />}
            onClick={() => viewSubCategories(record.id)}
          >
            View Subcategories
          </Button>
        </Space>
      ),
    },
  ];

  if (showSubCategories && selectedCategory) {
    const category = categories.find((c) => c.id === selectedCategory);

    return (
      <SubCategoryManagement
        categoryId={selectedCategory}
        categoryName={category ? category.name : ""}
        onBack={backToCategories}
      />
    );
  }

  return (
    <div className="p-6">
      {/* <Breadcrumb className="mb-4">
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Category Management</Breadcrumb.Item>
      </Breadcrumb> */}

      <Card>
        <div className="flex justify-between items-center mb-4">
          <Title level={4}>Category List</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            Add Category
          </Button>
        </div>
        <Table
          columns={categoryColumns}
          dataSource={categories.map((item) => ({ ...item, key: item.id }))}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Modal for add/edit category */}
      <Modal
        title={`${editingId !== null ? "Edit" : "Add"} Category`}
        open={modalVisible}
        onCancel={resetModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCategorySave}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>
          <Form.Item className="text-right">
            <Space>
              <Button onClick={resetModal}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingId !== null ? "Update" : "Save"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManagement;
