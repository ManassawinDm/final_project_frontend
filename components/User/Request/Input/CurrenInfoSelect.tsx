import React from 'react'
import { Select } from "antd";


interface ICurrenInfoSelect {
    name: string;
    value?: string | number;
    className?: string;
    placeholder?: string;
    width?: number | string;
    height?: number | string;
    options?: { value: string; label: string }[];
    IsSearch: boolean;
    disable?:boolean;
    onChange?: (name: string, value: string | number) => void;
}

const CurrenInfoSelect = (props: ICurrenInfoSelect) => {
    const { placeholder, width, options, IsSearch, height,onChange,name,value,className,disable } = props
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
                style={{ width, height, }}
                options={options}
                value={value}
                onChange={(value) => onChange?.(name, value)}
                className={className}
            />
        </div>
    )
}

export default CurrenInfoSelect