"use client";
import React, { useState } from 'react';

const CheckBox: React.FC = () => {
  // สร้าง state สำหรับเก็บสถานะของ checkbox
  const [checked, setChecked] = useState(false);

  // ฟังก์ชันในการเปลี่ยนแปลงสถานะของ checkbox
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div>
      <label className="flex items-center space-x-2">
      <input 
          type="checkbox" 
          checked={checked} 
          onChange={handleChange} 
          className="w-4 h-4 rounded-full border-1 border-gray-200 bg-white checked:bg-[#1677FF] checked:border-[#1677FF] focus:ring-0 transition-all duration-300 ease-in-out" 
        />
      </label>
    </div>
  );
};

export default CheckBox;
