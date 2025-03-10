"use client"
import React, { useEffect, useState } from 'react'
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
import { optionsAddress, optionsStatus } from './Util';

interface IPersonalInfo {
    disable: boolean;
    data?: responseType[]
}

const PersonalInfo = (props: IPersonalInfo) => {
    const { disable, data } = props;

    if (!data || data.length === 0) return null;

    const userData = data[0];

    const [selectedStatus, setSelectedStatus] = useState("โสด");
    const [selectedAddress, setSelectedAddress] = useState("บ้านของตนเอง");
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        homeProvince : userData.home_province || "",
        relationship_status: userData.relationship_status || "โสด",
        addressType: userData.address_type || "บ้านของตนเอง",
        houseNumber: userData.house_number || "",
        villageNumber: userData.village_number || "",
        soi: userData.alley_soi || "",
        road: userData.street || "",
        province: userData.province || "",
        district: userData.district || "",
        subdistrict: userData.subdistrict || "",
        postalCode: userData.postal_code || "",
        phoneNumber: userData.phone_number || "",
        spouseName: userData.spouse_name || "",
        spouseOffice: userData.spouse_office || "",
        spouseHouseNumber: userData.spouse_house_number || "",
        spouseVillageNumber: userData.spouse_village_number || "",
        spouseSoi: userData.spouse_alley_soi || "",
        spouseRoad: userData.spouse_street || "",
        spouseProvince: userData.spouse_province || "",
        spouseDistrict: userData.spouse_district || "",
        spouseSubdistrict: userData.spouse_subdistrict || "",
        spousePostalCode: userData.spouse_postal_code || "",
        spousePhoneNumber: userData.spouse_phone_number || "",
        workHistory: userData.work_history || "",
        work_history_startDate: userData.work_history_startDate || "",
        work_history_endDate: userData.work_history_endDate || "",
        workHistoryPosition: userData.work_history_position || "",
        workHistory_two: userData.work_history_two || "",
        work_history_startDate_two: userData.work_history_startDate_two || "",
        work_history_endDate_two: userData.work_history_endDate_two || "",
        workHistoryPosition_two: userData.work_history_position_two || "",
        workHistory_three: userData.work_history_three || "",
        work_history_startDate_three: userData.work_history_startDate_three || "",
        work_history_endDate_three: userData.work_history_endDate_three || "",
        workHistoryPosition_three: userData.work_history_position_three || "",
    });

    const handleInputChange = (name: string, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };



    const handleClick = () => {
        setIsVisible(!isVisible);
    };
    const handleRadioChangeStatus = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            relationship_status: value, 
        }));
    };
    
    const handleRadioChangeAddress = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            addressType: value, // ✅ อัปเดต addressType ใน formData
        }));
    };
    
    const handleDateChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        console.log("ข้อมูลที่เลือก:", { ...formData, [name]: value });
    };



    const [locationData, setLocationData] = useState<any>({});
    const [provinces, setProvinces] = useState<string[]>([]);
    const [districts, setDistricts] = useState<string[]>([]);
    const [subdistricts, setSubdistricts] = useState<string[]>([]);

    // **ตั้งค่าจาก database ถ้ามีข้อมูล**
    const [selectedProvince, setSelectedProvince] = useState(userData.province || "");
    const [selectedDistrict, setSelectedDistrict] = useState(userData.district || "");
    const [selectedSubdistrict, setSelectedSubdistrict] = useState(userData.subdistrict || "");
    const [postalCode, setPostalCode] = useState(userData.postal_code || "");


    const [selectedSpouseProvince, setSelectedSpouseProvince] = useState(userData.spouse_province || "");
    const [selectedSpouseDistrict, setSelectedSpouseDistrict] = useState(userData.spouse_district || "");
    const [selectedSpouseSubdistrict, setSelectedSpouseSubdistrict] = useState(userData.spouse_subdistrict || "");
    const [spousePostalCode, setSpousePostalCode] = useState(userData.spouse_postal_code || "");

    const [spouseDistricts, setSpouseDistricts] = useState<string[]>([]);
    const [spouseSubdistricts, setSpouseSubdistricts] = useState<string[]>([]);


    useEffect(() => {
        fetch("/data/sorted_thai_location_data.json")
            .then((response) => response.json())
            .then((data) => {
                setLocationData(data);
                setProvinces(Object.keys(data));

                // โหลดอำเภอ และตำบล ตามค่าเริ่มต้นจาก database
                if (userData.province) {
                    setDistricts(Object.keys(data[userData.province] || {}));
                }
                if (userData.province && userData.district) {
                    setSubdistricts(Object.keys(data[userData.province][userData.district] || {}));
                }
            })
            .catch((error) => console.error("Error loading JSON:", error));
    }, [userData]); // โหลดใหม่ถ้า userData เปลี่ยน

    const handleHomeProvinceChange = (name: string, value: string | number) => {
        if (typeof value === "string") {
            setFormData((prev) => ({
                ...prev,
                homeProvince: value,  
            }));
        }
    };
    

    const handleProvinceChange = (name: string, value: string | number) => {
        if (typeof value === "string") {
            setFormData((prev) => ({
                ...prev,
                province: value,  
            }));
            setSelectedProvince(value);
            setSelectedDistrict("");
            setSelectedSubdistrict("");
            setPostalCode("");

            if (value) {
                setDistricts(Object.keys(locationData[value] || {}));
            } else {
                setDistricts([]);
            }
        }
    };

    const handleDistrictChange = (name: string, value: string | number) => {
        if (typeof value === "string") {
            setFormData((prev) => ({
                ...prev,
                district: value,  // ✅ บันทึกค่า district ลงใน formData
            }));
            setSelectedDistrict(value);
            setSelectedSubdistrict("");
            setPostalCode("");

            if (value) {
                setSubdistricts(Object.keys(locationData[selectedProvince][value] || {}));
            } else {
                setSubdistricts([]);
            }
        }
    };

    const handleSubdistrictChange = (name: string, value: string | number) => {
        if (typeof value === "string") {
            setFormData((prev) => ({
                ...prev,
                subdistrict: value,  // ✅ บันทึกค่า subdistrict ลงใน formData
            }));
            setSelectedSubdistrict(value);
            setPostalCode(locationData[selectedProvince][selectedDistrict][value] || "");
            setFormData((prev) => ({
                ...prev,
                postalCode: locationData[selectedProvince][selectedDistrict][value] || "",  
            }));
        }
    };



    const handleSpouseProvinceChange = (name: string, value: string | number) => {
        if (typeof value === "string") {
            setFormData((prev) => ({
                ...prev,
                spouseProvince: value,  // ✅ บันทึกค่า spouseProvince ลงใน formData
            }));
            setSelectedSpouseProvince(value);
            setSelectedSpouseDistrict("");
            setSelectedSpouseSubdistrict("");
            setSpousePostalCode("");

            if (value) {
                setSpouseDistricts(Object.keys(locationData[value] || {}));
            } else {
                setSpouseDistricts([]);
            }
        }
    };

    // **เมื่อเลือกอำเภอของ spouse -> โหลดตำบลที่เกี่ยวข้อง**
    const handleSpouseDistrictChange = (name: string, value: string | number) => {
        if (typeof value === "string") {
            setFormData((prev) => ({
                ...prev,
                spouseDistrict: value,  // ✅ บันทึกค่า spouseDistrict ลงใน formData
            }));
            setSelectedSpouseDistrict(value);
            setSelectedSpouseSubdistrict("");
            setSpousePostalCode("");

            if (value) {
                setSpouseSubdistricts(Object.keys(locationData[selectedSpouseProvince][value] || {}));
            } else {
                setSpouseSubdistricts([]);
            }
        }
    };

    // **เมื่อเลือกตำบลของ spouse -> โหลดรหัสไปรษณีย์ที่เกี่ยวข้อง**
    const handleSpouseSubdistrictChange = (name: string, value: string | number) => {
        if (typeof value === "string") {
            setFormData((prev) => ({
                ...prev,
                spouseSubdistrict: value,  // ✅ บันทึกค่า spouseSubdistrict ลงใน formData
            }));
            setSelectedSpouseSubdistrict(value);
            setSpousePostalCode(locationData[selectedSpouseProvince][selectedSpouseDistrict][value] || "");
            setFormData((prev) => ({
                ...prev,
                spousePostalCode: locationData[selectedSpouseProvince][selectedSpouseDistrict][value] || "",  
            }));
        }
    };

    const handleSave = () => {
        console.log("📌 ข้อมูลที่บันทึก:", formData);
    };





    return (
        <div className="grid grid-rows-[auto,1fr] gap-2 overflow-hidden rounded-xl border">
            <div className="px-7 py-2 bg-[#4868AC] text-white text-lg inline-flex items-center gap-2">
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
                            className="text-white bg-[#4868AC] hover:bg-[#5A7EC4] transition-colors duration-200 rounded-xl"
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
                                        options={provinces.map((province) => ({
                                            value: province, 
                                            label: province 
                                        }))} 
                                        value={formData.homeProvince} // ใช้ค่าใน formData
                                        onChange={handleHomeProvinceChange} // เรียกฟังก์ชันเมื่อมีการเปลี่ยนจังหวัด
                                    />
                                </div>
                                <div className="flex">สถานะปัจจุบัน : <RadioBtn className="px-3" name="currentStatus" options={optionsStatus} onChange={handleRadioChangeStatus} selectedValue={formData.relationship_status} disable={disable} /></div>
                                <div className="flex items-center gap-x-7">
                                    <span className="whitespace-nowrap">ปัจจุบันพักอาศัยอยู่ ณ</span>
                                    <div className="flex flex-col">
                                        <span>บ้านเลขที่ :</span>
                                        <CurrentInfoInput name="houseNumber" placeholder="บ้านเลขที่" type="text" height={40} width={300} disable={disable}
                                            value={formData.houseNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span>หมู่ที่ :</span>
                                        <CurrentInfoInput name="villageNumber" placeholder="หมู่ที่" type="text" height={40} width={300} disable={disable}
                                            value={formData.villageNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span>ตรอกซอย :</span>
                                        <CurrentInfoInput name="soi" placeholder="ตรอกซอย" type="text" height={40} width={300} disable={disable}
                                            value={formData.soi}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span>ถนน :</span>
                                        <CurrentInfoInput name="road" placeholder="ถนน" type="text" height={40} width={300} disable={disable}
                                            value={formData.road}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-x-10">
                                    <div className="flex flex-col">
                                        จังหวัด :
                                        <CurrenInfoSelect name="province" IsSearch={false} placeholder="--เลือก--" width={800} height={40} disable={disable}
                                            options={provinces.map((province) => ({ value: province, label: province }))}
                                            value={formData.province}
                                            onChange={handleProvinceChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        อำเภอ/เขต :
                                        <CurrenInfoSelect name="district" IsSearch={false} placeholder="--เลือก--" width={800} height={40}
                                            options={districts.map((district) => ({ value: district, label: district }))}
                                            value={formData.district}
                                            onChange={handleDistrictChange}
                                            disable={disable || !selectedProvince}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-x-10">
                                    <div className="flex flex-col">
                                        ตำบล/แขวง :
                                        <CurrenInfoSelect name="subDistrict" IsSearch={false} placeholder="--เลือก--" width={800} height={40}
                                            options={subdistricts.map((sub) => ({ value: sub, label: sub }))}
                                            value={formData.subdistrict}
                                            onChange={handleSubdistrictChange}
                                            disable={disable || !selectedDistrict}
                                        />
                                    </div>
                                    <div className="flex flex-col">

                                        รหัสไปรษณีย์ :
                                        <CurrenInfoSelect name="postalCode" IsSearch={false} placeholder="--เลือก--" width={800} height={40} disable={disable || !formData.subdistrict}
                                            value={postalCode}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    โทรศัพท์ :
                                    <CurrentInfoInput name="phoneNumber" type="text" placeholder="โทรศัพท์" width={800} height={40} disable={disable}
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex">
                                    <div className="flex">ที่อยู่ที่ระบุเป็น : <RadioBtn className="px-3" name="Address" options={optionsAddress} onChange={handleRadioChangeAddress} selectedValue={formData.addressType} disable={disable} /></div>
                                </div>
                                <div className="flex items-center gap-x-7 py-3">
                                    <span className="whitespace-nowrap">สามี/ภรรยาของข้าพเจ้าชื่อ </span>
                                    <div className="flex flex-col">
                                        <span>ชื่อสามี/ภรรยา :</span>
                                        <CurrentInfoInput name="spouseName" placeholder="ชื่อสามี/ภรรยา" type="text" height={40} width={300} disable={disable}
                                            value={formData.spouseName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span>สถานที่ทำงาน :</span>
                                        <CurrentInfoInput name="spouseOffice" placeholder="สถานที่ทำงาน" type="text" height={40} width={300} disable={disable}
                                            value={formData.spouseOffice}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-7">
                                    <span className="whitespace-nowrap">ปัจจุบันพักอาศัยอยู่ ณ</span>
                                    <div className="flex flex-col">
                                        <span>บ้านเลขที่ :</span>
                                        <CurrentInfoInput name="spouseHouseNumber" placeholder="บ้านเลขที่" type="text" height={40} width={300} disable={disable}
                                            value={formData.spouseHouseNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span>หมู่ที่ :</span>
                                        <CurrentInfoInput name="spouseVillageNumber" placeholder="หมู่ที่" type="text" height={40} width={300} disable={disable}
                                            value={formData.spouseVillageNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span>ตรอกซอย :</span>
                                        <CurrentInfoInput name="spouseSoi" placeholder="ตรอกซอย" type="text" height={40} width={300} disable={disable}
                                            value={formData.spouseSoi}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span>ถนน :</span>
                                        <CurrentInfoInput name="spouseRoad" placeholder="ถนน" type="text" height={40} width={300} disable={disable}
                                            value={formData.spouseRoad}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-x-10">
                                    <div className="flex flex-col">
                                        จังหวัด :
                                        <CurrenInfoSelect name="spouseProvince" IsSearch={false} placeholder="--เลือก--" width={800} height={40} disable={disable}
                                            options={provinces.map((province) => ({ value: province, label: province }))}
                                            value={formData.spouseProvince}
                                            onChange={handleSpouseProvinceChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        อำเภอ/เขต :
                                        <CurrenInfoSelect name="spouseDistrict" IsSearch={false} placeholder="--เลือก--" width={800} height={40}
                                            disable={disable || !selectedSpouseProvince}
                                            options={spouseDistricts.map((district) => ({ value: district, label: district }))}
                                            value={formData.spouseDistrict}
                                            onChange={handleSpouseDistrictChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-x-10">
                                    <div className="flex flex-col">
                                        ตำบล/แขวง :
                                        <CurrenInfoSelect name="spouseSubDistrict" IsSearch={false} placeholder="--เลือก--" width={800} height={40}
                                            disable={disable || !selectedSpouseDistrict}
                                            options={spouseSubdistricts.map((sub) => ({ value: sub, label: sub }))}
                                            value={formData.spouseSubdistrict}
                                            onChange={handleSpouseSubdistrictChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">

                                        รหัสไปรษณีย์ :
                                        <CurrenInfoSelect name="spousePostalCode" IsSearch={false} placeholder="--เลือก--" width={800} height={40} disable={disable || !formData.spouseSubdistrict}
                                            value={formData.spousePostalCode}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    โทรศัพท์ :
                                    <CurrentInfoInput name="spousePhoneNumber" type="text" placeholder="โทรศัพท์" width={800} height={40} disable={disable}
                                        value={formData.spousePhoneNumber}
                                        onChange={handleInputChange}
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
                                            name="workHistory"
                                            placeholder="สถานที่ทำงาน"
                                            type="text"
                                            height={40}
                                            width={400}
                                            disable={disable}
                                            value={formData.workHistory}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ตั้งเเต่ :</span>
                                        <Calender name="work_history_startDate" placeholder="เลือกวันที่" onChange={handleDateChange} height={40} width={200} disable={disable}
                                            value={formData.work_history_startDate}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ถึง :</span>
                                        <Calender name="work_history_endDate" placeholder="เลือกวันที่" onChange={handleDateChange} height={40} width={200} disable={disable}
                                            value={formData.work_history_endDate}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ตำแหน่ง :</span>
                                        <CurrentInfoInput
                                            name="workHistoryPosition"
                                            placeholder="ตำแหน่ง"
                                            type="text"
                                            height={40}
                                            width={400}
                                            disable={disable}
                                            value={formData.workHistoryPosition}
                                            onChange={handleInputChange}
                                        />
                                        <span className="text-red-600">***</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-7 py-3">
                                    <span className="whitespace-nowrap">2.</span>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">สำนักงาน :</span>
                                        <CurrentInfoInput
                                            name="workHistory_two"
                                            placeholder="สถานที่ทำงาน"
                                            type="text"
                                            height={40}
                                            width={400}
                                            disable={disable}
                                            value={formData.workHistory_two}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ตั้งเเต่ :</span>
                                        <Calender name="work_history_startDate_two" placeholder="เลือกวันที่" onChange={handleDateChange} height={40} width={200} disable={disable}
                                            value={formData.work_history_startDate_two}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ถึง :</span>
                                        <Calender name="work_history_endDate_two" placeholder="เลือกวันที่" onChange={handleDateChange} height={40} width={200} disable={disable}
                                            value={formData.work_history_endDate_two}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ตำแหน่ง :</span>
                                        <CurrentInfoInput
                                            name="workHistoryPosition_two"
                                            placeholder="สถานที่ทำงาน"
                                            type="text"
                                            height={40}
                                            width={400}
                                            disable={disable}
                                            value={formData.workHistoryPosition_two}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-7 py-3">
                                    <span className="whitespace-nowrap">3.</span>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">สำนักงาน :</span>
                                        <CurrentInfoInput
                                            name="workHistory_three"
                                            placeholder="สถานที่ทำงาน"
                                            type="text"
                                            height={40}
                                            width={400}
                                            disable={disable}
                                            value={formData.workHistory_three}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ตั้งเเต่ :</span>
                                        <Calender name="work_history_startDate_three" placeholder="เลือกวันที่" onChange={handleDateChange} height={40} width={200} disable={disable}
                                            value={formData.work_history_startDate_three}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ถึง :</span>
                                        <Calender name="work_history_endDate_three" placeholder="เลือกวันที่" onChange={handleDateChange} height={40} width={200} disable={disable}
                                            value={formData.work_history_endDate_three}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <span className="whitespace-nowrap">ตำแหน่ง :</span>
                                        <CurrentInfoInput
                                            name="workHistoryPosition_three"
                                            placeholder="สถานที่ทำงาน"
                                            type="text"
                                            height={40}
                                            width={400}
                                            disable={disable}
                                            value={formData.workHistoryPosition_three}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-start">
                                    <CurrenInfoBtn className="text-white bg-[#4868AC] hover:bg-[#5A7EC4] transition-colors duration-200 rounded-xl"
                                        label="บันทึกข้อมูลสถานะทางครอบครัว/ประวัติการรับราชการในสำนักงานอัยการสูงสุด"
                                        height={40}
                                        type="submit"
                                        icon={<FaSave />}
                                        onClick={handleSave}
                                    />
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