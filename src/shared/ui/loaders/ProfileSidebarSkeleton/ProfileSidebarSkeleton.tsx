import styles from "./ProfileSidebarSkeleton.module.scss";
import UserProfileSkeleton from "@/shared/ui/loaders/UserProfileSkeleton/UserProfileSkeleton";

export default function ProfileSidebarSkeleton() {
    return (
        <aside className={styles.sidebar} aria-label="Loading profile navigation...">
            <UserProfileSkeleton/>
            <nav className={styles.nav}>
                <div className={styles.navItem}>
                    <div className={styles.linkContent}>
                        <div className={`${styles.icon} ${styles.skeletonBase}`} />
                        <div className={`${styles.labelMedium} ${styles.skeletonBase}`} />
                    </div>
                    <div className={`${styles.arrow} ${styles.skeletonBase}`} />
                </div>

                <div className={styles.navItem}>
                    <div className={styles.linkContent}>
                        <div className={`${styles.icon} ${styles.skeletonBase}`} />
                        <div className={`${styles.labelShort} ${styles.skeletonBase}`} />
                    </div>
                </div>

                <div className={styles.navItem}>
                    <div className={styles.linkContent}>
                        <div className={`${styles.icon} ${styles.skeletonBase}`} />
                        <div className={`${styles.labelMedium} ${styles.skeletonBase}`} />
                    </div>
                </div>

                <div className={styles.signOutBtn}>
                    <div className={styles.linkContent}>
                        <div className={`${styles.signOutIcon} ${styles.skeletonBase}`} />
                        <div className={`${styles.signOutLabel} ${styles.skeletonBase}`} />
                    </div>
                </div>
            </nav>
        </aside>
    );
}