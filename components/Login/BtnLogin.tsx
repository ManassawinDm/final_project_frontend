import React from 'react'

type BtnLogin={
    name:string
}

const BtnLogin = (props:BtnLogin) => {
    const {name} = props
    return (
        <>
            <button type="submit" className="w-full p-4 mt-2 bg-[#1677FF] text-white uppercase font-semibold text-sm rounded-md transition-all duration-300 hover:bg-blue-600 focus:outline-none">
                {name}
            </button>
        </>
    )
}

export default BtnLogin