import * as React from "react";

type ButtonProps = {
    children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({children, className = "", ...rest}: ButtonProps) {
    const styles = "self-start bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-md font-medium";
    return <button className={`${className} ${styles}`} {...rest}>
        {children}
    </button>
}