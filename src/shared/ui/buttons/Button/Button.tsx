"use client"

import styles from "../buttons.module.scss"

interface Props {
    isPending: boolean;
    onClick?: () => void;
    value: string;
    className?: string;
    type?: "button" | "submit";
}

export default function Button({onClick, type, isPending, value, className}: Props) {
    return (
        <button type={type} onClick={onClick} disabled={isPending} className={`${styles.button} ${className}`}>{value}</button>
    )
}