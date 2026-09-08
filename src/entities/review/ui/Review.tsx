import styles from "./Review.module.scss";
import Stars from "@/shared/ui/Stars/Stars";

export default function Review() {
    return (
        <div className={styles.review}>
            <header className={styles.header}>
                <div className={styles.reviewAuthor}>
                    <div className={styles.logo}>{/*не трогать*/}</div>
                    <h2>Marcus</h2>
                </div>
                <div className={styles.assetment}>
                    <Stars count={3}/>
                    <p>July 28, 2021</p>
                </div>
            </header>
        </div>
    )
}