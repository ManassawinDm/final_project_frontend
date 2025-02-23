"use client"

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import Loading from "@/app/loading";

interface DataTypeRespose {
  key: React.Key;
  description: string;
  usersAll: number;
  usersRequest: number;
  usersRemaining: number;
  combinedField: string;

}

interface DataType {
  key: React.Key;
  description: string;
  usersAll: number;
  usersRequest: number;
  usersRemaining: number;
  combinedField: string;

}

const Tables = () => {
  const [request, setRequest] = useState<DataTypeRespose[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRequestAll();
  }, []);

  const getRequestAll = async () => {
    try {
      const res = await axios.get("http://localhost:8888/request-transfer/all");
      setRequest(res.data.result);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const transformedData: DataType[] = request.map((item, index) => ({
    key: index,
    description: item.description,
    usersAll: item.usersAll,
    usersRequest: item.usersRequest,
    usersRemaining: item.usersRemaining,
    combinedField: item.combinedField,
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "ชั้น",
      dataIndex: "description",
      align: "center",
      render: (text) => <span style={{ fontWeight: 300 }}>{text}</span>,
      responsive: ["xs", "sm", "md", "lg"], // แสดงทุกขนาด
    },
    {
      title: "จำนวนอัยการทั้งหมด",
      dataIndex: "usersAll",
      align: "center",
      sorter: (a, b) => a.usersAll - b.usersAll,
      responsive: ["sm", "md", "lg"], // ซ่อนบนหน้าจอ XS
    },
    {
      title: "ขอย้าย",
      dataIndex: "usersRequest",
      align: "center",
      sorter: (a, b) => a.usersRequest - b.usersRequest,
      responsive: ["sm", "md", "lg"], // ซ่อนบนหน้าจอ XS
    },
    {
      title: "ไม่ขอย้าย",
      dataIndex: "usersRemaining",
      align: "center",
      sorter: (a, b) => a.usersRemaining - b.usersRemaining,
      responsive: ["md", "lg"], // ซ่อนบน XS และ SM
    },
    {
      title: "ย้ายได้/ย้ายไม่ได้",
      dataIndex: "combinedField",
      align: "center",
      render: (text) => <span style={{ fontWeight: 300 }}>{text}</span>,
      responsive: ["lg"], // แสดงเฉพาะจอใหญ่
    },
    {
      title: "Actions",
      dataIndex: "actions",
      align: "center",
      render: (_, record) => (
        <div className="flex space-x-4 justify-center">
          <button className="px-3 py-1 text-sm border border-[#1677FF] text-[#1677FF] rounded hover:bg-[#1677FF] hover:text-white transition duration-200">
            ดูรายละเอียด
          </button>
          <button className="px-3 py-1 text-sm border border-[#1677FF] text-[#1677FF] rounded hover:bg-[#1677FF] hover:text-white transition duration-200">
            ประมวลผล
          </button>
        </div>
      ),
      responsive: ["xs", "sm", "md", "lg"], // แสดงทุกขนาด
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="overflow-x-auto"> {/* เพิ่ม scroll แนวนอน */}
      <Table<DataType>
        columns={columns}
        dataSource={transformedData}
        onChange={onChange}
        pagination={{ pageSize: 50, hideOnSinglePage: true }}
        scroll={{ x: 800 }} // ทำให้สามารถเลื่อนแนวนอนได้
      />
    </div>
  );
};

export default Tables;
