"use client"

import React, { useState } from "react";
import { FiHome, FiUser, FiSettings, FiLogOut, FiMenu, FiX } from "react-icons/fi"; // ใช้ react-icons
import { Cpu } from 'lucide-react';


import Logo from "./Logo";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div
            className={`${isCollapsed ? "w-20" : "w-64"
                } h-screen bg-gray-800 text-white flex flex-col transition-all duration-300`}
        >
            {/* Header */}
            <div
                className="p-4 flex items-center justify-between border-b border-gray-700 cursor-pointer"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {!isCollapsed && (
                    <span className="text-2xl font-bold"> <Logo /> </span>
                )}
                <button
                    className={`p-2 rounded ${isCollapsed ? "text-gray-400 hover:text-white" : ""
                        }`}
                >
                    {isCollapsed ? <FiMenu size={24} /> : <FiX size={24} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-grow p-4">
                <ul className="space-y-4">
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 transition"
                        >
                            <FiHome size={24} />
                            {!isCollapsed && <span>หน้าหลัก</span>}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 transition"
                        >
                            <FiUser size={24} />
                            {!isCollapsed && <span>คำขอโยกย้าย</span>}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 transition"
                        >
                            <FiSettings size={24} />
                            {!isCollapsed && <span>ตั้งค่า</span>}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 transition"
                        >
                            <Cpu size={24} />
                            {!isCollapsed && <span>ประมวลผลการโยกย้าย</span>}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center text-red-500 gap-4 py-2 px-4 rounded hover:bg-gray-700 transition"
                        >
                            <FiLogOut size={24} />
                            {!isCollapsed && <span>ออกจากระบบ</span>}
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Footer */}
            <div
                className={`flex justify-between p-4 text-sm border-t border-gray-700 ${isCollapsed ? "hidden" : ""
                    }`}
            >
                <div>&copy; 2025 My Company</div> 
            </div>
        </div>
    );
};

export default Sidebar;
