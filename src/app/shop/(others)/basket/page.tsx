import styles from "./styles.module.scss";
import BasketList from "@/features/BasketList/BasketList";
import BasketInfo from "@/features/BasketInfo/BasketInfo";

export default function BasketPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>Your basket</h1>
                <p>4 items</p>
            </div>
            <div className={styles.main}>
                <BasketList />
                <BasketInfo />
            </div>
        </div>
    );
}