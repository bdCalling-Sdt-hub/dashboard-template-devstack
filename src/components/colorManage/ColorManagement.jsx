// Ant Design Color Management System
// Uses React and Ant Design components for UI integration

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Switch,
  Space,
  Tooltip,
  message,
  Popconfirm,
  Card,
  Typography,
  Divider,
  ColorPicker,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

// ColorManagementSystem class for managing color data
class ColorManagementSystem {
  constructor(initialColors = []) {
    this.colors = initialColors;
    this.nextId =
      initialColors.length > 0
        ? Math.max(...initialColors.map((color) => color.id)) + 1
        : 1;
  }

  addColor(name, colorCode, isActive = true) {
    if (!name || !colorCode) {
      return { success: false, message: "Color name and code are required" };
    }

    const newColor = {
      id: this.nextId++,
      name: name,
      colorCode: colorCode,
      isActive: isActive,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.colors.push(newColor);
    return {
      success: true,
      message: "Color added successfully",
      color: newColor,
    };
  }

  editColor(id, updates) {
    const colorIndex = this.colors.findIndex((color) => color.id === id);

    if (colorIndex === -1) {
      return { success: false, message: "Color not found" };
    }

    const color = { ...this.colors[colorIndex] };

    if (updates.name !== undefined) {
      color.name = updates.name;
    }

    if (updates.colorCode !== undefined) {
      color.colorCode = updates.colorCode;
    }

    if (updates.isActive !== undefined) {
      color.isActive = updates.isActive;
    }

    color.updatedAt = new Date();
    this.colors[colorIndex] = color;

    return { success: true, message: "Color updated successfully", color };
  }

  deleteColor(id) {
    const colorIndex = this.colors.findIndex((color) => color.id === id);

    if (colorIndex === -1) {
      return { success: false, message: "Color not found" };
    }

    const deletedColor = this.colors.splice(colorIndex, 1)[0];
    return {
      success: true,
      message: "Color deleted successfully",
      color: deletedColor,
    };
  }

  getAllColors() {
    return [...this.colors];
  }

  getActiveColors() {
    return this.colors.filter((color) => color.isActive);
  }

  toggleColorStatus(id) {
    const colorIndex = this.colors.findIndex((color) => color.id === id);

    if (colorIndex === -1) {
      return { success: false, message: "Color not found" };
    }

    const updatedColor = { ...this.colors[colorIndex] };
    updatedColor.isActive = !updatedColor.isActive;
    updatedColor.updatedAt = new Date();
    this.colors[colorIndex] = updatedColor;

    return {
      success: true,
      message: `Color status toggled to ${
        updatedColor.isActive ? "active" : "inactive"
      }`,
      color: updatedColor,
    };
  }

  searchColors(query) {
    if (!query) return this.getAllColors();

    query = query.toLowerCase();
    return this.colors.filter(
      (color) =>
        color.name.toLowerCase().includes(query) ||
        color.colorCode.toLowerCase().includes(query)
    );
  }
}

// React component for color management
const ColorManagement = () => {
  const [colorSystem] = useState(
    new ColorManagementSystem([
      {
        id: 1,
        name: "Primary Blue",
        colorCode: "#1890ff",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Success Green",
        colorCode: "#52c41a",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Warning Yellow",
        colorCode: "#faad14",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "Error Red",
        colorCode: "#f5222d",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "Gray",
        colorCode: "#d9d9d9",
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  );

  const [colors, setColors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [editingColor, setEditingColor] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Load colors on component mount
    refreshColors();
  }, []);

  const refreshColors = () => {
    setColors(colorSystem.getAllColors());
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setColors(colorSystem.searchColors(value));
  };

  const showAddModal = () => {
    setEditingColor(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setEditingColor(record);
    form.setFieldsValue({
      name: record.name,
      colorCode: record.colorCode,
      isActive: record.isActive,
    });
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingColor) {
          // Edit existing color
          const result = colorSystem.editColor(editingColor.id, values);
          if (result.success) {
            message.success(result.message);
            refreshColors();
            setIsModalVisible(false);
          } else {
            message.error(result.message);
          }
        } else {
          // Add new color
          const result = colorSystem.addColor(
            values.name,
            values.colorCode,
            values.isActive
          );
          if (result.success) {
            message.success(result.message);
            refreshColors();
            setIsModalVisible(false);
          } else {
            message.error(result.message);
          }
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    const result = colorSystem.deleteColor(id);
    if (result.success) {
      message.success(result.message);
      refreshColors();
    } else {
      message.error(result.message);
    }
  };

  const handleToggleStatus = (id) => {
    const result = colorSystem.toggleColorStatus(id);
    if (result.success) {
      message.success(result.message);
      refreshColors();
    } else {
      message.error(result.message);
    }
  };

  // Table columns configuration
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Color Preview",
      dataIndex: "colorCode",
      key: "preview",
      render: (colorCode) => (
        <div
          style={{
            backgroundColor: colorCode,
            width: 40,
            height: 40,
            borderRadius: 4,
            border: "1px solid #d9d9d9",
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Color Code",
      dataIndex: "colorCode",
      key: "colorCode",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={() => handleToggleStatus(record.id)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => showEditModal(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete this color?"
            description="Are you sure you want to delete this color?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Title level={2}>Color Management System</Title>
        <Divider />

        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search colors"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 200 }}
            prefix={<SearchOutlined />}
            allowClear
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
            Add Color
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={colors}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Add/Edit Color Modal */}
      <Modal
        title={editingColor ? "Edit Color" : "Add New Color"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingColor ? "Update" : "Add"}
        maskClosable={false}
      >
        <Form form={form} layout="vertical" initialValues={{ isActive: true }}>
          <Form.Item
            name="name"
            label="Color Name"
            rules={[{ required: true, message: "Please enter a color name" }]}
          >
            <Input placeholder="e.g., Primary Blue" />
          </Form.Item>

          <Form.Item
            name="colorCode"
            label="Color Code"
            rules={[{ required: true, message: "Please select a color" }]}
          >
            <ColorPicker />
          </Form.Item>

          <Form.Item name="isActive" label="Status" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ColorManagement;
