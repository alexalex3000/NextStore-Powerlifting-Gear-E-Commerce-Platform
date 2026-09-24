import styles from "./AddBasketWidSkeleton.module.scss";

export default function AddBasketWidSkeleton() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.headWrapper} aria-label="Loading product details...">
                <div className={`${styles.img} ${styles.skeletonBase}`} />

                <div className={styles.productInfo}>
                    <div className={styles.head}>
                        <div className={`${styles.badgePlaceholder} ${styles.skeletonBase}`} />
                        <div className={`${styles.typePlaceholder} ${styles.skeletonBase}`} />
                        <div className={`${styles.titleLine1} ${styles.skeletonBase}`} />
                        <div className={`${styles.titleLine2} ${styles.skeletonBase}`} />
                        <div className={styles.starsWrapper}>
                            <div className={`${styles.starsPlaceholder} ${styles.skeletonBase}`} />
                            <div className={`${styles.reviewsPlaceholder} ${styles.skeletonBase}`} />
                        </div>
                    </div>

                    <div className={styles.price}>
                        <div className={`${styles.pricePlaceholder} ${styles.skeletonBase}`} />
                    </div>

                    <div className={styles.state}>
                        <div className={`${styles.stockPlaceholder} ${styles.skeletonBase}`} />
                        <div className={styles.formPlaceholder}>
                            <div className={`${styles.selectPlaceholder} ${styles.skeletonBase}`} />
                            <div className={`${styles.buttonPlaceholder} ${styles.skeletonBase}`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}