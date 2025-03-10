import React from 'react'

type BtnImport = {
    icon:React.ReactNode
    title:string
    type?: "button" | "submit" | "reset"; 
    onClick?: () => void; 
}

type BtnSearch = {
    icon?:React.ReactNode
    title:string
    onClick: () => void; 
}

const BtnSearch = (props:BtnSearch) => {
    const {icon, title,onClick} = props
    return (
        <button
            className="cursor-pointer group relative flex items-center gap-1.5 px-3 py-2 bg-[#4868AC] bg-opacity-80 text-white rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md"
            onClick={onClick}
        >
            {icon}
            <span className="text-sm p-1 font-light">{title}</span>
        </button>
    );
};


const BtnImport = (props:BtnImport) => {
    const {icon, title,type,onClick} = props
    return (
        <button
            className="cursor-pointer group relative flex items-center gap-1.5 px-3 py-2 bg-[#E98800] bg-opacity-80 text-white rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md"
            type={type}
            onClick={onClick}
        >
            {icon}
            <span className="text-sm p-1 font-light">{title}</span>
        </button>
    )
}

export {BtnImport, BtnSearch} 