import React from 'react'
import InputLogin from '@/components/Login/InputLogin'
import BtnLogin from '@/components/Login/BtnLogin';
import { MdEmail } from "react-icons/md";
import { FaLock, } from "react-icons/fa";
import Link from 'next/link';


const test = async(formData:FormData)=>{
  "use server"
  const username = formData.get('email')
  console.log(username)
}

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="flex justify-center items-center w-full sm:w-[320px] md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white p-3 shadow-lg rounded-lg">
        <div className="grid grid-cols-1 grid-rows-9 p-2 w-full gap-2">
          <div className="grid justify-items-center row-span-2 py-3 border">
            Logo
          </div>
          <div className="grid justify-items-center row-span-1">
            <p className="text-center">
              ระบบบันทึกคำขอเพื่อประกอบการพิจารณา<br />
              การบริหารงานบุคคลของข้าราชการอัยการ<br />
              (รอบเมษายน 2568)
            </p>
          </div>
          <div className="grid justify-items-center row-span-4">
            <div className="w-full text-center">
              <form action={test} className="login-form w-full max-w-sm mx-auto p-8 bg-white">
                <InputLogin name="email" placeholder="email" type="text" icon=<MdEmail /> />
                <InputLogin name="password" placeholder="password" type="password" icon=<FaLock /> />
                <BtnLogin name="login" />
                <BtnLogin name="Login with Google" />
                <p className="mt-4 text-gray-500 text-xs">
                  ไม่ได้ลงทะเบียน? <Link href="/register" className="text-[#1677FF] hover:underline">สร้างบัญชี</Link>
                </p>
              </form>
            </div>
          </div>
          <div className="grid justify-items-center row-span-2">
            <div className="text-center font-bold">
              <p className="text-[#1677FF]">เปิดรับบันทึกคำขอ</p>
              <p className="text-[#1677FF]">ตั้งแต่วันที่ 26 พฤศจิกายน 2567 เวลา 08.30 น.</p>
              <p className="text-[#1677FF]">ถึง</p>
              <p className="text-[#1677FF]">วันที่ 4 ธันวาคม 2567 เวลา 12.00 น.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
