import React from 'react'
import TablesUser from '@/components/UserList/TableUser'
import BtnSearch from '@/components/UserList/BtnSearch'
import InputUsers from '@/components/UserList/InputUsers'

const UsersList = () => {
    return (
        <div className=" min-h-screen flex justify-center py-8">
            <div className="bg-white w-[98%] rounded-xl shadow-lg overflow-hidden">
                <div className="text-2xl px-8 py-5">
                    <p className="text-gray-700 font-bold">จัดการผู้ใช้</p>
                </div>
                <div className="grid grid-row-2 w-full p-4 gap-y-5">
                    <div className="p-1">
                        <div className="flex flex-col md:flex-row justify-start text-gray-700">
                            <div className="flex flex-col px-5 pb-2">
                                <InputUsers name="username" title="User Name" type="text" />
                            </div>
                            <div className="flex flex-col px-5 pb-2">
                                <InputUsers name="name" title="ชื่อ" type="text" />
                            </div>
                            <div className="flex flex-col px-5 pb-2">
                                <InputUsers name="phonenumber" title="เบอร์โทร" type="text" />
                            </div>
                            <div className="flex flex-row items-end py-3 px-3">
                                <div className="items-end">
                                    <BtnSearch />
                                </div>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="border border-gray-300">
                                <TablesUser />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersList