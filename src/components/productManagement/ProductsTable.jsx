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
    priceSort: "",
    dateSort: "",
    nameSort: "",
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

    if (filters.priceSort) {
      result.sort((a, b) =>
        filters.priceSort === "lowToHigh"
          ? a.price - b.price
          : b.price - a.price
      );
    }

    if (filters.dateSort) {
      result.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return filters.dateSort === "newest" ? dateB - dateA : dateA - dateB;
      });
    }

    if (filters.nameSort) {
      result.sort((a, b) =>
        filters.nameSort === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }

    setFilteredProducts(result);
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      subCategory: "",
      priceSort: "",
      dateSort: "",
      nameSort: "",
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



  return (
    <div className="product-table">
      <div className="filters-section">
        <Divider />

        <div className="filter-controls mb-6">
          <Space wrap>
            <Search
              placeholder="Search products by name"
              value={searchText}
              onChange={handleInputChange}
              style={{ width: 300 }}
            />

            <Select
              placeholder="Category"
              style={{ width: 200 }}
              value={filters.category || undefined}
              onChange={(value) =>
                setFilters({
                  ...filters,
                  category: value,
                  subCategory: "", // reset subcategory when category changes
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
              style={{ width: 200 }}
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
              placeholder="Price"
              style={{ width: 200 }}
              value={filters.priceSort || undefined}
              onChange={(value) => setFilters({ ...filters, priceSort: value })}
              allowClear
            >
              <Option value="lowToHigh">Price: Low to High</Option>
              <Option value="highToLow">Price: High to Low</Option>
            </Select>

            <Select
              placeholder="Date"
              style={{ width: 200 }}
              value={filters.dateSort || undefined}
              onChange={(value) => setFilters({ ...filters, dateSort: value })}
              allowClear
            >
              <Option value="newest">Newest First</Option>
              <Option value="oldest">Oldest First</Option>
            </Select>

            <Select
              placeholder="Name"
              style={{ width: 200 }}
              value={filters.nameSort || undefined}
              onChange={(value) => setFilters({ ...filters, nameSort: value })}
              allowClear
            >
              <Option value="asc">Name: A to Z</Option>
              <Option value="desc">Name: Z to A</Option>
            </Select>

            <Button onClick={resetFilters} style={{ width: 140 }}>
              Reset Filters
            </Button>
          </Space>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 12 }}
        size="small"
      />
    </div>
  );
};

export default ProductsTable;
