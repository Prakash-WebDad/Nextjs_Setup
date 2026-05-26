"use client";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    variant?: "primary" | "outline";
    full?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    className = "",
    variant = "primary",
    full = false,
    disabled = false,
    ...props
}) => {
    const base =
        "cursor-pointer text-sm font-medium px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition";

    const variants: Record<"primary" | "outline", string> = {
        primary: "bg-[#45703B] text-white hover:bg-green-800",
        outline:
            "border border-[#45703B] text-[#45703B] hover:bg-[#45703B] hover:text-white",
    };

    const disabledStyle =
        "opacity-50 cursor-not-allowed hover:bg-inherit hover:text-inherit";

    return (
        <button
            disabled={disabled}
            className={`${base} ${variants[variant]} ${full ? "w-full" : "w-auto"
                } ${disabled ? disabledStyle : ""} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;