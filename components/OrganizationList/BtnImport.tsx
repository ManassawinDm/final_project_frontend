import React from 'react'

type BtnImport = {
    icon:React.ReactNode
    title:string
}

type BtnSearch = {
    icon:React.ReactNode
    title:string
}

const BtnSearch = (props:BtnSearch) => {
    const {icon, title} = props
    return (
        <button
            className="cursor-pointer group relative flex items-center gap-1.5 px-3 py-2 bg-[#1677FF] bg-opacity-80 text-white rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md"
        >
            {icon}
            <span className="text-sm p-1 font-light">{title}</span>
        </button>
    );
};


const BtnImport = (props:BtnImport) => {
    const {icon, title} = props
    return (
        <button
            className="cursor-pointer group relative flex items-center gap-1.5 px-3 py-2 bg-[#E98800] bg-opacity-80 text-white rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md"
        >
            {icon}
            <span className="text-sm p-1 font-light">{title}</span>
        </button>
    )
}

export {BtnImport, BtnSearch} 