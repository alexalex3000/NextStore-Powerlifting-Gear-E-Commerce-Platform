import styles from "./BasketSkeleton.module.scss";

export default function BasketSkeleton() {
    return (
        <div className={styles.wrapper} aria-label="Loading basket...">
            <div className={styles.header}>
                <div className={`${styles.title} ${styles.skeletonBase}`} />
                <div className={`${styles.count} ${styles.skeletonBase}`} />
            </div>

            <div className={styles.main}>
                <div className={styles.itemCard}>
                    <div className={styles.itemLeft}>
                        <div className={`${styles.img} ${styles.skeletonBase}`} />
                        <div className={styles.info}>
                            <div className={`${styles.type} ${styles.skeletonBase}`} />
                            <div className={`${styles.name} ${styles.skeletonBase}`} />
                            <div className={`${styles.size} ${styles.skeletonBase}`} />
                            <div className={`${styles.counter} ${styles.skeletonBase}`} />
                        </div>
                    </div>
                    <div className={styles.itemRight}>
                        <div className={`${styles.deleteIcon} ${styles.skeletonBase}`} />
                        <div className={`${styles.price} ${styles.skeletonBase}`} />
                    </div>
                </div>

                <div className={styles.summaryCard}>
                    <div className={`${styles.summaryTitle} ${styles.skeletonBase}`} />

                    <div className={styles.itemRow}>
                        <div className={`${styles.itemTitle} ${styles.skeletonBase}`} />
                        <div className={`${styles.itemPrice} ${styles.skeletonBase}`} />
                    </div>

                    <div className={styles.subtotalList}>
                        <div className={styles.row}>
                            <div className={`${styles.label} ${styles.skeletonBase}`} />
                            <div className={`${styles.value} ${styles.skeletonBase}`} />
                        </div>
                        <div className={styles.row}>
                            <div className={`${styles.label} ${styles.skeletonBase}`} />
                            <div className={`${styles.value} ${styles.skeletonBase}`} />
                        </div>
                    </div>

                    <div className={styles.totalPart}>
                        <div className={styles.totalRow}>
                            <div className={`${styles.totalLabel} ${styles.skeletonBase}`} />
                            <div className={`${styles.totalValue} ${styles.skeletonBase}`} />
                        </div>
                        <div className={`${styles.button} ${styles.skeletonBase}`} />
                        <div className={`${styles.note} ${styles.skeletonBase}`} />
                    </div>
                </div>
            </div>
        </div>
    );
}