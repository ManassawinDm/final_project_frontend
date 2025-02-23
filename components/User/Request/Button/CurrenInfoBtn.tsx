import React from 'react'
import { Button } from "@/components/ui/button"

interface ICurrenInfoBtn {
    type: "button" | "submit" | "reset";
    label: string;
    width?: number
    height?: number
    onClick?: () => void;
    icon?: React.ReactNode;
    className?: string;
    disable?: boolean;
}

const CurrenInfoBtn = (props: ICurrenInfoBtn) => {
    const { label, height, width, onClick, icon,className,type,disable  } = props
    return (
        <div>
            <Button 
            type={type}
            style={{ width, height, }}
            onClick={onClick}
            disabled={disable}
            className={`flex items-center justify-center gap-2 ${className}`}
            >
                {icon && <span className="mr-2">{icon}</span>}
                {label}
            </Button>
        </div>
    )
}

export default CurrenInfoBtn