import React from 'react'
import InputRegister from '@/components/Register/InputRegister'

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
              <InputRegister />
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
