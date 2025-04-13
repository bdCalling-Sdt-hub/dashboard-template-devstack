import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Input, List, message, Select } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import FeaturedInput from "../../components/common/PackageFeatureInput";
import GradientButton from "../../components/common/GradiantButton";

const PackagesPlans = () => {
  // Default packages data
  const defaultPackages = [
    {
      id: 1,
      title: "Basic Plan",
      description:
        "Perfect for startups and small businesses looking to establish their online presence.",
      price: 29.99,
      duration: "1 month",
      features: [
        "5 User Accounts",
        "Basic Analytics",
        "24/7 Support",
        "10GB Storage",
        "Email Integration",
      ],
      popular: false,
    },
    {
      id: 2,
      title: "Professional Plan",
      description:
        "Ideal for growing businesses with advanced features and expanded capabilities.",
      price: 89.99,
      duration: "6 months",
      features: [
        "25 User Accounts",
        "Advanced Analytics",
        "24/7 Priority Support",
        "50GB Storage",
        "Email & CRM Integration",
        "API Access",
      ],
      popular: true,
    },
    {
      id: 3,
      title: "Enterprise Plan",
      description:
        "Comprehensive solution for large organizations with extensive needs and premium support.",
      price: 199.99,
      duration: "1 year",
      features: [
        "Unlimited User Accounts",
        "Enterprise Analytics",
        "Dedicated Account Manager",
        "Unlimited Storage",
        "Complete System Integration",
        "Custom API Development",
      ],
      popular: false,
    },
  ];

  // Local state for packages
  const [packages, setPackages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [form] = Form.useForm();

  // Load default packages on component mount
  useEffect(() => {
    setPackages(defaultPackages);
  }, []);

  // Show modal for adding or editing package
  const showModal = (pkg = null) => {
    setIsEditing(!!pkg);
    setCurrentPackage(pkg);
    setIsModalOpen(true);

    if (pkg) {
      form.setFieldsValue({
        title: pkg.title,
        description: pkg.description,
        price: Number(pkg.price),
        duration: pkg.duration,
        features: pkg.features || [],
        popular: pkg.popular || false,
      });
    } else {
      form.resetFields();
    }
  };

  // Close the modal
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // Handle delete confirmation
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this package!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#023F86",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setPackages(packages.filter((pkg) => pkg.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "The package has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Handle form submission (Add/Update package)
  const handleSubmit = (values) => {
    const formattedData = {
      id: isEditing ? currentPackage.id : Date.now(), // Use timestamp for new package ID
      title: values.title,
      description: values.description,
      price: Number(values.price),
      duration: values.duration,
      features: values.features.filter((f) => f.trim() !== ""),
      popular: values.popular || false,
    };

    if (isEditing) {
      // Update package
      setPackages(
        packages.map((pkg) =>
          pkg.id === currentPackage.id ? formattedData : pkg
        )
      );
      message.success("Package updated successfully");
    } else {
      // Add new package
      setPackages([...packages, formattedData]);
      message.success("Package added successfully");
    }

    setIsModalOpen(false);
    form.resetFields();
  };

  // Get card background color based on package popularity
  const getCardStyle = (pkg) => {
    if (pkg.popular) {
      return "shadow-xl rounded-xl  bg-gradient-to-b from-blue-50 to-white hover:shadow-2xl transition-all transform hover:-translate-y-1";
    }
    return "shadow-lg rounded-xl border border-gray-200 bg-white hover:shadow-xl transition-all transform hover:-translate-y-1";
  };

  return (
    <div className="py-6 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Package Plans</h2>
        <GradientButton
          type="primary"
          icon={<PlusOutlined />}
          className=" text-white px-5 py-2 h-auto rounded-lg shadow-lg hover:bg-[#012F60] transition-all flex items-center"
          onClick={() => showModal()}
        >
          Add Package
        </GradientButton>
      </div>

      {packages.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No packages available.</p>
          <p>Click the "Add Package" button to create your first package.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              title={null}
              bordered={false}
              className={getCardStyle(pkg)}
              extra={null}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold text-gray-800">
                  {pkg.title}
                </h3>
                <div className="flex gap-2">
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => showModal(pkg)}
                    className="text-blue-600 border-blue-300 hover:text-blue-800 hover:border-blue-500"
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(pkg.id)}
                    className="text-red-600 border-red-300 hover:text-red-800 hover:border-red-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <span className="text-primary font-bold text-4xl">
                  ${pkg.price}
                </span>
                <span className="text-gray-500 ml-2">/ {pkg.duration}</span>
              </div>

              <p className="text-gray-600 mb-6">{pkg.description}</p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Features Include:
                </h4>
                <List
                  size="small"
                  dataSource={pkg.features}
                  renderItem={(feature) => (
                    <List.Item className="text-gray-700 border-none py-1">
                      <div className="flex items-start">
                        <CheckCircleFilled className="text-green-500 mr-2 mt-1" />
                        <span>{feature}</span>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        title={isEditing ? "Edit Package" : "Add Package"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="rounded-lg"
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Package Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="e.g. Basic Plan" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Short description of what this package offers"
            />
          </Form.Item>

          <div className="flex gap-4">
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Price is required" }]}
              className="w-1/2"
            >
              <Input type="number" prefix="$" placeholder="29.99" />
            </Form.Item>
            <Form.Item
              name="duration"
              label="Duration"
              rules={[{ required: true, message: "Duration is required" }]}
              className="w-1/2"
            >
              <Select placeholder="Select duration">
                <Select.Option value="1 month">1 Month</Select.Option>
                <Select.Option value="3 months">3 Months</Select.Option>
                <Select.Option value="6 months">6 Months</Select.Option>
                <Select.Option value="1 year">1 Year</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="features"
            label="Features (one per line)"
            rules={[
              { required: true, message: "At least one feature is required" },
            ]}
          >
            <FeaturedInput />
          </Form.Item>

          {/* <Form.Item name="popular" valuePropName="checked" className="mb-6">
            <div className="flex items-center">
              <span className="mr-2">Mark as Popular:</span>
              <Select defaultValue={false} style={{ width: 120 }}>
                <Select.Option value={false}>No</Select.Option>
                <Select.Option value={true}>Yes</Select.Option>
              </Select>
              <span className="ml-2 text-gray-500 text-sm">
                (Displays a special ribbon)
              </span>
            </div>
          </Form.Item> */}

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={handleCancel} size="large">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-primary text-white rounded-lg hover:bg-[#012F60] transition-all h-auto py-2 px-6"
              size="large"
            >
              {isEditing ? "Update Package" : "Add Package"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PackagesPlans;
