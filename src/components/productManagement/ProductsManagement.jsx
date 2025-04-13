import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProductsTable from "./ProductsTable";
import ProductFormModal from "./ProductFormModal";
import ProductDetailModal from "./ProductDetails";

const dummyProducts = [
  {
    id: 1,
    name: "Smartphone X Pro",
    category: "Electronics",
    subCategory: "Mobile Phones",
    description: "High-end smartphone with advanced camera features",
    price: 45000,
    quantity: 25,
    quality: "Premium",
    images: [
      "https://picsum.photos/id/1/800/800",
      "https://picsum.photos/id/20/800/800",
      "https://picsum.photos/id/1/800/800",
      "https://picsum.photos/id/20/800/800",
    ],
    createdAt: "2023-06-15T08:30:00Z",
    updatedAt: "2023-12-10T14:45:00Z",
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
    quantity: 4,
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
        <h1>Products Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
          Add New Product
        </Button>
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
