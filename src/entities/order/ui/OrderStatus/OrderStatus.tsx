import styles from "./OrderStatus.module.scss";

interface Props{
    status: "pending" | "paid" | "processing" |
        "shipped" | "delivered" | "cancelled"
}

export default function OrderStatus({status}: Props){
    return (
        <span className={`${styles.statusBadge} ${styles[status]}`}>
            {status.toUpperCase()}
          </span>
    )
}