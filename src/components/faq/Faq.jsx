import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Table,
  Space,
  Popconfirm,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import GradientButton from "../common/GradiantButton";

const FAQSection = () => {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      id: 2,
      question: "What is a component?",
      answer: "A component is a building block of React applications.",
    },
    {
      id: 3,
      question: "What is JSX?",
      answer:
        "JSX is a syntax extension for JavaScript that looks similar to HTML.",
    },
  ]);
  const [visible, setVisible] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null); // Holds the FAQ being edited or null for "Add" mode
  const [form] = Form.useForm();

  // Open modal to add a new FAQ
  const handleAddFAQ = () => {
    setEditingFAQ(null); // Clear any editing data
    form.resetFields();
    setVisible(true);
  };

  // Open modal to edit an existing FAQ
  const handleEditFAQ = (faq) => {
    setEditingFAQ(faq); // Set the FAQ to be edited
    form.setFieldsValue({
      question: faq.question,
      answer: faq.answer,
    });
    setVisible(true);
  };

  // Handle deleting a FAQ
  const handleDeleteFAQ = (id) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
    message.success("FAQ deleted successfully");
  };

  // Handle form submission for adding or editing a FAQ
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingFAQ) {
        // Edit FAQ
        setFaqs(
          faqs.map((faq) =>
            faq.id === editingFAQ.id
              ? { ...faq, question: values.question, answer: values.answer }
              : faq
          )
        );
        message.success("FAQ updated successfully");
      } else {
        // Add new FAQ
        const newFAQ = {
          id: Date.now(), // Unique ID using timestamp
          question: values.question,
          answer: values.answer,
        };
        setFaqs([...faqs, newFAQ]);
        message.success("FAQ added successfully");
      }
      setVisible(false); // Close modal after submit
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  // Columns for the FAQ table
  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <GradientButton
            icon={<EditOutlined />}
            onClick={() => handleEditFAQ(record)}
          >
            Edit
          </GradientButton>
          <Popconfirm
            title="Are you sure you want to delete this FAQ?"
            onConfirm={() => handleDeleteFAQ(record.id)}
            okText="Yes"
            cancelText="No"
            className=" "
          >
            <Button
              icon={<DeleteOutlined />}
            //   danger
              className="bg-red-500 text-white h-10"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2>FAQ Section</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddFAQ}>
          Add FAQ
        </Button>
      </div>

      {/* FAQ Table */}
      <Table
        columns={columns}
        dataSource={faqs}
        rowKey="id"
        pagination={false}
      />

      {/* Add/Edit FAQ Modal */}
      <Modal
        title={editingFAQ ? "Edit FAQ" : "Add New FAQ"}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleSubmit}
        okText={editingFAQ ? "Update" : "Add FAQ"}
      >
        <Form
          form={form}
          layout="vertical"
          name="faqForm"
          initialValues={{
            question: "",
            answer: "",
          }}
        >
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: "Please enter the question" }]}
          >
            <Input placeholder="Enter question" />
          </Form.Item>

          <Form.Item
            name="answer"
            label="Answer"
            rules={[{ required: true, message: "Please enter the answer" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter answer" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FAQSection;
