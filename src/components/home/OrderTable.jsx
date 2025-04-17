import React, { useState } from "react";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

// Sample Data with Unique Keys
const dataSource = [
  {
    key: "1",
    orderId: "#123456",
    retailerName: "Alice Johnson",
    salesName: "Alice Johnson",
    amount: "$2500",
    status: "Pending",
  },
  {
    key: "2",
    orderId: "#123457",
    retailerName: "Alice Johnson",
    salesName: "Alice Johnson",
    amount: "$2500",
    status: "Pending",
  },
  {
    key: "3",
    orderId: "#123458",
    retailerName: "Alice Johnson",
    salesName: "Alice Johnson",
    amount: "$2500",
    status: "Completed",
  },
  {
    key: "4",
    orderId: "#123459",
    retailerName: "Alice Jowel",
    salesName: "Alice Johnson",
    amount: "$2500",
    status: "Completed",
  },
  {
    key: "5",
    orderId: "#123460",
    retailerName: "John Doe",
    salesName: "Alice Johnson",
    amount: "$3200",
    status: "Pending",
  },
 
];

const columns = [
  { title: "Order ID", dataIndex: "orderId", key: "orderId", align: "center" },
  {
    title: "Retailer Name",
    dataIndex: "retailerName",
    key: "retailerName",
    align: "center",
  },
  {
    title: "Sales Name",
    dataIndex: "salesName",
    key: "salesName",
    align: "center",
  },
  { title: "Amount", dataIndex: "amount", key: "amount", align: "center" },
  { title: "Status", dataIndex: "status", key: "status", align: "center" },
];


const OrderTable = () => {

  return (
    <div>
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl font-bold text-gray-800">Last Sells Products</h1>
       
      </div>
      {/* Table Container with Gradient Background */}
      <div className="p-6 rounded-lg bg-gradient-to-r from-primary to-secondary">
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered={false}
          pagination={false}
          size="small"
          rowClassName="custom-table" 
        />
      </div>
    </div>
  );
};

export default OrderTable;
