import * as React from "react";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement>

export function FormInput(props: FormInputProps) {
    const styles = "w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none";
    return <input className={styles} {...props} />
}