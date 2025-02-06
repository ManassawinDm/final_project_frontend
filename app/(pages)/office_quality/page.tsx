import React from 'react'
import TableOfficeQuality from '@/components/OfficeQuality/Table.'

const OfficeQuality
    = () => {
        return (
            <div className="min-h-screen h-auto flex justify-center py-8">
                <div className="bg-white w-[98%] rounded-xl shadow-lg overflow-hidden ">
                    <div className="text-2xl px-8 py-5">
                        <p className="text-gray-700 font-bold">อัตรากำลัง</p>
                    </div>
                    <div className="px-8">
                        <TableOfficeQuality />
                    </div>
                </div>
            </div>
        )
    }

export default OfficeQuality
