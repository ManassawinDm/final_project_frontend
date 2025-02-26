"use client";

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Table } from "antd";
import Swal from "sweetalert2";
import type { TableColumnsType, TableProps } from "antd";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaGear } from "react-icons/fa6";

interface DataTypeRespose {
  key: React.Key;
  classId: number;
  description: string;
  usersAll: number;
  usersRequest: number;
  usersRemaining: number;
  combinedField: string;
}

interface DataType {
  key: React.Key;
  classId: number;
  description: string;
  usersAll: number;
  usersRequest: number;
  usersRemaining: number;
  combinedField: string;

}

const Tables = () => {
  const [request, setRequest] = useState<DataTypeRespose[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

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

  const processRequest = async (classId: number, description: string) => {
    try {
      setIsProcessing(true);
      Swal.fire({
        title: "กำลังประมวลผล...",
        text: "กรุณารอสักครู่",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      const response = await axios.post("http://localhost:8888/request-transfer", {
        classId: classId,
      });

      console.log("Response:", response.data);

      Swal.fire({
        title: "ประมวลผลสำเร็จ!",
        text: `${description} ถูกประมวลผลแล้ว`,
        icon: "success",
        confirmButtonText: "ตกลง",
      });

      getRequestAll();
    } catch (error) {
      console.error("Error processing request:", error);

      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถประมวลผลได้ กรุณาลองใหม่",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const checkAndRedirect = async (classId: number) => {
    try {
      setIsProcessing(true);
      Swal.fire({
        title: "กำลังตรวจสอบข้อมูล...",
        text: "กรุณารอสักครู่",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.get(`http://localhost:8888/request-transfer/result/${classId}`);

      if (response.data.data && Object.keys(response.data.data).length > 0) {
        Swal.close();
        router.push(`/result/${classId}`);
      } else {
        Swal.fire({
          title: "ไม่มีข้อมูล",
          text: "ไม่พบข้อมูลการประมวผลของชั้นนี้",
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        title: "ไม่มีข้อมูล",
        text: "ไม่พบข้อมูลการประมวผลของชั้นนี้",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcessClick = (classId: number, description: string) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: `คุณต้องการประมวลผล: ${description} หรือไม่?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1677FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        processRequest(classId, description);
      }
    });
  };


  const transformedData: DataType[] = request.map((item, index) => ({
    key: index,
    classId: item.classId,
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
          <button
            className="px-3 py-1 text-sm border border-[#1677FF] text-[#1677FF] rounded flex items-center gap-1 hover:bg-[#1677FF] hover:text-white transition duration-200"
            onClick={() => checkAndRedirect(record.classId)}
            disabled={isProcessing}
          >
            <MdOutlineRemoveRedEye className="text-md" />
            {isProcessing ? "กำลังโหลด..." : "ดูรายละเอียด"}
          </button>
          <button className="px-3 py-1 text-sm border border-[#1677FF] text-[#1677FF] rounded flex items-center gap-1 hover:bg-[#1677FF] hover:text-white transition duration-200"
            onClick={() => handleProcessClick(record.classId, record.description)}
            disabled={isProcessing}
          >
            <FaGear className="text-md" />
            {isProcessing ? "กำลังโหลด..." : "ประมวลผล"}
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
