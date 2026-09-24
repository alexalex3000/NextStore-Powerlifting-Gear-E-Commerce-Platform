import styles from "./ProfileInfoSkeleton.module.scss";

export default function ProfileInfoSkeleton() {
    return (
        <section className={styles.card} aria-label="Loading profile info...">
            <div className={styles.header}>
                <div className={`${styles.title} ${styles.skeletonBase}`} />
                <div className={`${styles.editBtn} ${styles.skeletonBase}`} />
            </div>

            <div className={styles.grid}>
                <div className={styles.field}>
                    <div className={`${styles.label} ${styles.skeletonBase}`} />
                    <div className={`${styles.input} ${styles.skeletonBase}`} />
                </div>

                <div className={styles.field}>
                    <div className={`${styles.label} ${styles.skeletonBase}`} />
                    <div className={`${styles.input} ${styles.skeletonBase}`} />
                </div>

                <div className={styles.field}>
                    <div className={`${styles.label} ${styles.skeletonBase}`} style={{ width: "110px" }} />
                    <div className={`${styles.input} ${styles.skeletonBase}`} />
                </div>

                <div className={styles.field}>
                    <div className={`${styles.label} ${styles.skeletonBase}`} style={{ width: "100px" }} />
                    <div className={`${styles.input} ${styles.skeletonBase}`} />
                </div>
            </div>
        </section>
    );
}