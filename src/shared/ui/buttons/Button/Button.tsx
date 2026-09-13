"use client"

import styles from "../buttons.module.scss"

interface Props {
    isPending: boolean;
    onClick: () => void;
    value: string;
    className?: string;
}

export default function Button({onClick, isPending, value, className}: Props) {
    return (
        <button onClick={onClick} disabled={isPending} className={`${styles.button} ${className}`}>{value}</button>
    )
}