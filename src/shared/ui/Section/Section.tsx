"use client"

import styles from "./Section.module.scss";

interface Props{
    children?:React.ReactNode,
    black?: boolean,
    fullHeight?: boolean,
}

export default function Section({children, black, fullHeight}: Props) {
    return (
        <section className={`${fullHeight ? styles.fullSection : styles.section} ${black ? styles.black : ""}`}>
            {children}
        </section>
    )
}