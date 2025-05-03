import React from "react";
import { Table } from "antd";

// Sample Data
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

// Responsive columns configuration
const getColumns = (screenWidth) => {
  const baseColumns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      align: "center",
    },
    {
      title: "Retailer Name",
      dataIndex: "retailerName",
      key: "retailerName",
      align: "center",
      responsive: ["md"],
    },
    {
      title: "Sales Name",
      dataIndex: "salesName",
      key: "salesName",
      align: "center",
      responsive: ["lg"],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full ${
            status === "Completed"
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  return baseColumns;
};

const OrderTable = () => {
  const columns = getColumns();

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between mb-2 md:mb-4 items-start sm:items-center gap-2 sm:gap-0">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
          Last Sells Products
        </h1>
      </div>
      {/* Table container with horizontal scroll on small screens */}
      <div className="overflow-x-auto bg-gradient-to-r from-primary to-secondary p-2 sm:p-4 md:p-6 rounded-lg">
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered={false}
          pagination={false}
          size="small"
          scroll={{ x: "max-content" }}
          className="responsive-table"
        />
      </div>
    </div>
  );
};

export default OrderTable;
