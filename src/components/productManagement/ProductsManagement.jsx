import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProductsTable from "./ProductsTable";
import ProductFormModal from "./ProductFormModal";
import ProductDetailModal from "./ProductDetails";
import GradientButton from "../common/GradiantButton";

const dummyProducts = [
  {
  "id": 1,
  "name": "Smartphone X Pro",
  "category": "Electronics",
  "subCategory": "Mobile Phones",
  "description": "The Smartphone X Pro is a revolutionary mobile device designed to meet the needs of users who demand the very best in performance, design, and innovation. As a part of the Electronics category and specifically within the Mobile Phones subcategory, this smartphone delivers a premium experience with cutting-edge technology and state-of-the-art features.\n\nAt its core, the Smartphone X Pro is powered by a high-performance processor, ensuring that every task – from gaming to multitasking – is handled effortlessly. Whether you’re browsing the web, streaming media, or working on high-intensity applications, the device operates with smooth efficiency. Equipped with 5G connectivity, the Smartphone X Pro ensures lightning-fast download and upload speeds, allowing users to experience seamless connectivity and responsiveness.\n\nOne of the most standout features of the Smartphone X Pro is its advanced camera system. The smartphone boasts a high-resolution main camera with multi-lens capabilities, including ultra-wide and telephoto lenses that offer exceptional versatility in capturing all types of images. Whether you're capturing expansive landscapes, close-up details, or vibrant portraits, the camera provides stunning clarity and detail. Additionally, the front-facing camera is perfect for selfies and video calls, making sure you always look your best.\n\nThe OLED display brings vibrant, true-to-life colors and deep contrasts, delivering an immersive viewing experience whether you’re watching videos, playing games, or browsing through photos. With a premium build and high-quality materials, the Smartphone X Pro feels luxurious in hand while remaining durable for daily use.\n\nThe long-lasting battery ensures that you can stay productive and entertained throughout the day. And with fast-charging capabilities, you won’t be waiting long to get back to full power. Whether for work, play, or content creation, the Smartphone X Pro is the perfect choice for those who demand the best.",
  "price": 45000,
  "quantity": 25,
  "quality": "Premium",
  "images": [
    "https://picsum.photos/id/1/800/800",
    "https://picsum.photos/id/20/800/800",
    "https://picsum.photos/id/1/800/800",
    "https://picsum.photos/id/20/800/800"
  ],
  "createdAt": "2023-06-15T08:30:00Z",
  "updatedAt": "2023-12-10T14:45:00Z"
},

  {
    id: 2,
    name: "Leather Jacket",
    category: "Clothing",
    subCategory: "Outerwear",
    description: "Genuine leather jacket for men",
    price: 7500,
    quantity: 12,
    quality: "Premium",
    images: ["https://picsum.photos/id/7/800/800"],
    createdAt: "2023-07-20T10:15:00Z",
    updatedAt: "2023-07-20T10:15:00Z",
  },
  {
    id: 3,
    name: "Coffee Table",
    category: "Furniture",
    subCategory: "Living Room",
    description: "Modern coffee table with glass top",
    price: 3200,
    quantity: 8,
    quality: "Standard",
    images: ["https://picsum.photos/id/30/800/800"],
    createdAt: "2023-08-05T15:20:00Z",
    updatedAt: "2023-11-12T09:30:00Z",
  },
  {
    id: 4,
    name: "Gaming Laptop",
    category: "Electronics",
    subCategory: "Laptops",
    description: "High-performance gaming laptop with RGB keyboard",
    price: 82000,
    quantity: 5,
    quality: "Premium",
    images: ["https://picsum.photos/id/60/800/800"],
    createdAt: "2023-09-18T13:40:00Z",
    updatedAt: "2023-09-18T13:40:00Z",
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    category: "Electronics",
    subCategory: "Audio",
    description: "True wireless earbuds with noise cancellation",
    price: 3800,
    quantity: 30,
    quality: "Standard",
    images: ["https://picsum.photos/id/9/800/800"],
    createdAt: "2023-10-22T17:10:00Z",
    updatedAt: "2023-10-22T17:10:00Z",
  },
  {
    id: 6,
    name: "Cotton T-shirt",
    category: "Clothing",
    subCategory: "Casual Wear",
    description: "Comfortable cotton t-shirt for daily wear",
    price: 650,
    quantity: 100,
    quality: "Standard",
    images: ["https://picsum.photos/id/11/800/800"],
    createdAt: "2023-11-05T09:25:00Z",
    updatedAt: "2023-11-05T09:25:00Z",
  },
  {
    id: 7,
    name: "Dining Table Set",
    category: "Furniture",
    subCategory: "Dining Room",
    description: "6-seater dining table set with chairs",
    price: 15500,
    quantity: 4,
    quality: "Premium",
    images: ["https://picsum.photos/id/42/800/800"],
    createdAt: "2023-12-01T11:50:00Z",
    updatedAt: "2023-12-01T11:50:00Z",
  },
  {
    id: 13,
    name: "Dining Table Set",
    category: "Furniture",
    subCategory: "Dining Room",
    description: "6-seater dining table set with chairs",
    price: 15500,
    quantity: 24,
    quality: "Premium",
    images: ["https://picsum.photos/id/42/800/800"],
    createdAt: "2023-12-01T11:50:00Z",
    updatedAt: "2023-12-01T11:50:00Z",
  },
  {
    id: 12,
    name: "Dining Table Set",
    category: "Furniture",
    subCategory: "Dining Room",
    description: "6-seater dining table set with chairs",
    price: 15500,
    quantity: 4,
    quality: "Premium",
    images: ["https://picsum.photos/id/42/800/800"],
    createdAt: "2023-12-01T11:50:00Z",
    updatedAt: "2023-12-01T11:50:00Z",
  },
  {
    id: 8,
    name: "Smart Watch",
    category: "Electronics",
    subCategory: "Wearables",
    description: "Fitness tracking smartwatch with heart rate monitor",
    price: 5200,
    quantity: 15,
    quality: "Standard",
    images: ["https://picsum.photos/id/26/800/800"],
    createdAt: "2024-01-10T14:20:00Z",
    updatedAt: "2024-01-10T14:20:00Z",
  },
  {
    id: 9,
    name: "Denim Jeans",
    category: "Clothing",
    subCategory: "Bottoms",
    description: "Classic denim jeans for men",
    price: 1800,
    quantity: 35,
    quality: "Standard",
    images: ["https://picsum.photos/id/91/800/800"],
    createdAt: "2024-02-15T16:35:00Z",
    updatedAt: "2024-02-15T16:35:00Z",
  },
  {
    id: 10,
    name: "Bookshelf",
    category: "Furniture",
    subCategory: "Storage",
    description: "Wooden bookshelf with 5 shelves",
    price: 4800,
    quantity: 10,
    quality: "Economy",
    images: ["https://picsum.photos/id/68/800/800"],
    createdAt: "2024-03-20T12:15:00Z",
    updatedAt: "2024-03-20T12:15:00Z",
  },
  {
    id: 11,
    name: "Bookshelf",
    category: "Furniture",
    subCategory: "Storage",
    description: "Wooden bookshelf with 5 shelves",
    price: 4800,
    quantity: 10,
    quality: "Economy",
    images: ["https://picsum.photos/id/68/800/800"],
    createdAt: "2024-03-20T12:15:00Z",
    updatedAt: "2024-03-20T12:15:00Z",
  },
];

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Dummy data load
      setProducts(dummyProducts);
    } catch (error) {
      message.error("Failed to fetch products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentProduct(null);
    setModalVisible(true);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setModalVisible(true);
  };

  const handleDelete = async (productId) => {
    try {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      message.success("Product deleted successfully");
    } catch (error) {
      message.error("Failed to delete product");
      console.error(error);
    }
  };

  const handleViewDetails = (product) => {
    setCurrentProduct(product);
    setDetailModalVisible(true);
  };

  const handleModalSave = async (formData) => {
    try {
      if (currentProduct) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === currentProduct.id ? { ...formData, id: p.id } : p
          )
        );
        message.success("Product updated successfully");
      } else {
        const newProduct = {
          ...formData,
          id: Date.now(),
        };
        setProducts((prev) => [...prev, newProduct]);
        message.success("Product added successfully");
      }
      setModalVisible(false);
    } catch (error) {
      message.error("Failed to save product");
      console.error(error);
    }
  };

  return (
    <div className="product-management">
      <div
        className="page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h1 className="text-2xl font-bold">Products Management</h1>
        <GradientButton
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddNew}
        >
          <PlusOutlined />
          Add New Product
        </GradientButton>
      </div>

      <ProductsTable
        products={products}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewDetails={handleViewDetails}
      />

      <ProductFormModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSave={handleModalSave}
        product={currentProduct}
      />

      <ProductDetailModal
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        product={currentProduct}
      />
    </div>
  );
};

export default ProductManagement;
