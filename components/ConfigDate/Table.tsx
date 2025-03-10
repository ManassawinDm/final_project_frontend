"use client";

import React, { useState } from "react";
import { Table, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { IDataDate } from "./Type";
import axios from "axios";

const { Search } = Input;
function TableConfigDate({ data,refreshTable }: { data?: IDataDate[],refreshTable: () => void }) {
  const [searchText, setSearchText] = useState<string>("");
  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "เมื่อลบแล้วจะไม่สามารถกู้คืนข้อมูลได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/date/delete/${id}`);
          
          Swal.fire({
            icon: "success",
            title: "ลบสำเร็จ!",
            text: "ข้อมูลถูกลบเรียบร้อยแล้ว",
            confirmButtonColor: "#4CAF50",
          });

          refreshTable(); 
        } catch (error) {
          console.error("❌ API Delete Error:", error);
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: "ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่",
            confirmButtonColor: "#E53935",
          });
        }
      }
    });
  };

  const columns: ColumnsType<IDataDate> = [
    {
      title: "ลำดับ",
      dataIndex: "index", 
      key: "index",
      render: (_, __, i) => i + 1,
    },
    {
      title: "วันที่เปิด",
      dataIndex: "startDate", 
      key: "startDate",
      sorter: (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    },
    {
      title: "วันที่ปิด",
      dataIndex: "endDate", // ✅ เปลี่ยนเป็น `endDate`
      key: "endDate",
      sorter: (a, b) =>
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
    },
    {
      title: "รอบการโยกย้าย",
      dataIndex: "round",
      key: "round",
    },
    {
      title: "ปีที่โยกย้าย",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          style={{
            color: status === "Active" ? "green" : "red",
          }}
        >
          {status === "Active" ? "เปิดการใช้งาน" : "ปิดการใช้งาน"}
        </span>
      ),
    },
    {
      title: "การจัดการ",
      key: "action",
      render: (record: IDataDate) => (
        <div style={{ display: "flex", gap: "30px" }}>
          <FaTrash
            style={{ cursor: "pointer", color: "red" }}
            className="text-xl"
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  const filteredData = (data || []).filter(
    (item) =>
      item.startDate.includes(searchText) ||
      item.endDate.includes(searchText) ||
      item.round.toString().includes(searchText) ||
      item.year.toString().includes(searchText)
  );

  return (
    <div>
      <Search
        placeholder="ค้นหา..."
        onSearch={handleSearch}
        enterButton
        allowClear
        style={{ marginBottom: 16, width: 300 }}
      />
      <div className="border">
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
}

export default TableConfigDate;
