import React from "react";

type BtnLogin = {
  name: string;
  disabled?: boolean; // ✅ เพิ่มตัวเลือกปิดปุ่ม
};

const BtnLogin = ({ name, disabled }: BtnLogin) => {
  return (
    <button
      type="submit"
      className={`w-full p-4 mt-2 text-white uppercase font-semibold text-sm rounded-md transition-all duration-300 
        ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#4868AC] hover:bg-blue-600"}`}
      disabled={disabled} 
    >
      {name}
    </button>
  );
};

export default BtnLogin;
