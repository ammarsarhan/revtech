import React, { ReactNode } from "react"
import { MoveUpRight } from "lucide-react"

interface ButtonProps {
    variant?: "Primary" | "Secondary",
    className?: string 
    children: ReactNode
    icon?: boolean
    expand?: boolean
    onClick?: () => void
}

export default function Button ({variant = "Primary", className = "", children, icon = false, expand = false, onClick} : ButtonProps) {
    let style = "rounded-full text-sm font-medium transition-colors";
    style += ` ${className}`;

    if (variant === "Primary") {
        style += " bg-gray-100 hover:bg-gray-50";
    }

    if (variant === "Secondary") {
        style += " bg-black text-gray-50 hover:bg-gray-900";
    }

    if (icon) {
        style += " p-3";

        return (
            <button onClick={onClick} className={style}>
                {children}
            </button>
        )
    }

    
    if (expand) {
        style += " px-6 py-3 w-full text-left flex items-center justify-between [&>svg]:hover:rotate-45";

        return (
            <button onClick={onClick} className={style}>
                {children}
                <MoveUpRight className="w-4 h-4 transition-all"/>
            </button>
        )
    }
    
    style += " px-6 py-3";
    return (
        <button onClick={onClick} className={style}>
            {children}
        </button>
    )
}