import React from 'react'

type InputUsers = {
    title: string
    name: string
    type: string
}

const InputUsers = (props: InputUsers) => {
    const { title, name, type } = props
    return (
        <>
            <div className="text-sm">
                <p className="font-light">{title}</p>
            </div>
            <div className="py-1">
                <input type={type} name={name} className="w-[300px] h-10 px-1 border border-gray-300 rounded-lg text-md" />
            </div>
        </>
    )
}

export default InputUsers