"use client";

import React, { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import CurrenInfoSelect from "../User/Request/Input/CurrenInfoSelect";
import CurrenInfoBtn from "../User/Request/Button/CurrenInfoBtn";

interface ProvinceOption {
  value: string;
  label: string;
}

const provinces: ProvinceOption[] = [
  { value: "กรุงเทพมหานคร", label: "กรุงเทพมหานคร" },
  { value: "กระบี่", label: "กระบี่" },
  { value: "กาญจนบุรี", label: "กาญจนบุรี" },
  { value: "กาฬสินธุ์", label: "กาฬสินธุ์" },
  { value: "กำแพงเพชร", label: "กำแพงเพชร" },
  { value: "ขอนแก่น", label: "ขอนแก่น" },
  { value: "จันทบุรี", label: "จันทบุรี" },
  { value: "ฉะเชิงเทรา", label: "ฉะเชิงเทรา" },
  { value: "ชลบุรี", label: "ชลบุรี" },
  { value: "ชัยนาท", label: "ชัยนาท" },
  { value: "ชัยภูมิ", label: "ชัยภูมิ" },
  { value: "ชุมพร", label: "ชุมพร" },
  { value: "เชียงราย", label: "เชียงราย" },
  { value: "เชียงใหม่", label: "เชียงใหม่" },
  { value: "ตรัง", label: "ตรัง" },
  { value: "ตราด", label: "ตราด" },
  { value: "ตาก", label: "ตาก" },
  { value: "นครนายก", label: "นครนายก" },
  { value: "นครปฐม", label: "นครปฐม" },
  { value: "นครพนม", label: "นครพนม" },
  { value: "นครราชสีมา", label: "นครราชสีมา" },
  { value: "นครศรีธรรมราช", label: "นครศรีธรรมราช" },
  { value: "นนทบุรี", label: "นนทบุรี" },
  { value: "นราธิวาส", label: "นราธิวาส" },
  { value: "น่าน", label: "น่าน" },
  { value: "บึงกาฬ", label: "บึงกาฬ" },
  { value: "บุรีรัมย์", label: "บุรีรัมย์" },
  { value: "ปทุมธานี", label: "ปทุมธานี" },
  { value: "ประจวบคีรีขันธ์", label: "ประจวบคีรีขันธ์" },
  { value: "ปัตตานี", label: "ปัตตานี" },
  { value: "พะเยา", label: "พะเยา" },
  { value: "พังงา", label: "พังงา" },
  { value: "พระนครศรีอยุธยา", label: "พระนครศรีอยุธยา" },
  { value: "พัทลุง", label: "พัทลุง" },
  { value: "พิจิตร", label: "พิจิตร" },
  { value: "พิษณุโลก", label: "พิษณุโลก" },
  { value: "เพชรบุรี", label: "เพชรบุรี" },
  { value: "เพชรบูรณ์", label: "เพชรบูรณ์" },
  { value: "แพร่", label: "แพร่" },
  { value: "ภูเก็ต", label: "ภูเก็ต" },
  { value: "มหาสารคาม", label: "มหาสารคาม" },
  { value: "มุกดาหาร", label: "มุกดาหาร" },
  { value: "ยะลา", label: "ยะลา" },
  { value: "ยโสธร", label: "ยโสธร" },
  { value: "ระนอง", label: "ระนอง" },
  { value: "ระยอง", label: "ระยอง" },
  { value: "ราชบุรี", label: "ราชบุรี" },
  { value: "ลพบุรี", label: "ลพบุรี" },
  { value: "ลำปาง", label: "ลำปาง" },
  { value: "ลำพูน", label: "ลำพูน" },
  { value: "เลย", label: "เลย" },
  { value: "ศรีสะเกษ", label: "ศรีสะเกษ" },
  { value: "สกลนคร", label: "สกลนคร" },
  { value: "สงขลา", label: "สงขลา" },
  { value: "สมุทรปราการ", label: "สมุทรปราการ" },
  { value: "สมุทรสงคราม", label: "สมุทรสงคราม" },
  { value: "สมุทรสาคร", label: "สมุทรสาคร" },
  { value: "สระแก้ว", label: "สระแก้ว" },
  { value: "สระบุรี", label: "สระบุรี" },
  { value: "สิงห์บุรี", label: "สิงห์บุรี" },
  { value: "สุโขทัย", label: "สุโขทัย" },
  { value: "สุพรรณบุรี", label: "สุพรรณบุรี" },
  { value: "สุราษฎร์ธานี", label: "สุราษฎร์ธานี" },
  { value: "สุรินทร์", label: "สุรินทร์" },
  { value: "สตูล", label: "สตูล" },
  { value: "หนองคาย", label: "หนองคาย" },
  { value: "หนองบัวลำภู", label: "หนองบัวลำภู" },
  { value: "อยุธยา", label: "อยุธยา" },
  { value: "อำนาจเจริญ", label: "อำนาจเจริญ" },
  { value: "อุดรธานี", label: "อุดรธานี" },
  { value: "อุตรดิตถ์", label: "อุตรดิตถ์" },
  { value: "อุบลราชธานี", label: "อุบลราชธานี" },
  { value: "อ่างทอง", label: "อ่างทอง" },
];

const Report = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>("");

  const handleProvinceChange = (name: string, value: string | number) => {
    setSelectedProvince(value.toString()); // แปลง value เป็น string ก่อนบันทึก
    console.log("Selected Province:", value);
  };

  return (
    <div className="grid grid-rows-[auto] gap-20 px-10 py-5">
      <div className="grid grid-rows-2 gap-6">
        <div className="flex flex-col gap-y-6 border p-5">
          <div className="flex items-center pb-2 border-b">
            <FaRegFilePdf className="text-xl" />
            <p className="ml-2 text-lg">1.1 รายงานคำขอโยกย้าย</p>
          </div>
          <div className="flex gap-x-5">
            <div className="flex gap-x-3">
              <p>จังหวัด</p>
              <div>
                <CurrenInfoSelect
                  IsSearch={false}
                  name="province"
                  options={provinces}
                  onChange={handleProvinceChange}
                  value={selectedProvince}
                  placeholder="--ระบุจังหวัด--"
                  width={200}
                />
              </div>
            </div>
            <div className="flex gap-x-3">
              <p>รายชั้น</p>
              <div>
                <CurrenInfoSelect
                  IsSearch={false}
                  name="province"
                  options={provinces}
                  onChange={handleProvinceChange}
                  value={selectedProvince || ""}
                  width={200}
                  placeholder="--ระบุชั้น--"
                />
              </div>
            </div>
            <div className="flex gap-x-3">
              <p>รูปเเบบ</p>
              <div>
                <CurrenInfoSelect
                  IsSearch={false}
                  name="province"
                  options={provinces}
                  onChange={handleProvinceChange}
                  value={selectedProvince || ""}
                  width={100}
                  placeholder="รูปเเบบ"
                />
              </div>
            </div>
            <div>
              <CurrenInfoBtn
                className="text-white bg-[#4868AC] hover:bg-[#1A8CFF] transition-colors duration-200 rounded-xl"
                label="ดูรายงาน"
                height={35}
                type="submit"
                icon={<FaRegFilePdf />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
