import React, { useState } from 'react'
import { RiFolderUserFill } from "react-icons/ri";
import CurrenInfoBtn from './Button/CurrenInfoBtn';
import { FaSave } from "react-icons/fa";
import CurrenInfoSelect from './Input/CurrenInfoSelect';
import CurrentInfoInput from './Input/CurrentInfoInput';

const RequestInfo = () => {
    const [data, setData] = useState(
        Array.from({ length: 20 }, (_, index) => ({
            id: index + 1,
            reason: "",
            status: index % 2 === 0 ? "รอดำเนินการ" : "อนุมัติแล้ว",
        }))
    );

    const handleReasonChange = (id: number, value: string) => {
        setData((prevData) =>
            prevData.map((row) =>
                row.id === id ? { ...row, reason: value } : row
            )
        );
    };

    return (
        <div className="grid grid-rows-[auto,1fr] gap-2 overflow-hidden rounded-xl border">
            <div className="px-7 py-2 bg-[#1677FF] text-white text-lg inline-flex items-center gap-2">
                <RiFolderUserFill />
                คำขอโยกย้าย
            </div>
            <div className="px-7 py-2 flex flex-col gap-5 text-gray-800">
                <div className="flex flex-col">
                    <div>** คำขอที่อยู่ลำดับ 1 จะถูกนำไปพิจารณาในการโยกย้ายก่อน (ขอยื่นโยกย้ายได้สูงสุด 20 ลำดับ)</div>
                    <div>** กรณีไม่ต้องการขอย้ายในลำดับนั้นๆ = ให้ปล่อยช่องเป็นค่าว่าง ไม่ต้องกรอกข้อมูล</div>
                    <div className="px-4">(เช่น ต้องการยื่นย้าย 3 ลำดับ ให้ทำการกรอกหน่วยงานที่ต้องการโยกย้ายในลำดับที่ 1, 2 และ 3 โดยในลำดับที่ 4 เป็นต้นไปให้ปล่อยเป็นค่าว่าง)</div>
                    <div>** ในกรณีต้องการแนบไฟล์เอกสารอื่นๆเพื่อประกอบการขอโยกย้าย ให้ทำการรวบรวมส่งพร้อมเอกสารในรูปแบบใบกระดาษคำขอ</div>
                    <div className="text-red-600 underline">** สามารถบันทึก/เปลี่ยนแปลงข้อมูลการขอโยกย้ายในระบบได้ถึงวันที่ 4 ธันวาคม พ.ศ.2567 เวลา 12.00 น.</div>
                </div>
                <div className="flex flex-col">
                    <CurrenInfoBtn className="text-white bg-[#1677FF] hover:bg-[#1A8CFF] transition-colors duration-200 rounded-xl" label="พิมพ์คำขอ" height={40} type="button" icon={<FaSave />} />
                    <div className="text-red-600">** กรุณากรอกประวัติการรับราชการในสำนักงานอัยการสูงสุดก่อนทำการพิมพ์คำขอ</div>
                </div>

                <div className="border border-gray-100">
                    <table className="w-full bg-white min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border border-gray-100 w-auto whitespace-nowrap">ลำดับ</th>
                                <th className="px-4 py-2 border border-gray-100">ต้องการย้ายไป/เหตุผล</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.id} className="text-center">
                                    <td className="px-4 py-2 border border-gray-100 w-auto whitespace-nowrap">{row.id}</td>
                                    <td className="px-4 py-2 border border-gray-100">
                                        <CurrenInfoSelect
                                            IsSearch={true}
                                            name={`targetOffice-${row.id}`}
                                            placeholder="--เลือกสำนักงาน--"
                                            value={row.reason}
                                            onChange={(value) => handleReasonChange(row.id, value)}
                                            className="w-full"
                                            height={40}
                                        />
                                        <div className="text-sm flex py-1">เหตุผลการขอย้าย: <span className="text-red-600">(ไม่เกิน 100 ตัวอักษร)</span></div>
                                        <CurrentInfoInput name={`reason-${row.id}`} placeholder="กรอกเหตุผล" type="text"/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>4</div>
            </div>
        </div>
    )
}

export default RequestInfo;
