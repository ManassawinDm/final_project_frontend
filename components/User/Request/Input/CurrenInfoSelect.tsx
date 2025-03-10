import React from 'react';
import { Select } from "antd";

interface ICurrenInfoSelect {
    name: string;
    value?: string | number;
    className?: string;
    placeholder?: string;
    width?: number | string;
    height?: number | string;
    options?: { value: string | number; label: string }[];
    IsSearch: boolean;
    disable?: boolean;
    required?: boolean;
    onChange?: (name: string , value: string | number) => void;
}

const CurrenInfoSelect = ({ placeholder, width, options, IsSearch, height, onChange, name, value, className, disable ,required}: ICurrenInfoSelect) => {
    


    
    return (
        <div>
            <Select
                showSearch={IsSearch}
                placeholder={placeholder}
                disabled={disable}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option?.label.toLowerCase().includes(input.toLowerCase()) ?? false
                }
                style={{ width, height }}
                options={options}
                value={value}
                onChange={(selectedValue) => {
                    if (onChange) {
                        onChange(name, selectedValue); 
                    }
                }}
                className={className}
            />
            {required && !value && <p style={{ color: "red", fontSize: "12px" }}>กรุณาเลือกข้อมูล</p>} 
        </div>
    );
};

export default CurrenInfoSelect;
