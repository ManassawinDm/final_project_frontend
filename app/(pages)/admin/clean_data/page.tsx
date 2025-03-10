import React from 'react'
import { ImDatabase } from "react-icons/im";

const page = () => {
    return (
        <div className=" min-h-screen flex justify-center py-8">
            <div className="bg-white w-[98%] rounded-xl shadow-lg overflow-hidden">
                <div className="grid [20%_80%] ">
                    <div className="flex items-center text-white bg-[#4868AC] text-xl px-10 py-5 shadow-lg">
                        <ImDatabase className="text-xl" />
                        <p className="font-bold ml-2 ">Clean Data</p>
                    </div>
                    <div className="py-3">
                        {/* <MergeAllConfigDate /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page