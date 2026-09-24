import styles from "./CatalogSidebarSkeleton.module.scss";

export default function CatalogSidebarSkeleton() {
    return (
        <aside className={styles.sidebar} aria-label="Loading filters...">
            <div className={styles.header}>
                <div className={`${styles.headerIcon} ${styles.skeletonBase}`} />
                <div className={`${styles.headerTitle} ${styles.skeletonBase}`} />
            </div>

            <div className={styles.section}>
                <div className={`${styles.sectionTitle} ${styles.skeletonBase}`} />
                <div className={styles.divider} />
                <div className={styles.list}>
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className={styles.listItem}>
                            <div className={styles.itemLeft}>
                                <div className={`${styles.checkbox} ${styles.skeletonBase}`} />
                                <div
                                    className={`${i === 2 ? styles.labelMedium : styles.labelShort} ${styles.skeletonBase}`}
                                />
                            </div>
                            <div className={`${styles.badge} ${styles.skeletonBase}`} />
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <div className={`${styles.sectionTitle} ${styles.skeletonBase}`} />
                <div className={styles.divider} />
                <div className={styles.priceWrapper}>
                    <div className={`${styles.priceVal} ${styles.skeletonBase}`} />
                    <div className={`${styles.sliderTrack} ${styles.skeletonBase}`} />
                    <div className={styles.rangeLabels}>
                        <div className={`${styles.rangeLabel} ${styles.skeletonBase}`} />
                        <div className={`${styles.rangeLabel} ${styles.skeletonBase}`} />
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <div className={`${styles.sectionTitle} ${styles.skeletonBase}`} />
                <div className={styles.divider} />
                <div className={styles.list}>
                    {[1, 2, 3, 4].map((_, i) => (
                        <div key={i} className={styles.listItem}>
                            <div className={styles.itemLeft}>
                                <div className={`${styles.checkbox} ${styles.skeletonBase}`} />
                                <div className={`${styles.labelMedium} ${styles.skeletonBase}`} />
                            </div>
                            <div className={`${styles.labelShort} ${styles.skeletonBase}`} />
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}