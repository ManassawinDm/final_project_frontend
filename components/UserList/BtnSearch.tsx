"use client";
import React from "react";
import { FiSearch } from "react-icons/fi"; 

const BtnSearch = () => {
    const handleClick = () => {
        console.log("ปุ่มค้นหาถูกคลิก!");
    };
    return (
        <button
        onClick={handleClick}
            className="cursor-pointer group relative flex items-center gap-1.5 px-3 py-2 bg-[#1677FF] bg-opacity-80 text-white rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md"
        >
            <FiSearch className="text-sm" />
            <span className="text-sm p-1 font-light">ค้นหาข้อมูล</span>
        </button>

    );
};

export default BtnSearch;
