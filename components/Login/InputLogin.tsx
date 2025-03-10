import React from "react";

type InputLogin = {
  name: string;
  placeholder: string;
  type: string;
  icon: React.ReactNode;
  value: string; // ✅ เพิ่ม value เพื่อให้ Form ควบคุมค่าได้
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // ✅ เพิ่ม onChange
};

const InputLogin = ({ name, placeholder, icon, type, value, onChange }: InputLogin) => {
  return (
    <div className="relative mb-4">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        {icon}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value} // ✅ ควบคุมค่า input
        onChange={onChange} // ✅ จัดการการเปลี่ยนค่า
        className="w-full p-4 pl-10 bg-gray-200 border-0 rounded-md text-sm"
      />
    </div>
  );
};

export default InputLogin;
