import React from "react";
import { Input } from "antd";

interface ICurrentInfoInput {
    name: string;
    placeholder: string;
    height?: number | string;
    width?: number | string;
    min?: number;
    maxLength?: number;
    value?: string | number;
    type: string;
    disable?: boolean;
    required?: boolean;
    onChange?: (name: string, value: string) => void;
    className?: string;
}

const CurrentInfoInput = (props: ICurrentInfoInput) => {
    const { placeholder, width, min, type, height, name, onChange, className, disable, maxLength, value, required } = props
    return (
        <div>
            <Input
                maxLength={maxLength}
                name={name}
                type={type}
                placeholder={placeholder}
                min={min}
                style={{ width, height, }}
                onChange={(e) => onChange?.(name, e.target.value)}
                className={className}
                disabled={disable}
                value={value}
                required={required}
            />
        </div>
    );
};

export default CurrentInfoInput;
