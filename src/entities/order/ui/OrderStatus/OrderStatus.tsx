import styles from "./OrderStatus.module.scss";

export type Status = "pending" | "paid" | "processing" |
"shipped" | "delivered" | "cancelled"

interface Props{
    status: Status
}

export default function OrderStatus({status}: Props){
    return (
        <span className={`${styles.statusBadge} ${styles[status]}`}>
            {status.toUpperCase()}
          </span>
    )
}