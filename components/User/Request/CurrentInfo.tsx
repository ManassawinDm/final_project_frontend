import React from "react";
import CurrentInfoInput from "./Input/CurrentInfoInput";
import CurrenInfoSelect from "./Input/CurrenInfoSelect";
import CurrenInfoBtn from "./Button/CurrenInfoBtn";
import { FaSave } from "react-icons/fa";
import { RiFolderUserFill } from "react-icons/ri";
import { responseType } from "@/components/ResultProccess/DetailUser/responseType";

interface ICurrentInfo{
  disable:boolean;
  data?: responseType[]
}

const dayOptions = Array.from({ length: 31 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}));

const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}));

const yearOptions = Array.from({ length: 2578 - 2550 + 1 }, (_, i) => ({
  value: (2550 + i).toString(),
  label: (2550 + i).toString(),
}));

const CurrentInfo = (props:ICurrentInfo) => {
  const { disable, data } = props

  if (!data || data.length === 0) return null;

  const userData = data[0]; 

  return (
    <div className="grid grid-rows-[auto,1fr] gap-2 overflow-hidden rounded-xl border">
      {/* Header */}
      <div className="px-7 py-2 bg-[#1677FF] text-white text-lg inline-flex items-center gap-2">
        <RiFolderUserFill />
        ข้อมูลปัจจุบัน
      </div>
  
      {/* Form Content */}
      <div className="px-7 py-2">
        <div className="grid grid-rows-8 gap-5">
          
          {/* ปรับให้ Label มีขนาดเท่ากันทุกอัน */}
          <div className="flex flex-col md:flex-row gap-5 md:gap-x-16">
            <div className="w-[250px] flex-shrink-0">
              <p className="text-md text-gray-800">ชื่อ-สกุล:</p>
            </div>
            <div className="text-md w-full md:w-auto">
              <p className="text-md text-gray-800 flex gap-x-5">{userData.firstname} <span>{userData.lastname}</span></p>
            </div>
          </div>
  
          <div className="flex flex-col md:flex-row gap-5 md:gap-x-16">
            <div className="w-[250px] flex-shrink-0">
              <p className="text-md text-gray-800">อายุ:</p>
            </div>
            <div className="text-md w-full md:w-auto">
              <CurrentInfoInput name="age" placeholder="กรุณากรอกอายุเป็นตัวเลข" type="number" min={0} width={400} height={40} disable={disable} 
              value={userData.age || ""}
              />
            </div>
          </div>
  
          <div className="flex flex-col md:flex-row gap-5 md:gap-x-16">
            <div className="w-[250px] flex-shrink-0">
              <p className="text-md text-gray-800">สำนักงานที่ปฏิบัติงาน ณ ปัจจุบัน:</p>
            </div>
            <div className="text-md w-full">
              <CurrenInfoSelect name="CurrentOffice" width="100%" IsSearch={true} height={40} disable={disable}
              value={userData.currenOffice || ""}
              />
            </div>
          </div>
  
          <div className="flex flex-col md:flex-row gap-5 md:gap-x-16">
            <div className="w-[250px] flex-shrink-0">
              <p className="text-md text-gray-800">ตำแหน่งปัจจุบัน:</p>
            </div>
            <div className="text-md w-full md:w-auto">
              <CurrentInfoInput name="currentPosition" placeholder="กรุณากรอกตำแหน่งปัจจุบัน" type="text" width={400} height={40} disable={disable}
              value={userData.position || ""}
              />
            </div>
          </div>
  
          <div className="flex flex-col md:flex-row gap-5 md:gap-x-16">
            <div className="w-[250px] flex-shrink-0">
              <p className="text-md text-gray-800">ได้เข้ารับตำแหน่งปัจจุบันเมื่อวันที่:</p>
            </div>
            <div className="text-md flex gap-x-2 w-full flex-wrap">
              <CurrenInfoSelect name="day" width="100px" IsSearch={false} placeholder="วัน" options={dayOptions} height={40} disable={disable}
              value={userData.currentPositionDateDay || ""}
              />
              <CurrenInfoSelect name="month" width="100px" IsSearch={false} placeholder="เดือน" options={monthOptions} height={40} disable={disable}
              value={userData.currentPositionDateMonth || ""}
              />
              <CurrenInfoSelect name="year" width="100px" IsSearch={false} placeholder="ปี" options={yearOptions} height={40} disable={disable}
              value={userData.currentPositionDateYear || ""}
              />
            </div>
          </div>
  
          <div className="flex flex-col md:flex-row gap-5 md:gap-x-16">
            <div className="w-[250px] flex-shrink-0">
              <p className="text-md text-gray-800">ชั้นปัจจุบัน:</p>
            </div>
            <div className="text-md w-full md:w-auto">
              <CurrenInfoSelect name="CurrentClass" width={200} IsSearch={false} height={40} disable={disable}
              value={userData.currenClass || ""}
              />
            </div>
          </div>
  
          <div className="flex flex-col md:flex-row gap-5 md:gap-x-16">
            <div className="w-[250px] flex-shrink-0">
              <p className="text-md text-gray-800">ชั้นที่ขอย้าย:</p>
            </div>
            <div className="text-md w-full md:w-auto">
              <CurrenInfoSelect name="ClassTarget" width={200} IsSearch={false} height={40} disable={disable}
              value={userData.requested_class || ""}
              />
            </div>
          </div>
  
          {/* ปรับปุ่มให้อยู่ตรงกลางในจอเล็ก */}
          <div className="flex justify-center md:justify-start">
            <CurrenInfoBtn className="text-white bg-[#1677FF] hover:bg-[#1A8CFF] transition-colors duration-200 rounded-xl" label="บันทึกข้อมูลปัจจุบัน" width={200} height={40} type="submit" icon={<FaSave />} />
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default CurrentInfo;
