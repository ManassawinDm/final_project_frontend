"use client";

import React, { useEffect, useState } from "react";
import { Input, Table, Tag } from "antd";
import { useParams, useRouter } from "next/navigation";
import type { TableProps } from "antd";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { GoCheckCircle } from "react-icons/go";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import { BiSolidCheckCircle } from "react-icons/bi";
import { BiSolidXCircle } from "react-icons/bi";
import { FaSkullCrossbones } from "react-icons/fa";
import { GiBigDiamondRing } from "react-icons/gi";

interface responseType {
  key: React.Key;
  requestId: number;
  userId: number;
  name: string;
  class: number;
  className: string;
  currenClassId: number;
  currenClass: string;
  officeId: number;
  officeName: string;
  priority: number;
  targetOffice: number;
  targetOfficeName: string;
  tags: string[];
  status: string;
  round: number;
  year: number;
}

type ColumnsType<T extends object> = TableProps<T>["columns"];

const TablesResult: React.FC = () => {
  const router = useRouter();
  const { classId } = useParams();
  const [loading, setLoading] = useState(true);
  const [processData, setProcessData] = useState<responseType[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "success" | "fail">("all");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (classId) {
      fetchData();
    }
  }, [classId]);

  const handleSaveClick = (classId: number, className: string) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: `คุณต้องยืนยันที่จะบันทึกข้อมูล${className} หรือไม่?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1677FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSave(classId);
      }
    });
  };

  const handleSave = async (classId: number) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/request-transfer/report`, { classId });

      if (response.data.success) {
        if (response.data.data.success) {
          await Swal.fire({
            title: "บันทึกข้อมูลสำเร็จ!",
            text: `บันทึกข้อมูลแล้ว`,
            icon: "success",
            confirmButtonText: "ตกลง",
          });
        } else {
          await Swal.fire({
            title: "บันทึกข้อมูลไม่ได้!",
            text: `ยังมีคนที่ยังไม่ถูกโยกย้ายอยู่`,
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        }
        fetchData();
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดขณะบันทึกข้อมูล:", error);
      await Swal.fire({
        title: "ข้อผิดพลาด!",
        text: "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };



  const handleConfirmClick = (classId: number, requestId: number, officeId: number, userName: string, officeName: string) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      html: `
        <p style="font-size: 18px; font-weight: 400; margin-bottom: 10px;">
            คุณต้องการยืนยันให้ 
            <span style="font-weight: bold; color: #d33;">${userName}</span>
            <br>ย้ายไปที่ <br>
            <span style="font-weight: bold; color: #d33;">${officeName}</span> หรือไม่?
        </p>
    `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1677FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirm(requestId, classId, officeId,officeName);
      }
    });
  };
  const handleConfirm = async (requestId: number, classId: number, officeId: number,officeName:string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/request-transfer/comfirmoffice`,
        { requestId: requestId, classId: classId, officeId: officeId })
      Swal.fire({
        title: "ยืนยันโยกย้ายสำเร็จ!",
        html: `<p>ยืนยันโยกย้ายไปยัง<span style="font-weight: bold; color: #d33;">${officeName}</span> แล้ว</p>`,
        icon: "success",
        confirmButtonText: "ตกลง",
      })
      fetchData();
    } catch (error) {
      console.error("เกิดข้อผิดพลาดขณะบันทึกข้อมูล:", error);
      await Swal.fire({
        title: "ข้อผิดพลาด!",
        text: "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  const handleCancelClick = (classId: number, className: string) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: `คุณต้องการลบประมวลผล${className}หรือไม่?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1677FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        handleCancel(classId, className);
      }
    });
  };

  const handleCancel = async (classId: number, className: string) => {
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/request-transfer/delete`, { classId: classId })
      Swal.fire({
        title: "ลบการประมวลผลสำเร็จ!",
        text: `ลบการประมวลผล${className}แล้ว`,
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/admin/dashboard");
        }
      });

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


  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/request-transfer/result/${classId}`);
      const transformedData = response.data.data.map((item: responseType, index: number) => ({
        ...item,
        key: item.requestId ?? item.userId,
        index: index + 1,
        status: item.status === "Approved" ? "โยกย้ายสำเร็จ" : "โยกย้ายไม่สำเร็จ",
      }));
      console.log(transformedData)
      setProcessData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (status: "all" | "success" | "fail") => {
    setFilterStatus(status);
  };

  const handleViewOffice = () => {
    setIsProcessing(true);
    router.push(`/admin/result/office/${classId}`);
  };

  const handleViewUser = (userId:number) => {
    router.push(`/admin/result/detail/${userId}`);
  };


  const filteredData = processData.filter((item) => {
    if (filterStatus !== "all" && item.status !== (filterStatus === "success" ? "โยกย้ายสำเร็จ" : "โยกย้ายไม่สำเร็จ")) {
      return false;
    }
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchLower) ||
        item.userId.toString().includes(searchLower) ||
        item.officeName.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const columns: ColumnsType<responseType> = [
    { title: "#", dataIndex: "index", key: "index" },
    { title: "เลขผู้สูงอายุ", dataIndex: "userId", key: "userId" },
    {
      title: "ชื่อ",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a onClick={() => handleViewUser(record.userId)}>{text}</a>
      ),
    },
    { title: "ชั้นปัจจุบัน", dataIndex: "currenClass", key: "currenClass" },
    { title: "สำนักงานปัจจุบัน", dataIndex: "officeName", key: "officeName" },
    { title: "ชั้นที่ขอย้าย", dataIndex: "className", key: "className" },
    {
      title: "สำนักงานที่ย้ายไป",
      dataIndex: "targetOfficeName",
      key: "targetOfficeName",
      render: (_, record) =>
        record.status === "โยกย้ายไม่สำเร็จ" ? (
          <span style={{ color: "#d9d9d9" }}>N/A</span>
        ) : (
          <span> <span className="font-bold">{record.priority}.</span> {record.targetOfficeName}</span>
        ),
    },
    {
      title: "Ai Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags: string[]) => (
        <div className="flex flex-wrap gap-2"> {/* ใช้ flex เพื่อจัดเรียงในแนวนอน */}
          {tags.map((tag, index) => (
            tag.toLowerCase() === "sick" ? (
              <FaSkullCrossbones key={index} className="text-red-500 text-lg" />
            ) : tag.toLowerCase() === "spouse" ? (
              <GiBigDiamondRing key={index} className="text-pink-500 text-lg" />
            ) : (
              <span key={index} className="text-gray-700">{tag}</span>
            )
          ))}
        </div>
      ),
    },
    {
      title: "การแนะนำ",
      key: "recommendation",
      render: (_, record) =>
        record.status === "โยกย้ายไม่สำเร็จ" ? (
          <span className="text-red-600 ">{record.targetOfficeName || "N/A"}</span>
        ) : (
          <span style={{ color: "#d9d9d9" }}></span>
        ),
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "โยกย้ายสำเร็จ" ? "green" : "red"}>
          {status === "โยกย้ายสำเร็จ" ? "โยกย้ายสำเร็จ" : "โยกย้ายไม่สำเร็จ"}
        </Tag>
      ),
    },
    // {
    //   title: "รายละเอียด",
    //   key: "more",
    //   render: (_, record) => (
    //     <a onClick={() => router.push(`/result/detail/${record.userId}`)} style={{ color: "#1890ff" }}>
    //       ดูเพิ่มเติม
    //     </a>
    //   ),
    // },
    {
      title: "ยืนยัน",
      key: "confirm",
      render: (_, record) =>
        record.status === "โยกย้ายไม่สำเร็จ" ? (
          <Button
            className="flex justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            onClick={() => handleConfirmClick(record.class, record.requestId, record.targetOffice, record.name, record.targetOfficeName)}
          >
            <GoCheckCircle />
            ยืนยัน
          </Button>
        ) : (
          <span style={{ color: "#d9d9d9" }}></span>
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-5">

      {/* ✅ ปุ่มตัวกรองข้อมูล */}
      <div className="flex flex-col md:flex-row justify-between items-center text-gray-700 space-y-2 md:space-y-0 md:space-x-2">
        {/* ✅ ปุ่มตัวกรองข้อมูลทางซ้าย */}
        <div className="flex flex-wrap gap-2">
          <Button className="flex justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg"
            onClick={() => handleFilter("success")}
          >
            <BiSolidCheckCircle />
            ดูผู้ที่โยกย้ายสำเร็จ
          </Button>
          <Button className="flex justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            onClick={() => handleFilter("fail")}
          >
            <BiSolidXCircle />
            ดูผู้ที่โยกย้ายไม่สำเร็จ
          </Button>
          <Button className="flex justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            onClick={() => handleViewOffice()}
          >
            <AiFillEye />
            {isProcessing ? "กำลังโหลด..." : "ดูมุมมองสำนักงาน"}
          </Button>
        </div>

        {/* ✅ ช่องค้นหาทางขวาสุด */}
        <div className="w-full md:w-auto flex justify-end">
          <Input
            placeholder="🔍 ค้นหา ชื่อ, เลขผู้สูงอายุ, หรือ สำนักงาน..."
            className="w-full md:w-[500px] px-3 py-2 border rounded-md"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

      </div>


      {/* ✅ ตารางผลลัพธ์ */}
      <div className="border border-gray-300 rounded-lg shadow-md">
        <Table<responseType>
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={{ pageSize: 20 }}
          tableLayout="auto"
        />
      </div>

      {/* ✅ ปุ่มบันทึกและยกเลิก */}
      <div className="flex justify-center">
        <div className="px-5">
          <Button className="w-full flex justify-center md:w-auto px-6 py-5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            onClick={() => handleSaveClick(processData[0].class, processData[0].className)}
            disabled={isProcessing}
          >
            <FaSave />
            {isProcessing ? "กำลังโหลด..." : "บันทึกข้อมูล"}
          </Button>
        </div>
        <div className="px-5">
          <Button className="w-full flex justify-center md:w-auto px-6 py-5 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            onClick={() => handleCancelClick(processData[0].class, processData[0].className)}
            disabled={isProcessing}
          >
            <FaTrash />
            {isProcessing ? "กำลังโหลด..." : "ยกเลิกการประมวลผล"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TablesResult;
