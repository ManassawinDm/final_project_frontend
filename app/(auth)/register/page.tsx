import React from 'react'
import PartInput from '@/components/Register/PartInput';

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="flex justify-center items-center w-full sm:w-[320px] md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white p-3 shadow-lg rounded-lg">
        <div className="grid grid-cols-1 grid-rows-9 p-2 w-full gap-2">

          {/* 🔥 Logo */}
          <div className="grid justify-items-center row-span-2 py-3 border">
            Logo
          </div>

          {/* 🔥 กล่องแจ้งเตือน (ไม่ให้ขยายเต็มจอ) */}
          <div className="grid justify-items-center row-span-2 py-2">
            <div className="bg-yellow-200 border border-red-500 text-red-700 p-2 rounded-md shadow-md max-w-[280px] sm:max-w-[320px] mb-2">
              <div className="text-center text-sm sm:text-base font-bold">
                <p className="py-5">⚠️ กรุณาตั้งค่า Email และ Password ใหม่</p>
                <p>เพื่อใช้เข้าสู่ระบบในการ Login ครั้งถัดไป ⚠️</p>
              </div>
            </div>
          </div>

          {/* 🔥 Form */}
          <div className="grid justify-items-center row-span-3">
            <PartInput />
          </div>
          <div className="grid justify-items-center row-span-1">
          </div>
        </div>
      </div>
    </div>
  )
}

export default page;
