"use client";

import React, { useState } from "react";
import Calendar from "../User/Request/Calender/Calender";
import CurrenInfoSelect from "../User/Request/Input/CurrenInfoSelect";
import CurrenInfoBtn from "../User/Request/Button/CurrenInfoBtn";
import { FaSave } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import api from "@/utils/api";


interface ISelectDateProps {
  refreshTable: () => void; 
}

const SelectDate = (props : ISelectDateProps) => {

  const { refreshTable } = props
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDateChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "closeDate" && formData["openDate"] && value < formData["openDate"]) {
      setError("วันที่ปิดต้องไม่น้อยกว่าวันที่เปิด");
    } else {
      setError(null);
    }
  };

  const resetForm = () => {
    setFormData({}); 
    setError(null);  
  };

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: String(value) }));
  };


  // 🔥 คำนวณ "ปีที่โยกย้าย" เป็น ปีปัจจุบัน ±5 ปี
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, i) => ({
    value: (currentYear - 5 + i).toString(),
    label: (currentYear - 5 + i).toString(),
  }));

  // 🔥 ตัวเลือก "รอบการโยกย้าย"
  const roundOptions = [
    { value: "1", label: "รอบที่ 1" },
    { value: "2", label: "รอบที่ 2" },
    { value: "3", label: "รอบที่ 3" },
    { value: "4", label: "รอบที่ 4" },
  ];

  // ✅ ฟังก์ชันกดปุ่มบันทึก
  const handleSubmit = async () => {
    const { openDate, closeDate, round, year } = formData;

    if (!openDate || !closeDate || !round || !year) {
      Swal.fire({
        icon: "warning",
        title: "ข้อมูลไม่ครบ!",
        text: "กรุณาเลือกข้อมูลให้ครบทุกช่อง",
        confirmButtonColor: "#F39C12",
      });
      return;
    }

    // ✅ ตรวจสอบว่าปิดต้องไม่น้อยกว่าหรือเท่ากับวันเปิด
    if (closeDate < openDate) {
      Swal.fire({
        icon: "error",
        title: "วันที่ปิดไม่ถูกต้อง!",
        text: "วันที่ปิดต้องไม่น้อยกว่าวันที่เปิด",
        confirmButtonColor: "#E53935",
      });
      return;
    }

    // ✅ ตรวจสอบว่า "วันที่ปิด" ต้องไม่เท่ากับ "วันที่เปิด"
    if (closeDate === openDate) {
      Swal.fire({
        icon: "error",
        title: "วันที่ปิดไม่ถูกต้อง!",
        text: "วันที่ปิดต้องไม่เท่ากับวันที่เปิด",
        confirmButtonColor: "#E53935",
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        round: Number(round), 
        year: Number(year), 
        start_date: openDate,
        end_date: closeDate,
      };

      const response = await api.post(`${process.env.NEXT_PUBLIC_BASE_URL}/date/create`, payload);

      Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ!",
        text: "ข้อมูลของคุณถูกบันทึกแล้ว",
        confirmButtonColor: "#4CAF50",
      });
      resetForm();
      refreshTable()

    } catch (err) {
      console.error("❌ API Error:", err);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่",
        confirmButtonColor: "#E53935",
      });
      setError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");

    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-8 items-end">
        <div className="flex flex-col gap-y-2">
          <div>วันที่เปิด</div>
          <Calendar
            name="openDate"
            placeholder="กรอกวันที่เปิดรับคำขอ"
            onChange={handleDateChange}
            value={formData["openDate"] || ""}
            width={200}
            height={35}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <div>วันที่ปิด</div>
          <Calendar
            name="closeDate"
            placeholder="กรอกวันที่ปิดรับคำขอ"
            onChange={handleDateChange}
            value={formData["closeDate"] || ""}
            width={200}
            height={35}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <div>รอบการโยกย้าย</div>
          <CurrenInfoSelect
            IsSearch={false}
            name="round"
            height={35}
            width={100}
            options={roundOptions}
            onChange={handleSelectChange}
            value={formData["round"] || ""}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <div>ปีที่โยกย้าย</div>
          <CurrenInfoSelect
            IsSearch={false}
            name="year"
            height={35}
            width={100}
            options={yearOptions}
            onChange={handleSelectChange} // ✅ ใช้ `onChange` เพื่ออัปเดตค่าใน `formData`
            value={formData["year"] || ""}
          />
        </div>
        <div className="flex items-center">
          {error ? <CurrenInfoBtn
            className="text-white bg-[#4868AC] hover:bg-[#1A8CFF] transition-colors duration-200 rounded-xl"
            label="บันทึก"
            height={40}
            type="button"
            icon={<FaSave />}
            onClick={handleSubmit}
            disable={true} // ✅ กดปุ่มแล้ว `console.log()` ค่าทั้งหมด
          /> :
            <CurrenInfoBtn
              className="text-white bg-[#4868AC] hover:bg-[#1A8CFF] transition-colors duration-200 rounded-xl"
              label="บันทึก"
              height={40}
              type="button"
              icon={<FaSave />}
              onClick={handleSubmit}
              disable={loading}
            />
          }
        </div>
      </div>

      {/* 🔴 แสดงข้อความ Error ถ้ามี */}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default SelectDate;
