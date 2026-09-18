"use client"

import styles from "./SectionPart.module.scss"

interface Props{
    children: React.ReactNode;
    black?: boolean;
}

export default function SectionPart({children, black}: Props){
    return (
        <div className={`${styles.sectionPart} ${black ? styles.black : ""}`}>{children}</div>
    )
}