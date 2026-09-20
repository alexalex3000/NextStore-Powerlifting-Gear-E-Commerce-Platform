"use client"

import styles from "../buttons.module.scss"

interface Props {
    isPending: boolean;
    onClick?: () => void;
    value: string;
    className?: string;
    type?: "button" | "submit";
    form?: string;
}

export default function Button({form,onClick, type, isPending, value, className}: Props) {
    return (
        <button form={form} type={type} onClick={onClick} disabled={isPending} className={`${styles.button} ${className}`}>{value}</button>
    )
}