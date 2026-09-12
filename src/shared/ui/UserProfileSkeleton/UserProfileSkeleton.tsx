import styles from "./UserProfileSkeleton.module.scss";

export default function UserProfileSkeleton() {
    return (
        <div className={styles.userInfo}>
            <div className={styles.skeletonAvatar} />
            <div className={styles.skeletonName} />
            <div className={styles.skeletonEmail} />
        </div>
    );
}