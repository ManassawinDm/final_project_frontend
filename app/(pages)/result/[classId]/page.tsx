import React from "react";
import TablesResult from "@/components/ResultProccess/Table";
import { GrSettingsOption } from "react-icons/gr";

const ResultProccess = () => {
  return (
    <div className="min-h-screen flex justify-center py-8">
      <div className="bg-white w-[98%] rounded-xl shadow-lg overflow-hidden">
        <div className="text-2xl px-8 py-5 flex items-center gap-2">
          <GrSettingsOption className="text-gray-700" />
          <p className="text-gray-700 font-bold">ผลลัพธ์การประมวลผล</p>
        </div>
        <div className="p-5">
          <TablesResult />
        </div>
      </div>
    </div>
  );
};

export default ResultProccess;
