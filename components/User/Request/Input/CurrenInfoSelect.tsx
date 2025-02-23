import React from 'react'
import { Select } from "antd";


interface ICurrenInfoSelect {
    name: string;
    value?: string;
    className?: string;
    placeholder?: string;
    width?: number | string;
    height?: number | string;
    options?: { value: string; label: string }[];
    IsSearch: boolean;
    onChange?: (name: string, value: string) => void;
}

const CurrenInfoSelect = (props: ICurrenInfoSelect) => {
    const { placeholder, width, options, IsSearch, height,onChange,name,value,className } = props
    return (
        <div>
            <Select
                showSearch={IsSearch}
                placeholder={placeholder}
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