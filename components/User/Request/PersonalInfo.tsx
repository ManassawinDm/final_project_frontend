"use client"
import React, { useState } from 'react'
import { Radio } from 'antd';
import { RiFolderUserFill } from "react-icons/ri";
import CurrenInfoBtn from './Button/CurrenInfoBtn';
import { FaEdit } from "react-icons/fa";
import CurrenInfoSelect from './Input/CurrenInfoSelect';
import RadioBtn from './Button/RadioBtn';
import CurrentInfoInput from './Input/CurrentInfoInput';
import Calender from './Calender/Calender';
import { FaSave } from "react-icons/fa";
import { responseType } from '@/components/ResultProccess/DetailUser/responseType';

interface IPersonalInfo{
    disable:boolean;
    data?: responseType[]
}

const optionsStatus = [
    { value: "โสด", label: "โสด" },
    { value: "สมรส", label: "สมรส" },
    { value: "หย่าร้าง", label: "หย่าร้าง" },
    { value: "เเยกกันอยู่", label: "เเยกกันอยู่" },
]

const optionsAddress = [
    { value: "บ้านของตนเอง", label: "บ้านของตนเอง" },
    { value: "บ้านพักของทางราชการ", label: "บ้านพักของทางราชการ" },
    { value: "บ้านเช่า", label: "บ้านเช่า" },
    { value: "บ้านที่อาศัยผู้อื่น", label: "บ้านที่อาศัยผู้อื่น" },
]

const PersonalInfo = (props:IPersonalInfo) => {
    const { disable, data } = props;

    if (!data || data.length === 0) return null;

    const userData = data[0]; 

    const [selectedStatus, setSelectedStatus] = useState("โสด");
    const [selectedAddress, setSelectedAddress] = useState("บ้านของตนเอง");
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const handleClick = () => {
        setIsVisible(!isVisible);
    };
    const handleRadioChangeStatus = (value: string) => {
        setSelectedStatus(value);
    };
    const handleRadioChangeAdress = (value: string) => {
        setSelectedAddress(value);
    };
    const handleDateChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        console.log("ข้อมูลที่เลือก:", { ...formData, [name]: value });
    };

    return (
        <div className="grid grid-rows-[auto,1fr] gap-2 overflow-hidden rounded-xl border">
            <div className="px-7 py-2 bg-[#1677FF] text-white text-lg inline-flex items-center gap-2">
                <RiFolderUserFill />
                สถานะทางครอบครัว/ประวัติการรับราชการในสำนักงานอัยการสูงสุด
            </div>

            <div className="px-7 py-2">
                <div className="grid gap-4">
                    <div className="text-md">
                        <p className="text-red-500">
                            *** กรุณากรอกข้อมูลให้ครบถ้วน เพื่อประโยชน์ในการพิจารณา ***
                        </p>
                        <p className="text-gray-800">
                            แก้ไขข้อมูลสถานะทางครอบครัว/ประวัติการรับราชการในสำนักงานอัยการสูงสุด
                        </p>
                    </div>

                    <div className="py-2">
                        <CurrenInfoBtn
                            className="text-white bg-[#1677FF] hover:bg-[#1A8CFF] transition-colors duration-200 rounded-xl"
                            label="แก้ไขข้อมูลสถานะทางครอบครัว/ประวัติการรับราชการในสำนักงานอัยการสูงสุด - คลิกที่นี่"
                            height={40}
                            type="button"
                            icon={<FaEdit />}
                            onClick={handleClick}
                        />
                    </div>

                    {isVisible && (
                        <div className="grid gap-2 text-md text-gray-800 p-4 rounded-lg">
                            <div className="flex items-center font-bold">
                                <RiFolderUserFill className="mr-2" />
                                สถานะทางครอบครัว
                            </div>
                            <div className="grid grid-rows-17 gap-5">
                                <div className="flex flex-col">
                                    จังหวัดภูมิลำเนาเดิม :
                                    <CurrenInfoSelect name="homeProvince" IsSearch={false} placeholder="--เลือก--" width={800} height={40} disable={disable} 
                                    value={userData.home_province || ""}
                                    />
                                </div>
                                <div className="flex">สถานะปัจจุบัน : <RadioBtn className="px-3" name="currentStatus" options={optionsStatus} onChange={handleRadioChangeStatus} selectedValue={selectedStatus} disable={disable} /></div>
                                <div className="flex items-center gap-x-7">
                                    <span className="whitespace-nowrap">ปัจจุบันพักอาศัยอยู่ ณ</span>
                                    <div className="flex flex-col">
                                        <span>บ้านเลขที่ :</span>
                                        <CurrentInfoInput name="houseNumber" placeholder="บ้านเลขที่" type="text" height={40} width={300} disable={disable} 
                                        value={userData.house_number || ""}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span>หมู่ที่ :</span>
                                        <CurrentInfoInput name="villageNumber" placeholder="หมู่ที่" type="text" height={40} width={300} disable={disable} 
                                        value={userData.village_number || ""}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span>ตรอกซอย :</span>
                                        <CurrentInfoInput name="soi" placeholder="ตรอกซอย" type="text" height={40} width={300} disable={disable} 
                                        value={userData.alley_soi || ""}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span>ถนน :</span>
                                        <CurrentInfoInput name="road" placeholder="ถนน" type="text" height={40} width={300} disable={disable} 
                                        value={userData.street || ""}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-x-10">
                                    <div className="flex flex-col">
                                        จังหวัด :
                                        <CurrenInfoSelect name="province" IsSearch={false} placeholder="--เลือก--" width={800} height={40} disable={disable} 
                                        value={userData.province || ""}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        อำเภอ/เขต :
                                        <CurrenInfoSelect name="district" IsSearch={false} placeholder="--เลือก--" width={800} height={40} disable={disable} 
                                        value={userData.district || ""}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-x-10">
                                    <div className="flex flex-col">
                                        ตำบล/แขวง :
                                        <CurrenInfoSelect name="subDistrict" IsSearch={false} placeholder="--เลือก--" width={800} height={40} disable={disable} 
                                        value={userData.subdistrict || ""}
                                        />
                                    </div>
                                    <div className="flex flex-col">

                                        รหัสไปรษณีย์ :
                                        <CurrenInfoSelect name="postalCode" IsSearch={false} placeholder="--เลือก--" width={800} height={40} disable={disable} 
                                        value={userData.postal_code || ""}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    โทรศัพท์ :
                                    <CurrentInfoInput name="phoneNumber" type="text" placeholder="โทรศัพท์" width={800} height={40} disable={disable} 
                                    value={userData.phone_number || ""}
                                    />
                                </div>
                                <div className="flex">
                                    <div className="flex">ที่อยู่ที่ระบุเป็น : <RadioBtn className="px-3" name="Address" options={optionsAddress} onChange={handleRadioChangeAdress} selectedValue={selectedAddress} disable={disable}/></div>
                                </div>
                                <div className="flex items-center gap-x-7 py-3">
                                    <span className="whitespace-nowrap">สามี/ภรรยาของข้าพเจ้าชื่อ </span>
                                    <div className="flex flex-col">
                                        <span>ชื่อสามี/ภรรยา :</span>
                                        <CurrentInfoInput name="spouseName" placeholder="ชื่อสามี/ภรรยา" type="text" height={40} width={300} disable={disable} 
                                        value={userData.spouse_name || ""}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span>สถานที่ทำงาน :</span>
                                        <CurrentInfoInput name="spouseOffice" placeholder="สถานที่ทำงาน" type="text" height={40} width={300} disable={disable} 
                                        value={userData.spouse_office || ""}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-7">
                                    <span className="whitespace-nowrap">ปัจจุบันพักอาศัยอยู่ ณ</span>
                                    <div className="flex flex-col">
                                        <span>บ้านเลขที่ :</span>
                                        <CurrentInfoInput name="spouseHouseNumber" placeholder="บ้านเลขที่" type="text" height={40} width={300} disable={disable} 
                                        value={userData.spouse_house_number || ""}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span>หมู่ที่ :</span>
                                        <CurrentInfoInput name="spouseVillageNumber" placeholder="หมู่ที่" type="text" height={40} width={300} disable={disable} 
                                        value={userData.spouse_village_number || ""}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span>ตรอกซอย :</span>
                                        <CurrentInfoInput name="spouseSoi" placeholder="ตรอกซอย" type="text" height={40} width={300} disable={disable} 
                                        value={userData.spouse_alley_soi || ""}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span>ถนน :</span>
                                        <CurrentInfoInput name="spouseRoad" placeholder="ถนน" type="text" height={40} width={300} disable={disable} 
                                        value={userData.spouse_street || ""}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-x-10">
                                    <div className="flex flex-col">
                                        จังหวัด :
                                        <CurrenInfoSelect name="spouseProvince" IsSearch={false} placeholder="--เลือก--" width={800} height={40} disable={disable} 
                                        value={userData.spouse_province || ""}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        อำเภอ/เขต :
                                        <CurrenInfoSelect name="spouseDistrict" IsSearch={false} placeholder="--เลือก--" width={800} height={40} disable={disable} 
                                        value={userData.spouse_district || ""}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-x-10">
                                    <div className="flex flex-col">
                                        ตำบล/แขวง :
                                        <CurrenInfoSelect name="spouseSubDistrict" IsSearch={false} placeholder="--เลือก--" width={800} height={40} disable={disable} 
                                        value={userData.spouse_subdistrict || ""}
                                        />
                                    </div>
                                    <div className="flex flex-col">

                                        รหัสไปรษณีย์ :
                                        <CurrenInfoSelect name="spousePostalCode" IsSearch={false} placeholder="--เลือก--" width={800} height={40} disable={disable} 
                                        value={userData.spouse_postal_code || ""}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    โทรศัพท์ :
                                    <CurrentInfoInput name="spousePhoneNumber" type="text" placeholder="โทรศัพท์" width={800} height={40} disable={disable} 
                                    value={userData.spouse_phone_number || ""}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center font-bold">
                                        <RiFolderUserFill className="mr-2" />
                                        <span>ประวัติการรับราชการในสำนักงานอัยการสูงสุด</span>
                                    </div>
                                    <div>ข้าพเจ้าเคยรับราชการประจำกอง และ/หรือ สำนักงานดังนี้ <span className="underline">(กรุณากรอกข้อมูลให้ครบถ้วน)</span></div>
                                </div>
                                <div className="flex items-center gap-x-7 py-3">
                                    <span className="whitespace-nowrap">1.</span>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">สำนักงาน :</span>
                                        <CurrentInfoInput
                                            name="work_history"
                                            placeholder="สถานที่ทำงาน"
                                            type="text"
                                            height={40}
                                            width={400}
                                            disable={disable}
                                            value={userData.work_history || ""}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ตั้งเเต่ :</span>
                                        <Calender name="work_history_startDate" placeholder="เลือกวันที่" onChange={handleDateChange} height={40} width={200} disable={disable} 
                                        value={userData.work_history_startDate || ""}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ถึง :</span>
                                        <Calender name="work_history_endDate" placeholder="เลือกวันที่" onChange={handleDateChange} height={40} width={200} disable={disable} 
                                        value={userData.work_history_endDate || ""}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ตำแหน่ง :</span>
                                        <CurrentInfoInput
                                            name="work_history_position"
                                            placeholder="ตำแหน่ง"
                                            type="text"
                                            height={40}
                                            width={400}
                                            disable={disable}
                                            value={userData.work_history_position || ""}
                                        />
                                        <span className="text-red-600">***</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-7 py-3">
                                    <span className="whitespace-nowrap">2.</span>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">สำนักงาน :</span>
                                        <CurrentInfoInput
                                            name="work_history_two"
                                            placeholder="สถานที่ทำงาน"
                                            type="text"
                                            height={40}
                                            width={400}
                                            disable={disable}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ตั้งเเต่ :</span>
                                        <Calender name="work_history_startDate_two" placeholder="เลือกวันที่" onChange={handleDateChange} height={40} width={200} disable={disable} 
                                        value={userData.work_history_startDate_two || ""}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ถึง :</span>
                                        <Calender name="work_history_endDate_two" placeholder="เลือกวันที่" onChange={handleDateChange} height={40} width={200} disable={disable} 
                                        value={userData.work_history_endDate_two || ""}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ตำแหน่ง :</span>
                                        <CurrentInfoInput
                                            name="work_history_position_two"
                                            placeholder="สถานที่ทำงาน"
                                            type="text"
                                            height={40}
                                            width={400}
                                            disable={disable}
                                            value={userData.work_history_position_two || ""}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-7 py-3">
                                    <span className="whitespace-nowrap">3.</span>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">สำนักงาน :</span>
                                        <CurrentInfoInput
                                            name="work_history_three"
                                            placeholder="สถานที่ทำงาน"
                                            type="text"
                                            height={40}
                                            width={400}
                                            disable={disable}
                                            value={userData.work_history_position_three || ""}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ตั้งเเต่ :</span>
                                        <Calender name="work_history_startDate_three" placeholder="เลือกวันที่" onChange={handleDateChange} height={40} width={200} disable={disable} 
                                        value={userData.work_history_startDate_three || ""}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ถึง :</span>
                                        <Calender name="work_history_endDate_three" placeholder="เลือกวันที่" onChange={handleDateChange} height={40} width={200} disable={disable} 
                                        value={userData.work_history_endDate_three || ""}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ตำแหน่ง :</span>
                                        <CurrentInfoInput
                                            name="work_history_position_three"
                                            placeholder="สถานที่ทำงาน"
                                            type="text"
                                            height={40}
                                            width={400}
                                            disable={disable}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-start">
                                    <CurrenInfoBtn className="text-white bg-[#1677FF] hover:bg-[#1A8CFF] transition-colors duration-200 rounded-xl" label="บันทึกข้อมูลสถานะทางครอบครัว/ประวัติการรับราชการในสำนักงานอัยการสูงสุด" height={40} type="submit" icon={<FaSave />} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}

export default PersonalInfo