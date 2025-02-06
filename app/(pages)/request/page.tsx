import React from 'react'
import TablesRequest from '@/components/Request/Table'
import CheckBoxAll from '@/components/Request/CheckBoxAll'
import CheckBox from '@/components/Request/CheckBox'
import BtnSearch from '@/components/Request/BtnSearch'

const Request = () => {
    return (
        <div className=" min-h-auto flex justify-center py-8">
            <div className="bg-white h-screen w-[98%] rounded-xl shadow-lg overflow-hidden">
                <div className="text-2xl px-8 py-5">
                    <p className="text-gray-700 font-bold">คำขอโยกย้าย ณ ตุลาคม 2567</p>
                </div>
                <div className="grid grid-row-2 w-full p-4 gap-y-5">
                    <div className="p-1">
                        <div className="flex flex-col md:flex-row justify-start text-gray-700">
                            <div className="flex flex-col px-5">
                                <div className="text-sm">
                                    <p className="font-light">ชื่อ<span className="text-red-500">*****</span></p>
                                </div>
                                <div className="py-1">
                                    <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded-lg text-md" />
                                </div>

                            </div>
                            <div className="flex flex-col px-5">
                                <div className="text-sm">
                                    <p className="font-light">เลขอาวุโส<span className="text-red-500">*****</span></p>
                                </div>
                                <div className="py-1">
                                    <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded-lg text-md" />
                                </div>
                            </div>
                            <div className="flex flex-row items-center px-3">
                                <div className="px-2">
                                    <CheckBoxAll />
                                </div>
                                <div>
                                    <p className="text-sm font-light">เเสดงทั้งหมด</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center px-3">
                                <div className="px-2">
                                    <CheckBox />
                                </div>
                                <div>
                                    <p className="text-sm font-light">แสดงรายการนำเข้าข้อมูลปี 2566 (Approximate Matching)</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center py-2 px-3">
                                <BtnSearch />
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="border border-gray-300">
                                <TablesRequest />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Request