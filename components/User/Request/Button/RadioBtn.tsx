import React from 'react'

interface IRadioBtnProps {
    name: string; 
    options: { value: string; label: string }[]; 
    selectedValue?: string; 
    onChange?: (value: string) => void; 
    className?: string;
    disable?:boolean;
  }

const RadioBtn = (props:IRadioBtnProps) => {
    const {name,options,className,onChange,selectedValue,disable} = props;
    return (
        <div className={`flex flex-row gap-2 ${className}`}>
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => onChange?.(option.value)}
                className="hidden peer"
                disabled={disable}
              />
              <span className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all">
                {selectedValue === option.value && <span className="w-2.5 h-2.5 bg-white rounded-full"></span>}
              </span>
              <span className="text-gray-800">{option.label}</span>
            </label>
          ))}
        </div>
      );
}

export default RadioBtn