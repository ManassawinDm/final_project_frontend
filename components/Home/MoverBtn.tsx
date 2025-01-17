import React from "react";

const MoverBtn = () => {
    return (
        <button className="group relative inline-flex items-center border-none bg-none cursor-pointer">
            <span className="pb-1.5 pr-4 text-sm uppercase tracking-normal relative text-[#1677FF] font-light after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-black after:bottom-0 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left inline-block">
                ดูรายละเอียด
            </span>
        </button>
    );
};

export default MoverBtn;
