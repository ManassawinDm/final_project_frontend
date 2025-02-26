import React from 'react'
import Table from '@/components/Home/Table'
import { IoHome } from "react-icons/io5";

const Home = () => {
  return (
    <div className=" min-h-screen flex justify-center py-8">
      <div className="bg-white w-[98%] rounded-xl shadow-lg overflow-hidden">
        <div className="grid [20%_80%] ">
          <div className="flex items-center text-white bg-[#1677FF] text-xl px-10 py-5 shadow-lg">
            <IoHome />
            <p className="font-bold ml-2 ">ภาพรวมการขอโยกย้าย</p>
          </div>
          <div className="py-3">
            <Table />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home