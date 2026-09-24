import styles from "./ModalSkeleton.module.scss";

export default function ModalSkeleton() {
    return (
        <div
            className={styles.backdrop}
            role="dialog"
            aria-modal="true"
            aria-label="Loading product modal..."
        >
            <div className={styles.modal}>
                <div className={`${styles.closeButtonPlaceholder} ${styles.skeletonBase}`} />

                <div className={`${styles.imageWrapper} ${styles.skeletonBase}`} />

                <div className={styles.contentWrapper}>
                    <div className={styles.headerInfo}>
                        <div className={`${styles.productType} ${styles.skeletonBase}`} />
                        <div className={`${styles.titleLine1} ${styles.skeletonBase}`} />
                        <div className={`${styles.titleLine2} ${styles.skeletonBase}`} />

                        <div className={styles.ratingRow}>
                            <div className={`${styles.stars} ${styles.skeletonBase}`} />
                            <div className={`${styles.feedbacks} ${styles.skeletonBase}`} />
                        </div>

                        <div className={styles.divider} />
                    </div>

                    <div className={styles.bottomSection}>
                        <div className={styles.pricingBlock}>
                            <div className={`${styles.price} ${styles.skeletonBase}`} />
                            <div className={`${styles.stockStatus} ${styles.skeletonBase}`} />
                        </div>

                        <div className={styles.controlsBlock}>
                            <div className={`${styles.select} ${styles.skeletonBase}`} />
                            <div className={`${styles.button} ${styles.skeletonBase}`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}