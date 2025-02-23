import React from "react";
import { Input } from "antd";

interface ICurrentInfoInput {
    name: string;
    placeholder: string;
    height?: number | string;
    width?: number | string;
    min?: number;
    type: string;
    onChange?: (name: string, value: string) => void;
    className?: string;
}

const CurrentInfoInput = (props: ICurrentInfoInput) => {
    const { placeholder, width, min, type, height, name, onChange ,className} = props
    return (
        <div>
            <Input
                name={name}
                type={type}
                placeholder={placeholder}
                min={min}
                style={{ width, height, }}
                onChange={(e) => onChange?.(name, e.target.value)}
                className={className}
            />
        </div>
    );
};

export default CurrentInfoInput;
