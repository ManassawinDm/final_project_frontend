import MergeAllConfigDate from '@/components/ConfigDate/MergeAll';
import React from 'react'
import { BsCalendar2DateFill } from "react-icons/bs";

const ConfigDate = () => {
  return (
    <div className=" min-h-screen flex justify-center py-8">
    <div className="bg-white w-[98%] rounded-xl shadow-lg overflow-hidden">
      <div className="grid [20%_80%] ">
        <div className="flex items-center text-white bg-[#4868AC] text-xl px-10 py-5 shadow-lg">
        <BsCalendar2DateFill className="text-xl"/>
          <p className="font-bold ml-2 ">ตั้งค่ากำหนดรอบเปิด-ปิด</p>
        </div>
        <div className="py-3">
          <MergeAllConfigDate />
        </div>
      </div>
    </div>
  </div>
  )
}

export default ConfigDate