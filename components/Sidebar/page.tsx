import React from "react";
import { FiHome, FiUser, FiSettings, FiLogOut, FiMenu, FiX } from "react-icons/fi"; // ใช้ react-icons
import { Cpu } from 'lucide-react';
import { FaChevronDown } from "react-icons/fa"; // นำเข้าไอคอน FaChevronDown
import { FiFile } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { AiOutlineSolution } from "react-icons/ai";
import { AiOutlineFileProtect } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AiTwotoneBank } from "react-icons/ai";
import Logo from "./Logo";
import LogoutButton from "./SignOut";

const Sidebar = ({
  isCollapsed,
  isSettingsOpen,
  onToggleCollapse,
  onToggleSettings,
}: {
  isCollapsed: boolean;
  isSettingsOpen: boolean;
  onToggleCollapse: () => void;
  onToggleSettings: () => void;
}) => {
  return (
    <div
      className={`${isCollapsed ? "w-20" : "w-64"} min-h-screen bg-[#1f3158] text-white flex flex-col transition-all duration-300 overflow-y-auto`}
    >
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between border-b border-gray-700 cursor-pointer"
        onClick={onToggleCollapse}
      >
        {!isCollapsed && (
          <span className="text-2xl font-bold"><Logo /></span>
        )}
        <button
          className={`p-2 rounded ${isCollapsed ? "text-gray-400 hover:text-white" : ""}`}
        >
          {isCollapsed ? <FiMenu size={24} /> : <FiX size={24} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow p-4">
        <ul className="space-y-4">
          {/* เมนูหลัก */}
          <li>
            <a
              href="/admin/dashboard"
              className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 transition"
            >
              <FiHome size={24} />
              {!isCollapsed && <span>หน้าหลัก</span>}
            </a>
          </li>

          <li>
            <a
              href="/admin/request"
              className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 transition"
            >
              <FiUser size={24} />
              {!isCollapsed && <span>คำขอโยกย้าย</span>}
            </a>
          </li>

          {/* เพิ่มเมนูใหม่ */}
          <li>
            <a
              href="#"
              className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 transition"
            >
              <AiOutlineFileProtect size={24} />
              {!isCollapsed && <span>ผลการโยกย้าย</span>}
            </a>
          </li>
          <li>
            <a
              href="/admin/report_list"
              className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 transition"
            >
              <FiFile size={24} />
              {!isCollapsed && <span>รายงาน</span>}
            </a>
          </li>
          <li>
            <a
              href="/admin/configdate"
              className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 transition"
            >
              <FiCalendar size={24} />
              {!isCollapsed && <span>กำหนดรอบ</span>}
            </a>
          </li>

          {/* "ตั้งค่า" เมนู */}
          <li>
            <a
              href="#"
              className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 transition"
              onClick={onToggleSettings}
            >
              <FiSettings size={24} />
              {!isCollapsed && <span>ตั้งค่า</span>}
              {/* ไอคอน Chevron ที่จะเลื่อนลงมา */}
              <FaChevronDown
                size={18}
                className={`${isSettingsOpen ? "transform rotate-180" : ""} ml-auto transition-transform duration-300`}
              />
            </a>
            {/* เมนูย่อยใน "ตั้งค่า" */}
            <div
              className={`pl-8 space-y-4 mt-2 transition-all duration-500 ease-in-out transform ${
                isSettingsOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <ul>
                <li>
                  <a
                    href="/admin/users_list"
                    className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 transition"
                  >
                    <FiUser size={24} />
                    <span>users</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/organization_list"
                    className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 transition"
                  >
                    <AiTwotoneBank size={24} />
                    <span>รายชื่อสำนักงาน</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/office_quality"
                    className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 transition"
                  >
                    <AiOutlineUsergroupAdd size={24} />
                    <span>อัตรากำลัง</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 transition"
                  >
                    <AiOutlineSolution size={24} />
                    <span>รายชื่ออัยการ</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li>
          <LogoutButton isCollapsed={isCollapsed} />
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div
        className={`flex justify-between p-4 text-sm border-t border-gray-700 ${isCollapsed ? "hidden" : ""}`}
      >
        <div>&copy; 2025 My Company</div>
      </div>
    </div>
  );
};

export default Sidebar;
