"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import InputLogin from "./InputLogin";
import BtnLogin from "./BtnLogin";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import { signIn,useSession  } from "next-auth/react";
import { useRouter } from "next/navigation";

const PartInput = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const { data: session } = useSession();


  useEffect(() => {
    if (session?.user?.role === "admin") {
      router.push("/admin/dashboard");
    } else if (session?.user?.role === "user") {
      router.push("/users/request");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        console.error(result.error);
        Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ!",
          text: "กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่าน",
          confirmButtonColor: "#E53935",
        });
      } else {
        // ไม่ต้อง redirect ที่นี่ จะทำงานผ่าน useEffect เมื่อ session เปลี่ยน
        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ!",
          text: "กำลังนำคุณไปยังหน้าที่เหมาะสม...",
          confirmButtonColor: "#4CAF50",
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.log('error', error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถเชื่อมต่อกับระบบได้ กรุณาลองใหม่อีกครั้ง",
        confirmButtonColor: "#E53935",
      });
    } finally {
      setLoading(false);
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
