import styles from './CardLoader.module.scss';

export function CardLoader() {
    return (
        <div className={styles.skeletonCard}>
            <div className={styles.skeletonImage} />

            <div className={styles.content}>
                <div className={styles.skeletonCategory} />
                <div className={styles.skeletonTitle} />

                <div className={styles.rating}>
                    <div className={styles.skeletonStars} />
                    <div className={styles.skeletonReviewCount} />
                </div>

                <div className={styles.footer}>
                    <div className={styles.skeletonPrice} />
                    <div className={styles.skeletonButton} />
                </div>
            </div>
        </div>
    );
}