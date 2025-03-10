"use client";

import React, { useState } from "react";
import axios from "axios";

import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import InputLogin from "../Login/InputLogin";
import BtnLogin from "../Login/BtnLogin";

const PartInput = () => {
  const [email, setEmail] = useState(""); // ✅ จัดการ email
  const [password, setPassword] = useState(""); // ✅ จัดการ password
  const [loading, setLoading] = useState(false); // ✅ จัดการปุ่ม loading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // ✅ เริ่มโหลด API

    try {
      const payload = { email, password };
      console.log("📌 กำลังส่ง API:", payload);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, payload);

      console.log("✅ Login Success:", response.data);
      
      // ✅ แสดง SweetAlert2 เมื่อ Login สำเร็จ
      Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ!",
        text: "คุณสามารถใช้งานระบบได้แล้ว",
        confirmButtonColor: "#4CAF50",
      });

    } catch (error) {
      console.error("❌ Login Error:", error);

      // ❌ แสดง SweetAlert2 เมื่อเกิดข้อผิดพลาด
      Swal.fire({
        icon: "error",
        title: "เข้าสู่ระบบไม่สำเร็จ!",
        text: "กรุณาตรวจสอบ Email และ Password",
        confirmButtonColor: "#E53935",
      });

    } finally {
      setLoading(false); // ✅ หยุดโหลด API
    }
  };

  return (
    <div className="w-full text-center">
      <form onSubmit={handleSubmit} className="login-form w-full max-w-sm mx-auto p-8 bg-white">
        <InputLogin 
          name="email" 
          placeholder="Email" 
          type="text" 
          icon={<MdEmail />} 
          value={email} // ✅ ผูก state กับ input
          onChange={(e) => setEmail(e.target.value)} // ✅ อัปเดต email
        />
        <InputLogin 
          name="password" 
          placeholder="Password" 
          type="password" 
          icon={<FaLock />} 
          value={password} // ✅ ผูก state กับ input
          onChange={(e) => setPassword(e.target.value)} // ✅ อัปเดต password
        />
        <BtnLogin name={loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"} disabled={loading} />
      </form>
    </div>
  );
};

export default PartInput;
