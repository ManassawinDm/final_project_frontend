import React, { useEffect, useState } from "react";
import CurrentInfoInput from "./Input/CurrentInfoInput";
import CurrenInfoSelect from "./Input/CurrenInfoSelect";
import CurrenInfoBtn from "./Button/CurrenInfoBtn";
import { FaSave } from "react-icons/fa";
import { RiFolderUserFill } from "react-icons/ri";
import { responseType } from "@/components/ResultProccess/DetailUser/responseType";
import api from "@/utils/api";
import { classOptions, dayOptions, monthOptions, yearOptions } from "./Util";
import { Skeleton } from 'antd';
import { responseTypeOffice } from "./Type";
import Swal from "sweetalert2";
import { getSession } from "next-auth/react";

interface ICurrentInfo {
  disable: boolean;
  data?: responseType[]
  fetchData?: () => Promise<void>;
}

const CurrentInfo = (props: ICurrentInfo) => {
  const { disable, data, fetchData: refreshData  } = props

  if (!data || data.length === 0) return null;
  const userData = data[0];

  const [age, setAge] = useState<number | null>(userData.age || null);
  const [currentOffice, setCurrentOffice] = useState<string | null>(userData.currenOffice || "");
  const [position, setPosition] = useState<string | null>(userData.position || "");
  const [day, setDay] = useState<number | null>(userData.currentPositionDateDay ?? null);
  const [month, setMonth] = useState<number | null>(userData.currentPositionDateMonth ?? null);
  const [year, setYear] = useState<number | null>(userData.currentPositionDateYear ?? null);
  const [requestedClass, setRequestedClass] = useState<string | null>(userData.requested_class || null);
  const [currentClass, setCurrentClass] = useState<string | null>(userData.currenClass || "");
  const [loading, setLoading] = useState(true);
  const [ButtonLoading, setButtonLoading] = useState(false);
  const [officeAll, setOfficeAll] = useState<responseTypeOffice[]>([]);
  

  useEffect(() => {
    setAge(userData.age || null);
    setCurrentOffice(userData.currenOffice || "");
    setPosition(userData.position || "");
    setDay(userData.currentPositionDateDay ?? null);
    setMonth(userData.currentPositionDateMonth ?? null);
    setYear(userData.currentPositionDateYear ?? null);
    setRequestedClass(userData.requested_class || null);
    setCurrentClass(userData.currenClass || "");
  }, [userData]);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/departments/all`);
      setOfficeAll(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const officeOptions = officeAll.map(office => ({
    value: office.name,
    label: office.name
  }));


  const handleSave = async() => {

    const session = await getSession();
    setButtonLoading(true)
    try {
      const payload = {
        age,
        currentOffice,
        position,
        day,
        month,
        year,
        currentClass,
        requestedClass,
        token: session?.accessToken,
      };
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/userinformation/update/currentinfo`,
        payload
      );
  
      Swal.fire({
        icon: "success",
        title: "อัปเดตสำเร็จ!",
        text: "ข้อมูลของคุณถูกบันทึกแล้ว",
        confirmButtonColor: "#4CAF50",
      });

      if (refreshData) {
      await refreshData(); 
    }
  
    } catch (error) {
      console.error("Error updating info:", error);
  
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถบันทึกข้อมูลได้ โปรดลองอีกครั้ง",
        confirmButtonColor: "#d33",
      });
  
    } finally {
      setButtonLoading(false); 
    }
  };


  if(loading) return <Skeleton active />;
  return (
    <div className="grid grid-rows-[auto,1fr] gap-2 overflow-hidden rounded-xl border">
      {/* Header */}
      <div className="px-7 py-2 bg-[#4868AC] text-white text-lg inline-flex items-center gap-2">
        <RiFolderUserFill />
        ข้อมูลปัจจุบัน
      </div>

      <div className="px-7 py-2">
        <div className="grid grid-rows-8 gap-5">

          <div className="flex flex-col md:flex-row gap-5 md:gap-x-16">
            <div className="w-[250px] flex-shrink-0">
              <p className="text-md text-gray-800">ชื่อ-สกุล:</p>
            </div>
            <div className="text-md w-full md:w-auto">
              <p className="text-md text-gray-800 flex gap-x-5">{userData.prename}{userData.firstname} <span>{userData.lastname}</span></p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 md:gap-x-16">
            <div className="w-[250px] flex-shrink-0">
              <p className="text-md text-gray-800">อายุ:</p>
            </div>
            <div className="text-md w-full md:w-auto">
              <CurrentInfoInput name="age"
                placeholder="กรุณากรอกอายุเป็นตัวเลข"
                type="number"
                min={0}
                width={400}
                height={40}
                disable={disable}
                required={true}
                value={age ? age : undefined}
                onChange={(name, value) => setAge(Number(value))} 
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 md:gap-x-16">
            <div className="w-[250px] flex-shrink-0">
              <p className="text-md text-gray-800">สำนักงานที่ปฏิบัติงาน ณ ปัจจุบัน:</p>
            </div>
            <div className="text-md w-full">
              <CurrenInfoSelect name="CurrentOffice" width="100%" IsSearch={true} height={40} disable={disable}
                options={officeOptions}
                value={currentOffice ? currentOffice : undefined}
                onChange={(name, value) => setCurrentOffice(String(value))}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 md:gap-x-16">
            <div className="w-[250px] flex-shrink-0">
              <p className="text-md text-gray-800">ตำแหน่งปัจจุบัน:</p>
            </div>
            <div className="text-md w-full md:w-auto">
              <CurrentInfoInput name="currentPosition"
                placeholder="กรุณากรอกตำแหน่งปัจจุบัน"
                type="text"
                width={400}
                height={40}
                disable={disable}
                required={true}
                value={position ? position : undefined}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 md:gap-x-16">
            <div className="w-[250px] flex-shrink-0">
              <p className="text-md text-gray-800">ได้เข้ารับตำแหน่งปัจจุบันเมื่อวันที่:</p>
            </div>
            <div className="text-md flex gap-x-2 w-full flex-wrap">
              <CurrenInfoSelect
                name="currentPositionDateDay"
                width="100px"
                IsSearch={false}
                placeholder="วัน"
                options={dayOptions}
                height={40}
                disable={disable}
                value={day ? day : undefined}
                onChange={(name, value) => setDay(Number(value))}
              />

              <CurrenInfoSelect
                name="month"
                width="100px"
                IsSearch={false}
                placeholder="เดือน"
                options={monthOptions}
                height={40}
                disable={disable}
                value={month ? month : undefined}
                onChange={(name, value) => setMonth(Number(value))}
              />

              <CurrenInfoSelect
                name="year"
                width="100px"
                IsSearch={false}
                placeholder="ปี"
                options={yearOptions}
                height={40}
                disable={disable}
                value={year ? year : undefined}
                onChange={(name, value) => setYear(Number(value))}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 md:gap-x-16">
            <div className="w-[250px] flex-shrink-0">
              <p className="text-md text-gray-800">ชั้นปัจจุบัน:</p>
            </div>
            <div className="text-md w-full md:w-auto">
              <CurrenInfoSelect name="CurrentClass" width={200} IsSearch={false} height={40} disable={disable}
                options={classOptions}
                value={currentClass ? currentClass : undefined}
                onChange={(name, value) => setCurrentClass(String(value))}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 md:gap-x-16">
            <div className="w-[250px] flex-shrink-0">
              <p className="text-md text-gray-800">ชั้นที่ขอย้าย:</p>
            </div>
            <div className="text-md w-full md:w-auto">
              <CurrenInfoSelect name="ClassTarget" width={200} IsSearch={false} height={40} disable={disable}
                onChange={(name, value) => setRequestedClass(String(value))}
                options={classOptions}
                value={requestedClass ? requestedClass : undefined}
              />
            </div>
          </div>

          {/* ปรับปุ่มให้อยู่ตรงกลางในจอเล็ก */}
          <div className="flex justify-center md:justify-start">
            <CurrenInfoBtn className="text-white bg-[#4868AC] hover:bg-[#5A7EC4] transition-colors duration-200 rounded-xl"
              label={ButtonLoading ? "กำลังบันทึก..." : "บันทึกข้อมูลปัจจุบัน"}
              width={200}
              height={40}
              type="submit"
              icon={<FaSave />}
              disable={ButtonLoading}
              onClick={() => handleSave()}
            />
          </div>
        </div>
      </div>
    </div>
  );


};

export default CurrentInfo;
