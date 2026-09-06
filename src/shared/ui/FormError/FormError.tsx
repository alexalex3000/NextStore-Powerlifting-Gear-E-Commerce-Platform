import styles from "./FormError.module.scss"

interface Props{
    error: string
}

export default function FormError({error}: Props) {
    return (
        <p className={styles.error}>{error}</p>
    )
}