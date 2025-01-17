import Link from 'next/link';
import React from 'react'
import { FaUserAlt,FaLock  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const InputRegister = () => {
  return (
    <>
      <form className="login-form w-full max-w-sm mx-auto p-8 bg-white">

      <div className="relative mb-4">
    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
      <FaUserAlt />
    </span>
    <input type="text" placeholder="username" className="w-full p-4 pl-10 bg-gray-200 border-0 rounded-md text-sm" />
  </div>

      <div className="relative mb-4">
    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
      <MdEmail />
    </span>
    <input type="text" placeholder="email" className="w-full p-4 pl-10 bg-gray-200 border-0 rounded-md text-sm" />
  </div>

  <div className="relative mb-4">
    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
      <FaLock />
    </span>
    <input type="password" placeholder="password" className="w-full p-4 pl-10 bg-gray-200 border-0 rounded-md text-sm" />
  </div>

  <button className="w-full p-4 bg-[#1677FF] text-white uppercase font-semibold text-sm rounded-md transition-all duration-300 hover:bg-blue-600 focus:outline-none">
    login
  </button>

  <button className="w-full p-4 bg-[#1677FF] text-white uppercase font-semibold text-sm rounded-md transition-all duration-300 hover:bg-blue-600 focus:outline-none mt-4 flex items-center justify-center">
  Login with Google
</button>


  <p className="mt-4 text-gray-500 text-xs">
    มีบัญชีเเล้ว? <Link href="/login" className="text-[#1677FF] hover:underline">เข้าสู่ระบบ</Link>
  </p>
      </form>
    </>


  )
}

export default InputRegister