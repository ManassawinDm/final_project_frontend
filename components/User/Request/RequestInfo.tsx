import React, { useEffect, useState } from 'react'
import { RiFolderUserFill } from "react-icons/ri";
import CurrenInfoBtn from './Button/CurrenInfoBtn';
import { FaSave } from "react-icons/fa";
import CurrenInfoSelect from './Input/CurrenInfoSelect';
import CurrentInfoInput from './Input/CurrentInfoInput';
import { getSession } from 'next-auth/react';
import api from '@/utils/api';
import { Skeleton } from 'antd';
import { responseTypeOffice, responseTypeRequest } from './Type';
import { classOptions } from './Util';
import Swal from "sweetalert2";
import RequestInfoSelect from './Input/RequestInfoSelect';

interface IRequestInfo {
    disable: boolean;
}

const RequestInfo = (props: IRequestInfo) => {
    const { disable } = props;

    const [loading, setLoading] = useState(true);
    const [ButtonLoading, setButtonLoading] = useState(false);
    const [transferPeriod, setTransferPeriod] = useState<number | null>(null)
    const [dataRequest, setDataReuest] = useState<responseTypeRequest[]>([]);
    const [dataOffice, setDataOffice] = useState<responseTypeOffice[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [selectedClass, setSelectedClass] = useState<number | undefined>(undefined); // เก็บค่า class ที่เลือก

    useEffect(() => {
        fetchDataRequest();
        fetchDataOffice()
        fetchTransferPeriods()
    }, []);

    const fetchDataRequest = async () => {
        try {
            const session = await getSession();
            const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/request-transfer/all/person`, { params: { token: session?.accessToken } });
            setDataReuest(response.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataOffice = async () => {
        try {
            const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/departments/all`);
            setDataOffice(response.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTransferPeriods = async () => {
        try {
            const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/date/latest`);
            setTransferPeriod(response.data[0]?.id);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const getInitialData = () => {
        // ตั้งค่าข้อมูลเริ่มต้นให้มี 20 แถว
        return Array.from({ length: 20 }, (_, index) => ({
            id: index + 1,
            reason: dataRequest[index]?.reason || '',
            selectedOffice: undefined, // ตั้งค่าเริ่มต้นให้เป็น undefined
        }));
    };


    useEffect(() => {
        setData(getInitialData());
    }, [dataRequest]); // เมื่อ dataRequest เปลี่ยน ก็จะอัพเดท data

    useEffect(() => {
        if (dataRequest.length > 0) {
            setData(prevData =>
                prevData.map((row, index) => ({
                    ...row,
                    selectedOffice: dataRequest[index]?.officeId || undefined,
                    reason: dataRequest[index]?.reason || ''
                }))
            );
        }
    }, [dataRequest]);


    useEffect(() => {
        if (dataRequest.length > 0) {
            // อัพเดทค่า selectedClass จาก requested_class ใน dataRequest
            const firstRowWithClass = dataRequest.find(row => row.requested_class !== undefined);
            if (firstRowWithClass) {
                setSelectedClass(firstRowWithClass.requested_class);
            }

            // อัพเดทค่า selectedClass ใน data
            setData(prevData =>
                prevData.map((row, index) => ({
                    ...row,
                    classId: dataRequest[index]?.requested_class || undefined,
                }))
            );
        }
    }, [dataRequest]);


    // ฟังก์ชันสำหรับการเปลี่ยนแปลงข้อมูลในการเลือกสำนักงานและเหตุผล
    const handleChange = (id: number, field: string, value: string | number) => {
        setData((prevData) =>
            prevData.map((row) =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };
    const handleClassChange = (value: number) => {
        setSelectedClass(value); // อัพเดทค่า selectedClass
        setData(prevData =>
            prevData.map(row => ({
                ...row,
                classId: value // อัพเดทค่า classId ของทุกแถวให้เป็นค่าเดียวกัน
            }))
        );
    };


    const handleGenaratepdf = async () => {
        const session = await getSession();
        const response = await api.post(`${process.env.NEXT_PUBLIC_BASE_URL}/request-transfer/reportpdf`);
    };

    const isFormValid = data.some(row => row.classId !== undefined && row.selectedOffice !== undefined);


    const handleSaveRequest = async () => {
        const session = await getSession();
        const filteredData = data.filter(row => row.selectedOffice !== undefined);
        const requestData = {
            transferPeriodId: transferPeriod,
            data: filteredData.map(row => ({
            ...row,
            classId: row.classId 
        })),
            token: session?.accessToken,
        };
        try {
            setButtonLoading(true)
            const response = await api.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/request-transfer/save`,
                requestData
            );
            Swal.fire({
                icon: "success",
                title: "ส่งคำขอโยกย้ายสำเร็จ!",
                text: "คำขอโยกย้ายของคุณถูกบันทึกแล้ว",
                confirmButtonColor: "#4CAF50",
            });
            fetchDataRequest()
        } catch (error) {
            console.error("Error saving request:", error);
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


    if (loading) return <Skeleton active />;
    return (
        <div className="grid grid-rows-[auto,1fr] gap-2 overflow-hidden rounded-xl border">
            <div className="px-7 py-2 bg-[#4868AC] text-white text-lg inline-flex items-center gap-2">
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
                    <CurrenInfoBtn className="text-white bg-[#4868AC] hover:bg-[#5A7EC4] transition-colors duration-200 rounded-xl"
                        label="พิมพ์คำขอ"
                        height={40}
                        type="button"
                        icon={<FaSave />}
                        onClick={handleGenaratepdf}
                    />
                    <div className="text-red-600">** กรุณากรอกประวัติการรับราชการในสำนักงานอัยการสูงสุดก่อนทำการพิมพ์คำขอ</div>
                </div>

                <div className="border border-gray-100">
                    <table className="w-full bg-white min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border border-gray-100 w-1/12 whitespace-nowrap">ลำดับ</th>
                                <th className="px-4 py-2 border border-gray-100 w-9/12">ต้องการย้ายไป/เหตุผล</th>
                                <th className="px-4 py-2 border border-gray-100 w-2/12">ชั้น</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.id} className="text-start">
                                    <td className="px-4 py-2 border border-gray-100 w-1/12 whitespace-nowrap text-center">{row.id}</td>
                                    <td className="px-4 py-2 border border-gray-100 w-9/12">
                                        <RequestInfoSelect
                                            IsSearch={true}
                                            name={`targetOffice-${row.id}`}
                                            placeholder="--เลือกสำนักงาน--"
                                            value={row.selectedOffice}  // ใช้ค่า selectedOffice ของแถวนี้
                                            onChange={(name, value) => handleChange(row.id, 'selectedOffice', value)}  // อัพเดทค่า selectedOffice เฉพาะแถวนี้
                                            className="w-full"
                                            height={40}
                                            disable={disable}
                                            options={dataOffice.map(office => ({
                                                value: office.id,
                                                label: office.name
                                            }))}
                                        />
                                        <div className="text-sm flex py-1 pt-3">เหตุผลการขอย้าย: <span className="text-red-600">(ไม่เกิน 100 ตัวอักษร)</span></div>
                                        <CurrentInfoInput
                                            name={`reason-${row.id}`}
                                            placeholder="กรอกเหตุผล"
                                            type="text"
                                            disable={disable}
                                            maxLength={100}
                                            value={row.reason}
                                            onChange={(name, value) => handleChange(row.id, 'reason', value)}
                                        />
                                    </td>
                                    <td className="px-4 py-2 border border-gray-100 w-2/12 whitespace-nowrap text-center">
                                        <CurrenInfoSelect
                                            IsSearch={true}
                                            name={`class-${row.id}`}
                                            placeholder="--เลือกชั้น--"
                                            value={row.classId}  // ใช้ค่า classId ของแถวนี้
                                            onChange={(name, value) => handleClassChange(Number(value))}
                                            className="w-full"
                                            height={40}
                                            disable={disable}
                                            options={classOptions}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center">
                    <CurrenInfoBtn className="text-white bg-[#4868AC] hover:bg-[#5A7EC4] transition-colors duration-200 rounded-xl"
                        label={ButtonLoading ? "กำลังบันทึก..." : "บันทึกคำข้อโยกย้าย"}
                        height={40}
                        type="button"
                        icon={<FaSave />}
                        onClick={handleSaveRequest}
                        disable={ButtonLoading || transferPeriod === null || !isFormValid}
                    />
                </div>
            </div>
        </div>
    )
}

export default RequestInfo;
