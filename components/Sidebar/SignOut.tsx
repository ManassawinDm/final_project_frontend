"use client";

import React from "react";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  isCollapsed: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ isCollapsed }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <a
      href="#"
      onClick={(e) => { 
        e.preventDefault();
        handleLogout();
      }}
      className="flex items-center text-red-500 gap-4 py-2 px-4 rounded hover:bg-gray-700 transition"
    >
      <FiLogOut size={24} />
      {!isCollapsed && <span>ออกจากระบบ</span>}
    </a>
  );
};

export default LogoutButton;