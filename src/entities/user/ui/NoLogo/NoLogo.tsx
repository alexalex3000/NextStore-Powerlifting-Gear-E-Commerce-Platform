"use client"

import styles from "./NoLogo.module.scss"
import {getFirstLetters} from "@/shared/utils/getFirstLetters";

interface Props{
    title: string;
    size: "small" | "large";
}

export default function NoLogo({title, size}: Props) {
    const trimmed = getFirstLetters(title)

    return (
        <>
            {size == "large" ? (
                <div className={styles.avatar}>
                    <span className={styles.initials}>{trimmed}</span>
                </div>
            ) : (
                <div className={styles.smallAvatar}>
                    <span className={styles.smallInitials}>{trimmed}</span>
                </div>
            )
            }
        </>
    )
}