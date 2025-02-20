import React from 'react'
import TablesResult from '@/components/ResultProccess/Table'
import BtnSearch from '@/components/UserList/BtnSearch'
import InputUsers from '@/components/UserList/InputUsers'
import { Button } from "@/components/ui/button";

const ResultProccess = () => {
    return (
        <div className=" min-h-screen flex justify-center py-8">
            <div className="bg-white w-[98%] rounded-xl shadow-lg overflow-hidden">
                <div className="text-2xl px-8 py-5">
                    <p className="text-gray-700 font-bold">ผลลัพธ์การประมวลผล</p>
                </div>
                <div className="grid grid-row-3 w-full p-4 gap-y-5">
                    <div className="p-1">
                        <div className="flex flex-col md:flex-row justify-center text-gray-700 space-y-2 md:space-y-0 md:space-x-2">
                            <Button className="w-full md:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                                ดูทั้งหมด
                            </Button>
                            <Button className="w-full md:w-auto px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg">
                                ดูผู้ที่โยกย้ายสำเร็จ
                            </Button>
                            <Button className="w-full md:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                                ดูผู้ที่โยกย้ายไม่สำเร็จ
                            </Button>
                            <Button className="w-full md:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                                ดูมุมมองสำนักงาน
                            </Button>
                        </div>
                        <div className="p-5">
                            <div className="border border-gray-300">
                                <TablesResult />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="px-5">
                                <Button className="w-full md:w-auto px-6 py-5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                                    บันทึกข้อมูล
                                </Button>
                            </div>
                            <div className="px-5">
                                <Button className="w-full md:w-auto px-6 py-5 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                                    ยกเลิกการประมวลผล
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultProccess