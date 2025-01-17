import React from 'react'
import Table from '@/components/Home/Table'

const Home = () => {
  return (
    <div className=" min-h-screen flex justify-center py-8">
      <div className="bg-white w-[98%] rounded-xl shadow-lg overflow-hidden">
        <div className="grid [20%_80%] ">
          <div className="p-4 text-white bg-[#1677FF] shadow-lg">
            <p>ภาพรวมการขอโยกย้าย</p>
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