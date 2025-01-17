import React, { useState } from 'react';

const Setting = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
        onClick={toggleDropdown}
      >
        ตั้งค่า
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
          <a
            href="/users"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Users
          </a>
          <a
            href="/list"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            รายชื่อ
          </a>
        </div>
      )}
    </div>
  );
};

export default Setting;
