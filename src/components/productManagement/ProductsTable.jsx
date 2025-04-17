import React, { useState, useEffect } from "react";
import { Table, Input, Select, Button, Space, Tooltip, Divider } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import debounce from "lodash/debounce";

const { Option } = Select;
const { Search } = Input;

const ProductsTable = ({
  products,
  loading,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
    sortBy: "",
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categorySubMap, setCategorySubMap] = useState({});

  useEffect(() => {
    if (products.length) {
      // Create category list
      const uniqueCategories = [...new Set(products.map((p) => p.category))];
      setCategories(uniqueCategories);

      // Create mapping of category -> subcategories
      const map = {};
      products.forEach((p) => {
        if (!map[p.category]) {
          map[p.category] = new Set();
        }
        map[p.category].add(p.subCategory);
      });

      // Convert sets to arrays
      const formattedMap = {};
      for (let cat in map) {
        formattedMap[cat] = [...map[cat]];
      }
      setCategorySubMap(formattedMap);
    }

    applyFilters();
  }, [products]);

  useEffect(() => {
    // Update subCategory options whenever category changes
    if (filters.category && categorySubMap[filters.category]) {
      setSubCategories(categorySubMap[filters.category]);
    } else {
      setSubCategories([]);
    }

    applyFilters();
  }, [filters, searchText, products]);

  const generateSearchSuggestions = (value) => {
    if (!value) {
      setSearchSuggestions([]);
      return;
    }

    const inputLower = value.toLowerCase();
    const suggestions = products
      .filter((p) => p.name.toLowerCase().includes(inputLower))
      .map((p) => p.name)
      .slice(0, 5);

    setSearchSuggestions(suggestions);
  };

  const debouncedSuggestion = debounce((value) => {
    generateSearchSuggestions(value);
  }, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSuggestion(value);
  };

  const applyFilters = () => {
    let result = [...products];

    if (searchText) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.subCategory) {
      result = result.filter((p) => p.subCategory === filters.subCategory);
    }

    // Apply combined sorting based on the selected option
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price_lowToHigh":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price_highToLow":
          result.sort((a, b) => b.price - a.price);
          break;
        case "date_newest":
          result.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA;
          });
          break;
        case "date_oldest":
          result.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateA - dateB;
          });
          break;
        case "name_asc":
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name_desc":
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
    }

    setFilteredProducts(result);
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      subCategory: "",
      sortBy: "",
    });
    setSearchText("");
  };

  const columns = [
    {
      title: "Serial No.",
      key: "serial",
      render: (_, __, index) => index + 1, // Adding serial number based on the row index
      align: "center", // Center the serial number
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      align: "center", // Center the content
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center", // Center the content
    },
    {
      title: "Sub Category",
      dataIndex: "subCategory",
      key: "subCategory",
      align: "center", // Center the content
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center", // Center the content
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center", // Center the content
      render: (quantity) => (
        <span>
          {quantity}
          {quantity <= 5 && (
            <span style={{  marginLeft: 4 }}>Low Quantity</span>
          )}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center", // Center the content
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              onClick={() => onViewDetails(record)}
              type="default"
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              type="primary"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record.id)}
              type="danger"
              className="bg-red-500 text-white"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Function to apply the red row style if quantity is 10 or less
  const rowClassName = (record) => {
    return record.quantity <= 5 ? "red-row" : "";
  };

  return (
    <div className="product-table">
      <div className="filters-section">
        <div className="filter-controls mb-6">
          <Space wrap>
            <Input
              placeholder="Search products by name"
              value={searchText}
              onChange={handleInputChange}
              style={{ width: 300, height: 40 }}
            />

            <Select
              placeholder="Category"
              style={{ width: 200, height: 40 }}
              value={filters.category || undefined}
              onChange={(value) =>
                setFilters({
                  ...filters,
                  category: value,
                  subCategory: "",
                })
              }
              allowClear
            >
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>

            <Select
              placeholder="Sub Category"
              style={{ width: 200, height: 40 }}
              value={filters.subCategory || undefined}
              onChange={(value) =>
                setFilters({ ...filters, subCategory: value })
              }
              disabled={!filters.category} // disable if category is not selected
              allowClear
            >
              {subCategories.map((subCategory) => (
                <Option key={subCategory} value={subCategory}>
                  {subCategory}
                </Option>
              ))}
            </Select>

            <Select
              placeholder="Sort By"
              style={{ width: 200, height: 40 }}
              value={filters.sortBy || undefined}
              onChange={(value) => setFilters({ ...filters, sortBy: value })}
              allowClear
            >
              <Option value="price_lowToHigh">Price: Low to High</Option>
              <Option value="price_highToLow">Price: High to Low</Option>
              <Option value="date_newest">Date: Newest First</Option>
              <Option value="date_oldest">Date: Oldest First</Option>
              <Option value="name_asc">Name: A to Z</Option>
              <Option value="name_desc">Name: Z to A</Option>
            </Select>

            <Button onClick={resetFilters} style={{ width: 200, height: 40 }}>
              Reset Filters
            </Button>
          </Space>
        </div>
      </div>

      <div className="px-6 pt-6 rounded-lg bg-gradient-to-r from-primary to-secondary">
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 12 }}
          size="small"
          rowClassName={rowClassName} // Apply the row style
        />
      </div>
    </div>
  );
};

export default ProductsTable;
