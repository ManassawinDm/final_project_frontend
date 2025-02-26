"use client";
import React, { useEffect, useState } from "react";
import { Collapse, Pagination } from "antd";
import { HiBuildingOffice } from "react-icons/hi2";
import { FaMedal } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { IoCaretBack } from "react-icons/io5";
import axios from "axios";
import Loading from "@/app/loading";

interface responseType {
  office_id: number;
  office_name: string;
  class_id: number;
  class_name: string;
  users: usersList[];
}

interface usersList {
  user_id: number;
  user_name: string;
  winner: string;
  score: string;
}

const ViewPart = () => {
  const { classId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const [loading, setLoading] = useState(true);
  const [processData, setProcessData] = useState<responseType[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (classId) {
      fetchData();
    }
  }, [classId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/request-transfer/result/office/${classId}`);

      const formattedResult = response.data.data.groupedResult.map((office: responseType) => ({
        ...office,
        users: office.users.map((user) => ({
          ...user,
          score: parseFloat(user.score ?? "0"),
        })),
      }));

      setProcessData(formattedResult);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = processData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if(loading) return <Loading />
  return (
    <div className="flex flex-col gap-5">

      {/* ✅ รายการ Collapse */}
      <Collapse
        size="large"
        items={currentData.map((office, index) => ({
          key: `${startIndex + index}`, // ✅ ใช้ key ที่คงที่ในแต่ละหน้า
          label: (
            <div className="flex items-center gap-2">
              <HiBuildingOffice className="text-lg text-blue-500" />
              {office.office_name}
            </div>
          ),
          children: (
            <div className="p-3 bg-white rounded-lg shadow-sm">
              {office.users.length > 0 ? (
                <table className="w-full text-sm text-gray-700">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="py-2 font-medium text-left w-10">#</th>
                      <th className="py-2 font-medium text-left">ชื่อ</th>
                      <th className="py-2 font-medium text-center w-20">คะแนน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {office.users.map((user, i) => (
                      <tr key={user.user_id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-2 text-left">{i + 1}</td>
                        <td
                          className={`py-2 flex items-center gap-2 ${
                            user.winner === "true" ? "text-yellow-500 font-semibold" : "opacity-70"
                          }`}
                        >
                          {user.winner === "true" && <FaMedal className="text-yellow-400 text-sm" />}
                          {user.user_name}
                        </td>
                        <td className="py-2 text-center">{user.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-400 text-sm">ไม่มีข้อมูลผู้ใช้</p>
              )}
            </div>
          ),
        }))}
      />

      {/* ✅ Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={processData.length} // ✅ ใช้ processData.length เพื่อคำนวณจำนวนหน้า
        onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
        className="flex justify-end p-5"
      />

      {/* ✅ ปุ่มบันทึกและยกเลิก */}
      <div className="flex justify-center">
        <div className="px-5">
          <Button className="w-full flex justify-center md:w-auto px-6 py-5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          onClick={() => router.push(`/result/${classId}`)}
          >
            <IoCaretBack />
            ย้อนกลับ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewPart;
