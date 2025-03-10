import React from "react";
import TableOrganization from "@/components/OrganizationList/Table";

const Organizarion = () => {
    return (
        <div className="min-h-screen h-auto flex justify-center py-8">
            <div className="bg-white w-[98%] rounded-xl shadow-lg overflow-hidden">
                <div className="grid [20%_80%]">
                    <div className="text-2xl px-10 py-5 bg-[#4868AC] shadow-lg">
                        <p className="text-white font-bold">รายชื่อสำนักงาน</p>
                    </div>
                    <div className="p-4">
                        <TableOrganization />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Organizarion;
