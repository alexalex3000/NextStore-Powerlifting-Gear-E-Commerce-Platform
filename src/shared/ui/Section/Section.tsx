"use client"

import styles from "./Section.module.scss";

interface Props{
    children?:React.ReactNode,
    black?: boolean,
}

export default function Section({children, black}: Props) {
    return (
        <section className={`${styles.section} ${black ? styles.black : ""}`}>
            {children}
        </section>
    )
}