import styles from "./NoLogo.module.scss"
import {getFirstLetters} from "@/shared/utils/getFirstLetters";

interface Props{
    title: string;
}

export default function NoLogo({title}: Props) {
    const trimmed = getFirstLetters(title)

    return (
        <div className={styles.avatar}>
            <span className={styles.initials}>{trimmed}</span>
        </div>
    )
}