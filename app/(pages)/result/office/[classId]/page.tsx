import ViewPart from "@/components/ResultProccess/ViewOffice/Table";
import React from "react";
import { FaAddressCard } from "react-icons/fa";

const ResultProccess = () => {
  return (
    <div className="min-h-screen flex justify-center py-8">
      <div className="bg-white w-[98%] rounded-xl shadow-lg overflow-hidden">
      <div className="grid [20%_80%] ">
        <div className="flex items-center text-white bg-[#1677FF] text-2xl px-10 py-5 shadow-lg">
          <FaAddressCard />
          <p className="font-bold ml-2">มุมมองสำนักงาน</p>
        </div>
        <div className="p-5">
          <ViewPart />
        </div>
        </div>
      </div>
    </div>
  );
};

export default ResultProccess;
