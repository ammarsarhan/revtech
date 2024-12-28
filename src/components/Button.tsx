import React, { ReactNode } from "react"

interface ButtonProps {
    variant?: "Primary" | "Secondary",
    children: ReactNode
    icon?: boolean
    onClick?: () => void
}

export default function Button ({variant = "Primary", children, icon = false, onClick} : ButtonProps) {
    let style = "rounded-full text-sm font-medium transition-colors";

    if (variant === "Primary") {
        style += " bg-gray-100 hover:bg-gray-50";
    }

    if (variant === "Secondary") {
        style += " bg-black text-white";
    }

    if (icon) {
        style += " p-3";

        return (
            <button onClick={onClick} className={style}>
                {children}
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