import styles from "./Price.module.scss"
import {JSX} from "react";

interface Props {
    size: "small" | "large";
    currentPrice: number;
    oldPrice: number;
}

export default function Price({size, currentPrice, oldPrice}: Props) {
    return (
        <>
            {
                size === "small" ? (
                    <div className={styles.prices}>
                        <span className={styles.currentPrice}>{currentPrice}$</span>
                        <span className={styles.oldPrice}>{oldPrice}$</span>
                    </div>
                ) : (
                    <div className={styles.bigPrices}>
                        <span className={styles.currentPrice}>{currentPrice}$</span>
                        <span className={styles.oldPrice}>{oldPrice}$</span>
                    </div>
                )
            }
        </>
    )
}