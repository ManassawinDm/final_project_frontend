import React from 'react'
import TableOrganization from '@/components/OrganizationList/Table'
import { BtnSearch,BtnImport } from '@/components/OrganizationList/BtnImport'
import InputOrganization from '@/components/OrganizationList/InputOrganization'
import { TfiImport } from "react-icons/tfi";
import { FiSearch } from "react-icons/fi"; 

const Organizarion = () => {
    return (
        <div className=" h-auto flex justify-center py-8">
            <div className="bg-white w-[98%] rounded-xl shadow-lg overflow-hidden ">
                <div className="text-2xl px-8 py-5">
                    <p className="text-gray-700 font-bold">รายชื่อสำนักงาน</p>
                </div>
                <div className="grid grid-row-3 w-full p-4 gap-y-5">
                    <div className="p-1">
                        <div className="flex flex-col md:flex-row justify-start text-gray-700">
                            <div className="flex flex-col px-5 pb-2">
                                <InputOrganization name="name" title="ชื่อ" type="text" />
                            </div>
                            <div className="flex flex-row items-end py-3 px-3">
                                <div className="items-end">
                                    <BtnSearch title="ค้นหาข้อมูล" icon=<FiSearch /> />
                                </div>
                            </div>
                        </div>
                        <div className="px-3 md:p-3">
                            <BtnImport title="นำเข้าข้อมูล" icon=<TfiImport /> />
                        </div>
                        <div className="p-5">
                            <div className="border border-gray-300">
                                <TableOrganization />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Organizarion