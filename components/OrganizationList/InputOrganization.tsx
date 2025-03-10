import React from 'react'

type InputOrganization = {
    title: string
    name: string
    type?: string
    value?: string;
    placeholder:string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputOrganization = (props:InputOrganization) => {
    const {title, name, type,onChange,value,placeholder} = props
    return (
        <>
            <div className="text-sm">
                <p className="font-light">{title}</p>
            </div>
            <div className="py-1">
                <input placeholder={placeholder} type={type} name={name} value={value} onChange={onChange} className="w-[500px] h-10 px-1 border border-gray-300 rounded-lg text-md" />
            </div>
        </>
    )
}

export default InputOrganization