import React from "react";
import TablesRequest from "@/components/Request/Table";

const Request = () => {
    return (
        <div className="min-h-screen flex justify-center py-8">
            <div className="bg-white min-h-screen w-[98%] rounded-xl shadow-lg overflow-auto flex flex-col">
                <div className="bg-[#4868AC] text-2xl px-8 py-5">
                    <p className="text-white font-bold">คำขอโยกย้าย ณ ตุลาคม 2567</p>
                </div>
                <div className="p-5 flex-grow h-full">
                    <div className="border border-gray-300">
                        <TablesRequest />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Request;
