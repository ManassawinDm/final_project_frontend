import Link from 'next/link';
import React from 'react'

type InputLogin ={
  name:string
  placeholder:string
  type:string
  icon:React.ReactNode
}

const InputLogin = (props:InputLogin) => {
  const {name,placeholder,icon,type} = props
  return (
    <>
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </span>
          <input name = {name} type={type} placeholder={placeholder} className="w-full p-4 pl-10 bg-gray-200 border-0 rounded-md text-sm" />
        </div>
    </>


  )
}

export default InputLogin