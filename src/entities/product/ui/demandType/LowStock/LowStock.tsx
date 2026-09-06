import styles from "../styles.module.scss"

export default function LowStock() {
    return (
        <div className={`${styles.badge} ${styles.lowStock}`}>LOW STOCK</div>
    )
}