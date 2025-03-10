import React from 'react'
import PartInput from '@/components/Login/PartInput';

const page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl 
                      bg-white p-4 shadow-lg rounded-lg 
                      min-h-[70vh] max-h-[90vh] overflow-hidden flex flex-col">

        {/* Logo Section */}
        <div className="flex justify-center items-center py-3">
          <img
            src="/Logo.jpg"
            alt="Logo"
            className="w-full max-w-[350px] h-auto aspect-video object-contain"
          />
        </div>

        {/* Title Section */}
        <div className="text-center text-gray-700 font-semibold my-2">
          ระบบบันทึกคำขอเพื่อประกอบการพิจารณา<br />
          การบริหารงานบุคคลของข้าราชการอัยการ<br />
          (รอบเมษายน 2568)
        </div>

        {/* Input Section */}
        <div className="flex justify-center items-center flex-1 w-full">
          <PartInput />
        </div>

        {/* Date Section */}
        <div className="flex flex-col justify-center items-center text-center font-bold text-blue-600 py-2">
          <p>เปิดรับบันทึกคำขอ</p>
          <p>ตั้งแต่วันที่ 26 พฤศจิกายน 2567 เวลา 08.30 น.</p>
          <p>ถึง</p>
          <p>วันที่ 4 ธันวาคม 2567 เวลา 12.00 น.</p>
        </div>
      </div>
    </div>
  );


}

export default page
