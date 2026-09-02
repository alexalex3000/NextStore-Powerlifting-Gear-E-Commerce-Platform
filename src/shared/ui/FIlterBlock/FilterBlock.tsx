"use client"

import styles from "./FilterBlock.module.scss"

interface Props{
    children:React.ReactNode,
    isActive:boolean,
    onClick: () => void;
}

export default function FilterBlock({children, isActive, onClick}: Props) {
    return (
        <label className={styles.listItem}>
            <input
                type="checkbox"
                checked={Boolean(isActive)}
                onChange={onClick}
                className={styles.checkbox}
            />
            {children}
        </label>
    )
}